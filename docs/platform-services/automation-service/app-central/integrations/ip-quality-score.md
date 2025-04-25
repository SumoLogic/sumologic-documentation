---
title: IP Quality Score
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ip-quality-score.png')} alt="ip-quality-score" width="100"/>

***Version: 1.2  
Updated: Jan 29, 2024***

Perform threat intelligence evidence gathering with IP Quality Score.

## Actions

* **Email Reputation** *(Enrichment)* - Gather Email reputation information from IP Quality Score.
* **Get Credit Usage** *(Enrichment)* - Gather Credit usage information from IP Quality Score.
* **IP Reputation** *(Enrichment)* - Gather IP reputation information from IP Quality Score.
* **URL Reputation** *(Enrichment)* - Gather URL reputation information from IP Quality Score.

## Configure IP Quality Score in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* September 18, 2020 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
* January 29, 2024 (v1.2)
    * Added 2 new actions:
        * Email Reputation
        * URL Reputation
    * Renamed action from "Get Credit Usage API" to "Get Credit Usage"
    * Code refactoring
    * Refined labels and hints
    * Extended output mapping with examples
    * Added link to API doc in src code
    * Resized logo
