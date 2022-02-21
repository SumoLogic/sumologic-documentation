---
id: haversine
---

# haversine

The **haversine** operator returns the distance between latitude and
longitude values of two coordinates in kilometers. Coordinates need to
be positive or negative values based on being north/south or east/west,
instead of using the terms N/S, E/W.

#### Syntax

-   `haversine\<latitude\>,\<longitude\>,\<latitude\>,\<longitude\>) as\<fiel\>`

#### Example

`| haversine(39.04380, -77.48790, 45.73723, -119.81143) as distanceKMs`

This returns a field named distanceKMs with the value '3,512.71000'.

##### Return value in miles

To convert kilometers (KM) to miles you can divide the KM value
by 1.609344.

`| haversine(39.04380, -77.48790, 45.73723, -119.81143)/1.609344 as distanceMiles`
