---
id: metrics-browser
title: Metrics Browser
sidebar_label: Metrics Browser
description: Learn how to use the Metrics Browser to query your metrics.
---
<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Metrics Browser** pane provides a clear and searchable view of all available metrics, including their associated dimensions and values. This allows you to build accurate queries without relying on guesswork, trial-and-error, or broad data scans.

By displaying only the dimension values relevant to your current selections, the pane helps you refine queries efficiently and avoid unnecessary data exploration. This reduces troubleshooting time, improves query precision, and can help optimize data usage. With contextual filtering and guided selection, you can construct metric queries more quickly and confidently.

To build a query with Metrics Browser:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Metrics > Metrics Search**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Metrics**. 
1. The Metrics Search page opens. Click the **Browser** button.<img src={useBaseUrl('img/metrics/metrics-browser-button.png')} alt="Browser button" style={{border: '1px solid gray'}} width="800" /><br/>The **Metrics Browser** dropdown displays the available metrics and filters, with the top values for each. <img src={useBaseUrl('img/metrics/metrics-browser-dropdown.png')} alt="Metrics Browser dropdown" style={{border: '1px solid gray'}} width="800" />
1. Select **metric** in the left menu. Then select a metric value from the provided list of top values, or use the search bar. <img src={useBaseUrl('img/metrics/metrics-browser-select-a-metric.png')} alt="Select a metric in Metrics Browser" style={{border: '1px solid gray'}} width="800" /><br/>When you select a metric value, it is added to the **Metric** part of your query.<img src={useBaseUrl('img/metrics/metrics-browser-metric-field-filled-in.png')} alt="Metric filled in" style={{border: '1px solid gray'}} width="800" />
1. Select a filter from the left panel or use the search bar to locate one. When you choose a filter, only the values relevant to the selected metric are displayed. Next, select a value from the list of available values, or use the search bar to quickly find a specific value.<img src={useBaseUrl('img/metrics/metrics-browser-select-a-filter.png')} alt="Select a filter" style={{border: '1px solid gray'}} width="800" /><br/>When you select a filter value, it is added to the **Filters** part of your query. <br/><img src={useBaseUrl('img/metrics/metrics-browser-filter-field-filled-in.png')} alt="Filter filled in" style={{border: '1px solid gray'}} width="800" />
1. Click the **Search** button <img src={useBaseUrl('img/metrics/search-button.png')} alt="Search button" style={{border: '1px solid gray'}} width="50" />, or press Enter. The results of the query are displayed. You can now work with your query as you normally would, like continuing to add filters or operators and selecting different panel settings.<br/><img src={useBaseUrl('img/metrics/metrics-browser-query-results.png')} alt="Filter filled in" style={{border: '1px solid gray'}} width="800" />

:::warning
For a single metrics query row, Sumo Logic limits the number of input time series to 1000 for non-aggregate queries. As a result, some selected metrics may be excluded. For more information, see [Too many time series](/docs/metrics/metrics-queries/metric-query-error-messages/#too-many-time-series). 
:::
