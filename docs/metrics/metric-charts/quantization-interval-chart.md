---
id: quantization-interval-chart
title: Choosing a Quantization Interval for a Chart
sidebar_label: Choose a Quantization Interval
description: Why you might want to change the quantization interval when running a metric query.
---

:::note
This topic pertains to our Classic Metrics UI (Legacy). For information about the Metrics Explorer UI, which replaces the Classic Metrics UI, see [Metrics Explorer](../metrics-queries/metrics-explorer.md).
:::

In metric visualizations, rather than charting individual data points, Sumo presents the aggregated value of the data points received during an interval. We call this process [*quantization*](../introduction/metric-quantization.md).

Sumo automatically determines an optimal quantization interval, based on the age of the data you are querying and the number of data points. The quantization interval is shown at the top of the metric query tab. The quantization interval aligns your time series data to common intervals on the time axis (for example, every one minute) to optimize the visualization and performance.  

Depending on the frequency at which you are reporting metrics to Sumo, you may want to adjust the quantization interval. For example, if your visualization is choppy, like the one below, increasing the quantization interval might make it easier to understand the visualization.

Generally it’s best if your quantization interval is larger than your reporting interval. For example, assume a metric is coming every 15 seconds, with data points arriving at coming in at:

```
12:00:02   
12:00:17   
12:00:32 
```

If your quantization interval is 5 seconds, the visualization could be choppy because during some quantization intervals no metric data was received. 

| For the quantization interval starting at... |  Sumo will plot... |
|:--|:--|
| 12:00:00 | Sumo plots the average of the data points received between 12:00:00 up to 12:00:05. |
| 12:00:05 | Nothing to plot, as no metrics were received in the last 5 seconds (from 12:00:05 up to 12:00:10). |
| 12:00:10  | Nothing to plot, as no metrics were received in the last 5 seconds (between 12:00:10 pm up to 12:00:15). |
| 12:00:15 | Sumo plots the average of the data points received between 12:00:15 up to 12:00:20. |

When you select a target quantization interval, Sumo sets the actual quantization interval to be as close to the target as possible. If it is not possible to set the actual interval to the targeted interval (typically because too many data points would be produced to reasonably show on the chart), a message is displayed, letting you know that Sumo has set the interval to be as close as possible to your target.
