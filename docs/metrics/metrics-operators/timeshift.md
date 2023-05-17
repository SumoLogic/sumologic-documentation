---
id: timeshift
title: timeshift Metrics Operator
sidebar_label: timeshift
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `timeshift` operator shifts the time series from your metrics query by a specified period of time.

## Syntax

```sql
timeshift TIME_INTERVAL
```

Where:

* `TIME_INTERVAL` is a time interval in millisecond(ms), seconds (s), minutes (m), hours (h), or days (d).

## Example

Query #A returns the `cpu_idle` metric for the currently selected query time range, the last 15 minutes.

```sql
#A _sourceCategory=prod/host _sourceHost=my-mac= metric=cpu_idle
```

Query #B returns the `cpu_idle` metric for the 15 minute period that ended two hours ago.

```sql
#B _sourceCategory=prod/host _sourceHost=my-mac= metric=cpu_idle | timeshift 2h
```

<img src={useBaseUrl('img/metrics/timeshift.png')} alt="your description" />
