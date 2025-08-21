---
id: opentelemetry-collector-monitoring
title: OpenTelemetry Collector Monitoring
sidebar_label: OpenTelemetry Collector Monitoring
description: Learn about the Sumo Logic OpenTelemetry Collector Monitoring app.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic OpenTelemetry Collector Monitoring app provides comprehensive monitoring and observability for your OpenTelemetry Collector instances. Monitor collector performance, telemetry data flow, resource utilization, and troubleshoot data collection issues with preconfigured dashboards and alerts. Track metrics and logs to ensure your telemetry pipeline is running smoothly and efficiently.

This app supports OpenTelemetry Collector version **0.130.1-sumo-0** and later versions.

We use the OpenTelemetry collector's built-in internal telemetry capabilities to collect metrics and logs about the collector itself. By default, the Collector exposes its own telemetry through internal metrics (via Prometheus interface on port 8888) and logs (emitted to stderr).

The diagram below illustrates the components of the OpenTelemetry Collector self-monitoring setup. The collector is configured to export its own telemetry data (metrics and logs) to Sumo Logic through OTLP/HTTP endpoints.

:::info
This app includes [built-in monitors](#opentelemetry-collector-monitoring-alerts). For details on creating custom monitors, refer to [Create monitors for OpenTelemetry Collector Monitoring app](#create-monitors-for-opentelemetry-collector-monitoring-app).
:::

## Fields creation in Sumo Logic for OpenTelemetry Collector Monitoring

Following are the [fields](/docs/manage/fields/) which will be created as part of OpenTelemetry Collector Monitoring app installation, if not already present.

- **sumo.datasource**. Has fixed value of **otel_collector**.
- **_contentType**. Has fixed value of **OpenTelemetry**.
- **deployment.environment**. User configured. Enter a name to identify your deployment environment.

## Prerequisites

### For OTLP Endpoint Configuration

Before configuring the OTEL Collector integration, ensure you have the following prerequisites in place:

1. **OTLP Endpoint**: You need a valid base OTLP endpoint URL. The system will automatically append `/v1/logs` for logs collection and `/v1/metrics` for metrics collection. The endpoint should be accessible from your OTEL Collector instance.

2. **Network Access**: Ensure that your OTEL Collector has network access to the configured OTLP endpoint. This includes:
   - Outbound HTTPS connectivity on port 443
   - Proper firewall configurations to allow traffic to the endpoint
   - DNS resolution for the endpoint hostname

3. **Authentication**: If your OTLP endpoint requires authentication, ensure you have the proper credentials or tokens configured.

### For metrics collection

The OpenTelemetry Collector must be configured to export its own metrics using the built-in telemetry capabilities. This requires:
- OpenTelemetry Collector version 0.130.1-sumo-0 or later
- Collector configured with telemetry metrics enabled at `detailed` level
- Access to OTLP endpoint for metrics export
- Internal metrics exposed on port 8888 (default)

### For logs collection

The OpenTelemetry Collector must be configured to export its own logs using the built-in telemetry capabilities. This requires:
- Collector configured with telemetry logs enabled at `debug` level
- JSON encoding for structured log output
- Access to OTLP endpoint for logs export

### System Requirements

- OTEL Collector v0.130.1-sumo-0 or later
- Sufficient system resources (CPU, memory) for data processing
- Proper permissions for the collector service to access configured resources

import LogsCollectionPrereqisites from '../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

## Collection configuration and app installation

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

### Step 2: Configure integration

In this step, you will configure the OpenTelemetry Collector's built-in telemetry to monitor itself.

The collector's service configuration needs to be updated to enable telemetry export. Below is the required configuration that should be added to your collector's service section:

**Required Inputs:**
- **OTLP Endpoint**: Your Sumo Logic OTLP endpoint base URL
- **Deployment Environment**: Enter a name to identify your deployment environment

**Configuration Parameters:**
- **Endpoint Format**: The base endpoint automatically creates:
  - Logs endpoint: `${OTLP_ENDPOINT}/v1/logs`
  - Metrics endpoint: `${OTLP_ENDPOINT}/v1/metrics`
- **Protocol**: HTTP/protobuf for OTLP communication
- **Metrics level**: Set to **detailed** for comprehensive monitoring
- **Logs level**: Set to **debug** for detailed troubleshooting information

```yaml
service:
  telemetry:
    logs:
      level: debug
      development: false
      encoding: json
      processors:
        - batch:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: ${OTLP_ENDPOINT}/v1/logs
    metrics:
      level: detailed
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: ${OTLP_ENDPOINT}/v1/metrics
    resource:
      _contentType: OpenTelemetry
      sumo.datasource: otel_collector
      deployment.environment: ${DEPLOYMENT_ENVIRONMENT}
```

You can add any custom fields which you want to tag along with the data ingested in Sumo.

import EnvVar from '../../../reuse/apps/opentelemetry/env-var-required.md';

<EnvVar/>

### Step 3: Send logs and metrics to Sumo Logic

import LogsIntro from '../../../reuse/apps/opentelemetry/send-logs-intro.md';

<LogsIntro/>

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
    {label: 'Chef', value: 'Chef'},
    {label: 'Ansible', value: 'Ansible'},
    {label: 'Puppet', value: 'Puppet'},
  ]}>

