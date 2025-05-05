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

<IntegrationsAuth/>

For information about Cribl, see [Cribl documentation](https://docs.cribl.io/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cribl/cribl-3.png')} style={{border:'1px solid gray'}} alt="cribl" width="700"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **URL API**
   * **Token**. The obtain token from the API Reference.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cribl/cribl-4.png')} style={{border:'1px solid gray'}} alt="cribl" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cribl/cribl-5.png')} style={{border:'1px solid gray'}} alt="cribl" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cribl/cribl-6.png')} style={{border:'1px solid gray'}} alt="cribl" width="400"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cribl/cribl-7.png')} style={{border:'1px solid gray'}} alt="cribl" width="400"/>

## Change Log

* November 16, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
