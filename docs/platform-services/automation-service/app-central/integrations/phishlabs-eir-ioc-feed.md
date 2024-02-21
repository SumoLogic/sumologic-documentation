---
title: PhishLabs EIR - IOC Feed
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishlabs-eir-ioc-feed.png')} alt="phishlabs-eir-ioc-feed" width="80"/>

***Version: 1.1  
Updated: Jun 26, 2023***

PhishLabs by Fortra is a cyber threat intelligence company that delivers Digital Risk Protection through curated threat intelligence and complete mitigation. PhishLabs provides brand impersonation, account takeover, data leakage and social media threat protection.

## Actions

* **List Incident Indicators** *(Enrichment)* - Retrieve list of incidents and indicators within the feed.
* **List Global Indicators** *(Enrichment)* - Retrieve global list of indicators.

## PhishLabs EIR - IOC Feed in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-1.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-2.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/>
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-3.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="600"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The desired name for the resource.
   * **URL**. Your PhishLabs EIR - IOC Feed API URL.
   * **Username**. Your PhishLabs EIR - IOC Feed Username.
   * **Password**. Your PhishLabs EIR - IOC Feed API Password.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-4.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-5.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-6.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-ioc-feed/phishlabs-eir-ioc-feed-7.png')} style={{border:'1px solid gray'}} alt="phishlabs-eir-ioc-feed" width="400"/>

## Change Log

* March 14, 2023 - First upload
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
