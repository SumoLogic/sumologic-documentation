---
title: ManageEngine Desktop Central
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/manage-engine-desktop-central.png')} alt="manage-engine-desktop-central" width="100"/>

***Version: 1.2  
Updated: June 24, 2025***

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

## Configure ManageEngine Desktop Central in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server Host**. Enter your ManageEngine Desktop Central [hostname](https://www.manageengine.com/products/desktop-central/help/getting_started/working_with_desktop_central.html).

* **Account Type**. Select your Account type (default is cloud).
* **Access Token**. Enter your ManageEngine Desktop Central [authentication key](https://www.manageengine.com/products/desktop-central/api/).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/manage-engine-desktop-central-configuration.png')} style={{border:'1px solid gray'}} alt="ManageEngine Desktop Central configuration" width="400"/>

For information about ManageEngine Endpoint Central (formerly Desktop Central), see [ManageEngine Endpoint Central documentation](https://www.manageengine.com/products/desktop-central/api/).

## Change Log

* July 8, 2021 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
* June 24, 2025 (v1.2) - Updated authentication headers to support both cloud and on-prem account type.
