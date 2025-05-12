---
title: Hacker Target
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hacker-target.png')} alt="hacker-target" width="100"/>

***Version: 1.1
Updated: Jul 06, 2023***

Utilize Hacker Target's investigational tools during an incident.

## Actions

* **Find A Records** (*Enrichment*) - Query Hacker Target for A records matching the specified domain.
* **Search DNS Records** (*Enrichment*) - Query Hacker Target for DNS records matching the specified domain or IP.
* **HTTP Records** (*Enrichment*) - Query Hacker Target for HTTP records matching the specified domain.
* **Geo IP Lookup** (*Enrichment*) - Retrieve geolocation information for the specified IP address from Hacker Target.
* **Ping** (*Enrichment*) - Ping the specified domain or IP from Hacker Target.
* **Reverse DNS** (*Enrichment*) - Query Hacker Target for reverse DNS information on the specified domain or IP.
* **Reverse IP** (*Enrichment*) - Query Hacker Target for reverse IP information on the specified domain or IP.
* **Traceroute** (*Enrichment*) - Run a traceroute command on the specified domain or IP from Hacker Target.
* **Whois Lookup** (*Enrichment*) - Retrieve Whois information for the specified IP address.
* **Page Links** (*Enrichment*) - Parse the html of a website and extract links from the page.

## Configure Hacker Target in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/hacker-target-configuration.png')} style={{border:'1px solid gray'}} alt="Hacker Target configuration" width="400"/>

For information about Hacker Target, see the [Hacker Target website](https://hackertarget.com/).

## Change Log

* December 19, 2019 - First upload
* March 10, 2022 - Logo
* July 6, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Hacker Target OIF to Hacker Target
