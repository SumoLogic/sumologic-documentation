---
id: scatter-charts
title: Scatter Charts
description: Scatter charts show correlations between two fields against specific data.
---

Scatter charts are available in the [Dashboard](../about.md) platform.

Scatter charts display two independent numeric fields allowing you to see any correlation between them. You can visually determine how your fields relate to and affect one another.

The aggregate field is displayed as a collection of points. Each point requires two numerical fields for the X and Y axes.

* The **X dimension** must be numeric and is displayed against the X axis of the scatter chart.
* The **Y dimension** must be numeric and is displayed against the Y axis of the scatter chart.

You can modify the fields used for each axis as needed.

For example, in the following query `logins` is the aggregate field and will be displayed as data points. The fields `latitude` and `longitude` can be used as dimensions.

```sql
_sourceCategory=service "message=User logged in" remote_ip
| parse "[remote_ip=*]" as remote_ip
| lookup latitude, longitude from geo://location on ip = remote_ip
| count as logins by latitude, longitude
```

## Create a scatter chart

To add a panel with a scatter chart:

1. Create or open a Dashboard and click on **Add Panel >
    Categorical**.  

    ![categorical.png](/img/dashboards-new/panels/scatter-charts/categorical.png)

1. Provide a Log query and press **Enter** for it to run.

    Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate
    Operators](/docs/search/search-query-language/group-aggregate-operators) for a list.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

1. Once the query runs you will need to flip the chart type to **Scatter** and set your **X** and **Y Axis Dimensions**.  

    ![scatter chart.png](/img/dashboards-new/panels/scatter-charts/scatter-chart.png)

1. [Modify the chart](./modify-chart.md) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
 
