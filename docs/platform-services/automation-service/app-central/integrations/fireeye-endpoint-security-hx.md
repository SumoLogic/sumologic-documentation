---
title: FireEye Endpoint Security (HX)
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-endpoint-security-hx.png')} alt="fireeye-endpoint-security-hx" width="100"/>

***Version: 1.3  
Updated: Jul 13, 2023***

Interact with FireEye Endpoint Security (HX) during incident investigations.

## Actions

* **Create Alert** (*Enrichment*) - Create an alert based on the specified criteria.
* **Download File** (*Enrichment*) - Download the specified file.
* **List Endpoints** (*Enrichment*) - List endpoints.
* **Search into Events** (*Enrichment*) - Search events based on the specified search criteria.
* **System Info** (*Enrichment*) - Get system information for the specified system ID, IP, or hostname.
* **Quarantine** (*Containment*) - Quarantine the specified system ID, IP or hostname.
* **Unquarantine** (*Containment*) - Unquarantine the specified system ID, IP or hostname.

## Change Log

* March 3, 2020 - First upload
* June 26, 2020 - Updated the Search into Events action
* July 13, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
