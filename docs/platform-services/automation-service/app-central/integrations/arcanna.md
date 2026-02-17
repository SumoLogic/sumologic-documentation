---
title: Arcanna
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arcanna.png')} alt="apivoid" width="90"/>

***Version: 1.1  
Updated: Jul 18, 2023***

Arcanna enables experts to train context-aware AI models which encompass their knowledge and experience both in terms of cybersecurity and organizational distinctiveness. All without writing a single line of code.

## Actions

* **Get Jobs** *(Enrichment)* - The lists the AI jobs.
* **Get Decision** *(Enrichment)* - Retrieve the event decision.
* **Get System Health** *(Enrichment)* - Retrieve system health.
* **Send Event** *(Containment)* - Send an event to Arcanna.
* **Send Feedback** *(Containment)* - Updates the feedback on the event.

## Arcanna Elements configuration

Log in to Arcanna platform using your credentials login on Arcanna AI using [this](https://elements.withsecure.com/) URL.

## Configure Arcanna in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the base API URL for Arcanna.

* **API Key**. Enter your [Arcanna API key](https://docs.arcanna.ai/docs/user-guide/create-api-key/).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/arcanna-configuration.png')} style={{border:'1px solid gray'}} alt="Arcanna configuration" width="400"/>

For information about Arcanna, see [Arcanna documentation](https://docs.arcanna.ai/docs/introduction/introduction-to-arcanna).

## Category

Threat Intelligence-Reputation

## Change Log

* March 24, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
