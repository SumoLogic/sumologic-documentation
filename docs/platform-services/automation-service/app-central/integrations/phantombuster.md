---
title: Phantombuster
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/phantombuster.png)

Version: 1.5  
Updated: Jul 18, 2023

**Phantombuster** is a platform that enables businesses to automate their web tasks without the need for extensive coding. It provides a range of pre-built automation workflows and customizable APIs, allowing users to scrape data, automate social media tasks, and send personalized emails to prospects. Phantombuster helps businesses save time and improve their productivity by streamlining their workflows.

## Actions

* **Get Agent** *(Enrichment)* - Gets an agent by ID
* **List Agents** *(Enrichment)* - Gets all agents of the current user's organization
* **Get Agent Output** *(Enrichment)* - Gets the output of the most recent container of an agent. This API endpoint is specifically designed so that it’s easy to get incremental data from an agent.
* **Launch Agent** *(Containment)* - Adds an agent to the launch queue.
* **Stop Agent** *(Containment)* - Stops an agent
* **Delete Agent** *(Containment)* - Deletes an agent by ID

## Phantombuster configuration

Follow the steps from the Phantombuster [guide](https://hub.phantombuster.com/docs/api#authentication-and-request-format) to create your authentication credentials.

## Phantombuster in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-3.png)

Populate all the required fields (\*) and then click Save.

* Label: the name for the resource
* URL: Phantombuster host URL
* API Key: Your Phantombuster api key

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/phantombuster/phantombuster-7.png)

## Change Log

* April 3, 2023 - First upload
* July 18, 2023 (v1.5) - Removed leading/trailing spaces
