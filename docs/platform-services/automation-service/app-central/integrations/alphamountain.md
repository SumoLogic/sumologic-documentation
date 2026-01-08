---
title: alphaMountain
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alphamountain.png')} alt="alienvault-otx" width="100"/>

***Version: 1.1  
Updated: Sep 28, 2023***

alphaMountain provides up-to-date domain and IP intelligence for cybersecurity investigational and protection platforms.

## Actions

* **Get Categories** (*Enrichment*) - Get categories for an internet URI/URL.
* **Get Threat Score** (*Enrichment*) - Return a threat score for an internet URL.
* **Get Possible Impersonations** (*Enrichment*) - Get possible impersonations for a URI/URL.
* **Get Remaining Quota** (*Enrichment*) - Fetch remaining quota.
* **Get Popularity** (*Enrichment*) - Return the popularity in the last 24 hours of a given hostname or domain name as an integer.

## alphaMountain Configuration

In order to get a free trial please visit [https://www.alphamountain.ai/contact/](https://www.alphamountain.ai/contact/) to get your license key.

## Configure alphaMountain in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **URL**. Enter the alphaMountain API URL. The default value is `https://api.alphamountain.ai`

* **License Key**. Enter your License Key for alphaMountain.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/alphamountain-configuration.png')} style={{border:'1px solid gray'}} alt="alphaMountain configuration" width="400"/>

For information about alphaMountain, see [alphaMountain documentation](https://www.alphamountain.ai/api/).

## Category

Threat Intelligence-Reputation

## Change Log

* June 21, 2022 - First upload
* September 15, 2022
	+ Changed integration name in alphaMountain
	+ Updated integration guide
	+ Changed action name: Get Likely Impersonations -> Get Possible Impersonations
	+ Updated tableview for Get Categories and Get Threat Score
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
