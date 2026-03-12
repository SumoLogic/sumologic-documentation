---
title: Monday
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/monday.png')} alt="Monday logo" width="100"/>

***Version: 1.4  
Updated: Nov 12, 2025***

Streamline workflows across projects, CRM, IT, and development and gain clear visibility to make strategic decisions with confidence.

## Actions

* **Add Teams To Board** *(Containment)* - Add teams to a board via the API
* **Add Users To Board** *(Containment)* - Adds users to a board.
* **Add Users To Team** *(Containment)* - Allows you to add users to a team via the API.
* **Create Board** *(Containment)* - Create a new board via the API.
* **Create Column** *(Containment)* - Creates a new column on a board within the account via the API.
* **Delete Board** *(Containment)* - Delete a board via the API.
* **Delete Column** *(Containment)* - Deletes a single column from a board via the API.
* **Delete Teams From Board** *(Containment)* - Remove teams from a board via the API.
* **Execute Queries** *(Enrichment)* - Execute queries via the API.
* **Get Boards Fields** *(Enrichment)* - Get the Fields of Boards.
* **Get Columns Values** *(Enrichment)* - Read column values on monday boards using the platform API.
* **List Boards Fields** *(Enrichment)* - List the Fields of Boards.
* **List Boards** *(Enrichment)* - List the Boards of the account.
* **List Items** *(Enrichment)* - List the Items of a board.
* **Remove User From Team** *(Containment)* - Remove a user from a team via the API.
* **Update Column Value** *(Containment)* - Updates a column value on a board within the account via the API.

## Configure Monday in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Monday API URL](https://developer.monday.com/api-reference/), for example, `https://api.monday.com`.

* **API Key**. Enter your [Monday API key](https://developer.monday.com/api-reference/docs/authentication).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/monday-configuration.png')} style={{border:'1px solid gray'}} alt="Monday configuration" width="400"/>

For information about Monday, see [Monday documentation](https://developer.monday.com/api-reference/docs/basics).

## Change Log

* Oct 06, 2025 - First upload
* Oct 15, 2025 (v1.2) - Refactored the code
* Nov 10, 2025 (v1.3) - Changed the GraphQL schema for one action to test
* Nov 12, 2025 (v1.4) - Updated the integration and all actions as per supported GraphQL schema