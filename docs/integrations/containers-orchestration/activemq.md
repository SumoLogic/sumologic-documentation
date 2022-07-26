---
id: activemq
title: Sumo Logic App for ActiveMQ
sidebar_label: ActiveMQ
description: The ActiveMQ app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your ActiveMQ messaging clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The ActiveMQ app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your ActiveMQ messaging clusters. Preconfigured dashboards provide insight into cluster status, nodes, producers, consumers, destinations, resource utilization, message rates, and error logs.


## Collecting Logs and Metrics for ActiveMQ

This App has been tested with following ActiveMQ versions:
* 5.16.2.

Configuring log and metric collection for the ActiveMQ App includes the following tasks:

* [Step 1: Configure Fields in Sumo Logic](#step-1-configure-fields-in-sumo-logic)
* [Step 2: Configure ActiveMQ Logs and Metrics Collection](#step-2-configure-activemq-logs-and-metrics-collection)
    * [For Non-Kubernetes environments](#for-non-kubernetes-environments)
    * [For Kubernetes environments](#for-kubernetes-environments)


### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using ActiveMQ in a non-Kubernetes environment create the fields:
* component
* environment
* messaging_system
* messaging_cluster
* pod

If you are using ActiveMQ in a Kubernetes environment create the fields:
* pod_labels_component
* pod_labels_environment
* pod_labels_messaging_system
* pod_labels_messaging_cluster


#### Sample Log Messages

```bash title="Kubernetes"
{
      timestamp:1624348918179,
      log:"2021-06-22 08:01:57,993 | DEBUG | Publishing: tcp://activemq-2:61616 for broker transport URI: tcp://activemq-2:61616?maximumConnections=1000&wireFormat.maxFrameSize=104857600 | org.apache.activemq.broker.TransportConnector | ActiveMQ Transport: tcp:///10.32.0.1:16932@61616",
      stream:"stdout",
      time:"2021-06-22T08:01:58.177654533Z"
}
```

```bash title="Non-Kubernetes"
2021-06-22 15:00:41,922 | DEBUG | Stopping transport tcp:///192.168.100.8:36302@61616 | org.apache.activemq.transport.tcp.TcpTransport | ActiveMQ BrokerService[localhost] Task-15300
Host: broker-3-activemq Name: /opt/activemq/data/activemq.log Category:logfile
```

### Step 2: Configure ActiveMQ Logs and Metrics Collection

### For Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture).The diagram below illustrates how data is collected from ActiveMQ in a Kubernetes environment. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from ActiveMQ. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the Jolokia2 input plugin to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.

Follow the below instructions to set up the metric collection:

Configure Metrics Collection

    1. Setup Kubernetes Collection with the Telegraf operator
    2. Configure ActiveMQ Image
    3. Add annotations on your ActiveMQ pods
1. Configure Logs Collection
    4. Configure logging in ActiveMQ.
    5. Add labels on your ActiveMQ pods to capture logs from standard output.
    6. Collecting ActiveMQ Logs from a Log file.

**Prerequisites**

It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


#### Step 1 Configure Metrics Collection

This section explains the steps to collect ActiveMQ metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more on this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

1. **[Setup Kubernetes Collection with the Telegraf Operator.](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment)**
2. **Configure ActiveMQ Image**

To enable Telegraf sidecar to get metrics from ActiveMQ Container, you must enable read metrics from ActiveMQ Container via the [JMX MBeans](https://activemq.apache.org/jmx) and Disable strict-checking.

Enable reads metrics from ActiveMQ Container via the JMX MBeans:

While building the ActiveMQ docker image, setting `useJmx="true”` in ActiveMQ.xml config file:

```xml
<broker useJmx="true" brokerName="BROKER1">
...
</broker>
```

Disable strict-checking by editing file `jolokia-access.xml`:

While building the ActiveMQ docker image, edit file `jolokia-access.xml` in  
`<Folder ActiveMQ Installed>/webapps/api/WEB-INF/classes/` and comment or remove section below:

```xml
<cors>
<strict-checking/>
</cors>
```

1. **Add annotations on your ActiveMQ pods**

On your ActiveMQ Pods, add the following annotations:

```bash
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
            [[inputs.disk]]
                    mount_points = ["/"]
             [inputs.disk.tags]
                    environment="dev"
                    component="messaging"
                    messaging_system="activemq"
                    messaging_cluster="activemq_on_k8s_CHANGE_ME"
            [[inputs.jolokia2_agent]]
                    urls = ["http://localhost:8161/api/jolokia"]
                    name_prefix = "activemq_"
                    username = "<username_CHANGE_ME>"
                    password = "<password_CHANGE_ME>"
              [inputs.jolokia2_agent.tags]
                    environment="prod_CHANGE_ME"
                    component="messaging"
                    messaging_system="activemq"
                    messaging_cluster="activemq_on_k8s_CHANGE_ME"

              [[inputs.jolokia2_agent.metric]]
                    name  = "OperatingSystem"
                    mbean = "java.lang:type=OperatingSystem"


              [[inputs.jolokia2_agent.metric]]
                    name  = "jvm_runtime"
                    mbean = "java.lang:type=Runtime"
                    paths = ["Uptime"]

              [[inputs.jolokia2_agent.metric]]
                    name  = "jvm_memory"
                    mbean = "java.lang:type=Memory"


              [[inputs.jolokia2_agent.metric]]
                    name = "jvm_garbage_collector"
                    mbean = "java.lang:name=*,type=GarbageCollector"
                    paths = ["CollectionCount"]
                    tag_keys = ["name"]

              [[inputs.jolokia2_agent.metric]]
                    name = "queue"
                    mbean =
                    "org.apache.activemq:brokerName=*,destinationName=*,
                    destinationType=Queue,type=Broker"
                    tag_keys = ["brokerName","destinationName"]

              [[inputs.jolokia2_agent.metric]]
                    name = "topic"
                    mbean =
                    "org.apache.activemq:brokerName=*,destinationName=*,
                    destinationType=Topic,type=Broker"
                    tag_keys = ["brokerName","destinationName"]

              [[inputs.jolokia2_agent.metric]]
                    name = "broker"
                    mbean = "org.apache.activemq:brokerName=*,type=Broker"
                    tag_keys = ["brokerName"]
```


Please enter values for the following parameters (marked `CHANGE_ME` above):

* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf ActiveMQ Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the ActiveMQ input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section, which is `[[inputs.jolokia2_agent]]`:
        * url - The URL of the ActiveMQ server for [JMX MBeans](https://activemq.apache.org/jmx)  HTTP Endpoint. Please see [this doc](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/jolokia2/examples/activemq.conf) for more information on additional parameters for configuring the Jolokia2 input plugin for Telegraf.
        * username: The Username of ActiveMQ’s admin account . The default is “admin”.
        * password:  The password of ActiveMQ's admin account. The default is “admin”.
* In the tags section, which is `[inputs.jolokia2_agent.tags]`:
    * environment - This is the deployment environment where the ActiveMQ cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
    * messaging_cluster - Enter a name to identify this ActiveMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration. Do** not modify** those values, as they will cause the Sumo Logic apps to not function correctly.

* telegraf.influxdata.com/class: sumologic-prometheus - This instructs the Telegraf operator what output to use. This should not be changed.
* prometheus.io/scrape: "true" - This ensures our Prometheus will scrape the metrics.
* prometheus.io/port: "9273" - This tells prometheus what ports to scrape on. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags section, which is `[inputs.jolokia2_agent.tags]`:
        * component: “messaging” - This value is used by Sumo Logic apps to identify application components.
        * messaging_system: “activemq” - This value identifies the messaging system.

    For all other parameters, please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. SumoLogic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
2. Verify metrics in Sumo Logic.


#### Step 2 Configure Logs Collection

This section explains the steps to collect ActiveMQ logs from a Kubernetes environment.


#### Collect ActiveMQ logs written to standard output

If your ActiveMQ pod is writing logs to standard output then follow the steps below to collect logs :

1. **Add labels on your ActiveMQ pods to capture logs from standard output**.

Make sure that the logs from ActiveMQ are sent to stdout. For more details see this [doc](https://activemq.apache.org/how-can-i-enable-detailed-logging).

Follow the instructions below to capture ActiveMQ logs from stdout on Kubernetes.



1. Apply the following labels to the ActiveMQ pods:

     labels:


```
   environment: "prod_CHANGE_ME"
    component: "messaging"
    messaging_system: "activemq"
        messaging_cluster: "activemq_on_k8s_CHANGE_ME"
```


Enter in values for the following parameters (marked in bold_CHANGE_ME above):

* **environment.** This is the deployment environment where the ActiveMQ cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* **messsaging_cluster.** Enter a name to identify this ActiveMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.

Here’s an explanation for additional values set by this configuration that we request you **do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **component: “messaging”**. This value is used by Sumo Logic apps to identify application components.
* **messaging_system: “activemq”**. This value identifies the messaging system.

For all other parameters, see[ this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, please see[ this page](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App).

1. **(Optional) Collecting ActiveMQ Logs from a Log File**

If your ActiveMQ chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:

1. Determine the location of the ActiveMQ log file on Kubernetes. This can be determined from the log4j.properties for your ActiveMQ cluster along with the mounts on the ActiveMQ pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.
```
annotations:
      tailing-sidecar: sidecarconfig;<mount>:<path_of_ActiveMQ_log_file>/<ActiveMQ_log_file_name>
```


Example:
```
annotations:
      tailing-sidecar: sidecarconfig;data:/opt/activemq/data/activemq.log

```



1. Make sure that the ActiveMQ pods are running and annotations are applied by using the command: **kubectl describe pod <ActiveMQ_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
1. **Add an FER to normalize the fields in Kubernetes environments**

Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Messaging Application Components. To do so:

1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the + Add button on the top right of the table.
3. The following form appears:

1. Enter the following options:
    * **Rule Name**. Enter the name as **App Observability - Messaging**.
    * **Applied At.** Choose **Ingest Time**
    * **Scope**. Select **Specific Data**
        * **Scope**: Enter the following keyword search expression:
`pod_labels_environment=* pod_labels_component=messaging     pod_labels_messaging_system=* pod_labels_messaging_cluster=* \
`

**Parse Expression**.Enter the following parse expression \
`if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment`


```
| pod_labels_component as component
| pod_labels_messaging_system as messaging_system
```

* `| pod_labels_messaging_cluster as messaging_cluster`


### For Non-Kubernetes environments

We use the Telegraf operator for ActiveMQ metric collection and Sumo Logic Installed Collector for collecting ActiveMQ logs. The diagram below illustrates the components of the ActiveMQ collection in a non-Kubernetes environment. Telegraf runs on the same system as ActiveMQ, and uses the [Jolokia2 input plugin](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/jolokia2/examples/activemq.conf) to obtain ActiveMQ metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from ActiveMQ on the other hand are sent to a Sumo Logic Local File source.

This section provides instructions for configuring metrics collection for the Sumo Logic App for ActiveMQ. Follow the below instructions to set up the metric collection:


1. Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure and start Telegraf
2. Configure Logs Collection
    5. Configure logging in ActiveMQ
    6. Configure local log file collection
    7. Configure a Collector
    8. Configure a Source


#### Configure Metrics Collection

1. **Configure a Hosted Collector** To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.
2. **Configure an HTTP Logs and Metrics Source**
Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.
3. **Install Telegraf**
Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.
4. **Configure and start Telegraf**
As part of collecting metrics data from Telegraf, we will use the [Jolokia2 input plugin](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/jolokia2/examples/activemq.conf) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.

Before you configure telegraf, you will need to :

1. **Enable reads metrics** from ActiveMQ servers via the [JMX MBeans](https://activemq.apache.org/jmx) by setting “useJmx=true” in file config [ActiveMQ.xml](https://activemq.apache.org/xml-configuration.html)

```
<broker useJmx="true" brokerName="BROKER1">
...
</broker>
```


1. **Disable strict-checking** by editing file `jolokia-access.xml`:

Navigate to directory :


    ```
    <Folder ActiveMQ Installed>/webapps/api/WEB-INF/classes/
    ```

Open file `jolokia-access.xml`,and comment or remove section below:


        ```
        <cors>
        <strict-checking/>
        </cors>
        ```

Create or modify `telegraf.conf` and copy and paste the text below:  



```bash
[[inputs.disk]]
   mount_points = ["/"]
   [inputs.disk.tags]
        environment="dev"
        component="messaging"
        messaging_system="activemq"
        messaging_cluster="activemq_CHANGE_ME"

 [[inputs.jolokia2_agent]]
   urls = ["http://localhost:8161/api/jolokia"]
   name_prefix = "activemq_"
   username = "<username_CHANGE_ME>"
   password = "<password_CHANGE_ME>"
   [inputs.jolokia2_agent.tags]
        environment="dev"
        component="messaging"
        messaging_system="activemq"
        messaging_cluster="activemq__CHANGE_ME"

  [[inputs.jolokia2_agent.metric]]
        name  = "OperatingSystem"
        mbean = "java.lang:type=OperatingSystem"

  [[inputs.jolokia2_agent.metric]]
        name  = "jvm_runtime"
        mbean = "java.lang:type=Runtime"
        paths = ["Uptime"]

  [[inputs.jolokia2_agent.metric]]
        name  = "jvm_memory"
        mbean = "java.lang:type=Memory"
  [[inputs.jolokia2_agent.metric]]
        name = "jvm_garbage_collector"
        mbean = "java.lang:name=*,type=GarbageCollector"
        paths = ["CollectionCount"]
        tag_keys = ["name"]

  [[inputs.jolokia2_agent.metric]]
        name = "queue"
        mbean =
        "org.apache.activemq:brokerName=*,destinationName=*,
        destinationType=Queue,type=Broker"
        tag_keys = ["brokerName","destinationName"]

  [[inputs.jolokia2_agent.metric]]
        name = "topic"
        mbean =
        "org.apache.activemq:brokerName=*,destinationName=*,
        destinationType=Topic,type=Broker"
        tag_keys = ["brokerName","destinationName"]

  [[inputs.jolokia2_agent.metric]]
        name = "broker"
        mbean = "org.apache.activemq:brokerName=*,type=Broker"
        tag_keys = ["brokerName"]
  [[outputs.sumologic]]
  url = "<URL Created in Step b_CHANGE_ME>"
    data_format = "prometheus"
```


Please enter values for the following parameters (marked in `CHANGE_ME` above):

* In the input plugins section, which is `[[inputs.jolokia2_agent]]`:
    * url - The URL of the ActiveMQ server for  [JMX MBeans](https://activemq.apache.org/jmx)  HTTP Endpoint. Please see [this doc](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/jolokia2/examples/activemq.conf) for more information on additional parameters for configuring the Jolokia2 input plugin for Telegraf.
    * username: The Username of ActiveMQ’s admin account . The default is “admin”.
    * password:  The password of ActiveMQ's admin account. The default is “admin”.
    * In the tags section, which is `[inputs.jolokia2_agent.tags]`
        * environment - This is the deployment environment where the ActiveMQ cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * messaging_cluster - Enter a name to identify this ActiveMQ cluster. This cluster name will be shown in the Sumo Logic dashboards.
* In the output plugins section, which is `[[outputs.sumologic]]`:
    * url - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

    Here’s an explanation for additional values set by this Telegraf configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **data_format** - `"prometheus"` In the output plugins section, which is `[[outputs.sumologic]]`. Metrics are sent in the Prometheus format to Sumo Logic.
* **component**: “messaging” - In the input plugins section, which is `[[inputs.jolokia2_agent]]`. This value is used by Sumo Logic apps to identify application components.
* **messaging_system**: `"activemq"` - In the input plugins sections.In other words, this value identifies the messaging system
*  For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for more properties that can be configured in the Telegraf agent globally.

Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, ActiveMQ metrics should start flowing into Sumo Logic.


#### Step 2 Configure Logs Collection

This section provides instructions for configuring log collection for ActiveMQ running on a non-kubernetes environment for the Sumo Logic App for ActiveMQ.

By default, ActiveMQ logs are stored in a log file. Sumo Logic supports collecting logs via a local log file. Local log files can be collected via [Installed collectors](https://help.sumologic.com/03Send-Data/Installed-Collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for collection to work. For detailed requirements for Installed collectors, see this [page](https://help.sumologic.com/01Start-Here/03About-Sumo-Logic/System-Requirements/Installed-Collector-Requirements).

Based on your infrastructure and networking setup choose one of these methods to collect ActiveMQ logs and follow the instructions below to set up log collection:

1. **Configure logging in ActiveMQ**

ActiveMQ use [Log4j](http://logging.apache.org/log4j/2.x/index.html) for logging, it supports logging via the following methods: local text log files, syslog,stdout, remote storage.ActiveMQ logs have eight levels of verbosity: OFF, FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL. For details please visit this [page](https://logging.apache.org/log4j/log4j-2.3/manual/customloglevels.html). For the dashboards to work properly, must set log level = debug. Default, log level is info.

All logging settings are located in [log4j.properties](https://github.com/apache/activemq/blob/main/activemq-console/src/test/resources/log4j.properties).


1. **Configure ActiveMQ to log to a Local file

By default, ActiveMQ logs are stored in `<Folder ActiveMQ Installed>/data/activemq.log`. The default directory for log files is listed in the [log4j.properties](https://github.com/apache/activemq/blob/main/activemq-console/src/test/resources/log4j.properties) file.

To configure the log output destination to a log file:

* Navigate to directory : `<Folder ActiveMQ Installed>`
* Open file log4j.properties and edit options below:

```bash
log4j.appender.logfile.file=${activemq.data}/activemq.log
log4j.appender.logfile.maxFileSize=10240MB
log4j.logger.org.apache.activemq=DEBUG
```


Logs from the ActiveMQ log file can be collected via a Sumo Logic [Installed collector](https://help.sumologic.com/03Send-Data/Installed-Collectors) and a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) as explained in the next section.



1. **Configuring a Collector**

To add an Installed collector, perform the steps as defined on the page[ Configure an Installed Collector.](https://help.sumologic.com/03Send-Data/Installed-Collectors)


1. **Configuring a Source

**To add a Local File Source source for ActiveMQ do the following:

To collect logs directly from your ActiveMQ machine, use an Installed Collector and a Local File Source.

1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).
2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your activemq.log. The files are typically located in `<Folder ActiveMQ Installed>/data/activemq.log`. If you are using a customized path, check the log4j.properties file for this information.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
* **Source Category.** Enter any string to tag the output collected from this Source, such as **ActiveMQ/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. Set the following fields:**
    * `component = messaging`
    * `messaging_system = activemq`
    * `messaging_cluster = <Your_ActiveMQ_Cluster_Name>`
    * `environment = <Environment_Name>`, such as Dev, QA or Prod.

1. Configure the **Advanced** section:
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your ActiveMQ Server’s time zone.
* **Timestamp Format.** The timestamp format is automatically detected.
* **Encoding. **Select** **UTF-8 (Default).
* **Enable Multiline Processing.** Detect messages spanning multiple lines
    * Infer Boundaries - Detect message boundaries automatically
1. Click **Save**.

At this point, ActiveMQ logs should start flowing into Sumo Logic.



## Installing ActiveMQ Monitors

This section and below contain instructions for installing Sumo Logic Monitors for ActiveMQ, the app, and descriptions of each of the app dashboards. These instructions assume you have already set up the collection as described in the [Collect Logs and Metrics for the ActiveMQ](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Microsoft_SQL_Server/01Collect-Logs-for-the-Microsoft-SQL-Server-App) App page.

* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing a JSON file or a Terraform script.

Sumo Logic provides out of the box alerts available through [Sumo Logic monitors](/docs/alerts/monitors/index.md) to help you monitor your ActiveMQ clusters. These alerts are built based on metrics and logs datasets and include preset thresholds based on industry best practices and recommendations. For details, see [ActiveMQ Alerts](#activemq-alerts).

:::note
There are limits to how many alerts can be enabled - please see the[ Alerts FAQ](/docs/alerts/monitors/monitor-faq.md) for details.
:::

### Method 1: Install the monitors by importing a JSON file:

1. Download the[ JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/ActiveMQ/activemq.json) that describes the monitors.
2. The[ JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/ActiveMQ/activemq.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all ActiveMQ clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `'messaging_system=activemq `with `'<Your Custom Filter>`.  

Custom filter examples:


1. For alerts applicable only to a specific cluster, your custom filter would be:  `'messaging_cluster=activemq-prod.01'`
2. For alerts applicable to all clusters that start with `activemq-prod`, your custom filter would be: `messaging_cluster=activemq-prod*`
3. **For alerts applicable to a specific cluster within a production environment, your custom filter would be: `messaging_cluster=activemq-1`** and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)
4. Go to Manage Data > Alerts > Monitors.
5. Click **Add**: \

6. Click Import and then copy-paste the above JSON to import monitors.

The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the ActiveMQ folder under **Monitors** to configure them. See[ this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors to send notifications to teams or connections. Please see the instructions detailed in Step 4 of this[ document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).    


### Method 2: Install the alerts using a Terraform script

**1. Generate a Sumo Logic access key and ID**

Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Please identify which deployment your Sumo Logic account is in, using this[  link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).

**2. [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later**


**3. Download the Sumo Logic Terraform package for ActiveMQ alerts**

The alerts package is available in the Sumo Logic github[ repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/ActiveMQ). You can either download it through the “git clone” command or as a zip file.

**4. Alert Configuration**

After the package has been extracted, navigate to the package directory **`terraform-sumologic-sumo-logic-monitor/monitor_packages/ActiveMQ/`

Edit the **`activemq.auto.tfvars` file and add the Sumo Logic Access Key, Access Id, and Deployment from Step 1.


```bash
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```


The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable **`'activemq_data_source'`. Custom filter examples:

1. A specific cluster **`'messaging_cluster=activemq.prod.01'`
2. All clusters in an environment `'environment=prod'`
3. For alerts applicable to all clusters that start with activemq-prod, your custom filter would be: `'messaging_cluster=activemq-prod*'`
4. For alerts applicable to a specific cluster within a production environment, your custom filter would be:`activemq_cluster=activemq-1` and `environment=prod` (This assumes you have set the optional environment tag while configuring collection)

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter monitors_disabled to false in this file.

By default, the monitors are configured in a monitor **folder** called “**ActiveMQ**”, if you would like to change the name of the folder, update the monitor folder name in “folder” key at **activemq.auto.tfvars** file.

If you would like the alerts to send email or connection notifications, configure these in the file **`activemq_notifications.auto.tfvars`. For configuration examples, refer to the next section.


**5. Email and Connection Notification Configuration Examples**

Modify the file **activemq_notifications.auto.tfvars** and populate connection_notifications and email_notifications as per below examples.

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

For overriding payload for different connection types, refer to this[ document](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections).


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


**6. Install the Alerts**

1. Navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/ActiveMQ/` and run terraform init. This will initialize Terraform and will download the required components.
2. Run terraform plan to view the monitors which will be created/modified by Terraform.
3. Run terraform apply.

7. Post Installation

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other users or services. This is detailed in Step 4 of[ this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


There are limits to how many alerts can be enabled - please see the[ Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ).




## Installing the ActiveMQ App

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


Version selection is applicable only to a few apps currently. For more information, see the[ Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library) document.

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**
* Choose **Enter a Custom Data Filter**, and enter a custom ActiveMQ cluster filter. Examples:
    1. For all ActiveMQ  clusters \
`messaging_cluster=*`
    2. For a specific cluster: \
`messaging_cluster=activemq.dev.01`. 
    3. Clusters within a specific environment: \
`messaging_cluster=activemq-1` and `environment=prod \
`(This assumes you have set the optional environment tag while configuring collection)
    4. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    5. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


### Sample Log Message

```bash title="Kubernetes"
{
      timestamp:1624348918179,
      log:"2021-06-22 08:01:57,993 | DEBUG | Publishing: tcp://activemq-2:61616 for broker transport URI: tcp://activemq-2:61616?maximumConnections=1000&wireFormat.maxFrameSize=104857600 | org.apache.activemq.broker.TransportConnector | ActiveMQ Transport: tcp:///10.32.0.1:16932@61616",
      stream:"stdout",
      time:"2021-06-22T08:01:58.177654533Z"
}
```


```bash title="Non-Kubernetes"
2021-06-22 15:00:41,922 | DEBUG | Stopping transport tcp:///192.168.100.8:36302@61616 | org.apache.activemq.transport.tcp.TcpTransport | ActiveMQ BrokerService[localhost] Task-15300
Host: broker-3-activemq Name: /opt/activemq/data/activemq.log Category:logfile
```


## ActiveMQ Alerts

Sumo Logic has provided out of the box alerts available via[ Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you quickly determine if the ActiveMQ database cluster is available and performing as expected.


<table>
  <tr>
   <td>Alert Type (Metrics/Logs)
   </td>
   <td>Alert Name
   </td>
   <td>Alert Description
   </td>
   <td>Trigger Type (Critical / Warning)
   </td>
   <td>Alert Condition
   </td>
   <td>Recover Condition
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High CPU Usage
   </td>
   <td>This alert fires when CPU usage on a node in a ActiveMQ cluster is high.
   </td>
   <td>Critical
   </td>
   <td> &#62; &#61; 80
   </td>
   <td> &#60; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High Host Disk Usage
   </td>
   <td>This alert fires when there is high disk usage on a node in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 80
   </td>
   <td>&#60; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High Memory Usage
   </td>
   <td>This alert fires when memory usage on a node in an ActiveMQ cluster is high.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 80
   </td>
   <td>&#60; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High Number of File Descriptors in use
   </td>
   <td>This alert fires when the percentage of file descriptors used by a node in an ActiveMQ cluster is high.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 80
   </td>
   <td>&#60; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High Storage Used
   </td>
   <td>This alert fires when there is storage usage on a node that is high in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 80
   </td>
   <td>&#60; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - High Temp Usage
   </td>
   <td>This alert fires when there is high temp usage on a node in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 80
   </td>
   <td>&#60; 80
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>ActiveMQ - Maximum Connection
   </td>
   <td>This alert fires when one node in ActiveMQ cluster exceeds the maximum allowed client connection limit.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1
   </td>
   <td>&#60; 1
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - No Consumers on Queues
   </td>
   <td>This alert fires when an ActiveMQ queue has no consumers.
   </td>
   <td>Critical
   </td>
   <td>&#60; 1
   </td>
   <td>&#62; &#61; 1
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - No Consumers on Topics
   </td>
   <td>This alert fires when an ActiveMQ topic has no consumers.
   </td>
   <td>Critical
   </td>
   <td>&#60; 1
   </td>
   <td>&#62; &#61; 1
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>ActiveMQ - Node Down
   </td>
   <td>This alert fires when a node in the ActiveMQ cluster is down.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1
   </td>
   <td>&#60; 1
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - Too Many Connections
   </td>
   <td>This alert fires when there are too many connections to a node in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1000
   </td>
   <td>&#60; 1000
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - Too Many Expired Messages on Queues
   </td>
   <td>This alert fires when there are too many expired messages on a queue in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1000
   </td>
   <td>&#60; 1000
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - Too Many Expired Messages on Topics
   </td>
   <td>This alert fires when there are too many expired messages on a topic in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1000
   </td>
   <td>&#60; 1000
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>ActiveMQ - Too Many Unacknowledged Messages
   </td>
   <td>This alert fires when there are too many unacknowledged messages on a node in an ActiveMQ cluster.
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61; 1000
   </td>
   <td>&#60; 1000
   </td>
  </tr>
</table>



## Viewing the ActiveMQ Dashboards

### Dashboard Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the Filter with template variables help page.


### Overview

The ActiveMQ - Overview dashboard gives you an at-a-glance view of your ActiveMQ deployment across brokers, queues, topics, and messages.

**Use this dashboard to**:
* Analyze Memory and CPU utilization.
* Gain insights into Enqueue messages for your ActiveMQ server.
* Gain insights into Dequeue messages for your ActiveMQ server.
* Determine node uptime, the number of nodes, connections, producer, consumer, queues, topics unack messages, across each cluster and ensure they match with expectations.
* Analysis of near errors.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Windows-Security-Analytics-Default-Accounts-Usage.png')} alt="Windows cloud Security Analytics dashboards" />


### Brokers
20


The ActiveMQ - Brokers dashboard provides an at-a-glance view of the state of your brokers in the ActiveMQ cluster.

**Use this dashboard to**:



* Monitor brokers uptime.
* Analyze unacknowledged messages, serve connections for your ActiveMQ brokers..
* Gain insights into the limit of resources for your ActiveMQ brokers.
* Gain insights into enqueue rate, dequeue rate for your ActiveMQ brokers.
* Determine the amount of current connections, producers, and consumers for your ActiveMQ brokers.
* find average message size.




### Queues


The ActiveMQ - Queues dashboard provides an at-a-glance view of the state of your queues in ActiveMQ clusters.

**Use this dashboard to**:



* Monitor en queue latency, the memory usage of queues.
* Monitor queues, producers on queues, consumers on queues.
* Gain insights into en queue rate, dequeue rate for your ActiveMQ queues.
* Determine the number of current connections, producers, consumers, errors, and expired messages on queues.
* Find average message size on queues.



### Topics

The ActiveMQ - Topics dashboard provides an at-a-glance view of the state of your topics in ActiveMQ clusters.

**Use this dashboard to**:

* Monitor en queue latency, the memory usage of topics.
* Determine the number of topics, producers on topics, consumers on topics.
* Gain insights into en queue rate, dequeue rate for your ActiveMQ topics.
* Analyze current connections, producers, consumers, errors, and expired messages on queues.
* Find average message size on queues.


25



### ActiveMQ - Resource Utilization
26


The ActiveMQ - Resource Utilization dashboard provides an at-a-glance view of the state of system loads in clusters: CPU usage, memory usage, Swap usage,  file descriptor usage, garbage collection rate, heap, and non-heap usage.

**Use this dashboard to:
* Analyze memory, CPU, disk, swap, file descriptor utilization of nodes in clusters.
* Gain insights into the garbage collection rate for your ActiveMQ nodes.
* Gain insights into a heap, non-heap usage for your ActiveMQ nodes.




### ActiveMQ - Logs

This dashboard helps you quickly analyze your ActiveMQ error logs across all clusters.

**Use this dashboard to**:

* Identify critical events in your ActiveMQ cluster.
* Examine trends to detect spikes in Error or Fatal events
* Monitor Broker added/started and shutdown events in your cluster.
* Quickly determine patterns across all logs in a given ActiveMQ cluster.
