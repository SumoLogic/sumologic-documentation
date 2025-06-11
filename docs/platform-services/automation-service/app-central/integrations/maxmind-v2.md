---
title: MaxMind V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/maxmind-v2.png')} alt="maxmind-v2" width="100"/>

***Version: 2.0  
Updated: Mar 29, 2023***

MaxMind provides IP intelligence through the GeoIP brand. Over 5,000 companies use GeoIP data to locate their Internet visitors and show them relevant content and ads, perform analytics, enforce digital rights, and efficiently route Internet traffic.

## Actions

* **Geolocate IP** (*Enrichment*) - Geolocate an IP address using GeoIP2 or GeoLite2 web services using a server-side API call.

## Configure MaxMind V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your MaxMind API URL, for example, `https://geoip.maxmind.com` or `https://geolite.info`

* **Account ID**. Enter a MaxMind [account ID](https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID).

* **License key**. Enter a MaxMind [license key](https://support.maxmind.com/hc/en-us/articles/4407111582235-Generate-a-License-Key).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/maxmind-configuration.png')} style={{border:'1px solid gray'}} alt="MaxMind V2 configuration" width="400"/>

For information about MaxMind, see [MaxMind documentation](https://support.maxmind.com/hc/en-us).

## Change Log

* March 29, 2023 - First upload
