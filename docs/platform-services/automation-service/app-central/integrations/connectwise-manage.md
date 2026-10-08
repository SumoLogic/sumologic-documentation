---
title: ConnectWise Manage
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/connectwise-manage.png')} alt="ConnectWise Manage icon" width="100"/>

***Version: 1.4  
Updated: April 29, 2026***

Create, update, search, and gather ticket information from ConnectWise.

## Actions

* **List Tickets** (*Notification*) - Gather all available tickets.
* **Get Ticket** (*Notification*) - Gather information on a specific ticket.
* **Search Ticket** (*Notification*) - Search for a specific ticket.
* **Create Ticket** (*Notification*) - Create a new ticket.
* **Update Ticket** (*Notification*) - Update an existing ticket.
* **Add Notes To Ticket** (*Notification*) - Add a note to the ticket.
* **List Ticket Notes** (*Notification*) - Gather all ticket notes.

## Configure ConnectWise Manage in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the API URL for your ConnectWise Manage instance, for example, `api-au.myconnectwise.net`, `api-eu.myconnectwise.net`, `api-na.myconnectwise.net`, or `api-staging.connectwisedev.com`.

* **Company Name**. Enter your ConnectWise Manage company name.

* **Public Key**. Enter a ConnectWise Manage public key.

* **Private Key**. Enter a ConnectWise Manage private key.

* **Client ID**. Enter a ConnectWise Manage client ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/connectwise/connectwise-configuration.png')} style={{border:'1px solid gray'}} alt="Connectwise Manage configuration" width="400"/>

For information about ConnectWise Manage, see the [ConnectWise website](https://www.connectwise.com/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | October 29, 2024 | Beta release. Added the **Priority** field to the **Create Ticket** and **Update Ticket** actions. |
| v1.2 | September 4, 2023 | <ul><li>Refactored the integration.</li><li>Renamed the **Get Tickets** action to **List Tickets**.</li><li>Added new actions: **Add Notes To Ticket** and **List Ticket Notes**.</li><li>Removed the **Get Tickets Daemon**.</li></ul> |
| v1.1 | July 11, 2023 | Updated the integration with Environmental Variables. |
| | September 17, 2019 | Initial release of the ConnectWise Manage integration. |
