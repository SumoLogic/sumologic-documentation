---
title: Cisco Threat Response
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-threat-response.png')} alt="cisco-threat-response" width="70"/>

***Version: 1.2  
Updated: Jul 21, 2023***

Gather Cisco Threat Response threat intelligence data to enrich incident artifacts.

## Actions

* **Malware Search** (*Enrichment*) - Search for specific malware strain.
* **Sightings Search** (*Enrichment*) - Search for sightings by malware name.
* **Vulnerability Search** (*Enrichment*) - Search for vulnerabilities by vulnerability type.
* **Enrich Observables** (*Enrichment*) - Gather a verdict for a given cyber observable.
* **Extract Observable Type** (*Enrichment*) - Extract Observable Type.
* **List Malware** (*Enrichment*) - Get a list of malware signatures.
* **List Vulnerabilities** (*Enrichment*) - Get a list of vulnerabilities.
* **List Sightings** (*Enrichment*) - Search available sightings.

## Configure Cisco Threat Response in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-threat-response-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Threat Response configuration" width="400"/>

For information about Cisco Threat Response, see [Cisco Threat Response documentation](https://ciscosecurity-sx-00-integration-workflows.readthedocs-hosted.com/en/latest/threatresponse/api_intro/api_client.html).

## Change Log

* February 21, 2020 - First upload
* May 22, 2020 - New actions added
* July 21, 2023 (v1.2) - Integration refactored
