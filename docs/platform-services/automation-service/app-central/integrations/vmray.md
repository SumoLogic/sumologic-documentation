---
title: VMRay
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmray.png')} alt="vmray" width="80"/>

***Version: 1.2  
Updated: April 30, 2026***

VMRay Platform products provide set of tools for malware detection and analysis.

## Actions

* **Submit File** *(Containment)* - Submit sample file to VMRay.
* **Submit Url Sample** *(Containment)* - Submit sample URL for web analysis.
* **List Submissions Of Sample** *(Enrichment)* - Get details about submission(s) of sample.
* **List Analysis Of Submission** *(Enrichment)* - Get details about submission(s).
* **Get Sample Metadata** *(Enrichment)* - Get metadata details of sample by sample id or sample hash.
* **Get Submission Status** *(Enrichment)* - Get all dynamic and static analysis of sample.

## Configure VMRay in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your [VMRay host address](https://www.vmray.com/how-to-create-easy-and-open-integrations-with-vmrays-rest-api/#elementor-toc__heading-anchor-1).

* **API Key**. Enter your [VMRay API key](https://www.vmray.com/basic-automation-with-the-vmray-api/#elementor-toc__heading-anchor-3).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/vmray-configuration.png')} style={{border:'1px solid gray'}} alt="VMRay configuration" width="400"/>

For information about VMRay, see [VMRay documentation](https://www.vmray.com/basic-automation-with-the-vmray-api/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1 | July 7, 2023 | Updated the integration with Environmental Variables. |
| | September 7, 2021 | Initial release of the VMRay integration. |
