---
slug: /ai
title: AI Capabilities
description: Find Sumo Logic's AI capabilities in one place, including Mobot, the agents, tools, skills, and our MCP server.
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

[DojoAI](https://www.sumologic.com/solutions/dojo-ai) puts agentic AI to work across security and cloud operations. Use [Mobot](/docs/ai/mobot), DojoAI's conversational interface, in plain language to search your logs, create alerts, dashboards, playbooks and more, without writing any code. Agents such as the SOC Analyst Agent investigate alerts and return evidence-backed verdicts, and the Root Cause Agent diagnoses observability alerts, with a human in the loop at every step. The [MCP server](/docs/ai/mcp-server) connects external AI tools to your Sumo Logic data.

## What is DojoAI?

DojoAI is Sumo Logic's multi-agent AI platform. It includes Mobot, the chat interface, and the agents that work behind it or on their own: the Log Analysis Agent, Platform Optimization Agent, SOC Analyst Agent, and Root Cause Agent. A human stays in the loop at every step.

DojoAI is also the name of a tab in the left navigation. That tab is where administrators configure agents, such as their knowledge and triggers. It is one part of the platform, not the whole thing. You use the agents from other places in the product, and you chat with them in Mobot.

The MCP server and Sumo Logic's classical machine learning features, such as LogReduce and Outlier Detection, are separate from DojoAI. They are covered on this page because they are also AI capabilities.

:::tip
Look for the sparkle icon (✨) in the docs table of contents to find AI features.
:::

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mobot')}><img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot icon" width="50"/><h4>Mobot</h4></a>
  <p>Ask questions about your logs and security data in natural language, and create monitors, dashboards, and playbooks.</p>
  </div>
</div>
<!--
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/dojoai')}><img src={useBaseUrl('img/icons/operations/dojo-ai.png')} alt="DojoAI icon" width="50"/><h4>DojoAI</h4></a>
  <p>Configure DojoAI agents and settings.</p>
  </div>
</div>
-->
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/get-started-with-cloud-siem/soc-analyst-agent')}><img src={useBaseUrl('img/icons/operations/soc-analyst-agent.png')} alt="SOC Analyst Agent icon" width="50"/><h4>SOC Analyst Agent</h4></a>
  <p>Automatically investigate Cloud SIEM insights and get an AI verdict with supporting evidence.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server')}><img src={useBaseUrl('img/icons/operations/mcp-server.png')} alt="MCP server icon" width="50"/><h4>MCP Server</h4></a>
  <p>Connect external AI tools to Sumo Logic to query logs, investigate insights, and manage alerts and dashboards.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/ingestion-volume/data-volume-index/#ask-mobot-about-data-volume')}><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Data volume icon" width="50"/><h4>Data Volume Index Skill</h4></a>
  <p>Ask Mobot about tracking ingestion volume by source with without writing a query.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/integrations/aiml')}><img src={useBaseUrl('img/icons/operations/machine-learning-operators.png')} alt="AI and ML apps icon" width="50"/><h4>AI and ML Apps</h4></a>
  <p>Collect, analyze, and act on data from AI platforms such as Amazon Bedrock, Claude Compliance, and GitHub Copilot.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/feature-management')}><img src={useBaseUrl('img/icons/operations/manage.png')} alt="Feature Management icon" width="50"/><h4>Feature Management</h4></a>
  <p>Turn Mobot, Parse Assist, the SOC Analyst Agent, and MCP server access on or off, and audit DojoAI activity.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/trust-data-faq')}><img src={useBaseUrl('img/icons/security/security-and-compliance.png')} alt="AI trust icon" width="50"/><h4>AI Trust and Data FAQ</h4></a>
  <p>Learn how Sumo Logic AI and machine learning features handle your data, including training, retention, and third-party access.</p>
  </div>
</div>
</div>

## Where to find things

Sumo Logic's AI capabilities show up in several places in the product. Use this table to find the right doc.

| I want to... | Go to | Docs |
|:--|:--|:--|
| Chat with an agent, ask questions about my data, or create content in plain language | **Mobot** | [Mobot](/docs/ai/mobot) |
| Create a monitor, dashboard panel, or playbook from a prompt | The monitor, dashboard, or playbook page, which opens Mobot | [Create a monitor with Mobot](/docs/alerts/monitors/create-monitor-with-mobot), [Create a panel with Mobot](/docs/dashboards/create-panel-with-mobot), [Create playbooks with Mobot](/docs/platform-services/automation-service/playbooks/create-playbooks-with-mobot) |
| Review an agent's verdict on a Cloud SIEM insight, and continue the investigation in Mobot | The insight's **AI Investigation** tab | [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent) |
| Review a root cause investigation for a monitor alert | The alert's **AI Investigation** tab | [Root Cause Agent](/docs/alerts/monitors/root-cause-agent-preview) |
| Teach an agent my team's facts, patterns, and practices | **DojoAI** in the left navigation | [Agent Knowledge for the SOC Analyst Agent](/docs/ai/dojoai/agent-knowledge-socaa) |
| Turn AI features on or off, or audit AI activity | **Administration** > **Feature Management** | [Feature Management](/docs/manage/feature-management) |
| Connect Claude Code, GitHub Copilot, or another AI client to my data | Your AI client | [MCP server](/docs/ai/mcp-server) |
| Understand how AI features handle my data | | [AI Trust and Data FAQ](/docs/ai/trust-data-faq) |

## Agents

Agents work behind Mobot or on their own in the product area they serve. Each links to the doc that covers how to use it.

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mobot/about#what-happened-to-query-agent-and-knowledge-agent')}><img src={useBaseUrl('img/icons/general/generic-agent-icon.png')} alt="Log Analysis Agent icon" width="50"/><h4>Log Analysis Agent</h4></a>
  <p>Guides you through analysis using natural language prompts, with structured findings and suggested next steps. Works through Mobot.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mobot/about#what-happened-to-query-agent-and-knowledge-agent')}><img src={useBaseUrl('img/icons/general/generic-agent-icon.png')} alt="Platform Optimization Agent icon" width="50"/><h4>Platform Optimization Agent</h4></a>
  <p>Answers how-to questions and helps you troubleshoot issues and get more from the platform. Works through Mobot.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/cse/get-started-with-cloud-siem/soc-analyst-agent')}><img src={useBaseUrl('img/icons/operations/soc-analyst-agent.png')} alt="SOC Analyst Agent icon" width="50"/><h4>SOC Analyst Agent</h4></a>
  <p>Automatically investigate Cloud SIEM insights and get an AI verdict with supporting evidence.</p>
  </div>
</div>
{/* PLACEHOLDER(DOCS-1976, 2026-11-30): Root Cause Agent, docs/alerts/monitors/root-cause-agent-preview */}
{/* PLACEHOLDER(DOCS-1961, 2026-11-30): SOC Recommendation and Response */}
</div>

<br/>

<details>
<summary>What do these AI terms mean?</summary>

**Agent**. Software that perceives its environment, makes decisions, and takes actions toward a goal. Examples in Sumo Logic include Mobot and the SOC Analyst Agent.

**Agentic AI**. AI that plans and carries out multi-step work toward a goal, rather than answering a single prompt.

**LLM**. Large language model. A model trained on large amounts of text to understand and generate language.

**MCP**. Model Context Protocol. An open standard that lets AI clients connect to external tools and data through a common interface.

**Skill**. A reusable set of instructions that guides an AI agent through a class of tasks, such as the sumo-investigator skill for Claude Code.

</details>
