---
id: bar-charts
title: Bar Charts
description: Bar charts are useful for visually comparing the number of events that have occurred.
---

Bar charts are useful for visually comparing the number of events that have occurred, such as the type of error that occurs the most in your system. To create a Bar chart, use a search query that provides at least a few data points in the **Aggregates** tab.

For example, you'd use the following query to create a simple Bar chart:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:

![AggResult.png](/img/dashboards-new/panels/bar-charts/AggResult.png)

## Create a bar chart

To add a panel with a bar chart:

1. Create or open a Dashboard and click on **Add Panel > Time Series** or **Add Panel > Categorical**.  

    ![time series or categorical.png](/img/dashboards-new/panels/bar-charts/time-series-or-categorical.png)

1. Provide a Metric or Log query and press **Enter** for it to run.

1. Once the query runs you will need to flip the chart type to **Bar**.

    ![Dashboard Bar Chart.png](/img/dashboards-new/panels/bar-charts/Dashboard-New-Bar-Chart.png)

1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
