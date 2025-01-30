---
id: apache
title: Apache - Classic Collector
sidebar_label: Apache
description: Gives insight into website visitor behavior patterns, monitors server operations, and assists in troubleshooting issues that span entire web server farms.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/web-servers/apache.png')} alt="Thumbnail icon" width="100"/>

The Apache app is a unified logs and metrics app that helps you monitor the availability, performance, health and resource utilization of Apache web server farms. Preconfigured dashboards and searches provide visibility into your environment for real-time or historical analysis: visitor locations, visitor access types, traffic patterns, errors, web server operations, resource utilization and access from known malicious sources.

## Log types and Metrics
The Sumo Logic app for Apache assumes:
* The [NCSA extended/combined log file format ](http://httpd.apache.org/docs/current/mod/mod_log_config.html) has been configured for Apache access logs and the default error log format for Apache Access logs and Apache Error logs. For a list of metrics that are collected and used by the app, see [Apache Metrics](#apache-metrics).

* The **Apache - Overview** dashboard is based on both Apache logs and metrics.
* Dashboards in the Metrics folder are based on Apache metrics alone.
* Dashboards and searches in the Logs folder are based on Apache access and error logs

### Sample log messages

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

```bash title="Access Logs"
{
	"timestamp":1620630466883,
	"log":"192.168.29.177 - - [10/May/2021:07:07:44 +0000] \"GET / HTTP/1.1\" 200 45",
	"stream":"stdout",
	"time":"2021-05-10T07:07:44.649858568Z"
}
```

```bash title="Error Logs"
{
	"timestamp":1620125665927,
	"log":"[Tue May 04 10:54:25.460469 2021] [ssl:error] [pid 53] [client 192.168.85.135:52327] AH02042: rejecting client initiated renegotiation",
	"stream":"stderr",
	"time":"2021-05-04T10:54:25.460664201Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```bash title="Access Logs"
192.168.29.177 - - [26/Apr/2021:12:18:32 +0530] "GET /server-status HTTP/1.1" 404 196
```

```bash title="Error Logs"
[Mon Apr 26 09:52:58.188858 2021] [core:notice] [pid 530] AH00094: Command line: '/usr/sbin/httpd -D FOREGROUND'
```

</TabItem>
</Tabs>

### Sample queries

This sample Query is from the **Top 5 Clients Causing 4xx Errors** panel of the Apache - Web server Operations dashboard.

```sql title="Query String"
webserver_system=apache webserver_farm=* HTTP (40* OR 41* OR 42* OR 43* OR 44* or 45* or 49*)
| json "log" nodrop | if (_raw matches "{*", log, _raw) as mesg
| parse regex field=mesg "^(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" nodrop
| parse regex field=mesg "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP\/[\d\.]+[\\n]*\"\s(?<status_code>\d+)\s(?<size>[\d-]+)" nodrop
| parse regex field=mesg "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP\/[\d\.]+[\\n]*\"\s(?<status_code>\d+)\s(?<size>[\d-]+)\s\"(?<referrer>.*?)\"\s\"(?<user_agent>.+?)\".*" nodrop
| where status_code matches "4*"
| count as count by src_ip
| sort count, src_ip asc
| limit 5
```

### Apache app Searches
The predefined searches in the Apache app are based on the Apache Access logs and Apache Error logs.

#### Searches based on Apache Access logs
* Apache - All HTTP Response codes with their count
* Apache - Client Errors (4xx response codes) per day
* Apache - HTTP status code summary over time
* Apache - Malicious URL requests
* Apache - Robots
* Apache - Slowest URLs by average time
* Apache - Time taken to serve requests
* Apache - Top 404 referrers
* Apache - Top browsers
* Apache - Top clients
* Apache - Top clients causing errors responses
* Apache - Top URLs by bytes served
* Apache - Traffic volume and bytes served per day


#### Search based on Apache Error logs
* Apache - Critical log messages
* Apache - Log Level counts
* Apache - Server start and stop events
* Apache - Server stops and starts over time
* Apache - Top error reasons
* Apache - Top files causing errors
* Apache - Top Referrers causing errors


## Collecting logs and metrics for Apache

This section provides instructions for configuring log and metrics collection for the Sumo Logic app for Apache.

### Step 1: Fields in Sumo Logic

Following fields will always be created automatically as a part of app installation process:
* `component`
* `environment`
* `webserver_system`
* `webserver_farm`

If you're using Apache in a Kubernetes environment, these additional fields will get created automatically as a part of app installation process:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_webserver_system`
* `pod_labels_webserver_farm`

For information on setting up fields, see [Sumo Logic Fields](/docs/manage/fields).

### Step 2: Configure Your Environment for Apache Logs and Metrics Collection

Sumo Logic supports collection of logs and metrics data from Apache in both Kubernetes and non-Kubernetes environments. Please click on the appropriate link below based on the environment where your Apache farms are hosted.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).The diagram below illustrates how data is collected from Apache in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/web-servers/Apache-flow.png')} alt="Apache" />

