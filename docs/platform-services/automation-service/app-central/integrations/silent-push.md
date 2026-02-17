---
title: Silent Push
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/silent-push.png')} alt="
crowdstrike-falcon" width="100"/>

***Version: 1.0  
Updated: July 15, 2024***

The Silent Push integration identifies emerging threats before they launch by deploying Indicators of Future Attack.

## Actions

* **Domain Info** *(Enrichment)* - Get the Info of Domains.
* **Domain Reputation** *(Enrichment)* - Get the domain reputation info.
* **Domain Risk Score** *(Enrichment)* - Get the risk score of Domains.
* **IP Enrichment** *(Enrichment)* - Get the IP enrichment info.
* **IP Info** *(Enrichment)* - Get the info of IP.
* **IP Reputation** *(Enrichment)* - Get the IP reputation info.
* **IP Risk Score** *(Enrichment)* - Get the risk score of IP.
* **Search Domain** *(Enrichment)* - Search the domain and get the info.

## Configure Silent Push in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Silent Push API URL](https://docs.silentpush.com/), for example, `https://api.silentpush.com`.

* **API Key**. Enter your [Silent Push API key](https://help.silentpush.com/v1/docs/generating-an-api-key).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/silent-push-configuration.png')} style={{border:'1px solid gray'}} alt="Silent Push configuration" width="400"/>

For information about Silent Push, see [Silent Push documentation](https://help.silentpush.com/).

## Change Log

* July 15, 2024 - First upload