---
title: SentinelOne
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sentinelone.png')} alt="sentinelone" width="100"/>

***Version: 1.10  
Updated: April 30, 2026***

SentinelOne Endpoint Protection Platform (EPP) unifies prevention, detection, and response in a single, purpose-built agent powered by machine learning and automation. It provides prevention and detection of attacks across all major vectors, rapid elimination of threats with fully automated, policy-driven response capabilities, and complete visibility into the endpoint environment with full-context, real-time forensics.

## Actions

* **Hash Reputation** *(Enrichment)*- Gather hash reputation information.
* **Add Blacklist Items** (*Containment*) - Add a wildcard hash to blacklist.
* **Get Blacklist Items** *(Enrichment)* - Get blacklisted hashes.
* **Delete Blacklist Items** (*Containment*) - Remove a wildcard hash from blacklist.
* **Get Threats** *(Enrichment)* - Get all Threats.
* **List Group IDs** *(Enrichment)* - List Group IDs on the system.
* **List Agents** *(Enrichment)* - Listagents.
* **Get Sites** *(Enrichment)* - Get sites.
* **Get Activities** *(Enrichment)* - Get last activities.
* **Connect to Network** *(Containment)* - Reconnects an endpoint to the network.
* **Disconnect from Network** *(Containment)* - Isolates an endpoint from the network.
* **Get Alerts** *(Enrichment)* - Fetches base Alerts from SentinelOne.
* **Update Alert SentinelOne** *(Notification)* - Updates the Analyst Verdict of an alert(s).
* **Monitor Threat Status** *(Scheduled)* - Scheduled action that exits when the status of a threat is “resolved” (timeout currently set to 12 hours).
* **Update Threat** *(Notification)* - Updates the Status and Analyst Verdict of a SentinelOne Threat Incident.
* **SentinelOne Threats Daemon** *(Daemon)* - automatically ingest SentinelOne Threats.

## Category

XDR

## Configure SentinelOne in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your SentinelOne API URL, for example, `https://<URL>.sentinelone.net`.

* **Token**. Enter your SentinelOne token.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sentinelone-configuration.png')} style={{border:'1px solid gray'}} alt="SentinelOne configuration" width="400"/>

For information about SentinelOne, see [SentinelOne documentation](https://www.sentinelone.com/resources/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.10 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.9 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.8 | June 22, 2023 | Removed unnecessary spaces. |
| v1.7 | February 17, 2023 | Updated the **List Agents** action to add a Query field for filtering. |
| v1.6 | February 8, 2023 | Updated the **List Agents** action to add an IP field for filtering and improve error handling. |
| v1.5 | January 30, 2023 | Refactored the **SentinelOne Threats Daemon**. |
| v1.4 | January 16, 2023 | Refactored the integration. |
| v1.3 | October 28, 2022 | Renamed the **Get Agents** action to **List Agents** and refactored it. |
| v1.2 | August 30, 2022 | Added new actions: **Connect to Network**, **Disconnect from Network**, **Get Alerts**, **Update Alert SentinelOne**, **Monitor Threat Status**, **Update Threat**, and **SentinelOne Threats Daemon**. |
| v1.1 | July 19, 2022 | <ul><li>Added a default URL in the connector.</li><li>Changed some labels in the connector.</li></ul> |
| v1.0 | March 26, 2021 | Initial release of the SentinelOne integration. |
