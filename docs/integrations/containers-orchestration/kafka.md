---
id: kafka
title: Sumo Logic App for Kafka
sidebar_label: Kafka
description: Kafka
---
This guide provides an overview of Kafka related features and technologies. In addition, it contains recommendations on best practices, tutorials for getting started, and troubleshooting information for common situations.

The Sumo Logic App for Kafka is a unified logs and metrics app. The app helps you to monitor the availability, performance, and resource utilization of Kafka messaging/streaming clusters. Pre-configured dashboards provide insights into the cluster status, throughput, broker operations, topics, replication, zookeepers, node resource utilization, and error logs.


## Collecting Logs and Metrics for Kafka

This section provides instructions for configuring log and metric collection for the Sumo Logic App for Kakfa.

This App has been tested with following Kafka versions:
* 2.6.0
* 2.7.0


### Collection Process Overview

Configuring log and metric collection for the Kafka App includes the following tasks:

* Step 1: Configure Fields in Sumo Logic.
* Step 2: Configure Collection for Kafka
    * [Collect Kafka Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Kafka_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Kafka Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Logs_and_Metrics_for_Kubernetes_environments).


### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Kafka in a  non-Kubernetes environment create the fields:
* component
* environment
* messaging_system
* messaging_cluster
* pod

If you are using Kafka in a Kubernetes environment create the fields:
* pod_labels_component
* pod_labels_environment
* pod_labels_messaging_system
* pod_labels_messaging_cluster


### Step 2: Configure Collection for Kafka

Sumo Logic supports collection of logs and metrics data from Kafka in both Kubernetes and non-Kubernetes environments.

Please click on the appropriate links below based on the environment where your Kafka clusters are hosted.

* [Collect Kafka Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Kafka_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect Kafka Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Logs_and_Metrics_for_Kubernetes_environments).


### For Non-Kubernetes environments

We use the Telegraf Operator for Kafka metric collection and the Sumo Logic Installed Collector for collecting Kafka logs. The diagram below illustrates the components of the Kafka collection in a non-Kubernetes environment. Telegraf runs on the same system as Kafka, and uses the Kafka Jolokia input plugin to obtain Kafka metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Kafka Logs are sent to Sumo Logic Local File Source on Installed Collector.

This section provides instructions for configuring metrics collection for the Sumo Logic App for Kafka. Follow the instructions documented below to set up metrics collection for a given Broker in your Kafka Cluster :


