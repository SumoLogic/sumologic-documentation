---
title: Datto RMM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/datto.png')} alt="datto" width="90"/>

***Version: 1.0  
Updated: Mar 13, 2024***

Datto Remote Monitoring and Management (RMM) is a secure cloud-based RMM platform.

This integration streamlines IT tasks with rapid job creation, data retrieval, and inventory management for devices and components.

## Actions

* **Create Quick Job** _(Containment)_ - Creates a quick job on the device identified by the given device Uid.
* **Get Job** _(Enrichment)_ - Fetches data of the job identified by the given job Uid.
* **List Components** _(Enrichment)_ - Fetches the components records of the authenticated user's account.
* **List Devices** _(Enrichment)_ - Fetches the devices of the authenticated user's account.

## Configure Datto RMM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* March 13, 2024 - First upload
