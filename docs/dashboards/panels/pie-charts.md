---
id: pie-charts
title: Pie Charts
description: Donut or Pie charts are useful for visually comparing the percentage of events that have occurred for a particular field.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Pie charts are useful for visually comparing the percentage of events that have occurred, such as the type of error that occurs the most in your system. A pie chart will compare different values for the same field. If you want to compare values for different fields consider using a histogram.

To create a pie chart, use an aggregate query that provides at least a few results in the **Aggregates** tab.

For example, you'd use the following simple query to get results from your logs:

```sql
(error OR fail*) AND exception | count by _sourceCategory | sort by _count
```

which would produce results such as:<br/><img src={useBaseUrl('/img/dashboards/panels/pie-charts/AggResult.png')} alt="AggResult" style={{border: '1px solid gray'}} width="300" /> 

## Create a pie chart

1. Create or open a Dashboard and click on **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards/panels/pie-charts/categorical.png')} alt="categorical" style={{border: '1px solid gray'}} width="600" /> 
1. Provide a Log or Metric query and press **Enter** for it to run.
1. Once the query runs you will need to flip the chart type to **Pie**.<br/><img src={useBaseUrl('/img/dashboards/panels/pie-charts/new-pie-chart.png')} alt="new pie chart" style={{border: '1px solid gray'}} width="700" /> 
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="400" /> 
