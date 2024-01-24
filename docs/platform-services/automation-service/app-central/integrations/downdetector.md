---
title: Downdetector
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/downdetector.png)

Version: 1.1  
Updated: Jul 06, 2023

**Downdetector** offers realtime overview of issues and outages with all kinds of services.

## Actions

* **Get Company Indicators** (*Enrichment*) - Returns company indicators
* **Search Companies For Slug**(*Enrichment*) - List of companies which match the given slug
* **Get Current Status** (*Enrichment*) - Returns the current detected status for a company
* **Get 24h Baseline**(*Enrichment*) - Gets the baseline for a company
* **Get Reports For Slug** (*Enrichment*) - Returns the sum'ed number of reports for the given slug
* **Get Cities For Slug** (*Enrichment*) - Returns a top X list of cities where reports are coming from
* **Get Countries For Slug** (*Enrichment*) - Returns a top X list of countries where reports are coming from
* **Get Heatmap For Reports** (*Enrichment*) - Returns the clustered locations where most reports are origination from. Will return max 1024 groups

## Downdetector Configuration

1. Login to Downdetector with your username and password. On the left menu click on API. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-1.png)

1. Under + sign create your token (Client Secret). 

1. Make sure to cope the Client ID and the Client Secret. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-2.png)

## Downdetector in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-3.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-4.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-5.png)

1. Populate all the required fields (\*) and then click Save.
   * URL: default value for API URL is 'https://downdetectorapi.com'
   * Username: the client ID that you copied as username
   * Password: the Client Secret that you copied as password <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-6.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-7.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-8.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-9.png)

  
 

## Change Log

* November 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
