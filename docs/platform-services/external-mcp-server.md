---
id: external-mcp-server
title: Sumo Logic MCP Server (Beta)
description: tk
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. For more information, contact your Sumo Logic account executive.
:::

Connect your AI tools directly to Sumo Logic to create a unified ecosystem powered by your observability and security data.

<!-- Check with MS and CP if we can use the Dojo AI graphic
<img src={useBaseUrl('img/dojo-ai/mcp-server-overview.png')} alt="Sumo Logic MCP Server in the Dojo AI ecosystem" style={{border: '1px solid gray'}} width="800" />
-->

The Sumo Logic MCP Server extends Dojo AI into an open, interoperable platform using the Model Context Protocol (MCP). Instead of building custom integrations or treating Sumo Logic as a separate data silo, the MCP Server makes your observability and security data directly accessible to your own copilots, proprietary models, and third-party AI systems.

Our MCP Server integrates seamlessly with [Query Agent](/docs/search/query-agent), [Knowledge Agent](/docs/search/knowledge-agent), and [SOC Analyst Agent](/docs/security/cse/soc-analyst-agent), enabling your external AI tools to collaborate with these agents.

<details>
<summary>What is Model Context Protocol?</summary>

Model Context Protocol (MCP) is an open standard that defines how AI models, agents, and tools share context and communicate with one another. It provides a consistent framework for connecting LLMs, copilots, and specialized agents.

By implementing MCP, Sumo Logic enables your AI ecosystem to exchange data, context, and instructions with Dojo AI in real time, without complex custom integrations or workarounds.
</details>

## How it works

The MCP Server provides a standardized interface between Sumo Logic and your AI tools:

1. **Connect your AI tools** using the MCP standard.
1. **Access Sumo Logic data** through secure, permissioned interfaces.
1. **Execute prompts** across multiple environments—IDEs, collaboration tools, or custom applications.
1. **Leverage Dojo AI agents** alongside your own models for unified analysis and response.

Your external AI systems can query logs, analyze dashboards, and collaborate with Sumo Logic agents—all through a single, consistent protocol.

## What you can do

* **Bring your own AI**. Integrate proprietary models or third-party copilots with Sumo Logic's observability and security data without rebuilding your AI stack.
* **Automate across your ecosystem**. Use Sumo Logic's telemetry as input for your AI-driven workflows, enabling smarter investigations and faster incident response.
* **Work where you work**. Execute AI-powered queries from your IDE, collaboration tools, or custom applications—no need to switch contexts.
* **Future-proof your strategy**. Add new AI technologies as they emerge while maintaining Sumo Logic's scale, security, and data governance.

## Example use cases

<Tabs
  className="unique-tabs"
  defaultValue="SOC"
  values={[
    {value: 'SOC', label: 'Security operations'},
    {value: 'DevOps', label: 'DevOps and SRE'},
    {value: 'Custom', label: 'Custom workflows'},
  ]}>

<TabItem value="SOC">

* **Unified threat investigation**. Connect your security copilot to Sumo Logic so it can query threat data, correlate signals, and collaborate with the SOC Analyst Agent for faster triage and response.
* **Automated playbook execution**. Integrate your SOAR platform to trigger Sumo Logic queries and analysis as part of incident response playbooks, combining internal and external context.

</TabItem>

<TabItem value="DevOps">

* **IDE-integrated troubleshooting**. Query logs and metrics directly from your development environment using natural language, with results informed by Sumo Logic's analytics and your own models.
* **Incident analysis in Slack**. Connect your Slack bot to Sumo Logic to pull real-time observability data during incidents, enabling collaborative troubleshooting without leaving your conversation.

</TabItem>

<TabItem value="Custom">

* **Proprietary model integration**. Use your custom-trained models alongside Sumo Logic's agents, combining specialized domain knowledge with Sumo Logic's log analytics and security insights.
* **Cross-platform orchestration**. Build workflows that span multiple AI tools and data sources, with Sumo Logic as the central hub for observability and security context.

</TabItem>
</Tabs>

## Getting started

You'll need an MCP-compatible client (IDE, copilot, or custom application). Initial setup involves configuring your MCP client to connect to the Sumo Logic MCP Server endpoint and authenticating with your Sumo Logic credentials. Detailed configuration guides will be available as the feature becomes more widely available.

## Security and data governance

Our MCP Server maintains Sumo Logic's strict security and compliance standards:

* **Permissioned access**. All integrations occur through secure, controlled interfaces
* **Data sovereignty**. Your data never leaves your control
* **No model training**. Customer data is never used to train AI models
* **Audit trails**. All MCP interactions are logged for compliance and security review

The MCP Server acts as a secure bridge, letting you extend your AI ecosystem without compromising visibility, control, or compliance.

## FAQ

<details>
<summary>Which AI tools can connect via MCP?</summary>

Any AI tool, copilot, or application that implements the Model Context Protocol standard can connect to the Sumo Logic MCP Server. This includes popular IDEs with AI assistants, collaboration platforms with integrated copilots, and custom-built agents.

The MCP standard is still emerging, so compatibility may vary depending on your specific tools.

</details>

<details>
<summary>Does this work with existing Dojo AI agents?</summary>

Yes. The MCP Server is designed to work alongside your existing Dojo AI agents like Query Agent, Knowledge Agent, and SOC Analyst Agent. External AI tools connected via MCP can collaborate with these agents, creating a unified ecosystem where different models and capabilities work together.

</details>

<details>
<summary>What data can external AI tools access?</summary>

External tools connected via the MCP Server can access the same data and capabilities available to Dojo AI agents, subject to the same permission controls and access policies configured in your Sumo Logic account.

This includes log queries, dashboard data, and account management operations.

</details>

<details>
<summary>How does this affect my Sumo Logic usage?</summary>

The MCP Server is a separately licensed capability. Contact your account representative or Support for information about pricing and how MCP Server usage may impact your data scanning and consumption metrics.

</details>

### Learn More

- [Dojo AI Overview](#) _(link to Dojo AI page)_
- [Query Agent](#) _(link to Query Agent doc)_
- [Knowledge Agent](#) _(link to Knowledge Agent doc)_
- [Model Context Protocol Specification](https://modelcontextprotocol.io/) _(external link)_


<!-- In each agent doc (Query Agent, Knowledge Agent, SOC Analyst Agent), add at the bottom:

### Extend with Your Own AI

Want to integrate your own copilots or AI models with [Agent Name]? Learn how the [Sumo Logic MCP Server](/docs/platform-services/mcp-server) enables you to connect external AI tools to Sumo Logic's agents and data.
-->
