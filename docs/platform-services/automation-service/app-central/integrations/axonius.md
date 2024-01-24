---
title: Axonius
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/axonius.png)

Version: 1.0  
Updated: Jan 03, 2024

Axonius is a cybersecurity asset management platform that provides comprehensive visibility and control over Assests in an organization's network.

## Actions

* **Get Device Fields** (*Enrichment*) - Get all available fields and schema for Device assets
* **Get User Fields** (*Enrichment*) - Get all available fields and schema for User assets
* **List Devices** (*Enrichment*) - Get device assets by hostname/ IP address/MAC address
* **List Users** (*Enrichment*) - Get user assets by Username/Email Address
* **Search Devices** (*Enrichment*) - Get device assets using a Query built by the Query Wizard in the GUI
* **Search Users** (*Enrichment*) - Get User assets using a Query built by the Query Wizard in the GUI

## Axonius Configuration

The API Key and Secret for an Axonius user is available from the My Account page.

1. Log in to Axonius with a user account or Service Account whose role has the **API access enabled** permission.

1. At the bottom of the Navigation toolbar, click on your account avatar. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-1.png)

1. Click **User Settings** and then click the **API Key** tab. Copy the existing API key and secret. To reset them, click **Reset** Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-2.png)

**Enable API Access Permission**

Using the **Axonius API** to query Axonius assets requires a that the user's role will have the **API Access enabled** permission enabled.

To set this permission:

1. Open the **Manage Roles** page. From the top right corner of all pages, click . The **System Settings** page opens. Then, click the **Manage Roles** tab.    ![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-3.png)
2. Select the relevant role as described in [Manage Roles](https://docs.axonius.com/manage-roles). For the selected role, under the **API Access** category, select the **API access enabled** checkbox.     ![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-4.png)
3. Click **Save**.

More info related to creating queries is [here](https://docs.axonius.com/docs/query-wizard-and-query-filter).

## Axonius in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-5.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-6.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-7.png)

1. Populate the resource fields as indicated.
   * Label: The name of the resource.
   * Axonius URL: URL to Axonius instance (e.g. 'https://your-axonius-instance.axonius.com').
   * API Key : The API Key that you copied earlier.
   * API Secret: The API Secret that you copied earlier. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-8.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-9.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-10.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/axonius/axonius-11.png)

## External Libraries

[axonius\_api\_client](https://github.com/Axonius/axonius_api_client/blob/master/LICENSE)

## Change Log

* January 3, 2024 - First Upload
