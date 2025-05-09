---
title: CrowdStrike Falcon Intelligence
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon-intelligence.png')} alt="crowdstrike-falcon-intelligence" width="100"/>

***Version: 1.7  
Updated: Mar 4, 2024***

CrowdStrike® Falcon Intelligence™ is an automated threat intelligence service built on the CrowdStrike Falcon Platform. It automates incident investigations and streamlines breach response so you can make faster, more confident cyber security decisions. Organizations, regardless of size or sophistication, learn from the attacks in their environment applying that knowledge to proactively prevent future attacks. Falcon Intelligence provides insight into global threats, tracked by CrowdStrike’s elite team of intelligence experts.

* Intelligence Automation
* Custom IOCs
* Threat Intelligence reports
* CrowdStrike Indicator

## Actions

* **Get Artifact** *(Enrichment)* - Get IOC packs, PCAP files, and other analysis artifacts.
* **Get Full Report** *(Enrichment)* - Get a full sandbox report.
* **Get Report Summary** *(Enrichment)* - Get a short summary version of a sandbox report.
* **Intelligence Indicators Falcon Intelligence Daemon** *(Daemon)* - Daemon to pull Intelligence Indicators.
* **Reports Falcon Intelligence Daemon***(Daemon)* - Daemon to pull sandbox reports.
* **Search Intelligence Indicators** *(Enrichment)* - Get indicators that match provided FQL filter and query.
* **Search Reports** *(Enrichment)* - Find sandbox reports by providing an FQL filter and paging details. Returns a set of a report that match your criteria.
* **Submission Status Polling** (*Enrichment*) - Return the state of submission, this action will poll until the File/URL analysis are finished, Once this action is completed, you will be able to get a Report or Get Summary of the Submission.
* **Submit File** (*Enrichment*) - Submit a file for sandbox analysis. The time required for analysis varies but is usually less than 15 minutes, by using the **Submission Status Polling** action.
* **Submit URL** (*Enrichment*) - Submit a URL for sandbox analysis. The time required for analysis varies but is usually less than 15 minutes, by using the **Submission Status Polling** action.

## CrowdStrike Falcon Intelligence configuration

Create API clients to grant various levels of API access for Falcon Intelligence.

1. From the [API Clients and Keys](https://falcon.crowdstrike.com/support/api-clients-and-keys) page, click **Add new API client** on the right of the **OAuth2 API Clients** table.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-intelligence/crowdstrike-falcon-intelligence-1.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-intelligence" width="800"/>
2. Provide details to define your API client:
    * **Client Name** (required)
    * **Description** (optional)
    * [API Scopes](https://falcon.crowdstrike.com/documentation/46/crowdstrike-oauth2-based-apis#api-scopes) (required):
        + Select the **Read** and/or **Write** boxes next to a scope to enable access to its endpoints.
        + A "–" displays in place of a checkbox when a **Read/Write**.
        + The scope already checked must be assigned. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-intelligence/crowdstrike-falcon-intelligence-2.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-intelligence" width="600"/>
3. Click **Add** to save the API client and generate the client ID and secret.

:::tip
Record your API client secret somewhere safe. After the credential window is closed, the secret is no longer visible.
:::

## Configure CrowdStrike Falcon Intelligence in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

    * **Label**. The resource name.
    * **API URL**. The default Crowdstrike API URL is [https://api.crowdstrike.com](https://api.crowdstrike.com/).
    * **Client ID**. The unique identifier of the API client. The client ID is visible from the API clients table in the Falcon console.
    * **Client Secret**. A secret code for an API client, equivalent to a password. The secret is only visible to you at the time the API client is created. After that, it is not retrievable. If your client secret is ever lost, you can reset it to generate a new one.
    * **Member CID**. For MSSP Master CIDs, optionally lock the token to act on behalf of this member CID.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-intelligence/crowdstrike-falcon-intelligence-6.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-intelligence" width="400"/>

For information about CrowdStrike Falcon Intelligence, see [CrowdStrike documentation](https://www.crowdstrike.com/en-us/resources/guides/?lang=1).

## Change Log

* July 26, 2022 - First upload
* February 23, 2023
    + Integration re-named from **CrowdStrike Falcon X** to **CrowdStrike Falcon Intelligence**
    + Updated integration: (Updated the integration Fields with Environmental Variables)
* March 21, 2023 - Logo updated
* June 30, 2023 (v1.5) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.7) - Updated code for compatibility with Python 3.12
