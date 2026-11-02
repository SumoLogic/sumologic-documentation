---
id: area-charts
title: Area Charts
description: An area chart is used to visually represent quantity over a period of time.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

An area chart visually represents quantity over a period of time. The vertical axis shows the quantity, and the horizontal axis shows the time period. An area chart differs from a line chart in that it shades the region below the line, which shows increases and decreases in volume more clearly.

To create an area chart, use a query that provides more than one data point in the **Aggregates** tab. The chart draws a line between the data points to show the change.

For example, you'd use the following query to create an area chart:

```sumo
error | timeslice 1m | count by _timeslice
```

This query produces results such as:<br/><img src={useBaseUrl('/img/dashboards/panels/area-charts/Result.png')} style={{border: '1px solid gray'}} alt="Result" width="400"/>

## Create an Area chart

To add a panel with an area chart:
1. Create or open a dashboard and click **Add Panel > Time Series** or **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards/panels/area-charts/time-series-or-categorical.png')} style={{border: '1px solid gray'}} alt="time series or categorical" width="600"/>
1. Provide a metric or log query and press **Enter** for it to run.
1. After the query runs, change the chart type to **Area**.<br/><img src={useBaseUrl('/img/dashboards/panels/area-charts/Dashboard-New-Area-Chart.png')} style={{border: '1px solid gray'}} alt="Dashboard Area Chart" width="700"/>
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} style={{border: '1px solid gray'}} alt="Add to Dashboard button" width="300"/>
