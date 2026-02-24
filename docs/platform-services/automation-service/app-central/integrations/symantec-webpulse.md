---
title: Symantec WebPulse
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-webpulse.png')} alt="symantec-webpulse" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Submit URLs to Symantec WebPulse.

## Actions

* **Submit URL** (*Notification*) - Submit the specified URL.

## Configure Symantec WebPulse in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter your Symantec WebPulse endpoint address.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-webpulse-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec WebPulse configuration" width="400"/>

For information about Cloud Secure Web Gateway (formerly Symantec WebPulse), see [Cloud Secure Web Gateway documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/cloud-swg/help.html).

## Change Log

* June 3, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
