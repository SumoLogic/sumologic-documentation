---
id: copilot-unstructured-logs-beta
title: Sumo Logic Copilot - Unstructured Logs Support (Beta)
description: Streamline your log analysis with Sumo Logic Copilot, our AI-based assistant that simplifies log analysis by letting you ask questions in plain English, even for logs without a well-defined structure.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. For more information, contact your Sumo Logic account executive.

Unstructured Logs Support for [Sumo Logic Copilot](/docs/search/copilot), our AI assistant, enables it to understand and provide insights from raw, text-based logs, even if they don't follow a structured format like JSON. This means you can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

## What's new

Currently, [Copilot works best on structured (JSON) logs](/docs/search/copilot/#compatible-log-formats). With this beta update, Copilot automatically applies parsing logic to unstructured logs, even if no FERs are configured. This allows Copilot to interpret logs from many popular data sources out-of-the-box and enables support for a broader range of log types.

* **Broader coverage**. Copilot now parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Improved usability**. Ask questions in natural language. Copilot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Copilot’s structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured Logs Support builds on Copilot’s secure foundation.

### Powered by Intelliparse mode

Copilot now uses [Intelliparse Mode](/docs/search/get-started-with-search/build-search/intelliparse) to extract fields from unstructured logs. This new parsing engine automatically applies parsing logic based on logs already used in your dashboards, allowing Copilot to work with raw logs that don’t follow a consistent format.

You’ll get more meaningful results from logs that are already powering visualizations and queries without needing to manually define parsing logic or create Field Extraction Rules (FERs).

Copilot uses a hidden `intelliparse` operator behind the scenes that's injected automatically into relevant queries to extract fields, making unstructured logs easier to work with.

### Common use cases

* **General log exploration**. Ask questions about logs used in your dashboards, even if they don’t have predefined structure.
* **Error triage**. Identify frequent errors in raw logs that already support visualizations in your environment.
* **Security insights**. Surface signs of failed logins or anomalies from frequently queried log sources.
* **Smarter prioritization**. Copilot focuses on unstructured logs that are already actively used, helping maximize relevance and value.

## FAQ

**Will Copilot interpret all my logs?**<br/>
Copilot prioritizes unstructured logs that are already used in dashboards. This improves the relevance of insights and helps focus on high-value logs.

**How is this different from structured log support?**<br/>  
Structured logs have predefined fields, allowing Copilot to map queries directly. For unstructured logs, Copilot uses AI and parsing techniques to infer structure on the fly.
