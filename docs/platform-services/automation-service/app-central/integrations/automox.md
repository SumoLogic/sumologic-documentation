---
title: Automox
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/automox.png)

Version: 1.1  
Updated: Jul 03, 2023

Automox is a cloud-native patching platform that automates patch management across Windows, macOS, Linux, and third-party software including Adobe, Java, Firefox, Chrome, and Windows.

## Actions

* **List Devices** (*Enrichment*) - Retrieve a detailed list of all devices for the authenticated user
* **List Organizations** (*Enrichment*) - Retrieve a detailed list of all organizations for the authenticated user
* **List Users** (*Enrichment*) - Retrieve a list of all users with access to an organization
* **List Server Groups** (*Enrichment*) - Retrieve all server group objects for the authenticated user
* **List Tasks** (*Enrichment*) - List all tasks for an organization, with the ability to filter and sort results
* **Run Command** (*Containment*) - Force a device to Scan, Patch, or Reboot for immediate execution
* **Submit CSV File** (*Containment*) - Upload a vulnerability report to Automox
* **Submit CSV File** (*Containment*) - Upload a vulnerability report to Automox
* **Update Task** (*Containment*) - Change the state of a task

## Automox Configuration

Please follow these steps to get your API key from Automox:

1. Select Keys from the menu. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-1.png)

1. Click the button to add a new API key. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-2.png)

1. Choose a name for this key and then click the button to generate the new key. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-3.png)

1. Copy the API key. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-4.png)

## Automox in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-5.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-6.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-7.png)

1. Populate all the required fields (\*) and then click Save.
   * URL: the Automox URL. Default: 'https://console.automox.com'
   * API Key: the API Key you copied earlier. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-8.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-9.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-10.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/automox/automox-11.png)

## Change Log

* July 7, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
