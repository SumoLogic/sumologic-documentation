---
title: Logpoint
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/logpoint.png')} alt="logpoint" width="100"/>

***Version: 1.1  
Updated: Jun 30, 2023***

Interact with Logpoint events during incident investigations.

## Actions

* **Search Into Events** (*Enrichment*) - Query Logpoint for event data.
* **Resolve Incident** (*Notification*) - Resolved an incident.
* **Get Logpoint Incidents** (*Daemon*) - Poll incidents from Logpoint.
* **Get Logs** (*Daemon*) - Retrieve specific logs from Logpoint.
* **Get Incidents Data** (*Enrichment*) - Retrieve data from specific incident

## Notes

This integration has been developed using a non-standard API that involves web scraping.

## Configure Logpoint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/logpoint-configuration.png')} style={{border:'1px solid gray'}} alt="Logpoint configuration" width="400"/>

For information about Logpoint, see [Logpoint documentation](https://docs.logpoint.com/).

## Change Log

* September 3, 2020 - First upload
* June 30, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Logpoint OIF to Logpoint
