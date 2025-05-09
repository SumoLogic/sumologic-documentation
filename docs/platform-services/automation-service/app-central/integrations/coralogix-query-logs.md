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

<IntegrationsAuth/>

   * **Server URL**. Choose between the following URLs depending on the top level domain of your Coralogix account (.com, .in, etc.):
	   + for .eu use https://coralogix-esapi.coralogix.com
	   + for .us use https://esapi.coralogix.us
	   + for .in use https://es-api.app.coralogix.in
	   + for .eu2. use https://es-api.eu2.coralogix.com
	   + for sg.com use https://es-api.coralogixsg.com
   * **Private Key**. Your Coralogix account private key.
   * **Port**. Port usually 9443. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-query-logs/coralogix-query-logs-5.png')} style={{border:'1px solid gray'}} alt="coralogix-query-logs" width="400"/>

For information about Coralogix - Query Logs, see [Coralogix documentation](https://coralogix.com/docs/).

## Change Log

* Aug 15, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
