---
title: Cribl
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cribl.png')} alt="cribl" width="80"/>

***Version: 1.1  
Updated: Jul 06, 2023***

**Cribl**is vendor-agnostic observability pipeline that gives the flexibility to collect, reduce, enrich, normalize, and route data from any source to any destination within your existing data infrastructure.

## Actions

* **List Collectors** (*Enrichment*) - Get a list of Collector objects.
* **List Groups** (*Enrichment*) - Get a list of ConfigGroup objects.
* **List Jobs** (*Enrichment*) - Get info on jobs.
* **List License Objects** (*Enrichment*) - Get a list of License objects.
* **List Parser Object** (*Enrichment*) - Get a list of Parser objects.

## Cribl configuration

To obtain your Token follow the steps described in the [Cribl Documentation](https://docs.cribl.io/stream/api-tutorials/#criblcloud-free-tier). 

## Configure Cribl in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL API**. Enter your [Cribl API URL](https://docs.cribl.io/api/#base-urls).

* **Token**. Enter a [Cribl API token](https://docs.cribl.io/api/#authenticate-api).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/cribl-configuration.png')} style={{border:'1px solid gray'}} alt="Cribl configuration" width="400"/>

For information about Cribl, see [Cribl documentation](https://docs.cribl.io/).

## Change Log

* November 16, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
