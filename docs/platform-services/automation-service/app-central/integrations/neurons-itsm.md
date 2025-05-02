---
title: Neurons ITSM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/neurons-itsm.png')} alt="neurons-itsm" width="70"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Ivanti Neurons ITSMis IT service management solution that transforms help desks and support teams into strategic business.

## Actions

* **List Incidents** (*Enrichment*) - Fetches all records for incidents.
* **Create Problem** (*Containment*) - Creates problem.
* **Create Change** (*Containment*) - Creates change.
* **Create Incident Neurons ITSM** (*Containment*) - Creates incident.
* **Close Incident** (*Containment*) - Close an incident using a quick action.

## Neurons ITSM configuration

To access Neurons for ITSM specify the URL for your tenant that has been sent to you by email. 

To view your API Key from the Configuration Console, click **Configure > Security Controls > API Keys** to open the API Keys workspace. The application displays the API keys. Copy your key.

## Configure Neurons ITSM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-3.png')} style={{border:'1px solid gray'}} alt="neurons-itsm" width="500"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Tenant URL**. Enter your tenant url.
   * **API Key**. The API Key you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-4.png')} style={{border:'1px solid gray'}} alt="neurons-itsm" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-5.png')} style={{border:'1px solid gray'}} alt="neurons-itsm" width="400"/>
1. Click **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-6.png')} style={{border:'1px solid gray'}} alt="neurons-itsm" width="400"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/neurons-itsm/neurons-itsm-7.png')} style={{border:'1px solid gray'}} alt="neurons-itsm" width="400"/>

## Change Log

* August 25, 2022 - First upload
* September 1, 2022 - New Logo
* July 6, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed type to Notification for following actions:
		- Create Change
		- Create Incident Neurons
		- Create Problem
