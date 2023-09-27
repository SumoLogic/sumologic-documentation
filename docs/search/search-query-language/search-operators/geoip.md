---
id: geoip
title: geoip Search Operator
sidebar_label: geoip
---

Sumo Logic can match a <a href="/docs/search/search-query-language/parse-operators">parsed</a> IPv4 or IPv6 address to its geographical location on a <a href="/docs/dashboards/panels/map-charts">map chart</a>. To create the map, the `geoip` operator matches parsed IP addresses to their physical location based on the latitude and longitude of where the addresses originated. The precision for latitude and longitude degrees is up to five decimal places. 

Any IP addresses that don't have a location, such as internal addresses, will return null values.

## Syntax

```sql
geoip <ip_address_field> [<optional_field1>, <optional_field2>...]
```

### Default result fields

* latitude
* longitude
* country_code
* country_name
* city
* state

### Optional fields

Depending on how specific you’d like the output to be you can include
all the optional fields or choose a subset:

* region
* continent
* postal_code
* connection_type
* country_cf
* state_cf
* city_cf

Details of these data fields can be found in [Neustar's documentation](https://ipintelligence.neustar.biz/portal/#documentation) under the GeoPoint Data Glossary topic.

## Syntax to Map

To map the IP addresses properly you must [count](/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent) by the `latitude` and `longitude` fields. You must have the `_count` field in your results. If you want to use a different field's value [rename](as.md) it to `_count` so the map uses the field.

Your query should use the following syntax:

```sql
| parse "[ip_fieldname]" as [ip_address]
| geoip ip_address
| count by latitude, longitude, [other geo_locator fields]
```

This syntax produces aggregate results, so you can add a map to a Dashboard.

## Limitations

* Map charts have a display limit of 10,000 results.
* Colors of map markers can't be changed.

## Examples

Sample log message:

```
2017-12-13 10:29:17,037 -0800 INFO [hostId=prod-frontend-1] [module=SERVICE] [logger=service.endpoint.auth.v1.impl.AuthenticationServiceDelegate [thread=btpool0-8] [remote_ip=67.180.85.25] Successful login for user 'da@users.com', organization: '0000000000000005
```

Using logs that match the example log format, running a query like this:

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| count by latitude, longitude
| sort _count
```

would produce the following results:

![geo lookup world map.png](/img/search/searchquerylanguage/search-operators/geo-lookup-world-map.png)

### View map of geoip results

Enter a query that parses the IP field from your logs, a **geoip** operator to match IP addresses and return geolocation fields you’d like to use to chart each IP address.

1. By default, results display as a table:  

    ![geo lookup results fields.png](/img/search/searchquerylanguage/search-operators/geo-lookup-results-fields.png)

1. Click the **Map** icon in the **Aggregates** tab. The map displays:  

    ![map icon location.png](/img/search/searchquerylanguage/search-operators/map-icon-location.png)

1. Do any of the following:

   * Use the zoom slider to zoom in or out on an area of the map. Alternately, click and drag to zoom in or see different areas of a map.
   * Click any marker on the map to see more detail about where IPs originate in a specific area:  

       ![click map marker with zoomed results.png](/img/search/searchquerylanguage/search-operators/click-map-marker-with-zoomed-results.png)

1. (Optional) Click **Add to Dashboard** to create a new Dashboard or add the map to an existing Dashboard. After adding a map to a Dashboard you will still be able to zoom in and drill down on the data.

### Optional fields

This example returns the optional fields region, continent, and postal_code.

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| count by latitude, longitude, region, continent, postal_code
```

### Handle null values

To find a mismatch from a geo lookup operator query, use the [isNull](/docs/search/search-query-language/search-operators/isnull-isempty-isblank#isnullstring) operator.

For example, running a query like:

```sql
| parse "remote_ip=*]" as remote_ip
| geoip remote_ip
| if (isNull(country_code), "unknown", country_code) as country_code
```

returns results similar to:

![isNull.png](/img/search/searchquerylanguage/search-operators/isNull.png)
