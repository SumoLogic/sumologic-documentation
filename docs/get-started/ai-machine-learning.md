---
id: ai-machine-learning
title: AI and Machine Learning with Sumo Logic
sidebar_label: AI and Machine Learning
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
   - conversational dashboards
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

Dojo AI is Sumo Logic’s multi-agent AI platform, bringing specialized agents across security and observability workflows. Agents work together to detect threats, investigate incidents, explore data, and answer platform questions, with a human in the loop at every step. Dojo AI is built and deployed on AWS and is available through Sumo Logic and in AWS Marketplace. [Learn more](https://www.sumologic.com/solutions/dojo-ai).

### Mobot

[Mobot](/docs/search/mobot) is the conversational interface for Dojo AI. Ask questions in plain language to analyze log data, investigate incidents, or get answers sourced from official documentation, without writing queries. Mobot connects you to two specialized agents:

* **Log Analysis Agent**. Interprets your intent, guides investigations, and surfaces relevant data through natural language to speed data exploration and investigation.
* **Platform Optimization Agent**. Answers how-to questions and helps you troubleshoot issues, optimize queries, understand data usage, and get more from the platform, sourced directly from our official documentation.

Beyond analysis and platform guidance, Mobot also lets you create, edit, and summarize content through natural language, including **Conversational Monitors**, **Conversational Dashboards**, and **Conversational Playbooks**. For details on each, see [Mobot](/docs/search/mobot).

### SOC Analyst Agent

Triage and investigate Cloud SIEM insights faster with the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/), which applies agentic reasoning to analyze alerts and deliver evidence-backed verdicts (malicious, suspicious, or benign). It correlates related activity, maps entity relationships, and summarizes findings, so analysts start with an investigation instead of a raw alert. From there, you can continue digging in [Mobot](/docs/search/mobot) using natural language to explore scope, impact, and supporting evidence.

The SOC Analyst Agent requires a Cloud SIEM subscription and is opt-in, with a launch promotion that enables it by default for the first 90 days at five investigated insights per day. See [Availability](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/#availability).

### MCP server

The [Sumo Logic MCP server](/docs/api/mcp-server) connects MCP-compatible AI clients, such as Claude Code and GitHub Copilot, to your Sumo Logic data — no custom integrations required. Use natural language to run log searches, triage Cloud SIEM insights and detection rules, retrieve alerts, and manage dashboards, with the same governance and access controls you already rely on. Any paid customer can activate the MCP server through a self-service feature in admin settings.

## Classical machine learning

Beyond Dojo AI, Sumo Logic applies classical machine learning across observability and security workflows to surface patterns, reduce noise, and accelerate detection and investigation.

### Observability

Sumo Logic AI for Observability functionality equips developers and SREs with powerful tools to efficiently manage and optimize their technology stack.

Through comprehensive discovery, monitoring, diagnosis, recovery, and prevention capabilities, we ensure minimized downtime, reduced false positives, faster incident resolution, and proactive issue prevention, all aimed at enhancing the overall health and performance of your applications and services. These capabilities include discovering app, service, and infrastructure stack relationships; utilizing M.E.L.T. telemetry to minimize detection time and false positives; diagnosing incidents swiftly; accelerating recovery times; and preventing future incidents.

#### LogReduce

[LogReduce](/docs/search/behavior-insights/logreduce)&reg; utilizes AI-driven algorithms to cluster log messages based on string similarity and distill thousands of log lines into easy-to-understand patterns. Separate the signal from the noise and detect anomalous behavior with Outlier Detection. LogReduce employs fuzzy logic to group similar messages into signatures, enabling quick assessment of activity patterns. You can refine results based on your preferences, teaching LogReduce for more specific outcomes.

#### LogCompare

[LogCompare](/docs/search/behavior-insights/logcompare) compares log data from different time periods to identify changes or anomalies, helping with troubleshooting and root cause analysis. It clusters logs into patterns using baseline and target queries, then highlights significant differences over time. You can refine results by promoting, demoting, or splitting signatures, and set up alerts for new or changed patterns.

#### AI in alerting

##### Anomaly detection

[Anomaly Detection](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions), powered by ML, efficiently flags suspicious activities by establishing baseline behavior and minimizing false positives. It also automatically fine-tunes anomaly detection with minimal user input, and you can associate it with a playbook to link anomaly responses with monitors, streamlining incident response.

##### Automated playbooks

With [Automated playbooks](/docs/alerts/monitors/use-playbooks-with-monitors), you can set up a predefined set of actions and conditional statements that respond to an events like security incidents proactively by running an automated workflow without manual intervention. Configuration is easy - browse our 500+ existing playbooks in the Automation Service App Central, then choose and/or customize it. You can access playbooks when creating a monitor, viewing an alert, or directly from the Automation Service.

### Security

Our Sumo Logic AI for Security functionality empowers SOC analysts and threat hunters to effectively safeguard their technology stack against evolving threats. By integrating advanced tools for discovery, detection, investigation, response, and protection, we minimize dwell time, reduce false positives, accelerate incident resolution, and proactively prevent future incidents, ensuring robust security and resilience for your cloud, container, and on-prem resources.

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

## Security

Our Sumo Logic AI for Security functionality empowers SOC analysts and threat hunters to effectively safeguard their technology stack against evolving threats. By integrating advanced tools for discovery, detection, investigation, response, and protection, we minimize dwell time, reduce false positives, accelerate incident resolution, and proactively prevent future incidents, ensuring robust security and resilience for your cloud, container, and on-prem resources.

### Cloud SIEM

#### SOC Analyst Agent

Triage and investigate Cloud SIEM insights faster with the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/), which applies agentic AI reasoning to analyze alerts and deliver evidence-backed verdicts (malicious, suspicious, or benign). It correlates related activity, maps entity relationships, and summarizes findings, so analysts start with an investigation instead of a raw alert. From there, you can continue digging in [Mobot](/docs/search/mobot) using natural language to explore scope, impact, and supporting evidence.

