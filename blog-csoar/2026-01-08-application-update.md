---
title: January 8, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## December release

Following are the updates made in December, 2025.

### Changes and enhancements

#### Integrations

Added a new integration for [Google Identity Platform](/docs/platform-services/automation-service/app-central/integrations/google-identity-platform/).

#### Platform

Added new public APIs:
* Add playbooks to an incident. 
* Retrieve all playbooks attached to a specific incident.

[Learn more](/docs/cloud-soar/automation/#add-a-playbook-to-an-incident-with-the-api).

### Bug Fixes

#### Playbooks

Fixed an issue where results and errors were not displaying for containment type actions in the list view.

#### Integrations

* In the [Microsoft EWS (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/) integration, removed the default values for the `has_attachments` and `un_read` fields in the Search Emails Extended action. The change allows users to search for emails without being forced to filter by attachment status or read/unread status.
* In the [Freshservice](/docs/platform-services/automation-service/app-central/integrations/freshservice/) integration, the Create Ticket and Update Ticket actions now support an optional Workspace ID. Also updated existing custom ticket fields.