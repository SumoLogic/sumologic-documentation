---
id: collect-logs-metrics
title: Collect Logs and Metrics for Apache Tomcat
sidebar_label: Collect Logs and Metrics
description: Before installing the Sumo Logic app, Apache Tomcat must be set up and configured to log events.
---


This page provides instructions for configuring log and metric collection for the Sumo Logic App for Apache Tomcat.


#### Collection Process Overview
1.gif "image_tooltip")

Configuring log and metric collection for the Apache Tomcat App includes the following tasks:

* Step 1: Configure Fields in Sumo Logic.
* Step 2: Configure Collection for Apache Tomcat
    * [Collect Apache Tomcat Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat/01Collect-Logs-for-Apache-Tomcat/Collect_Apache_Tomcat_Logs_and_Metrics_for_Non-Kubernetes_environments).
    * [Collect Apache Tomcat Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat/01Collect-Logs-for-Apache-Tomcat/Collect_Apache_Tomcat_Logs_and_Metrics_for_Kubernetes_environments).


##### Step 1: Configure Fields in Sumo Logic
2.gif "image_tooltip")

Create the following Fields in Sumo Logic prior to configuring collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](https://help.sumologic.com/Manage/Fields) help page.

If you are using Apache Tomcat in a non-Kubernetes environment create the fields:

* component
* environment
* webserver_system
* webserver_farm
* pod

If you are using Apache Tomcat in a Kubernetes environment create the fields:

* pod_labels_component
* pod_labels_environment
* pod_labels_webserver_system
* pod_labels_webserver_farm


##### Step 2: Configure Collection for Apache Tomcat
3.gif "image_tooltip")

* [Collect Apache Tomcat Logs and Metrics for Non-Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat/01Collect-Logs-for-Apache-Tomcat/Collect_Apache_Tomcat_Logs_and_Metrics_for_Non-Kubernetes_environments).
* [Collect Apache Tomcat Logs and Metrics for Kubernetes environments](https://help.sumologic.com/07Sumo-Logic-Apps/24Web_Servers/Apache_Tomcat/01Collect-Logs-for-Apache-Tomcat/Collect_Apache_Tomcat_Logs_and_Metrics_for_Kubernetes_environments).


## Collect Apache Tomcat Logs and Metrics for Kubernetes environments

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). The diagram below illustrates how data is collected from Apache Tomcat in a Kubernetes environment. Four services in the architecture shown below make up the metric collection pipeline: Telegraf, Prometheus, Fluentd, and FluentBit.

The first service in the pipeline is Telegraf. Telegraf collects metrics from Apache Tomcat. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the Apache Tomcat and Jolokia2 input plugin to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. We also have Fluentbit that collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.

Follow the below instructions to set up the metric collection:

1. Configure Metrics Collection
    1. Setup Kubernetes Collection with the Telegraf operator
    2. Add annotations on your Apache Tomcat pods
2. Configure Logs Collection
    3. Configure logging in Apache Tomcat.
    4. Add labels on your Apache Tomcat pods to capture logs from standard output.
    5. Collecting Apache Tomcat Logs from a Log file.

**Prerequisites**

It’s assumed that you are using the latest helm chart version if not upgrade using the instructions [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v2.0/deploy/docs/v2_migration_doc.md#how-to-upgrade).


#### Step 1 Configure Metrics Collection
5.gif "image_tooltip")


This section explains the steps to collect Apache Tomcat metrics from a Kubernetes environment.

