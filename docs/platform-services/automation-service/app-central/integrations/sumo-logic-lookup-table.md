---
title: Sumo Logic Lookup Table
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="Sumo Logic icon" width="100"/>

***Version: 1.1  
Updated: April 1, 2026***

The Lookup Table Management API allows you to manage lookup tables from HTTP endpoints. Lookup tables enable you to enrich your log data with contextual information from external sources. For more information, see [Lookup Tables](/docs/search/lookup-tables/).

## Actions

* **Create Lookup Table** *(Notification)* - Create a new lookup table in your Sumo Logic environment.
* **Delete Lookup Table** *(Containment)* - Delete an existing lookup table by its identifier.
* **Delete Row** *(Containment)* - Delete a specific row from a lookup table.
* **Edit Lookup Table** *(Notification)* - Update the configuration or metadata of an existing lookup table.
* **Empty Lookup Table** *(Containment)* - Remove all rows from a lookup table while keeping the table structure.
* **Get Async Job Status** *(Enrichment)* - Check the status of an asynchronous lookup table operation.
* **Get Lookup Table** *(Enrichment)* - Retrieve details and metadata of a specific lookup table.
* **Insert Or Update Row** *(Notification)* - Add a new row or update an existing row in a lookup table.
* **Upload CSV File** *(Notification)* - Bulk upload data to a lookup table from a CSV file.



## Sumo Logic Lookup Table configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Lookup Table in Automation Service and Cloud SOAR

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
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-lookup-table-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Lookup Table configuration" width="400"/>

For detailed API documentation, see [Sumo Logic APIs](/docs/api/).

## Notes
* **Upload CSV File** action will be available in Cloud SOAR only.

## Category

SIEM

## Change Log

* March 27, 2026 - First Upload
* April 1, 2026 - Added Sumo Logic logo.
