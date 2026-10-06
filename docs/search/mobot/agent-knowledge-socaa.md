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

Agent Knowledge lets org administrators give Dojo AI agents the facts, patterns, and practices that normally live only in your team's heads. You teach the agent once, and it keeps that context across sessions and applies it to every investigation. The [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) is the first agent to support it, with additional Dojo AI agents planned for later phases.

Without this context, the agent reasons from normalized security data alone. It does not know that a particular IP address is your vulnerability scanner, or that a Friday spike in authentication failures is your scheduled penetration test. Knowledge closes that gap. Over time, the agent's verdicts and follow-ups reflect your environment and your team's judgment rather than a generic baseline.

For the SOC Analyst Agent, knowledge applies in two places:

* **Auto-investigation**. The knowledge is applied automatically as the agent triages each insight that flows into Cloud SIEM.
* **Manual investigation**. When a user manually triggers an investigation in Cloud SIEM, the same knowledge is in context.

## What you can teach your Dojo AI agents

Knowledge falls into three themes.

### Your environment

The standing facts about how your organization is set up, how it normally behaves, and what it is required to meet.

| What to capture | Example knowledge entries |
|:--|:--|
| Vulnerability scanner | 10.0.50.12 is our Nessus scanner. We rotate the IP every 30 days. Do not flag high-severity brute-force or port-scan alerts from this host. |
| Maintenance windows | Sunday maintenance windows run 0100–0500 UTC. Automated patching routinely triggers EDR alerts on Host-041 during this window. |
| Known-safe user behavior | User jsmith is a penetration tester who routinely runs Kali Linux tools and Mimikatz from the 192.168.5.0/24 management subnet. This is authorized. |
| Executive travel | Executive v_rossi travels frequently to APAC. Legitimate logins from Tokyo or Singapore IP blocks are expected during non-US business hours. |
| Backup vendor activity | Backup vendor Datto uses account svc-datto-backup daily at 0200 UTC to modify shadow copies. Do not flag this as ransomware behavior. |
| Legacy system exception | Host-102 is a legacy payroll server running an unpatchable OS. Isolate it from outbound internet traffic and ignore normal OS-version vulnerability flags. |
| Policy exception | Remote root SSH access is forbidden by policy SEC-04 except on Host-009, which holds an approved regulatory waiver due to legacy hardware constraints. |

### Historical learning and team judgment

Specific past incidents, and the recurring patterns your team has learned to recognize.

| What to capture | Example knowledge entries |
|:--|:--|
| Past incident resolution | The Nov 12 authentication spike was resolved by rotating the API credentials for svc-deploy. Any similar spike on that account should check for stale credentials first. |
| Known false-positive pattern | Friday brute-force spikes on domain controllers are usually the scheduled pentest run by the security team. Confirm timing before escalating. |
| Recurring alert noise | Qualys triggers high-severity brute-force alerts on domain controllers every Tuesday at 2300 UTC during scheduled network discoveries. This is expected. |
| Post-mortem lesson | INC-2025-089: A rogue scheduled task named OneDriveUpdate bypassed triage because analysts assumed it was a native app. Inspect all newly registered tasks regardless of naming conventions. |
| Forensic heuristic | TrueBot campaigns consistently use renamed 7z.exe binaries for exfiltration. Check file entropy and headers, not just the extension. |


## How to add an agent knowledge source

:::info
Adding or changing knowledge requires the `manageAgent` role capability scoped to the SOC Analyst Agent. Sumo Logic provisions the initial grant; contact your account team to get started. Your typed notes are stored as knowledge that only the SOC Analyst Agent can access.
:::

To add knowledge for the SOC Analyst Agent:

1. Click the **Dojo AI** tab in the left navigation.
1. Click **SOC Analyst Agent**. This opens the agent's settings page.<br/><img src={useBaseUrl('img/search/mobot/agent-knowledge-dojo-roster-socaa.png')} alt="The Dojo agent roster page showing the SOC Analyst Agent card" style={{border: '1px solid gray'}} width="700" />
1. Click **Sources**. On this page, you can view, edit, and delete existing knowledge sources.<br/><img src={useBaseUrl('img/search/mobot/agent-knowledge-sources-socaa.png')} alt="Sources page under SOC Analyst Agent settings, showing the list of knowledge sources and the Add Source button" style={{border: '1px solid gray'}} width="700" />
1. Click **+ Add Source** to add a new knowledge source.<br/><img src={useBaseUrl('img/search/mobot/agent-knowledge-add-source-socaa1.png')} alt="Add Source form with empty Name and Content fields" style={{border: '1px solid gray'}} width="700" />
1. Give the source a name and type the fact, pattern, or practice in the content field, then click **Save** when you're done. Here's an example:<br/><img src={useBaseUrl('img/search/mobot/agent-knowledge-add-source-socaa2.png')} alt="Sources form showing Name and Content fields filled in with a vulnerability scanning example" style={{border: '1px solid gray'}} width="700" /><br/>
   See [What you can teach your Dojo AI agents](#what-you-can-teach-your-dojo-ai-agents) for more sample entries.
   :::important
   Only plain text is supported. Each knowledge source item works best when it covers one concept, uses two to five sentences, and references specific names, IPs, patterns, or procedures your team actually uses.
   :::

From here, whenever your knowledge shapes a response, the agent surfaces which piece it drew on and how it was applied, so a verdict is never a black box.

<img src={useBaseUrl('img/search/mobot/agent-knowledge-citation-socaa.png')} alt="Knowledge citation panel in an investigation result, showing Source and Used for columns" style={{border: '1px solid gray'}} width="500" />

*Example: citation panel from an investigation showing which knowledge the agent applied and how it was used.*

## Limitations

The following apply during Private Preview:

* **Audit logging for knowledge**. A comprehensive record of who added or changed a given fact, and when, is not yet available. It is planned for a later phase.
* **Security guardrails**. Security guardrails on knowledge content are planned for upcoming phases.
* **Scope**. Knowledge currently powers the SOC Analyst Agent only. Support for other Dojo AI agents, such as the Root Cause Agent, is planned for a later phase. It is not available on standalone Mobot.
* **Text only**. Knowledge sources accept plain text only. File uploads, URLs, and other source types are not supported in this release.

Some limits are not tied to the preview phase:

* **The agent does not act on response knowledge**. You can give the agent knowledge about your response practices, but it does not take or execute containment or remediation actions. See [Can the agent take containment actions on its own?](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#can-the-agent-take-containment-actions-on-its-own) in the SOC Analyst Agent documentation.
* **One knowledge base per agent**. Everyone on your team draws on the same shared knowledge for a given agent. Per-team or per-tenant partitioning is not part of this release.

## FAQ

### What should I add first?

Start with the facts that most often send an investigation the wrong way: which internal IP addresses and accounts are expected to behave unusually, your maintenance and deploy windows, and the alert patterns your team already knows the cause of. Then add the runbooks that define how your team investigates.

### Can I test whether a knowledge entry is working?

Yes. You can ask the SOC Analyst Agent to answer without your knowledge applied, then compare that response to the knowledge-enriched result. This lets you validate whether a specific entry is shaping the agent's output as expected.

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
