---
id: built-in-metadata
---

# Built-in Metadata

Sumo Logic has several metadata fields that are automatically tagged to
ingested data. These metadata fields are referenced by the service in
many ways, such as the user interface when managing Collection, and can
be referenced in search queries.

#### Built-in metadata fields

You can run queries using any of the following built-in metadata fields:

|                   |                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**          | **Description**                                                                                                                                                                                                                                                                                                                                                                                                       |
| `_collector`      | The name of the Collector (set when the Collector was installed) that received the log message.                                                                                                                                                                                                                                                                                                                       |
| `_messageCount`   | A sequence number (per Source) added by the Collector when the message was received.                                                                                                                                                                                                                                                                                                                                  |
| `_messageTime`    | The parsed timestamp by the Collector from the log message in milliseconds. If the message doesn't have a timestamp, messageTime uses the receiptTime.                                                                                                                                                                                                                                                                |
| `_raw`            | The raw log message.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `_receiptTime`    | The time the Collector received the message in milliseconds.                                                                                                                                                                                                                                                                                                                                                          |
| `_size`           | The size of the log message in bytes.                                                                                                                                                                                                                                                                                                                                                                                 |
| `_source`         | The name of the Source, determined by the name you entered when you [configured the Source](../../../03Send-Data/Sources.md "Sources").                                                                                                                                                                                                                                                                               |
| `_sourceCategory` | The category of the Source that collected the log message. This can be a maximum of 1,024 characters.                                                                                                                                                                                                                                                                                                                 |
| `_sourceHost`     | The host name of the Source. For local Sources the name of the Source is set when you [configure the Source](../../../03Send-Data/Sources.md "Sources"). For remote Collectors, this field uses the remote host's name. The `_sourceHost` metadata field is populated using a reverse DNS lookup. If the name cannot be resolved, `_sourceHost` is displayed as `localhost`. This can be a maximum of 128 characters. |
| `_sourceName`     | The name of the log file, determined by the path you entered when you [configured the Source](../../../03Send-Data/Sources.md "Sources").                                                                                                                                                                                                                                                                             |
| `_format`         | The pattern used for parsing the timestamp. See [here](../../../03Send-Data/Sources/04Reference-Information-for-Sources/Timestamps,-Time-Zones,-Time-Ranges,-and-Date-Formats.md "Timestamps, Time Zones, Time Ranges, and Date Formats") for more details.                                                                                                                                                           |

## Searching metadata

Searching metadata fields follow the same rules as [Keyword Search
Expressions](../How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expressions").
To run a search using metadata fields:

1.  As part of the keyword expression before the first pipe, enter the
    metadata field name.
2.  Add an equals sign (=).
3.  Add the metadata value you want to search against. A few tips:
    -   Add wildcards at the front and back of any partial term or
        string to capture the most results.
    -   If your metadata value contains spaces wrap it in quotes.
    -   Quotes and wildcards cannot be used together.
    -   Metadata tags are case-insensitive when searching.

This table shows some examples and a description of each metadata type.

[TABLE]

In the **Messages** tab, each message displays its metadata tags:  
 

![](../../static/img/Get-Started-with-Search/Search-Basics/Built-in-Metadata/msg-with-metadata.png)

## Search different values of a metadata field in the same query

To search more than one value of the same metadata field, you can use
the conditional operator OR.

Metadata fields follow the same rules as [Keyword Search
Expressions](../How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expressions").

For example:

`(_sourceCategory=*apache* or _sourceCategory="Security Logs")`
