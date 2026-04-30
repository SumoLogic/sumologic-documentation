---
title: Threat Crowd
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threat-crowd.png')} alt="threatminer" width="100"/>

***Version: 1.3  
Updated: April 30, 2026***

Search malicious indicators using Threat Crowd intelligence feeds.

## Actions

* **Search Email** (*Enrichment*) - Search indicators for a specific email address.
* **Search Domain** (*Enrichment*) - Search indicators for a specific domain.
* **Search IP** (*Enrichment*) - Search indicators for a specific IP.
* **Search Antivirus** (*Enrichment*) - Search antivirus definitions.
* **Search File** (*Enrichment*) - Search indicators for a specific file hash.

## Configure Threat Crowd in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Threat Crowd URL.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/threat-crowd-configuration.png')} style={{border:'1px solid gray'}} alt="Threat Crowd configuration" width="400"/>

For information about Threat Crowd, see the [Threat Crowd website](http://ci-www.threatcrowd.org/).

## Change Log

* September 17, 2019 - First upload
* June 30, 2023 (v1.2) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
