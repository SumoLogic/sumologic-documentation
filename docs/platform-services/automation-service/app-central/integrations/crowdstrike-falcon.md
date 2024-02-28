---
title: CrowdStrike Falcon
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon.png')} alt="crowdstrike-falcon" width="100"/>

***Version: 1.8  
Updated: Jul 12, 2023***

CrowdStrike Falcon integration allows to pull Detections, Incidents, searching Incidents/Devices/Detections, and updating Detections/Incidents.

## Actions

* **Detections CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Detections.
* **Incidents CrowdStrike Falcon Daemon** *(Daemon)* - Daemon to pull CrowdStrike Incidents.
* **Search into Detections** *(Enrichment)* - Search for Detections that match a given query.
* **Search into Incidents** *(Enrichment)* - Search for incidents by providing an FQL filter, sorting, and paging details.
* **List Endpoints** *(Enrichment)* - Search for hosts in your environment by platform, hostname, IP.
* **Update Detections** *(Containment)* - Modify the state or assignee of Detections.
* **Close CrowdStrike Incident** *(Containment)* - Close the state of the CrowdStrike Incident.
* **Get Endpoint** *(Enrichment)* - Get details on one or more hosts by providing agent IDs.
* **Get Incident Info** *(Enrichment)* - Get details for a specific Crowdstrike Incident.
* **Get User ID By Mail** *(Enrichment)* - Search for a specific User ID with a given email address.
* **Device Actions** *(Containment)* - Take various actions on the hosts in your environment.
* **Get Browser History** *(Enrichment)* - Get user Browser history.

## Category

EDR

## Change Log

* June 3, 2021 - First upload
* July 8, 2022 - Added new action
	+ Device Actions
* November 10, 2022 - Added new action:
	+ Get Browser History
* January 31, 2020 - Action updated: Get Report Summary
* December 30, 2022 - Action updated
	+ Detections CrowdStrike Falcon Daemon (Added FQL-based filter and Pagination to Daemon)
* February 17, 2023 - Refactoring
* February 23, 2023 (v1.3)
	+ List Endpoints: Updated API Endpoint
	+ Incidents CrowdStrike Falcon Daemon: Duplicate Removed
* March 7, 2023 (v1.4)
	+ List Endpoints: Updated Fields Hints
* March 21, 2023 (v1.5) - Logo updated
* July 12, 2023 (v1.8) - Changed fields visibility
