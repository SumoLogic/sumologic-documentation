---
title: FireHydrant
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/firehydrant.png')} alt="firehydrant" width="80"/>

***Version: 1.1  
Updated: Jul 18, 2023***

**FireHydrant** is incident management platform that creates consistency across the entire incident management process.

## Actions

* **List Incidents** (*Enrichment*) - List all of the incidents in the organization.
* **Get Incident Details** (*Enrichment*) - Retrieve a single incident from its ID.
* **List Alerts** (*Enrichment*) - Retrieve all alerts from third parties.
* **List Tickets** (*Enrichment*) - List all of the tickets that have been added to the organiation.
* **List All Incident Tags** (*Enrichment*) - List all of the incident tags in the organization.
* **List Environments** (*Enrichment*) - List all of the environments that have been added to the organization.
* **List Functionalities** (*Enrichment*) - List all of the functionalities that have been added to the organization.
* **List Saved Search** (*Enrichment*) - Lists save searches.
* **List Teams** (*Enrichment*) - List all of the teams in the organization.
* **List Services** (*Enrichment*) - List all of the services that have been added to the organization.
* **List Severities** (*Enrichment*) - Lists severities.
* **List Priorities** (*Enrichment*) - Lists priorities.

## FireHydrant configuration

1. Login to **FireHydrant** with your email and password and refer to the Bot users page.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/firehydrant/firehydrant-1.png')} style={{border:'1px solid gray'}} alt="firehydrant" width="800"/> 
1. Create your token and use as an [API Key](https://docs.firehydrant.com/docs/api-keys). Make sure you click to copy the token; it will not be shown again.

## Configure FireHydrant in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your FireHydrant API URL. The default value is `https://api.firehydrant.io`

* **API Key**. Enter the [API key](https://docs.firehydrant.com/docs/api-keys) you [copied earlier](#firehydrant-configuration).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/firehydrant-configuration.png')} style={{border:'1px solid gray'}} alt="Firehydrant configuration" width="400"/>

For information about FireHydrant, see [FireHydrant documentation](https://docs.firehydrant.com/).
  
## Change Log

* November 29, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
