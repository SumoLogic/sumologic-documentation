---
id: search-large-messages
title: Search Large Messages
description: When collecting log messages or event logs that are larger than 64KB in size, Sumo Logic slices the messages into a stream of smaller message chunks.
---



When collecting log messages or event logs that are larger than 64KB in size, Sumo Logic slices the messages into a stream of smaller message chunks.

Chunks are ideally created at a line break depending on the Source type, protocol, and size of the message. Each section of the large messages is annotated with metadata to keep the message in order when viewing or searching the log.

See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs.md) for information on caveats and your configuration options.

For additional information on collecting large messages review the relevant [Source's documentation](/docs/send-data/choose-collector-source).

## Query to Identify Truncated Logs 

We have a [metadata](built-in-metadata.md) tag called `_size`. The `_size` metadata tag provides the size of the log message in bytes. A log is truncated at the size of 64K or 65536 bytes.

To find truncated logs you can reference the `_size` metadata tag, an example would be using the where operator.

`| where _size = 65536`
