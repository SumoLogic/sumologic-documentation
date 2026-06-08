---
title: PhishLabs EIR - Incident Data
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishlabs-eir-incident-data.png')} alt="PhishLabs EIR Incident Data icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

PhishLabs by Fortra is a cyber threat intelligence company that delivers Digital Risk Protection through curated threat intelligence and complete mitigation. PhishLabs provides brand impersonation, account takeover, data leakage and social media threat protection.

## Actions

* **Get Incident** *(Enrichment)* - Retrieve a single Incident.
* **List Incidents** *(Enrichment)* - Retrieve a set of Incidents.

## Configure PhishLabs EIR - Incident Data in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your PhishLabs EIR URL.

* **Username**. Enter the username of a PhishLabs EIR admin user authorized to authenticate the integration. 

* **Password**. Enter the password of the admin user.

* **Service**. Enter your specific PhishLabs service.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phishlabs-eir-incident-dataconfiguration.png')} style={{border:'1px solid gray'}} alt="PhishLabs EIR configuration" width="400"/>

For information about PhishLabs, see the [PhishLabs website](https://www.phishlabs.com/).

## Change Log

* March 14, 2023 - First upload
* June 22, 2023 (v1.1) - Changed indentation
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
