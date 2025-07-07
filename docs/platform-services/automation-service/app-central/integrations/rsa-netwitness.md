---
title: RSA NetWitness
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/rsa-netwitness.png')} alt="rsa-netwitness" width="60"/>

***Version: 1.19  
Updated: Feb 28, 2024***

Query RSA NetWitness Incidents, Events.

## Actions

* **Get list Alerts NetWitness Daemon** (*Daemon*) - Automatically get Alerts from NetWitness.
* **Retrieve Alert Details** (*Enrichment*) - Retrieve alert details for the specified NetWitness incident.
* **Retrieve Incident Details** (*Enrichment*) - Retrieve NetWitness incident details.
* **Search Incidents** (*Enrichment*) - Search NetWitness incidents.

## Configure RSA Netwitness in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your [NetWitness host](https://community.netwitness.com/s/article/HostsandServicesSetUpProcedures).

* **Port**. Enter your [NetWitness port](https://community.netwitness.com/s/article/HostsandServicesSetUpProcedures).

* **Username**. Enter the username of a NetWitness admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **Incident ID**. Enter a Netwitness [incident ID](https://community.netwitness.com/s/article/IncidentsListView).
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/rsa-netwitness-configuration.png')} style={{border:'1px solid gray'}} alt="RSA Netwitness configuration" width="400"/>

For information about Netwitness, see the [NetWitness documentation](https://community.netwitness.com/s/netwitness-platform-documentation).

## Change Log

* November 21, 2018 - First upload
* July 23, 2021 - New action added
* September 7, 2021 - Actions updated
* July 13, 2023 (v1.18)
    + Updated the integration with Environmental Variables
    + Changed fields visibility
    + Updated Daemon compatibility
* February 28, 2023 (v1.19) - Updated code for compatibility with Python 3.12
