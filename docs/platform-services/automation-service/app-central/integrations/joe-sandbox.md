---
title: Joe Sandbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/joe-sandbox.png')} alt="joe-sandbox" width="100"/>

***Version: 1.5  
Updated: Mar 6, 2024***

Execute suspicious files and URLs for analysis during incident investigation using Joe Security Sandbox.

## Actions

* **Download Analysis Report** *(Enrichment)* - Download an analysis report.
* **Info Analysis** *(Enrichment)* - View analysis gathered for a specific piece of evidence.
* **List Analysis** *(Enrichment)* - List all available analysis documents.
* **List Systems** *(Enrichment)* - List all available systems.
* **Get Report** *(Enrichment)* - Get an analysis report.
* **Search Analysis** *(Enrichment)* - Search for a specific analysis document.
* **Submit URL** *(Enrichment)* - Submit a URL for analysis.
* **Submit File** *(Enrichment)* - Submit a file for analysis.
* **Check Submission Status** *(Scheduled)* - Check the status of URL/File Submission.

## External Libraries

* [Joe Sandbox](https://github.com/joesecurity/jbxapi/blob/master/LICENSE)

## Configure Joe Sandbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Joe Sandbox [API URL](https://www.joesecurity.org/guides/joeboxdetect/html/guide.html#installation), for example `https://jbxcloud.joesecurity.org/api`

* **API Key**. Enter your Joe Sandbox [API key](https://www.joesecurity.org/guides/joeboxdetect/html/guide.html#installation).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/joe-sandbox-configuration.png')} style={{border:'1px solid gray'}} alt="Joe Sandbox configuration" width="400"/>

For information about Joe Sandbox, see [Joe Sandbox documentation](https://www.joesecurity.org/guides/joeboxdetect/html/index.html#).

## Change Log
 
* September 25, 2019 - First upload
* January 25, 2023 - Added Connection Timeout field
* July 18, 2023 (v1.4) - Updated the integration with Environmental Variables
* March 6, 2024 (v1.5)
    * Added new action: Check Submission Status
    * Action renamed from Download Resource Analysis to Download Analysis Report
    * Action renamed from Print Report to Get Report
    * Updated with new Cloud SOAR API
