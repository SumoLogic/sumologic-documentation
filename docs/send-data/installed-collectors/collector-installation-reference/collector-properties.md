---
id: collector-properties
title: collector.properties
description: This file allows you to tune the internal processes of Installed Collectors to fit your needs.
---


For Collector versions 19.182-25 and later the `collector.properties` file can be modified on existing Collectors allowing you to configure its internal processes for specific uses. This file is generated automatically when installing a Collector.

:::note
Starting with collector 19.170+, the installation directory is secured to users belonging to the sumologic_collector group. Modifying `collector.properties` may require sudo privileges. For more information, see [Enhanced File System Security for Installed Collectors](enhanced-file-system-security-installed-collectors.md).
:::

## Configure collector.properties

1. Stop the Sumo Logic Collector service.

    * On Windows: `net stop sumo-collector`      
    * On Linux: `sudo ./collector stop`    
1. Navigate to the installation directory of an existing Installed Collector and open the `collector.properties` file in the **config** directory with a text editor. An example path is: `/<sumo_home>/config/collector.properties`
1. Add the parameters you need, see all of the available parameters in the [collector.properties parameters](#collectorproperties) table below.

    :::important
    Keep all of the existing parameters already in the file. If you remove any, the Collector will not be able to restore them and could result in collection issues.
    :::

1. Save the file in the same location. Maintain UTF-8 format.
1. Start the Sumo Logic Collector service.

    * On Windows: `net start sumo-collector`
    * On Linux: `sudo ./collector start`

## Default Collector installation location
The default collector installation locations are:

Linux:

* `/opt/SumoCollector/`
* `/usr/local/SumoCollector`

Windows:

* `C:\Program Files (x86)\Sumo Logic Collector`
* `C:\Program Files\Sumo Logic Collector`

### collector.properties example

The example below has parameters that were automatically added by the Collector based on the configuration of the [user.properties](user-properties.md) file, such as `cpuTarget`. The collector.properties file is different, only modify parameters found in the [parameters table](#collectorproperties) below. If you see another parameter you want to adjust, check user.properties to see if it's an available configuration parameter.

The collector.properties parameter `collector.localfile.inputType` has been added and set to `nonblocking` to tell the Collector to use the [Windows Rollable path for UNC file paths](/docs/send-data/collector-faq#file-locking-problems). That is the only collector.properties parameter in this example.

```
receiver.url = https://collectors.sumologic.com
windows.remote.jni = true
cpuTarget = -1
json.sync.mode = UI
logIngestStatus = Normal
collector.debug.forceRestart = -1
collector.localfile.inputType = nonblocking
```

### collector.properties parameters

The table below has parameters that you can manage.

:::important
Do not modify any other parameters found in the collector.properties file, it could result in collection issues.

Collector versions 19.253-26+ support **wrapper** configuration parameters.
:::

| Parameter | Type | Description | Default Value |
|:--|:--|:--|:--|
| alerts.ttl.min | integer  | Duration in minutes before deleting alerts stored in the Collector directory. | 180 |
| aws.metadata.cache.enabled | boolean  | Enable fetching and caching AWS-specific local metadata. | true |
| aws.metadata.cache.fetch.timeout.ms | integer  | HTTP connection timeout in milliseconds when attempting to fetch AWS-specific local metadata. | 1000 |
| aws.metadata.cache.url | string   | AWS-specific URL to fetch local metadata to cache. | http://169.254.169.254/latest/dynamic/instance-identity/document |
| collector.backoff.max.timeInMillis | integer  | Maximum backoff duration in milliseconds for Windows Event Log Sources. | 60000 |
| collector.backoff.min.timeInMillis | integer  | Initial backoff duration in milliseconds for Windows Event Log Sources. | 5000 |
| collector.connection.fixCount | integer  | Specifies a fixed number of connections to establish when sending data to Sumo Logic. Must be less than or equal to `collector.connection.max`. | -1 |
| collector.connection.max | integer  | Maximum number of connections to establish when sending data to Sumo Logic. | 3 |
| collector.localfile.inputType | string   | Override for the type of local file reading mechanism. Possible override values include "nonblocking" and "simple". | NULL |
| collector.localFile.oldFileMaxEps | integer  | Number of events per second used to determine how long to sleep when monitoring an old file. | 500 |
| collector.localFile.oldThresholdMillis | integer  | Duration in milliseconds after which to move a monitored file to "old" working set. | 900000 |
| collector.metrics.dumper.millis | integer  | Time period in milliseconds to log Collector metrics and usage information to collector-usage.log. | 600000 |
| collector.pipeline.maxMessageCount | integer  | Number of messages to accumulate before flushing the log outbound queue. | 1000 |
| collector.pipeline.maxMessagesSize | integer  | Size in bytes to accumulate before flushing the log outbound queue. | 1048576 |
| collector.pipeline.metrics.maxMessageCount | integer  | Number of messages to accumulate before flushing the metrics outbound queue. | 1000 |
| collector.pipeline.metrics.maxMessagesSize | integer  | Size in bytes to accumulate before flushing the metrics outbound queue. | 1048576 |
| collector.pipeline.metrics.windowSizeMillis | integer  | Time period in milliseconds to flush the metrics outbound queue. | 200 |
| collector.pipeline.windowSizeMillis | integer  | Time period in milliseconds to flush the log outbound queue. | 1000 |
| collector.registration.delay.ms | integer  | Delay in milliseconds for Collector registration. | 0 |
| collector.syslog.udp.readBufferSize | integer  | Maximum size in bytes to buffer payloads received via UDP with Syslog Sources. | 2048 |
| collector.wildcard.fpSize | integer  | Fingerprint size to use (in bytes) when determining new file rotation. | 2048 |
| collector.wildcard.pathMatcher | string   | Path expression matcher to use when evaluating file paths. | RegexPathExpressionMatcher |
| collector.winlog.dcom.connectionTimeout | integer  | WMI connection timeout in milliseconds for Windows Event Log Sources. | 60000 |
| collector.winlog.dcom.notificationSessionTimeout | integer  | WMI notification session timeout in milliseconds for Windows Event Log Sources. | 1800000 |
| collector.winlog.dcom.querySessionTimeout | integer  | WMI query session timeout in milliseconds for Windows Event Log Sources. | 30000 |
| collector.winlog.initial.sleep.ms | integer  | Duration in milliseconds to sleep before checking for missed events between catch up and first notification. | 10000 |
| collector.winlog.maxThreads | integer  | Maximum number of threads to use when processing Windows events. | 16 |
| collector.winlog.queryBatchSize | integer  | Number of elements to fetch during catch up for Windows Event Log Sources. | 20000 |
| collector.winlog.queryDoCatchup | boolean  | Enable running catchup queries for Windows Event Log Sources. | true |
| collector.winlog.queryLongWaitTime | integer  | Duration in milliseconds to sleep for long queries performed by Windows Event Log Sources. | 3000 |
| collector.winlog.queryShortWaitTime | integer  | Duration in milliseconds to sleep for short queries performed by Windows Event Log Sources. | 250 |
| collector.winlog.retryConnection | integer  | Duration in milliseconds to wait before retrying a failed connection on Windows Event Log Sources. | 15000 |
| command.fetch.maxRetry | integer  | Maximum number of times to retry fetching remote commands from Sumo Logic before closing the command channel. | 15 |
| command.fetch.retryInterval | integer  | Time period in milliseconds to retry fetching remote commands from Sumo Logic. | 5000 |
| docker.apiVersion | string   | Override for Docker API version to use when collecting from Docker container sources. | NULL |
| docker.blockProblematicContainerInMs | integer  | Maximum time in milliseconds to block retry for error-producing Docker container sources. | 900000 |
| docker.maxContainerErrorPerMinute                | integer  | Maximum number of error retry attempts per Docker container source. | 20 |
| docker.maxPerContainerConnections | integer  | Maximum number of Docker container connections to monitor per source. | 40 |
| forwarding.hcp.dateStamperFormat | string   | Timestamp format to use when forwarding data to a REST sink source. | yyyy-MM-dd |
| forwarding.http.iso8859 | boolean  | Enable forwarding ISO-8859 entities to a REST sink source. | false |
| forwarding.syslog.maxMessageSize | integer  | Sets the segment size in bytes of forwarded syslog messages. | 1024 |
| freeSpace.threshold.percent | integer  | Percentage threshold of free disk space after which the Collector enters flushing mode. | 10 |
| graphite.hostname | string   | Override the hostname of the syslog server for legacy Graphite sources. | NULL |
| http.connectionTimeout | integer  | HTTP connection timeout in milliseconds when attempting to send data to Sumo Logic. | 60000 |
| http.socketTimeout | integer  | HTTP socket timeout in milliseconds when attempting to send data to Sumo Logic. | 60000 |
| http.transmitter.retry.sleep.ms | integer  | Duration in milliseconds to sleep before retrying sending on connection failure. | 5000 |
| httpAppender.disable | boolean  | Disable diagnostic HTTP appender for Collector logging. | false |
| installed.collector.zstd.compression.enabled | boolean | Enable zstd compression algorithm and allow switching back to deflate by setting it to false. | true |
| json.sync.sleep.time | integer  | Time period in milliseconds to check for changes to the Sources JSON sync file. | 1000 |
| json.sync.waiting.after.fail | integer  | Duration in milliseconds to wait before retrying to sync to a JSON source sync file after failure. | 600000 |
| local.win.event.collection.flag | string   | Override for the type of local Windows event collection. Possible override values include "0" for legacy mode. | NULL |
| local.win.event.collection.legacy | string   | Override for the type of local Windows event collection. Possible override values include "1" for legacy mode. | NULL |
| localWindowsEventLog.batchSize | integer  | Number of elements to fetch per batch for Windows Event Log Sources. | 512 |
| localWindowsEventLog.sleepIntervalMs | integer  | Sleep time in milliseconds to wait in between fetching events for Windows Event Log Sources. | 0 |
| LogSender.pause.override | boolean  | Pause sending HTTP data from the log sender to Sumo Logic. | false |
| metadata.cache.expiration.sec | integer  | Duration in seconds to expire and retry fetching local metadata cached by the Collector. | 600 |
| MetricsSender.pause.override | boolean  | Pause sending HTTP data from the metric sender to Sumo Logic. | false |
| multiline.maxCharLength | integer  | Sets the size in KB the Collector reads up to for detecting multiline messages. See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs.md for details. | 524288                                                           |
| multiline.maxLines | integer  | Sets the number of lines the Collector reads up to for detecting multiline messages. See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs.md) for details. | 2000 |
| offline.numRetries | integer  | Number of retry attempts before entering offline collection mode on connection failure. | 3 |
| paging.lowerbound.mb | integer  | Size in megabytes of free storage space available after which the Collector exits flushing mode. | 32 |
| paging.upperbound.mb | integer  | Size in megabytes of free storage space available after which the collector enters flushing mode. | 2048 |
| pileAggregator.maxBatchPayloadSize | integer  | Maximum size in bytes to accumulate to flush aggregated piles for log pipeline. | 4194304 |
| pileAggregator.maxPiles | integer  | Maximum number of piles to aggregate before flushing piles for log pipeline. | 5 |
| pileAggregator.metrics.maxBatchPayloadSize | integer  | Maximum size in bytes to accumulate to flush aggregated piles for metrics pipeline. | 1048576 |
| pileAggregator.metrics.maxPiles | integer  | Maximum number of piles to aggregate before flushing piles for metrics pipeline. | 10 |
| pileAggregator.metrics.period | integer  | Time period in milliseconds to flush aggregated piles for metrics pipeline. | 1000 |
| pileAggregator.period | integer  | Time period in milliseconds to flush aggregated piles for log pipeline. | 1000 |
| queue.checking.interval.sec | integer  | Time period in seconds the collector will calculate outbound queue statistics. | 300 |
| queue.max.disk.gb | integer  | Size in gigabytes for on-disk outbound queue for log sources. | 3 |
| queue.max.memory.mb | integer  | Size in megabytes for in-memory outbound queue for log sources. | 8 |
| queue.metrics.max.disk.gb | integer  | Size in gigabytes for on-disk outbound queue for metric sources. | 1 |
| queue.metrics.max.memory.mb | integer  | Size in megabytes for in-memory outbound queue for metric sources. | 8 |
| refresh.event.session.period | integer  | Time period in milliseconds to refresh the event session for Windows Event Log Sources. | 3600000 |
| refresh.local.log.names.period | integer  | Time period in milliseconds to retrieve log names for new event logs for Windows Event Log Sources. | 86400000 |
| remote.file.connect.retries | integer  | Number of retry attempts when connecting to a remote file host. | 3 |
| source.max.threads.num | integer  | Maximum number of threads to use when scanning files for a given source. | 6 |
| source.scan.file.cacheTtl | integer  | Maximum time duration in milliseconds before repopulating directory hierarchy. | 1800000 |
| source.scan.file.maxAge | integer  | Maximum age in days of files to be considered when scanning. | 36500 |
| ssh.host.verify.file | string   | File path of SSH host key verification file to use when verifying remote hosts. | NULL |
| streaming.metrics.hostname | string   | Override the hostname of the syslog server for Streaming Metrics source types. | NULL |
| syslog.dns.cache.timeout | integer  | Timeout in milliseconds to resolve DNS host lookup information for Syslog Sources. | 300000 |
| syslog.hostname | string   | Host name that identifies the network interface Syslog Sources should bind to. | NULL |
| tcp.syslog.server.socket.timeout.ms | integer  | Duration in milliseconds socket timeout to use for Syslog Sources. Set to 0 to disable the timeout. | 120000 |
| threadDumps.enabled | boolean  | Enable periodic thread dumps to be printed to the collector.log file. | false |
| threadDumps.frequencyMs | integer  | Time period in milliseconds to log thread dumps when thread dumps are enabled. | 60000 |
| upgrade.auto.enabled | boolean  | Enable automatic upgrade check for the Collector. | false |
| upgrade.check.frequency | integer  | Time period in seconds to check for upgrades when automatic upgrades are enabled. | 3600 |
| waiting.time.before.stop.thread | integer  | Duration in milliseconds to wait before the monitoring of the Sources JSON sync file is stopped. | 15000 |
| wildcard.inputs.handler.removed.input.timeout | integer  | Duration in milliseconds to wait before the monitoring of an unmodified file is stopped. | 1800000 |
| windows.local.jni | boolean  | Enable using JNI for local Windows Event Log Sources. | true |
| wrapper.out.oom | string   | Custom message to log upon OutOfMemory exception from Wrapper. | The JVM has run out of memory. |
| wrapper.out.stop | string   | Custom message to log upon stopping the Wrapper. | Wrapper Stopped |
| collector.windows.active.directory.log.escape.special.characters | boolean | Allows escaping of special characters in Windows Active Directory Inventory Logs Source. | false  |
| collector.windows.constant.sleep.interval.retry.windows.event | boolean | Allows to wait for a constant time to retry sending data whenever we get some invalid data. | false  |
