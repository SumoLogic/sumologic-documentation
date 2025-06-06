---
title: Symantec Endpoint Protection Cloud
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-endpoint-protection-cloud.png')} alt="symantec-endpoint-protection-cloud" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Gather system information and event details from Symantec Endpoint Protection Cloud.

## Actions

* **Get Devices** (*Enrichment*) - Get a list of SEPC devices.
* **Get Event Details** (*Enrichment*) - Get the details of an event.
* **Search Into Events SEPC** (*Enrichment*) - Search for SEPC events.
* **System Info** (*Enrichment*) - Get detailed information about the specified device.
* **System Group Info** (*Enrichment*) - Get detailed information about the specified group.
* **System User Info** (*Enrichment*) - Get detailed information about the specified user.

## Configure Symantec Endpoint Protection Cloud in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Client ID**. Enter your Symantec Endpoint Protection [client ID](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-security/sescloud/Settings/creating-a-client-application-v132702110-d4152e4057.html).

* **API Client Secret**. Enter the secret for the client ID.

* **Customer ID**. Enter your Symantec Endpoint Protection [customer ID](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/getting-up-and-running-on-for-the-first-time-v45150512-d43e1033/symantec-endpoint-protection-quick-start-guide-v116381733-d25e6.html).

* **Domain ID**. Enter your Symantec Endpoint Protection [domain](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/managing-groups-clients-and-administrators/about-domains-v15506400-d1e150.html) ID.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-endpoint-protection-cloud-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec Endpoint Protection Cloud configuration" width="400"/>

For information about Symantec Endpoint Protection, see [Symantec Endpoint Protection documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all.html).

## Change Log

* April 18, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
