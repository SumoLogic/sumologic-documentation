---
title: FireHydrant
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/firehydrant.png)

Version: 1.1  
Updated: Jul 18, 2023

**FireHydrant** is incident management platform that creates consistency across the entire incident management process.

## Actions

* **List Incidents** (*Enrichment*) - List all of the incidents in the organization
* **Get Incident Details** (*Enrichment*) - Retrieve a single incident from its ID
* **List Alerts** (*Enrichment*) - Retrieve all alerts from third parties
* **List Tickets** (*Enrichment*) - List all of the tickets that have been added to the organiation
* **List All Incident Tags** (*Enrichment*) - List all of the incident tags in the organization
* **List Environments** (*Enrichment*) - List all of the environments that have been added to the organization
* **List Functionalities** (*Enrichment*) - List all of the functionalities that have been added to the organization
* **List Saved Search** (*Enrichment*) - Lists save searches
* **List Teams** (*Enrichment*) - List all of the teams in the organization
* **List Services** (*Enrichment*) - List all of the services that have been added to the organization
* **List Severities** (*Enrichment*) - Lists severities
* **List Priorities** (*Enrichment*) - Lists priorities

## FireHydrant Configuration

Login to **FireHydrant** with your email and password and refer to the Bot users page.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-1.png)

Create your token and use as API Key. Make sure you click to copy the token, it will not be shown again.

## FireHydrant in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-3.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-4.png)

Populate all the required fields (\*) and then click Save.

* URL: default value for API URL is 'https://api.firehydrant.io'
* API Key: the API Key you copied earlier

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-6.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-7.png)   


You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-8.png)

  
 

## Change Log

* November 29, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
