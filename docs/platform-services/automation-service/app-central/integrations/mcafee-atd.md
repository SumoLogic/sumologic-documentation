---
title: McAfee ATD
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-atd.png')} alt="mcafee-atd" width="100"/>

***Version: 1.2  
Updated: Jul 12, 2023***

Utilize McAfee Advanced Threat Defenseto gather file reputation and enrichment details.

## Actions

* **Detonate Report** (*Enrichment*) - Get the detonation report for the specified file.
* **Detonate File** (*Enrichment*) - Detonate the specified file.
* **File Reputation** (*Enrichment*) - Get the file reputation report for the specified file.
* **Get Analyzer Profiles** (*Enrichment*) - Get all analyzer profiles.

## Configure McAfee ATD in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the URL of your McAfee ATD instance.

* **Username**. Enter the username of a McAfee ATD admin user authorized to authenticate the integration.

* **Password**. Enter the admin user password.

* **Detonate timeout in minutes**. Set the maximum amount of time the integration will wait for a server's response before terminating the connection. Enter the connection timeout time in minutes (for example, `3`).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mcafee-atd-configuration.png')} style={{border:'1px solid gray'}} alt="McAfee ATD configuration" width="400"/>

For information about McAfee ATD, see [McAfee Advanced Threat Defense documentation](https://docs.trellix.com/bundle/advanced-threat-defense-4.14.x-product-guide/page/GUID-21B474DF-8D65-4785-B99E-0B6B0EC82D36.html).

## Change Log

* May 22, 2020 - First upload
* July 12, 2023 (v1.2) - Changed field visibility
