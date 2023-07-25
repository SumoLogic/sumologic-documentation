---
id: table-charts
title: Table Charts
description: Table charts are the default chart type in the Aggregates tab.
---


Table charts are the default chart type in the **Aggregates** tab. They are useful for listing the type and number of events that have occurred, such as the type of error that occurs the most in your system. To create a table chart, use a search query that provides at least a few data points in the **Aggregates** tab.

For example, you'd use the following query to create a simple table chart:

`(error OR fail*) AND exception | count by _sourceCategory | sort by _count`

which would produce results such as:

![AggResult.png](/img/dashboards-new/panels/table-charts/AggResult.png)

## Create a table chart 

To add a panel with a table chart:

1. Create or open a Dashboard and click on **Add Panel > Time Series** or **Add Panel > Categorical**.   

    ![time series or categorical.png](/img/dashboards-new/panels/table-charts/time-series-or-categorical.png)

1. Provide a Metric or Log query and press **Enter** for it to run.

    You can create Log and Metric queries on the same panel.

    **Log query:**

    Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

    **Metrics query:**

    Click the left-most dropdown option and select **Metrics**. You should be familiar with the basics of creating [metrics queries](/docs/metrics/metrics-queries) to ensure successful results. By default, the query builder is set
    to **Logs**.

    ![Metrics selection for query builder.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

    To create a metrics query utilize the [Metrics Query Builder](/docs/metrics/metrics-queries).

1. Once the query runs you will need to flip the chart type to **Table**.

    ![new table chart.png](/img/dashboards-new/panels/table-charts/new-table-chart.png)

1. [Modify the chart](./modify-chart.md) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)

## URL Links in table chart panels

If your query looks for URLs, when you create a table chart panel, the URLs displayed in the table will be displayed as working links.

For example, if you used this query to search for hits to the Sumo Logic Help system:

```sql
_sourceCategory=aws/cloudtrail 
| keyvalue "LoginTo" 
| count loginto
| sort - _count
```

You would see results such as the following in the **Aggregates** tab.

![URLTable.png](/img/dashboards-new/panels/table-charts/URLTable.png)

Then, follow the steps in the previous section to create a table chart panel.
