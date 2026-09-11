---
title: Sumo Logic Cloud SIEM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="Sumo Logic icon" width="100"/>

***Version: 1.18  
Updated: July 22, 2026***


This [automation integration](/docs/platform-services/automation-service/app-central/integrations/) utilizes Cloud SIEM entities to correlate signals and insights. This integration requires authentication. (Because the [Sumo Logic Cloud SIEM Internal](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem-internal/) integration operates internally with Sumo Logic, no additional authentication is needed.)

For information about Cloud SIEM, see [Get Started with Cloud SIEM](/docs/cse/get-started-with-cloud-siem/).

## Actions

* **Add Comment To Insight** *(Notification)* - Add a comment to an existing Insight.
* **Add Enrichment Entity** *(Notification)* - Add enrichments to Entity.
* **Add Enrichment Insight** *(Notification)* - Add enrichments to Insights.
* **Add Enrichment Signal** *(Notification)* - Add enrichments to Signal.
* **Add Match List Item** *(Notification)* - Add item to Match List.
* **Add Network Block** *(Containment)* - Add an address into the Network Blocks.
* **Add Tag To Insight** *(Notification)* - Add tags to the Insight.
* **Assign User To Insight** *(Notification)* - Add specific user to an Insight.
* **Check Insight Status Schedule** *(Scheduled)* - Schedule action that periodically checks if the Insight is closed.
* **Close Insight Trigger** *(Trigger)* - Trigger action that is executed whenever an Incident is closed.
* **Create Insight From Signals** *(Notification)* - Create Insight From Signal IDs.
* **Get Entity** *(Enrichment)* - Get Entity details.
* **Get Insight** *(Enrichment)* - Get Insight details.
* **Get Insight Comments** *(Enrichment)* - Get comments for an Insight.
* **Get Insight V2** *(Enrichment)* - Get Insight details v2.
* **Get Signal** *(Enrichment)* - Get Signal details.
* **List Entities** *(Enrichment)* - List Entities.
* **List Indicators** *(Enrichment)* - List all Indicators.
* **List Insights** *(Enrichment)* - List all Insights.
* **List Network Block** *(Enrichment)* - List all Blocked Networks.
* **List Signals** *(Enrichment)* - List all Signals.
* **List Users** *(Enrichment)* - Get a list of users.
* **Sumo Logic Insights Daemon** *(Daemon)* - Daemon to retrieve the latest Insights.
* **Sumo Logic Insights Daemon Extended** *(Daemon)* - Daemon to retrieve the latest Insights, extended version.
* **Sumo Logic Signals Daemon** *(Daemon)* - Daemon to retrieve the latest Signals.
* **Update Insight** *(Notification)* - Update the insight Assignee, Status, Severity, and Tags.
* **Update Insight Status** *(Enrichment)* - Update the insight status.
* **Update Insight Tag Trigger** *(Trigger)* - Trigger action that is executed whenever an Incident is edited.
* **Get Match List** *(Enrichment)* - Get a Match List.
* **List Match List Items** *(Enrichment)* - Get a list of Match List Items.
* **List Match List** *(Enrichment)* - Get the list of Match Lists.
* **Sumo Logic Match List Items Daemon** *(Daemon)* - Automatically pull a list of Match List Items.

## Sumo Logic Cloud SIEM configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporarily) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Cloud SIEM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <SumoLogicAPIURL/>
* **Sumo Logic Cloud SIEM URL**. URL to the Cloud SIEM instance (for example, `https://service.sumologic.com/sec`).
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* **Signals Daemon Query**. Enter the query to be executed in daemons.

