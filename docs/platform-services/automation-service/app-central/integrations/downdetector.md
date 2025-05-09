---
title: Downdetector
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/downdetector.png')} alt="downdetector" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

**Downdetector** offers realtime overview of issues and outages with all kinds of services.

## Actions

* **Get Company Indicators** (*Enrichment*) - Returns company indicators.
* **Search Companies For Slug**(*Enrichment*) - List of companies which match the given slug.
* **Get Current Status** (*Enrichment*) - Returns the current detected status for a company.
* **Get 24h Baseline**(*Enrichment*) - Gets the baseline for a company.
* **Get Reports For Slug** (*Enrichment*) - Returns the sum'ed number of reports for the given slug.
* **Get Cities For Slug** (*Enrichment*) - Returns a top X list of cities where reports are coming from.
* **Get Countries For Slug** (*Enrichment*) - Returns a top X list of countries where reports are coming from.
* **Get Heatmap For Reports** (*Enrichment*) - Returns the clustered locations where most reports are origination from. Will return max 1024 groups.

## Downdetector configuration

1. [Log in to Downdetector](https://enterprise.downdetector.com/login/) with your username and password. On the left menu click on API.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-1.png')} style={{border:'1px solid gray'}} alt="downdetector" width="200"/>
1. Under + sign create your token (Client Secret). 
1. Make sure to [copy the Client ID and the Client Secret](https://cookbooks.downdetectorapi.com/cookbooks/Generating-tokens-and-credentials.html).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-2.png')} style={{border:'1px solid gray'}} alt="downdetector" width="600"/>

## Configure Downdetector in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **URL**. Default value for API URL is 'https://downdetectorapi.com'.
   * **Username**. The client ID that you copied as username.
   * **Password**. The Client Secret that you copied as password. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/downdetector/downdetector-6.png')} style={{border:'1px solid gray'}} alt="downdetector" width="400"/>

For information about Downdetector, see [Downdetector documentation](https://downdetectorapi.com/v2/docs/).
  
## Change Log

* November 22, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
