---
title: Forescout eyeSight
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/forescout-eyesight.png')} alt="forescout-eyesight" width="80"/>

***Version: 1.2  
Updated: Jul 18, 2023***

Discovers every IP-connected device, auto-classifies it, and assesses its compliance posture and risk the instant a device connects to the network.

## Actions

* **List Hosts** *(Enrichment)* - Retrieve all hosts.
* **Get Host** *(Enrichment)* - Get host info by Host ID/ Mac Address or IP Address.
* **Get Host Fields***(Enrichment)* - Get all host fields.
* **List Policies** *(Enrichment)* - Get all policies.

## Forescout eyeSight configuration

To configure Web API follow this [link](https://docs.forescout.com/bundle/web-api-1-5-3-h/page/web-api-1-5-3-h.Configure-Web-API-Plugin.html) or contact **Forescout eyeSight** team for more information on configuration.

## Configure Forescout eyeSight in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Enterprise Manager IP**. Enter your Forescout eyeSight IP address.

* **User**. Enter the username of a Forescout admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/forescout-eyesight-configuration.png')} style={{border:'1px solid gray'}} alt="Forescout eyeSight configuration" width="400"/>

For information about Forescout eyeSight, see [Forescout documentation](https://docs.forescout.com/).

## Change Log

* October 17, 2022 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring
