---
title: Intel 471
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intel-471.png')} alt="intel" width="80"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Intel 471provides comprehensive coverage of the criminal underground, SaaS platform which exposes locally sourced human-driven, automation-enabled insights to gain broad coverage and monitor the threats.

## Actions

* **List Alerts** *(Enrichment)* - Returns list of Alerts matching filter criteria excluding the following types: Malware reports, YARA.
* **Search IOC** *(Enrichment)* - Returns list of Indicators of compromise matching filter criteria.
* **Stream Malware Intelligence Indicators** *(Enrichment)* - Returns list of Indicators matching filter criteria.

## Intel 471 configuration

1. Sign in Intel 471 using your username and password.
2. Use the token you received in your email to complete log in.
3. On the left menu, search for your profile and in API, under API KEY click to display your API Key.
4. Make sure you copy the API Key.

## Configure Intel 471 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intel-471/intel-471-3.png')} style={{border:'1px solid gray'}} alt="intel" width="400"/>
1. Populate all the required fields (\*)
   * **URL**. 'https://api.intel471.com/'.
   * **Email Address**. your email address.
   * **API Key**. Insert the previously copied key.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intel-471/intel-471-4.png')} style={{border:'1px solid gray'}} alt="intel" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intel-471/intel-471-5.png')} style={{border:'1px solid gray'}} alt="intel" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intel-471/intel-471-6.png')} style={{border:'1px solid gray'}} alt="intel" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intel-471/intel-471-7.png')} style={{border:'1px solid gray'}} alt="intel" width="400"/>

## Category

Threat Intelligence-Reputation

## Change log

* May 23, 2022 - First Upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
