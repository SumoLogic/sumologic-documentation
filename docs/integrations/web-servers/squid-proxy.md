---
id: squid-proxy
title: Sumo Logic App for Squid Proxy
sidebar_label: Squid Proxy
description: The Squid Proxy app is a unified logs and metrics app that helps you monitor activity in Squid Proxy.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Squid Proxy app is a unified logs and metrics app that helps you monitor activity in Squid Proxy. The preconfigured dashboards provide insight into served and denied requests; performance metrics; IP domain DNS statistics; traffic details; HTTP response codes; URLs experiencing redirects, client errors, and server errors; and quality of service data that helps you understand your users’ experience.

This App is tested with the following Squid Proxy versions:

* **Non-Kubernetes**: Squid Proxy version: 6.0.0
* **Kubernetes**: Squid Proxy version: 6.0.0


## Collect Logs and Metrics for the Squid Proxy App

This page provides instructions for configuring log and metric collection for the Sumo Logic App for Squid Proxy.


#### Collection Process Overview
1.gif "image_tooltip")


Configuring log and metric collection for the Squid Proxy App includes the following tasks:

* Configure Fields in Sumo Logic.
* Configure Collection for Squid Proxy
    * [Collect Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Collect_Logs_for_Squid_Proxy/Collect_Squid_Proxy_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Collect_Logs_for_Squid_Proxy/Collect_Squid_Proxy_Logs_and_Metrics_for_Kubernetes_environments).


##### Configure Fields in Sumo Logic
2.gif "image_tooltip")


Create the following fields in Sumo Logic prior to configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Squid Proxy in a non-Kubernetes environment create the fields:

* component
* environment
* proxy_system
* proxy_cluster
* pod

If you are using Squid Proxy in a Kubernetes environment create the fields:

* pod_labels_component
* pod_labels_environment
* pod_labels_proxy_system
* pod_labels_proxy_cluster


##### Configure Collection for Squid Proxy
3.gif "image_tooltip")


Sumo Logic supports the collection of logs and metrics data from Squid Proxy in both Kubernetes and non-Kubernetes environments.

Click on the appropriate links below based on the environment where your Squid Proxy clusters are hosted.

* [Collect Logs and Metrics for Kubernetes environments]
* [Collect Logs and Metrics for Non-Kubernetes environments]


### Collect Squid Proxy Logs and Metrics for Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). The diagram below illustrates how data is collected from Squid Proxy in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd, and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Squid Proxy. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: i.e. Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [SNMP input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/snmp) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.


4.png "image_tooltip")


Follow the below instructions to set up the metric collection:


1. Configure Metrics Collection
    1. Setup Kubernetes Collection with the Telegraf operator
    2. Enable SNMP agent on Squid Proxy
    3. Add annotations on your Squid Proxy pods
2. Configure Logs Collection
    4. Configure logging in Squid Proxy.
    5. Add labels on your Squid Proxy pods to capture logs from standard output.
    6. Collecting Squid Proxy Logs from a Log file.

**Prerequisites**

It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


#### Configure Metrics Collection
5.gif "image_tooltip")


This section explains the steps to collect Squid Proxy metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more on this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:



