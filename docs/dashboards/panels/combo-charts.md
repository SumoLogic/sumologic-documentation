---
id: combo-charts
title: Combo Charts
description: Column charts are useful for visually comparing the number of events that have occurred.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Combo charts have a secondary vertical axis that lets you view two aggregates on the same chart. A common combo chart is a bar or column chart with a line on a secondary vertical axis for comparison.

For example, suppose you run a query like this:

```sumo
_sourceCategory=*apache*
| parse "HTTP/1.1\" * * * " as status_code, size, referrer
| timeslice 5m
| avg(size), count by _timeslice
```

This query typically produces a bar or column chart like this:<br/><img src={useBaseUrl('/img/dashboards/panels/combo-charts/bar-chart-basic.png')} style={{border: '1px solid gray'}} alt="bar chart basic" width="800"/>

With a combo chart, you can display `_count` as a line on a second Y axis. You can then compare the number of requests over time (`_count`) with the average number of bytes per request (`_avg`).<br/><img src={useBaseUrl('/img/dashboards/panels/combo-charts/Display-overrides-make-combo-chart.png')} style={{border: '1px solid gray'}} alt="Display overrides make combo chart" width="800"/>

## Create a Combo chart

To create a Combo chart, your query needs to return at least two dimensions of aggregate data or time series. The example query returns `_count` and `_avg`.

1. Secondary axes are configured in the [Display Overrides](./modify-chart.md) menu. Open the **Display Overrides** menu. In the screenshot, it is surrounded by a red box.
1. From the **Query or series name** dropdown, select the field or series to use for the secondary axis. In this example, select `_count`. You can also set an **Alias**.
1. Under **Style**, choose how the panel displays the data. Select **AxisYType** and set it to **Right Y-Axis**. If you select **Left Y-Axis**, the series overlaps the existing aggregate data, which is already on the left axis.
1. By default, the additional axis uses the same chart type as the existing data. In this example, select **Chart Type** and set it to **Line** to make the data easier to compare.
1. Set any other [overrides](./modify-chart.md) you want, then save or update the panel.
