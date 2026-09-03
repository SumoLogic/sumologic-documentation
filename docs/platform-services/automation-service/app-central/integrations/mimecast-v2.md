---
title: Mimecast V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mimecast.png')} alt="mimecast" width="100"/>

***Version: 1.0  
Updated: August 25, 2026***

Mimecast V2 protects an enterprise's email infrastructure from viruses, malware, phishing, and the rise of deep-fake attacks. It does this by deploying a layered cyber resilience solution that prevents email-borne infections and reduces data loss by archiving emails. This integration uses the Mimecast API v2.0.

## Actions

* **Create Remediation Incident** *(Containment)* - Create a new remediation incident to trigger email purge/removal from user mailboxes.
* **Get TTP URL Click Logs** *(Enrichment)* - Retrieve click tracking and URL events, including who clicked a URL, which URL was clicked, and when.
* **Get Remediation Incident** *(Enrichment)* - Get the details of a remediation incident, including containment and audit logs confirming whether a domain was blocked and emails were removed from user mailboxes.
* **Get Audit Events** *(Enrichment)* - Get the attacks that have already occurred or are in progress.
* **Get Internal Domain** *(Enrichment)* - Get the internal domain inside the account.
* **Get Internal Users** *(Enrichment)* - Get the internal users inside a specific account domain.
* **Permit Block Emails** *(Containment)* - Permit and block sending email.
* **Send Email** *(Notification)* - Send an email for end-user notification.

## Mimecast configuration

To configure Mimecast V2, see [Mimecast API v2.0 documentation](https://developer.services.mimecast.com/api-overview).

## Configure Mimecast V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Mimecast base URL including region. For example, `https://us-api.mimecast.com`

* **Client ID**. Enter the Mimecast [client ID](https://developer.services.mimecast.com/api-overview) obtained from your Mimecast API v2.0 application.

* **Client Secret**. Enter the Mimecast client secret associated with the client ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

For information about Mimecast, see [Mimecast documentation](https://developer.services.mimecast.com/).

## Change Log

* August 25, 2026 (v1.0) - First upload
