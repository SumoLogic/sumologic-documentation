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

   * **URL**. Default value for API URL is 'https://api.akenza.io'
   * **Api Key**. The API Key you created earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/Akenza-configuration.png')} style={{border:'1px solid gray'}} alt="Akenza configuration" width="400"/>

For information about Akenza, see [Akenza documentation](https://docs.akenza.io/akenza.io/get-started/reference/api-documentation).

## Change Log

* December 14, 2022 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
