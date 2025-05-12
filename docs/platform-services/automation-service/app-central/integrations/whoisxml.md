---
title: WhoisXML
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/whoisxml.png')} alt="whoisxml" width="100"/>

***Version: 1.5  
Updated: Jul 07, 2023***

WHOIS API service provides the registration details, also known as the WHOIS record data, of a domain name, an IP address, or an email address.

## Actions

* **Whois** *(Enrichment)* - Retrieve WHOIS record data.
* **DNS Lookup** *(Enrichment)* - Retrieve data about specific DNS.
* **Domain Reputation** *(Enrichment)* - Retrieve data about specific domain.
* **List Subdomains** *(Enrichment)* - Retrieve data about child subdomain for a specific domain.
* **Geolocate IP Address** *(Enrichment)* - Retrieve geolocation data for the provided IP Address.

## Configure WhoisXML in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **URL**. WhoisXML API URL.
   * **API Key**. Your WhoisXML API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/whoisxml/whoisxml-4.png')} style={{border:'1px solid gray'}} alt="vmware-workspace-one" width="400" />

For information about WhoisXML, see [WhoisXML documentation](https://whois.whoisxmlapi.com/documentation/making-requests).

## Change Log

* November 25, 2022 - First upload
* February 9, 2023 - Added new actions:
	+ DNS Lookup
	+ Domain Reputation
	+ List Subdomains
	+ Geolocate IP Address
* February 15, 2023 - New logo
* February 28, 2023 (v1.4)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* July 7, 2023 (v1.5) - Removed leading/trailing spaces
