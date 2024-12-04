---
title: Microsoft Sentinel
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-sentinel.png')} alt="microsoft-sentinel" width="100"/>

***Version: 1.6  
Updated: Oct 29, 2024***

Microsoft Sentinel is a cloud-native security information and event manager (SIEM) platform that uses built-in AI to help analyze large volumes of data across an enterprise. 

## Actions

* **List Incident Comments** (*Enrichment*) - Gather all comments for a specific incident.
* **Get Incident** (*Enrichment*) - Get a specific incident.
* **List Incidents** (*Enrichment*) - Get a list of all incidents.
* **Search Into Sentinel Events** (*Enrichment*) - Query into a Sentinel event.
* **List Incident Entities** (*Enrichment*) - Get all incident related entities.
* **List Incident Entities V2** (*Enrichment*) - Get all incident related entities and enrich Sentinel entities with additional information to Cloud SOAR entities.
* **Add Incident Comment** (*Containment*) - Add a new incident comment.
* **Delete Incident** (*Containment*) - Delete an incident.
* **Update Incident** (*Containment*) - Update an incident.
* **Microsoft Sentinel Incidents Daemon** (*Daemon*) - Automatically pull all Sentinel incidents.

## Change Log

* September 2, 2020 - First upload
* June 8, 2022 - Updated actions: added "Scope" field
* July 11, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3)
	+ integration refactored
	+ removed Alerts Daemon Sentinel (replaced by Microsoft Graph Security Alerts Daemon, in Graph Security integration)
	+ renamed action Get Entities to List Incident Entities
	+ renamed action Get Incident Comments to List Incident Comments
	+ renamed action Get Incidents to List Incidents
	+ renamed action Incidents Daemon Sentinel to Microsoft Sentinel Incidents Daemon
	+ added new action List Incident Alerts
* October 14, 2024 (v1.4)
	+ Updated the integration by adding two new fields (**API Root** and **Login Endpoint**) to the configuration
+ October 22, 2024 (v1.5)
	+ Added new action **List Incident Entities V2**
    + Updated the integration by adding new fields (**Cloud SOAR URL API URL**, **Access ID** , **Access Key**) to the configuration
+ October 29, 2024 (v1.6)
	+ Updated **List Incident Entities V2** action in the output field.
    