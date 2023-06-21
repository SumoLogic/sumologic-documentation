---
id: threat-investigation
title: Threat Investigation
sidebar_label: Threat Investigation
description: Learn how to use Cloud Security Analytics features to search for security threats. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To help you get started with Cloud Security Analytics, the [Search and Monitor Security Data](/docs/csa/search-and-monitor/) article showed you how to create a dashboard that displays the results of CloudTrail log queries. In this article, we show you how to enhance the dashboard to perform threat investigation.

We'll do the following:

* Detect brute force attempts by monitoring AWS CloudTrail data for a high number of failed login attempts within a period of time. Brute force attacks are when a hacker tries many different passwords to attempt to gain access. These attacks are a common cause of security breaches on governments, businesses, organizations, and private individuals. 
* Detect land speed violations by using geo lookup location data and combining it with timestamps and the Haversine formula. Land speed violations, also known as impossible travel, are a type of suspicious activity where a user logs in to an account in two different locations within a short period of time. If there are two logins to the same account on opposite sides of the globe in the same hour, at least one of those logins was probably illegitimate.
* Look up user information with CrowdStrike to see if any of the IP addresses you have logged are known threats or have been tied to malicious activity.   

:::note
The steps in this article build on steps performed in [Search and Monitor Security Data](/docs/csa/search-and-monitor/). Perform the steps in that article first before performing the steps below. 
:::

## Step 1: Detect brute force attacks

Brute force attacks are generally noted by a user failing to login a number of times, and then logging in successfully.  Let's write a query to look for this and display the results. 

