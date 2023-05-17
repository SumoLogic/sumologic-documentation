---
id: fillmissing
title: fillmissing Metrics Operator
sidebar_label: fillmissing
---


If a metric query returns results with empty timeslices, the visualization contains a straight line between the data points on either side of the empty timeslice(s).

You can use the `fillmissing` operator to fill empty time slices in metric query results with a derived data point. You can choose between several methods of deriving a data point, or leave empty timeslices empty.

:::note
The `fillmissing` operator is supported in the metric query tab, and in the [Metrics Query Builder](/docs/metrics/metrics-queries/metrics-explorer), currently in beta. 
:::

## Syntax

```sql
metric query | fillmissing [using] <empty | interpolation | last | fixed>
```

* `empty`. No data point is derived, and the visualization is discontinuous.
* `interpolation`. The derived data point is a linear interpolation of the data points prior to and after the empty time slice(s).
* `Last`. The derived data point is the same value as the previous data point.
* `fixed`. With this option, you supply a fixed value, for example “50”, and the derived data point will have that value.

## Query without fillmissing

The chart in this section shows metric query results without the `fillmissing` operator.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready
```

### Example 1: fillmissing empty

The chart in this section shows metric query results with the `fillmissing` operator with the `empty` option. Note that empty time slices are not filled with a derived data point. 

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing empty
```

![fillmissing last.png](/img/metrics/fillmissing-empty.png)

### Example 2: fillmissing interpolation

The chart in this section shows metric query results with the `fillmissing` operator with the `interpolation` option. Note that empty time slices are filled with a derived data point whose value is a linear interpolation of the data points prior to and after the empty time slice. 

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing interpolation
```

![fillmissing last.png](/img/metrics/fillmissing-interpolation.png)

### Example 3: fillmissing last

The chart in this section shows metric query results with the `fillmissing` operator with the `last` option. Note that empty time slices are filled with a derived data point whose value is the value of the metric from the previous time slice.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing last
```

![fillmissing last.png](/img/metrics/fillmissing-last.png)

### Example 4: fillmissing with fixed value

The chart in this section shows metric query results with the `fillmissing` operator with a constant value of 0. Note that empty time slices are filled with a data point whose value is 0.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing 2000
```

![fillmissing constant.png](/img/metrics/fillmissing-constant.png)
