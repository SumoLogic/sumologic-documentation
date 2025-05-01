---
title: APIVoid
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/apivoid.png')} alt="apivoid" width="90"/>

***Version: 1.3  
Updated: July 01, 2024***

Utilize APIVOID to gather enrichment data during incident investigations.

## Actions

* **Check Credit Balance** (*Enrichment*) - Check the APIVOID credit balance for a specific account.
* **DNS Lookup** (*Enrichment*) - Gather DNS lookup information.
* **Domain Reputation** (*Enrichment*) - Gather Domain Reputation information.
* **Email Verify** (*Enrichment*) - Verify a submitted email address.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information.
* **Save Screenshot** (*Enrichment*) - Save screenshots to Cloud SOAR.
* **Save URL** (*Enrichment*) - Save URL details.
* **Site Trustworthiness** (*Enrichment*) - Gather a site's trustworthiness score.
* **URL Reputation** (*Enrichment*) - Gather URL reputation information.

## Configure APIVoid in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* August 14, 2020 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* October 5, 2023 (v1.2) - Changed fields visibility
* July 01, 2024 (v1.3) - Updated ***Save Screenshot*** & ***Save URL*** actions with the new Cloud SOAR API; results can now be saved as incident attachments and artifacts.