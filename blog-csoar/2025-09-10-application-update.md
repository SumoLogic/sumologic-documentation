---
title: September 10, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New feature: Test nodes in playbooks

The new **Test Mode** toggle on nodes allows you to test individual nodes in playbooks without having to run the entire playbook, offering greater control over node configuration and troubleshooting.

What's new:
* Provide mock values for variables used in the node, and run the results to see the output and any errors.
* Available on action, condition, user choice, and task nodes. (It is not available on filter or nested playbook nodes.)
* Testing nodes counts against your [action limit](/docs/platform-services/automation-service/about-automation-service/#actions-limit) quota.

For more information, see [Test nodes in a playbook](/docs/platform-services/automation-service/playbooks/troubleshoot-playbooks/#test-nodes-in-a-playbook).
