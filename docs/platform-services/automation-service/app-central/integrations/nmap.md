---
title: Nmap
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/nmap.png)

Version: 1.3  
Updated: Jun 26, 2023

**Nmap** is a free and open-source network scanner. Nmap is used to discover hosts and services on a computer network by sending packets and analyzing the responses.

## Actions

* **Create Scan** (*Enrichment*) - Start NMAP scan
* **Check Scan Status** (*Enrichment*) - Check scan status
* **Get Scan Info** (*Enrichment*) - Get scan info
* **Get Scan Report** (*Enrichment*) - Get scan report
* **List Credits** (*Enrichment*) - Get API calls report for current member

## Nmap in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-3.png)

Populate all the required fields (\*)

* URL: Your URL default ('https://api.nmap.online'/)
* Api Key : Insert the API Key

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/nmap/nmap-7.png)

## Change Log

* August 09, 2022 - First upload
* April 28, 2023 (v1.2) - Integration refactored
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
