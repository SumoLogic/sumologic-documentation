---
title: Screenshot Machine
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/screenshot-machine.png')} alt="screenshot-machine" width="100"/>

Version: 1.3  
Updated: February 16, 2024

Utilize Screenshot Machine to create screenshots of suspicious webpages as evidence during an investigation. 

## Actions

* **Screenshot Webpage** (*Enrichment*) - Take a screenshot of a specific webpage for investigation.
* **Screenshot Webpage V2** (*Enrichment*) - Take a screenshot of a specific webpage for investigation.

## Configure Screenshot Machine in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* October 16, 2019 - First upload
* July 11, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed form Screenshot Machine OIF to Screenshot Machine
* September 4, 2023 (v1.2)
	+ integration refactored
	+ added new action Screenshot Webpage V2
* February 16, 2024 (v1.3)
    + Screenshot Webpage Action: Updated with new Cloud SOAR API
