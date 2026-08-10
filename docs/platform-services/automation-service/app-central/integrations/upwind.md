---
title: Upwind
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/upwind.png')} alt="Upwind icon" width="80"/>

***Version: 1.0  
Updated: Apr 01, 2026***

Upwind secures your cloud deployments, configurations, and applications through a runtime fabric that provides real-time visibility from the inside out.

## Actions

* **Fetch Vulnerabilities** (*Enrichment*) - Fetch the vulnerabilities of Upwind.
* **Get Assets** (*Enrichment*) - Get the assets related Upwind.
* **List Detections** (*Enrichment*) - Retrieve the list of detections related to Upwind.
* **Update Detections** (*Containment*) - Update the status of a specific detection.

## Configure Upwind in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [Upwind API URL](https://docs.upwind.io/public/getting-started/install-sensor/host/troubleshooting?_highlight=api.upwind.io#check-firewall-and-networking), for example, `https://api.upwind.io`.

* **Client ID**. Enter your client ID, which is the unique identifier for your Upwind application. You can find this in your Upwind account settings or application dashboard.
* **Client Secret**. Enter your client secret, which is a confidential key used to authenticate your application with Upwind. This can also be found in your Upwind account settings or application dashboard.
* **Org ID**. Enter your organization ID, which is a unique identifier for your organization in Upwind. You can find this in your Upwind account settings or organization dashboard.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/upwind-configuration.png')} style={{border:'1px solid gray'}} alt="Upwind configuration" width="400"/>

For information about Upwind, see [Upwind documentation](https://docs.upwind.io/restapi/v1/introduction).

## Change Log

* April 1, 2026 - First upload

