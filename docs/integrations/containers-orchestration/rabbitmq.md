---
id: rabbitmq
title: RabbitMQ - Classic Collector
sidebar_label: RabbitMQ
description: The RabbitMQ app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your RabbitMQ messaging clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/rabbitmq.png')} alt="icon" width="50"/>

The RabbitMQ app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your RabbitMQ messaging clusters. Preconfigured dashboards provide insight into cluster status, exchanges, queues, nodes and error logs.


## Sample log messages

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

```json title="Kubernetes environments"
{
    "Timestamp":1623650644120,
     "log":"2021-06-14 06:04:02.885 [debug] <0.3106.0> Asked to [re-]register this node   (rabbit@rabbitmq-1) with epmd...",
     "Stream":"stdout",
     "time":"2021-06-14T06:04:04.115318516Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```json title="Non-Kubernetes environments"
2021-06-14 12:59:00.004 [debug] <0.29866.49> User 'guest' authenticated successfully by backend rabbit_auth_backend_internal
Host: broker-1 Name: /var/log/rabbitmq/rabbit.log Category: logfile
```

</TabItem>
</Tabs>

## Collecting logs and metrics for RabbitMQ

This section provides instructions for configuring log and metric collection for the Sumo Logic App for RabbitMQ.

### Configure collection for RabbitMQ

Sumo Logic supports collection of logs and metrics data from RabbitMQ in both Kubernetes and non-Kubernetes environments.

Please click on the appropriate links below based on the host environment.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).The diagram below illustrates how data is collected from RabbitMQ in a Kubernetes environment. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/containers-orchestration/rabbitmq-telegraf-operator.png')} alt="rabbitmq-telegraf-operator" />

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from RabbitMQ. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the RabbitMQ input plugin to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note Prerequisites
It’s assumed that you are using the latest helm chart version. If not, upgrade using the instructions [here](/docs/send-data/kubernetes).
:::


#### Configure Metrics Collection

This section explains the steps to collect RabbitMQ metrics from a Kubernetes environment.

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more on this[ here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

1. [Set up Kubernetes Collection with the Telegraf Operator](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf)
2. On your RabbitMQ Pods, add the following annotations:
```sql
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
      [[inputs.rabbitmq]]
        url = "http://localhost:15672"
        username = "<username_CHANGE_ME>"
        password = "<password_CHANGE_ME>"
        insecure_skip_verify = false
        queue_name_include = []
        queue_name_exclude = []
      [inputs.rabbitmq.tags]
        environment="prod_CHANGE_ME"
        component="messaging"
        messaging_system="rabbitmq"
        messaging_cluster="rabbitmq_on_k8s_CHANGE_ME"
```

Please enter values for the following parameters (marked in **`CHANGE_ME`** above):

* `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf RabbitMQ Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the RabbitMQMongoDB input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section [`[inputs.rabbitmq]]`:
        * `url` - The URL of the RabbitMQ server for Management HTTP Endpoint. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq) for more information on additional parameters for configuring the RabbitMQ input plugin for Telegraf.
        * **`username`**: The Username of RabbitMQ's admin account. The default is `“guest”`.
        * **`password`**:  The password of RabbitMQ's admin account. The default is `“guest”`.
    * In the tags section `[inputs.rabbitmq.tags]`:
        * `environment`. This is the deployment environment where the RabbitMQ cluster identified by the value of **`servers`** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **`messaging_cluster`** - Enter a name to identify this RabbitMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.

**Do not modify** the following values set by this configuration as it will cause the Sumo Logic app to not function correctly.

* `telegraf.influxdata.com/class: sumologic-prometheus`. This instructs the Telegraf operator what output to use. This should not be changed.
* `prometheus.io/scrape: "true"`. This ensures our Prometheus will scrape the metrics.
* `prometheus.io/port: "9273"`. This tells prometheus what ports to scrape on. This should not be changed.
* `telegraf.influxdata.com/inputs`
    * In the tags section, `[inputs.rabbitmq.tags]`:
        * `component: “messaging”` - This value is used by Sumo Logic apps to identify application components.
        * `messaging_system: “rabbitmq”` - This value identifies the messaging system.

