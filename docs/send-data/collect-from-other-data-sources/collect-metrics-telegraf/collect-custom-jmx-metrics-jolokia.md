---
id: collect-custom-jmx-metrics-jolokia
title: Collect Custom JMX Metrics with Jolokia
description: Learn how to collect custom JMX metrics using the Jolokia agent and Telegraf.
---



This topic has information about collecting custom JMX metrics using the Jolokia agent and Telegraf.  

For more information about Telegraf input plugins, see [Configure Telegraf Input Plugins](configure-telegraf-input-plugins.md).

## List mbeans

To list all available mbeans, and their methods and attributes, call the Jolokia agent endpoint, which in this example is exposed on port 8778 on localhost.

```bash
curl 127.0.0.1:8778/jolokia/list | jq '.'
```

The output will be similar to this:

```
{
  "request": {
    "type": "list"
  },
  "value": {
    "java.lang": {
      "name=Copy,type=GarbageCollector": {
        "attr": {
          "MemoryPoolNames": {
            "rw": false,
            "type": "[Ljava.lang.String;",
            "desc": "MemoryPoolNames"
          },
          "LastGcInfo": {
            "rw": false,
            "type": "javax.management.openmbean.CompositeData",
            "desc": "LastGcInfo"
          },
          "CollectionTime": {
            "rw": false,
            "type": "long",
            "desc": "CollectionTime"
          },
          "Valid": {
            "rw": false,
            "type": "boolean",
            "desc": "Valid"
          },
          "CollectionCount": {
            "rw": false,
            "type": "long",
            "desc": "CollectionCount"
          },
          "Name": {
            "rw": false,
            "type": "java.lang.String",
            "desc": "Name"
          },
          "ObjectName": {
            "rw": false,
            "type": "javax.management.ObjectName",
            "desc": "ObjectName"
          }
        },
        "class": "com.sun.management.internal.GarbageCollectorExtImpl",
        "desc": "Information on the management interface of the MBean"
      }
  },
  "timestamp": 1599468582,
  "status": 200
}
```

## Build the Jolokia2 Telegraf configuration

You can use output returned by your curl command from the previous step to create this configuration: 


```sql
[[inputs.jolokia2_agent]]
            urls = ["http://127.0.0.1:8778/jolokia"]

           [[inputs.jolokia2_agent.metric]]
            name  = "sumologic_java_lang_GarbageCollector"
            mbean = "java.lang:name=*,type=GarbageCollector"
            paths = ["LastGcInfo", "CollectionTime", "Valid", "CollectionCount"]
            tag_keys = ["name"]
```

Where:

* `name` is the prefix of the metric, `sumologic_java_lang_GarbageCollector` in this example. 
* `mbean` is built from the mbean type, `java.lang` and name, `"name=Copy,type=GarbageCollector"`. All attributes other than type are replaced with an asterisk, `(name=*)` and their names are added to `tag_keys`. Name is converted to metric dimension,` name="Copy"`.
* `paths` defines which mbean properties should be scraped and exposed as metrics. The supported types are:

    * `"boolean"`
    * `"double"`  
    * `"int"`
    * `"javax.management.openmbean.CompositeData"`
    * `"long"`

## Results

The configuration shown above will produce metrics like those shown below:

```js
# HELP sumologic_java_lang_GarbageCollector_CollectionCount Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_CollectionCount untyped
sumologic_java_lang_GarbageCollector_CollectionCount{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="Copy"} 1
sumologic_java_lang_GarbageCollector_CollectionCount{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="MarkSweepCompact"} 0
# HELP sumologic_java_lang_GarbageCollector_CollectionTime Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_CollectionTime untyped
sumologic_java_lang_GarbageCollector_CollectionTime{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="Copy"} 18
sumologic_java_lang_GarbageCollector_CollectionTime{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="MarkSweepCompact"} 0
# HELP sumologic_java_lang_GarbageCollector_LastGcInfo_GcThreadCount Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_LastGcInfo_GcThreadCount untyped
sumologic_java_lang_GarbageCollector_LastGcInfo_GcThreadCount{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="Copy"} 1
# HELP sumologic_java_lang_GarbageCollector_LastGcInfo_duration Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_LastGcInfo_duration untyped
sumologic_java_lang_GarbageCollector_LastGcInfo_duration{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="Copy"} 19
# HELP sumologic_java_lang_GarbageCollector_LastGcInfo_endTime Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_LastGcInfo_endTime untyped
sumologic_java_lang_GarbageCollector_LastGcInfo_endTime{host="jolokia-0",jolokia_agent_url="http://127.0.0.1:8778/jolokia",name="Copy"} 20719
# HELP sumologic_java_lang_GarbageCollector_LastGcInfo_id Telegraf collected metric
# TYPE sumologic_java_lang_GarbageCollector_LastGcInfo_id untyped
```
