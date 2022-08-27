---
id: troubleshooting-time-discrepancies
title: Troubleshooting time discrepancies
---

#

In most scenarios, the message time and receipt time of a log message in Sumo Logic should be almost the same, within a minute of each other. However, network latency, random (not continuous) spikes in data volume, and service disruptions can cause delays, leading to a discrepancy between message time and receipt time. Large discrepancies can lead to incorrect events being displayed, and may even cause search performance issues. On some occasions, it can also prevent Dashboards from populating with data.

This page explains the elements that can be involved in time
discrepancies and offers solutions for troubleshooting your problem.

:::tip
See details on the supported [Timestamps, Time Zones, Time Ranges, and Date Formats](../sources/reference-information-sources/time-reference.md).
:::

## Message time and receipt time

* **Message time** represents the time of your log events. This is parsed from your logs by the Collector. When adding a Source to a Collector, most users choose to automatically detect timestamps in their logs and parse them by selecting **Extract timestamp information from log file entries** in the Source configuration settings.
* **Receipt time** is the timestamp the log message was received by the Collector. See Use Receipt Time for details.

:::note
If Enable Timestamp Parsing is not selected for your Source, Sumo Logic automatically sets the message time to be equivalent to the receipt time.
:::

## Time zone configuration

Large time discrepancies are typically related to time zone settings that were specified for a Source during the Collector setup process. When a time zone is incorrectly configured for a data source, it can lead to message time and receipt time discrepancies.

Pay careful attention to the Time Zone specified for a Source. The **Use time zone from log file** option assumes that a time zone is part of the message timestamp and that it is in a supported [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html), as shown below:

| Letter | Date or Time Component | Example |
|--|--|--|
| z | Time zone (General time zone) | Pacific Standard; PST; GMT-08:00 |
| Z | Time zone (RFC 822 time zone) | -0800 |


If no time zone is found in the message, or if the time zone is in an unsupported format, Sumo Logic uses the selected fallback option and applies the appropriate offset to the message time.

## Potential time zone configuration issues

The following scenarios represent common time zone-related configuration issues for Sumo users. Review these use cases for insights into potential issues with your time zone configuration.

### Example 1 - Unsupported Time Zone format in File

```
Source Time Zone selection: UTC  
Sample Message Timestamp: Sep 28 19:00:00 US/Pacific
```

In this scenario, “US/Pacific” is not in a valid time zone format, so instead of using GMT-08:00,  Sumo Logic applies the UTC time zone. And because of this mismatch, when users run a search for the “last 15 minutes”, the events being retrieved are inaccurate.

### Example 2 - Improperly configured Time Zone configuration

```
Source Time Zone selection: None Selected (”Select a Time Zone” appears in the UI)
Sample Message Timestamp: Sep 28 19:00:00
```

In this scenario, there is no time zone in the sample message at all. However, the server where the logs were sourced from is located in Los Angeles, so the *expectation* is that the time zone is GMT-08:00. Because no time zone option was actually selected for the Source,  Sumo Logic applies the default UTC  time zone to these messages. And similar to the first example, when users run a search for the “last 15 minutes”, the events being retrieved are inaccurate.

## Troubleshooting a misconfigured time zone

If you are experiencing apparent delays during ingest (receiving data), select the "Use Receipt Time" check box under the time picker. This will present data in the order in which it was received by Sumo, as well as display the timestamp that has been detected/applied.

![UseReceiptTime_chekcbox.png](/img/send-data/UseReceiptTime_chekcbox.png)

A gap between the two values indicates a potential misconfiguration of the time zone setting, particularly when the gap is (nearly) a multiple of hours, such as in the following example.

![TimeDiscrepancy.png](/img/send-data/TimeDiscrepancy.png)

Review your time zone settings, and apply a time zone on the Source that reflects what the time zone is of the sending application. For example, if your application is sending events with a UTC timestamp, you can specify this in the Source configuration.

## Finding timestamp deltas

The query below can be executed in your account to find the number of messages for each of your Sources where the receipt time and message time are more than 30 minutes apart. This should at least give you a good starting place for you to run additional analysis.

```sql
*
| _receiptTime as r
| _messageTime as t
| t - r as d
| toInt(d) as i
| abs(i) as i
| 30 as minutes
| minutes * 60 * 1000 as milliseconds
| where i > milliseconds
| formatDate(fromMillis(r),"MM/dd hh:mm") as r
| formatDate(fromMillis(t),"MM/dd hh:mm") as t
| count by _collector, _source
| order by _count
```

After identifying a list of (problematic) Sources in the previous search, you can then use the query below to view the time delay average, the max delay, and the min delay for each Source. Substitute `<problem_child>` with the Source(s) that you uncovered in the initial query above.  

```sql
_source=<problem_child>
| _format as format
| formatDate(fromMillis(_receipttime),"MM/dd hh:mm") as r
| formatDate(fromMillis(_messagetime),"MM/dd hh:mm") as t
| abs(_receipttime - _messagetime) as delt| delt/1000/60 as delt
| min(delt), max(delt), avg(delt), stddev(delt), count(*) by _collector, _sourcename
```

If the average, max, and min delay values are very close in range, then the time difference is most likely the symptom of an incorrect time zone setting. You’ll want to go back and ensure that your Source configurations line up correctly with the log messages. Switch to the raw messages tab and the “format” field shows how the timestamp is parsed from the file.

For both searches above, it’s a good idea to use a relative time range that locates messages over the last 30 minutes based on receipt time.
