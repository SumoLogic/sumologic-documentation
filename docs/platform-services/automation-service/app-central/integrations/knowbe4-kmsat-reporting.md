---
title: KnowBe4 KMSAT - Reporting
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/knowbe4-kmsat-reporting.png)

Version: 1.1  
Updated: Jun 15, 2023

KnowBe4 KMSAT is a security platform for security awareness training and simulated phishing attacks. KnowBe4 KMSAT Reporting API allows you to pull data from the KnowBe4 console for reporting purposes.

## Actions

* **Get Campaign PSTs** *(Enrichment)* - Retrieve all phishing security tests from specific phishing campaign
* **Get Phishing Campaign** *(Enrichment)* - Retrieve data from specific phishing campaign
* **List PST Results** *(Enrichment)* - Retrieve data about all users that were part of a specific phishing security test
* **List Phishing Campaigns** *(Enrichment)* - Retrieve data from all phishing campaigns
* **List Users** *(Enrichment)* - Retrieve data about all users

## KnowBe4 KMSAT - Reporting in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: The desired name for the resource
   * URL: Server that is closer to your geo location
   * API Key: Your KnowBe4 KMSAT API Key you copied earlier from KnowBe4 KMSAT <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-4.png) <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-7.png)

## Change Log

* February 6, 2023 - First upload
* June 14, 2023 (v1.1) - Updated the integration with Environmental Variables
