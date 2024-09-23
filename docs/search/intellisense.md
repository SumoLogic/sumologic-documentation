---
id: intellisense
title: Intellisense for Logs Search
sidebar_label: Intellisense
description: Overview of the upcoming Intellisense enhancements for log search functionality, outlining how these features can improve the querying experience for both novice and advanced users.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- Is this in Beta? -->

Intellisense enhances log search functionality with syntax-driven autocompletion, next-operator prediction, and improved key-value pair support. These features streamline query creation and enable you to quickly navigate through large datasets, particularly JSON logs. A revamped log assist UI makes the query-writing process more intuitive and user-friendly.


## Key Features

- **Syntax autocompletion**. Automatically suggests query syntax, operators, and functions to reduce errors and speed up query creation.
- **Key-value pair support**. Offers suggestions for structured logs, such as JSON, recognizing keys and values to create more precise queries.
- **Next-operator prediction**. Anticipates and suggests the next logical operator based on the current query context, reducing steps.
- **Revamped log assist UI**. Highlights syntax errors and suggests fixes in real-time for a smoother user experience.
- **Facet determination for JSON logs**. Automatically identifies facets (e.g., timestamp, status) from JSON logs to help refine searches.


## How It Works

### Copilot integration

[Sumo Logic Copilot](/docs/search/copilot) offers query assistance through features like:

- **Translate**. Converts complex logs into readable formats.
- **Autocomplete**. Suggests the next query step.
- **Next Steps**. Guides query refinement.
- **Explore**. Helps discover related datasets.

### Context-Aware Querying

The **Context Store** tracks past queries and operator usage, powering the **Next Clause Predictor** for smarter suggestions.

### Operator Usage Cache

Stores operator usage history, providing more accurate predictions for the next clause or operator.


## How to Use Intellisense

### 1. Access Logs Search

1. From the Sumo Logic dashboard, select **Search** > **Logs Search**.
2. Open the **New Code Editor** to activate Intellisense.

### 2. Use Syntax autocompletion

1. Start typing a query (e.g., `parse`, `filter`). Intellisense will suggest options.
2. Use **arrow keys** to scroll through suggestions and hit **Enter** to select one. The editor will autofill the rest.

### 3. Key-value pair support

1. For JSON or structured logs, type a key (e.g., `status`).
2. Intellisense will suggest keys and values. Select the appropriate one using **Enter**.

### 4. Next-operator prediction

1. After writing a query clause (e.g., `parse`), press **Enter**.
2. Intellisense will predict and suggest the next operator (e.g., `group by`, `where`). Use **arrow keys** or click to select.

### 5. Revamped log assist UI

1. As you write, the UI will highlight syntax issues. Hover over the underlined errors for suggestions.
2. The side panel provides query-building tutorials and examples for additional support.

### 6. Facet determination for JSON logs

1. Start a query for JSON-formatted logs. Intellisense will suggest facets (e.g., `status`, `timestamp`).
2. Click the facet to refine your query.

### Example walkthrough

1. Open **Logs Search** > **New Code Editor**.
2. Type `parse` to start a query, and Intellisense will suggest options.
3. For JSON logs, type a key (e.g., `status`). Select the suggested facet (e.g., `timestamp`) for more precise filtering.
4. Add a filtering clause like `where status="error"` and group results using `group by`.

By following these steps, you can make full use of Intellisense, speeding up query writing and enhancing your search efficiency.
