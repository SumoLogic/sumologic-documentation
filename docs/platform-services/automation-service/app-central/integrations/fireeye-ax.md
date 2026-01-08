---
title: FireEye AX
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-ax.png')} alt="fireeye-ax" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Inspect malicious files using FireEye AX.

## Actions

* **Submit Malware File Test** (*Enrichment*) - Submit a malicious file to FireEye AX.
* **Get Malware Analysis Report** (*Enrichment*) - Gather malware analysis report for a submitted file.

## Configure FireEye AX in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter the FireEye AX endpoint URL.

* **Username**. Enter the username of a FireEye AX admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **API Version**. Select the API version, 2.0.0 or 1.2.0.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-ax-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye AX configuration" width="400"/>

For information about Trellix Malware Analysis (formerly FireEye AX), see [Trellix Malware Analysis (AX) documentation](https://docs.trellix.com/bundle/fe-malware-analysis-landing/page/UUID-ffb70bcb-95b9-7af9-04f8-62ae4bc7cd14.html).

## Change Log

* March 30, 2020 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
