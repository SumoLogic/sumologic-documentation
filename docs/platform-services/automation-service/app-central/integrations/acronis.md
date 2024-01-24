---
title: Acronis
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/acronis.png)

Version: 1.1  
Updated: Jul 03, 2023

Acronis develops on-premises and cloud software with integration of backup, disaster recovery, cybersecurity and endpoint management. It offers a web-based management console that provides infrastructure-utilization insights and allows remote management of backups from any browser on any device, including tablets and smartphones.

## Actions

* **Fetch All Alerts** (*Enrichment*) - Retrieve all alerts by optional filtering parameters

## Acronis Configuration

Please follow these steps to get your API key from Arconis:

1. Select Manage account from the dashboard. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-1.png)

1. From Settings choose API clients. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-2.png)

1. Select Create API Client and enter a name. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-3.png) <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-4.png)

1. Copy and save the Client ID, Secret, and Data center URL. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-5.png)

## Acronis in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-6.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-7.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-8.png)

1. Populate all the required fields (\*):
   * Label: The desired name for the resource.
   * URL: Your Acronis Data Center URL you copied earlier from Acronis. Default: 'https://cloud.acronis.com'/ .
   * Client ID: Your Acronis Client ID you copied earlier from Acronis.
   * Client Secret: Your Acronis Secret you copied earlier from Acronis. 

1. Click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-9.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-10.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-11.png) 

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/acronis/acronis-12.png)

## Change Log

* July 26, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
