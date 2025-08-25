---
title: RapidAPI
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/rapidapi.png')} alt="rapidapi" width="90"/>

***Version: 1.1  
Updated: Jul 07, 2023***

RapidAPI is an API Hub that enables developers and enterprises to find, connect to, and manage thousands of APIs.

## Actions

* **Ipregistry Single IP Address Lookup** *(Enrichment)* - Get Single IP Address Lookup.
* **FraudSentinel IP Reputation** *(Enrichment)* - Get IP reputation.
* **Neutrino API IP Blocklist** *(Enrichment)* - Detect potentially malicious or dangerous IP addresses.
* **Email Checker Email Verifier** *(Enrichment)* - Validate email addresses in real-time. Make sure a mailbox really exist.

## Configure RapidAPI in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **RapidAPI Host**. Enter your RapidAPI host (corresponding to the [X-RapidAPI-Host header](https://docs.rapidapi.com/v1.0/docs/configuring-api-authentication)).

* **RapidAPI Key**. Enter your [RapidAPI key](https://docs.rapidapi.com/docs/keys-and-key-rotation).

* **Querystring**. Enter a [RapidApI query string](https://docs.rapidapi.com/docs/configuring-api-security#query-string-parameter-authorization).

* **RapidAPI URL**. Enter your [RapidAPI URL](https://docs.rapidapi.com/v1.0/docs/base-urls).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/rapidapi-configuration.png')} style={{border:'1px solid gray'}} alt="RapidAPI configuration" width="400"/>

For information about RapidAPI, see [RapidAPI documentation](https://docs.rapidapi.com/).

## Change Log

* October 29, 2021 - First upload
* March 11, 2022 - Description
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