1. **[Setup Kubernetes Collection with the Telegraf Operator.](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment)**
2. **Enable SNMP agent on Squid Proxy**

    By default, the [SNMP agent](https://wiki.squid-cache.org/Features/Snmp) will be disabled on squid proxy. You have to enable it. To enable the SNMP agent on squid, edit the configuration file of the squid proxy (squid.conf) and add the following section in ConfigMap that mounted to Squid Proxy pods:


    acl snmppublic snmp_community public


    snmp_port 3401


    snmp_access allow snmppublic localhost

1. **Add annotations on your Squid Proxy pods**

On your Squid Proxy Pods, add the following annotations:


```
annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+

[[inputs.snmp]]]
  agents = ["udp://127.0.0.1:3401"]
  name = "squid"
  community = "public"
  [inputs.snmp.tags]
   proxy_cluster="<Squid Proxy_TO_BE_CHANGED>"
   component="proxy"
   environment="env_TO_BE_CHANGED"
   proxy_system="squidproxy"

  [[inputs.snmp.field]]
name = "uptime"
oid = "1.3.6.1.4.1.3495.1.1.3.0"
  [[inputs.snmp.field]]
      name = "cacheMemUsage"
      oid = "1.3.6.1.4.1.3495.1.3.1.3.0"
  [[inputs.snmp.field]]
      name = "cacheCpuUsage"
      oid = "1.3.6.1.4.1.3495.1.3.1.5.0"
  [[inputs.snmp.field]]
      name = "cacheClients"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.15.0"
  [[inputs.snmp.field]]
      name = "cacheProtoClientHttpRequests"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.1.0"
  [[inputs.snmp.field]]
  name = "cacheHttpHits"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheHttpErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.3.0"
  [[inputs.snmp.field]]
   name = "uidcacheHttpInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.4.0"

  [[inputs.snmp.field]]
   name = "cacheHttpOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.5.0"

  [[inputs.snmp.field]]
   name = "cacheServerInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.12.0"
  [[inputs.snmp.field]]
   name = "cacheServerOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.13.0"
  [[inputs.snmp.field]]
   name = "cacheClients"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.15.0"
  [[inputs.snmp.field]]
   name = "cacheCpuTime"
   oid = "1.3.6.1.4.1.3495.1.3.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheMemMaxSize"
   oid = "1.3.6.1.4.1.3495.1.2.5.1.0"
  [[inputs.snmp.field]]
   name = "cacheServerRequests"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.10.0"
  [[inputs.snmp.field]]
   name = "cacheHttpInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheHttpOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.5.0"
  [[inputs.snmp.field]]
   name = "cacheNumObjCount"
   oid = "1.3.6.1.4.1.3495.1.3.1.7.0"
  [[inputs.snmp.field]]
   name = "cacheHttpAllSvcTime1"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.2.1"
  [[inputs.snmp.field]]
   name = "cacheDnsSvcTime1"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.8.1"
  [[inputs.snmp.field]]
   name = "cacheHttpMissSvcTime60"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.3.60"
  [[inputs.snmp.field]]
   name = " cacheHttpHitSvcTime60"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.5.60"
  [[inputs.snmp.field]]
   name = "cacheIpEntries"
   oid = "1.3.6.1.4.1.3495.1.4.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheIpMisses"
   oid = "1.3.6.1.4.1.3495.1.4.1.6.0"
  [[inputs.snmp.field]]
   name = "cacheVersionId"
   oid = "1.3.6.1.4.1.3495.1.2.3.0"
  [[inputs.snmp.field]]
   name = "cacheSysPageFaults"
   oid = "1.3.6.1.4.1.3495.1.3.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheHttpErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.3.0"
  [[inputs.snmp.field]]
   name = "cacheServerErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.11.0"
  [[inputs.snmp.field]]
   name = "cacheCpuUsage"
   oid = "1.3.6.1.4.1.3495.1.3.1.5.0"
  [[inputs.snmp.field]]
   name = "cacheCpuTime"
   oid = "1.3.6.1.4.1.3495.1.3.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheSysVMsize"
   oid = "1.3.6.1.4.1.3495.1.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheSysNumReads"
   oid = "1.3.6.1.4.1.3495.1.3.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentUnusedFDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.10.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentFileDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.12.0"
  [[inputs.snmp.field]]
   name = "cacheMaxResSize"
   oid = "1.3.6.1.4.1.3495.1.3.1.6.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentResFileDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.11.0"
  [[inputs.snmp.field]]
   name = "cacheIpRequests"
   oid = "1.3.6.1.4.1.3495.1.4.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheIpHits"
   oid = "1.3.6.1.4.1.3495.1.4.1.3.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnEntries"
   oid = "1.3.6.1.4.1.3495.1.4.2.1.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnRequests"
   oid = "1.3.6.1.4.1.3495.1.4.2.2.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnHits"
   oid = "1.3.6.1.4.1.3495.1.4.2.3.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnMisses"
   oid = "1.3.6.1.4.1.3495.1.4.2.6.0"
  [[inputs.snmp.field]]
   name = "cacheDnsRequests"
   oid = "1.3.6.1.4.1.3495.1.4.3.1.0"
  [[inputs.snmp.field]]
   name = "cacheDnsReplies"
   oid = "1.3.6.1.4.1.3495.1.4.3.2.0"
  [[inputs.snmp.field]]
   name = "cacheDnsNumberServers"
   oid = "1.3.6.1.4.1.3495.1.4.3.3.0"
  [[inputs.snmp.field]]
   name = "version"
   oid = "1.3.6.1.4.1.3495.1.2.3.0"
   is_tag = true
  [[inputs.snmp.field]]
   name = "cacheHttpAllSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.2.5"
  [[inputs.snmp.field]]
   name = "cacheHttpMissSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.3.5"
  [[inputs.snmp.field]]
   name = "cacheHttpHitSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.5.5"
  [[inputs.snmp.field]]
   name = "cacheDnsSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.8.5"
```



6.png "image_tooltip")
If you haven’t defined a farm in Squid Proxy, then enter ‘**default**’ for `proxy_cluster`.

Enter in values for the following parameters (marked in bold above):


* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf SNMP Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the SNMP input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the tags section, which is `[inputs.snmp.tags]`
        * **environment** - This is the deployment environment where the Squid Proxy cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **proxy_cluster **- Enter a name to identify this Squid Proxy cluster. This farm name will be shown in the Sumo Logic dashboards.  

Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **telegraf.influxdata.com/class: sumologic-prometheus** - This instructs the Telegraf operator what output to use. This should not be changed.
* **prometheus.io/scrape: "true"** - This ensures our Prometheus will scrape the metrics.
* **prometheus.io/port: "9273"** - This tells prometheus what ports to scrape on. This should not be changed.
* **telegraf.influxdata.com/inputs**
    * In the tags section, which is `[inputs.snmp.tags]`
        * **component**: “proxy” - This value is used by Sumo Logic apps to identify application components.
        * **proxy_system**: “squidproxy” - This value identifies the proxy system.

