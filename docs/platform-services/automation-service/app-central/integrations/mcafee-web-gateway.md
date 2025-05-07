---
title: McAfee Web Gateway
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-web-gateway.png')} alt="mcafee-web-gateway" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Utilize McAfee Web Gateway to issue containment actions during an active incident.

## Actions

* **Block IP** (*Containment*) - Block traffic in McAfee Web Gateway to/from the specified IP.
* **Unblock IP** (*Containment*) - Remove block in McAfee Web Gateway to/from the specified IP.
* **Block URL** (*Containment*) - Block traffic in McAfee Web Gateway to/from the specified URL.
* **Unblock URL** (*Containment*) - Remove block in McAfee Web Gateway to/from the specified URL.

## Configure McAfee Web Gateway in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about McAfee Web Gateway, see [McAfee Web Gateway documentation](https://docs.trellix.com/search?q=mcafee%20web%20gateway).

## Change Log

* September 11, 2019 - First upload
* January 29, 2020 - Updated IP and URL formatting issues
* January 31, 2020 - Enhanced URL and IP validation
* July 6, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from McAfee Web Gateway OIF to McAfee Web Gateway