The first service in the pipeline is Telegraf. Telegraf collects metrics from Apache. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, meaning, Telegraf runs in the same pod as the containers it monitors.

Telegraf uses the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to obtain metrics. For simplicity, the diagram doesn’t show the input plugins.
The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector), which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note Prerequisites
Ensure that you are monitoring your Kubernetes clusters with the Telegraf operator. If you're not, see [these instructions](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) to do so.
:::

#### Configure Metrics Collection

Follow the steps below to collect metrics from a Kubernetes environment:

1. Add configuration to enable metrics on Apache pods:
```xml
configuration: |-
ServerName localhost:8080
  <IfModule status_module>
    ExtendedStatus On
    <Location /server-status>
      Sethandler server-status
      order deny,allow
      allow from all
    </Location>
  </IfModule>
```
2. Add annotations on your Apache pods:
```sql
annotations:
 telegraf.influxdata.com/class: sumologic-prometheus
  prometheus.io/scrape: "true"
  prometheus.io/port: "9273"
  telegraf.influxdata.com/inputs: |+
    [[inputs.apache]]
    < urls = ["http://localhost:8080/server-status?auto"] >
      [inputs.apache.tags]
        environment = "<prod_CHANGE_ME>"
        component = "webserver"
        webserver_system = "apache"
        webserver_farm = "<app1apacheeks_CHANGE_ME>"
```
3. Enter in values for the parameters marked in brackets (`< >`) above.
   * `telegraf.influxdata.com/inputs`: This contains the required configuration for the Telegraf Apache Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) for more information on configuring the Apache input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
      * In the input plugins section:
         * `urls`: The URL to the Apache server
         * In the tags section  `[inputs.apache.tags]`
         * `environment`: This is the deployment environment where the Apache webserver farm identified by the value of `urls` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
         * `webserver_farm`: Enter a name to uniquely identify this Apache Webserver farm. This Apache webserver farm name will be shown in the Sumo Logic dashboards.

   :::warning **Do not modify the following values**
   Modifying these values will cause the Sumo Logic apps to function incorrectly.
   * `telegraf.influxdata.com/class: sumologic-prometheus`: Instructs the Telegraf operator what output to use.
   * `prometheus.io/scrape: "true"`: Ensures our Prometheus will scrape the metrics.
   * `prometheus.io/port: "9273"`: Tells prometheus what ports to scrape on.
   * `telegraf.influxdata.com/inputs`
      * In the tags section `[inputs.apache.tags]`
      * `component: “webserver”`: Used by Sumo Logic apps to identify application components.
      * `webserver_system: “apache”`: Identifies the webserver system.
   :::     
   * For more information on other parameters and properties that you can configure in the Telegraf agent globally, see [Configuring_Telegraf](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf).
   * For more information on configuring the Apache input plugin for Telegraf, see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache).
4. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the configuration and annotations defined in the previous step.
5. Verify metrics in Sumo Logic by running the following metrics query:
  ```sql
  webserver_farm=<your_apache_webserver_farmname> \
  component="webserver" and webserver_system="apache"
  ```

#### Configure Logs Collection

This section explains the steps to collect Apache logs from a Kubernetes environment.

1. **Collect Apache logs written to standard output and standard error**. If your Apache helm chart/pod is writing the logs to standard output or standard error then follow the steps listed below to collect the logs:
   1. On your Apache Pods, add the following pod labels:
   ```xml
   environment: "<prod_CHANGE_ME>"
   component: "webserver"
   webserver_system: "apache"
   webserver_farm: "<app1apacheeks_CHANGE_ME>"
   ```
   2. Enter in values for the parameters marked in brackets (`< >`) above.
      * `environment`: This is the deployment environment where the Apache webserver farm identified by the value of `urls` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `webserver_farm`: Enter a name to identify this Apache webserver farm. This Apache webserver farm name will be shown in the Sumo Logic dashboards.

   :::warning **Do not modify the following values**
   Modifying these values will cause the Sumo Logic apps to function incorrectly
   * `component: “webserver”`: This value is used by Sumo Logic apps to identify application components.
   * `webserver_system: “apache”`: This value identifies the webserver system.
   :::
   * For all other parameters, please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. Make sure that the Apache pods are running and annotations are applied by using the command:
   ```xml
   kubectl describe pod <apache_pod_name>
   ```
   The Sumo Logic Kubernetes Collection process will automatically capture the logs from `stdout`/`stderr` and will send the logs to Sumo Logic. For more information on deploying the Sumo Logic-Kubernetes-Collection, please see [this page](/docs/integrations/containers-orchestration/kubernetes#collecting-metrics-and-logs-for-the-kubernetes-app).
2. **FER to normalize the fields in Kubernetes environments**. Labels created in Kubernetes environments automatically are prefixed with `pod_labels`. To normalize these for our app to work, we will have a Field Extraction Rule automatically created for Apache Web Server Application Components named as **AppObservabilityApacheWebserverFER**
</TabItem>
<TabItem value="non-k8s">

We use the Telegraf Operator for Apache metrics collection and the Sumo Logic Installed Collector for collecting Apache logs. The diagram below illustrates the components of the Apache collection in a non-Kubernetes environment for each web server. Telegraf runs on the same host as Apache, and uses the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to obtain Apache metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Apache logs are sent to a Sumo Logic Local File source of an installed collector.

<img src={useBaseUrl('img/integrations/web-servers/apache-non-k8s.png')} alt="apache-non-k8s" />

This section provides instructions for configuring metrics collection for the Sumo Logic app for Apache. Follow the instructions to set up metrics collection for each server belonging to a Apache server farm:

#### Configure Metrics Collection from a Apache Server

1. **Configure Metrics in Apache**. Before you can configure Sumo Logic to ingest metrics, you must turn on [server-status](https://httpd.apache.org/docs/2.4/mod/mod_status.html) for Apache. For this, edit the Apache conf file (httpd.conf).
   * Uncomment this line if not already done in the httpd.conf: `LoadModule status_module libexec/apache2/mod_status.so`
   * Add following lines in the httpd.conf after that
    ```xml
    <IfModule status_module>
      ExtendedStatus On
     <Location /server-status>
        Sethandler server-status
        order deny,allow
        allow from localhost
      </Location>
    </IfModule>
    ```
   * You may need to update ServerName in the httpd.conf file. For example: `ServerName localhost:80`.
   * Save **httpd.conf** file
   * Verify configuration is working as expected by running the following command:
    ```bash
    apachectl configtest
    # Syntax OK
    ```        
   * Restart httpd
     ```bbsdh
     apachectl restart
     ```
    * To test, enter the following urls in the web-browser. You should see the standard Apache output.
       * [http://localhost/](http://localhost/)
       * [http://localhost/server-status](http://localhost/server-status)
2. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
3. **Configure an HTTP Logs and Metrics Source**. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions.](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the **HTTP Source URL**.
4. **Install Telegraf**. Follow the steps in [this document](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
5. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we will use the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.
   1. Create or modify the telegraf.conf file and copy and paste the text below in the relevant sections:
      ```sql
      [[inputs.apache]]
        urls = ["http://localhost/server-status?auto"]
        response_timeout = "5s"
        [inputs.apache.tags]
          environment = "prod"
          component = "webserver"
          webserver_system = "apache"
          webserver_farm = "your_apache_webserver_farmname"

      [[outputs.sumologic]]
        url = "<URL Created in Step 3>"
        data_format = "prometheus"

      [agent]
        interval = "60s"
        flush_interval = "60s"
      ```
   2. Enter values for the following parameters (marked `CHANGEME` above):
      * In the input plugins section:
         * `urls`: The URL to the Apache server. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) for more information on additional parameters for configuring the Apache input plugin for Telegraf.
      * Configure metrics to collect by uncommenting the following lines. Please see [this document](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache#configuration) for more information
        * `response_timeout = "5s"`
      * In the tags section `[inputs.apache.tags]`
        * `webserver_farm`: Enter a name to uniquely identify this Apache web server farm. This web server farm name will be shown in the Sumo Logic dashboards.
        * `environment`: This is the deployment environment where the Apache web server farm identified by the value of `urls` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * In the output plugins section:
        * `url`: This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
      * In the `[agent]` section, set `interval` and `flush_interval` to `“60s”` to collect metric every 60 seconds.

      :::warning **Do not modify the following values**
      Modifying these values will cause the Sumo Logic apps to function incorrectly
      * `data_format = “prometheus”`, In the output plugins section, Metrics are sent in the Prometheus format to Sumo Logic
      * `component = “webserver”`: In the input plugins section, This value is used by Sumo Logic apps to identify application components.
      * `webserver_system = “apache”`: In the input plugins section, This value identifies the webserver system.
      :::

   For all other parameters, see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) for more parameters that can be configured in the Telegraf agent globally.

   2. Once you have finalized your telegraf.conf file, you can start or reload the telegraf service via the instructions described in their [documentation](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Apache metrics should start flowing into Sumo Logic.

#### Configure Logs Collection from an Apache server
This section provides instructions for configuring collection of logs from Apache running on a non-Kubernetes environment.

Apache logs (access logs and error logs) are stored in log files.

Sumo Logic supports collecting logs via a local log file. Local log files can be collected via [Sumo Logic Installed collectors,](/docs/send-data/installed-collectors) which requires you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work.

1. **Configure Apache to log to a local file(s)**. Apache logs written to a log file can be collected via the [Local File Source of a](/docs/send-data/installed-collectors/sources/local-file-source) Sumo Logic Installed collector. Before you can configure Sumo Logic to ingest logs, you must configure the logging of access logs and error logs via the instructions described in their [documentation](https://httpd.apache.org/docs/2.4/logs.html).

To configure the Apache log file(s), locate your local **httpd.conf** configuration file in the Apache directory. After determining the location of the conf file, modify the **httpd.conf** configuration file logging parameters if required.

For access logs, the following directive is to be noted:
* CustomLog: access log file path and format (standard common and combined)

For error logs, following directives are to be noted:
* ErrorLog: error log file path
* LogLevel: to control the number of messages logged to the error_log
2. **Configure an Installed Collector**. To add an Installed collector, perform the steps as defined on the page [Configure an Installed Collector.](/docs/send-data/installed-collectors)
3. **Configure a Local File Source for Apache access logs**. To add a Local File Source for Apache access log do the following
   1. Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) in the installed collector configured in the previous step.
   2. Configure the Local File Source fields as follows:
   * **Name.** (Required)
   * **Description.** (Optional)
   * **File Path (Required).** Enter the path to your apache access logs. The files are typically located in `/var/log/apache2/access_log`. If you're using a customized path, check the httpd.conf file for this information.
   * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
   * **Source Category.** Enter any string to tag the output collected from this Source, such as **Prod/Apache/Access**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see[ Best Practices](/docs/send-data/best-practices).)
   * **Fields**. Set the following fields. For more information on fields please see [this document](/docs/manage/fields):
    * `component = webserver`
    * `webserver_system = apache`
    * `webserver_farm = <your_apache_webserver_farmname>`
    * `environment = <Environment_Name>`, such as dev, qa or prod.
   * The values of `webserver_farm` and `environment` should be the same as they were configured in the Configure and start telegraf section.
   * **Configure the Advanced Options for Logs section:**
   * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
   * **Time Zone.** Select Use time zone form log file, if none is detected use “Use Collector Default”
   * **Timestamp Format.** Select Automatically detect the format.
   * **Encoding.** Select UTF-8 (Default).
   * Apache Access logs are single-line logs, uncheck **Detect messages spanning multiple lines.**
   3. Click **Save**. At this point, Apache access logs should start flowing into Sumo Logic.
4. **Configure a Local File Source for Apache error logs**. To add a Local File Source for Apache error log do the following
   1. Add a[ Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) in the installed collector configured in the previous step.
   2. Configure the Local File Source fields as follows:
    * **Name.** (Required)
    * **Description.** (Optional)
    * **File Path (Required).** Enter the path to your error_log. The files are typically located in `/var/log/apache2/error_log`. If you're using a customized path, check the httpd.conf file for this information.
    * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
    * **Source Category.** Enter any string to tag the output collected from this Source, such as **Prod/Apache/Error**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see[ Best Practices](/docs/send-data/best-practices).)
    * **Fields**. Set the following fields. For more information on fields please see [this document](/docs/manage/fields):
    ```sql
    component = webserver
    webserver_system = apache
    webserver_farm = <your_apache_webserver_farmname>
    environment = <Environment_Name>--such as dev, qa or prod
    ```
   * The values of `webserver_farm` and `environment` should be the same as they were configured in the Configure and start telegraf section.
   * **Configure the Advanced Options for Logs section:**
   * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
   * **Time Zone.** Select Use time zone form log file, if none is detected use “Use Collector Default”
   * **Timestamp Format.** Select Automatically detect the format.
   * **Encoding.** Select UTF-8 (Default).
   * Apache Error logs are multiline-line logs, Select **Detect messages spanning multiple lines** and **Boundary Regex: Expression to match message boundary**.
   * If error messages starts like `[Mon May 17 14:12:14.462704 2021]` then use boundary regex as below  
    ```bash
    ^\[\S{3}\s\S{3}\s\d{1,2}\s[^\]]+\].*
    ```
   3. Click **Save**. At this point, Apache Error logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>

## Installing the Apache app

Now that you have set up logs and metric collections for Apache, you can install the Sumo Logic app for Apache to use the pre-configured Searches and dashboards.

To install the app, do the following:
1. Locate and select the app you need from the **App Catalog**.
2. From the **App Catalog**, search for and select the app. If you want to see a preview of the dashboards included with the app before installing, click images in **Dashboard Preview** section.
3. Click **Add Integration**.
4. In **Setup Data** step you would see **Open Setup Doc** button with link to this document. Click **Next** to proceed.
5. In the **Configure Apache** step, complete the following fields.
   * **Apache Log Source**. Choose **Enter a Custom Data Filter** and enter a custom filter. Examples:
     * For all Apache web server farms: `webserver_system=apache webserver_farm=*`
     * For a specific web server farm: `webserver_system=apache webserver_farm=apache.dev.01`
   * Select location in the library (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
   * **Folder Name** You can retain the existing name, or enter a name of your choice for the app.
5. Click **Next**.

For more information, see the [Install the Apps from the Library](/docs/get-started/apps-integrations).

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Apache dashboards

This section provides descriptions of each of the app dashboards.

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables.md).
:::

### Overview

The **Apache - Overview** Dashboard provides an at-a-glance view of the activity and health of the Apache web server farms, and servers by monitoring uptime, requests, response, traffic, visitor geographic locations, and critical error messages.

Use this dashboard to:

* Get an at-a-glance view of the state of all your Apache web servers.
* Identify the top URLs causing errors.
* Identify the top critical error messages.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Overview.png')} alt="test" />


### Error Log Analysis

The **Apache - Error Log Analysis** dashboard provides a high-level view of error log levels, clients causing errors, critical error messages and trends.

Use this dashboard to:

* Quickly identify critical errors affecting your Apache web servers.
* Analyze types and patterns of log messages in your Apache web servers.
* Identify clients causing the most errors.
* Monitor trends in error logs and identify outliers.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Error-Log-Analysis.png')} alt="test" />

### Trends

The **Apache - Trends** dashboard provides trends around HTTP responses, server hits, visitor locations, traffic volume and distribution.

Use this dashboard to:
* Monitor trends and identify outliers.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Overview.png')} alt="test" />

### Outlier Analysis

The **Apache -  Outlier Analysis** dashboard helps you quickly identify outliers for key Apache metrics such bytes served, number of visitors, server errors, and client errors.

Use this dashboard to:
* Automatically detect outliers in the operations of your Apache web servers and take corrective actions if needed.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Trends.png')} alt="test" />

### Threat Analysis

The **Apache - Threat Intel** dashboard provides an at-a-glance view of incoming threats to your Apache servers based on known malicious IP addresses.

Dashboard panels show threat counts, geographic locations, actors, threat severity, URLS accessed.

Use this dashboard to:
* Identify threats from incoming traffic based on incoming client IP addresses and discover potential IOCs.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Threat_Analysis.png')} alt="test" />

### Visitor Locations

The **Apache - Visitor Locations** dashboard provides a high-level view of Apache visitor geographic locations both worldwide and in the United States.

Use this dashboard to:
* Get insights into geographic locations of your user base.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Panel_filter.png')} alt="test" />

### Visitor Access Types

The **Apache - Visitor Access Types** dashboard provides insights into visitor platform types, browsers, device types, and operating systems.

Use this dashboard to:
* Understand which platform and browsers are being used to access your applications.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Visitor_Access_Types.png')} alt="test" />

### Visitor Traffic Insight

The **Apache - Visitor Traffic Insight** dashboard provides summarized information on the top URLs, referrers, search terms, and media types served.

Use this dashboard to:
* To understand content types of content that are frequently requested by users.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Visitor_Traffic_Insight.png')} alt="test" />

### Web Server Operations

The **Apache - Web Server Operations** Dashboard provides an at-a-glance  view of the operations of your Apache web servers. Dashboard panels show information on bots, geographic locations, errors and URLs.

Use this dashboard to:
* Get insights into client locations, bots and response codes.

<img src={useBaseUrl('img/integrations/web-servers/Apache_Web_Server_Operations.png')} alt="test" />

### Request State Analysis

The **Apache - Request State Analysis** dashboard shows trends around the state of incoming requests to your Apache web servers.

Use this dashboard to:
* Monitor the state of requests being handled by worker threads over time and take remedial actions to optimize your web servers if needed.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Request-State-Analysis.png')} alt="test" />


### Server Resource Utilization

The **Apache - Server Resource Utilization** dashboard shows the CPU resource utilization and load across threads and CPU of your Apache web servers.

Use this dashboard to:
* Monitor CPU utilization and load on your Apache web servers.
* Monitor the number of worker and idle threads.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Server-Resource-Utilization.png')} alt="test" />


### Server Status

The **Apache - Server Status** dashboard shows information related to the state of your Apache server and includes information such as requests and bytes served and latency information on the number of requests served, time taken to serve the request, and bytes served.

Use this dashboard to:
* Monitor server uptime.
* Monitor web server performance.

<img src={useBaseUrl('img/integrations/web-servers/Apache-Server-Status.png')} alt="test" />

## Installing Apache Monitors

import CreateMonitors from '../../reuse/apps/create-monitors.md';

This section provides instructions for installing the Sumo Logic Monitors for Apache. These instructions assume you have already set up collection as described in the [Collecting Logs and Metrics for Apache](#collecting-logs-and-metrics-for-apache) page.

Sumo Logic has provided a predefined set of alerts, which can be imported and available through [Sumo Logic monitors](/docs/alerts/monitors), to help you proactively monitor your Apache Web servers and farms. These monitors are built based on metrics and logs datasets and include pre-set thresholds based on industry best practices and recommendations.

For details about individual alerts, see [Apache Alerts](#apache-alerts).

:::note permissions required
To install these alerts, you need to have the [Manage Monitors role capability](/docs/manage/users-roles/roles/role-capabilities/#alerting).
:::

:::note
There are limits to how many alerts can be enabled. For more information, see [Monitors](/docs/alerts/monitors/create-monitor) for details.
:::

## Apache Alerts

Sumo Logic provides out-of-the-box alerts available via [Sumo Logic monitors](/docs/alerts/monitors). These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

<details>
<summary>Here are the alerts available for Apache (click to expand).</summary>

| Alert Name       | Alert Description  | Alert Condition | Recover Condition |
|:----------------|:-------------------|:-----------------|:-------------------|
| Apache - Critical Error Messages      | This alert fires when we detect critical error messages for a given Apache server.                        | > 0             | 0                 |
| Apache - Access from Highly Malicious Sources | This alert fires when an Apache is accessed from highly malicious IP addresses.                            | > 0             | 0                 |
| Apache - High Client (HTTP 4xx) Error Rate | This alert fires when there are too many HTTP requests (>5%) with a response status of 4xx.                | > 0             | 0                 |
| Apache - High Server (HTTP 5xx) Error Rate | This alert fires when there are too many HTTP requests (>5%) with a response status of 5xx.                | > 0             | 0                 |
| Apache - High CPU Utilization         | This alert fires when the average CPU utilization within a 5-minute interval for an Apache Webserver farm instance is high (>= 85%). | \>= 85           | < 85              |
| Apache - Server Restarted             | This alert fires when we detect low uptime (\<= 10 minutes) for a given Apache server within a 5-minute interval. | \<= 600          | > 600             |


</details>


## Apache Metrics

<details>
<summary>Here are the metrics available for Apache (click to expand).</summary>

apache_BusyWorkers<br/>
apache_BytesPerReq<br/>
apache_BytesPerSec<br/>
apache_CPUChildrenSystem<br/>
apache_CPUChildrenUser<br/>
apache_CPULoad<br/>
apache_CPUSystem<br/>
apache_CPUUser<br/>
apache_DurationPerReq<br/>
apache_IdleWorkers<br/>
apache_Load1<br/>
apache_Load5<br/>
apache_Load15<br/>
apache_ParentServerConfigGeneration<br/>
apache_ParentServerMPMGeneration<br/>
apache_ReqPerSec<br/>
apache_ServerUptimeSeconds<br/>
apache_TotalAccesses<br/>
apache_TotalDuration<br/>
apache_TotalkBytes<br/>
apache_Uptime<br/>
apache_scboard_closing<br/>
apache_scboard_dnslookup<br/>
apache_scboard_finishing<br/>
apache_scboard_idle_cleanup<br/>
apache_scboard_keepalive<br/>
apache_scboard_logging<br/>
apache_scboard_open<br/>
apache_scboard_reading<br/>
apache_scboard_sending<br/>
apache_scboard_starting<br/>
apache_scboard_waiting<br/>

</details>
