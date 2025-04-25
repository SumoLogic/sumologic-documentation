---
title: Axonius
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/axonius.png')} alt="axonius" width="80"/>

***Version: 1.0  
Updated: Jan 03, 2024***

Axonius is a cybersecurity asset management platform that provides comprehensive visibility and control over Assests in an organization's network.

## Actions

* **Get Device Fields** (*Enrichment*) - Get all available fields and schema for Device assets.
* **Get User Fields** (*Enrichment*) - Get all available fields and schema for User assets.
* **List Devices** (*Enrichment*) - Get device assets by hostname/ IP address/MAC address.
* **List Users** (*Enrichment*) - Get user assets by Username/Email Address.
* **Search Devices** (*Enrichment*) - Get device assets using a Query built by the Query Wizard in the GUI.
* **Search Users** (*Enrichment*) - Get User assets using a Query built by the Query Wizard in the GUI.

## Axonius configuration

The API Key and Secret for an Axonius user is available from the My Account page.

1. Log in to Axonius with a user account or Service Account whose role has the **API access enabled** permission.
1. At the bottom of the Navigation toolbar, click on your account avatar. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-1.png')} style={{border:'1px solid gray'}} alt="axonius-1" width="200"/>
1. Click **User Settings** and then click the **API Key** tab. Copy the existing API key and secret. To reset them, click **Reset** Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-2.png')} style={{border:'1px solid gray'}} alt="axonius-2" width="600"/>

**Enable API Access Permission**

Using the **Axonius API** to query Axonius assets requires a that the user's role will have the **API Access enabled** permission enabled.

To set this permission:

1. Open the **Manage Roles** page. From the top right corner of all pages, click . The **System Settings** page opens. Then, click the **Manage Roles** tab.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-3.png')} style={{border:'1px solid gray'}} alt="axonius-3" width="700"/>
1. Select the relevant role as described in [Manage Roles](https://docs.axonius.com/manage-roles). For the selected role, under the **API Access** category, select the **API access enabled** checkbox.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-4.png')} style={{border:'1px solid gray'}} alt="axonius-4" width="700"/>
1. Click **Save**.

More info related to creating queries is [here](https://docs.axonius.com/docs/query-wizard-and-query-filter).

## Configure Axonius in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-7.png')} style={{border:'1px solid gray'}} alt="axonius-7" width="600"/>
1. Populate the resource fields as indicated.
   * **Label**. The name of the resource.
   * **URL**. URL to Axonius instance, for example, 'https://your-axonius-instance.axonius.com'.
   * **API Key**. The API Key that you copied earlier.
   * **API Secret**. The API Secret that you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-8.png')} style={{border:'1px solid gray'}} alt="axonius-8" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-9.png')} style={{border:'1px solid gray'}} alt="axonius-9" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-10.png')} style={{border:'1px solid gray'}} alt="axonius-10" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/axonius/axonius-11.png')} style={{border:'1px solid gray'}} alt="axonius-11" width="400"/>

## External Libraries

[axonius\_api\_client](https://github.com/Axonius/axonius_api_client/blob/master/LICENSE)

## Change Log

* January 3, 2024 - First Upload
