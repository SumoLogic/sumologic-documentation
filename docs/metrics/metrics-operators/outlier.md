---
id: outlier
title: outlier Metrics Operator
sidebar_label: outlier
---

The metrics `outlier` operator identifies metrics data points that are outside the range of expected values. Outliers help you spot unusual behavior in your metrics visualizations and track the behavior over time.

`outlier` tracks the moving average and standard deviation of a time series over a specified time window, and calculates a threshold band, outside of which data points are considered outliers. You can use optional qualifiers to specify the time window, the number of standard deviations beyond which a data point is considered an outlier, and the directionality of the deviation.

:::note
You can't directly reference the `outlier` operator in a metrics monitor, however, you can use the outlier detection method in a metrics monitor to alert based on outlier events.
:::

## Syntax

```sql
outlier [window=<time_unit_or_number>, threshold=<number>, direction=[ +- | + | - ]]
```

Where:

* `window` is the range over which to calculate the moving average and standard deviation of the time series. `window` can be specified with time units (s, m, h), or it can be specified without time units.  Default: 5m.
:::note
If you use `outlier` in the Classic Metrics UI, if you specify the `window` parameter without supplying a unit of time, the window duration applied will be in the units used in the [quantization](docs/metrics/introduction/metric-quantization.md) of the query.
* `threshold` is the number of standard deviations from the moving average that defines the threshold band. Default: 3
* `direction` specifies what deviation direction should trigger violations: positive deviations (+), negative deviations (-), or both (+-). Default: +-

![outlier-operator.png](/img/metrics/outlier-operator.png)

In the visualization, the threshold band is the part shaded in pink. The outlier values are represented by the pink triangles.
