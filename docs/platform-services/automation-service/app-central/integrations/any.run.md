---
title: ANY.RUN
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/any.run.png')} alt="any.run" width="80"/>

***Version: 1.3  
Updated: Jun 15, 2023***

Gather detonation data for files and URL using `ANY.RUN`.

## Actions

* **Detonate File** (*Enrichment*) - Detonate a file.
* **Detonate URL** (*Enrichment*) - Detonate a URL.
* **Get Report** (*Enrichment*) - Gather detonation report.

## ANY.RUN configuration

Sign in to ANY.RUN. Click on your profile on the left menu. In the API and Limits tab generate your API KEY and copy it.

## ANY.RUN in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-1.png')} style={{border:'1px solid gray'}} alt="any.run-1" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-2.png')} style={{border:'1px solid gray'}} alt="any.run-2" width="400"/>
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-3.png')} style={{border:'1px solid gray'}} alt="any.run-3" width="400"/>
1. Populate all the required fields (\*):
   * **URL**. 'https://api.any.run'
   * **API Key**. The API Key you copied earlier.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-4.png')} style={{border:'1px solid gray'}} alt="any.run-4" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-5.png')} style={{border:'1px solid gray'}} alt="any.run-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-6.png')} style={{border:'1px solid gray'}} alt="any.run-6" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/any.run/any.run-7.png')} style={{border:'1px solid gray'}} alt="any.run-7" width="400"/>
 
## Change Log

* February 21, 2020 - First upload
* February 13, 2023 - Integration refactored
* June 15, 2023 (v1.3) - Updated the integration with Environmental Variables
