---
title: Freshservice
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/freshservice.png')} alt="freshservice" width="80"/>

***Version: 1.5  
Updated: Jul 11, 2023***

Freshservice is a cloud-based IT Help Desk and service management solution that enables organizations to simplify their IT operations. The solution offers features that include a ticketing system, self-service portal, and knowledge-base.

## Actions

* **Create Ticket** *(Notification)* - Create a new ticket in your service desk.
* **Get Tickets** *(Enrichment)* - List all tickets with filter options.
* **View Ticket** *(Enrichment)* - View details of a ticket.
* **Update Ticket** *(Notification)* - Change the parameters of a ticket.
* **Delete Ticket** *(Containment)* - Delete an existing ticket.
* **Add Reply** *(Notification)* - Add a replay to a conversation.
* **Get Agents** *(Enrichment)* - View information about all agents in the account.
* **Get Requesters** *(Enrichment)* - Get a list of all requesters in the account.
* **Get Ticket Conversations** *(Enrichment)* - Get all conversations of a Ticket.
* **Create Note** *(Notification)* - Add a new note to a ticket.
* **Get Groups** *(Enrichment)* - Get a list of all available groups.
* **List Canned Response Folders** *(Enrichment)* - List all the Canned Response Folders that are present in the account.
* **Get Canned Response Folder** *(Enrichment)* - Show a Canned Response Folder.
* **Show Canned Response** *(Enrichment)* - Show a specific Canned Response.
* **Get Canned Responses In Folder** *(Enrichment)* - Lists all the Canned Responses that are present in the folder.
* **Freshservice Tickets Daemon** *(Enrichment) -* Automatically retrieves new tickets. If the value for updated since is not populated, it will return the tickets updated since 30 days before.

## Freshservice configuration

1. Login to your Freshservice Support Portal.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-1.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. Go to Profile settings Page. Your API key will be available below the change password section to your right. Copy the API KEY.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-2.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 

## Freshservice in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-3.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-4.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-5.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. Populate all the required fields (\*) then click **SAVE SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-6.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-7.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-8.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/freshservice/freshservice-9.png')} style={{border:'1px solid gray'}} alt="freshservice" width="400"/> 

## Category

Ticketing System

## Change Log

* April 4, 2022 - First upload
* June 24, 2022 - Daemon action added
* June 29, 2022
	+ Added new action: Freshservice Tickets Daemon
	+ Updated action: Get Tickets
* March 22, 2023 (v1.4)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* July 11, 2023 (v1.5) - Removed leading/trailing spaces