1. [Configure Metrics Collection](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Kafka_Logs_and_Metrics_for_Non-Kubernetes_environments#step-1-configure-collection-of-kafka-metrics)
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Download and setup Jolokia
    5. Configure the Jolokia Input Plugin
    6. Restart Telegraf
2. [Configure Logs Collection](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Kafka_Logs_and_Metrics_for_Non-Kubernetes_environments#step-2-configure-collection-of-kafka-logs-on-each-kafka-broker-n)
    7. Configure logging in Kafka
    8. Configure Sumo Logic Installed Collector


#### Step 1: Configure Collection of Kafka Metrics

1. Configure a Hosted Collector

    To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.

1. Configure an HTTP Logs and Metrics Source

    Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.

1. Install Telegraf

    Follow the steps in [this document ](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf on each Kafka Broker node

1. Download and setup Jolokia on each Kafka Broker node

    As part of collecting metrics data from Telegraf, we will use the [Jolokia input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.

* Download the latest version of the **Jolokia JVM-Agent** from [Jolokia](https://jolokia.org/download.html).
* Rename downloaded Jar file to jolokia-agent.jar
* Save the file jolokia-agent.jar on your kafka server in /opt/kafka/libs
* Configure Kafka to use Jolokia:
1. Add following to kafka-server-start.sh


```sh
export JMX_PORT=9999
export RMI_HOSTNAME=0.0.0.0
export KAFKA_JMX_OPTS="-javaagent:/opt/kafka/libs/jolokia.jar=port=8778,host=$RMI_HOSTNAME -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=$RMI_HOSTNAME -Dcom.sun.management.jmxremote.rmi.port=$JMX_PORT"

```



1. Restart Kafka Service
2. Verify that you can access jolokia on port 8778 using following command:

  ```curl
  curl http://KAFKA_SERVER_IP_ADDRESS:8778/jolokia/
  ```


1. Configure the Jolokia Input Plugin

    Create or modify the telegraf.conf file in /etc/telegraf/telegraf.d and copy and paste the text [from this file](https://sumologic-app-data.s3.amazonaws.com/Kafka/config_telegraf.conf).  


Please enter values for the following parameters (marked with CHANGE_ME) in the downloaded file:



* In the input plugins section which is [[inputs.jolokia2_agent]]:
    * **urls** - In the [[inputs.jolokia2_agent]] section. The URL to the Kafka server. This can be a comma-separated list to connect to multiple Kafka servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Jolokia input plugin for Telegraf.
    * In the tags sections (total 3) which is section[inputs.jolokia2_agent.tags], and [inputs.disk.tags]
        * **environment** - This is the deployment environment where the Kafka cluster identified by the value of **urls** parameter resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **messaging_cluster** - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.
* In the output plugins section
    * url - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration that we request you **please do not modify these values** as they will cause the Sumo Logic apps to not function correctly.



* **data_format** - “prometheus” In the output plugins section. In other words, this indicates that metrics should be sent in the Prometheus format to Sumo Logic.
* **Component**: “messaging” - In the input plugins section.In other words, this value is used by Sumo Logic apps to identify application components.
* **messaging_system**: “kafka” - In the input plugins sections.In other words, this value identifies the messaging system.
* **component**: “messaging” - In the input plugins sections. In other words, this value identifies application components.

Here is an example [telegraf.conf](https://sumologic-app-data.s3.amazonaws.com/Kafka/telegraf.conf+) file.

For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) for more properties that can be configured in the Telegraf agent globally.



1. Restart Telegraf

    Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from their [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).


At this point, Kafka metrics should start flowing into Sumo Logic.


#### Step 2: Configure Collection of Kafka Logs on each Kafka Broker node
7


This section provides instructions for configuring log collection for Kafka running on a non-Kubernetes environment for the Sumo Logic App for Kafka.

By default, Kafka logs are stored in a log file. Follow the instructions below to set up log collection:



1. Configure logging on each Kafka Broker Node
2. Configure an Installed Collector
3. Configure a Source

Perform the steps outlined below for each Kafka Broker node


#### Configure logging in Kafka


* By default Kafka logs (server.log and controller.log) are stored in the directory: `/opt/Kafka/kafka_<VERSION>/logs`

Make a note of above logs directory .


#### Configuring an Installed Collector

To add an Installed collector, perform the steps as defined on the page [Configure an Installed Collector.](https://help.sumologic.com/03Send-Data/Installed-Collectors)


#### Configuring a Source


**To add a Local File Source source for Kafka do the following**

1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) in the installed collector configured in the previous step.
2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your server.log and controller.log. The files are typically located in `/opt/Kafka/kafka_<VERSION>/logs/*.log`.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
* **Source Category.** Enter any string to tag the output collected from this Source, such as **Kafka/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. **Set the following fields. For more information on fields please see [this document](https://help.sumologic.com/Manage/Fields):
    * component = messaging
    * messaging_system = kafka
    * messaging_cluster = <Your_KAFKA_Cluster_Name>
    * environment = <Environment_Name>, such as Dev, QA or Prod.


12


1. Configure the **Advanced** section:
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your Kafka Server’s time zone.
* **Timestamp Format.** The timestamp format is automatically detected.
* **Encoding. **Select** **UTF-8 (Default).
* **Enable Multiline Processing.** Detect messages spanning multiple lines
    * Select Infer Boundaries - Detect message boundaries automatically
1. Click **Save**.

At this point, Kafka logs should start flowing into Sumo Logic.


#### Sample Log Messages


```
[2021-03-10 20:12:28,742] INFO [KafkaServer id=0] started (kafka.server.KafkaServer)
```


#### Query Sample

This sample Query is from the Logs panel of the Kafka - Logs dashboard.


#### Query String


```
messaging_cluster=* messaging_system="kafka" | json auto maxdepth 1 nodrop | if (isEmpty(log), _raw, log) as kafka_log_message | parse field=kafka_log_message "[*] * *" as date_time,severity,msg | where severity in ("ERROR", "FATAL") | count by date_time, severity, msg | sort by date_time | limit 10
```



### For Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture).The diagram below illustrates how data is collected from Kafka in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Kafka. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment. In other words, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Jolokia input plugin ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2)to obtain metrics, (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.
16


Follow the instructions below to set up the metric collection:

1. [Configure Metrics Collection](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Logs_and_Metrics_for_Kubernetes_environments#step-1-configure-metrics-collection)
    1. Setup Kubernetes Collection with the Telegraf operator.
    2. Add annotations on your Kafka pods.
    3. Configure your Kafka Pod to use the Jolokia Telegraf Input Plugin
2. [Configure Logs Collection](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka/Collect_Logs_and_Metrics_for_Kubernetes_environments#step-2-configure-logs-collection)
    4. Configure logging in Kafka.
    5. Add labels on your Kafka pods to capture logs from standard output.
    6. Collecting Kafka Logs from a Log file


#### Step 1 Configure Metrics Collection
17


Follow the steps below to collect metrics from a Kubernetes environment:



1. Setup Kubernetes Collection with the Telegraf operator. \
Please ensure that you are monitoring your Kubernetes clusters with the Telegraf operator **enabled** -  If you are not, then please follow [these instructions](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment) to do so.
2. Add annotations on your Kafka pods \
On your Kafka Pods, add the following annotations mentioned in this [file](https://sumologic-app-data.s3.amazonaws.com/Kafka/KAfka_PodAnnotations.yaml).

Please enter in values for the following parameters (marked with CHANGE_ME) in the downloaded file:



* telegraf.influxdata.com/inputs - As telegraf will be run as a sidecar the **urls** should always be localhost.
    * In the input plugins section :
        * **urls** - The URL to the Kafka server. As telegraf will be run as a sidecar the **urls** should always be localhost. This can be a comma-separated list to connect to multiple Kafka servers.
    * In the tags sections (total 3) Which are, , [inputs.jolokia2_agent.tags], and [inputs.disk.tags]:
        * **environment** - This is the deployment environment where the Kafka cluster identified by the value of servers resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **messaging_cluster** - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.

Here’s an explanation for additional values set by this configuration that we request you **please do not modify** these values as they will cause the Sumo Logic apps to not function correctly.



* telegraf.influxdata.com/class: sumologic-prometheus - This instructs the Telegraf operator what output to use. This should not be changed.
* prometheus.io/scrape: "true" - This ensures our Prometheus plugin will scrape the metrics.
* prometheus.io/port: "9273" - This tells Prometheus what ports to scrape metrics from. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags sections [inputs.jolokia2_agent/diskio/disk]
        * **component**: “messaging” - This value is used by Sumo Logic apps to identify application components.
        * **messaging_system**: “kafka” - This value identifies the database system.

For more information on all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

For more information on configuring the Joloka input plugin for Telegraf please see [this doc.](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2)



1. Configure your Kafka Pod to use the Jolokia Telegraf Input Plugin \
Jolokia agent needs to be available to the Kafka Pods. Starting Kubernetes 1.10.0, you can store a binary file in a [configMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap). This makes it very easy to load the Jolokia jar file, and make it available to your pods.
2. Download the latest version of the **Jolokia JVM-Agent** from [Jolokia](https://jolokia.org/download.html).
3. Rename the file to jolokia.jar
4. Create a configMap **jolokia** from the binary file


```
kubectl create configmap jolokia --from-file=jolokia.jar

```



1. Modify your Kafka Pod definition to include volume (type [ConfigMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap))  and volumeMounts.Finally, update the env (environment variable) to start Jolokia, and apply the updated Kafka pod definition.


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


**Verification Step: **You can ssh to Kafka pod and run following commands to make sure Telegraf (and Jolokia) is scraping metrics from your Kafka Pod:



* curl localhost:9273/metrics
* curl[ http://localhost:8778/jolokia/list](http://localhost:8778/jolokia/list)
* echo $KAFKA_OPTS. It should give you following result

    ```curl
    -javaagent:/opt/jolokia/jolokia.jar=port=8778,host=0.0.0.0
    ```


* Make sure jolokia.jar exists at /opt/jolokia/ directory of kafka pod.

This is an example  of a [Pod definition file](https://sumologic-app-data.s3.amazonaws.com/Kafka/Kafka_Pod_annotations_Labels_MountVolume.yaml) looks like.

Once this has been done, the Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step. Verify metrics are flowing into Sumo Logic by running the following metrics query:


```bash
component="messaging" and messaging_system="kafka"
```



#### Step 2 Configure Logs Collection
18


This section explains the steps to collect Kafka logs from a Kubernetes environment.


##### Collect Kafka logs written to standard output
19


If your Kafka helm chart/pod is writing the logs to standard output then follow the steps listed below to collect the logs:



1. Apply the following labels to your Kafka pods: \
 labels: \
    environment: "**prod-CHANGE_ME**" \
    component: "messaging" \
    messaging_system: "kafka" \
    messaging_cluster: "**kafka_prod_cluster01-CHANGE_ME**”

    Please enter in values for the following parameters (marked in bold and CHANGE_ME above):

* **environment** - This is the deployment environment where the Kafka cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* **messaging_cluster** - Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* component: “messaging” - This value is used by Sumo Logic apps to identify application components.
* messaging_system: “kafka” - This value identifies the messaging system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.


The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, please see[ this page](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App).


#### Collect Kafka logs written to log files (Optional)
20


If your Kafka helm chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:



1. Determine the location of the Kafka log file on Kubernetes. This can be determined from helm chart configurations.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.

    annotations:


      `tailing-sidecar: sidecarconfig;<mount>:<path_of_kafka_log_file>/<kafka_log_file_name>`


    Example:


    annotations:


      `tailing-sidecar: sidecarconfig;data:/opt/Kafka/kafka_<VERSION>/logs/server.log`

1. Make sure that the Kafka pods are running and annotations are applied by using the command: `kubectl describe pod <Kafka_pod_name>`
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.


#### Add an FER to normalize the fields in Kubernetes environments
21


Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Messaging Application Components. To do so:



1. Go to **Manage Data** > **Logs** > **Field Extraction Rules**.
2. Click the **+ Add** button on the top right of the table.
3. The following form appears:


22




1. Enter the following options:
* **Rule Name**. Enter the name as **App Component Observability - Messaging.**
* **Applied At**. Choose Ingest Time
* **Scope**. Select Specific Data
    * Scope: Enter the following keyword search expression:


```
pod_labels_environment=* pod_labels_component=messaging
pod_labels_messaging_system=kafka pod_labels_messaging_cluster=*

```



* **Parse Expression**.Enter the following parse expression:


```
if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
| pod_labels_component as component
| pod_labels_messaging_system as messaging_system
| pod_labels_messaging_cluster as messaging_cluster

```



1. Click **Save** to create the rule.
2. Verify logs are flowing into Sumo Logic by running the following logs query:

`component="messaging" and messaging_system="kafka"`


#### Sample Log Messages


```
{"timestamp":1617392000686,"log":"[2021-04-02 19:33:20,598] INFO [KafkaServer id=0] started (kafka.server.KafkaServer)","stream":"stdout","time":"2021-04-02T19:33:20.599066311Z"}
```



#### Query Sample


This sample Query is from the Logs panel of the Kafka - Logs dashboard.


#### Query String

```sql
messaging_cluster=* messaging_system="kafka" | json auto maxdepth 1 nodrop | if (isEmpty(log), _raw, log) as kafka_log_message | parse field=kafka_log_message "[*] * *" as date_time,severity,msg | where severity in ("ERROR", "FATAL") | count by date_time, severity, msg | sort by date_time | limit 10

```


## Installing the Kafka App, Alerts, and view the Dashboards

This page has instructions for installing the Sumo App and Alerts for Kafka and descriptions of each of the app dashboards. These instructions assume you have already set up the collection as described in the [Collect Logs and Metrics for Kafka](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Collect_Logs_and_Metrics_for_Kafka) App page.

### Pre-Packaged Alerts

Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you quickly determine if the Kafka cluster is available and performing as expected. These alerts are built based on metrics datasets and have preset thresholds based on industry best practices and recommendations.

For details on the individual alerts, see [this page](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kafka/Kafka_Alerts).


### Installing Alerts

* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing a JSON or a Terraform script.
* Note: There are limits to how many alerts can be enabled - please see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ) for details.


#### Method 1: Install the alerts by importing a JSON file:

1. Download a[ JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/kubernetes/kubernetes.json) that describes the monitors.
    1. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Kafka/Kafka_Alerts.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all Kafka clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `'messaging_system=kafka `with `'<Your Custom Filter>`.  

    Custom filter examples:

1. For alerts applicable only to a specific cluster, your custom filter would be:  `messaging_cluster=Kafka-prod.01`
2. For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be: `messaging_cluster=Kafka-prod*`
3. **For alerts applicable to a specific cluster within a production environment, your custom filter would be: `messaging_cluster=Kafka-1`** and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)
1. Go to Manage Data > Alerts > Monitors.
2. Click **Add**:



1. Click Import to import monitors from the JSON above.


30
The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Kafka folder under Monitors to configure them. See [this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors., To send notifications to teams or connections please see the instructions detailed in Step 4 of this [document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


#### Method 2: Install the alerts using a Terraform script

**Step 1: Generate a Sumo Logic access key and ID**

Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Please identify which deployment your Sumo Logic account is in, using this[ link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).

**Step 2:[ Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later **

**Step 3: Download the Sumo Logic Terraform package for Kafka alerts**

The alerts package is available in the Sumo Logic github[ repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/Kafka). You can either download it through the “git clone” command or as a zip file.

**Step 4: Alert Configuratio **

After the package has been extracted, navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/Kafka`

Edit the `monitor.auto.tfvars` file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1 .


```bash
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```

The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable **’kafka_data_source’**. Custom filter examples:

1. For alerts applicable only to a specific cluster, your custom filter would be: `messaging_cluster=Kafka-prod.01`
2. For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be**:** `messaging_cluster=Kafka-prod*`
3. For alerts applicable to a specific cluster within a production environment, your custom filter would be**: `messaging_cluster=Kafka-1`** and `environment=prod`  \
(This assumes you have set the optional environment tag while configuring collection)

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter `monitors_disabled` to false in this file.

By default, the monitors are configured in a monitor folder called “Kafka”, if you would like to change the name of the folder, update the monitor folder name in this file.

If you would like the alerts to send email or connection notifications, configure these in the file `notifications.auto.tfvars`. For configuration examples, refer to the next section.

**Step 5: Email and Connection Notification Configuration Examples**

**To configure notifications, m**odify the file `notifications.auto.tfvars` file and fill in the connection_notifications and email_notifications sections. See the examples for PagerDuty and email notifications below. See [this document](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections) for creating payloads with other connection types.

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


**Step 6: Install the Alerts**

1. Navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/Kafka/` and run terraform init. This will initialize Terraform and will download the required components.
2. Run terraform plan to view the monitors which will be created/modified by Terraform.
3. Run terraform apply.

Step 7: Post Installation

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. This is detailed in Step 4 of[ this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


### Installing the App

This section demonstrates how to install the Kafka App.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


36
Version selection is applicable only to a few apps currently. For more information, see the[ Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**
        * Choose **Enter a Custom Data Filter**, and enter a custom Kafka cluster filter. Examples:
            1. For all Kafka clusters \
`messaging_cluster=*`
            2. For a specific cluster: \
`messaging_cluster=Kafka.dev.01`. 
            3. Clusters within a specific environment: \
`messaging_cluster=Kafka-1 and environment=prod`  \
(This assumes you have set the optional environment tag while configuring collection)
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


### Viewing the Dashboards

#### Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the Filter with template variables help page.


#### Kafka - Cluster Overview

The **Kafka - Cluster Overview** dashboard gives you an at-a-glance view of your Kafka deployment across brokers, controllers, topics, partitions and zookeepers.

Use this dashboard to:
* Identify when brokers don’t have active controllers
* Analyze trends across Request Handler Idle percentage metrics. Kafka’s request handler threads are responsible for servicing client requests ( read/write disk). If the request handler threads get overloaded, the time taken for requests to complete will be longer. If the request handler idle percent is constantly below 0.2 (20%), it may indicate that your cluster is overloaded and requires more resources.
* Determine the number of leaders, partitions and zookeepers across each cluster and ensure they match with expectations


#### Kafka - Outlier Analysis

The **Kafka - Outlier Analysis** dashboard helps you identify outliers for key metrics across your Kafka clusters.

Use this dashboard to:

* To analyze trends, and quickly discover outliers across key metrics of your Kafka clusters


#### Kafka - Replication

The Kafka - Replication dashboard helps you understand the state of replicas in your Kafka clusters.

Use this dashboard to monitor the following key metrics:
* In-Sync Replicas (ISR) Expand Rate - The ISR Expand Rate metric displays the one-minute rate of increases in the number of In-Sync Replicas (ISR). ISR expansions occur when a broker comes online, such as when recovering from a failure or adding a new node. This increases the number of in-sync replicas available for each partition on that broker.The expected value for this rate is normally zero.
* In-Sync Replicas (ISR) Shrink Rate - The ISR Shrink Rate metric displays the one-minute rate of decreases in the number of In-Sync Replicas (ISR). ISR shrinks occur when an in-sync broker goes down, as it decreases the number of in-sync replicas available for each partition replica on that broker.The expected value for this rate is normally zero.
    * ISR Shrink Vs Expand Rate - If you see a Spike in ISR Shrink followed by ISR Expand Rate - this may be because of nodes that have fallen behind replication and they may have either recovered or are in the process of recovering now.
    * Failed ISR Updates
    * Under Replicated Partitions Count
    * Under Min ISR Partitions Count -The Under Min ISR Partitions metric displays the number of partitions, where the number of In-Sync Replicas (ISR) is less than the minimum number of in-sync replicas specified. The two most common causes of under-min ISR partitions are that one or more brokers are unresponsive, or the cluster is experiencing performance issues and one or more brokers are falling behind.
* The expected value for this rate is normally zero.





#### Kafka -Zookeeper

The **Kafka -Zookeeper** dashboard provides an at-a-glance view of the state of your partitions, active controllers, leaders, throughput and network across Kafka brokers and clusters.

Use this dashboard to:

Monitor key Zookeeper metrics such as:

* **Zookeeper disconnect rate** - This metric indicates if a Zookeeper node has lostits connection to a Kafka broker.
* **Authentication Failures** - This metric indicates a Kafka Broker is unable to connect to its Zookeeper node.
* **Session Expiration **- When a Kafka broker - Zookeeper node session expires, leader changes can occur and the broker can be assigned a new controller. If this metric is increasing we recommend you:
    1. Check the health of your network.
    2. Check for garbage collection issues and tune your JVMs accordingly.
* Connection Rate.


#### Kafka - Broker

The Kafka - Broker dashboard provides an at-a-glance view of the state of your partitions, active controllers, leaders, throughput, and network across Kafka brokers and clusters.

Use this dashboard to:
* Monitor Under Replicaed and offline partitions to quickly identify if a Kafka broker is down or over utilized.
* Monitor Unclean Leader Election count metrics - this metric shows the number of failures to elect a suitable leader per second. Unclean leader elections are caused when there are no available in-sync replicas for a partition (either due to network issues, lag causing the broker to fall behind, or brokers going down completely), so an out of sync replica is the only option for the leader. When an out of sync replica is elected leader, all data not replicated from the previous leader is lost forever.
* Monitor producer and fetch request rates.
* Monitor Log flush rate to determine the rate at which log data is written to disk



#### Kafka - Failures and Delayed Operations

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


#### Kafka - Request-Response Times

The **Kafka - Request-Response** **Times** dashboard helps you get insight into key request and response latencies of your Kafka cluster.

Use this dashboard to:
* Monitor request time metrics - The Request Metrics metric group contains information regarding different types of request to and from the cluster. Important request metrics to monitor :
    1. **Fetch Consumer Request Total Time **- The Fetch Consumer Request Total Time metric shows the maximum and mean amount of time taken for processing, and the number of requests from consumers to get new data. Reasons for increased time taken could be: increased load on the node (creating processing delays), or perhaps requests are being held in purgatory for a long time (determined by fetch.min.bytes and fetch.wait.max.ms metrics).
    2. **Fetch Follower Request Total Time** - The Fetch Follower Request Total Time metric displays the maximum and mean amount of time taken while processing, and the number of requests to get new data from Kafka brokers that are followers of a partition. Common causes of increased time taken are increased load on the node causing delays in processing requests, or that some partition replicas may be overloaded or temporarily unavailable.
    3. **Produce Request Total Time **- The Produce Request Total Time metric displays the maximum and mean amount of time taken for processing, and the number of requests from producers to send data. Some reasons for increased time taken could be: increased load on the node causing delays in processing the requests, or perhaps requests are being held in purgatory for a long time (if the `requests.required.acks` metrics is equal to '1' or all).


#### Kafka - Logs

This dashboard helps you quickly analyze your Kafka error logs across all clusters.

Use this dashboard to:
* Identify critical events in your Kafka broker and controller logs;
* Examine trends to detect spikes in Error or Fatal events
* Monitor Broker added/started and shutdown events in your cluster.
* Quickly determine patterns across all logs in a given Kafka cluster.



#### Kafka Broker - Performance Overview

The **Kafka Broker - Performance Overview** dashboards helps you Get an at-a-glance view of the performance and resource utilization of your Kafka brokers and their JVMs.

Use this dashboard to:
* Monitor the number of open file descriptors. If the number of open file descriptors reaches the maximum file descriptor, it can cause an IOException error
* Get insight into Garbage collection and its impact on CPU usage and memory
* Examine how threads are distributed
* Understand the behavior of class count. If class count keeps on increasing, you may have a problem with the same classes loaded by multiple classloaders.


#### Kafka Broker - CPU

The **Kafka Broker - CPU** dashboard shows information about the CPU utilization of individual Broker machines.

Use this dashboard to:
* Get insights into the process and user CPU load of Kafka brokers. High CPU utilization can make Kafka flaky and can cause read/write timeouts.


#### Kafka Broker - Memory

The **Kafka Broker - Memory** dashboard shows the percentage of the heap and non-heap memory used, physical and swap memory usage of your Kafka broker’s JVM.

Use this dashboard to:
* Understand how memory is used across Heap and Non-Heap memory.
* Examine physical and swap memory usage and make resource adjustments as needed.
* Examine the pending object finalization count which when high can lead to excessive memory usage.



#### Kafka Broker - Disk Usage

The **Kafka Broker - Disk Usage** dashboard helps monitor disk usage across your Kafka Brokers.

Use this dashboard to:
* Monitor Disk Usage percentage on Kafka Brokers. This is critical as Kafka brokers use disk space to store messages for each topic. Other factors that affect disk utilization are:
    1. Topic replication factor of Kafka topics.
    2. Log retention settings.
* Analyze trends in disk throughput and find any spikes. This is especially important as disk throughput can be a performance bottleneck.
* Monitor iNodes bytes used, and disk read vs writes. These metrics are important to monitor as Kafka may not necessarily distribute data from a heavily occupied disk, which itself can bring the Kafka down.


#### Kafka Broker - Garbage Collection

The **Kafka Broker - Garbage Collection** dashboard shows key Garbage Collector statistics like the duration of the last GC run, objects collected, threads used, and memory cleared in the last GC run of your java virtual machine.

Use this dashboard to:
* Understand the amount of time spent in garbage collection. If this time keeps increasing, your Kakfa brokers may have more CPU usage .
* Understand the amount of memory cleared by garbage collectors across memory pools and their impact on the Heap memory.




#### Kafka Broker - Threads

The **Kafka Broker - Threads** dashboard shows the key insights into the usage and type of threads created in your Kafka broker JVM

Use this dashboard to:
* Understand the dynamic behavior of the system using peak, daemon, and current threads.
* Gain insights into the memory and CPU time of the last executed thread.


#### Kafka Broker - Class Loading and Compilation

The **Kafka Broker - Class Loading and Compilation** dashboard helps you get insights into the behavior of class count trends.

Use this dashboard to:

* Determine If the class count keeps increasing, this indicates that the same classes are loaded by multiple classloaders.
* Get insights into time spent by Java Virtual machines during compilation.



#### Kafka - Topic Overview

The Kafka - Topic Overview dashboard helps you quickly identify under-replicated partitions, and incoming bytes by Kafka topic, server and cluster.

Use this dashboard to:

* Monitor under replicated partitions - The Under Replicated Partitions metric displays the number of partitions that do not have enough replicas to meet the desired replication factor. A partition will also be considered under-replicated if the correct number of replicas exist, but one or more of the replicas have fallen significantly behind the partition leader. The two most common causes of under-replicated partitions are that one or more brokers are unresponsive, or the cluster is experiencing performance issues and one or more brokers have fallen behind.

    This metric is tagged with cluster, server, and topic info for easy troubleshooting.  The colors in the Honeycomb chart are coded as follows:

1. Green indicates there are no under Replicated Partitions.
2. Red indicates a given partition is under replicated.


#### Kafka - Topic Details

The Kafka - Topic Details dashboard gives you insight into throughput, partition sizes and offsets  across Kafka brokers, topics and clusters.

Use this dashboard to:
* Monitor metrics like Log partition size, log start offset, and log segment count metrics.
* Identify offline/under replicated partitions count. Partitions can be in this state on account of resource shortages or broker unavailability.
* Monitor the In Sync replica (ISR) Shrink rate. ISR shrinks occur when an in-sync broker goes down, as it decreases the number of in-sync replicas available for each partition replica on that broker.
* Monitor In Sync replica (ISR) Expand rate. ISR expansions occur when a broker comes online, such as when recovering from a failure or adding a new node. This increases the number of in-sync replicas available for each partition on that broker.


## Kafka Alerts

**INSERT TABLE**



## Kafka Metrics List

**INSERT TABLE**
