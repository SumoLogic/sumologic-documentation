---
title: Microsoft Azure Log Analytics
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-azure-log-analytics.png')} alt="microsoft-azure-log-analytics" width="100"/>

***Version: 1.0  
Updated: Sep 04, 2023***

Log Analytics is a tool in the Azure portal that's used to edit and run log queries against data in the Azure Monitor Logs store.

## Actions

* **Query** *(Enrichment)* - Query the full set of data collected by Azure Monitor logs.

## Configure Microsoft Azure Log Analytics in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Tenant**. Enter the [directory (tenant) ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id) of Microsoft Azure Log Analytics.

* **Client ID**. Enter your Microsoft Azure Log Analytics [client ID](https://learn.microsoft.com/en-us/answers/questions/1573520/how-to-find-client-id).

* **Client Secret**. Enter your application (client) secret.

* **Workspace ID**. Enter your [workspace ID](https://learn.microsoft.com/en-us/answers/questions/1154380/where-is-azure-is-the-primary-key-and-workspace-id).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-azure-log-analytics-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Log Analytics configuration" width="400"/>

For information about Microsoft Azure Log Analytics, see [Microsoft Azure Log Analytics documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview?tabs=simple).

## Change Log

* September 4, 2023 (v1.0) - First upload
