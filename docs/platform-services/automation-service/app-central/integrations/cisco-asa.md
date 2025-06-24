---
title: Cisco ASA
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-asa.png')} alt="cisco-asa" width="70"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Get, Add and Update ACLs, Policies, and Routes with Cisco ASA.

## Actions

* **Get ACLs** (*Enrichment*) - Get Access Control List information.
* **Get Custom Policies** (*Enrichment*) - Get Custom Policy information.
* **Get Default Policies** (*Enrichment*) - Get Default Policy information.
* **Get Static Routes** (*Enrichment*) - Get all static routes.
* **Add ACLs** (*Containment*) - Add a new Access Control List.
* **Add Custom Policies** (*Containment*) - Add a new Custom Policy.
* **Update ACLs** (*Containment*) - Update an Access Control List.
* **Update Custom Policies** (*Containment*) - Update a Custom Policy.

## Configure Cisco ASA in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Cisco ASA server URL.

* **Username**. Enter the username of a Cisco ASA admin authorized to provide authentication for the integration.

* **Password**. Enter the password for the Cisco ASA admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-asa-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco ASA configuration" width="400"/>

For information about Cisco ASA, see [Cisco ASA documentation](https://www.cisco.com/c/en/us/td/docs/security/asa/roadmap/asaroadmap.html).

## Change Log

* February 26, 2019 - First upload
* July 19, 2019 - Bug Fix
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
