---
title: Qualys EDR
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/qualys-edr.png')} alt="qualys-edr" width="100"/>

***Version: 1.2  
Updated: Jun 26, 2023***

Collect events from Qualys EDR. 

## Actions

* **JWT Token** (*Enrichment*) - Returns a JSON Web Token (JWT).
* **List Events** (*Enrichment*) - Get EDR events in the user account.
* **Count Events** (*Enrichment*) - Get number of events logged within a date range.
* **Events Daemon Qualys** (*Daemon*) - Fetch events from Qualys EDR.

## Configure Qualys EDR in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/qualys-edr-configuration.png')} style={{border:'1px solid gray'}} alt="Qualys EDR configuration" width="400"/>

For information about Qualys EDR, see [Qualys EDR documentation](https://docs.qualys.com/en/edr/latest/get_started/get_started.htm).

## Change Log

* August 17, 2021 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 26, 2023 (v1.2) - Changed JWT Token action type to Enrichment
