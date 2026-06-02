---
title: Opswat Metadefender
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/opswat-metadefender.png')} alt="Opswat Metadefender icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

MetaDefender is a cybersecurity platform for preventing and detecting cybersecurity threats on multiple data channels. 

## Actions

* **IP Reputation** (*Enrichment*) - Retrieve information about given observable (IPv4 + IPv6) from CIF server.
* **URL Reputation** (*Enrichment*) - Retrieve information about given observable (URL) from CIF server.
* **Domain Reputation** (*Enrichment*) - Retrieve information about a given fully qualified domain name (FQDN) from CIF server.
* **Get Application Info** (*Enrichment*) - OPSWAT MetaAccess application information.
* **Scan File** (*Enrichment*) - Scanning a file by file upload and retrieve scan status and results after uploading a file.
* **Detonate File** (*Enrichment*) - Scan with sandbox and get the result of the sandbox scan (Dynamic analysis).
* **Get Hash Report** (*Enrichment*) - Look up a hash by MD5, SHA1, or SHA256.

## Configure Opswat Metadefender in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your [Opswat Metadefender URL](https://www.opswat.com/docs/mdkiosk/configuration/configuring-with-metadefender-core#detecting-the-metadefender-core-server-url).

* **API Key**. Enter an Opswat Metadefender [API key](https://www.opswat.com/docs/mdcore/sandbox/integrating-deep-cdr-analysis-mode-version).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/opswat-metadefender-configuration.png')} style={{border:'1px solid gray'}} alt="Opswat Metadefender configuration" width="400"/>

For information about Opswat Metadefender, see [Opswat Metadefender documentation](https://www.opswat.com/docs/mdcore).

## Change Log

* May 11, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
