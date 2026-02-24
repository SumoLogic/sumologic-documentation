---
title: Blueliv Community
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/blueliv-community.png')} alt="blueliv" width="80"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Enrich incident evidence with threat intelligence data from Blueliv.

## Actions

* **Online Crime Servers** (*Enrichment*) - Returns every Crime Server online.
* **Recent Crime Servers** (*Enrichment*) - Returns full Crime Servers’ feed updates collected during the last 24 hours.
* **Last Crime Servers** (*Enrichment*) - Returns full Crime Servers’ feed updates collected during the last 15 minutes.

## Configure Blueliv Community in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Blueliv Community site URL.

* **Token**. Enter an API token from Blueliv Community.
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/blueliv/blueliv-community-configuration.png')} style={{border:'1px solid gray'}} alt="Blueliv Community configuration" width="400"/>

For information about Blueliv Community, see [Outpost24](https://outpost24.com/blog/outpost24-acquires-threat-intelligence-solution-blueliv/).

## Change Log

* June 19, 2020 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
