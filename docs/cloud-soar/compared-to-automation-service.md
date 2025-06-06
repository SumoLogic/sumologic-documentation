---
id: compared-to-automation-service
title: Cloud SOAR Compared to the Automation Service
sidebar_label: Compared to Automation Service
description: Compare the features of Cloud SOAR with the Automation Service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud SOAR is a full-featured security orchestration, automation, and response (SOAR) application. The [Automation Service](/docs/platform-services/automation-service/about-automation-service/) is a subset of automation capabilities adapted from Cloud SOAR that is available to the entire Sumo Logic log analytics platform. 

The Automation Service only has Cloud SOAR’s playbook-related features, including App Central and the Automation Bridge. Like the Cloud SOAR action types, the [Automation Service action types](/docs/platform-services/automation-service/automation-service-playbooks/#add-an-action-node-to-a-playbook) can perform automated responses to events, including run containment actions and manual user interaction steps. 

## Main differences

Why would you want to use Cloud SOAR when the Automation Service already does automation similar to Cloud SOAR? Because Cloud SOAR does much more.

### Case and incident management

The Automation Service doesn't include any of Cloud SOAR’s case management or [incident management](/docs/cloud-soar/incidents-triage) functionality. Managing at the incident level and assigning to cases gives SecOps teams flexibility to respond in a number of ways, and to run reports and do analysis.

### Daemon and trigger action types

The Automation Service does not support [daemon](/docs/platform-services/automation-service/integration-framework/about-integration-framework/#daemon-action-definitions) and [trigger](/docs/platform-services/automation-service/integration-framework/about-integration-framework/#trigger-action-definitions) action types. The Automation Service can only use triggers built into Cloud SIEM and the Log Analytics platform. So you can’t configure a playbook in the Automation Service to monitor an external process or file and fire a trigger in response like you can with Cloud SOAR. A trigger can only fire in the Automation Service for limited events, such as when an Insight is created in Cloud SIEM.

### Additional features

Cloud SOAR also offers many more features than the Automation Service, including customizable dashboards, reports, widgets, data filtering, and entity analysis, to name a few.

## Feature comparison

| Feature | Automation<br/>Service | Cloud SOAR |
| :-- | :-- | :-- |
| App Central <br/>- Integrations <br/>- Playbooks | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Automation (full features) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | 
|  Automation Bridge | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) | 
| Integration with Cloud SIEM and Log Analytics | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Integrations management | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Open Integration Framework (OIF)<br/>- Custom docker images for action execution<br/>- Custom integration capabilities<br/>- Integration Builder (almost no-code) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Playbooks<br/>- Execution in the cloud (without using an Automation Bridge)<br/>- Execution in local network with an Automation Bridge<br/>- Management<br/>- Slack integration for node activation | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Advanced automation capabilities <br/>- Daemons <br/>- Triggers | | ![check](/img/reuse/check.png) |
| Automation rule definition |  |  ![check](/img/reuse/check.png) | 
| Average Phase Duration |  | ![check](/img/reuse/check.png) | 
| Cases <br/>- Attachments<br/>- Bulk actions<br/>- Cloning<br/>- Collaboration ( Notes, Slack, Task)<br/>- Contextual hints while writing a search string<br/>- Fields customization<br/>- Filters with advanced search bar<br/>- Incident attachments (files)<br/>- Label configuration<br/>- Manual creation<br/>- Online/offline search<br/>- Over time<br/>- Overview<br/>- Ownership and user group management<br/>- Selection of case properties to display<br/>- Statistics<br/>- Template<br/>- War Room | | ![check](/img/reuse/check.png) |
| Dashboards <br/>- Cloning<br/>- Multiple<br/>- Preview while customizing page<br/>- Public/private | | ![check](/img/reuse/check.png) |
| Entities<br/>- Harvesting<br/>- Manual creation | | ![check](/img/reuse/check.png) |
| Data can be shown with:<br/>- Filtering (with query, bookmarks, and via search bar)<br/>- Graphs<br/>- Placeholders/tags <br/>- Tables<br/>- Text | | ![check](/img/reuse/check.png) |
| Flexible layout with drag and drop | | ![check](/img/reuse/check.png) |
| Logo configuration | | ![check](/img/reuse/check.png) |
| Metrics for usage and adoption | | ![check](/img/reuse/check.png) |
| Reports<br/>- Create starting from a case list query<br/>- Customize format, margins, orientation, pages and page header/footer<br/>- Flexible layout with drag and drop<br/>- Multiple<br/>- Public/private<br/>- Realtime preview while customizing page<br/>- Scheduled | | ![check](/img/reuse/check.png) |
| SecOps Dashboard | | ![check](/img/reuse/check.png) |
| Task Overview | | ![check](/img/reuse/check.png) |
| Triage <br/>- Configuration<br/>- Event management<br/>- Graphical display of the playbooks executed | | ![check](/img/reuse/check.png) |
| User group management | | ![check](/img/reuse/check.png) |
| Widgets<br/>- Custom<br/>- Public/private<br/>- Real time preview<br/>- Textual (with placeholder and images support) | | ![check](/img/reuse/check.png) |




