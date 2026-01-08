---
title: Cofense
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cofense.png')} alt="cofense" width="70"/>

***Version: 1.3  
Updated: Oct 09, 2023***

Search Cofense for Threats and download Threat Reports.

## Actions

* **Get Report** (*Enrichment*) - Get a Threat Report and attach it to the Cloud SOAR incident.
* **Search Threats** (*Enrichment*) - Search Threats based on the specified parameters.

## Configure Cofense in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API User Name**. Enter the username of the API user authorized to authenticate the integration.

* **API Password**. Enter the password associated with the API user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cofense/cofense-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Cofense configuration" width="400"/>

For information about Cofense, see the [Cofense website](https://cofense.com/).

## Change Log

* January 10, 2019 - First upload
* July 19, 2023 (v1.1) - Updated the integration with Environmental Variables
* October 6, 2023 (v1.2) - Changed fields visibility
* October 9, 2023 (v1.3) - Removed unnecessary params
