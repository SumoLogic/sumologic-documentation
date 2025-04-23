---
title: MISP
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/misp.png')} alt="misp" width="100"/>

***Version: 1.3  
Updated: Mar 4, 2024***

Utilize MISP intelligence data during incident investigations.

## Actions

* **Get Object Templates** (*Enrichment*) - Gather all object templates.
* **Get Tags** (*Enrichment*) - Gather all tags.
* **Search Intelligence** (*Enrichment*) - Search MISP data for information matching the specified query.
* **Search MISP Attribute** (*Daemon*) - Search MISP attributes.
* **Search MISP Intelligence** (*Daemon*) - Search MISP intelligence.
* **Add Attribute** (*Notification*) - Add a new attribute.
* **Add Event** (*Notification*) - Add a new event.
* **Add Object** (*Notification*) - Add a new object.
* **Update Attribute** (*Enrichment*) - Update an existing attribute.
* **Update Event** (*Enrichment*) - Update an existing attribute.

## Configure MISP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* December 19, 2019 - First upload
* July 1, 2020 - Added new actions
* August 02, 2022 - Update Actions:
    + Search MISP Intelligence (remove duplicates data from Daemon)
    + Search MISP Attribute (remove duplicates data from Daemon)
    + Search Intelligence (added new field 'Search All')
* July 11, 2023 (v1.2)
    + Updated the integration with Environmental Variables
    + Integration renamed from MISP OIF to MISP
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
