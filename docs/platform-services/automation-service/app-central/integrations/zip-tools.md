---
title: ZIP Tools
description: ''
tags: [cloud soar integrations]
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zip-tools.png')} alt="axonius" width="70"/>

***Version: 1.2  
Updated: Nov 09, 2023***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

ZIP Tools is used to work with archives, in particular to extract and save the CSV files they contain.

## Actions

* **Unzip File** (*Custom*) - Extract from archive and save all CSV files as incident attachments.

## Configure Zip Tools in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* December 23, 2020 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
* November 9, 2023 (v1.2)
	+ Changed Logo
	+ Updated integration for compatibility with new Cloud SOAR API
	+ Added Proxy options, Server certificate verification and Connection timeout config
	+ Renamed action from UnZIP File to Unzip File
	+ Added Incident ID field in action
	+ Refined labels and hints
	+ Code refactoring
