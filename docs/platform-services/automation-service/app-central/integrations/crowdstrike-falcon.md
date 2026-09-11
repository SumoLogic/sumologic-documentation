---
title: CrowdStrike Falcon
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon.png')} alt="CrowdStrike Falcon icon" width="100"/>

***Version: 1.21  
Updated: March 31, 2026***

The CrowdStrike Falcon integration allows you to pull and update Alerts/Incidents, and search Incidents/Devices/Alerts.

## Actions

* **Alerts CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Alerts.
* **Close CrowdStrike Incident** *(Containment)* - Close the state of the CrowdStrike Incident.
* **Create Indicators** *(Containment)* - Create the Indicators.
* **Device Actions** *(Containment)* - Take various actions on the hosts in your environment.
* **Get Browser History** *(Enrichment)* - Get user Browser history.
* **Get Endpoint** *(Enrichment)* - Get details on one or more hosts by providing agent IDs.
* **Get Incident Info** *(Enrichment)* - Get details for a specific Crowdstrike Incident.
* **Get Indicators** *(Containment)* - Get Indicators By IDs.
* **Get User ID By Mail** *(Enrichment)* - Search for a specific User ID with a given email address.
* **Get IDP Device Info** *(Enrichment)* - Retrieve detailed information about a devices from IDP. Requires IDP rights and relevant IDP-related API scopes.
* **Incidents CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Incidents.
* **List Endpoints** *(Enrichment)* - Search for hosts in your environment by platform, hostname, IP.
* **Query Devices By Filter** *(Enrichment)* - Search for hosts in your environment by platform, hostname, IP, and other criteria.
* **Retrieve Alert Details** *(Enrichment)* - Get details for a specific CrowdStrike Alert.
* **Search into Alerts** *(Enrichment)* - Retrieves all Alerts IDs that match a given query.
* **Search into Incidents** *(Enrichment)* - Search for incidents by providing an FQL filter, sorting, and paging
  details.
* **Update Alerts** *(Containment)* - Perform actions on Alerts identified by composite ID(s) in request.
* **On Demand Device Scan** *(Containment)* - Initiate a scan on device by providing the device ID. This action will only work for Windows hosts.

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

* **Filter Query (Alerts Daemon)**. Enter the FQL-based filter to apply to the search for the Alerts daemon, for example, `max_severity:>10`
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike/crowdstrike-falcon-configuration1.png')} style={{border:'1px solid gray'}} alt="CrowdStrike Falcon configuration1" width="400"/>

For information about CrowdStrike Falcon, see [CrowdStrike documentation](https://www.crowdstrike.com/en-us/resources/guides/?lang=1).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.21 | March 31, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.20 | Dec 05, 2025 | Added a new action: **On Demand Device Scan**. |
| v1.19 | Nov 10, 2025 | Updated the query parameter for the **Get User ID By Mail** action. |
| v1.18 | Sept 30, 2025 | CrowdStrike deprecated Detections-based APIs, and these actions have been replaced with Alerts-based actions to align with the latest API updates. Migrate to the Alerts actions to ensure continued functionality. <ul><li>Deprecated the **Update Detections** action in favor of **Update Alerts**.</li><li>Deprecated the **Search into Detections** action in favor of **Search into Alerts**.</li><li>Deprecated the **Detections CrowdStrike Falcon Daemon** action in favor of **Alerts CrowdStrike Falcon Daemon**.</li></ul> |
| v1.17 | July 4, 2025 | Added a new action: **Query Devices By Filter**. |
| v1.16 | June 5, 2025 | Added a new action: **Retrieve Alert Details**. |
| v1.15 | June 3, 2025 | Resolved timeout issues across all actions, including daemons and enrichment queries, for improved stability and performance. |
| v1.14 | April 23, 2025 | Refactored the code to improve performance and maintainability. |
| v1.13 | February 21, 2025 | Added a new action: **Get IDP Device Info**. |
| v1.12 | November 28, 2024 | Added new actions: **Update Alerts**, **Search into Alerts**, and **Alerts CrowdStrike Falcon Daemon**. |
| v1.10 | October 16, 2024 | Added new actions: **Create Indicators** and **Get Indicators**. |
| v1.9 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.8 | July 12, 2023 | Changed fields visibility. |
| v1.5 | March 21, 2023 | Updated the logo. |
| v1.4 | March 7, 2023 | Updated the field hints for the **List Endpoints** action. |
| v1.3 | February 23, 2023 | <ul><li>Updated the **List Endpoints** action's API endpoint.</li><li>Removed a duplicate in the **Incidents CrowdStrike Falcon Daemon** action.</li></ul> |
| | February 17, 2023 | Refactored the integration. |
| | December 30, 2022 | Updated the **Detections CrowdStrike Falcon Daemon** action to add an FQL-based filter and pagination. |
| | November 10, 2022 | Added a new action: **Get Browser History**. |
| | July 8, 2022 | Added a new action: **Device Actions**. |
| | June 3, 2021 | Initial release of the CrowdStrike Falcon integration. |
| | January 31, 2020 | Updated the **Get Report Summary** action. |
