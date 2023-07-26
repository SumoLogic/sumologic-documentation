---
id: kafka
title: Kafka - Classic Collector
sidebar_label: Kafka
description: This guide provides an overview of Kafka related features and technologies.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/kafka.png')} alt="icon" width="150"/>

This guide provides an overview of Kafka related features and technologies. In addition, it contains recommendations on best practices, tutorials for getting started, and troubleshooting information for common situations.

The Sumo Logic App for Kafka is a unified logs and metrics app. The app helps you to monitor the availability, performance, and resource utilization of Kafka messaging/streaming clusters. Pre-configured dashboards provide insights into the cluster status, throughput, broker operations, topics, replication, zookeepers, node resource utilization, and error logs.

This App has been tested with following Kafka versions:
* 2.6.0
* 2.7.0

## Sample Logs

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

```json
{
	"timestamp":1617392000686,
	"log":"[2021-04-02 19:33:20,598] INFO [KafkaServer id=0] started (kafka.server.KafkaServer)",
	"stream":"stdout",
	"time":"2021-04-02T19:33:20.599066311Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```
[2021-03-10 20:12:28,742] INFO [KafkaServer id=0] \
started (kafka.server.KafkaServer)
```

</TabItem>
</Tabs>


## Sample Queries

This sample query string is from the Logs panel of the **Kafka - Logs** dashboard.

```sql
messaging_cluster=* messaging_system="kafka" \
| json auto maxdepth 1 nodrop | if (isEmpty(log), _raw, log) as kafka_log_message \
| parse field=kafka_log_message "[*] * *" as date_time,severity,msg | where severity in ("ERROR", "FATAL") \
| count by date_time, severity, msg | sort by date_time | limit 10
```

## Collecting Logs and Metrics for Kafka

This section provides instructions for configuring log and metric collection for the Sumo Logic App for Kafka.

### Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see [Sumo Logic Fields](/docs/manage/fields.md).

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

If you're using Kafka in a Kubernetes environment, create the fields:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_messaging_system`
* `pod_labels_messaging_cluster`

</TabItem>
<TabItem value="non-k8s">

If you're using Kafka in a non-Kubernetes environment, create the fields:
* `component`
* `environment`
* `messaging_system`
* `messaging_cluster`
* `pod`

</TabItem>
</Tabs>

### Configure Collection for Kafka

Sumo Logic supports collection of logs and metrics data from Kafka in both Kubernetes and non-Kubernetes environments.

Click on the appropriate link below based on the environment where your Kafka clusters are hosted.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). The following diagram illustrates how data is collected from Kafka in Kubernetes environments. In the following architecture, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/containers-orchestration/kafka-k8s.png')} alt="kafka-k8s" />

The first service in the pipeline is Telegraf. Telegraf collects metrics from Kafka. We’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment. In other words, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Jolokia input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2)to obtain metrics, (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

#### Configure Metrics Collection

Follow these steps to collect metrics from a Kubernetes environment:

1. **Setup Kubernetes Collection with the Telegraf operator**. Ensure that you are monitoring your Kubernetes clusters with the Telegraf operator **enabled**. If you are not, then follow [these instructions](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) to do so.
2. **Add annotations on your Kafka pods**.
   1. Open [this yaml file](https://sumologic-app-data.s3.amazonaws.com/Kafka/KAfka_PodAnnotations.yaml) and add the annotations mentioned there.
   2. Enter in values for the parameters marked with `CHANGE_ME` in the yaml file:
     * `telegraf.influxdata.com/inputs` - As telegraf will be run as a sidecar the `urls` should always be localhost.
     * In the input plugins section:
        * `urls` - The URL to the Kafka server. As telegraf will be run as a sidecar the `urls` should always be localhost. This can be a comma-separated list to connect to multiple Kafka servers.
     * In the tags sections, (`[inputs.jolokia2_agent.tags]` and `[inputs.disk.tags]`):
        * `environment` - This is the deployment environment where the Kafka cluster identified by the value of servers resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `messaging_cluster` - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.

Here’s an explanation for additional values set by this configuration that we request you **do not modify** these values as they will cause the Sumo Logic apps to not function correctly.

* `telegraf.influxdata.com/class: sumologic-prometheus` - This instructs the Telegraf operator what output to use. This should not be changed.
* `prometheus.io/scrape: "true"` - This ensures our Prometheus plugin will scrape the metrics.
* `prometheus.io/port: "9273"` - This tells Prometheus what ports to scrape metrics from. This should not be changed.
* `telegraf.influxdata.com/inputs`
    * In the tags sections `[inputs.jolokia2_agent/diskio/disk]`
        * `component: “messaging”` - This value is used by Sumo Logic apps to identify application components.
        * `messaging_system: “kafka”` - This value identifies the database system.

For more information on all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) for more parameters that can be configured in the Telegraf agent globally.

For more information on configuring the Joloka input plugin for Telegraf, see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2).

