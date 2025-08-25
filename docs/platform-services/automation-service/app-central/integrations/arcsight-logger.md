---
title: Arcsight Logger
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arcsight-logger.png')} alt="arcsight-logger" width="90"/>

***Version: 1.1  
Updated: Jun 26, 2023***

Query events in Micro Focus ArcSight Logger.

## Actions

* **Search Into Events Arcsight** (*Enrichment*) - Search events in ArcSight Logger.

## Configure ArcSight Logger in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server url**. Enter the ArcSight Logger server URL.

* **Username**. Enter the username of the ArcSight Logger admin user authorized to provide authentication for the integration.

* **Password**. Enter the password for the ArcSight Logger admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcsight/arcsight-logger-configuration.png')} style={{border:'1px solid gray'}} alt="ArcSight Logger configuration" width="400"/>

For information about ArcSight Logger, see [ArcSight Logger documentation](https://www.microfocus.com/documentation/arcsight/logger-7.3/).

## Change Log

* January 31, 2019 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
