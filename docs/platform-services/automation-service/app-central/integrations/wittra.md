---
title: Wittra
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/wittra.png')} alt="wwittra" width="70"/>

***Version: 1.1  
Updated: Jul 18, 2023***

Wittra is hardware and software provider with patented solutions for business in the Internet of Moving Things.

## Actions

* **Get Organization Details** *(Enrichment)* - Retrieve data about a requested organization.
* **List Projects** *(Enrichment)* - Retrieve all projects in a requested organization.
* **List Users** *(Enrichment)* - Retrieve all users in a requested organization.
* **List Devices** *(Enrichment)* - Retrieve all devices for a requested project.
* **Get Device** *(Enrichment)* - Retrieve data about a specific device.
* **List Devices Telemetry** *(Enrichment)* - Retrieve telemetry for all devices in a project.

## Configure Wittra in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Wittra, see [Wittra documentation](https://docs.wittra.io/#/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-3.png')} style={{border:'1px solid gray'}} alt="wittra" width="600" />
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The desired name for the resource.
   * **URL**. Your Wittra URL.
   * **API Key**. Your Wittra API Key you copied earlier from Wittra.
   * **Organization ID**. Your Organization ID you copied earlier from Wittra.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-4.png')} style={{border:'1px solid gray'}} alt="wittra" width="400" /><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-5.png')} style={{border:'1px solid gray'}} alt="wittra" width="400" />
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-6.png')} style={{border:'1px solid gray'}} alt="wittra" width="400" />
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-7.png')} style={{border:'1px solid gray'}} alt="wittra" width="400" />

## Change Log

* February 8, 2023 - First upload
* February 13, 2023 - New Logo
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
