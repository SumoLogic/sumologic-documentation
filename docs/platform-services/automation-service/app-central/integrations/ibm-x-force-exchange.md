---
title: IBM X-Force Exchange
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ibm-x-force-exchange.png')} alt="ibm-x-force-exchange" width="100"/>

***Version: 1.4  
Updated: Jul 12, 2023***

IBM X-Force Exchange is a cloud-based threat intelligence platform that allows you to consume, share and act on threat intelligence. It enables you to rapidly research the latest global security threats, aggregate actionable intelligence, consult with experts and collaborate with peers.

## Actions

* **Search DNS Records** (*Enrichment*) - Search DNS records for a specified IP or Domain.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information for a specific IP address.
* **File Reputation** (*Enrichment*) - Gather file reputation information for a specific file.
* **URL Reputation** (*Enrichment*) - Gather URL reputation information for a specific URL.
* **Whois Lookup** (*Enrichment*) - Issue a Whois lookup on a specific IP or Domain.
* **Passive DNS** (*Enrichment*) - Search passive DNS records for a specific IP or Domain.
* **URL Reputation V2** (*Enrichment*) - Accepted multiple URLs separated by comma as Input and do URL reputation.

## Category

Threat Intelligence-Reputation

## Change Log

* December 19, 2019 - First upload
* June 19, 2020
	+ Whois Lookup and Passive DNS results can be saved as a .csv file
	+ New action has been added
* June 07, 2022 - New Actions:
	+ URL Reputation V2
* August 22, 2022 (v1.2) - General improvements
* February 23, 2023 (v1.3)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* July 12, 2023 (v1.4)
	+ Changed fields visibility
	+ Integration renamed from IBM X-Force Exchange OIF to IBM X-Force Exchange
	+ Added new actions:
		- Passive DNS V2
		- Whois Lookup V2
