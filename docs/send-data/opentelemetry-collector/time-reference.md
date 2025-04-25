---
id: time-reference
title: OTel Timestamp and Date Format Reference
description: Learn about timestamp formats recognized by the Sumo Logic OpenTelemetry (OTel) Collector and available configuration options.
keywords:
  - time-stamp
  - otel-collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This page specifically covers the timestamp formats recognized by the Sumo Logic OpenTelemetry (OTel) Collector. While Sumo Logic’s [general time reference documentation](/docs/send-data/reference-information/time-reference/) explains how timestamps are parsed and indexed across all data sources, this guide focuses on the formats automatically detected and parsed by the OTel collector for log data.
:::

We support several options for timestamps. When collecting log data, the timestamp attached to messages is vital, both for the integrity of the data in your account, and for accurate query results.

Because of the importance of timestamps, Sumo Logic indexes the timestamp of each message, making sure that data relevant to a query’s time range is returned properly in search results, which allows you to reconstruct a correct event timeline.

## Timestamps

The timestamp is the part of a log message that marks the time that an event occurred. During ingestion, we can detect the message timestamp, convert it to Unix epoch time (the number of milliseconds since midnight, January 1, 1970 UTC), and index it. The timestamp is parsed either using the default timestamp parsing settings, or a custom format that you specify.

### OTel automated timestamp parsing

| OTel Timestamp Format | Example |
|:---|:---|
| `%Y-%m-%d'T'%H:%M:%S*%f%z` | 2023-08-20'T'13:20:10*633+0000 |
| `%Y %b %d %H:%M:%S.%f %Z` | 2023 Mar 03 05:12:41.211 PDT |
| `%b %d %H:%M:%S %z %Y` | Jan 21 18:20:11 +0000 2023 |
| `%d/%b/%Y:%H:%M:%S %z` | 19/Apr/2023:06:36:15 -0700 |
| `%b %d, %Y %l:%M:%S %p` | Dec 2, 2023 2:39:58 AM |
| `%b %d %Y %H:%M:%S` | Jun 09 2023 15:28:14 |
| `%b %d %H:%M:%S %Y` | Apr 20 00:00:35 2010 |
| `%b %d %H:%M:%S %z` | Sep 28 19:00:00 +0000 |
| `%b %d %H:%M:%S` | Mar 16 08:12:04 |
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
