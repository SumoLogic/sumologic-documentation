---
title: Kela Darkbeast
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/kela-darkbeast.png)

Version: 1.1  
Updated: Jul 05, 2023

Kela Darkbeast provides incident responders, threat hunters, investigators, and intelligence analysts with a robust technology to dive into the cybercrime underground and investigate. 

## Actions

* **Get Data Count** *(Enrichment)* - Returns a list of data types each associated with the number of hits found.
* **Search Data** *(Enrichment)* - Allows direct querying of a specific data type, returning either references to data IDs (to be searched via the Get Data Details action) or the full data itself. If there’s a need to paginate through more results, extract the scroll\_id item from within the response and use it in Search Pagination action.
* **Search Pagination***(Enrichment)* - This action is used for persistent pagination of search results. Since every search requests only returns a limited number of results, paginating through them is the way to acquire big data sets.
* **Get Data Details** *(Enrichment)* - This action is used to retrieve the full details of a Hacking Discussion or Instant Messaging data point.
* **User License** *(Enrichment)* - Returns the number of remaining search tokens your API license has.

## Kela Darkbeast configuration

1. Sign in Kela Darkbeast using your username and password.
2. The API Access can be generated in your profile.
3. Make sure you copy and save the API token.

## Kela Darkbeast in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-3.png)

Populate all the required fields (\*)

* URL: 'https://darkbeast.ke-la.com/api/v1/'
* API Token: Insert the previously copied token

Click Save.

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-4.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-5.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/kela-darkbeast/kela-darkbeast-6.png)

## Change Log

* May 19, 2022 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
