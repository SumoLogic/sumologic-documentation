---
id: table-charts
title: Table Charts
description: Table charts are the default chart type in the Aggregates tab.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Table charts are the default chart type in the **Aggregates** tab. They are useful for listing the type and number of events that have occurred, such as the type of error that occurs the most in your system. To create a table chart, use a search query that provides at least a few data points in the **Aggregates** tab.

For example, you'd use the following query to create a simple table chart:

`(error OR fail*) AND exception | count by _sourceCategory | sort by _count`

which would produce results such as:<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/AggResult.png')} alt="AggResult" style={{border: '1px solid gray'}} width="300" />

## Create a table chart 

To add a panel with a table chart:

1. Create or open a Dashboard and click on **Add Panel > Time Series** or **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/time-series-or-categorical.png')} alt="time series or categorical" style={{border: '1px solid gray'}} width="600" />
1. Provide a Metric or Log query and press **Enter** for it to run. You can create Log and Metric queries on the same panel.

    **Log query:**

    Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="600" />

    **Metrics query:**

    Click the left-most dropdown option and select **Metrics**. You should be familiar with the basics of creating [metrics queries](/docs/metrics/metrics-queries) to ensure successful results. By default, the query builder is set to **Logs**.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Metrics selection for query builder" style={{border: '1px solid gray'}} width="700" />

    To create a metrics query utilize the [Metrics Explorer](/docs/metrics/metrics-queries).

1. Once the query runs you will need to flip the chart type to **Table**.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/new-table-chart.png')} alt="new table chart" style={{border: '1px solid gray'}} width="700" />
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />

## URL Links in table chart panels

When you create a table chart panel, and if your query looks for URLs, then use the [`tourl`](/docs/search/search-query-language/search-operators/tourl/) operator to display the URL in the table as working links.

For example, if you used this query to search for hits to the Sumo Logic Help system:

```sql
_sourceCategory=aws/cloudtrail 
| keyvalue "LoginTo" 
| count loginto
| sort - _count
```

You would see results such as the following in the **Aggregates** tab.<br/><img src={useBaseUrl('/img/dashboards/panels/table-charts/URLTable.png')} alt="URLTable" style={{border: '1px solid gray'}} width="600" />

Then, follow the steps in the previous section to create a table chart panel.
