---
title: SonicWall
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sonicwall.png')} alt="sonicwall" width="100"/>

***Version: 1.2  
Updated: Jul 11, 2023***

Query data and utilize actions on SonicWall Next-Gen Firewall.

## Actions

* **List Address Groups** *(Enrichment)* - Retrieve IPv4 address group configuration.
* **Get Address Group** *(Enrichment)* - Retrieve IPv4 address group configuration by group address object name.
* **Remove Address Group** *(Containment)* - Delete an IPv4 address group.
* **List Objects** *(Enrichment)* - Retrieve IPv4 address object configuration.
* **Create IP Object** *(Containment)* - Create a new IPv4 address object.
* **Add IP to Group** *(Containment)* - Edit IPv4 address group configuration.
* **Remove IP Object** *(Containment)* - Delete an IPv4 address object.
* **List URI List Objects** *(Enrichment)* - Retrieve content filter URI list object configuration.
* **Add URI List Object to URI Group** *(Containment)* - Create a new content filter URI list object.
* **Remove URI from URI List** *(Containment)* - Delete a content filter URI list object.
* **List URI List Groups** *(Enrichment)* - Retrieve content filter URI list group object configuration.

## SonicWall configuration

For configuration purposes, refer [here](https://www.sonicwall.com/support/technical-documentation/docs/sonicos-7-0-0-0-api/Content/SonicOS_API_Guide/API_Authentication/authentication-methods.htm/).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sonicwall/sonicwall-1.png')} style={{border:'1px solid gray'}} alt="snyk" width="800"/>

## Configure SonicWall in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sonicwall-configuration.png')} style={{border:'1px solid gray'}} alt="SonicWall configuration" width="400"/>

For information about SonicWall, see [SonicWall documentation](https://www.sonicwall.com/support/technical-documentation).

## Change Log

* April 21, 2021 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 11, 2023 (v1.2) - integration refactored
