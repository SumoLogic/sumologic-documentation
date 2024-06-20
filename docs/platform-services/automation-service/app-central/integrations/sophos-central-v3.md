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

## Sophos Central V3 in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new
   Resource. <br/>![](data:image/png;base64,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)
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
