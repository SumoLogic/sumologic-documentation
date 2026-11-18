---
id: platform-optimization-agent
title: Platform Optimization Agent
description: The Platform Optimization Agent is the DojoAI agent that helps you troubleshoot issues, optimize queries, and understand data usage in Sumo Logic.
keywords:
  - platform optimization agent
  - dojoai
  - how-to questions
  - data volume
---

The Platform Optimization Agent is the [DojoAI](/docs/get-started/ai-machine-learning/#dojoai) agent that helps you get more from Sumo Logic. It monitors your environment and surfaces optimization recommendations.

The agent has the following skills:

- **Product questions**. Answers how-to questions from the official Sumo Logic documentation, through [Mobot](/docs/search/mobot).
- **Performance tuning**
  - **Query optimization**. Identifies inefficient, resource-heavy searches and suggests rewritten queries for faster results and lower compute load.
  - **Dashboard layout optimization**. Highlights slow-loading or bloated dashboards and provides structural fixes to speed up page load times during critical investigations.
- **Platform manageability and health**
  - **Data source gaps**. Scans your telemetry environment to pinpoint missing sources, ensuring complete observability across critical infrastructure and services.

## Availability

- The Platform Optimization Agent is available to everyone with DojoAI enabled. If your organization opted out of DojoAI, it is not available.

## FAQ

### What happened to the Knowledge Agent?

The Platform Optimization Agent replaces the Knowledge Agent. The Knowledge Agent answered how-to questions from product documentation. The Platform Optimization Agent keeps that skill and adds query optimization guidance, data usage insight, and proactive recommendations.

### Will I see the Platform Optimization Agent in the UI?

You do not see it as a separate item. It surfaces through the Recommendations page and DojoAI Studio.

### Will the Platform Optimization Agent make changes to my environment without asking?

No. In its proactive mode, every recommendation requires your explicit review and action before anything changes. See [DojoAI Recommendations](/docs/search/mobot/dojoai-recommendations-preview) for details on the review-and-apply workflow.

## Additional resources

- [DojoAI Recommendations (Extended Preview)](/docs/search/mobot/dojoai-recommendations-preview). Learn how the Platform Optimization Agent proactively recommends ways to improve your Sumo Logic environment.
- [Mobot](/docs/search/mobot). Learn about Mobot's capabilities, limits, and security.
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). See how DojoAI agents fit together.
