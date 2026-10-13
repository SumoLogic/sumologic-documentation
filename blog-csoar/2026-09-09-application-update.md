---
title: September 09, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## August release

The following are the updates made in August 2026.

### Platform 

#### Playbooks

**Bulk Resource Reassignment Across Playbook Actions**. Added support for bulk resource reassignment across playbook actions that helps you:
* Update the resource for every action of an integration in a playbook at once.
* Cut time spent on repetitive per-node edits.
* Avoid missing a node during environment swaps.

### Integrations

For details on Automation Service Integrations updates, see [Automation Service Integrations](/release-notes-service/2026/08/31/apps/#automation-service-integrations).

### Bug Fixes

#### Playbooks

* Fixed an issue where the playbook listing page showed a "Playbook not found" error right after the first publish. Also added support for pre-filled search filters.
* Fixed the **Type** dropdown on the playbook details page not opening when clicked in some cases.
* Fixed cloned node issues on the playbook canvas, including missing node numbers, empty cloned fields, and hidden filter node titles.
* Fixed the Test Node popup so **Save and Test** keeps your newly added or edited field values and tests with the latest saved data.
* Fixed exports failing for nested playbooks.

#### Integrations

Fixed Permission Issues with Cloud Siem Internal Integration’s Add Comment Action