---
id: query-assist
title: Logs Query Assist - Preview
description: Logs Query Assist improvements reduce the complexity of Sumo Logic’s query language, making it easier to discover relevant fields, minimize errors, and benefit from intelligent query-building assistance.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

:::sumo Preview release
This is a Preview release. To learn more, contact your Sumo Logic account executive. [Register here](https://docs.google.com/forms/d/e/1FAIpQLSdtmzRn1NyAdk1rXGZrJrpQQwR2i9FKOYd3uKLwEzrkZGVrwQ/viewform).
:::

Query Assist simplifies query-building in Sumo Logic by offering real-time syntax suggestions, schema prompts, and partial/full query predictions. These enhancements streamline the process for users at all skill levels, making it easier to write accurate and efficient queries.

This feature reduces the complexity of query building, enabling easier discovery of relevant fields, minimizing errors, and providing intelligent assistance for query creation.

<img src={useBaseUrl('img/search/get-started-search/query-assist-preview1.gif')} alt="query assist demo gif" width="700"/>

## Key enhancements

* **Simplified learning curve**. Syntax suggestions and schema prompts make it easy to write queries without extensive knowledge of query syntax.
* **Enhanced auto-complete**. Context-aware suggestions improve accuracy and efficiency, adapting to your queries and organizational patterns.
* **Streamlined field discovery**. Relevant fields are automatically suggested, especially for structured data like JSON, eliminating manual searching.

## How to get started

1. **Start a log search**. From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic) or the [**New UI**](/docs/get-started/sumo-logic-ui), go to **Log Search** to start typing your query.
2. **Leverage syntax and schema suggestions**. As you type, watch for real-time suggestions for fields and operators. Select options using your arrow keys and press `Tab` to auto-complete.
3. **Take advantage of predictions**. Use partial and full query predictions to build queries faster and more accurately.
4. **Review and correct errors**. Correct flagged errors before running your query.

## Features

## Token-by-token prediction and auto-complete

Get real-time suggestions for query completion as you type, with token-by-token predictions helping to quickly finish your queries.

As you start typing a query, such as `_sourceCategory=`, the system provides **token-by-token predictions** and auto-completes your query with relevant metadata options. Simply use the `Tab` key to accept the suggestion. For example, after typing `status=`, you will be prompted with likely values such as `success`, `error`, or other status codes based on your previous queries or log data.

## Schema discovery and field suggestions

Automatically receive suggestions for relevant fields in structured data like JSON logs, making field discovery much easier.

For structured logs like JSON, the system automatically suggests relevant fields such as `userID`, `eventType`, or `timestamp` as you type. This eliminates the need for manual inspection of logs, making it easier to filter and aggregate data.

## Next operator prediction

The system intelligently predicts the next operator or offers full query suggestions based on your input, reducing manual effort.

When you type a query such as `source=logs | where status="error"`, the system predicts the **next operator** and offers suggestions like `count by employeeID` or other common fields. This minimizes manual input and ensures your queries are accurate and aligned with standard query patterns.

## Real-time error highlighting and feedback

Errors are flagged as you type, with immediate suggestions for corrections, ensuring a seamless query-writing experience.

As you write queries, the system highlights any syntax errors in real-time. For example, if you forget to close parentheses or misspell an operator, the system will flag it and provide suggestions to fix the issue immediately, preventing unnecessary troubleshooting.

## Contextual auto-complete and field discovery

Suggestions are ranked based on your organization’s common queries, making query completion smarter and more relevant.

The system ranks suggestions based on common queries from your organization or your own previous queries. This ensures that your auto-complete options are not only relevant but also contextually accurate, speeding up the query-writing process.


### Need more help?

Try [Sumo Logic Copilot](/docs/search/copilot), our AI-powered assistant that helps you write and execute natural language log search queries.

## Feedback

We want your input on Query Assist! Share your thoughts on its usage, relevance, accuracy, UX, and suggestions ranking (syntax, schema, single phrase).

:::note
Query Assist is a working name. Final naming and branding may change before release. All feature updates and release dates are subject to change.
:::

<!--
Phased Availability:

* **Phase 1**. Token-by-token prediction, metadata auto-complete, and basic schema suggestions.
* **Phase 2**. Enhanced operator predictions, full query suggestions, and advanced schema discovery.
* **Phase 3**. Real-time error feedback, more contextual suggestions, and query pattern-based improvements.
-->
