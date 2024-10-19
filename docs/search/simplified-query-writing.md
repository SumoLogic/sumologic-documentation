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

This feature is in beta, with select features available for early access. Full general availability is expected by the end of the year. To participate, contact your Sumo Logic account executive.

Our new simplified query writing enhancements provide a frictionless experience with real-time syntax suggestions, schema suggestions, and partial/full query predictions. These features simplify the query-building process, helping both novice and advanced users write accurate, efficient queries.

By incorporating user feedback, we’ve implemented improvements to reduce the complexity of Sumo Logic’s query language, making it easier to discover relevant fields, minimize errors, and benefit from intelligent query-building assistance.

## Key enhancements made to the query-building experience

* **Improved learning curve**. We’ve simplified learning and using Sumo Logic queries. The new syntax suggestions and schema-based prompts allow you to write queries faster with less need for deep familiarity with the syntax.
* **Enhanced auto-complete**. The auto-complete function has been optimized to provide more relevant, context-based suggestions that align with your queries and organizational patterns, improving accuracy and efficiency.
* **Streamlined field discovery**. No need to manually search for fields within your logs. The system automatically suggests key fields, especially for structured data like JSON, making it easier to navigate complex data and build accurate queries.


## Token-by-token prediction and auto-complete

Get real-time suggestions for query completion as you type, with token-by-token predictions helping to quickly finish your queries.

As you start typing a query, such as `_sourceCategory=`, the system provides **token-by-token predictions** and auto-completes your query with relevant metadata options. Simply use the `Tab` key to accept the suggestion. For example, after typing `status=`, you will be prompted with likely values such as `success`, `error`, or other status codes based on your previous queries or log data.

## Schema discovery and field suggestions

Automatically receive suggestions for relevant fields in structured data like JSON logs, making field discovery much easier.

For structured logs like JSON, the system automatically suggests relevant fields such as `userID`, `eventType`, or `timestamp` as you type. This eliminates the need for manual inspection of logs, making it easier to filter and aggregate data.

## Next operator and full query predictions

The system intelligently predicts the next operator or offers full query suggestions based on your input, reducing manual effort.

When you type a query such as `source=logs | where status="error"`, the system predicts the **next operator** and offers suggestions like `count by employeeID` or other common fields. This minimizes manual input and ensures your queries are accurate and aligned with standard query patterns.

## Real-time error highlighting and feedback

Errors are flagged as you type, with immediate suggestions for corrections, ensuring a seamless query-writing experience.

As you write queries, the system highlights any syntax errors in real-time. For example, if you forget to close parentheses or misspell an operator, the system will flag it and provide suggestions to fix the issue immediately, preventing unnecessary troubleshooting.

## Contextual auto-complete and field discovery

Suggestions are ranked based on your organization’s common queries, making query completion smarter and more relevant.

The system ranks suggestions based on common queries from your organization or your own previous queries. This ensures that your auto-complete options are not only relevant but also contextually accurate, speeding up the query-writing process.

## How to get started

1. **Start a log search**. From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic) or the [**New UI**](/docs/get-started/sumo-logic-ui), go to **Log Search** to start crafting your query.
2. **Leverage syntax and schema suggestions**. As you type, the system will offer real-time suggestions for fields and operators. Select options using your arrow keys and press `Tab` to auto-complete.
3. **Use partial and full query predictions**. Take advantage of the system’s predictions to build queries faster and more accurately.
4. **Review and correct errors**. As you write your query, watch for real-time error highlighting and corrections before running the query.

### Need more help?

Try [Sumo Logic Copilot](/docs/search/copilot), our AI-powered assistant that helps you write queries in plain English and auto-generates them for you.

<!--
These features will be available in phases:

* **Phase 1**. Token-by-token prediction, metadata auto-complete, and basic schema suggestions.
* **Phase 2**. Enhanced operator predictions, full query suggestions, and advanced schema discovery.
* **Phase 3**. Real-time error feedback, more contextual suggestions, and query pattern-based improvements.
-->
