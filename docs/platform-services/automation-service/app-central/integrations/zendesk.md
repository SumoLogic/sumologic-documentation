---
title: Zendesk
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zendesk.png')} alt="axonius" width="100"/>

***Version: 1.4  
Updated: March 21, 2024***

Zendesk enhances customer service security with advanced encryption and access controls to safeguard interactions.
This integration streamlines ticket lifecycle management, from creation to restoration, and enriches user engagement with comprehensive data retrieval.

## Actions

* **Create Ticket** *(Notification)* - Creates a new ticket.
* **Delete Ticket** *(Containment)* - Delete a ticket by ID.
* **Get Ticket Details** *(Enrichment)* - Retrieve information about an existing ticket by ID.
* **List Tickets** *(Enrichment)* - Fetch a detailed list with all tickets.
* **List Users** *(Enrichment)* - Fetch a detailed list with all users.
* **Restore Deleted Ticket** *(Containment)* - Restore previously deleted ticket by ID.
* **Update Ticket** *(Notification)* - Update an existing ticket by ID.

## Zendesk configuration

This integration supports two primary authentication methods:

* Username and API Token - For instructions on setting up authentication using a username and API token, please refer to [Managing API token access to the API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_tcb_fk1_2yb).
* Username and Password - To configure authentication with a username and password, follow the steps outlined in [Managing password access to the API](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_zbv_ck1_2yb).

Please ensure that you consult the corresponding guide to activate the API and generate the necessary credentials for your chosen method of authentication.

## Configure Zendesk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* June 17, 2021 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 21, 2023 (v1.2) - Changed Ticket and Update Ticket actions type to Notification
* July 6, 2023 (v1.3)
    + Updated Actions - Create Ticket & Update Ticket
* March 21, 2024 (v1.4)
    + Changed "Description" field type to textarea in "Create Ticket" action
    + Changed "Comment" field type to textarea in "Update Ticket" action
