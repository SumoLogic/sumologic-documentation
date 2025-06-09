---
title: Trend Micro Vision One
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/trend-micro-vision-one.png')} alt="trend-micro-vision-one" width="80"/>

***Version: 1.1  
Updated: Jun 30, 2023***

The Trend Micro Vision One platform includes advanced XDR capabilities that collect and correlate deep activity data across multiple vectors – email, endpoints, servers, cloud workloads, and networks.

## Actions

* **Get File Analysis Status** *(Enrichment)* - Retrieve status for analyzed file.
* **Add Object To Suspicious Object List** *(Containment)* - Add item to suspicious object list.
* **Delete Object From Suspicious Object List** (*Containment*) - Delete from suspicious object list.
* **Add To Block List** *(Containment*) - Add IoC to block list.
* **Remove From Block List** *(Containment)* - Remove IoC from block list.
* **Get Response Rask Details** *(Enrichment)* - Retrieve task details.
* **Submit File** *(Containment)* - Submit a file.
* **List Alerts** *(Enrichment)* - List all alerts.
* **Get Suspicious Object List** *(Enrichment)* - Retrieve list of suspicious objects.

## Configure Trend Micro Vision One in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your [Trend Micro Vision One API URL](https://automation.trendmicro.com/xdr/Guides/Regional-domains/), for example, `https://api.xdr.trendmicro.com`.

* **Token**. Enter your [Trend Micro Vision One token](https://docs.trendmicro.com/en-us/documentation/article/trend-vision-one-api-keys-third-party-apps).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/trend-micro-vision-one-configuration.png')} style={{border:'1px solid gray'}} alt="Trend Micro Vision One configuration" width="400"/>

For information about Trend Micro Vision One, see [Trend Micro Vision One documentation](https://docs.trendmicro.com/en-us/documentation/trend-vision-one/).

## Change Log

* October 28, 2021 - First upload
* June 30, 2023 (v1.1) - Updated the integration with Environmental Variables
