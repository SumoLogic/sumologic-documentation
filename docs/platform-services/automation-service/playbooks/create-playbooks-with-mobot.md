---
id: create-playbooks-with-mobot
title: Create Playbooks with Mobot
sidebar_label: Create Playbooks with Mobot ✨
description: Create and manage playbooks in Mobot from plain-language prompts, without manual configuration.
keywords:
  - mobot
  - playbook
  - dojo ai
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ConvPlaybookLimits from '../../../reuse/conv-playbook-limits.md';

[Mobot](/docs/search/mobot) enables you to create playbooks using natural language. Mobot is the AI Playbook Assistant built into the Playbooks editor. Instead of manually wiring up nodes, you describe what you want in plain language, and Mobot proposes a plan, asks clarifying questions, and builds the playbook for you.

<ConvPlaybookLimits/>

### Create and manage playbooks using Mobot

#### Prerequisites

Playbooks automate response actions for monitors, Cloud SIEM insights, entities, and Cloud SOAR incidents. Before building a new one, check whether an existing playbook (or one from App Central) already does what you need.

Follow the steps below to create a playbook using Mobot:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Automation > Playbooks**. You can also click the **Go To...** menu at the top of the screen and select **Playbooks**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Automation**. <br/>Previously-created playbooks display.
1. Click the **+ Create Playbook** button.
1. Click the untitled playbook and rename it.<br/><img src={useBaseUrl('img/cse/automations-new-playbook-dialog.png')} style={{border:'1px solid gray'}} alt="New playbook dialog" />
1. Enter a **Description** of the playbook to help others understand how to use it.
1. Select the incident **Type**. (For example, for Cloud SIEM automations, select **Cloud SIEM**. For playbooks run from inside another playbook, you can select another incident type to associate with it, for example, **Denial of Service**, **Malware**, **Phishing**, and so on.)
1. In the chat box, describe the automation you want in plain language. For example, `Create a playbook that creates tickets and sends notifications`.<br/><img src={useBaseUrl('img/cse/prompt-for-mobot.png')} style={{border:'1px solid gray'}} alt="Mobot chatbox" />
1. Answer Mobot's clarifying questions. Mobot checks your org's available integrations, asks which ones you'd like to use, then walks through each action node one at a time to gather the configuration details it needs.
1. Review and approve the plan Mobot proposes, including the trigger, steps, and flow between them.
1. Once every step is confirmed, Mobot saves the playbook as a draft and posts a summary table of what was built (Step / Action / Details).
1. To make changes, send a follow-up request describing the edit.<br/><img src={useBaseUrl('img/cse/edit-playbook.png')} style={{border:'1px solid gray'}} alt="edit-playbook" width="200"/><br/>Mobot returns an updated plan reflecting the new flow.
1. Reply `Yes` (or similar) to approve, and Mobot rebuilds and resaves the playbook.
1. Click any node on the canvas to verify the details Mobot filled in, such as the integration, resource, and field mappings pulled from the trigger payload.<br/><img src={useBaseUrl('img/cse/playbook-flow.png')} style={{border:'1px solid gray'}} alt="playbook-flow"/>
1. Click **Publish** to make the playbook available for use in automations.