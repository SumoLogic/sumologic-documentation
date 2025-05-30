---
title: Flowmon
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/flowmon.png')} alt="flowmon" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Network performance monitoring and network security products, Flowmon is utilizing information from traffic flow.

## Actions

* **Flows** *(Enrichment)* - Get a list of flows with a few parameters (from, to, profile, channels, etc).
* **List Of Alerts** *(Enrichment)* - Get a list of alerts.
* **Get Alert** *(Enrichment)* - Gets specific alert object.

## Configure Flowmon in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/flowmon-configuration.png')} style={{border:'1px solid gray'}} alt="Flowmon configuration" width="400"/>

For information about Flowmon, see [Flowmon documentation](https://docs.progress.com/category/flowmon-os).

## Change Log

* November 8, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
