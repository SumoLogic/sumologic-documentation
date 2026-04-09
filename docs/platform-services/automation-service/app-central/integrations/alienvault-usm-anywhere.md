---
title: AlienVault USM Anywhere
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alienvault-usm-anywhere.png')} alt="Alienvault USM Anywhere icon" width="90"/>

***Version: 1.3  
Updated: April 8, 2026***

Search events, alarms, and update labels in AlienVault USM Anywhere.

## Actions

* **Get Events** (*Enrichment*) - Gather all available events.
* **Get Event** (*Enrichment*) - Gather information about a specific event.
* **Get Alarms** (*Enrichment*) - Gather all available alarms.
* **Get Alarm** (*Enrichment*) - Gather information on a specific alarm.
* **Get Labels** (*Enrichment*) - Gather all available labels.
* **Add Label** (*Notification*) - Add a new label.
* **Delete Label** (*Notification*) - Delete an existing label.
* **Get Events AlienVault Daemon** (*Daemon*) - Automatically gather all available events.
* **Get Alarms AlienVault Daemon** (*Daemon*) - Automatically gather all available alarms.

## Configure AlienVault USM Anywhere in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **Server URL**. Enter your AlienVault USM Anywhere URL, for example, `https://example.alienvault.cloud/`

* **Client ID**. Enter your [AlienVault USM Anywhere Client ID](https://cybersecurity.att.com/documentation/usm-anywhere/user-guide/user-management/api-clients.htm).

* **Client Secret**. Enter the secret for the client ID.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alienvault/alienvault-usm-configuration.png')} style={{border:'1px solid gray'}} alt="Alienvault USM Anywhere configuration" width="400"/>

For information about AlienVault USM Anywhere, see [AlienVault USM Anywhere documentation](https://cybersecurity.att.com/documentation/usm-anywhere.htm).

## Change Log

* September 17, 2019 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
* April 8, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
