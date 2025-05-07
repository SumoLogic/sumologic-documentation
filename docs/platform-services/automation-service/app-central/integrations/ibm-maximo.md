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

<IntegrationsAuth/>

   * **Host**. Host for API.
   * **Username**. Username you use to log in into the system.
   * **Password**. The password of your email.
   * Additionally, if need you to, you can populate the query daemons.

For information about IBM Maximo, see [IBM Maximo documentation](https://www.ibm.com/docs/en/mam/7.6.1).

## Change Log

* March 30, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 7, 2023 (v1.3) - Changed action type to Notification for:
	+ Create Ticket
	+ Update Ticket
