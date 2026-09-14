---
title: Triage Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/triage-tools.png')} alt="urlscan.io" width="100"/>

***Version: 1.4  
Updated: April 30, 2026***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Set of scripts to perform actions within Cloud SOAR.

## Actions

* **Add Attachment to Triage** *(Custom)* - Add attachment to existing triage event.
* **Convert Triage to Incident** *(Custom)* - Convert triage event to incident.
* **Discard Triage Event** *(Custom)* - Discard triage event.
* **Get Attachment Data** *(Enrichment)* - Retrieve base64 content of an attachment.
* **Get Full Triage Event Details** *(Enrichment)* - Retrieve full details of a triage event.
* **Grab or Reassign Triage Event** *(Custom)* - Grabs or reassign triage event.
* **List Triage Attachments** *(Enrichment)* - Retrieve a list with triage attachments.
* **List Triage Columns** *(Enrichment)* - Retrieve a list of columns to use in search.
* **List Triage Events** *(Enrichment)* - Retrieve a list with triage events.
* **List Users** *(Enrichment)* - Retrieve a list of users.
* **Query Triage Events** *(Enrichment)* - Query triage events by columns.
* **Update Triage Field** *(Custom)* - Update/edit triage event field.
* **Update Triage Fields** *(Custom)* - Update/edit multiple triage event fields.

## Category

Internal

## Configure Triage Tools Cloud SOAR

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
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

   * Set the **Cloud SOAR API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Provide the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/triage-tools-configuration.png')} style={{border:'1px solid gray'}} alt="Triage Tools configuration" width="400"/>

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | December 18, 2025 | Added a new action: **Get Full Triage Event Details**. |
| | November 7, 2023 | <ul><li>Updated the integration with Environmental Variables.</li><li>Added compatibility with the new Cloud SOAR API.</li><li>Changed docker to `python3_generic`.</li><li>Added Proxy options, Server certificate verification, and Connection timeout config.</li><li>Refined labels and hints.</li><li>Improved error handling.</li><li>Added table view for List Triage Events.</li><li>Refined table view for List Triage Columns.</li><li>Added default values for Update Triage Fields.</li><li>Refined output mappings with some examples.</li><li>Removed trailing/leading spaces.</li><li>Renamed actions: **Add Attachment To Triage** to **Add Attachment to Triage**, **Convert Triage To Incident** to **Convert Triage to Incident**, and **Grab Or Reassign Triage Event** to **Grab or Reassign Triage Event**.</li><li>Added a new action: **List Users**.</li></ul> |
| | December 7, 2022 | Added a new action: **Update Triage Fields**. |
| | November 30, 2021 | Initial release of the Triage Tools integration. |
