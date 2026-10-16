---
id: azure-stream-analytics
title: Azure Stream Analytics
description: Learn about the Sumo Logic collection process for the Azure Stream Analytics service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-stream-analytics.png')} alt="Azure Stream Analytics icon" width="50"/>

[Azure Stream Analytics](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-introduction) is a fully managed stream processing engine that is designed to analyze and process large volumes of streaming data with sub-millisecond latencies. This integration helps in monitoring and troubleshooting your query and job performance.

## Log and metric types

For Azure Stream Analytics, you can collect the following logs and metrics:

* **Resource logs**. Azure Stream Analytics captures the following two categories of resource logs:
  * **Authoring**. These log events are related to job authoring operations, such as job creation, and starting or stopping the job.
  * **Execution**. These events are related to job execution such as connectivity and data processing errors.

To learn more about the different resource log category types and schemas collected for Azure Stream Analytics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-job-diagnostic-logs#resource-log-categories).

* **Platform Metrics for Azure Stream Analytics**. These metrics are available in [Microsoft.StreamAnalytics/streamingjobs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-streamanalytics-streamingjobs-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/stream-analytics/monitor-azure-stream-analytics-reference#metrics).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports collecting logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure Stream Analytics job you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/StreamAnalytics/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/stream-analytics/stream-analytics-job-diagnostic-logs#send-diagnostics-to-azure-monitor-logs). Perform the steps below for each Azure Stream Analytics job that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `Execution` and `Authoring`.
   * Use the Event hub namespace and Event hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/StreamAnalytics/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
