---
title: Coralogix - Send Logs
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/coralogix-send-logs.png')} alt="coralogix-send-logs" width="100"/>

***Version: 1.2  
Updated: Mar 4, 2024***

Coralogix is rebuilding the path to observability using a real-time streaming analytics pipeline that provides monitoring, visualisation, and alerting capabilities without the burden of indexing.

## Actions

* **Send Logs** (*Containment*) - Send Logs.

## Coralogix - Send Logs configuration

Generate and then copy the [API Key](https://coralogix.com/docs/user-guides/account-management/api-keys/api-keys/) for sending data.

`https://<teamname>.coralogix.com/#/integration/apikey`

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/coralogix-send-logs/coralogix-send-logs-1.png')} style={{border:'1px solid gray'}} alt="coralogix-send-logs" width="800"/>

## Configure Coralogix - Send Logs in Automation Service and Cloud SOAR

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

* **Private Key**. Enter your Coralogix account [private key](https://coralogix.com/docs/user-guides/account-management/api-keys/api-keys/).

* **Application Name**. Enter your Coralogix [application name](https://coralogix.com/docs/user-guides/account-management/account-settings/application-and-subsystem-names/).

* **Subsystem Name**. Enter your Coralogix [subsystem name](https://coralogix.com/docs/user-guides/account-management/account-settings/application-and-subsystem-names/).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/coralogix-send-logs-configuration.png')} style={{border:'1px solid gray'}} alt="Coralogix Send Logs configuration" width="400"/>

For information about Coralogix - Send Logs, see [Coralogix documentation](https://coralogix.com/docs/).

## Change Log

* July 07, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
