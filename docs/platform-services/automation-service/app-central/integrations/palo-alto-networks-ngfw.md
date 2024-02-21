---
title: Palo Alto Networks NGFW
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/palo-alto-networks-ngfw.png')} alt="palo-alto-networks-ngfw" width="100"/>

***Version: 1.3
Updated: Jul 11, 2023***

Issue containment actions during incident investigation through Palo Alto NGFW.

## Actions

* **List Applications** (*Enrichment*) - List all applications.
* **Block IP** (*Containment*) - Block traffic in the specified direction to/from the specified IP.
* **Unblock IP** (*Containment*) - Remove block in the specified direction to/from the specified IP.
* **Block URL** (*Containment*) - Block traffic to/from the specified URL.
* **Unblock URL** (*Containment*) - Remove block to/from the specified URL.
* **Block Port** (*Containment*) - Block traffic from the specified protocol to/from the port.
* **Unblock Port** (*Containment*) - Remove block on the specified protocol to/from the port.
* **Block Application** (*Containment*) - Block traffic to/from specified application.
* **Unblock Application** (*Containment*) - Remove block on specified application.

## Change Log

* January 14, 2020 - First upload
* July 11, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Palo Alto Networks NGFW OIF to Palo Alto Networks NGFW
