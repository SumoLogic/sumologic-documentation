---
id: set-collector-cpu-usage-target
title: Set a Collector CPU Usage Target
description: Set a CPU Target to limit the amount of CPU processing a Collector uses, if required.
---

An installed collector uses all CPU processing resources available on a machine. Most of the time CPU processing issues don’t arise, but if a lot of log data is being generated, or if you need to protect other processes running on the machine where the collector is installed, you can choose to set a CPU target to limit the amount of CPU processing a collector uses. This option is applied only to local or remote file sources.

Once you have set a CPU target, if a collector hits the target, collection is slowed. Logs are still collected, but there may be delays in ingesting new data. You may notice a delay in search results.

It’s important to note that a CPU target is not a hard limit. Even with a target set, there’s a chance that the collector will exceed the limit. If you notice that a collector is consistently exceeding the target, you can increase the CPU target, install the collector on a more robust machine, or try using remote collection options.

To set a CPU target:
1. Select **Manage Data** > **Collection** > **Collection**.
1. Click the collector name, or click the **Edit** link to the right of the collector name.
1. Click **Advanced**.
1. Choose an option from the **CPU Target** menu, then click **Save**.<br/> ![cpu target option](/img/collector/cpu-target-options.png)

## When should I choose a lower target?

A lower CPU target is useful if a collector is installed on a machine that is running other processes that you need to protect. In other words, the collector is slowed instead of CPU resources being taken away from other processes.

## How is collector CPU usage calculated?

The CPU target is based on the amount of CPU being used by the collector JVM process, **java.exe**. The CPU target feature does not cap CPU usage on the host or limit the collector JVM's access to CPU resources. Instead, the collector monitors its CPU usage every minute, and when the current CPU consumption exceeds the user-defined threshold set in the **CPU Target** parameter, it begins to throttle back its resources and the work it is performing.

## When and where does the CPU target apply?

The CPU Target only applies to collectors running local and remote file sources. Sumo Logic does not apply any throttling to local event sources or syslog sources. So, if you have a combination of both local file sources and Windows event sources, it is possible you will not see the CPU usage of the collector go below the CPU target setting due to those other source types.

## How does the CPU target work?

Resource throttling occurs in two ways:

1. By reducing the number of threads used by each source to read local or remote files from the host. By default, a collector has up to eight threads per source. When CPU targeting kicks in, the collector incrementally reduces this thread count by one, and will continue to do so until it is left with only one thread in use, or the CPU has fallen below the set target. The collector will never reduce the thread count to 0 threads. Sumo Logic will always continue to read from the source files.
1. By increasing the scanning interval of the path expressions incrementally until the scan interval reaches a set maximum. By default, a local file source scans the defined path every two seconds. A remote file source scans the path every 30 seconds. Throttling increases either of these intervals up to 10x. This means the maximum scan interval for a local file source is 20 seconds, and the maximum scan interval for a remote file source is three minutes.

The collector will always perform some level of work, whether it is scanning the path expressions looking for new files, or reading the files it has already found with the previous scan. So, depending on the CPU available on the host, the throttled-back collection could still require more CPU than what is defined within the CPU target parameter. In this case, you may not see the CPU ever go below the target you set for that collector.

## How can a CPU target be applied to a collector?

The CPU Target value can be set in three ways:

1. Update the **CPU Target** value by editing the collector under **Manage Data** > **Collection** > **Collection**.
1. Update the collector configuration via the [Collector Management API](/docs/api/collector-management#Collector-API-Methods-and-Examples).  
1. Either supply the **targetCPU** parameter to the [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties.md) file or **-VtargetCPU** [command line argument](/docs/send-data/installed-collectors/collector-installation-reference/parameters-command-line-installer.md) during the initial installation and registration of the collector.

## How do you know targeting is applied?

Within the collector logs (**collector.log**) you can look for the following types of log lines containing info on CPU targeting and the current usage. Where `$current%` and `$target%` will be some number.

* **"Initializing CPU Resource Monitor with a target of $target%"**- This message notes the CPU target that is set for the collector.
* **"Resource consumption $current% is higher than $target%"**- This message notes the start of a CPU targeting event and throttling of the processes.
* **"Resource consumption $current% is lower than $target%"**- This message notes the end of a CPU targeting event and throttling of the processes.
* **"Resource consumption $current% is close to $target%"**- This message notes the collector is not currently doing any targeting on the CPU or throttling the processes.

## How to reduce CPU usage on the collector if targeting is not enough

If you have a CPU target set but you continue to see the CPU usage at a higher level than the target, review the local file sources on the collector and look for any source configuration changes that you can make to reduce the amount of processing time required. This includes:

* Define more specific path expressions and remove any recursive path expressions where possible.
* Reduce the overall volume of directories and log files found within the scanned path expression. Archiving or zipping old files periodically helps to reduce both scan and disk resources.
* Check for any unnecessary denylists within the source configurations and remove them.
* Review any include/exclude/hash/mask rules on the sources and make sure they are required and optimized for that source.
* Remove unnecessary sources.
* Increase the [Collector’s max heap size](/docs/send-data/collector-faq#increase-collector-memory).