For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.



1. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
2. Verify metrics in Sumo Logic.


#### Configure Logs Collection
7.gif "image_tooltip")


This section explains the steps to collect Squid Proxy logs from a Kubernetes environment.



1. **(Recommended Method) Add labels on your Squid Proxy pods to capture logs from standard output.**

Make sure that the logs from Squid Proxy are sent to stdout. Follow the instructions below to capture Squid Proxy logs from stdout on Kubernetes.



1. Apply following labels to the Squid Proxy pod

                        labels:
`environment="prod_CHANGEME"`


```
  component="proxy"
  proxy_system="squidproxy"
  proxy_cluster="<cluster_CHANGEME>"
```


Please enter in values for the following parameters (marked in **bold and CHANGE_ME** above):



* **environment** - This is the deployment environment where the Squid Proxy cluster identified by the value of **servers** resides. For example:- dev, prod, or QA. While this value is optional we highly recommend setting it.
* **proxy_cluster **- Enter a name to identify this Squid Proxy cluster. This farm name will be shown in the Sumo Logic dashboards. If you haven’t defined a cluster in Squid Proxy, then enter ‘**default**’ for `proxy_cluster`.

Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.



* **component**: “proxy” - This value is used by Sumo Logic apps to identify application components.
* **proxy_system**: “squidproxy” - This value identifies the proxy system.

For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.



1. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection,[ visit](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.
2. Verify logs in Sumo Logic.
1. **(Optional) Collecting Squid Proxy Logs from a Log File \
**Follow the steps below to capture Squid Proxy logs from a log file on Kubernetes.
1. Determine the location of the Squid Proxy log file on Kubernetes. This can be determined from the squid.conf for your Squid Proxy cluster along with the mounts on the Squid Proxy pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.


```
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Squid Proxy_log_file>/<Squid Proxy_log_file_name>
```


Example:


```
annotations:
  tailing-sidecar: sidecarconfig;data:/var/log/squid/access.log

```



1. Make sure that the Squid Proxy pods are running and annotations are applied by using the command: **kubectl describe pod <Squid_Proxy_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. Verify logs in Sumo Logic.
1. **Add an FER to normalize the fields in Kubernetes environments \
**Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Proxy Application Components. To do so:
1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the + Add button on the top right of the table.
3. The following form appears:


### Collect Squid Proxy Logs and Metrics for Non-Kubernetes environments

Sumo Logic uses the Telegraf operator for Squid Proxy metric collection and the [Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors/01About-Installed-Collectors) for collecting Squid Proxy logs. The diagram below illustrates the components of the  Squid Proxy collection in a non-Kubernetes environment. Telegraf uses the[ SNMP input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/snmp) to obtain Squid Proxy metrics and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Squid Proxy are collected by a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).

8.png "image_tooltip")


The process to set up collection for Squid Proxy data is done through the following steps:



1. Configure Logs Collection
    1. Configure logging in Squid Proxy
    2. Configure Sumo Logic Installed Collector
    3. Configure a local file source
    4. Save
2. Configure Metrics Collection
    5. Configure a Hosted Collector
    6. Configure an HTTP Logs and Metrics Source
    7. Enable SNMP agent on Squid Proxy
    8. Install Telegraf
    9. Configure and start Telegraf


#### Configure Logs Collection
9.gif "image_tooltip")


Squid Proxy app supports the default access logs and cache logs format.



1. **Configure logging in Squid Proxy.**

