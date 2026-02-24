---
title: Elasticsearch V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/elasticsearch-v2.png')} alt="elasticsearch" width="100"/>

***Version: 1.3  
Updated: Nov 03, 2023***

Query Elasticsearch

## Actions

* **Query** (*Enrichment*) - Query Elasticsearch using a query string.
* **Get Indices** (*Enrichment*) - Get a list of indices from Elasticsearch.
* **Get Indices Stats** (*Enrichment*) - Get a list of indices stats from Elasticsearch.
* **Get Indices Fields Mappings** (*Enrichment*) - Get a list for fields mappings from Elasticsearch.
* **Query Extended** (*Enrichment*) - Elasticsearch Query working with hidden Indices.

## Elasticsearch Configuration

To retrieve the API Credentials, refer to the [guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-create-api-key.html).

Retrieve the API Key/ID using the console, Log in to the [Elasticsearch Service Console](https://cloud.elastic.co/?page=docs&placement=docs-body).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/elasticsearch-v2/elasticsearch-v2-1.png')} style={{border:'1px solid gray'}} alt="elasticsearch" width="600"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/elasticsearch-v2/elasticsearch-v2-2.png')} style={{border:'1px solid gray'}} alt="elasticsearch" width="800"/>

On the deployment overview page, copy down the **Cloud ID**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/elasticsearch-v2/elasticsearch-v2-3.png')} style={{border:'1px solid gray'}} alt="elasticsearch" width="800"/>

## External Libraries

* [Elasticsearch-py](https://github.com/elastic/elasticsearch-py/blob/master/LICENSE)
* [Elasticsearch-dsl-pu](https://github.com/elastic/elasticsearch-dsl-py/blob/master/LICENSE)

## Configure Elasticsearch V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server Type**. Select the type of verification depending on the type of Elasticsearch server you use, either [hosted](https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/cloud-hosted) (select **Hosts**) or [cloud](https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud) (select **Cloud ID**).

* **Host or Cloud ID**. Enter your Elasticsearch [hostname](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/networking-settings) (if you selected **Hosts** above) or the [cloud ID](https://www.elastic.co/docs/solutions/search/search-connection-details) (if you selected **Cloud ID**).

* **Authentication Type**. Select **Basic Authentication**, **No Authentication**, or **API Key**. 

* **User or API ID**. Enter an Elasticsearch admin username (if you selected **Basic Authentication** above) or enter an Elasticsearch [API ID](https://www.elastic.co/docs/deploy-manage/api-keys/elastic-cloud-api-keys) (if you selected **API Key** above).

* **Password or API Key**. Enter the admin user password (if you selected **Basic Authentication** above) or enter the [API key](https://www.elastic.co/docs/deploy-manage/api-keys/elastic-cloud-api-keys) corresponding to the API ID (if you selected **API Key** above).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/elasticsearch-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Elasticsearch V2 configuration" width="400"/>

For information about Elasticsearch, see [Elasticsearch documentation](https://www.elastic.co/docs/solutions/search).

## Change Log

* November 17, 2020 - First upload
* November 10, 2022 (v1.2) - New Action: Query Extended
* November 3, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Improved error handling
	+ Removed leading/trailing spaces