In a Kubernetes environment, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more on this[ here](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/01_Telegraf_Collection_Architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

1. [**Set up Kubernetes Collection with the Telegraf Operator**](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment). Please ensure that you are monitoring your Kubernetes clusters with the Telegraf operator **enabled**. If you are not, then please follow [these instructions](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Install_Telegraf_in_a_Kubernetes_environment) to do so.
2. **Install jolokia on your Tomcat Pod to use the Jolokia Telegraf Input Plugin**
* Download the latest version of the Jolokia war file from: [https://jolokia.org/download.html](https://jolokia.org/download.html).
* Rename the file from jolokia-war-X.X.X.war to jolokia.war
* Create a configMap **jolokia** from the binary file `kubectl create configmap jolokia --from-file=jolokia.jar`
* Create volume mount the jolokia.war file to ${TOMCAT_HOME}/webapps.


```
spec:
  volumes:
    - name: jolokia
      configMap:
        name: jolokia
  containers:
    - name: XYZ
      image: XYZ
      env:
      - name: TOMCAT_OPTS
        value: "-javaagent:/opt/jolokia/jolokia.jar=port=8778,host=0.0.0.0"
      volumeMounts:
        - mountPath: "/opt/jolokia"
          name: jolokia

```



* Add jolokia as role in tomcat-users.xml


```
<tomcat-users>
  <role rolename="manager-jmx"/>
  <user name="admin" password="admin" roles="admin-gui,admin-script,manager-gui,manager-status,manager-script,manager-jmx"/>
</tomcat-users>
```



    **Verification Step: **You can ssh to Tomcat pod and run following commands to make sure Telegraf (and Jolokia) is scraping metrics from your Tomcat Pod:



* curl localhost:9273/metrics
1. **Add annotations on your Apache Tomcat pods**

    On your Apache Tomcat Pods, add the following annotations:



```
annotations:
  telegraf.influxdata.com/class: sumologic-prometheus
  prometheus.io/scrape: "true"
  prometheus.io/port: "9273"
  telegraf.influxdata.com/inputs: |+
       [[inputs.tomcat]]
          url = "http://127.0.0.1:8080/manager/status/all?XML=true"
          username = "<username-CHANGME>"
          password = "<password-CHANGME>"
          [inputs.tomcat.tags]
            environment="dev_CHANGEME"
            component="webserver"
            webserver_system="tomcat"
            webserver_farm="tomcat_on_k8s_CHANGEME"
[[inputs.jolokia2_agent]]
  name_prefix = "tomcat_jmx_"
  urls = ["http://localhost:8088/jolokia"]
  username = "username-CHANGME"
  password = "password-CHANGME"
  [inputs.jolokia2_agent.tags]
    environment="dev_CHANGEME"
    component="webserver"
    webserver_system="tomcat"
    webserver_farm="tomcat_on_k8s_CHANGEME"
  ### JVM Generic
  [[inputs.jolokia2_agent.metric]]
    name  = "OperatingSystem"
    mbean = "java.lang:type=OperatingSystem"
    paths = ["ProcessCpuLoad","SystemLoadAverage","SystemCpuLoad","TotalPhysicalMemorySize","FreeSwapSpaceSize","TotalSwapSpaceSize","FreePhysicalMemorySize","AvailableProcessors"]
  [[inputs.jolokia2_agent.metric]]
    name  = "jvm_runtime"
    mbean = "java.lang:type=Runtime"
    paths = ["Uptime"]
  [[inputs.jolokia2_agent.metric]]
    name  = "jvm_memory"
    mbean = "java.lang:type=Memory"
    paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]

  [[inputs.jolokia2_agent.metric]]
    name     = "jvm_garbage_collector"
    mbean    = "java.lang:name=*,type=GarbageCollector"
    paths    = ["CollectionTime", "CollectionCount"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name       = "jvm_memory_pool"
    mbean      = "java.lang:name=*,type=MemoryPool"
    paths      = ["Usage", "PeakUsage", "CollectionUsage"]
    tag_keys   = ["name"]
    tag_prefix = "pool_"
  [[inputs.jolokia2_agent.metric]]
    name     = "GlobalRequestProcessor"
    mbean    = "Catalina:name=*,type=GlobalRequestProcessor"
    paths    = ["requestCount","bytesReceived","bytesSent","processingTime","errorCount"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name     = "JspMonitor"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,name=jsp,type=JspMonitor"
    paths    = ["jspReloadCount","jspCount","jspUnloadCount"]
    tag_keys = ["J2EEApplication","J2EEServer","WebModule"]
  [[inputs.jolokia2_agent.metric]]
    name     = "ThreadPool"
    mbean    = "Catalina:name=*,type=ThreadPool"
    paths    = ["maxThreads","currentThreadCount","currentThreadsBusy"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name     = "Servlet"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,j2eeType=Servlet,name=*"
    paths    = ["processingTime","errorCount","requestCount"]
    tag_keys = ["name","J2EEApplication","J2EEServer","WebModule"]
  [[inputs.jolokia2_agent.metric]]
    name     = "Cache"
    mbean    = "Catalina:context=*,host=*,name=Cache,type=WebResourceRoot"
    paths    = ["hitCount","lookupCount"]
    tag_keys = ["context","host"]
```

    Please enter in values for the following parameters (marked in bold_CHANGEME above):


* telegraf.influxdata.com/inputs - This contains the required configuration for the Telegraf Tomcat Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Tomcat input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
    * In the input plugins section, which is [[inputs.Tomcat]]:
        * **servers** - The URL to the Tomcat server. This can be a comma-separated list to connect to multiple Tomcat servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/tomcat) for more information on additional parameters for configuring the Tomcat input plugin for Telegraf.
    * In the tags section, whis is [inputs.Tomcat.tags]
        * **environment** - This is the deployment environment where the Tomcat farm identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **webserver_farm** - Enter a name to identify this Tomcat farm. This farm name will be shown in the Sumo Logic dashboards.
    * In the input plugins section, which is [[inputs.jolokia2_agent]]:
        * **urls** - The URL to the tomcat server. This can be a comma-separated list to connect to multiple tomcat servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Tomcat input plugin for Telegraf.
    * In the tags section, which is [inputs**.**jolokia2_agent.tags]
        * **environment** - This is the deployment environment where the Tomcat farm identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **webserver_farm** - Enter a name to identify this Tomcat farm. This farm name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* telegraf.influxdata.com/class: sumologic-prometheus - This instructs the Telegraf operator what output to use. This should not be changed.
* prometheus.io/scrape: "true" - This ensures our Prometheus will scrape the metrics.
* prometheus.io/port: "9273" - This tells prometheus what ports to scrape on. This should not be changed.
* telegraf.influxdata.com/inputs
    * In the tags section, which is [inputs.Tomcat.tags]
        * **component**: “webserver” - This value is used by Sumo Logic apps to identify application components.
        * **webserver_system**: “tomcat” - This value identifies the web server system.
    * In the tags section, which is [inputs.jolokia2_agent.tags]
        * **component**: “webserver” - This value is used by Sumo Logic apps to identify application components.
        * **webserver_system**: “tomcat” - This value identifies the web server system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
2. Verify metrics in Sumo Logic.


#### Step 2 Configure Logs Collection
6.gif "image_tooltip")


