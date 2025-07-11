---
title: Mandiant Advantage Threat intelligence
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mandiant-advantage-threat-intelligence.png')} alt="mandiant-advantage-threat-intelligence" width="100"/>

***Version: 1.5  
Updated: Jul 18, 2023***

Mandiant Threat Intelligence is a comprehensive and powerful SaaS platform that provides organizations of all sizes with up-to-the-minute, relevant cyber threat intelligence so you can focus on and address the threats that matter now.

## Actions

* **Get Indicator By Value** *(Enrichment)* - For given organization retrieves devices matching all filters, that are used in query.
* **Search** *(Enrichment)* - List organizations that belong to given organization (including itself, if type matches).

## Mandiant Threat Intelligence configuration

1. Log in to [Mandiant Threat Intelligence](https://advantage.mandiant.com/). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-1.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-1" width="600"/>
1. On **Threat Intelligence** click **Settings**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-2.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-2" width="800"/>
1. Click on **Get Key ID And Secret**.

## Configure Mandiant Advantage Threat intelligence in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Mandiant Advantage base API URL. The default value is `https://api.intelligence.mandiant.com`

* **Public Key**. Enter the public key you [previously obtained](#mandiant-threat-intelligence-configuration).

* **Private Key**. Enter the private key you previously obtained.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mandiant-configuration.png')} style={{border:'1px solid gray'}} alt="Mandiant configuration" width="400"/>

For information about Mandiant, see the [Mandiant website](https://www.mandiant.com/).

## Category

Threat Intelligence-Reputation

## Change Log

* April 27, 2023 (v1.0) - First Upload
* July 18, 2023 (v1.5) - Removed leading/trailing spaces
