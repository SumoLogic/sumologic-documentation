---
id: copilot-unstructured-logs-beta
title: Sumo Logic Copilot - Unstructured Logs Support (Beta)
description: Streamline your log analysis with Sumo Logic Copilot, our AI-based assistant that simplifies log analysis by letting you ask questions in plain English, even for logs without a well-defined structure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. For more information, contact your Sumo Logic account executive.

Unstructured Logs Support for [Sumo Logic Copilot](/docs/search/copilot), our AI assistant, enables it to understand and provide insights from raw, text-based logs, even if they don't follow a structured format like JSON. This means you can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

## What's new

Currently, [Copilot works best on structured (JSON) logs](/docs/search/copilot/#compatible-log-formats). With this beta update, Copilot automatically applies parsing logic to unstructured logs, even if no FERs are configured.

At this stage, Copilot prioritizes unstructured logs that are already used in dashboards, allowing it to surface insights from high-value log sources out-of-the-box. This means it won’t interpret all raw logs yet, but we’re actively working to broaden this support beyond dashboards.

* **Broader coverage**. Copilot now parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Improved usability**. Ask questions in natural language. Copilot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Copilot’s structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured Logs Support builds on Copilot’s secure foundation.

<!---No need to call it out until GA
### Powered by Intelliparse mode
Unstructured Logs Support is powered by [Intelliparse mode (Beta)](/docs/search/get-started-with-search/build-search/intelliparse-beta), a new parsing engine that automatically extracts fields from raw logs based on patterns already used in your dashboards. This eliminates the need for manual Field Extraction Rules (FERs) and allows Copilot to surface insights from unstructured logs out-of-the-box. Behind the scenes, Copilot injects a hidden `intelliparse` operator into relevant queries to make unstructured logs easier to work with.
-->

### Common use cases

* **General log exploration**. Ask questions about unstructured logs that are already used in your dashboards, even if they lack predefined fields.
* **Error triage**.  Investigate frequently visualized log data to surface patterns and recurring issues in unstructured formats.
* **Security insights**. Detect anomalies or signs of failed logins by querying raw logs already powering security dashboards.
* **Smarter prioritization**. Copilot focuses on unstructured logs that are visualized in dashboards, helping you get meaningful insights from high-value data sources.

## FAQ

**Will Copilot interpret all my logs?**<br/>
Copilot prioritizes unstructured logs that are already used in dashboards. This improves the relevance of insights and helps focus on high-value logs.

**How is this different from structured log support?**<br/>  
Structured logs have predefined fields, allowing Copilot to map queries directly. For unstructured logs, Copilot uses AI and parsing techniques to infer structure on the fly.
