---
title: SentinelOne
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sentinelone.png')} alt="sentinelone" width="100"/>

***Version: 1.9  
Updated: Mar 4, 2024***

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

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sentinelone-configuration.png')} style={{border:'1px solid gray'}} alt="SentinelOne configuration" width="400"/>

For information about SentinelOne, see [SentinelOne documentation](https://www.sentinelone.com/resources/).

## Change Log

* March 26, 2021 - First upload
* July 19, 2022
    + added default URL in the connector
    + changed some labels in the connector
* August 30, 2022 - Added new actions:
    + Connect to Network
    + Disconnect from Network
    + Get Alerts
    + Update Alert SentinelOne
    + Monitor Threat Status
    + Update Threat
    + SentinelOne Threats Daemon
* October 28, 2022 - Action Get Agents renamed to List Agents and refactored
* January 16, 2023 - Integration refactored
* January 30, 2023 - Updated Daemon
    + SentinelOne Threats Daemon: refactored
* February 8, 2023 (v1.6)
    + Updated Action: List Agents (Added IP field for filtering and Improved error handling)
* February 17, 2023 (v1.7)
    + Updated Action: List Agents (Added Query field for Filtering)
* June 22, 2023 (v1.8) - Removed unnecessary spaces
* March 4, 2024 (v1.9) - Updated code for compatibility with Python 3.12
