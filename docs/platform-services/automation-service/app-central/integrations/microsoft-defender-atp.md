---
title: Microsoft Defender ATP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-defender-atp.png')} alt="microsoft-defender-atp" width="100"/>

***Version: 1.2  
Updated: Jul 12, 2023***

Microsoft Defender Advanced Threat Protection (ATP) is a product that enables preventive protection, post-breach detection, automated investigation and response. It is a complete security solution that:

* Is built-in to Windows 10 and uses a combination of Windows 10 and cloud services to catch suspicious endpoint behaviours.
* Automates alerts and remediation of complex threats in minutes.
* When used together with Microsoft 365, can share detection and exploration across devices, identities and information to speed up response and recovery.
* Requires no additional deployment or infrastructure and is always up to date.

## Actions

* **Fetch Investigation Package URI** *(Enrichment)* - Retrieve a URI that allows downloading of an Investigation package.
* **Get Machine Action Details** *(Enrichment)* - Retrieve specific machine action by its ID.
* **List Indicators** *(Enrichment)* - Retrieve a collection of all active Indicators.
* **List Machines** *(Enrichment)* - Retrieves a collection of machines that have communicated with Microsoft Defender for Endpoint cloud.
* **List Machine Actions** *(Enrichment)* - Retrieves a collection of machine actions.
* **Delete Indicator** *(Containment)* - Delete an Indicator entity by ID.
* **Isolate Machine** *(Containment)* - Isolate a device from accessing external network.
* **Release Machine From Isolation** *(Containment)* - Undo isolation of a device.
* **Run Antivirus Scan** *(Containment)* - Initiate Microsoft Defender Antivirus scan on a device.
* **Start Automated Investigation** *(Containment)* - Start automated investigation on a device.
* **Stop And Quarantine File** *(Containment)* - Stop execution of a file on a device and delete it.
* **Submit Indicator** *(Containment)* - Submit or update new Indicator entity.
* **Run Advanced Hunting Query** *(Custom)* - Inspect unusual activity, detect possible threats and even respond to attacks.
* **Collect Investigation Package** *(Scheduled)* - Collect investigation package from a device.

## Microsoft Defender ATP configuration

1. Log in to Azure with a user that has the Global Administrator role. Navigate to **Azure Active Directory > App registrations > New registration**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-1.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>
1. Choose a name for your application, and then select Register. To enable your app to access Defender for Endpoint and assign it 'Read all alerts' permission, on your application page, select **API Permissions > Add permission > APIs my organization uses**, type *WindowsDefenderATP*, and then select WindowsDefenderATP. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-2.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>
1. Select the relevant permissions. For example, 'Read All Alerts'. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-3.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>
1. All the permissions would be something like this. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-14.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>
2. Select Grant consent. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-4.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>
1. Next, add a secret to the application. Select **Certificates & secrets**, add a description to the secret, and then select **Add**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-5.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>
1. Navigate to **Overview**, copy and save your application ID and your tenant ID.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-6.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>

## Configure Microsoft Defender ATP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the "+" button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-9.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="600"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The desired name for the resource.
   * **API URL**. Server that is closer to your geo location.
	  * api-us.securitycenter.microsoft.com
	  * api-eu.securitycenter.microsoft.com
	  * api-uk.securitycenter.microsoft.com
   * **Directory (Tenant ID)**. Your Tenant ID you copied earlier.
   * **Application (Client ID)**. Your Client ID you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-10.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-11.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-12.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="400"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-defender-atp/microsoft-defender-atp-13.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="400"/>

## Change Log

* December 15, 2022 - First upload
* May 4, 2021 - Actions updated: actions accept md5 hash
* January 4, 2023
	+ New Actions
		- Fetch Investigation Package URI
		- List Machines
		- Start Automated Investigation
		- Run Advanced Hunting Query
		- Collect Investigation Package
	+ Modified Actions
		- Get Machine Action Details
		- List Indicators
		- List Machine Actions
		- Delete Indicator
		- Isolate Machine
		- Release Machine From Isolation
		- Run Antivirus Scan
		- Stop And Quarantine File
		- Submit Indicator
* July 12, 2023 (v1.2) - Changed fields visibility
