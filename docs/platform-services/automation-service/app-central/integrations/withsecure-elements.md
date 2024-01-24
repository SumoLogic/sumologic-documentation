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

Login using your credentials on WithSecure Elements technology using [this](https://elements.withsecure.com/) url.

Go on **MANAGEMENT > Client API**

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-1.png)

Click on **Add New**

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-2.png)

Add a description and click **Add**

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-3.png)

Copy and Save the **Client ID** and **Secret**

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-4.png)

## WithSecure Elements in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-5.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-6.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-7.png)

Populate all the required fields (\*) and then click Save.

* **Label**: the name for the resource
* **URL**: the base API URL for WithSecure Elements. Default: `https://api.connect.withsecure.com/`
* **Client ID**: your previously retrieved Client ID
* **Client Secret**: your previously retrieved Client Secret

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-8.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-9.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-10.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-11.png)

## Category

Threat Intelligence-Reputation

## Change Log

* March 22, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
