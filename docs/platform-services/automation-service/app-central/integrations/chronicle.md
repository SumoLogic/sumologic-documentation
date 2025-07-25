---
title: Chronicle
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="100"/>

**Version: 1.7  
Updated: May 21, 2024**

Chronicle SIEM is a cloud service, built as a specialized layer on top of core Google infrastructure, designed for enterprises to privately retain, analyze, and search the massive amounts of security and network telemetry they generate. Chronicle normalizes, indexes, correlates, and analyzes the data to provide instant analysis and context on risky activity.

## Actions

* **Alerts Daemon Chronicle** *(Daemon)* - Automatically pulls information about both asset-based and user-based alerts with event.
* **Get Event** *(Enrichment)* - Returns a single event given the UID for the event.
* **Get Events** *(Enrichment)* - Returns multiple events given the UIDs for the events.
* **Get Log** *(Enrichment)* - Returns a single raw log given the UID for the event.
* **List Alerts** *(Enrichment)* - Returns information about both asset-based and user-based alerts with event timestamps within the specified time range.
* **List Assets** *(Enrichment)* - Lists all the assets that accessed the specified artifact in your enterprise within the specified time period.
* **List Events** *(Enrichment)* - Lists all the events discovered within your enterprise on a particular device within the specified time range.
* **List IOCs** *(Enrichment)* - Lists all the IoCs discovered within your enterprise within the specified time range.
* **List IoC Details** *(Enrichment)* - Returns the threat intelligence associated with an artifact. The threat intelligence information is obtained from your enterprise security systems and from IoC partners of Google.
* **UDM Search** *(Enrichment)* - UDM Search query and retrieve matches.

## External Libraries

* [Chronicle (Google Auth)](https://github.com/googleapis/google-auth-library-python/blob/master/LICENSE)
* [Chronicle (Google API)](https://github.com/googleapis/google-api-python-client/blob/master/LICENSE)

## Configure Chronicle in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the [Chronicle API URL](https://cloud.google.com/chronicle/docs/reference/rest).

* **Service Account Credentials JSON**. Enter the [service account credentials](https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials) in JSON format.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/chronicle/chronicle-configuration.png')} style={{border:'1px solid gray'}} alt="Chronicle configuration" width="400"/>

For information about Google Security Operations (formerly Chronicle), see [Google Security Operations documentation](https://cloud.google.com/chronicle/docs).

## Change Log

* July 30, 2021 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
* January 26, 2024 (v1.2)
    * Integration refactored
    * The following new actions are added:
        * Get Event
        * Get Log
        * List Alerts
        * UDM Search
* February 16, 2023 (v1.3)
    * List Alerts Action: Fix bug related to the PageSize field
* February 19, 2024 (v1.4)
    * Alerts Daemon Chronicle: Fix bug related to Last execution time
* February 19, 2024 (v1.5)
    * Added new Action: Get Events
    * Alerts Daemon Chronicle: Updated Output mappings
* March 4, 2024 (v1.6) - Updated code for compatibility with Python 3.12
* May 21, 2024 (v1.7) - Updated code for compatibility with Python 3.12
