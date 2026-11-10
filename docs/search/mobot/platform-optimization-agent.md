---
id: platform-optimization-agent
title: Platform Optimization Agent
description: The Platform Optimization Agent in Mobot answers how-to questions from Sumo Logic Help and reports on data volume and ingest, with no queries or support tickets.
keywords:
  - platform optimization agent
  - mobot
  - dojoai
  - how-to questions
  - data volume
  - ingest volume
---

The Platform Optimization Agent is the [DojoAI](/docs/get-started/ai-machine-learning/#dojoai) agent that helps you get more from Sumo Logic. Ask [Mobot](/docs/search/mobot) a question in plain language, and the agent answers without you leaving the platform, writing a query, or filing a support ticket.

You do not select this agent. Mobot routes your prompt to the right agent automatically.

The agent has the following skills:

- [Help answers](#help-answers). Get how-to answers sourced from Sumo Logic Help.
- [Data volume](#data-volume). Get answers about your ingest volume.

## Help answers

Ask any how-to question about using Sumo Logic, such as setup, configuration, or feature questions. The agent retrieves information from [Sumo Logic Help](https://www.sumologic.com/help/), so answers align with official product guidance. Answers include steps, navigation paths, and links to the relevant documentation.

For example, `How do I configure OpenTelemetry for my service?`

The agent does not always return identical wording for similar questions, but the guidance stays grounded in the documentation. If an answer seems incorrect or unclear, use the feedback controls in Mobot to tell us.

### Tips for better how-to answers

- **Provide troubleshooting details**. Include error messages and the integration or feature involved. For example, `I'm getting a 403 error when setting up an AWS integration. What could be wrong?`
- **Reference specific features**. Use product names when you know them. `How do I use Field Extraction Rules?` gives better results than `How do I extract fields?`
- **Follow up naturally**. If the first answer is close, refine it with a question such as `What about Azure instead of AWS?`

For more prompts to try, see [Sumo Logic how-to questions](/docs/search/mobot/example-prompts#sumo-logic-how-to-questions).

## Data volume

Ask Mobot about your data ingest, and the agent answers from the Data Volume index. You do not need to write a query. This helps admins track ingestion and find noisy sources, and helps finance teams answer billing and usage questions.

You can include any of the following in your prompt:

- **Time window**. For example, the last week or the past two weeks.
- **Unit**. GB, TB, MB, bytes, or event counts. If you do not specify a unit, the agent uses GB.
- **Breakdown**. Collector, source, source category, tier, or log level.
- **Top N**. For example, your top 10 source categories by daily ingest.

The agent restates the time window and unit it used so you can confirm the answer matches your question. Breakdown and top N requests return structured results instead of a single total.

Example prompts:

- `Show me the daily ingest for the last week.`
- `Ingest volume per day in GB.`
- `Show me how much was ingested for collector "<collector_name>" for the past two weeks.`
- `Give me my top 10 source categories by daily ingest volume.`

You can only see data volume information for the organizations and data you already have permission to access.

## Availability and limits

- The Platform Optimization Agent is available to everyone with Mobot enabled. If your organization opted out of DojoAI or Mobot, it is not available.
- Questions to the agent count toward your Mobot prompt allowance. Learn more in the [Mobot FAQ](/docs/search/mobot/#is-there-a-limit-to-how-many-prompts-i-can-send).
- The agent answers questions only. It does not create queries, monitors, or dashboards, and it does not connect to external knowledge sources or internal systems such as Salesforce or Jira. To create content, see [Create and manage content](/docs/search/mobot/#create-and-manage-content) in Mobot.

## FAQ

### What happened to the Knowledge Agent?

The Platform Optimization Agent replaces the Knowledge Agent. The Knowledge Agent answered how-to questions from product documentation. The Platform Optimization Agent keeps that skill and adds others, such as data volume answers.

### Will I see the Platform Optimization Agent in the UI?

No. You always interact with it through Mobot's single chat interface.

### Can I return to a previous conversation?

Yes. Mobot saves conversation history for 60 days. Learn more in [Managing conversations](/docs/search/mobot/#managing-conversations).

## Additional resources

- [DojoAI Recommendations (Extended Preview)](/docs/search/mobot/dojoai-recommendations-preview). Learn how the Platform Optimization Agent proactively recommends ways to improve your Sumo Logic environment.
- [Mobot](/docs/search/mobot). Learn about Mobot's capabilities, limits, and security.
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). See how DojoAI agents fit together.
