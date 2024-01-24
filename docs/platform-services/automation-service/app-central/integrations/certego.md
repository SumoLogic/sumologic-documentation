---
title: Certego
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/certego.png)

Version: 1.2  
Updated: Jul 11, 2023

Certego Managed services for breach detection, cyber security and response to threats and intrusions.

## Actions

* **Search Tickets** *(Enrichment)* - Retrieve Tickets/Incidents
* **Get Ticket Details** *(Enrichment)* - Retrieves full details for a particular ticket
* **Certego Tickets Daemon** *(Daemon)* - Automatically retrieve new tickets

  
## Configure Certego in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: the name for the resource
   * URL API: Certego URL API. Default: 'https://panoptikon.certego.net'/
   * Username: your Certego username
   * Password: your Certego password <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-6.png)   
 
1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/certego/certego-7.png)

## Change Log

* October 25, 2022 - First upload
* March 29, 2023 - Integration refactored.
* July 11, 2023 (v1.2) - Removed leading/trailing spaces
