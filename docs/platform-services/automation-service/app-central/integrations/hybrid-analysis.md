---
title: Hybrid Analysis
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hybrid-analysis.png')} alt="Hybrid Analysis icon" width="80"/>

***Version: 1.7  
Updated: April 29, 2026***

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

To obtain an API Key visit your [profile page](https://www.hybrid-analysis.com/my-account?tab=%23api-key-tab) at the top right menu and navigate to the API key tab. Then press the 'Create API key' button as following: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/hybrid-analysis/hybrid-analysis-1.png')} style={{border:'1px solid gray'}} alt="Hybrid analysis" width="600"/>

## Configure Hybrid Analysis in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Hybrid Analysis API URL, for example, `https://www.hybrid-analysis.com`

* **API Key**. Insert the [API key](https://www.hybrid-analysis.com/docs/api/v2) that you [previously copied](#hybrid-analysis-configuration).

* **User Agent**. Enter the user agent, for example, `Falcon`.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/hybrid-analysis-configuration.png')} style={{border:'1px solid gray'}} alt="Hybrid Analysis configuration" width="400"/>

For information about Hybrid Analysis, see [Hybrid Analysis documentation](https://www.hybrid-analysis.com/docs/api/v2).

## Category

SANDBOX

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.7 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.6 | June 14, 2023 | Improved the integration. |
| v1.5 | April 4, 2023 | <ul><li>Updated the integration fields with Environmental Variables and improved error handling.</li><li>Added a new action: **Get File Analysis Overview**.</li><li>Updated the **Domain Reputation**, **File Reputation**, **Get Report Summary**, **IP Reputation**, **Scan File**, **Scan URL**, and **URL Reputation** actions.</li></ul> |
| | November 22, 2022 | <ul><li>Added a default URL.</li><li>Fixed an issue where the integration test would throw an error if no value was provided for timeout.</li></ul> |
| | May 23, 2022 | Updated the integration documentation. |
| | May 20, 2022 | Updated the integration. Added new actions: **Domain Reputation**, **IP Reputation**, and **URL Reputation**. |
| | June 26, 2020 | Updated the **Get Report Summary** action. |
| | January 31, 2020 | Updated the **Get Report Summary** action. |
| | July 24, 2019 | Fixed an SSL verification issue. |
| | June 4, 2019 | Updated the **Scan URL** action. |
| | May 7, 2019 | Initial release of the Hybrid Analysis integration. |
