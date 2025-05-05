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

For information about PhishLabs, see the [PhishLabs website](https://www.phishlabs.com/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-incident-data/phishlabs-eir-incident-data-3.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The desired name for the resource.
   * **URL**. Your PhishLabs EIR - IOC Feed API URL.
   * **Username**. Your PhishLabs EIR - IOC Feed Username.
   * **Password**. Your PhishLabs EIR - IOC Feed API Password.
   * **Service**. Specific PhishLabs service. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-incident-data/phishlabs-eir-incident-data-4png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-incident-data/phishlabs-eir-incident-data-5.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-incident-data/phishlabs-eir-incident-data-6.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/phishlabs-eir-incident-data/phishlabs-eir-incident-data-7.png')} style={{border:'1px solid gray'}} alt="phishlabs-drp" width="400"/>

## Change Log

* March 14, 2023 - First upload
* June 22, 2023 (v1.1) - Changed indentation
