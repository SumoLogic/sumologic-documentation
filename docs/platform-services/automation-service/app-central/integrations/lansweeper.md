---
title: Lansweeper
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lansweeper.png')} alt="lansweeper" width="100"/>

***Version: 1.1  
Updated: Jul 18, 2023***

**Lansweeper** helps you to minimize risks and optimize your IT by providing actionable insight into your entire technology estate.

## Actions

* **Get Graphql Detail** (*Enrichment*) - Get all details.
* **Request Software** (*Enrichment*) - Get request software details.
* **List Reports** (*Enrichment*) - List reports on Lansweeper.
* **Get Authorized Sites** (*Enrichment*) - Get authorized sites.

## Lansweeper configuration

Log in to **Lansweeper** with your email ID and password to start the [configuration process](https://docs.lansweeper.com/docs/api/authenticate#personal-application).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/lansweeper/lansweeper-1.png')} style={{border:'1px solid gray'}} alt="lansweeper-1" width="300"/>

## Configure Lansweeper in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **URL**. Default value for API URL is 'https://api.lansweeper.com'.
   * **Token**. The Token you copied earlier. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/lansweeper-configuration.png')} style={{border:'1px solid gray'}} alt="Lansweeper configuration" width="400"/>

For information about Lansweeper, see [Lansweeper documentation](https://developer.lansweeper.com/docs/data-api/get-started/welcome/).

## Change Log

* December 07, 2022 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
