---
id: ai-machine-learning
title: AI and Machine Learning with Sumo Logic
sidebar_label: AI Capabilities ✨
description: Learn about Dojo AI, Sumo Logic's multi-agent AI platform, and classical ML capabilities that accelerate threat detection, investigation, and response across security and observability workflows.
keywords:
   - dojo ai
   - artificial intelligence
   - ai
   - machine learning
   - ml
   - llm
   - agentic
   - mobot
   - log analysis agent
   - platform optimization agent
   - conversational monitors
   - conversational playbooks
   - soc analyst agent
   - mcp server
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic’s AI capabilities span from classical machine learning to generative and agentic AI. At the center is Dojo AI, our multi-agent platform that brings specialized agents into security and observability workflows. This page covers all of these capabilities: what they do, how they work together, and how to get started.

<details>
<summary>What do these terms mean?</summary>

**Artificial intelligence (AI)** encompasses machines that mimic human-like intelligence, leveraging algorithms to compute tasks efficiently. It includes machine learning, deep learning, generative AI, and agentic AI.

**Machine learning (ML)**, a subset of AI, involves training machines to learn from data without explicit programming, improving performance over time. Within ML, there are various types: supervised learning, unsupervised learning, semi-supervised learning, and reinforcement learning, each suited for different problem settings such as classification, regression, and clustering.

**Deep learning**, another subset of AI, employs artificial neural networks with multiple layers to process data, excelling in tasks like image recognition and natural language understanding.

**Generative AI**, closely related to deep learning, produces new content (text, summaries, queries) from patterns in training data, often using large language models (LLMs).

**Agentic AI** takes generative AI further by enabling autonomous, multi-step reasoning and action. Agentic systems can plan, use tools, and coordinate specialized agents to complete complex tasks like triaging a security incident or translating a natural-language question into a log query, with a human in the loop.

**Pattern learning** is fundamental to machine learning and deep learning, where algorithms discern patterns in data to make predictions or classifications.

</details>

## Dojo AI

<img src={useBaseUrl('img/icons/operations/dojo-ai.png')} alt="Dojo AI icon" width="45"/>

[Dojo AI](https://www.sumologic.com/solutions/dojo-ai) is Sumo Logic’s multi-agent AI platform, bringing specialized agents across security and observability workflows. Agents work together to detect threats, investigate incidents, explore data, and answer platform questions, with a human in the loop at every step. Dojo AI is built and deployed on AWS and is available through Sumo Logic and in AWS Marketplace.

### Mobot

<img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot head icon" width="45"/>

[Mobot](/docs/search/mobot) is the conversational interface for Dojo AI. Ask questions in plain language to analyze log data, investigate incidents, or get answers sourced from official documentation, without writing queries. Mobot connects you to specialized agents, including:

* **Log Analysis Agent**. Guides you through analysis using natural language prompts, delivering structured findings and suggested next steps. It also allows you to create and edit dashboards and monitors without writing complex queries.
* **Platform Optimization Agent**. Answers how-to questions and helps you troubleshoot issues, optimize queries, understand data usage, tune dashboards, and get more from the platform, sourced directly from our official documentation.

Beyond analysis and platform guidance, Mobot also lets you create, edit, and summarize content through natural language such as monitors, dashboards, and playbooks.

See also: [Mobot Example Prompts](/docs/search/mobot/example-prompts).

### Summary Agent

The [Summary Agent](/docs/cse/get-started-with-cloud-siem/insight-summary/) automatically generates a concise summary of each Cloud SIEM insight, explaining the threat incidents that triggered it. Summaries help security teams quickly understand scope and prioritize response.

### SOC Analyst Agent

<img src={useBaseUrl('img/icons/security/soc-analyst-agent-icon.png')} alt="SOC Analyst Agent icon" width="45"/>

Investigate Cloud SIEM insights faster with the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent), which applies agentic reasoning to analyze alerts and deliver evidence-backed verdicts (malicious, suspicious, or benign). It correlates related activity, maps entity relationships, and summarizes findings, so analysts start with an investigation instead of a raw alert. From there, you can continue digging in Mobot using natural language to explore scope, impact, and supporting evidence, then generate a structured incident report to document your findings.

