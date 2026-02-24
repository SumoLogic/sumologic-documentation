---
title: Nmap
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/nmap.png')} alt="nmap" width="60"/>

***Version: 1.3  
Updated: Jun 26, 2023***

Nmap is a free and open-source network scanner. Nmap is used to discover hosts and services on a computer network by sending packets and analyzing the responses.

## Actions

* **Create Scan** (*Enrichment*) - Start NMAP scan.
* **Check Scan Status** (*Enrichment*) - Check scan status.
* **Get Scan Info** (*Enrichment*) - Get scan info.
* **Get Scan Report** (*Enrichment*) - Get scan report.
* **List Credits** (*Enrichment*) - Get API calls report for current member.

## Configure Nmap in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Nmap API URL. The default value is `https://api.nmap.online`

* **Api Key**. Enter your Nmap API Key.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/nmap-configuration.png')} style={{border:'1px solid gray'}} alt="Nmap configuration" width="400"/>

For information about Nmap, see [Nmap documentation](https://nmap.org/book/man.html).

## Change Log

* August 09, 2022 - First upload
* April 28, 2023 (v1.2) - Integration refactored
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
