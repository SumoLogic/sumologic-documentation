---
id: elasticsearch
title: Sumo Logic App for Elasticsearch
sidebar_label: Elasticsearch
description: The Elasticsearch app helps you monitor the availability, performance, health, and resource utilization of your Elasticsearch clusters.
---


import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/databases/elasticsearch.png')} alt="DB icon" width="50"/>

The Elasticsearch app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Elasticsearch clusters. Preconfigured dashboards provide insight into cluster health, resource utilization, sharding, garbage collection, and search, index, and cache performance.

### Sample Log Message

**Kubernetes:**

```
{
type:"server",
timestamp:"2021-07-12T05:12:07,101+0000",
level:"WARN",
component:"o.e.c.NodeConnectionsService",
cluster.name:"elasticsearch",
node.name:"elasticsearch-master-0",
cluster.uuid:"pQ372ZkIQiaHkSVp6hlxZw",
node.id:"7PdqQlHYRjqbzClkTeoVdA",
message:"failed to connect to {elasticsearch-master-1}{OfUoMAwoRoKr2sAlYAYuEA}{RnYfI0DUT9uqtF4h5aVDQg}{10.42.1.143}{10.42.1.143:9300}{dim}{ml.machine_memory=2147483648, ml.max_open_jobs=20, xpack.installed=true} (tried [1] times)"
}
```


**Non-Kubernetes:**

```
{"type": "server", "timestamp": "2021-07-12T11:42:25,862+07:00", "level": "INFO", "component": "o.e.x.s.a.s.FileRolesStore", "cluster.name": "elasticsearch", "node.name": "v103-157-218-134.3stech.vn", "message": "parsed [0] roles from file [/etc/elasticsearch/roles.yml]" }
```


## Collect Logs and Metrics for the Elasticsearch app

Configuring log and metric collection for the Elasticsearch App includes the following tasks:

* Step 1: Configure Fields in Sumo Logic.
* Step 2: Configure Collection for Elasticsearch
    * [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Elasticsearch/Collect_Logs_and_Metrics_for_the_Elasticsearch_app/Collect_Elasticsearch_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Elasticsearch/Collect_Logs_and_Metrics_for_the_Elasticsearch_app/Collect_Elasticsearch_Logs_and_Metrics_for_Kubernetes_environments).


### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic before configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Elasticsearch in a  non-Kubernetes environment create the fields:

* component
* environment
* db_system
* db_cluster
* pod

If you are using Elasticsearch in a Kubernetes environment create the fields:

* pod_labels_component
* pod_labels_environment
* pod_labels_db_system
* pod_labels_db_cluster


### Step 2: Configure Collection for Elasticsearch

* [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Elasticsearch/Collect_Logs_and_Metrics_for_the_Elasticsearch_app/Collect_Elasticsearch_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Elasticsearch/Collect_Logs_and_Metrics_for_the_Elasticsearch_app/Collect_Elasticsearch_Logs_and_Metrics_for_Kubernetes_environments).


## Collect Elasticsearch Logs and Metrics for Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). The diagram below illustrates how data is collected from Elasticsearch in a Kubernetes environment. Four services in the architecture shown below make up the metric collection pipeline: Telegraf, Prometheus, Fluentd, and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Elasticsearch. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the Elasticsearch input plugin to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.


Follow the below instructions to set up the logs and  metric collection:



1. Configure Logs Collection
    1. Configure logging in Elasticsearch.
    2. Add labels on your Elasticsearch pods to capture logs from standard output.
    3. Collecting Elasticsearch Logs from a Log file.
2. Configure Metrics Collection
    4. Setup Kubernetes Collection with the Telegraf operator
    5. Add annotations on your Elasticsearch pods


5
It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


### Configure Logs Collection
6


This section explains the steps to collect Elasticsearch logs from a Kubernetes environment.



1. (Recommended Method) Add labels on your Elasticsearch pods to capture logs from standard output.

Follow the instructions below to capture Elasticsearch logs from stdout on Kubernetes.

Apply the following labels to the Elasticsearch pods: \
 \
 labels: \
`environment: "dev_CHANGE_ME"`


```
component: "database"
db_system: "elasticsearch"

```



1. `db_cluster: "**elasticsearch_on_k8s_CHANGE_ME**>"
 \
`Please enter in values for the following parameters (marked in `<**CHANGE_ME**>` above):

