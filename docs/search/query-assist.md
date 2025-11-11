---
id: query-assist
title: Logs Query Assist
description: Logs Query Assist improvements reduce the complexity of Sumo Logic’s query language, making it easier to discover relevant fields, minimize errors, and benefit from intelligent query-building assistance.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Query Assist enhances the query-building experience in Sumo Logic by providing real-time syntax suggestions, schema prompts, and partial query predictions. These enhancements simplify the process for users at all skill levels, making it easier to write accurate and efficient queries, enabling easier discovery of relevant fields, minimizing errors, and providing intelligent assistance for query creation. The suggestions that appear comply with the user's role-based access restrictions.

:::note
By default, Query Assist will be enabled in the **Preferences** page. If it is not enabled, you can turn it on from the [Preferences page](#turn-off-autocomplete), or simply press **Control + Space** to activate it manually.
:::

:::info
Logs Query Assist is also supported in [Dashboards](/docs/dashboards) and [Scheduled Searches](/docs/alerts/scheduled-searches).
:::

<img src={useBaseUrl('img/search/get-started-search/query-assist-preview1.gif')} alt="query assist demo gif" style={{border: '1px solid gray'}} width="700"/>

## Key enhancements

* **Simplified learning curve**. Receive syntax suggestions and schema prompts to write queries without extensive knowledge of query syntax.
* **Enhanced autocomplete**. Benefit from context-aware suggestions to improve accuracy and efficiency, adapting to your queries and organizational patterns.
* **Streamlined field discovery**. Automatically receive suggestions for relevant fields, especially in structured data like JSON, reducing the need for manual searches.

## How to get started

1. **Start a log search**. From the [**New UI**](/docs/get-started/sumo-logic-ui) or the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), go to **Log Search** and begin typing your query.
2. **Leverage syntax and schema suggestions**. As you type, watch for real-time suggestions for fields and operators. Use the arrow keys to navigate suggestions and press `Tab` to autocomplete.
3. **Take advantage of predictions**. Use partial query predictions to build queries faster and more accurately.
4. **Review and correct errors**. Address flagged errors before running your query to ensure it executes as intended.  
5. **Edit queries with Mobot**. If you’re using Mobot, modify your query directly in the [code editor field](/docs/search/mobot/#edit-query-code) and utilize autocomplete suggestions for further refinement.

## Features

### Token-by-token prediction and autocomplete

Get real-time suggestions for query completion as you type, with token-by-token predictions that help you quickly finish your queries.

<img src={useBaseUrl('img/search/get-started-search/token-by-token-prediction-and-autocomplete.png')} style={{border: '1px solid gray'}} alt="token-by-token-prediction-and-autocomplete" width="400"/>

* **Operator suggestions**. When typing the first letters of an operator, the system displays all matching operators related to those letters, helping you quickly find and select the appropriate one. For example, typing `co` might suggest `count`, `count_distinct`, `count_frequent`, `compare`, `compose`, or other related operators.
* **Metadata Key-Value suggestions**. When you start typing a source expression (for example, `_sourceCategory=`), you will be provided with relevant metadata keys options to help autocomplete your query. And once you select a particular key, it displays the available values for the selected metadata. This not only displays the built-in metadata fields but also discovers the custom fields configured in your system.
* **Clause Suggestions**. When you start typing the operators, you will be provided with the entire clause to complete the remaining portion of the clause. Clause suggestions are currently restricted to the `where`, `count`, `min`, `max`, `count_distinct`, `avg`, `first`, `last`, `stddev`, `sum`, `if`, `sort`, `limit`, `timeslice`, and `fields` operators.

For example, as you start typing, the system provides relevant metadata options and autocompletes your query. Simply press the `Tab` key to accept a suggestion.  

### Schema discovery and field suggestions

Automatically receive suggestions for relevant [fields](/docs/manage/fields) in structured data like JSON logs, making field discovery much easier.

<img src={useBaseUrl('img/search/get-started-search/schema-discovery-and-field-suggestion.png')} style={{border: '1px solid gray'}} alt="schema-discovery-and-field-suggestion" width="400"/>

* **Field suggestions**. For structured logs, the system automatically suggests relevant fields such as `userID`, `eventType`, or `timestamp` as you type. This eliminates the need for manual inspection of logs, making it easier to filter and aggregate data.
* **Inline suggestions**. An inline suggestion is a real-time, context-aware recommendation within the search editor. By default, the first item in the dropdown is treated as an inline suggestion, but you can use the keyboard navigations to explore other suggestions, which will be shown inline. To apply an inline suggestion, press the Tab key.

### Next operator prediction

The system intelligently predicts the next search operator or offers partial query suggestions based on your input, reducing manual effort.

* **Operator predictions**. When you type a query such as `source=logs | where status="error"`, the system predicts the next operator and offers suggestions like `count by employeeID` or other common fields, aligning your queries with standard patterns.

### Contextual autocomplete and field discovery

Suggestions are ranked based on your organization’s common queries, making query completion smarter and more relevant.

* **Contextual suggestions**. The system ranks suggestions based on common queries from your organization or your own previous queries. This ensures that your autocomplete options are not only relevant but also contextually accurate, speeding up the query-writing process. However, if you occasionally find that no suggestions appear, this could be because there is no relevant data available to offer a contextual suggestion.

## Limitations

Suggestions are predictive in nature and may not be comprehensive or completely accurate in every circumstance.

<!-- hold off
### Need more help?
Try [Sumo Logic Mobot](/docs/search/mobot), our AI-powered assistant that helps you write and execute natural language log search queries.
Copilot with Query Assist video: https://docs.google.com/presentation/d/1HCaXROM6zrnapLaLo3gDm-S1uQPGAS0p9AquuLwiFXA/edit#slide=id.g3145b7936cd_0_8 -->

## Turn off autocomplete

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the top menu, select the person silhouette icon and then **Preferences**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select your username and then **Preferences**. <br/><img src={useBaseUrl('img/get-started/acct-pref.png')} alt="Account Preferences"style={{border: '1px solid gray'}}  width="300"/>
1. Access your [Preferences](/docs/get-started/account-settings-preferences/#my-preferences).
1. Navigate to **My Preferences** and uncheck the **Show search autocomplete suggestions while typing** checkbox.<br/><img src={useBaseUrl('img/get-started/turn-off_autocomplete.png')} alt="turn-off_autocomplete"style={{border: '1px solid gray'}}  width="500"/>

## Feedback

We value your input on Query Assist! Share your thoughts on its usability, relevance, accuracy, user experience, and the ranking of suggestions (syntax, schema, single phrase).

Follow the below steps to provide your feedback:

1. Enter the query typehead to view the suggestions dropdown.
1. Press the thumbs up or down button to share your feedback.<br/><img src={useBaseUrl('img/search/get-started-search/query-suggestion-feedback.png')} alt="query-suggestion-feedback" style={{border: '1px solid gray'}} width="400"/>
1. When you press thumbs down, provide additional feedback in the dialog box.
1. Select the **Include query string and provided suggestions in the feedback automatically** checkbox.
1. Click **Submit**.<br/><img src={useBaseUrl('img/search/get-started-search/query-suggestion-thumbs-down-feedback.png')} alt="query-suggestion-thumbs-down-feedback" style={{border: '1px solid gray'}} width="400"/>

<!--
Phased Availability:

* **Phase 1**. Token-by-token prediction, metadata autocomplete, and basic schema suggestions.
* **Phase 2**. Enhanced operator predictions, full query suggestions, and advanced schema discovery.
* **Phase 3**. Real-time error feedback, more contextual suggestions, and query pattern-based improvements.
-->
