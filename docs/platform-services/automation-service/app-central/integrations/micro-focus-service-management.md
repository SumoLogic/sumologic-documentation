---
title: Micro Focus Service Management
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/micro-focus-service-management.png')} alt="micro-focus-service-management" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

ESM SaaS is an analytics-driven enterprise service management solution that combines these key application areas: IT Service Management (ITSM), IT Asset Management (ITAM), Extended Service Management (XSM), and Universal Discovery and CMDB. ESM has fully functioning out-of-the-box processes and workflows that are ready to be used and allows for a further extension of applications via an easily extendable and fully codeless studio functionality.

## Actions

* **Micro Focus Create Incident** *(Containment)* - Create a new incident.

## Configure Micro Focus Service Management in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.
1. Populate all the required fields (\*) in the resource.
   * **Label**. The name for the resource
   * **API URL**. The API URL 'https://us1-smax.saas.microfocus.com'.
   * **Username**. The Micro Focus account username.
   * **Password**. The Micro Focus account password.
   * **Tenant ID**. the Micro Focus tenant ID.
1. Click **SAVE**. 
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/micro-focus-service-management/micro-focus-service-management-4.png')} style={{border:'1px solid gray'}} alt="micro-focus-service-management" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/micro-focus-service-management/micro-focus-service-management-5.png')} style={{border:'1px solid gray'}} alt="micro-focus-service-management" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/micro-focus-service-management/micro-focus-service-management-6.png')} style={{border:'1px solid gray'}} alt="micro-focus-service-management" width="400"/>

## Change Log

* July 1, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
