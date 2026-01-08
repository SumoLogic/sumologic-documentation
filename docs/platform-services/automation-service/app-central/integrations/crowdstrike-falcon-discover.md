---
title: CrowdStrike Falcon Discover
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon-discover.png')} alt="crowdstrike-falcon-intelligence" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

**CrowdStrike Falcon Discover** allows to quickly identify and eliminate malicious or noncompliant activity by providing unmatched real-time visibility into the devices, users, and applications in your network.
* **Search Logins** *(Enrichment)* - Search for logins in your environment.
* **Search Accounts** *(Enrichment)* - Search for accounts in your environment.
* **Search Applications** *(Enrichment)* - Search for applications in your environment.
* **Search Assets** *(Enrichment)* - Search for assets in your environment.
* **Get Logins** *(Enrichment)* - Get details on logins.
* **Get Accounts** *(Enrichment)* - Get details on accounts.
* **Get Applications** *(Containment)* - Get details on applications.
* **Get Assets** *(Containment)* - Get details on assets.

## Configure CrowdStrike Falcon Discover in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter the CrowdStrike Falcon Discover API URL, for example, `https://api.crowdstrike.com`

* **Client ID**. Enter the unique identifier of the CrowdStrike Falcon Discover API client.

* **Client Secret**. Enter the secret code for an API client.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/crowdstrike-falcon-discover-configuration.png')} style={{border:'1px solid gray'}} alt="CrowdStrike Falcon Discover configuration" width="400"/>

For information about CrowdStrike Falcon Discover, see [CrowdStrike documentation](https://www.crowdstrike.com/en-us/resources/guides/?lang=1).

## Note

Refer to [Falcon documentation](https://falcon.crowdstrike.com/documentation/45/falcon-query-language-fql) to know more on creating FQL Query Filter.

## Change Log

* March 16, 2023 (v1.0) - First upload
* July 3, 2023 (v1.1) - Removed leading/trailing spaces
