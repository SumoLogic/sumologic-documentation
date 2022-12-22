---
id: define-boundary-regex-multiline-messages
title: Define Boundary Regex for Multiline Messages
description: By default, Sumo Logic Sources have multiline processing enabled, which is useful when logs contain messages that span multiple lines separated by line breaks, such as a stack trace.
---



For details on how the Collector processes multiline logs see [Collecting MultilineLogs](/docs/send-data/reference-information/collect-multiline-logs.md)

By default, Sumo Logic Sources have multiline processing enabled, which is useful when logs contain messages that span multiple lines separated by line breaks, such as a stack trace. This way, the Source can detect when a log message spans multiple lines and then indexes this message as a single message.

If you want your Source to treat each log line as a separate message, you can deselect this option, **Detect messages spanning multiple lines**. 

![img](/img/send-data/multiline.png)

Multi-line processing gives you two primary options:

* **Infer Boundaries** - This option will apply a set of default expressions, which are used to detect the beginning of a new multi-line message. When a message line matches one of these expressions, Sumo Logic waits until the next instance of this same expression, and then groups all lines between them as a single message. 
* **Boundary Regex** - In some cases, a multiline log message may not have a first line that matches any of the default rules used by Sumo Logic to detect a multiline message. In this case, you will need to specify a regular expression to detect the **entire first line of each new log message** within the file. 

Given the following sample log messages:

```
 [2014-05-20 11:00:00.000] - INFO This is the first message [2014-05-20 11:00:01.000] - INFO This is the second message line2 of the second message line3 of the second message [2014-05-20 11:00:02.000] - INFO this is the third message
```

You could use the following boundary regular expression to detect the **first full line of each distinct message**:

```
^\[\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3}\].*
```

The boundary regular expression must match the entire first line of each distinct message. 

This expression uses the timestamp format found at the beginning of each new message to define that message as the start for the multiline logs. Note again that the regular expression supplied must match the entire first line of each message from your logs so the **.\*** at the end of the expression is used to detect the rest of the line.

For information on Multiline Options in HTTP Sources, see [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). 
