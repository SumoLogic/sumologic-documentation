---
title: IPinfo
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/ipinfo.png)

Version: 1.2  
Updated: Nov 24, 2023

IPinfo is an IP data provider specialized in IP address geolocation, ASN, IP address company, VPN detection, carrier IP address, IP address ranges and hosted domain data.

## Actions

* **Geolocate IP Address** (*Enrichment*) - Retrieve geolocation data for the provided IP Address (1)
* **List Hosted Domains** (*Enrichment*) - Retrieve a list of all domains hosted on the provided IP address (2)

(1) Available in: Free, Basic, Standard, Business, and Enterprise. 

The API returns all the data the token has access to for the target IP address.

Please visit <https://ipinfo.io/developers/data-types#geolocation-data> for more info.

(2) Available in: Business, and Enterprise. 

Please visit <https://ipinfo.io/developers/hosted-domains> for more info.

## IPinfo Configuration

This integration requires an IPinfo Access Token.

You can retrieve the Access Token from your IPinfo account here <https://ipinfo.io/account/token> 

![](/img/platform-services/automation-service/app-central/integrations/ipinfo/ipinfo-1.png)

## Change Log

* July 12, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 24, 2023 (v1.2)
	+ Enabled Incident Artifacts feature flag for IP Address field
	+ Added integer validator and placehoder for Connection Timeout resource field
	+ Removed trailing/leading spaces
