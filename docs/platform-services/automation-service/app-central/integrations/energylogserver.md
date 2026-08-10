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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
:::note
Energy Logserver uses Elasticsearch for its framework, and uses many of the same settings.
:::
* <IntegrationLabel/>
* **Server Type**. Select the type of verification depending on the type of Energy Logserver server you use, either [hosted](https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/cloud-hosted) (select **Hosts**) or [cloud](https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud) (select **Cloud ID**). 

* **Host or Cloud ID**. Enter your Energy Logserver [hostname](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/networking-settings) (if you selected **Hosts** above) or the [cloud ID](https://www.elastic.co/docs/solutions/search/search-connection-details) (if you selected **Cloud ID**).

* **Authentication Type**. Select **Basic Authentication**, **No Authentication**, or **API Key**. 

* **User or API ID**. Enter an Energy Logserver admin username (if you selected **Basic Authentication** above) or enter an Energy Logserver [API ID](https://www.elastic.co/docs/deploy-manage/api-keys/elastic-cloud-api-keys) (if you selected **API Key** above).

* **Password or API Key**. Enter the admin user password (if you selected **Basic Authentication** above) or enter the [API key](https://www.elastic.co/docs/deploy-manage/api-keys/elastic-cloud-api-keys) corresponding to the API ID (if you selected **API Key** above).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/energylogserver-configuration.png')} style={{border:'1px solid gray'}} alt="Energy Logserver configuration" width="400"/>

For information about Energy Logserver, see [Energy Logserver documentation](https://kb.energylogserver.com/en/latest/).

## Change Log

* March 4, 2021 - First upload
* November 3, 2023 (v1.2) - Updated the integration with Environmental Variables
