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

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1 | July 6, 2023 | <ul><li>Updated the integration with Environmental Variables.</li><li>Renamed the integration from McAfee Web Gateway OIF to McAfee Web Gateway.</li></ul> |
| | January 31, 2020 | Enhanced URL and IP validation. |
| | January 29, 2020 | Fixed IP and URL formatting issues. |
| | September 11, 2019 | Initial release of the McAfee Web Gateway integration. |
