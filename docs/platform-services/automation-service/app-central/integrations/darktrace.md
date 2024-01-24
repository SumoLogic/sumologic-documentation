---
title: Darktrace
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/darktrace.png)

Version: 1.3  
Updated: Jul 12, 2023

Perform threat intelligence evidence gathering with Darktrace.

## Actions

* **Add To Watch List** (*Containment*) - Adds external domains, hostnames, or IP addresses to Darktrace's internal watch list
* **Remove From Watch List** (*Containment*) - Removes an external domain, hostname, or IP address from Darktrace's internal watch list
* **Get Watch List** (*Enrichment*) - Retrieves a list of indicators from a watch list
* **Get IOC** (*Enrichment*) - Get IOC details by value
* **List Models** (*Enrichment*) - Returns a list of all models that currently exist on the Threat Visualizer
* **Get Model** (*Enrichment*) - Returns a specific model that currently exist on the Threat Visualizer
* **Search Devices** (*Enrichment*) - Search capacity to interrogate the list of devices has seen on the network
* **List Tags** (*Enrichment*) - List all available tags
* **Search Breach** (*Enrichment*) - Query breaches from Darktrace
* **Darktrace Breach Daemon** *(Daemon) -* Automatically gather Breaches from Darktrace
* **Darktrace Incident Events Daemon** *(Daemon) -* Automatically gather Incident Events from Darktrace (provides access to AI Analyst events - a group of anomalies or network activity investigated by Cyber AI Analysts)

## Change Log

* January 15, 2021 - First upload
* February 11, 2021 - Updated Actions:
	+ Get IOC
	+ List Models
	+ Get Models
	+ Search Device
	+ List Tags
* June 07, 2022 - New Actions:
	+ Search Breach
	+ Darktrace Breach Daemon
* February 17, 2023 (v1.2)
	+ New Daemon: Darktrace Incident Events Daemon
* July 12, 2023 (v1.3) - Updated the integration with Environmental Variables
