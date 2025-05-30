---
title: PhishLabs EIR - Incident Data
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishlabs-eir-incident-data.png')} alt="phishlabs-eir-incident-data" width="100"/>

***Version: 1.1  
Updated: Jun 22, 2023***

PhishLabs by Fortra is a cyber threat intelligence company that delivers Digital Risk Protection through curated threat intelligence and complete mitigation. PhishLabs provides brand impersonation, account takeover, data leakage and social media threat protection.

## Actions

* **Get Incident** *(Enrichment)* - Retrieve a single Incident.
* **List Incidents** *(Enrichment)* - Retrieve a set of Incidents.

## Configure PhishLabs EIR - Incident Data in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **URL**. Your PhishLabs EIR - IOC Feed API URL.
   * **Username**. Your PhishLabs EIR - IOC Feed Username.
   * **Password**. Your PhishLabs EIR - IOC Feed API Password.
   * **Service**. Specific PhishLabs service. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phishlabs-eir-incident-dataconfiguration.png')} style={{border:'1px solid gray'}} alt="PhishLabs EIR configuration" width="400"/>

For information about PhishLabs, see the [PhishLabs website](https://www.phishlabs.com/).

## Change Log

* March 14, 2023 - First upload
* June 22, 2023 (v1.1) - Changed indentation
