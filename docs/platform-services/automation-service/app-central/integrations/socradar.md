---
title: SOCRadar
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/socradar.png')} alt="socradar" width="80"/>

***Version: 1.1  
Updated: Jul 11, 2023***

SOCRadar provides an early warning system with an extended threat intelligence platform.

## Actions

* **List Incidents** (*Enrichment*) - List incidents of your company.
* **Account Leaks** (*Enrichment*) - Obtain the account leaks related with your company.
* **Threat Feed** (*Enrichment*) - Provides Threat Feed for selected feed sources. Feed can be ip address, hostname, hash, url.

## Configure SOCRadar in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your SOCRadar hostname.

* **API Key**. Enter your [SOCRadar API key](https://github.com/demisto/content/blob/master//Packs/SOCRadar/Integrations/SOCRadarIncidents/README.md#how-to-obtain-socradar-incident-api-key).

* **Company ID**. Enter your [SOCRadar company ID](https://github.com/demisto/content/blob/master//Packs/SOCRadar/Integrations/SOCRadarIncidents/README.md).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/socradar-configuration.png')} style={{border:'1px solid gray'}} alt="SOCRadar configuration" width="400"/>

For information about SOCRadar, see the [SOCRadar website](https://socradar.io/).

## Change Log

* October 27, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
