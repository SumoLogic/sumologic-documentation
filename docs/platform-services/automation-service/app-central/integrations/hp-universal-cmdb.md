---
title: HP Universal CMDB
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hp-universal-cmdb.png')} alt="hp-universal-cmdb" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Gather host configuration data with HP Universal CMDB.

## Actions

* **Get Host Details** (*Enrichment*) - Gather host information.

## Configure HP Universal CMDB in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your HP Universal CMDB server API URL, for example, `https://localhost:8443/rest-api/`

* **Username**. Enter the username of an HP Universal CMDB admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/hp-universal-cmdb-configuration.png')} style={{border:'1px solid gray'}} alt="HP Universal CMDB configuration" width="400"/>

For information about OpenText CMDB (formerly HP Universal CMDB), see [OpenText CMDB documentation](https://www.opentext.com/what-is/cmdb).

## Change Log

* July 1, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
