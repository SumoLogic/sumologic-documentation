---
id: copilot-unstructured-logs
title: Sumo Logic Copilot - Unstructured Logs Support (Beta)
description: Streamline your log analysis with Sumo Logic Copilot, our AI-based assistant that simplifies log analysis by letting you ask questions in plain English, even for logs without a well-defined structure.
keywords:
  - copilot
  - artificial intelligence
  - ai
  - machine learning
  - ml
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

This feature is in Beta. To participate, contact your Sumo Logic account executive or [enroll here](https://forms.gle/LozrrAppM9FM94tS9).

Unstructured Logs Support for [Sumo Logic Copilot](/docs/search/copilot), our AI assistant, enables it to understand and provide insights from raw, text-based logs, even if they don't follow a structured format like JSON. This means you can ask questions in plain English and get meaningful results from nearly any log data, without requiring Field Extraction Rules (FERs).

## What's new

Currently, [Copilot works best on structured (JSON) logs](/docs/search/copilot/#compatible-log-formats). With this beta update, Copilot automatically applies parsing logic to unstructured logs, even if no FERs are configured. This allows Copilot to interpret logs from many popular data sources out-of-the-box and enables support for a broader range of log types.

Copilot learns from usage patterns; if a log source is already used in dashboards or commonly queried, it’s more likely to produce accurate, actionable results.

* **Broader coverage**. Copilot now parses and generates insights from unstructured log formats, even without FERs, making it useful for environments that include custom or inconsistent log types.
* **Improved usability**. Ask questions in natural language. Copilot interprets your intent and suggests relevant searches, even for raw, non-JSON logs.
* **Performance and reliability**. Response times and suggestion accuracy are consistent with Copilot’s structured log experience.
* **Security and compliance**. The same strict data handling and privacy standards apply. Unstructured Logs Support builds on Copilot’s secure foundation.
* **Common use cases**.
  * **Keyword-based search**. Search for IP addresses, error codes, or other patterns without needing a predefined schema.  
  * **Error triage**. Quickly identify the most common error messages in raw logs to speed up troubleshooting.  
  * **Threat hunting**. Detect suspicious activity, failed logins, or unusual patterns in plain-text logs.
* **Smarter prioritization**. Frequently used data sources (such as those in dashboards or frequent queries) are prioritized for deeper insights.

## Tips and best practices

* Start with common natural language queries, like:
  - “Show failed login attempts for the past 24 hours”
  - “Find logs with IP 192.0.2.0”
  - “What are the top 5 errors from nginx logs today?”
* Use dashboards to monitor your log sources. Copilot performs better when logs are part of existing queries and visualizations.
* Logs with consistent formats, clear timestamps, and standard separators (like commas or tabs) yield better results.

## Related updates

These recent Copilot enhancements make it even easier to work with unstructured logs:

* **Dynamic conversation titles**. Your queries are automatically titled for easy organization and retrieval.
* **"Open in Copilot" for alerts**. Investigate alerts directly in Copilot without losing context.
* **Suggestion pinning**. Pin suggestions inside a conversation to revisit them later.

## FAQ

**Does this replace Field Extraction Rules (FERs)?**<br/>
No. Copilot works with or without FERs. While FERs are useful for structured analysis, they're no longer required for Copilot to interpret unstructured logs.

**Will Copilot interpret all my logs?**<br/>
Copilot prioritizes data sources that are already used in dashboards or frequent queries. This improves the relevance of insights and helps focus on high-value logs.

**How is this different from structured log support?**<br/>  
Structured logs have predefined fields, allowing Copilot to map queries directly. For unstructured logs, Copilot uses AI and parsing techniques to infer structure on the fly.


## Feedback and support

We’re actively looking for customers to participate in the beta and provide feedback. Ideal participants:

* Use dashboards for monitoring across most of their data sources  
* Have some hands-on experience with Copilot
* Are willing to provide detailed feedback during the beta  

👉 [Click here to enroll](https://forms.gle/LozrrAppM9FM94tS9)

To report issues or share feedback, reach out through your Sumo Logic account team.
