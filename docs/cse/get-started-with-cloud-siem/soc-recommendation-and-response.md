---
id: soc-recommendation-and-response
title: SOC Recommendation and Response
sidebar_label: SOC Recommendation and Response ✨
description: Use the Sumo Logic SOC Recommendation and Response feature to review AI-generated response recommendations and execute them directly from Cloud SIEM insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

SOC Recommendation and Response extends the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) by making its verdicts actionable. After the SOC Analyst Agent triages an insight, it generates contextually appropriate **AI Recommended Actions** you can review and execute without leaving Cloud SIEM. You can also request recommendations directly in a [Mobot](/docs/search/mobot/) investigation by asking the agent to recommend actions.

* Recommendations appear as cards with a title and a rationale. Each card is one of two types:
  * **Executable**. The required integration is installed. The card shows a blue **Execute** button.
  * **Suggested** (text-only). The integration is not installed. The card has no **Execute** button and serves as a manual follow-up prompt.
* **Audit trail**. Every action, analyst decision, and execution result is logged immutably.

## Prerequisites

* Your org has a Cloud SIEM subscription with the SOC Analyst Agent enabled. See [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/).
* SOC analysts have a role with the **Manage Integrations** [role capability](/docs/manage/users-roles/roles/role-capabilities/#automation-service), which is required to execute response actions.
* The Response Agent feature has been enabled for your org by your Sumo Logic representative.
* For executable actions, the corresponding integration must be installed and configured in Sumo Logic's integrations platform. Contact your Sumo Logic representative for the list of integrations supported in the private preview and the permissions required for each.

## How to use recommendations and response

:::note
Every action requires explicit analyst approval before execution. The agent never takes autonomous action.
:::

### Review recommendations after triage

After the SOC Analyst Agent completes an investigation, recommendations appear in four places:

* The **Insights** list side panel when you click an insight row.<br/><img src={useBaseUrl('img/cse/soc-rr-side-panel.png')} alt="Insights list side panel showing Recommended Actions with text-only and executable cards" style={{border: '1px solid gray'}} width="700" />
* The insight's **Overview** tab > **AI Recommended Actions** section (right panel).<br/><img src={useBaseUrl('img/cse/soc-rr-overview-tab.png')} alt="AI Recommended Actions panel on the Overview tab of an insight, showing one text-only card and two cards with Execute buttons" style={{border: '1px solid gray'}} width="700" />
* The insight's **AI Investigation** tab.<br/><img src={useBaseUrl('img/cse/soc-rr-ai-inv-tab.png')} alt="AI Investigation tab of an insight showing the AI Verdict, the What Happened summary, and Recommended Actions with Execute buttons" style={{border: '1px solid gray'}} width="700" />
* In Mobot, when you open the investigation, they appear inline under the **Assessment** heading.<br/><img src={useBaseUrl('img/cse/soc-rr-mobot-assessment.png')} alt="Mobot Assessment section showing the agent verdict and two recommendation cards below it" style={{border: '1px solid gray'}} width="700" />

### Execute a recommended action

1. Click **Execute** on a card to open the confirmation dialog.<br/><img src={useBaseUrl('img/cse/soc-rr-execute-blue.png')} alt="Recommendation card with a blue Execute button" style={{border: '1px solid gray'}} width="500" />
1. Review the **Reasoning** and edit the **Payload** (JSON) if needed.
1. Click **Confirm**.

The system records your approval with your analyst identity and a timestamp. Execution runs synchronously; results feed back into the agent so follow-up questions in Mobot reflect what was done.

When execution completes, the card shows a green **Executed** badge. If an action fails, it shows a red **Failed** badge with an inline error message.

<img src={useBaseUrl('img/cse/soc-rr-mobot-execute-green.png')} alt="Mobot recommendation card showing a green Executed badge and the execution result message below the card title" style={{border: '1px solid gray'}} width="800" />

### Use investigation context with recommendations

If you investigate an insight in Mobot before acting, recommendations update as Mobot uncovers additional context. The UI indicates when recommendations are informed by investigation findings.

## Known limitations

The following capabilities are not available in the private preview:

* **Recommending uninstalled integrations**. Uninstalled integrations appear as text-only suggestions; the agent will not guide you through installation.
* **Multi-action plans**. Execute actions individually; coordinated multi-action plans are not yet supported.
* **Playbook recommendations**. Customer-created playbooks are not suggested alongside recommended actions.
* **Autonomous execution**. All actions require explicit analyst approval. Fully autonomous execution is planned for a future phase.
* **Automated rollback**. Reversal of executed actions requires manual steps.

## Additional resources

* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). Learn about the triage and investigation capabilities that the Response Agent builds on.
* [Sumo Logic | Dojo AI](https://www.sumologic.com/blog/dojo-ai/). Learn about Dojo AI, Sumo Logic's multi-agent AI platform.
