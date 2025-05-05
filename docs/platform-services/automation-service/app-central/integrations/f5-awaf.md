---
title: F5 AWAF
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/f5-awaf.png')} alt="f5-awaf" width="60"/>

***Version: 1.1  
Updated: Jul 06, 2023***

The integration with F5 AWAF allows users to retrieve information about Policies, Rules In Policy, Active Global Rules, Create, Delete and Assign Policy As Global, Add Rule to Policy, Modify Rule Action In Policy, and Delete Rule From Policy in F5 Advanced Web Application Firewall.

F5 AWAF protects apps with behavioural analytics, proactive bot defence, and application-layer encryption of sensitive data.

## Actions

* **List Firewall Policies** (*Enrichment*) - List of network firewall polices.
* **Get Policy** (*Enrichment*) - Get an individual network firewall policy.
* **Active Global Rules** (*Enrichment*) - List of Network Firewall: Active Rules.
* **List Policy Rules** (*Enrichment*)- List Rules in policy.
* **Create Policy** (*Containment*)- Create firewall policy.
* **Delete Policy** (*Containment*) - Delete firewall policy.
* **Add Rule To Policy** (*Containment*) - Add rule to existing policy.
* **Modify Rule Action In Policy** (*Containment*) - Change rule action in policy.
* **Delete Rule From Policy** (*Containment*) - Delete rule from policy.
* **Assign Policy As Global** (*Containment*) - Assign policy as global.

## F5 AWAF configuration

1. To configure F5 AWAF, install the product and use BIG-IP Registration key(s). Might need help from system administrator. Then sign in to BIG-IP with username and password.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-1.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="800"/>
1. In the main page, click on the section System, License.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-2.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="250"/>
1. In Summary check your Licence and in the tab Module Allocation locate the Advanced Firewall (AFM) and change Provisioning to Nominal. Then click Submit. After submission in Security Tab Network Firewall will appear.

## Configure F5 AWAF in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about F5 AWAF, see [F5 AWAF documentation](https://docs.cloud.f5.com/docs-v2/web-app-and-api-protection/how-to/app-security/application-firewall).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears search/look for the F5 AWAF integration and click on the row. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-5.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="700"/>
1. The integration details will appear. Click on the **"+"** button to add new Resource.   
   * **Host**. IP where F5 AWAF is installed. 
   * **Username and Password** <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-6.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="400"/>
1. Click **Save**. Now you can use the resource.
1. To make sure the resource is working, hover over the resource and then click edit (pencil icon) on the right of the row.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-7.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="400"/>
1. Then click test saved settings. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-8.png')} style={{border:'1px solid gray'}} alt="f5-awaf" width="400"/>

## Change Log

* December 15, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
