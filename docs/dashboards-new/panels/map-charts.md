---
id: map-charts
title: Map Charts
description: Map charts help you to understand your data patterns, trends, and global data distribution.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Map charts are visual representations that use color coding to display data values across regions and provide insights into data patterns, trends, and distribution of the data globally.

## Cluster and Heatmap

Cluster and Heatmap graphically depicts the location and number of hits from data on a map. 

To map your data you can: 

* Use the [geoip](/docs/search/search-query-language/search-operators/geoip) or [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) operators to provide these values from extracted IPv4 and IPv6 addresses.
* Manually provide valid aggregated **latitude** and **longitude** values. Ensure the field names are `latitude` and `longitude` so that map chart can recognize them. Format the values with positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W, such as, `30.42` and `-87.21`.
* A `_count` aggregator is required. 
* Other aggregators like `sum` or `avg` don't provide accurate results. 

### Create a Cluster or Heatmap

To add a panel with a Cluster or Heatmap:

1. Create or open a Dashboard (New) and click on **Add Panel > Map**. <br/><img src={useBaseUrl('img/dashboards-new/panels/map-charts/map-panel-option.png')} alt="map-panel-option" style={{border: '1px solid black'}} width="600" /> 
1. Provide a [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) query and press **Enter** for it to run.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

1. A map chart is available in two types, **Cluster** or **Heatmap**.<br/><img src={useBaseUrl('img/dashboards-new/panels/map-charts/cluster.png')} alt="cluster" style={{border: '1px solid black'}} width="800"/> <br/><img src={useBaseUrl('img/dashboards-new/panels/map-charts/heatmap.png')} alt="heatmap" style={{border: '1px solid black'}} width="800"/>

1. [Modify the chart](/docs/dashboards-new/panels/modify-chart) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)


:::note limitations
* Map charts have a display limit of 10,000 results.
* Colors of map markers cannot be changed.
:::

## Missile map

Missile map is used to geographically depict any data that has an origin and destination. This map helps you to visualize the relationships between the source and destination by providing insights into the pathways that may follow.

To create Connection map, your query must include:

- `sourcelat` - Source latittude
- `sourcelon` - Source longitude 
- `destinationlat` - Destination latittude 
- `destinationlon` - Destination longitude 

### Create a Missile map

To add a panel with a missile map:

1. Create or open a Dashboard (New) and click on **Add Panel > Map**. <br/><img src={useBaseUrl('img/dashboards-new/panels/map-charts/map-panel-option.png')} alt="map-panel-option" style={{border: '1px solid black'}} width="600" /> 
1. Type a supported query in the Search box, including all of the required field names and press **Enter** for it to run.
1. Once the search results appear, select **Missile** from the **Map Type** dropdown. <br/><img src={useBaseUrl('img/dashboards-new/panels/map-charts/missile-map.png')} alt="missile-map" style={{border: '1px solid black'}} width="800" /> 
1. [Modify the chart](/docs/dashboards-new/panels/modify-chart) as desired.

