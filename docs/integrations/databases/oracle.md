---
id: oracle
title: Oracle
description: The Sumo Logic App for Oracle provides insight into the health and activity of your Oracle database. The app consists of predefined dashboards that present information about errors, ORA messages, listener activity, connections, security monitoring, and the syslog and XML audit trails.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/oracle.png')} alt="Thumbnail icon" width="100"/>

The Oracle app is a unified logs and metrics app that helps you monitor Oracle database cluster availability, performance, and resource utilization. Preconfigured dashboards and searches provide insight into the health of your database clusters, parallel executions, resource utilization, response time, tablespaces, throughput, wait for class/events, listeners, audit logs, and security.

This app is tested with the following Oracle versions:
* Non-Kubernetes: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production - Version 19.3.0.0.0
* Kubernetes: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production - Version 19.3.0.0.0

## Log Types

* Alert Logs
* Listener Logs
* Audit Logs

## Collect Logs and Metrics for the Oracle app

This section provides instructions for configuring logs and metrics collection for the Sumo Logic app for the Oracle.

### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see [Sumo Logic Fields](/docs/manage/fields.md).

:::note
This step is not needed if you are using the application components solution terraform script.
:::

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

If you're using Oracle in a Kubernetes environment, create the fields:

* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`
* `pod_labels_db_cluster_address`
* `pod_labels_db_cluster_port`


</TabItem>
<TabItem value="non-k8s">

If you're using Oracle in a non-Kubernetes environment, create the fields:

* `component`
* `environment`
* `db_system`
* `db_cluster`
* `db_cluster_address`
* `db_cluster_port`
`

</TabItem>
</Tabs>


### Step 2: Configure Oracle Logs and Metrics Collection  

Sumo Logic supports the collection of logs and metrics data from Oracle in both Kubernetes and non-Kubernetes environments.

Click on the appropriate links based on the environment where your Oracle clusters are hosted.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). The diagram below illustrates how data is collected from Oracle in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<br/><img src={useBaseUrl('img/integrations/databases/oracle2.png')} alt="oracle" />

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from Oracle. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: i.e. Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

Follow the below instructions to set up the metric collection:

