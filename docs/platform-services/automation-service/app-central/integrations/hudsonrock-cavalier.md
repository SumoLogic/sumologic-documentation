---
title: HudsonRock Cavalier
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/hudsonrock-cavalier.png')} alt="hudsonrock-cavalier" width="80"/>

***Version: 1.0  
Updated: Feb 03, 2023***

HudsonRock Cavalier is a cybercrime intelligence data source composed of millions of machines compromised in global malware spreading campaigns. It is based on forensic technologies and operational know-how developed at the IDF's 8200 Unit to counter nation-state adversaries and professional threat-actors.

## Actions

* **End User Protection** *(Enrichment)* - Retrieve compromised computers for a given list of end users.
* **Domain Intelligence** *(Enrichment)* - Retrieve compromised computers for given domains.
* **IP Intelligence** *(Enrichment)* - Retrieve compromised computers for a given IP.
* **Assets Intelligence** *(Enrichment)* - Retrieve compromised computers for a given operating system.
* **Third Party Risk Assessment** *(Enrichment)* - Retrieve risk statistics for a given third party.

## Configure HudsonRock Cavalier in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **URL**. Your HudsonRock URL.
   * **API Key**. Your HudsonRock API Key you copied earlier from HudsonRock.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/hudsonrock-cavalier/hudsonrock-cavalier-4.png')} style={{border:'1px solid gray'}} alt="hudsonrock-cavalier" width="400"/>

For information about HudsonRock, see [HudsonRock documentation](https://docs.hudsonrock.com/).

## Change Log

* February 3, 2023 - First upload