:::note
The SOC Analyst Agent requires a Cloud SIEM subscription and is opt-in.
:::

<!-- uncomment at GA after Aug 3
:::note
The SOC Analyst Agent requires a Cloud SIEM subscription and is opt-in. See [Availability](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#availability).
:::
-->

### Sumo Logic MCP server

<img src={useBaseUrl('img/icons/operations/mcp-server.png')} alt="MCP server icon" width="45"/>

The [Sumo Logic MCP server](/docs/api/mcp-server) connects MCP-compatible AI clients, such as Claude Code and GitHub Copilot, to your Sumo Logic data — no custom integrations required. Use natural language to run log searches, triage Cloud SIEM insights and detection rules, retrieve alerts, and manage dashboards, with the same governance and access controls you already rely on. Any paid customer can activate the MCP server through a self-service feature in admin settings.

## Classical machine learning

Beyond Dojo AI, Sumo Logic applies classical machine learning across observability and security workflows to surface patterns, reduce noise, and accelerate detection and investigation.

### Observability

These classical machine learning capabilities help developers and SREs manage and optimize their technology stack: discovering app, service, and infrastructure relationships; using M.E.L.T. telemetry to reduce detection time and false positives; and diagnosing, resolving, and preventing incidents faster.

#### LogReduce

[LogReduce](/docs/search/behavior-insights/logreduce)&reg; utilizes AI-driven algorithms to cluster log messages based on string similarity and distill thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, teaching LogReduce for more specific outcomes.

#### LogCompare

[LogCompare](/docs/search/behavior-insights/logcompare) compares log data from different time periods to identify changes or anomalies, helping with troubleshooting and root cause analysis. It clusters logs into patterns using baseline and target queries, then highlights significant differences over time. You can refine results by promoting, demoting, or splitting signatures, and set up alerts for new or changed patterns.

#### AI in alerting

##### Anomaly detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), powered by ML, efficiently flags suspicious activities by establishing baseline behavior and minimizing false positives. It also automatically fine-tunes anomaly detection with minimal user input, and you can associate it with a playbook to link anomaly responses with monitors, streamlining incident response.

##### Automated playbooks

With [Automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors), you can set up a predefined set of actions and conditional statements that respond to events like security incidents proactively by running an automated workflow without manual intervention. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it. You can access playbooks when creating a monitor, viewing an alert, or directly from the Automation Service.

### Security

These classical machine learning capabilities help SOC analysts and threat hunters safeguard cloud, container, and on-prem resources against evolving threats: supporting discovery, detection, investigation, response, and protection to reduce dwell time and false positives, and accelerate incident resolution.

#### Cloud SIEM Rules

Sumo Logic's Cloud SIEM rules leverage AI for the following:
* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

#### Global Intelligence

The [Global Intelligence Service](/docs/integrations/global-intelligence) apps provide security teams with real-time security intelligence to scale detection, prioritization, investigation, and workflow to prevent potentially harmful service configurations that could lead to a costly data breach.

## App integrations for AI platforms

Sumo Logic offers integrations with AI platforms for monitoring, governance, and security analysis. The following are some popular examples that let you collect, analyze, and act on data from AI tools directly within Sumo Logic:

* [Amazon Bedrock](/docs/integrations/amazon-aws/amazon-bedrock)
* [Amazon Bedrock AgentCore](/docs/integrations/amazon-aws/amazon-bedrock-agentcore)
* [Amazon SageMaker](/docs/integrations/amazon-aws/amazon-sagemaker)
* [ChatGPT Compliance](/docs/integrations/saas-cloud/chatgpt-compliance)
* [Claude Compliance](/docs/integrations/saas-cloud/claude-compliance)
* [Databricks Audit](/docs/integrations/saas-cloud/databricks-audit)
* [GitHub Copilot](/docs/integrations/saas-cloud/github-copilot)
* [Google Cloud Vertex AI](/docs/integrations/google/cloud-vertex-ai)
* [LiteLLM](/docs/integrations/saas-cloud/litellm)
* [Microsoft Foundry](/docs/integrations/microsoft-azure/microsoft-foundry)
* [OpenLLMetry](/docs/integrations/aiml/opentelemetry/openllmetry)

## FAQ

### Can I opt out of AI features?

AI features are on by default. We offer two methods for opting out:

* **Via your account team or support**. You can opt out of specific AI features or all AI features by contacting your Sumo Logic account team or opening a support ticket. If you choose to opt out of all AI features, your tenant is automatically exempted from future AI feature releases.
* **In-product self opt-out**. Beginning August 2026, platform administrators can opt out of all AI features directly within the product settings under **Feature Management** (**Administration** > **Feature Management**). Disabling AI at the admin level automatically exempts your tenant from any future AI feature rollouts. Mobot, Parse Assist, and the SOC Analyst Agent share a single **AI features** toggle; the MCP server has its own separate **MCP Server access** toggle on the same page.

### What happened to Query Agent and Knowledge Agent?

They're still here, but renamed and repositioned as their capabilities have evolved.

- **Query Agent → Log Analysis Agent**. The original Query Agent helped users write Sumo Logic queries. The Log Analysis Agent goes further, interpreting intent, guiding investigations, and surfacing relevant data through natural language.
- **Knowledge Agent → Platform Optimization Agent**. The original Knowledge Agent answered how-to questions from product documentation. The Platform Optimization Agent expands on that, helping users troubleshoot issues, optimize queries, understand data usage, and generally get more from the platform.

### Can Dojo AI access be controlled at a user level?

Not at this time. Dojo AI is enabled at the platform level and cannot be toggled for individual users or roles. However, all AI interactions strictly enforce user-level permissions—users cannot access data or execute platform actions they aren't authorized to perform manually.

### How can administrators audit or track Dojo AI usage?

Administrators can track and audit all Dojo AI activity directly within the platform using the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/). Running a targeted audit query gives administrators full visibility into both user activity and the actions agents perform in their environment.

