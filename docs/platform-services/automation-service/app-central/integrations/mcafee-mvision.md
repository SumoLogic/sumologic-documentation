---
title: McAfee MVISION
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-mvision.png')} alt="mcafee-mvision" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

MVISION EPO: SaaS-based centralized security management platform.   

## Actions

* **Get Host Info** *(Enrichment)* - Fetch device with filter by IP Address or Computer Name.
* **Get Tag Groups** *(Enrichment)* - Fetch all Tag Groups.
* **Add Tag** *(Containment)* - Creates a new resource of type Tag.
* **List Tags** *(Enrichment)* - Fetch all Tags.
* **Remove Tag** *(Containment)* - Delete a tag using the Tag ID specified in the path.
* **Create Investigation** *(Notification)* - Creates an investigation in MVISION EDR.
* **Fetch Events Daemon** *(Daemon)* - Automatically fetch all Events.

## Configure McAfee MVISION in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mcafee-mvision-configuration.png')} style={{border:'1px solid gray'}} alt="McAfee MVISION configuration" width="400"/>

For information about Trellix Endpoint Detection and Response (formerly McAfee MVISION), see [Trellix Endpoint Detection and Response](https://docs.trellix.com/bundle/mvision-endpoint-detection-and-response-product-guide/page/UUID-539597b6-3a64-e122-8981-097a24897557.html).

## Change Log

* March 25, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
