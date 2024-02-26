---
title: Imperva WAF
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/imperva-waf.png')} alt="intelligence" width="80"/>

***Version: 1.1  
Updated: Jun 26, 2023***

Imperva WAF offers web application security firewall, providing protection against the most sophisticated security threats. As a cloud-based WAF, it ensures that your website is always protected against any type of application layer hacking attempt.

## Actions

* **List Sites** *(Enrichment)* - Retrieves a list of all sites.


## Imperva WAF in Automation Service and Cloud SOAR


1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-1.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-2.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-3.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **Label**. The name for the resource.
   * **URL API**. 'https://my.imperva.com/'.
   * **API ID**
   * **API Key** <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-4.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-5.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-6.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/> 
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imperva-waf/imperva-waf-7.png')} style={{border:'1px solid gray'}} alt="imperva-waf" width="400"/>

## Change Log

* October 28, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
