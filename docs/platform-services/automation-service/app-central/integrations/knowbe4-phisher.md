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

## Configure KnowBe4 PhishER in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

    * **Label**. The name for the resource.
    * **URL**. KnowBe4 PhishER host URL.
    * **API Token**. Your KnowBe4 PhishER API key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-phisher/knowbe4-phisher-4.png')} style={{border:'1px solid gray'}} alt="knowbe4-phisher" width="400"/>

For information about KnowBe4 PhishER, see [KnowBe4 PhishER documentation](https://support.knowbe4.com/hc/en-us/articles/360010802673-PhishER-Product-Manual).

## Change Log

* April 26, 2023 - First upload
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
* August 24, 2023 (v1.4)
    + New Daemon: PhishER Messages Daemon
* September 26, 2023 (v1.5) - Updated Action: **Get Message**
* March 4, 2024 (v1.6) - Updated code for compatibility with Python 3.12
