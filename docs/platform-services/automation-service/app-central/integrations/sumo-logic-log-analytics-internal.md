---
title: Sumo Logic Log Analytics Internal
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="Sumo Logic icon" width="100"/>

***Version: 1.18  
Updated: April 27, 2026***

Integration with Sumo Logic platform for Sumo Logic system calls

## Actions

* **Search Logs** (*Enrichment*) - Query data from Sumo Logic Log Analytics.
* **Search Metrics** *(Enrichment)* - Query Metrics from Sumo Logic Log Analytics.
* **Resolve Alert** *(Notification)* - Resolve Alert.

## Configure Sumo Logic Log Analytics Internal in Automation Service and Cloud SOAR

No configuration is needed. Sumo Logic Log Analytics Internal executes without additional authentication.

## Change Log

* April 5, 2024 - First upload
* April 27, 2026 (v1.18) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
