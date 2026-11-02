---
id: scatter-charts
title: Scatter Charts
description: Scatter charts show correlations between two fields against specific data.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Scatter charts are available in [Sumo Logic dashboards](../about.md).

Scatter charts display two independent numeric fields so you can see any correlation between them. You can visually determine how your fields relate to each other.

The aggregate field appears as a collection of points. Each point requires two numeric fields for the X and Y axes.

* The **X dimension** needs to be numeric. It is plotted on the X axis of the scatter chart.
* The **Y dimension** needs to be numeric. It is plotted on the Y axis of the scatter chart.

You can modify the fields used for each axis as needed.

For example, in the following query, `logins` is the aggregate field and appears as the data points. You can use the `latitude` and `longitude` fields as the X and Y dimensions.

```sumo
_sourceCategory=service "message=User logged in" remote_ip
| parse "[remote_ip=*]" as remote_ip
| lookup latitude, longitude from geo://location on ip = remote_ip
| count as logins by latitude, longitude
```

## Create a Scatter chart

To add a panel with a scatter chart:

1. Create or open a dashboard and click **Add Panel > Categorical**.<br/><img src={useBaseUrl('/img/dashboards/panels/scatter-charts/categorical.png')} alt="categorical" style={{border: '1px solid gray'}} width="600" />
1. Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the text box and press **Enter** for it to run. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="700" />
1. After the query runs, change the chart type to **Scatter** and set your **X** and **Y Axis Dimensions**.<br/><img src={useBaseUrl('/img/dashboards/panels/scatter-charts/scatter-chart.png')} alt="scatter chart" style={{border: '1px solid gray'}} width="700" />
1. [Modify the chart](./modify-chart.md) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300" />

