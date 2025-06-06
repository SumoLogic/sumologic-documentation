---
title: WithSecure Elements
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/withsecure-elements.png')} alt="withsecure-elements" width="80"/>

***Version: 1.2  
Updated: Mar 4, 2024***

WithSecure Elements is a single, modular solution consisting of a complete range of cybersecurity applications that offer end-to-end enterprise and cloud coverage. The product includes our award-winning technologies for vulnerability management, patch management, endpoint protection, and endpoint detection and response. In today's unpredictable and ever-changing business environment, our all-in-one security solution helps build and ensure a resilient business.

## Actions

* **List Devices** *(Enrichment)* - For given organization retrieves devices matching all filters, that are used in query.
* **List Organizations** *(Enrichment)* - List organizations that belong to given organization (including itself, if type matches).
* **Retrieve Organization ID** *(Enrichment)* - To retrieve the Organization ID of your profile.
* **WithSecure Elements Security Events Daemon** *(Daemon)* - List security events within specified time frame for given organization in specified order.

## WithSecure Elements configuration

1. Log in to [WithSecure Elements](https://elements.withsecure.com/) technology.
1. Go on **MANAGEMENT > Client API**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-1.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="300" />
1. Click on **Add New**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-2.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="400" />
1. Add a description and click **Add**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-3.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="600" />
1. Copy and Save the **Client ID** and **Secret**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/withsecure-elements/withsecure-elements-4.png')} style={{border:'1px solid gray'}} alt="withsecure-elements" width="600" />

## Configure WithSecure Elements in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

    * **Label**. The name for the resource.
    * **URL**. The base API URL for WithSecure Elements. Default: `https://api.connect.withsecure.com/`.
    * **Client ID**. Your previously retrieved Client ID.
    * **Client Secret**. Your previously retrieved Client Secret.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/withsecure-elements-configuration.png')} style={{border:'1px solid gray'}} alt="WithSecure Elements configuration" width="400"/>

For information about WithSecure Elements, see [WithSecure Elements documentation](https://www.withsecure.com/userguides/).

## Category

Threat Intelligence-Reputation

## Change Log

* March 22, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
