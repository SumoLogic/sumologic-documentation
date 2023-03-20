---
id: troubleshooting
title: Troubleshooting HTTP Sources
sidebar_label: Troubleshooting
---


## Check HTTP status codes

If you believe some data that was uploaded to a source was not ingested, check the HTTP status codes for requests sent to the source. Each request should receive a 200 status code indicating the data was successfully received by Sumo. Status codes other than 200 may indicate an issue with the HTTP source. Key status codes are listed below.

| Status Code | Description |
|:--|:--|
| `200` | HTTP request received and processed successfully. |
| `401` | HTTP request was rejected due to missing or invalid URL token. |
| `408` | HTTP request was accepted, but timed out processing. For more information, see [Request Timeouts](#request-timeouts). |
| `429` | HTTP request was rejected due to quota-based throttling. For more information, see [Throttling](#throttling), below. |
| `503` | HTTP request was rejected due to server issues. Check the **Status** page in the Sumo web app (**Manage > Collection > Status**) for information about collector status. |
| `504` | HTTP request was rejected due to server issue. Check the **Status** page in the Sumo web app (**Manage** > **Collection** > **Status**) for information about collector status. |

## Client not sending data

You can use Live Tail to check whether a specific HTTP Source is receiving data. For instructions, see [Live Tail](/docs/search/live-tail). If a Source is not receiving data, the problem may be:

* You are sending log data that is encoded in an unsupported format or has been compressed using an unsupported method. HTTP sources support UTF-8 data only. The supported compression methods are gzip and deflate.
* Your HTTP request is malformed. For more information, see upload [logs](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs) and [metrics](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-metrics).

## Heroku output buffer overflow errors

If you use a Heroku HTTPS drain to send logs to a Sumo Logic HTTP source, Heroku L10 errors can indicate request timeouts, which result in dropped logs.

`2013-04-17T19:04:46+00:00 d.1234-drain-identifier-567 heroku logplex - - Error L10 (output buffer overflow): 500 messages dropped since 2013-04-17T19:04:46+00:00.`

This can occur when the Heroku app engine hits a timeout, does a retry, and experiences a buffer overflow. Sumo ELBs have inactivity timeouts—if a session is inactive for 30 seconds, our ELBs will close the session.

You can run this query in Sumo to confirm the issue:

```
“Error L10 (output buffer overflow)" | parse ": * messages dropped" as num_dropped | sum(num_dropped) _collector,_source | sort by _sum
```

If there is are output buffer overflow errors, the query will return
output like this:

| #      |   _collector |   _source |  _count |
|:-------|:------------------|:--------------|:-------------|
| 1     | Alpha Production | source-alpha | 21          |
| 2     | Beta Production  | source-beta  | 69          |
| 3     | Delta Production | source-delta | 30,180      |
| 4     | source-omega     | source-omega | 25          |
| 5     | Gamma Production | source-gamma | 21          |

To resolve the problem, report the problem to Heroku support, and provide the query results to them.

## Ingest Budgets

When an Ingest Budget instructs a Hosted Collector to stop collecting data HTTP Sources will drop data requests and still return a 200 response.

## Missing or unsupported Content-Type header

When you send metrics to an HTTP source, if you don’t specify a Content-Type header or set it to an unsupported value, the data payload will be ingested as log data, rather than metrics. For more information, see [Upload Metrics to an HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-metrics).

## Request timeouts

A request to an HTTP source will time out if it is not complete within 30 seconds. In that case, the data sent prior to the timeout may not all be successfully ingested. Although no hard limits are imposed, we recommend the data payload before compression of a POST to an HTTP source be between 100K and 1MB.

If an upload to an HTTP source times out, you should receive an HTTP 408 error. To avoid the problem in the future, reduce the size of your uploads.

## Throttling

A 429 response code like the following indicates that the collectors in your account are sending data at a combined rate that is over the burst rate for your account.

`STATUS 429 You have temporarily exceeded your Sumo Logic quota. Please try again at a later time`

When this occurs, Sumo will temporarily throttle data sent to your account. Once the data ingestion rate goes back below the burst rate limit, the HTTP source will start receiving data again.

:::important
Data will be dropped during throttling. In that case, the sending HTTP client must re-send the data that was dropped
:::

The following pages will help you troubleshoot a throttling incident:

* [Manage Ingestion](/docs/manage/ingestion-volume/log-ingestion), see this page for information about:
  * How your account ingestion rate is calculated and throttled.
  * How to figure out how which Collectors are contributing to excess ingestion.
  * How to be alerted when throttling occurs.
* [Account Page](/docs/manage/manage-subscription), see this page for information about your ingestion rates for the current and previous billing period.

## Timestamp issues

If you have verified that the HTTP source is receiving data, but you cannot see the data in search results, it may be that the timestamps in your data do not fall within the time range of your search. This could indicate that the Sumo is not parsing the timestamps correctly. 

You can figure that out by searching for data from that source using the **Use Receipt Time** option. When you run a search with this option, the results include log data with any timestamp, in reverse order of receipt time, so you can view the difference in timestamp and receipt time to identify sources that may be generating incorrect timestamps. For more information, see [Use Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time).

If you determine that the timestamps in your ingested data are not what you would expect, see [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) to verify your timestamp format is one that Sumo Logic can automatically parse. If your data has a timestamp format that Sumo Logic doesn’t understand, you can specify a custom timestamp format for the source.