By default, the squid proxy will write the access log to the log directory that was configured during installation. For example, on Linux, the log directory would be `/var/log/squid/access.log`. If the access log is disabled then you must enable the access log following these [instructions](https://wiki.squid-cache.org/SquidFaq/SquidLogs).



1. **Configure an Installed Collector.** If you have not already done so, install and configure an installed collector for Windows by [following the documentation](https://help.sumologic.com/03Send-Data/Installed-Collectors/03Install-a-Collector-on-Windows).
2. **Configure a Collector**

Use one of the following Sumo Logic Collector options:



1. To collect logs directly from the Squid Proxy machine, configure an [Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors).
2. If you are using a service like Fluentd, or you would like to upload your logs manually, [Create a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors#Create_a_Hosted_Collector).
1. **Configure a local file source**

**For an Installed Collector**

To collect logs directly from your Squid Proxy machine, use an Installed Collector and a Local File Source.  



1. Add a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).
2. Configure the Local File Source fields as follows:
* **Name**. (Required)
* **Description**. (Optional)
* **File Path (Required)**. Enter the path to your access.log. The files are typically located in /var/log/squid/access.log. If you are using a customized path, check the squid.conf file for this information.
* **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname.
* **Source Category**. Enter any string to tag the output collected from this Source, such as SquidProxy/AccessLog. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
* **Fields. **Set the following fields \
`component = proxy \
proxy_system = squidproxy \
proxy_cluster = <Your_Squid_Proxy_Cluster_Name>`. Enter **Default** if you do not have one. \
`environment = <Your_Environment_Name>` (for example, Dev, QA, or Prod) \

10.png "image_tooltip")

1. Configure the Advanced section:
* Enable Timestamp Parsing. Select Extract timestamp information from log file entries.
* Time Zone. Automatically detect.
* Timestamp Format. The timestamp format is automatically detected.
* Encoding. Select UTF-8 (Default).
* Enable Multiline Processing.
    * Error logs. Select Detect messages spanning multiple lines and Infer Boundaries - Detect message boundaries automatically.
    * Access logs. These are single-line logs, uncheck Detect messages spanning multiple lines.
1. Click Save.

For a Hosted Collector

If you are using a service like Fluentd, or you would like to upload your logs manually, use a Hosted Collector and an HTTP Source.



1. Add an [HTTP Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source).
2. Configure the HTTP Source fields as follows:
* **Name**. (Required)
* **Description**. (Optional)
* **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname.
* **Source Category**. Enter any string to tag the output collected from this Source, such as SquidProxy/AccessLog. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)
1. Configure the **Advanced **section:
* **Enable Timestamp Parsing**. Select **Extract timestamp information from log file entries**.
* **Time Zone**. For Access logs, use the time zone from the log file. For Error logs, make sure to select the correct time zone.
* **Timestamp Format**. The timestamp format is automatically detected.
* **Enable Multiline Processing**.
    * **Error logs**: Select **Detect messages spanning multiple lines** and **Infer Boundaries - Detect message boundaries automatically**.
    * **Access logs**: These are single-line logs, uncheck **Detect messages spanning multiple lines**.
1. Click **Save**.
2. When the URL associated with the HTTP Source is displayed, copy the URL so you can add it to the service you are using, such as Fluentd.


##### Configure Metrics Collection
11.gif "image_tooltip")



###### Set up a Sumo Logic HTTP Source
12.gif "image_tooltip")




1. **Configure a Hosted Collector for Metrics. \
**To create a new Sumo Logic hosted collector, perform the steps in the [Create a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors#Create_a_Hosted_Collector) documentation.
2. **Configure an HTTP Logs & Metrics source**:
    1. On the created Hosted Collector on the Collection Management screen, select **Add Source**.
    2. Select **HTTP Logs & Metrics_._**
        1. **Name.** (Required). Enter a name for the source.
        2. **Description.** (Optional).
        3. **Source Category** (Recommended)**.** Be sure to follow the [Best Practices for Source Categories](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category). A recommended Source Category may be Prod/ProxyServer/SquidProxy/Metrics.
    3. Select **Save**.
    4. Take note of the URL provided once you click _Save_. You can retrieve it again by selecting the **Show URL** next to the source on the Collection Management screen.


###### Enable SNMP agent on Squid Proxy
13.gif "image_tooltip")


By default, the [SNMP agent](https://wiki.squid-cache.org/Features/Snmp) will be disabled on squid proxy. You have to enable it. To enable the SNMP agent on squid, edit the configuration file of the squid proxy (squid.conf) and add the following section:


    acl snmppublic snmp_community public


    snmp_port 3401


    snmp_access allow snmppublic localhost


###### Setup Telegraf
14.gif "image_tooltip")




