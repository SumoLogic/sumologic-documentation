---
title: AlienVault OTX
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alienvault-otx.png')} alt="alienvault-otx" width="90"/>

***Version: 1.12  
Updated: Sep 04, 2023***

Enrich incident evidence with threat intelligence data from AlienVault OTX.

## Actions

* **Domain Info** (*Enrichment*) - Gather information of specific domain.
* **Domain Reputation** (*Enrichment*) - Gather the reputation score of a specific domain.
* **File Info** (*Enrichment*) - Gather information on a specific file.
* **File Reputation** (*Enrichment*) - Gather the reputation score of a specific file.
* **Geo Locate Domain Info** (*Enrichment*) - Geographically locate a specific domain.
* **IP Reputation** (*Enrichment*) - Gather the reputation score for a specific IP address.
* **Page Links** (*Enrichment*) - Gather page link information.
* **Reverse DNS** (*Enrichment*) - Gather reverse DNS information.
* **Scan URL** (*Enrichment*) - Scan a specific URL.
* **URL Info** (*Enrichment*) - Gather information on a specific URL.
* **URL Reputation** (*Enrichment*) - Gather the reputation score for a specific URL.
* **Whois Lookup** (*Enrichment*) - Gather Whois information.

## External Libraries

* [AlienVault OTX](https://github.com/AlienVault-OTX/OTX-Python-SDK/blob/master/LICENSE)

## Category

Threat Intelligence-Reputation

## Configure AlienVault in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* October 3, 2019 - First upload
* July 19, 2022 (v1.2)
	+ Changed API key field type to password
	+ Changed logo
* January 25 (v1.3)
	+ added env class
* March 3, 2023 (v1.4)
	+ Updated **IP Reputation** action
	+ Updated integration Fields Label
* June 15, 2023 (v1.7) - Updated the integration with Environmental Variables
* June 29, 2023 (v1.8) - Integration renamed from AlienVault OTX OIF to AlienVault OTX
* August 23, 2023 (v1.11) - Integration refactored
* September 4, 2023 (v1.12) - Changed action field type from list to text in Scan URL action
