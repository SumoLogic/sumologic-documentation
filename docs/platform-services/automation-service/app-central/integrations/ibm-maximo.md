---
title: IBM Maximo
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ibm-maximo.png')} alt="IBM Maximo icon" width="60"/>

***Version: 1.4  
Updated: April 29, 2026***

The IBM Maximo is a single, integrated cloud-based platform that uses AI, IoT and analytics to optimize performance, extend asset lifecycles, and reduce operational downtime and costs.

## Actions

* **Get Ticket Details** (*Enrichment*) - Get details about a ticket by ticket unique ID (uid).
* **Create Ticket** (*Notification*) - Create a ticket.
* **Update Ticket** (Notification) - Update an existing ticket by ticket unique ID (uid).
* **Close Ticket** (*Containment*) - Close ticket by ticket unique ID (uid).
* **List Tickets** (*Enrichment*) - Retrieve a list of tickets, filtering is possible by providing filter key/value pair.

## Configure IBM Maximo in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the [hostname](https://www.ibm.com/docs/en/masv-and-l/cd?topic=installing-setting-up-maximo-application-suite) for the API.

* **Port**. Enter the port for your IBM Maximo instance.

* **Username**. Enter the username of an IBM Maximo admin user who logs into the system.

* **Password**. Enter the password of the admin user.
   
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

:::note
Additionally, if need you to, you can populate the [query](https://www.ibm.com/docs/en/maximo-anywhere/7.6.2?topic=queries-creating-in-maximo-asset-management) daemons.
:::

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ibm-maximo-configuration.png')} style={{border:'1px solid gray'}} alt="IBM Maximo configuration" width="400"/>

For information about IBM Maximo, see [IBM Maximo documentation](https://www.ibm.com/docs/en/mam/7.6.1).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | July 7, 2023 | Changed the action type to Notification for the **Create Ticket** and **Update Ticket** actions. |
| v1.1 | July 6, 2023 | Updated the integration with Environmental Variables. |
| | March 30, 2022 | Initial release of the IBM Maximo integration. |
