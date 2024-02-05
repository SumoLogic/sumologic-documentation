---
id: area-charts
title: Area Charts
description: An area chart is used to visually represent quantity over a period of time.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

An area chart is used to visually represent quantity over a period of time. The quantity is laid out on the vertical axis, and the horizontal axis shows the time period being charted. What distinguishes an area chart from a line chart is the use of shaded regions below the line which better indicates the increase or decrease of volume.

To create an area chart, you must use a query that provides more than one data point in the **Aggregates** tab. Then the line is drawn between the data points to show the change.

For example, you'd use the following query to create an area chart:

```sql
error | timeslice 1m | count by _timeslice
```

which would produce results such as:<br/><img src={useBaseUrl('/img/dashboards-new/panels/area-charts/Result.png')} style={{border: '1px solid gray'}} alt="Result" width="400"/>

## Create an area chart

To add a panel with an area chart:
1. Create or open a Dashboard and click on **Add Panel > Time Series** or **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards-new/panels/area-charts/time-series-or-categorical.png')} style={{border: '1px solid gray'}} alt="time series or categorical" width="600"/>
1. Provide a Metric or Log query and press **Enter** for it to run.
1. Once the query runs you will need to flip the chart type to **Area**.<br/><img src={useBaseUrl('/img/dashboards-new/panels/area-charts/Dashboard-New-Area-Chart.png')} style={{border: '1px solid gray'}} alt="Dashboard Area Chart" width="700"/>
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png')} style={{border: '1px solid gray'}} alt="Add to Dashboard button" width="300"/>