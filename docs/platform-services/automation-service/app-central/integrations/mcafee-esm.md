---
title: McAfee ESM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mcafee-esm.png')} alt="mcafee-esm" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Work with McAfee ESM Events, Alarms, and Watchlists.

**Actions:**

* **Get Filter Fields** (*Enrichment*) - Get a list of valid filter fields.
* **Get Raw Logs From Event ELM ELS** (*Enrichment*) - Get the raw logs pertaining to an event.
* **Get Watchlists** (*Enrichment*) - Get a list of watchlists.
* **List Correlated Events** (*Enrichment*) - LIst events which are correlated with the Event ID.
* **List Users** (*Enrichment*) - Get a list of users.
* **Search Into McAfee ESM Alarms** (*Enrichment*) - Search Alarms.
* **Search Into McAfee ESM Events** (*Enrichment*) - Search Events.
* **Acknowledge Alarm** (*Containment*) - Acknowledge an Alarm.
* **Add To Watchlist** (*Containment*) - Add a value to a watchlist.
* **Remove From Watchlist** (*Containment*) - Remove a value from a watchlist.
* **Search McAfee ESM Alarm Daemon** (*Daemon*) - Daemon for searching alarms.
* **Get Select Fields** (*Enrichment*) - Get a list of select fields.

## Configure McAfee ESM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* July 4, 2019 - First upload
* August 5, 2019 - Supported Version Updated
* December 2, 2021 - Actions updated (Added logout session to each action)
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