This section explains the steps to collect Apache Tomcat logs from a Kubernetes environment.

1. (Recommended Method) Add labels on your Apache Tomcat pods to capture logs from standard output.

Follow the instructions below to capture Apache Tomcat logs from stdout on Kubernetes.

1. Apply following labels to the Apache Tomcat pods:

     labels:


```
   environment: "prod_CHANGEME"
    component: "webserver"
    webserver_system: "tomcat"
        webserver_farm: "tomcat_prod__CHANGEME"
```


    Please enter in values for the following parameters (marked in bold above):



* **environment** - This is the deployment environment where the Tomcat farm identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* **Webserver_farm** - Enter a name to identify this Tomcat farm. This farm name will be shown in the Sumo Logic dashboards.

    Here’s an explanation for additional values set by this configuration that we request you **please do not modify** as they will cause the Sumo Logic apps to not function correctly.

* **component**: “webserver” - This value is used by Sumo Logic apps to identify application components.
* **webserver_system**: “tomcat” - This value identifies the webserver system.

    For all other parameters please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf#Configuring_Telegraf) for more properties that can be configured in the Telegraf agent globally.

1. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection,[ visit](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App) here.
2. Verify logs in Sumo Logic.
1. **(Optional) Collecting Apache Tomcat Logs from a Log File**

Follow the  steps below to capture Apache Tomcat logs from a log file on Kubernetes.



