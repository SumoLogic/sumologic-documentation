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

## Configure Abnormal Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

     * **Label**. The name for the resource.
     * **URL API**. Abnormal Security URL API. Default: 'https://api.abnormalplatform.com'
     * **Token**. Retrieved from Abnormal Security. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/abnormal-security-configuration.png')} style={{border:'1px solid gray'}} alt="Abnormal Security configuration" width="400"/>

For information about Abnormal Security, see [Abnormal Security documentation](https://abnormalsecurity.my.site.com/knowledgebase/s/).

## Category

Email Security

## Change Log

* October 21, 2022 - First upload
* May 18, 2023 (v1.1)
    + Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* June 21, 2023 (v1.2) - Removed trailing spaces from integration