For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.

1. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
2. Verify metrics in Sumo Logic.

#### Configure Logs Collection

This section explains the steps to collect RabbitMQ logs from a Kubernetes environment.

1. **Add labels on your RabbitMQ pods to capture logs from standard output**. Make sure that the logs from RabbitMQ are sent to stdout. For more details see this [doc](https://www.rabbitmq.com/logging.html). Follow the instructions below to capture RabbitMQRabbitMQ logs from stdout on Kubernetes.
   1. Apply following labels to the RabbitMQ pods:
    ```sql
    environment: "prod_CHANGE_ME"
     component: "messaging"
     messaging_system: "rabbitmq"
        messaging_cluster: "rabbitmq_on_k8s_CHANGE_ME"
    ```

Enter in values for the following parameters (marked `CHANGE_ME` above):
* `environment`. This is the deployment environment where the RabbitMQ cluster identified by the value of **`servers`** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* `messaging_cluster`. Enter a name to identify this RabbitMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.

**Do not modify the following values** as it will cause the Sumo Logic app to not function correctly.


* `component: “messaging”`. This value is used by Sumo Logic apps to identify application components.
* `messaging_system: “rabbitmq”`. This value identifies the messaging system.

For all other parameters see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.

2. **(Optional) Collecting RabbitMQ Logs from a Log File**. Follow the steps below to capture RabbitMQ logs from a log file on Kubernetes.
   1. Determine the location of the RabbitMQ log file on Kubernetes. This can be determined from the RabbitMQ.conf for your RabbitMQ cluster along with the mounts on the RabbitMQ pods.
   2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   3. Add the following annotation in addition to the existing annotations.
    ```xml
    annotations:
     tailing-sidecar: sidecarconfig;<mount>:<path_of_RabbitMQ_log_file>/<RabbitMQ_log_file_name>
    ```
    Example:
    ```bash
    annotations:
      tailing-sidecar: sidecarconfig;data:/var/log/rabbitmq/rabbitmq.log
    ```
   4. Make sure that the RabbitMQ pods are running and annotations are applied by using the command:
```bash
kubectl describe pod <RabbitMQ_pod_name>
```
   5. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. **FER to normalize the fields in Kubernetes environments**. Labels created in Kubernetes environments automatically are prefixed with `pod_labels`. To normalize these for our app to work, a Field Extraction Rule named **AppObservabilityMessagingRabbitMQFER** is automatically created.

</TabItem>
<TabItem value="non-k8s">

In non-Kubernetes environments, we use the Telegraf operator for RabbitMQ metric collection and Sumo Logic Installed Collector for collecting RabbitMQ logs. The diagram below illustrates the components of the RabbitMQ collection in a non-Kubernetes environment. Telegraf runs on the same system as RabbitMQ, and uses the [RabbitMQ input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq) to obtain RabbitMQ metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from RabbitMQ on the other hand are sent to either a Sumo Logic Local File source.

This section provides instructions for configuring metrics collection for the Sumo Logic App for RabbitMQ. Follow the below instructions to set up collection:

Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure and start Telegraf

Configure Logs Collection
    1. Configure logging in RabbitMQ
    2. Configure local log file collection
    3. Configure a Collector
    4. Configure a Source


#### Configure Metrics Collection

1. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
2. **Configure an HTTP Logs and Metrics Source**. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the HTTP Source URL.
3. **Install Telegraf**. Use the [following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
4. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we will use the [RabbitMQ input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.

Before you configure telegraf, you will need to enable: Reads metrics from RabbitMQ servers via the[ Management Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq).

Enable the RabbitMQ management plugins by running the command below on every node:
 ```bash
 sudo rabbitmq-plugins enable rabbitmq_management
 sudo systemctl restart rabbitmq-server
 ```

Create or modify telegraf.conf and copy and paste the text below:  
```sql
[[inputs.rabbitmq]]
           url = "http://localhost:15672"
           username = "<username_CHANGE_ME>"
           password = "<password_CHANGE_ME>"
           insecure_skip_verify = false
           queue_name_include = []
           queue_name_exclude = []
           [inputs.rabbitmq.tags]
             environment="prod_CHANGE_ME"
             component="messaging"
             messaging_system="rabbitmq"
             messaging_cluster="rabbitmq_onprem_CHANGE_ME"

[[outputs.sumologic]]
  url = "<URL Created in Step b>"
  data_format = "prometheus"
```

Please enter values for the following parameters (marked `CHANGEME` above):

* In the input plugins section, which is `[[inputs.rabbitmq]]`:
    * `url` - The URL of the RabbitMQ server for Management HTTP Endpoint. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq) for more information on additional parameters for configuring the RabbitMQ input plugin for Telegraf.
    * `username`. The Username of RabbitMQ's admin account . The default is “guest”.
    * `password`. The password of RabbitMQ's admin account. The default is “guest”.
    * In the tags section, that is `[inputs.rabbitmq.tags]`
        * `environment`. This is the deployment environment where the RabbitMQ cluster identified by the value of **`servers`** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `messaging_cluster`. Enter a name to identify this RabbitMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.
* In the output plugins section, that is `[[outputs.sumologic]]`:
    * `url` - This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

**Do not modify** the following values set by this Telegraf configuration as it will cause the Sumo Logic app to not function correctly.

* `data_format - “prometheus”` In the output plugins section, which is `[[outputs.sumologic]]`. Metrics are sent in the Prometheus format to Sumo Logic.
* `component: “messaging”` - In the input plugins section, which is `[[inputs.RabbitMQ]]`. This value is used by Sumo Logic apps to identify application components.
* `messaging_system: “rabbitmq”` - In the input plugins sections.In other words, this value identifies the messaging system

For all other parameters, see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/logrotate.d/telegraf) for more parameters that can be configured in the Telegraf agent globally.

Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

* Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).
* At this point, RabbitMQ metrics should start flowing into Sumo Logic.


