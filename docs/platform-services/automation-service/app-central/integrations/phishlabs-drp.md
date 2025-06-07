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

## Configure PhishLabs DRP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your PhishLabs DRP URL.

* **Username**. Enter the username of a PhishLabs DRP admin user authorized to authenticate the integration. 

* **Password**. Enter the password of the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phishlabs-drp-configuration.png')} style={{border:'1px solid gray'}} alt="PhishLabs DRP configuration" width="400"/>

For information about PhishLabs, see the [PhishLabs website](https://www.phishlabs.com/).

## Change Log

* February 16, 2023 - First upload
* June 22, 2023 (v1.1) - Changed indentation
