---
id: parameters-command-line-installer
title: Parameters for the Command Line Installer
description: This topic lists the parameters that are available when installing a Collector using the command line installer.
---



The following tables provide and reference the available parameters for Collector installation using the command line installer. For details and example commands on Collector installation, see [Install a Collector on Linux](../linux.md), [Install a Collector on MacOS](../macos.md), and [Install a Collector on Windows](../windows.md).

:::important
Collector versions 19.253-26+ support wrapper configuration parameters.
:::

## Unique parameters

The following table shows parameters that are unique to the Command Line Installer:

| Parameter | Description |
|:--|:--|
| `-console` | Only has an effect when used with `-q`. Causes the installer to send progress messages to the console (whether you are running the installer in GUI or command-line mode.)<br/>On Windows, for this option to take effect, you must run the installer with start /wait. For example:<br/>`start /wait installer.exe -q -console` |
| `-dir [directory]` | Sets a different installation directory than the default. |
| `-q` | Causes the installer to run silently, which means you won't be prompted to supply installation parameters. For any installation parameter that you do not define at the command line, Sumo will use a default value. No output is sent to the console during installation, unless you also use the `-console` parameter.  Note that for a new Collector installation, even in a silent installation, you will be prompted to an authorization token, or an Access ID and Access Key. |
| `-varfile [fileName]` | Instead of passing arguments via the command line, you can specify a file that contains the arguments (without the "-V" flag).  Since many operating systems allow a user to list information about processes that are owned by other users, we recommend using the `-varfile` option to specify Sumo Logic credentials.<br/>Example: To pass credentials when installing the Collector, you can create a file called sumo_credentials.txt with the following contents:<br/>`sumo.accessid=<access id>`<br/>`sumo.accesskey=<access key>`<br/>`proxy.host=<proxy host>`<br/>`proxy.port=<proxy port>`<br/>and pass this file via the command line:<br/>`sudo ./SumoCollector.sh -q -varfile /path/to/sumo_credentials.txt`<br/>Parameters for `-q` and `-dir` must be passed in the command line and cannot be used within a varfile. |
| `-Vcollector.secureFiles=[true|false]` | By default, new Collector installations will use [Enhanced File System Security](enhanced-file-system-security-installed-collectors.md). To disable this feature during installation, use the command line argument:<br/>`-Vcollector.secureFiles=false` |
| `-VrunAs.username=[username]` | When set, the Collector will run as the specified user (Windows and Linux). For Windows, the user account needs `Log on as a Service` permission. |
| `-VwinRunAs.password=[password]` | (Windows only) When set in conjunction with -VrunAs.username, the Collector will run as the specified user with the specified password.<br/>Many operating systems allow a user to list information about processes that are owned by other users. This information could include command line arguments. For enhanced security, we recommend using the `-varfile` option to specify Windows RunAs password. |

## Authentication parameters

The following table shows parameters that relate to authenticating the
Collector.

| Parameter | Description |
|:--|:--|
| `-VskipRegistration=[boolean]` | When specified as `true` the installer will skip registration.<br/>Collectors will normally register with Sumo Logic during the installation process, but you can pass the `‑VskipRegistration=true` flag to skip registration. This way, the Collector is installed as a service that will start and register automatically when the instance is launched. |
| `-Vsumo.accessid=[accessId]`<br/>`-Vsumo.accesskey=[accessKey]` | An authentication option is required, either this option or the token option (see next entry in this table). If you have a Sumo Logic access ID and access key, include both. `-Vsumo.accessid` and `-Vsumo.accesskey` Admins can generate an access ID/access key pair on the Preferences page in the Web application. See [Access Keys](/docs/manage/security/access-keys.md).<br/>Many operating systems allow a user to list information about processes that are owned by other users. This information could include command line arguments. For enhanced security, we recommend using the -varfile option to specify Sumo Logic credentials. |
| `-Vsumo.token_and_url=[token]` | An authentication option is required, either this option or the access ID/access key option (see the above entry in the table).<br/>Token can be either an [Installation Token](/docs/manage/security/installation-tokens.md) or Setup Wizard Token. |

