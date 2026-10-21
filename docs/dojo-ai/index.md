---
slug: /dojo-ai
title: Dojo AI
description: Find Sumo Logic's AI capabilities in one place, including Mobot, the agents, tools, skills, and our MCP server.
keywords:
  - ai
  - dojoai
  - dojo-ai
  - mobot
  - soc analyst agent
  - mcp server
  - agentic ai
  - llm
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic's AI capabilities help you investigate faster, build content in plain language, and connect your own AI tools to your Sumo Logic data. This page lists each capability and links to its documentation.

[DojoAI](https://www.sumologic.com/solutions/dojo-ai) puts agentic AI to work across security and cloud operations. Use [Mobot](/docs/dojo-ai/mobot), DojoAI's conversational interface, in plain language to search your logs, create alerts, dashboards, playbooks and more, without writing any code. Agents such as the SOC Analyst Agent investigate alerts and return evidence-backed verdicts, and the Root Cause Agent diagnoses observability alerts, with a human in the loop at every step. The [MCP server](/docs/dojo-ai/mcp-server) connects external AI tools to your Sumo Logic data.

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
  <a href={useBaseUrl('docs/dojoai')}><img src={useBaseUrl('img/icons/operations/dojo-ai.png')} alt="DojoAI icon" width="50"/><h4>DojoAI</h4></a>
  <p>Configure DojoAI agents and settings.</p>
  </div>
</div>
-->
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/dojo-ai/agents/soc-analyst-agent')}><img src={useBaseUrl('img/icons/operations/soc-analyst-agent.png')} alt="SOC Analyst Agent icon" width="50"/><h4>SOC Analyst Agent</h4></a>
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
  <a href={useBaseUrl('docs/dojo-ai/about/#feature-management')}><img src={useBaseUrl('img/icons/operations/manage.png')} alt="Feature Management icon" width="50"/><h4>Feature Management</h4></a>
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
