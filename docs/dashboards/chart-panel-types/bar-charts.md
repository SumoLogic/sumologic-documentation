---
id: bar-charts
---

# Bar Charts

Bar charts are useful for visually comparing the number of events that have occurred, such as the type of error that occurs the most in your system. To create a Bar chart, use a search query that provides at least a few data points in the **Aggregates** tab.

:::note
The number of data points on a dashboard panel are limited to 1,000, and therefore only 1,000 data points are shown on a chart panel in dashboards.
:::

For example, you could use the following query to create a simple Bar chart:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:

![AggResult.png](/img/dashboards/AggResult.png)

To create a Bar Chart:**

1.  Run a query.
2.  In the **Aggregates** tab, choose the **Bar Chart** icon to display the search results.

    ![Charts - bar](/img/dashboards/charts_bar.png)

The data in the **Aggregates** tab is represented as a bar chart.

![BarChart .png](/img/dashboards/BarChart.png)

For details on customizing the way your chart is displayed, see [Edit Dashboards and Panels](/docs/dashboards/edit-dashboards).
