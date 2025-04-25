---
title: FortiSIEM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortisiem.png')} alt="fortisiem" width="100"/>

***Version: 1.2  
Updated: Nov 10, 2023***

Search events and retrieve device details from Fortinet FortiSIEM.

## Actions

* **List Devices** (*Enrichment*) - Get a list of devices.
* **Get Device Info** (*Enrichment*) - Get device info for the specified IP address.
* **Search Into Events** (*Enrichment*) - Search FortiSIEM based on the specified criteria.

## External Libraries

* [FortiSIEM](https://github.com/martinblech/xmltodict/blob/master/LICENSE)

## Configure FortiSIEM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 3, 2019 - First upload
* September 6, 2019 - Added link to FortiSIEM external library
* November 10, 2023 (v1.2)
	+ Changed docker to *qualys* (*qualys* and *fortisiem* both have the same library)
	+ Updated the integration with Environmental Variables
	+ Removed trailing/leading spaces
	+ Updated output mappings
	+ Get Devicesrenamed *to* **List Devices**
