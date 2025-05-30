---
title: Blueliv
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/blueliv.png')} alt="blueliv" width="80"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Enrich incident evidence with threat intelligence data from Blueliv.

## Actions

* **Detonate File** (*Enrichment*) - Execute a file in a virtual environment.
* **Domain** (*Enrichment*) - Check if the domain is listed in some malware campaign.
* **Get CVE** (*Enrichment*) - Retrieve CVE information.
* **Get Botnets** (*Enrichment*) - Get detailed information for Botnets.
* **List Compromised Credentials** (*Enrichment*) - List compromised credentials in a specific time period.
* **Get Campaign** (*Enrichment*) - Search for campaigns.
* **Get Credentials** (*Enrichment*) - Get compromised Credentials.
* **Get Credit Card** (*Enrichment*) - Get stolen Credit Cards.
* **Hacktivism** (*Enrichment*) - Track, monitor and preserve information from across all different forms of social media.
* **Hash** (*Enrichment*) - Search for hash values in malware DBs.
* **IP** (*Enrichment*) - Check if the IP is enlisted in some malware campaign.
* **List Modules** (*Enrichment*) - List Modules of your profile.
* **List Organizations** (*Enrichment*) - Get all Organizations(which are available on your Instance).

## Configure Blueliv in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/blueliv/blueliv-configuration.png')} style={{border:'1px solid gray'}} alt="Blueliv configuration" width="400"/>

For information about Blueliv, see [Outpost24](https://outpost24.com/blog/outpost24-acquires-threat-intelligence-solution-blueliv/).

## Change Log

* November 13, 2020 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
