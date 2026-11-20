---
id: soc-recommendation-and-response
title: SOC Recommendation and Response
sidebar_label: SOC Recommendation and Response ✨
description: Execute recommended actions from the SOC Analyst Agent to respond to Cloud SIEM insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
Executing a recommended action is in Private Preview. For more information, contact your Sumo Logic account representative. [Recommended Actions](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#recommended-actions) themselves are generally available.
:::

<!--TODO (DOCS-2055): Update for the Dojo Studio flow: executable actions depend on integrations connected to the SOC agent in Dojo Studio, prerequisites, and the note that actions run with the clicking user's credentials.-->

Each recommended action appears as a card with a title and a rationale. A card is one of two types:
* **Executable**. The required integration is installed. The card shows a blue **Execute** button.
* **Suggested** (text-only). The integration is not installed. The card has no **Execute** button and serves as a manual follow-up prompt.

**Audit trail**. Every action, analyst decision, and execution result is logged immutably.

## Prerequisites

* Your org has a Cloud SIEM subscription with the SOC Analyst Agent enabled. See [Availability](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#availability).
* SOC analysts have a role with the **Manage Integrations** [role capability](/docs/manage/users-roles/roles/role-capabilities/#automation-service), which is required to execute response actions.
* The Response Agent feature has been enabled for your org by your Sumo Logic representative.
* For executable actions, the corresponding integration must be installed and configured in Sumo Logic's integrations platform. Contact your Sumo Logic representative for the list of supported integrations and the permissions required for each.

## Execute a recommended action

Every action requires explicit analyst approval before execution. The agent never takes autonomous action.

1. Click **Execute** on a recommended action to open the confirmation dialog.<br/><img src={useBaseUrl('img/cse/soc-rr-execute-blue.png')} alt="AI Investigation tab of an insight showing Recommended Actions with blue Execute buttons" style={{border: '1px solid gray'}} width="800" />
1. Review the **Reasoning** and edit the **Payload** (JSON) if needed.
1. Click **Confirm**.

The system records your approval with your analyst identity and a timestamp, then runs the action in the background. The card updates when execution completes. To analyze the result further, you can continue the conversation in Mobot.

If the action runs successfully, the card turns green and shows an **Executed** badge. If it doesn't, the card shows a red **Retry** button with an inline error message. Click **Retry** to run the action again.

<img src={useBaseUrl('img/cse/soc-rr-execute-results.png')} alt="Recommended Actions showing a red Retry button on an action that didn't run, a green Executed badge on an action that ran successfully, and unexecuted actions" style={{border: '1px solid gray'}} width="800" />

## Known limitations

The following capabilities are not currently available:

* **Recommending uninstalled integrations**. Uninstalled integrations appear as text-only suggestions; the agent will not guide you through installation.
* **Multi-action plans**. Execute actions individually; coordinated multi-action plans are not yet supported.
* **Playbook recommendations**. Customer-created playbooks are not suggested alongside recommended actions.
* **Autonomous execution**. All actions require explicit analyst approval. Fully autonomous execution is planned for a future phase.
* **Automated rollback**. Reversal of executed actions requires manual steps.
