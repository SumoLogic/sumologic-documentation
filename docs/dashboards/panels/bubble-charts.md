---
id: bubble-charts
title: Bubble Charts
description: Bubble charts show you the size of data points in relation to two other dimensions.
---

Bubble charts are available in the [Dashboard](../about.md) platform.

Bubble charts display three dimensions of data. A bubble chart is a two dimensional scatter chart where each data point is represented by its size, the third dimension. This allows you to visualize the counts associated with each point. Bubble charts require at least one aggregate dimension and two other numeric dimensions.

* The **X dimension** must be numeric and is displayed against the X axis of the bubble chart.
* The **Y dimension** must be numeric and is displayed against the Y axis of the bubble chart.
* The **Z dimension** is normally the aggregate field and shows the value of each bubble.

You can modify the fields used for each axis as needed.

For example, in the following query `logins` is the Z dimension and will be displayed as the value of each bubble. The fields `latitude` and `longitude` can be used as dimensions.

```sql
_sourceCategory=service "message=User logged in" remote_ip
| parse "[remote_ip=*]" as remote_ip
| lookup latitude, longitude, city, state from geo://location on ip = remote_ip
| count as logins by city, latitude, longitude
```

## Create a bubble chart

To add a panel with a bubble chart:

1. Create or open a Dashboard and click on **Add Panel > Categorical**.  

    ![categorical.png](/img/dashboards-new/panels/bubble-charts/categorical.png)

1. Provide a Log query and press **Enter** for it to run.

    Enter your aggregate [search query](/docs/search/search-query-language/group-aggregate-operators) in the input field and press enter. Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators ](/docs/search/search-query-language/group-aggregate-operators) for a list.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

1. Once the query runs you will need to flip the chart type to **Bubble** and set your **Dimensions**. A bubble chart requires three dimensions, including the aggregate.  

    ![bubble chart.png](/img/dashboards-new/panels/bubble-charts/bubble-chart.png)

1. [Modify the chart](./modify-chart.md) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)


 
