---
title: Lastline Analyst
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lastline-analyst.png')} alt="Lastline Analyst icon" width="100"/>

***Version: 1.2  
Updated: Nov 10, 2023***

Utilize Lastline AI-powered sandboxing to triage incidents.

## Actions

* **Submit File** (*Enrichment*) - Trigger file payload for analysis
* **Get Analysis Results** (*Enrichment*) - Get results of file analysis
* **File Reputation** (*Enrichment*) - Get reputation score of a file/hash

## Configure Lastline Analyst in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Lastline API URL, for example, `https://analysis.lastline.com`

* **API Key**. Enter your Lastline [API key](https://analysis.lastline.com/analysis/api-docs/html/api.html).

* **API Token**. Enter your Lastline [API token](https://analysis.lastline.com/analysis/api-docs/html/api.html).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/lastline-analyst-configuration.png')} style={{border:'1px solid gray'}} alt="Lastline Analyst configuration" width="400"/>

For information about Lastline Analyst, see [Lastline Analyst documentation](https://analysis.lastline.com/analysis/api-docs/html/index.html).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | November 10, 2023 | <ul><li>Removed the Docker dependency.</li><li>Switched the integration to use the REST API, since the library used in Docker was not available through pip.</li><li>Updated integration resource fields by removing unused fields in the code.</li><li>Updated the integration with Environmental Variables.</li><li>Added proxy options, server certificate verification, and connection timeout configuration.</li><li>Improved error handling.</li><li>Removed trailing/leading spaces.</li><li>Updated output mappings.</li><li>Renamed the **Detonation Report** action to **Get Analysis Results**, and the **Detonate File** action to **Submit File**.</li></ul> |
| v1.1 | June 12, 2019 | Initial release of the Lastline Analyst integration. |