1. **Install Telegraf if you haven’t already. **Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.
2. **Configure and start Telegraf. \
**As part of collecting metrics data from Telegraf, we will use the[ SNMP input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/snmp) to get data from Telegraf and the[ Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic. \
 \
Create or modify `telegraf.conf` and copy and paste the text below:


```
[[inputs.snmp]]]
  agents = ["udp://127.0.0.1:3401"]
  name = "squid"
  community = "public"
  [inputs.snmp.tags]
   proxy_cluster="<Squid Proxy_TO_BE_CHANGED>"
   component="proxy"
   environment="env_TO_BE_CHANGED"
   proxy_system="squidproxy"

  [[inputs.snmp.field]]
name = "uptime"
oid = "1.3.6.1.4.1.3495.1.1.3.0"
  [[inputs.snmp.field]]
      name = "cacheMemUsage"
      oid = "1.3.6.1.4.1.3495.1.3.1.3.0"
  [[inputs.snmp.field]]
      name = "cacheCpuUsage"
      oid = "1.3.6.1.4.1.3495.1.3.1.5.0"
  [[inputs.snmp.field]]
      name = "cacheClients"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.15.0"
  [[inputs.snmp.field]]
      name = "cacheProtoClientHttpRequests"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.1.0"
  [[inputs.snmp.field]]
  name = "cacheHttpHits"
      oid = "1.3.6.1.4.1.3495.1.3.2.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheHttpErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.3.0"
  [[inputs.snmp.field]]
   name = "uidcacheHttpInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.4.0"

  [[inputs.snmp.field]]
   name = "cacheHttpOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.5.0"

  [[inputs.snmp.field]]
   name = "cacheServerInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.12.0"
  [[inputs.snmp.field]]
   name = "cacheServerOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.13.0"
  [[inputs.snmp.field]]
   name = "cacheClients"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.15.0"
  [[inputs.snmp.field]]
   name = "cacheCpuTime"
   oid = "1.3.6.1.4.1.3495.1.3.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheMemMaxSize"
   oid = "1.3.6.1.4.1.3495.1.2.5.1.0"
  [[inputs.snmp.field]]
   name = "cacheServerRequests"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.10.0"
  [[inputs.snmp.field]]
   name = "cacheHttpInKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheHttpOutKb"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.5.0"
  [[inputs.snmp.field]]
   name = "cacheNumObjCount"
   oid = "1.3.6.1.4.1.3495.1.3.1.7.0"
  [[inputs.snmp.field]]
   name = "cacheHttpAllSvcTime1"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.2.1"
  [[inputs.snmp.field]]
   name = "cacheDnsSvcTime1"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.8.1"
  [[inputs.snmp.field]]
   name = "cacheHttpMissSvcTime60"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.3.60"
  [[inputs.snmp.field]]
   name = " cacheHttpHitSvcTime60"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.5.60"
  [[inputs.snmp.field]]
   name = "cacheIpEntries"
   oid = "1.3.6.1.4.1.3495.1.4.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheIpMisses"
   oid = "1.3.6.1.4.1.3495.1.4.1.6.0"
  [[inputs.snmp.field]]
   name = "cacheVersionId"
   oid = "1.3.6.1.4.1.3495.1.2.3.0"
  [[inputs.snmp.field]]
   name = "cacheSysPageFaults"
   oid = "1.3.6.1.4.1.3495.1.3.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheHttpErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.3.0"
  [[inputs.snmp.field]]
   name = "cacheServerErrors"
   oid = "1.3.6.1.4.1.3495.1.3.2.1.11.0"
  [[inputs.snmp.field]]
   name = "cacheCpuUsage"
   oid = "1.3.6.1.4.1.3495.1.3.1.5.0"
  [[inputs.snmp.field]]
   name = "cacheCpuTime"
   oid = "1.3.6.1.4.1.3495.1.3.1.4.0"
  [[inputs.snmp.field]]
   name = "cacheSysVMsize"
   oid = "1.3.6.1.4.1.3495.1.1.1.0"
  [[inputs.snmp.field]]
   name = "cacheSysNumReads"
   oid = "1.3.6.1.4.1.3495.1.3.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentUnusedFDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.10.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentFileDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.12.0"
  [[inputs.snmp.field]]
   name = "cacheMaxResSize"
   oid = "1.3.6.1.4.1.3495.1.3.1.6.0"
  [[inputs.snmp.field]]
   name = "cacheCurrentResFileDescrCnt"
   oid = "1.3.6.1.4.1.3495.1.3.1.11.0"
  [[inputs.snmp.field]]
   name = "cacheIpRequests"
   oid = "1.3.6.1.4.1.3495.1.4.1.2.0"
  [[inputs.snmp.field]]
   name = "cacheIpHits"
   oid = "1.3.6.1.4.1.3495.1.4.1.3.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnEntries"
   oid = "1.3.6.1.4.1.3495.1.4.2.1.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnRequests"
   oid = "1.3.6.1.4.1.3495.1.4.2.2.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnHits"
   oid = "1.3.6.1.4.1.3495.1.4.2.3.0"
  [[inputs.snmp.field]]
   name = "cacheFqdnMisses"
   oid = "1.3.6.1.4.1.3495.1.4.2.6.0"
  [[inputs.snmp.field]]
   name = "cacheDnsRequests"
   oid = "1.3.6.1.4.1.3495.1.4.3.1.0"
  [[inputs.snmp.field]]
   name = "cacheDnsReplies"
   oid = "1.3.6.1.4.1.3495.1.4.3.2.0"
  [[inputs.snmp.field]]
   name = "cacheDnsNumberServers"
   oid = "1.3.6.1.4.1.3495.1.4.3.3.0"
  [[inputs.snmp.field]]
   name = "version"
   oid = "1.3.6.1.4.1.3495.1.2.3.0"
   is_tag = true
  [[inputs.snmp.field]]
   name = "cacheHttpAllSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.2.5"
  [[inputs.snmp.field]]
   name = "cacheHttpMissSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.3.5"
  [[inputs.snmp.field]]
   name = "cacheHttpHitSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.5.5"
  [[inputs.snmp.field]]
   name = "cacheDnsSvcTime5"
   oid = "1.3.6.1.4.1.3495.1.3.2.2.1.8.5"
[[outputs.sumologic]]
  url = "<URL_from_HTTP_Logs_and_Metrics_Source>"
  data_format = "prometheus"
```


Enter values for fields annotated with `<VALUE_TO_BE_CHANGED>` to the appropriate values. Do not include the brackets (`< >`) in your final configuration



* In the tags section, which is `[inputs.snmp.tags]`:
    * **environment** - This is the deployment environment where the Squid Proxy server identified by the value of **servers** resides. For example; dev, prod, or QA. While this value is optional we highly recommend setting it.
    * **proxy_cluster **- Enter a name to identify this Squid Proxy cluster. This cluster name will be shown in our dashboards.
* In the output plugins section, which is `[[outputs.sumologic]]`:
    * **URL** - This is the HTTP source URL created previously. See this doc for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration.


15.png "image_tooltip")
If you haven’t defined a cluster in Squid Proxy, then enter ‘**default**’ for `proxy_cluster`.
16.png "image_tooltip")
There are additional values set by the Telegraf configuration.  We recommend not to modify these values as they might cause the Sumo Logic app to not function correctly.



