---
id: increase-collector-memory
---

# Increase Collector Memory

Collectors are set to use 128MB of RAM by default. If your Collectors ingest more than a few files, you should consider increasing the max heap size the Collector can use.

## Memory Error

A Collector may fail to launch if there isn't adequate memory available. The Collector logs will have the following error: 

```
WrapperSimpleApp Error: java.lang.OutOfMemoryError: GC overhead limit exceeded
```

## New Collector

When registering a new Collector you can specify the parameter `wrapper.java.maxmemory` in [user.properties](../installed-collectors/collector-installation-reference/user-properties.md) with a higher memory value than the default 128MB. For example, a user.properties file with a memory setting of 2048MB would look like:

```
name = My Collector 
accessid = accessId 
accesskey = accessKey 
wrapper.java.maxmemory = 2048
```

| Parameter | Description | Can be changed after installation? |
|--|--|--|
| `wrapper.java.maxmemory` | Sets the maximum java heap size, in MB.<br/>Default: 128 | Yes, with Collector restart. |

### Command line installer

When using the [command line (shell script) installer](../installed-collectors/collector-installation-reference/parameters-command-line-installer.md) you can specify the parameter `-Vwrapper.java.maxmemory` with a higher memory value than the default 128MB. For details and example commands on Collector installation, see [Install a Collector on Linux](../installed-collectors/install-collector-linux.md), [Install a Collector on MacOS](../installed-collectors/install-collector-macos.md), and [Install a Collector on Windows](../installed-collectors/install-collector-windows.md).

For example, the parameter with a memory setting of 2048MB would look like:

```
-Vwrapper.java.maxmemory=2048
```

| Parameter | Description | Can be changed after installation? |
|--|--|--|
| `wrapper.java.maxmemory` | Sets the maximum java heap size, in MB.<br/>Default: 128 | Yes, with Collector restart. |

### Existing Collector

:::note
If user.properties contains the content listed in [Increase memory for collectors upgraded from versions before 19.137](#increase-memory-for-collectors-upgraded-from-versions-before-19137) below, follow the instructions in that section.
:::

To increase the maximum Java Heap size:

1. On the computer running the Collector, open `install_directory/config/user.properties`.
1. Add or locate the following parameter:

  ```
  wrapper.java.maxmemory=128
  ```

1. Increase the `wrapper.java.maxmemory` value, based on the number of files you expect to collect from.

   * 512MB for dozens of files
   * 1024MB for 100 files
   * 2048MB for more than 100 files
   * 4096MB for more than 1000 files

  These are general guidelines since your exact memory requirement depends on how many sources are configured, log volume, use of wildcards and recursive scans in the path expressions, and filters.

  If you're using centralized data collection, you must increase collector memory.

1. Restart the collector using the command: 

  ```bash
  install_directory/collector restart
  ```

## Monitor memory issues

To monitor collectors for out-of-memory issues, ingest the collector logs, and schedule following search to run every 15 minutes with time range last 15 minutes.

```sql
_sourceCategory=*LocalCollectorLogs* "java.lang.OutOfMemoryError: Java heap space"
| timeslice 15m
| count by _timeslice, _collector
| "https://help.sumologic.com/Send_Data/Collector_FAQs/Increase_memory_in_a_Collector" as sumoHelp
| concat ("collector: ", _collector, " identified with insufficient max heap memory. Increase java heap space allocation for it. Refer: ", sumoHelp) as msg
| sort by _timeslice, _collector | fields -sumoHelp
```

## Increase memory for collectors upgraded from versions before 19.137

If the `user.properties` file contains these lines:

```
wrapper.app.parameter.2=-b
wrapper.app.parameter.3=installerSources/selected.json 
wrapper.filter.trigger.1000=java.lang.OutOfMemoryError 
```

you must append the following to the end of the `Sumo_install_dir/config/wrapper.conf` file:

```
# Overwrite the defaults with any properties in user.properties
#include ./config/user.properties
```

Then update `user.properties` as follows:

* Delete the above-mentioned three lines (the lines that begin with `wrapper.`)
* Add the following line: `wrapper.java.maxmemory=<some_value>`

You can now restart the Collector as described in Start or Stop a Collector Using Scripts.
