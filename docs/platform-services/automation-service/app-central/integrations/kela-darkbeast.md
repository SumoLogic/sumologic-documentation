---
title: KELA Darkbeast
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/kela-darkbeast.png')} alt="kela-darkbeast" width="70"/>

***Version: 1.1  
Updated: Jul 05, 2023***

KELA Darkbeast provides incident responders, threat hunters, investigators, and intelligence analysts with a robust technology to dive into the cybercrime underground and investigate. 

## Actions

* **Get Data Count** *(Enrichment)* - Returns a list of data types each associated with the number of hits found.
* **Search Data** *(Enrichment)* - Allows direct querying of a specific data type, returning either references to data IDs (to be searched via the Get Data Details action) or the full data itself. If there’s a need to paginate through more results, extract the scroll\_id item from within the response and use it in Search Pagination action.
* **Search Pagination***(Enrichment)* - This action is used for persistent pagination of search results. Since every search requests only returns a limited number of results, paginating through them is the way to acquire big data sets.
* **Get Data Details** *(Enrichment)* - This action is used to retrieve the full details of a Hacking Discussion or Instant Messaging data point.
* **User License** *(Enrichment)* - Returns the number of remaining search tokens your API license has.

## KELA Darkbeast configuration

1. Sign in to the KELA Darkbeast platform.
2. The API Access can be generated in your profile.
3. Make sure you copy and save the API token.

## Configure KELA Darkbeast in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **URL**. 'https://darkbeast.ke-la.com/api/v1/'.
   * **API Token**. Insert the previously copied token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/kela-darkbeast-configuration.png')} style={{border:'1px solid gray'}} alt="Kela Darkbeast configuration" width="400"/>

For information about KELA Cyber Threat Intelligence (formerly KELA Darkbeast), see [KELA documentation](https://docs.ke-la.com/kela-docs).

## Change Log

* May 19, 2022 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
