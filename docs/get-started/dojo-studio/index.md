---
slug: /get-started/dojo-studio
title: Dojo Studio
description: Use Dojo Studio to configure the Sumo Logic agents that work as teammates, including their instructions, knowledge, memories, access, and tasks.
keywords:
  - Dojo Studio
  - Dojo AI
  - SOC Analyst Agent
  - Root Cause Agent
  - agent instructions
  - agent knowledge
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Dojo Studio is where you configure the Sumo Logic agents that work as teammates on your team. Each agent runs the tasks you give it, such as investigating alerts and Insights. Start with the Sumo Logic-provided agents, add tasks as their responsibilities grow, and tune how they work with your own instructions, knowledge, and integrations.

<img src={useBaseUrl('img/get-started/dojo-studio/studio.png')} alt="Dojo Studio page showing the SOC Analyst Agent and Root Cause Agent cards" style={{border: '1px solid gray'}} width="800" />

## Enable Dojo studio

Dojo studio Access:

Everyone can view dojo Studio

Default: Administrator role can manage Dojo Studio


## Create Agent

**Feature Management** > Dojo AI role-based access

<img src={useBaseUrl('img/get-started/dojo-studio/feature-management.png')} alt="Feature Management page with the Dojo AI role-based access feature enabled" style={{border: '1px solid gray'}} width="800" />

Users and Roles > DojoAI > Administer

<img src={useBaseUrl('img/get-started/dojo-studio/administer-dojo-ai-role.png')} alt="Create New Role panel with the Administer Dojo AI capability selected under Dojo AI" style={{border: '1px solid gray'}} width="548" />


## Sumo Logic-provided agents

Sumo Logic provides two agents:

* **SOC Analyst Agent**. Investigates and triages security signals, such as Cloud SIEM Insights, and recommends next steps.
* **Root Cause Agent**. Investigates observability alerts automatically and delivers an evidence-backed root cause.

You can configure how each agent works, but you cannot change its name or description. Select an agent in Dojo Studio to open its settings.

## Open agent settings

To open an agent's settings:

1. Go to **Dojo AI** > **Studio**.
1. Click an agent, such as **SOC Analyst Agent** or **Root Cause Agent**.

The settings page shows the agent's **Status**, **Owner**, and **Publisher** at the top. Settings are grouped in the left navigation:

