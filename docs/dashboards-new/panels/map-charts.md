---
id: map-charts
---

# Map Charts

Map charts show the location and number of hits from data on a map.

To map your data you can: 

* Use the [geoip] (../../../05Search/Search-Query-Language/Search-Operators/geoip.md "geoip") or [Geo Lookup] (../../../05Search/Search-Query-Language/Search-Operators/Geo-Lookup.md "Geo Lookup (Map)") operators to provide these values from extracted IPv4 and IPv6 addresses.
* Manually provide valid aggregated **latitude** and **longitude** values. Ensure the field names are 'latitude' and 'longitude' so that map chart can recognize them. Format the values with positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W, such as, `30.42` and `-87.21`.

For example, you could use the geoip operator to create a map chart:

```sql
| parse "remote_ip=*]" as client_ip 
| geoip client_ip 
| count by latitude, longitude 
| sort _count
```

Or, you could use the geo lookup operator to create a map chart:

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
* Other aggregators like `sum` or `avg` do not provide accurate results. 

## Limitations

* Map charts have a display limit of 10,000 results.
* Colors of map markers cannot be changed.

## Create a map chart

To add a panel with a map chart:

1. Create or open a Dashboard (New) and click on **Add Panel \> Map**.  

    ![map panel option.png](/img/dashboards-new/panels/map-charts/map-panel-option.png)

1. Provide a [Geo Lookup] (../../../05Search/Search-Query-Language/Search-Operators/Geo-Lookup.md "Geo Lookup") query and press **Enter** for it to run.

    ![Add log query.png](/img/dashboards-new/create-dashboard-new/Add-log-query.png)

1. A map chart is available in two types, **Cluster** or **Heatmap**.  

    ![new cluster map.png](/img/dashboards-new/panels/map-charts/new-cluster-map.png)  

    ![new heat map.png](/img/dashboards-new/panels/map-charts/new-heat-map.png)

1. [Modify the chart](./modify-chart.md) as desired.

1. Click the **Add to Dashboard** button on the top right of the window to add the panel to your dashboard.  

    ![Add to Dashboard button.png](/img/dashboards-new/create-dashboard-new/Add-to-Dashboard-button.png)
