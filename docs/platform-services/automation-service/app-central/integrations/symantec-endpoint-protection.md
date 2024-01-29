---
title: Symantec Endpoint Protection
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/symantec-endpoint-protection.png)

Version: 1.1  
Updated: Jul 07, 2023

Work with Symantec Endpoint Protection groups and events and issue containment actions during an active incident.

## Actions

* **Get Command Status** (*Enrichment*) - Check the status of a previously issued command
* **Get Critical Events** (*Enrichment*) - Gather details on critical events
* **Get Group Info** (*Enrichment*) - Gather information on a specified group
* **List Group Endpoints** (*Enrichment*) - List all endpoints for a specific group
* **Scan File** (*Enrichment*) - Scan a suspicious file found on an endpoint
* **List Groups** (*Enrichment*) - Gather a list of all available groups
* **Run Full Scan** *(Enrichment)* - Sends a command from Symantec Endpoint Protection Manager to Symantec Endpoint Protection endpoints to request a full scan on the endpoint
* **Get Computers** *(Enrichment)* - Gets the information about the computers in a specified domain
* **Update Content** (*Containment*) - Run LiveUpdate to update content
* **Quarantine** (*Containment*) - Quarantine a specific host
* **Unquarantine** (*Containment*) - Remove a host from quarantine

## Change Log

* September 26, 2019 - First upload
* April 21, 2022 - Updated actions, New actions added (Run Full Scan, Get Computers
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