| Group | Settings |
|:--|:--|
| Identity | [General](#general-settings) |
| Context | [Instructions](#instructions), [Knowledge](#knowledge), [Memories](#memories), [Skills](#skills) |
| Access | [Permissions](#permissions), [Sharing](#sharing), [Integrations](#integrations) |
| Operations | [Tasks](#tasks), [Volume & Overage](#volume-and-overage) (SOC Analyst Agent only) |

Together, instructions, knowledge, and memories make up an agent's context. The agent uses this context on each run to tailor its work to your environment and your team's practices.

## General settings

The **General** page shows the agent's basic profile information, visible to your team. For Sumo Logic-provided agents, you can change the following settings:

* **Enabled**. Turns the agent on or off. A disabled agent stops chatting and running its tasks. Its settings and activity history are preserved.
* **Memory**. Controls whether the agent uses and adds [memories](#memories). When off, the agent does not use or add memories. Existing memories are kept.

The name, description, and avatar are set by Sumo Logic and cannot be edited.

<img src={useBaseUrl('img/get-started/dojo-studio/general.png')} alt="General settings page for the SOC Analyst Agent showing the Enabled and Memory toggles" style={{border: '1px solid gray'}} width="800" />

## Instructions

Instructions tell an agent how your team works, such as escalation paths, conventions, and what to avoid. The agent follows your instructions on every run. Sumo Logic also gives each agent built-in instructions, including safety guardrails. These are always applied and are not shown or editable.

To add instructions:

1. Open the agent's settings and click **Instructions**.
1. In **Additional instructions**, enter your guidance.
1. Save your changes.

<img src={useBaseUrl('img/get-started/dojo-studio/instructions.png')} alt="Instructions page showing the Additional instructions text box with a sample rule" style={{border: '1px solid gray'}} width="800" />

Account administrators and users with manage access to the agent can add instructions.

### Write effective instructions

Instructions have the highest priority among the context an agent uses, so keep them short and specific. Aim for fewer than 1,000 characters.

Use instructions for behavior, and use [knowledge](#knowledge) for reference material. To decide where something belongs, ask whether it changes how the agent behaves or gives the agent something to look up:

* *Behavior* belongs in instructions. For example, "Do not run this agent on low-severity Insights."
* *Reference material* belongs in knowledge. For example, a runbook, a list of authorized scanners, or an escalation contact list.

Instructions are not shown as citations in the agent's results.

<!--TODO: Confirm character limit. UI shows 12,000 characters, Twisa's help doc says recommended under 1,000 with no hard limit. -->

## Knowledge

Agent Knowledge lets org administrators give DojoAI agents the facts, patterns, and practices that normally live only in your team's heads. You teach the agent once, and it keeps that context across sessions and applies it to every investigation. Agent Knowledge is part of Dojo Studio, where you manage your DojoAI agents.

Without this context, the agent reasons from normalized security data alone. It does not know that a particular IP address is your vulnerability scanner, or that a Friday spike in authentication failures is your scheduled penetration test. Knowledge closes that gap and keeps it closed — over time, the agent's verdicts and follow-ups reflect your environment and your team's judgment rather than a generic baseline.

For the SOC Analyst Agent, knowledge applies in two places:

* **Auto-investigation**. The knowledge is applied automatically as the agent triages each insight that flows into Cloud SIEM.
* **Manual investigation**. When a user manually triggers an investigation in Cloud SIEM, the same knowledge is in context.

<img src={useBaseUrl('img/get-started/dojo-studio/knowledge.png')} alt="Knowledge page showing the item count, suggestions for what to add, and a table of knowledge items" style={{border: '1px solid gray'}} width="800" />

<!--TODO: Agent-agnostic changes vs the DOCS-1890 text: removed the 'first agent to support it' sentence, the 'only the SOC Analyst Agent can access' sentence, the 'Scope' limitation, and 'per agent' wording. Confirm the steps below match the new UI (Dojo Studio > agent > Settings > Knowledge > Add Knowledge), whether Knowledge sources is now Knowledge used, who can add knowledge (demo: admins only), and the limits. Twisa also wants a mix of security and observability examples, with detailed examples on a separate page. -->

### What you can teach your DojoAI agents

You can teach your DojoAI agents organizational information you want it to remember going forward, such as the following:

* **Environment**. The standing facts about how your organization is set up, how it normally behaves, and what it is required to meet. [See example entries](#your-environment).
* **Operational workflows**. The procedures and standards your team follows when it investigates and resolves incidents. [See example entries](#operational-workflows).
* **Historical learning and team judgment**. Specific past incidents, and the recurring patterns your team has learned to recognize. [See example entries](#historical-learning-and-team-judgment).

### How to add an agent knowledge source

:::info
Adding, changing, or deleting knowledge requires the Administrator role or the Manage SOC Analyst Settings (`cseManageSocAnalystSettings`) role capability.
:::

To add knowledge:

1. In the left navigation, click **DojoAI**, then click **SOC Analyst Agent**.
1. Add a new knowledge source by clicking **Sources** > **+ Add Source**, then select a source type: text input or a file (TXT, MD, PDF, or CSV). On this page, you can also view, edit, and delete existing knowledge sources.
1. If you choose text input (**Add text**), enter a **Name**, then under **Content**, type the fact, pattern, or practice. Click **Save** when you're done.
1. If you choose a file (**Upload file**), select a TXT, MD, PDF, or CSV file from your computer, then click **Save**.

See [Example knowledge sources](#example-knowledge-sources) for more sample knowledge source entries.

Whenever your knowledge shapes an investigation, the agent surfaces which entries it drew on so a verdict is never a black box. Open a Cloud SIEM Insight and scroll down in the **AI Analysis** panel. A **Knowledge sources** section lists every entry the agent applied, with a short description of each. Click any entry to page through the full set.

### Example knowledge sources

The following examples show the kind of knowledge you can add for each category.

#### Your environment

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
| Recurring alert noise | Qualys triggers high-severity brute-force alerts on domain controllers every Tuesday at 2300 UTC during scheduled network discoveries. This is expected. |
| Entity name mapping | The core payment processing API is tagged as pay-gateway-prod in application performance logs, but appears as pgw_v2 in API gateway logs and PAYMENT-SVC in incident tickets. Treat these three strings as the exact same entity to avoid missing cross-tier log events. |

#### Operational workflows

The procedures and standards your team follows when it investigates and resolves incidents.

| What to capture | Example knowledge entries |
|:--|:--|
| Postmortem requirements | Our postmortem process requires a root-cause writeup before closing any P1. |
| Investigation steps | To investigate unauthorized AWS IAM creation alerts, run the CloudTrail query for EventName 'CreateUser', correlate with the source IP, and verify against the Jira change queue. |
| Remediation workflow | To handle suspected phishing alerts, extract the header 'X-Distribution-List', check the attachment hash on VirusTotal, and run the O365 'Search-Mailbox' script to purge duplicates. |
| Investigation runbook | For an impossible-travel alert, first pull the last five Okta logins and check the ASN, not just geolocation. If the ASN matches `Zscaler-ZPA-APAC` (our corporate VPN range, listed on Confluence page NET-114), close as expected — Zscaler's APAC nodes often geolocate to Singapore/Tokyo regardless of the user's real location. If the ASN does not match, open a ticket in Jira project `SEC-INCIDENT` and page the on-call lead. |
| Fraud investigation procedure | When triaging fraudulent B2B payout redirects, searching for standard webhook_updated events yields false negatives. Query tenant_config_change where attribute = "callback_endpoint_v2". Cross-reference b2b_admin_audit logs for the same session_id or user_id to check if the modification was preceded by mfa_bypass_flag = true or an MFA-skipped session event within 30 minutes prior to the change. |
| Data exfiltration detection | When investigating mass data exfiltration on cloud storage, querying standard CloudTrail GetObject logs returns zero results because applications access storage through our custom proxy. Always search data_proxy_access where operation_type = "stream_export", and aggregate sum(bytes_sent) > 5 GB per session_token (or user_id) over a rolling 1-hour window to detect unauthorized bulk exports. |

#### Historical learning and team judgment

Specific past incidents, and the recurring patterns your team has learned to recognize.

| What to capture | Example knowledge entries |
|:--|:--|
| Past incident resolution | The Nov 12 authentication spike was resolved by rotating the API credentials for svc-deploy. Any similar spike on that account should check for stale credentials first. |
| Known false-positive pattern | Friday brute-force spikes on domain controllers are usually the scheduled pentest run by the security team. Confirm timing before escalating. |
| Post-mortem lesson | INC-2025-089: A rogue scheduled task named OneDriveUpdate bypassed triage because analysts assumed it was a native app. Inspect all newly registered tasks regardless of naming conventions. |
| Forensic heuristic | TrueBot campaigns consistently use renamed 7z.exe binaries for exfiltration. Check file entropy and headers, not just the extension. |

### Limitations

* **Plain text entry limit**. For the **Add text** source option, only plain text is supported. Up to 10,000 characters per entry. Each knowledge source item works best when it covers one concept and references specific names, IPs, patterns, or procedures your team actually uses.
* **File types and limits**. For the **Upload file** source option, only TXT, MD, PDF, and CSV files are supported. Up to 5 MB per file and up to 50 files in total.
* **Security guardrails**. Security guardrails on knowledge content are planned for upcoming phases.
* **No containment actions**. The agent does not take or execute containment or remediation actions based on knowledge. See [Can the agent take containment actions on its own?](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#can-the-agent-take-containment-actions-on-its-own) in the SOC Analyst Agent documentation.
* **One shared knowledge base**. Everyone on your team draws on the same shared knowledge. No per-team partitioning.
* **Audit logging for knowledge**. A comprehensive record of who added or changed a fact, and when, is not yet available. Planned for a later phase.

### FAQ

#### What should I add first?

Start with the facts that most often send an investigation the wrong way: which internal IP addresses and accounts are expected to behave unusually, your maintenance and deploy windows, and the alert patterns your team already knows the cause of. Then add the runbooks that define how your team investigates.

#### Can I test whether a knowledge entry is working?

Yes. You can ask an agent to answer without your knowledge applied, then compare that response to the knowledge-enriched result. This lets you validate whether a specific entry is shaping the agent's output as expected.

#### Does adding knowledge retrain the agent's model?

No. Knowledge is retrieved and applied as context at investigation time. It does not change the underlying model, so you can update or remove an item and the next investigation reflects the change.

#### When does new knowledge take effect?

On the next investigation that runs after you save it. Saving knowledge does not re-run past investigations.

#### How is it priced?

Pricing and packaging are being finalized. Your account team will have details before general availability.

### Additional resources

* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). The agent that Knowledge extends.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning/). How the SOC Analyst Agent fits alongside Mobot, the Sumo Logic MCP server, and Sumo Logic's classical machine learning capabilities.

## Memories

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

Memories are what an agent learns from its runs and from feedback. When memory is on, the agent adds memories as it works and uses them in future runs. Memories are cited in the agent's verdicts so you can see when one influenced a result, and you are notified when the agent creates a new memory.

The **Memories** page shows an AI-generated summary of what the agent has learned, organized by topic. To explore or change what the agent has learned, click **Ask Mobot**, or select a suggested question, such as "What has it learned this week?" or "Are any of its memories out of date?"

<img src={useBaseUrl('img/get-started/dojo-studio/memories.png')} alt="Memories page showing an AI summary of what the agent has learned and suggested questions to ask Mobot" style={{border: '1px solid gray'}} width="800" />

To stop an agent from using and adding memories, turn off **Memory** in [General settings](#general-settings).

<!--TODO: Confirm how users update or delete a memory. Meeting says ask Mobot; demo shows Update and Forget buttons on memory cards. Do not mention "View memories" (not customer-facing). -->

## Skills

Skills are procedures an agent can run. The **Skills** page lists the skills available to the agent, along with each skill's origin, scope, and last update.

<img src={useBaseUrl('img/get-started/dojo-studio/skills.png')} alt="Skills page listing the Sumo Logic Core skill managed by Sumo Logic" style={{border: '1px solid gray'}} width="800" />

* **Sumo Logic Core**. Managed by Sumo Logic and available to all agents. It covers capabilities every agent draws on for security and observability work. Sumo Logic maintains and expands it over time.
* **Custom skills**. Click **Add Skill** to add a skill written by you.

<!--TODO: Confirm steps and fields for Add Skill. -->

## Permissions

<!--TODO: Describe the Permissions page (who can view, use, and manage the agent). Confirm roles and access levels with Vishwendra. -->

## Sharing

<!--TODO: Describe the Sharing page. Confirm with Vishwendra. -->

## Integrations

<!--TODO: Integrations shows a Preview badge in the UI. Confirm Public vs Private Preview and fix this notice. -->

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

Integrations connect an agent to third-party systems from the App Catalog, so the agent can access external systems. Only the agent's owner can connect integrations. Other users with manage access can edit the agent's other settings.

<!--TODO: Confirm Integrations tab visibility for customers not in the executable actions private preview (Vishwendra to confirm). Confirm how ownership is transferred. -->

## Tasks

Tasks are the work an agent runs. Sumo Logic provides built-in tasks, such as triaging new Insights. You can edit a built-in task's triggers, or add your own tasks with additional instructions.

<!--TODO: Confirm the steps for editing a task and adding a custom task. -->

## Volume and overage

<!--TODO: Describe Volume & Overage (SOC Analyst Agent only). No source material yet. -->
