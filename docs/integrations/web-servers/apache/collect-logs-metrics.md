---
id: collect-logs-metrics
title: Collect Logs and Metrics for Apache
---

## Collect Logs for Apache
1.gif "image_tooltip")


This page provides instructions for configuring log and metric collection for the Sumo Logic App for Apache.


### Collection Process Overview
2.gif "image_tooltip")


Configuring log and metric collection for the Apache App includes the following tasks:



* Step 1: Configure Felds in Sumo Logic.
* Step 2: Configure Collection for Apache
    * [Collect Apache Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/01-Collect-Logs-for-Apache/Collect_Apache_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Apache Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/01-Collect-Logs-for-Apache/Collect_Apache_Logs_and_Metrics_for_Kubernetes_environments).


#### Step 1: Configure Fields in Sumo Logic
3.gif "image_tooltip")


Create the following Fields in Sumo Logic prior to configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Apache in a non-Kubernetes environment create the fields:



* component
* environment
* webserver_system
* webserver_farm

If you are using Apache in a Kubernetes environment create the fields:



* pod_labels_component
* pod_labels_environment
* pod_labels_webserver_system
* pod_labels_webserver_farm


#### Step 2: Configure Collection for Apache
4.gif "image_tooltip")


Sumo Logic supports collection of logs and metrics data from Apache in both Kubernetes and non-Kubernetes environments.

Please click on the appropriate links below based on the environment where your Apache farms are hosted.

* [Collect Apache Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/01-Collect-Logs-for-Apache/Collect_Apache_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect Apache Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache/01-Collect-Logs-for-Apache/Collect_Apache_Logs_and_Metrics_for_Kubernetes_environments).


### Sample Log Messages
5.gif "image_tooltip")



#### For Kubernetes:
6.gif "image_tooltip")



##### Access Logs:
7.gif "image_tooltip")



```
{
"timestamp":1620630466883,
"log":"192.168.29.177 - - [10/May/2021:07:07:44 +0000] \"GET / HTTP/1.1\" 200 45",
"stream":"stdout",
"time":"2021-05-10T07:07:44.649858568Z"
}
```



##### Error Logs:
8.gif "image_tooltip")



```
{
"timestamp":1620125665927,
"log":"[Tue May 04 10:54:25.460469 2021] [ssl:error] [pid 53] [client 192.168.85.135:52327] AH02042: rejecting client initiated renegotiation",
"stream":"stderr",
"time":"2021-05-04T10:54:25.460664201Z"
}
```



#### For Non-Kubernetes
9.gif "image_tooltip")



##### Access Logs:
10.gif "image_tooltip")



```
192.168.29.177 - - [26/Apr/2021:12:18:32 +0530] "GET /server-status HTTP/1.1" 404 196
```



##### Error Logs:
11.gif "image_tooltip")



```
[Mon Apr 26 09:52:58.188858 2021] [core:notice] [pid 530] AH00094: Command line: '/usr/sbin/httpd -D FOREGROUND'
```



### Query Sample
12.gif "image_tooltip")


This sample Query is from the **Top 5 Clients Causing 4xx Errors** panel of the **Apache - Webserver Operations** dashboard.

**Query String:**


```
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



### Collect Apache Logs and Metrics for Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture).The diagram below illustrates how data is collected from Apache in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Apache. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: i.e. Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and standard error and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.

13.png "image_tooltip")

Follow the instructions below to set up the metric collection:

1. Configure Metrics Collection
    1. Setup Kubernetes Collection with the Telegraf operator
    2. Add annotations on your Apache pods
2. Configure Logs Collection
    3. Configure logging in Apache.
    4. Add labels on your Apache pods to capture logs from standard output and standard error.

**Prerequisites**



* Please ensure that you are monitoring your Kubernetes clusters with the Telegraf operator -  If you are not, then please follow [these instructions](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment) to do so.<span style="text-decoration:underline;"> </span>


#### Step 1 Configure Metrics Collection
14.gif "image_tooltip")


Follow the steps below to collect metrics from a Kubernetes environment:



1. Add configuration to enable metric on Apache pods

    configuration: |-



```
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



1. Add annotations on your Apache pods

    podAnnotations:



