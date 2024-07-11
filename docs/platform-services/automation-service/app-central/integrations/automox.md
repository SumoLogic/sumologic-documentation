---
title: Automox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/automox.png')} alt="automox" width="80"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Automox is a cloud-native patching platform that automates patch management across Windows, macOS, Linux, and third-party software including Adobe, Java, Firefox, Chrome, and Windows.

## Actions

* **List Devices** (*Enrichment*) - Retrieve a detailed list of all devices for the authenticated user.
* **List Organizations** (*Enrichment*) - Retrieve a detailed list of all organizations for the authenticated user.
* **List Users** (*Enrichment*) - Retrieve a list of all users with access to an organization.
* **List Server Groups** (*Enrichment*) - Retrieve all server group objects for the authenticated user.
* **List Tasks** (*Enrichment*) - List all tasks for an organization, with the ability to filter and sort results.
* **Run Command** (*Containment*) - Force a device to Scan, Patch, or Reboot for immediate execution.
* **Submit CSV File** (*Containment*) - Upload a vulnerability report to Automox.
* **Submit CSV File** (*Containment*) - Upload a vulnerability report to Automox.
* **Update Task** (*Containment*) - Change the state of a task.

## Automox configuration

Follow these steps to get your API key from Automox:

1. Select **Keys** from the menu. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-1.png')} style={{border:'1px solid gray'}} alt="automox-1" width="400"/>
1. Click the **ADD** button to add a new API key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-2.png')} style={{border:'1px solid gray'}} alt="automox-2" width="600"/>
1. Choose a name for this key and then click the button to generate the new key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-3.png')} style={{border:'1px solid gray'}} alt="automox-3" width="400"/>
1. Copy the API key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-4.png')} style={{border:'1px solid gray'}} alt="automox-4" width="800"/>

## Automox in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-7.png')} style={{border:'1px solid gray'}} alt="automox-7" width="600"/>
1. Populate all the required fields (\*) and then click Save.
   * **URL**. The Automox URL. Default: 'https://console.automox.com'
   * **API Key**. The API Key you copied earlier. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-8.png')} style={{border:'1px solid gray'}} alt="automox-8" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-9.png')} style={{border:'1px solid gray'}} alt="automox-9" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-10.png')} style={{border:'1px solid gray'}} alt="automox-10" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-11.png')} style={{border:'1px solid gray'}} alt="automox-11" width="400"/>

## Change Log

* July 7, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
