---
title: Triage Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/triage-tools.png')} alt="urlscan.io" width="100"/>

***Version: 1.1  
Updated: Nov 07, 2023***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Set of scripts to perform actions within Cloud SOAR.

## Actions

* **Add Attachment to Triage** *(Custom)* - Add attachment to existing triage event.
* **Convert Triage to Incident** *(Custom)* - Convert triage event to incident.
* **Discard Triage Event** *(Custom)* - Discard triage event.
* **Get Attachment Data** *(Enrichment)* - Retrieve base64 content of an attachment.
* **Grab or Reassign Triage Event** *(Custom)* - Grabs or reassign triage event.
* **List Triage Attachments** *(Enrichment)* - Retrieve a list with triage attachments.
* **List Triage Columns** *(Enrichment)* - Retrieve a list of columns to use in search.
* **List Triage Events** *(Enrichment)* - Retrieve a list with triage events.
* **List Users** *(Enrichment)* - Retrieve a list of users.
* **Query Triage Events** *(Enrichment)* - Query triage events by columns.
* **Update Triage Field** *(Custom)* - Update/edit triage event field.
* **Update Triage Fields** *(Custom)* - Update/edit multiple triage event fields.

## Category

Internal

## Configure Triage Tools Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* November 30, 2021 - First upload
* December 7, 2022 - Added new action: Update Triage Fields
* November 7, 2023
	+ Updated the integration with Environmental Variables
	+ Compatibility with new Cloud SOAR API
	+ Changed docker to python3\_generic
	+ Added Proxy options, Server certificate verification and Connection timeout config
	+ Refined labels and hints
	+ Improved error handling
	+ Added table view for List Triage Events
	+ Refined table view for List Triage Columns
	+ Added default values for Update Triage Fields
	+ Refined output mappings with some examples
	+ Removed trailing/leading spaces
	+ Renamed actions:
		- Add Attachment To Triage renamed to Add Attachment to Triage
		- Convert Triage To Incident renamed to Convert Triage to Incident
		- Grab Or Reassign Triage Event renamed to Grab or Reassign Triage Event
	+ Added new action: List Users
