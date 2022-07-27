---
id: postgresql
title: Sumo Logic App for PostgreSQL
sidebar_label: PostgreSQL
description: The Sumo Logic App for PostgreSQL is a unified logs and metrics app for monitoring your PostgreSQL database. The app consists of predefined dashboards that allow you to track performance, logins, connections, errors, and overall system health.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/databases/postgresql.png')} alt="DB icon" width="75"/>

The Sumo Logic App for PostgreSQL is a unified logs and metrics app for monitoring your PostgreSQL database. The app provides operational insights into the PostgreSQL database—installed on your local hardware—for real time analysis.

The Sumo Logic App for PostgreSQL includes predefined searches and dashboards that allow you to monitor logs and metrics for the database. The logs enable you to monitor database activity, user activity, incoming connections, query execution time, and errors. The metrics allow you to monitor database resource utilization and throughput performance.

This guide provides an overview of the Sumo App for PostgreSQL features and Dashboards, as well as instructions for collecting logs and metrics from PostgreSQL and installing the App.

[PostgreSQL](https://www.postgresql.org/) is an open source object-relational database that extends the robustness SQL language to safely store and scale extensive data workloads.


## Collect logs and metrics from PostgreSQL

This page provides instructions for configuring log and metric collection for the Sumo Logic App for PostgreSQL.


1
This app works for PostgreSQL database clusters running on PostgreSQL versions 11.x or 12.x.


#### Collection Process Overview
2


Configuring log and metric collection for the PostgreSQL App includes the following tasks:



* Step 1: Configure Access
* Step 2: Configure Fields in Sumo Logic.
* Step 3: Configure Collection for PostgreSQL
    * [Collect PostgreSQL Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments)
    * [Collect PostgreSQL Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Kubernetes_environments.)


##### Step 1: Configure Access
3


On your PostgreSQL database cluster, create a user that has access to following tables:



* pg_stat_database
* pg_stat_bgwriter
* pg_stat_replication
* pg_database
* pg_locks
* pg_stat_user_tables
* pg_stat_user_indexes
* pg_statio_user_indexes
* pg_statio_user_tables
* pg_class


##### Step 2: Configure Fields in Sumo Logic
4


Create the following Fields in Sumo Logic before configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using PostgreSQL in a  non-Kubernetes environment create the fields:



* component
* environment
* db_system
* db_cluster
* pod

If you are using PostgreSQL in a Kubernetes environment create the fields:



* pod_labels_component
* pod_labels_environment
* pod_labels_db_system
* pod_labels_db_cluster


##### Step 3: Configure Collection for PostgreSQL
5


Sumo Logic supports collection of logs and metrics data from PostgreSQL in both Kubernetes and non-Kubernetes environments.

Please click on the appropriate links below based on the environment where your PostgreSQL clusters are hosted.



* [Collect PostgreSQL Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect PostgreSQL Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Kubernetes_environments.).


##### Query Sample
6


This sample Query is from the **Fatal Errors** panel of the **PostgreSQL - Overview** dashboard.

**Query String**


```
_sourceCategory=/PostgreSQL/*  db_system=postgresql db_cluster={{db_cluster}}

| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as _raw
| parse "* * * [*] *@* *:  *" as date,time,time_zone,thread_id,user,db,severity,msg
| where severity IN ("ERROR", "FATAL")
| count by date, time, severity, db, user, msg
```



## Collect PostgreSQL Logs and Metrics for Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture).The diagram below illustrates how data is collected from PostgreSQL in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from PostgreSQL. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: i.e. Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [PostgreSQL Extensible input plugin ](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/postgresql_extensible/)to obtain metrics, (For simplicity, the diagram doesn’t show the input plugins). The injection of the Telegraf sidecar container is done by the Telegraf Operator. Prometheus scrapes the metrics from each of the Telegraf containers and sends it to FluentD.We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.




7


Follow the instructions below to set up the metric collection:



1. [Configure Metrics Collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Kubernetes_environments.#step-1-configure-metrics-collection)
    1. Add annotations on your PostgreSQL pods
    2. (Optional)Collecting metrics from multiple databases
2. [Configure Logs Collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Kubernetes_environments.#step-2-configure-logs-collection)
    3. Configuring logging in PostgreSQL
    4. Add labels on your PostgreSQL pods to capture logs from standard output.
    5. (Optional) Collecting PostgreSQL logs from a file.

**Prerequisites**



* Please ensure that you are monitoring your Kubernetes clusters with the Telegraf operator -  If you are not, then please follow [these instructions](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment) to do so.


#### Step 1 Configure Metrics Collection
8


Follow the steps below to collect metrics from a Kubernetes environment:



1. Add annotations on your PostgreSQL Pods

        On your PostgreSQL Pods, add the following annotations mentioned in this [file](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/postgresql_annotations_kubernetes.txt).


        Please enter in values for the following parameters (marked with CHANGE_ME) in the downloaded file:

* Annotations:
    * **telegraf.influxdata.com/inputs **- This contains the required configuration for the Telegraf Postgres Input plugin.As telegraf will be run as a sidecar the host should always be localhost.
        * In the input plugins section which is **[[inputs.postgresql_extensible]]**
            * **address** - Specify the db user, db name and password used for connecting to the database.Example "host=localhost user=postgres dbname=postgres password=mypassword sslmode=disable"
        * In the tags section, which is **[inputs.postgresql_extensible.tags]**
            * **environment** - This is the deployment environment where the postgresql cluster resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
            * **db_cluster** - Enter a name to identify this PostgreSQL cluster. This cluster name will be shown in the Sumo Logic dashboards. For example:  analytics-dbcluster, webapp-dbcluster

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** these values as they will cause the Sumo Logic apps to not function correctly.

* **telegraf.influxdata.com/class: sumologic-prometheus** - This instructs the Telegraf operator what output to use. This should not be changed.
* **prometheus.io/scrape: "true"** - This ensures our Prometheus plugin will scrape the metrics.
* **prometheus.io/port: "9273"** - This tells Prometheus what ports to scrape metrics from. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags sections **[inputs.postgresql_extensible.tags]**
        * **component=** **“database”** - This value is used by Sumo Logic apps to identify application components.
        * **db_system=** **“postgresql”** - This value identifies the database system.

    For more information on configuring the PostgreSQL input plugin for Telegraf please see [ this doc](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/postgresql_extensible/README.md).


    For more information on all other Telegraf related global parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf).


    Once this has been done, the Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the annotations defined in the previous step. Verify metrics are flowing into Sumo Logic by running the following metrics query:


    ```
    component="database" and db_system="postgresql"
    ```



    2. Collecting metrics from multiple databases (Optional)


        If you want to monitor multiple databases then you can copy and paste the text from this [file](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/postgresql_annotations_kubernetes_multiple_db.txt) and create another [[inputs.postgresql_extensible]] section and add it in your annotations. This section contains only those queries which are meant to be run for each database.


              Here is an example [sample_postgresql_annotations_kubernetes_multiple_db.txt](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/sample_postgresql_annotations_kubernetes_multiple_db.txt).



#### Step 2 Configure Logs Collection
9


This section explains the steps to collect PostgreSQL logs from a Kubernetes environment.



1. Configuring logging parameters in postgresql.conf
2. Add labels on your PostgreSQL pods.
3. (Recommended Method) Collecting Logs written to Standard output
4. (Optional) Collect PostgreSQL logs written to log files.
5. Add an FER to normalize fields in Kubernetes environments





1. Configuring logging parameters in postgresql.conf
    1. Edit the postgresql.conf configuration file present in your pod.Under the **ERROR REPORTING AND LOGGING** section of the file, use the following config parameters.


```
log_min_duration_statement = 250
log_connections = on
log_duration = on
log_hostname = on
log_timezone = 'UTC'
log_min_messages = 'WARNING'
log_line_prefix = '%m [%p] %q%u@%d '
```



        For more information on the above parameters, please see [the PostgreSQL documentation.](https://www.postgresql.org/docs/12/static/runtime-config-logging.html)


10
It’s recommended to save configurations in ConfigMap so that when pods are spawned / killed the configuration is not lost. See [these instructions](https://docs.bitnami.com/kubernetes/infrastructure/postgresql/configuration/customize-config-file) on how to customize the config file in the bitnami helm chart.



1. Add labels on your PostgreSQL pods
1. Apply the following labels to your PostgreSQL pods:

          labels:


             environment: "**<environment name for example dev, qa>-CHANGE_ME**"


             component: "database"


             db_system: "postgresql"


             db_cluster: "**<cluster name for example analytics-dbcluster, webapp-dbcluster>-CHANGE_ME**"


        Please enter in values for the following parameters (marked in bold and CHANGE_ME above):

* Labels:
    * **environment** - This is the deployment environment where the PostgreSQL cluster identified by the value of **servers** resides. For example dev, prod or qa. While this value is optional we highly recommend setting it.
    * **db_cluster** - Enter a name to identify this PostgreSQL cluster. This cluster name will be shown in the Sumo Logic dashboards.For example analytics-dbcluster, webapp-dbcluster.

        Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* Labels:
    * **component: “database”** - This value is used by Sumo Logic apps to identify application components.
    * **db_system: “postgresql” **- This value identifies the database system.

    3. Collecting Logs written to Standard output (Recommended)


        The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying the Sumo Logic Kubernetes Collection, please see[ this page](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App).


    4.** Collect PostgreSQL logs **written to log files (Optional)


        If your PostgreSQL service is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to stdout. To do this:

1. Determine the location of the PostgreSQL log file on Kubernetes.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.

            annotations:


            tailing-sidecar:sidecarconfig;container_name:<mount_volume>:/<path_of_postgresql_log_file_name>


            Example:


            annotations:


              tailing-sidecar: sidecarconfig;data:/pg_data/postgresql.log

1. Make sure that the PostgreSQL pods are running and annotations and labels are applied.Verify by using the command: **kubectl describe pod <**PostgreSQL**_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.


11
Since pods are frequently killed and spawned it’s recommended to use operators like this [postgresql operator](https://github.com/CrunchyData/postgres-operator) so that when new pods are created the annotations and labels are automatically applied using the ConfigMap or CRD based configurations.



1. Add an FER to normalize the fields in Kubernetes environments

        Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Database Application Components. To do so:

1. Go to **Manage Data** > **Logs** > **Field Extraction Rules**.
2. Click the **+ Add** button on the top right of the table.
3. The following form appears:


12


1. Enter the following options:
    * **Rule Name**. Enter the name as **App Component Observability - Database.**
    * **Applied At**. Choose Ingest Time
    * **Scope**. Select Specific Data

**Scope**: Enter the following keyword search expression: \
`pod_labels_environment=* pod_labels_component=database pod_labels_db_system=* pod_labels_db_cluster=*`



        *

**Parse Expression**.Enter the following parse expression: \
`| if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment`


```
            | pod_labels_component as component
            | pod_labels_db_system as db_system
            | pod_labels_db_cluster as db_cluster

```



        *
2. Click **Save** to create the rule.
3. Verify logs are flowing into Sumo Logic by running the following logs query


```
component="database" and db_system="postgresql"
```



#### Sample Log Messages
13



```
{ "timestamp":1615988485842, "log":"2021-04-01 08:30:20.002 UTC [11916] postgres@postgres LOG: connection authorized: user=postgres database=postgres ", "stream":"stdout", "time":"2021-03-17T13:41:19.103646109Z" }

```



1.


## Collect PostgreSQL Logs and Metrics for Non-Kubernetes environments

We use the Telegraf Operator for PostgreSQL metric collection and the Sumo Logic Installed Collector for collecting PostgreSQL logs. The diagram below illustrates the components of the PostgreSQL collection in a non-Kubernetes environment for each database server. Telegraf runs on the same system as PostgreSQL, and uses the [PostgreSQL Extensible input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/postgresql_extensible) to obtain PostgreSQL metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. PostgreSQL logs are sent to Sumo Logic Local File Source on Installed Collector.




######
14
** **
15


This section provides instructions for configuring metrics collection for the Sumo Logic App for PostgreSQL. Follow the below instructions to set up the metric collection for a given node in a PostgreSQL cluster:



1. [Configure Metrics Collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments#step-1-configure-metrics-collection)
    1. Configure a Hosted Collector
    2. Configure a HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure and start Telegraf
    5. (Optional)Collecting metrics from multiple databases
2. [Configure Logs Collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments#step-2-configure-logs-collection-for-each-database-server)
    6. Configure logging in PostgreSQL
    7. Configure an Installed Collector
    8. Configuring a Local File Source


#### Step 1 Configure Metrics Collection  
16



    1. Configure a Hosted Collector


        To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.


    2. Configure a HTTP Logs and Metrics Source


        Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.



17






    3. Install Telegraf


        Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf on each database server node


    4. Configure and start Telegraf


        As part of collecting metrics data from Telegraf, we will use the [Postgresql extensible input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/postgresql_extensible) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.


        Create or modify telegraf.conf in `/etc/telegraf/telegraf.d/` and copy and paste the text from this [file](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/postgresql_input_output_plugin_onprem.txt):


        Please enter values for the following parameters (marked with CHANGE_ME) in the downloaded file:



* In the input plugins section which is `[[inputs.postgresql_extensible]]`:
    * **address** - Specify the db user, db name, and password used for connecting to the database. This is the user you created for monitoring the PosgreSQL database in [Step 1](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments#step-1-configure-metrics-collection). Ex "host=localhost dbname=postgres user=postgres password=mypassword sslmode=disable"
    * In the tags section which is `[inputs.postgresql_extensible.tags]`:
        * **environment** - This is the deployment environment where the Postgresql cluster resides. For example dev, prod or qa. While this value is optional we highly recommend setting it.
        * **db_cluster** - Enter a name to identify this PostgreSQL cluster. This cluster name will be shown in the Sumo Logic dashboards. For example  analytics-dbcluster, webapp-dbcluster
* In the output plugins section which is `[[outputs.sumologic]]`:
    * **url** - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

        Here’s an explanation for additional values set by this Telegraf configuration that we request you **please do not modify these values** as they will cause the Sumo Logic apps to not function correctly.

* **data_format** = “prometheus” In the output plugins section which is [[outputs.sumologic]]  This indicates that metrics should be sent in the Prometheus format to Sumo Logic
* **component **= “database” - In the input plugins section which is [[inputs.postgresql_extensible.tags]] - This value is used by Sumo Logic apps to identify application components.
* **db_system** = “postgresql” - In the input plugins sections which is [inputs.postgresql_extensible.tags]] -  This value identifies the database system.

        For other optional parameters like databases, max_lifetime please refer to [this plugin ](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/postgresql_extensible/README.md)documentation for configuring the postgresql_extensible input plugin for Telegraf.


        Here is an example [sample_telegraf.conf](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/sample_postgresql_onprem_telegraf.conf) file.


        For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md#agent) for more properties that can be configured in the Telegraf agent globally.


        Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).


        At this point, PostgreSQL metrics should start flowing into Sumo Logic.


    5. (Optional)Collecting metrics from multiple databases


        If you want to monitor multiple databases then you can copy and paste the text from this [file](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/postgresql_input_output_plugin_onprem_multiple_db.txt) and create another [[inputs.postgresql_extensible]] section. This section contains only those queries which are meant to be run for each database.


            Here is an example [sample_telegraf_multiple.conf](https://sumologic-app-data.s3.amazonaws.com/dashboards/PostgreSQL/sample_postgresql_onprem_telegraf_multiple_db.conf)



#### Step 2 Configure Logs Collection for each database server
18



    Perform the steps outlined below for each PostgreSQL database server.


    1. Configure logging in PostgreSQL


        **Pre-requisites:**



* Locate your local PostgreSQL **postgresql.con**f configuration file in the database data_directory. For more information, see the [PostgreSQL File Locations documentation](https://www.postgresql.org/docs/9.1/static/runtime-config-file-locations.html). By default it’s located at `/var/lib/pgsql/<version>/data/postgresql.conf`. You can run SHOW config_file command inside your server’s psql shell to get the location.

        After determining the location of conf file modify the PostgreSQL **postgresql.conf** configuration file logging parameters

1. Connect to the database server(using SSH) in a terminal window.
2. Open postgresql.conf configuration file.
3. Under the **ERROR REPORTING AND LOGGING** section of the file, use following config parameters. For more information on the following parameters, Click [here](https://www.postgresql.org/docs/12/static/runtime-config-logging.html)


```
log_destination = 'stderr'
logging_collector = on
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_truncate_on_rotation = off
log_rotation_age = 1d
log_min_duration_statement = 250
log_connections = on
log_duration = on
log_hostname = on
log_timezone = 'UTC'
log_min_messages = 'WARNING'
log_line_prefix = '%m [%p] %q%u@%d '
```



            4. Save the **postgresql.conf** file and restart the postgresql server:


```
sudo service postgresql restart
```



    2. Configure an Installed Collector


        To add an Installed collector, perform the steps as defined on the page [Configure an Installed Collector.](https://help.sumologic.com/03Send-Data/Installed-Collectors)


    3. Configuring a Local File Source


        To add a Local File Source source for PostgreSQL do the following



1. Add a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) in the installed collector configured in the previous step.
2. Configure the Local File Source fields as follows:
3. **Name.** (Required)
4. **Description.** (Optional)
5. **File Path (Required).** Enter the path to your log file.By default postgreSQL log files are located in `/var/lib/pgsql/<version>/data/log/*.log`  
6. **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
7. **Source Category.** Enter any string to tag the output collected from this Source, such as **PostgreSQL/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
8. **Fields. **Set the following fields:
    * component = database
    * db_system = postgresql
    * db_cluster = <Your_Postgresql_Cluster_Name> For example analytics-dbcluster, webapp-dbcluster
    * environment = <Environment_Name> For example dev, prod or qa.
9.
19
The values of db_cluster and environment should be the same as they were configured in the [Configure and start telegraf section](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL/Collect_PostgreSQL_Logs_and_Metrics_for_Non-Kubernetes_environments#configure-and-start-telegraf).
10. Configure the **Advanced** section:
    * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
    * **Time Zone.** Use **the timezone from log file **option.
    * **Timestamp Format.** The timestamp format is automatically detected.
    * **Encoding. **Select** **UTF-8 (Default).
    * **Enable Multiline Processing.** Detect messages spanning multiple lines
        * Select Infer Boundaries - Detect message boundaries automatically
11. Click **Save**.

        Here’s the sample source.json



```
{
  "api.version":"v1",
  "source":{
    "name":"PostgreSQL_Logs_Source",
    "category":"/PostgreSQL/logs",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "fields":{
      "environment":"dev",
      "db_cluster":"analytics_cluster",
      "component":"database",
      "db_system":"postgresql"
    },
    "pathExpression":"/var/lib/pgsql/12/data/log/*.log",
    "blacklist":[],
    "sourceType":"LocalFile"
  }
}
```



        :
20



        At this point, PostgreSQL logs should start flowing into Sumo Logic.


#### Sample Log Messages
21



```
2021-04-01 08:30:20.002 UTC [11916] postgres@postgres LOG:  connection authorized: user=postgres database=postgres

```



1.


## Install the PostgreSQL App, Alerts, and view the dashboards

This page provides instructions for installing the Sumo Appand Alerts for PostgreSQL, as well as the descriptions of each of the app dashboards. These instructions assume you have already set up collection as described in the [Collect Logs and Metrics from PostgreSQL](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/Collect_logs_and_metrics_from_PostgreSQL) App page.


#### Pre-Packaged Alerts
22


Sumo Logic has provided out of the box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you monitor your PostgreSQL cluster. These alerts are built based on metrics and logs datasets and include preset thresholds based on industry best practices and recommendations.

For details on the individual alerts,  please see [this page](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/PostgreSQL/PostgreSQL_Alerts).


#### Installing Alerts
23

* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing them a JSON or a Terraform script.


24
There are limits to how many alerts can be enabled - please see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ) for details.


##### Method 1: Install the alerts by importing a JSON file
25




1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/postgresql/postgresql.json) describing all the monitors.
    1. The JSON contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all PostgreSQL clusters, the data for which has been collected via the instructions in the previous sections. However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text ‘**db_system=postgresql **with ‘**<Your Custom Filter> db_system=postgresql**’.  \
 \
Custom filter examples:
        1. For alerts applicable only to a specific cluster, your custom filter would be:  **‘db_cluster=postgresql-prod.01’.**
        2. For alerts applicable to all clusters that start with postgresql-prod, your custom filter would be: **‘db_cluster=postgresql-prod*’**.
        3. For alerts applicable to a specific cluster within a production environment, your custom filter would be:
            * **db_cluster=postgresql-1 and environment=prod** (This assumes you have set the optional environment tag while configuring collection)
2. Go to Manage Data > Alerts > Monitors.
3. Click **Add**: \

26

4. Click Import to import monitors from the JSON above.


27
The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the PostgreSQL folder under Monitors to configure them. See [this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors, to configure each monitor, to send notification to teams or connections please see the instructions detailed in step 4 of this [document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


##### Method 2: Install the alerts using a Terraform script
28



###### Step 1: Generate a Sumo Logic access key and ID
29


Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Please identify which deployment your Sumo Logic account is in, using this [ link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).


###### Step 2: Download and install Terraform 0.13 or later  
30
[Download and install Terraform 0.13](https://www.terraform.io/downloads.html)


###### Step 3: Download the Sumo Logic Terraform package for PostgreSQL alerts
31


The alerts package is available in the Sumo Logic github [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/postgresql). You can either download it through the “git clone” command or as a zip file.


###### Step 4: Alert Configuration  
32


After the package has been extracted, navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**postgresql**/

Edit the **postgresql.auto.tfvars** file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1 .

```
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```

The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable **’postgresql_data_source’**. Custom filter examples:



1. A specific cluster **‘db_cluster=postgresql.prod.01’**
2. All clusters in an environment **‘environment=prod’**
3. For alerts applicable only to a specific cluster, your custom filter would be:  **‘db_cluster=postgresql-.prod.01’**
4. For alerts applicable to all clusters that start with postgresql-prod, your custom filter would be: ‘**db_cluster=postgresql-prod*’**
5. For alerts applicable to a specific cluster within a production environment, your custom filter would be:

    **db_cluster=postgresql-1 and environment=prod** (This assumes you have set the optional environment tag while configuring collection)


All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter **monitors_disabled** to false in this file.

By default, the monitors are configured in a monitor folder called “PostgreSQL”, if you would like to change the name of the folder, update the monitor folder name in this file.

If you would like the alerts to send email or connection notifications, configure these in the file **postgresql_notifications.auto.tfvars**. For configuration examples, refer to the next section.


###### Step 5: Email and Connection Notification Configuration Examples
33


To** configure notifications, m**odify the file postgresql_notifications.auto.tfvars file and fill in the connection_notifications and email_notifications sections. See the examples for PagerDuty and email notifications below. See this [document](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections) for creating payloads with other connection types.




###### **Pagerduty Connection Example: **
34



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


Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).




###### **Email Notifications Example: **
35



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



###### Step 6: Install the Alerts
36




1. Navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**postgresql**/ and run **terraform init. **This will initialize Terraform and will download the required components.
2. Run **terraform plan **to view the monitors which will be created/modified by Terraform.
3. Run **terraform apply**.


###### Step 7: Post Installation
37


If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. This is detailed in Step 4 of [this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


#### Install the app
38


This section demonstrates how to install the PostgreSQL App.

Now that you have set up log and metric collection for PostgreSQL, you can install the Sumo Logic App for PostgreSQL to use the pre-configured Searches and [Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_RDS/Amazon-RDS-Metrics-App-Dashboards#Dashboards).

To install the app, do the following:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.
39
Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library).
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Choose **Enter a Custom Data Filter**, and enter a custom PostgreSQL cluster filter. Examples:
        * For all PostgreSQL clusters \
**db_cluster=***
        * For a specific cluster: \
**db_cluster=postgresql.dev.01**. 
        * Clusters within a specific environment: \
**db_cluster=postgresql-1 and environment=prod**  \
(This assumes you have set the optional environment tag while configuring collection)
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library.**

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


#### Dashboard Filters with template variables    
40


Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause.** **For more information, see the [Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


41
You can use template variables to drill down and examine the data on a granular level.


#### PostgreSQL - Overview Dashboard
42


The **PostgreSQL - Overview** dashboard gives you an at-a-glance view of the state of your database clusters by monitoring errors, failed logins, slow queries and trends over time.

Use this dashboard to:



* Determine the number of active databases, clusters and deadlocks.
* Drill-down into database errors, failed logins and slow queries.
* Determine if your database or queries need to be tuned based on comparing the number slow queries.
* Monitor the number of insert, update, delete operations by cluster.


43



#### PostgreSQL - Query Execution Dashboard
44


The** PostgreSQL Query Execution **dashboard gives you insights into the number and time taken to execute queries:

Use this dashboard to:



* Monitor query performance and identify slow queries.
* Examine query execution trends.


45



#### PostgreSQL - Database Metrics Dashboard
46


The** PostgreSQL - Database Metrics** dashboard allows you to monitor the database performance, which includes disk usage, deadlocks, buffer hits, server processes, commits, rollbacks, and scans.

Use this dashboard to:



* Understand the behavior and performance of your database clusters.  
* Monitor database size and disk usage.  
* Identify top 5 and least 5 frequently scanned indexes.


47



#### PostgreSQL - Relation and Schema Metrics Dashboard
48


The** PostgreSQL - Relation and Schema Metrics **dashboard allows you to view and analyze the metrics for monitoring the relations and schema in a cluster.

Use this dashboard to:



* Monitor PostgreSQL relation and schema metrics trends over time.
* Monitor sequential scans and index scans and determine if executed queries are accessing them.
* Monitor the size of tables, and query operations which will determine the performance of your queries.


49


Query performance can degrade with growth in size of table, database and/or indexes. This means that you either need to scale up the database instance, [partition your data](https://www.postgresql.org/docs/current/static/ddl-partitioning.html), or redesign your indexes. Unusual growth in disk space can also mean there are problems with [VACUUMs](https://www.postgresql.org/docs/9.1/static/sql-vacuum.html) .

If your database regularly performs more sequential scans over time, you can improve its performance by creating an [index](https://www.postgresql.org/docs/current/static/sql-createindex.html) on frequently accessed data.


50



#### PostgreSQL - Security Dashboard
51


The** PostgreSQL - Security** dashboard provides insight into locations of incoming connections, failed authentications and top database errors and warnings.

Use this dashboard to:



* Monitor incoming connections, failed authorization requests, and outliers in the number of queries executed outlier.
* Identify known malicious IPs that are accessing your databases and use firewall access control lists to prevent them from sending you traffic going forward.


52



### PostgreSQL - Error Logs Dashboard
53


The **PostgreSQL - Error Logs **dashboard** **provides insight into database error  logs by specifically monitoring errors, user activity, database activity and database shutdown/start events.

Use this dashboard to:



* Quickly identify errors and patterns in logs for troubleshooting
* Monitor error trends and quickly identify outliers
* Identify unexpected database or user activity


54



### PostgreSQL - Slow Queries Dashboard
55


The** PostgreSQL - Slow Queries **dashboard** **provides insights into all slow queries executed on the database.

Use this dashboard to:



* Identify all slow queries
* Monitor users and databases running slow queries
* Determine which SQL commands are slower than others
* Examine slow query trends to determine if there are periodic performance bottlenecks in your database clusters


56


## PostgreSQL Metrics

Here are the metrics available for PostgreSQL.

<table>
  <tr>
   <td>PostgreSQL Metrics List
   </td>
  </tr>
  <tr>
   <td>postgresql_numbackends
   </td>
  </tr>
  <tr>
   <td>postgresql_xact_commit
   </td>
  </tr>
  <tr>
   <td>postgresql_xact_rollback
   </td>
  </tr>
  <tr>
   <td>postgresql_blks_read
   </td>
  </tr>
  <tr>
   <td>postgresql_blks_hit
   </td>
  </tr>
  <tr>
   <td>postgresql_tup_inserted
   </td>
  </tr>
  <tr>
   <td>postgresql_tup_updated
   </td>
  </tr>
  <tr>
   <td>postgresql_tup_deleted
   </td>
  </tr>
  <tr>
   <td>postgresql_deadlocks
   </td>
  </tr>
  <tr>
   <td>postgresql_tup_fetched
   </td>
  </tr>
  <tr>
   <td>postgresql_tup_returned
   </td>
  </tr>
  <tr>
   <td>postgresql_checkpoints_timed
   </td>
  </tr>
  <tr>
   <td>postgresql_checkpoints_req
   </td>
  </tr>
  <tr>
   <td>postgresql_buffers_checkpoint
   </td>
  </tr>
  <tr>
   <td>postgresql_buffers_clean
   </td>
  </tr>
  <tr>
   <td>postgresql_buffers_backend
   </td>
  </tr>
  <tr>
   <td>postgresql_stat_ssl_compression_count
   </td>
  </tr>
  <tr>
   <td>postgresql_replication_delay
   </td>
  </tr>
  <tr>
   <td>postgresql_replication_lag
   </td>
  </tr>
  <tr>
   <td>postgresql_replay_lag
   </td>
  </tr>
  <tr>
   <td>postgresql_flush_lag
   </td>
  </tr>
  <tr>
   <td>postgresql_write_lag
   </td>
  </tr>
  <tr>
   <td>postgresql_db_size
   </td>
  </tr>
  <tr>
   <td>postgresql_num_locks
   </td>
  </tr>
  <tr>
   <td>postgresql_seq_scan
   </td>
  </tr>
  <tr>
   <td>postgresql_seq_tup_read
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_scan
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_tup_fetch
   </td>
  </tr>
  <tr>
   <td>postgresql_n_tup_ins
   </td>
  </tr>
  <tr>
   <td>postgresql_n_tup_upd
   </td>
  </tr>
  <tr>
   <td>postgresql_n_tup_del
   </td>
  </tr>
  <tr>
   <td>postgresql_n_tup_hot_upd
   </td>
  </tr>
  <tr>
   <td>postgresql_n_live_tup
   </td>
  </tr>
  <tr>
   <td>postgresql_n_dead_tup
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_scan
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_tup_read
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_tup_fetch
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_blks_read
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_blks_hit
   </td>
  </tr>
  <tr>
   <td>postgresql_heap_blks_read
   </td>
  </tr>
  <tr>
   <td>postgresql_heap_blks_hit
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_blks_read
   </td>
  </tr>
  <tr>
   <td>postgresql_idx_blks_hit
   </td>
  </tr>
  <tr>
   <td>postgresql_index_size
   </td>
  </tr>
  <tr>
   <td>postgresql_table_size
   </td>
  </tr>
</table>



## PostgreSQL Alerts

Sumo Logic provides out of the box alerts available via [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors). These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

**Sumo Logic provides the following out-of-the-box alerts for PostgreSQL:**

57
The  metrics queries are derived as per[ Prometheus rules](https://awesome-prometheus-alerts.grep.to/rules.html).

**INSERT TABLE**
