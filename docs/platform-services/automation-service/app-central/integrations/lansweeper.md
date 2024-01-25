---
title: Lansweeper
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/lansweeper.png)

Version: 1.1  
Updated: Jul 18, 2023

**Lansweeper** helps you to minimize risks and optimize your IT by providing actionable insight into your entire technology estate.

## Actions

* **Get Graphql Detail** (*Enrichment*) - Get all details
* **Request Software** (*Enrichment*) - Get request software details
* **List Reports**(*Enrichment*) - List reports on Lansweeper
* **Get Authorized Sites** (*Enrichment*) - Get authorized sites

## Lansweeper Configuration

Login to **Lansweeper** with your email and password and follow the link for configuration.

Configuration link: [https://docs.lansweeper.com/docs/api/authenticate#personal-application](https://docs.lansweeper.com/docs/api/authenticate#personal-application)

![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-1.png)

## Lansweeper in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-2.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-3.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-4.png)

1. Populate all the required fields (\*) and then click Save.
   * URL: default value for API URL is 'https://api.lansweeper.com'
   * Token : the Token you copied earlier <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-5.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-6.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-7.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-8.png)

## Change Log

* December 07, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
