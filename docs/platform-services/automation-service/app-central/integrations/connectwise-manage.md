---
title: ConnectWise Manage
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/connectwise-manage.png')} alt="connectwise-manage" width="100"/>

***Version: 1.3  
Updated: Oct 29, 2024***

Create, update, search, and gather ticket information from ConnectWise.

## Actions

* **List Tickets** (*Notification*) - Gather all available tickets.
* **Get Ticket** (*Notification*) - Gather information on a specific ticket.
* **Search Ticket** (*Notification*) - Search for a specific ticket.
* **Create Ticket** (*Notification*) - Create a new ticket.
* **Update Ticket** (*Notification*) - Update an existing ticket.
* **Add Notes To Ticket** (*Notification*) - Add a note to the ticket.
* **List Ticket Notes** (*Notification*) - Gather all ticket notes.

## Change Log

* September 17, 2019 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.2)
	+ integration refactored
	+ renamed Get Tickets action to List Tickets
	+ added new actions: Add Notes To Ticket, List Ticket Notes
	+ removed Get Tickets Daemon
* October 29, 2024 (v1.3) Beta Release
    + Added the "Priority" field to the Create Ticket and Update Ticket actions.