---
title: Check-Host
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/check-host.png')} alt="Check Host icon" width="100"/>

***Version: 1.2  
Updated: April 27, 2026***

Check-Host is a modern online tool for website monitoring and checking performance and availability of any URLs from many countries and data centers. Allows you to monitor response time from different locations.

## Actions

* **Check Host Status** *(Enrichment)* - Check performance and availability of given URL.
* **Check Host Status Daemon** *(Daemon)* - Daemon to check the URL availability.
* **Get Nodes** *(Enrichment)* - Get the supported nodes list.

## Check-Host in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the URL for Check-Host, `https://check-host.net`

* **Node**. Enter the Check-Host [node](https://check-host.net/about/api?lang=en#nodes-list-section). 
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/check-host/check-host-configuration.png')} style={{border:'1px solid gray'}} alt="Check-Host configuration" width="400"/>

For information about Check-Host, see [Check-Host documentation](https://check-host.net/about/api?lang=en).

## Category

Analytics and Monitoring   
 

## Change Log

* June 27, 2022 - First upload
* July 11, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
	+ Changed Daemon compatibility
* April 27, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
