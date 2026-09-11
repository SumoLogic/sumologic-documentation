---
title: ThreatConnect V3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threatconnect.png')} alt="threatminer" width="100"/>

***Version: 1.3  
Updated: March 23, 2026***

Utilize ThreatConnect intelligence data during incident investigations using V3 APIs.

## Actions

* **Search Intelligence** (*Enrichment*) - Search ThreatConnect data for information matching the specified query.
* **Update Intelligence** (*Notification*) - Update ThreatConnect intelligence data.

## Configure ThreatConnect in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your ThreatConnect [server URL](https://docs.threatconnect.com/en/latest/rest_api/quick_start.html), for example, `https://api.threatconnect.com`.

* **Access ID**. Enter a ThreatConnect [access ID](https://knowledge.threatconnect.com/docs/managing-user-accounts#creating-an-api-user).

* **Secret Key**. Enter the secret for the access ID.

* **Default owner**. Enter the default [owner](https://knowledge.threatconnect.com/docs/en/ownership-in-threatconnect).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/threatconnect-configuration.png')} style={{border:'1px solid gray'}} alt="ThreatConnect configuration" width="400"/>

For information about ThreatConnect, see [ThreatConnect documentation](https://docs.threatconnect.com/en/latest/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.3 | March 23, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.2 | February 19, 2026 | <ul><li>Added an observations parameter to the **Update Intelligence** action to enable recording observation counts for indicators.</li><li>Added output field definitions, which help with playbook data mapping.</li></ul> |
| v1.1 | February 11, 2026 | <ul><li>Improved API error handling.</li><li>Updated **Search Intelligence** handling to avoid errors on empty or missing results.</li></ul> |
| v1.0 | October 17, 2025 | Initial release of the ThreatConnect V3 integration. |
