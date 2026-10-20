---
id: trust-data-faq
title: AI Trust and Data FAQ
sidebar_label: Trust and Data FAQ ✨
description: Answers about how Sumo Logic's AI and machine learning features handle your data, including training, retention, third-party access, certifications, and FedRAMP availability.
keywords:
   - dojo ai
   - ai trust
   - ai data privacy
   - machine learning
   - ml
   - ai faq
   - data retention
   - fedramp
---

This page answers common questions about how Sumo Logic's AI and machine learning features handle your data. For an overview of our AI capabilities, see [AI Capabilities](/docs/ai). To turn AI features on or off, see [Feature Management](/docs/dojo-ai/about/#feature-management).

### Do DojoAI agents access customer data?

Yes. Capabilities like Mobot and the SOC Analyst Agent process customer telemetry to perform investigations, run queries, and generate findings. All processing occurs securely within your platform context, and customer data is never used to train generalized AI models.

Administrators can turn off DojoAI capabilities at any time through **Feature Management** or by submitting a support ticket. Customers that previously opted out of Sumo Logic AI capabilities will not get access to these or future AI capabilities until they explicitly opt back in.

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

For more information, see [Security and Compliance](/docs/dojo-ai/mobot/about#security-and-compliance).

### Does any third party have access to DojoAI customer data?

No additional third parties have any access. DojoAI leverages foundation models securely hosted through Amazon Bedrock. When customer data is processed using Amazon Bedrock:

- Customer inputs and outputs are treated as Customer Content under AWS terms.
- AWS does not use Customer Content to train models or improve Amazon Bedrock.
- AWS may access Customer Content only as necessary to provide the service or comply with law.
- Third-party model providers do not have access to customer inputs or outputs.
- Customer inputs and outputs are not shared with model providers and are not used to train external models.

Customer data processed through DojoAI remains within Sumo Logic's secure environment and is used only to deliver results for that customer. It is not used to train foundation models or shared with model providers.

### How long does DojoAI store customer data, and how is it deleted?

DojoAI and classical ML features store data only temporarily to optimize performance:

- AI-driven alerts use a rolling 60-day data window, retraining weekly and expiring the oldest data automatically.
- Mobot may temporarily retain conversation history in a rolling window to improve conversational context and response accuracy.

All stored data follows Sumo Logic's data retention and deletion policies, ensuring customer information is never retained longer than necessary.

### Does Sumo Logic AI use open-source libraries, generative AI providers, or cloud services?

Yes. DojoAI leverages foundation models securely hosted through Amazon Bedrock.

### Does Sumo Logic hold any AI-specific certifications or accreditations?

Sumo Logic is currently reviewing AI compliance within a rapidly evolving framework, in particular ISO 42001, designed to help organizations implement AI responsibly.

Sumo Logic AI capabilities operate within our existing industry-recognized security and compliance framework, including FedRAMP Moderate, SOC 2 Type 2, HIPAA, PCI DSS 4.0.1, and ISO 27001:2022. These attestations govern the confidentiality, integrity, and protection of customer data.

Availability of specific AI capabilities may vary by deployment region (including FED) based on compliance boundary requirements.

### Can I get DojoAI capabilities if I'm on FedRAMP?

The SOC Analyst Agent, Mobot, and the Sumo Logic MCP server are available for these deployments. However, because the Automation Service (playbooks) has not yet been introduced to FED, Conversational Playbooks via Mobot are excluded from the launch for these deployments.

### What types of model reviews are conducted?

The generative AI model is licensed and securely hosted via Amazon Bedrock, meaning it is not directly accessible by Sumo Logic, customers, or third parties.

All new AI capabilities and features undergo comprehensive legal, compliance, and application security reviews before release to ensure data protection, privacy, and regulatory alignment.

Recurring reviews are also conducted with every major update, particularly when a capability introduces new analytics or processes previously unused data types, to maintain ongoing trust and compliance.

### Does Sumo Logic use machine learning?

Yes. Sumo Logic uses machine learning in several features, including [LogReduce](/docs/search/behavior-insights/logreduce)&reg;, [LogCompare](/docs/search/behavior-insights/logcompare), [Anomaly Detection](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) in monitors, and the Cloud SIEM [Insight Trainer](/docs/cse/rules/insight-trainer). These features build models specific to each customer's environment. The models are never shared or made public.

## Additional resources

* [Hands on with Mobot and DojoAI](https://learn.sumologic.com/hands-on-with-mobot-and-dojo-ai). Self-paced training course covering Mobot and the DojoAI agents.

* [Mobot](/docs/ai/mobot). The conversational interface for DojoAI — ask questions in plain language to analyze log data, investigate incidents, and get answers sourced from official documentation.
* [Mobot Example Prompts](/docs/dojo-ai/mobot/example-prompts). A library of example prompts covering security and observability investigations, platform administration, and how-to questions.
* [SOC Analyst Agent](/docs/dojo-ai/agents/soc-analyst-agent). Investigate Cloud SIEM insights faster with evidence-backed AI verdicts, correlated entities, and recommended actions.
* [Sumo Logic MCP server](/docs/ai/mcp-server). Connect MCP-compatible AI clients, such as Claude Code and GitHub Copilot, to your Sumo Logic data using natural language.
* [DojoAI Overview](https://www.sumologic.com/solutions/dojo-ai). Learn more about DojoAI, Sumo Logic's multi-agent AI platform for security and observability, including Mobot, the SOC Analyst Agent, and the MCP server.
* [Welcome to DojoAI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc). Introducing DojoAI and its role across Sumo Logic's security and observability workflows.
* [New agents in the Dojo: Expanded Sumo Logic DojoAI](https://www.sumologic.com/blog/agents-dojo-ai-soc-analyst-mcp). An overview of the SOC Analyst Agent and the Sumo Logic MCP server joining the DojoAI platform.
* [The SOC Analyst Agent: Bring an agentic approach to work with your SOC team](https://www.sumologic.com/blog/soc-analyst-agent-for-soc-team). How the SOC Analyst Agent applies agentic reasoning to Cloud SIEM insight triage and investigation.
* [The AI SOC explained: Intelligent security for modern threats](https://www.sumologic.com/blog/ai-soc-intelligent-security-for-modern-threats). A look at how AI-driven agents are reshaping the modern security operations center.

## Additional resources

* [AI Capabilities](/docs/ai). Find every Sumo Logic AI capability in one place.
* [Feature Management](/docs/dojo-ai/about/#feature-management). Turn AI features on or off and audit DojoAI activity.
* [DojoAI Overview](https://www.sumologic.com/solutions/dojo-ai). Learn more about DojoAI, Sumo Logic's multi-agent AI platform for security and observability.
* [Hands on with Mobot and DojoAI](https://learn.sumologic.com/hands-on-with-mobot-and-dojo-ai). Self-paced training course covering Mobot and the DojoAI agents.