1. Determine the location of the Apache Tomcat log file on Kubernetes. This can be determined from the Tomcat.conf for your Tomcat farm along with the mounts on the Tomcat pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.


```
annotations:
  tailing-sidecar: sidecarconfig;<mount>:<path_of_Tomcat_log_file>/<Tomcat_log_file_name>
```


Example:


```
annotations:
  tailing-sidecar: sidecarconfig;data:/opt/tomcat/logs/tomcat.log

```



1. Make sure that the Tomcat pods are running and annotations are applied by using the command: **kubectl describe pod <Tomcat_pod_name>**
2. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
3. Verify logs in Sumo Logic.

3. **Add an FER to normalize the fields in Kubernetes environments**

Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for WebServer Application Components. To do so:



1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the + Add button on the top right of the table.
3. The following form appears:


7.png "image_tooltip")


1. Enter the following options:
    * **Rule Name**. Enter the name as **App Observability - Webserver**.
    * **Applied At.** Choose **Ingest Time**
    * **Scope**. Select **Specific Data**
    * **Scope**: Enter the following keyword search expression:

    ```
    pod_labels_environment=* pod_labels_component=webserver pod_labels_webserver_farm=* pod_labels_webserver_system=*
    ```


* **Parse Expression**.Enter the following parse expression:


```
if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
| pod_labels_component as component
| pod_labels_webserver_system as webserver_system
    | pod_labels_webserver_farm as webserver_farm
```



    5. Click **Save** to create the rule.




## Collect Apache Tomcat Logs and Metrics for Non-Kubernetes environments

We use the Telegraf operator for Apache Tomcat metric collection and Sumo Logic Installed Collector for collecting Apache Tomcat logs. The diagram below illustrates the components of the Apache Tomcat collection in a non-Kubernetes environment. Telegraf runs on the same system as Apache Tomcat and uses the[ Apache Tomcat ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration)and [Jolokia2](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) input plugin to obtain Apache Tomcat metrics, and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Apache Tomcat on the other hand are sent to a Sumo Logic Local File source.


8.png "image_tooltip")


This section provides instructions for configuring metrics collection for the Sumo Logic App for Apache Tomcat. Follow the below instructions to set up the metric collection:



1. Configure Metrics Collection
    1. Configure a Hosted Collector
    2. Configure an HTTP Logs and Metrics Source
    3. Install Telegraf
    4. Download and setup Jolokia on each Apache Tomcat node
    5. Configure and start Telegraf
2. Configure Logs Collection
    6. Configure logging in Apache Tomcat
    7. Configure Sumo Logic Installed Collector


#### Step 1 Configure Metrics Collection
9.gif "image_tooltip")


1. **Configure a Hosted Collector**

    To create a new Sumo Logic hosted collector, perform the steps in the[ Create a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.

1. **Configure an HTTP Logs and Metrics Source**

    Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)Make a note of the **HTTP Source URL**.

1. **Install Telegraf**

    Use the[ following steps](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/03_Install_Telegraf) to install Telegraf.

