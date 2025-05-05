---
title: FortiGate
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fortigate.png')} alt="fortigate" width="100"/>

***Version: 1.2  
Updated: Jul 14, 2023***

Work with Addresses, Policies and Services in Fortinet FortiGate.

## Actions

* **Get Address Groups** (*Enrichment*) - Get a address group.
* **Get Addresses** (*Enrichment*) - Get addresses.
* **Get Firewall Service** (*Enrichment*) - Get a firewall service.
* **Get Policy** (*Enrichment*) - Get a policy.
* **Get Service Groups** (*Enrichment*) - Get a service group.
* **Create Packet Capture** (*Enrichment*) - Create a new packet capture session.
* **Download Stored Packet Capture** (*Enrichment*) - Download a stored packet capture.
* **Packet Capture Action** (*Enrichment*) - Interact with a packet capture session (Start/Resume, Restart, Stop, and Delete).
* **List Packet Captures** (*Enrichment*) - List all available packet captures.
* **List Configured Packet Captures Status** (*Enrichment*) - Gather the status of a packet capture.
* **List Interfaces** (*Enrichment*) - List all available interfaces.
* **Packet Capture Polling** (*Enrichment*) - Packet capture polling.
* **Add Address** (*Containment*) - Add a new IP or FQDN to the address list (required to use address in Address Group).
* **Create Address Group** (*Containment*) - Create a new address group.
* **Create Firewall Service** (*Containment*) - Create a new firewall service.
* **Create Policy** (*Containment*) - Create a new policy.
* **Update Address Group** (*Containment*) - Update an address group.
* **Update Policy** (*Containment*) - Update a policy.

## Configure FortiGate in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about FortiGate, see [FortiGate documentation](https://docs.fortinet.com/product/fortigate/7.6).

## Change Log

* January 24, 2019 - First upload
* September 19, 2019 - New actions added
* June 1, 2020 - New actions added
* June 23, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 14, 2023 (v1.2)
	+ Code refactoring
	+ Changed fields visibility