```
 telegraf.influxdata.com/class: sumologic-prometheus
  prometheus.io/scrape: "true"
  prometheus.io/port: "9273"
  telegraf.influxdata.com/inputs: |+
    [[inputs.apache]]
      urls = ["http://localhost:8080/server-status?auto"]
      [inputs.apache.tags]
        environment = "prod_CHANGE_ME"
        component = "webserver"
        webserver_system = "apache"
        webserver_farm = "app1apacheeks_CHANGE_ME"
```



    Please enter in values for the following parameters (marked in **bold** above):



* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf Apache Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) for more information on configuring the Apache input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section i.e. :
        * **urls** - The URL to the Apache server
        * In the tags section i.e.  [inputs.apache.tags]
            * **environment** - This is the deployment environment where the Apache webserver farm identified by the value of **urls** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
            * **webserver_farm** - Enter a name to uniquely identify this Apache Webserver farm. This Apache webserver farm name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** these values as they will cause the Sumo Logic apps to not function correctly.

* **telegraf.influxdata.com/class: sumologic-prometheus** - This instructs the Telegraf operator what output to use. This should not be changed.
* **prometheus.io/scrape: "true" **- This ensures our Prometheus will scrape the metrics.
* **prometheus.io/port: "9273"** - This tells prometheus what ports to scrape on. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags section i.e.  [inputs.apache.tags]
        * **component**: “webserver” - This value is used by Sumo Logic apps to identify application components.
        * **webserver_system**: “apache” - This value identifies the webserver system.

    For more information on all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.


    For more information on configuring the Apache input plugin for Telegraf please see [this doc.](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache)

1. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the configuration and annotations defined in the previous step.
2. Verify metrics in Sumo Logic by running the following metrics query:

    websrever_farm=<**your_apache_webserver_farmname**> component="webserver" and webserver_system="apache"



#### Step 2 Configure Logs Collection
15.gif "image_tooltip")


This section explains the steps to collect Apache logs from a Kubernetes environment.



1. Collect Apache logs written to standard output and standard error

    If your Apache helm chart/pod is writing the logs to standard output or standard error then follow the steps listed below to collect the logs:

1. On your Apache Pods, add the following pod labels

        podLabels:



```
environment: "prod_CHANGE_ME"
 component: "webserver"
 webserver_system: "apache"
 webserver_farm: "app1apacheeks_CHANGE_ME"
```



        Please enter in values for the following parameters (marked in **bold** above):



* **environment** - This is the deployment environment where the Apache webserver farm identified by the value of **urls** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* **webserver_farm** - Enter a name to identify this Apache webserver farm. This Apache webserver farm name will be shown in the Sumo Logic dashboards.

        Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **component**: “webserver” - This value is used by Sumo Logic apps to identify application components.
* **webserver_system**: “apache” - This value identifies the webserver system.

        For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.


    Make sure that the Apache pods are running and annotations are applied by using the command: **kubectl describe pod <apache_pod_name>**


    The Sumo Logic Kubernetes Collection process will automatically capture the logs from stdout / stderr and will send the logs to Sumo Logic. For more information on deploying the Sumo Logic -Kubernetes -Collection, please see[ this page](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App).

1. Add an FER to normalize the fields in Kubernetes environments

    Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Web Server Application Components. To do so:

1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the **+ Add** button on the top right of the table.
3. The following form appears:


16.png "image_tooltip")


1. Enter the following options:
    * **Rule Name**: Enter the name as **App Observability - Webserver**
    * **Applied At:** Choose **Ingest Time**
    * **Scope**: Select **Specific Data**
        * **Scope**: Enter the following keyword search expression:


```
pod_labels_environment=* pod_labels_component=webserver pod_labels_webserver_system=* pod_labels_webserver_farm=*

```



* **Parse Expression**.Enter the following parse expression:


```
if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
| pod_labels_component as component
| pod_labels_webserver_system as webserver_system
| pod_labels_webserver_farm as webserver_farm

```



1. xClick **Save** to create the rule.
1. Verify logs are flowing into Sumo Logic by running the following logs query:


```
component=webserver webserver_system=apache webserver_farm=<your_apache_webserver_farmname>
```



### Collect Apache Logs and Metrics for Non-Kubernetes environments

