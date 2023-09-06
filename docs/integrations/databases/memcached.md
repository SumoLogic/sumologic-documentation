---
id: memcached
title: Memcached - Classic Collector
sidebar_label: Memcached
description: The Memcached app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Memcached clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/memcached.png')} alt="Thumbnail icon" width="50"/>

The Memcached app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Memcached clusters. Preconfigured dashboards provide insight into uptime, operational metrics, cache performance, resource utilization, errors, warnings, and commands executed.

The Sumo Logic app for Memcached is tested for Version: 1.4.15.

## Sample Log Messages

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
	"timestamp":1626248704386,
	"log":"28: going from conn_closing to conn_closed",
	"stream":"stderr",
	"time":"2021-07-14T07:45:01.839243101Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```json
Jun 23 07:35:01 node03 memcached: \
<31 set GFcIh47CswfCnwk3JkmJ 0 0 4096
```

</TabItem>
</Tabs>


## Collecting Logs and Metrics for Memcached

Configuring log and metric collection for the Memcached app includes the following tasks.


### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic before configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata required by the app dashboards. For information on setting up fields, see [Sumo Logic Fields](/docs/manage/fields.md).

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

If you're using Memcached in a Kubernetes environment, create the fields:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`

</TabItem>
<TabItem value="non-k8s">

If you're using Memcached in a non-Kubernetes environment, create the fields:
* `component`
* `environment`
* `db_system`
* `db_cluster`
* `pod`

</TabItem>
</Tabs>


### Step 2: Configure Logs and Metrics Collection for Memcached

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).

The diagram below illustrates how data is collected from Memcached in a Kubernetes environment. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/databases/memcachedk8s.png')} alt="memcached"/>

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from Memcached. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note Prerequisites
It’s assumed that you are using the latest helm chart version. If not, upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/v3-migration-doc.md).
:::

#### Configure Metrics Collection

Follow the steps listed below to collect Memcached metrics from a Kubernetes environment.

1. [Set up Kubernetes Collection with the Telegraf Operator.](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf)
2. On your Memcached Pods, add the following annotations:
```sql
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
  servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment ="dev_ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="memcached"
    db_cluster ="memcached_on_k8s_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
```

3. Enter in values for the following parameters (marked `ENV_TO_BE_CHANGED` above):
   * `telegraf.influxdata.com/inputs` - This contains the required configuration for the Telegraf Memcached Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Memcached input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
   * In the input plugins section (`[[inputs.memcached]]`):
      * `servers` - An array of addresses to gather stats about. Specify an IP on the hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
   * In the tags section (`[inputs.memcached.tags]`):
      * `environment` - This is the deployment environment where the Memcached cluster identified by the value of servers resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster` - Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
:::note
`db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses “memcached-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
:::
   * Here’s an explanation for additional values set by this configuration that we request you  do not modify as they will cause the Sumo Logic apps to not function correctly.
     * `telegraf.influxdata.com/class: sumologic-prometheus` - This instructs the Telegraf operator what output to use. This should not be changed.
     * `prometheus.io/scrape: "true"` - This ensures our Prometheus will scrape the metrics.
     * `prometheus.io/port: "9273"` - This tells prometheus what ports to scrape on. This should not be changed.
     * `telegraf.influxdata.com/inputs`
     * In the tags section, `[inputs.memcached.tags]`:
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * `db_system: “memcached”` - This value identifies the database system.
  * For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#Configuring-Telegraf) for more parameters that can be configured in the Telegraf agent globally.
4. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
5. Verify metrics in Sumo Logic.

#### Configure Logs Collection

This section explains the steps to collect Memcached logs from a Kubernetes environment.

