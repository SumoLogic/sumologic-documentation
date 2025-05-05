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

   * **Label**. The desired name for the resource.
   * **URL**. Your Wittra URL.
   * **API Key**. Your Wittra API Key you copied earlier from Wittra.
   * **Organization ID**. Your Organization ID you copied earlier from Wittra.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/wittra/wittra-4.png')} style={{border:'1px solid gray'}} alt="wittra" width="400" />

For information about Wittra, see [Wittra documentation](https://docs.wittra.io/#/).

## Change Log

* February 8, 2023 - First upload
* February 13, 2023 - New Logo
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
