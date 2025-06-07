---
title: KnowBe4 KMSAT - Reporting
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/knowbe4-kmsat-reporting.png')} alt="knowbe4-kmsat-reporting" width="100"/>

***Version: 1.1  
Updated: Jun 15, 2023***

KnowBe4 KMSAT is a security platform for security awareness training and simulated phishing attacks. KnowBe4 KMSAT Reporting API allows you to pull data from the KnowBe4 console for reporting purposes.

## Actions

* **Get Campaign PSTs** *(Enrichment)* - Retrieve all phishing security tests from specific phishing campaign.
* **Get Phishing Campaign** *(Enrichment)* - Retrieve data from specific phishing campaign.
* **List PST Results** *(Enrichment)* - Retrieve data about all users that were part of a specific phishing security test.
* **List Phishing Campaigns** *(Enrichment)* - Retrieve data from all phishing campaigns.
* **List Users** *(Enrichment)* - Retrieve data about all users.

## Configure KnowBe4 KMSAT - Reporting in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the [reporting base URL](https://developer.knowbe4.com/rest/reporting#tag/Base-URL) for the KnowBe4 server that is closest to your geographic location.

* **API Key**. Enter your KnowBe4 KMSAT [API key](https://developer.knowbe4.com/rest/reporting#tag/Authentication).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/knowbe4-kmsat-reporting-configuration.png')} style={{border:'1px solid gray'}} alt="KnowBe4 KMSAT Reporting configuration" width="400"/>

For information about KnowBe4 reporting, see [KnowBe4 reporting documentation](https://support.knowbe4.com/hc/en-us/articles/360007952894-Reporting-Guide).

## Change Log

* February 6, 2023 - First upload
* June 14, 2023 (v1.1) - Updated the integration with Environmental Variables
