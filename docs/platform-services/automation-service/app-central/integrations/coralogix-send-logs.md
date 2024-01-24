---
title: Coralogix - Send Logs
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/coralogix-send-logs.png)

Version: 1.1  
Updated: Jul 06, 2023

Coralogix is rebuilding the path to observability using a real-time streaming analytics pipeline that provides monitoring, visualisation, and alerting capabilities without the burden of indexing.

## Actions

* **Send Logs** (*Containment*) - Send Logs

## Coralogix - Send Logs Configuration

Generate and then copy the API Key for sending data.

`https://<teamname>.coralogix.com/#/integration/apikey` 

![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-1.png)

## Coralogix - Send Logs in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-2.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-3.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-4.png)

1. Populate all the required fields (\*) and click Save.
   * Server URL: choose between the following URLs depending on the top level domain of your Coralogix account (.com, .in, etc.):
	   + for .com use https://api.coralogix.com
	   + for .us use https://api.coralogix.us
	   + for .in use https://api.app.coralogix.in
	   + for .eu2. use https://api.app.eu2.coralogix.com
	   + for sg.com use https://api.app.coralogixsg.com
   * Private Key: your Coralogix account private key
   * Application Name: the Coralogix application name
   * Subsystem Name: the Coralogix subsystem name <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-5.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-6.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-7.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-8.png)

## Change Log

* July 07, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
