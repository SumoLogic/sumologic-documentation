---
title: Kela RaDark
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/kela-radark.png)

Version: 1.1  
Updated: Jul 03, 2023

KELA's RADARK delivers automated threat intelligence, cultivating the targeted and contextualized insights that you need to stay ahead of attackers. Automatically monitor your environment and ensure that targeted threats are mitigated immediately to consistently maintain a strong security posture.

## Actions

* **List Incidents** *(Enrichment)* - Returns a list of incidents matching it
* **Scrolling Incidents** *(Enrichment)* - Get the next bulk of incidents from List Incidents action
* **Get Incident Details** *(Enrichment)* - Get a specific incident
* **Update Kela RaDark Incident** *(Containment)* - Updating an Incident

## Kela RaDark configuration

1. Sign in **Kela RaDark** using your username and password.
2. The API token can be generated through the RADARK UI, under the user menu - Generate Api Key.
3. Make sure you copy and save the api token.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-1.png)

## Kela RaDark in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-3.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-4.png)

Populate all the required fields (\*)

In the API Key field, insert the previously copied key.

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-6.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-7.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-8.png)

## Change Log

* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
