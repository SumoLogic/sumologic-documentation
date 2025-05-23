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

    * **Label**. The name of the resource.
    * **URL**. `https://api.central.sophos.com`.
    * Client ID and Client Secret taken earlier from Sophos.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sophos-center-v3-configuration.png')} style={{border:'1px solid gray'}} alt="Sophos Central V3 configuration" width="400"/>

For information about Sophos Central, see [Sophos Central documentation](https://docs.sophos.com/central/customer/help/en-us/index.html).

## Change Log

* December 28, 2021 - First upload
* January 24, 2022 - New actions added
* July 11, 2023 (v3.2)
    + Updated the integration with Environmental Variables
    + Integration renamed from Sophos Central 3.0 to Sophos Central V3
* March 4, 2024 (v3.3) - Updated code for compatibility with Python 3.12