1. **Add labels on your Memcached pods to capture logs from standard output (recommended method)**.
   1. Apply the following labels to the Memcached pods:
    ```sql
    environment: "prod_ENV_TO_BE_CHANGED"
    component: "database"
    db_system: "memcached"
    db_cluster: "memcached_on_k8s_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
    ```
   2. Enter in values for the following parameters:
    * `environment` - This is the deployment environment where the Memcached cluster identified by  the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
    * `db_cluster` - Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
    * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
    * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
    :::note
    `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

    For example, if your application uses “memcached-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

    If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`.

    Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
    :::
    * Here’s an explanation for additional values set by this configuration that we request you **do not modify** as they will cause the Sumo Logic apps to not function correctly.
      * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
      * `db_system: “memcached”` - This value identifies the database system.
      * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#Configuring-Telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [ visit here](/docs/integrations/containers-orchestration/kubernetes#Collect_Logs_and_Metrics_for_the_Kubernetes_App).
   4. Verify logs in Sumo Logic.
2. **Collecting Memcached Logs from a Log File (Optional)**. If your Memcached chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:
   1. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   2. Add the following annotation in addition to the existing annotations.
    ```xml
    annotations:
      tailing-sidecar: sidecarconfig;<mount>:<path_of_Memcached_log_file>/<Memcached_log_file_name>
    ```
   Example:
    ```bash
    annotations:
        tailing-sidecar: sidecarconfig;data:/var/bitnami/memcached/logs/memcached.log
    ```
   3. Make sure that the Memcached pods are running and annotations are applied by using the command:
    ```bash
    kubectl describe pod <Memcached_pod_name>
    ```
   4. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. **Add a FER to normalize the fields in Kubernetes environments**. This step is not needed if one is using application components solution terraform script. Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Proxy Application Components. To do so:
   1. Go to **Manage Data > Logs > Field Extraction Rules**.
   2. Click the + Add button on the top right of the table.
   3. The **Add Field Extraction Rule** form will appear:
   4. Enter the following options:
     * **Rule Name**. Enter the name as **App Observability - Database**.
     * **Applied At.** Choose **Ingest Time**
     * **Scope**. Select **Specific Data**
     * **Scope**: Enter the following keyword search expression:
     ```sql
     pod_labels_environment=* pod_labels_component=database \
     pod_labels_db_system=* pod_labels_db_cluster=*
     ```
     * **Parse Expression**. Enter the following parse expression:
     ```sql
     if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
     | pod_labels_component as component
     | pod_labels_db_system as db_system
     | if (!isEmpty(pod_labels_db_cluster), pod_labels_db_cluster, null) as db_cluster
     ```
   5. Click **Save** to create the rule.

</TabItem>
<TabItem value="non-k8s">

In non-Kubernetes environments, we use the Telegraf operator for Memcached metric collection and Sumo Logic Installed Collector for collecting Memcached logs. The diagram below illustrates the components of the Memcached collection in a non-Kubernetes environment. <img src={useBaseUrl('img/integrations/databases/memcachednonk8s.png')} alt="memcached"/>

