---
title: Material Security
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/material-security.png)

Version: 1.3  
Updated: Jul 18, 2023

**Material Security** protects critical data in employee, partner, contractor, and VIP accounts—without hurting productivity. Material finds and redacts sensitive content in email archives and brings it back when you need it, after a simple verification step.

## Actions

* **Search Cases** (*Enrichment*) - Search into the Cases
* **Get Case Status** (*Enrichment*) - Get Status of a Case
* **Get Case Details** (*Enrichment*) - Get Case Details
* **Update Case Status** (*Containment*) - Update Specific Case
* **List Messages** *(Enrichment)* - List messages from the result of a search using Search Messages Job
* **Override Message** *(Containment)* - Applies one or more overrides to a message that can alter the message in a given mailbox. The target account must have Phishing Herd Immunity enabled for overrides to take effect
* **Get Message Details** *(Enrichment)* - Get details for a single message
* **Get Message Details Batch** *(Enrichment)* - Get message details for a batch of messages
* **Search Messages** *(Enrichment)* - Issues a job with a search query for messages. The result includes groupListId for retrieving the list of messages via the List Messages action
* **Mark Message as Suspicious** *(Containment)* - Indicates that the specified message is suspicious
* **Mark Message Sensitive and Insensitive** *(Containment)* - Indicates that the specified message is sensitive or insensitive

## Material Security in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-3.png)

Populate all the required fields (\*)

* API URL: Your URL
* API Token: Insert your token

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/material-security/material-security-7.png)

## Change Log

* June 08, 2022 - First upload
* January 05, 2023 - New actions added, previously developed actions refactored.
* July 5, 2023 (v1.2) - Removed leading/trailing spaces
* July 18, 2023 (v1.3) - Code refactoring
