---
title: Symantec EDR
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-edr.png')} alt="symantec-edr" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Symantec EDR detects and exposes suspicious network activity, alerts to potentially harmful activity, prioritizes incidents for quick triage, and can navigate endpoint activity records during forensic analysis of potential attacks.

## Actions

* **List Incidents** (*Enrichment*) - Retrieve incidents.
* **Get Incident** (*Enrichment*) - Retrieve details for a specific incident.
* **Get Events For Incidents** (*Enrichment*) - Get Incident Related Events.
* **Process Lineage Events** (*Enrichment*) - Retrieve process lineage events for a specific incident.

## Configure Symantec EDR in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Symantec EDR, see [Symantec EDR documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-detection-and-response/4-11.html).

## Change Log

* October 27, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
