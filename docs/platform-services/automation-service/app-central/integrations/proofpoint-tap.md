---
title: Proofpoint TAP
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/proofpoint-tap.png)

Version: 1.2  
Updated: Mar 31, 2023

Proofpoint Targeted Attack Protection (TAP) integration which protects against and provides additional visibility into phishing and other malicious attacks.

## Actions

* **List Campaigns** *(Enrichment)* - Gets details for a given campaign
* **Get Campaign** *(Enrichment)* - Gets a list of IDs of campaigns active in a specified time period
* **Get Most Attacked Users** *(Enrichment)* - Gets a list of the most attacked users in the organization
* **Get Top Clickers** *(Enrichment)* - Gets a list of the top clickers in the organization for a specified time period
* **Get Threat** *(Enrichment)* - A string containing a unique identifier associated with the threat in TAP Dashboard
* **List Issues** *(Enrichment)* - Get events for clicks to malicious URLs permitted and messages delivered containing a known attachment threat within the specified time period
* **Blocked Messages** *(Enrichment)* - Fetch events for messages blocked in the specified time period which contained a known threat
* **Blocked Clicks** *(Enrichment)* - Fetch events for clicks to malicious URLs blocked in the specified time period
* **Decode URL** *(Containment)* - The URL Decoder allows users to decode URLs which have been rewritten by TAP to their original, target URL

## Configure Proofpoint TAP in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-3.png)

Populate all the required fields (\*):

* Label - Name of the resource
* URL: URL of Proofpoint TAP (default URL’ [https://tap-api-v2.proofpoint.com](https://tap-api-v2.proofpoint.com/)’ is already provided)
* Service Principal
* Secret Key

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-4.png)

Then click Save.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-6.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-7.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-8.png)

## Change Log

* February 4, 2022 - First upload
* March 31, 2023 (v1.1 and v1.2) - Integration refined.
