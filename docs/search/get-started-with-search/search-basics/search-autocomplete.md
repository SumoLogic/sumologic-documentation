---
id: search-autocomplete
title: Search Autocomplete
description: Search autocomplete offers real-time syntax suggestions, schema-based field prompts, and predictive completions to reduce the complexity of Sumo Logic's query language as you type.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Search autocomplete enhances the query-building experience in Sumo Logic by providing real-time syntax suggestions, schema prompts, and partial query predictions on the **Search** page. These suggestions simplify query writing for users at all skill levels, making it easier to discover relevant fields, minimize errors, and write accurate, efficient queries. Suggestions comply with your [role-based access control](/docs/manage/users-roles/) restrictions.

Search autocomplete is also supported in [Dashboards](/docs/dashboards), [Scheduled Searches](/docs/alerts/scheduled-searches), and on the **Manage > Users** page in the **New Role** dialog's **Query String** section.

## How to get started

1. **Start a log search**. From the [**New UI**](/docs/get-started/sumo-logic-ui) or the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), go to **Log Search** and begin typing your query.
1. **Leverage syntax and schema suggestions**. As you type, watch for real-time suggestions for fields and operators. Use the arrow keys to navigate suggestions and press `Tab` to select a highlighted suggestion.
1. **Take advantage of predictions**. Use partial query predictions to build queries faster and more accurately.
1. **Review and correct errors**. Address flagged errors before running your query to ensure it executes as intended.
1. **Edit queries with Mobot**. If you're using [Mobot](/docs/search/mobot), modify your query directly in the [code editor field](/docs/search/mobot/#edit-query-code) and use autocomplete suggestions there for further refinement.

## Features

### Token-by-token prediction and autocomplete

Get real-time suggestions for query completion as you type, with token-by-token predictions that help you quickly finish your queries.

<img src={useBaseUrl('img/search/get-started-search/token-by-token-prediction-and-autocomplete.png')} style={{border: '1px solid gray'}} alt="Token by token prediction and autocomplete" width="400"/>

* **Operator suggestions**. When typing the first letters of an operator, the system displays all matching operators related to those letters, helping you quickly find and select the appropriate one. For example, typing `co` might suggest `count`, `count_distinct`, `count_frequent`, `compare`, `compose`, or other related operators.
* **Metadata key-value suggestions**. When you start typing a source expression (for example, `_sourceCategory=`), you are provided with relevant metadata key options to help autocomplete your query. Once you select a key, it displays the available values for that metadata. This includes built-in metadata fields as well as custom fields configured in your system.
* **Clause suggestions**. When you start typing an operator, you are provided with the entire clause to complete the remaining portion. Clause suggestions are currently restricted to the `where`, `count`, `min`, `max`, `count_distinct`, `avg`, `first`, `last`, `stddev`, `sum`, `if`, `sort`, `limit`, `timeslice`, and `fields` operators.

Press the `Tab` key to accept a suggestion.

### Schema discovery and field suggestions

Automatically receive suggestions for relevant [Sumo Logic fields](/docs/manage/fields) in structured data like JSON logs, making field discovery much easier. It also offers the names of Collectors, Sources, and Partitions, which are automatically configured in your system when you create them.

<img src={useBaseUrl('img/search/get-started-search/schema-discovery-and-field-suggestion.png')} style={{border: '1px solid gray'}} alt="Schema discovery and field suggestion" width="400"/>

* **Field suggestions**. For structured logs, the system automatically suggests relevant fields such as `userID`, `eventType`, or `timestamp` as you type. This eliminates the need for manual inspection of logs, making it easier to filter and aggregate data.
* **Inline suggestions**. An inline suggestion is a real-time, context-aware recommendation within the search editor. By default, the first item in the dropdown is treated as an inline suggestion, but you can use the keyboard to navigate other suggestions, which are also shown inline. Press `Tab` to apply an inline suggestion.

### Next operator prediction

The system intelligently predicts the next search operator or offers partial query suggestions based on your input, reducing manual effort. For example, typing a query such as `source=logs | where status="error"` prompts suggestions like `count by employeeID` or other common fields, aligning your query with standard patterns.

### Contextual autocomplete and field discovery

Suggestions are ranked based on your organization's common queries, making query completion smarter and more relevant. This ensures that autocomplete options are not only relevant but also contextually accurate, speeding up the query-writing process. If no suggestions appear, this could be because there is no relevant data available to offer a contextual suggestion.

### Typo detection and links

As you type, search autocomplete underlines possible typos in your query and suggests corrections, and colorizes parts of your query for easier detection. Suggestions also link to documentation for search operators and other Sumo Logic features — click the info icon tooltip to open the page for that topic.

## Settings

### Enable or disable search autocomplete

By default, search autocomplete is enabled.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select the person silhouette icon <img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences" style={{border: '1px solid gray'}} width="25"/> and then **Preferences**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**.
1. Access your [Preferences](/docs/get-started/account-settings-preferences/#my-preferences).
1. Under **My Preferences**, go to the **Log Search** section and check or uncheck **Show search autocomplete suggestions while typing** to turn suggestions on or off.<br/><img src={useBaseUrl('img/get-started/search-autocomplete.png')} alt="Log Search preferences with the Show search autocomplete suggestions while typing checkbox"style={{border: '1px solid gray'}} width="700"/>

### Typeahead suggestions

Under **My Preferences** > **Query Editing**, you can control how `Return` and `Shift + Return` behave while typing a query. By default, `Return` runs the query and `Shift + Return` adds a line break. Switch to the alternate option to use `Command + Return` to run the query and `Return` to add a line break instead. `Tab` always selects the highlighted suggestion regardless of which option you choose.

<img src={useBaseUrl('img/get-started/query-editing-pref.png')} alt="Query Editing Preferences" style={{border: '1px solid gray'}} width="600"/>

## Limitations

* Suggestions are predictive in nature and may not be comprehensive or completely accurate in every circumstance.
* Search autocomplete does not suggest all available Sumo Logic keywords, metadata terms, and search operators. For full details on what is supported, see [Search Operators](/docs/search/search-query-language/group-aggregate-operators).
* Search autocomplete does not show Field Extraction Rules or values from HTTP headers.

## Related AI-assisted search features

Search autocomplete is a passive, built-in part of the query text box; it isn't presented as a standalone named feature in the UI. Don't confuse it with:

* [AI Parse Assist](/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor#ai-parse-assist). A UI action you trigger from the right-click menu on selected log text to generate a `parse` statement.
* [Mobot](/docs/search/mobot). A conversational assistant that writes and runs entire queries from a plain-language question, rather than suggesting completions as you type.

:::note
This capability shipped in release notes as **Logs Query Assist** (Preview, November 2024) and **Query Assist** (GA, July 2025). It's documented here as Search Autocomplete to match the terminology used in the product UI.
:::
