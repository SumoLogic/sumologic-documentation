---
title: BitSight Security Performance Management
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/bitsight-security-performance-management.png)

Version: 1.1  
Updated: Jul 06, 2023

BitSight offers the world's leading security ratings solution with a mission to change the way the world manages cybersecurity risk. 

## Actions

* **List Alerts** *(Enrichment)* - List your existing alerts and their details
* **Get Alert Details** *(Enrichment)* - Get the details of an alert
* **List Companies** *(Enrichment)* - Retrieve information about all companies in your portfolio
* **Get Company Details** *(Enrichment)* - Get specific details about a company that's not returned by querying companies alone. The details include rating details, rating history, and risk vector grades
* **Get Company Findings** *(Enrichment)* - Get an organization’s finding details

## BitSight configuration

To generate API Token, after signing in, go to top right corner on the gear icon and select **Account** . 

In the **API Token** section, click **Generate New Token (**this token will be used later in the Cloud SOAR configuration).

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-1.png)

## Configure BitSight Security Performance Manager Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-3.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-4.png)

Populate all the required fields (\*):

• Label: The name of the resource

• URL: URL of BitSight API (default URL [https://api.bitsighttech.com](<https://www.alphamountain.ai/contact/>) is already provided)

• API Token

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-5.png)

Then click Save. 

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-6.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-7.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-8.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-10.png)

## Change Log

* February 10, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
