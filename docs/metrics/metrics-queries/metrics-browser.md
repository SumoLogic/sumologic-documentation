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

The **Metrics Browser** pane gives you a clear, searchable view of all your available metrics, along with their dimensions and values, so you can build precise queries without trial-and-error or broad scans. This helps reduce troubleshooting time, improve query accuracy, and lower data consumption. Because the pane only displays the available values that apply to what you have already selected for your query, you can build your query with greater speed and confidence.

To build a query with Metrics Browser:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Metrics > Metrics Search**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Metrics**. 
1. The Metrics Search page opens. Click the **Browser** button.<img src={useBaseUrl('img/metrics/metrics-browser-button.png')} alt="Browser button" style={{border: '1px solid gray'}} width="800" /><br/>The **Metrics Browser** dropdown displays the available metrics and filters, with the top values for each. <img src={useBaseUrl('img/metrics/metrics-browser-dropdown.png')} alt="Metrics Browser dropdown" style={{border: '1px solid gray'}} width="800" />
1. Select **metric** in the left menu. Then select a metric value from the provided list of top values, or use the search bar. <img src={useBaseUrl('img/metrics/metrics-browser-select-a-metric.png')} alt="Select a metric in Metrics Browser" style={{border: '1px solid gray'}} width="800" /><br/>When you select a metric value, it is added to the **Metric** part of your query.<img src={useBaseUrl('img/metrics/metrics-browser-metric-field-filled-in.png')} alt="Metric filled in" style={{border: '1px solid gray'}} width="800" />
1. Select a filter in the left menu, or use the search bar. (When you select a filter, only values display that apply to the metric that you have already chosen.) Then select a filter value from the provided list of top values, or use the search bar. <img src={useBaseUrl('img/metrics/metrics-browser-select-a-filter.png')} alt="Select a filter" style={{border: '1px solid gray'}} width="800" /><br/>When you select a filter value, it is added to the **Filters** part of your query. <br/><img src={useBaseUrl('img/metrics/metrics-browser-filter-field-filled-in.png')} alt="Filter filled in" style={{border: '1px solid gray'}} width="800" />
1. Click the **Search** button <img src={useBaseUrl('img/metrics/search-button.png')} alt="Search button" style={{border: '1px solid gray'}} width="50" />, or press Enter. The results of the query are displayed. You can now work with your query as you normally would, like continuing to add filters or operators and selecting different panel settings.<br/><img src={useBaseUrl('img/metrics/metrics-browser-query-results.png')} alt="Filter filled in" style={{border: '1px solid gray'}} width="800" />
