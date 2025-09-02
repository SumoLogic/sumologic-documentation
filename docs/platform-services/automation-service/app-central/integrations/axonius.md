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

The API Key and Secret for an Axonius user is available from the [My Account page](https://docs.axonius.com/docs/account-settings).

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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Axonius URL**. Enter the [URL to your Axonius instance](https://docs.axonius.com/docs/configuring-system-external-url), for example, `https://your-axonius-instance.axonius.com`

* **API Key**. Enter the [API key](https://docs.axonius.com/docs/managing-api-settings) that you [copied earlier](#axonius-configuration).

* **API Secret**. Enter the API secret that you copied earlier.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/axonius-configuration.png')} style={{border:'1px solid gray'}} alt="Axonius configuration" width="400"/>

For information about Axonius, see [Axonius documentation](https://docs.axonius.com/docs/the-axonius-platform).

## External Libraries

[axonius\_api\_client](https://github.com/Axonius/axonius_api_client/blob/master/LICENSE)

## Change Log

* January 3, 2024 - First Upload