<TabItem value="Linux">

1. Add the telemetry configuration to your existing collector configuration file in `/etc/otelcol-sumo/conf.d/` or directly in the main configuration file.
2. Place Env file in the following directory:
  ```sh
  /etc/otelcol-sumo/env/
  ```
3. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Add the telemetry configuration to your existing collector configuration file in `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` or the main configuration file.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Add the telemetry configuration to your existing collector configuration file in `/etc/otelcol-sumo/conf.d/` or the main configuration file.
2. Restart the otelcol-sumo process using:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
<TabItem value="Chef">

import ChefEnv from '../../../reuse/apps/opentelemetry/chef-with-env.md';

<ChefEnv/>

</TabItem>

<TabItem value="Ansible">

import AnsEnv from '../../../reuse/apps/opentelemetry/ansible-with-env.md';

<AnsEnv/>

</TabItem>

<TabItem value="Puppet">

import PuppetEnv from '../../../reuse/apps/opentelemetry/puppet-with-env.md';

<PuppetEnv/>

</TabItem>
</Tabs>

import LogsOutro from '../../../reuse/apps/opentelemetry/send-logs-outro.md';

<LogsOutro/>

### Validation

After installation, verify that:
1. The OTEL Collector service is running
2. The configured base endpoint is reachable
3. Data is being successfully sent to both the logs (`/v1/logs`) and metrics (`/v1/metrics`) endpoints
4. Resource attributes are properly applied to the telemetry data
5. Internal metrics are accessible at `http://localhost:8888/metrics`

