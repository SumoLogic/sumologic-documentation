---
title: FortiAnalyzer
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortianalyzer.png')} alt="fortianalyzer" width="100"/>

***Version: 1.6  
Updated: April 29, 2026***

Search events and network traffic from Fortinet FortiAnalyzer.

## Actions

* **Search Into Events** (*Enrichment*) - Search FortiAnalyzer based on the specified criteria.
* **Get Alert Events** (*Enrichment*) - Get alerts based on specific event criteria.
* **Get Alert Event Logs** (*Enrichment*) - Get event logs based on the specified criteria.
* **Search Network Traffic** (*Enrichment*) - Search network traffic based on specific criteria.
* **List Incidents** (*Enrichment*) - List previously generated incidents.
* **Create Incident** (*Notification*) - Create new incident.
* **Update Incident** (*Notification*) - Update a previously created incident.
* **Get Alerts Events Daemon** (*Daemon*) - Daemon to pull FortiAnalyzer Alert Events.
* **Get Alert Events Daemon V2** *(Daemon*) - Daemon to pull FortiAnalyzer Alert Events.

## Configure FortiAnalyzer in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your FortiAnalyzer API URL, for example, `https://192.168.0.10/jsonrpc`

* **Username**. Enter the username of a FortiAnalyzer admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **ADOM Name (Daemon)**. Enter your FortiAnalyzer [ADOM name](https://docs.fortinet.com/document/fortianalyzer/7.6.0/administration-guide/718923/root-adom).

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortianalyzer-configuration.png')} style={{border:'1px solid gray'}} alt="FortiAnalyzer configuration" width="400"/>

For information about FortiAnalyzer, see [FortiAnalyzer documentation](https://docs.fortinet.com/product/fortianalyzer/7.6).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.6 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.5 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.4 | September 19, 2023 | Updated versioning. |
| v1.3 | September 4, 2023 | Fixed a bug where an error would occur if the timeout was not specified. |
| v1.2 | July 21, 2023 | Updated the integration with Environmental Variables. |
| | May 29, 2020 | Added a new action. |
| | June 19, 2019 | First upload. |
