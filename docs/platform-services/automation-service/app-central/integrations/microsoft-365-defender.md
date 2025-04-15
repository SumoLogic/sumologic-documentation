---
title: Microsoft 365 Defender
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-365-defender.png')} alt="microsoft-365-defender" width="100"/>

***Version: 1.5  
Updated: Mar 4, 2024***

Microsoft 365 Defender is a part of Microsoft’s XDR solution which can automatically analyze threat data across domains, building a complete picture of each attack in a single dashboard. Microsoft 365 Defender integration allows us to query and update incident related data from the solution itself.

## Actions

* **Microsoft 365 Defender Incidents Daemon** (*Daemon*) - Automatically pull Microsoft 365 security Incidents.
* **Search Incidents** (*Enrichment*) - Get a list of incidents.
* **Get Incident** (*Enrichment*) - Get specific incident details.
* **Update Defender Incident** (*Notification*) - Update a specific incident.

## Microsoft 365 Defender Configuration

Refer to the [Microsoft 365 Defender](https://docs.microsoft.com/en-us/microsoft-365/security/defender/api-create-app-web?view=o365-worldwide) guide to create an Application in Azure Portal and add Permissions to access Microsoft 365 Defender.

## Category

EDR

## Configure Microsoft 365 Defender in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* April 8, 2021 - First upload
* May 4, 2021 - Actions updated: Accept multiple DateTime formats
* January 30, 2023 - Updated Daemon
    + Microsoft 365 Defender Incidents Daemon: Duplicate results removed
* May 23, 2023 (v1.3)
    + Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
* June 28, 2023 (v1.4) - Removed leading/trailing spaces
* March 4, 2024 (v1.5) - Updated code for compatibility with Python 3.12
