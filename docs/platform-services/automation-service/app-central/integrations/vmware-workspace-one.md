---
title: VMware Workspace ONE
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/vmware-workspace-one.png)

Version: 1.1  
Updated: Jul 07, 2023

VMware Workspace ONE is an intelligence-driven digital workspace platform that enables you to simply and securely deliver and manage any app on any device, anywhere.

## Actions

* **Search Admin** *(Enrichment*) - Search for the admin users based on the request query.
* **Search Device** *(Enrichment)* - Get basic information about the device.
* **List MEM Devices** *(Enrichment)* - Get the MEM (Mobile Email Management) Devices.
* **Get Enrollment User Details** *(Enrichment)* - Read an enrollment user attributes.
* **Get Profile** *(Enrichment)* - Return the full profile details, including all payloads associated with the profile.

## VMware Workspace ONE configuration

The API key can be found on the REST API settings page of the Workspace ONE UEM. 

Enable API access in the Workspace ONE UEM console using these steps:

1. Ensure that you are in the desired organization group that is a Customer type.
2. Navigate to Groups & Settings > All Settings > System > Advanced > API > REST API.
3. Select the tab and configure the following setting on the corresponding tab:
4. Select Enable API Access.
5. This selection automatically generates the API Key for the organization group.

## VMware Workspace ONE in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-3.png)

Populate all the required fields (\*)

* URL: `https://techp-as.awmdm.com/API`
* Username: Workspace ONE Login Username
* Password: Workspace ONE Login Password
* API Key: The previous generated API Key

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-4.png)

Click Save.

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/vmware-workspace-one/vmware-workspace-one-7.png)

## Change Log

* May 17, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
