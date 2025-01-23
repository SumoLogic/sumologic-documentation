---
id: metrics-query
title: Metrics Query Management APIs
sidebar_label: Metrics Query
description: Metrics Query APIs allow you to execute queries on various metrics and retrieve multiple time-series (data-points) over time from HTTP endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/>

The Metrics Query API allows you to execute queries on various metrics and retrieve multiple time-series (data-points) over time from HTTP endpoints. For information about running a metrics query using the API, see [Executing a query](/docs/api/metrics/#executing-a-query) in *Metrics APIs*.

Here is example content for a `v1/metricQueries` API call:

``` json
{
  "queries": [
    {
      "rowId": "A",
      "query": "metric=CPU_Idle",
      "quantization": 60000,
      "rollup": "Avg",
      "timeshift": -3600000
    }
  ],
  "timeRange": {
    "type": "BeginBoundedTimeRange",
    "from": {
      "type": "RelativeTimeRangeBoundary",
      "relativeTime": "-15m"
    }
  }
}
```

A metric query consists of a metric, one or more filters, and optionally, one or more [metrics operators](/docs/metrics/metrics-operators/). Although both filters and operators are optional, in practice, your metric queries will almost always contain filters that narrow the scope of your query. 

## Documentation

<ApiIntro/>

| Deployment | Documentation URL                                    |
|:------------|:------------------------------------------------------|
| AU         | https://api.au.sumologic.com/docs/#tag/metricsQuery  |
| CA         | https://api.ca.sumologic.com/docs/#tag/metricsQuery  |
| DE         | https://api.de.sumologic.com/docs/#tag/metricsQuery  |
| EU         | https://api.eu.sumologic.com/docs/#tag/metricsQuery  |
| FED        | https://api.fed.sumologic.com/docs/#tag/metricsQuery |
| IN         | https://api.in.sumologic.com/docs/#tag/metricsQuery  |
| JP         | https://api.jp.sumologic.com/docs/#tag/metricsQuery  |
| KR         | https://api.kr.sumologic.com/docs/#tag/metricsQuery  |
| US1        | https://api.sumologic.com/docs/#tag/metricsQuery     |
| US2        | https://api.us2.sumologic.com/docs/#tag/metricsQuery |

## Required role capabilities

<ApiRoles/>

* Metrics (all role capabilities)
