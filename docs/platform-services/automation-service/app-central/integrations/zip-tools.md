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

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | November 9, 2023 | <ul><li>Changed the logo.</li><li>Updated the integration for compatibility with the new Cloud SOAR API.</li><li>Added Proxy options, Server certificate verification, and Connection timeout config.</li><li>Renamed the **UnZIP File** action to **Unzip File**.</li><li>Added an Incident ID field to the action.</li><li>Refined labels and hints.</li><li>Refactored the code.</li></ul> |
| v1.1 | July 18, 2023 | Updated the integration with Environmental Variables. |
| | December 23, 2020 | Initial release of the ZIP Tools integration. |
