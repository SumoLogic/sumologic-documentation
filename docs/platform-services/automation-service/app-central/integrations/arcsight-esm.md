---
title: ArcSight ESM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arcsight-esm.png')} alt="arcsight-esm" width="90"/>

***Version: 1.2  
Updated: Mar 4, 2024***

Work with cases and active lists in Micro Focus ArcSight ESM.

## Actions

* **Get Active List Entries** (*Enrichment*) - Get entries from an active list.
* **Get Query Viewers** (*Enrichment*) - Get entries from a Query Viewer.
* **Get Query Viewer Results** (*Enrichment*) - Get results from a Query Viewer.
* **Create Case** (*Notification*) - Create a new case.
* **Get Case Details** (*Notification*) - Get the details of a case.
* **Update Case** (*Notification*) - Update an existing case.
* **Add Active List Entries** (*Containment*) - Add a new entry to an active list.
* **Clean Active List Entries** (*Containment*) - Clean entries from an active list.
* **Arcsight ESM Get Query Viewer Results Daemon** (*Daemon*) - Automatically gather Query Viewer Results.
* **Arcsight ESM Get Query Viewer Results Daemon V2** (*Daemon*) - Automatically gather Query Viewer Results.
* **Get Cases Arcsight ESM Daemon** (*Daemon*) - Automatically pull ArcSight ESM Cases.
* **Get Security Event** (*Enrichment*) - Get Security Event related to Case.

## Configure ArcSight ESM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* February 7, 2019 - First upload
* July 16, 2019 - New actions added
* July 1, 2021 - New action added
* August 17, 2021 - New actions added
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
