---
title: SecurityTrails
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/securitytrails.png)

Version: 1.1  
Updated: Jul 18, 2023

SecurityTrails is a total inventory that curates comprehensive domain and IP address data for users and applications that demand clarity. By combining current and historic data of all Internet assets, SecurityTrails is the proven solution for 3rd-party risk assessment, attack surface reduction and threat hunting

## Actions

* **List Subdomains** *(Enrichment)* - Returns child and sibling subdomains for a given hostname

## SecurityTrails in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.   


![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-1.png)

In the Automation section, on the left menu, click Integrations.   
  
![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-2.png)

After the list of the integrations appears, search/look for the integration and click on the row. The integration details will appear.Click on the "+" button to add new Resource   
 

Populate all the required fields (\*) and then click Save.  

* Label: The desired name for the resource
* URL: the SecurityTrails API URL. Default: https://api.securitytrails.com
* API Key: your SecurityTrails API Key

![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-3.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-4.png)

Click Test Saved Settings.   
 

![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-5.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-6.png)

## Change Log

* November 28, 2022 - First upload
* December 13, 2022 - Refactoring
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
