---
title: February 12, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## January release

Following are the updates made in January, 2026.

### Changes and enhancements

#### Automation Bridge

We're delighted to announce [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge) version 3.3.0, which: 
* Ensures stability while scaling.
* Improves observability into bridge instances reducing dependence on customer logs for debugging common issues.
* Introduces the Bridge KPI Dashboard, a new dashboard offering insights into bridge operations:
   * Added capability to examine bridge-related workloads on customer machines.
   * Now tracks statistics around usage of various bridge versions and installation types (container/rpm/deb).

#### Playbooks

* Added a [**Playbook Executions**](/release-notes-csoar/2026/01/30/applicaiton-update/#new-feature-playbook-executions) page that lets you monitor the outcome of playbook runs.
* Implemented a confirmation prompt when terminating a playbook on the incidents and Automation Services pages to prevent accidental terminations.

#### Integrations

Added an explicit button for testing Integration actions upon hovering over the action, making it easier for users to discover the test action functionality.

### Bug fixes

#### Playbooks

* Fixed an issue where the child playbook execution status was displayed incorrectly in the detail view.
* Resolved issue where clicking the task node title in playbook execution resulted in a 404 error.
* Fixed the issue where newly created playbooks did not immediately appear in the UI.