* **API Rate Limit Sleep (s)**. Enter the API rate limit in seconds. If the API rate limit is exceeded, wait for 1 second and then attempt a retry, with a maximum wait time of 10. More info at [Rate limiting](/docs/api/metrics/#rate-limiting).

* **Custom Field Interval Name (Close Insight Trigger)**. This field is only used within the Close Insight Trigger as a custom field for insight ID in Cloud SOAR, for example, `opt_1`.

* **Resolution Status**. This field is only used within the Close Insight Trigger as a resolution reason for closing the insight, for example, `Resolved`.

* **Closure Comments (Close Insight Trigger)**. This field is only used within the Close Insight Trigger as a closure comment for insight.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-cloud-siem-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Cloud SIEM configuration" width="400"/>

For detailed API documentation, see [Sumo Logic APIs](/docs/api/).

## Category

SIEM

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.18 | July 22, 2026 | <ul><li>Improved integration reliability and handling of API rate limits with better edge case support.</li><li>Enhanced error messages with more descriptive details for easier troubleshooting.</li><li>Deprecated the **Add Relation To Insight** action.</li></ul> |
| v1.17 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.16 | April 3, 2026 | Fixed output field mapping for nested fields with dots in field names in the **Get Signal** and **List Signals** actions. |
| v1.15 | January 6, 2025 | Added a new action: **Add Match List Item**. |
| v1.14 | July 3, 2024 | Updated `check_not_null_field` in the **Close Insight Trigger**. |
| v1.13 | April 8, 2024 | Updated the resource field name from "Sumo Logic CSE URL" to "Sumo Logic Cloud SIEM URL." |
| v1.12 | April 5, 2024 | <ul><li>Renamed the integration from "Sumo Logic CSE" to "Sumo Logic Cloud SIEM."</li><li>Added a new field, API Rate Limit Sleep, to the Integration resource (if the API rate limit is exceeded, the integration waits for 1 second and then retries, with a maximum wait time of 10).</li><li>Added new actions: **Get Match List**, **List Match List Items**, **List Match List**, and **Sumo Logic Match List Items Daemon**.</li><li>Added three fields to the Integration resource for the **Close Insight Trigger**: Custom Field Internal Name, Resolution Status, and Closure Comments.</li></ul> |
| v1.11 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.10 | February 7, 2024 | Fixed an issue in the **Add Comment To Insight** action where line breaks in the Insight Comment field were removed upon submission. |
| v1.9 | December 12, 2023 | <ul><li>Added a new action: **Create Insight From Signals**.</li><li>Updated the **Add Enrichment Insight**, **Add Enrichment Entity**, and **Add Enrichment Signal** actions: text information can now be included as enrichment, the enrichment field now accepts either output.raw or any other JSON format, added fields reputation, expiresAt, and externalUrl, and updated the *Fields Name/Path To Extract* field to allow extracting values from JSON by either Path or Field Name.</li></ul> |
| v1.8 | November 24, 2023 | <ul><li>Updated the **Sumo Logic Insights Daemon Extended** and **Sumo Logic Insights Daemon** so the query now retrieves data from the past 1 hour instead of 24 hours.</li><li>Expanded output mappings for the following actions/daemons: **Get Signal**, **Get Insight V2**, **Sumo Logic Signals Daemon**, **Sumo Logic Insights Daemon**, and **Sumo Logic Insights Daemon Extended**.</li></ul> |
| v1.7 | October 4, 2023 | Updated the **Sumo Logic Insights Daemon**. |
| v1.6 | October 3, 2023 | Updated the **Sumo Logic Insights Daemon Extended**. |
| v1.5 | September 26, 2023 | Updated the **Sumo Logic Signals Daemon**. |
| v1.4 | September 19, 2023 | Updated the integration with environmental variables. |
| v1.3 | February 17, 2023 | Updated the **Sumo Logic Insights Daemon Extended**. |
| v1.2 | March 17, 2022 | Added a new action: **Update Insight**. |
| v1.1 | October 27, 2021 | Added new actions. |
| v1.0 | October 18, 2021 | Added new actions. |
| v1.0 | October 1, 2021 | Added new actions. |
| v1.0 | April 6, 2021 | Added new actions. |
| v1.0 | March 26, 2021 | Initial release of the Sumo Logic Cloud SIEM integration. |
