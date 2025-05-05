---
title: Cisco Umbrella Investigate
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-umbrella-investigate.png')} alt="cisco-umbrella-investigate" width="70"/>

***Version: 1.4  
Updated: Jun 23, 2023***

Gather enrichment data on incident observables using Cisco Umbrella Investigate.

## Actions

* **Domain Reputation** (*Enrichment*) - Get the domain status (safe, malicious, or not classified) and the domain’s categories from Cisco Umbrella Investigate for the specified domain.
* **IP Reputation** (*Enrichment*) - List any malicious domains from Cisco Umbrella Investigate associated with the specified IP.
* **Domain Whois** (*Enrichment*) - Get Whois information from Cisco Umbrella Investigate for the specified domain.
* **Email Whois** (*Enrichment*) - List any domains registered using the specified email address from Cisco Umbrella Investigate.
* **IP Reputation V2** (*Enrichment*) - List malicious domains from Cisco Umbrella Investigate associated with the specified IP v2.

## Category

Threat Intelligence-Reputation

## Configure Cisco Umbrella Investigate in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Cisco Umbrella Investigate, see [Cisco Umbrella Investigate documentation](https://docs.umbrella.com/deployment-umbrella/docs/manage-umbrella-investigate).

## Change Log

* September 25, 2019 - First upload
* October 27, 2021 - New actions added
* November 22, 2022
	+ solved issue for which the integration test will throw an error if no value for timeout is provided
	+ set the timeout field as not required
* June 23, 2023 (v1.4)
	+ Updated the integration with Environmental Variables
	+ Renamed from CISCO Umbrella Investigate OIF to Cisco Umbrella Investigate
