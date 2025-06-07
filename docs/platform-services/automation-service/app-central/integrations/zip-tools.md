---
title: ZIP Tools
description: ''
tags: [cloud soar integrations]
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zip-tools.png')} alt="axonius" width="70"/>

***Version: 1.2  
Updated: Nov 09, 2023***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

ZIP Tools is used to work with archives, in particular to extract and save the CSV files they contain.

## Actions

* **Unzip File** (*Custom*) - Extract from archive and save all CSV files as incident attachments.

## Configure Zip Tools in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* **Password**. Enter the Zip file password. 

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/zip-tools-configuration.png')} style={{border:'1px solid gray'}} alt="Zip Tools configuration" width="400"/>

## Change Log

* December 23, 2020 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 9, 2023 (v1.2)
	+ Changed Logo
	+ Updated integration for compatibility with new Cloud SOAR API
	+ Added Proxy options, Server certificate verification and Connection timeout config
	+ Renamed action from UnZIP File to Unzip File
	+ Added Incident ID field in action
	+ Refined labels and hints
	+ Code refactoring
