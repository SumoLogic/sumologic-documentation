---
title: Forescout eyeSight
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/forescout-eyesight.png)

Version: 1.2  
Updated: Jul 18, 2023

Discovers every IP-connected device, auto-classifies it, and assesses its compliance posture and risk the instant a device connects to the network.

## Actions

* **List Hosts** *(Enrichment)* - Retrieve all hosts.
* **Get Host** *(Enrichment)* - Get host info by Host ID/ Mac Address or IP Address.
* **Get Host Fields***(Enrichment)* - Get all host fields.
* **List Policies** *(Enrichment)* - Get all policies.

## Forescout eyeSight Configuration

To configure Web API follow this [link](https://docs.forescout.com/bundle/web-api-1-5-3-h/page/web-api-1-5-3-h.Configure-Web-API-Plugin.html) or contact **Forescout eyeSight** team for more information on configuration.

## Forescout eyeSight in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Enterprise Manager IP: **Forescout eyeSight IP**
   * User
   * Password <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-5.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-6.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/forescout-eyesight/forescout-eyesight-7.png)

## Change Log

* October 17, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring
