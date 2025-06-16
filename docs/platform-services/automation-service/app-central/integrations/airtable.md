---
title: Airtable
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/airtable.png')} alt="airtable" width="100"/>

**Version: 1.1  
Updated: Jul 18, 2023**

**Airtable** is a spreadsheet-database hybrid, with the features of a database but applied to a spreadsheet.   

## Actions

* **Get Record** (*Enrichment*) - Get specific recorde.
* **List Records Incident Details** (*Enrichment*) - Get all recordes.
* **List Bases**(*Enrichment*) - List bases on Airtable.
* **Get Base Schema** (*Enrichment*) - Get base structure.
* **Create Records All** (*Containment*) - Create redords.

## Airtable configuration

1. Sign in to the Airtable platform with your email ID and password. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/airtable/airtable-1.png')} style={{border:'1px solid gray'}} alt="airtable-1" width="800"/>
1. To create your token, refer to the [Airtable documentation](https://airtable.com/developers/web/guides/personal-access-tokens).

## Configure Airtable in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **URL**. Enter the Airtable API URL. The default value is `https://api.airtable.com`

* **Token**. Enter the token you copied [above](#airtable-configuration).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>



<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/airtable-configuration.png')} style={{border:'1px solid gray'}} alt="Airtable configuration" width="400"/>

For information about Airtable, see [Airtable documentation](https://support.airtable.com/docs).

## Change Log

* November 30, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
