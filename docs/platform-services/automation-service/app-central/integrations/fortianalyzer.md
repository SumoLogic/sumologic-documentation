---
title: FortiAnalyzer
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortianalyzer.png')} alt="fortianalyzer" width="100"/>

***Version: 1.5  
Updated: Mar 4, 2024***

Search events and network traffic from Fortinet FortiAnalyzer.

## Actions

* **Search Into Events** (*Enrichment*) - Search FortiAnalyzer based on the specified criteria.
* **Get Alert Events** (*Enrichment*) - Get alerts based on specific event criteria.
* **Get Alert Event Logs** (*Enrichment*) - Get event logs based on the specified criteria.
* **Search Network Traffic** (*Enrichment*) - Search network traffic based on specific criteria.
* **List Incidents** (*Enrichment*) - List previously generated incidents.
* **Create Incident** (*Notification*) - Create new incident.
* **Update Incident** (*Notification*) - Update a previously created incident.
* **Get Alerts Events Daemon** (*Daemon*) - Daemon to pull FortiAnalyzer Alert Events.
* **Get Alert Events Daemon V2** *(Daemon*) - Daemon to pull FortiAnalyzer Alert Events.

## Change Log

* June 19, 2019 - First upload
* May 29, 2020 - New action added
* July 21, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.4) - Versioning
* March 4, 2024 (v1.5) - Updated code for compatibility with Python 3.12
