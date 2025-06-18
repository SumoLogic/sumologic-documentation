---
title: MISP
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/misp.png')} alt="misp" width="100"/>

***Version: 1.3  
Updated: Mar 4, 2024***

Utilize MISP intelligence data during incident investigations.

## Actions

* **Get Object Templates** (*Enrichment*) - Gather all object templates.
* **Get Tags** (*Enrichment*) - Gather all tags.
* **Search Intelligence** (*Enrichment*) - Search MISP data for information matching the specified query.
* **Search MISP Attribute** (*Daemon*) - Search MISP attributes.
* **Search MISP Intelligence** (*Daemon*) - Search MISP intelligence.
* **Add Attribute** (*Notification*) - Add a new attribute.
* **Add Event** (*Notification*) - Add a new event.
* **Add Object** (*Notification*) - Add a new object.
* **Update Attribute** (*Enrichment*) - Update an existing attribute.
* **Update Event** (*Enrichment*) - Update an existing attribute.

## Configure MISP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your MISP server URL, for example, `https://192.0.0.1`

* **API Key**. Enter your MISP [API key](https://www.circl.lu/doc/misp/automation/#creating-an-automation-key-using-advanced-authkeys).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/misp-configuration.png')} style={{border:'1px solid gray'}} alt="MISP configuration" width="400"/>

For information about MISP, see [MISP documentation](https://www.circl.lu/doc/misp/).

## Change Log

* December 19, 2019 - First upload
* July 1, 2020 - Added new actions
* August 02, 2022 - Update Actions:
    + Search MISP Intelligence (remove duplicates data from Daemon)
    + Search MISP Attribute (remove duplicates data from Daemon)
    + Search Intelligence (added new field 'Search All')
* July 11, 2023 (v1.2)
    + Updated the integration with Environmental Variables
    + Integration renamed from MISP OIF to MISP
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
