---
title: Mandiant Advantage Threat intelligence
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/mandiant-advantage-threat-intelligence.png)

Version: 1.5  
Updated: Jul 18, 2023

Mandiant Threat Intelligence is a comprehensive and powerful SaaS platform that provides organizations of all sizes with up-to-the-minute, relevant cyber threat intelligence so you can focus on and address the threats that matter now.

## Actions

* **Get Indicator By Value** *(Enrichment)* - For given organization retrieves devices matching all filters, that are used in query.
* **Search** *(Enrichment)* - List organizations that belong to given organization (including itself, if type matches).

## Mandiant Threat Intelligence configuration

1. Login using your credentials on Mandiant Threat Intelligence technology using [this](https://advantage.mandiant.com/) url. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-1.png)

1. On **threat intelligence** click **settings**. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-2.png)

1. Click on **get key id and secret**.

## Mandiant Advantage Threat intelligence in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-3.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-4.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-5.png)

1. Populate all the required fields (\*) and then click Save.
   * **Label**: the name for the resource
   * **URL**: the base API URL for WithSecure Elements. Default: 'https://api.intelligence.mandiant.com'
   * **Public Key**: the public key previously obtained.
   * **Private Key**: the private key previously obtained. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-6.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-7.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-8.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/mandiant-advantage-threat-intelligence/mandiant-advantage-threat-intelligence-9.png)

## Category

Threat Intelligence-Reputation

## Change Log

* April 27, 2023 (v1.0) - First Upload
* July 18, 2023 (v1.5) - Removed leading/trailing spaces