## user.properties parameters

The command line installer can use all of the parameters available in the [user.properties](user-properties.md) file. To use parameters from user.properties just add a `-V` to the beginning of the parameter without a space character. For example, to use the `sources` parameter you would specify it as `-Vsources`.  

For reference, see the available [user.properties parameters](user-properties.md).

### Parameters with a different format

There are a few parameters from user.properties that require specific
formatting when used with the command line installer.

| user.properties parameter format | Command line installer format |
|:--------------------------------------|:-----------------------------------|
| `name` | `-Vcollector.name ` |
| `url` | `-Vcollector.url` |
| `proxyHost` | `-Vproxy.host ` |
| `proxyPort` | `-Vproxy.port` |
| `proxyUser` | `-Vproxy.user` |
| `proxyPassword` | `-Vproxy.password` |
| `proxyNtlmDomain` | `-Vproxy.ntlmdomain` |

## collector.properties parameters

The command line installer can use any of the parameters available in the [collector.properties](collector-properties.md) file. To use parameters from collector.properties just add a `-V` to the beginning of the parameter without a space character. For example, to use the `source.max.threads.num` parameter you would specify it as `-Vsource.max.threads.num`.

For reference, see the available [collector.properties parameters](collector-properties.md).

<!-- Hidden table

|  Parameter | Type | Description | Default Value |
|:--|:--|:--|:--|
| -Valerts.ttl.min                                   | integer  | Duration in minutes before deleting alerts stored in the Collector directory.                                                                   | 180                                                              |
| -Vaws.metadata.cache.enabled                       | boolean  | Enable fetching and caching AWS-specific local metadata.                                                                                        | true                                                             |
| -Vaws.metadata.cache.fetch.timeout.ms              | integer  | HTTP connection timeout in milliseconds when attempting to fetch AWS-specific local metadata.                                                   | 1000                                                             |
| -Vaws.metadata.cache.url                           | string   | AWS-specific URL to fetch local metadata to cache.                                                                                              | http://169.254.169.254/latest/dynamic/instance-identity/document |
| -Vcollector.backoff.max.timeInMillis               | integer  | Maximum backoff duration in milliseconds for Windows Event Log Sources.                                                                         | 60000                                                            |
| -Vcollector.backoff.min.timeInMillis               | integer  | Initial backoff duration in milliseconds for Windows Event Log Sources.                                                                         | 5000                                                             |
| -Vcollector.connection.fixCount                    | integer  | Specifies a fixed number of connections to establish when sending data to Sumo Logic. Must be less than or equal to `collector.connection.max`. | -1                                                               |
| -Vcollector.connection.max                         | integer  | Maximum number of connections to establish when sending data to Sumo Logic.                                                                     | 3                                                                |
| -Vcollector.localfile.inputType                    | string   | Override for the type of local file reading mechanism. Possible override values include "nonblocking" and "simple".                             | NULL                                                             |
| -Vcollector.localFile.oldFileMaxEps                | integer  | Number of events per second used to determine how long to sleep when monitoring an old file.                                                    | 500                                                              |
| -Vcollector.localFile.oldThresholdMillis           | integer  | Duration in milliseconds after which to move a monitored file to "old" working set.                                                             | 900000                                                           |
| -Vcollector.metrics.dumper.millis                  | integer  | Time period in milliseconds to log Collector metrics and usage information to collector-usage.log.                                              | 600000                                                           |
| -Vcollector.pipeline.maxMessageCount               | integer  | Number of messages to accumulate before flushing the log outbound queue.                                                                        | 1000                                                             |
| -Vcollector.pipeline.maxMessagesSize               | integer  | Size in bytes to accumulate before flushing the log outbound queue.                                                                             | 1048576                                                          |
| -Vcollector.pipeline.metrics.maxMessageCount       | integer  | Number of messages to accumulate before flushing the metrics outbound queue.                                                                    | 1000                                                             |
| -Vcollector.pipeline.metrics.maxMessagesSize       | integer  | Size in bytes to accumulate before flushing the metrics outbound queue.                                                                         | 1048576                                                          |
| -Vcollector.pipeline.metrics.windowSizeMillis      | integer  | Time period in milliseconds to flush the metrics outbound queue.                                                                                | 200                                                              |
| -Vcollector.pipeline.windowSizeMillis              | integer  | Time period in milliseconds to flush the log outbound queue.                                                                                    | 1000                                                             |
| -Vcollector.registration.delay.ms                  | integer  | Delay in milliseconds for Collector registration.                                                                                               | 0                                                                |
| -Vcollector.syslog.udp.readBufferSize              | integer  | Maximum size in bytes to buffer payloads received via UDP with Syslog Sources.                                                                  | 2048                                                             |
| -Vcollector.wildcard.fpSize                        | integer  | Fingerprint size to use (in bytes) when determining new file rotation.                                                                          | 2048                                                             |
| -Vcollector.wildcard.pathMatcher                   | string   | Path expression matcher to use when evaluating file paths.                                                                                      | RegexPathExpressionMatcher                                       |
| -Vcollector.winlog.dcom.connectionTimeout          | integer  | WMI connection timeout in milliseconds for Windows Event Log Sources.                                                                           | 60000                                                            |
| -Vcollector.winlog.dcom.notificationSessionTimeout | integer  | WMI notification session timeout in milliseconds for Windows Event Log Sources.                                                                 | 1800000                                                          |
| -Vcollector.winlog.dcom.querySessionTimeout        | integer  | WMI query session timeout in milliseconds for Windows Event Log Sources.                                                                        | 30000                                                            |
| -Vcollector.winlog.initial.sleep.ms                | integer  | Duration in milliseconds to sleep before checking for missed events between catch up and first notification.                                    | 10000                                                            |
| -Vcollector.winlog.maxThreads                      | integer  | Maximum number of threads to use when processing Windows events.                                                                                | 16                                                               |
| -Vcollector.winlog.queryBatchSize                  | integer  | Number of elements to fetch during catch up for Windows Event Log Sources.                                                                      | 20000                                                            |
| -Vcollector.winlog.queryDoCatchup                  | boolean  | Enable running catchup queries for Windows Event Log Sources.                                                                                   | true                                                             |
| -Vcollector.winlog.queryLongWaitTime               | integer  | Duration in milliseconds to sleep for long queries performed by Windows Event Log Sources.                                                      | 3000                                                             |
| -Vcollector.winlog.queryShortWaitTime              | integer  | Duration in milliseconds to sleep for short queries performed by Windows Event Log Sources.                                                     | 250                                                              |
| -Vcollector.winlog.retryConnection                 | integer  | Duration in milliseconds to wait before retrying a failed connection on Windows Event Log Sources.                                              | 15000                                                            |
| -Vcommand.fetch.maxRetry                           | integer  | Maximum number of times to retry fetching remote commands from Sumo Logic before closing the command channel.                                   | 15                                                               |
| -Vcommand.fetch.retryInterval                      | integer  | Time period in milliseconds to retry fetching remote commands from Sumo Logic.                                                                  | 5000                                                             |
| -Vdocker.apiVersion                                | string   | Override for Docker API version to use when collecting from Docker container sources.                                                           | NULL                                                             |
| -Vdocker.blockProblematicContainerInMs             | integer  | Maximum time in milliseconds to block retry for error-producing Docker container sources.                                                       | 900000                                                           |
| -Vdocker.maxContainerErrorPerMinute                | integer  | Maximum number of error retry attempts per Docker container source.                                                                             | 20                                                               |
| -Vdocker.maxPerContainerConnections                | integer  | Maximum number of Docker container connections to monitor per source.                                                                           | 40                                                               |
| -Vforwarding.hcp.dateStamperFormat                 | string   | Timestamp format to use when forwarding data to a REST sink source.                                                                             | yyyy-MM-dd                                                       |
| -Vforwarding.http.iso8859                          | boolean  | Enable forwarding ISO-8859 entities to a REST sink source.                                                                                      | false                                                            |
| -Vforwarding.syslog.maxMessageSize                 | integer  | Sets the segment size in bytes of forwarded syslog messages.                                                                                    | 1024                                                             |
| -VfreeSpace.threshold.percent                      | integer  | Percentage threshold of free disk space after which the Collector enters flushing mode.                                                         | 10                                                               |
| -Vgraphite.hostname                                | string   | Override the hostname of the syslog server for legacy Graphite sources.                                                                         | NULL                                                             |
| -Vhttp.connectionTimeout                           | integer  | HTTP connection timeout in milliseconds when attempting to send data to Sumo Logic.                                                             | 60000                                                            |
| -Vhttp.socketTimeout                               | integer  | HTTP socket timeout in milliseconds when attempting to send data to Sumo Logic.                                                                 | 60000                                                            |
| -Vhttp.transmitter.retry.sleep.ms                  | integer  | Duration in milliseconds to sleep before retrying sending on connection failure.                                                                | 5000                                                             |
| -VhttpAppender.disable                             | boolean  | Disable diagnostic HTTP appender for Collector logging.                                                                                         | false                                                            |
| -Vjson.sync.sleep.time                             | integer  | Time period in milliseconds to check for changes to the Sources JSON sync file.                                                                 | 1000                                                             |
| -Vjson.sync.waiting.after.fail                     | integer  | Duration in milliseconds to wait before retrying to sync to a JSON source sync file after failure.                                              | 600000                                                           |
| -Vlocal.win.event.collection.flag                  | string   | Override for the type of local Windows event collection. Possible override values include "0" for legacy mode.                                  | NULL                                                             |
| -Vlocal.win.event.collection.legacy                | string   | Override for the type of local Windows event collection. Possible override values include "1" for legacy mode.                                  | NULL                                                             |
| -VlocalWindowsEventLog.batchSize                   | integer  | Number of elements to fetch per batch for Windows Event Log Sources.                                                                            | 512                                                              |
| -VlocalWindowsEventLog.sleepIntervalMs             | integer  | Sleep time in milliseconds to wait in between fetching events for Windows Event Log Sources.                                                    | 0                                                                |
| -VLogSender.pause.override                         | boolean  | Pause sending HTTP data from the log sender to Sumo Logic.                                                                                      | false                                                            |
| -Vmetadata.cache.expiration.sec                    | integer  | Duration in seconds to expire and retry fetching local metadata cached by the Collector.                                                        | 600                                                              |
| -VMetricsSender.pause.override                     | boolean  | Pause sending HTTP data from the metric sender to Sumo Logic.                                                                                   | false                                                            |
| -Voffline.numRetries                               | integer  | Number of retry attempts before entering offline collection mode on connection failure.                                                         | 3                                                                |
| -Vpaging.lowerbound.mb                             | integer  | Size in megabytes of free storage space available after which the Collector exits flushing mode.                                                | 32                                                               |
| -Vpaging.upperbound.mb                             | integer  | Size in megabytes of free storage space available after which the collector enters flushing mode.                                               | 2048                                                             |
| -VpileAggregator.maxBatchPayloadSize               | integer  | Maximum size in bytes to accumulate to flush aggregated piles for log pipeline.                                                                 | 4194304                                                          |
| -VpileAggregator.maxPiles                          | integer  | Maximum number of piles to aggregate before flushing piles for log pipeline.                                                                    | 5                                                                |
| -VpileAggregator.metrics.maxBatchPayloadSize       | integer  | Maximum size in bytes to accumulate to flush aggregated piles for metrics pipeline.                                                             | 1048576                                                          |
| -VpileAggregator.metrics.maxPiles                  | integer  | Maximum number of piles to aggregate before flushing piles for metrics pipeline.                                                                | 10                                                               |
| -VpileAggregator.metrics.period                    | integer  | Time period in milliseconds to flush aggregated piles for metrics pipeline.                                                                     | 1000                                                             |
| -VpileAggregator.period                            | integer  | Time period in milliseconds to flush aggregated piles for log pipeline.                                                                         | 1000                                                             |
| -Vqueue.checking.interval.sec                      | integer  | Time period in seconds the collector will calculate outbound queue statistics.                                                                  | 300                                                              |
| -Vqueue.max.disk.gb                                | integer  | Size in gigabytes for on-disk outbound queue for log sources.                                                                                   | 3                                                                |
| -Vqueue.max.memory.mb                              | integer  | Size in megabytes for in-memory outbound queue for log sources.                                                                                 | 8                                                                |
| -Vqueue.metrics.max.disk.gb                        | integer  | Size in gigabytes for on-disk outbound queue for metric sources.                                                                                | 1                                                                |
| -Vqueue.metrics.max.memory.mb                      | integer  | Size in megabytes for in-memory outbound queue for metric sources.                                                                              | 8                                                                |
| -Vrefresh.event.session.period                     | integer  | Time period in milliseconds to refresh the event session for Windows Event Log Sources.                                                         | 3600000                                                          |
| -Vrefresh.local.log.names.period                   | integer  | Time period in milliseconds to retrieve log names for new event logs for Windows Event Log Sources.                                             | 86400000                                                         |
| -Vremote.file.connect.retries                      | integer  | Number of retry attempts when connecting to a remote file host.                                                                                 | 3                                                                |
| -Vsource.max.threads.num                           | integer  | Maximum number of threads to use when scanning files for a given source.                                                                        | 6                                                                |
| -Vsource.scan.file.cacheTtl                        | integer  | Maximum time duration in milliseconds before repopulating directory hierarchy.                                                                  | 1800000                                                          |
| -Vssh.host.verify.file                             | string   | File path of SSH host key verification file to use when verifying remote hosts.                                                                 | NULL                                                             |
| -Vstreaming.metrics.hostname                       | string   | Override the hostname of the syslog server for Streaming Metrics source types.                                                                  | NULL                                                             |
| -Vsyslog.dns.cache.timeout                         | integer  | Timeout in milliseconds to resolve DNS host lookup information for Syslog Sources.                                                              | 300000                                                           |
| -Vsyslog.hostname                                  | string   | Host name that identifies the network interface Syslog Sources should bind to.                                                                  | NULL                                                             |
| -Vtcp.syslog.server.socket.timeout.ms              | integer  | Duration in milliseconds socket timeout to use for Syslog Sources. Set to 0 to disable the timeout.                                             | 120000                                                           |
| -VthreadDumps.enabled                              | boolean  | Enable periodic thread dumps to be printed to the collector.log file.                                                                           | false                                                            |
| -VthreadDumps.frequencyMs                          | integer  | Time period in milliseconds to log thread dumps when thread dumps are enabled.                                                                  | 60000                                                            |
| -Vupgrade.auto.enabled                             | boolean  | Enable automatic upgrade check for the Collector.                                                                                               | false                                                            |
| -Vupgrade.check.frequency                          | integer  | Time period in seconds to check for upgrades when automatic upgrades are enabled.                                                               | 3600                                                             |
| -Vwaiting.time.before.stop.thread                  | integer  | Duration in milliseconds to wait before the monitoring of the Sources JSON sync file is stopped.                                                | 15000                                                            |
| -Vwildcard.inputs.handler.removed.input.timeout    | integer  | Duration in milliseconds to wait before the monitoring of an unmodified file is stopped.                                                        | 1800000                                                          |
| -Vwindows.local.jni                                | boolean  | Enable using JNI for local Windows Event Log Sources.                                                                                           | true                                                             |
| -Vwrapper.out.oom                                  | string   | Custom message to log upon OutOfMemory exception from Wrapper.                                                                                  | The JVM has run out of memory.                                   |
| -Vwrapper.out.stop                                 | string   | Custom message to log upon stopping the Wrapper.                                                                                                | Wrapper Stopped                                                  |
-->
