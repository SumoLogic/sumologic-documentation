---
title: Hatching Triage
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hatching-triage.png')} alt="hatching-triage" width="100"/>

***Version: 1.2  
Updated: Jul 06, 2023***

Detonate files with Hatching Triage Malware Sandbox.

## Actions

* **Detonate File** (*Enrichment*) - Denote a specific file.
* **Get Static Report** (*Enrichment*) - Get a specific static report.
* **Get Triage Report** (*Enrichment*) - Get a specific triage report.
* **Get Summary Report** (*Enrichment*) - Get a summary report.

## Notes

* Reports are returned in JSON. To save a report as an incident attachment, use Cloud SOAR Incident Tool integration action"Save Report in Attachments".

## Configure Hatching Triage in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 19, 2020 - First upload
* August 30, 2020 - New actions added
* July 6, 2023 (v1.2) - Updated the integration with Environmental Variables
