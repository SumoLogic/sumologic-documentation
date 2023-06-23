---
id: collect-multiline-logs
title: Collecting Multiline Logs
description: Sumo Logic Sources can be configured to detect log boundaries automatically or with a regular expression.
---

Sumo Logic Sources by default have multiline processing enabled. Multiline processing is used to ensure a log message that is made up of multiple lines, separated by a line break or carriage return, are properly grouped as a single log message when ingested into Sumo Logic.

Multiline processing requires your logs to have line breaks or carriage returns between messages. If the logs are part of a larger individual message (for example, JSON array or XML) Sumo Logic will in most cases not be able to break these into individual logs.

## Multiline Processing Caveats

Multiline messages that are more than 2,000 lines or 512KB in size will get flushed and collected as single log lines due to the default log message size limitations. Depending on the Collector's available memory, you may be able to increase this limit. Contact Support for assistance by navigating to **Help** > **Support** in the Sumo Logic
menu.

Messages will be further broken down when they are received and indexed. When collecting log messages that are larger than 64KB in size, Sumo Logic slices the messages into a stream of smaller message chunks. Chunks are ideally created at a line break depending on the Source type, protocol, and size of the message. Each section of the large messages is annotated with metadata to keep the message in order when viewing or searching the log. Review the relevant Source's documentation for additional information.

## Multiline Processing Options

Sources have the option to be configured to automatically infer log boundaries or to specify a boundary regular expression that matches the entire first line of each multiline log. These options are called **Infer Boundaries** and **Boundary Regex** in your Source's configuration settings.

* [Infer Boundaries](#infer-boundaries). This option will apply a set of default expressions, which are used to detect the beginning of a new multi-line message. When a message line matches one of these expressions, Sumo Logic waits until the next instance of this same expression, and then groups all lines between them as a single message. 
* [Boundary Regex](#boundary-regex). In some cases, a multiline log message may not have a first line that matches any of the default rules used by Sumo Logic to detect a multiline message. In this case, you will need to specify a regular expression to detect the **entire first line of each new log message** within the file. 

## Infer Boundaries

By default, **Infer Boundaries** is selected when **Multiline Processing** is enabled. The Collector will attempt to detect a common pattern which denotes the first line of a multiline message. The Collector will look at each line coming in from a Source and attempt to match that line to the known expression. If the line matches then the Collector will mark this as the start of a new message and any additional lines that do not match the expression will be assumed as part of that message. Once the Collector detects another line matching the expression it will flush the previous lines as a single message and mark that next line as the start of a new message.

The Collector will attempt to use the first 1,000 lines, or as many lines as appear within 30 seconds, and an algorithm to try and determine a pattern that may denote a new message starting line. **Infer boundaries** works best if the log messages contain a common anchor to start the line, such as a timestamp, and the formatting of the messages being received by the source are in a consistent format.

## Boundary Regex

You can specify the boundary between messages using a regular expression. Enter a regular expression for the full first line of every multi-line message in your log files.

In cases where a single Source is being used to collect multiple different types of files of varying formats or if no consistent pattern is detected within the messages being received then it is possible for each line to be flushed as a single message or some messages to be improperly grouped into a single message.

Even when ingesting a single Source type, auto detection is not guaranteed to work for all cases, this is noted within the Source configuration with the following text: `Please note, Infer Boundaries may not be accurate for all log types`. In this case, a custom **Boundary Regex** expression may be required for detecting the start of each log message.

When the option for **Boundary Regex** is used with the multiline detection the Collector will use the supplied regular expression to try and match the first line of a multiline message.

:::note
The expression supplied must match the entire first line of a message up to, and in some cases including, the trailing line feed or carriage return.
:::

For example, given the following multiline message:

```
2017-07-26 14:39:15,523 -0700 [CPU-ResourceMonitor-1] INFO  com.sumologic.scala.collector.monitoring.CollectorResourceMonitor  - With current users: List(com.sumologic.scala.collector.blade.wildcard.LocalWildcardBlade@18af50d9, com.sumologic.scala.collector.blade.wildcard.LocalWildcardBlade@18af50d4, com.sumologic.scala.collector.blade.wildcard.LocalWildcardBlade@18af50da),  current usage is 0
```

Acceptable boundary expressions may be:

* `^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}.*`
* `.*\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}.*\n`
* `^.*\[CPU-ResourceMonitor-1\].*`

Unacceptable boundary expressions would include the following since they
do not match the entire first line:

* `^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}`
* `[CPU-ResourceMonitor-1\]`

## Multiline FAQs

### How Does Multiline Work With Syslog Sources?

Sumo Logic does not provide any options for multiline detection within Syslog Sources. For Syslog messages received over UDP Sumo Logic will treat all content contained within a single syslog request as a single message.  

When syslog messages are received over TCP Sumo Logic will treat each line within a request as a new message. This is because TCP is received as a data stream and the Collector will flush a message whenever a line feed is detected.

### How Does Multiline Work With HTTP Sources?

Multiline detection on an HTTP source only works within the confines of a single HTTP request. If you send multiple multiline messages within a single HTTP post request the multiline options will apply to those messages. If you send a multiline message as separate POST requests the multiline options do not apply.

Sumo Logic cannot thread together multiple HTTP posts into a single message. This is due to there being no guarantee of the order of receipt (simply the nature of HTTP) and because there is no certainty that multiple clients are not sending to the same HTTP Source, which may cause additional issues with how the order of messages are received.
