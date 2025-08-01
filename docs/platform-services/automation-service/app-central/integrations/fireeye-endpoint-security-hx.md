---
title: FireEye Endpoint Security (HX)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-endpoint-security-hx.png')} alt="fireeye-endpoint-security-hx" width="100"/>

***Version: 1.3  
Updated: Jul 13, 2023***

Interact with FireEye Endpoint Security (HX) during incident investigations.

## Actions

* **Create Alert** (*Enrichment*) - Create an alert based on the specified criteria.
* **Download File** (*Enrichment*) - Download the specified file.
* **List Endpoints** (*Enrichment*) - List endpoints.
* **Search into Events** (*Enrichment*) - Search events based on the specified search criteria.
* **System Info** (*Enrichment*) - Get system information for the specified system ID, IP, or hostname.
* **Quarantine** (*Containment*) - Quarantine the specified system ID, IP or hostname.
* **Unquarantine** (*Containment*) - Unquarantine the specified system ID, IP or hostname.

## Configure FireEye Endpoint Security (HX) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the hostname for your FireEye HX instance. 

* **Port Number**. Enter the port number for your FireEye HX instance.

* **Username**. Enter the username of a FireEye HX admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-endpoint-security-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye Endpoint Security configuration" width="400"/>

For information about Trellix Endpoint Security (HX), (formerly FireEye Endpoint Security), see [Trellix Endpoint Security (HX) documentation](https://docs.trellix.com/bundle/fe-endpoint-security-landing/page/UUID-2f6e6cdb-cab4-3e3f-1122-ca5d34fc36bb.html).

## Change Log

* March 3, 2020 - First upload
* June 26, 2020 - Updated the Search into Events action
* July 13, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
