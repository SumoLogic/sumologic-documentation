---
title: AbuseIPDB
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/abuseipdb.png')} alt="abuseipdb" width="100"/>

***Version: 1.3  
Updated: Oct 06, 2023***

Enrich IP addresses with reputation information gathered from AbuseIPDB.

## Actions

* **IP Reputation** *(Enrichment)* - Gather IP reputation information (only for Cloud SOAR).
* **IP Reputation V2** *(Enrichment)* - Gather IP reputation information.

## Notes

* Results of the IP reputation check can be saved in .csv file format (only for Cloud SOAR).
* Multiple searches with any keyword in the comments.

## Change Log

* June 19, 2020 - First upload
* August 26, 2021 - Action updated: IP Reputation
* February 20, 2023 (v1.2)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
* October 6, 2023 (v1.3)
	+ Added new action: IP Reputation V2
	+ Changed fields visibility
	+ Fixed Typo
