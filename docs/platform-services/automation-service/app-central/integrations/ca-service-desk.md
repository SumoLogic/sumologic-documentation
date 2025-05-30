---
title: CA Service Desk
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ca-service-desk.png')} alt="axonius" width="50"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Work with Resources within CA Service Desk.

## Actions

* **Add Resource** (*Enrichment*) - Add a new resource.
* **Authorize** (*Enrichment*) - Authorize Cloud SOAR for CA Service Desk. **This should only be run once and not from a Playbook**.
* **Edit Resource** (*Enrichment*) - Edit an existing resource.
* **Get Resource** (*Enrichment*) - Get resource information.
* **Search Resource** (*Enrichment*) - Search resources.
* **Delete a Resource** (*Containment*) - Delete a resource.

## Configure CA Service Desk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ca-service-desk/ca-service-desk-configuration.png')} style={{border:'1px solid gray'}} alt="CA Service Desk configuration" width="400"/>

For information about CA Service Desk, see [CA Service Management documentation](https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/ca-service-management/17-4.html).

## Change Log

* February 14, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
