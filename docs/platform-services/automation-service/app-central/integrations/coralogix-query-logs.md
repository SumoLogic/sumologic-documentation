---
title: Coralogix - Query Logs
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/coralogix-query-logs.png')} alt="coralogix-query-logs" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Coralogix is rebuilding the path to observability using a real-time streaming analytics pipeline that provides monitoring, visualisation, and alerting capabilities without the burden of indexing.

## Actions

* **Query Logs** (*Enrichment*) - Query Logs.

## Coralogix - Send Logs configuration

Generate and then copy the [API Key](https://coralogix.com/docs/user-guides/account-management/api-keys/api-keys/) for sending data.

    `https://<teamname>.coralogix.com/#/integration/apikey` 

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-1.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="800"/>

## Configure Coralogix - Query Logs in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Choose between the following [Coralogix URLs](https://coralogix.com/docs/user-guides/account-management/account-settings/coralogix-domain/) depending on the top level domain of your Coralogix account (.com, .in, etc.):
	* For `.eu` use `https://coralogix-esapi.coralogix.com`
	* For `.us` use `https://esapi.coralogix.us`
	* For `.in` use `https://es-api.app.coralogix.in`
	* For `.eu2` use `https://es-api.eu2.coralogix.com`
	* For `sg.com` use `https://es-api.coralogixsg.com`

* **Port**. Enter your Coralogix port, usually `9443`. 

* **Private Key**. Enter your Coralogix account [private key](https://coralogix.com/docs/user-guides/account-management/api-keys/api-keys/).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/coralogix-query-logs-configuration.png')} style={{border:'1px solid gray'}} alt="Coralogix Query Logs configuration" width="400"/>

For information about Coralogix - Query Logs, see [Coralogix documentation](https://coralogix.com/docs/).

## Change Log

* Aug 15, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
