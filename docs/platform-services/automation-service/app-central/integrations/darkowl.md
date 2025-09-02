---
title: DarkOwl
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/darkowl.png')} alt="darkowl" width="100"/>

***Version: 1.2
Updated: Mar 4, 2024***

Perform threat intelligence evidence gathering with DarkOwl.

## Actions

* **Domain Reputation** (*Enrichment*) - Check reputation of a domain.
* **Search Intelligence** (*Enrichment*) - Search threat intelligence feeds.

## Configure DarkOwl in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **IP/Hostname**. Enter your DarkOwl server IP address or hostname.

* **Public Key**. Enter a DarkOwl public key.

* **Private Key**. Enter a DarkOwl private key.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/darkowl-configuration.png')} style={{border:'1px solid gray'}} alt="DarkOwl configuration" width="400"/>

For information about DarkOwl, see [DarkOwl documentation](https://www.darkowl.com/api-resources/).

## Change Log

* July 1, 2019 - First upload
* July 22, 2019 - Search Intelligence action updated
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
