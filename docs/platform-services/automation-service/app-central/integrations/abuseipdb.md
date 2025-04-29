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

<IntegrationsAuth/>

For information about AbuseIPDB, see [AbuseIPDB documentation](https://www.abuseipdb.com/api.html).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation). 
2. After the list of the integrations appears, search for the integration and click on the row.
3. The integration details will appear. Click on the **"+"** button to add new Resource.
4. Populate all the required fields (\*):
   * **Label**. Enter a name for the resource.
   * **API URL**. Enter `https://api.abuseipdb.com`
   * **API Key**. Enter the API key you copied earlier.
5. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abuseipdf/abuseipdf-1.png')} style={{border:'1px solid gray'}} alt="any.run-3" width="400"/>
6. To make sure the resource is working, hover over the resource and then click the *pencil icon* that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abuseipdf/abuseipdf-3.png')} style={{border:'1px solid gray'}} alt="any.run-3" width="800"/>
7. Click **TEST**
8. You should receive a successful notification in the bottom right corner of the screen.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abuseipdf/abuseipdf-2.png')} style={{border:'1px solid gray'}} alt="any.run-7" width="800"/>

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
