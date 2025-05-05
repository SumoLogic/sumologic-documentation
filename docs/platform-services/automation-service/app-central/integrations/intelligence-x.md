---
title: Intelligence X
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intelligence-x.png')} alt="intelligence" width="80"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Intelligence X is a search engine and data archive. The search works with selectors, i.e. specific search terms such as email addresses, domains, URLs, IPs, CIDRs, Bitcoin addresses, IPFS hashes, etc. It searches in places such as the darknet, document sharing platforms, whois data, public data leaks and others. It keeps a historical data archive of results.

## Actions

* **Search Intelligence X** (*Enrichment*) - Submit a search request for a selector.
* **Search Intelligence X Results** (*Enrichment*) - Retrieve the search results.
* **Search Phonebook** (*Enrichment*) - Submit a phonebook alike search request for a selector.
* **Search Phonebook Results** (*Enrichment*) - Retrieve the phonebook search results.
* **Terminate Search** (*Enrichment*) - Terminate a search request.

## Intelligence X configuration

Follow these steps to get your API Key and URL from Intelligence X:

1. Sign up to [IntelX](https://intelx.io/) platform.
1. Click on Account.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-1.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>
1. Click on the Developer tab.
1. Copy the API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-2.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>

## Configure Intelligence X in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Intelligence X, see the [Intelligence X website](https://intelx.io/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-5.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="600"/>
1. Populate all the required fields (\*).
   * **Label**. The desired name for the resource.
   * **API key**. Your Intelligence X API Key you copied earlier from Intelligence X.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-6.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-7.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-8.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intelligence-x/intelligence-x-9.png')} style={{border:'1px solid gray'}} alt="intelligence-x" width="400"/>

## Change Log

* August 12, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
