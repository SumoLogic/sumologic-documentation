---
title: LogPoint
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/logpoint.png')} alt="logpoint" width="100"/>

***Version: 1.1  
Updated: Jun 30, 2023***

Interact with LogPoint events during incident investigations.

## Actions

* **Search Into Events** (*Enrichment*) - Query LogPoint for event data.
* **Resolve Incident** (*Notification*) - Resolved an incident.
* **Get LogPoint Incidents** (*Daemon*) - Poll incidents from LogPoint.
* **Get Logs** (*Daemon*) - Retrieve specific logs from Logpoint.
* **Get Incidents Data** (*Enrichment*) - Retrieve data from specific incident

## Notes

This integration has been developed using a non-standard API that involves web scraping.

## Change Log

* September 3, 2020 - First upload
* June 30, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from LogPoint OIF to LogPoint
