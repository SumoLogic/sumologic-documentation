---
title: KnowBe4 KMSAT - Reporting
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/knowbe4-kmsat-reporting.png')} alt="knowbe4-kmsat-reporting" width="100"/>

***Version: 1.1  
Updated: Jun 15, 2023***

KnowBe4 KMSAT is a security platform for security awareness training and simulated phishing attacks. KnowBe4 KMSAT Reporting API allows you to pull data from the KnowBe4 console for reporting purposes.

## Actions

* **Get Campaign PSTs** *(Enrichment)* - Retrieve all phishing security tests from specific phishing campaign.
* **Get Phishing Campaign** *(Enrichment)* - Retrieve data from specific phishing campaign.
* **List PST Results** *(Enrichment)* - Retrieve data about all users that were part of a specific phishing security test.
* **List Phishing Campaigns** *(Enrichment)* - Retrieve data from all phishing campaigns.
* **List Users** *(Enrichment)* - Retrieve data about all users.

## KnowBe4 KMSAT - Reporting in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-3.png')} style={{border:'1px solid gray'}} alt="knowbe4-kmsat-reporting" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **Label**. The desired name for the resource.
   * **URL**. Server that is closer to your geo location.
   * **API Key**. Your KnowBe4 KMSAT API Key you copied earlier from KnowBe4 KMSAT.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-4.png')} style={{border:'1px solid gray'}} alt="knowbe4-kmsat-reporting" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-5.png')} style={{border:'1px solid gray'}} alt="knowbe4-kmsat-reporting" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-6.png')} style={{border:'1px solid gray'}} alt="knowbe4-kmsat-reporting" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/knowbe4-kmsat-reporting/knowbe4-kmsat-reporting-7.png')} style={{border:'1px solid gray'}} alt="knowbe4-kmsat-reporting" width="400"/>

## Change Log

* February 6, 2023 - First upload
* June 14, 2023 (v1.1) - Updated the integration with Environmental Variables
