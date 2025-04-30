---
title: Sophos Central V3
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sophos-central-v3.png')} alt="sophos-central" width="80"/>

***Version: 3.3  
Updated: Mar 4, 2024***

Utilize Sophos Central enrichment data during incident investigations.

## Actions

* **Get Alerts** (*Enrichment)* - Gather Sophos Central alerts.
* **Get Alerts Sophos Daemon** (*Daemon)* - Get Sophos Central alerts on a time interval.
* **Get Endpoints** (*Enrichment)* - Gather all endpoints.
* **Isolate an Endpoint** (*Containment*) - Isolate a single endpoint.
* **Isolate Endpoints** (*Containment*) - Isolate multiple endpoints.

## Sophos Central V3 configuration

The following steps show how to create new API credentials to work with Cloud SOAR.

1. Log in to the [Sophos Central Partner](https://central.sophos.com/manage/partner) platform.
1. On the left click on **Settings & Policies** and then click the **API credentials**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-1.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="600"/>
1. Click on **Add Credential**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-2.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="600"/>
1. Enter **Credential name (required)** and the description if you want.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-3.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="600"/>
1. Click the **Copy** button on the Client ID and paste it temporally in a text editor.
1. Click **Show Client Secret**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-4.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="600"/>
1. Now you can copy the key as shown.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-5.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="600"/>

## Configure Sophos Central V3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new
   Resource.
1. Populate all the required fields (\*) and then click **SAVE**.
    * **Label**. The name of the resource.
    * **URL**. `https://api.central.sophos.com`.
    * Client ID and Client Secret taken earlier from Sophos.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-9.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-10.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-11.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sophos-central-v3/sophos-central-v3-12.png')} style={{border:'1px solid gray'}} alt="sophos-central" width="400"/>

## Change Log

* December 28, 2021 - First upload
* January 24, 2022 - New actions added
* July 11, 2023 (v3.2)
    + Updated the integration with Environmental Variables
    + Integration renamed from Sophos Central 3.0 to Sophos Central V3
* March 4, 2024 (v3.3) - Updated code for compatibility with Python 3.12
