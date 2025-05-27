---
title: CrowdStrike Falcon
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon.png')} alt="crowdstrike-falcon" width="100"/>

***Version: 1.14  
Updated: April 23, 2025***

The CrowdStrike Falcon integration allows you to pull and update Detections/Incidents, and search Incidents/Devices/Detections.

## Actions

* **Close CrowdStrike Incident** *(Containment)* - Close the state of the CrowdStrike Incident.
* **Create Indicators** *(Containment)* - Create the Indicators.
* **Detections CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Detections.
* **Device Actions** *(Containment)* - Take various actions on the hosts in your environment.
* **Get Browser History** *(Enrichment)* - Get user Browser history.
* **Get Endpoint** *(Enrichment)* - Get details on one or more hosts by providing agent IDs.
* **Get Incident Info** *(Enrichment)* - Get details for a specific Crowdstrike Incident.
* **Get Indicators** *(Containment)* - Get Indicators By IDs.
* **Get User ID By Mail** *(Enrichment)* - Search for a specific User ID with a given email address.
* **Get IDP Device Info** *(Enrichment)* - Retrieve detailed information about a devices from IDP. Requires IDP rights and relevant IDP-related API scopes.
* **Incidents CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Incidents.
* **List Endpoints** *(Enrichment)* - Search for hosts in your environment by platform, hostname, IP.
* **Search into Detections** *(Enrichment)* - Search for Detections that match a given query.
* **Search into Incidents** *(Enrichment)* - Search for incidents by providing an FQL filter, sorting, and paging
  details.
* **Update Detections** *(Containment)* - Modify the state or assignee of Detections.
* **Update Alerts** *(Containment)* - Perform actions on Alerts identified by composite ID(s) in request.
* **Search into Alerts** *(Enrichment)* - Retrieves all Alerts IDs that match a given query.
* **Alerts CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Alerts.

## Category

EDR

## Configure CrowdStrike Falcon in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your CrowdStrike Falcon API URL.

* **User (Client) ID**. Enter the unique identifier of the API client. The client ID is visible from the API clients table in the Falcon console.

* **User (Client) Secret**. Enter the secret code for the API client, equivalent to a password. The secret is only visible to you at the time the API client is created. After that, it is not retrievable. If your client secret is ever lost, you can reset it to generate a new one.

* **Filter Query (Detections Daemon)**. Enter the FQL-based filter to apply to the search for the detections daemon, for example, `max_severity:>10`
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike/crowdstrike-falcon-configuration.png')} style={{border:'1px solid gray'}} alt="CrowdStrike Falcon configuration" width="400"/>

For information about CrowdStrike Falcon, see [CrowdStrike documentation](https://www.crowdstrike.com/en-us/resources/guides/?lang=1).

## Change Log

* June 3, 2021 - First upload
* July 8, 2022 - Added new action
    + Device Actions
* November 10, 2022 - Added new action:
    + Get Browser History
* January 31, 2020 - Action updated: Get Report Summary
* December 30, 2022 - Action updated
    + Detections CrowdStrike Falcon Daemon (Added FQL-based filter and Pagination to Daemon)
* February 17, 2023 - Refactoring
* February 23, 2023 (v1.3)
    + List Endpoints: Updated API Endpoint
    + Incidents CrowdStrike Falcon Daemon: Duplicate Removed
* March 7, 2023 (v1.4)
    + List Endpoints: Updated Fields Hints
* March 21, 2023 (v1.5) - Logo updated
* July 12, 2023 (v1.8) - Changed fields visibility
* March 4, 2024 (v1.9) - Updated code for compatibility with Python 3.12
* October 16, 2024 (v1.10) - Added new actions
    + Create Indicators
    + Get Indicators
* November 28, 2024 (v1.12) - Added new actions
    + Update Alerts
    + Search into Alerts
    + Alerts CrowdStrike Falcon Daemon
* February 21, 2025 (v1.13) - Added new action
    + Get IDP Device Info
* April 23, 2025 (v1.14) - Updated the Integration
    + Refactored the code to improve performance and maintainability.
