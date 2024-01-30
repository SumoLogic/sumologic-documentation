---
title: Incident Tools
description: ''
tags: [cloud soar integrations]
---

![](/img/platform-services/automation-service/app-central/logos/incident-tools.png)

Version: 1.4  
Updated: Dec 14, 2023

:::sumo Cloud SOAR
This integration is for Cloud SOAR only
:::

Set of scripts to perform actions within Cloud SOAR.

## Actions

* **Add Incident Artifact** (*Custom*) - Add an artifact to an incident
* **Add Investigators** (*Custom*) - Add investigators to an incident
* **Add Note** (*Custom*) - Add a note to an incident
* **Add Users Details** (*Custom*) - Add the user details entity to an incident
* **Change Incident Folder** (*Custom*) - Change the destination folder for an incident
* **Change Incident Owner** (*Custom*) - Change the incident's owner
* **Close Incident** (*Custom*) - Set incident status to closed
* **Create Entity** (*Custom*) - Create a new entity
* **Create Incident From Template** (*Custom*) - Create a new incident from an existing incident template
* **Extract Data And Save Into Attachments** (*Custom*) - Extract data from previous action using fields path, then save as attachments as CSV, JSON or text file
* **Get Incident** (*Custom*) - Get details of the specified incident
* **List Users** (*Enrichment*) - List Users
* **Update Incident Date And Time Field** (*Custom*) - Update the date and time Incident field
* **Update Incident Description** (*Custom*) - Update an incident description
* **Update Incident Field** (*Custom*) - Update an incident field
* **Update Incident Fields** (*Custom*) - Update multiple incident fields
* **Update Incident Phase** (*Custom*) Update the incident phase

## Category

Supervised Active Intelligence Automation

## Change Log

* June 1, 2023 - First upload
* July 7, 2023 (v1.2)
	+ Updated action: Create Entity
	+ Removed leading/trailing spaces
* November 24, 2023 (v1.3)
	+ Updated action: Add User Details
		- Enabled incident artifacts feature flag for User Details field (formerly, Users)
		- Added a checkbox to allow the conversion of user details to lower case
	+ Changed API endpoint for resource testing
	+ Improved error handling
* December 14, 2023 (v1.4) - Added new action: Get Incident