```sumo
_index=sumologic_audit_events
| where invocationdetails.agentname in ("mobot", "soc_analyst_agent")
```

What gets audited:

- **User activity**. Individual user prompts, queries, and shared Mobot conversation threads.
- **Actions on customer data**. Log searches, playbook executions, and triage steps performed by agents across the platform.

Log searches Mobot runs on your behalf are also tracked in the [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index/); see [Audit Mobot queries](/docs/search/mobot/#audit-mobot-queries) in the Mobot doc.

### Do Dojo AI agents access customer data?

Yes. Capabilities like Mobot and the SOC Analyst Agent process customer telemetry to perform investigations, run queries, and generate findings. All processing occurs securely within your platform context, and customer data is never used to train generalized AI models.

Administrators can turn off Dojo AI capabilities at any time through **Feature Management** or by submitting a support ticket. Customers that previously opted out of Sumo Logic AI capabilities will not get access to these or future AI capabilities until they explicitly opt back in.

### What types of customer data or PII does the AI process? Does it filter sensitive information?

Sumo Logic AI capabilities follow strict legal, compliance, and security standards to ensure data minimization and fit-for-purpose processing.

- Customer data is never used to train AI models, shared externally, or used to improve global models.
- Data remains within the customer's environment and is processed only to deliver results back to that customer.
- Sumo Logic applies strong safeguards and filtering to ensure sensitive data is handled securely and appropriately at all times.

Customers can opt out of capabilities that process customer data, including the SOC Analyst Agent and Mobot, at any time from **Feature Management** or by submitting a support ticket.

### Is customer data or PII used to train AI models?

No. Customer data is never used to train AI models.

All Sumo Logic AI capabilities are designed to serve customer-specific outcomes within their own environment. Mobot uses a large language model (LLM) via Amazon Bedrock, which processes data securely and does not retain or use customer information for training or other external purposes.

Traditional ML features, such as AI-driven alerts, generate models specific to each customer's environment and are never shared or made public.

For more information, see [Security and Compliance](/docs/search/mobot/#security-and-compliance).

### Does any third party have access to Dojo AI customer data?

No additional third parties have any access. Dojo AI leverages foundation models securely hosted through Amazon Bedrock. When customer data is processed using Amazon Bedrock:

- Customer inputs and outputs are treated as Customer Content under AWS terms.
- AWS does not use Customer Content to train models or improve Amazon Bedrock.
- AWS may access Customer Content only as necessary to provide the service or comply with law.
- Third-party model providers do not have access to customer inputs or outputs.
- Customer inputs and outputs are not shared with model providers and are not used to train external models.

Customer data processed through Dojo AI remains within Sumo Logic's secure environment and is used only to deliver results for that customer. It is not used to train foundation models or shared with model providers.

### How long does Dojo AI store customer data, and how is it deleted?

Dojo AI and classical ML features store data only temporarily to optimize performance:

- AI-driven alerts use a rolling 60-day data window, retraining weekly and expiring the oldest data automatically.
- Mobot may temporarily retain conversation history in a rolling window to improve conversational context and response accuracy.

All stored data follows Sumo Logic's data retention and deletion policies, ensuring customer information is never retained longer than necessary.

### Does Sumo Logic AI use open-source libraries, generative AI providers, or cloud services?

Yes. Dojo AI leverages foundation models securely hosted through Amazon Bedrock.

### Does Sumo Logic hold any AI-specific certifications or accreditations?

Sumo Logic is currently reviewing AI compliance within a rapidly evolving framework, in particular ISO 42001, designed to help organizations implement AI responsibly.

Sumo Logic AI capabilities operate within our existing industry-recognized security and compliance framework, including FedRAMP Moderate, SOC 2 Type 2, HIPAA, PCI DSS 4.0.1, and ISO 27001:2022. These attestations govern the confidentiality, integrity, and protection of customer data.

Availability of specific AI capabilities may vary by deployment region (including FED) based on compliance boundary requirements.

<!-- Uncomment once SOC Analyst Agent GAs (target: August 3, 2026)
### Can I get Dojo AI capabilities if I'm on FedRAMP?

The SOC Analyst Agent, Mobot, and the Sumo Logic MCP server are available for these deployments. However, because the Automation Service (playbooks) has not yet been introduced to FED, Conversational Playbooks via Mobot are excluded from the launch for these deployments.
-->

### What types of model reviews are conducted?

The generative AI model is licensed and securely hosted via Amazon Bedrock, meaning it is not directly accessible by Sumo Logic, customers, or third parties.

All new AI capabilities and features undergo comprehensive legal, compliance, and application security reviews before release to ensure data protection, privacy, and regulatory alignment.

Recurring reviews are also conducted with every major update, particularly when a capability introduces new analytics or processes previously unused data types, to maintain ongoing trust and compliance.

## Additional resources

<!-- uncomment when it's ready
* [Hands on with Mobot and Dojo AI](https://learn.sumologic.com/hands-on-with-mobot-and-dojo-ai). Self-paced training course covering Mobot and the Dojo AI agents.
-->

* [Mobot](/docs/search/mobot). The conversational interface for Dojo AI — ask questions in plain language to analyze log data, investigate incidents, and get answers sourced from official documentation.
* [Mobot Example Prompts](/docs/search/mobot/example-prompts). A library of example prompts covering security and observability investigations, platform administration, and how-to questions.
* [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent). Investigate Cloud SIEM insights faster with evidence-backed AI verdicts, correlated entities, and recommended actions.
* [Sumo Logic MCP server](/docs/api/mcp-server). Connect MCP-compatible AI clients, such as Claude Code, to your Sumo Logic data using natural language.
* [Dojo AI Overview](https://www.sumologic.com/solutions/dojo-ai). Learn more about Dojo AI, Sumo Logic's multi-agent AI platform for security and observability, including Mobot, the SOC Analyst Agent, and the MCP server.
* [Welcome to Dojo AI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc). Introducing Dojo AI and its role across Sumo Logic's security and observability workflows.
* [New agents in the Dojo: Expanded Sumo Logic Dojo AI](https://www.sumologic.com/blog/agents-dojo-ai-soc-analyst-mcp). An overview of the SOC Analyst Agent and the Sumo Logic MCP server joining the Dojo AI platform.
* [The SOC Analyst Agent: Bring an agentic approach to work with your SOC team](https://www.sumologic.com/blog/soc-analyst-agent-for-soc-team). How the SOC Analyst Agent applies agentic reasoning to Cloud SIEM insight triage and investigation.
* [The AI SOC explained: Intelligent security for modern threats](https://www.sumologic.com/blog/ai-soc-intelligent-security-for-modern-threats). A look at how AI-driven agents are reshaping the modern security operations center.
