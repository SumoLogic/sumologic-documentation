---
title: Cybersecurity Help
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cybersecurity-help.png')} alt="cybersecurity-help" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Cybersecurity Help is a global vulnerability intelligence provider.

## Actions

* **Get Subscription Info** (*Enrichment*) - Retrieve your current subscription status.
* **Get Subscribed Software Status** (*Enrichment*) - Retrieve recent software subscription requests and their current status.
* **List Assets** (*Enrichment*) - List your assets.
* **List Subscribed Software** (*Enrichment*) - List of software that is being monitored according to your subscription settings.
* **List User Tasks** (*Enrichment*) - Retrieve unprocessed tasks.
* **List User Tasks Asset** (*Enrichment*) - Retrieve unprocessed tasks for a particular asset.
* **List User Tasks Group** (*Enrichment*) - Retrieve unprocessed group tasks.
* **Add Subscribed Software Monitoring** (*Containment*) - Configure software subscription for a particular asset.
* **Mark User Task Processed** (*Containment*) - Set current task as processed.
* **Mark User Task Updated** (*Containment*) - Set the current task as updated and update current software version in subscription.
* **Remove Asset** (*Containment*) - Remove an asset and cancel all subscriptions connected with it.
* **Remove Asset Subscribed Software** (*Containment*) - Remove subscribed software for a particular asset.

## Cybersecurity Help configuration

1. Log in to Cybersecurity Help to get your API Key.
1. Select Subscription from the menu, choose Settings and copy your Token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-1.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="600"/>

## Configure Cybersecurity Help in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Cybersecurity Help, see the [Cybersecurity Help website](https://www.cybersecurity-help.cz/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-4.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="400"/>
1. Populate all the required fields (\*)
   * **Label**. The desired name for the resource.
   * **URL**. The default Cybersecurity Help url is [https://www.cybersecurity-help.cz](https://www.cybersecurity-help.cz/).
   * **Token**. Your Cybersecurity Help token you copied earlier from Cybersecurity Help.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-5.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-6.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-7.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybersecurity-help/cybersecurity-help-8.png')} style={{border:'1px solid gray'}} alt="cybersecurity" width="400"/>

## Change Log

* October 26, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
