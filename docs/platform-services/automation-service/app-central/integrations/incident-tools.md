---
title: Incident Tools
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/incident-tools.png')} alt="incident-tools" width="100"/>

***Version: 1.8  
Updated: June 24, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Set of scripts to perform actions within Cloud SOAR.

## Actions

* **Add Entity Threat Indicator** (*Custom*) - Mark an Entity with a predefined tag used for classification.
* **Add External Alert to Incident** (*Custom*) - Enrich the incident with external alert data.
* **Add Incident Artifact** (*Custom*) - Add an artifact to an incident.
* **Add Investigators** (*Custom*) - Add investigators to an incident.
* **Add Note** (*Custom*) - Add a note to an incident.
* **Add Users Details** (*Custom*) - Add the user details entity to an incident.
* **Change Incident Folder** (*Custom*) - Change the destination folder for an incident.
* **Change Incident Owner** (*Custom*) - Change the incident's owner.
* **Close Incident** (*Custom*) - Set incident status to closed.
* **Create Entity** (*Custom*) - Create a new entity.
* **Create Incident From Template** (*Custom*) - Create a new incident from an existing incident template.
* **Extract Data And Save Into Attachments** (*Custom*) - Extract data from previous action using fields path, then save as attachments as CSV, JSON or text file.
* **Get Entity** (*Custom*) - Get details about the provided Entity.
* **Get Incident Owner** (*Custom*) - Get the owner of the provided incident.
* **Get Incident** (*Custom*) - Get details of the specified incident.
* **Get War Room Timeline** (*Custom*) - Get the War Room timeline in JSON format for the incident.
* **Incident Daemon** (*Daemon*) - Create an incident.
* **List Entity Incidents** (*Custom*) - List all incidents where the entity is involved in
* **List External Alerts** (*Custom*) - List all external alerts associated with the incident.
* **List Incident Columns** (*Custom*) - List all incident fields.
* **List Users** (*Enrichment*) - List Users.
* **Search Entities** (*Custom*) - Search for Entities.
* **Search Incidents** (*Custom*) - Search for Incidents.
* **Update Entity** (*Custom*) - Update the tags and/or the description of the Entity.
* **Update Incident Date And Time Field** (*Custom*) - Update the date and time Incident field.
* **Update Incident Description** (*Custom*) - Update an incident description.
* **Update Incident Field** (*Custom*) - Update an incident field.
* **Update Incident Fields** (*Custom*) - Update multiple incident fields.
* **Update Incident Phase** (*Custom*) Update the incident phase.

## Category

Supervised Active Intelligence Automation

## Configure Incident Tools in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

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
* February 13, 2024 (v1.5) - Fixed typo in the following actions
    + Update Incident Date And Time Field
    + Update Incident Description
    + Update Incident Field
    + Update Incident Fields
* March 4, 2024 (v1.6) - Updated code for compatibility with Python 3.12
* June 4, 2024 (v1.7) 
  * New actions:
    * Add Entity Threat Indicator
    * Add External Alert to Incident
    * Get Entity
    * Get Incident Owner
    * Get War Room Timeline
    * Incident Daemon
    * List Entity Incidents
    * List External Alerts
    * List Incident Columns
    * Search Entities
    * Search Incidents
    * Update Entity
* June 24, 2024 (v1.8) - The **Field ID** and **Field Value** fields are now optional in the **Update Incident Fields** action.
