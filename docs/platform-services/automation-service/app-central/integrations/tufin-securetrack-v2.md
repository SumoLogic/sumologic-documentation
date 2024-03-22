---
title: Tufin SecureTrack V2
description: ''
tags: []
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

## Tufin SecureTrack V2 in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-1.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-2.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-3.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>
1. Populate all the required fields (\*):
   * **Label**. Name of the resource.
   * **URL**. URL of Tufin SecureTrack.
   * **Username**
   * **Password**
1. Click **SAVE**.
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-4.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-5.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/tufin-securetrack-v2/tufin-securetrack-v2-6.png')} style={{border:'1px solid gray'}} alt="tufin-securetrack" width="400"/>

## Change Log

* April 7, 2023 (v1.0) - First upload
