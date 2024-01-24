---
title: WithSecure Endpoint Protection
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/withsecure-endpoint-protection.png)

Version: 1.1  
Updated: Jul 18, 2023

WithSecure™ (formerly F-Secure) Elements Endpoint Protection is cloud-native, AI-powered endpoint protection that you can deploy instantly from your browser and manage easily from a single console. It integrates across all your endpoints, keeping your organization fenced in from attacks.

## Actions

* **Get company subscription details** *(Enrichment)* - Retrieve subscription information by the given ID.
* **List company subscriptions** *(Enrichment)* - List subscriptions that belong to a company.
* **List missing software updates** *(Enrichment)* - List software updates missing from a company computer with given UUID.

## WithSecure Endpoint Protection configuration

To use the Endpoint Protection API, you need EPP user credentials and an API key. The user must have MFA disabled in order for API integration to work.   


To generate an API key:

* Log into the protal with the account used for the API.
* Open Endpoint Protection section and open any sub-menu
* Click on the user icon in the top right of the screen and select **Get management API key**

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-1.png)

This starts the Management API key wizard.

* Accept the terms of use.
* Make note of the generated API key and the API server URL to use when making API requests
* If MFA has been enabled, disable MFA from settings
* Logout

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-2.png)

## WithSecure Elements in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-3.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-4.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-5.png)

Populate all the required fields (\*) and then click Save.

* **Label**: the name for the resource.
* **URL**: the base API URL for WithSecure Endpoint Protection. i.e. [http[s]://eu1.psb.fsapi.com](https://eu1.psb.fsapi.com)
* **API Key**: your API Key.
* **Username**: your username.
* **Password**: your password.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-6.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-7.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-8.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-endpoint-protection/withsecure-endpoint-protection-9.png)

## Category

Threat Intelligence-Reputation

## Change Log

* March 27, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
