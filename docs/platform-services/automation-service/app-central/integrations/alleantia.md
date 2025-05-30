---
title: Alleantia
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alleantia.png')} alt="alienvault-otx" width="80"/>

***Version: 1.2  
Updated: Jun 26, 2023***

Alleantia software is a reference vendor for factory automation, energy and utilities, transportation.

## Actions

* **List Devices** (*Enrichment*) - Returns a data list to retrieve information on all devices configured in the IoT Server.
* **Get Device Configuration** (*Enrichment*) - Returns the configuration information for device configured in the system.
* **Get Device Variables** (*Enrichment*) - Returns a list with the information on variables configuration of a device.
* **Set Device Variable** (*Containment*) - Set the value of a writable variable for a device configured in the IoT Server.
* **Get Variable Configuration** (*Enrichment*) - Returns the information on a variable configuration for a device configured on the IoT Server.
* **Get Variable Logs** (*Enrichment*) - Return the historical values of a variable of a device configured in the IoT Server.
* **Get Variable Logs In Time Range** (*Enrichment*) - Return the historical values of a variable of a device configured in the IoT Server for a specified time interval.
* **List Alarms** (*Enrichment*) - Returns a list of all active alarms in the IoT Server.
* **Get Active Alarms** (*Enrichment*) - Returns a list of active alarms in the IoT Server.
* **Get History Alarms** (*Enrichment*) - Returns the historical list of the alarms in the IoT Server sorted by ascending time.
* **Get Alarm Configuration** (*Enrichment*) - Returns the information on an alarm configured on the IoT Server.

## Configure Alleantia in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alleantia/alleantia-configuration.png')} style={{border:'1px solid gray'}} alt="Alleantia configuration" width="400"/>

For information about Alleantia, see [Alleantia documentation](https://kb.alleantia.com/).

## Change Log

* December 17, 2020 - First upload
* February 16, 2021 - Updated action: Get Alarm Configuration
* June 26, 2023 (v1.2)
	+ Removed version tag from actions
	+ Updated the integration with Environmental Variables
