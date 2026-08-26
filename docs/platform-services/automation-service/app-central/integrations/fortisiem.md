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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your FortiSIEM server URL.

* **Username**. Enter the username of a FortiSIEM admin user authorized to authenticate the integration. Use the format organization name / username (for example, `super/admin`).

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fortisiem-configuration.png')} style={{border:'1px solid gray'}} alt="FortiSIEM configuration" width="400"/>

For information about FortiSIEM, see [FortiSIEM documentation](https://docs.fortinet.com/product/fortisiem/7.4).

## Change Log

* June 3, 2019 - First upload
* September 6, 2019 - Added link to FortiSIEM external library
* November 10, 2023 (v1.2)
	+ Changed docker to *qualys* (*qualys* and *fortisiem* both have the same library)
	+ Updated the integration with Environmental Variables
	+ Removed trailing/leading spaces
	+ Updated output mappings
	+ Get Devicesrenamed *to* **List Devices**
