---
title: FreshDesk
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/freshdesk.png')} alt="freshdesk" width="100"/>

***Version: 1.1  
Updated: Jun 30, 2023***

Interact with FreshDesk contacts and tickets.

## Actions

* **Get All Agents** (*Enrichment*) - Gather a list of all available agents.
* **List Canned Response Folders** (*Enrichment*) - Gather a list of canned response folders.
* **Get Canned Response In Folder** (*Enrichment*) - Gather information from a specific canned response folder.
* **Get All Contacts** (*Enrichment*) - Gather a list of all available contacts.
* **Get Groups** (*Enrichment*) - Gather a list of all available groups.
* **Get Ticket Conversations** (*Enrichment*) - Get a specific ticket conversation.
* **View Ticket** (*Enrichment*) - View details of a specific ticket.
* **Get All Tickets** (*Enrichment*) - Get all tickets.
* **Add Reply** (*Containment*) - Add a replay to an existing conversation.
* **Create Note** (*Containment*) - Create a new note.
* **Create Ticket On FreshDesk** (*Containment*) - Create a new ticket in FreshDesk.
* **Create Ticket With Attachment** (*Containment*) - Create a new ticket with an attachment.
* **Delete Ticket** (*Containment*) - Delete an existing ticket.
* **Update Ticket On FreshDesk** (*Containment*) - Update a specific ticket in FreshDesk.

## Configure FreshDesk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/freshdesk-configuration.png')} style={{border:'1px solid gray'}} alt="FreshDesk configuration" width="400"/>

For information about FreshDesk, see [FreshDesk documentation](https://developers.freshdesk.com/).

## Change Log

* March 20, 2020 - First upload
* April 21, 2022 - New logo
* June 30, 2023 (v1.1) - Updated the integration with Environmental Variables
