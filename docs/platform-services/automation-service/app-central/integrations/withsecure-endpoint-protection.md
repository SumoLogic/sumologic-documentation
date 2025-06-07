---
title: WithSecure Endpoint Protection
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/withsecure-endpoint-protection.png')} alt="withsecure-endpoint-protection" width="100"/>

***Version: 1.1  
Updated: Jul 18, 2023***

WithSecure™ (formerly F-Secure) Elements Endpoint Protection is cloud-native, AI-powered endpoint protection that you can deploy instantly from your browser and manage easily from a single console. It integrates across all your endpoints, keeping your organization fenced in from attacks.

## Actions

* **Get company subscription details** *(Enrichment)* - Retrieve subscription information by the given ID.
* **List company subscriptions** *(Enrichment)* - List subscriptions that belong to a company.
* **List missing software updates** *(Enrichment)* - List software updates missing from a company computer with given UUID.

## WithSecure Endpoint Protection configuration

To use the Endpoint Protection API, you need EPP user credentials and an API key. The user must have MFA disabled in order for API integration to work.   

To generate an API key:
1. Log in to the protal with the account used for the API.
1. Open Endpoint Protection section and open any sub-menu.
1. Click on the user icon in the top right of the screen and select **Get management API key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-1.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="800" />
1. This starts the Management API key wizard.
1. Accept the terms of use.
1. Make note of the generated API key and the API server URL to use when making API requests.
1. If MFA has been enabled, disable MFA from settings.
1. Logout.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-2.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="600" />

## Configure WithSecure Endpoint Protection in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**: Enter the base API URL for WithSecure Endpoint Protection, for example, `https://eu1.psb.fsapi.com`.

* **API Key**: Enter your WithSecure Endpoint Protection API key you [copied earlier](#withsecure-endpoint-protection-configuration).

* **Username**: Enter the username for an WithSecure Endpoint Protection admin user authorized to authenticate the integration

* **Password**: Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/withsecure-endpoint-protection-configuration.png')} style={{border:'1px solid gray'}} alt="WithSecure Endpoint Protection configuration" width="400"/>

For information about WithSecure Endpoint Protection, see [WithSecure Endpoint Protection documentation](https://www.withsecure.com/userguides/product.html?business/psb-portal/latest/en).

## Category

Threat Intelligence-Reputation

## Change Log

* March 27, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
