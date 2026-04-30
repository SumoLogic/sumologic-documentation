---
title: Tufin SecureChange
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/tufin-securechange.png')} alt="threatq" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

The Tufin SecureChange platform helps you to automates the process of changing security policies in hybrid network environments.

## Actions

* **Search Applications** *(Enrichment)* - List all applications.
* **Search Application Connections** *(Enrichment)* - Retrieve existing connection.
* **Get Connections Extended** *(Enrichment)* - Retrieve existing connections, with extended resources information.

## Configure Tufin SecureChange in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your [Tufin SecureChange API URL](https://forum.tufin.com/support/kc/latest/Content/Suite/RESTAPI/4423.htm).

* **Username**. Enter the username of a Tufin SecureChange admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/tufin-securechange-configuration.png')} style={{border:'1px solid gray'}} alt="Tufin SecureChange configuration" width="400"/>

For information about Tufin SecureChange, see [Tufin SecureChange documentation](https://forum.tufin.com/support/kc/latest/Content/Suite/856.htm).

## Change Log

* May 8, 2023 (v1.0) - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
