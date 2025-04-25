---
title: Manage Engine Desktop Central
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/manage-engine-desktop-central.png')} alt="manage-engine-desktop-central" width="100"/>

***Version: 1.1  
Updated: Jul 05, 2023***

Query data an utilize actions in Desktop Central unified endpoint management (UEM) solution for managing servers, laptops, desktops, smartphones.

## Actions

* **List Patches** *(Enrichment)* - Retrieve the all patch list.
* **Install Patches** *(Containment)* - Install specific patches in all systems.
* **List Systems** *(Enrichment)* - Retrieve the all system list.
* **Patch Scan Computers** *(Containment)* - Perform patch scan on all computers.
* **Patch Scan Computer** *(Containment)* - Perform scan action on particular computers.
* **Approve Patch** *(Containment)* - Initiate Approve patch actions.
* **Unapprove Patch** *(Containment)* - Initiate Unapprove patch actions.
* **Patch Scan Details** *(Enrichment)* - Retrieve the patch scan system list.
* **Deployment Policies** *(Enrichment)* - Retrieve the patch deployment policy list.
* **Initiation Request** *(Containment)* - Get the device code as input for Polling Request action.
* **Polling Request** *(Containment)* - Get the Access Token.

## Configure Manage Engine Desktop Central in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* July 8, 2021 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
