---
title: Flowmon
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/flowmon.png')} alt="flowmon" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Network performance monitoring and network security products, Flowmon is utilizing information from traffic flow.

## Actions

* **Flows** *(Enrichment)* - Get a list of flows with a few parameters (from, to, profile, channels, etc).
* **List Of Alerts** *(Enrichment)* - Get a list of alerts.
* **Get Alert** *(Enrichment)* - Gets specific alert object.

## Configure Flowmon in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the hostname for your Flowmon instance. 

* **Username**. Enter the username of a Flowmon admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **Client ID**. Enter a Flowmon client ID.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/flowmon-configuration.png')} style={{border:'1px solid gray'}} alt="Flowmon configuration" width="400"/>

For information about Flowmon, see [Flowmon documentation](https://docs.progress.com/category/flowmon-os).

## Change Log

* November 8, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