We use the Telegraf Operator for Apache metrics collection and the Sumo Logic Installed Collector for collecting Apache logs. The diagram below illustrates the components of the Apache collection in a non-Kubernetes environment for each web server. Telegraf runs on the same host as Apache, and uses the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to obtain Apache metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Apache logs are sent to a Sumo Logic Local File source of an installed collector.


17.png "image_tooltip")


This section provides instructions for configuring metrics collection for the Sumo Logic App for Apache. Follow the instructions to set up metrics collection for each server belonging to a Apache server farm:



1. Configure Metrics Collection
    1. Configure Metrics in Apache
    2. Configure a Hosted Collector
    3. Configure a HTTP Logs and Metrics Source
    4. Install Telegraf
    5. Configure and start Telegraf
2. Configure Logs Collection
    6. Configure logging in Apache
    7. Configure Sumo Logic Installed Collector
    8. Configure a Local File Source


#### Step 1 Configure Collection of Metrics from a Apache Server
18.gif "image_tooltip")




1. **Configure Metrics in Apache**

    Before you can configure Sumo Logic to ingest metrics, you must turn on [server-status](https://httpd.apache.org/docs/2.4/mod/mod_status.html) for Apache. For this edit the Apache conf file (httpd.conf)

* Uncomment following line if not already done in the httpd.conf
    * LoadModule status_module libexec/apache2/mod_status.so
* Add following lines in the httpd.conf after that


```
 <IfModule status_module>
    ExtendedStatus On
    <Location /server-status>
      Sethandler server-status
      order deny,allow
      allow from localhost
    </Location>
  </IfModule>

```



* You may need to update ServerName in the httpd.conf file
    * Example: ServerName localhost:80
* Save **httpd.conf** file
* Verify configuration is working as expected by running the following command
    * apachectl configtest

            Syntax OK

* Restart httpd
    * apachectl restart
    * To test, enter the following urls in the web-browser. You should see the standard Apache output.
        * [http://localhost/](http://localhost/)
        * [http://localhost/server-status](http://localhost/server-status)
1. **Configure a Hosted Collector**

    To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.

1. **Configure an HTTP Logs and Metrics Source**

    Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.

1. **Install Telegraf**

    Follow the steps in [this document](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.

1. **Configure and start Telegraf**

    As part of collecting metrics data from Telegraf, we will use the [Apache input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.


    Create or modify the telegraf.conf file and copy and paste the text below in the relevant sections:



```
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



    Please enter values for the following parameters (marked in **bold** above):



* In the input plugins section i.e. :
    * **urls** - The URL to the Apache server. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache) for more information on additional parameters for configuring the Apache input plugin for Telegraf.
    * Configure metrics to collect by uncommenting the following lines. Please see  [this document](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/apache#configuration) for more information
        * **response_timeout** = "5s"
    * In the tags section i.e.  [inputs.apache.tags]
        * **webserver_farm** - Enter a name to uniquely identify this Apache web server farm. This web server farm name will be shown in the Sumo Logic dashboards.
        * **environment** - This is the deployment environment where the Apache web server farm identified by the value of **urls** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* In the output plugins section i.e. :
    * **url** - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
* In the agent section i.e [agent]
    * Set **interval** and **flush_interval** to “60s” to collect metric every 60 seconds.

    Here’s an explanation for additional values set by this Telegraf configuration that we request you to please** not modify these values** as they will cause the Sumo Logic apps to not function correctly.

* **data_format** = “prometheus”, In the output plugins section i.e.   Metrics are sent in the Prometheus format to Sumo Logic
* **component** = “webserver” - In the input plugins section i.e. - This value is used by Sumo Logic apps to identify application components.
* **webserver_system** = “apache” - In the input plugins section i.e. -  This value identifies the webserver system.

    For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) for more properties that can be configured in the Telegraf agent globally.


    Once you have finalized your telegraf.conf file, you can start or reload the telegraf service via the instructions described in their [documentation](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).


    At this point, Apache metrics should start flowing into Sumo Logic.



#### Step 2 Configure Collection of Logs from a Apache server
19.gif "image_tooltip")



    This section provides instructions for configuring collection of logs from Apache running on a non-Kubernetes environment.


    Apache logs (access logs and error logs) are stored in log files.


    Sumo Logic supports collecting logs via a local log file. Local log files can be collected via [Sumo Logic Installed collectors,](https://help.sumologic.com/03Send-Data/Installed-Collectors) which requires you to allow outbound traffic to [Sumo Logic endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for collection to work.


    Follow the instructions below to set up log collection:



1. Configure Apache to log to a local file(s)
2. Configure an Installed Collector
3. Configure a Local File source for apache access logs
4. Configure a Local File source for apache error logs





1. Configure Apache to log to a local file(s)

    Apache logs written to a log file can be collected via the [Local File Source of a ](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source)Sumo Logic Installed collector. Before you can configure Sumo Logic to ingest logs, you must configure the logging of access logs and error logs via the instructions described in their [documentation](https://httpd.apache.org/docs/2.4/logs.html).


    **To configure the Apache log file(s), locate** your local **httpd.conf** configuration file in the Apache directory. After determining the location of the conf file, modify the **httpd.conf** configuration file logging parameters if required.


    For access logs, the following directive is to be noted

* CustomLog: access log file path and format (standard common and combined)

    For error logs, following directives are to be noted

* ErrorLog: error log file path
* LogLevel: to control the number of messages logged to the error_log
1. Configure an Installed Collector

    To add an Installed collector, perform the steps as defined on the page [Configure an Installed Collector.](https://help.sumologic.com/03Send-Data/Installed-Collectors)

1. Configure a Local File Source for Apache access logs

    To add a Local File Source for Apache access log do the following

1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) in the installed collector configured in the previous step.
2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your apache access logs. The files are typically located in /var/log/apache2/access_log. If you are using a customized path, check the httpd.conf file for this information.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
* **Source Category.** Enter any string to tag the output collected from this Source, such as **Prod/Apache/Access**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. Set the following fields. For more information on fields please see [this document](https://help.sumologic.com/Manage/Fields):**
    * **component = webserver**
    * **webserver_system = apache**
    * **webserver_farm = <your_apache_webserver_farmname>**
    * **environment = <Environment_Name>, such as dev, qa or prod.**


20.png "image_tooltip")




21.png "image_tooltip")
The values of webserver_farm and environment should be the same as they were configured in the Configure and start telegraf section.



* **Configure the Advanced Options for Logs section:**
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Select Use time zone form log file, if none is detected use “Use Collector Default”
* **Timestamp Format.** Select Automatically detect the format.
* **Encoding. **Select** **UTF-8 (Default).
* Apache Access logs are single-line logs, uncheck **Detect messages spanning multiple lines.**
1. Click **Save**.

    At this point, Apache access logs should start flowing into Sumo Logic.

1. Configure a Local File Source for** Apache error logs**

    To add a Local File Source for Apache error log do the following

1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) in the installed collector configured in the previous step.
2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your error_log. The files are typically located in /var/log/apache2/error_log. If you are using a customized path, check the httpd.conf file for this information.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
* **Source Category.** Enter any string to tag the output collected from this Source, such as **Prod/Apache/Error**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. Set the following fields. For more information on fields please see [this document](https://help.sumologic.com/Manage/Fields):**
    * `component = webserver`
    * `webserver_system = apache`
    * `webserver_farm = <your_apache_webserver_farmname>`
    * `environment = <Environment_Name>`, such as dev, qa or prod.


22.png "image_tooltip")

23.png "image_tooltip")
The values of webserver_farm and environment should be the same as they were configured in the Configure and start telegraf section.

* **Configure the Advanced Options for Logs section:**
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Select Use time zone form log file, if none is detected use “Use Collector Default”
* **Timestamp Format.** Select Automatically detect the format.
* **Encoding. **Select** **UTF-8 (Default).
* Apache Error logs are multiline-line logs, Select **Detect messages spanning multiple lines** and **Boundary Regex - Expression to match message boundary**.
    * If error messages starts like [Mon May 17 14:12:14.462704 2021] then use boundary regex as below  

`^\[\S{3}\s\S{3}\s\d{1,2}\s[^\]]+\].*`
1. Click **Save**.

        At this point, Apache Error logs should start flowing into Sumo Logic.
