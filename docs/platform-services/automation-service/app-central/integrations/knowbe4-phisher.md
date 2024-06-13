---
title: KnowBe4 PhishER
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/knowbe4-phisher.png')} alt="knowbe4-phisher" width="100"/>

***Version: 1.6  
Updated: Mar 4, 2024***

KnowBe4 PhishER Identifies and responds to email threats faster with automatic prioritization for emails, also helps your InfoSec and Security Operations team cut through the inbox noise and respond to the most dangerous threats more quickly.

## Actions

* **Get Message** *(Enrichment)* - Returns a PhishER message by ID.
* **Search Messages** *(Enrichment)* - Returns paginated messages based on the specified Lucene query.
* **PhishER Messages Daemon** *(Daemon) -* Automatically pull messages based on the specified Lucene query.

## KnowBe4 PhishER Configuration

Follow the steps from the KnowBe4 PhishER [guide](https://developer.knowbe4.com/graphql/phisher/page/Introduction) to create your authentication credentials.

**KnowBe4 PhishER in Cloud SOAR**

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-3.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
    * **Label**. The name for the resource.
    * **URL**. KnowBe4 PhishER host URL.
    * **API Token**. Your KnowBe4 PhishER API key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-4.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-5.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-6.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-7.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="400"/>

## Change Log

* April 26, 2023 - First upload
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
* August 24, 2023 (v1.4)
    + New Daemon: PhishER Messages Daemon
* September 26, 2023 (v1.5) - Updated Action: **Get Message**
* March 4, 2024 (v1.6) - Updated code for compatibility with Python 3.12
