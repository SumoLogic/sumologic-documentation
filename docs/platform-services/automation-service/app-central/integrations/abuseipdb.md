---
title: AbuseIPDB
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/abuseipdb.png')} alt="abuseipdb" width="100"/>

***Version: 1.4  
Updated: May 29, 2024***

Enrich IP addresses with reputation information gathered from AbuseIPDB.

## Actions

* **IP Reputation** *(Enrichment)* - Retrieves IP reputation information and saves the report as incident attachment or artifact (only for Cloud SOAR).
* **IP Reputation V2** *(Enrichment)* - Retrieves IP reputation information.

:::note
* Results of the IP reputation check can be saved in *.csv file format* (**only for Cloud SOAR**).
* Perform multiple searches with any keyword in the comments.
:::

## Create an API key

1. [Create an AbuseIPDB account](https://www.abuseipdb.com/register).
2. Navigate to the **Account** tab. 
3. Go to **API**.
4. Click on **Create Key**. 
5. Copy the **API key**.

## Configure AbuseIPDB in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **API URL**. Enter `https://api.abuseipdb.com`

* **API Key**. Enter the [API key](https://www.abuseipdb.com/api.html) you copied [above](#create-an-api-key). 
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abuseipdf/abuseipdf-1.png')} style={{border:'1px solid gray'}} alt="any.run-3" width="400"/>

For information about AbuseIPDB, see [AbuseIPDB documentation](https://www.abuseipdb.com/api.html).

## Change Log

* June 19, 2020 - First upload
* August 26, 2021 - Action updated: IP Reputation
* February 20, 2023 (v1.2)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* October 6, 2023 (v1.3)
	+ Added new action: IP Reputation V2
	+ Changed fields visibility
	+ Fixed Typo
* May 29, 2024 (v1.4)
	+ Updated **IP Reputation** action which now supports saving reports as incident attachments and artifacts
