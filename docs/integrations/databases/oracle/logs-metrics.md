---
id: collect-logs-metrics
title: Collect Logs and Metrics for the Oracle App
sidebar_label: Collect Logs and Metrics
description: Instructions for collecting logs for the Sumo Logic App for Oracle.
---

This page provides instructions for configuring log and metric collection for the Sumo Logic App for Oracle.


## Collection Process Overview

Configuring log and metric collection for the Oracle App includes the following tasks:

* Configure Fields in Sumo Logic.
* Configure Collection for Oracle
    * [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/00Collect_Logs_for_Oracle/Collect_Oracle_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/00Collect_Logs_for_Oracle/Collect_Oracle_Logs_and_Metrics_for_Kubernetes_environments).


#### Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Oracle in a  non-Kubernetes environment create the fields:

* component
* environment
* db_system
* db_cluster
* pod

If you are using Oracle in a Kubernetes environment create the fields:

* pod_labels_component
* pod_labels_environment
* pod_labels_db_system
* pod_labels_db_cluster


#### Configure Collection for Oracle  

Sumo Logic supports the collection of logs and metrics data from Oracle in both Kubernetes and non-Kubernetes environments.

Please click on the appropriate links below based on the environment where your Oracle clusters are hosted.



* [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/00Collect_Logs_for_Oracle/Collect_Oracle_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/00Collect_Logs_for_Oracle/Collect_Oracle_Logs_and_Metrics_for_Kubernetes_environments).




## Collect Oracle Logs and Metrics for Kubernetes environments


In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). The diagram below illustrates how data is collected from Oracle in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd, and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Oracle. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: i.e. Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.


Follow the below instructions to set up the metric collection:



1. Configure Metrics Collection
    1. Configure Oracle pod to send Oracle metrics to Sumo Logic
    2. Setup Kubernetes Collection with the Telegraf operator
    3. Add annotations on your Oracle pods
2. Configure Logs Collection
    4. Configure logging in Oracle.
    5. Add labels on your Oracle pods to capture logs from standard output.
    6. Collecting Oracle Logs from a Log file.

**Prerequisites**

It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


### Configure Metrics Collection


This section explains the steps to collect Oracle metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

