---
id: line-charts
title: Line Charts
description: Line charts are useful for displaying how data changes over time.
---

Line charts are useful for displaying how data changes over time, where the Y axis of a line chart displays the count of an item, and the X axis is a timeline.

To create a line chart, you need to use a query that provides more than one data point in the **Aggregates** tab, see [aggregate operators](/docs/search/search-query-language/group-aggregate-operators) for details. Then the line is drawn between the data points to show the
change.

For example, you'd use the following query to create a Line chart:

```sql
error | timeslice 1m | count by _timeslice
```

which would produce results such as:

![timeResult.png](/img/dashboards-new/panels/line-charts/timeResult.png)

### Create a line chart

**To add a panel with a line** chart:**

1. Create or open a Dashboard and click on **Add Panel > Time Series**.  

    ![time series icon.png](/img/dashboards-new/panels/line-charts/time-series-icon.png)

1. Provide a Metric or Log query and press **Enter** for it to run.

1. Once the query runs, ensure the chart type is set to **Line**.  

    ![New line chart setting.png](/img/dashboards-new/panels/line-charts/New-line-chart-setting.png)

1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
