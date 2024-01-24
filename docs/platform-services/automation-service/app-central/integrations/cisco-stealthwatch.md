---
title: Cisco Stealthwatch
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cisco-stealthwatch.png)

Version: 1.1  
Updated: Jul 06, 2023

Cisco Stealthwatch provides easy to use and comprehensive APIs for reporting, making configuration changes, managing users, exporting data, and more. It offers early access to advanced event capabilities and UI workflows with Analytics, which provides new and effective alerts that require less manual configuration.

## Actions

* **List Tags** *(Enrichment)* - Provides access to basic information about the Tags (host groups) in Stealthwatch
* **Get Tag** *(Enrichment)* - Get details for a specific tag
* **Get Top Alarming Tags** *(Enrichment)* - Retrieves top alarming tags for a given host type
* **Get Top Applications** *(Enrichment)* - Search for the top applications with a given criteria
* **Get Top Hosts** *(Enrichment)* - Search for top hosts with a given criteria
* **Get Top Ports** *(Enrichment)* - Search for top ports with a given criteria
* **List Hourly Traffic Tag** *(Enrichment)* - Retrieves the hourly traffic trend for a given host type
* **List Tenants** *(Enrichment)* - Provides access to basic information about the Tenants (domains) and the Tags (host groups) in the Stealthwatch System.
* **Search Flows** *(Enrichment)* - Perform flow searches using basic criteria such as time range, IP address or range, port/protocols, and host groups
* **Search Events** *(Enrichment)* - Perform event searches based on the given criteria

## Cisco Stealthwatch in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-3.png)

Populate all the required fields (\*)

Click Save.

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-4.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-5.png) 

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/cisco-stealthwatch/cisco-stealthwatch-6.png)

## Change Log

* Aug 04, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
