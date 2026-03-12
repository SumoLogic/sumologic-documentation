---
title: Sumo Logic Cloud Monitor
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic-cloud-siem" width="100"/>

***Version: 1.0  
Updated: Mar 12, 2026***

The Monitor Management API allows you to manage Monitors from HTTP endpoints. Monitors continuously query your data to monitor and send notifications when specific events occur. For more information, see [Monitors](https://www.sumologic.com/help/docs/alerts/monitors/)

## Actions

* **Bulk Delete Monitors** *(Containment)* - Bulk delete a monitor by the given identifiers in the monitors library.
* **Bulk Read Monitors** *(Containment)* - Bulk read a monitor by the given identifiers from the monitors library.
* **Copy Monitor** *(Containment)* - Copy a monitor in the monitors library.
* **Copy Monitors Folder** *(Containment)* - Copy a folder in the monitors library.
* **Create Monitor** *(Containment)* - Create a monitor in the monitors library.
* **Create Monitors Folder** *(Containment)* - Create a folder in the monitors library.
* **Delete Monitor** *(Containment)* - Delete a monitor from the monitors library.
* **Delete Monitors Folder** *(Containment)* - Delete a folder from the monitors library.
* **Export Monitor** *(Containment)* - Export a monitor. If the given identifier is a folder, everything under the folder is exported recursively with folder as the root.
* **Get Monitor Details** *(Enrichment)* - Get a monitor from the monitors library.
* **Get Monitor Permissions** *(Enrichment)* - List explicit permissions on monitor in the monitors library.
* **Get Monitor Usage Summary** *(Enrichment)* - Get the current number and the allowed number of log and metrics monitors.
* **Get Monitors Folder Permissions** *(Enrichment)* - List explicit permissions on folder in the monitors library.
* **Get Parent Monitors Folder From Monitor** *(Enrichment)* - Get the full path of the monitor or folder in the monitors library.
* **Get Root Monitors Folder** *(Enrichment)* - Get the root folder in the monitors library.
* **Move Monitor** *(Containment)* - Move a monitor to a different location in the monitors library.
* **Move Monitors Folder** *(Containment)* - Move a folder to a different location in the monitors library.
* **Search Monitor** *(Enrichment)* - Search for a monitor or folder in the monitors library structure.
* **Update Monitor** *(Containment)* - Update a monitor in the monitors library.
* **Update Monitor Permissions** *(Containment)* - Set permissions on monitor in the monitors library.
* **Update Monitors Folder** *(Containment)* - Update a folder in the monitors library.
* **Update Monitors Folder Permissions** *(Containment)* - Set permissions on folder in the monitors library.



## Sumo Logic Cloud Monitor configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Cloud Monitor in Automation Service and Cloud SOAR

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

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-cloud-monitor-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Cloud SIEM configuration" width="400"/>

For detailed API documentation, see [Sumo Logic APIs](/docs/api/).

## Category

SIEM

## Change Log

* March 12, 2026 - First Upload
