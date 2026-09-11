---
title: Joe Sandbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/joe-sandbox.png')} alt="Joe Sandbox" width="100"/>

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

| Version | Date | Description |
|:--|:--|:--|
| v1.5 | March 6, 2024 | <ul><li>Added a new action: **Check Submission Status**.</li><li>Renamed the **Download Resource Analysis** action to **Download Analysis Report**.</li><li>Renamed the **Print Report** action to **Get Report**.</li><li>Updated to use the new Cloud SOAR API.</li></ul> |
| v1.4 | July 18, 2023 | Updated the integration with Environmental Variables. |
| v1.3 | January 25, 2023 | Added the Connection Timeout field. |
| v1.2 | September 25, 2019 | Initial release of the Joe Sandbox integration. |