* `environment` - This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
* `db_cluster` - Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards. \
 \
Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly. \

* `component: “database”` - This value is used by Sumo Logic apps to identify application components.
* **db_system**: “elasticsearch” - This value identifies the database system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection,[ visit](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.
2. Verify logs in Sumo Logic.
1. (Optional) Collecting Elasticsearch Logs from a Log File

Follow the steps below to capture Elasticsearch logs from a log file on Kubernetes.



1. Determine the location of the Elasticsearch log file on Kubernetes. This can be determined from the log4j.properties for your Elasticsearch cluster along with the mounts on the Elasticsearch pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.


```
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Elasticsearch_log_file>/<Elasticsearch_log_file_name>
```


Example:


```
annotations:
  tailing-sidecar: sidecarconfig;data:/usr/share/elasticsearch/logs/gc.log

```



1. Make sure that the Elasticsearch pods are running and annotations are applied by using the command: **`kubectl describe pod <Elasticsearch_pod_name>`**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. Verify logs in Sumo Logic.

3. Add a FER to normalize the fields in Kubernetes environments

Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Database Application Components. To do so:

1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the + Add button on the top right of the table.
3. The following form appears:

1. Enter the following options:
* **Rule Name**. Enter the name as **App Observability - Database**.
* **Applied At.** Choose **Ingest Time**
* **Scope**. Select **Specific Data**
* **Scope**: Enter the following keyword search expression:  \
`pod_labels_environment=* pod_labels_component=database pod_labels_db_system=* pod_labels_db_cluster=*`

**Parse Expression**.Enter the following parse expression: \
`if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment`

```
    | pod_labels_component as component
| pod_labels_db_system as db_system

```



* `| pod_labels_db_cluster as db_cluster`
1. Click **Save** to create the rule.


### Configure Metrics Collection

This section explains the steps to collect Elasticsearch metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

1. [Set up Kubernetes Collection with the Telegraf Operator.](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment)
2. Add annotations on your Elasticsearch pods \
On your Elasticsearch Pods, add the following annotations:


```
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+

  servers = ["http://<USER_CHANGE_ME>:<PASS_CHANGE_ME>@localhost:9200"]
  http_timeout = "5s"
  local = true
  cluster_health = true
  cluster_stats = true
  cluster_stats_only_from_master = false
  indices_include = ["_all"]
  indices_level = "cluster"
  [inputs.elasticsearch.tags]
    environment="dev_CHANGE_ME>"
    component="database"
    db_system="elasticsearch"
    db_cluster="elasticsearch_on_k8s_CHANGE_ME>"
```

Enter in values for the following parameters (marked in **bold** above):


* `telegraf.influxdata.com/inputs` - This contains the required configuration for the Telegraf Elasticsearch Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Elasticsearch input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
* In the input plugins section, that is `[[inputs**.**elasticsearch]]`:
    * `servers` - The URL to the Elasticsearch server. This can be a comma-separated list to connect to multiple Elasticsearch servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Elasticsearch input plugin for Telegraf.
* In the tags section, which is `[inputs.elasticsearch]`
    * `environment` - This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
    * `db_cluster` - Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* telegraf.influxdata.com/class: sumologic-prometheus - This instructs the Telegraf operator what output to use. This should not be changed.
* prometheus.io/scrape: "true" - This ensures our Prometheus will scrape the metrics.
* prometheus.io/port: "9273" - This tells prometheus what ports to scrape on. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags section i.e.  `[inputs.elasticsearch.tags]`
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * **db_system**: “elasticsearch” - This value identifies the database system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
2. Verify metrics in Sumo Logic.


## Collect Elasticsearch Logs and Metrics for Non-Kubernetes environments

We use the Telegraf operator for Elasticsearch metric collection and Sumo Logic Installed Collector for collecting Elasticsearch logs. The diagram below illustrates the components of the Elasticsearch collection in a non-Kubernetes environment. Telegraf runs on the same system as Elasticsearch to obtain Elasticsearch metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Elasticsearch on the other hand are sent to a Sumo Logic Local File source.

This section provides instructions for configuring metrics collection for the Sumo Logic App for Elasticsearch. Follow the below instructions to set up logs and metrics collection:

1. Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure and start Telegraf
2. Configure Logs Collection
    5. Configure logging in Elasticsearch
    6. Configure Sumo Logic Installed Collector


### Configure Metrics Collection


1. **Configure a Hosted Collector**
To create a new Sumo Logic hosted collector, perform the steps in the[ Create a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.
2. Configure an HTTP Logs and Metrics Source \
Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.
3. Install Telegraf \
Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.
4. Configure and start Telegraf \
As part of collecting metrics data from Telegraf, we will use the [elasticsearch input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/elasticsearch) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.  \
 \
Create or modify **telegraf.conf** and copy and paste the text below:


```
[[inputs.elasticsearch]]
  servers = ["http://<USER_CHANGE_ME>:<PASS_CHANGE_ME>@localhost:9200"]
  http_timeout = "5s"
  local = true
  cluster_health = true
  cluster_stats = true
  cluster_stats_only_from_master = true
  indices_include = ["_all"]
  indices_level = "cluster"
  node_stats = ["indices", "os", "process", "jvm", "thread_pool", "fs", "transport", "http"]
  [inputs.elasticsearch.tags]
    environment="dev_CHANGE_ME"
    component="database"
    db_system="elasticsearch"
    db_cluster="elasticsearch_on_premise_CHANGE_ME"
[[outputs.sumologic]]
  url = "<URL Created in Step 3_CHANGEME>"
        data_format = "prometheus"
```



    Please enter values for the following parameters (marked in **bold_CHANGE_ME** above):



* In the input plugins section, that is `[[inputs.elasticsearch]]`:
    * `servers` - The URL to the elasticsearch server. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/elasticsearch) for more information on additional parameters for configuring the Elasticsearch input plugin for Telegraf.
    * In the tags section, which is `[inputs.Elasticsearch.tags]`
        * `environment` - This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
        * `db_cluster` - Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.
    * In the output plugins section, that is `[[outputs.sumologic]]`:
        * url - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

    Here’s an explanation for additional values set by this Telegraf configuration.



11
If you haven’t defined a cluster in Elasticsearch, then enter ‘**`default`**’ for `db_cluster`.
12
There are additional values set by the Telegraf configuration.  We recommend not to modify  these values as they might cause the Sumo Logic app to not function correctly.



* **data_format** - “prometheus” In the output plugins section, which is `[[outputs.sumologic]]`. Metrics are sent in the Prometheus format to Sumo Logic
* `component: “database”` - In the input plugins section, that is `[[inputs.Elasticsearch]]` - This value is used by Sumo Logic apps to identify application components.
* For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for more properties that can be configured in the Telegraf agent globally.


13
After you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).


