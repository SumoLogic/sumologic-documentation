---
title: Mimecast
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mimecast.png')} alt="mimecast" width="100"/>

***Version: 1.4  
Updated: Feb 28, 2024***

Mimecast protects an enterprise's email infrastructure from viruses, malware, phishing, and the rise of deep-fake attacks. It does this by deploying a layered cyber resilience solution that prevents email-borne infections and reduces data loss by archiving emails.

## Actions

* **Get Account** *(Enrichment)* - Get the details about the used Mimecast account.
* **Get Audit Events** *(Enrichment)* - Get the attacks that have already occurred or is in progress.
* **Get Internal Domain** *(Enrichment)* - Get the internal domain inside the account.
* **Get Internal Users** *(Enrichment)* - Get the internal users inside a specific account domain.
* **Permit Block Emails** *(Containment)* - Permit and block sending email.
* **Send Email** *(Notification)* - Sent email to another email.

## Mimecast configuration

To configure Mimecast, see [Mimecast documentation](https://integrations.mimecast.com/documentation/api-overview/).

## Configure Mimecast in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Mimecast base URL including region. For example, `https://us-api.mimecast.com`

* **Access Key**. Enter the Mimecast [access key](https://mimecastsupport.zendesk.com/hc/en-us/articles/34000328220691-API-Integrations-Managing-API-1-0-for-Cloud-Gateway#h_01J9NHPTM1WHT43ZW6E34BEJMB).

* **Secret Key**. Enter the Mimecast secret key associated with the access key.

* **Application ID**. Enter the Mimecast [application ID](https://mimecastsupport.zendesk.com/hc/en-us/articles/34000328220691-API-Integrations-Managing-API-1-0-for-Cloud-Gateway#h_01J9NHPTM0SBEQH63A2AZBP9YA).

* **Application Key**. Enter the Mimecast application key associated with the application ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mimecast-configuration.png')} style={{border:'1px solid gray'}} alt="Mimecast configuration" width="400"/>

For information about Mimecast, see [Mimecast documentation](https://integrations.mimecast.com/documentation/).

## Change Log

* November 3, 2021 - First upload
* June 9,2023 - Refactored
* July 7, 2023 (v1.2) - Removed leading/trailing spaces
* July 14, 2023 (v1.3) - Code refactoring
* February 28, 2024 (v1.4) - Updated code for compatibility with Python 3.12
