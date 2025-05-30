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

   * **Label**. The name for the resource
   * **API URL**. The API URL 'https://us1-smax.saas.microfocus.com'.
   * **Username**. The Micro Focus account username.
   * **Password**. The Micro Focus account password.
   * **Tenant ID**. the Micro Focus tenant ID.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/micro-focus-configuration.png')} style={{border:'1px solid gray'}} alt="Micro Focus Service Management configuration" width="400"/>

For information about Micro Focus Service Management, see [Micro Focus Service Manager documentation](https://docs.microfocus.com/SM/9.61/Hybrid/Content/service_manager_doc_set_pD.htm).

## Change Log

* July 1, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
