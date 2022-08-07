---
id: configure-telegraf-input-plugins
---

# Configure Telegraf Input Plugins

This topic explains how to configure Telegraf input plugins, and has examples of configuring several input plugins.

## About input plugins

The Telegraf agent uses input plugins to obtain metrics from an application or service. There are many existing Telegraf input plugins for a broad array of system, services, and third party APIs. For a list, see the [Input Plugins](https://github.com/influxdata/telegraf#input-plugins) section of the Telegraf README on GitHub.

You configure Telegraf in the `telegraf.conf` configuration file, which you can generate from the command line, as described in the [How to use it](https://github.com/influxdata/telegraf#how-to-use-it) on section of the Telegraf README on GitHub. For some applications, you need to configure the application to expose metrics, in addition to configuring the input plugin. 

## Redis example

You configure the Redis input plugin in the Telegraf configuration file
like this:

```sql
-- Read Redis's basic status information
[[inputs.redis]]
 -- specify servers via a url matching:
 -- [protocol://][:password]@address[:port]
 --  e.g. tcp://localhost:6379 or tcp://:password@192.168.99.100
 -- If no servers are specified, then localhost is used as the host.
 -- If no port is specified, 6379 is used
  servers = ["tcp://localhost:6379"]

 -- specify server password
  password = "s#cr@t%"
```

Where:

 * servers is the address of the Redis server. You can specify multiple servers.
 * password is the password for accessing the Redis server. 

For more information about configuring the Redis input plugin see its [README](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis#redis-input-plugin)
on GitHub.

## Nginx example

In order to expose Nginx metrics, you need to enable stub status in the Nginx `/etc/nginx/conf.d/status.conf `configuration file, like this:

```yml
location /nginx_status {
        stub_status on;
        access_log  on;           
        allow all;  # REPLACE with your access policy
}
```

After updating the configuration file, reload Nginx with this command:

```bash
nginx -s reload
```

Assuming Nginx is running on port 8081 and you enabled the status module on `nginx_status`, you configure the Nginx input plugin in the Telegraf configuration file like this:

```
urls = ["http://localhost:8081/nginx_status"]
```

Where `urls` is a list of addresses on which `stub_status` has been exposed.

For more information about configuring the Nginx input plugin or to see what data it collects, see its
[README](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/nginx) on GitHub.

## JMX example 

Telegraf uses the jolokia2 input plugin to obtain metrics from JMX. Before you can use Telegraf to get JMX metrics, you need to configure the target application to use the Jolokia agent.

### Set up Jolokia

There are two ways to use Jolokia.

#### Method 1: Use Jolokia as a java agent

Download the agent jar and use it as javaagent for your application:

```bash
# Download latest jolokia agent
wget https://search.maven.org/remoteconte....6.2-agent.jar
# Add -javaagent:/path/to/jolokia-jvm-<version>-agent.jar to your command line application
java ... -javaagent:jolokia-jvm-1.6.2-agent.jar ...
```

#### Method 2: Point Jolokia to the Java process

Alternatively, you can use Jolokia as an agent that points to the target Java process:

```bash
# List available applications
java -jar ./jolokia-jvm-1.6.2-agent.jar list
# 156   ./jolokia-jvm-1.6.2-agent.jar list
# 6   org.apache.catalina.startup.Bootstrap start
# Attach to the application which should be monitored
java -jar ./jolokia-jvm-1.6.2-agent.jar start 6
```

### Configure Jolokia input plugin 

You configure the Jolokia input plugin in the Telegraf configuration file like this:

```sql
urls = ["http://127.0.0.1:8778/jolokia"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_ClassLoading"
    mbean = "java.lang:type=ClassLoading"
    paths = ["LoadedClassCount", "TotalLoadedClassCount", "UnloadedClassCount"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Compilation"
    mbean = "java.lang:type=Compilation"
    paths = ["TotalCompilationTime"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_GarbageCollector"
    mbean = "java.lang:name=*,type=GarbageCollector"
    paths = ["CollectionCount", "CollectionTime", "LastGcInfo"]
    tag_keys = ["name"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_MemoryPool"
    mbean = "java.lang:name=*,type=MemoryPool"
    paths = ["CollectionUsage", "CollectionUsageThresholdSupported", "PeakUsage", "Usage", "UsageThresholdSupported"]
    tag_keys = ["name"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Memory"
    mbean = "java.lang:type=Memory"
    paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_OperatingSystem"
    mbean = "java.lang:type=OperatingSystem"
    paths = ["AvailableProcessors", "CommittedVirtualMemorySize", "FreePhysicalMemorySize", "FreeSwapSpaceSize", "MaxFileDescriptorCount", "OpenFileDescriptorCount", "ProcessCpuLoad", "ProcessCpuTime", "SystemCpuLoad", "SystemLoadAverage", "TotalPhysicalMemorySize", "TotalSwapSpaceSize"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Runtime"
    mbean = "java.lang:type=Runtime"
    paths = ["BootClassPathSupported", "StartTime", "Uptime"]

  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Threading"
    mbean = "java.lang:type=Threading"
    paths = ["CurrentThreadCpuTime", "CurrentThreadUserTime", "DaemonThreadCount", "ObjectMonitorUsageSupported", "PeakThreadCount", "SynchronizerUsageSupported", "ThreadContentionMonitoringEnabled", "ThreadContentionMonitoringSupported", "ThreadCount", "ThreadCpuTimeEnabled", "ThreadCpuTimeSupported", "TotalStartedThreadCount"]

  # Metrics which are unavailable for some of the jvm implementations
  ## Added in jdk14
  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_OperatingSystem"
    mbean = "java.lang:type=OperatingSystem"
    paths = ["FreeMemorySize", "TotalMemorySize"]

  ## not available for jdk8
  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Runtime"
    mbean = "java.lang:type=Runtime"
    paths = ["Pid"]

  ## Added in jdk14
  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Threading"
    mbean = "java.lang:type=Threading"
    paths = ["CurrentThreadAllocatedBytes"]

   Not available for adoptopenjdk-openj9
  [[inputs.jolokia2_agent.metric]]
    name  = "java_lang_Threading"
    mbean = "java.lang:type=Threading"
    paths = ["ThreadAllocatedMemoryEnabled", "ThreadAllocatedMemorySupported"]
```

For more information about configuring the Jolokia input plugin, see its [README](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2#configuration) on GitHub.

For information about collecting other custom JMX metrics, see [Collect Custom JMX Metrics with Jolokia](collect-custom-jmx-metrics-jolokia.md).
