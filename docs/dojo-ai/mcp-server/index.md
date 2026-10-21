---
slug: /dojo-ai/mcp-server
title: MCP Server
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents using Claude Code CLI.
keywords:
  - mcp server
  - claude code
  - ai tools
  - log search
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import SumoAcademy from '../../reuse/sumo-logic-academy.md';

<img src={useBaseUrl('img/icons/operations/mcp-server.png')} alt="MCP server icon" width="45"/>

The Sumo Logic MCP server lets MCP clients (external AI models) connect to Sumo Logic to query logs, investigate security insights, manage alerts and dashboards, and more. Use natural language to bring Sumo Logic search, evidence, and platform context into the AI tools you already use, such as developer IDEs, security workflows, and enterprise AI platforms.

## At a glance

- **What it does**. Lets external AI clients query Sumo Logic logs, Cloud SIEM insights, alerts, and dashboards using natural language, through a set of MCP tools.
- **How it works**. MCP clients authenticate over OAuth 2.0 (CIMD recommended) and call MCP tools that are scoped to your Sumo Logic role permissions. MCP actions run in your own environment — not inside Sumo Logic's infrastructure — and your AI client determines what data it sends to its AI provider.
- **Supported deployments**. All commercial Sumo Logic deployments except Zurich and AWS European Sovereign Cloud. See the [MCP server URL table](/docs/dojo-ai/mcp-server/connect-mcp-client#mcp-server-url-for-your-deployment) for your deployment's endpoint.
- **Subdomain URLs**. Add your org's subdomain to the MCP server URL so CIMD clients go straight to your org's login page. See [How to use your org subdomain in the MCP server URL](/docs/dojo-ai/mcp-server/connect-mcp-client#how-to-use-your-org-subdomain-in-the-mcp-server-url).
- **Prerequisites**. An MCP-compatible client that supports HTTP/SSE transport and OAuth 2.0; MCP Server access enabled (on by default); CIMD enabled by an administrator (recommended).
- **Limitations**. Not intended for bulk data extraction, model training, or high-volume automated queries, and is subject to rate limits (4 requests per second, 10 concurrent).

:::note
Prefer a built-in conversational experience instead of connecting an external AI client? The MCP server exposes discrete tools that any MCP-compatible client can call (optionally guided by the [sumo-investigator skill](/docs/dojo-ai/mcp-server/investigate-with-mcp#improve-investigations-with-the-sumo-investigator-skill)), while [Mobot](/docs/dojo-ai/mobot) is Sumo Logic's own set of specialized agents — including the SOC Analyst Agent, Query Agent, Knowledge Agent, and monitor creation — built directly into the product.
:::

:::training Sumo Logic Academy

<SumoAcademy/>

* **Self-paced**. [Extending Sumo Logic with MCP, API and Terraform](https://learn.sumologic.com/extending-sumo-logic-with-mcp-api-terraform).
:::

## In this section

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/enable-mcp-server')}><img src={useBaseUrl('img/icons/operations/manage.png')} alt="Enable icon" width="50"/><h4>Enable the MCP Server</h4></a>
  <p>Turn on MCP server access and CIMD for your organization.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/connect-mcp-client')}><img src={useBaseUrl('img/icons/cloud/api2.png')} alt="Connect icon" width="50"/><h4>Connect an MCP Client</h4></a>
  <p>Find your server URL and connect Claude Code or another client.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/mcp-tools-reference')}><img src={useBaseUrl('img/icons/operations/too-many-tools.png')} alt="Tools icon" width="50"/><h4>MCP Tools Reference</h4></a>
  <p>Tools, required scopes, and example prompts.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/investigate-with-mcp')}><img src={useBaseUrl('img/icons/operations/investigate.png')} alt="Investigate icon" width="50"/><h4>Investigate with MCP</h4></a>
  <p>The sumo-investigator skill and example workflows.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/usage-costs-rate-limits')}><img src={useBaseUrl('img/icons/operations/data-overage.png')} alt="Usage and costs icon" width="50"/><h4>MCP Usage, Costs, and Rate Limits</h4></a>
  <p>When to use MCP, what drives cost, and rate limits.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/ai/mcp-server/troubleshooting-faq')}><img src={useBaseUrl('img/icons/operations/troubleshoot.png')} alt="Troubleshooting icon" width="50"/><h4>MCP Troubleshooting and FAQ</h4></a>
  <p>Fix common errors and find quick answers.</p>
  </div>
</div>
</div>