* **data_format**: “prometheus” - In the output `[[outputs.sumologic]]` plugins section. Metrics are sent in the Prometheus format to Sumo Logic.
* **component** - “proxy” - In the input `[[inputs.snmp]]` plugins section. This value is used by Sumo Logic apps to identify application components.
* **proxy_system **- “squidproxy” - In the input plugins sections. This value identifies the proxy system.

See[ this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for all other parameters that can be configured in the Telegraf agent globally.


17.png "image_tooltip")
After you have finalized your `telegraf.conf` file, you can start or reload the telegraf service using instructions from this[ doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Telegraf should start collecting the Squid Proxy metrics and forward them to the Sumo Logic HTTP Source.



18.png "image_tooltip")




1. Enter the following options:
    1. **Rule Name**. Enter the name as **App Observability - Proxy**.
    2. **Applied At.** Choose **Ingest Time.**
    3. **Scope**. Select **Specific Data.**
    4. **Scope**: Enter the following keyword search expression.


```
pod_labels_environment=* pod_labels_component=proxy pod_labels_proxy_cluster=* pod_labels_proxy_system=*

```



* **Parse Expression**. Enter the following parse expression:

            ```
            if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
            | pod_labels_component as component
            | pod_labels_proxy_system as proxy_system
            | pod_labels_proxy_cluster as proxy_cluster
            ```


1. Click **Save** to create the rule.


## Install the Squid Proxy Monitors, App, and view the Dashboards



1. **Last updated \
**Jan 18, 2022, 9:39 AM by Nishant
2. **Page restriction \
**Public
    * [ Page notifications Off](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Install_the_Squid_Proxy_App_and_View_the_Dashboards#)
    *  
    * [Save as PDF](https://help.sumologic.com/@api/deki/pages/5701/pdf/Install%2bthe%2bSquid%2bProxy%2bMonitors%252C%2bApp%252C%2band%2bview%2bthe%2bDashboards.pdf?stylesheet=default)
    *  
    * [ Share](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Install_the_Squid_Proxy_App_and_View_the_Dashboards#)

    Table of contents


This page provides instructions for installing the Squid Proxy App, as well as examples of each of the App dashboards. These instructions assume you have already set up the collection as described in the [Collect Logs and Metrics for the Squid Proxy](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Collect_Logs_for_Squid_Proxy) App page.


#### Pre-Packaged Alerts
19.gif "image_tooltip")


Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you monitor your Squid Proxy farms. These alerts are built based on metrics and logs datasets and include preset thresholds based on industry best practices and recommendations.

For details on the individual alerts, see this [page](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Squid_Proxy_Alerts).


##### Installing Monitors
20.gif "image_tooltip")




* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing a JSON file or a Terraform script.


21.png "image_tooltip")
There are limits to how many alerts can be enabled - see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ) for details.


###### Install the monitors by importing a JSON file Method
22.gif "image_tooltip")




1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/SquidProxy/squidproxy.json) that describes the monitors.
2. The [JSON](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/SquidProxy/squidproxy.json) contains the alerts that are based on Sumo Logic searches that do not have any scope filters and therefore will be applicable to all Squid Proxy clusters, the data for which has been collected via the instructions in the previous sections.  However, if you would like to restrict these alerts to specific farms or environments, update the JSON file by replacing the text `proxy_system=squidproxy` with `<Your Custom Filter>`.  

Custom filter examples:



1. For alerts applicable only to a specific farm, your custom filter would be ‘`proxy_cluster=squidproxy-standalone.01`‘.
2. For alerts applicable to all cluster that start with squidproxy-standalone, your custom filter would be '`proxy_cluster=squidproxy-standalone*`'.
3. **For alerts applicable to a specific farm within a production environment, your custom filter would be `proxy_cluster=squidproxy-1`** and `environment=standalone` (This assumes you have set the optional environment tag while configuring collection).
4. Go to Manage Data > Alerts > Monitors.
5. Click **Add**: \

23.png "image_tooltip")

6. Click Import and then copy-paste the above JSON to import monitors.


24.png "image_tooltip")
The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Squid Proxy folder under **Monitors** to configure them. See [this](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) document to enable monitors to send notifications to teams or connections. See the instructions detailed in Step 4 of this [document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


###### Install the alerts using a Terraform script Method
25.gif "image_tooltip")




