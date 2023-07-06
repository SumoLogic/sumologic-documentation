---
id: activemq-opentelemetry
title: ActiveMQ - OpenTelemetry Collector
sidebar_label: ActiveMQ - OTel Collector
description: The ActiveMQ app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your ActiveMQ messaging clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/activemq.png')} alt="icon" width="75"/>

The **ActiveMQ** app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your ActiveMQ messaging clusters. Preconfigured dashboards provide insight into cluster status, nodes, producers, consumers, destinations, resource utilization, message rates, and error logs.


We use the OpenTelemetry collector for ActiveMQ metrics and logs collection.

The diagram below illustrates the components of the ActiveMQ collection for each ActiveMQ broker node. OpenTelemetry collector runs on the same host as ActiveMQ broker, and uses the [JMX Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver) to obtain ActiveMQ metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. ActiveMQ logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-OTel-Collection-architecture.png' alt="ActiveMQ OTel Collection architecture" />

This App has been tested with following ActiveMQ versions:
  * 5.17.4

## Log Types and Metrics

The Sumo Logic App for ActiveMQ assumes:

- ActiveMQ app supports the below log format in log4j2.properties file

  * [Audit Logs](https://activemq.apache.org/audit-logging):  Every management action made through JMX or Web Console management interface is logged in audit log files.

    `appender.auditlog.layout.pattern=%d | %-5p | %m | %t%n`

  * ActiveMQ Logs:

    `appender.logfile.layout.pattern=%d | %-5p | %m | %c | %t%n%throwable{full}`


- For a list of metrics that are collected and used by the app, see [ActiveMQ Metrics](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/docs/target-systems/activemq.md).


## Fields Creation in Sumo Logic for ActiveMQ

Following are the [Fields](/docs/manage/fields/) which will be created as part of ActiveMQ App install if not already present.

* `messaging.cluster.name`. User configured. Enter a name to uniquely identify your ActiveMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.
* `messaging.node.name`. Has value of `host name`.
* `messaging.system`. Has fixed value of `activemq`.
* `sumo.datasource`. Has fixed value of `activemq`.

If Process Metrics are enabled it will also create [fields for JMX metrics](/docs/integrations/app-development/opentelemetry/jmx-opentelemetry/#fields-creation-in-sumo-logic-for-jmx)


## Prerequisites

#### Configure logging in ActiveMQ:

  1. By default, ActiveMQ logs (`audit.log` and `activemq.log`) are stored in the directory called `${ACTIVEMQ_HOME}/data/activemq.log`. Make a note of this logs directory.

  2. [Enable auditing](https://activemq.apache.org/audit-logging) if not enabled by default

     `ACTIVEMQ_OPTS="$ACTIVEMQ_OPTS -Dorg.apache.activemq.audit=true"`

  3. Ensure that below log formats are present in [logging configuration](https://activemq.apache.org/how-do-i-change-the-logging). Also make sure appropriate log level is set.

      * [Audit Logs](https://activemq.apache.org/audit-logging):

        `appender.auditlog.layout.pattern=%d | %-5p | %m | %t%n`

      * ActiveMQ Logs:

        `appender.logfile.layout.pattern=%d | %-5p | %m | %c | %t%n%throwable{full}`



#### Configure metrics in ActiveMQ:

  1. Follow the instructions in [JMX - OpenTelemetry's prerequisites section](/docs/integrations/app-development/opentelemetry/jmx-opentelemetry/#prerequisites) to download the [JMX Metric Gatherer](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/README.md) used by the [JMX Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver#details).


  2. Enable reads metrics from ActiveMQ servers via the [JMX MBeans](https://activemq.apache.org/jmx) by setting `useJmx="true"` in file config [ActiveMQ.xml](https://activemq.apache.org/xml-configuration.html)
       ```xml
       <broker useJmx="true" brokerName="BROKER1">
       ...
       </broker>
       ```

     If you are using [Bitnami image for ActiveMQ](https://docs.bitnami.com/general/infrastructure/activemq/) one can update the `/opt/bitnami/activemq/bin/env` file and change the below parameter.

      ```
       ACTIVEMQ_SUNJMX_START="$ACTIVEMQ_SUNJMX_START -Dcom.sun.management.jmxremote.port=11099 -Dcom.sun.management.jmxremote.ssl=false  -Dcom.sun.management.jmxremote.password.file=${ACTIVEMQ_CONF_DIR}/jmx.password -Dcom.sun.management.jmxremote.access.file=${ACTIVEMQ_CONF_DIR}/jmx.access"
      ```

## Collecting Logs, Metrics and Installing the ActiveMQ App

The process to set up collection for ActiveMQ data is done through the following steps.

### Step 1: Set up OpenTelemetry Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step we will be configuring the yaml required for ActiveMQ Collection.

Below is the input required:

- **JMX Endpoint**. Enter the value in `host:port` form which will be used to construct the Service URL, the Metric Gatherer's JMX client should use (default: `localhost:11099`).
- **Jar File Path**. Enter the path to the OpenTelemetry JMX Metric Gatherer file configured in the prerequisites section.
- **UserName**. Username for JMX authentication, if applicable.
- **Password**. Password for JMX authentication, if applicable.
- **ActiveMQ Log File Path**. Enter the path to the ActiveMQ log file for your ActiveMQ instance.
- **Audit Log File path**. Enter the path to the Audit log file for your ActiveMQ instance.
- **Fields**. `messaging.cluster.name` User configured. Enter a name to identify this ActiveMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.



Click on the **Download YAML File** button to get the yaml file.

<!-- <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-YAML.png' alt="YAML" /> -->

### Step 3: Send logs and metrics to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1.  Copy the yaml to the`/etc/otelcol-sumo/conf.d/` folder for the ActiveMQ instance which needs to be monitored.
2.  Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1.  Copy the yaml to the `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2.  Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1.  Copy the yaml to the `/etc/otelcol-sumo/conf.d/` folder in the ActiveMQ instance which needs to be monitored.
2.  Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}


## Sample Log Messages

*activemq.log*

```json
2021-06-22 15:00:41,922 | DEBUG | Stopping transport tcp:///192.168.100.8:36302@61616 | org.apache.activemq.transport.tcp.TcpTransport | ActiveMQ BrokerService[localhost] Task-15300
```

*audit.log*

```json
2010-12-22 12:12:07,225 | INFO  | admin requested /admin/createDestination.action [JMSDestination='test' JMSDestinationType='queue' secret='4eb0bc3e-9d7a-4256-844c-24f40fda98f1' ] from 127.0.0.1 | qtp12205619-39
2010-12-22 12:12:14,512 | INFO  | admin requested /admin/purgeDestination.action [JMSDestination='test' JMSDestinationType='queue' secret='eff6a932-1b58-45da-a64a-1b30b246cfc9' ] from 127.0.0.1 | qtp12205619-36
2010-12-22 12:12:17,802 | INFO  | admin requested /admin/sendMessage.action [JMSTimeToLive='' JMSXGroupSeq='' AMQ_SCHEDULED_DELAY='' JMSType='' JMSMessageCountHeader='JMSXMessageCounter' JMSXGroupID='' JMSReplyTo='' JMSDestination='test' AMQ_SCHEDULED_PERIOD='' JMSText='Enter some text
here for the message body...' JMSDestinationType='queue' AMQ_SCHEDULED_CRON='' JMSCorrelationID='' AMQ_SCHEDULED_REPEAT='' JMSMessageCount='1' secret='a0e1df62-14d6-4425-82a2-17aa01a16e7d' JMSPriority='' ] from 127.0.0.1 | qtp12205619-37
```

## Sample Queries

### Log query

This sample Query is from the **Events by Severity** panel of the **ActiveMQ - Logs** dashboard.

```sql
sumo.datasource=activemq deployment.environment={{deployment.environment}} messaging.cluster.name={{messaging.cluster.name}} messaging.node.name={{messaging.node.name}}
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as raw_log_message
| parse field=raw_log_message "*|*|*|*|*" as timedate,severity,msg,class,address |trim(severity) as severity | count by severity
```

### Metrics query

Sample query from **Average Enqueue Latency** panel in **ActiveMQ - Destinations** dashboard.

```
sumo.datasource=activemq deployment.environment={{deployment.environment}} messaging.cluster.name={{messaging.cluster.name}} messaging.node.name={{messaging.node.name}} destination={{destination}} !(destination=activemq.*)  metric=activemq.message.wait_time.avg | avg by destination,messaging.cluster.name
```


## Sample Metrics

```
"Query","metric","deployment.environment","host.name","messaging.cluster.name","messaging.node.name","messaging.system","os.type","sumo.datasource","broker","destination","unit","latest"
```

```
"#A","activemq.message.wait_time.avg","testprod","ip-10-0-10-92","activemq_cluster","ip-10-0-10-92","activemq","linux","activemq","localhost","testtopic","ms","254.4"
```


## Viewing the ActiveMQ Dashboards

### Dashboard Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](/docs/dashboards-new/filter-template-variables.md) help page.

### Overview

The ActiveMQ - Overview dashboard gives you an at-a-glance view of your ActiveMQ deployment across brokers, queues, topics, and messages.

Use this dashboard to:
* Analyze Memory, Errors and Connections.
* Gain insights into Enqueue messages for your ActiveMQ server and compare it with last week's trend.
* Gain insights into Dequeue messages for your ActiveMQ server and compare it with last week's trend.
* Determine queues/topics with no producers and consumers.
* Determine queues/topics with expired messages.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Overview.png' alt="ActiveMQ dashboards" />


### Brokers

The ActiveMQ - Brokers dashboard provides an at-a-glance view of the state of your brokers in the ActiveMQ cluster.

Use this dashboard to:
* Gain insights into the storage and temp storage for your ActiveMQ brokers.
* Gain insights into enqueue rate, dequeue rate for your ActiveMQ brokers.
* Determine the amount of current connections, producers, and consumers for your ActiveMQ brokers.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Brokers.png' alt="ActiveMQ dashboards" />



### Destinations

The ActiveMQ - Destinations dashboard provides an at-a-glance view of the state of your topics/queues in ActiveMQ clusters.

Use this dashboard to:
* Monitor enqueue latency across topics/queues.
* Gain insights into enqueue rate, dequeue rate across topics/queues.
* Monitor producers, consumers and expired messages on topics/queues.
* Determine the number of topics/queues.


<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Destinations.png' alt="ActiveMQ dashboards" />


### Resource Utilization

The ActiveMQ - Resource Utilization dashboard provides an at-a-glance view of the state of system loads in clusters: Virtual Memory usage, Physical memory usage, CPU Utilization, Disk Operations, Disk Writes, I/O Wait

Use this dashboard to:
* Analyze memory and CPU utilization of activemq process.
* Gain insights into Disk Write operations and Disk Write Bytes of activemq process.
* Gain insights into memory utilization by topics/queues.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Resource-Utilization.png' alt="ActiveMQ dashboards" />



### Logs

This dashboard helps you quickly analyze your ActiveMQ error logs across all clusters.

Use this dashboard to:
* Identify critical events in your ActiveMQ cluster.
* Examine trends to detect spikes in Error or Fatal events
* Monitor Broker added/started and shutdown events in your cluster.
* Quickly determine patterns across all error logs in a given ActiveMQ cluster.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Logs.png' alt="ActiveMQ dashboards" />

### Audit

This dashboard helps you quickly analyze your ActiveMQ audit logs across all clusters.

Use this dashboard to:
* Identify locations of users performing management action.
* Track username, operation and ip address for each management level event.
* Monitor create and delete activity in your cluster.
* Quickly determine patterns across all audit logs in a given ActiveMQ cluster.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ActiveMQ-OpenTelemetry/ActiveMQ-Audit.png' alt="ActiveMQ dashboards" />

