---
id: intellisense
title: Intellisense for Logs Search (Beta)
description: Intellisense enhancements for log search improves the querying experience for both novice and advanced users with query autocompletion, operator prediction, and improved key-value pair support.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p> <a href="/docs/beta"><span className="beta">Beta</span></a> </p>

This feature is in Beta. To participate, contact your Sumo Logic account executive.

Intellisense enhances log search functionality with syntax-driven autocompletion, in-line context-based recommendations, operator prediction, and improved key-value pair support. These features streamline query creation and enable you to quickly navigate through large datasets, particularly JSON logs. A revamped log assist UI makes the query-writing process more intuitive and user-friendly.

## Key features

* **Syntax autocompletion**. Automatically suggests query syntax, operators, and functions to reduce errors and speed up query creation.
* **Key-value pair support**. Offers suggestions for structured logs, such as JSON, recognizing keys and values to create more precise queries.
* **Next-operator prediction**. Anticipates and suggests the next logical operator based on the current query context, reducing steps.
* **Revamped log assist UI**. Highlights syntax errors and suggests fixes in real-time for a smoother user experience.
* **Facet determination for JSON logs**. Automatically identifies facets (e.g., timestamp, status) from JSON logs to help refine searches.
* **Context-aware querying**. The **Context Store** tracks past queries and operator usage, powering the **Next Clause Predictor** for smarter suggestions.
* **Operator usage cache**. Stores operator usage history, providing more accurate predictions for the next clause or operator.


## How to use Intellisense

### 1. Open a Log Search

To start a new log search:

From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), go to the Sumo Logic home dashboard and select **Log Search**.

From the [**New UI**](/docs/get-started/sumo-logic-ui), go to the left nav and click **Logs** > **Log Search**.  

### 2. Use Syntax autocompletion

1. Clicking in the empty query field to generate a list of suggested metadata field entries to start your search.<br/><img src={useBaseUrl('img/search/intellisense/more-information.png')} alt="more-information.png" style={{border: '1px solid gray'}} />
1. Type a search operator like `parse` to begin a query clause, and Intellisense will suggest options. Refer to the [Search Operator](/docs/search/search-query-language/search-operators) guide for syntax and examples.
1. Use your keyboard's **arrow keys** or cursor to scroll through the suggestions. Press **Enter** or click to select an entry.
1. Depending on the search operators you're including, you may need to use pipes (`|`) to separate query segments. For example, the `where` operator must be separated from other operators by the pipe symbol (`|`).

:::tip
To learn more about a suggestion before adding it to your query, click the "i" icon. This shows you more information, such as the field type (e.g., metadata, keyword), definition, examples, and/or link to doc.<br/><img src={useBaseUrl('img/search/intellisense/initial-prompts.png')} alt="initial-prompts.png" style={{border: '1px solid gray'}} />
:::

### 3. Key-value pair support

1. For JSON or structured logs, type a key (e.g., `status`). Select the suggested facet (e.g., `timestamp`) for more precise filtering.
1. Intellisense will suggest keys and values. Select the appropriate one using **Enter**.

### 4. Next-operator prediction

1. Add a filtering clause like `where status="error"` and group results using `group by`.
1. Intellisense will predict and suggest the next operator (e.g., `group by`, `where`). Use **arrow keys** or click to select.

### 5. Revamped log assist UI

1. As you write, the UI will highlight syntax issues. Hover over the underlined errors for suggested fixes.
1. The side panel provides query-building tutorials and examples for additional support.

### 6. Facet determination for JSON logs

1. When querying for JSON-formatted logs, Intellisense will suggest facets like `status` or `timestamp`.
1. Click the facet to refine your query.

By following these steps, you can take full advantage of Intellisense to accelerate query writing and improve search efficiency.


## Leverage Copilot AI

In a hurry to complete your investigation? Need help writing queries?

Try [Sumo Logic Copilot](/docs/search/copilot), our AI-powered assistant that lets you enter natural questions in plain English and auto-generate queries - no need to write them manually. It guides you through query building step-by-step with AI-driven suggestions to refine your results. Because all your observability and security source records are in Sumo Logic, Copilot helps discover related datasets.