At this point, Elasticsearch metrics should start flowing into Sumo Logic.


### Configure Logs Collection

This section provides instructions for configuring log collection for Elasticsearch running on a non-kubernetes environment for the Sumo Logic App for Elasticsearch.

By default, Elasticsearch logs are stored in a log file.

Local log files can be collected via [Installed collectors](https://help.sumologic.com/03Send-Data/Installed-Collectors). The installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for collection to work. For detailed requirements for Installed collectors, see this [page](https://help.sumologic.com/01Start-Here/03About-Sumo-Logic/System-Requirements/Installed-Collector-Requirements).


1. Configure logging in Elasticsearch \
Elasticsearch supports logging via local text log files. Elasticsearch logs have four levels of verbosity. To select a level, set loglevel to one of:
* debug (a lot of information, useful for development/testing)
* verbose (includes information not often needed, but logs less than debug)
* notice (moderately verbose, ideal for production environments) - this is the **default value**
* warning (only very important/critical messages are logged)

All logging settings are located in [Elasticsearch.conf](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html).

By default, Elasticsearch logs are stored in `/var/log/elasticsearch/ ELK-<Clustername>.log`. The default directory for log files is listed in the Elasticsearch.conf file.

Logs from the Elasticsearch log file can be collected via a Sumo Logic [Installed collector](https://help.sumologic.com/03Send-Data/Installed-Collectors) and a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) as explained in the next section.

1. Configuring a Collector \
To collect logs directly from the Elasticsearch machine, configure an[ Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors).
2. Configuring a Source \
 \
**For an Installed Collector \
**To collect logs directly from your Elasticsearch machine, use an Installed Collector and a Local File Source.
    1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).
    2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your error.log or access.log. The files are typically located in `/var/log/elasticsearch/elasticsearch-<clustername>.log`. If you are using a customized path, check the Elasticsearch.conf file for this information.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
* **Source Category.** Enter any string to tag the output collected from this Source, such as **elasticsearch/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. Set the following fields:**
    * `component = database`
    * `db_system = elasticsearch`
    * `db_cluster = <Your_Elasticsearch_Cluster_Name>`
    * `environment = <Environment_Name>, such as Dev, QA or Prod.`

1. Configure the **Advanced** section:
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Choose the option, **Ignore time zone from the log file and instead use**, and then select your Elasticsearch Server’s time zone.
* **Timestamp Format.** The timestamp format is automatically detected.
* **Encoding. **Select** **UTF-8 (Default).
* **Enable Multiline Processing.** Detect messages spanning multiple lines
    * Infer Boundaries - Detect message boundaries automatically
1. Click **Save**.

At this point, Elasticsearch logs should start flowing into Sumo Logic.


## Elasticsearch Alerts

Sumo Logic has provided out of the box alerts available via[ Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you quickly determine if the Elasticsearch database cluster is available and performing as expected.


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
   <td>Elasticsearch - Cluster Red
   </td>
   <td>This alert fires when Elasticsearch Cluster status is RED
   </td>
   <td>Critical
   </td>
   <td>&#62; &#61;3
   </td>
   <td> &#60;3
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Cluster Yellow
   </td>
   <td>This alert fires when Elasticsearch Cluster status is YELLOW
   </td>
   <td>Warning
   </td>
   <td>&#62; &#61;2
   </td>
   <td> &#60;2
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Disk Out of Space
   </td>
   <td>This alert fires when the disk usage is over 90%
   </td>
   <td>Critical
   </td>
   <td> &#62;90
   </td>
   <td>&#60; &#61;90
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Disk Space Low
   </td>
   <td>This alert fires when the disk usage is over 80%
   </td>
   <td>Warning
   </td>
   <td> &#62;80
   </td>
   <td>&#60; &#61; 80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Healthy Data Nodes
   </td>
   <td>This alert fires when there missing data node in Elasticsearch cluster
   </td>
   <td>Critical
   </td>
   <td> &#60;3
   </td>
   <td>&#62; &#61;3
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Healthy Nodes
   </td>
   <td>This alert fires when there is missing node in Elasticsearch cluster
   </td>
   <td>Critical
   </td>
   <td> &#60;3
   </td>
   <td>&#62; &#61;3
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Heap Usage Too High
   </td>
   <td>This alert fires when the heap usage is over 90%
   </td>
   <td>Critical
   </td>
   <td> &#62;90
   </td>
   <td>&#60; &#61;90
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Heap Usage Warning
   </td>
   <td>This alert fires when the heap usage is over 80%
   </td>
   <td>Warning
   </td>
   <td> &#62;80
   </td>
   <td>&#60; &#61;80
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Initializing Shards Too Long
   </td>
   <td>This alert fires when elasticsearch has been initializing shards for 5 min
   </td>
   <td>Warning
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Pending Tasks
   </td>
   <td>This alert fires when elasticsearch has pending tasks.
   </td>
   <td>Warning
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Relocating Shards Too Long
   </td>
   <td>This alert fires when elasticsearch has been relocating shards for 5min
   </td>
   <td>Warning
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Elasticsearch - Unassigned Shards
   </td>
   <td>This alert fires when Elasticsearch has unassigned shards
   </td>
   <td>Critical
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Elasticsearch - Query Time Too Slow
   </td>
   <td>This alert fires when queries are slow to execute
   </td>
   <td>Critical
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Elasticsearch - Query Time Slow
   </td>
   <td>This alert fires when query time is greater than 5 ms
   </td>
   <td>Warning
   </td>
   <td> &#62;0
   </td>
   <td>&#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Elasticsearch - Too Many Slow Query
   </td>
   <td>This alert fires when there aret oo Many Slow Query in 5 minutes
   </td>
   <td>Warning
   </td>
   <td> &#62;100
   </td>
   <td>&#60; &#61;100
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Elasticsearch - Error Log Too Many
   </td>
   <td>Error Log Too Many
   </td>
   <td>Critical
   </td>
   <td> &#62;1000
   </td>
   <td>&#60; &#61;1000
   </td>
  </tr>
</table>
