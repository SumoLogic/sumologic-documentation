---
title: McAfee Network Security Platform Manager (NSM)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-network-security-platform-manager-nsm.png')} alt="mcafee-network-security-platform-manager-nsm.png" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

McAfee Network Security Platform is a purpose-built and intelligent next-generation intrusion prevent system (IPS) solution that inspects all network traffic to accurately and effectively block the advanced, targeted attacks that evade traditional IPS solutions.

## Actions

* **Get A Domain** *(Enrichment)* - Get the specified domain details.
* **List All Sensors** *(Enrichment)* - Get the list of Sensors available in the specified domain. If the domain is not specified, details of all the Sensors in all ADs will be provided.
* **Get Firewall Policy** *(Enrichment)* - Get the policy details.
* **List Firewall Policies In A Domain** *(Enrichment)* - Get the list of firewall policies defined in a particular domain.

## Configure McAfee Network Security Platform Manager (NSM) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name for the resource.
   * **URL API**
   * **Username**
   * **Password** <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mcafee-network-security-platform-manager-configuration.png')} style={{border:'1px solid gray'}} alt="McAfee Network Security Platform Manager configuration" width="400"/>

For information about McAfee Network Security Platform Manager, see [McAfee Network Security Platform documentation](https://docs.trellix.com/bundle/network-security-platform-9.2.x-product-guide/page/GUID-E5A1DDBD-A231-498A-A90B-39D584B6CC45.html).

## Change Log

* October 31, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
