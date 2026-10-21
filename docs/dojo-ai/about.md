---
id: about
title: Welcome to Dojo AI
description: Welcome to Dojo AI
keywords:
  - ai
  - dojoai
  - mobot
  - soc analyst agent
  - mcp server
  - agentic ai
  - llm
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic's AI capabilities help you investigate faster, build content in plain language, and connect your own AI tools to your Sumo Logic data. This page lists each capability and links to its documentation.

[DojoAI](https://www.sumologic.com/solutions/dojo-ai) puts agentic AI to work across security and cloud operations. Use [Mobot](/docs/dojo-ai/mobot), DojoAI's conversational interface, in plain language to search your logs, create alerts, dashboards, playbooks and more, without writing any code. Agents such as the [SOC Analyst Agent](/docs/dojo-ai/agents/soc-analyst-agent) investigate alerts and return evidence-backed verdicts, and the [Root Cause Agent](/docs/dojo-ai/agents/root-cause-agent-preview) diagnoses observability alerts, with a human in the loop at every step. The [MCP server](/docs/dojo-ai/mcp-server) connects external AI tools to your Sumo Logic data.

## What is DojoAI?

DojoAI is Sumo Logic's multi-agent AI platform for security and cloud operations. It is made up of:

* **Mobot**. The chat interface. Ask questions in plain language, and Mobot routes you to the right agent. The Log Analysis Agent and Platform Optimization Agent work through it.
* **Agents**. The SOC Analyst Agent investigates Cloud SIEM insights, and the Root Cause Agent investigates monitor alerts. Both can hand an investigation off to Mobot.
* **The MCP server**. Connects external AI clients, such as Claude Code, to your Sumo Logic data.

A human stays in the loop at every step, and you can turn DojoAI capabilities on or off in [Feature Management](/docs/dojo-ai/about/#feature-management).

DojoAI is also the name of a tab in the left navigation. That tab is where administrators configure agents, such as their knowledge and triggers. It is one part of the platform, not the whole thing.

:::tip
Look for the sparkle icon (✨) in the docs table of contents to find AI features.
:::

## Where to find things

Sumo Logic's AI capabilities show up in several places in the product. Use this table to find the right doc.

| I want to... | Go to | Docs |
|:--|:--|:--|
| Chat with an agent, ask questions about my data, or create content in plain language | **Mobot** | [Mobot](/docs/dojo-ai/mobot) |
| Create a monitor, dashboard panel, or playbook from a prompt | The monitor, dashboard, or playbook page, which opens Mobot | [Create a monitor with Mobot](/docs/alerts/monitors/create-monitor-with-mobot), [Create a panel with Mobot](/docs/dashboards/create-panel-with-mobot), [Create playbooks with Mobot](/docs/platform-services/automation-service/playbooks/create-playbooks-with-mobot) |
| Review an agent's verdict on a Cloud SIEM insight, and continue the investigation in Mobot | The insight's **AI Investigation** tab | [SOC Analyst Agent](/docs/dojo-ai/agents/soc-analyst-agent) |
| Review a root cause investigation for a monitor alert | The alert's **AI Investigation** tab | [Root Cause Agent](/docs/dojo-ai/agents/root-cause-agent-preview) |
| Teach an agent my team's facts, patterns, and practices | **DojoAI** in the left navigation | [Agent Knowledge for the SOC Analyst Agent](/docs/dojo-ai/configure-agents/knowledge) |
| Turn AI features on or off, or audit AI activity | **Administration** > **Feature Management** | [Feature Management](/docs/dojo-ai/about/#feature-management) |
| Connect Claude Code, GitHub Copilot, or another AI client to my data | Your AI client | [MCP server](/docs/dojo-ai/mcp-server) |
| Understand how AI features handle my data | | [AI Trust and Data FAQ](/docs/dojo-ai/trust-data-faq) |

## DojoAI Credits

DojoAI Credits is a shared, organization-wide monthly credit pool for DojoAI usage. It replaces per-user daily prompt limits. Mobot prompts and SOC Analyst Agent investigated insights draw from the pool.

* **Alerts**. You're notified when usage reaches 80%, 90%, and 100% of the pool.
* **Overage**. Agents keep running if you exceed the monthly allocation.
* **Daily free prompts**. You can keep the daily free Mobot prompts instead of using a credit pool.

To size a credit pool, contact your Sumo Logic account team.

## Agents

Agents work behind Mobot or on their own in the product area they serve. Each links to the doc that covers how to use it. See [Agents](/docs/dojo-ai/agents/).

<!-- make sure the below is same as https://www.sumologic.com/help/docs/get-started/ai-machine-learning/#what-is-the-feature-management-page -->

## Feature Management

Turn Mobot, Parse Assist, the SOC Analyst Agent, and MCP server access on or off for your organization, and audit DojoAI activity.

import MSSPfeatureMgmt from '../reuse/mssp-feat-mgmt.md';

**Feature Management** is where administrators turn Mobot, Parse Assist, the SOC Analyst Agent, and MCP server access on or off for your organization. It's available to any user with the Administrator role or the **Manage Organization Settings** permission.

<img src={useBaseUrl('img/search/mobot/feature-management.png')} alt="Feature Management page showing the AI features, MCP Server access, and SOC Analyst Agent toggles" style={{border: '1px solid gray'}} width="800" />

### Can I opt out of AI features?

AI features are on by default. You can opt out in two ways:

* **Through your account team or support**. Contact your Sumo Logic account team or open a support ticket to opt out of specific AI features or all AI features. If you opt out of all AI features, your tenant is automatically exempted from future AI feature releases.
* **In the product**. Platform administrators can opt out of all AI features under **Administration** > **Feature Management**. Disabling AI at the admin level automatically exempts your tenant from future AI feature rollouts.

In Feature Management, Mobot and Parse Assist share a single **AI features** toggle. The SOC Analyst Agent and the MCP server each have their own toggle (**SOC Analyst Agent** and **MCP Server access**).

<MSSPfeatureMgmt/>

### Can I control DojoAI access for individual users?

Not at this time. DojoAI is enabled at the platform level, and you can't turn it on or off for individual users or roles. All AI interactions enforce user-level permissions, so users can't access data or run platform actions they aren't authorized to perform manually.

### How do I audit DojoAI usage?

Administrators can audit all DojoAI activity with the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/). Run a targeted audit query to see both user activity and the actions agents perform in your environment.

```sumo
_index=sumologic_audit_events
| where invocationdetails.agentname in ("mobot", "soc_analyst_agent")
```

The audit includes:

* **User activity**. Individual user prompts, queries, and shared Mobot conversation threads.
* **Actions on customer data**. Log searches, playbook executions, and triage steps performed by agents across the platform.

Log searches that Mobot runs on your behalf are also tracked in the [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/). See [Audit Mobot queries](/docs/dojo-ai/mobot/about#audit-mobot-queries).


## Common AI terms

* **Agent**. Software that perceives its environment, makes decisions, and takes actions toward a goal. Examples in Sumo Logic include Mobot and the SOC Analyst Agent.
* **Agentic AI** takes generative AI further by enabling autonomous, multi-step reasoning and action. Agentic systems can plan, use tools, and coordinate specialized agents to complete complex tasks like triaging a security incident or translating a natural-language question into a log query, with a human in the loop.
* **Artificial intelligence (AI)** encompasses machines that mimic human-like intelligence, leveraging algorithms to compute tasks efficiently. It includes machine learning, deep learning, generative AI, and agentic AI.
* **Deep learning**, another subset of AI, employs artificial neural networks with multiple layers to process data, excelling in tasks like image recognition and natural language understanding.
* **Generative AI**, closely related to deep learning, produces new content (text, summaries, queries) from patterns in training data, often using large language models (LLMs).
* **LLM**. Large language model. A model trained on large amounts of text to understand and generate language.
* **Machine learning (ML)**, a subset of AI, involves training machines to learn from data without explicit programming, improving performance over time. Within ML, there are various types: supervised learning, unsupervised learning, semi-supervised learning, and reinforcement learning, each suited for different problem settings such as classification, regression, and clustering.
* **MCP**. Model Context Protocol. An open standard that lets AI clients connect to external tools and data through a common interface.
* **Pattern learning** is fundamental to machine learning and deep learning, where algorithms discern patterns in data to make predictions or classifications.
* **Skill**. A reusable set of instructions that guides an AI agent through a class of tasks, such as the sumo-investigator skill for Claude Code.
* **Tool**. A capability exposed by an MCP server or agent framework that an AI agent can call to perform a specific action, such as running a search, reading a file, or executing a query.
