---
title: Hybrid Analysis
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hybrid-analysis.png')} alt="hybrid-analysis" width="80"/>

***Version: 1.6  
Updated: Jun 14, 2023***

Submit malware for free analysis with Falcon Sandbox and Hybrid Analysis technology.

## Actions

* **File Reputation** (*Enrichment*) - Get reputation information for a file hash.
* **Domain Reputation** *(Enrichment)* - Get reputation information for a Domain.
* **IP Reputation** *(Enrichment) -* Get reputation information for an IP address.
* **URL Reputation** *(Enrichment)* - Get reputation information for an URL.
* **Scan File** (*Enrichment*) - Submit a file to the sandbox for analysis.
* **Scan URL** (*Enrichment*) - Submit a URL to the sandbox for analysis.
* **Get Report Summary** (*Enrichment*) - Get the summary report for a sandbox execution.
* **Get File Analysis Overview** (*Enrichment*) - Return overview for the hash and related information.

## Hybrid Analysis configuration

To obtain an API Key visit your [profile page](https://www.hybrid-analysis.com/my-account?tab=%23api-key-tab) at the top right menu and navigate to the API key tab. Then press the 'Create API key' button as following: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/hybrid-analysis/hybrid-analysis-1.png')} style={{border:'1px solid gray'}} alt="hybrid-analysis" width="600"/>

## Configure Hybrid Analysis in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name of the resource.
   * **Server URL**. 'https://www.hybrid-analysis.com'.
   * **API Key**. Insert the previously copied key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/hybrid-analysis/hybrid-analysis-5.png')} style={{border:'1px solid gray'}} alt="hybrid-analysis" width="400"/>

For information about Hybrid Analysis, see [Hybrid Analysis documentation](https://www.hybrid-analysis.com/docs/api/v2).

## Category

SANDBOX

## Change Log

* May 7, 2019 - First upload
* June 4, 2019 - Scan URL action updated
* July 24, 2019 - SSL verification issue fixed
* January 31, 2020 - Action updated: Get Report Summary
* June 26, 2020 - Action updated: Get Report Summary
* May 20, 2022 - Integration updated and new actions added (Domain/IP/URL Reputation)
* May 23, 2022 - integration doc updated
* November 22, 2022
	+ added default URL
	+ solved issue for which the integration test will throw an error if no value for timeout is provided
* April 4, 2023 (v1.5)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
	+ New Action: Get File Analysis Overview
	+ Update Actions: (Domain Reputation, File Reputation, Get Report Summary, IP Reputation, Scan File, Scan URL, URL Reputation)
* June 14, 2023 (v1.6) - Integration improvement
