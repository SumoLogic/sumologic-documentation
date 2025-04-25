---
title: Claroty
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/claroty.png')} alt="claroty" width="70"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Query Claroty CTD, an OT scanner and monitoring system. Claroty CTD provides fundamental cybersecurity controls that support the REVEAL, PROTECT, DETECT, CONNECT framework for industrial networks.

## Actions

* **List Assets** (*Enrichment*) - Retrieve all details of all assets.
* **Query Alerts** (*Enrichment*) - Retrieve all details of all alerts.
* **Resolve Alerts** (*Containment*) - Resolve alert as resolved or archived.
* **Get Alert** (*Enrichment*) - Find an alert by its ID.
* **Query Alerts Daemon** (*Daemon*) -That fetch alerts.

## Configure Claroty in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* March 24, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
