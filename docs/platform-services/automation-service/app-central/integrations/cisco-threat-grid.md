---
title: Cisco Threat Grid
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-threat-grid.png')} alt="cisco-threat-grid" width="70"/>

***Version: 1.2  
Updated: Jul 11, 2023***

Utilize the Cisco AMP Threat Grid to retrieve information about incident elements such as IP, domain, or file hash.

## Actions

* **IP Reputation** (*Enrichment*) - Search Cisco AMP ThreatGrid for reputation information on the specified IP.
* **URL Reputation** (*Enrichment*) - Search Cisco AMP ThreatGrid for reputation information on the specified URL.
* **Domain Reputation** (*Enrichment*) - Search Cisco AMP ThreatGrid for reputation information on the specified domain.
* **Detonate File** (*Enrichment*) - Detonate the specified file.
* **PCAP Of A Detonated File** (*Enrichment*) - Get the PCAP file generated during the detonation of the file.
* **Detonate Report** (*Enrichment*) - Get the report generated during the detonation of the file, specified by File Hash.
* **Detonate URL** (*Enrichment*) - Detonate remote file from a specified URL.

## Configure Cisco Threat Grid in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-threat-grid-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Threat Grid configuration" width="400"/>

For information about Cisco Secure Malware Analytics (formerly Threat Grid), see [Cisco Secure Malware Analytics (Threat Grid) documentation](https://www.cisco.com/c/en/us/support/security/amp-threat-grid-appliances/series.html).

## Change Log

* February 5, 2020 - First upload
* July 7, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from CISCO Threat Grid OIF to CISCO Threat Grid
	+ Changed fields visibility
