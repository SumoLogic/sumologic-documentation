---
id: soc-recommendation-and-response
title: SOC Recommendation and Response
sidebar_label: SOC Recommendation and Response ✨
description: Use the Sumo Logic SOC Recommendation and Response feature to review AI-generated containment and communication actions, then approve and execute them directly from Cloud SIEM insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::important Private Preview
SOC Recommendation and Response is available as a private preview. Features, behavior, and availability may change before general release.
:::

<img src={useBaseUrl('img/icons/security/soc-analyst-agent-icon.png')} alt="SOC Recommendation and Response icon" width="35"/>

SOC Recommendation and Response extends the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) by making its verdicts actionable. After the SOC Analyst Agent triages an insight, the **AI Recommended Actions** section surfaces contextually appropriate actions you can review, approve, and execute without leaving Cloud SIEM. You can also request recommendations directly in a Mobot investigation by asking the agent to recommend actions.

Every action requires explicit analyst approval before execution. The agent never takes autonomous action.

## Key concepts

**Response recommendations** are actions the Response Agent proposes based on the Triage Agent's verdict, the insight context, and the criticality of the affected assets. Recommendations appear as clickable cards in the UI after an investigation or analysis completes.

Each recommendation includes:
- The specific target (IP address, hostname, user account, and so on)
- The rationale explaining why the action is recommended
- Confidence score and impact level
- Whether the action is reversible
- Estimated blast radius (systems and users affected)

**Executable vs. suggested actions.** An action is executable when your organization has the relevant integration installed and configured in Sumo Logic's integrations platform. If the integration is not installed, the action appears as a suggestion without an **Execute** button. You can still send suggested actions to a ticket or add them to tasks for manual follow-up.

**Action types.** The agent recommends actions based on what integrations are available in your environment. Common categories include:
- **Containment actions**. Isolate endpoints, block IPs or domains, or disable compromised accounts using connected security tools and identity providers.
- **Communication actions**. Notify stakeholders via messaging platforms, create incident tickets, or trigger escalation workflows in on-call systems.

**Audit trail**. Every recommended action, analyst approval or rejection, modification, and execution result is logged immutably. All response activity is captured in Cloud SIEM's audit event index.

## Prerequisites

Before using SOC Recommendation and Response, confirm the following:

- Your organization has a Cloud SIEM subscription with the SOC Analyst Agent enabled. See [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/).
- The Response Agent feature has been enabled for your organization by your Sumo Logic representative.
- SOC analysts have the necessary Sumo Logic permissions to approve and execute response actions.

### Set up integrations for executable actions

Recommended actions become executable when the corresponding integration is installed in Sumo Logic's integrations platform. To configure an integration:

1. Navigate to the integrations platform in your Sumo Logic account.
1. Install and configure the integration for the tool you want the agent to act on.
1. Ensure the credentials configured for the integration have the minimum permissions required to perform response actions (for example, write access to isolate endpoints or create tickets).

Contact your Sumo Logic representative for the list of integrations supported in the private preview and the permissions required for each.

## How to use recommendations and response

### Review recommendations after triage

After the SOC Analyst Agent renders a verdict of Malicious or Suspicious on an insight, the insight's details page displays an **AI Recommended Actions** section below the triage findings. You can also ask the agent to recommend actions at any point during a Mobot investigation.

Each recommendation appears as a card with the action title and a rationale. How each card behaves depends on whether the relevant integration is installed:

- **Execute button (blue)**. The integration is installed and the action is ready to run with analyst approval.
- **No Execute button**. The integration is not installed. The action is shown as a suggestion only. You can still use **Add to Tasks** or **Send to Ticket** to track it manually.
- **Failed badge (red)**. A previous execution attempt failed. The error message is shown inline on the card.

### Preview and customize an action before executing

Before approving any action, click **Execute** to open the Impact Preview sidebar. The sidebar shows:

- Exact actions to be taken and their targets
- Systems and users affected
- Expected outcome and estimated blast radius
- Reversibility information
- Pre-execution validation results

The action payload is editable. You can modify targets or parameters directly in the preview before approving. Each modification triggers re-validation.

