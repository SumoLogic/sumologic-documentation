---
id: copilot-unstructured-logs
title: Sumo Logic Copilot - Unstructured Logs Support (Beta)
description: Streamline your log analysis with Sumo Logic Copilot, our AI-based assistant designed to simplify log analysis by allowing you to ask questions in plain English and providing search suggestions without the need to write log queries.
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

This feature is in Beta. To participate, contact your Sumo Logic account executive.

Copilot’s Unstructured Logs Support broadens Copilot’s query translation and suggestion capabilities to raw, non-JSON text logs. By removing the need for defined fields, organizations can gain deeper insights from logs that don’t conform to a standard structure. Here are some key highlights:

* **Broader coverage**  
  - Copilot now works with any text-based logs, making it ideal for heterogeneous environments or custom log formats.
* **Improved usability**  
  - Receive suggestions and sample searches you can adapt or refine as needed.
* **Performance and reliability**  
  - Thorough testing shows that query execution and response times remain consistent with Copilot’s structured log functionality.  
  - Our ongoing QA focuses on delivering accurate results, even in large and diverse log sets.
* **Security and compliance**  
  - We follow the same strict security standards used across all Sumo Logic services.  
  - Unstructured Logs Support leverages Copilot’s existing safe-handling mechanisms for user data.
* **Common use cases**  
  - **Broad keyword searches**. Find relevant entries in raw text (for example, by IP address or error keyword) without needing to define fields.  
  - **Error analysis & triage**. Quickly locate top errors in logs that lack a clear structure.  
  - **Security & threat hunting**. Identify suspicious patterns, attacker IOCs, or critical authentication failures in free-form logs.
* **Future enhancements**  
  - **Refined language parsing**. We plan to further improve how Copilot detects common terms like "login," "IP," and "authentication."  
  - **Advanced filtering**. Additional options (for example, time range, user ID, IP, and location) are planned for the final release.


## Feedback

Organizations interested in participating in the Beta can coordinate with their Sumo Logic account teams. Any anomalies or performance concerns should be raised via normal Sumo Logic support channels.
