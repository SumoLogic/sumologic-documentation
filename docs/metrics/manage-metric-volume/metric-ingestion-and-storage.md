---
id: metric-ingestion-and-storage
title: Metric Ingestion and Storage
sidebar_label: Metric Ingestion and Storage
description: How long Sumo stores raw metric data points, one minute roll-ups, and one hour roll-ups.
---
This page has information about how Sumo Logic stores raw and rolled up metrics data.

## Metric ingestion

Sumo does not store metrics data points that are more than 24 hours in the past or that are more than 24 hours in the future.

:::note
Too old or too new data points will be accepted by Sumo, but they will not be stored.
:::

## Metric retention

Metrics data is stored in Sumo Logic as raw data points and one-hour resolution roll-ups. The data is retained according to the following retention policy:

| Data Type Retained | Retention Period |
|:------------------------|:----------------------|
| Raw                    | 30 days               |
| 1-hour resolution      | 13 months            |

For historical 1-hour rollups Sumo Logic calculates the max, min, avg, sum, and count values for a metric per hour.

## Understanding raw and rolled up metrics data

Assume a metric is reported at 1-minute intervals, with time:value pairs like this:

```
12:00:00: 0
12:01:00: 1
12:02:00: 2
…
12:59:00: 59
13:00:00: 60
13:01:00: 61
13:02:00: 62
…
13:59:00: 119
```

Over the course of an hour, 60 raw values are collected, one value per minute. Sumo Logic retains the raw data points for 30 days.

Sumo Logic creates hourly rollups from the raw data point. The rollups look like this:

```
12:00:00: {count=60, min=0, max=59, sum=1770, avg=29.5}
13:00:00: {count=60, min=60, max=119, sum=5370, avg=89.5}
```

30 days after collection of raw metric data, you can only access the hourly rollups. This means you’ll be able to see the value of a statistic (count, min, max, sum, or avg) in particular hours but not in particular minutes (because the more granular data won’t be available anymore).
