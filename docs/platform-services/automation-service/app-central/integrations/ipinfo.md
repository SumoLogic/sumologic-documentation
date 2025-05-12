---
title: IPinfo
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ipinfo.png')} alt="ipinfo" width="90"/>

***Version: 1.2  
Updated: Nov 24, 2023***

IPinfo is an IP data provider specialized in IP address geolocation, ASN, IP address company, VPN detection, carrier IP address, IP address ranges, and hosted domain data.

## Actions

* **Geolocate IP Address** (*Enrichment*) - Retrieve geolocation data for the provided IP Address (1).
* **List Hosted Domains** (*Enrichment*) - Retrieve a list of all domains hosted on the provided IP address (2).

(1) Available in: Free, Basic, Standard, Business, and Enterprise. 

The API returns all the data the token has access to for the target IP address.

Visit [IPinfo](https://ipinfo.io/developers/data-types#geolocation-data) for more info.

(2) Available in: Business, and Enterprise. 

Visit [IPinfo](https://ipinfo.io/developers/hosted-domains) for more info.

## IPinfo configuration

This integration requires an IPinfo Access Token. You can [retrieve](https://ipinfo.io/account/token) the Access Token from your IPinfo account.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ipinfo/ipinfo-1.png')} style={{border:'1px solid gray'}} alt="ipinfo" width="800"/>

## Configure IPinfo in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ipinfo-configuration.png')} style={{border:'1px solid gray'}} alt="IPinfo configuration" width="400"/>

For information about IPinfo, see [IPinfo documentation](https://ipinfo.io/developers).

## Change Log

* July 12, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 24, 2023 (v1.2)
	+ Enabled Incident Artifacts feature flag for IP Address field
	+ Added integer validator and placeholder for Connection Timeout resource field
	+ Removed trailing/leading spaces
