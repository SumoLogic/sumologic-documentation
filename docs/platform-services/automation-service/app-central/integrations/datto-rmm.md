---
title: Datto RMM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/datto.png')} alt="datto" width="90"/>

***Version: 1.0  
Updated: Mar 13, 2024***

Datto Remote Monitoring and Management (RMM) is a secure cloud-based RMM platform.

This integration streamlines IT tasks with rapid job creation, data retrieval, and inventory management for devices and components.

## Actions

* **Create Quick Job** _(Containment)_ - Creates a quick job on the device identified by the given device Uid.
* **Get Job** _(Enrichment)_ - Fetches data of the job identified by the given job Uid.
* **List Components** _(Enrichment)_ - Fetches the components records of the authenticated user's account.
* **List Devices** _(Enrichment)_ - Fetches the devices of the authenticated user's account.

## Configure Datto RMM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Datto RMM Platform**. Enter your[ Datto RMM platform](https://rmm.datto.com/help/en/Content/1INTRODUCTION/Infrastructure/Platforms.htm). The API URL will be generated automatically based on the selected Datto RMM platform.

* **Access Key**. Enter a [Datto RMM access key](https://rmm.datto.com/help/en/Content/2SETUP/APIv2.htm).

* **Secret Key**. Enter the secret corresponding to the access key.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/datto-rmm-configuration.png')} style={{border:'1px solid gray'}} alt="Datto RMM configuration" width="400"/>

For information about Datto RMM, see [Datto RMM documentation](https://rmm.datto.com/help/en/Content/0HOME/Home.htm).

## Change Log

* March 13, 2024 - First upload
