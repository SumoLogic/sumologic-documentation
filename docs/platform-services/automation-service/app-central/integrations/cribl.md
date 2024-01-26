---
title: Cribl
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cribl.png)

Version: 1.1  
Updated: Jul 06, 2023

**Cribl**is vendor-agnostic observability pipeline that gives the flexibility to collect, reduce, enrich, normalize, and route data from any source to any destination within your existing data infrastructure.

## Actions

* **List Collectors** (*Enrichment*) - Get a list of Collector objects.
* **List Groups** (*Enrichment*) - Get a list of ConfigGroup objects.
* **List Jobs** (*Enrichment*) - Get info on jobs.
* **List License Objects** (*Enrichment*) - Get a list of License objects.
* **List Parser Object** (*Enrichment*) - Get a list of Parser objects.

## Cribl Configuration

To obtain your Token follow the steps described in the [link](https://docs.cribl.io/stream/api-tutorials/#criblcloud-free-tier). 

## Cribl in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-3.png)

1. Populate all the required fields (\*) and then click Save.
   * URL API
   * Token: the obtain token from the API Reference. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-5.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-6.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/cribl/cribl-7.png)

  
 

## Change Log

* November 16, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
