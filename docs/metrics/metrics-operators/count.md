---
id: count
title: count Metrics Operator
sidebar_label: count
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Counts the total number of time series that match the query. If grouping is specified, it counts the total number for each group.

## Syntax

```sql
count [by FIELD [, FIELD, ...]]
```

## Examples

### Count of time series for a metric

This query returns the number of time series for the `size` metric. 

```sql
metric=size | count
```

### Count of time series for a metric by IP address

This query returns the number of time series for the size metric by src_ip. 

```sql
metric=size | count by src_ip
```

### Count of 4xx errors by method

This example shows a query in the [Metrics Search](/docs/metrics/metrics-queries/metrics-explorer) in basic mode. In advanced mode, the query would look like:

```sql
metric=4XXError | count by method
```

In this query, we're searching for how many 4xx errors occurred by different methods, for example, GET, PUT, DELETE, and so on.

<img src={useBaseUrl('img/metrics/count-example.png')} alt="count example" style={{border: '1px solid gray'}} width="800" />
