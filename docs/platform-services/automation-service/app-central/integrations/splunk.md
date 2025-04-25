---
title: Splunk
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/splunk.png')} alt="splunk" width="70"/>

***Version: 1.2  
Updated: Jul 13, 2023***

Search and send events with Splunk.

## Actions

* **Search Into Events Splunk** (*Enrichment*) - Search Splunk events.
* **Send Splunk Events** (*Notification*) - Send an event to Splunk.
* **Splunk Events Daemon** (*Daemon*) - Daemon to gather new Splunk events.
* **Splunk Alerts Daemon** (*Daemon*) - Daemon to gather new Splunk alerts.
* **Update Notable Event** (*Notification*) - Update a notable (important) event in Splunk.

## Notes

* ***Important***: Change the line `\_indextime>0000000000` to indicate the time in Epoch format you wish to begin creating incidents from in the Splunk Events Daemon action.
* Only default fields, such as `[].\_raw`, `[].host`, and `[].source` are included in the Search Into Splunk Events and Splunk Events Daemon actions.   
To use any custom fields from Splunk within Cloud SOAR, make sure they are added to these action files.

## Configure Splunk in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* May 5, 2019 - First upload
* June 4, 2019 - Search Into Events Daemon updated
* June 19, 2019 - Search Into Events Daemon updated
* December 19, 2019 - Splunk Alerts Daemon Added
* February 21, 2020 - Updated Splunk Events Daemon
* March 9, 2021 - New action added
* March 25, 2021 - Updated authentication (Authentication Token and Basic Authentication available)
* July 13, 2023 (v1.2)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Splunk OIF to Splunk
	+ Changed fields visibility
	+ Changed Daemon compatibility (Splunk Alerts Daemon)
