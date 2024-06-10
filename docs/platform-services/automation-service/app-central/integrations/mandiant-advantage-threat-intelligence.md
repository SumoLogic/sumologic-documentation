---
title: Mandiant Advantage Threat intelligence
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mandiant-advantage-threat-intelligence.png')} alt="mandiant-advantage-threat-intelligence" width="100"/>

***Version: 1.5  
Updated: Jul 18, 2023***

Mandiant Threat Intelligence is a comprehensive and powerful SaaS platform that provides organizations of all sizes with up-to-the-minute, relevant cyber threat intelligence so you can focus on and address the threats that matter now.

## Actions

* **Get Indicator By Value** *(Enrichment)* - For given organization retrieves devices matching all filters, that are used in query.
* **Search** *(Enrichment)* - List organizations that belong to given organization (including itself, if type matches).

## Mandiant Threat Intelligence configuration

1. Log in to the [Mandiant Threat Intelligence](https://advantage.mandiant.com/). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-1.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-1" width="600"/>
1. On **Threat Intelligence** click **Settings**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-2.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-2" width="800"/>
1. Click on **Get Key ID And Secret**.

## Mandiant Advantage Threat intelligence in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+" **button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-5.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-5" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The name for the resource
   * **URL**. The base API URL for WithSecure Elements. Default: 'https://api.intelligence.mandiant.com'.
   * **Public Key**. The public key previously obtained.
   * **Private Key**. The private key previously obtained.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-6.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-6" width="400"/>  
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-7.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-7" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-8.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-8" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-9.png')} style={{border:'1px solid gray'}} alt="mandiant-advantage-threat-intelligence-9" width="400"/>

## Category

Threat Intelligence-Reputation

## Change Log

* April 27, 2023 (v1.0) - First Upload
* July 18, 2023 (v1.5) - Removed leading/trailing spaces
