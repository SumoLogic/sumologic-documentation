---
title: Trend Micro Deep Security
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/trend-micro-deep-security.png')} alt="trend-micro-deep-security" width="80"/>

***Version: 1.2  
Updated: Jun 22, 2023***

Utilize Trend Micro Deep Security to interact with IP lists, firewall and intrusion rules, and gather enrichment data during incident investigations.

## Actions

* **List Systems** (*Enrichment*) - List all available systems.
* **List IP Lists** (*Enrichment*) - List all IP lists.
* **List Policies** (*Enrichment*) - List all available policies.
* **List Firewall Rules** (*Enrichment*) - List all firewall rules.
* **List Intrusion Rules** (*Enrichment*) - List all intrusion rules.
* **Get System Info** (*Enrichment*) - Gather system information for a specific system.
* **Get IP List** (*Enrichment*) - Get a specific IP list.
* **Get Policy** (*Enrichment*) - Get a specific policy.
* **Get Firewall Rule** (*Enrichment*) - Get a specific firewall rule.
* **Get Intrusion Rule** (*Enrichment*) - Get a specific intrusion rule.
* **Create IP List** (*Containment*) - Create a new IP list.
* **Create Policy** (*Containment*) - Create a new policy.
* **Add Firewall Rules To Policy** (*Containment*) - Add a firewall rule to an existing policy.
* **Create Intrusion Rule** (*Containment*) - Create a new intrusion rule.
* **Add Intrusion Rules To Policy** (*Containment*) - Add an intrusion rule to an existing policy.
* **Search Systems By Hostname** (*Enrichment*) - Search systems by hostname.
* **Search Systems By IP** (*Enrichment*) - Search systems by IP Address.

## Configure Trend Micro Deep Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* March 6, 2020 - First upload
* October 27, 2022 - Action **Search Systems By Hostname** added.
* February 17, 2023 (v1.1)
	+ New Action: Search Systems By IP
* June 22, 2023 (v1.1) - Removed unnecessary empty lines
