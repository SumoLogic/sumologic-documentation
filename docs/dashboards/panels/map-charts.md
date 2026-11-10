---
id: map-charts
title: Map Charts
description: Map charts help you to understand your data patterns, trends, and global data distribution.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Map charts use color coding to show data values across regions. They help you see data patterns, trends, and the global distribution of your data.

## Cluster and Heatmap

Cluster and Heatmap charts show the location and number of hits in your data on a map.

To map your data you can:

* Use the [`geoip`](/docs/search/search-query-language/search-operators/geoip) or [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) operators to provide these values from extracted IPv4 and IPv6 addresses.
* Manually provide aggregated **latitude** and **longitude** values. Make sure the field names are `latitude` and `longitude` so the map chart can recognize them. Use positive or negative numbers to show north/south and east/west, instead of N/S and E/W. For example: `30.42` and `-87.21`.
* A `_count` aggregator is required.
* Other aggregators like `sum` or `avg` do not provide accurate results.

### Create a Cluster or Heatmap panel

To add a panel with a Cluster or Heatmap:

1. Create or open a dashboard and click **Add Panel > Map**. <br/><img src={useBaseUrl('img/dashboards/panels/map-charts/map-panel-option.png')} alt="Map panel option" style={{border: '1px solid gray'}} width="600" />
1. Provide a [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) query and press **Enter** for it to run.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-log-query.png')} alt="Add log query" style={{border: '1px solid gray'}} width="600" />
1. Select the map type, **Cluster** or **Heatmap**.<br/><img src={useBaseUrl('img/dashboards/panels/map-charts/cluster.png')} alt="cluster" style={{border: '1px solid gray'}} width="800"/> <br/><img src={useBaseUrl('img/dashboards/panels/map-charts/heatmap.png')} alt="heatmap" style={{border: '1px solid gray'}} width="800"/>
1. [Modify the chart](/docs/dashboards/panels/modify-chart) as desired.
1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.<br/><img src={useBaseUrl('/img/dashboards/create-dashboard/Add-to-Dashboard-button.png')} alt="Add to Dashboard button" style={{border: '1px solid gray'}} width="300"/>

### Limitations
* Map chart queries display a maximum of 1440 results. If your query returns more, refine it to see all results in the chart.
* Colors of map markers cannot be changed.

## Missile map

A missile map shows data that has an origin and a destination on a map. It helps you visualize the relationship between the source and destination and the paths the data may follow.

To create a Missile map, your query needs to include:

- `sourcelat` - Source latitude
- `sourcelon` - Source longitude
- `destinationlat` - Destination latitude
- `destinationlon` - Destination longitude

### Create a Missile map

To add a panel with a missile map:

1. Create or open a dashboard and click **Add Panel > Map**. <br/><img src={useBaseUrl('img/dashboards/panels/map-charts/map-panel-option.png')} alt="Map panel option" style={{border: '1px solid gray'}} width="600" />
1. Type a supported query in the Search box, including all of the required field names, and press **Enter** for it to run.
1. Once the search results appear, select **Missile** from the **Map Type** dropdown. <br/><img src={useBaseUrl('img/dashboards/panels/map-charts/missile-map.png')} alt="Missile map" style={{border: '1px solid gray'}} width="800" />
1. [Modify the chart](/docs/dashboards/panels/modify-chart) as desired.

## Drill down from a map chart

Hover over a point on a Cluster or Heatmap chart to see a tooltip with drill-down instructions. On a Missile map, hover over the line between the source and destination.

* **Click** to zoom in or out on the map.
* **Shift+click** to drill down into the data for that location. Sumo Logic opens the Log Search page with the query already filled in with the corresponding latitude and longitude values. Run the query to see the details.
