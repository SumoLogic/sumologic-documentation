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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Micro Focus API [URL](https://docs.microfocus.com/SM/9.61/Hybrid/Content/integrations/case_exchange/concepts/iip_general.htm?Highlight=%22tenant%20ID%22), for example, `https://us1-smax.saas.microfocus.com`

* **Username**. Enter the username of a Micro Focus account user authorized to authenticate the integration.

* **Password**. Enter the admin user password. 

* **Tenant ID**. Enter your Micro Focus [tenant ID](https://docs.microfocus.com/SM/9.61/Hybrid/Content/integrations/case_exchange/concepts/iip_general.htm?Highlight=%22tenant%20ID%22).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/micro-focus-configuration.png')} style={{border:'1px solid gray'}} alt="Micro Focus Service Management configuration" width="400"/>

For information about Micro Focus Service Management, see [Micro Focus Service Manager documentation](https://docs.microfocus.com/SM/9.61/Hybrid/Content/service_manager_doc_set_pD.htm).

## Change Log

* July 1, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
