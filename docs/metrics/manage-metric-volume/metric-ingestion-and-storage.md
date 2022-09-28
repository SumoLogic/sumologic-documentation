---
id: metric-ingestion-and-storage
title: Metric Ingestion and Storage
sidebar_label: Metric Ingestion and Storage
description: How long Sumo stores raw metric data points, one minute roll-ups, and one hour roll-ups.
---

## Metric ingestion

Sumo does not ingest metric data that is more than one week old.


## Metric retention

Metrics data is stored in Sumo Logic as raw and one hour resolution. It's retained according to the following retention policy:

| Data Type Retained | Retention Period |
|------------------------|----------------------|
| Raw                    | 30 days               |
| 1-hour resolution      | 13 months            |

For historical 1-hour rollups Sumo Logic calculates the max, min, avg, sum, and count values for a metric per hour.
