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

For information about McAfee Network Security Platform Manager, see [McAfee Network Security Platform documentation](https://docs.trellix.com/bundle/network-security-platform-9.2.x-product-guide/page/GUID-E5A1DDBD-A231-498A-A90B-39D584B6CC45.html).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mcafee-network-security-platform-manager-nsm/mcafee-network-security-platform-manager-nsm-3.png')} style={{border:'1px solid gray'}} alt="mcafee-network-security-platform-manager-nsm" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The name for the resource.
   * **URL API**
   * **Username**
   * **Password** <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mcafee-network-security-platform-manager-nsm/mcafee-network-security-platform-manager-nsm-4.png')} style={{border:'1px solid gray'}} alt="mcafee-network-security-platform-manager-nsm" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mcafee-network-security-platform-manager-nsm/mcafee-network-security-platform-manager-nsm-5.png')} style={{border:'1px solid gray'}} alt="mcafee-network-security-platform-manager-nsm" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mcafee-network-security-platform-manager-nsm/mcafee-network-security-platform-manager-nsm-6.png')} style={{border:'1px solid gray'}} alt="mcafee-network-security-platform-manager-nsm" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mcafee-network-security-platform-manager-nsm/mcafee-network-security-platform-manager-nsm-7.png')} style={{border:'1px solid gray'}} alt="mcafee-network-security-platform-manager-nsm" width="400"/>

## Change Log

* October 31, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
