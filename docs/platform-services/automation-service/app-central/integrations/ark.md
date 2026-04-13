---
title: ARK
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ark-logo.png')} alt="ARK icon" width="120"/>

***Version: 1.4  
Updated: April 13, 2026***

The ARK integration enables automated interaction with incident data and relationships within the platform. It supports actions such as retrieving parent incidents to help streamline investigation workflows and improve incident visibility.

## Actions

* **Get Parents For Incident** (*Enrichment*) - Retrieves parent incidents for a given incident..

## Configure F5 AS3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your ARK URL.

* **Port**. Enter the Port.

* **Cloud SOAR URL**. Enter the Cloud SOAR URL.
* **Cloud SOAR User JWT Token**. Enter the Cloud SOAR URL.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ark-configuration.png')} style={{border:'1px solid gray'}} alt="ARK configuration" width="400"/>


## Change Log

* April 13, 2026 (v1.4) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
