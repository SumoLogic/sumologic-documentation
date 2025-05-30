---
title: GreyNoise
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/greynoise.png')} alt="greynoise" width="100"/>

***Version: 1.6  
Updated: May 20, 2024***

GreyNoise tells security analysts what not to worry about. They do this by curating data on IPs that saturate security tools with noise. This unique perspective helps analysts confidently ignore irrelevant or harmless activity, creating more time to uncover and investigate true threats. Includes Actions to allow IP enrichments and GNQL queries via the GreyNoise API.

## Actions

* **Context IP Lookup** *(Enrichment)* - Get more information about a given IP address.
* **Context IP Lookup Community** *(Enrichment)* - Query IPs in the GreyNoise dataset and retrieve a subset of the full IP context data using the free Community API.
* **Execute GNQL Query** *(Enrichment)* - Make complex and one-off queries against the GreyNoise dataset.
* **Grey Noise Alert Daemon** *(Daemon)* - Get an email if GreyNoise observes any Internet scan and attack traffic originating from networks that belong to you.
* **Ping** *(Enrichment)* - Check for connectivity and key validation.
* **Quick IP Lookup** *(Enrichment)* - Check whether a given IP address is “Internet background noise”, or has been observed scanning or attacking devices across the Internet.
* **RIOT IP Lookup** *(Enrichment)* - RIOT identifies IPs from known benign services and organizations that commonly cause false positives in network security and threat intelligence products.

## Configure GreyNoise in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your GreyNoise API URL, for example, `https://api.greynoise.io`

* **API Key**. Enter your GreyNoise [API key](https://docs.greynoise.io/docs/getting-started).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* **CIDR IP (Daemon)**. Enter the [CIDR IP](CIDR) used to create the alert.

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/greynoise-configuration.png')} style={{border:'1px solid gray'}} alt="GreyNoise configuration" width="400"/>

For information about GreyNoise, see [GreyNoise documentation](https://docs.greynoise.io/).

## Change Log

* March 31, 2021 - First upload
* March 10, 2022 - Logo
* February 8, 2023 - Updated Action:
    + Context IP Lookup (Improved error handling)
* June 28, 2023 (v1.4) - Visibility of the Resource fields changed and improved error handling
* February 26, 2024 (v1.5)
    * New action: Context IP Lookup Community
    * Code refactoring
    * Fixed Typo
    * Other minor fixes
* May 20, 2024 (v1.6) - Fixed syntax Error with API URL
