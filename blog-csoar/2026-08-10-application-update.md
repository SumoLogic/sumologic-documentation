---
title: August 10, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## July release

The following are the updates made in July 2026.

### Manage Playbooks with Mobot

Build, edit, explain, and validate Automation playbooks conversationally, directly from Mobot on any playbook details page.
- **Create from scratch**. Describe the playbook you want, and the agent plans the topology, confirms each node, and builds the complete graph.
- **Edit incrementally**. Add, remove, or update nodes and links with automatic version management and layout.
- **Explain**. Get a plain-language walkthrough of a playbook’s flow and logic.
- **Validate**. Identify structural errors, missing fields, and broken references before publishing.
- **Discover integrations**. Browse installed integrations and their available action schemas while building a playbook.

The playbook assistant asks for clarification when needed and always works with drafts, never published revisions.

### Playbook pages UI revamp

Alongside the new agent, the Playbook pages have also been refreshed:
- **Redesigned details page**. A refreshed header now includes playbook metadata and revision history.
- **New filtering**. Filter playbooks directly from the listing page.
- **Permanent deletion**. Permanently delete playbooks from the listing page.
- **Consistent UI**. Updated UI patterns to align with the rest of the Sumo Logic platform.

### Integrations

This section includes upgrades to the existing integrations.

- **[Atlassian Jira Cloud](/docs/platform-services/automation-service/app-central/integrations/atlassian-jira-cloud/)**
- **[Atlassian Jira V2](/docs/platform-services/automation-service/app-central/integrations/atlassian-jira-v2/)**
- **[Azure AD](/docs/platform-services/automation-service/app-central/integrations/azure-ad/)**
- **CrowdStrike Falcon Intelligence**. Implemented a schedule action in the [CrowdStrike Falcon Intelligence](/docs/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-intelligence/) integration.
- **[Sumo Logic Cloud (SIEM)](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-cloud-siem/)**
- **[VirusTotal V3](/docs/platform-services/automation-service/app-central/integrations/virustotal-v3/)**

### Automation Bridge

The Automation Bridge now supports Red Hat Enterprise Linux (RHEL) 9 in addition to RHEL 8. See [Hardware Requirements](/docs/platform-services/automation-service/automation-service-bridge/#hardware-requirements) for details.

### Bug Fixes

#### Incidents

Fixed intermittent internal service error in public API to add attachments to an incident.
