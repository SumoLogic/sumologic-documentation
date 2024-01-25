---
title: Neurons ITSM
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/neurons-itsm.png)

Version: 1.1  
Updated: Jul 06, 2023

Ivanti Neurons ITSMis IT service management solution that transforms help desks and support teams into strategic business.

## Actions

* **List Incidents** (*Enrichment*) - Fetches all records for incidents.
* **Create Problem** (*Containment*) - Creates problem.
* **Create Change** (*Containment*) - Creates change.
* **Create Incident Neurons ITSM** (*Containment*) - Creates incident.
* **Close Incident** (*Containment*) - Close an incident using a quick action.

## Neurons ITSM Configuration

To access Neurons for ITSM specify the URL for your tenant that has been sent to you by email. 

To view your API Key from the Configuration Console, click Configure > Security Controls > API Keys to open the API Keys workspace. The application displays the API keys. Copy your key.

## Neurons ITSM in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-3.png)

1. Populate all the required fields (\*) and then click Save.
   * Tenant URL: your tenant url
   * API Key: the API Key you copied earlier. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-5.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-6.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-7.png)


## Change Log

* August 25, 2022 - First upload
* September 1, 2022 - New Logo
* July 6, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed type to Notification for following actions:
		- Create Change
		- Create Incident Neurons
		- Create Problem
