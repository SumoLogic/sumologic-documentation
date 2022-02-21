---
id: geoip
---

# geoip

Sumo Logic can match a
[parsed](../01-Parse-Operators.md "Parse Operators") IPv4 or IPv6
address to its geographical location on a [map
chart](../../../Visualizations-and-Alerts/Dashboard_(New)/Panels/Map_Charts.md "Map Charts").
To create the map the **geoip** operator matches parsed IP addresses to
their physical location based on the latitude and longitude of where the
addresses originated. The precision for latitude and longitude degrees
is up to five decimal places. 

Any IP addresses that don't have a location, such as internal addresses,
will return null values.

### Syntax

-   `geoip\<ip_address_fiel\> \<optional_field\>,\<optional_field\>...]`

##### Default result fields

-   latitude
-   longitude
-   country_code
-   country_name
-   city
-   state

##### Optional fields

Depending on how specific you’d like the output to be you can include
all the optional fields or choose a subset:

-   region
-   continent
-   postal_code
-   connection_type
-   country_cf
-   state_cf
-   city_cf

Details of these data fields can be found in [Neustar's
documentation](https://ipintelligence.neustar.biz/portal/#documentation "https://ipintelligence.neustar.biz/portal/#documentation")
under the GeoPoint Data Glossary topic.

### Syntax to Map

To map the IP addresses properly you must
[count](../../../Metrics/Metric-Queries-and-Alerts/07Metrics_Operators/count.md "count")
by the `latitude` and `longitude` fields. You must have the `_count`
field in your results. If you want to use a different field's value
[rename](as-operator.md "as operator") it to `_count` so the map uses
the field.

Your query should use the following syntax:

`| parse "[ip_fieldname]" as [ip_address] | geoip ip_address | count by latitude, longitude, [other geo_locator fields]`

This syntax produces aggregate results, so you can add a map to a
Dashboard.
\<div class="mt-contentreuse-widget"
page="Visualizations-and-Alerts/Dashboards/Chart-Panel-Types/Map-Charts"
section="Limitations" show="true\>
\</di\>

### Examples

Sample log message:

`2017-12-13 10:29:17,037 -0800 INFO [hostId=prod-frontend-1] [module=SERVICE] [logger=service.endpoint.auth.v1.impl.AuthenticationServiceDelegate [thread=btpool0-8] [remote_ip=67.180.85.25] Successful login for user 'da@users.com', organization: '0000000000000005`

Using logs that match the example log format, running a query like this:

`| parse "remote_ip=*]" as remote_ip | geoip remote_ip | count by latitude, longitude | sort _count`

would produce the following results:

![geo lookup world
map.png](../../static/img/Search-Query-Language/Search-Operators/geoip/../Geo-Lookup/geo%20lookup%20world%20map.png)

#### View map of geoip results

Enter a query that parses the IP field from your logs,
a **geoip** operator to match IP addresses and return geolocation fields
you’d like to use to chart each IP address.

1.  By default, results display as a table:  
    ![geo lookup results
    fields.png](../../static/img/Search-Query-Language/Search-Operators/geoip/../Geo-Lookup/geo%20lookup%20results%20fields.png)
2.  Click the **Map** icon in the **Aggregates** tab. The map
    displays:  
    ![map icon
    location.png](../../static/img/Search-Query-Language/Search-Operators/geoip/../Geo-Lookup/map%20icon%20location.png)
3.  Do any of the following:

-   Use the zoom slider to zoom in or out on an area of the map.
    Alternately, click and drag to zoom in or see different areas of a
    map.
-   Click any marker on the map to see more detail about where IPs
    originate in a specific area:  
    ![click map marker with zoomed
    results.png](../../static/img/Search-Query-Language/Search-Operators/geoip/../Geo-Lookup/click%20map%20marker%20with%20zoomed%20results.png)

1.  (Optional) Click **Add to Dashboard** to create a new Dashboard or
    add the map to an existing Dashboard. After adding a map to a
    Dashboard you'll still be able to zoom in and drill down on the
    data.

#### Optional fields

This example returns the optional fields region, continent, and
postal_code.

`| parse "remote_ip=*]" as remote_ip | geoip remote_ip | count by latitude, longitude, region, continent, postal_code`

#### Handle null values

To find a mismatch from a geo lookup operator query, use
the [isNull](isNull,-isEmpty,-isBlank.md "isNull, isEmpty, isBlank")
operator.

For example, running a query like:

`| parse "remote_ip=*]" as remote_ip | geoip remote_ip | if (isNull(country_code), "unknown", country_code) as country_code`

returns results similar to:

![isNull.png](../../static/img/Search-Query-Language/Search-Operators/geoip/../isNull,-isEmpty,-isBlank/isNull.png)
