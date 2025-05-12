---
title: VMware Workspace ONE
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vmware-workspace-one.png')} alt="vmware-workspace-one" width="80"/>

***Version: 1.1  
Updated: Jul 07, 2023***

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
1. Navigate to **Groups & Settings > All Settings > System > Advanced > API > REST API**.
1. Select the tab and configure the following setting on the corresponding tab:
1. Select **Enable API Access**.
1. This selection automatically generates the API Key for the organization group.

## Configure VMware Workspace ONE in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **URL**. `https://techp-as.awmdm.com/API`.
   * **Username**. Workspace ONE Login Username.
   * **Password**. Workspace ONE Login Password.
   * **API Key**. The previous generated API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/vmware-workspace-one-configuration.png')} style={{border:'1px solid gray'}} alt="VMware Workspace ONE configuration" width="400"/>

For information about Omnissa Workspace ONE (formerly VMware Workspace ONE), see [Omnissa Workspace ONE documentation](https://docs.omnissa.com/category/Workspace_ONE).

## Change Log

* May 17, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
