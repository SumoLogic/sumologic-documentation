---
title: Lastline Analyst
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/lastline-analyst.png')} alt="lastline-analyst" width="100"/>

***Version: 1.2  
Updated: Nov 10, 2023***

Utilize Lastline AI-powered sandboxing to triage incidents.

## Actions

* **Submit File** (*Enrichment*) - Trigger file payload for analysis
* **Get Analysis Results** (*Enrichment*) - Get results of file analysis
* **File Reputation** (*Enrichment*) - Get reputation score of a file/hash

## Change Log

* June 12, 2019 - First upload
* November 10, 2023 (v1.2)
	+ Docker Removed
	+ Now integration using REST API, As the library used in Docker is not available through pip
	+ Updated Integration Resource Fields by removing unused fields in the code
	+ Updated the integration with Environmental Variables
	+ Added Proxy options, Server certificate verification and Connection timeout config
	+ Improved error handling
	+ Removed trailing/leading spaces
	+ Updated output mappings
	+ Renamed actions:
		- Detonation Report renamed *to* **Get Analysis Results**
		- Detonate File renamed *to* **Submit File**

  


