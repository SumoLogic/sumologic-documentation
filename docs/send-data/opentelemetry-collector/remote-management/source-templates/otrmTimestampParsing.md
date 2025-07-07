---
id: otrm-time-reference
title: Timestamps, Time Zones, and Date Formats
description: Learn how Sumo Logic manages timestamps, time zones, and dates, and the configuration options that are available with OTRM source templates.
keywords:
  - time
  - time reference
  - time zone
  - time zone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

We support several options for timestamps, time zones, time ranges, and dates. When collecting log data, the timestamp attached to messages is vital, both for the integrity of the data in your account, and for accurate query results.

Because of the importance of timestamps, Sumo Logic indexes the timestamp of each message, making sure that data relevant to a query’s time range is returned properly in search results, which allows you to reconstruct a correct event timeline.

## Timestamps

Timestamp is the part of a log message that marks the time that an event occurred. During ingestion, we can detect the message timestamp, convert it to Unix epoch time (the number of milliseconds since midnight, January 1, 1970 UTC), and index it. The timestamp is parsed either using the default timestamp parsing settings, or a custom format that you specify, including the time zone.

When configuring a source template, specify a custom format to parse timestamps in your log messages. 

:::note
Currently, only `strptime` timestamp are supported in the source templates.
:::

### Timestamp considerations

By default, we can automatically detect timestamps in your log messages. Automatic detection identifies timestamps in common formats and prefers timestamps that appear early in the message.

If your log messages from a source contain multiple timestamps, timestamps in unusual formats, or a mix of distinct timestamp formats, you have two options:

* Configure a Source template for each log format.
* Configure a custom timestamp format for your Source template.

## Specifying a custom timestamp format and time zone

OpenTelemetry Collectors can automatically parse most timestamps without any issues. However, if you see timestamp parsing issues, you can manually specify the timestamp format in the Sumo Logic UI when configuring a new Source template or editing the timestamp information for an existing Source template.

1. Perform one of the following steps:
   * If you're configuring a new Source template, proceed to step 2. Or,
   * To edit the timestamp settings for an existing Source template, navigate to the source template. Then click on **Edit**, to the right of the Source name and go to step 2.<br/><img src={useBaseUrl('img/send-data/source-template-edit.png')} alt="Screenshot showing the editing interface for a source template in Sumo Logic, highlighting the section for editing advanced options including timestamp settings" style={{border: '1px solid gray'}} width="600"/>