## Sample log messages

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "info",
  "msg": "Batch processor started",
  "component": "batch",
  "pipeline": "metrics"
}
```

```json
{
  "timestamp": "2024-01-15T10:30:46.456Z",
  "level": "warn",
  "msg": "Dropping data because sending_queue is full",
  "component": "sumologicexporter",
  "pipeline": "logs"
}
```

## Sample metrics

```json
{
  "metric": "otelcol_processor_batch_batch_send_size",
  "sumo.datasource": "otel_collector",
  "_contentType": "OpenTelemetry",
  "deployment.environment": "production",
  "processor": "batch",
  "value": 100,
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

```json
{
  "metric": "otelcol_exporter_queue_size",
  "sumo.datasource": "otel_collector",
  "_contentType": "OpenTelemetry",
  "deployment.environment": "production",
  "exporter": "sumologic",
  "value": 150,
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

## Key Internal Metrics

The OpenTelemetry Collector emits comprehensive internal metrics categorized by verbosity levels:

### Basic Level Metrics (Essential service telemetry)
- **Process metrics**: `otelcol_process_uptime`, `otelcol_process_cpu_seconds`, `otelcol_process_memory_rss`
- **Receiver metrics**: `otelcol_receiver_accepted_*`, `otelcol_receiver_refused_*` 
- **Processor metrics**: `otelcol_processor_incoming_items`, `otelcol_processor_outgoing_items`
- **Exporter metrics**: `otelcol_exporter_sent_*`, `otelcol_exporter_send_failed_*`, `otelcol_exporter_enqueue_failed_*`
- **Queue metrics**: `otelcol_exporter_queue_size`, `otelcol_exporter_queue_capacity`

### Normal Level Metrics (Standard indicators)
- **Batch processor metrics**: `otelcol_processor_batch_batch_send_size`, `otelcol_processor_batch_timeout_trigger_send`

### Detailed Level Metrics (Most verbose)
- **HTTP metrics**: `http.client.request.duration`, `http.server.request.duration`, `http.*.request.body.size`
- **RPC metrics**: `rpc.client.duration`, `rpc.server.duration`, `rpc.*.request.size`, `rpc.*.response.size`

## Sample queries

This sample query is from the **Pipeline Health Overview** panel.

```sql
sumo.datasource=otel_collector
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as _raw
| parse "* * * *" as timestamp, level, component, msg
| where level in ("error", "warn", "info", "debug")
| count by level, component
| transpose row component column level
```

This sample metrics query is from the **Collector Resource Usage** panel.

```sql title="Sample metrics query"
sumo.datasource=otel_collector metric=otelcol_process_memory_rss deployment.environment=* | avg by deployment.environment
```

This sample query monitors queue health from the **Exporter Queue Health** panel.

```sql
sumo.datasource=otel_collector metric=otelcol_exporter_queue_size deployment.environment=* 
| avg by exporter, deployment.environment
```

## Viewing OpenTelemetry Collector Monitoring dashboards

All dashboards have a set of filters that you can apply to the entire dashboard. Use these filters to drill down and examine the data to a granular level.
- You can change the time range for a dashboard or panel by selecting a predefined interval from a drop-down list, choosing a recently used time range, or specifying custom dates and times. [Learn more](/docs/dashboards/set-custom-time-ranges/).
- You can use template variables to drill down and examine the data on a granular level. For more information, see [Filtering Dashboards with Template Variables](/docs/dashboards/filter-template-variables/).

### Overview

The **OpenTelemetry Collector - Overview** dashboard provides a high-level view of your OpenTelemetry Collector fleet's health and performance. This is your starting point for monitoring collector instances.

Use this dashboard to:
- Monitor the overall health of your collector fleet
- Identify performance bottlenecks and resource constraints
- Track data flow and processing rates across collectors
- Quickly spot collectors experiencing issues

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Overview.png' alt="Overview" />

### Logs

The **OpenTelemetry Collector - Logs** dashboard provides detailed insights into collector log output for root-cause analysis of errors, data dropping events, and restarts.

Use this dashboard to:
- Analyze error patterns and troubleshoot issues
- Monitor collector startup and shutdown events
- Identify data loss or processing problems
- Track log severity trends across your collector fleet

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Logs.png' alt="Logs" />

### Pipeline: Receiver Health

The **OpenTelemetry Collector - Pipeline: Receiver Health** dashboard focuses exclusively on the data ingestion stage of the pipeline to monitor data sources and receiver performance.

Use this dashboard to:
- Monitor receiver performance and data ingestion rates
- Identify issues with data sources and input connections
- Track receiver-specific errors and failures
- Analyze accepted vs refused data points

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Pipeline-Receiver-Health.png' alt="Pipeline Receiver Health" />

### Pipeline: Processor Health

The **OpenTelemetry Collector - Pipeline: Processor Health** dashboard is crucial for understanding if any processors (like batch, memory_limiter, or resourcedetection) are dropping data or causing performance issues.

Use this dashboard to:
- Monitor processor performance and throughput
- Identify data drops or processing bottlenecks
- Track processor-specific configurations and health
- Analyze batch processing efficiency and triggers

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Pipeline-Processor-Health.png' alt="Pipeline Processor Health" />

### Pipeline: Exporter Health

The **OpenTelemetry Collector - Pipeline: Exporter Health** dashboard is the most critical dashboard for diagnosing backpressure and data loss at the egress stage of the pipeline.

Use this dashboard to:
- Monitor exporter performance and success rates
- Identify backpressure issues and export failures
- Track data delivery to downstream systems
- Analyze queue utilization and capacity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Pipeline-Exporter-Health.png' alt="Pipeline Exporter Health" />

### Resource Utilization

The **OpenTelemetry Collector - Resource Utilization** dashboard provides a deep dive into the collector's own resource consumption to diagnose performance issues and plan for capacity.

Use this dashboard to:
- Monitor CPU, memory, and disk usage by collectors
- Plan capacity and resource allocation
- Identify resource constraints and optimization opportunities
- Track heap allocation and garbage collection patterns

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenTelemetry-Collector/OpenTelemetry-Collector-Resource-Utilization.png' alt="Resource Utilization" />

## Troubleshooting

### Common Issues

**Collector connection failure**: If your collector fails to connect to Sumo Logic, you may need to configure proxy settings. Check the collector's logs for connection errors:

```bash
# On systemd systems
journalctl --unit otelcol-sumo

# Look for errors like "Unable to get a heartbeat"
```

**High queue utilization**: Monitor the `otelcol_exporter_queue_size` and `otelcol_exporter_queue_capacity` metrics. If the queue is consistently full, you may need to:
- Reduce data ingestion rate
- Increase queue capacity
- Scale horizontally with more collectors

**Data dropping**: Watch for logs containing "Dropping data because sending_queue is full" and monitor failed enqueue metrics:
- `otelcol_exporter_enqueue_failed_spans`
- `otelcol_exporter_enqueue_failed_metric_points` 
- `otelcol_exporter_enqueue_failed_log_records`

### Accessing Collector Metrics Directly

By default, the collector's internal metrics are available in Prometheus format at `http://localhost:8888/metrics`. You can access them using:

```bash
curl http://localhost:8888/metrics
```

### Log Levels and Configuration

Configure different log levels for troubleshooting:
- **DEBUG**: Most verbose, includes detailed trace information
- **INFO**: Standard operational information (default)
- **WARN**: Warning messages about potential issues
- **ERROR**: Error conditions that need attention

## Create monitors for OpenTelemetry Collector Monitoring app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### OpenTelemetry Collector Monitoring alerts

| Alert Name  | Alert Description and conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `OpenTelemetry Collector - High Memory Usage Alert` | This alert gets triggered when collector memory usage exceeds 80% of available memory. | Count >= 80 | Count < 80 |
| `OpenTelemetry Collector - High CPU Usage Alert` | This alert gets triggered when collector CPU usage exceeds 80% for more than 5 minutes. | Count >= 80 | Count < 80 |
| `OpenTelemetry Collector - Pipeline Data Loss Alert` | This alert gets triggered when data drops are detected in the collector pipeline. | Count >= 1 | Count < 1 |
| `OpenTelemetry Collector - Exporter Failure Alert` | This alert gets triggered when export failures exceed the acceptable threshold. | Count >= 5 | Count < 5 |
| `OpenTelemetry Collector - Collector Down Alert` | This alert gets triggered when a collector instance stops reporting metrics. | Count >= 1 | Count < 1 |
| `OpenTelemetry Collector - High Queue Utilization Alert` | This alert gets triggered when exporter queue utilization exceeds 90%. | Count >= 90 | Count < 90 |
| `OpenTelemetry Collector - Receiver Refusal Rate Alert` | This alert gets triggered when receivers are refusing data at a high rate. | Count >= 10 | Count < 10 |