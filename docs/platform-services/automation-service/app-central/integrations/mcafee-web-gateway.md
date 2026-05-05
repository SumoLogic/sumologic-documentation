---
title: McAfee Web Gateway
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-web-gateway.png')} alt="McAfee Web Gateway icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Utilize McAfee Web Gateway to issue containment actions during an active incident.

## Actions

* **Block IP** (*Containment*) - Block traffic in McAfee Web Gateway to/from the specified IP.
* **Unblock IP** (*Containment*) - Remove block in McAfee Web Gateway to/from the specified IP.
* **Block URL** (*Containment*) - Block traffic in McAfee Web Gateway to/from the specified URL.
* **Unblock URL** (*Containment*) - Remove block in McAfee Web Gateway to/from the specified URL.

## Configure McAfee Web Gateway in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your McAfee Web Gateway URL.

* **Username**. Enter the username of a Web Gateway admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mcafee-web-gateway-configuration.png')} style={{border:'1px solid gray'}} alt="McAfee Web Gateway configuration" width="400"/>

For information about McAfee Web Gateway, see [McAfee Web Gateway documentation](https://docs.trellix.com/search?q=mcafee%20web%20gateway).

## Change Log

* September 11, 2019 - First upload
* January 29, 2020 - Updated IP and URL formatting issues
* January 31, 2020 - Enhanced URL and IP validation
* July 6, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from McAfee Web Gateway OIF to McAfee Web Gateway
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
