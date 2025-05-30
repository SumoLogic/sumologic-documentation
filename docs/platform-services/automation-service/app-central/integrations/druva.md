---
title: Druva
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/druva.png')} alt="druva" width="90"/>

***Version: 1.0  
Updated: April 4, 2024***

 Druva is a service designed primarily to respond to ransomware attacks, identified by detecting anomalies and suspicious behavior for data protected across data sources including data centers and endpoints.

## Actions

* **Delete Quarantine Range** *(Containment)* - Deletes the quarantine range for an infected resource. When you delete a quarantine range, all the snapshots on the resource are again available for restore and download.
* **Delete Snapshot** *(Containment)* - Delete an infected snapshot using the snapshot ID.
* **List Devices** *(Enrichment)* - Returns information about all the user devices protected using Druva inSync.
* **List Profiles** *(Enrichment)* - Returns a list of all the profiles configured in Druva inSync.
* **Lists Quarantine Ranges** *(Enrichment)* - Returns the list of all the defined quarantined ranges for resources along with their details.
* **List Snapshots** *(Enrichment)* - Lists all the quarantined snapshots within a specified range on the resource.
* **List Users** *(Enrichment)* - Returns the list of users in Druva inSync with their details.
* **Quarantine Snapshots Resource** *(Containment)* - Quarantine all snapshots, or snapshots within a date range on a resource.
 Users and administrators cannot restore or download data from the quarantined snapshots.

 ## Configure Druva in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/druva-configuration.png')} style={{border:'1px solid gray'}} alt="Druva configuration" width="400"/>

For information about Druva, see [Druva documentation](https://help.druva.com/en/).

## Change Log

* April 4, 2024 - First upload
