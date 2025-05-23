---
title: PhishLabs EIR - IOC Feed
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishlabs-eir-ioc-feed.png')} alt="phishlabs-eir-ioc-feed" width="80"/>

***Version: 1.1  
Updated: Jun 26, 2023***

PhishLabs by Fortra is a cyber threat intelligence company that delivers Digital Risk Protection through curated threat intelligence and complete mitigation. PhishLabs provides brand impersonation, account takeover, data leakage and social media threat protection.

## Actions

* **List Incident Indicators** *(Enrichment)* - Retrieve list of incidents and indicators within the feed.
* **List Global Indicators** *(Enrichment)* - Retrieve global list of indicators.

## Configure PhishLabs EIR - IOC Feed in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The desired name for the resource.
   * **URL**. Your PhishLabs EIR - IOC Feed API URL.
   * **Username**. Your PhishLabs EIR - IOC Feed Username.
   * **Password**. Your PhishLabs EIR - IOC Feed API Password.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phishlabs-eir-ioc-configuration.png')} style={{border:'1px solid gray'}} alt="PhishLabs EIR IOC Feed configuration" width="400"/>

For information about PhishLabs, see the [PhishLabs website](https://www.phishlabs.com/).

## Change Log

* March 14, 2023 - First upload
* June 26, 2023 (v1.1) - Removed unnecessary empty lines and other little changes
