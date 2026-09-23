---
id: agent-knowledge-socaa
title: Agent Knowledge for SOC Analyst Agent
description: Teach the Cloud SIEM SOC Analyst Agent your environment, runbooks, and past incidents so its investigations of Cloud SIEM insights reflect how your team works.
keywords:
  - mobot
  - dojo ai
  - soc analyst agent
  - agentic ai
  - cloud siem
  - organizational knowledge
  - agent knowledge
  - ai investigation
  - soc
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

Agent Knowledge lets org administrators give the Mobot agents the facts, patterns, and practices that normally live only in your team's heads. You teach the agent once, and it keeps that context across sessions and applies it to every investigation.

Currently, this feature is available for [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) and we'll be rolling it out to other agents.

Without this context, the agent reasons from normalized security data alone. It does not know that a particular IP address is your vulnerability scanner, that a Friday spike in authentication failures is your scheduled penetration test, or that your team escalates anything involving PII straight to the security lead. Knowledge closes that gap. Over time, the agent's verdicts and follow-ups reflect your environment and your team's judgment rather than a generic baseline.

The agent uses your knowledge in two places:

* **Auto-investigation**. The knowledge is applied automatically as the agent triages each insight that flows into Cloud SIEM.
* **Mobot follow-ups**. When you `@`-mention the SOC Analyst Agent in [Mobot](/docs/search/mobot/) to dig into an investigation result, the same knowledge is in context.

Whenever your knowledge shapes a response, the agent surfaces which piece it drew on and how it was applied, so a verdict is never a black box.

<img src={useBaseUrl('img/search/mobot/agent-knowledge-citation-socaa.png')} alt="Knowledge citation panel in an investigation result, showing Source and Used for columns" style={{border: '1px solid gray'}} width="500" />

## What you can teach the agent

Knowledge falls into three themes.

| Theme | What it covers | Examples |
|:--|:--|:--|
| **Your environment** | The standing facts about how your organization is set up, how it normally behaves, and what it is required to meet. | `10.0.50.12 is our Nessus scanner; we rotate the IP every 30 days.` <br/> `MFA is required on all admin accounts.` <br/> `Sunday maintenance windows run 0100–0500 UTC and trigger EDR alerts on Host-041.` <br/> `Analysts traveling internationally connect via VPN and may generate authentication alerts from unexpected IP ranges.` |
| **Historical learning and team judgment** | Specific past incidents, and the recurring patterns your team has learned to recognize. | `The Nov 12 spike was resolved by rotating API credentials.` <br/> `Friday brute-force spikes are usually the scheduled pentest.` |
| **Operational practices and workflows** | How your organization decides what to do, and the steps your team takes. | `PII gets escalated straight to the security lead; we skip the ticket queue.` <br/> `Impossible-travel alert, verify identity history, then open a ticket.` |

## Add knowledge

During Private Preview, your account team points you to the settings. Knowledge is managed on the Dojo AI **Agent Settings** page, under **Knowledge** > **Sources** for the SOC Analyst Agent.

<img src={useBaseUrl('img/search/mobot/agent-knowledge-sources-socaa.png')} alt="Knowledge Sources page showing the Name and Content fields for adding a knowledge item, and the list of existing items below" style={{border: '1px solid gray'}} width="700" />

To add an item, give it a name and type the fact, pattern, or practice in the content field. Each item is limited to 10,000 characters.

Each item works best when it covers one concept, uses two to five sentences, and references specific names, IPs, patterns, or procedures your team actually uses. If you paste a longer document, the agent breaks it into separate entries automatically.

## What is included in Private Preview

Private Preview covers the full capture flow described above, knowledge applied in both auto-investigation and Mobot follow-ups, and the knowledge summary page.

It also includes **baseline comparison**: when you need to validate an output, ask Mobot for the SOC Analyst Agent to answer without your knowledge applied, and compare.

## Limitations

The following apply during Private Preview:

* **Audit logging for knowledge**. A comprehensive record of who added or changed a given fact, and when, is not yet available. It is planned for a later phase.
* **Role-based contribution controls**. Scoping who can add or edit knowledge by role is not yet available.
* **Scope**. Knowledge currently powers the SOC Analyst Agent and is not available on standalone Mobot. Support for other Dojo AI agents, such as the Root Cause Agent, is planned for a later phase.

Some limits are not tied to the preview phase:

* **The agent does not act on response knowledge**. You can give the agent knowledge about your response practices, but it does not take or execute containment or remediation actions. See [Can the agent take containment actions on its own?](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#can-the-agent-take-containment-actions-on-its-own) in the SOC Analyst Agent documentation.
* **One knowledge base per organization**. Everyone on your team draws on the same shared knowledge. Per-team or per-tenant partitioning is not part of this release.

## Permissions and data access

Adding or changing knowledge requires the `manageAgent` role capability scoped to the SOC Analyst Agent. Sumo Logic provisions the initial grant; contact your account team to get started. Your typed notes are stored as knowledge that only the SOC Analyst Agent can access.

## FAQ

### What should I add first?

Start with the facts that most often send an investigation the wrong way: which internal IP addresses and accounts are expected to behave unusually, your maintenance and deploy windows, and the alert patterns your team already knows the cause of. Then add the runbooks and escalation rules that define how your team responds.

### Does adding knowledge retrain the agent's model?

No. Knowledge is retrieved and applied as context at investigation time. It does not change the underlying model, so you can update or remove an item and the next investigation reflects the change.

### When does new knowledge take effect?

On the next investigation that runs after you save it. Saving knowledge does not re-run past investigations.

### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

## Additional resources

* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). The agent that Knowledge extends.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning/). How the SOC Analyst Agent fits alongside Mobot, the Sumo Logic MCP server, and Sumo Logic's classical machine learning capabilities.
