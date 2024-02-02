---
title: KnowBe4 KMSAT - User Events
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/knowbe4-kmsat-user-events.png)

Version: 1.1  
Updated: Jun 26, 2023

KnowBe4 KMSAT is a security platform for security awareness training and simulated phishing attacks. KnowBe4 KMSAT User Event API helps you tailor security awareness training based on custom user risk events.

## Actions

* **Get Event Status** *(Enrichment)* - Retrieve status of a specific event
* **List Event Statuses** *(Enrichment)* - Retrieve statuses of previously executed events
* **Get Event** *(Enrichment)* - Retrieve data about a specific event
* **List Events** *(Enrichment)* - Retrieve data about all events
* **Get Event Type** *(Enrichment)* - Retrieve data about a specific event type
* **List Event Types** *(Enrichment)* - Retrieve data about all event types
* **Create Event** *(Containment)* - Create a new event
* **Delete Event** *(Containment)* - Delete an existing event

## KnowBe4 KMSAT - User Events in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-3.png)

1. Populate all the required fields (\*) and then click Save.
  * Label: The desired name for the resource
  * URL: Server that is closer to your geo location
	  * US server - https://api.events.knowbe4.com
	  * EU server - https://api.events.knowbe4.com
	  * CA server - https://api-ca.events.knowbe4.com
	  * UK server - https://api-uk.events.knowbe4.com
	  * DE server - https://api-de.events.knowbe4.com
   * API Key: Your KnowBe4 KMSAT API Key you copied earlier from KnowBe4 KMSAT. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-user-events/knowbe4-kmsat-user-events-7.png)

## Change Log

* February 6, 2023 - First upload
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
