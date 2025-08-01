---
id: otlp
title: OTLP/HTTP Source
description: Use an HTTP OTLP Source to collect OTLP formatted Logs, Metrics, and Traces data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

An OTLP/HTTP Source is an endpoint for receiving OTLP-formatted Logs, Metrics, and Traces. This is an alternative option to installing an OpenTelemetry Collector for sending OTLP data to Sumo Logic.

## Tracing Prerequisites

As indicated [here](/docs/apm/traces/quickstart/#prerequisites), the following prerequisites apply before Sumo Logic can accept tracing data:

| Account Type | Account Level |
|:--|:--|
| Credits | Enterprise Operations and Enterprise Suite. Essentials get up to 5 GB a day. |

## Create an OTLP/HTTP Source

To configure an OTLP/HTTP Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **OTLP/HTTP**. <br/> <img src={useBaseUrl('img/send-data/OTLP-HTTP-source-icon.png')} alt="OTLP:HTTP source icon" width="100"/>
1. Enter a **Name** for the Source. A description is optional. <br/> ![OTLP:HTTP basic configuration settings.png](/img/send-data/OTLP-HTTP-basic-configuration-settings.png)
1. (Optional) For **Source Host** and **Source Category**, enter any string to tag the output collected from the source. These are [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields that allow you to organize your data.
1. **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. Set any of the following under **Advanced Options for Logs**: <br/> ![OTLP advanced options part 1.png](/img/send-data/OTLP-advanced-options-part-1.png)
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference for more information.
1. [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule) you'd like for the OTLP/HTTP Source. <br/>  ![OTLP processing rules.png](/img/send-data/OTLP-processing-rules.png)
1. When you are finished configuring the Source, click **Save**.

:::note
* Metrics reported with a timestamp older than 24 hours ago or newer than 24 hours in the future from the time they are reported are dropped. Make sure that the Metrics sent to OTLP Endpoint have appropriate timestamps.
* Sumo Logic enforces limits on the volume of metrics and associated metadata you ingest. For more information, see [Data Limits for Metrics](/docs/metrics/manage-metric-volume/data-limits-for-metrics).
:::

### View the endpoint URL

If you need to access the Source's URL again, click **Show URL**.

![img](/img/send-data/show-url-traces.png)

## Using the OTLP/HTTP Source

### Data differentiation

When you set up an OTLP/HTTP Source, a unique URL is assigned to the Source. The exporter automatically appends the specific signal type when sending the data, as described by [OpenTelemetry Protocol Exporter specification](https://github.com/open-telemetry/opentelemetry-specification/blob/v1.10.0/specification/protocol/exporter.md).
The following table shows the URL format based on data types.

| Data Type | URL Format                |
|:-----------|:---------------------------|
| Logs      | `<source_url>/v1/logs`    |
| Metrics   | `<source_url>/v1/metrics` |
| Traces    | `<source_url>/v1/traces`  |


### OTLP/HTTP Exporter

To use the URL, include the url in otlphttp exporter of OpenTelemetry Collector and refer it in the pipelines, as needed. The exporter will automatically attach the signal type suffix:

```
exporters:
  otlphttp:
    endpoint: <source_url>

...

service:
  pipelines:
    logs:
      ...
      exporters: [otlphttp]
    metrics:
      ...
      exporters: [otlphttp]
    traces:
      ...
      exporters: [otlphttp]
```

### Alternative

It is also possible to optionally configure per-signal URL, e.g.

```
exporters:
  otlphttp:
    traces_endpoint: <source_url>/v1/traces
    metrics_endpoint: <source_url>/v1/metrics
    logs_endpoint: <source_url>/v1/logs

...

service:
  pipelines:
    logs:
      ...
      exporters: [otlphttp]
    metrics:
      ...
      exporters: [otlphttp]
    traces:
      ...
      exporters: [otlphttp]
```

### Auto-Instrumentation

If your application is configured using [OpenTelemetry auto-instrumentation](https://opentelemetry.io/docs/concepts/instrumenting/#automatic-instrumentation), you can also configure the OTLP endpoint using environment variables:
```bash
export OTEL_METRICS_EXPORTER=otlp
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_ENDPOINT=<source_url>
```

## JSON schema

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| `name` | String | Yes | `null` | Type a desired name of the source. The name must be unique. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| `automaticDateParsing` | Boolean | No | True | Determines if timestamp information is parsed or not. Type `true` to enable automatic parsing of dates (the default setting); type `false` to disable. If disabled, no timestamp information is parsed at all. | |
| `multilineProcessingEnabled` | Boolean | Yes | False | Type true to enable; type false to disable. The default setting is true. Consider setting to false to avoid unnecessary processing if you are collecting single message per line files (for example, Linux system.log). If you're working with multiline messages (for example, log4J or exception stack traces), keep this setting enabled. | |
| `useAutolineMatching` | Boolean | Yes | False | Type true to enable if you'd like message boundaries to be inferred automatically; type false to prevent message boundaries from being automatically inferred (equivalent to the Infer Boundaries option in the UI). The default setting is true. | |
| `contentType` | String | No | False | Defined based on the Source you are creating. | |
| `forceTimeZone` | Boolean | No | False | Type `true` to force the Source to use a specific time zone, otherwise type `false` to use the time zone found in the logs. The default setting is false. | |
| `cutoffTimestamp` | Long | No | 0 (collects all data) | Only collect data from files with a modified date more recent than this timestamp, specified as milliseconds since epoch. | |
| `encoding` | String | No | UTF-8 | Defines the encoding form. Default is "UTF-8"; options include "UTF-16"; "UTF-16BE"; "UTF-16LE". | |
| `messagePerRequest` | Boolean | Yes | | When set to `true`, only a single message will be sent for each HTTP request. To disable this feature, set to `false`. You need to specify the common parameter `multilineProcessingEnabled` as false when setting `messagePerRequest` to `true`. | |
| `sourcetype` | String | Yes | | HTTP source | |

### JSON example

``` json
{
  "api.version":"v1",
  "source":{
    "name":"OTLP_HTTP_SOURCE",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":false,
    "useAutolineMatching":false,
    "contentType":"Otlp",
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "fields":{
      
    },
    "messagePerRequest":false,
    "sourceType":"HTTP"
  }
}
```