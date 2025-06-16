---
title: IBM Maximo
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ibm-maximo.png')} alt="ibm-maximo" width="60"/>

***Version: 1.3  
Updated: Jul 07, 2023***

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

* March 30, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 7, 2023 (v1.3) - Changed action type to Notification for:
	+ Create Ticket
	+ Update Ticket
