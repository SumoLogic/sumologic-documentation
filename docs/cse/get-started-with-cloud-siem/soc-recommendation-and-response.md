---
id: soc-recommendation-and-response
title: SOC Recommendation and Response
sidebar_label: SOC Recommendation and Response ✨
description: Execute recommended actions from the SOC Analyst Agent to respond to Cloud SIEM insights, with explicit analyst approval and your own credentials.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
Executing a recommended action is in Private Preview. For more information, contact your Sumo Logic account representative. [Recommended Actions](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#recommended-actions) themselves are generally available.
:::

Each recommended action appears as a card with a title and a rationale. A card is one of two types:
* **Executable**. The recommendation matches a tool from an integration that is enabled for the agent in Dojo Studio. The card shows a blue **Execute** button.
* **Suggested** (text-only). No enabled integration matches the recommendation. The card has no **Execute** button and serves as a manual follow-up prompt.

**Audit trail**. Every action, analyst decision, and execution result is logged.

## How executable actions work

Executable actions depend on the integrations that are enabled for the agent in Dojo Studio. When the agent investigates an insight and suggests recommendations, it checks each recommendation against the tools of the enabled integrations. If a recommendation matches an enabled integration tool, the action appears as executable. Recommendations with no matching enabled integration stay informational.

:::important
When you click **Execute**, the action runs with your credentials and access in the integrated tool. It does not use the credentials of the agent owner or any shared credentials. Results depend on your permissions in that tool.
:::

## Prerequisites

* Your org has a Cloud SIEM subscription with the SOC Analyst Agent enabled. See [Availability](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#availability).
* SOC analysts have a role with the **Manage Integrations** [role capability](/docs/manage/users-roles/roles/role-capabilities/#automation-service), which is required to execute response actions.
* Executing recommended actions has been enabled for your org by your Sumo Logic representative.
* Someone in your org has taken ownership of the agent in Dojo Studio.
* For executable actions, the agent owner has enabled the corresponding integrations in Dojo Studio. See [Enable integrations for the agent](#enable-integrations-for-the-agent).
* You have access to the integrated tool, because actions run with your credentials.

## Enable integrations for the agent

You can choose the SOC Analyst Agent or the Root Cause Agent (the DojoAI agent that identifies the underlying cause of an issue) in Dojo Studio. To make recommended actions executable, take ownership of the agent and enable the integrations you need.

1. In Dojo Studio, select the agent and take ownership of it.
1. Go to **DojoAI** > **Studio** > **SOC Analyst Agent** > **Integrations**.
1. Enable the integrations you need.

## Execute a recommended action

Every action requires explicit analyst approval before execution. The agent never takes autonomous action.

1. Click **Execute** on a recommended action to open the confirmation dialog.<br/><img src={useBaseUrl('img/cse/soc-rr-execute-blue.png')} alt="AI Investigation tab of an insight showing Recommended Actions with blue Execute buttons" style={{border: '1px solid gray'}} width="800" />
1. Review the **Reasoning** and edit the **Payload** (JSON) if needed.
1. Click **Confirm**.

The system records your approval with your analyst identity and a timestamp, then runs the action in the background. The card updates when execution completes. To analyze the result further, you can continue the conversation with the SOC Analyst Agent or the Root Cause Agent. Executed actions are recorded in audit logs.

If the action runs successfully, the card turns green and shows an **Executed** badge. If it does not, the card shows a red **Retry** button with an inline error message. Click **Retry** to run the action again.

<img src={useBaseUrl('img/cse/soc-rr-execute-results.png')} alt="Recommended Actions showing a red Retry button on an action that did not run, a green Executed badge on an action that ran successfully, and unexecuted actions" style={{border: '1px solid gray'}} width="800" />

## Known limitations

The following capabilities are not currently available:

* **Recommending disabled integrations**. Recommendations without an enabled integration appear as text-only suggestions; the agent will not guide you through enabling the integration.
* **Multi-action plans**. Execute actions individually; coordinated multi-action plans are not yet supported.
* **Playbook recommendations**. Customer-created playbooks are not suggested alongside recommended actions.
* **Autonomous execution**. All actions require explicit analyst approval. Fully autonomous execution is planned for a future phase.
* **Automated rollback**. Reversal of executed actions requires manual steps.
