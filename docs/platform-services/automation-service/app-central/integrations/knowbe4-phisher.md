---
title: KnowBe4 PhishER
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/knowbe4-phisher.png)

Version: 1.5  
Updated: Sep 26, 2023

KnowBe4 PhishER Identifies and responds to email threats faster with automatic prioritization for emails, also helps your InfoSec and Security Operations team cut through the inbox noise and respond to the most dangerous threats more quickly.

## Actions

* **Get Message** *(Enrichment)* - Returns a PhishER message by ID
* **Search Messages** *(Enrichment)* - Returns paginated messages based on the specified Lucene query
* **PhishER Messages Daemon** *(Daemon) -* Automatically pull messages based on the specified Lucene query

## KnowBe4 PhishER Configuration

Follow the steps from the KnowBe4 PhishER [guide](https://developer.knowbe4.com/graphql/phisher/page/Introduction) to create your authentication credentials.

**KnowBe4 PhishER in Cloud SOAR**

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: the name for the resource
   * URL: KnowBe4 PhishER host URL
   * API Token: Your KnowBe4 PhishER API key <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-7.png)

## Change Log

* April 26, 2023 - First upload
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
* August 24, 2023 (v1.4)
	+ New Daemon: PhishER Messages Daemon
* September 26, 2023 (v1.5) - Updated Action: **Get Message**
