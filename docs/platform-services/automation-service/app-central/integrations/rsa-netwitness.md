---
title: RSA NetWitness
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/rsa-netwitness.png')} alt="RSA NetWitness icon" width="60"/>

***Version: 1.20  
Updated: April 30, 2026***

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

| Version | Date | Description |
|:--|:--|:--|
| v1.20 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.19 | February 28, 2023 | Updated code for compatibility with Python 3.12. |
| v1.18 | July 13, 2023 | <ul><li>Updated the integration with Environmental Variables.</li><li>Changed fields visibility.</li><li>Updated Daemon compatibility.</li></ul> |
| v1.17 | September 7, 2021 | Updated actions. |
| v1.16 | July 23, 2021 | Added a new action. |
| v1.15 | November 21, 2018 | Initial release of the RSA NetWitness integration. |
