---
title: CrowdStrike Falcon Discover
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon-discover.png)

Version: 1.1  
Updated: Jul 03, 2023

**CrowdStrike Falcon Discover** allows to quickly identify and eliminate malicious or noncompliant activity by providing unmatched real-time visibility into the devices, users and applications in your network.

  


* **Search Logins** *(Enrichment)* - Search for logins in your environment
* **Search Accounts** *(Enrichment)* - Search for accounts in your environment
* **Search Applications** *(Enrichment)* - Search for applications in your environment
* **Search Assets***(Enrichment)* - Search for assets in your environment
* **Get Logins** *(Enrichment)* - Get details on logins
* **Get Accounts** *(Enrichment)* - Get details on accounts
* **Get Applications** *(Containment)* - Get details on applications
* **Get Assets** *(Containment)* - Get details on assets

## CrowdStrike Falcon Discover in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-3.png)

Populate all the required fields (\*) and then click Save.

* Label: The desired name for the resource
* API URL: https://api.crowdstrike.com
* Client ID: The unique identifier of the API client
* Client Secret: A secret code for an API client

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-7.png)

## Note
For more information on creating FQL Query Filter follow this [link](https://falcon.crowdstrike.com/documentation/45/falcon-query-language-fql)    

## Change Log

* March 16, 2023 (v1.0) - First upload
* July 3, 2023 (v1.1) - Removed leading/trailing spaces