1. **Download and setup Jolokia on each Apache Tomcat node**

    **As part of collecting metrics data from Telegraf, we will use the [Jolokia input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.**

* Download the latest version of the Jolokia JVM-Agent from [Jolokia](https://jolokia.org/download.html).
* Rename downloaded Jar file to jolokia.jar
* Save the file jolokia.jar on your apache tomcat server in ${TOMCAT_HOME}/webapps
* Configure Apache Tomcat to use Jolokia
1. Add following to tomcat-users.xml \
<role rolename="**role-CHANGEME**" /> \
<user name="**username-CHANGEME**" password="**password-CHANGEME**" roles="**role-CHANGEME**" />
2. Start or Restart Apache Tomcat Service
3. Verify the Jolokia agent installation by curl-ing this URL: `http://<tomcat_address>:<tomcat_port>/jolokia/version`.

```curl
curl -v -u **username-CHANGEME**:**password-CHANGEME** "`http://APACHE_TOMCAT_SERVER_IP_ADDRESS:<TOMCAT_PORT>/jolokia/version`"
```

    The result looks similar to this



```
{"request":{"type":"version"},"value":{"agent":"1.6.2","protocol":"7.2","config":{"listenForHttpService":"true","maxCollectionSize":"0","authIgnoreCerts":"false","agentId":"10.0.50.64-6867-1ed563ab-servlet","agentType":"servlet","policyLocation":"classpath:\/jolokia-access.xml","agentContext":"\/jolokia","mimeType":"text\/plain","discoveryEnabled":"false","streaming":"true","historyMaxEntries":"10","allowDnsReverseLookup":"true","maxObjects":"0","debug":"false","serializeException":"false","detectorOptions":"{}","dispatcherClasses":"org.jolokia.http.Jsr160ProxyNotEnabledByDefaultAnymoreDispatcher","maxDepth":"15","authMode":"basic","authMatch":"any","canonicalNaming":"true","allowErrorDetails":"true","realm":"jolokia","includeStackTrace":"true","useRestrictorService":"false","debugMaxEntries":"100"},"info":{"product":"tomcat","vendor":"Apache","version":"7.0.76"}},"timestamp":1625232354,"status":200}

```



1. **Configure and start Telegraf**

    As part of collecting metrics data from Telegraf, we will use the [Apache Tomcat input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/tomcat) and [jolokia2 input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.


    Create or modify telegraf.conf and copy and paste the text below:  



```
[[inputs.tomcat]]
  url = "http://127.0.0.1:80/manager/status/all?XML=true"
  username = "<username>"
  password = "<password>"
  [inputs.tomcat.tags]
    environment="dev_CHANGEME"
    component="webserver"
    webserver_system="tomcat"
    webserver_farm="tomcat_on_premise"
[[inputs.jolokia2_agent]]
  name_prefix = "tomcat_jmx_"
  urls = ["http://localhost:80/jolokia"]
  username = "<username>"
  password = "<password>"
  [inputs.jolokia2_agent.tags]
    environment="dev_CHANGEME"
    component="webserver"
         webserver_system="tomcat"
         webserver_farm="tomcat_on_premise"
  ### JVM Generic
  [[inputs.jolokia2_agent.metric]]
    name  = "OperatingSystem"
    mbean = "java.lang:type=OperatingSystem"
    paths = ["ProcessCpuLoad","SystemLoadAverage","SystemCpuLoad","TotalPhysicalMemorySize","FreeSwapSpaceSize","TotalSwapSpaceSize","FreePhysicalMemorySize","AvailableProcessors"]
  [[inputs.jolokia2_agent.metric]]
    name  = "jvm_runtime"
    mbean = "java.lang:type=Runtime"
    paths = ["Uptime"]
  [[inputs.jolokia2_agent.metric]]
    name  = "jvm_memory"
    mbean = "java.lang:type=Memory"
    paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]

  [[inputs.jolokia2_agent.metric]]
    name     = "jvm_garbage_collector"
    mbean    = "java.lang:name=*,type=GarbageCollector"
    paths    = ["CollectionTime", "CollectionCount"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name       = "jvm_memory_pool"
    mbean      = "java.lang:name=*,type=MemoryPool"
    paths      = ["Usage", "PeakUsage", "CollectionUsage"]
    tag_keys   = ["name"]
    tag_prefix = "pool_"
  [[inputs.jolokia2_agent.metric]]
    name     = "GlobalRequestProcessor"
    mbean    = "Catalina:name=*,type=GlobalRequestProcessor"
    paths    = ["requestCount","bytesReceived","bytesSent","processingTime","errorCount"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name     = "JspMonitor"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,name=jsp,type=JspMonitor"
    paths    = ["jspReloadCount","jspCount","jspUnloadCount"]
    tag_keys = ["J2EEApplication","J2EEServer","WebModule"]
  [[inputs.jolokia2_agent.metric]]
    name     = "ThreadPool"
    mbean    = "Catalina:name=*,type=ThreadPool"
    paths    = ["maxThreads","currentThreadCount","currentThreadsBusy"]
    tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
    name     = "Servlet"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,j2eeType=Servlet,name=*"
    paths    = ["processingTime","errorCount","requestCount"]
    tag_keys = ["name","J2EEApplication","J2EEServer","WebModule"]
  [[inputs.jolokia2_agent.metric]]
    name     = "Cache"
    mbean    = "Catalina:context=*,host=*,name=Cache,type=WebResourceRoot"
    paths    = ["hitCount","lookupCount"]
    tag_keys = ["context","host"]
[[outputs.sumologic]]
  url = "<URL Created in Step 3>"
  data_format = "prometheus"
```



    For multiple instances of Tomcat on a single server, including multiple input sections of  


```
[inputs.tomcat]]
  url = "http://127.0.0.1:80/manager/status/all?XML=true"
  username = "<username>"
  password = "<password>"
  [inputs.tomcat.tags]
    environment="dev_CHANGEME"
    component="webserver"
    webserver_system="tomcat"
    webserver_farm="tomcat_on_premise"
[[inputs.jolokia2_agent]]
  name_prefix = "tomcat_jmx_"
  urls = ["http://localhost:80/jolokia"]
  username = "<username-CHANGEME>"
  password = "<password-CHANGEME>"
  [inputs.jolokia2_agent.tags]
    environment="dev_CHANGEME"
    component="webserver"
         webserver_system="tomcat"
         webserver_farm="tomcat_on_premise"
[[inputs.tomcat]]
  url = "http://127.0.0.1:8080/manager/status/all?XML=true"
  username = "<username>"
  password = "<password>"
  [inputs.tomcat.tags]
    environment="dev_CHANGEME"
    component="webserver"
    webserver_system="tomcat"
    webserver_farm="tomcat_on_premise"
[[inputs.jolokia2_agent]]
  name_prefix = "tomcat_jmx_"
  urls = ["http://localhost:8080/jolokia"]
  username = "username-CHANGEME"
  password = "password-CHANGEME"
  [inputs.jolokia2_agent.tags]
    environment="dev_CHANGEME"
    component="webserver"
         webserver_system="tomcat"
         webserver_farm="tomcat_on_premise"
[[outputs.sumologic]]
  url = "<URL Created in Step 3>"
  data_format = "prometheus"
```


Please enter values for the following parameters (marked in **bold** above):



* In the input plugins section, which is [[inputs.tomcat]]:
    * **servers** - The URL to the Tomcat server. This can be a comma-separated list to connect to multiple Tomcat servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/tomcat) for more information on additional parameters for configuring the Tomcat input plugin for Telegraf.
    * In the tags section, which is **[inputs.tomcat.tags]**
        * **environment** - This is the deployment environment where the Tomcat farm identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **Webserver_farm **- Enter a name to identify this Tomcat farm. This farm name will be shown in the Sumo Logic dashboards.
* In the input plugins section, which is **[[inputs.jolokia2_agent]]**:
    * **servers** - The URL to the Tomcat server. This can be a comma-separated list to connect to multiple Tomcat servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Tomcat input plugin for Telegraf.
    * In the tags section, which is **[inputs.jolokia2_agent.tags]**:
        * **environment** - This is the deployment environment where the Tomcat farm identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * **webserver_farm**- Enter a name to identify this Tomcat farm. This farm name will be shown in the Sumo Logic dashboards.
* In the output plugins section, which is **[[outputs.sumologic]]**:
    * **url** - This is the HTTP source URL created in step 3. Please see [this doc](https://help.sumologic.com/03Send-Data/Collect-from-Other-Data-Sources/Collect_Metrics_Using_Telegraf/05_Configure_Telegraf_Output_Plugin_for_Sumo_Logic) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.

Here’s an explanation for additional values set by this Telegraf configuration.


10.png "image_tooltip")
**Do not modify** the configuration, as it will cause the SumoLogic apps to not function correctly.





* **data_format** - “prometheus” In the output plugins section, which is **[[outputs.sumologic]].** Metrics are sent in the Prometheus format to Sumo Logic
* **Component**: “webserver” - In the input plugins section, which are **[[inputs.tomcat]]** and **[[inputs.jolokia2_agent]]** - This value is used by Sumo Logic apps to identify application components.
* **webserver_system**: “tomcat” - In the input plugins sections.In other words, this value identifies the webserver system
*  For all other parameters please see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf) for more properties that can be configured in the Telegraf agent globally.

Once you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Tomcat metrics should start flowing into Sumo Logic.


#### Step 2 Configure Logs Collection
11.gif "image_tooltip")


This section provides instructions for configuring log collection for Apache Tomcat running on a non-kubernetes environment for the Sumo Logic App for Apache Tomcat.

By default, Apache Tomcat logs are stored in a log file. Sumo Logic supports collecting logs via a local log file. Local log files can be collected via [Installed collectors](https://help.sumologic.com/03Send-Data/Installed-Collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for collection to work. For detailed requirements for Installed collectors, see this [page](https://help.sumologic.com/01Start-Here/03About-Sumo-Logic/System-Requirements/Installed-Collector-Requirements).

Based on your infrastructure and networking setup choose one of these methods to collect Tomcat logs and follow the instructions below to set up log collection:



1. **Configure logging in Apache Tomcat**

    Varnish supports logging via the following methods: local text log files


    The Sumo Logic App for Apache Tomcat uses three types of logs

1. Tomcat Access logs \
Log format description: [https://tomcat.apache.org/tomcat-8.0-doc/config/valve.html  \
](https://tomcat.apache.org/tomcat-8.0-doc/config/valve.html)Recommended pattern used is pattern="common"
2. Tomcat Catalina.out logs \
Log format description: [https://docs.oracle.com/javase/8/docs/api/java/util/logging/SimpleFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/util/logging/SimpleFormatter.html)
3. Tomcat Garbage Collection (GC) logs \
Log format description: [https://stackoverflow.com/questions/4468546/explanation-of-tomcat-gc-log-statements](https://stackoverflow.com/questions/4468546/explanation-of-tomcat-gc-log-statements)
1. **Configure Tomcat to log to a Local file**
<!--H6 not demoted to H7. -->


######
    **Configuring Tomcat logs to go to log files **
12.gif "image_tooltip")



    By default, Tomcat logs are stored in /usr/share/tomcat/logs/ The default directory for log files is listed in the /usr/share/tomcat/conf/logging.properties file. Logs from the Tomcat log file can be collected via a Sumo Logic [Installed collector](https://help.sumologic.com/03Send-Data/Installed-Collectors) and a [Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source) as explained in the next section.

1. **Configuring a Collector**

    To collect logs directly from the Tomcat machine, configure an[ Installed Collector](https://help.sumologic.com/03Send-Data/Installed-Collectors).

1. **Configuring a Source**

    **To add a Local File Source source for Apache Tomcat do the following**


    To collect logs directly from your Tomcat machine, use an Installed Collector and a Local File Source.

1. Add a[ Local File Source](https://help.sumologic.com/03Send-Data/Sources/01Sources-for-Installed-Collectors/Local-File-Source).
2. Configure the Local File Source fields as follows:
* **Name.** (Required)
* **Description.** (Optional)
* **File Path (Required).** Enter the path to your error.log or access.log. The files are typically located in **/usr/share/tomcat/logs/***. If you are using a customized path, check the Tomcat.conf file for this information.
* **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
* **Source Category.** Enter any string to tag the output collected from this Source, such as **Tomcat/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see[ Best Practices](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category).)

        **Fields. **Set the following fields:

* component = websystem
* webserver_system = tomcat
* webserver_farm = <Your_Tomcat_Farm_Name>
* environment = <Environment_Name>, such as Dev, QA or Prod.


13.png "image_tooltip")


1. Configure the **Advanced** section:
* **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
* **Time Zone.** Choose the option, **Ignore time zone from log file and instead use**, and then select your Tomcat Server’s time zone.
* **Timestamp Format.** The timestamp format is automatically detected. **Encoding. **Select** **UTF-8 (Default).
* **Enable Multiline Processing.** Detect messages spanning multiple lines
    * Infer Boundaries - Detect message boundaries automatically
1. Click **Save**.

At this point, Tomcat logs should start flowing into Sumo Logic.
