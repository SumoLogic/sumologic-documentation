---
title: Symantec Endpoint Protection
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-endpoint-protection.png')} alt="symantec-endpoint-protection" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Work with Symantec Endpoint Protection groups and events and issue containment actions during an active incident.

## Actions

* **Get Command Status** (*Enrichment*) - Check the status of a previously issued command.
* **Get Critical Events** (*Enrichment*) - Gather details on critical events.
* **Get Group Info** (*Enrichment*) - Gather information on a specified group.
* **List Group Endpoints** (*Enrichment*) - List all endpoints for a specific group.
* **Scan File** (*Enrichment*) - Scan a suspicious file found on an endpoint.
* **List Groups** (*Enrichment*) - Gather a list of all available groups.
* **Run Full Scan** *(Enrichment)* - Sends a command from Symantec Endpoint Protection Manager to Symantec Endpoint Protection endpoints to request a full scan on the endpoint.
* **Get Computers** *(Enrichment)* - Gets the information about the computers in a specified domain.
* **Update Content** (*Containment*) - Run LiveUpdate to update content.
* **Quarantine** (*Containment*) - Quarantine a specific host.
* **Unquarantine** (*Containment*) - Remove a host from quarantine.

## Configure Symantec Endpoint Protection in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Symantec Endpoint Protection [server URL](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/Dialog-Overview/cs-admin-page-site-properties-lu-tab-is-in-updates-v126147594-d3e1314/site-properties-private-insight-server-v83833498-d3e1573.html).

* **Port**. Enter your Symantec Endpoint Protection [port](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/getting-up-and-running-on-for-the-first-time-v45150512-d43e1033/communication-ports-for-symantec-endpoint-protecti-v7054802-d23e797.html).

* **Username**. Enter the username for a Symantec Endpoint Protection admin user.

* **Password**. Enter the password for the admin user.

* **Domain**. Enter your Symantec Endpoint Protection [domain](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/managing-groups-clients-and-administrators/about-domains-v15506400-d1e150.html) ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-endpoint-protection-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec Endpoint Protection configuration" width="400"/>

For information about Symantec Endpoint Protection, see [Symantec Endpoint Protection documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all.html).

## Change Log

* September 26, 2019 - First upload
* April 21, 2022 - Updated actions, New actions added (Run Full Scan, Get Computers
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
