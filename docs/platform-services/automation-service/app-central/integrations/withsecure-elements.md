---
title: WithSecure Elements
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/withsecure-elements.png)

Version: 1.1  
Updated: Jul 18, 2023

WithSecure Elements is a single, modular solution consisting of a complete range of cybersecurity applications that offer end-to-end enterprise and cloud coverage. The product includes our award-winning technologies for vulnerability management, patch management, endpoint protection, and endpoint detection and response. In today's unpredictable and ever-changing business environment, our all-in-one security solution helps build and ensure a resilient business.

## Actions

* **List Devices** *(Enrichment)* - For given organization retrieves devices matching all filters, that are used in query.
* **List Organizations** *(Enrichment)* - List organizations that belong to given organization (including itself, if type matches).
* **Retrieve Organization ID** *(Enrichment)* - To retrieve the Organization ID of your profile.
* **WithSecure Elements Security Events Daemon** *(Daemon)* - List security events within specified time frame for given organization in specified order.

## WithSecure Elements configuration

1. Login using your credentials on WithSecure Elements technology using [this](https://elements.withsecure.com/) URL.

1. Go on **MANAGEMENT > Client API**. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-1.png)

1. Click on **Add New**. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-2.png)

1. Add a description and click **Add**. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-3.png)

1. Copy and Save the **Client ID** and **Secret**. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-4.png)

## WithSecure Elements in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-5.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-6.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-7.png)

1. Populate all the required fields (\*) and then click Save.
   * **Label**: the name for the resource/
   * **URL**: the base API URL for WithSecure Elements. Default: `https://api.connect.withsecure.com/`.
   * **Client ID**: your previously retrieved Client ID.
   * **Client Secret**: your previously retrieved Client Secret. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-8.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-9.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-10.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-11.png)

## Category

Threat Intelligence-Reputation

## Change Log

* March 22, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