1. Click **Add Panel** and **Time Series**.<br/><img src={useBaseUrl('img/csa/add-time-series-panel.png')} alt="Add a time series panel" style={{border: '1px solid black'}} width="300"/>
1. Type or paste the following code into the query window. (Replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
     ```
     _sourceCategory=Labs/AWS/CloudTrail
     | json field=_raw "userIdentity.userName" as actor
     | json field=_raw "eventType" as event_type
     | json field=_raw "sourceIPAddress" as src_ip
     | json field=_raw "responseElements.ConsoleLogin" as result
     | json field=_raw "eventName" as event_name
     | where event_type matches "{{event_type}}"
     | where actor matches "{{actor}}"
     | timeslice 1h
     | if(result = "Success",1,0) as success_count
     | if(result = "Failure",1,0) as failure_count |sum(success_count) as Success, sum(failure_count) as Failure by _timeslice,actor,event_type
     | where Failure>0
     | Failure/Success*100 as Failure_percent
     | order by Failure_percent desc
     | format("%.2f", Failure_percent) as Failure_percent
     ```
1. Click the magnifying glass icon to perform a search. If results do not display, select a longer time frame. (It's possible there have been no brute force attacks in the selected time frame, in which case no results will display.) 
1. Under **Chart Type**, select **Table**.
1. Rename this panel **Account Compromise Detection From Brute Force Attack**.
1. Click the **Add to Dashboard** button.  

If there have been brute force attacks during the queried time frame, your the new panel might look like this:<br/><img src={useBaseUrl('img/csa/brute-force-attack-panel.png')} alt="Brute force attack panel" style={{border: '1px solid black'}} width="800"/>

## Step 2: Detect landspeed violations

A "landspeed violation" occurs when a user logs in from an IP address and then logs in a short time later from a different IP address where the location is a significant distance from the first location. An example would be if someone logged in from New York City USA, and then 4 hours later logged in using the same IP address from Amsterdam in the Netherlands.  It’s impossible to get from New York City to Amsterdam in 4 hours, thus it is an example of a landspeed violation that could indicate stolen or compromised credentials. 

1. Click **Add Panel** and **Time Series**.<br/><img src={useBaseUrl('img/csa/add-time-series-panel.png')} alt="Add a time series panel" style={{border: '1px solid black'}} width="300"/>
1. Type or paste the following code into the query window. (Replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
     ```
     _sourceCategory=Labs/AWS/CloudTrail
     | json "userIdentity.userName","sourceIPAddress" as user, ip nodrop
     | where user matches "{{actor}}"
     | where isPublicIP(ip)
     | min(_messagetime) AS login_time BY user, ip
     | sort BY user, +login_time
     | ipv4ToNumber(ip) AS ip_decimal
     | backshift ip_decimal BY user
     | backshift login_time AS previous_login
     | where !(isNull(_backshift))
     | toInt(floor(_backshift/pow(256,3))) AS octet1 | toInt(floor((_backshift-octet1*pow(256,3))/pow(256,2))) AS octet2 | toInt(floor((_backshift-(octet1*pow(256,3)+octet2*pow(256,2)))/256)) AS octet3 | toInt(_backshift-(octet1*pow(256,3)+octet2*pow(256,2)+octet3*256)) AS octet4
     | concat(octet1,".",octet2,".",octet3,".",octet4) AS previous_ip
     | lookup latitude AS lat1, longitude AS long1, country_name AS country_name1 FROM geo://location ON ip
     | lookup latitude AS lat2, longitude AS long2, country_name AS country_name2 FROM geo://location ON ip=previous_ip
     | where !(isNull(lat1))
     | where !(isNull(long1))
     | where !(isNull(lat2))
     | where !(isNull(long2))
     | haversine(lat1, long1, lat2, long2) AS distance_kms
     | (login_time - previous_login)/3600000 AS login_time_delta_hrs
     | distance_kms/login_time_delta_hrs AS apparent_velocity_kph
     | where apparent_velocity_kph > 0
     | 500 AS suspicious_speed
     | where apparent_velocity_kph > suspicious_speed
     | concat(ip,", ",previous_ip) AS ip_addresses
     | if(country_name1 <> country_name2,concat(country_name1,",",country_name2),country_name1) AS countries
     | fields user, ip_addresses, countries, distance_kms,login_time_delta_hrs,apparent_velocity_kph
     | where !isNull(user)
     | where apparent_velocity_kph != "Infinity"
     | sort by apparent_velocity_kph
     ```
     The query does the following:
     * Converts the IP address to a decimal and moves through the users' IP addresses getting both the last login time and the previous login time.
     * Converts the decimal IP address back to an IPv4 address.
     * Looks up the country information for each IP address and filters out any NULL values.             
     * Uses the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) to calculate the kilometers in distance between the two locations.   
     * Calculates the time difference between the latest and previous logins, and then calculates, based on the distance, how fast that user must have been traveling in order to have personally logged in at both locations and times.
     * Adds the speed threshold above which the calculated speed would be considered "suspicious" or "unrealistic" (we use 500 km/hr in this case).  
     * Clean up the results and format for better presentation on the dashboard.
1. Click the magnifying glass icon to perform a search. If results do not display, select a longer time frame. (It's possible there have been no landspeed violations in the selected time frame, in which case no results will display.) 
1. Under **Chart Type**, select **Table**.
1. Rename this panel **Landspeed Violation**.
1. Click the **Add to Dashboard** button.

## Step 3: Look up user information with CrowdStrike

We need a way to see if any of the IP addresses we have logged are known threats or have been tied to malicious activity.  Sumo Logic has a partnership with [CrowdStrike](https://www.crowdstrike.com/) which allows us to look up IP addresses, email addresses, URLs, and other entities to see if they are known by CrowdStrike. 

1. Click **Add Panel** and **Time Series**.<br/><img src={useBaseUrl('img/csa/add-time-series-panel.png')} alt="Add a time series panel" style={{border: '1px solid black'}} width="300"/>
1. Type or paste the following code into the query window. (Replace `Labs/AWS/CloudTrail` with a valid source category for AWS CloudTrail logs in your environment.)
     ```
     _sourceCategory=Labs/AWS/CloudTrail
     | parse regex "(?<ip_address>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" multi
     | where ip_address != "0.0.0.0" and ip_address != "127.0.0.1"
     | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=ip_address
     | where type="ip_address" and !isNull(malicious_confidence)
     | if (isEmpty(actor), "Unassigned", actor) as Actor
     | parse field=raw "\"ip_address_types\":[\"*\"]" as ip_address_types nodrop
     | parse field=raw "\"kill_chains\":[\"*\"]" as kill_chains nodrop
     | timeslice 1m
     | count _timeslice, ip_address, malicious_confidence, actor, kill_chains, ip_address_types, _sourceCategory, _source
     | fields - ip_address,malicious_confidence,actor,kill_chains,ip_address_types,_sourcecategory,_source | count by _timeslice
     | outlier _count window=5,threshold=3,consecutive=1,direction=+-
     ```
1. Click the magnifying glass icon to perform a search. If results do not display, select a longer time frame. (It's possible there have been no landspeed violations in the selected time frame, in which case no results will display.) 
1. Under **Chart Type**, select **Line Chart**.
1. Rename this panel **CrowdStrike Data**.
1. Click the **Add to Dashboard** button. 

:::tip
Now that you've created a dashboard, you can [share it](/docs/dashboards-new/share-dashboard-new/) or [export it](/docs/dashboards-new/export-dashboard-new/). [Exporting and importing](/docs/get-started/library/#import-and-export-content-in-the-library) dashboards lets you use dashboards created in one org or account on another org or account. 
:::
