---
id: search-large-messages
title: Search Large Messages
description: When collecting log messages or event logs that are larger than 256KB in size, Sumo Logic slices the messages into a stream of smaller message chunks.
---



When collecting log messages or event logs that are larger than 256KB in size, Sumo Logic slices the messages into a stream of smaller message chunks.

Chunks are ideally created at a line break depending on the Source type, protocol, and size of the message. Each section of the large messages is annotated with metadata to keep the message in order when viewing or searching the log.

See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs.md) for information on caveats and your configuration options.

For additional information on collecting large messages review the relevant [Source's documentation](/docs/send-data/choose-collector-source).

## Query to Identify Truncated Logs 

We have a [metadata](built-in-metadata.md) tag called `_size`. The `_size` metadata tag provides the size of the log message in bytes. A log is truncated at the size of 256K or 262144 bytes.

To find truncated logs you can reference the `_size` metadata tag, an example would be using the where operator.

`| where _size = 262144`

## Known limitations

Keep the following limitations in mind when you work with messages larger than 64KB:

- **LogCompare and LogReduce**. These operators truncate raw 256KB messages to 64KB before matching and grouping the logs into signatures, so content beyond 64KB is not considered. This can also affect response time when you run them against large messages. Learn more in [LogReduce](/docs/search/behavior-insights/logreduce/) and [LogCompare](/docs/search/behavior-insights/logcompare/).
- **Log Search messages table**. When you view large messages, the messages table displays up to 25 messages per page.
- **Cloud SIEM**. Parsing and mapping might not process messages larger than 64KB correctly.
- **Field Extraction Rules**. The cumulative size of all fields extracted by a rule for a message is limited to 64KB, regardless of the message size. Learn more in [Field Extraction Rule limitations](/docs/manage/field-extractions/create-field-extraction-rule/#limitations).
