---
title: Abnormal Security
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/abnormal-security.png')} alt="abnormal-security" width="90"/>

***Version: 1.2  
Updated: Jun 21, 2023***

Abnormal Security provides advanced email security to prevent credential phishing, business email compromise, account takeover, and more.

## Actions

* **List Threats** *(Enrichment)* - Get a list of threats.
* **Get Threat Details** *(Enrichment)* - Get details of a threat.
* **List Cases** *(Enrichment)* - Get a list of Abnormal cases identified by Abnormal Security.
* **Get Case Details** *(Enrichment)* - Get details of an Abnormal case.
* **Get Case Action Status** *(Enrichment)* - Check the status of an action requested on a case.
* **Get Threat Action Status** *(Enrichment)* - Check the status of an action requested on a threat.
* **List Abuse Mailbox Campaigns** *(Enrichment)* - Get a list of campaigns submitted to Abuse Mailbox.
* **Get Abuse Mailbox Campaign Details** *(Enrichment)* - Get details of an Abuse Mailbox campaign.
* **Get Employee Identity Analysis** *(Enrichment)* - Get employee identity analysis (Genome) data.
* **Get Employee Information** *(Enrichment)* - Get employee information.

## Abnormal Security in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation/).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abnormal-security/abnormal-security-3.png')} style={{border:'1px solid gray'}} alt="abnormal-security-3" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**.The name for the resource
   * **URL API**. Abnormal Security URL API. Default: 'https://api.abnormalplatform.com'
   * **Token**. retrieved from Abnormal Security <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abnormal-security/abnormal-security-4.png')} style={{border:'1px solid gray'}} alt="abnormal-security-4" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abnormal-security/abnormal-security-5.png')} style={{border:'1px solid gray'}} alt="abnormal-security-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abnormal-security/abnormal-security-6.png')} style={{border:'1px solid gray'}} alt="abnormal-security-6" width="400"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/abnormal-security/abnormal-security-7.png')} style={{border:'1px solid gray'}} alt="abnormal-security-7" width="400"/>

## Category

Email Security

## Change Log

* October 21, 2022 - First upload
* May 18, 2023 (v1.1)
    + Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* June 21, 2023 (v1.2) - Removed trailing spaces from integration
