---
title: Akenza
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/akenza.png')} alt="akenza" width="90"/>

***Version: 1.1  
Updated: Jul 18, 2023***

**Akenza** is leading the Internet of Things toward broad applicability by reducing technical complexity and empowering companies to create their own smart applications.

## Actions

* **Get Organization** (*Enrichment*) - Get organization details.
* **Create Workspace** (*Containment*) - Create workspace.
* **List Workspaces** (*Enrichment*) - List workspaces.
* **Get Workspace** (*Enrichment*) - Get workspace details.
* **Delete Workspace** (*Containment*) - Remove workspace.
* **Create Device Type** (*Containment*) - Create new device type.
* **List Device Types** (*Enrichment*) - List device types.
* **Get Device Type** (*Enrichment*) - Get device type.
* **Delete Device Type** (*Containment*) - remove device type.
* **List Data Flows** (*Enrichment*) - List data flows on device.
* **Query Data Device** (*Enrichment*) - Query device data.

## Akenza configuration

1. Log in to the Akenza platform with your email and password and follow the link for configuration.
1. Create API key from GUI of Akenza by locating to API key and by clicking on the button Generate API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-1.png')} style={{border:'1px solid gray'}} alt="akenza-1" width="800"/>

## Configure Akenza in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Akenza, see [Akenza documentation](https://docs.akenza.io/akenza.io/get-started/reference/api-documentation).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-4.png')} style={{border:'1px solid gray'}} alt="akenza-4" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **URL**. Default value for API URL is 'https://api.akenza.io'
   * **Api Key**. The API Key you created earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-5.png')} style={{border:'1px solid gray'}} alt="akenza-5" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-6.png')} style={{border:'1px solid gray'}} alt="akenza-6" width="400"/>
1. Click **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-7.png')} style={{border:'1px solid gray'}} alt="akenza-7" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/akenza/akenza-8.png')} style={{border:'1px solid gray'}} alt="akenza-8" width="400"/>

## Change Log

* December 14, 2022 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
