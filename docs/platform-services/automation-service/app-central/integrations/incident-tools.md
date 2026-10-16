---
title: Incident Tools
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/incident-tools.png')} alt="Incident Tools icon" width="100"/>

***Version: 1.11  
Updated: April 29, 2026***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Set of scripts to perform actions within Cloud SOAR.

## Actions

* **Add Entity Threat Indicator** (*Custom*) - Mark an Entity with a predefined tag used for classification.
* **Add External Alert to Incident** (*Custom*) - Enrich the incident with external alert data.
* **Add Incident Artifact** (*Custom*) - Add an artifact to an incident.
* **Add Investigators** (*Custom*) - Add investigators to an incident.
* **Add Note** (*Custom*) - Add a note to an incident.
* **Add Users Details** (*Custom*) - Add the user details entity to an incident.
* **Change Incident Folder** (*Custom*) - Change the destination folder for an incident.
* **Change Incident Owner** (*Custom*) - Change the incident's owner.
* **Close Incident** (*Custom*) - Set incident status to closed.
* **Create Entity** (*Custom*) - Create a new entity.
* **Create Incident From Template** (*Custom*) - Create a new incident from an existing incident template.
* **Extract Data And Save Into Attachments** (*Custom*) - Extract data from previous action using fields path, then save as attachments as CSV, JSON or text file.
* **Get Entity** (*Custom*) - Get details about the provided Entity.
* **Get Incident Owner** (*Custom*) - Get the owner of the provided incident.
* **Get Incident** (*Custom*) - Get details of the specified incident.
* **Get War Room Timeline** (*Custom*) - Get the War Room timeline in JSON format for the incident.
* **Incident Daemon** (*Daemon*) - Create an incident.
* **List Entity Incidents** (*Custom*) - List all incidents where the entity is involved in
* **List External Alerts** (*Custom*) - List all external alerts associated with the incident.
* **List Incident Columns** (*Custom*) - List all incident fields.
* **List Users** (*Enrichment*) - List Users.
* **Search Entities** (*Custom*) - Search for Entities.
* **Search Incidents** (*Custom*) - Search for Incidents.
* **Update Entity** (*Custom*) - Update the tags and/or the description of the Entity.
* **Update Incident Date And Time Field** (*Custom*) - Update the date and time Incident field.
* **Update Incident Description** (*Custom*) - Update an incident description.
* **Update Incident Field** (*Custom*) - Update an incident field.
* **Update Incident Fields** (*Custom*) - Update multiple incident fields.
* **Update Incident Phase** (*Custom*) Update the incident phase.

## Configure Incident Tools in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/incident-tools-configuration.png')} style={{border:'1px solid gray'}} alt="Incident Tools configuration" width="400"/>

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.11 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.10 | March 16, 2026 | <ul><li>Updated the **Create Incident From Template** action.</li><li>Added auto-assignment of the current timestamp to the Start Time field when not provided.</li><li>Enhanced hint text for the Incident Label ID and Custom Incident Label fields.</li></ul> |
| v1.9 | December 5, 2025 | Added `closing_note` to the output field of the **Get Incident** action. |
| v1.8 | June 24, 2024 | The **Field ID** and **Field Value** fields are now optional in the **Update Incident Fields** action. |
| v1.7 | June 4, 2024 | Added new actions: **Add Entity Threat Indicator**, **Add External Alert to Incident**, **Get Entity**, **Get Incident Owner**, **Get War Room Timeline**, **Incident Daemon**, **List Entity Incidents**, **List External Alerts**, **List Incident Columns**, **Search Entities**, **Search Incidents**, and **Update Entity**. |
| v1.6 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.5 | February 13, 2024 | Fixed a typo in the following actions: **Update Incident Date And Time Field**, **Update Incident Description**, **Update Incident Field**, and **Update Incident Fields**. |
| v1.4 | December 14, 2023 | Added a new action: **Get Incident**. |
| v1.3 | November 24, 2023 | <ul><li>Updated the **Add User Details** action: enabled the incident artifacts feature flag for the User Details field (formerly Users) and added a checkbox to allow converting user details to lowercase.</li><li>Changed the API endpoint for resource testing.</li><li>Improved error handling.</li></ul> |
| v1.2 | July 7, 2023 | <ul><li>Updated the **Create Entity** action.</li><li>Removed leading/trailing spaces.</li></ul> |
| | June 1, 2023 | Initial release of the Incident Tools integration. |
