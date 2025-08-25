---
title: RSA NetWitness Logs
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/rsa-netwitness-logs.png')} alt="rsa-netwitness-logs" width="60"/>

***Version: 1.2  
Updated: Jul 07, 2023***

Query RSA NetWitness Incidents, Events, and Logs.

## Actions

* **Query** (*Enrichment*) - Query NetWitness logs.
* **Retrieve Log Data** (*Enrichment*) - Retrieve NetWitness log data.

## Configure RSA NetWitness Logs in Automation Service and Cloud SOAR

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
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/rsa-netwitness-logs-configuration.png')} style={{border:'1px solid gray'}} alt="RSA NetWitness Logs configuration" width="400"/>

For information about NetWitness, see the [NetWitness documentation](https://community.netwitness.com/s/netwitness-platform-documentation).

## Change Log

* November 21, 2018 - First upload
* July 23, 2021 - New action added
* September 7, 2021 - Actions updated
* July 7, 2023 (v1.2) - Updated the integration with Environmental Variables