**Step 1. Configure Oracle pod to send metrics to Sumo Logic**


    We use custom Python script which sends Oracle metrics into Sumo Logic as mentioned [here](https://github.com/SumoLogic/sumologic-integrations/tree/main/Oracle#step-4-create-a-script-to-gather-oracle-rdbms-metrics). There are two methods to execute the script in pod:



1. Use [Config Map to execute the script.](https://github.com/kubernetes/kubernetes/issues/71356#issuecomment-441169334)
2. Modify existing dockerfile and update the Pod definition:


```
FROM python:3.7
RUN pip install cx_Oracle
# Install Oracle Client
ENV ORACLE_HOME=/opt/oracle
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME/lib
RUN wget https://dl.influxdata.com/telegraf/r....4-1_amd64.deb \
    && dpkg -i telegraf_1.20.4-1_amd64.deb
RUN apt-get update && apt-get install -y libaio1 && rm -rf /var/lib/apt/lists/* \
 && wget -q https://download.oracle.com/otn_soft....0.0.0dbru.zip \
 && unzip instantclient-*.zip \
 && mkdir -p $ORACLE_HOME \
 && mv instantclient_19_6 $ORACLE_HOME/lib \
 && rm -f instantclient-*.zip
COPY sumo_oracle_metrics.py /app/
COPY exec_oracle_metrics.sh /app/
RUN chmod +x entrypoint.sh && chmod +x /tmp/exec_oracle_metrics.sh
CMD ["telegraf"]
```


**Step 2. [Setup Kubernetes Collection with the Telegraf Operator.](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment)**

**Step 3. Add annotations on your Oracle pods**


    On your Oracle Pods, add the following annotations:


```
annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
        [[inputs.exec]]
          commands = ["/path_TO_BE_CHANGEME/exec_oracle_metrics.sh"]
          timeout = "5s"
          data_format = "influx"
          [inputs.exec.tags]
            environment="dev_TO_BE_CHANGEME"
            component="database"
            db_system="oracle"
            db_cluster="oracle_on_premise_TO_BE_CHANGEME"
```



7


If you haven’t defined a cluster in Oracle, then enter ‘**default**’ for `db_cluster`.


    Enter in values for the following parameters (marked in bold above):



* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf exec Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Oracle input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section i.e. :
        * **commands **- The [exec](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) plugin executes all the commands in parallel on every interval and parses metrics from their output in any one of the accepted [Input Data Formats](https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md).
    * In the tags section i.e.  [inputs.exec.tags]
        * **environment** - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **db_cluster** - Enter a name to identify this Oracle cluster. This cluster name will be shown in the Sumo Logic dashboards.  

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **telegraf.influxdata.com/class: sumologic-prometheus** - This instructs the Telegraf operator what output to use. This should not be changed.
* **prometheus.io/scrape: "true"** - This ensures our Prometheus will scrape the metrics.
* **prometheus.io/port: "9273"** - This tells prometheus what ports to scrape on. This should not be changed.
* **telegraf.influxdata.com/inputs**
    * In the tags section i.e.  [inputs.exec.tags]
        * **component**: “database” - This value is used by Sumo Logic apps to identify application components.
        * **db_system**: “oracle” - This value identifies the database system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

* Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
* Verify metrics in Sumo Logic.


### Configure Logs Collection
8


This section explains the steps to collect Oracle logs from a Kubernetes environment.



1. **(Recommended Method) Add labels on your Oracle pods to capture logs from standard output.**

    Make sure that the logs from Oracle are sent to stdout. Follow the instructions below to capture Oracle logs from stdout on Kubernetes.

1. Apply following labels to the Oracle pod        

        ```
        labels:
            environment: "prod_CHANGEME"
            component: "database"
            db_system: "oracle"
            db_cluster "Cluster_CHANGEME"
        ```



    Please enter in values for the following parameters (marked in **bold and CHANGE_ME** above):

* **environment** - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example:- dev, prod, or QA. While this value is optional we highly recommend setting it.
* **db_cluster** - Enter a name to identify this Oracle cluster. This cluster name will be shown in the Sumo Logic dashboards. If you haven’t defined a cluster in Oracle, then enter ‘**default**’ for `db_cluster`.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **component**: “database” - This value is used by Sumo Logic apps to identify application components.
* **db_system**: “oracle” - This value identifies the database system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection,[ visit](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.
2. Verify logs in Sumo Logic.
1. **(Optional) Collecting Oracle Logs from a Log File \
**Follow the steps below to capture Oracle logs from a log file on Kubernetes.
1. Determine the location of the Oracle log file on Kubernetes. This can be determined from the Oracle.conf for your Oracle cluster along with the mounts on the Oracle pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.


```
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Oracle_log_file>/<SQLserver_log_file_name>
```


Example:


```
annotations:
  tailing-sidecar: sidecarconfig;data:/var/opt/oracle/errorlog

```



1. Make sure that the Oracle pods are running and annotations are applied by using the command: **kubectl describe pod <Oracle_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. Verify logs in Sumo Logic.
1. **Add an FER to normalize the fields in Kubernetes environments \
**Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Proxy Application Components. To do so:
1. Go to **Manage Data > Logs > Field Extraction Rules.**
2. Click the** + **Add button on the top right of the table**. \
**The following form appears.


9


1. Enter the following options:
1. **Rule Name**. Enter the name as **App Observability - database**.
2. **Applied At.** Choose **Ingest Time.**
3. **Scope**. Select **Specific Data.**
4. **Scope**: Enter the following keyword search expression.

        ```
        pod_labels_environment=* pod_labels_component=database pod_labels_db_cluster=* pod_labels_db_system=*
        ```


* **Parse Expression**. Enter the following parse expression.

            ```
            if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
            | pod_labels_component as component
            | pod_labels_db_system as db_system
            | pod_labels_db_cluster as db_cluster
            ```


1. Click **Save** to create the rule.



## Collect Oracle Logs and Metrics for Non-Kubernetes environments


Sumo Logic uses the Telegraf operator for Oracle metric collection and the [Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors/01About-Installed-Collectors) for collecting Oracle logs. The diagram below illustrates the components of the Oracle collection in a non-Kubernetes environment. Telegraf uses the[ exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver) to obtain Oracle metrics and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Oracle are collected by a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).


10


The process to set up collection for Oracle data is done through the following steps:



1. Configure Logs Collection
    1. Enable Oracle Logging
    2. Verify Log Files Path.
    3. Configure three Local log file Sources.
    4. Set Up Oracle Performance Metrics Script
2. Configure Metrics Collection
    5. Configure a Hosted Collector
    6. Configure an HTTP Logs and Metrics Source
    7. Install Telegraf
    8. Configure, and start Telegraf


### Configure Logs Collection
11


This section provides instructions for configuring log collection for Oracle running on a non-Kubernetes environment.

Preview steps for Oracle log collection:



1. Enable Oracle Logging
2. Verify Log Files Path.
3. Configure three Local log file Sources.
4. Set Up Oracle Performance Metrics Script

**Step 1. Enable Oracle Logging**                                                                      


    If logging is not currently enabled for the following logs, enable it



* **Alert log**
* **Listener log**

    Enable Listener Log: The basic syntax of Listener Control utility commands is as follows


    ```
    lsnrctl command [listener_name]
    lsnrctl set log_status on
    ```


* **Audit Log  — Follow [this](https://docs.oracle.com/cd/E11882_01/server.112/e10575/tdpsg_auditing.htm#TDPSG50000) guide to enable Audit Logs**

**Step 2. Verify Local logs file directories and Path.**



* **Oracle Alert Logs**

    For 11g and later releases (12c, 18c, 19c)


    By default, Oracle logs are stored in


    **$ORACLE_BASE/diag/rdbms/$DB_UNIQUE_NAME/$ORACLE_SID/trace/**.


    The default directory for log files is value of `BACKGROUND_DUMP_DEST`. you can query the value of `BACKGROUND_DUMP_DEST`, an initialization parameter, where you can find Oracle alert log


    SQL> show parameter background_dump_dest;



12


* **Oracle Listener Logs**

    You can check listener log file with command


    ```
    [oracle@sumolab alert]$ lsnrctl status
    ```




13


* **Oracle Audit Logs**

    By default, Oracle logs are stored in


    **$ORACLE_BASE/app/oracle/admin/orcl/adump**


    The default directory for log files is value of `audit_file_dest`. you can query the value of `audit_file_dest`, an initialization parameter, where you can find directory  Oracle Audit log


    SQL> show parameter audit



14



    Audit Logs should be in either `XML, EXTENDED` or `{{OS }}` for app to Work.


**Step 3. Configure three Local File Sources.**


    In this step, you will configure three Local File sources on an installed collector, one for each of the following Oracle logs: Alert, Listener, and Audit.


    Follow the instructions in [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).


    When you configure the sources, plan your source categories to ease the querying process.  A hierarchical approach allows you to make use of wildcards. For example:


<table>
  <tr>
   <td>Source
   </td>
   <td>Example Source Category
   </td>
  </tr>
  <tr>
   <td>Alert Logs
   </td>
   <td>DB/Oracle/Alert
   </td>
  </tr>
  <tr>
   <td>Listener Logs
   </td>
   <td>DB/Oracle/Listener
   </td>
  </tr>
  <tr>
   <td>Audit
   </td>
   <td>DB/Oracle/Audit
   </td>
  </tr>
</table>



    Add Following **Fields** on each Local File Source:



* **Fields. **Set the following fields**:**
    * `component = database`.
    * `db_system = oracle`.
    * `db_cluster = <Your_Oracle_Cluster_Name>`. Enter **Default** if you do not have one.
    * `environment = <Your_Environment_Name> `(for example, Dev, QA, or Prod).


15



**Step 4. Set Up Oracle Performance Metrics Script.**


    The instructions for setting up the Oracle performance metrics script vary by operating system:



* For Linux, see [Set Up Oracle Performance Metrics Script on Linux](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/01Set_Up_Oracle_Performance_Metrics_Script_on_Linux)
* For Windows, see[ Set Up Oracle Performance Metrics Script on Windows](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/Oracle/02Set_Up_Oracle_Performance_Metrics_Script_on_Windows)


### Configure Metrics Collection
16



#### Set up a Sumo Logic HTTP Source
17


**Step 1. Configure a Hosted Collector for Metrics.**


    To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) documentation.

**Step 2. Configure an HTTP Logs & Metrics source:**



1. On the created Hosted Collector on the Collection Management screen, select Add Source.
2. Select** HTTP Logs & Metrics_._**
    1. **Name **(Required). Enter a name for the source**.**
    2. **Description **(Optional).
    3. **Source Category (**Recommended). Be sure to follow the [Best Practices for Source Categories](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category). A recommended Source Category may be Prod/DB/Oracle/Metrics.
3. Select** Save.**
4. Take note of the URL provided once you click _Save_. You can retrieve it again by selecting the **Show URL **next to the source on the Collection Management screen.


#### Setup Telegraf
18


**Step 3. Install Telegraf**



1. Install Telegraf if you haven’t already.
    * Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.
2. **Install custom Python script to send Oracle metrics into Sumo**
    * Use the[ following steps](https://github.com/SumoLogic/sumologic-integrations/tree/main/Oracle) to install a custom Python script to send Oracle metrics into Sumo.

**Step 4. Configure and start Telegraf.**


    As part of collecting metrics data from Telegraf, we will use the [exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.


    There are two options



* Create `telegraf.conf` file.
* or modify existing `telegraf.conf` file.

    And copy and paste the text below



```
[[inputs.exec]]
  commands = ["/path_TO_BE_CHANGEME/exec_oracle_metrics.sh"]
  timeout = "5s"
  data_format = "influx"
  [inputs.exec.tags]
    environment="DEV_TO_BE_CHANGEME"
    component="database"
    db_system="oracle"
    db_cluster="PROD_TO_BE_CHANGEME"

[[outputs.sumologic]]
  url = "<URL_from_HTTP_Logs_and_Metrics_Source>"
  data_format = "prometheus"
```


Enter values for fields annotated with `<VALUE_TO_BE_CHANGED>` to the appropriate values. Do not include the brackets (`<>`) in your final configuration

* Input plugins section, which is `[[inputs.exec]]`:
    * **commands **- The [exec](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) plugin executes all the commands in parallel on every interval and parses metrics from their output in any one of the accepted [Input Data Formats](https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md).
* In the tags section, which is `[inputs.exec.tags]`:
    * **environment** - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example; dev, prod, or QA. While this value is optional we highly recommend setting it.
    * **db_cluster** - Enter a name to identify this Oracle cluster. This cluster name will be shown in our dashboards.
* In the output plugins section, which is `[[outputs.sumologic]]`:
    * **URL** - This is the HTTP source URL created previously. See this doc for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration.


19
If you haven’t defined a cluster in Oracle, then enter ‘**default**’ for `db_cluster`.
20
There are additional values set by the Telegraf configuration.  We recommend not to modify these values as they might cause the Sumo Logic app to not function correctly.



* **data_format**: “prometheus” - In the output `[[outputs.sumologic]]` plugins section. Metrics are sent in the Prometheus format to Sumo Logic.
* **component** - “database” - In the input `[[inputs.exec]]` plugins section. This value is used by Sumo Logic apps to identify application components.
* **db_system** - “oracle” - In the input plugins sections. This value identifies the database system.

    See[ this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for all other parameters that can be configured in the Telegraf agent globally.



21
After you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from this[ doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Telegraf should start collecting the Oracle metrics and forward them to the Sumo Logic HTTP Source.
