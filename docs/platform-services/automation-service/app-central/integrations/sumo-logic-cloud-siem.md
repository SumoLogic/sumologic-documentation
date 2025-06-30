---
title: Sumo Logic Cloud SIEM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic-cloud-siem" width="100"/>

***Version: 1.15  
Updated: Jan 6, 2025***


This [automation integration](/docs/platform-services/automation-service/app-central/integrations/) utilizes Cloud SIEM entities to correlate signals and insights. For information about Cloud SIEM, see [Get Started with Cloud SIEM](/docs/cse/get-started-with-cloud-siem/).

## Actions

* **Add Comment To Insight** *(Notification)* - Add a comment to an existing Insight.
* **Add Enrichment Entity** *(Notification)* - Add enrichments to Entity.
* **Add Enrichment Insight** *(Notification)* - Add enrichments to Insights.
* **Add Enrichment Signal** *(Notification)* - Add enrichments to Signal.
* **Add Match List Item** (*Notification*) - Add item to Match List.
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
* **Get Match List** (*Enrichment*) - Get a Match List.
* **List Match List Items** (*Enrichment*) - Get a list of Match List Items.
* **List Match List** (*Enrichment*) - Get the list of Match Lists.
* **Sumo Logic Match List Items Daemon** *(Daemon)* - Automatically pull a list of Match List Items.

## Sumo Logic Cloud SIEM configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

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

* **API Rate Limit Sleep (s)**. Enter the API rate limit in seconds. If the API rate limit exceeded, wait for 1 second and then attempt a retry, with a maximum wait time of 10. more info at https://help.sumologic.com/docs/api/metrics/#rate-limiting.

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

* March 26, 2021 - First Upload
* April 6, 2021 - New actions uploaded
* October 1, 2021 - New actions uploaded
* October 18, 2021 - New actions uploaded
* October 27, 2021 - New actions uploaded
* March 17, 2022 - New action: Update Insight
* February 17, 2023 (v1.3)
    * Updated Daemon: Sumo Logic Insights Daemon Extended
* September 19, 2023 (v1.4) - Updated the integration with Environmental Variables
* September 26, 2023 (v1.5) - Updated Daemon: **Sumo Logic Signals Daemon**
* October 3, 2023 (v1.6) - Updated Daemon: **Sumo Logic Insights Daemon Extended**
* October 4, 2023 (v1.7) - Updated Daemon: **Sumo Logic Insights Daemon**
* November 24, 2023 (v1.8)
    * Updated Sumo Logic Insights Daemon Extended and Sumo Logic Insights Daemon (Updated the query, now it only retrieves data from the past 1 hour instead of 24 hours)
    * Expanded output mappings for the following Actions/Daemons
        - Get Signal
        - Get Insight V2
        - Sumo Logic Signals Daemon
        - Sumo Logic Insights Daemon
        - Sumo Logic Insights Daemon Extended
* December 12, 2023 (v1.9)
    * Added new Action - *Create Insight From Signals*
    * Updated *Add Enrichment Insight*, *Add Enrichment Entity*, and *Add Enrichment Signal* actions based on the following points:
        - Now text information can be included as enrichment
        - Updated the enrichment field to accept either the output.raw or any other JSON format
        - Added additional fields: reputation, expiresAt and externalUrl
        - Updated the field *Fields Name/Path To Extract* to enable the extraction of field values from the JSON by using either the Path or Field Name
* February 7, 2024 (v1.10)
    * Fixed issue in the "Add Comment To Insight" action where line breaks in the "Insight Comment" field were removed upon submission
* March 4, 2024 (v1.11) - Updated code for compatibility with Python 3.12
* April 5, 2024 (v1.12)
    + The integration formerly known as "Sumo Logic CSE" has been renamed to "Sumo Logic Cloud SIEM"
    + Added a new field *API Rate Limit Sleep* to the Integration resource (If API rate limit exceeded, wait for 1 second and then attempt a retry, with a maximum wait time of 10)
    * New Actions added:
        - Get Match List
        - List Match List Items
        - List Match List
        - Sumo Logic Match List Items Daemon
    * For *Close Insight Trigger* added three fields in Integration resource:
        - Custom Field Internal Name (This field is only used within the Close Insight Trigger as a custom Field for Insight ID in Cloud SOAR, for Example: opt_1)
        - Resolution Status (This field is only used within the Close Insight Trigger as a resolution reason for closing the Insight, for Example: Resolved)
        - Closure Comments (This field is only used within the Close Insight Trigger as a closure comment for Insight)
* April 8, 2024 (v1.13)
  * Update the resource field name from "Sumo Logic CSE URL" to "Sumo Logic Cloud SIEM URL"
* July 3, 2024 (v1.14)
  * Update `check_not_null_field` in Close Insight Trigger
* January 6, 2025 (v1.15)
  * New Action added:
    - Add Match List Item
