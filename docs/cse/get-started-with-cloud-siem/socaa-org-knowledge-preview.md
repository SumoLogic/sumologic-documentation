---
id: socaa-org-knowledge-preview
title: SOC Analyst Agent Knowledge
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

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

SOC Analyst Agent Knowledge lets an administrator give the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) the facts, patterns, and practices that normally live only in your team's heads. You teach the agent once, and it keeps that context across sessions and applies it to every investigation.

Without this context, the agent reasons from normalized security data alone. It does not know that a particular IP address is your vulnerability scanner, that a Friday spike in authentication failures is your scheduled penetration test, or that your team escalates anything involving PII straight to the security lead. Knowledge closes that gap. Over time, the agent's verdicts and follow-ups reflect your environment and your team's judgment rather than a generic baseline.

The agent uses your knowledge in two places:

* **Auto-investigation**. The knowledge is applied automatically as the agent triages each insight that flows into Cloud SIEM.
* **Mobot follow-ups**. When you `@`-mention the SOC Analyst Agent in [Mobot](/docs/search/mobot/) to dig into an investigation result, the same knowledge is in context.

Whenever your knowledge shapes a response, the agent surfaces which piece it drew on, so a verdict is never a black box.

## What you can teach the agent

Knowledge falls into three themes. Each one spans both the facts you would tell a new analyst on their first day and the judgment they build over time.

| Theme | What it covers | Examples |
|:--|:--|:--|
| **Your environment** | The standing facts about how your organization is set up, how it normally behaves, and what it is required to meet. | `10.0.50.12 is our Nessus scanner; we rotate the IP every 30 days.` <br/> `MFA is required on all admin accounts.` <br/> `Sunday maintenance windows run 0100–0500 UTC and trigger EDR alerts on Host-041.` |
| **Historical learning and team judgment** | Specific past incidents, and the recurring patterns your team has learned to recognize. | `The Nov 12 spike was resolved by rotating API credentials.` <br/> `Friday brute-force spikes are usually the scheduled pentest.` |
| **Operational practices and workflows** | How your organization decides what to do, and the steps your team takes. | `PII gets escalated straight to the security lead; we skip the ticket queue.` <br/> `Impossible-travel alert, verify identity history, then open a ticket.` |

You can attach a supporting file to any of these, such as a runbook, an escalation matrix, a list of known false positives, or a postmortem.

## Add knowledge

During Private Preview, your account team points you to the settings. Knowledge is managed on the Dojo AI **Agent Settings** page, in the **Knowledge** section for the SOC Analyst Agent.

You add an item in one of two ways:

* **Type a note**. Write the fact, pattern, or practice in plain language.
* **Upload a file**. Attach a PDF, TXT, or Markdown file, with an optional note describing what it covers.

### Guardrails on submit

Before anything is saved, the agent checks what you entered and blocks:

* Content that is not knowledge the agent can use, such as off-topic text.
* Live secrets or credentials.
* Very long, unstructured text.
* Entries that duplicate or contradict something already saved.

Each block comes with a plain-language explanation and a way to fix the entry.

### Review before saving

Every entry that passes the guardrails is auto-tagged by theme, checked against your existing knowledge, and shown back to you before it is committed:

* You see what the agent understood, so you can catch a misread at the cheapest possible moment.
* A detected procedure shows its step count, so a missing step is visible without re-reading the parse.
* A conflict with existing knowledge is shown as a resolution the agent proposes and you must explicitly accept.

### Adjust with Mobot

Instead of editing fields directly, you can describe a correction, an added detail, or a point of confusion to Mobot in plain language. Mobot updates the draft or flags it for review.

## Keep your knowledge current

Raw entries on the same topic are synthesized into readable paragraphs, each linking back to the notes and files it came from. A separate page lets you search and verify everything the agent has been told.

The agent also helps you keep that knowledge healthy. These signals are passive. They appear on the knowledge summary page, never as an interruption during capture or investigation, and resolving them is always your action.

* **Staleness**. Facts in categories that go out of date, such as schedules, requirements, and precedents, are flagged when they have not been re-verified in 90 days, with a one-click **Confirm** or **Update**.
* **Redundancy**. A new entry that overlaps heavily with an existing one on the same topic is offered as a merge, never merged automatically.
* **Flag as wrong**. Any stored item can be marked incorrect, with an optional note.
* **Re-upload**. A file-sourced item can have its source file swapped without losing its place in the record.

## What is included in Private Preview

Private Preview covers the full capture flow described above, knowledge applied in both auto-investigation and Mobot follow-ups, and the knowledge summary page.

It also includes **baseline comparison**: when you need to validate an output, ask Mobot for the SOC Analyst Agent to answer without your knowledge applied, and compare.

## Limitations

The following apply during Private Preview:

* **Audit logging for knowledge**. A comprehensive record of who added or changed a given fact, and when, is not yet available. It is planned for a later phase.
* **Role-based contribution controls**. Scoping who can add or edit knowledge by role is not yet available.

Some limits are not tied to the preview phase:

* **The agent does not act on response knowledge**. You can give the agent knowledge about your response practices, but it does not take or execute containment or remediation actions. See [Can the agent take containment actions on its own?](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#can-the-agent-take-containment-actions-on-its-own) in the SOC Analyst Agent documentation.
* **One knowledge base per organization**. Everyone on your team draws on the same shared knowledge. Per-team or per-tenant partitioning is not part of this release.
* **SOC Analyst Agent required**. Knowledge is a capability of the SOC Analyst Agent and is not available on standalone Mobot.

## Permissions and data access

Adding or changing knowledge requires administrator configuration. Your typed notes and uploaded files are stored as organizational knowledge for the SOC Analyst Agent.

Knowledge should describe your environment, not carry access to it.

Compliance and security reviews go through the standard review path with your account team.

## FAQ

### How is this different from the agent learning from past investigations?

The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#does-the-agent-learn-from-past-investigations) does not learn on its own. Knowledge is the supported way to give it durable context. You author it deliberately, you can see everything it holds, and you can correct or remove any item.

### What should I add first?

Start with the facts that most often send an investigation the wrong way: which internal IP addresses and accounts are expected to behave unusually, your maintenance and deploy windows, and the alert patterns your team already knows the cause of. Then add the runbooks and escalation rules that define how your team responds.

### Does adding knowledge retrain the agent's model?

No. Knowledge is retrieved and applied as context at investigation time. It does not change the underlying model, so you can update or remove an item and the next investigation reflects the change.

### When does new knowledge take effect?

On the next investigation that runs after you save it. Saving knowledge does not re-run past investigations. To apply it to an insight the agent already investigated, click **Investigate** on that insight to run a new one.

### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

## Additional resources

* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). The agent that Knowledge extends.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning/). How the SOC Analyst Agent fits alongside Mobot, the Sumo Logic MCP server, and Sumo Logic's classical machine learning capabilities.
