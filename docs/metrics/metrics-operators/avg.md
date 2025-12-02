---
id: avg
title: avg Metrics Operator
sidebar_label: avg
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `avg` operator calculates the average of all matching time series. If grouping is specified, it calculates the average for each group.

## Syntax

```sql
avg [by FIELD [, FIELD, ...]]
```

## Examples 

### Average value across all time series 

This query returns the average value of the `RequestCount` metric across matching time series.  

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg 
```  

<img src={useBaseUrl('img/metrics/avg1.png')} alt="avg operator" style={{border: '1px solid gray'}} width="800" />

### Average by one field

This query returns the average value of the `RequestCount` metric by one field—`TargetGroup`—across all matching time series, for the selected query range. Each line on the chart corresponds to a `TargetGroup`.

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg by TargetGroup
```  
 
### Average by two fields

Returns the average value of the metric by two fields—`TargetGroup` and `_sourceName`—across all matching time series, for the selected query range. Each line on the chart corresponds to a `_resourceName-TargetGroup` combination.

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg by TargetGroup, _sourceName
```
