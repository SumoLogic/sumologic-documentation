---
title: Panda EDR
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/panda-edr.png')} alt="panda-edr" width="100"/>

***Version: 1.3  
Updated: Nov 24, 2023***

Remotely monitor and manage devices that run these Panda Aether platform endpoint security products:

* Adaptive Defense and Adaptive Defense 360
* Endpoint Protection and Endpoint Protection Plus

## Actions

* **Get Device Protection Status** *(Enrichment)* - Retrieves a list of devices with their protection status and other device information.
* **Get Security Overall Summary** *(Enrichment)* - Retrieves a security overview that includes security event counters for a specified time period.
* **Isolate Specific Devices** (*Containment*) Isolates the specified devices. When you isolate a device, communication to and from the device is denied.
* **List Device Info** *(Enrichment)* - Retrieves a list of devices, and additional information, such as the device IP address and operating system.
* **List Network Unmanaged Devices** *(Enrichment)* - Retrieves a list of unmanaged devices discovered on the network.
* **List Security Events for Specific Devices** *(Enrichment)* - Retrieves a list of security events of the specified type for the specified device for a specific time period.
* **Scan Device** *(Enrichment)*  - Starts a task to scan the specified devices immediately.
* **Start Action On Specified Device** (*Containment*) - Initiates an action on the specified devices. For example, sends an action to reboot a device.
* **Stop Device Isolation** (*Containment*) - Stops isolation on the specified devices.

## Category

EDR

## Configure Panda EDR in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the [API URL](https://www.watchguard.com/help/docs/api/Content/en-US/api_get_started/make_requests.html) for WatchGuard, for example, `https://api.usa.cloud.watchguard.com`

* **Access ID**. Enter a WatchGuard [access ID](https://www.watchguard.com/help/docs/api/Content/en-US/api_get_started/authentication.html).

* **Password**. Enter the password for the access ID.

* **WatchGuard API Key**. Enter the [API key associated with your WatchGuard Cloud account](https://www.watchguard.com/help/docs/help-center/en-US/Content/en-US/WG-Cloud/mngd-access_enable-API-access.html) (shown on the [Managed Access](https://www.watchguard.com/help/docs/help-center/en-US/Content/en-US/WG-Cloud/mngd-access.html) page in WatchGuard Cloud).

* **Account ID**. Enter your WatchGuard Cloud account ID, as shown on the [My Account page](https://www.watchguard.com/help/docs/help-center/en-US/Content/en-US/WG-Cloud/sub_acct-mgmt-page.html) in WatchGuard Cloud. For example, `WGC-1-123abc456` or `ACC-1234567`.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/panda-edr-configuration.png')} style={{border:'1px solid gray'}} alt="Panda EDR configuration" width="400"/>

For information about Panda EDR, see [Panda EDR documentation](https://www.watchguard.com/help/docs/help-center/en-US/Content/en-US/Fireware/services/edr_core/edr_core_about_c.html).

## Change Log

* March 1, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 23, 2023 (v1.2)
	+ Fixed bugs that prevented these actions from working properly
		- Stop Device Isolation
		- Start Action On Specified Device
		- Scan Device
		- Isolate Specific Devices
	+ Extended output mappings
	+ Refined labels and hints
	+ Improved error handling
	+ Code refactoring and optimisation
	+ Changed Logo
* November 24, 2023 (v1.3)
	+ Fixed Token Issue
