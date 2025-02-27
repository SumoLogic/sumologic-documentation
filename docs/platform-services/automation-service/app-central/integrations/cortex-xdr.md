---
title: Cortex XDR
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cortex-xdr.png')} alt="cortex-xdr" width="100"/>

***Version: 1.5  
Updated: Oct 15, 2024***

Query data and utilize actions in Palo Alto Networks Cortex XDR.

## Actions

* **List Endpoints** *(Enrichment)* - Gets a list of endpoints.
* **Retrieve File** *(Enrichment)* - Retrieve file from selected endpoints.
* **File Retrieval Details** *(Enrichment)* - View the File retrieved by the Get File action according to the action ID.
* **Scan All Endpoints** *(Enrichment)* - Run a scan on all endpoints.
* **Get Scan Status** *(Enrichment)* - Get a status of the scan action ID.
* **Quarantine File** *(Containment)* - Quarantine file on selected endpoint.
* **Quarantine Status** *(Enrichment)* - Retrieve the quarantine status for a selected file.
* **Restore File** *(Containment)* - Restore a quarantined file on a requested endpoints.
* **Isolate Endpoint** *(Containment)* - Isolate one endpoint.
* **Isolate Endpoint Status** *(Enrichment)* - Returns the status of the specified endpoint isolate operation.
* **List Alerts** *(Enrichment)* - Get a list of alerts with multiple events.
* **Alerts Cortex XDR Daemon** *(Daemon)* - Fetch alerts.
* **Incidents Cortex XDR Daemon** *(Daemon)* - Fetch incidents.
* **List Incidents** *(Enrichment)* - Get a list of incidents.
* **Get Incident** *(Enrichment)* - Get extra data fields of a specific incident including alerts and key artifacts.
* **Update Incident** *(Containment)* - Update one or more fields of a specific incident.

## Category

XDR

## Change Log

* July 20, 2021 - First upload
* July 19, 2022 - Incidents Cortex XDR Daemon action added
* January 27, 2023 - Integration refactored
* January 30, 2023 - Updated Daemon
    + Incidents Cortex XDR Daemon: refactored
    + Alerts Cortex XDR Daemon: refactored
* July 11, 2023 (v1.3) - Removed leading/trailing spaces
* March 4, 2024 (v1.4) - Updated code for compatibility with Python 3.12
* October 15, 2024 (v1.5) - Fixed the timeout error.
