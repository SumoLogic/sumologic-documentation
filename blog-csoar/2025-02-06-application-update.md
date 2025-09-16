---
title: February 6, 2025 - Application Update
keywords:
  - sumo logic
  - cloud soar
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## January release

### Changes and Enhancements

#### Platform

🚀 **New feature release: Autosave for playbooks**

We’re excited to introduce [autosave for playbooks](/docs/platform-services/automation-service/playbooks/create-playbooks/#autosave), a feature designed to make workflow changes seamless by automatically saving your progress as draft and preventing accidental data loss. Here's what's new:
* Playbooks now automatically save your changes, including node updates, connections, and position adjustments. 
* Multiple changes made in quick succession are saved together to improve performance. 
* Visual indicators display the saving status whether in progress, successfully saved, or failed. 
* Warnings appear when users attempt to close or navigate away from a playbook with unsaved changes. 
* Users can enable or disable auto-save as needed.

##### AuditService:

* Removed the `Body` field from the email audit log to enhance security and optimize log storage

#### Bug Fixes

* Playbooks:
    * Fixed granular field path drill-down in textArea for arrays with array output fields. 
    * Resolved issue where the Authorizer value in playbook action nodes was not persisting on the UI.
