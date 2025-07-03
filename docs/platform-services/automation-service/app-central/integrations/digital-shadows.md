---
title: Digital Shadows
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/digital-shadows.png')} alt="digital-shadows" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Query Digital Shadows threat intelligence.

## Actions

* **Search Intelligence** (*Enrichment*) - Search Digital Shadows threat intelligence.

## Configure Digital Shadows in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Key**. Enter a Digital Shadows key.

* **Secret**. Enter the secret for the key.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/digital-shadows-configuration.png')} style={{border:'1px solid gray'}} alt="Digital Shadows configuration" width="400"/>

For information about ReliaQuest GreyMatter Digital Risk Protection (DRP) ([formerly Digital Shadows](https://reliaquest.com/ds-demo/)), see the [ReliaQuest website](https://reliaquest.com/resources/solution-briefs/digital-risk-protection/).

## Change Log

* February 21, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
