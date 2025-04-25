---
id: line-charts
title: Line Charts
description: Line charts are useful for displaying how data changes over time.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Line charts are useful for displaying how data changes over time, where the Y axis of a line chart displays the count of an item, and the X axis is a timeline.

To create a line chart, you need to use a query that provides more than one data point in the **Aggregates** tab, see [aggregate operators](/docs/search/search-query-language/group-aggregate-operators) for details. Then the line is drawn between the data points to show the
change.

For example, you'd use the following query to create a Line chart:

```sql
error | timeslice 1m | count by _timeslice
```

which would produce results such as:<br/><img src={useBaseUrl('/img/dashboards/panels/line-charts/timeResult.png')} style={{border: '1px solid gray'}} alt="timeResult" width="300"/>

### Create a line chart

To add a panel with a line:

1. Create or open a Dashboard and click on **Add Panel > Time Series**.<br/><img src={useBaseUrl('/img/dashboards/panels/line-charts/time-series-icon.png')} style={{border: '1px solid gray'}} alt="time series icon" width="700"/>
1. Provide a Metric or Log query and press **Enter** for it to run.
1. Once the query runs, ensure the chart type is set to **Line**.<br/><img src={useBaseUrl('/img/dashboards/panels/line-charts/New-line-chart-setting.png')} style={{border: '1px solid gray'}} alt="New line chart setting" width="800"/>
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} style={{border: '1px solid gray'}} alt="Add to Dashboard button" width="300"/>