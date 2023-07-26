---
id: collector-logs
title: Collector Logs
sidebar_label: Collector Logs
description: Installed Collectors store log events locally.
---

Installed Collectors store log events in its installation directory under the '**/logs**' directory. These logs are useful when troubleshooting collection issues.

## QuotaEnforcer

Collectors use a "QuotaEnforcer" mechanism to determine if an account should be [throttled](/docs/manage/ingestion-volume/log-ingestion.md) based on the contract terms of the account and the overall amount of data that is being sent across your Collectors. These log messages will be written in the Collector logs on a regular basis, every 10 seconds, and show how much volume (quota) the Collector is currently able to send to the service for a period of time. The following is an example QuotaEnforcer log message:

```
018-01-29 09:57:49,637 -0500 [QuotaEnforcer] INFO  com.sumologic.scala.collector.quota.BlockingQuotaEnforcer - BlockingQuotaEnforcer(Inputs) - Requested: 3 MB (368 KB/s). Remaining capacity: 81 MB (until Mon Jan 29 09:56:49 EST 2018)
```

These messages have two important pieces of information:

* **Requested** - This is the amount of data the Collector has sent to the service since the last quota message.

    ```
    Requested: 3 MB (368 KB/s).
    ```

* **Remaining capacity** - This is the amount of data the Collector can currently send to the service based on the current ingest rates. The time in this value is the next time the Collector can request additional quota.

    ```
    Remaining capacity: 81 MB (until Mon Jan 29 09:56:49 EST 2018)
    ```

Only if the Remaining capacity has dropped close to "0.0 MB" and the date in this message is showing a time that is in the future, compared to the time the message was created, should you need to be concerned about any throttling occurring within the account.

## Collector Version

To check the version of the Collector: 

1. Go to the collector's **\[install_directory\]/logs** directory. For example, **/opt/SumoCollector/logs**, **/usr/local/SumoCollector/logs** or **C:\\Program Files\\Sumo Logic Collector\\logs**. (32 bit Windows systems store program files under **C:\\Program Files (x86)\\Sumo Logic Collector\\logs**.)
1. View the **collector.out.log** file.
1. You will find a Sumo Logic banner that contains the version number, as shown.

:::note
You may also view an Installed Collector's version on the Collection page.
:::

## Log Rotation Settings

The Collector uses the log4j2 framework. You can tailor log rotation behavior for collector.log by editing the **log4j2.xml** file in the collector’s '**/config**' directory.

The default settings in the rolling file appender section for collector.log are: 

```
<Policies>
  <SizeBasedTriggeringPolicy size="5 MB"/>
</Policies>
<DefaultRolloverStrategy max="10"/>
```

With the default settings, Sumo will allow 10 rotations of the collector.log file, creating collector.log, collector.log.1, collector.log.2, up to collector.log.9. Logging will rotate when a file reaches 5 MB.

Once 10 rotations have occurred, resulting in a total space used of 50 MB, the oldest log file data is dropped. 