1. **Generate a Sumo Logic access key and ID. \
**Generate an access key and access ID for a user that has the Manage Monitors role capability in Sumo Logic using these[ instructions](https://help.sumologic.com/Manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page). Identify which deployment your Sumo Logic account is in, using this [link](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security).
2. **[Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later. **
3. **Download the Sumo Logic Terraform package for Squid Proxy alerts. \
**The alerts package is available in the Sumo Logic GitHub [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/SquidProxy). You can either download it through the “git clone” command or as a zip file.
4. **Alert Configuration.  \
**After the package has been extracted, navigate to the package directory **terraform-sumologic-sumo-logic-monitor/monitor_packages/SquidProxy/. \
 \
**Edit the **squidproxy.auto.tfvars** file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1.

    ```
    access_id   = "<SUMOLOGIC ACCESS ID>"
    access_key  = "<SUMOLOGIC ACCESS KEY>"
    environment = "<SUMOLOGIC DEPLOYMENT>"
    ```



    The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific farms or environments, update the variable **’squidproxy_data_source’**. Custom filter examples:

1. A specific cluster `squidproxy_cluster=squidproxy.standalone.01`.
2. All clusters in an environment `environment=standalone`.
3. For alerts applicable to all cluster that start with squidproxy-standalone, your custom filter would be `proxy_cluster=squidproxy-standalone*`.
4. For alerts applicable to a specific farm within a production environment, your custom filter would be, `proxy_system=squidproxy` and `environment=standalone` (This assumes you have set the optional environment tag while configuring collection).

    All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter monitors_disabled to false in this file.


    By default, the monitors are configured in a monitor **folder** called “**SquidProxy**”, if you would like to change the name of the folder, update the monitor folder name in “folder” key at `squidproxy.auto.tfvars` file.


    If you would like the alerts to send email or connection notifications, configure these in the file `squidproxy_notifications.auto.tfvars`. For configuration examples, refer to the next section.

1. **Email and Connection Notification Configuration Examples. \
**Modify the file `squidproxy_notifications.auto.tfvars` and populate connection_notifications and email_notifications as per below examples.



###### Pagerduty Connection Example
26.gif "image_tooltip")


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


    For overriding payload for different connection types, refer to this [document](https://help.sumologic.com/Manage/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections).




####  **Email Notifications Example **
27.gif "image_tooltip")



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



1. **Install the Alerts**
    1. Navigate to the package directory terraform-sumologic-sumo-logic-monitor/monitor_packages/**SquidProxy**/ and run **terraform init. **This will initialize Terraform and will download the required components.
    2. Run **terraform plan **to view the monitors which will be created/modified by Terraform.
    3. Run **terraform apply**.
2. **Post Installation** If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other users or services. This is detailed in Step 4 of [this document](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors#Add_a_monitor).


28.png "image_tooltip")
There are limits to how many alerts can be enabled - see the [Alerts FAQ](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors/Monitor_FAQ).


#### Install the Sumo Logic App
29.gif "image_tooltip")


This section demonstrates how to install the Squid Proxy App.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


30.png "image_tooltip")
Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library).



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**
        1. Choose **Enter a Custom Data Filter**, and enter a custom Squid Proxy cluster filter. Examples:
            1. For all Squid Proxy clusters \
`proxy_cluster=*`.
            2. For a specific farm \
`proxy_cluster=squidproxy.dev.01`.
            3. Clusters within a specific environment \
`proxy_cluster=squidproxy.dev.01` and `environment=prod \
`(This assumes you have set the optional environment tag while configuring collection).
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


#### Dashboard Filter with Template Variables  
31.gif "image_tooltip")


Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the[ Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


32.png "image_tooltip")
You can use template variables to drill down and examine the data on a granular level.


#### Dashboards
33.gif "image_tooltip")



##### Squid Proxy - Overview
34.gif "image_tooltip")


The **Squid Proxy - Overview** dashboard provides an at-a-glance view of the activity and health of the SquidProxy clusters and servers by monitoring uptime, number of current clients, latency, bandwidth, destination locations, error and denied requests, URLs accessed.

**Use this dashboard to:**



* Gain insights into information about the destination location your intranet frequently visits by region.
* Gain insights into your Squid Proxy health using Latency, HTTP Errors, Status codes of Squid Proxy Servers.
* Get insights into information about  Uptime and bandwidth of Squid Proxy servers.
* Get insights into information about the web browsing behavior of users using Top accessed URLs, denied URLs, 4xx errors URLs, 5xx errors URLs, and top remote hosts.


35.png "image_tooltip")



##### Squid Proxy - Protocol
36.gif "image_tooltip")


The **Squid Proxy -  Protocol** dashboard provides an insight into the protocols of clusters: the number of HTTP requests, HTTP errors, total bytes transferred, the number of HTTP requests per second, the number of HTTP's bytes per second.

**Use this dashboard to:**



