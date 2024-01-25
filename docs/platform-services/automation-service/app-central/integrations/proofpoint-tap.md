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

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-3.png)

1. Populate all the required fields (\*):
   * Label - Name of the resource
   * URL: URL of Proofpoint TAP (default URL’ [https://tap-api-v2.proofpoint.com](https://tap-api-v2.proofpoint.com/)’ is already provided)
   * Service Principal
   * Secret Key <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-4.png)

1. Then click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-5.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-6.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-7.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/proofpoint-tap/proofpoint-tap-8.png)

## Change Log

* February 4, 2022 - First upload
* March 31, 2023 (v1.1 and v1.2) - Integration refined.
