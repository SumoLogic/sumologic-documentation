---
id: table-charts
title: Table Charts
description: Use table charts in Sumo Logic dashboards to display aggregated search results, listing event types and counts using group-by queries in the Aggregates tab.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Table charts are the default chart type in the **Aggregates** tab. They are useful for listing event types and counts, such as the most frequent type of error in your system. To create a table chart, use a search query that provides at least a few data points in the **Aggregates** tab.

For example, you'd use the following query to create a simple table chart:

`(error OR fail*) AND exception | count by _sourceCategory | sort by _count`

This query produces results such as:<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/AggResult.png')} alt="AggResult" style={{border: '1px solid gray'}} width="500" />

## Create a Table chart

To add a panel with a table chart:

1. Create or open a dashboard and click **Add Panel > Time Series** or **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/time-series-or-categorical.png')} alt="time series or categorical" style={{border: '1px solid gray'}} width="600" />
1. Provide a metric or log query and press **Enter** for it to run. You can create Log and Metric queries on the same panel.

    **Log query:**

    Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the text box and press **Enter**. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="600" />

    **Metrics query:**

    Click the left-most dropdown option and select **Metrics**. For best results, learn the basics of creating [metrics queries](/docs/metrics/metrics-queries) first. By default, the query builder is set to **Logs**.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Metrics selection for query builder" style={{border: '1px solid gray'}} width="700" />

    Build the metrics query in [Metrics Search](/docs/metrics/metrics-queries).

1. After the query runs, change the chart type to **Table**.
    1. (Optional) **Missing Data Display**. Enter the text to display when data is missing.
    1. (Optional) **Font Size**. Font size of the displayed text. The default is `12`.
    1. (Optional) **Decimals**. Sets the precision of the displayed units. Select the number of decimals to show with a unit, up to 10.
    1. (Optional) **Rows Per Page**. Set the number of rows to display in the table.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/new-table-chart.png')} alt="new table chart" style={{border: '1px solid gray'}} width="800" />
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />

## URL links in table chart panels

If your query looks for URLs, use the [`tourl`](/docs/search/search-query-language/search-operators/tourl/) operator to display them as working links in the table chart.

For example, if you used this query to search for hits to the Sumo Logic Help system:

```sumo
_sourceCategory=aws/cloudtrail
| keyvalue "LoginTo"
| count loginto
| sort - _count
```

You would see results such as the following in the **Aggregates** tab.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/URLTable.png')} alt="URLTable" style={{border: '1px solid gray'}} width="600" />

Then follow the steps in [Create a Table chart](#create-a-table-chart) to create the panel.
