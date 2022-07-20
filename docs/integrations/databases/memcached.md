---
id: memcached
title: Sumo Logic App for Memcached
sidebar_label: Memcached
---

The Memcached app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Memcached clusters. Preconfigured dashboards provide insight into uptime, operational metrics, cache performance, resource utilization, errors, warnings, and commands executed.

The Sumo Logic App for Memcached is tested for Version: 1.4.15.
Sample Log Message

Kubernetes:
```
{"timestamp":1626248704386,"log":"28: going from conn_closing to conn_closed","stream":"stderr","time":"2021-07-14T07:45:01.839243101Z"}
```
Non-Kubernetes:
```
Jun 23 07:35:01 node03 memcached: <31 set GFcIh47CswfCnwk3JkmJ 0 0 4096
```


## Collect Logs and Metrics for Memcached

This page provides instructions for configuring log and metric collection for the Sumo Logic App for Memcached.


### Collection Process Overview


Configuring log and metric collection for the Memcached App includes the following tasks:


* Step 1: Configure Fields in Sumo Logic.
* Step 2: Configure Collection for Memcached
    * [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Memcached/Collect_Logs_and_Metrics_for_Memcached/Collect_Memcached_Logs_and_Metrics_for_Non-Kubernetes_environments.).
    * [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Memcached/Collect_Logs_and_Metrics_for_Memcached/Collect_Memcached_Logs_and_Metrics_for_Kubernetes_environments).


#### Step 1: Configure Fields in Sumo Logic
2


Create the following Fields in Sumo Logic before configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Memcached in a non-Kubernetes environment create the fields:



* component
* environment
* db_system
* db_cluster
* pod

If you are using Memcached in a Kubernetes environment create the fields:



* pod_labels_component
* pod_labels_environment
* pod_labels_db_system
* pod_labels_db_cluster


#### Step 2: Configure Collection for Memcached


* [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Memcached/Collect_Logs_and_Metrics_for_Memcached/Collect_Memcached_Logs_and_Metrics_for_Non-Kubernetes_environments.).
* [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Memcached/Collect_Logs_and_Metrics_for_Memcached/Collect_Memcached_Logs_and_Metrics_for_Kubernetes_environments).


### Collect Memcached Logs and Metrics for Kubernetes environments


In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture).

The diagram below illustrates how data is collected from Memcached in a Kubernetes environment. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd, and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Memcached. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.


Follow the below instructions to set up the logs and metrics collection:

1. Configure Metrics Collection
    1. Setup Kubernetes Collection with the Telegraf operator
    2. Add annotations on your Memcached pods
2. Configure Logs Collection
    3. Configure logging in Memcached.
    4. Add labels on your Memcached pods to capture logs from standard output.
    5. Collecting Memcached Logs from a Log file.

**Prerequisites**

It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


### Step 1: Configure Metrics Collection
5


This section explains the steps to collect Memcached metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more on this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:



1. [Set up Kubernetes Collection with the Telegraf Operator.](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment)
2. Add annotations on your Memcached pods \
On your Memcached Pods, add the following annotations:


```
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+

  servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment="dev_CHANGE_ME"
    component="database"
    db_system="memcached"
    db_cluster="memcached_on_k8s_CHANGE_ME"
```


Please enter in values for the following parameters (marked in **bold_CHANGE_ME** above):



* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf Memcached Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Memcached input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section which is `[[inputs.memcached]]`:
        * servers- An array of addresses to gather stats about. Specify an IP on the hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
    * In the tags section which is `[inputs.memcached.tags]`:
        * `environment` - This is the deployment environment where the Memcached cluster identified by the value of servers resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `db_cluster` - Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.

Here’s an explanation for additional values set by this configuration that we request you please do not modify as they will cause the Sumo Logic apps to not function correctly.



* `telegraf.influxdata.com/class`: sumologic-prometheus - This instructs the Telegraf operator what output to use. This should not be changed.
* `prometheus.io/scrape`: "true" - This ensures our Prometheus will scrape the metrics.
* `prometheus.io/port`: "9273" - This tells prometheus what ports to scrape on. This should not be changed.
* `telegraf.influxdata.com/inputs`
    * In the tags section which is `[inputs.memcached.tags]`:
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * `db_system: “memcached”` - This value identifies the database system.

