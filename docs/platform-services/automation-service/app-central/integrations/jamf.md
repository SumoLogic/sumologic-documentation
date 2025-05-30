---
title: Jamf
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/jamf.png')} alt="jamf" width="70"/>

***Version: 1.3  
Updated: Jun 28, 2023***

The Jamf platform creates IT software that manages Apple devices.

## Actions

* **Get Computer Details** *(Enrichment)* - Return a computer general details.
* **Get macOs Managed Software Updates** *(Enrichment)* - Retrieves available macOs managed software updates.
* **List Computer Groups** *(Enrichment)* - Returns a list of computer groups.
* **List Computers** *(Enrichment)* - Returns a list of computers.
* **List Config Profiles** *(Enrichment)* - Search for config profiles linked to Jamf Connect.
* **Remove Computer** *(Containment)* - Remove specified Computer record.
* **Send macOs Managed Software Updates** *(Containment)* - Apply major update to macOs managed software updates.

## Configure Jamf in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **URL**: jamf url.
   * **Username**
   * **Password**<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/jamf-configuration.png')} style={{border:'1px solid gray'}} alt="Jamf configuration" width="400"/>

For information about Jamf, see [Jamf documentation](https://www.jamf.com/resources/product-documentation/jamf-pro-administrators-guide/).

## Minimum permissions required

The following permissions are required for the integration:
* **Read Computers**. Allows reading details of computers in the Jamf inventory. 
* **Read Smart Computer Groups**. Grants access to view smart computer groups. 
* **Read Static Computer Groups**. Grants access to view static computer groups. 
* **Read Jamf Connect Deployments**. Provides access to view Jamf Connect deployments.

#### Jamf Pro Server URL:
Example: [https://yourServer.jamfcloud.com](https://yourServer.jamfcloud.com)


## Change Log

* November 23, 2022 - First upload
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
* June 28, 2023 (v1.3) - Updated **List Computers** Action
