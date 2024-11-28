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
This is a Preview release. [Register here](https://docs.google.com/forms/d/e/1FAIpQLSdtmzRn1NyAdk1rXGZrJrpQQwR2i9FKOYd3uKLwEzrkZGVrwQ/viewform). To learn more, contact your Sumo Logic account executive.
:::

Query Assist enhances the query-building experience in Sumo Logic by providing real-time syntax suggestions, schema prompts, and partial query predictions. These enhancements simplify the process for users at all skill levels, making it easier to write accurate and efficient queries, enabling easier discovery of relevant fields, minimizing errors, and providing intelligent assistance for query creation.

<img src={useBaseUrl('img/search/get-started-search/query-assist-preview1.gif')} alt="query assist demo gif" width="700"/>

## Key enhancements

* **Simplified learning curve**. Receive syntax suggestions and schema prompts to write queries without extensive knowledge of query syntax.
* **Enhanced autocomplete**. Benefit from context-aware suggestions improve accuracy and efficiency, adapting to your queries and organizational patterns.
* **Streamlined field discovery**. Automatically receive suggestions for relevant fields, especially in structured data like JSON, reducing the need for manual searches.

## How to get started

1. **Start a log search**. From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic) or the [**New UI**](/docs/get-started/sumo-logic-ui), go to **Log Search** and begin typing your query.
2. **Leverage syntax and schema suggestions**. As you type, watch for real-time suggestions for fields and operators. Use the arrow keys to navigate suggestions and press `Tab` to autocomplete.
3. **Take advantage of predictions**. Use partial query predictions to build queries faster and more accurately.
4. **Review and correct errors**. Address flagged errors before running your query to ensure it executes as intended.  
5. **Edit queries with the Copilot**. If you’re using Copilot, modify your query directly in the [code editor field](/docs/search/copilot/#edit-query-code) and utilize autocomplete suggestions for further refinement.

## Features

### Token-by-token prediction and autocomplete

Get real-time suggestions for query completion as you type, with token-by-token predictions that help you quickly finish your queries. For example, as you start typing `_sourceCategory=`, the system provides relevant metadata options and autocompletes your query. Simply press the `Tab` key to accept a suggestion.  

* **Operator suggestions**. When typing the first letters of an operator, the system displays all matching operators related to those letters, helping you quickly find and select the appropriate one. For example, typing `st` might suggest `status`, `startsWith`, or other related operators.
* **Value suggestions**. After typing `status=`, you will be prompted with likely values such as `success`, `error`, or other status codes based on your previous queries or log data.

### Schema discovery and field suggestions

Automatically receive suggestions for relevant fields in structured data like JSON logs, making field discovery much easier.

* **Field suggestions**. For structured logs, the system automatically suggests relevant fields such as `userID`, `eventType`, or `timestamp` as you type. This eliminates the need for manual inspection of logs, making it easier to filter and aggregate data.

### Next operator prediction

The system intelligently predicts the next search operator or offers partial query suggestions based on your input, reducing manual effort.

* **Operator predictions**. When you type a query such as `source=logs | where status="error"`, the system predicts the next operator and offers suggestions like `count by employeeID` or other common fields, aligning your queries with standard patterns.

### Real-time error highlighting and feedback

Errors are flagged as you type, with immediate suggestions for corrections, ensuring a seamless query-writing experience.

* **Error detection**. As you write queries, the system highlights syntax errors in real-time, such as unclosed parentheses or misspelled operators, and provides instant suggestions to fix the issue, preventing unnecessary troubleshooting.

### Contextual autocomplete and field discovery

Suggestions are ranked based on your organization’s common queries, making query completion smarter and more relevant.

* **Contextual suggestions**. The system ranks suggestions based on common queries from your organization or your own previous queries. This ensures that your autocomplete options are not only relevant but also contextually accurate, speeding up the query-writing process.

<!-- hold off
### Need more help?
Try [Sumo Logic Copilot](/docs/search/copilot), our AI-powered assistant that helps you write and execute natural language log search queries.
Copilot with Query Assist video: https://docs.google.com/presentation/d/1HCaXROM6zrnapLaLo3gDm-S1uQPGAS0p9AquuLwiFXA/edit#slide=id.g3145b7936cd_0_8 -->

## Feedback

We value your input on Query Assist! Share your thoughts on its usability, relevance, accuracy, user experience, and the ranking of suggestions (syntax, schema, single phrase).

:::note
Query Assist is a working name. Final naming and branding may change before release. All feature updates and release dates are subject to change.
:::

<!--
Phased Availability:

* **Phase 1**. Token-by-token prediction, metadata autocomplete, and basic schema suggestions.
* **Phase 2**. Enhanced operator predictions, full query suggestions, and advanced schema discovery.
* **Phase 3**. Real-time error feedback, more contextual suggestions, and query pattern-based improvements.
-->