* Get detailed information about the total number of requests from clients, the total number of HTTP errors sent to clients, the total number of bytes transferred on servers, total number of bytes sent to clients
* Get insights into information about HTTP requests, HTTP errors, bandwidth transferred over time.


37.png "image_tooltip")



##### Squid Proxy - Performance
38.gif "image_tooltip")


The **Squid Proxy -  Performance** dashboard provides an insight into the workload of clusters, the number of page faults IO,  percent of file descriptor used, number of memory used, the time for all HTTP requests, the number of objects in the cache, the CPU time.

**Use this dashboard to:**



* Gain insights into the workload of squid proxy servers such as percent of file descriptors used, memory usage, CPU time consumed.
* Gain insights into the read and write status of squid proxy servers such as Page Faults IO, HTTP I/O number of reading, the number of objects stored, the average of time response.


39.png "image_tooltip")



##### Squid Proxy - IP Domain DNS Statistics
40.gif "image_tooltip")


The **Squid Proxy -  IP Domain DNS Statistics** dashboard provides a high-level view of the number of IPs,  the number of FQDN, rate requests cache according to FQDN, rate requests cache according to IPs, the number of DNS queries, time for DNS query.

**Use this dashboard to:**



* Gain insights into IPs accessed statistics: IP Cache Entries, Number and rate of IP Cache requests, Number and rate of IP Cache hits.
* Gain insights into Domain Name (FQDN) statistics: FQDN Cache Entries, Number of FQDN Cache misses, Number and rate of FQDN Cache requests, Number of FQDN Cache Negative Hits.
* Gain insights into DNS Lookup statistics: Number of External DNS Server Requests, Average Time For  DNS Service, Number of External DNS Server Replies.


41.png "image_tooltip")



##### Squid Proxy - Activity Trend
42.gif "image_tooltip")


The **Squid Proxy - Activity Trend** dashboard provides trends around denied request trend, action trend, time spent to serve, success and non-success response, remote hosts.

**Use this dashboard to:**



* Gain insights into the average amount of time it takes to serve a request and the kind of method the request was.
* Gain insights into  the average time spent to serve requests, the megabytes served, the  trends in requests by actions, the count of successful 2xx and non 2xx response actions.
* Gain insights into  the trends in the number of denied requests, the remote hosts traffic by requests, the remote hosts traffic by data volume.


43.png "image_tooltip")



##### Squid Proxy - HTTP Response Analysis
44.gif "image_tooltip")


The **Squid Proxy -  HTTP Response Analysis** dashboard provides insights into HTTP response, HTTP code, the number of client errors, server errors, redirections outlier, URLs experiencing server errors.

**Use this dashboard to:**



* Gain insights into the count of HTTP responses, such as redirections, successes, client errors, or server errors, on an area chart.
* Gain insights into client error URLs with information fields: URL, status code, and event count.
* Get detailed information on any outliers in redirection, client error, server error  events on a line chart with thresholds


45.png "image_tooltip")



##### Squid Proxy - Quality of Service
46.gif "image_tooltip")


The **Squid Proxy -  Quality of Service** dashboard provides insights into latency, the response time of requests according to HTTP action, and the response time according to location.

**Use this dashboard to:**



* To identify locations with slow average request response times.
* Gain insights into the response times according to HTTP actions


47.png "image_tooltip")



## Squid Proxy Alerts



1. **Last updated \
**Jan 10, 2022, 9:17 AM by Nishant
2. **Page restriction \
**Public
    * [ Page notifications Off](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Squid_Proxy_Alerts#)
    *  
    * [Save as PDF](https://help.sumologic.com/@api/deki/pages/10146/pdf/Squid%2bProxy%2bAlerts.pdf?stylesheet=default)
    *  
    * [ Share](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Squid_Proxy/Squid_Proxy_Alerts#)

    Table of contents


Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) to help you quickly determine if the Squid Proxy servers are available and performing as expected. These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

**Sumo Logic provides the following out-of-the-box alerts**:

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
   <td>Logs
   </td>
   <td>Squid Proxy - High Client (HTTP 4xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 4xx.
   </td>
   <td>Critical
   </td>
   <td> &#62; 0
   </td>
   <td> &#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Squid Proxy - High Server (HTTP 5xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 5xx.
   </td>
   <td>Critical
   </td>
   <td> &#62;0
   </td>
   <td> &#60; &#61;0
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>Squid Proxy - High Latency
   </td>
   <td>This alert fires when latency on a node in a Squid Proxy cluster is higher than 3 seconds.
   </td>
   <td>Critical
   </td>
   <td> &#62;&#61;3
   </td>
   <td>&#60;3
   </td>
  </tr>
  <tr>
   <td>Logs
   </td>
   <td>Squid Proxy - High Denied Request
   </td>
   <td>This alert fires when there are too many HTTP denied requests (>5%)
   </td>
   <td>Critical
   </td>
   <td> &#62;0
   </td>
   <td> &#60; &#61;0
   </td>
  </tr>
</table>
