---
title: VMRay
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmray.png')} alt="vmray" width="80"/>

***Version: 1.1  
Updated: Jul 07, 2023***

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

* September 7, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
