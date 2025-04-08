---
title: PhishLabs DRP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishlabs-drp.png')} alt="phishlabs-drp" width="100"/>

***Version: 1.1  
Updated: Jun 22, 2023***

Digital Risk Protection from PhishLabs protects your organization's critical digital assets and data from online threats including brand abuse, account takeover, social media scams, data leakage, and advanced email attacks.

## Actions

* **List Cases** *(Enrichment)* - Retrieve collection of cases.
* **Get Case** *(Enrichment)* - Retrieve specific case.
* **List Open Cases** *(Enrichment)* - Retrieve collection of open cases.
* **List Closed Cases** *(Enrichment)* - Retrieve collection of closed cases.
* **List Brands** *(Enrichment)* - Retrieve collection of configured brands.
* **List Case Types** *(Enrichment)* - Retrieve collection of available case types.
* **Create Case** *(Containment)* - Submit a new case.

## PhishLabs DRP in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-drp/phishlabs-drp-3.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The desired name for the resource.
   * **URL**. Your PhishLabs DRP URL.
   * **Username**. Your PhishLabs DRP username you copied earlier from PhishLabs DRP.
   * **Password**. Your PhishLabs DRP password you copied earlier from PhishLabs DRP.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-drp/phishlabs-drp-4.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-drp/phishlabs-drp-5.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-drp/phishlabs-drp-6.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-drp/phishlabs-drp-7.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>

## Change Log

* February 16, 2023 - First upload
* June 22, 2023 (v1.1) - Changed indentation