#### Configure Logs Collection

This section provides instructions for configuring log collection for RabbitMQ running on a non-Kubernetes environment for the Sumo Logic App for RabbitMQ.

By default, RabbitMQ logs are stored in a log file. Sumo Logic supports collecting logs via a local log file. Local log files can be collected via [Installed collectors](/docs/send-data/installed-collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/about-apis/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work. For detailed requirements for Installed collectors, see this [page](/docs/get-started/system-requirements#installed-collector-requirements).

Based on your infrastructure and networking setup choose one of these methods to collect RabbitMQ logs and follow the instructions below to set up log collection:

1. **Configure logging in RabbitMQ**. RabbitMQ supports logging via the following methods: local text log files, syslog and stdout. RabbitMQ logs have six levels of verbosity: debug, info, warning, error, critical, none. For details please visit this [page](https://www.rabbitmq.com/logging.html#log-levels). For the dashboards to work properly, must set log level = debug. Default, log level is info. All logging settings are located in [RabbitMQ.conf](https://www.rabbitmq.com/logging.html).
2. **Configure RabbitMQ log to a Local file**. By default, RabbitMQ logs are stored in `/var/log/rabbitmq/rabbit@<hostname>.log`. The default directory for log files is listed in the RabbitMQ.conf file.
To configure the log output destination to a log file, use one of the following settings, either in the[ configuration file](https://www.rabbitmq.com/logging.html).

Edit or create file config: /etc/rabbitmq/rabbitmq.conf following below:
```sql
log.dir = /var/log/rabbitmq
log.file = rabbitmq.log
log.file.level = debug
```

Logs from the RabbitMQ log file can be collected via a Sumo Logic [Installed collector](/docs/send-data/installed-collectors) and a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) as explained in the next section.
3. **Configuring a Collector**. To add an Installed collector, perform the steps as defined on the page[ Configure an Installed Collector.](/docs/send-data/installed-collectors)
4. **Configuring a Source**. To add a Local File Source source for RabbitMQ, do the following. To collect logs directly from your RabbitMQ machine, use an Installed Collector and a Local File Source.
   1. Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).
   2. Configure the Local File Source fields as follows:
     * **Name.** (Required)
     * **Description.** (Optional)
     * **File Path (Required).** Enter the path to your rabbitmq.log. The files are typically located in /var/log/rabbitmq/rabbitmq.log. If you're using a customized path, check the RabbitMQ.conf file for this information.
     * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
     * **Source Category.** Enter any string to tag the output collected from this Source, such as **RabbitMQ/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see[ Best Practices](/docs/send-data/best-practices).)
     * **Fields**. Set the following fields:
       * `component = messaging`
       * `messaging_system = rabbitmq`
       * `messaging_cluster = <Your_RabbitMQ_Cluster_Name>`
       * `environment = <Environment_Name>`, such as Dev, QA or Prod.
   3. Configure the **Advanced** section:
      * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
      * **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your RabbitMQ Server’s time zone.
      * **Timestamp Format.** The timestamp format is automatically detected.
      * **Encoding.** Select UTF-8 (Default).
      * **Enable Multiline Processing.** Detect messages spanning multiple lines
      * Infer Boundaries - Detect message boundaries automatically
   4. Click **Save**.

At this point, RabbitMQ logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>

## Installing the RabbitMQ App

import AppInstall2 from '../../reuse/apps/app-install-sc-k8s.md';

<AppInstall2/>

As part of the app installation process, the following fields will be created by default:
* `component`
* `environment`
* `messaging_system`
* `messaging_cluster`
* `pod`

If you're using RabbitMQ in a Kubernetes environment, the following additional fields will be automatically created as a part of the app installation process:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_messaging_system`
* `pod_labels_messaging_cluster`

## Viewing the RabbitMQ Dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>


### Overview

The RabbitMQ - Overview dashboard gives you an at-a-glance view of your RabbitMQ deployment across brokers, queues, exchanges, and messages.

Use this dashboard to:
* Analyze Memory and disk utilization.
* Gain insights into pushing messages for your RabbitMQ server.
* Gain insights into delivery messages for your RabbitMQ server.
* Determine the number of nodes, connections, exchanges, consume, queues, unack messages, total messages, across each cluster and ensure they match with expectations
* Analysis of near errors.

<img src={useBaseUrl('img/integrations/containers-orchestration/RabbitMQ-Overview.png')} alt="RabbitMQ dashboards" />


### Node

The RabbitMQ - Node dashboard helps you Get an at-a-glance view of the state of the nodes in the RabbitMQ cluster.

Use this dashboard to:
* Monitor the number of open file descriptors.
* Monitor uptime of nodes.
* Determine the amount of ram transaction, disk transaction.
* Determine the amount of  garbage collection per second.
* Monitor current memory usage

<img src={useBaseUrl('img/integrations/containers-orchestration/RabbitMQ-Node.png')} alt="RabbitMQ dashboards" />


### Queue

The RabbitMQ - Queue dashboard provides an at-a-glance view of the state of your queues in your RabbitMQ clusters.

Use this dashboard to:
* Monitor number of consumers on queues
* Gain insights into pushing messages rate for queues of your RabbitMQ cluster.
* Gain insights into delivery messages rate for queues of your RabbitMQ cluster.
* Determine the amount of slave nodes for queues.
* Monitor memory usage of queues over time.
* Determine the number of error messages on queues.

<img src={useBaseUrl('img/integrations/containers-orchestration/RabbitMQ-Queue.png')} alt="RabbitMQ dashboards" />


### Exchanges

The RabbitMQ - Exchanges dashboard provides an at-a-glance view of the state of your exchanges in your RabbitMQ clusters.

Use this dashboard to:
* Monitor number of total messages published in exchanges
* Monitor number of total messages published out exchanges
* Gain insights into message publish Rate in exchanges of your RabbitMQ cluster.
* Gain insights into message publish Rate out exchanges of your RabbitMQ cluster.

<img src={useBaseUrl('img/integrations/containers-orchestration/RabbitMQ-Exchange.png')} alt="RabbitMQ dashboards" />



### Logs
This dashboard helps you quickly analyze your RabbitMQ error logs across all clusters.

Use this dashboard to:
* Identify critical events in your RabbitMQ cluster.
* Examine trends to detect spikes in Error or Fatal events
* Monitor Broker added/started and shutdown events in your cluster.
* Quickly determine patterns across all logs in a given RabbitMQ cluster.

<img src={useBaseUrl('img/integrations/containers-orchestration/RabbitMQ-Logs.png')} alt="RabbitMQ dashboards" />


## Create monitors for RabbitMQ app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### RabbitMQ Alerts

<table>
  <tr>
   <td>Alert Name</td>
   <td>Alert Description</td>
   <td>Trigger Type (Critical / Warning)</td>
   <td>Alert Condition   </td>
   <td>Recover Condition   </td>
  </tr>
  <tr>
   <td>RabbitMQ - High Memory Usage   </td>
   <td>This alert fires when memory usage on a node in a RabbitMQ cluster is high.   </td>
   <td>Critical </td>
   <td>&#62; &#61; 80   </td>
   <td>&#60; 80   </td>
  </tr>
  <tr>
   <td>RabbitMQ - No Consumers   </td>
   <td>This alert fires when a RabbitMQ queue has no consumers.   </td>
   <td>Critical   </td>
   <td>&#60; 1   </td>
   <td>&#62; &#61; 1   </td>
  </tr>
  <tr>
   <td>RabbitMQ - High Disk Usage   </td>
   <td>This alert fires when there is high disk usage on a node in a RabbitMQ cluster.  </td>
   <td>Critical   </td>
   <td>&#62; &#61; 80   </td>
   <td>&#60; 80   </td>
  </tr>
  <tr>
   <td>RabbitMQ - High Number of File Descriptors in use </td>
   <td>This alert fires when the percentage of file descriptors used by a node in a RabbitMQ cluster is high.   </td>
   <td>Critical   </td>
   <td>&#62; &#61; 90   </td>
   <td>&#60; 90   </td>
  </tr>
  <tr>
   <td>RabbitMQ - Node Down   </td>
   <td>This alert fires when a node in the RabbitMQ cluster is down.   </td>
   <td>Critical   </td>
   <td>&#62; &#61; 1   </td>
   <td>&#60; 1   </td>
  </tr>
  <tr>
   <td>RabbitMQ - Too Many Connections   </td>
   <td>This alert fires when there are too many connections to a node in a RabbitMQ cluster. </td>
   <td>Critical   </td>
   <td>&#62; &#61; 1000   </td>
   <td>&#60; 1000   </td>
  </tr>
  <tr>
   <td>RabbitMQ - Too Many Un-acknowledged Messages   </td>
   <td>This alert fires when we detect that there are too many un-acknowledged messages on a node in a RabbitMQ cluster. </td>
   <td>Critical   </td>
   <td>&#62; &#61; 1000   </td>
   <td>&#60; 1000   </td>
  </tr>
  <tr>
   <td>RabbitMQ - Un-routable Messages   </td>
   <td>This alert fires when we detect that a node in the RabbitMQ cluster has un-routable messages </td>
   <td>Critical   </td>
   <td> &#62; &#61; 1   </td>
   <td>&#60; 1   </td>
  </tr>
</table>
