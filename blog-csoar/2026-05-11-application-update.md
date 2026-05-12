---
title: May 11, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## April release

Following are the updates made in April 2026.

### Changes and enhancements

### Integrations

- We are excited to introduce the new ZeroFox V2 integration. [Learn more](/docs/platform-services/automation-service/app-central/integrations/zerofox-v2/).
- Upgraded integrations from the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life while improving security and performance.

### Platform

Updated toast notifications, tooltips, and button components in both UI design and behaviour to ensure consistency with the platform.

#### Triage

Improved the performance of the Get Triage Event Details Public API. [Learn more](https://api.sumologic.com/docs/csoar/#operation/triage_retrieve).

#### Playbooks

Improved the performance of task approve/close APIs.

#### Incidents

Added a new UI option to view or copy the Incident Label ID directly from the interface for improved accessibility and usability.

### Bug Fixes

- Fixed an issue where the **No Result** state briefly remained visible after clicking **Reset Search** on listing pages before the updated results were rendered correctly.
- Added character limits for Playbook titles, node titles, and other modules to maintain UI consistency and prevent layout issues caused by excessively long names.

#### Playbooks

Optimized the Playbook Executions list view to improve performance when handling large volumes of action results.