For high-impact actions (such as isolating a production server), the preview includes an explicit warning and may require you to type a confirmation phrase before proceeding.

Review this information carefully before clicking **Approve and Execute**.

### Approve and execute

To execute an action:

1. Click **Execute** on a recommended action card.
1. Review the Impact Preview sidebar. Edit the action payload if needed.
1. If validation passes, click **Approve and Execute**.
   - For high-impact actions, type the confirmation phrase shown (for example, `ISOLATE`) and then click **Approve and Execute**.
1. The system records your approval with your analyst identity and a timestamp.

Execution status updates in real time: **Pending** → **Executing** → **Completed** or **Failed**.

When execution completes, verification evidence is displayed. If an action fails, the card shows a red **Failed** badge with an inline error message and actionable guidance to resolve the issue.

### Execute a multi-action plan

To address a threat that requires coordinated steps, you can select multiple recommended actions and execute them together:

1. Select each action you want to include.
1. Review the combined plan. Dependencies between actions are shown.
1. Click **Approve and Execute** to approve the entire plan, or approve individual actions within it.

### Send an action to a ticket

If you want to track or hand off an action rather than execute it directly:

1. Click **Send to Ticket** on a recommended action.
1. A ticket is created in your configured ticketing system with the action description, AI-generated rationale, relevant triage evidence, and a link back to the insight.
1. The ticket link is displayed on the insight for reference.

### Add an action to insight tasks

To create a task within the insight for manual follow-up:

1. Click **Add to Tasks** on a recommended action.
1. A task is created in the insight's Tasks tab with the action description, rationale, and evidence.
1. You can assign the task, set priority, and track completion from the Tasks tab.

### Use investigation context with recommendations

If you open Mobot to investigate an insight further before acting, the Response Agent incorporates what Mobot discovers. Recommendations update to reflect additional indicators of compromise, scope of compromise, and analyst-assessed severity from the investigation. The UI indicates when recommendations are informed by investigation findings.

### View the audit trail

To review all response activity for an insight, click **View Audit Trail** from the insight's details page. The audit trail includes:

- Analyst identity (username)
- Insight ID and triage verdict
- Each recommended action and rationale
- Modifications made by the analyst
- Approval timestamp
- Validation results
- Execution start and end timestamps
- Execution results and verification evidence
- Any errors or failures
- External systems accessed

Audit records are immutable, retained for at least one year, and exportable as CSV or JSON for compliance reporting. Audit logs are also accessible via the Sumo Logic API for SIEM ingestion.

```sql
_index=sumologic_audit_events _sourceCategory=dojo
| where eventName = "ResponseAgentAction"
```

### Provide feedback

After an action executes, a feedback prompt appears: **Was this response appropriate?** Use the thumbs-up or thumbs-down buttons to rate the recommendation. You can optionally add a comment describing what could be improved. Analyst feedback informs future recommendation quality.

## Known limitations

The following capabilities are not available in the private preview:

- **Recommending uninstalled integrations for setup.** The agent does not yet suggest which integrations to install based on the tools in your environment. Uninstalled integrations appear as suggested actions without an execute button, but the agent will not guide you through installation.
- **Playbook recommendations.** The agent does not yet suggest customer-created playbooks alongside its recommended actions.
- **Remediation actions.** Actions that remove threats or restore systems after containment (for example, deleting malware files, restoring files from backup) are not supported in this release.
- **Autonomous execution.** All actions require explicit analyst approval. Fully autonomous execution of low-risk responses is planned for a future phase.
- **Network segmentation.** Moving compromised systems to a quarantine VLAN is not supported in this release.
- **Automated rollback.** Reversal of executed actions requires manual steps. The audit trail includes links to undo instructions where applicable.

## Share feedback with the Sumo Logic team

During the private preview, your feedback directly shapes the product. Use the thumbs-up or thumbs-down prompt after each response execution. For broader feedback, reach out to your Sumo Logic representative or the preview program contact listed in your onboarding materials.

## Additional resources

- [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). Learn about the triage and investigation capabilities that the Response Agent builds on.
- [Sumo Logic | Dojo AI](https://www.sumologic.com/blog/dojo-ai/). Learn about Dojo AI, Sumo Logic's multi-agent AI platform.
