---
id: mobot-unstructured-logs-beta
title: Sumo Logic Mobot - Unstructured Logs Support (Beta)
description: Streamline your log analysis with Sumo Logic Mobot, our AI-based assistant that simplifies log analysis by letting you ask questions in plain English, even for logs without a well-defined structure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

<!-- Originally added as a beta article with DOCS-752. -->

This feature is in Beta. For more information, contact your Sumo Logic account executive.

Unstructured Logs Support for [Sumo Logic Mobot](/docs/search/mobot), our AI assistant, enables it to understand and provide insights from raw, text-based logs, even if they don't follow a structured format like JSON. This means you can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

## What's new

Currently, [Mobot works best on structured (JSON) logs](/docs/search/mobot/#compatible-log-formats). With this beta update, Mobot automatically applies parsing logic to unstructured logs, even if no FERs are configured.

At this stage, Mobot prioritizes unstructured logs that are already used in dashboards, allowing it to surface insights from high-value log sources out-of-the-box. This means it won’t interpret all raw logs yet, but we’re actively working to broaden this support beyond dashboards.

* **Broader coverage**. Mobot now parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Improved usability**. Ask questions in natural language. Mobot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Mobot’s structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured Logs Support builds on Mobot’s secure foundation.

### Common use cases

* **General log exploration**. Ask questions about unstructured logs that are already used in your dashboards, even if they lack predefined fields.
* **Error triage**. Investigate frequently visualized log data to surface patterns and recurring issues in unstructured formats.
* **Security insights**. Detect anomalies or signs of failed logins by querying raw logs already powering security dashboards.
* **Smarter prioritization**. Mobot focuses on unstructured logs that are visualized in dashboards, helping you get meaningful insights from high-value data sources.

## FAQ

**Will Mobot interpret all my logs?**<br/>
Mobot prioritizes unstructured logs that are already used in dashboards. This improves the relevance of insights and helps focus on high-value logs.

**How is this different from structured log support?**<br/>  
Structured logs have predefined fields, allowing Mobot to map queries directly. For unstructured logs, Mobot uses AI and parsing techniques to infer structure on the fly.
