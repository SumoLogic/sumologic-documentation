---
title: Tufin SecureTrack V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/tufin-securetrack-v2.png')} alt="tufin-securetrack" width="100"/>

***Version: 1.0  
Updated: Apr 07, 2023***

Tufin SecureTrack is a security policy management solution that provides visibility, analysis and reporting capabilities for security policies.

## Actions

* **List Zones** *(Enrichment)* - Get all zones.
* **List Zone Entries** *(Enrichment)* - Get entries for a zone.
* **Search Devices** *(Enrichment)* - Get devices.
* **Search Network Object** *(Enrichment)* - Get network objects matching specified criteria.
* **Search Policy** *(Enrichment)* - Get policies by device.
* **Search Topology** *(Enrichment)* - Get path for specified traffic.
* **Search Topology Image** *(Enrichment)* - Get path image for specified traffic.

## Configure Tufin SecureTrack V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. Name of the resource.
   * **URL**. URL of Tufin SecureTrack.
   * **Username**
   * **Password**<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/tufin-securetrack-configuration.png')} style={{border:'1px solid gray'}} alt="Tufin SecureTrack V2 configuration" width="400"/>

For information about Tufin SecureTrack, see [Tufin SecureTrack documentation](https://forum.tufin.com/support/kc/latest/Content/Suite/RESTAPI/4420.htm).

## Change Log

* April 7, 2023 (v1.0) - First upload
