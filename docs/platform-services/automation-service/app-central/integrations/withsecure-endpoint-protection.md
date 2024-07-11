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

## WithSecure Elements in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-5.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />
1. Populate all the required fields (\*) and then click Save.
   * **Label**: The name for the resource.
   * **URL**: The base API URL for WithSecure Endpoint Protection. i.e. [http[s]://eu1.psb.fsapi.com](https://eu1.psb.fsapi.com)
   * **API Key**: Your API Key.
   * **Username**: Your username.
   * **Password**: Your password. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-6.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-7.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-8.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-9.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />

## Category

Threat Intelligence-Reputation

## Change Log

* March 27, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