#### Rules

Sumo Logic's Cloud SIEM rules leverage AI for the following:
* [Insight Trainer](/docs/cse/rules/insight-trainer). Utilizes ML and AI to deliver outcome-based recommendations, reducing false positives without compromising detection value.
* [First-seen rule](/docs/cse/rules/write-first-seen-rule). Identifies novel threats based on first occurrences.
* [Outlier rule](/docs/cse/rules/write-outlier-rule/). Detects abnormal behavior indicating potential security breaches.

### Global Intelligence

## FAQ

### Can I opt out of AI features?

Yes. An administrator can opt out from the **Feature Management** page (**Administration** > **Feature Management**). Mobot, Parse Assist, and the SOC Analyst Agent share a single **AI features** toggle; the MCP server has its own separate **MCP Server access** toggle on the same page. For other AI features, contact [Support](https://support.sumologic.com/support/s).

### What happened to Query Agent, Knowledge Agent, and Summary Agent?

They're still here, but renamed and repositioned as their capabilities have evolved.

- **Query Agent → Log Analysis Agent**. The original Query Agent helped users write Sumo Logic queries. The Log Analysis Agent goes further, interpreting intent, guiding investigations, and surfacing relevant data through natural language.
- **Knowledge Agent → Platform Optimization Agent**. The original Knowledge Agent answered how-to questions from product documentation. The Platform Optimization Agent expands on that, helping users troubleshoot issues, optimize queries, understand data usage, and generally get more from the platform.
- **Summary Agent → absorbed into SOC Analyst Agent**. Summary Agent's signal summarization capability is now a core part of how the SOC Analyst Agent contextualizes and presents its findings.

### Do Dojo AI agents access customer data?

Agent interaction with customer data varies by capability.

Mobot (including Log Analysis Agent and Platform Optimization Agent) does **not** process or analyze customer data.

The SOC Analyst Agent processes customer data to help review insight data, correlate activity, and assist in triage and investigation as directed by the user.

The MCP server connects external AI clients to supported Sumo Logic capabilities via API tools only, respecting your existing permission controls and access policies.

Any AI capability that processes customer data is available only through explicit customer opt-in and is never automatically provisioned. An AI addendum to the client agreement is no longer required, though one remains available for customers who want it.

Customers retain control over whether these data-processing capabilities are enabled in their environment.

### What types of customer data or PII does the AI process? Does it filter sensitive information?

Sumo Logic AI capabilities follow strict legal, compliance, and security standards to ensure data minimization and fit-for-purpose processing.

- Customer data is never used to train AI models, shared externally, or used to improve global models.
- Data remains within the customer's environment and is processed only to deliver results back to that customer.
- Sumo Logic applies strong safeguards and filtering to ensure sensitive data is handled securely and appropriately at all times.

Capabilities that process customer data, including the SOC Analyst Agent and the MCP server, are available only through explicit customer opt-in and are never automatically provisioned. An AI addendum is no longer required, though one remains available for customers who want it.

### Is customer data or PII used to train AI models?

No. Customer data is never used to train AI models.

All Sumo Logic AI capabilities are designed to serve customer-specific outcomes within their own environment. Mobot uses a large language model (LLM) via Amazon Bedrock, which processes data securely and does not retain or use customer information for training or other external purposes.

Traditional ML features, such as AI-driven alerts, generate models specific to each customer's environment and are never shared or made public.

For more information, see [Security and Compliance](/docs/manage/security).

### Does any third party have access to Dojo AI customer data?

Dojo AI leverages foundation models securely hosted through Amazon Bedrock. When customer data is processed using Amazon Bedrock:

- Customer inputs and outputs are treated as Customer Content under AWS terms.
- AWS does not use Customer Content to train models or improve Amazon Bedrock.
- AWS may access Customer Content only as necessary to provide the service or comply with law.
- Third-party model providers (such as Anthropic) do not have access to customer inputs or outputs.
- Customer inputs and outputs are not shared with model providers and are not used to train external models.

Customer data processed through Dojo AI remains within Sumo Logic's secure environment and is used only to deliver results for that customer. It is not used to train foundation models or shared with model providers.

### How long does Dojo AI store customer data, and how is it deleted?

Dojo AI and classical ML features store data only temporarily to optimize performance:

- AI-driven alerts use a rolling 60-day data window, retraining weekly and expiring the oldest data automatically.
- Mobot may temporarily retain query history in a rolling window to improve conversational context and response accuracy.

All stored data follows Sumo Logic's data retention and deletion policies, ensuring customer information is never retained longer than necessary.

### Does Sumo Logic AI use open-source libraries, generative AI providers, or cloud services?

Yes. Dojo AI leverages foundation models securely hosted through Amazon Bedrock.

### Does Sumo Logic hold any AI-specific certifications or accreditations?

Sumo Logic is currently reviewing AI compliance within a rapidly evolving framework, in particular ISO 42001, designed to help organizations implement AI responsibly.

Sumo Logic AI capabilities operate within our existing industry-recognized security and compliance framework, including FedRAMP Moderate, SOC 2 Type 2, HIPAA, PCI DSS 4.0.1, and ISO 27001:2022. These attestations govern the confidentiality, integrity, and protection of customer data.

Availability of specific AI capabilities may vary by deployment region (including FED) based on compliance boundary requirements.

### Which Dojo AI capabilities are available in FED?

The current GA versions of Mobot (including Log Analysis Agent and Platform Optimization Agent) and the MCP server are available in the FED deployment.

The SOC Analyst Agent and certain newer Dojo AI capabilities are not currently available in FED. These capabilities depend on underlying model configurations that do not yet meet the requirements of our FED compliance boundary.

Sumo Logic is actively evaluating future availability of these capabilities in FED as underlying model support and compliance requirements evolve.

### What types of model reviews are conducted?

The generative AI model is licensed and securely hosted via Amazon Bedrock, meaning it is not directly accessible by Sumo Logic, customers, or third parties.

All new AI capabilities and features undergo comprehensive legal, compliance, and application security reviews before release to ensure data protection, privacy, and regulatory alignment.

Recurring reviews are also conducted with every major update, particularly when a capability introduces new analytics or processes previously unused data types, to maintain ongoing trust and compliance.

## Additional resources

* [Dojo AI Overview](https://www.sumologic.com/solutions/dojo-ai). Learn more about Dojo AI, Sumo Logic's multi-agent AI platform for security and observability, including Mobot, the SOC Analyst Agent, and the MCP server.
* [Welcome to Dojo AI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc)
* [New agents in the Dojo: Expanded Sumo Logic Dojo AI](https://www.sumologic.com/blog/agents-dojo-ai-soc-analyst-mcp)
* [The SOC Analyst Agent: Bring an agentic approach to work with your SOC team](https://www.sumologic.com/blog/soc-analyst-agent-for-soc-team)
* [The AI SOC explained: Intelligent security for modern threats](https://www.sumologic.com/blog/ai-soc-intelligent-security-for-modern-threats)
