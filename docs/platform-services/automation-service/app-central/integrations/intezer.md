---
title: Intezer
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intezer.png')} alt="ip-api" width="90"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Intezer is a platform that provides automated, algorithm-driven Tier 1 services with little to no human supervision. Intezer connects to your alert pipelines collecting data to offer advice and automatically triage, respond, and hunt.

## Actions

* **Analyze File** (*Enrichment*) - Submit a file to be analyzed.
* **Analyze Hash** (*Enrichment*) - Submit a hash to be analyzed.
* **Get Analysis** (*Enrichment*) - Retrieve summary of the analysis of an uploaded file, memory module, or hash.

## Configure Intezer in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. Your Resource Label.
   * **API Key**. Your API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/intezer-configuration.png')} style={{border:'1px solid gray'}} alt="Intezer configuration" width="400"/>

For information about Intezer, see the [Intezer website](https://intezer.com/resource-center/).

## Change Log

* June 28, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