3. Configure your Kafka Pod to use the Jolokia Telegraf Input Plugin. Jolokia agent needs to be available to the Kafka Pods. Starting Kubernetes 1.10.0, you can store a binary file in a [configMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap). This makes it very easy to load the Jolokia jar file, and make it available to your pods.
4. Download the latest version of the **Jolokia JVM-Agent** from [Jolokia](https://jolokia.org/download.html).
5. Rename the file to `jolokia.jar`.
6. Create a `configMap jolokia` from the binary file:
  ```bash
  kubectl create configmap jolokia --from-file=jolokia.jar
  ```
7. Modify your Kafka Pod definition to include volume (type [ConfigMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap)) and `volumeMounts`. Finally, update the `env` (environment variable) to start Jolokia, and apply the updated Kafka pod definition.
 ```yml
 spec:
   volumes:
     - name: jolokia
       configMap:
         name: jolokia
   containers:
     - name: XYZ
       image: XYZ
       env:
       - name: KAFKA_OPTS
         value: "-javaagent:/opt/jolokia/jolokia.jar=port=8778,host=0.0.0.0"
       volumeMounts:
         - mountPath: "/opt/jolokia"
           name: jolokia
 ```
8. **Verification Step:** You can ssh to Kafka pod and run following commands to make sure Telegraf (and Jolokia) is scraping metrics from your Kafka Pod:
 ```bash
 curl localhost:9273/metrics
 curl http://localhost:8778/jolokia/list
 echo $KAFKA_OPTS
 ```

It should give you the following result:
 ```bash
 -javaagent:/opt/jolokia/jolokia.jar=port=8778,host=0.0.0.0
 ```

9. Make sure jolokia.jar exists at /opt/jolokia/ directory of kafka pod. This is an example of what a [Pod definition file](https://sumologic-app-data.s3.amazonaws.com/Kafka/Kafka_Pod_annotations_Labels_MountVolume.yaml) looks like.
10. Once this has been done, the Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step. Verify metrics are flowing into Sumo Logic by running the following metrics query:
 ```sql
 component="messaging" and messaging_system="kafka"
 ```

#### Configure Logs Collection
This section explains the steps to collect Kafka logs from a Kubernetes environment.

1. **Collect Kafka logs written to standard output**. If your Kafka helm chart/pod is writing the logs to standard output then follow the steps listed below to collect the logs:
   1. Apply the following labels to your Kafka pods:
    `environment: "prod-CHANGE_ME"` \
    `component: "messaging"` \
    `messaging_system: "kafka"` \
    `messaging_cluster: "kafka_prod_cluster01-CHANGE_ME”`
   2. Enter in values for the following parameters (marked in bold and `CHANGE_ME` above):
      * `environment` - This is the deployment environment where the Kafka cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `messaging_cluster` - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.
      * Here’s an explanation for additional values set by this configuration that we request you **do not modify** as they will cause the Sumo Logic apps to not function correctly.
      * `component: “messaging”` - This value is used by Sumo Logic apps to identify application components.
      * `messaging_system: “kafka”` - This value identifies the messaging system.
      * For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, see [this page](/docs/integrations/containers-orchestration/kubernetes/#collecting-metrics-and-logs-for-the-kubernetes-app).
2. **Collect Kafka logs written to log files (Optional)**. If your Kafka helm chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:
   1. Determine the location of the Kafka log file on Kubernetes. This can be determined from helm chart configurations.
   2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   3. Add the following annotation in addition to the existing annotations.
    ```xml
    annotations:
      tailing-sidecar: sidecarconfig;<mount>:<path_of_kafka_log_file>/<kafka_log_file_name>`
    ```
    Example:
    ```bash
    annotations:
      tailing-sidecar: sidecarconfig;data:/opt/Kafka/kafka_<VERSION>/logs/server.log
    ```      
   4. Make sure that the Kafka pods are running and annotations are applied by using the command:
    ```bash
    kubectl describe pod <Kafka_pod_name>
    ```
   5. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. **Add an FER to normalize the fields in Kubernetes environments**. Labels created in Kubernetes environments automatically are prefixed with `pod_labels`. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Messaging Application Components. To do so:
   1. Go to **Manage Data** > **Logs** > **Field Extraction Rules**.
   2. Click the **+ Add** button on the top right of the table.
   3. The **Add Field Extraction Rule** form will appear. Enter the following options:
     * **Rule Name**. Enter the name as **App Component Observability - Messaging.**
     * **Applied At**. Choose Ingest Time
     * **Scope**. Select Specific Data
     * Scope: Enter the following keyword search expression:
      ```sql
      pod_labels_environment=* pod_labels_component=messaging
      pod_labels_messaging_system=kafka pod_labels_messaging_cluster=*
      ```
     * **Parse Expression**. Enter the following parse expression:
      ```sql
      if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
      | pod_labels_component as component
      | pod_labels_messaging_system as messaging_system
      | pod_labels_messaging_cluster as messaging_cluster
      ```
   4. Click **Save** to create the rule.
   5. Verify logs are flowing into Sumo Logic by running the following logs query:
    ```sql
    component="messaging" and messaging_system="kafka"
    ```

</TabItem>
<TabItem value="non-k8s">

<img src={useBaseUrl('img/integrations/containers-orchestration/kafka-nonk8s.png')} alt="non k8s-diagram" />

This section provides instructions for configuring log and metric collection for the Kafka app in Non-Kubernetes environments.

#### Prerequisite

Metrics collection setup can be done in two ways: [using Telegraf with an installed collector](#using-telegraf-and-installed-collector); or by using OpenTelemetry. Both methods require you to configure Jolokia JVM Agent to collect metrics:
1. Download the latest version of the **Jolokia JVM-Agent** from [Jolokia](https://jolokia.org/download.html).
1. Rename downloaded Jar file to `jolokia-agent.jar`.
1. Save the file `jolokia-agent.jar` on your kafka server in `/opt/kafka/libs`.
1. Configure Kafka to use Jolokia by adding the following to `kafka-server-start.sh`:
```
export JMX_PORT=9999
export RMI_HOSTNAME=0.0.0.0
export KAFKA_JMX_OPTS="-javaagent:/opt/kafka/libs/jolokia.jar=port=8778,host=$RMI_HOSTNAME -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=$RMI_HOSTNAME -Dcom.sun.management.jmxremote.rmi.port=$JMX_PORT"
```
1. Restart Kafka Service.
1. Verify that you can access jolokia on port 8778 using following command:
  ```
  curl http://KAFKA_SERVER_IP_ADDRESS:8778/jolokia/
  ```

#### Using Telegraf and Installed Collector

We use the Telegraf Operator for Kafka metric collection and the Sumo Logic Installed Collector for collecting Kafka logs. The diagram below illustrates the components of the Kafka collection in a non-Kubernetes environment. Telegraf runs on the same system as Kafka, and uses the Kafka Jolokia input plugin to obtain Kafka metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Kafka Logs are sent to Sumo Logic Local File Source on Installed Collector.

This section provides instructions for configuring metrics collection for the Sumo Logic App for Kafka. Follow the instructions documented below to set up metrics collection for a given Broker in your Kafka Cluster:

#### Configure Collection of Kafka Metrics

1. Configure a Hosted Collector. To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
2. Configure an HTTP Logs and Metrics Source. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions](/docs/send-data/hosted-collectors/http-source). Make a note of the **HTTP Source URL**.
3. Install Telegraf. Follow the steps in [this document](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) to install Telegraf on each Kafka Broker node.
4. Configure and start telegraf. Create or modify the telegraf.conf file in /etc/telegraf/telegraf.d and copy and paste the text [from this file](https://sumologic-app-data.s3.amazonaws.com/Kafka/config_telegraf.conf).  
5. Please enter values for the following parameters (marked with `CHANGE_ME`) in the downloaded file:
* In the input plugins section, which is `[[inputs.jolokia2_agent]]`:
    * `urls` - In the `[[inputs.jolokia2_agent]]` section. The URL to the Kafka server. This can be a comma-separated list to connect to multiple Kafka servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Jolokia input plugin for Telegraf.
    * In the tags sections (total 3) which is section[inputs.jolokia2_agent.tags], and [inputs.disk.tags]
        * `environment` - This is the deployment environment where the Kafka cluster identified by the value of `urls` parameter resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `messaging_cluster` - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.
* In the output plugins section:
    * `url` - This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

**Do not modify these values** as they will cause the Sumo Logic apps to not function correctly:
* `data_format` - “prometheus” In the output plugins section. In other words, this indicates that metrics should be sent in the Prometheus format to Sumo Logic.
* `Component`: “messaging” - In the input plugins section.In other words, this value is used by Sumo Logic apps to identify application components.
* `messaging_system`: “kafka” - In the input plugins sections.In other words, this value identifies the messaging system.
* `component`: “messaging” - In the input plugins sections. In other words, this value identifies application components.

Here is an example [telegraf.conf](https://sumologic-app-data.s3.amazonaws.com/Kafka/telegraf.conf+) file.

For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) for more properties that can be configured in the Telegraf agent globally.
6. Restart Telegraf. Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from their [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Kafka metrics should start flowing into Sumo Logic.

#### Configure Collection of Kafka Logs on each Kafka Broker node

This section provides instructions for configuring log collection for Kafka running on a non-Kubernetes environment for the Sumo Logic App for Kafka. By default, Kafka logs are stored in a log file. Perform the steps outlined below for each Kafka Broker node.
1. Configure logging in Kafka. By default Kafka logs (server.log and controller.log) are stored in the directory: `/opt/Kafka/kafka_<VERSION>/logs`. Make a note of the above logs directory.
2. Configure an Installed Collector. To add an Installed collector, perform the steps as defined on the page [Configure an Installed Collector.](/docs/send-data/installed-collectors)
3. Configuring a Source. To add a Local File Source source for Kafka do the following:
   1. Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) in the installed collector configured in the previous step.
   2. Configure the Local File Source fields as follows:
     * **Name.** (Required)
     * **Description.** (Optional)
     * **File Path (Required).** Enter the path to your server.log and controller.log. The files are typically located in `/opt/Kafka/kafka_<VERSION>/logs/*.log`.
     * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
     * **Source Category.** Enter any string to tag the output collected from this Source, such as **Kafka/Logs**. The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see [Best Practices](/docs/send-data/best-practices/#good-and-bad-source-categories).
     * **Fields.**Set the following fields. For more information on fields please see [this document](/docs/manage/fields):
       ```    
       component = messaging
       messaging_system = kafka
       messaging_cluster = <Your_KAFKA_Cluster_Name>
       environment = <Environment_Name>, such as Dev, QA or Prod.
       ```
    3. Configure the **Advanced** section:
     * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
     * **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your Kafka Server’s time zone.
     * **Timestamp Format.** The timestamp format is automatically detected.
     * **Encoding. **Select** **UTF-8 (Default).
     * **Enable Multiline Processing.** Detect messages spanning multiple lines
     * Select Infer Boundaries - Detect message boundaries automatically
    4. Click **Save**.

At this point, Kafka logs should start flowing into Sumo Logic.


#### Using OpenTelemetry  

We use the Telegraf receiver of Sumo Logic OpenTelemetry Distro [Collector](https://github.com/SumoLogic/sumologic-otel-collector) for Kafka metric collection and the Filelog receiver for collecting Kafka logs. Sumo Logic OT distro runs on the same system as Kafka, and uses the Kafka Jolokia input plugin for Telegraf to obtain Kafka metrics, and the Sumo Logic exporter to send the metrics to Sumo Logic. Kafka Logs are sent to Sumo Logic using the Filelog receiver.

##### Configure Collection of Kafka Metrics and Logs  

* Install sumologic-otel-collector by following the instructions for your operating system:
  * [Linux](/docs/send-data/opentelemetry-collector/install-collector-linux)
  * [macOS](/docs/send-data/opentelemetry-collector/install-collector-macos)
  * [Windows](/docs/send-data/opentelemetry-collector/install-collector-windows)
* Configure and start `sumologic-otel-collector`.

As part of collecting metrics data from Kafka, we will use the [jolokia2 input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for Telegraf to get data from otel and then send data to Sumo Logic.

Create or modify config.yaml. Refer sample config [here](https://ot-distro.s3.amazonaws.com/config_kafka.yaml).

* Enter Sumo Logic collection details in the section; extensions > sumologic by referring to [these](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/extension/sumologicextension) instructions. Configure details like collector name, category, install token etc.
* Please enter values for the following parameters (marked with CHANGE_ME) in the downloaded file, reference [here](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/receiver/telegrafreceiver):
    * In the receivers > telegraf > agent_config > input plugins section which is :
        * `urls` - In the section. The URL to the Kafka server. This can be a comma-separated list to connect to multiple Kafka servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Jolokia input plugin for Telegraf.
        * In the tags sections (total 3) which is section`[inputs.jolokia2_agent.tags]`, and [inputs.disk.tags]
            * `environment` - This is the deployment environment where the Kafka cluster identified by the value of `urls` parameter resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
            * `messaging_cluster` - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.
    * In the receivers > filelog section, refer instructions [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.54.0/receiver/filelogreceiver):
        * include: list of kafka log files with full directory path.
    * Configure sumologic exporter and service as defined here.

**Do not modify these values** as they will cause the Sumo Logic apps to not function correctly:
* `data_format` - “prometheus” In the output plugins section. In other words, this indicates that metrics should be sent in the Prometheus format to Sumo Logic.
* `Component`: “messaging” - In the input plugins section.In other words, this value is used by Sumo Logic apps to identify application components.
* `messaging_system`: “kafka” - In the input plugins sections.In other words, this value identifies the messaging system.
* `component`: “messaging” - In the input plugins sections. In other words, this value identifies application components.

For all other parameters, see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) for more properties that can be configured in the Telegraf agent globally.
* Run the Sumo Logic OT Distro using the below command
  ```bash
  otelcol-sumo --config config.yaml
  ```

At this point, Kafka metrics and logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>

## Installing Kafka Alerts

This section and below provide instructions for installing the Sumo App and Alerts for Kafka and descriptions of each of the app dashboards. These instructions assume you have already set up the collection as described in [Collect Logs and Metrics for Kafka](#collecting-logs-and-metrics-for-kafka).

#### Pre-Packaged Alerts

Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you quickly determine if the Kafka cluster is available and performing as expected. These alerts are built based on metrics datasets and have preset thresholds based on industry best practices and recommendations. See [Kafka Alerts](#kafka-alerts) for more details.

* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing a JSON or a Terraform script.
* There are limits to how many alerts can be enabled - see the [Alerts FAQ](/docs/alerts/monitors/monitor-faq) for details.


### Method A: Importing a JSON file

1. Download a[ JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/kubernetes/kubernetes.json) that describes the monitors.
    1. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Kafka/Kafka_Alerts.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all Kafka clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `'messaging_system=kafka `with `'<Your Custom Filter>`. Custom filter examples:
     * For alerts applicable only to a specific cluster, your custom filter would be: `messaging_cluster=Kafka-prod.01`
     * For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be: `messaging_cluster=Kafka-prod*`
     * For alerts applicable to a specific cluster within a production environment, your custom filter would be: `messaging_cluster=Kafka-1` and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)
   2. Go to **Manage Data > Alerts > Monitors**.
   3. Click **Add**
   4. Click Import to import monitors from the JSON above.

The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Kafka folder under Monitors to configure them. See [this](/docs/alerts/monitors) document to enable monitors. To send notifications to teams or connections, see the instructions detailed in Step 4 of this [document](/docs/alerts/monitors#add-a-monitor).

### Method B: Using a Terraform script

1. Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](/docs/manage/security/access-keys#manage-your-access-keys-on-preferences-page). Identify which deployment your Sumo Logic account is in using [this link](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
2. [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later.
3. Download the Sumo Logic Terraform package for Kafka alerts. The alerts package is available in the Sumo Logic [github repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/Kafka). You can either download it through the “git clone” command or as a zip file.
4. Alert Configuration. After the package has been extracted, navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/Kafka`.
   1. Edit the `monitor.auto.tfvars` file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1.
    ```bash
    access_id   = "<SUMOLOGIC ACCESS ID>"
    access_key  = "<SUMOLOGIC ACCESS KEY>"
    environment = "<SUMOLOGIC DEPLOYMENT>"
    ```
   2. The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable `’kafka_data_source’`. Custom filter examples:
     * For alerts applicable only to a specific cluster, your custom filter would be: `messaging_cluster=Kafka-prod.01`
     * For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be: `messaging_cluster=Kafka-prod*`
     * For alerts applicable to a specific cluster within a production environment, your custom filter would be: `messaging_cluster=Kafka-1` and `environment=prod`. This assumes you have set the optional environment tag while configuring collection.

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter `monitors_disabled` to `false` in this file.

By default, the monitors are configured in a monitor folder called “Kafka”, if you would like to change the name of the folder, update the monitor folder name in this file.

5. To send email or connection notifications, modify the file `notifications.auto.tfvars` file and fill in the `connection_notifications` and `email_notifications` sections. See the examples for PagerDuty and email notifications below. See [this document](/docs/alerts/webhook-connections/set-up-webhook-connections) for creating payloads with other connection types.

```bash title="Pagerduty Connection Example"
connection_notifications = [
    {
      connection_type       = "PagerDuty",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "{\"service_key\": \"your_pagerduty_api_integration_key\",\"event_type\": \"trigger\",\"description\": \"Alert: Triggered {{TriggerType}} for Monitor {{Name}}\",\"client\": \"Sumo Logic\",\"client_url\": \"{{QueryUrl}}\"}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    },
    {
      connection_type       = "Webhook",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```

Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the[ Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

```bash title="Email Notifications Example"
email_notifications = [
    {
      connection_type       = "Email",
      recipients            = ["abc@example.com"],
      subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
      time_zone             = "PST",
      message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```

6. Install the Alerts
   1. Navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/Kafka/` and run terraform init. This will initialize Terraform and will download the required components.
   2. Run `terraform plan` to view the monitors which will be created/modified by Terraform.
   3. Run `terraform apply`.
7. **Post Installation.** If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. This is detailed in Step 4 of[ this document](/docs/alerts/monitors#add-a-monitor).


## Installing the Kafka App

This section demonstrates how to install the Kafka App.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
   * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
   * **Data Source.** Choose **Enter a Custom Data Filter**, and enter a custom Kafka cluster filter. Examples:
     * For all Kafka clusters `messaging_cluster=*`
     * For a specific cluster: `messaging_cluster=Kafka.dev.01`. 
     * Clusters within a specific environment: `messaging_cluster=Kafka-1 and environment=prod`. This assumes you have set the optional environment tag while configuring collection.
4. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
5. Click **Add to Library**.

When an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the Kafka Dashboards

### Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the Filter with template variables help page.


### Kafka - Cluster Overview

The **Kafka - Cluster Overview** dashboard gives you an at-a-glance view of your Kafka deployment across brokers, controllers, topics, partitions and zookeepers.

Use this dashboard to:
* Identify when brokers don’t have active controllers
* Analyze trends across Request Handler Idle percentage metrics. Kafka’s request handler threads are responsible for servicing client requests ( read/write disk). If the request handler threads get overloaded, the time taken for requests to complete will be longer. If the request handler idle percent is constantly below 0.2 (20%), it may indicate that your cluster is overloaded and requires more resources.
* Determine the number of leaders, partitions and zookeepers across each cluster and ensure they match with expectations

<img src={useBaseUrl('img/integrations/containers-orchestration/kafka-cluster-overview.png')} alt="Kafka dashboards" />


### Kafka - Outlier Analysis

The **Kafka - Outlier Analysis** dashboard helps you identify outliers for key metrics across your Kafka clusters.

Use this dashboard to:
* To analyze trends, and quickly discover outliers across key metrics of your Kafka clusters

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Outlier-Analysis.png')} alt="Kafka dashboards" />


### Kafka - Replication

The Kafka - Replication dashboard helps you understand the state of replicas in your Kafka clusters.

Use this dashboard to monitor the following key metrics:
* In-Sync Replicas (ISR) Expand Rate - The ISR Expand Rate metric displays the one-minute rate of increases in the number of In-Sync Replicas (ISR). ISR expansions occur when a broker comes online, such as when recovering from a failure or adding a new node. This increases the number of in-sync replicas available for each partition on that broker.The expected value for this rate is normally zero.
* In-Sync Replicas (ISR) Shrink Rate - The ISR Shrink Rate metric displays the one-minute rate of decreases in the number of In-Sync Replicas (ISR). ISR shrinks occur when an in-sync broker goes down, as it decreases the number of in-sync replicas available for each partition replica on that broker.The expected value for this rate is normally zero.
    * ISR Shrink Vs Expand Rate - If you see a Spike in ISR Shrink followed by ISR Expand Rate - this may be because of nodes that have fallen behind replication and they may have either recovered or are in the process of recovering now.
    * Failed ISR Updates
    * Under Replicated Partitions Count
    * Under Min ISR Partitions Count -The Under Min ISR Partitions metric displays the number of partitions, where the number of In-Sync Replicas (ISR) is less than the minimum number of in-sync replicas specified. The two most common causes of under-min ISR partitions are that one or more brokers are unresponsive, or the cluster is experiencing performance issues and one or more brokers are falling behind.
* The expected value for this rate is normally zero.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Replication.png')} alt="Kafka dashboards" />


### Kafka - Zookeeper

The **Kafka -Zookeeper** dashboard provides an at-a-glance view of the state of your partitions, active controllers, leaders, throughput and network across Kafka brokers and clusters.

Use this dashboard to monitor key Zookeeper metrics such as:
* **Zookeeper disconnect rate** - This metric indicates if a Zookeeper node has lostits connection to a Kafka broker.
* **Authentication Failures** - This metric indicates a Kafka Broker is unable to connect to its Zookeeper node.
* **Session Expiration **- When a Kafka broker - Zookeeper node session expires, leader changes can occur and the broker can be assigned a new controller. If this metric is increasing we recommend you:
    1. Check the health of your network.
    2. Check for garbage collection issues and tune your JVMs accordingly.
* Connection Rate.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Zookeeper.png')} alt="Kafka dashboards" />

### Kafka - Broker

The Kafka - Broker dashboard provides an at-a-glance view of the state of your partitions, active controllers, leaders, throughput, and network across Kafka brokers and clusters.

Use this dashboard to:
* Monitor Under Replicaed and offline partitions to quickly identify if a Kafka broker is down or over utilized.
* Monitor Unclean Leader Election count metrics - this metric shows the number of failures to elect a suitable leader per second. Unclean leader elections are caused when there are no available in-sync replicas for a partition (either due to network issues, lag causing the broker to fall behind, or brokers going down completely), so an out of sync replica is the only option for the leader. When an out of sync replica is elected leader, all data not replicated from the previous leader is lost forever.
* Monitor producer and fetch request rates.
* Monitor Log flush rate to determine the rate at which log data is written to disk

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker.png')} alt="Kafka dashboards" />


### Kafka - Failures and Delayed Operations

The **Kafka - Failures and Delayed Operations **dashboard gives you insight into all failures and delayed operations associated with your Kafka clusters.

Use this dashboard to:
* Analyze failed produce requests -  A failed produce request occurs when a problem is encountered when processing a produce request. This could be for a variety of reasons, however some common reasons are:
    * The destination topic doesn’t exist (if auto-create is enabled then subsequent messages should be sent successfully).
    * The message is too large.
    * The producer is using _request.required.acks=all_ or –_1_, and fewer than the required number of acknowledgements are received.
* Analyze failed Fetch Request -  A failed fetch request occurs when a problem is encountered when processing a fetch request. This could be for a variety of reasons, but the most common cause is consumer requests timing out.
* Monitor delayed Operations metrics -  This contains metrics regarding the number of requests that are delayed and waiting in purgatory. The purgatory size metric can be used to determine the root cause of latency. For example, increased consumer fetch times could be explained by an increased number of fetch requests waiting in purgatory. Available metrics are:
    * Fetch Purgatory Size - The Fetch Purgatory Size metric shows the number of fetch requests currently waiting in purgatory. Fetch requests are added to purgatory if there is not enough data to fulfil the request (determined by fetch.min.bytes in the consumer configuration) and the requests wait in purgatory until the time specified by fetch.wait.max.ms is reached, or enough data becomes available.
    * Produce Purgatory Size - The Produce Purgatory Size metric shows the number of produce requests currently waiting in purgatory. Produce requests are added to purgatory if request.required.acks is set to -1 or all, and the requests wait in purgatory until the partition leader receives an acknowledgement from all its followers. If the purgatory size metric keeps growing, some partition replicas may be overloaded. If this is the case, you can choose to increase the capacity of your cluster, or decrease the amount of produce requests being generated.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Failures-Delayed-Operations.png')} alt="Kafka dashboards" />


### Kafka - Request-Response Times

The **Kafka - Request-Response** **Times** dashboard helps you get insight into key request and response latencies of your Kafka cluster.

Use this dashboard to:
* Monitor request time metrics - The Request Metrics metric group contains information regarding different types of request to and from the cluster. Important request metrics to monitor:
    1. **Fetch Consumer Request Total Time **- The Fetch Consumer Request Total Time metric shows the maximum and mean amount of time taken for processing, and the number of requests from consumers to get new data. Reasons for increased time taken could be: increased load on the node (creating processing delays), or perhaps requests are being held in purgatory for a long time (determined by fetch.min.bytes and fetch.wait.max.ms metrics).
    2. **Fetch Follower Request Total Time** - The Fetch Follower Request Total Time metric displays the maximum and mean amount of time taken while processing, and the number of requests to get new data from Kafka brokers that are followers of a partition. Common causes of increased time taken are increased load on the node causing delays in processing requests, or that some partition replicas may be overloaded or temporarily unavailable.
    3. **Produce Request Total Time **- The Produce Request Total Time metric displays the maximum and mean amount of time taken for processing, and the number of requests from producers to send data. Some reasons for increased time taken could be: increased load on the node causing delays in processing the requests, or perhaps requests are being held in purgatory for a long time (if the `requests.required.acks` metrics is equal to '1' or all).

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Request-Response-Times.png')} alt="Kafka dashboards" />

### Kafka - Logs

This dashboard helps you quickly analyze your Kafka error logs across all clusters.

Use this dashboard to:
* Identify critical events in your Kafka broker and controller logs;
* Examine trends to detect spikes in Error or Fatal events
* Monitor Broker added/started and shutdown events in your cluster.
* Quickly determine patterns across all logs in a given Kafka cluster.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Logs.png')} alt="Kafka dashboards" />

### Kafka Broker - Performance Overview

The **Kafka Broker - Performance Overview** dashboards helps you Get an at-a-glance view of the performance and resource utilization of your Kafka brokers and their JVMs.

Use this dashboard to:
* Monitor the number of open file descriptors. If the number of open file descriptors reaches the maximum file descriptor, it can cause an IOException error
* Get insight into Garbage collection and its impact on CPU usage and memory
* Examine how threads are distributed
* Understand the behavior of class count. If class count keeps on increasing, you may have a problem with the same classes loaded by multiple classloaders.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Performance-Overview.png')} alt="Kafka dashboards" />

### Kafka Broker - CPU

The **Kafka Broker - CPU** dashboard shows information about the CPU utilization of individual Broker machines.

Use this dashboard to:
* Get insights into the process and user CPU load of Kafka brokers. High CPU utilization can make Kafka flaky and can cause read/write timeouts.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-CPU.png')} alt="Kafka dashboards" />

### Kafka Broker - Memory

The **Kafka Broker - Memory** dashboard shows the percentage of the heap and non-heap memory used, physical and swap memory usage of your Kafka broker’s JVM.

Use this dashboard to:
* Understand how memory is used across Heap and Non-Heap memory.
* Examine physical and swap memory usage and make resource adjustments as needed.
* Examine the pending object finalization count which when high can lead to excessive memory usage.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Memory.png')} alt="Kafka dashboards" />


### Kafka Broker - Disk Usage

The **Kafka Broker - Disk Usage** dashboard helps monitor disk usage across your Kafka Brokers.

Use this dashboard to:
* Monitor Disk Usage percentage on Kafka Brokers. This is critical as Kafka brokers use disk space to store messages for each topic. Other factors that affect disk utilization are:
    1. Topic replication factor of Kafka topics.
    2. Log retention settings.
* Analyze trends in disk throughput and find any spikes. This is especially important as disk throughput can be a performance bottleneck.
* Monitor iNodes bytes used, and disk read vs writes. These metrics are important to monitor as Kafka may not necessarily distribute data from a heavily occupied disk, which itself can bring the Kafka down.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Disk-Usage.png')} alt="Kafka dashboards" />

### Kafka Broker - Garbage Collection

The **Kafka Broker - Garbage Collection** dashboard shows key Garbage Collector statistics like the duration of the last GC run, objects collected, threads used, and memory cleared in the last GC run of your java virtual machine.

Use this dashboard to:
* Understand the amount of time spent in garbage collection. If this time keeps increasing, your Kafka brokers may have more CPU usage.
* Understand the amount of memory cleared by garbage collectors across memory pools and their impact on the Heap memory.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Garbage-Collection.png')} alt="Kafka dashboards" />


### Kafka Broker - Threads

The **Kafka Broker - Threads** dashboard shows the key insights into the usage and type of threads created in your Kafka broker JVM

Use this dashboard to:
* Understand the dynamic behavior of the system using peak, daemon, and current threads.
* Gain insights into the memory and CPU time of the last executed thread.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Threads.png')} alt="Kafka dashboards" />

### Kafka Broker - Class Loading and Compilation

The **Kafka Broker - Class Loading and Compilation** dashboard helps you get insights into the behavior of class count trends.

Use this dashboard to:

* Determine If the class count keeps increasing, this indicates that the same classes are loaded by multiple classloaders.
* Get insights into time spent by Java Virtual machines during compilation.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Broker-Class-Loading-Compilation.png')} alt="Kafka dashboards" />


### Kafka - Topic Overview

The Kafka - Topic Overview dashboard helps you quickly identify under-replicated partitions, and incoming bytes by Kafka topic, server and cluster.

Use this dashboard to:

* Monitor under replicated partitions - The Under Replicated Partitions metric displays the number of partitions that do not have enough replicas to meet the desired replication factor. A partition will also be considered under-replicated if the correct number of replicas exist, but one or more of the replicas have fallen significantly behind the partition leader. The two most common causes of under-replicated partitions are that one or more brokers are unresponsive, or the cluster is experiencing performance issues and one or more brokers have fallen behind.

    This metric is tagged with cluster, server, and topic info for easy troubleshooting.  The colors in the Honeycomb chart are coded as follows:

1. Green indicates there are no under Replicated Partitions.
2. Red indicates a given partition is under replicated.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Topic-Overview.png')} alt="Kafka dashboards" />



### Kafka - Topic Details

The Kafka - Topic Details dashboard gives you insight into throughput, partition sizes and offsets  across Kafka brokers, topics and clusters.

Use this dashboard to:
* Monitor metrics like Log partition size, log start offset, and log segment count metrics.
* Identify offline/under replicated partitions count. Partitions can be in this state on account of resource shortages or broker unavailability.
* Monitor the In Sync replica (ISR) Shrink rate. ISR shrinks occur when an in-sync broker goes down, as it decreases the number of in-sync replicas available for each partition replica on that broker.
* Monitor In Sync replica (ISR) Expand rate. ISR expansions occur when a broker comes online, such as when recovering from a failure or adding a new node. This increases the number of in-sync replicas available for each partition on that broker.

<img src={useBaseUrl('img/integrations/containers-orchestration/Kafka-Topic-Details.png')} alt="Kafka dashboards" />


## Kafka Alerts

| Alert Name                                  | Alert Description and conditions                                                                                                                        | Alert Condition | Recover Condition |
|:---------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|:-------------------|
| Kafka - High CPU on Broker node             | This alert fires when we detect that the average CPU utilization for a broker node is high (>=85%) for an interval of 5 minutes.                        |                 |                   |
| Kafka - High Broker Disk Utilization        | This alert fires when we detect that a disk on a broker node is more than 85% full.                                                                     | >=85            | < 85              |
| Kafka - Garbage collection                  | This alert fires when we detect that the average Garbage Collection time on a given Kafka broker node over a 5 minute interval is more than one second. | > = 1           | < 1               |
| Kafka - High Broker Memory Utilization      | This alert fires when the average memory utilization within a 5 minute interval for a given Kafka node is high (>=85%).                                 | >= 85           | < 85              |
| Kafka - Large number of broker errors       | This alert fires when we detect that there are 5 or more errors on a Broker node within a time interval of 5 minutes.                                   |                 |                   |
| Kafka - Large number of broker warnings     | This alert fires when we detect that there are 5 or more warnings on a Broker node within a time interval of 5 minutes.                                 |                 |                   |
| Kafka - Out of Sync Followers               |                                                                                                                                                         |                 |                   |
| Kafka - Unavailable Replicas                | This alert when we detect that there are replicas that are unavailable.                                                                                 |                 |                   |
| Kafka - Consumer Lag                        | This alert fires when we detect that a Kafka consumer has a 30 minutes and increasing lag                                                               |                 |                   |
| Kafka - Fatal Event on Broker               | This alert fires when we detect a fatal operation on a Kafka broker node                                                                                | >=1             | <1                |
| Kafka - Multiple Errors on Broker           | This alert fires when we detect five or more errors on a Kafka broker node in a 5 minute interval.                                                      | >=5             | <5                |
| Kafka - Underreplicated Partitions          | This alert fires when we detect underreplicated partitions on a given Kafka broker.                                                                     |                 |                   |
| Kafka - Offline Partitions                  | This alert fires when we detect offline partitions on a given Kafka broker.                                                                             |                 |                   |
| Kafka - High Leader election rate           | This alert fires when we detect high leader election rate.                                                                                              |                 |                   |
| Kafka - Failed Zookeeper connections        | This alert fires when we detect Broker to Zookeeper connection failures                                                                                 |                 |                   |
| Kafka - Replica Lag                         | This alert fires when we detect that a Kafka replica has a lag of over 30 minutes                                                                       |                 |                   |
| Kafka - Lower Producer-Consumer buffer time | This alert fires when we detect that there is only one hour of time remaining between earliest offset and consumer position.                            |                 |                   |


## Kafka Metrics

Here's a list of available Kafka metrics.

<table><small>
  <tr>
   <td>kafka_broker_disk_free
   </td>
   <td>kafka_replica_manager_FailedIsrUpdatesPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_broker_disk_inodes_total
   </td>
   <td>kafka_replica_manager_FailedIsrUpdatesPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_disk_inodes_used
   </td>
   <td>kafka_replica_manager_FailedIsrUpdatesPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_disk_total
   </td>
   <td>kafka_replica_manager_IsrExpandsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_disk_used_percent
   </td>
   <td>kafka_replica_manager_IsrExpandsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_io_time
   </td>
   <td>kafka_replica_manager_IsrExpandsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_iops_in_progress
   </td>
   <td>kafka_replica_manager_IsrShrinksPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_merged_reads
   </td>
   <td>kafka_replica_manager_LeaderCount_Value
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_merged_writes
   </td>
   <td>kafka_replica_manager_PartitionCount_Value
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_read_bytes
   </td>
   <td>kafka_replica_manager_ReassigningPartitions_Value
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_read_time
   </td>
   <td>kafka_replica_manager_UnderMinIsrPartitionCount_Value
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_reads
   </td>
   <td>kafka_replica_manager_UnderReplicatedPartitions_Value
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_weighted_io_time
   </td>
   <td>kafka_request_handlers_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_write_bytes
   </td>
   <td>kafka_request_LocalTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_write_time
   </td>
   <td>kafka_request_LocalTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_broker_diskio_writes
   </td>
   <td>kafka_request_LocalTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ActiveControllerCount_Value
   </td>
   <td>kafka_request_LocalTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_LocalTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_LocalTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_LocalTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_LocalTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_Count
   </td>
   <td>kafka_request_LocalTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_LocalTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_Max
   </td>
   <td>kafka_request_LocalTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_Mean
   </td>
   <td>kafka_request_MessageConversionsTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_Min
   </td>
   <td>kafka_request_MessageConversionsTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_AutoLeaderBalanceRateAndTimeMs_StdDev
   </td>
   <td>kafka_request_MessageConversionsTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControlledShutdownRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_MessageConversionsTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControlledShutdownRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_MessageConversionsTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControlledShutdownRateAndTimeMs_Min
   </td>
   <td>kafka_request_MessageConversionsTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_MessageConversionsTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_MessageConversionsTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_RemoteTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_RemoteTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_Max
   </td>
   <td>kafka_request_RemoteTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_MeanRate
   </td>
   <td>kafka_request_RemoteTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerChangeRateAndTimeMs_StdDev
   </td>
   <td>kafka_request_RemoteTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_RemoteTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_RemoteTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_RemoteTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_Count
   </td>
   <td>kafka_request_RemoteTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_RemoteTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_Min
   </td>
   <td>kafka_request_RemoteTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ControllerShutdownRateAndTimeMs_StdDev
   </td>
   <td>kafka_request_RequestBytes_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_EventQueueSize_Value
   </td>
   <td>kafka_request_RequestBytes_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_EventQueueTimeMs_95thPercentile
   </td>
   <td>kafka_request_RequestBytes_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_EventQueueTimeMs_98thPercentile
   </td>
   <td>kafka_request_RequestBytes_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_EventQueueTimeMs_999thPercentile
   </td>
   <td>kafka_request_RequestBytes_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_EventQueueTimeMs_Min
   </td>
   <td>kafka_request_RequestBytes_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_GlobalPartitionCount_Value
   </td>
   <td>kafka_request_RequestBytes_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_GlobalTopicCount_Value
   </td>
   <td>kafka_request_RequestBytes_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_RequestBytes_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_RequestBytes_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_request_RequestBytes_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_RequestQueueTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_RequestQueueTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_Count
   </td>
   <td>kafka_request_RequestQueueTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_RequestQueueTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_IsrChangeRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_RequestQueueTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_RequestQueueTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_request_RequestQueueTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_RequestQueueTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_MeanRate
   </td>
   <td>kafka_request_RequestQueueTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_Min
   </td>
   <td>kafka_request_RequestQueueTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderAndIsrResponseReceivedRateAndTimeMs_OneMinuteRate
   </td>
   <td>kafka_request_RequestQueueTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderElectionRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_request_ResponseQueueTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderElectionRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_request_ResponseQueueTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderElectionRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_ResponseQueueTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderElectionRateAndTimeMs_Max
   </td>
   <td>kafka_request_ResponseQueueTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LeaderElectionRateAndTimeMs_Min
   </td>
   <td>kafka_request_ResponseQueueTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_ResponseQueueTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_request_ResponseQueueTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_request_ResponseQueueTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_Mean
   </td>
   <td>kafka_request_ResponseQueueTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_Min
   </td>
   <td>kafka_request_ResponseQueueTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ListPartitionReassignmentRateAndTimeMs_OneMinuteRate
   </td>
   <td>kafka_request_ResponseQueueTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LogDirChangeRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LogDirChangeRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LogDirChangeRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LogDirChangeRateAndTimeMs_Count
   </td>
   <td>kafka_request_ResponseSendTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_LogDirChangeRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_ResponseSendTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_request_ResponseSendTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_ResponseSendTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_Mean
   </td>
   <td>kafka_request_ResponseSendTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_Min
   </td>
   <td>kafka_request_TemporaryMemoryBytes_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ManualLeaderBalanceRateAndTimeMs_OneMinuteRate
   </td>
   <td>kafka_request_TemporaryMemoryBytes_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_request_TemporaryMemoryBytes_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_TemporaryMemoryBytes_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_TemporaryMemoryBytes_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_request_TemporaryMemoryBytes_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_TemporaryMemoryBytes_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_Count
   </td>
   <td>kafka_request_TemporaryMemoryBytes_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_ThrottleTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_Max
   </td>
   <td>kafka_request_ThrottleTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_Mean
   </td>
   <td>kafka_request_ThrottleTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_MeanRate
   </td>
   <td>kafka_request_ThrottleTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PartitionReassignmentRateAndTimeMs_OneMinuteRate
   </td>
   <td>kafka_request_ThrottleTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_PreferredReplicaImbalanceCount_Value
   </td>
   <td>kafka_request_ThrottleTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_ReplicasIneligibleToDeleteCount_Value
   </td>
   <td>kafka_request_ThrottleTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_99thPercentile
   </td>
   <td>kafka_request_ThrottleTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_Count
   </td>
   <td>kafka_request_ThrottleTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_request_ThrottleTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_Mean
   </td>
   <td>kafka_request_ThrottleTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_MeanRate
   </td>
   <td>kafka_request_TotalTimeMs_50thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_Min
   </td>
   <td>kafka_request_TotalTimeMs_75thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicChangeRateAndTimeMs_StdDev
   </td>
   <td>kafka_request_TotalTimeMs_95thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_request_TotalTimeMs_98thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_request_TotalTimeMs_999thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_request_TotalTimeMs_99thPercentile
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_Count
   </td>
   <td>kafka_request_TotalTimeMs_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_request_TotalTimeMs_Max
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_Max
   </td>
   <td>kafka_request_TotalTimeMs_Mean
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicDeletionRateAndTimeMs_OneMinuteRate
   </td>
   <td>kafka_request_TotalTimeMs_Min
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicsToDeleteCount_Value
   </td>
   <td>kafka_request_TotalTimeMs_StdDev
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicUncleanLeaderElectionEnableRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_topic_BytesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicUncleanLeaderElectionEnableRateAndTimeMs_999thPercentile
   </td>
   <td>kafka_topic_BytesInPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicUncleanLeaderElectionEnableRateAndTimeMs_Count
   </td>
   <td>kafka_topic_BytesInPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TopicUncleanLeaderElectionEnableRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_topic_BytesInPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_TotalQueueSize_Value
   </td>
   <td>kafka_topic_BytesOutPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_50thPercentile
   </td>
   <td>kafka_topic_BytesOutPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_75thPercentile
   </td>
   <td>kafka_topic_MessagesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_95thPercentile
   </td>
   <td>kafka_topic_TotalFetchRequestsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_98thPercentile
   </td>
   <td>kafka_topic_TotalFetchRequestsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_Count
   </td>
   <td>kafka_topic_TotalFetchRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_FifteenMinuteRate
   </td>
   <td>kafka_topic_TotalFetchRequestsPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_FiveMinuteRate
   </td>
   <td>kafka_topic_TotalProduceRequestsPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_MeanRate
   </td>
   <td>kafka_topic_TotalProduceRequestsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionEnableRateAndTimeMs_Min
   </td>
   <td>kafka_topic_TotalProduceRequestsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UncleanLeaderElectionsPerSec_FifteenMinuteRate
   </td>
   <td>kafka_topic_TotalProduceRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UpdateFeaturesRateAndTimeMs_MeanRate
   </td>
   <td>kafka_topics_BytesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_controller_UpdateFeaturesRateAndTimeMs_StdDev
   </td>
   <td>kafka_topics_BytesInPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_CollectionCount
   </td>
   <td>kafka_topics_BytesInPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_CollectionTime
   </td>
   <td>kafka_topics_BytesInPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_endTime
   </td>
   <td>kafka_topics_BytesOutPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_GcThreadCount
   </td>
   <td>kafka_topics_BytesOutPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_id
   </td>
   <td>kafka_topics_BytesRejectedPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_Code_Cache_max
   </td>
   <td>kafka_topics_BytesRejectedPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_Code_Cache_used
   </td>
   <td>kafka_topics_BytesRejectedPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_CodeHeap__non_nmethods__init
   </td>
   <td>kafka_topics_FailedFetchRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_CodeHeap__non_profiled_nmethods__used
   </td>
   <td>kafka_topics_FailedProduceRequestsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_Compressed_Class_Space_init
   </td>
   <td>kafka_topics_FailedProduceRequestsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Eden_Space_committed
   </td>
   <td>kafka_topics_FailedProduceRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Eden_Space_init
   </td>
   <td>kafka_topics_FailedProduceRequestsPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Eden_Space_max
   </td>
   <td>kafka_topics_InvalidMagicNumberRecordsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Old_Gen_committed
   </td>
   <td>kafka_topics_InvalidMagicNumberRecordsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Old_Gen_used
   </td>
   <td>kafka_topics_InvalidMagicNumberRecordsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Survivor_Space_init
   </td>
   <td>kafka_topics_InvalidMessageCrcRecordsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageAfterGc_G1_Survivor_Space_used
   </td>
   <td>kafka_topics_InvalidOffsetOrSequenceRecordsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_Code_Cache_init
   </td>
   <td>kafka_topics_InvalidOffsetOrSequenceRecordsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_Code_Cache_max
   </td>
   <td>kafka_topics_InvalidOffsetOrSequenceRecordsPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_CodeHeap__non_nmethods__committed
   </td>
   <td>kafka_topics_MessagesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_CodeHeap__profiled_nmethods__used
   </td>
   <td>kafka_topics_MessagesInPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_Compressed_Class_Space_used
   </td>
   <td>kafka_topics_MessagesInPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Eden_Space_committed
   </td>
   <td>kafka_topics_NoKeyCompactedTopicRecordsPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Eden_Space_init
   </td>
   <td>kafka_topics_NoKeyCompactedTopicRecordsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Eden_Space_max
   </td>
   <td>kafka_topics_NoKeyCompactedTopicRecordsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Old_Gen_committed
   </td>
   <td>kafka_topics_NoKeyCompactedTopicRecordsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Old_Gen_init
   </td>
   <td>kafka_topics_ProduceMessageConversionsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Old_Gen_used
   </td>
   <td>kafka_topics_ProduceMessageConversionsPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_G1_Survivor_Space_max
   </td>
   <td>kafka_topics_ReassignmentBytesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_memoryUsageBeforeGc_Metaspace_used
   </td>
   <td>kafka_topics_ReassignmentBytesInPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_GarbageCollector_LastGcInfo_startTime
   </td>
   <td>kafka_topics_ReassignmentBytesInPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Memory_HeapMemoryUsage_committed
   </td>
   <td>kafka_topics_ReassignmentBytesInPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Memory_HeapMemoryUsage_init
   </td>
   <td>kafka_topics_ReassignmentBytesInPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Memory_HeapMemoryUsage_used
   </td>
   <td>kafka_topics_ReassignmentBytesOutPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_CollectionUsage_committed
   </td>
   <td>kafka_topics_ReassignmentBytesOutPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_CollectionUsage_init
   </td>
   <td>kafka_topics_ReassignmentBytesOutPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_CollectionUsage_max
   </td>
   <td>kafka_topics_ReassignmentBytesOutPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_CollectionUsage_used
   </td>
   <td>kafka_topics_ReplicationBytesInPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_CollectionUsageThresholdSupported
   </td>
   <td>kafka_topics_ReplicationBytesInPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_PeakUsage_committed
   </td>
   <td>kafka_topics_ReplicationBytesOutPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_PeakUsage_init
   </td>
   <td>kafka_topics_ReplicationBytesOutPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_PeakUsage_max
   </td>
   <td>kafka_topics_ReplicationBytesOutPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_PeakUsage_used
   </td>
   <td>kafka_topics_ReplicationBytesOutPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_Usage_committed
   </td>
   <td>kafka_topics_TotalFetchRequestsPerSec_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_Usage_init
   </td>
   <td>kafka_topics_TotalFetchRequestsPerSec_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_Usage_max
   </td>
   <td>kafka_topics_TotalFetchRequestsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_Usage_used
   </td>
   <td>kafka_topics_TotalFetchRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_MemoryPool_UsageThresholdSupported
   </td>
   <td>kafka_topics_TotalProduceRequestsPerSec_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_OperatingSystem_CommittedVirtualMemorySize
   </td>
   <td>kafka_topics_TotalProduceRequestsPerSec_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_OperatingSystem_FreePhysicalMemorySize
   </td>
   <td>kafka_topics_TotalProduceRequestsPerSec_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_OperatingSystem_MaxFileDescriptorCount
   </td>
   <td>kafka_zookeeper_auth_failures_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_OperatingSystem_ProcessCpuTime
   </td>
   <td>kafka_zookeeper_auth_failures_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_OperatingSystem_TotalSwapSpaceSize
   </td>
   <td>kafka_zookeeper_authentications_Count
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Runtime_BootClassPathSupported
   </td>
   <td>kafka_zookeeper_authentications_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Threading_CurrentThreadCpuTime
   </td>
   <td>kafka_zookeeper_disconnects_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Threading_SynchronizerUsageSupported
   </td>
   <td>kafka_zookeeper_expires_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Threading_ThreadAllocatedMemoryEnabled
   </td>
   <td>kafka_zookeeper_expires_FiveMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Threading_ThreadAllocatedMemorySupported
   </td>
   <td>kafka_zookeeper_expires_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_java_lang_Threading_ThreadCpuTimeEnabled
   </td>
   <td>kafka_zookeeper_expires_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_network_ResponseQueueSizeValue
   </td>
   <td>kafka_zookeeper_readonly_connects_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_partition_LogEndOffset
   </td>
   <td>kafka_zookeeper_readonly_connects_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_partition_LogStartOffset
   </td>
   <td>kafka_zookeeper_sync_connects_FifteenMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_partition_NumLogSegments
   </td>
   <td>kafka_zookeeper_sync_connects_MeanRate
   </td>
  </tr>
  <tr>
   <td>kafka_partition_Size
   </td>
   <td>kafka_zookeeper_sync_connects_OneMinuteRate
   </td>
  </tr>
  <tr>
   <td>kafka_partition_UnderReplicatedPartitions
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_Heartbeat_NumDelayedOperations
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_Produce_NumDelayedOperations
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_Produce_PurgatorySize
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_Rebalance_NumDelayedOperations
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_topic_NumDelayedOperations
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>kafka_purgatory_topic_PurgatorySize
   </td>
   <td>
   </td>
  </tr></small>
</table>