Telegraf runs on the same system as Memcached and uses the [Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain Memcached metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Memcached on the other hand are sent to a Sumo Logic Local File source.

This section provides instructions for configuring logs and metrics collection for the Sumo Logic app for Memcached. Follow the below instructions to set up the logs and metrics collection:

#### Configure Metrics Collection

1. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
2. **Configure an HTTP Logs and Metrics Source**. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the **HTTP Source URL**.
3. **Install Telegraf** using the [following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
4. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we will use the Memcached [input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic. Create or modify `telegraf.conf` and copy and paste the text below:  
```sql
 servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment ="dev_ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="memcached"
    db_cluster="memcached_on_premise_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
    url = "<URL Created in Step 3_ENV_TO_BE_CHANGED>"
    data_format = "prometheus"
```
5. Please enter values for the following parameters (marked in `ENV_TO_BE_CHANGED` above):
  * In the input plugins section (`[[inputs.memcached]]`):
     * `servers` - An array of addresses to gather stats about. Specify an IP on hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
     * In the tags section (`[inputs.memcached.tags]`):
        * `environment` - This is the deployment environment where the Memcached cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `db_cluster` - Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
        * `db_cluster_address` - Enter the cluster hostname or IP address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
        * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
        :::note
        `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

        For example, if your application uses `“memcached-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`

        If your application connects directly to a given memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

        Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
        :::
  * In the output plugins section (`[[outputs.sumologic]]`):
     * `url` - This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
   * Here’s an explanation for additional values set by this Telegraf configuration that we request you **do not modify** as they will cause the Sumo Logic apps to not function correctly.
     * `data_format - “prometheus”` in the output plugins section. Metrics are sent in the Prometheus format to Sumo Logic
     * `component: “database”` in the input plugins section. This value is used by Sumo Logic apps to identify application components.
   * For all other parameters, see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for more parameters that can be configured in the Telegraf agent globally.
6. Once you have finalized your `telegraf.conf` file, you can start or reload the Telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Memcached metrics should start flowing into Sumo Logic.


#### Configure Logs Collection

This section provides instructions for configuring log collection for Memcached running on a non-Kubernetes environment for the Sumo Logic app for Memcached.

By default, Memcached logs are stored in a log file. Local log files can be collected via [Installed collectors](/docs/send-data/installed-collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/getting-started#Sumo-Logic-Endpoints-and-Firewall-Security) for collection to work. For detailed requirements for Installed collectors, see this [page](/docs/get-started/system-requirements#Installed-Collector-Requirements).

1. **Configure logging in Memcached**. By default, the installation of Memcached will not write any request logs to disk. To add a log file for Memcached, you can use the following syntax:
  ```bash
  memcached -d -m 3072 -l localhost -p 11211 -u nobody -v 2>>/var/log/memcached/memcached.log
  ```

  Or, if you’re on RHEL/CentOS, you can edit the file `/etc/sysconfig/memcached` like so:
  ```bash
  PORT="11211"
  USER="memcached"
  MAXCONN="3048"
  CACHESIZE="256"
  OPTIONS="-vv >> /var/log/memcached/memcached.log 2>&1"
  ```
  Save the file and  restart Memcached.
2. **Configuring a Collector** To collect logs directly from the Memcached machine, configure an[ Installed Collector](/docs/send-data/installed-collectors).
3. **Configuring a Source** To collect logs directly from your Memcached machine, use an Installed Collector and a Local File Source.
    1. Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).
    2. Configure the Local File Source fields as follows:
        * **Name**. (Required)
        * **Description**. (Optional)
        * **File Path (Required)**. Enter the path to your error.log or access.log. The files are typically located in `/var/log/memcached/memcached.log`. If you're using a customized path, check the `Memcached.conf` file for this information.
        * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
        * **Source Category.** Enter any string to tag the output collected from this Source, such as **Memcached/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/best-practices.md).
        * **Fields**. Set the following fields:
            * `component = database`
            * `db_system = memcached`
            * `db_cluster = <Your_Memcached_Cluster_Name>`
            * `environment = <Environment_Name>`, such as Dev, QA or Prod.
            * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
            * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
            :::note
            `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

            For example, if your application uses `“memcached-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

            If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

            Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
            :::
    3. Configure the **Advanced** section:
        * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
        * **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your Memcached Server’s time zone.
        * **Timestamp Format.** The timestamp format is automatically detected.
        * **Encoding.** Select UTF-8 (Default).
        * **Enable Multiline Processing.** Detect messages spanning multiple lines
            * Infer Boundaries - Detect message boundaries automatically
    4. Click **Save**.

At this point, Memcached logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>


## Installing Memcached Monitors

Sumo Logic has provided pre-packaged alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you proactively determine if a Memcached cluster is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, see [Memcached Alerts](#Memcached-Alerts).

To install these monitors, you must have the **Manage Monitors** role capability.

You can install monitors by importing a JSON file or using a Terraform script.

There are limits to how many alerts can be enabled. For more information, see [Monitors](/docs/alerts/monitors#Rules) for details.


### Method A: Importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Memcached/Memcached.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/Memcached/Memcached.json) contains alerts from Sumo Logic searches that do not have any scope filters and, therefore, will apply to all Memcached clusters, the data for which has been collected via the instructions in the previous sections. However, if you would like to restrict these alerts to specific clusters or environments, update the JSON file by replacing the `text db_cluster=* `with `<Your Custom Filter>`. Custom filter examples:
   * For alerts applicable only to a specific cluster, your custom filter would be:  `db_cluster=dev-memcached-01`
   * For alerts applicable to all clusters that start with `memcached-prod`, your custom filter would be: `db_cluster=memcachedt-prod*`
   * For alerts applicable to specific clusters within a production environment, your custom filter would be: `db_cluster=dev-memcached-01` AND `environment=prod`. This assumes you have set the optional environment tag while configuring collection.
3. Go to **Manage Data > Alerts > Monitors**.
4. Click **Add**.
4. Click **Import.**
6. On the** Import Content popup**, enter **Memcached** in the Name field, paste the JSON into the popup, and click **Import**.
7. The monitors are created in "Memcached" folder. The monitors are disabled by default. See the [Monitors](/docs/alerts/monitors) topic for information about enabling monitors and configuring notifications or connections.


### Method B: Using a Terraform script

1. Generate a Sumo Logic access key and ID for a user that has the **Manage Monitors** role capability. For instructions, see  [Access Keys](/docs/manage/security/access-keys#Create_an_access_key_on_Preferences_page).
2. Download [Terraform 0.13](https://www.terraform.io/downloads.html) or later, and install.
3. Download the Sumo Logic Terraform package for Memcached monitors. The alerts package is available in the Sumo Logic GitHub [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/Memcached). You can either download it using the git clone command or as a zip file.
4. Alert Configuration. After extracting the package, navigate to the  `terraform-sumologic-sumo-logic-monitor/monitor_packages/Memcached/` directory.
5. Edit the `Memcached.auto.tfvars` file and add the Sumo Logic Access Key and Access ID from Step 1 and your Sumo Logic deployment. If you're not sure of your deployment, see [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
  ```bash
  access_id   = "<SUMOLOGIC ACCESS ID>"
  access_key  = "<SUMOLOGIC ACCESS KEY>"
  environment = "<SUMOLOGIC DEPLOYMENT>"
  ```
6. The Terraform script installs the alerts without any scope filters. If you would like to restrict the alerts to specific clusters or environments, update the `memcached_data_source` variable. For example:
   * To configure alerts for a specific clusters, set `memcached_data_source` to something like: `db_cluster=memcached.prod.01`
   * To configure alerts for All clusters in an environment, set `memcached_data_source` to something like: `environment=prod`
   * To configure alerts for Multiple clusters using a wildcard, set `memcached_data_source` to something like: `db_cluster=memcached-prod*`
   * To configure alerts for specific clusters within a specific environment, set `memcached_data_source` to something like: `db_cluster=memcached-1 and environment=prod`. This assumes you have configured and applied Fields as described in Step 1: Configure Fields of the Sumo Logic of the Collect Logs and Metrics for Memcached topic.

  All monitors are disabled by default on installation. To enable all of the monitors, set the `monitors_disabled` parameter to `false`.

  By default, the monitors will be located in a "Memcached" folder on the **Monitors** page. To change the name of the folder, update the monitor folder name in the folder variable in the `Memcached.auto.tfvars` file.

7. If you want the alerts to send email or connection notifications, edit the `Memcached_notifications.auto.tfvars` file to populate the `connection_notifications` and `email_notifications` sections. Examples are provided below.
   * In the variable definition below, replace `<CONNECTION_ID>` with the connection ID of the Webhook connection. You can obtain the Webhook connection ID by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

```bash title="Pagerduty connection example"
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
For information about overriding the payload for different connection types, see [Set Up Webhook Connections](/docs/alerts/webhook-connections/set-up-webhook-connections).

```bash title="Email notifications example"
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

7. Install Monitors.
   1. Navigate to the terraform-sumologic-sumo-logic-monitor/monitor_packages/Memcached/ directory and run `terraform init`. This will initialize Terraform and download the required components.
   2. Run `terraform plan` to view the monitors that Terraform will create or modify.
   3. Run `terraform apply`.


## Installing the Memcached app

This section demonstrates how to install the Memcached app.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection applies only to a few apps currently. For more information, see the[ Install the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
   * **App Name.** You can retain the existing name or enter a name of your choice. 
   * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but you'll see full graphs and maps in a bit of time.

## Viewing Memcached Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables.md).
:::

### Overview

The **Memcached - Overview** dashboard provides an at-a-glance view of the Memcached server status, error logs, and database metrics.

<img src={useBaseUrl('img/integrations/databases/Memcached-Overview.png')} alt="Memcached dashboards" />

### Operations

The **Memcached - Operations** Dashboard provides detailed analysis on connections, thread requested, network bytes, hash expansion size, table size.

<img src={useBaseUrl('img/integrations/databases/Memcached-Operations.png')} alt="Memcached dashboards" />

### Command Stats

The **Memcached - Command Stats** dashboard provides detailed insights into the number of commands being performed.

<img src={useBaseUrl('img/integrations/databases/Memcached-Command-Stats.png')} alt="Memcached dashboards" />

### Cache Information

The **Memcached - Cache Information** dashboard provides insight into cache states, cache hit, and miss rate over time.

<img src={useBaseUrl('img/integrations/databases/Memcached-Cache-Information.png')} alt="Memcached dashboards" />

### Logs

The **Memcached - Logs** dashboard helps you quickly analyze your Memcached error logs, commands executed, and objects stored.

<img src={useBaseUrl('img/integrations/databases/Memcached-Logs.png')} alt="Memcached dashboards" />

## Memcached Alerts

Sumo Logic has provided out-of-the-box alerts available via [Sumo Logic monitors](/docs/alerts/monitors) to help you quickly determine if the Memcached database cluster is available and performing as expected.

<table>
  <tr>
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
   <td>Memcached - Commands Error
   </td>
   <td>This alert fires when we detect command errors.
   </td>
   <td>Critical
   </td>
   <td> &#62; 0
   </td>
   <td> &#60;&#61; 0
   </td>
  </tr>
  <tr>
   <td>Memcached - Authentication Error
   </td>
   <td>This alert fires when we detect authentication errors continuously for 5 mins
   </td>
   <td>Warning
   </td>
   <td> &#62;0
   </td>
   <td> &#60;&#61; 0
   </td>
  </tr>
  <tr>
   <td>Memcached - Connection Yields
   </td>
   <td>This alert fires when we detect yielded connections continuously for 5 mins
   </td>
   <td>Warning
   </td>
   <td> &#62;5
   </td>
   <td> &#60;&#61; 5
   </td>
  </tr>
  <tr>
   <td>Memcached - High Memory Usage
   </td>
   <td>This alert fires when the memory usage is more than 80%.
   </td>
   <td>Warning
   </td>
   <td> &#62;80
   </td>
   <td> &#60;&#61; 80
   </td>
  </tr>
  <tr>
   <td>Memcached - Listen Disabled
   </td>
   <td>This alert fires when new queued connections per minute > 5
   </td>
   <td>Warning
   </td>
   <td> &#62;5
   </td>
   <td> &#60;&#61;5
   </td>
  </tr>
  <tr>
   <td>Memcached - Cache Hit Ratio
   </td>
   <td>The hit rate is one of the most important indicators of Memcached performance. A high hit rate means faster responses to your users. If the hit rate is falling, you need quick visibility into why. This alert gets fired low cache hit ratio is less than 50%
   </td>
   <td>Critical
   </td>
   <td> &#60;&#61;0.5
   </td>
   <td> &#62;0.5
   </td>
  </tr>
  <tr>
   <td>Memcached - Current Connections
   </td>
   <td>This alert gets fired when number of connected clients are 0. If current connections are none then something is wrong.
   </td>
   <td>Critical
   </td>
   <td> &#60;&#61;0
   </td>
   <td> &#62;0
   </td>
  </tr>
  <tr>
   <td>Memcached - Uptime
   </td>
   <td>This alert gets fires when uptime is &#60; 180. You can use this to detect respawns.
   </td>
   <td>Critical
   </td>
   <td> &#60;&#61;180
   </td>
   <td> &#62;180
   </td>
  </tr>
</table>
