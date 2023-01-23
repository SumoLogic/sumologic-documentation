---
id: map-charts
title: Map Charts
description: Map charts are useful for showing IP addresses from log messages on a map.
---


Map charts show the location and number of hits from data on a map.

To map your data you can: 

* Use the [geoip](/docs/search/search-query-language/search-operators/geoip) or [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) operators to provide these values from extracted IPv4 and IPv6 addresses.
* Manually provide valid aggregated **latitude** and **longitude** values. Ensure the field names are 'latitude' and 'longitude' so that map chart can recognize them. Format the values with positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W, such as, `30.42` and `-87.21`.

For example, you'd use the geoip operator to create a map chart:

```sql
| parse "remote_ip=*]" as client_ip
| geoip client_ip
| count by latitude, longitude
| sort _count
```

Or, you'd use the geo lookup operator to create a map chart:

```sql
_sourceCategory=Error
| parse regex "(\<client_i\>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| lookup latitude, longitude, country_code, country_name, region, city, postal_code from geo://location on ip = client_ip
| count by latitude, longitude, country_code, country_name, region, city, postal_code
| sort _count
```

which would produce results such as:

![geo lookup results fields.png](/img/dashboards-new/panels/map-charts/geo-lookup-results-fields.png)

## Rules

* Latitude and longitude values need to be provided with the fields 'latitude' and 'longitude' respectively.
* Latitude and longitude values need to be positive or negative based on being north/south or east/west, instead of using the terms N/S, E/W, such as, `30.42` and `-87.21`.
* A `_count` aggregator is required. 
* Other aggregators like `sum` or `avg` don't provide accurate results. 

## Limitations

* Map charts have a display limit of 10,000 results.
* Colors of map markers can't be changed.

## Create a map chart

To add a panel with a map chart:

1. Create or open a Dashboard (New) and click on **Add Panel > Map**.  

    ![map panel option.png](/img/dashboards-new/panels/map-charts/map-panel-option.png)

1. Provide a [Geo Lookup](/docs/search/search-query-language/search-operators/geo-lookup-map) query and press **Enter** for it to run.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

1. A map chart is available in two types, **Cluster** or **Heatmap**.  

    ![new cluster map.png](/img/dashboards-new/panels/map-charts/new-cluster-map.png)  

    ![new heat map.png](/img/dashboards-new/panels/map-charts/new-heat-map.png)

1. [Modify the chart](/docs/dashboards-new/panels/modify-chart) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
