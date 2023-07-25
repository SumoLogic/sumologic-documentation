---
id: pie-charts
title: Pie Charts
description: Donut or Pie charts are useful for visually comparing the percentage of events that have occurred for a particular field.
---

Pie charts are useful for visually comparing the percentage of events that have occurred, such as the type of error that occurs the most in your system. A pie chart will compare different values for the same field. If you want to compare values for different fields consider using a histogram.

To create a pie chart, use an aggregate query that provides at least a few results in the **Aggregates** tab.

For example, you'd use the following simple query to get results from your logs:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:

![AggResult.png](/img/dashboards-new/panels/pie-charts/AggResult.png)

## Create a pie chart

1. Create or open a Dashboard and click on **Add Panel > Categorical**.

    ![categorical.png](/img/dashboards-new/panels/pie-charts/categorical.png)

1. Provide a Log or Metric query and press **Enter** for it to run.

1. Once the query runs you will need to flip the chart type to **Pie**.

    ![new pie chart.png](/img/dashboards-new/panels/pie-charts/new-pie-chart.png)

1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
