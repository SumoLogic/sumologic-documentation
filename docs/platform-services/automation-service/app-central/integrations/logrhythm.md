---
title: LogRhythm
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/logrhythm.png')} alt="logrhythm" width="100"/>

***Version: 1.2  
Updated: Mar 4, 2024***

Query and update events in LogRhythm SIEM.

## Actions

* **List Alarms** *(Enrichment)* - Returns Alarms details.
* **Get Alarm By ID** *(Enrichment)* - Returns Alarm detail based on the Alarm ID.
* **Update Alarm Comments** *(Notification)* - Adds comment to an Alarm ID.
* **Get Events By Alarm ID** *(Enrichment)* - Returns Events detail based on the Alarm ID.
* **Get Alarm History By ID** *(Enrichment)* - Returns Alarm History detail based on the Alarm ID.
* **Update Alarm Status** *(Notification)* - Update the Alarm status.
* **LogRhythm Alarms Daemon** *(Daemon)* - Automatically fetch Alarms.

## Configure LogRhythm in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/logrhythm-configuration.png')} style={{border:'1px solid gray'}} alt="LogRhythm configuration" width="400"/>

For information about LogRhythm, see [LogRhythm documentation](https://docs.logrhythm.com/?l=en).

## Change Log

* May 31, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.5) - Updated code for compatibility with Python 3.12
