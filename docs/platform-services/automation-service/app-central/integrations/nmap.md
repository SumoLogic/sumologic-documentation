---
title: Nmap
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/nmap.png')} alt="nmap" width="60"/>

***Version: 1.3  
Updated: Jun 26, 2023***

Nmap is a free and open-source network scanner. Nmap is used to discover hosts and services on a computer network by sending packets and analyzing the responses.

## Actions

* **Create Scan** (*Enrichment*) - Start NMAP scan.
* **Check Scan Status** (*Enrichment*) - Check scan status.
* **Get Scan Info** (*Enrichment*) - Get scan info.
* **Get Scan Report** (*Enrichment*) - Get scan report.
* **List Credits** (*Enrichment*) - Get API calls report for current member.

## Nmap in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/nmap/nmap-3.png')} style={{border:'1px solid gray'}} alt="nmap" width="400"/>
1. Populate all the required fields (\*).
   * **URL**. Your URL default ('https://api.nmap.online'/).
   * **Api Key**. Insert the API Key.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/nmap/nmap-4.png')} style={{border:'1px solid gray'}} alt="nmap" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/nmap/nmap-5.png')} style={{border:'1px solid gray'}} alt="nmap" width="300"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/nmap/nmap-6.png')} style={{border:'1px solid gray'}} alt="nmap" width="300"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/nmap/nmap-7.png')} style={{border:'1px solid gray'}} alt="nmap" width="300"/>

## Change Log

* August 09, 2022 - First upload
* April 28, 2023 (v1.2) - Integration refactored
* June 26, 2023 (v1.3) - Removed unnecessary empty lines and other little changes
