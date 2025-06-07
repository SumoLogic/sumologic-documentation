---
title: Google Safe Browsing
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="100"/>

***Version: 1.4  
Updated: Jul 25, 2023***

Google Safe Browsing helps protect over four billion devices every day by showing warnings to users when they attempt to navigate to dangerous sites or download dangerous files.

## Actions

* **Lookup URL** *(Enrichment)* - Query data in Google Safe Browsing.
* **Threat Lists** *(Enrichment)* - Retrieve list of threats.

## Configure Google Safe Browsing in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Google Safe Browsing API URL, for example, `https://safebrowsing.googleapis.com/`

* **API Key**. Enter a Google Safe Browsing [API key](https://developers.google.com/safe-browsing/v4/get-started#3.-set-up-an-api-key).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-safe-browsing-configuration.png')} style={{border:'1px solid gray'}} alt="Google Safe Browsing configuration" width="400"/>

For information about Google Safe Browsing, see [Google Safe Browsing documentation](https://developers.google.com/safe-browsing/reference).

## Change Log

* May 31, 2021 - First upload
* March 10, 2022 - Logo
* June 23, 2023 (v1.2) - Updated the integration with Environmental Variables
* July 25, 2023 (v1.4) - Integration refactored
