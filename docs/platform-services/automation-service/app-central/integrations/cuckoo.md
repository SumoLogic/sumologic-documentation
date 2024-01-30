---
title: Cuckoo
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cuckoo.png)

Version: 1.4  
Updated: Jul 06, 2023

Utilize Cuckoo sandbox to detonate potentially malicious files and URLs during an active investigation.

## Actions

* **Detonate File** (*Enrichment) -* Submit file for analysis
* **Detonate URL***(Enrichment) -* Submit URL for analysis
* ***Get Task Status** (Enrichment) - Get status for a specific Task*
* ***Get URL Report** (Enrichment) - Get report for a specific URL*
* ***Get File Report** (Enrichment) - Get report for a specific file*

## Notes

* After submitting (detonation), task has three phases. It can be status :pending, analyzing, reported.

## Change Log

* September 19, 2019 - First upload
* March 19, 2021 - Actions updated
* July 6, 2023 (v1.4)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Cuckoo OIF to Cuckoo
