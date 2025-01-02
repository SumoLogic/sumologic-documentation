---
title: Lansweeper
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lansweeper.png')} alt="lansweeper" width="100"/>

***Version: 1.1  
Updated: Jul 18, 2023***

**Lansweeper** helps you to minimize risks and optimize your IT by providing actionable insight into your entire technology estate.

## Actions

* **Get Graphql Detail** (*Enrichment*) - Get all details.
* **Request Software** (*Enrichment*) - Get request software details.
* **List Reports** (*Enrichment*) - List reports on Lansweeper.
* **Get Authorized Sites** (*Enrichment*) - Get authorized sites.

## Lansweeper configuration

Log in to **Lansweeper** with your email ID and password to start the [configuration process](https://docs.lansweeper.com/docs/api/authenticate#personal-application).

<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-1.png')} style={{border:'1px solid gray'}} alt="lansweeper-1" width="300"/>

## Lansweeper in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-4.png')} style={{border:'1px solid gray'}} alt="lansweeper-4" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **URL**. Default value for API URL is 'https://api.lansweeper.com'.
   * **Token**. The Token you copied earlier. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-5.png')} style={{border:'1px solid gray'}} alt="lansweeper-5" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-6.png')} style={{border:'1px solid gray'}} alt="lansweeper-6" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-7.png')} style={{border:'1px solid gray'}} alt="lansweeper-7" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-8.png')} style={{border:'1px solid gray'}} alt="lansweeper-8" width="400"/>

## Change Log

* December 07, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
