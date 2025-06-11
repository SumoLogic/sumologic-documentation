---
title: Hatching Triage
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hatching-triage.png')} alt="hatching-triage" width="100"/>

***Version: 1.3  
Updated: June 02, 2024***

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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Hatching Triage URL.

* **API Key**. Enter a Hatching Triage [API key](https://tria.ge/docs/cloud-api/conventions/#authentication).
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/hatching-triage-configuration.png')} style={{border:'1px solid gray'}} alt="Hatching Triage configuration" width="400"/>

For information about Recorded Future Triage ([formerly Hatching Triage](https://www.recordedfuture.com/press-releases/20220708?__hstc=127779026.d176b7b968ca49adca8682556d5d7654.1746109202335.1746109202335.1746109202335.1&__hssc=127779026.1.1746109202335&__hsfp=3347877758)), see [Recorded Future Triage documentation](https://tria.ge/docs/).

## Change Log

* June 19, 2020 - First upload
* August 30, 2020 - New actions added
* July 6, 2023 (v1.2) - Updated the integration with Environmental Variables
* June 2, 2024 (v1.3) - Updated API calls for the following actions:
  + Get Static Report
  + Get Triage Report
  + Get Summary Report
