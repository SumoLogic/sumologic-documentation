---
title: BitSight Security Performance Management
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/bitsight-security-performance-management.png')} alt="axonius" width="80"/>

***Version: 1.1  
Updated: Jul 06, 2023***

BitSight offers the world's leading security ratings solution with a mission to change the way the world manages cybersecurity risk. 

## Actions

* **List Alerts** *(Enrichment)* - List your existing alerts and their details.
* **Get Alert Details** *(Enrichment)* - Get the details of an alert.
* **List Companies** *(Enrichment)* - Retrieve information about all companies in your portfolio.
* **Get Company Details** *(Enrichment)* - Get specific details about a company that's not returned by querying companies alone. The details include rating details, rating history, and risk vector grades.
* **Get Company Findings** *(Enrichment)* - Get an organization’s finding details.

## BitSight configuration

1. To [generate an API Token](https://help.bitsighttech.com/hc/en-us/articles/115014888388-API-Token-Management), after signing in, go to top right corner on the gear icon and select **Account** . 
1. In the **API Token** section, click **Generate New Token** (this token will be used later in the configuration). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-1.png')} style={{border:'1px solid gray'}} alt="bitsight-security-performance-management-1" width="800"/>

## Configure BitSight Security Performance Management in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name of the resource.
   * **URL**. URL of BitSight API (default URL [https://api.bitsighttech.com](<https://www.alphamountain.ai/contact/>) is already provided).
   * **API Token**. API token copied from BitSight platform.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/bitsight-security-performance-management/bitsight-security-performance-management-5.png')} style={{border:'1px solid gray'}} alt="bitsight-security-performance-management-5" width="400"/>

For information about BitSight Security Performance Management, see [Security Performance Management documentation](https://help.bitsighttech.com/hc/en-us/categories/4410024719255-Security-Performance-Management#).

## Change Log

* February 10, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
