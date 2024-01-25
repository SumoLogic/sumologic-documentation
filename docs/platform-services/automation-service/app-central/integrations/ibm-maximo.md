---
title: IBM Maximo
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/ibm-maximo.png)

Version: 1.3  
Updated: Jul 07, 2023

 **IBM Maximo** is a single, integrated cloud-based platform that uses AI, IoT and analytics to optimize performance, extend asset lifecycles and reduce operational downtime and costs.

## Actions

* **Get Ticket Details** (*Enrichment*) - Get details about a ticket by ticket unique ID (uid)
* **Create Ticket** (*Notification*) - Create a ticket
* **Update Ticket** (Notification) - Update an existing ticket by ticket unique ID (uid)
* **Close Ticket** (*Containment*) - Close ticket by ticket unique ID (uid)
* **List Tickets** (*Enrichment*) - Retrieve a list of tickets, filtering is possible by providing filter key/value pair

## IBM Maximo in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Host: Host for API
   * Username : Username you use to log in into the system
   * Password : The password of your email

1. Additionally, if need you to, you can populate the query daemons.

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-4.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-5.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/ibm-maximo/ibm-maximo-6.png)

## Change Log

* March 30, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 7, 2023 (v1.3) - Changed action type to Notification for:
	+ Create Ticket
	+ Update Ticket
