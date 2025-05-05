---
title: Jamf Protect
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/jamf-protect.png')} alt="jamf-protect" width="90"/>

***Version: 1.1  
Updated: Jun 15, 2023***

**Jamf Protect** is a purpose-built endpoint security and mobile threat defense (MTD) for Mac and mobile devices.

## Actions

* **List Alerts** (*Enrichment*) - List alerts with possibility to filter alerts created over specified time.
* **List Computers** (*Enrichment*) - Retrieve a list of all computers.
* **List Plans** (*Enrichment*) - Retrieve a list of plans.
* **Set Computer Plan** (*Containment*) - Set a computer plan.
* **Update Alerts Status** (*Containment)* - Update alert status.
* **Get Alerts** (*Daemon*) - Get new alerts. Rule should be set Process from First Item . The first time the Daemon is run it will return alerts from one day before.

## Jamf Protect configuration

1. Log in to Jamf Protect.
2. Click on Administrative on the left menu.
3. Create API Client and click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-1.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="800"/>
4. Copy API Client Password.
5. Copy Client ID in API Client Configuration

## Configure Jamf Protect in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Jamf Protect, see [Jamf Protect documentation](https://www.jamf.com/resources/product-documentation/jamf-protect-administrators-guide/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-4.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="400"/>
1. Populate all the required fields (\*)
   * **API URL**. 'https://your-tenant.protect.jamfcloud.com'.
   * **Client ID**. Insert copied Client ID.
   * **Password**. Insert copied Password.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-5.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-6.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-7.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-8.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="400"/>

## Change Log

* February 2, 2023 - First upload
* June 15, 2023 (v1.1)- Updated the integration with Environmental Variables
