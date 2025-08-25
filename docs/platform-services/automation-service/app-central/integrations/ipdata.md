---
title: ipdata
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ipdata.png')} alt="ipdata" width="80"/>

***Version: 1.0  
Updated: Nov 21, 2023***

ipdata provides Geolocation and Threat Intelligence API to look up the location and threat profile of any IP Address.

## Actions

* **Lookup IP Address** *(Enrichment)* - Look up the location, ownership and threat profile of the provided IP address.

## Category

Threat Intelligence-Reputation

## Configure ipdata in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Select your ipdata API URL, either `https://api.ipdata.co` or` https://eu-api.ipdata.co`

* **API Key**. Enter an ipdata [API key](https://docs.ipdata.co/reference/authentication).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ipdata-configuration.png')} style={{border:'1px solid gray'}} alt="ipdata configuration" width="400"/>

For information about ipdata, see [ipdata documentation](https://docs.ipdata.co/docs/getting-started).

## Change Log

* November 21, 2023 - First upload