For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.



1. Verify metrics in Sumo Logic.


### Step 2 Configure Logs Collection
6


This section explains the steps to collect Memcached logs from a Kubernetes environment.



1. (Recommended Method) Add labels on your Memcached pods to capture logs from standard output.

Follow the instructions below to capture Memcached logs from stdout on Kubernetes.



1. Apply the following labels to the Memcached pods:

     labels:



```
environment: "prod_CHANGE_ME"
component: "database"
db_system: "memcached"
db_cluster: "memcached_on_k8s_CHANGE_ME"
```



    Please enter in values for the following parameters (marked in bold above):



* **environment** - This is the deployment environment where the Memcached cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
* **db_cluster **- Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **component**: “database” - This value is used by Sumo Logic apps to identify application components.
* **db_system**: “memcached” - This value identifies the database system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.


    2. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection,[ visit](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.


    3. Verify logs in Sumo Logic.

1. (Optional) Collecting Memcached Logs from a Log File

If your Memcached chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:



1. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
2. Add the following annotation in addition to the existing annotations.


```
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Memcached_log_file>/<Memcached_log_file_name>
```


Example:


```
annotations:
    tailing-sidecar: sidecarconfig;data:/var/bitnami/memcached/logs/memcached.log

```



1. Make sure that the Memcached pods are running and annotations are applied by using the command: **kubectl describe pod <Memcached_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.

3. Add a FER to normalize the fields in Kubernetes environments

Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Proxy Application Components. To do so:



1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the + Add button on the top right of the table.
3. The following form appears:


7




1. Enter the following options:
* **Rule Name**. Enter the name as **App Observability - Database**.
* **Applied At.** Choose **Ingest Time**
* **Scope**. Select **Specific Data**
* **Scope**: Enter the following keyword search expression:


```
pod_labels_environment=* pod_labels_component=database pod_labels_db_system=* pod_labels_db_cluster=*

```



* **Parse Expression**.Enter the following parse expression:


```
if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
| pod_labels_component as component
| pod_labels_db_system as db_system
| pod_labels_db_cluster as db_cluster

```



1. Click **Save** to create the rule.


### Collect Memcached Logs and Metrics for Non-Kubernetes environments.


We use the Telegraf operator for Memcached metric collection and Sumo Logic Installed Collector for collecting Memcached logs. The diagram below illustrates the components of the Memcached collection in a non-Kubernetes environment. Telegraf runs on the same system as Memcached and uses the[ Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain Memcached metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Memcached on the other hand are sent to a Sumo Logic Local File source.

This section provides instructions for configuring logs and metrics collection for the Sumo Logic App for Memcached. Follow the below instructions to set up the logs and metrics collection:

1. Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure and start Telegraf
2. Configure Logs Collection
    5. Configure logging in Memcached
    6. Configure Sumo Logic Installed Collector


### Step 1 Configure Metrics Collection
9




1. **Configure a Hosted Collector \
**To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.
2. **Configure an HTTP Logs and Metrics Source \
**Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.
3. **Install Telegraf \
**Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.
4. **Configure and start Telegraf \
**As part of collecting metrics data from Telegraf, we will use the Memcached[ input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.  \
 \
Create or modify `telegraf.conf` and copy and paste the text below:  


```
 servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment="dev_CHANGE_ME"
    component="database"
    db_system="memcached"
    db_cluster="memcached_on_premise_CHANGE_ME"

  url = "<URL Created in Step 3_CHANGEME>"
  data_format = "prometheus"
```


Please enter values for the following parameters (marked in **bold_CHANGE_ME** above):



* In the input plugins section which is`[[inputs.memcached]]`
    * **servers**- An array of addresses to gather stats about. Specify an IP on hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
    * In the tags section which is `[inputs.memcached.tags]`
        * **environment** - This is the deployment environment where the Memcached cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **db_cluster** - Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
* In the output plugins section which is `[[outputs.sumologic]]`
    * **url** - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.



* **data_format** - “prometheus” In the output plugins section i.e.   Metrics are sent in the Prometheus format to Sumo Logic
* **component**: “database” - In the input plugins section i.e. - This value is used by Sumo Logic apps to identify application components.
* For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for more properties that can be configured in the Telegraf agent globally.

Once you have finalized your `telegraf.conf` file, you can start or reload the Telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Memcached metrics should start flowing into Sumo Logic.


### Step 2 Configure Logs Collection
10


This section provides instructions for configuring log collection for Memcached running on a non-kubernetes environment for the Sumo Logic App for Memcached.

By default, Memcached logs are stored in a log file. Local log files can be collected via [Installed collectors](https://help.sumologic.com/03Send-Data/Installed-Collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-and-Firewall-Security) for collection to work. For detailed requirements for Installed collectors, see this [page](https://help.sumologic.com/01Start-Here/03About-Sumo-Logic/System-Requirements/Installed-Collector-Requirements).

**Configure logging in Memcached \
**By default, the installation of Memcached will not write any request logs to disk.  \
 \
To add a log file for Memcached, you can use the following syntax: \
`memcached -d -m 3072 -l localhost -p 11211 -u nobody -v 2>>/var/log/memcached/memcached.log \
 \
`or  \
 \
if you’re on RHEL/CentOS, you can edit the file `/etc/sysconfig/memcached` like so: \
`PORT="11211"`


```
USER="memcached"
MAXCONN="3048"
CACHESIZE="256"

```



1. `OPTIONS="-vv >> /var/log/memcached/memcached.log 2>&1" \
`Save the file, restart Memcached.
2. **Configuring a Collector \
**To collect logs directly from the Memcached machine, configure an[ Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors).
3. **Configuring a Source \
**To collect logs directly from your Memcached machine, use an Installed Collector and a Local File Source.
    1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).
    2. Configure the Local File Source fields as follows:
        * **Name.** (Required)
        * **Description.** (Optional)
        * **File Path (Required).** Enter the path to your error.log or access.log. The files are typically located in `/var/log/memcached/memcached.log`. If you are using a customized path, check the `Memcached.conf` file for this information.
        * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
        * **Source Category.** Enter any string to tag the output collected from this Source, such as **Memcached/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices:-Good-Source-Category,-Bad-Source-Category).)
        * **Fields. Set the following fields:**
            * **component = database**
            * **db_system = memcached**
            * **db_cluster = <Your_Memcached_Cluster_Name>**
            * **environment = <Environment_Name>, such as Dev, QA or Prod.**
11

    3. Configure the **Advanced** section:
        * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
        * **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your Memcached Server’s time zone.
        * **Timestamp Format.** The timestamp format is automatically detected.
        * **Encoding. **Select** **UTF-8 (Default).
        * **Enable Multiline Processing.** Detect messages spanning multiple lines
            * Infer Boundaries - Detect message boundaries automatically
    4. Click **Save**. \
At this point, Memcached logs should start flowing into Sumo Logic.


## Install the Memcached Monitors, App, and view the Dashboards

This page has instructions for installing Sumo Logic Monitors for Memcached, the app, and descriptions of each app dashboards.


### Install Monitors

Sumo Logic has provided pre-packaged alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you proactively determine if a Memcached cluster is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, see [Memcached Alerts](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MySQL/MySQL_Alerts).

To install these monitors, you must have the **Manage Monitors** role capability.

You can install monitors by importing a JSON file or using a Terraform script.


13
There are limits to how many alerts can be enabled. For more information, see [Monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Rules) for details.


#### Method 1: Install Monitors by importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Memcached/Memcached.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Memcached/Memcached.json) contains alerts from Sumo Logic searches that do not have any scope filters and, therefore, will apply to all Memcached clusters, the data for which has been collected via the instructions in the previous sections.  

However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the `text db_cluster=* `with `<Your Custom Filter>`.  

Custom filter examples:



1. For alerts applicable only to a specific cluster, your custom filter would be:  `db_cluster=dev-memcached-01`
2. For alerts applicable to all clusters that start with `memcached-prod`, your custom filter would be: `db_cluster=memcachedt-prod*`
3. For alerts applicable to specific clusters within a production environment, your custom filter would be:** **

`db_cluster=dev-memcached-01` AND `environment=prod` (This assumes you have set the optional environment tag while configuring collection)



1. Go to **Manage Data > Alerts > Monitors**.
2. Click **Add**.
3. Click **Import. \
**
15

4. On the** Import Content popup**, enter **Memcached** in the Name field, paste the JSON into the popup, and click **Import**. \

16

5. The monitors are created in "Memcached" folder. The monitors are disabled by default. See the [Monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) topic for information about enabling monitors and configuring notifications or connections.


#### Method 2: Install Monitors using a Terraform script
17



##### Step 1: Generate a Sumo Logic access key and ID
18


Generate an access key and access ID for a user that has the **Manage Monitors** role capability. For instructions, see  [Access Keys](https://help.sumologic.com/Manage/Security/Access-Keys#Create_an_access_key_on_Preferences_page).


##### Step 2: Download and install Terraform
19


Download [Terraform 0.13](https://www.terraform.io/downloads.html) or later and install.


##### Step 3: Download the Sumo Logic Terraform package for Memcached monitors
20


The alerts package is available in the Sumo Logic GitHub [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/Memcached). You can either download it using the git clone command or as a zip file.


##### Step 4: Alert Configuration  
21


After extracting the package, navigate to the  `terraform-sumologic-sumo-logic-monitor/monitor_packages/Memcached/` directory.

Edit the `Memcached.auto.tfvars` file and add the Sumo Logic Access Key and Access ID from Step 1 and your Sumo Logic deployment. If you're not sure of your deployment, see [Sumo Logic Endpoints and Firewall Security](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).


```
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```


The Terraform script installs the alerts without any scope filters. If you would like to restrict the alerts to specific clusters or environments, update the `memcached_data_source` variable. For example:

***INSERT TABLE***


All monitors are disabled by default on installation. To enable all of the monitors, set the monitors_disabled parameter to false.

By default, the monitors will be located in a "Memcached" folder on the **Monitors** page. To change the name of the folder, update the monitor folder name in the folder variable in the `Memcached.auto.tfvars` file.

If you want the alerts to send email or connection notifications, follow the instructions in the next section.


##### Step 5: Email and Connection Notification Configuration Examples
22


Edit the `Memcached_notifications.auto.tfvars` file to populate the `connection_notifications` and email_notifications sections.

Examples are provided below.

**Pagerduty connection example**

In the variable definition below, replace `<CONNECTION_ID>` with the connection ID of the Webhook connection. You can obtain the Webhook connection ID by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).


23
For information about overriding the payload for different connection types, see [Set Up Webhook Connections](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections).


```
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


**Email notifications example**


```
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



##### Step 6: Install Monitors
24




1. Navigate to the terraform-sumologic-sumo-logic-monitor/monitor_packages/Memcached/ directory and run terraform init. This will initialize Terraform and download the required components.
2. Run terraform plan to view the monitors that Terraform will create or modify.
3. Run terraform apply.

This section demonstrates how to install the Memcached App.


### To install the app:
25


Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


26
Version selection applies only to a few apps currently. For more information, see the[ Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library).



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name or enter a name of your choice for the app. 
    2. **Data Source.**
        * Choose **Enter a Custom Data Filter**, and enter a custom filter for Memcached cluster. Examples:
            1. For all Memcached clusters \
`db_cluster=*`
            2. For specific clusters: \
`db_cluster=memcached.dev.01` 
            3. Clusters within a specific environment: \
`db_cluster=memcached-1` and `environment=prod \
`(This assumes you have set the optional environment tag while configuring collection)
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but you'll see complete graphs and maps in a bit of time.


### Dashboard Filters with Template Variables
27


Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the Filter with template variables help page.


#### Memcached - Overview
28


The Memcached - Overview dashboard provides an at-a-glance view of the Memcached server status, error logs along with database metrics.


29



## Memcached - Operations
30


The Memcached - Operations Dashboard provides detailed analysis on connections, thread requested, network bytes, hash expansion size, table size.


## Memcached - Command Stats

The Memcached - Command Stats dashboard provides detailed insights into the number of commands being performed.


## Memcached - Cache Information

The Memcached - Cache Information dashboard provides insight into cache states, cache hit, and miss rate over time.


## Memcached - Logs

This dashboard helps you quickly analyze your Memcached error logs, commands executed, and objects stored.


# Memcached Alerts

Sumo Logic has provided out-of-the-box alerts available via [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you quickly determine if the Memcached database cluster is available and performing as expected.
