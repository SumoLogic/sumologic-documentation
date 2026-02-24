---
title: IBM QRadar
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ibm-qradar.png')} alt="ibm-qradar" width="100"/>

***Version: 1.3  
Updated: Jul 11, 2023***

IBM QRadar SIEM helps security teams detect, prioritize and respond to threats across the enterprise.

## Actions

* **Get Offense Closing Reasons** *(Enrichment)* - Get the list of offense closing reasons.
* **Search Into Events QRadar** *(Enrichment)* - Search QRadar events.
* **Get Offense** *(Enrichment)* - Gather information on a specific offense.
* **Search Reference Set** *(Enrichment)* -Search a reference set for specific information.
* **List Reference Sets** *(Enrichment)* - List all available reference sets.
* **Update Reference Set** *(Enrichment)* - Update an existing reference set.
* **Update Ticket** *(Notification)* - Update an offense.
* **Add Offense Note** *(Notification)* - Add a note to a specific Offense.
* **Get Offenses Daemon** *(Daemon)* - Automatically get new QRadar offenses.
* **Remove Value From Reference Set** *(Notification)* - Remove a value from the reference set.
* **Update Reference Set V2** *(Enrichment)* -Update an existing reference set.
* **Search Reference Sets V2** *(Enrichment)* - Search a reference sets for specific information.
* **List Reference Sets V2** *(Enrichment)* - List all available reference sets.
* **Remove Value From Reference Set V2** *(Notification)* - Remove a value from the reference set.
* **Get Offenses Daemon V2** *(Daemon)* - Automatically get new QRadar offenses.
* **Search Into Events QRadar V2** *(Enrichment)* - Search QRadar events.

## Configure IBM QRadar in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your IBM QRadar server URL.

* **Authentication method**. Select either **Username and password** or **Authentication token**.

* **Username**. If you selected **Username and password** above, enter the username of an admin user authorized to authenticate the integration.

* **Password**. If you selected **Username and password** above, enter the password for the admin user.

* **Token**. If you selected **Authentication token** above, enter the [token](https://www.ibm.com/docs/en/qsip/7.5?topic=visibility-creating-authorized-service-token).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ibm-qradar-configuration.png')} style={{border:'1px solid gray'}} alt="IBM QRadar configuration" width="400"/>

For information about IBM QRadar, see [IBM QRadar documentation](https://www.ibm.com/support/pages/accessing-ibm-qradar-product-documentation).

## Change Log

* May 5, 2019 - First upload
* January 31, 2020 - New action added: Get Offense
* April 3, 2020 - New action added: Add Offense Note
* May 29, 2020 - Improvements
* March 22, 2021 - New Actions added
* June 3, 2021 - New Actions added
* March 8, 2022 - Description
* April 11, 2022 - updated Action:
	+ Get Offenses Daemon V2 (New endpoint added to fetch offense Destination IPs)
* June 07, 2022 - Updated action:
	+ Get Offenses Daemon V2
* July 11, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from IBM QRadar OIF to IBM QRadar
	+ Changed field visibility
	+ Added new actions:
		- Search Into Events QRadar V3
		- Search Into Events QRadar V4
