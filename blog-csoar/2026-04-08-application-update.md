---
title: April 8, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## March release

Following are the updates made in March 2026.

### Changes and enhancements

#### New integrations

We are excited to introduce new integrations for the following services:

- [1Password](/docs/integrations/automation-integrations/automation-integration-catalog/1password)
- [Sumo Logic Cloud Monitor](/docs/integrations/automation-integrations/automation-integration-catalog/sumo-logic-cloud-monitor/)
- [Sumo Logic Lookup Table](/docs/integrations/automation-integrations/automation-integration-catalog/sumo-logic-lookup-table/)
- [Sumo Logic Rules Tuning](/docs/integrations/automation-integrations/automation-integration-catalog/sumo-logic-rules-tuning)
- [Upwind](/docs/integrations/automation-integrations/automation-integration-catalog/upwind/)

#### Enhancements

Upgraded the `python3_generic` **(Python 3.8)** Docker image to `python3_12_generic` **(Python 3.12)** across the following integrations to address Python 3.8 end-of-life and enhance security and performance:
- [Abuse.ch SSLBL Feed](/docs/integrations/automation-integrations/automation-integration-catalog/abuse.ch-sslbl-feed/)
- [AbuseIPDB](/docs/integrations/automation-integrations/automation-integration-catalog/abuseipdb/)
- [Airtable](/docs/integrations/automation-integrations/automation-integration-catalog/airtable/)
- [Atlassian Jira Cloud](/docs/integrations/automation-integrations/automation-integration-catalog/atlassian-jira-cloud/)
- [Atlassian Jira V2](/docs/integrations/automation-integrations/automation-integration-catalog/atlassian-jira-v2/)
- [Atlassian Opsgenie](/docs/integrations/automation-integrations/automation-integration-catalog/atlassian-opsgenie/)
- [Censys V3](/docs/integrations/automation-integrations/automation-integration-catalog/censys-v3/)
- [Cloudflare](/docs/integrations/automation-integrations/automation-integration-catalog/cloudflare/)
- [CrowdStrike Falcon](/docs/integrations/automation-integrations/automation-integration-catalog/crowdstrike-falcon/)
- [CrowdStrike Falcon Discover](/docs/integrations/automation-integrations/automation-integration-catalog/crowdstrike-falcon-discover/)
- [CrowdStrike Falcon Intelligence](/docs/integrations/automation-integrations/automation-integration-catalog/crowdstrike-falcon-intelligence/)
- [CrowdStrike Falcon Sandbox](/docs/integrations/automation-integrations/automation-integration-catalog/crowdstrike-falcon-sandbox/)
- [Microsoft OneDrive](/docs/integrations/automation-integrations/automation-integration-catalog/microsoft-onedrive/)
- [ThreatConnect V3](/docs/integrations/automation-integrations/automation-integration-catalog/threatconnect-v3/)
- [URLScan.io](/docs/integrations/automation-integrations/automation-integration-catalog/urlscan.io/)

#### Platform

- Reduced initial page load times to improve the performance of Cloud SOAR and Automation pages.
- Introduced a redesigned delete confirmation modal with clearer messaging to help prevent accidental deletions across playbooks, playbook executions, incident templates, integrations, rules, and the Automation Bridge.
- Enhanced “no results” states on listing pages by adding a **Clear Filters** option when no results are found.
- Updated search behavior on listing pages (such as the Playbooks page) to exclude deleted records unless the **Deleted** filter is explicitly applied.

### Bug Fixes

#### General

- Fixed the search URL to display the entered search text instead of encoded suggestion metadata.

#### Integrations

- **Incident Tools**. Set the default start time to the current time when it is not specified in the Create Incident From Template action. [Learn more](/docs/integrations/automation-integrations/automation-integration-catalog/incident-tools/).
- **Microsoft Azure Security Center**. Updated the integration to use Microsoft’s recommended app-only authentication. [Learn more](/docs/integrations/automation-integrations/automation-integration-catalog/microsoft-azure-security-center/).

#### Playbooks

- Fixed an issue that prevented playbook paths from appearing in App Catalog playbook previews.
