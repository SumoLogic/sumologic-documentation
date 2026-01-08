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

Follow these steps to [get your API key from Automox](https://docs.automox.com/product/Product_Documentation/Settings/Managing_Keys.htm):

1. Select **Keys** from the menu. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-1.png')} style={{border:'1px solid gray'}} alt="automox-1" width="400"/>
1. Click the **ADD** button to add a new API key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-2.png')} style={{border:'1px solid gray'}} alt="automox-2" width="600"/>
1. Choose a name for this key and then click the button to generate the new key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-3.png')} style={{border:'1px solid gray'}} alt="automox-3" width="400"/>
1. Copy the API key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/automox/automox-4.png')} style={{border:'1px solid gray'}} alt="automox-4" width="800"/>

## Configure Automox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Automox site URL. The default value is `https://console.automox.com`

* **API Key**. Enter the API key you [copied earlier](#automox-configuration). 
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/automox-configuration.png')} style={{border:'1px solid gray'}} alt="Automox configuration" width="400"/>

For information about Automox, see [Automox documentation](https://docs.automox.com/product/Home.htm).

## Change Log

* July 7, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
