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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your [Symantec EDR host address](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/Dialog-Overview/cs-help-console-lu-settings-policy-v25075140-d79e5424/ip-address-or-host-name-v23251765-d79e6255.html).

* **API Client ID**. Enter your [Symantec EDR client ID](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-detection-and-response/4-11/Settings/generating-an-oauth-client-v118551314-d38e48694.html).

* **API Client Secret**. Enter the secret for the client ID.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-edr-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec EDR configuration" width="400"/>

For information about Symantec EDR, see [Symantec EDR documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-detection-and-response/4-11.html).

## Change Log

* October 27, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
