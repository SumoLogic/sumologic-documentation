---
title: OpenText EnCase Endpoint Security
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/opentext-encase-endpoint-security.png')} alt="opentext-encase-endpoint-security" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Collect evidence, create events and investigations, and issue containment actions with EnCase Endpoint Security.

## Actions

* **Collect Data** (*Enrichment*) - Collect data from an endpoint as evidence during an investigation.
* **Collect Memory** (*Enrichment*) - Collect memory from an endpoint as evidence during an investigation.
* **Collect Timeline** (*Enrichment*) - Collect a timeline of events from an endpoint as evidence during an investigation.
* **Find Items of Interest** (*Enrichment*) - Search for items of interest to an investigation.
* **List Investigations** (*Enrichment*) -Gather a list of all investigations.
* **Create Event** (*Notification*) - Create a new event.
* **Create Investigation** (*Notification*) - Create a new investigation.
* **Create Snapshot** (*Containment*) - Create a new snapshot.
* **Ban Hash** (*Containment*) - Ban a file.
* **Quarantine** (*Containment*) - Quarantine a host.

## Configure OpenText EnCase Endpoint Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Protocol**. Select **HTTP** or **HTTPS** for the protocol to use.

* **IP/Hostname**. Enter your OpenText EnCase host address.

* **Port**. Enter your OpenText EnCase port.

* **API Key**. Enter an OpenText EnCase API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/opentext-configuration.png')} style={{border:'1px solid gray'}} alt="OpenText EnCase Endpoint Security configuration" width="400"/>

For information about OpenText EnCase Endpoint Security, see the [OpenText documentation](https://docs.microfocus.com/).

## Change Log

* October 3, 2019 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
