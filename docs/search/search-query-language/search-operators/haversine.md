---
id: haversine
title: haversine Search Operator
sidebar_label: haversine
---

The `haversine` operator returns the distance between latitude and longitude values of two coordinates in kilometers. Coordinates need to be positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W.

## Syntax

```sql
haversine(<latitude1>, <longitude1>, <latitude2>, <longitude2>) as <field>
```

## Example

```sql
| haversine(39.04380, -77.48790, 45.73723, -119.81143) as distanceKMs
```

This returns a field named distanceKMs with the value '3,512.71000'.

### Return value in miles

To convert kilometers (KM) to miles you can divide the KM value by 1.609344.

```sql
| haversine(39.04380, -77.48790, 45.73723, -119.81143)/1.609344 as distanceMiles
```

### Landspeed violation example

You can use the following query detect landspeed violations in AWS CloudTrail with haversine:

```sql
_sourceCategory=Labs/AWS/CloudTrail
| json "userIdentity.userName" as user nodrop
| json "sourceIPAddress" as ip nodrop
//| filter and sort the data
| where user matches {{actor}}
| where isPublicIP(ip)
| min(_messagetime) AS login_time BY user, ip
| sort BY user, +login_time
//| Next, find the previous IP address where each user logged in from, and the previous login time.
| ipv4ToNumber(ip) AS ip_decimal
| backshift ip_decimal BY user
| backshift login_time AS previous_login
| where !(isNull(_backshift))
//| Next, we’ll convert the IP addresses that are in a decimal format to the standard IP address using octets.
| toInt(floor(_backshift/pow(256, 3))) AS octet1
| toInt(floor((_backshift-octet1*pow(256, 3))/pow(256, 2))) AS octet2
| toInt(floor((_backshift-(octet1*pow(256, 3)+octet2*pow(256, 2)))/256)) AS octet3
| toInt(_backshift-(octet1*pow(256, 3)+octet2*pow(256, 2)+octet3*256)) AS octet4
| concat(octet1,".",octet2,".",octet3,".",octet4) AS previous_ip
//| Now that we have two different IP addresses, we can use geo lookup on both to find our where each occurred.
| lookup latitude AS lat1, longitude AS long1, country_name AS country_name1 FROM geo://location ON ip
| lookup latitude AS lat2, longitude AS long2, country_name AS country_name2 FROM geo://location ON ip=previous_ip
//| Now that we have two geolocations from two successive logins, we can calculate the distance between them using the Haversine function
| haversine(lat1, long1, lat2, long2) AS distance_kms
//| Calculate the speed someone would need to travel that distance in the time between the two logins
| (login_time - previous_login)/3600000 AS login_time_delta_hrs
| distance_kms/login_time_delta_hrs AS apparent_velocity_kph
| where apparent_velocity_kph > 0
//| Flag certain speeds as suspicious.
| 500 AS suspicious_speed
| where apparent_velocity_kph > suspicious_speed
//| add some formatting to clean up the results and make them more human-readable. Add these lines to your query:
| concat(ip,", ",previous_ip) AS ip_addresses
| if(country_name1 <> country_name2, concat(country_name1, ", ", country_name2), country_name1) AS countries
| fields user, ip_addresses, countries, distance_kms, login_time_delta_hrs, apparent_velocity_kph
| where !isNull(user)
| where apparent_velocity_kph != "Infinity"
| sort by apparent_velocity_kph
```
