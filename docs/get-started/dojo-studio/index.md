---
slug: /get-started/dojo-studio
title: Dojo Studio
description: Use Dojo Studio to create and configure the Sumo Logic agents that work as teammates, including their instructions, knowledge, memories, access, integrations, and tasks.
keywords:
  - Dojo Studio
  - Dojo AI
  - SOC Analyst Agent
  - Root Cause Agent
  - custom agents
  - agent instructions
  - agent knowledge
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Dojo Studio is where you create and configure the Sumo Logic agents that work as teammates on your team. Each agent runs the tasks you give it, such as investigating alerts and Insights. Start with the Sumo Logic-provided agents, or create your own [custom agent](#custom-agents), which is in public preview.

In Dojo Studio, you manage each agent's settings, instructions, knowledge, memories, skills, permissions, sharing, integrations and third-party actions, and tasks and triggers. Add tasks as an agent's responsibilities grow, and tune how it works with your own instructions, knowledge, and integrations.

<img src={useBaseUrl('img/get-started/dojo-studio/studio.png')} alt="Dojo Studio page showing the SOC Analyst Agent and Root Cause Agent cards" style={{border: '1px solid gray'}} width="800" />

## Types of agents

### Sumo Logic-provided agents

Sumo Logic provides two agents:

* **SOC Analyst Agent**. Investigates and triages security signals, such as Cloud SIEM Insights, and recommends next steps.
* **Root Cause Agent**. Investigates observability alerts automatically and delivers an evidence-backed root cause.

You can configure how each agent works, but you cannot change its name or description. Select an agent in Dojo Studio to open its settings.

### Custom agents

:::info
Custom agents are in public preview.
:::

Custom agents are agents you create and configure yourself. By default, the **Dojo AI role-based access** setting in **Administration** > **Feature Management** is off, and everyone in your org can create agents. To control who can create agents, an administrator can turn the setting on, which lets you manage who can use Dojo AI with roles. Users with the Administrator role can manage all settings of both Sumo Logic-provided and custom agents by default.<br/><img src={useBaseUrl('img/get-started/dojo-studio/feature-management.png')} alt="Feature Management page with the Dojo AI role-based access feature enabled" style={{border: '1px solid gray'}} width="800" />

When **Dojo AI role-based access** is on, you need the Administer Dojo AI capability to create a custom agent. You can find it under **Users and Roles** > **DojoAI**.<br/><img src={useBaseUrl('img/get-started/dojo-studio/administer-dojo-ai-role.png')} alt="Create New Role panel with the Administer Dojo AI capability selected under Dojo AI" style={{border: '1px solid gray'}} width="548" />

1. Go to **Dojo AI** > **Studio** > **Create Agent**.
1. Add name, description, and avatar image. Optionally, start from an existing template.

## Agent settings

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

### General settings

The **General** page shows the agent's basic profile information, visible to your team. For Sumo Logic-provided agents, you can change the following settings:

* **Enabled**. Turns the agent on or off. A disabled agent stops chatting and running its tasks. Its settings and activity history are preserved.
* **Memory**. Controls whether the agent uses and adds [memories](#memories). When off, the agent does not use or add memories. Existing memories are kept.

For Sumo Logic-provided agents, the name, description, and avatar are set by Sumo Logic and cannot be edited. For custom agents, you can edit them.

<img src={useBaseUrl('img/get-started/dojo-studio/general.png')} alt="General settings page for the SOC Analyst Agent showing the Enabled and Memory toggles" style={{border: '1px solid gray'}} width="800" />

### Instructions

Instructions tell an agent how your team works, such as escalation paths, conventions, and what to avoid. The agent follows your instructions on every run. Sumo Logic also gives each agent built-in instructions, including safety guardrails. These are always applied and are not shown or editable.

To add instructions:

1. Open the agent's settings and click **Instructions**.
1. In **Additional instructions**, enter your guidance.
1. Save your changes.

<img src={useBaseUrl('img/get-started/dojo-studio/instructions.png')} alt="Instructions page showing the Additional instructions text box with a sample rule" style={{border: '1px solid gray'}} width="800" />

Account administrators and users with manage access to the agent can add instructions.

#### Write effective instructions

Instructions have the highest priority among the context an agent uses, so keep them concise and specific. Instructions can be up to 12,000 characters, but shorter instructions are easier for the agent to follow and for your team to maintain.

Good instructions:

* **Describe behavior, not facts.** Tell the agent what to do, prioritize, or avoid.
* **Are specific and actionable.** "Escalate Critical Insights on production hosts to the on-call lead" works better than "Be careful with important alerts."
* **Stay consistent.** Instructions that conflict with each other make the agent's results less predictable.

The following are examples of instructions:

* "Do not run this agent on low-severity Insights."
* "Treat alerts on production systems as higher priority than alerts on test systems."
* "Put the recommended next step first in every summary, and write it in plain language."
* "If the likely cause is a third-party service, recommend opening a vendor ticket instead of escalating to the internal on-call engineer."

#### Instructions and knowledge

Use instructions for behavior, and use [knowledge](#knowledge) for reference material. To decide where something belongs, ask whether it changes how the agent behaves or gives the agent something to look up.

| | Instructions | Knowledge |
|:--|:--|:--|
| **What it is** | Rules for how the agent behaves. | Facts, patterns, and practices the agent looks up. |
| **Use it for** | Priorities, escalation paths, output style, and what to avoid. | Runbooks, lists of authorized scanners, maintenance windows, service dependencies, and past incidents. |
| **When it applies** | On every run. | Retrieved as context at investigation time. |
| **Cited in results** | No. | Yes. The agent shows which entries it used. |
| **Example** | "Do not run this agent on low-severity Insights." | "10.0.50.12 is our vulnerability scanner. Do not flag brute-force alerts from this host." |

### Knowledge

Agent Knowledge lets administrators and users with Manage access give DojoAI agents the facts, patterns, and practices that normally live only in your team's heads. You teach the agent once, and it keeps that context across sessions and applies it to every investigation. Agent Knowledge is part of Dojo Studio, where you manage your DojoAI agents. It is available for the SOC Analyst Agent, the Root Cause Agent, and custom agents (public preview).

Knowledge is scoped to the agent. Each agent has its own knowledge, so knowledge you add to one agent is not available to other agents.

Without this context, an agent reasons from your telemetry and its general training alone. A security agent does not know that a particular IP address is your vulnerability scanner, or that a Friday spike in authentication failures is your scheduled penetration test. An observability agent does not know that a burst of pod restarts is your monthly node upgrade, or that two different service names refer to the same system. Knowledge closes that gap and keeps it closed. Over time, the agent's verdicts and follow-ups reflect your environment and your team's judgment rather than a generic baseline.

Knowledge applies to any agent, including the SOC Analyst Agent, the Root Cause Agent, and custom agents, in two places:

* **Auto-investigation**. The knowledge is applied automatically as the agent investigates each alert or Insight that triggers one of its tasks.
* **Manual investigation**. When a user manually triggers an investigation, such as from a Cloud SIEM Insight, the same knowledge is in context.

<img src={useBaseUrl('img/get-started/dojo-studio/knowledge.png')} alt="Knowledge page showing the item count, suggestions for what to add, and a table of knowledge items" style={{border: '1px solid gray'}} width="800" />

#### What you can teach your DojoAI agents

You can teach your DojoAI agents organizational information you want it to remember going forward, such as the following:

* **Environment**. The standing facts about how your organization is set up, how it normally behaves, and what it is required to meet. [See example entries](#your-environment).
* **Operational workflows**. The procedures and standards your team follows when it investigates and resolves incidents. [See example entries](#operational-workflows).
* **Historical learning and team judgment**. Specific past incidents, and the recurring patterns your team has learned to recognize. [See example entries](#historical-learning-and-team-judgment).

Start with the facts that most often send an investigation the wrong way: which internal IP addresses, accounts, and services are expected to behave unusually, your maintenance and deploy windows, and the alert patterns your team already knows the cause of. Then add the runbooks that define how your team investigates.

#### How to add an agent knowledge source

:::info
Adding, changing, or deleting knowledge requires the Administrator role or Manage access to the agent. For the SOC Analyst Agent, the Manage SOC Analyst Settings (`cseManageSocAnalystSettings`) role capability also works.
:::

To add knowledge:

1. In the left navigation, click **DojoAI** > **Studio**, then click the agent, such as **SOC Analyst Agent**, **Root Cause Agent**, or a custom agent.
1. Click **Knowledge** > **Add Knowledge**, then select a source type: text input or a file (TXT, MD, PDF, or CSV). On this page, you can also view, edit, and delete existing knowledge sources.
1. If you choose text input (**Add text**), enter a **Name**, then under **Content**, type the fact, pattern, or practice. Click **Save** when you're done.
1. If you choose a file (**Upload file**), select a TXT, MD, PDF, or CSV file from your computer, then click **Save**.

See [Example knowledge sources](#example-knowledge-sources) for more sample knowledge source entries.

Whenever your knowledge shapes an investigation, the agent surfaces which entries it drew on so a verdict is never a black box. Open the alert or Insight the agent investigated and scroll down in the agent's analysis, such as the **AI Analysis** panel of a Cloud SIEM Insight. A **Knowledge used** section lists every entry the agent applied, with a short description of each. Click any entry to page through the full set. If the agent created a memory during the investigation, a **Memory created** section appears as well.

<img src={useBaseUrl('img/get-started/dojo-studio/knowledge-used.png')} alt="Cloud SIEM Insight with the Knowledge used section listing the knowledge entries the agent applied" style={{border: '1px solid gray'}} width="500" />

#### How knowledge changes take effect

Knowledge does not retrain the agent's model. It is retrieved and applied as context at investigation time, so you can update or remove an item and the next investigation reflects the change. New knowledge takes effect on the next investigation that runs after you save it. Saving knowledge does not re-run past investigations.

To test whether an entry is working, ask an agent to answer without your knowledge applied, then compare that response to the knowledge-enriched result. This lets you validate whether a specific entry is shaping the agent's output as expected.

#### Example knowledge sources

The following examples show the kind of knowledge you can add for each category.

##### Your environment

The standing facts about how your organization and systems are set up, how they normally behave, and what they are required to meet.

**Security examples**

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

**Observability examples**

| What to capture | Example knowledge entries |
|:--|:--|
| Known-noisy signals | TLS certificate expiry warnings for `*.staging.internal` are noise because staging certs are rotated manually each quarter. Only escalate warnings for `*.prod.internal`. |
| Change windows | Kubernetes node upgrades run the first Wednesday of each month, 0300-0500 UTC. Brief pod restarts and short-lived 5xx bursts on any service during this window are expected. |
| Silent dependencies | Every batch job (invoicing, reporting, data sync) runs on one scheduler, `batch-runner`. If it stalls, jobs go missing, and the logs show no errors, only an absence of expected runs. |
| Entity name mapping | The payment API is `pay-gateway-prod` in APM, `pgw_v2` in API gateway logs, and `PAYMENT-SVC` in incident tickets. Treat all three as one service so cross-tier evidence is not missed. |
| Service dependencies | `search-api` depends on `elasticsearch-prod` and `feature-flag-svc`. Slow or empty search results usually start with Elasticsearch JVM heap pressure, so check that before looking at the API. |
| Services with no failover | `edge-proxy` and `orders-db` each run as a single primary with no automatic failover. Errors in their logs describe a full outage, not partial degradation. |
| Data location quirks | Audit events for `export-service` are stored under `_sourceCategory=prod/export/audit`, not in the default application index. Kubernetes events stay in-cluster for only one hour, and older events are in the `k8s_events_archive` index. |
| SLOs and thresholds | `auth-svc` has a 99.95% availability SLO. `image-resizer` p95 latency of 800 ms is normal because of cold starts. |

##### Operational workflows

The procedures and standards your team follows when it investigates and resolves incidents.

**Security examples**

| What to capture | Example knowledge entries |
|:--|:--|
| Postmortem requirements | Our postmortem process requires a root-cause writeup before closing any P1. |
| Investigation steps | To investigate unauthorized AWS IAM creation alerts, run the CloudTrail query for EventName 'CreateUser', correlate with the source IP, and verify against the Jira change queue. |
| Remediation workflow | To handle suspected phishing alerts, extract the header 'X-Distribution-List', check the attachment hash on VirusTotal, and run the O365 'Search-Mailbox' script to purge duplicates. |
| Investigation runbook | For an impossible-travel alert, first pull the last five Okta logins and check the ASN, not just geolocation. If the ASN matches `Zscaler-ZPA-APAC` (our corporate VPN range, listed on Confluence page NET-114), close as expected — Zscaler's APAC nodes often geolocate to Singapore/Tokyo regardless of the user's real location. If the ASN does not match, open a ticket in Jira project `SEC-INCIDENT` and page the on-call lead. |
| Fraud investigation procedure | When triaging fraudulent B2B payout redirects, searching for standard webhook_updated events yields false negatives. Query tenant_config_change where attribute = "callback_endpoint_v2". Cross-reference b2b_admin_audit logs for the same session_id or user_id to check if the modification was preceded by mfa_bypass_flag = true or an MFA-skipped session event within 30 minutes prior to the change. |
| Data exfiltration detection | When investigating mass data exfiltration on cloud storage, querying standard CloudTrail GetObject logs returns zero results because applications access storage through our custom proxy. Always search data_proxy_access where operation_type = "stream_export", and aggregate sum(bytes_sent) > 5 GB per session_token (or user_id) over a rolling 1-hour window to detect unauthorized bulk exports. |

**Observability examples**

| What to capture | Example knowledge entries |
|:--|:--|
| Investigation runbook | For a `CrashLoopBackOff` on any pod, read the last termination reason first. If it is `OOMKilled`, compare the memory limit to the 7-day p95 usage and recommend a new limit. If it is a non-zero exit code, pull the last 100 log lines from the previous container and look for config or startup errors. |
| Latency investigation | For a p95 latency alert on `cart-service`, first compare the start time to the last deploy and last config change. If either falls within 30 minutes, pull the diff from Argo CD and treat it as the leading hypothesis. If neither does, break latency down by `http.route` to see whether one endpoint or all of them are slow. Then open the slowest traces and name the span that accounts for most of the time. |
| Rollback criteria | If a feature-flagged release pushes error rate above 2% for 5 minutes, recommend disabling the flag in LaunchDarkly first and confirm recovery before considering a redeploy. Notify the flag owner in the Slack channel #releases. |
| Escalation path | If an RCA points to a third party such as Cloudflare or Twilio, open a ticket in Jira project `VENDOR-INCIDENT`, link the vendor status page, and page the on-call incident commander. Do not page the internal service team. |

##### Historical learning and team judgment

Specific past incidents, and the recurring patterns your team has learned to recognize.

**Security examples**

| What to capture | Example knowledge entries |
|:--|:--|
| Past incident resolution | The Nov 12 authentication spike was resolved by rotating the API credentials for svc-deploy. Any similar spike on that account should check for stale credentials first. |
| Known false-positive pattern | Friday brute-force spikes on domain controllers are usually the scheduled pentest run by the security team. Confirm timing before escalating. |
| Post-mortem lesson | INC-2025-089: A rogue scheduled task named OneDriveUpdate bypassed triage because analysts assumed it was a native app. Inspect all newly registered tasks regardless of naming conventions. |
| Forensic heuristic | TrueBot campaigns consistently use renamed 7z.exe binaries for exfiltration. Check file entropy and headers, not just the extension. |

**Observability examples**

| What to capture | Example knowledge entries |
|:--|:--|
| Past incident resolution | The Aug 19 burst of 502s on `mobile-gateway` was fixed by raising the load balancer idle timeout from 60s to 120s. For short, repeating 502 bursts on long-lived connections, check idle timeouts first. |
| Post-mortem lesson | INC-2026-031: Dashboards stayed green while `notification-worker` silently stopped sending, because the health check only tested that the process was up. When users report missing emails or pushes but health is green, check queue depth and consumer lag directly. |
| Failure signature | A sudden drop in log volume from a service usually means the service or its log shipper stopped, not that errors went away. Check agent heartbeat before concluding it is healthy. |
| Correlation heuristic | Simultaneous 5xx spikes across unrelated services point to a shared dependency such as CoreDNS, the service mesh, or the identity provider. Check those before investigating each service separately. |
| Slow-burn pattern | Query latency on `orders-db` that creeps up over weeks while traffic stays flat has historically meant table bloat after autovacuum fell behind. Dead tuple counts on the largest tables were elevated each time. |

#### Limitations

* **Plain text entry limit**. For the **Add text** source option, only plain text is supported. Up to 10,000 characters per entry. Each knowledge source item works best when it covers one concept and references specific names, IPs, patterns, or procedures your team actually uses.
* **File types and limits**. For the **Upload file** source option, only TXT, MD, PDF, and CSV files are supported. Up to 5 MB per file and up to 50 files in total.
* **Security guardrails**. Security guardrails on knowledge content are planned for upcoming phases.
* **No containment actions**. The agent does not take or execute containment or remediation actions based on knowledge. See [Can the agent take containment actions on its own?](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#can-the-agent-take-containment-actions-on-its-own) in the SOC Analyst Agent documentation.
* **Scoped to the agent**. Knowledge belongs to the agent you add it to. Each agent uses only its own knowledge, so add the same entry to each agent that needs it.
* **Audit logging for knowledge**. A comprehensive record of who added or changed a fact, and when, is not yet available. Planned for a later phase.


### Memories

:::info
This feature is in Preview. It is available to all customers, but it may not behave as described in every case.
:::

Memories are what an agent learns from its runs and from feedback. When memory is on, the agent adds memories as it works and uses them in future runs. Memories are cited in the agent's verdicts so you can see when one influenced a result.

* **Memory creation notifications**. When the agent creates a memory, you are notified in the agent experience, both during auto-investigations and in conversations. The **Memory created** card shows the memory title and summary, the date it was saved, and **Update** and **Forget** actions.
* **Verify and correct**. Check what the agent learned and correct it. Click **Update** or **Forget** on the card when the memory is created, or manage memories later in Dojo Studio.
* **Available in conversations**. An agent's memories are available when you talk to that agent, including in Mobot, the personal assistant.
* **Scoped to the agent**. A memory belongs to the agent that created it. For example, if you are conversing with Root Cause Agent - Team X, memories created by Root Cause Agent - Team Y are not available, and the reverse is also true. Knowledge is also scoped to the agent.

<img src={useBaseUrl('img/get-started/dojo-studio/memory-created.png')} alt="Memory created card showing the memory title, summary, saved date, and Update and Forget buttons" style={{border: '1px solid gray'}} width="400" />

The **Memories** page shows an AI-generated summary of what the agent has learned over time, organized by topic. Click the refresh icon to refresh the summary. To explore or change what the agent has learned, click **Ask Mobot**, or select a suggested question, such as "What has it learned this week?" or "Are any of its memories out of date?" In the Mobot conversation, you can ask Mobot to update or delete a memory.

<img src={useBaseUrl('img/get-started/dojo-studio/memories.png')} alt="Memories page showing an AI summary of what the agent has learned and suggested questions to ask Mobot" style={{border: '1px solid gray'}} width="800" />

To stop an agent from using and adding memories, turn off **Memory** in [General settings](#general-settings).

### Skills

Skills are procedures an agent can run. The **Skills** page lists the skills available to the agent, along with each skill's origin, scope, and last update.

<img src={useBaseUrl('img/get-started/dojo-studio/skills.png')} alt="Skills page listing the Sumo Logic Core skill managed by Sumo Logic" style={{border: '1px solid gray'}} width="800" />

* **Sumo Logic Core**. Managed by Sumo Logic and available to all agents. It covers capabilities every agent draws on for security and observability work. Sumo Logic maintains and expands it over time. You cannot edit it.
* **Custom skills**. Skills you write yourself. Click **Add Skill**, then enter a name, a short description, and what the skill does.

If a custom skill is relevant to an investigation, for example it lists steps to include, the agent uses it.

### Permissions

The **Permissions** page shows the roles an agent works with in Sumo Logic and the permissions those roles grant. To control who can use or manage an agent, see [Sharing](#sharing).

<img src={useBaseUrl('img/get-started/dojo-studio/permissions.png')} alt="Permissions page for the Root Cause Agent showing the owner, the Change Ownership button, and a table of roles and permissions" style={{border: '1px solid gray'}} width="800" />

An agent never has more access than the person it acts for:

* **Scheduled and triggered runs**. These use the owner's permissions, so they can never see or do more than the owner can.
* **Chat**. In a Mobot conversation, the agent uses the permissions of the person chatting.
* **Visibility of results**. Anyone who can see an alert or Insight can see the agent's investigation and trace for it, including the context the agent used. They cannot interact with the agent unless it is shared with them.

Each agent has exactly one owner. The owner is the only person who can connect [integrations](#integrations). Users with the Administrator role can manage all agents by default.

By default, the SOC Analyst Agent and Root Cause Agent run with system-wide access. To control what an agent can access, assign an owner. The agent then inherits the owner's permissions when it investigates an alert or Insight.

#### Change the owner

Anyone with Manage access to the agent or the Administrator role can claim ownership. To change the owner of an agent, click **Permissions** > **Change Ownership**.

:::note
Before you claim ownership, make sure you have all the access the agent needs to perform investigations, because the agent runs with your permissions.
:::

<img src={useBaseUrl('img/get-started/dojo-studio/change-ownership.png')} alt="Change Ownership dialog showing the current owner, the new owner, and a warning that the agent's integrations are disconnected" style={{border: '1px solid gray'}} width="800" />

### Sharing

The **Sharing** page shows who can use or manage the agent. Each person or role has one of two access levels:

* **Manage**. Edit all of the agent's settings, such as instructions, knowledge, skills, and tasks, and manage who has access. You can limit manage access to a small group of people.
* **Use**. Converse with the agent in Mobot and view its settings, read-only.

By default, **Your Entire Organization** has **Use** access, and the owner has **Manage** access.

<img src={useBaseUrl('img/get-started/dojo-studio/sharing.png')} alt="Sharing page for the Root Cause Agent listing the owner, the entire organization, and other users with their access levels" style={{border: '1px solid gray'}} width="800" />

To share an agent:

1. Click **Sharing** > **Share**.
1. In **Add people or roles**, select the users or roles to add.
1. Select **Manage** or **Use** from the access dropdown menu.
1. Click **Done**.

<img src={useBaseUrl('img/get-started/dojo-studio/share-agent.png')} alt="Share Agent dialog with the Manage and Use access levels in the dropdown menu" style={{border: '1px solid gray'}} width="500" />

To change someone's access, select a different level in the **Access** column of the **See who has access** list in the Share dialog. To remove a user's or role's access, click **Sharing** > **Share**, then remove them from the **See who has access** list. To transfer ownership of the agent, click **Change Ownership** next to the owner. Learn more in [Permissions](#change-the-owner).

### Integrations

:::info
This feature is in Preview. It is available to all customers, but it may not behave as described in every case.
:::

Integrations connect an agent to third-party systems, so the agent can access data and tools outside Sumo Logic. The **Integrations** page lists the integrations available in the App Catalog, including both API and MCP integrations. Integrations are set per agent, so connect them separately for each agent that needs them.

:::note
The **Integrations** tab is not available in Fed environments. Users in Fed environments do not see it in any agent.
:::

To connect an integration to an agent:

1. Open the agent's settings and click **Integrations**.
1. Click the integration you want to connect.
1. Select the resource to use:
   * If you already set up the integration in the App Catalog, select its resource and connect.
   * If you have not, click **Configure integration** to open the App Catalog page. Add the integration there, return to the agent, and select the resource.

For MCP-based integrations, you can connect directly to the third-party system and share access. The same connection also applies to that integration's page in the App Catalog.

Only the agent's owner can connect integrations. Other users with manage access can edit the agent's other settings but cannot add integrations. To connect an integration when you are not the owner, [change ownership](#change-the-owner) first. Changing ownership disconnects the agent's existing integrations.

#### Integration FAQs

##### Who can connect integrations for an agent, and whose resources does the agent use?

Only the agent's owner can add and connect integrations. The resources the owner provides are used only when the agent runs ambiently (on its own, without a user in the conversation).

When users talk to the agent through Mobot, the agent does not use the owner's resources. It acts with the permissions of the person in the conversation. Sharing an agent never gives other users access to the owner's connected accounts.

##### How do tool permissions work?

You can set a permission for each tool in an integration:

* **Always allow**. The agent uses the tool during ambient runs with no human approval.
* **Ask for approval**. The agent pauses and waits for a person to approve before it uses the tool.
* **Deny**. The agent cannot use the tool.

These settings apply only to ambient runs. In Mobot conversations, a human always approves actions, whatever the tool's setting.

##### How will I know if an integration connection fails?

If credentials expire, a connection drops, or an integration fails for any other reason, the agent does not show an alert. Sumo Logic is adding these failures to the audit logs so you can find them. To search the audit logs, use `_index=sumologic_audit_events`. Until the failures are logged, check your integration connections from time to time, especially for agents that run ambiently.

### Tasks

Tasks are the jobs an agent runs. Each task has its own instructions and trigger. Sumo Logic provides two built-in tasks, **Investigate new alerts** and **Triage new Insights**, and manages them for you. The **Tasks** page lists each task with its trigger, when it last ran, whether it is enabled, and when it was last updated.

<img src={useBaseUrl('img/get-started/dojo-studio/tasks.png')} alt="Tasks page listing a custom task and a task managed by Sumo Logic, with the Edit and Delete menu open" style={{border: '1px solid gray'}} width="800" />

* **Sumo Logic-managed tasks**. These show a **Managed by Sumo** label. You can edit only the trigger, for example to run the task only when an alert or Insight matches conditions you set.
* **Custom tasks**. To have an agent do more than a built-in task does, add a task based on a built-in task and provide additional instructions. For example, "When the investigation is complete, send a message to the #soc-alerts Slack channel."

#### Add a task

To add a task:

1. Click **Tasks** > **Add Task**.
1. Pick a pre-defined task from the library, then click **Next**.<br/><img src={useBaseUrl('img/get-started/dojo-studio/add-task-library.png')} alt="Add Task dialog showing the task library with the Investigate new alerts and Triage new insights tasks" style={{border: '1px solid gray'}} width="500" />
1. Enter a **Name** for the task. In **Instructions**, add anything you want the agent to do on top of Sumo Logic's built-in instructions for the task. Your instructions run after the built-in instructions, which are not shown, and can be up to 12,000 characters.<br/><img src={useBaseUrl('img/get-started/dojo-studio/add-task-details.png')} alt="Add Task dialog showing the Name and Instructions text boxes and the trigger" style={{border: '1px solid gray'}} width="500" />
1. Set the **Trigger**, which is the event that starts the task. Choose how to apply it:
   * **Only run when matched**. The task runs only for alerts or Insights that match the conditions you add.
   * **Run on everything except**. The task runs on every alert or Insight except those that match the conditions you add.<br/><img src={useBaseUrl('img/get-started/dojo-studio/add-task-trigger.png')} alt="Add Task dialog showing trigger options Only run when matched and Run on everything except, with the Add condition button and the Enabled toggle" style={{border: '1px solid gray'}} width="500" />
   * Click **Add condition** to add a condition. Select the condition field and its value from the dropdown menus. For example, the SOC Analyst Agent can run only when the Insight severity is Critical or High.<br/><img src={useBaseUrl('img/get-started/dojo-studio/add-task-trigger-condition.png')} alt="Edit Task panel with a trigger set to run only when the Insight severity equals Critical or High" style={{border: '1px solid gray'}} width="800" />
1. Turn on **Enabled** to start running the task. New tasks are off by default.
1. Click **Save**.

Some tasks include a skill. When you add one, the task adds a bundled skill to the agent's skills, and the built-in instructions reference that skill by name.

If you leave the trigger empty, the task runs on every alert or Insight.

Tasks cannot have conflicting triggers. For example, if a task already runs on Critical Insight severity, you cannot create another task with the same trigger, and Dojo Studio shows an error. This keeps two tasks from running on the same event. To run only your version of a built-in task, enable your custom task and turn off the Sumo Logic-managed one.

#### Edit or delete a task

To edit or delete a task, click the three-dot menu at the end of its row, then click **Edit** or **Delete**. In the **Edit Task** panel you can change the name, instructions, and trigger of a custom task, or click **Delete** to remove it.

<img src={useBaseUrl('img/get-started/dojo-studio/edit-task.png')} alt="Edit Task panel showing the name and instructions of a custom task with Delete, Cancel, and Save buttons" style={{border: '1px solid gray'}} width="500" />

### Volume and overage

:::note
Volume and overage tracking is available for the SOC Analyst Agent only.
:::

For the SOC Analyst Agent, the **Volume & Overage** page tracks how many Cloud SIEM Insights the agent investigates. It also controls whether the agent may exceed its committed investigation volume, and by how much.

* **Daily allowance**. Your plan includes a daily allowance of Investigated Insights, metered per org. The allowance does not roll over, and it resets at midnight PST.
* **Automatic investigations**. When auto-investigation is on, the agent investigates Insights in the order they are generated, starting at the beginning of each day. After the daily allowance is reached, you can still investigate additional Insights manually.
* **Overage**. Investigations beyond the daily allowance draw credits from your existing subscription credit pool at your contract rate. All Investigated Insights consume credits, whether they are triggered automatically or manually, and regardless of the verdict.

To limit usage, you can restrict who can trigger manual investigations with the **Can trigger manual investigation** role capability, and you can add instructions or task triggers that keep the agent from running on low-signal Insights.

### SOC Analyst settings in Dojo Studio

The SOC Analyst Agent settings you previously managed in Cloud SIEM are moving to Dojo Studio:

* **SOC Analyst Settings link**. Clicking **SOC Analyst Settings** on the **Insights** page now takes you to the SOC Analyst Agent in Dojo Studio.
* **Triggers, volume, and overage**. Your current settings migrate to [Tasks](#tasks) and [Volume and overage](#volume-and-overage).
* **Enable or disable the agent**. The SOC Analyst Agent toggle in **Feature Management** moves to the **Enabled** setting in [General settings](#general-settings).
* **Permissions**. Users with the Administrator role or the Manage SOC Analyst Settings capability get Manage access to the SOC Analyst Agent in Dojo Studio. By default, all users with the View CSE capability get Use access.

## Additional resources

* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/). The agent that Knowledge extends.
* [Mobot](/docs/search/mobot/). The conversational interface for Sumo Logic's AI agents.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning/). How the SOC Analyst Agent fits alongside Mobot, the Sumo Logic MCP server, and Sumo Logic's classical machine learning capabilities.
