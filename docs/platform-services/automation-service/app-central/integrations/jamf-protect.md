---
title: Jamf Protect
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/jamf-protect.png')} alt="jamf-protect" width="90"/>

***Version: 1.1  
Updated: Jun 15, 2023***

**Jamf Protect** is a purpose-built endpoint security and mobile threat defense (MTD) for Mac and mobile devices.

## Actions

* **List Alerts** (*Enrichment*) - List alerts with possibility to filter alerts created over specified time.
* **List Computers** (*Enrichment*) - Retrieve a list of all computers.
* **List Plans** (*Enrichment*) - Retrieve a list of plans.
* **Set Computer Plan** (*Containment*) - Set a computer plan.
* **Update Alerts Status** (*Containment)* - Update alert status.
* **Get Alerts** (*Daemon*) - Get new alerts. Rule should be set Process from First Item . The first time the Daemon is run it will return alerts from one day before.

## Jamf Protect configuration

1. Log in to Jamf Protect.
2. Click on Administrative on the left menu.
3. Select [Create API Client](https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/Jamf_Protect_API.html) and click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/jamf-protect/jamf-protect-1.png')} style={{border:'1px solid gray'}} alt="jamf-protect" width="800"/>
4. Copy the API Client Password.
5. Copy the Client ID in API Client Configuration

## Configure Jamf Protect in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Jamf Protect [API URL](https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/Jamf_Protect_API.html), for example, `https://your-tenant.protect.jamfcloud.com`

* **Client ID**. Insert the Jamf Protect [Client ID](https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/Jamf_Protect_API.html) that you [copied earlier](#jamf-protect-configuration).

* **Password**. Insert the password you [copied earlier](#jamf-protect-configuration).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>


   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/jamf-protect-configuration.png')} style={{border:'1px solid gray'}} alt="Jamf Protect configuration" width="400"/>

For information about Jamf Protect, see [Jamf Protect documentation](https://www.jamf.com/resources/product-documentation/jamf-protect-administrators-guide/).

## Change Log

* February 2, 2023 - First upload
* June 15, 2023 (v1.1)- Updated the integration with Environmental Variables
