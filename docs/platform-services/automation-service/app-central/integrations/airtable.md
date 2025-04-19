---
title: Airtable
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/airtable.png')} alt="airtable" width="100"/>

**Version: 1.1  
Updated: Jul 18, 2023**

**Airtable** is a spreadsheet-database hybrid, with the features of a database but applied to a spreadsheet.   

## Actions

* **Get Record** (*Enrichment*) - Get specific recorde.
* **List Records Incident Details** (*Enrichment*) - Get all recordes.
* **List Bases**(*Enrichment*) - List bases on Airtable.
* **Get Base Schema** (*Enrichment*) - Get base structure.
* **Create Records All** (*Containment*) - Create redords.

## Airtable configuration

1. Sign in to the Airtable platform with your email ID and password. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-1.png')} style={{border:'1px solid gray'}} alt="airtable-1" width="800"/>
1. Create your token, refer to the [Developer hub page](https://airtable.com/developers/web/guides/personal-access-tokens).

## Configure Airtable in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-4.png')} style={{border:'1px solid gray'}} alt="airtable-4" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * URL: default value for API URL is 'https://api.airtable.com'
   * Token : the Token you copied earlier. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-5.png')} style={{border:'1px solid gray'}} alt="airtable-5" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-6.png')} style={{border:'1px solid gray'}} alt="airtable-6" width="400"/>
1. Click **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-7.png')} style={{border:'1px solid gray'}} alt="airtable-7" width="400"/> 
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-8.png')} style={{border:'1px solid gray'}} alt="airtable-8" width="400"/>

## Change Log

* November 30, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
