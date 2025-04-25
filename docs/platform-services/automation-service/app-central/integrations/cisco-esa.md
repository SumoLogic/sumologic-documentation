---
title: Cisco ESA
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-esa.png')} alt="cisco-esa" width="70"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Cisco ESA provides a comprehensive view of security for improved threat intelligence, defense, and remediation. That includes: Centralized management of email spam quarantine, comprehensive threat monitoring across multiple web and email security gateways.

## Actions

* **Get Spam Quarantine List** *(Enrichment)* - Retrieve Blocklist Entries.
* **Edit Spam Quarantine List** *(Containment)* - Add, edit or append Recipient/Sender List/Addresses.

## Configure Cisco ESA in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-esa/cisco-esa-3.png')} style={{border:'1px solid gray'}} alt="cisco-stealesathwatch" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
   * URL API
   * Username
   * Password
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-esa/cisco-esa-4.png')} style={{border:'1px solid gray'}} alt="cisco-stealesathwatch" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-esa/cisco-esa-5.png')} style={{border:'1px solid gray'}} alt="cisco-stealesathwatch" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco-esa/cisco-esa-6.png')} style={{border:'1px solid gray'}} alt="cisco-stealesathwatch" width="400"/>

## Category

Email Gateway

## Change Log

* October 12, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