1. [Configure Metrics Collection](#configure-metrics-collection)
    1. Configure Oracle pod to send Oracle metrics to Sumo Logic
    2. Set up Kubernetes Collection with the Telegraf operator
    3. Add annotations on your Oracle pods
2. [Configure Logs Collection](#configure-logs-collection)
    1. Configure logging in Oracle.
    2. Add labels on your Oracle pods to capture logs from standard output.
    3. Collecting Oracle Logs from a Log file.

:::note Prerequisites
It’s assumed that you are using the latest helm chart version. If not, upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/v3-migration-doc.md).
:::

#### Configure Metrics Collection

This section explains the steps to collect Oracle metrics from a Kubernetes environment.

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about this[ here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

**Step 1. Configure Oracle pod to send metrics to Sumo Logic**

We use custom Python script which sends Oracle metrics into Sumo Logic as mentioned [here](https://github.com/SumoLogic/sumologic-integrations/tree/main/Oracle#step-4-create-a-script-to-gather-oracle-rdbms-metrics). There are two methods to execute the script in pod:

1. Use [Config Map to execute the script.](https://github.com/kubernetes/kubernetes/issues/71356#issuecomment-441169334)
2. Modify existing dockerfile and update the Pod definition:
```bash
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

**Step 2. [Setup Kubernetes Collection with the Telegraf Operator.](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf)**

**Step 3. Add annotations on your Oracle pods**

On your Oracle Pods, add the following annotations:
```sql
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
            environment ="dev_ENV_TO_BE_CHANGED"
            component ="database"
            db_system ="oracle"
            db_cluster ="oracle_on_premise_ENV_TO_BE_CHANGED"
            db_cluster_address = "ENV_TO_BE_CHANGED"
            db_cluster_port = "ENV_TO_BE_CHANGED"
```

* If you haven’t defined a cluster in Oracle, enter `default` for `db_cluster`.
* Enter values for the parameters marked `ENV_TO_BE_CHANGED` in the snippet above:
   * `telegraf.influxdata.com/inputs` - This contains the required configuration for the Telegraf exec Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Oracle input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
   * In the input plugins section:
      * **commands** - The [exec](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) plugin executes all the commands in parallel on every interval and parses metrics from their output in any one of the accepted [Input Data Formats](https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md).
   * In the tags section `[inputs.exec.tags]`:
      * `environment` - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster` - Enter a name to identify this Oracle cluster. This cluster name will be shown in the Sumo Logic dashboards.  
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
      :::note
      `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

      For example, if your application uses `“oracle-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=oracle-prod.sumologic.com db_cluster_port=3306`

      If your application connects directly to a given oracle node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=oracle-prod.sumologic.com`

      Pivoting to Tracing data from Entity Inspector is possible only for “Oracle address” Entities.
      :::
   * **Do not modify the following values** as it will cause the Sumo Logic apps to not function correctly:
      * `telegraf.influxdata.com/class: sumologic-prometheus` - This instructs the Telegraf operator what output to use. This should not be changed.
      * `prometheus.io/scrape: "true"` - This ensures our Prometheus will scrape the metrics.
      * `prometheus.io/port: "9273"` - This tells prometheus what ports to scrape on. This should not be changed.
      * `telegraf.influxdata.com/inputs`
      * In the tags section [inputs.exec.tags]:
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * `db_system: “oracle”` - This value identifies the database system.
   * For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#Configuring-Telegraf) for more parameters that can be configured in the Telegraf agent globally.

Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.

Verify metrics in Sumo Logic.

#### Configure Logs Collection

This section explains the steps to collect Oracle logs from a Kubernetes environment.

1. **(Recommended Method) Add labels on your Oracle pods to capture logs from standard output.** Make sure that the logs from Oracle are sent to stdout. Follow the instructions below to capture Oracle logs from stdout on Kubernetes.
1. Apply following labels to the Oracle pod:    
```bash
labels:
    environment: "prod_ENV_TO_BE_CHANGED"
    component: "database"
    db_system: "oracle"
    db_cluster "Cluster_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
```

Enter in values for the following parameters (marked in **ENV_TO_BE_CHANGED** above):

* `environment` - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example:- dev, prod, or QA. While this value is optional we highly recommend setting it.
* `db_cluster` - Enter a name to identify this Oracle cluster. This cluster name will be shown in the Sumo Logic dashboards. If you haven’t defined a cluster in Oracle, then enter ‘**default**’ for `db_cluster`.
* `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
* `db_cluster_port` - Enter the database port. If not provided, a default port will be used.

:::note
`db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses `“oracle-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=oracle-prod.sumologic.com db_cluster_port=3306`

If your application connects directly to a given oracle node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=oracle-prod.sumologic.com`

Pivoting to Tracing data from Entity Inspector is possible only for “Oracle address” Entities.
:::

**Do not modify** the following values as they will cause the Sumo Logic apps to not function correctly.
* `component: “database”` - This value is used by Sumo Logic apps to identify application components.
* `db_system: “oracle”` - This value identifies the database system.

For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#Configuring-Telegraf) for more parameters that can be configured in the Telegraf agent globally.

1. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [visit](/docs/integrations/containers-orchestration/kubernetes#Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.
1. Verify logs in Sumo Logic.
1. **(Optional) Collecting Oracle Logs from a Log File**. Follow the steps below to capture Oracle logs from a log file on Kubernetes.
1. Determine the location of the Oracle log file on Kubernetes. This can be determined from the Oracle.conf for your Oracle cluster along with the mounts on the Oracle pods.
1. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
1. Add the following annotation in addition to the existing annotations.
```sql
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Oracle_log_file>/<SQLserver_log_file_name>
```

Example:
```sql
annotations:
  tailing-sidecar: sidecarconfig;data:/var/opt/oracle/errorlog
```

1. Make sure that the Oracle pods are running and annotations are applied by using the command:
  ```bash
  kubectl describe pod <Oracle_pod_name>
  ```
2. The Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. Verify logs in Sumo Logic.

**Add an FER to normalize the fields in Kubernetes environments**

This step is not needed if you're using application components solution terraform script. Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Proxy Application Components. To do so:
1. Go to **Manage Data > Logs > Field Extraction Rules.**
1. Click the **+Add** button on the top right of the table.
1. The **Add Field Extraction Rule** form will appear. Enter the following options:
   1. **Rule Name**. Enter the name as **App Observability - database**.
   2. **Applied At.** Choose **Ingest Time.**
   3. **Scope**. Select **Specific Data.**
   4. **Scope**: Enter the following keyword search expression.
   ```sql
   pod_labels_environment=* pod_labels_component=database pod_labels_db_cluster=* pod_labels_db_system=*
   ```
   5. **Parse Expression**. Enter the following parse expression.
   ```sql
   if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
   | pod_labels_component as component
   | pod_labels_db_system as db_system
   | if(!isEmpty(pod_labels_db_cluster), pod_labels_db_cluster, null) as db_cluster
   ```
1. Click **Save** to create the rule.

</TabItem>
<TabItem value="non-k8s">

Sumo Logic uses the Telegraf operator for Oracle metric collection and the [Installed Collector](/docs/send-data/installed-collectors) for collecting Oracle logs. The diagram below illustrates the components of the Oracle collection in a non-Kubernetes environment. Telegraf uses the [exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver) to obtain Oracle metrics and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Oracle are collected by a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).<br/><img src={useBaseUrl('img/integrations/databases/oracle1.png')} alt="oracle" />

The process to set up collection for Oracle data is done through the following steps:

1. Configure Logs Collection
    1. Enable Oracle Logging
    2. Verify Log Files Path.
    3. Configure three Local log file Sources.
    4. Set Up Oracle Performance Metrics Script
2. Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Configure, and start Telegraf


#### Configure Logs Collection

This section provides instructions for configuring log collection for Oracle running on a non-Kubernetes environment.

Preview steps for Oracle log collection:

1. Enable Oracle Logging
2. Verify Log Files Path.
3. Configure three Local log file Sources.
4. Set Up Oracle Performance Metrics Script

**Step 1. Enable Oracle Logging**       

If logging is not currently enabled for the following logs, enable it.

* **Alert log**
* **Listener log**
Enable Listener Log: The basic syntax of Listener Control utility commands is as follows
  ```bash
  lsnrctl command [listener_name]
  lsnrctl set log_status on
  ```
* **Audit Log.** Follow [this](https://docs.oracle.com/cd/E11882_01/server.112/e10575/tdpsg_auditing.htm#TDPSG50000) guide to enable Audit Logs.

**Step 2. Verify Local logs file directories and Path.**

* **Oracle Alert Logs**. For 11g and later releases (12c, 18c, 19c): By default, Oracle logs are stored in `$ORACLE_BASE/diag/rdbms/$DB_UNIQUE_NAME/$ORACLE_SID/trace/`.
   * The default directory for log files is value of `BACKGROUND_DUMP_DEST`. you can query the value of `BACKGROUND_DUMP_DEST`, an initialization parameter, where you can find Oracle alert log
   ```
   SQL> show parameter background_dump_dest;
   ```
* **Oracle Listener Logs**. You can check listener log file with command:
    ```bash
    [oracle@sumolab alert]$ lsnrctl status
    ```
* **Oracle Audit Logs**. By default, Oracle logs are stored in `$ORACLE_BASE/app/oracle/admin/orcl/adump`. The default directory for log files is value of `audit_file_dest`. you can query the value of `audit_file_dest`, an initialization parameter, where you can find the Oracle Audit log directory
```
SQL> show parameter audit
```
Audit Logs should be in either `XML, EXTENDED` or `{{OS }}` for app to work.

**Step 3. Configure three Local File Sources.**

In this step, you will configure three Local File sources on an installed collector, one for each of the following Oracle logs: Alert, Listener, and Audit.

Follow the instructions in [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

When you configure the sources, plan your source categories to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example:

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

* **Fields.** Set the following fields:
    * `component = database`.
    * `db_system = oracle`.
    * `db_cluster = <Your_Oracle_Cluster_Name>`. Enter **Default** if you do not have one.
    * `environment = <Your_Environment_Name> `(for example, Dev, QA, or Prod).
    * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
    * `db_cluster_port` - Enter the database port. If not provided, a default port will be used
:::note
`db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses `“oracle-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=oracle-prod.sumologic.com db_cluster_port=3306`

If your application connects directly to a given oracle node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=oracle-prod.sumologic.com`.

Pivoting to Tracing data from Entity Inspector is possible only for “Oracle address” Entities.
:::

**Step 4. Set Up Oracle Performance Metrics Script.**

The instructions for setting up the Oracle performance metrics script vary by operating system:

* For Linux, see [Set Up Oracle Performance Metrics Script on Linux](/docs/integrations/databases/oracle/#linux)
* For Windows, see [Set Up Oracle Performance Metrics Script on Windows](/docs/integrations/databases/oracle/#windows)


#### Configure Metrics Collection

#### Set up a Sumo Logic HTTP Source

**Step 1. Configure a Hosted Collector for Metrics.**

To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) documentation.

**Step 2. Configure an HTTP Logs & Metrics source:**

1. On the created Hosted Collector on the Collection Management screen, select Add Source.
2. Select **HTTP Logs & Metrics.**
    1. **Name** (Required). Enter a name for the source.
    2. **Description**(Optional).
    3. **Source Category** (Recommended). Be sure to follow the [Best Practices for Source Categories](/docs/send-data/best-practices). A recommended Source Category may be Prod/DB/Oracle/Metrics.
3. Select** Save.**
4. Take note of the URL provided once you click _Save_. You can retrieve it again by selecting the **Show URL **next to the source on the Collection Management screen.


#### Set up Telegraf

**Step 3. Install Telegraf**

1. Install Telegraf if you haven’t already.
    * Use the[ following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
2. **Install custom Python script to send Oracle metrics into Sumo**
    * Use the[ following steps](https://github.com/SumoLogic/sumologic-integrations/tree/main/Oracle) to install a custom Python script to send Oracle metrics into Sumo.

**Step 4. Configure and start Telegraf.**

As part of collecting metrics data from Telegraf, we will use the [exec input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.

You can create a `telegraf.conf` file or modify an existing `telegraf.conf` file, then copy and paste the text below:

```sql
[[inputs.exec]]
  commands = ["/path_TO_BE_CHANGEME/exec_oracle_metrics.sh"]
  timeout = "5s"
  data_format = "influx"
  [inputs.exec.tags]
  environment ="DEV_ENV_TO_BE_CHANGED"
  component ="database"
  db_system ="oracle"
  db_cluster ="PROD_ENV_TO_BE_CHANGED"
  db_cluster_address = "ENV_TO_BE_CHANGED"
  db_cluster_port = "ENV_TO_BE_CHANGED"

[[outputs.sumologic]]
  url = "<URL_from_HTTP_Logs_and_Metrics_Source>"
  data_format = "prometheus"
```

Enter values for fields annotated with `<ENV_TO_BE_CHANGED>` to the appropriate values. Do not include the brackets (`< >`) in your final configuration

* Input plugins section, which is `[[inputs.exec]]`:
    * **commands**- The [exec](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/exec) plugin executes all the commands in parallel on every interval and parses metrics from their output in any one of the accepted [Input Data Formats](https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md).
* In the tags section, which is `[inputs.exec.tags]`:
    * `environment` - This is the deployment environment where the Oracle cluster identified by the value of **servers** resides. For example; dev, prod, or QA. While this value is optional we highly recommend setting it.
    * `db_cluster` - Enter a name to identify this Oracle cluster. This cluster name will be shown in our dashboards.
    * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
    * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
    :::note
    `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

    For example, if your application uses `“oracle-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=oracle-prod.sumologic.com db_cluster_port=3306`

    If your application connects directly to a given oracle node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=oracle-prod.sumologic.com`

    Pivoting to Tracing data from Entity Inspector is possible only for “Oracle address” Entities.
    :::
* In the output plugins section, which is `[[outputs.sumologic]]`:
    * **URL** - This is the HTTP source URL created previously. See this doc for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration.

If you haven’t defined a cluster in Oracle, then enter ‘**default**’ for `db_cluster`.

There are additional values set by the Telegraf configuration.  We recommend not to modify these values as they might cause the Sumo Logic app to not function correctly.

* `data_format: “prometheus”`. In the output `[[outputs.sumologic]]` plugins section. Metrics are sent in the Prometheus format to Sumo Logic.
* `component: “database”`. In the input `[[inputs.exec]]` plugins section. This value is used by Sumo Logic apps to identify application components.
* `db_system - “oracle”`. In the input plugins sections. This value identifies the database system.

See [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for all other parameters that can be configured in the Telegraf agent globally.

After you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from [this doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Telegraf should start collecting the Oracle metrics and forward them to the Sumo Logic HTTP Source.

</TabItem>
</Tabs>

## Oracle Alerts

Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you quickly determine if the Oracle databases are available and performing as expected. These alerts are built, based on logs and metrics datasets, have preset thresholds based on industry best practices and recommendations.

| Alert Type (Metrics/Logs) | Alert Name       | Alert Description    | Trigger Type (Critical / Warning) | Alert Condition | Recover Condition |
|:---------------------------|:-------------------------|:----------------|:-----------------|:-----------------|:-------------------|
| Logs                      | Oracle - Admin Restricted Command Execution | This alert fires when the Listener is unable to resolve a command.                                                           | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Archival Log Creation              | This alert fires when there is an archive log creation error.                                                                | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Block Corruption                   | This alert fires when we detect corrupted data blocks.                                                                       | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Database Crash                     | This alert fires when the database crashes.                                                                                  | Critical                          | >0              | <= 0              |
| Logs                      | Oracle - Deadlock                           | This alert fires when deadlocks are detected.                                                                                | Warning                           | >5              | <= 0              |
| Logs                      | Oracle - Fatal NI Connect Error             | This alert fires when we detect a "Fatal NI connect error".                                                                  | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Internal Errors                    | This alert fires when internal errors are detected.                                                                          | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Login Fail                         | This alert fires when we detect that a user cannot login.                                                                    | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Possible Inappropriate Activity    | This alert fires when we detect possible inappropriate activity.                                                             | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - TNS Error                          | This alert fires when we detect TNS operations errors.                                                                       | Critical                          | >0              | <= 0              |
| Logs                      | Oracle - Unable To Extend Tablespace        | This alert fires when we detect that we are unable to extend tablespaces.                                                    | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Unauthorized Command Execution     | This alert fires when we detect that a user is not authorized to execute a requested listener command in an Oracle instance. | Warning                           | >0              | <= 0              |
| Metrics                   | Oracle - Database Down                      | This alert fires when we detect that the Oracle database is down.                                                            | Critical                          | >0              | <= 0              |
| Metrics                   | Oracle - High CPU Usage                     | This alert fires when CPU usage on a node in an Oracle cluster is high.                                                      | Critical                          | >=80            | < 80              |
| Metrics                   | Oracle - Process Limit Critical             | This alert fires when process CPU utilization is over 90%                                                                    | Critical                          | >=90            | < 90              |
| Metrics                   | Oracle - Process Limit Warning              | This alert fires when processes CPU utilization is over 80%                                                                  | Warning                           | >=80            | < 80              |
| Metrics                   | Oracle - Session Critical                   | This alert fires when session usage is over 97%                                                                              | Critical                          | >=97            | < 97              |
| Metrics                   | Oracle - Session Warning                    | This alert fires when session usage is over 90%                                                                              | Warning                           | >=90            | < 90              |
| Metrics                   | Oracle - Tablespaces Out of Space           | This alert fires when tablespace disk usage is over 90%                                                                      | Critical                          | >=90            | < 90              |
| Metrics | Oracle - Tablespaces Space Low | This alert fires when tablespace disk usage is over 80% | Warning | >=80 | < 80 |
| Metrics | Oracle - User Limit Critical | This alert fires when concurrent user sessions usage is over 90% | Critical | >=90 | < 90 |
| Metrics | Oracle - User Limit Warning | This alert fires when concurrent user sessions usage is over 80% | Warning | >=80 | < 80 |

## Installing Oracle Monitors

* To install these alerts, you need to have the **Manage Monitors** role capability.
* Alerts can be installed by either importing a JSON file or a Terraform script.

There are limits to how many alerts can be enabled - see the [Alerts FAQ](/docs/alerts/monitors/monitor-faq.md) for details.

### Method A: Importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Oracle/Oracle.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Oracle/Oracle.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all Oracle clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the text `db_system=oracle` with `<Your Custom Filter>`.

Custom filter examples:

1. For alerts applicable only to a specific cluster, your custom filter would be, `db_cluster=oracle-prod.01`.
2. For alerts applicable to all clusters that start with Kafka-prod, your custom filter would be,`db_cluster=oracle-prod*`.
3. For alerts applicable to a specific cluster within a production environment, your custom filter would be: `db_cluster=oracle-1` and `environment=prod` (This assumes you have set the optional environment tag while configuring collection).
4. Go to **Manage Data** > **Alerts** > **Monitors**.
5. Click **Add**.
6. Click Import and then copy-paste the above JSON to import monitors.

The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Oracle folder under **Monitors** to configure them. See [this](/docs/alerts/monitors) document to enable monitors to send notifications to teams or connections. See the instructions detailed in Step 4 of this [document](/docs/alerts/monitors#add-a-monitor).

### Method B: Using a Terraform script

1. **Generate a Sumo Logic access key and ID.** Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](/docs/manage/security/access-keys#manage-your-access-keys-on-preferences-page). Identify which deployment your Sumo Logic account is in, using this [link](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
2. **[Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later.**
3. **Download the Sumo Logic Terraform package for Oracle alerts.** The alerts package is available in the Sumo Logic GitHub [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/Oracle). You can either download it through the “git clone” command or as a zip file.
4. **Alert Configuration.** After the package has been extracted, navigate to the package directory **terraform-sumologic-sumo-logic-monitor/monitor_packages/Oracle/**

Edit the **Oracle.auto.tfvars** file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1.

```bash
access_id   = "<SUMOLOGIC ACCESS ID>"
access_key  = "<SUMOLOGIC ACCESS KEY>"
environment = "<SUMOLOGIC DEPLOYMENT>"
```
The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable **’oracle_data_source’**. Custom filter examples:

1. A specific cluster ‘`db_cluster=oracle.prod.01`’.
2. All clusters in an environment ‘`environment=prod`’.
3. For alerts applicable to all clusters that start with oracle-prod, your custom filter would be: ‘`db_cluster=qracle-prod*`’.
4. For alerts applicable to a specific cluster within a production environment, your custom filter would be `db_cluster=oracle-1` and `environment=prod`. (This assumes you have set the optional environment tag while configuring collection).

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter `monitors_disabled` to `false` in this file.

By default, the monitors are configured in a monitor folder called **Oracle**, if you would like to change the name of the folder, update the monitor folder name in “folder” key at `Oracle.auto.tfvars` file.

If you would like the alerts to send email or connection notifications, configure these in the file `Oracle_notifications.auto.tfvars`. For configuration examples, refer to the next section.

1. **Email and Connection Notification Configuration Examples**. Modify the file **Oracle_notifications.auto.tfvars** and populate `connection_notifications` and `email_notifications` as per below examples.
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

Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

For overriding payload for different connection types, refer to this [document](/docs/alerts/webhook-connections/set-up-webhook-connections).

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
1. **Install the Alerts.**
    1. Navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**Oracle**/ and run **terraform init. **This will initialize Terraform and will download the required components.
    2. Run **terraform plan **to view the monitors which will be created/modified by Terraform.
    3. Run **terraform apply**.
1. **Post Installation.** If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other users or services. This is detailed in Step 4 of [this document](/docs/alerts/monitors#add-a-monitor).

There are limits to how many alerts can be enabled. See the [Alerts FAQ](/docs/alerts/monitors/monitor-faq.md).

## Performance Metrics Script Setup

This section describes how to set up the performance metrics script on Linux and Windows for the Oracle app.

The Sumo Logic app for Oracle uses a Python script to query database tables to collect Oracle server performance metrics.

The script connects the database using a database user account, runs a set of example SQL queries, and prints the query results in JSON format to the console. The account credentials and SQL queries are specified in the script configuration file, `oracle-perf-monitor.cfg`.

The SQL queries in the `[queries]` section of the configuration file are provided as examples. You can add, modify, and remove queries, as desired. We recommend having the queries you plan to use reviewed by your DBA.

The database user that you use to run the SQL queries should have permission to access query-specific databases, tables, and views. The table below shows the SQL commands to grant the required permissions for each query.

<table>
  <tr>
   <td><strong>Query </strong>
   </td>
   <td><strong>SQL Command to Grant Permissions</strong>
  </td>
  </tr>
  <tr>
   <td>For Queries 1 through 3</td>
   <td><p><code>SQL> grant select on sys.v_$tablespace to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.dba_free_space to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.v_$datafile to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on v_$sysstat to &#60;username&#62;;</code></p>
   </td>
  </tr>
  <tr>
   <td>For Query 4</td>
   <td><p><code>SQL> grant select on sys.v_$session to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.v_$process to &#60;username&#62;;</code></p>
   </td>
  </tr>
  <tr>
   <td>For Queries 5 and 6</td>
   <td><code>SQL> grant select on sys.v_$session_wait to &#60;username&#62;;</code>
<p><code>SQL> grant select on sys.dba_jobs to &#60;username&#62;;</code></p></td>
  </tr>
</table>

### Linux

The script was developed and tested on:
* Linux Server 8.4, Python (3.7.10), Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production - Version 19.3.0.0.0

#### Prerequisites

Check the Linux version currently running on your machine to ensure compatibility with the script.

```bash
$ lsb_release -a
LSB Version: :core-4.1-amd64:core-4.1-noarch
Distributor ID: OracleServer
Description: Oracle Linux Server release 8.4
Release: 8.4
Codename: n/a
```

If you get the error `lsb_release: command not found`, use below command to install lsb core and then re-run above command.
```bash
sudo yum update && sudo yum install redhat-lsb-core
```

#### Install Python 3.7.10+ for Linux

In this step, you install Python 3.7.10 for Linux.

1. Install Python using the following command.
  ```bash
  yum install python3 -y
  ln -s /usr/bin/python3 /usr/bin/python
  ```
2. To check the Python version:
  ```bash
  python3 --version
  Python 3.7.10
  ```
3. In this step, you install pip if it’s not already installed. To determine whether pip is installed, run this command:
  ```bash
  $ pip3 -V
  ```
  If pip is not installed, you’ll see this message: `The program 'pip' is currently not installed`. To install pip, run this command:
  ```bash
  yum install python3-pip -y
  ```
  To verify the installation, run this command:
  ```bash
  $ pip3 -V
  ```
  You should see a message like this: `pip 20.2.2 from /usr/lib/python3.7/site-packages/pip (python 3.7)`.


#### Install Oracle Instant Client on Linux 64bit OS

1.  Install Oracle Instant Client packages.
  ```bash
  $ dnf install oracle-instantclient-release-el8 -y
  $ dnf install oracle-instantclient-basic
  $ oracle-instantclient-devel oracle-instantclient-jdbc
  $ oracle-instantclient-odbc oracle-instantclient-sqlplus oracle-instantclient-tools -y
  ```
2. Install the `libaio` and `libaio-dev` packages if they are not already installed. Typically, in standard Oracle Linux Server, the `libaio` and `libaio-dev` are not pre-installed. These packages are required to start the Oracle Instant Client.
  ```bash
  $ dnf install -y libaio libaio-devel
  ```
3. Test the client
  ```bash
  $ sqlplus username/password@//databasehost:1521/sidvalue
  SQL*Plus: Release 19.0.0.0.0 - Production on Thu Nov 25 12:42:35 2021
  Version 19.3.0.0.0
  Copyright (c) 1982, 2019, Oracle.  All rights reserved.
  Connected to:
  Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
  Version 19.3.0.0.0
  ```
4. Run a sample SQL query to test the connection.
  ```sql
  SQL> select BANNER from v$version;                
  BANNER
  ----------------------------------------
  Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
  ```

#### Set up cx_Oracle on Linux

In this step, you'll set up cx_Oracle, an open-source Python interface to Oracle.

1. Install cx_Oracle.
  ```bash
  pip3 install cx_Oracle==7.3
  ```
2. Check the cx_oracle version.
  ```bash
  pip3 list | grep cx-Oracle
  cx-Oracle (7.3.0)
  ```

#### Set up and Configure Performance Metrics Script

In this step, you set up the performance metrics script.

#### Download the script - Clone the git repo

Clone the Sumo Logic Python performance metrics script and configuration files from the git repo inside a folder (for example: oracle_script) using below command:

```bash
$ git clone git@github.com:SumoLogic/sumologic-oracle-perf-monitor.git
```

Once the script is cloned, navigate to `oracle_script/sumooracle`.

Two files - [oracle-perf-monitor.cfg](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.cfg) and [oracle-perf-monitor.py](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.py) - should be present.

#### Configure the script

Make the following updates to the script configuration file (`oracle-perf-monitor.cfg`). In the `[dbLogin]` section, supply values for each parameter:

If you do not wish to keep the password in the configuration file, keep the oraPassword field blank. You can set the password in the environment variable **DB_PASSWORD.**

To set environment variable, add variable in your `~/.bash_profile` file in your environment:
```bash
export DB_PASSWORD = DB Password
```

The script first tries to read the password from the config file, if the password is not found in the config file, it searches for an environment variable `DB_PASSWORD`.
`[dbLogin]`

* `oraUser= database user id       example myuser123`
* `oraPassword= user password      example mypwd123`
* `oraHost=server name        example ip-101-25-17-22`
* `oraPort=port number             example 1521`
* `oraInstance=oracle instance SID (SID_NAME)          example XE`

#### Test the script

```bash
$ python3 oracle-perf-monitor.py
```

#### Configure the Sumo Logic Script Source

1. In Sumo Logic, go to **Manage Data** > **Collection** > **Collection**.
2. Find the name of the installed collector to which you'd like to add a Source. Click **Add.** Then choose **Add Source** from the pop-up menu.
3. Select **Script** for the Source type. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources, you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
   1. For **Name** enter any name you like, for instance, Oracle Server Script
   2. The **Description** is optional.
   3. For **Source Category**, enter the desired category. It can be any value you like, for example, `DB/Oracle/DBQueryScript`.
   4. **Fields.** Set the following fields:
      * `component = database`
      * `db_system = oracle`
      * `db_cluster = <Your_Oracle_Cluster_Name>`. Enter **Default** if you do not have one.
      * `environment = <Your_Environment_Name>`(for example, `Dev`, `QA`, or `Prod`)
   5. For **Frequency**, select desired frequency, for instance, 5 minutes
   6. For **Specify a timeout for your command**, select a value that is long enough that long-running queries can complete, for instance, 30 seconds.
   7. For **Command**, `select /usr/bin/python`
   8. For **Script**, enter a path to the script, for example, `oracle_script/sumooracle/oracle-perf-monitor.py`
   9. For **Working Directory**, enter a directory, for example,
`oracle_script/sumooracle`
1. Click **Save**.

After a few minutes, your new Source should be propagated down to the Collector and will begin submitting your Oracle log files to the Sumo Logic service.

### Windows

This section has instructions for setting up the performance metrics script on Windows OS for the Oracle app.

The script was developed and tested on:
* Windows Server 2019 standard, Python (3.7.10), Oracle Database 19c (19.3) for Microsoft Windows x64 (64-bit)

#### Install Python 3.7.10+ for Windows

1. Download and install Python for Windows from: [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. Add the python installation folder to your Path system variable: **Control Panel** > **Systems** > **Advanced System Settings** > **Advanced Tab** > **Environment Variable** > **System Variables** > **Path**.

To confirm that you have successfully installed Python and added it to your path, open a new command window and run the following command:
```bash
C:\Users\Administrator>python3 --version
```

You should see this response: `Python 3.7.10`.

#### Install Oracle Instant Client for Windows 64bit  

1. Download and setup Oracle Instant Client for Win 64bit.
   * http://www.oracle.com/technetwork/topics/winx64soft-089540.html
   * instantclient-sdk-windows.x64-21.3.0.0.0.zip
   * instantclient-basic-windows.x64-21.3.0.0.0.zip
   * instantclient-sqlplus-windows.x64-21.3.0.0.0.zip
2. Unzip the packages into a single directory, for example:
```bash
C:\oracle\instantclient_21_3\
```
3. Add this directory to the PATH environment variable. If you have multiple versions of Oracle libraries installed, make sure the new directory occurs first in the path.
4. Download and install the correct Visual Studio Redistributable from Microsoft. Instant Client 21.3 requires the [Visual Studio 2017 redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
5. Test the client:
```bash
sqlplus username/password@//databasehost:1521/sidvalue
C:\Users\Administrator>sqlplus user/password//IP_ORACLE_SERVER:1521/remote_service_name

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Nov 25 17:03:16 2021
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
```
6. Run some sample SQL queries to test the connection,
```sql
SQL> select BANNER from v$version;
BANNER
-----------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
```

#### Install cx_Oracle on Windows

1. Use Python’s pip package to install cx_Oracle.
```bash
python3 -m pip install cx_Oracle==7.3
```
2. Check the cx_Oracle version.
```bash
C:\Users\Administrator>python3
Python 3.7.10 (v2.7.18:8d21aa21f2, Apr 20 2020, 13:25:05) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import cx_Oracle
>>> print cx_Oracle.version
7.3.0
>>>
```

#### Set up and Configure Performance Metrics Script

In this step, you set up the performance metrics script.

#### Download the script - Clone the git repo

Clone the Sumo Logic Python performance metrics script and configuration files from the git repo inside a folder (for example: oracle_script) using below command:
```bash
$ git clone git@github.com:SumoLogic/sumologic-oracle-perf-monitor.git
```

Once the script is cloned, navigate to oracle_script/sumooracle.

Two files [oracle-perf-monitor.cfg](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.cfg) and [oracle-perf-monitor.py](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.py) should be present.


#### Configure the script

Make the following updates to the script configuration file (`oracle-perf-monitor.cfg`). In the `[dbLogin]` section, supply values for each parameter:

If you do wish to keep the password in the configuration file, keep the oraPassword field blank. You can keep the password in the environment variable `DB_PASSWORD`.

To set environment variable , add variable using below command:
```bash
setx DB_PASSWORD = DB Password
```

The script first tries to read password from the config file, if the password is not found in config file, it searches for an environment variable **DB_PASSWORD**.

`[dbLogin]`

* `oraUser= database user id      example myuser123`
* `oraPassword= user password      example mypwd123`
* `oraHost=server name        example ip-101-25-17-22`
* `oraPort=port number        example 1521`
* `oraInstance=oracle instance SID (SID_NAME)           example XE`


#### Test the script

```bash_profile
oracle_script/sumooracle>python3 oracle-perf-monitor.py
```

#### Configure the Sumo Logic Script Source

1. In Sumo Logic, go to **Manage Data** > **Collection** > **Collection**.
2. Find the name of the Installed Collector to which you'd like to add a Source. Click **Add.** Then choose **Add Source** from the pop-up menu.
3. Select **Script** for the Source type. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
    * For **Name** enter any name you like, for instance, **Oracle Server Script.**
    * The **Description** is optional.
    * For **Source Category**, enter the desired category. It can be any value you like, for example, `DB/Oracle/DBQueryScript`.
    * For **Frequency**, select desired frequency, for instance, 5 minutes.
    * For **Specify a timeout for your command**, select a value that is long enough that long-running queries can complete, for instance, 30 sec.
    * For **Command**, select **Windows Script.**
    * For **Script**, select **Type a path to the script to execute**, then enter: for instance `oracle_script/sumooracle\oracle-perf-monitor.py`.
    * For **Working Directory**, enter: for instance oracle_script/sumooracle
    * Click **Save**.


## Installing the Oracle app

This section demonstrates how to install the Oracle app.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
1. Select the service version you're using and click Add to Library. Version selection applies only to a few apps currently. For more information, see the Install the Apps from the Library.
1. To install the app, complete the following fields.
   * **App Name**. You can retain the existing name or enter the app's name of your choice. 
   * **Advanced**. Select the Location in the Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
1. Click Add to Library.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specify. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Oracle Dashboards

:::tip Filter with template variables  

Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

See an overview of Oracle listener process activity, including successful DB connections, TNS error information, SID and Service Name usage, command execution, and top usage, in terms of ports, database users, user hosts, client hosts, and user programs as derived from the Oracle Listener log.

<img src={useBaseUrl('img/integrations/databases/Oracle-Overview.png')} alt="Oracle dashboards" />

**DB Connections**. The count of database connections established during the previous 24 hours.

**TNS Errors**. The count of TNS errors during the previous 24 hours.

**Top TNS Errors**. A table that shows the top 10 TNS errors and the count of each in the previous 24 hours.

**TNS Error Trend**. A stacked column chart that shows the count of each TNS error per one hour timeslice, over the previous 24 hours.

**SID**. A donut chart that shows the breakdown of connections by SID over the previous 24 hours.

**Service Name**. A donut chart that shows the breakdown of connections by service name over the previous 24 hours.

**Service Name Vs SID Adoption**. A donut chart that shows the breakdown of connections by SID versus by Service Name over the previous 24 hours.

**Protocol Used**. A donut chart that shows the breakdown of connection requests by protocol over the previous 24 hours.

**Command Execution Status**. A donut chart that shows the breakdown of successful and failed Listener commands over the previous 24 hours.

**Commands Executed**.  A donut chart that shows the breakdown of specific lsnrctl commands over the previous 24 hours.

**Top Ports Used by Client**. A table that shows the top 20 client ports that initiated connections, and connection count for each over the previous 24 hours.

**Top Database Users**. A table that shows the top 20 database users for which the client initiated connections, and connection count for each over the previous 24 hours.

**Most Active User Hosts**. A table that shows the top 20 user hosts that initiated connections, and connection count for each over the previous 24 hours.

**Top Client Hosts for __jdbc__**. A table that shows connections initiated from Client Host by appserver using the JDBC Thin Client (host name __jdbc__)  and the connection count for each over the previous 24 hours.

**Top User Program Name**.  A table that shows the top 20 programs that initiated connections over the previous 24 hours.


### Alert Analysis

See information about Oracle errors, including counts of various error types, ORA messages, oracle instance state, and other data derived from the Oracle Alert log.

<img src={useBaseUrl('img/integrations/databases/Oracle-Alert-Analysis.png')} alt="Oracle dashboards" />

**Deadlock Errors**. Count of ORA-00060 messages over the previous 24 hours.

**Database Crash Errors**. Count of database crash errors (ORA-00603, ORA-00449, ORA-00471, or ORA-01092) over the previous 24 hours.

**Archival Log Creation Errors**. Count of ORA-00270 messages over the previous 24 hours.

**Internal Errors**. Count of internal errors (ORA-00600 or ORA-07445) over the previous 24 hours.

**Fatal NI Connect Errors**. Count fatal NI connect errors over the previous 24 hours.  

**Top ORA Messages**. A donut chart that shows the breakdown of ORA messages by message type over the previous 24 hours.

**ORA Messages Over Time**. A stacked column chart that shows the count of ORA messages of each message type per one hour timeslice over the previous 24 hours.

**Hosts Reporting ORA Messages**. A stacked column chart that shows the count of ORA messages of all types by host per one hour timeslice over the previous 24 hours.  

**Top TNS Errors**. A table that shows the count of Transparent Network Substrate (TNS) errors of each type over the previous 24 hours.

**Log Switch Activity By Hosts**. An area chart that shows the count of log switch events per one hour timeslice by host. (A log switch is the point at which the database stops writing to one redo log file and begins writing to another.)

**Failures, Warnings and Errors by Instance Source**. An area chart that shows the count of messages from the Oracle Alert log that match patterns like:  `fail*`, `warn*`, or `error*`.

**Archival Errors by Instance**. A stacked column chart that shows the count of messages from the Oracle Alert log that contain the string “Archival Error" by per one hour timeslice by database instance over the previous 24 hours.

**Unable to Extend Tablespace Errors**. A table that lists errors related to a failure to extend a tablespace, that occurred during the previous 24 hours.

**Instance Started**. A table that lists when database instances were started during the previous three days.

**Instance Shutdown Initiated**. A table that lists when shutdowns of database instances were initiated during the previous three days.

**Instance Shutdown Complete**. A table that lists when shutdowns of database instances were initiated during the previous three days.

### Listener Troubleshooting

See details of Oracle listener process activity, including database connections by host and application, connection failures, command execution status and trends, and other data derived from the Oracle Listener log.

<img src={useBaseUrl('img/integrations/databases/Oracle-Listener-Troubleshooting.png')} alt="Oracle dashboards" />

**DB Connections By Host**. An area chart that shows the count of database connections by host, per 5 minute timeslice, over the previous 24 hours.

**DB Connections By Applications**. A stacked column chart that shows the count of database connection by initiating program, per one day timeslice, over the previous 7 days.

**Failed to Success Connection Ratio - Outlier**. A visualization that shows when the ratio of failed to successful connections was statistically significant (more than three standard deviations higher than the running average), over the previous 30 days.

**Failed Connection Attempts**. A table that lists failed database connection attempts over the previous three days.

**Command Execution Status**. A table that lists the count of specific lsnrctl commands that were issued in the previous seven days, and the count of failures and successes for each.

**Command Execution Trend**. A stacked column chart that shows the count of specific lsnrctl commands that were issued in the previous seven days per one day timeslice.

**Listener Stopped Events**. A table that lists listener stop events during the previous 7 days.

**SID or Service Name Detailed Breakup**. A table that shows the count of connections performed with sid or service name, by userhost, clienthost, and databaseuser.

### Security Monitoring

See information about database connections established by privileged users, connection attempts from public IP addresses, attempts to execute unauthorized commands, and events that associated with potentially inappropriate activities as derived from Oracle Listener and Alert Logs.  

<img src={useBaseUrl('img/integrations/databases/Oracle-Security-Monitoring.png')} alt="Oracle dashboards" />

**Admin Restricted Command Execution**. The count of database commands that resulted in TNS-12508 errors over the previous 24 hours.

**Unauthorized Command Execution**. The count of database commands that resulted in TNS-01190 errors over the previous 24 hours.

**Possible InAppropriate Activity. **The count of lsnrctl commands the resulted in errors of the following types over the previous 24 hours: TNS-01169, TNS-01189, TNS-01190, "TNS-12508",  ORA-12525, ORA-28040, or ORA-12170.

**Connections By Privileged Users**. A donut chart that shows the breakdown of connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

**Connection Status by Privileged User**s. A table that shows the count of successful and unsuccessful connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

**Connections By Privileged Users - Trend**. A line chart that shows the count of connections from  privileged user accounts, such as root and administrator, per one hour timeslice over over the previous 24 hours.

**Recent Successful DB Connections by Privileged Users**. A table that shows the count of successful connections from privileged user accounts, such as root and administrator, per one minute timeslice, over the previous 24 hours.

**Failed Connection Attempt From PublicIP Location**. A map chart that shows the count and location of failed connection attempts from geographical locations over the previous 24 hours.

**Successful Connection Attempt From PublicIP Location**.  A map chart that shows the count and location of successful connection attempts from geographical locations over the previous 24 hours.

**Failed DB Connections by Privileged Users**. A table that provides information about failed database connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

### Sys Audit Log

See information derived from the syslog audit trail, including successful and failed activities, and top usage by client, database user, and privileges used.

<img src={useBaseUrl('img/integrations/databases/Oracle-Sys-Audit-Log.png')} alt="Oracle dashboards" />

**Status Trend**. A stacked column chart that shows the count of successful and unsuccessful database actions over the previous 24 hours.

**Failure Status Trend**. A stacked column chart that shows the count of unsuccessful database actions by failure status code over the previous 24 hours.

**Recent Failure Activities**. A table that lists unsuccessful database actions over the previous 60 minutes.

**Top Client Users**. A table that shows the top 10 client users over the previous 24 hours, and a count of the events associated with each.

**Top Database Users**. A table that shows the top 10 database users over the previous 24 hours, and a count of the events associated with each.

**Top Privileges Used**. A table that shows the top 10 database privileges used over the previous 24 hours, and a count of the events associated with each.

**Recent Successful Activities**. A table that lists information about successful database actions over the previous 60 minutes.

### Sys Audit Log - Logon Analysis

See logon activity information derived from the syslog audit trail, including successful and failed logons, logon status trends, multiple database user logons and client user logons from the same UserHost, and multiple UserHost logons with the same database user.

<img src={useBaseUrl('img/integrations/databases/Oracle-Sys-Audit-Log-Logon-Analysis.png')} alt="Oracle dashboards" />

**Successful Logons**. Count of successful logins in the previous 24 hours.

**Failed Logons**. Count of failed logins in the previous 24 hours.

**Successful Logoffs**. Count of successful logoffs in the previous 24 hours.

**Logon Activities Trend**. Stacked column chart that shows the count of logons and logoffs per one hour timeslice over the previous 24 hours.

**Brute Force Login Success**. Table that lists information about brute force login attempts that succeeded during the previous three days.

**Excessive Failed Logons**. A table that lists information about incidents where there were more than five failed logons within 5 minutes during last three days.

**Multiple Database User Logons From Same UserHost**. A table that lists UserHosts that successfully established connections using more than one database user over the previous 24 hours.

**Multiple Client User Logons From Same UserHost**. A table that lists UserHosts that successfully established connections using more than one client user over the previous 24 hours.

**Multiple UserHosts Logons with Same Database User**. A table that lists database users  that successfully established connections from the multiple user hosts over the previous 24 hours.

### XML Audit Log - Logon Analysis

See logon activity information derived from the XML audit trail, including successful and failed logons, logon status trends, multiple database user logons and client user logons from the same UserHost, and multiple UserHost logons with the same database user.

<img src={useBaseUrl('img/integrations/databases/Oracle-XML-Audit-Log-Logon-Analysis.png')} alt="Oracle dashboards" />

### XML Audit Log - SQL Statement Analysis

See information derived from the XML audit trail about user management, role management, Data Definition Language (DDL), Data Manipulation Language (DML), and Transaction Control Language (TCL) activity.

<img src={useBaseUrl('img/integrations/databases/Oracle-XML-Audit-Log-SQL-Statement-Analysis.png')} alt="Oracle dashboards" />

**Recent User Management Activities**. A table that lists information about user management activities in the previous 24 hours.

**User Management Activity Trend**. A stacked column chart that shows the count of user management actions by action type per one hour timeslice over the last 7 days.

**Recent Role Management Activities**. A table that lists information about role management activities in the previous 24 hours.

**Role Management Activity Trend**. A stacked column chart that shows the count of role management actions by action type per one hour timeslice over the last 7 days.

**Recent DDL Activities**. A table that lists information about Data Definition Language (DDL) activities in the previous 24 hours.

**DDL Activity Trend**. A stacked column chart that shows the count of DDL actions by action type per one hour timeslice over the last 7 days.

**Recent DML Activities**. A table that lists information about Data Manipulation Language (DML) activities in the previous 24 hours.

**DML Activity Trend**. **DDL Activity Trend**. A stacked column chart that shows the count of DML actions by action type per one hour timeslice over the last 7 days.

**Recent TCL Activities**. A table that lists information Transaction Control Language (TCL) activities in the previous 24 hours.

**TCL Activity Trend**.  A stacked column chart that shows the count of DML actions by action type per one hour timeslice over the last 7 days.

### Monitor Performance by DB Script

See database usage information obtained by the Oracle script source, including tablespace and datafile utilization; recent active connections; wait times; and recent jobs.

<img src={useBaseUrl('img/integrations/databases/Oracle-Monitor-Performance-by-DB-Script.png')} alt="Oracle dashboards" />

**TableSpace Utilization**. A table that shows, for each tablespace, the percentage of tablespace used for each 5 minute timeslice over the last 60 minutes.

**TableSpace Utilization Trend**. A line chart that shows, for each tablespace, the percentage of tablespace used over the last 24 hours.

**Datafile Space Utilization**. A table that shows, for each database file (.dbf), the percentage of allocated file space used for each 5 minute timeslice over the last 60 minutes.

**Datafile Space Utilization Trend**. A line chart that shows, for each database file (.dbf), the percentage of allocated file space used over the last 24 hours.

**Buffer Cache Hit Ratio**. An area chart that shows the buffer cache hit ratio for each 5 minute timeslice over the last 60 minutes.

**Recent Active Connections**. A table of information about recent active connections, including the user, machine, and number of connections.

**Maximum Wait Time (sec) by User**. A line chart that shows, for each user, the session wait times for each 5 minute timeslice over the last 60 minutes.

**Top Session Wait Time Events.** A table that shows the top 10 event types associated with session waits, and the count of each event type.

**Recent Jobs in the database**. A table of information about recent database jobs, including when each job ran, low long it ran, and when it will next run.

### Wait Events

Every wait event belongs to a class of wait events. The following list describes each of the wait classes.

<img src={useBaseUrl('img/integrations/databases/Oracle-Wait-Class.png')} alt="Oracle dashboards" />

### Wait Class

All the wait events are grouped under wait classes and here are the most important wait classes you must know: Administrative, Application, Commit, Concurrency, Configuration, Idle, Network, Other, System I/O, User I/O.

<img src={useBaseUrl('img/integrations/databases/Oracle-Wait-Events.png')} alt="Oracle dashboards" />

### Throughput

The **Oracle - Throughput** dashboard provides an at-a-glance view of the state of system loads in clusters: Logon, Transaction, and Redo.

<img src={useBaseUrl('img/integrations/databases/Oracle-Throughput.png')} alt="Oracle dashboards" />

### Tablespaces

The Oracle - Tablespaces dashboard provides an at-a-glance view of the tablespaces in clusters: Percent Used, Max size, Size Used, and Free.

<img src={useBaseUrl('img/integrations/databases/Oracle-Tablespaces.png')} alt="Oracle dashboards" />


### System Global Area

The Oracle - System Global Area dashboard provides an at-a-glance view of a group of shared memory structures, known as SGA components, that contain data and control information for one Oracle Database instance.

<img src={useBaseUrl('img/integrations/databases/Oracle-System-Global-Area.png')} alt="Oracle dashboards" />

### Response Time

The Oracle - Response dashboard performance statistics such as database CPU Time, Wait Time Ratio, Response time, Soft Parse Radio, and Execute

<img src={useBaseUrl('img/integrations/databases/Oracle-Response-Time.png')} alt="Oracle dashboards" />

### Resource Utilization

The Oracle - Resource Utilization dashboard performance statistics such as Limit, OS load, CPU, Cursors, PGA, Physical, I/O and VM

<img src={useBaseUrl('img/integrations/databases/Oracle-Resource-Utilization.png')} alt="Oracle dashboards" />

### Parallel Execution

The **Oracle - Parallel Execution** dashboard performance statistics such as Sessions, DDL statements parallelized, PX downgraded, Background services

<img src={useBaseUrl('img/integrations/databases/Oracle-Parallel-Execution.png')} alt="Oracle dashboards" />
