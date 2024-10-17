---
id: simplified-query-writing
title: Simplified Query Writing Enhancements (Beta)
description: Our new simplified query writing enhancements focus on delivering a frictionless query experience with real-time syntax suggestions, schema suggestions, and partial/full query predictions.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p> <a href="/docs/beta"><span className="beta">Beta</span></a> </p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

Our new **Simplified Query Writing** enhancements focus on delivering a frictionless query experience with real-time syntax suggestions, schema suggestions, and partial/full query predictions. These features make it easier for both novice and advanced users to build accurate and efficient queries.

## Key features

* **Syntax suggestions**. Get real-time syntax suggestions as you type, reducing errors and speeding up query creation.
* **Schema suggestions**. Automatically receive schema-related suggestions, helping you navigate complex data structures like JSON logs with ease.
* **Partial/Full query suggestions**. Based on your input, the system predicts and suggests the next operator or even a full query, streamlining the process.
* **Frictionless query experience**. An intuitive interface highlights errors and provides immediate fixes, allowing for smooth and seamless query building.
* **Key-Value pair support**. Offers enhanced suggestions for structured logs like JSON, recognizing keys and values for more precise filtering.
* **Facet identification for JSON Logs**. Identifies key facets (e.g., timestamp, status) to help refine your queries.

## How to use

### 1. Start a Log Search

From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic) or the [**New UI**](/docs/get-started/sumo-logic-ui), go to **Log Search** to start crafting your query.

### 2. Syntax suggestions

1. Begin typing in the query field to see syntax and operator suggestions.
2. Use arrow keys or your mouse to navigate and select the desired option.

### 3. Schema suggestions

1. For structured logs (like JSON), Intellisense will offer schema-based suggestions, helping you choose relevant keys (e.g., `status`, `timestamp`) for more accurate queries.

### 4. Partial/Full query predictions

1. After entering a filtering condition (e.g., `where status="error"`), the system will predict and suggest the next logical operator or a complete query, saving you time.

### 5. UI enhancements

1. As you write, syntax issues are automatically highlighted, with real-time suggestions for corrections.

### 6. JSON facet identification

1. When working with JSON logs, relevant facets like `status` and `timestamp` will be suggested to refine your query further.

These enhancements ensure a smoother, more efficient query-building experience, making it easier to analyze your data.

<!--
## Example
Use meeting query
-->

## Need more help?

Try [Sumo Logic Copilot](/docs/search/copilot), our AI-powered assistant that helps you write queries in plain English and auto-generates them for you.
