---
title: Airtable
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/airtable.png)

Version: 1.1  
Updated: Jul 18, 2023

**Airtable** is a spreadsheet-database hybrid, with the features of a database but applied to a spreadsheet.   


## Actions

* **Get Record** (*Enrichment*) - Get specific recorde
* **List Records Incident Details** (*Enrichment*) - Get all recordes
* **List Bases**(*Enrichment*) - List bases on Airtable
* **Get Base Schema** (*Enrichment*) - Get base structure
* **Create Records All** (*Containment*) - Create redords

## Airtable Configuration

Login to Airtable with your email and password and refer to the Developer hub page.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-1.png)

Create your token.

## Airtable in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-3.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-4.png)

Populate all the required fields (\*) and then click Save.

* URL: default value for API URL is 'https://api.airtable.com'
* Token : the Token you copied earlier

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-6.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-7.png)   
 

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/airtable/airtable-8.png)

  
 

## Change Log

* November 30, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
