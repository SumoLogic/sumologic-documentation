---
title: February 24, 2025 - Application Update
keywords:
  - sumo logic
  - cloud soar
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';



### Changes and Enhancements

#### Platform

**New feature release: Dynamic Array Handling**

We are excited to introduce an enhancement to the action node—dynamic array handling. You can now loop through arrays directly within a text area field in an action node, making it easier and more efficient to work with lists in a playbook.

When selecting an array variable in the text area, you will have two options:
* Iterate through the array so that the action runs for each value in the array.
* Process the array as a comma-separated list.

If the iterate option is selected, an icon will appear in front of the variable inside the text area to indicate that iteration is enabled. The action will then execute as many times as there are elements in the array.

[Learn more](/docs/platform-services/automation-service/automation-service-playbooks/#arrays-in-text-areas).