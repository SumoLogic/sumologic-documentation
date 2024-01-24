---
title: ProtectOnce
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/protectonce.png)

Version: 1.2  
Updated: Jul 18, 2023

**ProtectOnce** provides SaaS companies with a radically simplified agentless solution that secures API-driven applications in a matter of minutes, providing deep visibility into all APIs and helping to prevent complex attacks.

## Actions

* **Get Incidents** *(Enrichment)* - Returns all Incidents
* **Netskope Get Incidents Daemon ProtectOnce** *(Daemon)* - Automatically gather Incidents from ProtectOnce

## ProtectOnce in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-3.png)

Populate all the required fields (\*) and then click Save.

* Server URL: URL for API
* Email : Email you use to log in into the system
* Password : The password of your email
* Application ID : The id of the application

Additionally, if need you can populate the query daemons

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-4.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-5.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-6.png)

## Change Log

* December 26, 2022 - First upload
* July 18, 2023 (v1.2) - Removed leading/trailing spaces