1. Navigate to the **Timestamp Parsing** section.<br/><img src={useBaseUrl('img/send-data/st-timestamp-parsing.png')} alt="Screenshot of the Timestamp parsing section for logs in Sumo Logic, focusing on the timestamp format settings" style={{border: '1px solid gray'}} />
1. Select **Specify the format** options,
1. **Timestamp locator**. Use a [Go regular expression](https://github.com/google/re2/wiki/Syntax) to match the timestamp in your logs. Ensure the regular expression includes a named capture group called `timestamp_field`.
1. **Format**. Specify the exact layout of the timestamp to be parsed. For example, `- %Y-%m-%dT%H:%M:%S.%LZ`. To learn more about the formatting rules, refer to [this guide](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/internal/coreinternal/timeutils/internal/ctimefmt/ctimefmt.go#L68).
1. **Select Timezone**. Define the geographic location (timezone) to use while parsing a timestamp that does not include a timezone. The available locations depend on the local IANA Time Zone database. For example, `America/New_York`. For more examples, refer to the [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
<br/><img src={useBaseUrl('img/send-data/specify-timestamp-format.png')} alt="Screenshot illustrating the process of specifying a custom timestamp format in the Sumo Logic UI" style={{border: '1px solid gray'}} width="300"/>

### Using _format for troubleshooting

You can use `_format` to see how the timestamp is parsed from the log file. Assign `_format` an alias to return it in your search results, for example: 

```sql
| _format as timestampFormat
```

The fields returned in the search results of `_format` are:

```sql
t:<parse type>,o:<offset>,l:<length>,p:<date_format>
```

where `<parse type>` can take the below mentioned values:

* `fail`. Failed to locate timestamp.
* `cache`. Success, cached format.
* `def`. Success, default (user-specified) format.
* `full`. Success, from "full" parsing against library of patterns.
* `none`. Local/receipt time because timestamp parsing is not enabled for this source.
* `ac1`. Auto-corrected by the "window-based" heuristic (what we call "auto-correction" today). Sumo Logic assumes that all log messages coming from a particular Source will have timestamps that are close together. If a message comes through that appears to be more than one day earlier or later than recent messages from that source, it will be auto-corrected to match the current time. You can stop this auto-correction by explicitly configuring a custom timestamp format on your Source. For example, assume the Collector parses the timestamp "Dec **2**, 2021 2:39:58 AM". If the previously received message from that Source has a timestamp prior to "Dec **1**, 2021 2:39:58 AM" or after "Dec **3**, 2021 2:39:58 AM", the Collector will auto-correct the timestamp to the current time.
* `ac2`. Auto-corrected by the -1y, +2d heuristic. Sumo Logic assumes that all log messages coming from a particular Source will have timestamps that are within a window of -1 year through +2 days compared to the current time. Any log message with a parsed timestamp outside of that window is automatically re-stamped with the current time. For example, assume the Collector parses the timestamp "Dec 2, **2021** 2:39:58 AM". If the previously received message from that Source is prior to "Dec 1, **2020** 2:39:58 AM" or after "Dec 4, **2021** 2:39:58 AM", the Collector will auto-correct the timestamp to the current time.

#### Example

When you’re troubleshooting issues related to timestamp, you can run a query similar to this to see how the timestamp is parsed:

```sql
_sourceCategory=PaloAltoNetworks
| _format as timestampformat
```

The result would look like this: <br/><img src={useBaseUrl('img/send-data/format.png')} alt="Screenshot showing the format parsing results, illustrating how the timestamp is parsed from a log file" width="600"/>

### Timestamp format examples

The following conventions are some example of the supported formats for `strptime` in OpenTelemetry collector:

| `strptime` Format | Example |
|-------------------|---------|
| `%Y-%m-%d'T'%H:%M:%S*%f%z` | 2023-08-20'T'13:20:10*633+0000 |
| `%Y %b %d %H:%M:%S.%f %Z` | 2024 Mar 03 05:12:41.211 PDT |
| `%b %d %H:%M:%S %z %Y` | Jan 21 18:20:11 +0000 2023 |
| `%d/%b/%Y:%H:%M:%S %z` | 19/Apr/2023:06:36:15 -0700 |
| `%b %d, %Y %l:%M:%S %p` | Dec 2, 2023 2:39:58 AM |
| `%b %d %Y %H:%M:%S` | Jun 09 2023 15:28:14 |
| `%b %d %H:%M:%S %Y` | Apr 20 00:00:35 2010 |
| `%b %d %H:%M:%S %z` | Sep 28 19:00:00 +0000 |
| `%b %d %H:%M:%S` | Mar 16 8:12:04 |
| `%Y-%m-%dT%H:%M:%S%z` | 2023-10-14T22:11:20+0000 |
| `%Y-%m-%d %H:%M:%S %z` | 2023-08-19 12:17:55 -0400 |
| `%Y-%m-%d %H:%M:%S%z` | 2023-08-19 12:17:55-0400 |
| `%Y %b %d %H:%M:%S.%f*%Z` | 2023 Apr 13 22:08:13.211*PDT |
| `%Y %b %d %l:%M:%S` | 2023 Mar 10 1:44:20 |
| `%Y-%m-%d %H:%M:%S,%f%z` | 2023-03-10 14:30:12,655+0000 |
| `%Y-%m-%d %H:%M:%S` | 2023-02-27 15:35:20 |
| `%Y-%m-%d %H:%M:%S.%f%z` | 2023-03-12 13:11:34.222-0700 |
| `%Y-%m-%d'T'%H:%M:%S.%f` | 2023-07-22'T'16:28:55.444 |
| `%Y-%m-%d'T'%H:%M:%S` | 2023-09-08'T'03:13:10 |
| `%Y-%m-%d'T'%H:%M:%S'%z` | 2023-03-12'T'17:56:22'-0700' |
| `%Y-%m-%dT%H:%M:%S.%f%z` | 2023-11-22'T'10:10:15.455 |
| `%Y-%m-%d'T'%H:%M:%S` | 2023-02-11'T'18:31:44 |
| `%Y-%m-%d*%H:%M:%S:%f` | 2023-10-30*02:47:33:899 |
| `%Y-%m-%d*%H:%M:%S` | 2023-07-04*13:23:55 |
| `%y-%m-%d %H:%M:%S,%f %z` | 23-02-11 16:47:35,985 +0000 |
| `%y-%m-%d %H:%M:%S,%f` | 23-06-26 02:31:29,573 |
| `%y-%m-%d %H:%M:%S` | 23-04-19 12:00:17 |
| `%m/%d/%y %l:%M:%S` | 06/01/23 4:11:05 |
| `%m%d%y %H:%M:%S` | 220423 11:42:35 |
| `%Y%m%d %H:%M:%S.%f` | 20230423 11:42:35.173 |
| `%m/%d/%y*%H:%M:%S` | 08/10/23*13:33:56 |
| `%m/%d/%Y*%H:%M:%S` | 11/23/2023*05:13:11 |
| `%m/%d/%y %H:%M:%S %z` | 04/23/23 04:34:22 +0000 |
| `%m/%d/%Y %H:%M:%S %z` | 10/03/2023 07:29:46 -0700 |
| `%H:%M:%S` | 11:42:35 |
| `%H:%M:%S,%f` | 11:42:35,173 |
| `%d/%b %H:%M:%S,%f` | 23/Apr 11:42:35,173 |
| `%d/%b/%Y:%H:%M:%S` | 23/Apr/2023:11:42:35 |
| `%d/%b%Y %H:%M:%S` | 23/Apr/2023 11:42:35 |
| `%d-%b-%Y %H:%M:%S` | 23-Apr-2023 11:42:35 |
| `%d-%b-%Y %H:%M:%S` | 23-Apr-2023 11:42:36 |
| `%d %b %Y %H:%M:%S` | 23 Apr 2023 11:42:35 |
| `%d %b %Y %H:%M:%S*%f` | 23 Apr 2023 10:32:35*311 |
| `%m%d_%H:%M:%S` | 0423_11:42:35 |
| `%m%d_%H:%M:%S.%f` | 0423_11:42:35.883 |
| `%q/%g/%Y %l:%M:%S %p:%f` | 8/5/2023 3:31:18 AM:234 |
| `%q/%d/%Y %I:%M:%S %p` | 9/28/2023 2:23:15 PM |

### Timezone considerations

The following considerations apply to timezones:

* We highly recommend that the timezone be set explicitly on any source template where the logs does not have a timezone available. Sumo Logic always attempts to determine the timezone for the Source. However, if that is not possible, the timezone will revert to UTC. In these cases, the timezone will be incorrect, and that could significantly affect forensic analysis and reporting.

### Default timezone

By default, we use the timezone from your web browser set by the operating system to display hours and minutes everywhere in our user interface. You can change the default timezone that the user interface displays by adjusting the **Default Timezone** setting on the **Preferences** page. This option overrides the timezone from your web browser, and changes how hours and minutes are displayed in the UI. But this is a personal setting, and does not change the timezone for anyone else in your organization.

UI elements that are affected by this setting include:

- **Time Range** field in the **Search** page
- **Time** column of the **Messages** pane
- Dashboards
- Anomaly Detection

Changing the **Default Timezone** setting affects how the UI displays messages, but not the actual timestamp in the log message.

For example, the following screenshot shows the timezone set to **PST** in the UI, in the **Time** column. The logs were collected from a system that was also configured to use the **PST** timezone, which is displayed in the timestamp of the **Message** column. The timestamps in both columns match as they are set to the same timezone.

<img src={useBaseUrl('img/send-data/timezone_PST.png')} alt="Screenshot demonstrating log timestamps displayed in Pacific Standard Time (PST) in the Sumo Logic UI" width="500" />

The next screenshot shows the same search result after changing the Default Timezone setting to UTC. Now the Time column is displayed in UTC, while the Message column retains the original timestamp, in PST.

<img src={useBaseUrl('img/send-data/timezone_UTC.png')} alt="Screenshot showing the same log timestamps now displayed in Coordinated Universal Time (UTC) after changing the default timezone setting" width="500"/>

In another example, if your timezone is set to **UTC**, and you share a Dashboard with another user who has their tim zone set to **PST**, what will they see?

They will see the same data, just displayed using their custom set timezone. For example, if you have a Panel that uses a time series, the timeline on the X axis of your chart is displayed in your timezone, **UTC**. The other user will see the timeline on the X axis displayed in their timezone, **PST**. But the data displayed in the chart is exactly the same.

<img src={useBaseUrl('img/send-data/timezone_dashboards_compare.png')} alt="Screenshot comparing how dashboards display timezones differently for users with custom timezone settings, highlighting the same data shown in different timezones." width="600"/>
