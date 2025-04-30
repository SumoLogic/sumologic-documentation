---
title: EnergyLogserver
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/energylogserver.png')} alt="energylogserver" width="100"/>

***Version: 1.2  
Updated: Nov 03, 2023***

Query Energy Logserver by using Elasticsearch API.

## Actions

* **Query** (*Enrichment*) - Query Elasticsearch using a query string.
* **Get Indices** (*Enrichment*) - Get a list of indices from Elasticsearch.
* **Get Indices Stats** (*Enrichment*) - Get a list of indices stats from Elasticsearch.
* **Get Indices Fields Mappings** (*Enrichment*) - Get a list for fields mappings from Elasticsearch.

## External Libraries

* [Elasticsearch-py](https://github.com/elastic/elasticsearch-py/blob/master/LICENSE)
* [Elasticsearch-dsl-pu](https://github.com/elastic/elasticsearch-dsl-py/blob/master/LICENSE)

## Configure Energy Logserver in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Energy Logserver, see [Energy Logserver documentation](https://kb.energylogserver.com/en/latest/).

## Change Log

* March 4, 2021 - First upload
* November 3, 2023 (v1.2) - Updated the integration with Environmental Variables
