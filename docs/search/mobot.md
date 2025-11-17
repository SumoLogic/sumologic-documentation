---
id: mobot
title: Sumo Logic Mobot
sidebar_label: Mobot 🤖
# Edit description to include QA and KA
description: Streamline your log analysis with Sumo Logic Mobot, our AI-based assistant designed to simplify log analysis by allowing you to ask questions in plain English and providing search suggestions without the need to write log queries.
keywords:
  - copilot
  - mobot
  - artificial intelligence
  - ai
  - machine learning
  - ml
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Mobot (formerly *Copilot*) is our AI-powered assistant that accelerates investigations and troubleshooting in logs by allowing you to ask questions in plain English and get contextual suggestions, helping first responders get to answers faster.


## What is Mobot?

Mobot accelerates troubleshooting and incident response by combining natural language queries with contextual insights. With fast response times and high translation accuracy, Mobot helps users of all skill levels work more efficiently across supported log sources.

Mobot is your conversational interface for Sumo Logic. You interact with it the same way you would with a chat assistant. Ask a question in plain English, refine it with follow-ups, adjust filters or time ranges, and see updated queries and visualizations without starting over. Mobot keeps track of your intent, maintains conversation context, and surfaces helpful suggestions to guide your investigation.

Mobot automatically generates log searches from natural language prompts and helps you investigate performance issues, anomalies, and security threats. It provides step-by-step refinements using AI-derived suggestions to help you reach faster and more accurate resolutions.

It connects you to two specialized agents that handle different tasks:

* **Query Agent** translates your natural-language questions into log search queries and helps you refine them step by step.
* **Knowledge Agent** answers how-to questions about Sumo Logic - anything from setup, troubleshooting, best practices, and more - and get answers sourced from our official documentation.

Together, these agents help you troubleshoot faster, explore your data more intuitively, and learn the platform without friction.

### Key capabilities

* **Natural language queries**. Ask questions in plain English and get accurate Sumo Query Language translations.
* **Contextual suggestions**. Get suggestions relevant to your troubleshooting and investigations context.
* **Conversation history**. Save and resume troubleshooting or investigation sessions without losing context.
* **Auto-visualize**. Mobot automatically generates charts from search results, which you can add directly to dashboards, reducing time and effort in data interpretation.
* **Log compatibility**. Mobot supports structured logs, semi-structured logs (partial JSON), and unstructured logs (e.g., Palo Alto Firewall) when Field Extraction Rules (FERs) are applied. This ensures valuable insights across a variety of log formats.
* **Enhanced query experience**. Auto-complete to streamline natural language queries.
* **Multi-turn conversations**. Ask follow-up questions without repeating yourself.
* **Conversational flow**. Refine queries through natural, conversational follow-up questions without losing context. A sequence of related instructions that retains context and incrementally updates the query and output.
* **Automatic source detection**. Have Mobot choose a data source automatically based on your question or enter one yourself.
* **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
* **Clarifications when needed**. If your request is ambiguous, Mobot may ask a follow-up question to narrow intent.
* **Smarter error handling**. Instead of generic errors, Mobot provides clearer messages and fallback suggestions for next steps.
* **Dashboard-aware translations (via Retrieval-Augmented Generation, or RAG)**. Mobot leverages queries from dashboards opened in your org in the last 90 days to better understand intent.
* **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
* **Integrated workflow**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

### Who benefits from Mobot?

Mobot is ideal for users of all skill levels:

* **On-call engineers**. Accelerate time to resolution by surfacing key troubleshooting insights.
* **Security engineers**. Obtain security insights rapidly for faster security incident resolution.
* **Early career professionals**. Simplifies troubleshooting with natural language queries, making incident resolution accessible to those unfamiliar with query syntax.
* **Practitioners**. Speeds up workflows with auto-complete and context-aware suggestions for frequent tasks.
* **Experts**. Provides IDE-style assistance for crafting complex queries efficiently.

## Which agent should I use?

Not sure where to start? Use this guide:

|      | Query Agent | Knowledge Agent |
|:-----|:------------|:----------------|
| **Purpose** | Create and refine log queries | Learn platform features |
| **Input** | Data questions and analysis requests | How-to and configuration questions |
| **Output** | Executable queries with live results | Documentation-based answers with links |
| **Best for** | Troubleshooting, investigating, analyzing trends | Onboarding, setup guidance, learning concepts |
| **Example** | "Show me 500 errors from the API service in the last hour" | "How do I set up a CloudTrail collector?" |



## Query agent

Select **Query Agent** to get help with Sumo Logic log search queries. In this section, you'll learn how to use Query Agent effectively, along with best practices to maximize its benefits.

<img src={useBaseUrl('img/search/mobot/query-agent-select.png')} alt="Query Agent button selected in the Mobot UI" style={{border: '1px solid gray'}} width="600" />

Query Agent builds on the query translation foundation of the previous [Copilot experience](/docs/search/mobot), with significant improvements:

* Core improvements:
   * **Conversational flow**. Refine queries through natural follow-up questions without losing context. Each refinement builds on the last, so you can iterate toward the insight you need.
   * **Improved accuracy**. Translations to Sumo Query Language are more reliable, especially for data sources with active dashboards.
   * **Smarter error handling**. Instead of generic errors, Query Agent provides clear messages and actionable suggestions for next steps.
* Advanced features:
   * **Dashboard-aware translations via RAG**. Query Agent learns from dashboards opened in your org in the last 90 days to better interpret intent. This improves understanding of field names, data structure, and common queries, resulting in more accurate translations, especially for unstructured logs.
   * **Automatic source detection**. Let Query Agent choose a data source based on your question, or enter one yourself for more control.
   * **Clarifications when needed**. If your request is ambiguous, Query Agent asks follow-up questions to narrow intent rather than guessing.
* Enhanced workflow:
   * **Guided exploration**. Intent cards summarize your current goal, and suggestion cards offer refinements you can apply with a click.
   * **Integrated interface**. A conversation pane shows your prompts and refinements, with queries rendered directly in the editor, live results, and the ability to branch or revisit past conversations.

### Micro lesson

:::sumo Micro Lesson

This short video introduces Query Agent and how it can help you with log search and analysis—perfect for getting a quick overview before diving in.

<Iframe url="https://fast.wistia.net/embed/iframe/1gtkce8ayl?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Mobot and Query Agent: A Conceptual Overview"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::


### Example workflow: Observability

The steps below outline a typical conversational interaction pattern. You can apply the same approach to different logs, events, or dimensions. This type of investigation typically only takes a few minutes.

Open Mobot:
From the [**New UI**](/docs/get-started/sumo-logic-ui), click **Mobot** in the left nav.
From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), click the **Mobot** tab.

Use natural language to ask what you're looking for. You can start broad when you set a goal, or more specific (i.e., specifying the data source and any related fields or values).

If you don't select a source, Mobot chooses one automatically based on your question. You can override it by typing the source name directly in your prompt (as demonstrated below) or by choosing it from the **Auto Source Selection** dropdown.

For example, enter a broad question: `Show me Bedrock errors`.

An intent card appears in the conversation pane summarizing your goal. Mobot then surfaces suggestion cards with related refinements, which you can click. You'll also see an option to open your query in Log Search.

#### Ask your initial question  

Use natural language to ask what you're looking for. For better results, include the name of the data source you're querying and any related fields or values. If you don't select a source, Query Agent chooses one automatically based on your question. You can override it by typing the source name directly or choosing from the **Auto Source Selection** dropdown.

For example, if you enter a broad question like "Show me AWS CloudTrail errors", your query will translate to Sumo Logic query language (something like `(_source="AWS CloudTrail") "error"`) and an intent card appears in the conversation pane summarizing your goal. Query Agent then surfaces suggestion cards with related refinements you can click. You'll also see an option to open your query in Log Search.

#### Narrow the scope

After you click a follow-up suggestion or type a refinement, Query Agent refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Query Agent adjusts the query, applies the changes, and renders a visual chart.

For example, clicking a suggestion like "Show me trend of errors each minute" would apply a timeslice to group the results over time.

#### Drill into causes

As you go, Query Agent presents new suggestions to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces. The intent card expands each time to include the new scope, and results show additional details.

For example, you could refine further by clicking a suggestion like "Show the count of error logs per minute, grouped by error code".

#### Request a trend over time

If you type a time period, Query Agent would apply a timeslice to group results over time. For example, if you type "Show the trend over 24 hours", results would be divided into 1-hour buckets.

#### Next steps

In just a few conversational turns, we went from a broad question to a detailed analysis showing error trends grouped by error code over time.

From here, you can continue refining or explore different angles like [switching the chart type](/docs/search/mobot/#chart-type), [opening the query in Log Search](/docs/search/mobot/#step-4-open-in-log-search), [adjusting the time range](/docs/search/mobot/#time-range), [editing the query logic](/docs/search/mobot/#edit-query-code), or [starting over with a new chat](/docs/search/mobot/#new-conversation).




### Example workflow: Security investigation

The steps below outline a typical conversational interaction pattern for investigating a security incident. You can apply the same approach to different security scenarios.

#### Step 1: Ask your initial question  

Use natural language to ask what you're looking for. For better results, include the name of the data source you're querying and any related fields or values. If you don't select a source, Query Agent chooses one automatically based on your question.

For example, if you enter "Show me recent user-service logs", Query Agent selects the correct source category and returns recent events. An intent card appears in the conversation pane summarizing your goal. Query Agent then surfaces suggestion cards with related refinements you can click.

#### Step 2: Identify patterns

After you click a follow-up suggestion or type a refinement, Query Agent refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Query Agent adjusts the query, applies the changes, and renders a visual chart.

For example, asking "What's the request volume by service?" would aggregate traffic by service. Query Agent might surface that user-service has 3× higher requests than baseline, while other services remain healthy—suggesting a traffic surge on one service.

#### Step 3: Analyze geographic distribution

As you go, Query Agent presents new suggestions to help you pivot into related questions. The intent card expands each time to include the new scope, and results show additional details.

For example, asking "Where are these requests coming from?" would aggregate by geography. Query Agent might reveal that 80% of requests originate from France, with elevated activity from China, Netherlands, and India—a geographic clustering pattern consistent with coordinated attacks.

#### Step 4: Examine error patterns and sources

Query Agent maintains context from previous questions, so you can continue refining without repeating filters. For example, asking "What status codes are returned by the register API?" would show that over 85% of requests are failing with 503 errors. Following up with "Which IPs are behind these 503 errors?" reveals that two IPs account for over 97% of the failed traffic.

#### Step 5: Validate with threat intelligence

You can enrich findings by asking Query Agent to cross-reference with external data. For example, "Check these IPs against threat intel" would reveal if the source IPs are flagged as known malicious actors, confirming whether the incident is an attack or organic load.

#### Next steps

In just a few conversational turns, we went from an initial alert to confirming a DDoS attack with:
* Identified affected services and APIs
* Traced attack origin to specific geographic regions and IPs
* Validated malicious actors using threat intelligence
* Quantified impact on latency and error rates

From here, you can continue refining or take action like blocking malicious IPs, [opening the query in Log Search](/docs/search/mobot/#step-4-open-in-log-search), [adjusting the time range](/docs/search/mobot/#time-range), [editing the query logic](/docs/search/mobot/#edit-query-code), or [starting over with a new chat](/docs/search/mobot/#new-conversation).


#### Step ?: Narrow the scope

After you click a follow-up suggestion or type a refinement, Mobot refreshes the results and updates the intent card and query to reflect the new focus. With each refinement, Mobot adjusts the query, applies the changes, and renders a visual chart.

For example, clicking the suggestion `Show me trend of errors each minute` applies a timeslice to group the results over time.

#### Step 2: Review and adjust the auto-selected source

Mobot automatically selects a source category based on its assessment of user intent. Review the selection and adjust it if needed. You can also manually enter a source expression to define the scope of your exploration.  

For example, to explore AWS WAF logs, select the appropriate source. For indexes, use `_index=<index name>`. Autocompletion is supported—start typing a few words to see source suggestions and choose one.

<img src={useBaseUrl('img/search/mobot/source-category.png')} alt="Mobot source category" style={{border: '1px solid gray'}} width="700" />

#### Step 3: Drill into causes

As you go, Mobot presents new suggestions to help you pivot into related questions, such as analyzing trends of event reasons or identifying top namespaces. The intent card expands each time to include the new scope, and results show additional details.

We'll refine further by clicking the suggestion `Show the count of error logs per minute, grouped by error code`.

#### Step 3: Execute a query

##### Click a suggestion

Click on any of the prebuilt **Suggestions** prompts to launch your investigation. These AI-curated natural language insights are tailored to the specific source you've chosen.

In this example, we'll click `Count the number of log entries by the collector ID`. This translates the insight to a log query and

You can pin a suggestion for easy access later. Just hover over a suggestion and click **Pin suggestion** (pin icon). The pinned suggestion will stay at the top of your **Suggestions** list within that conversation.

##### Ask a question

In the **Ask Something...** field, you can manually enter a natural language prompt, similar to the prebuilt options under **Suggestions**. You can also use autocompletion—start typing a keyword to see relevant suggestions.<br/><img src={useBaseUrl('img/search/mobot/manual-entry.png')} alt="Entering a prompt in the Mobot Ask field" style={{border: '1px solid gray'}} width="600" />

To get the best results, focus your queries on a specific, well-defined problem. Broad or vague questions may lead to inaccurate or incomplete results. If Mobot cannot translate your prompt into a valid query, you'll see a "Failed translation" message.

Whenever possible, break down complex questions into smaller, clear requirements. This helps Mobot generate more accurate and actionable responses.

##### Tips and tricks

* **Start with a broad query**. Begin with a query like `Show me the most recent logs` to understand the structure and available fields in your logs.  
* **Disambiguate field names**. If fields have similar names and cause confusion, explicitly specify the field (e.g., `<field_name>`) to improve accuracy.  
* **Experiment with phrasing**. Try multiple variations of a query to provide context and receive more relevant suggestions.  
* **Include time or variations to add `timeslice` as a dimension**. When timeslicing data, include the term `time` in your query. For example: `Count requests, every 1m, different code challenges and user used during login attempts by time`.
* **Explore context-aware suggestions**. Use prompts like `Calculate 95th percentile latency` or `Visualize request volumes over time` to quickly surface key metrics.
* **Detect malicious activity**. Try queries like `Count register requests by 503 status code, IP, and threat confidence` to uncover potential DDoS attacks.

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question.  
* **Be specific**. Combine filters, units, and percentiles in clear language.
* **Ask about data tied to dashboards**. Mobot works best when you reference data sources that already have dashboards built on them. Ask questions using dashboard panel names or descriptions, even if built on unstructured logs.
* **Reuse queries from your conversation history**. Everything you ask is saved to your conversation history automatically. You can revisit, reuse, continue where you left off in prior conversations to compare or branch analyses.
* **Modify existing queries**. Add/remove fields, add `where`, `sort`, `avg()` clauses, and more.
* **Guide Mobot with feedback**. If the result isn't right, use natural language: `Don't do X, instead do Y`.
* **Fix broken queries**. Paste a syntactically invalid query. Mobot will correct it.

<!-- Next steps
As with legacy Mobot, you can adjust the [time range](/docs/search/mobot/#time-range), switch [chart types](/docs/search/mobot/#chart-type), [edit the query logic](/docs/search/mobot/#edit-query-code), [open in Log Search](/docs/search/mobot/#step-4-open-in-log-search), or start over with a [new chat](/docs/search/mobot/#new-conversation).

#### Step 4: Request a trend over time

If you type a time period (for example, `Show the trend over 24 hours`), the query applies a timeslice (for example, one-hour buckets) to group results over time.

:::tip
Ask Mobot to change units in your query. For example, `Convert GB to bytes`.
:::

Finally, type: `Show the trend over 24 hours`. Mobot translates this into: `Show the trend of failed scheduling events by namespace with error messages over 24 hours`.
<img src={useBaseUrl('img/search/mobot/trend-over-time.png')} alt="Mobot conversational experience showing trend over time" style={{border: '1px solid gray'}} width="700"/>

where the results appear in a table view, you can change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.
-->

Below are examples of how you can phrase queries if the autocompletions and contextual suggestions are not relevant to you:

* `Count logs by` [field(s)] and `Group logs by` [field(s)] produce the same result
* `Sort by` [field(s)] [in descending order]
* `Percentage by` [field] `values`
* `Find` [stat] `for` [field] (max, min, standard deviation, etc.)
* `Filter by` [field] `contains` [keyword]
   :::note
   Keyword searches are case-sensitive.
   :::
* `Apply logreduce to logs`

More examples:

* Detecting malicious activity:
   ```
   Count logs by action. Sort the results.
   Filter results by action contains Malicious.
   ```
* Advanced analysis with users and URLs:
   ```
   Count logs by action, url, user.
   Sort the results. Filter results by action contains Malicious.
   ```  
* Root cause analysis for latency:
   ```
   Calculate 95th percentile latency by service and API.
   ```

Additional prompts can trigger more advanced activities (e.g., mapping network activity against CrowdStrike):

* `Analyze risk and severity of network activity`
* `Identify top application categories accessed`

##### Time range

By default, Mobot searches run with a 15-minute time range. If your search does not return any results, consider expanding the time range.

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/mobot/time-period.png')} alt="Mobot time period" style={{border: '1px solid gray'}} width="400" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/mobot/search-button.png')} alt="Mobot search button" style={{border: '1px solid gray'}} width="250" />

##### Chart type

Mobot will automatically attempt to visualize your data. For example, a query like `Top ip by geo` will trigger a geo lookup and display the results on a map:

<img src={useBaseUrl('img/search/mobot/geo-chart.png')} alt="Mobot chart types" style={{border: '1px solid gray'}} width="800" />

The following rules are used to deduce chart type:
* If both latitude and longitude fields exist, it returns a MAP chart type.
* If there is only one field and one record, it returns an SVP chart type. Example query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | count`
* If a `sort` operator is present and there are string fields, it returns a TABLE. Given that there is a `sort` operator, probably the user is interested in `count`. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | sort by _count`
* If there is a `_timeslice` field, it returns a LINE chart type if there are numeric fields or a TABLE chart type if there are string fields.
* If there is one string field, one numeric field, and record count is less than 6, it returns a PIE chart type. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename"`.
* If there is one string field, less than 3 numeric fields, and record count is less than 20, it returns a LINE chart.
* If none of the above conditions are met, it defaults to returning a TABLE chart type.

Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view to visualize your results. You can also click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/mobot/chart-types.png')} alt="Mobot chart types" style={{border: '1px solid gray'}} width="500" />

##### Edit query code

You can manually edit your log search query code if needed.

1. Click in the code editor field and edit your search.<br/><img src={useBaseUrl('img/search/mobot/code-editor.png')} alt="Mobot time period" style={{border: '1px solid gray'}} width="500" />
   :::tip
   New to Sumo Logic query language? [Learn more](/docs/search/search-query-language).
   :::
1. When you're done, press Enter or click the search button.<br/><img src={useBaseUrl('img/search/mobot/play.png')} alt="Mobot time period" style={{border: '1px solid gray'}} width="500" />
1. (Optional) To save space, you can use the **Hide Log Query** icon to collapse the log query code.<br/><img src={useBaseUrl('img/search/mobot/show-hide-query.png')} alt="Mobot time period" style={{border: '1px solid gray'}} width="500" />

##### Compatible Log Formats

Mobot querying is compatible with JSON logs, partial JSON logs, and unstructured logs with Field Extraction Rules. It cannot be used to query metrics or trace telemetry.

To retrieve a list of `_sourceCategories` with JSON data, use the following query:

```sql
_sourceCategory=* "{" "}"
| limit 10000 | logreduce keys noaggregate
| count by _sourceCategory, _schema
| where _schema != "unknown"
| sum(_count) by _sourceCategory
```

If your log query contains a mix of JSON and non-JSON formatting (i.e., a log file is partially JSON), you can isolate the JSON portion by adding a left curly brace (`{`) to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/mobot/json.png')} alt="Mobot JSON formatting" style={{border: '1px solid gray'}} width="350" />

##### Edit Title

Mobot automatically updates conversation titles based on your query. You can also set a custom title by clicking the "Edit Title" (pencil) icon. This helps keep investigations organized and easier to revisit.

##### My Conversations

The conversation history feature saves all previous queries and suggestions, allowing you to backtrack and refine your investigation. For example, if a status code analysis yields inconclusive results, you can revisit earlier queries to explore other possibilities. This functionality can also be useful when you're working on multiple incidents at the same time.

To resume a conversation, go to the **My Conversations** tab and click on the one you're looking for.<br/><img src={useBaseUrl('img/search/mobot/resume-convo-history1.png')} alt="Mobot History" style={{border: '1px solid gray'}} width="600" />

<!-- is this still there?
To view Mobot interactions related to an incident, click **History**.<br/><img src={useBaseUrl('img/search/mobot/history.png')} alt="Mobot History" style={{border: '1px solid gray'}} width="700" />
-->

##### New Conversation

To start a fresh exploration, click **New Conversation**. This clears your current session and allows you to begin with a clean slate.<br/><img src={useBaseUrl('img/search/mobot/new-conversation.png')} alt="Mobot new conversation" style={{border: '1px solid gray'}} width="700" />


#### Step 4: Open in Log Search

Open your query in [Log Search](/docs/search) to access Sumo Logic’s full search functionality. This allows you to continue investigating, refining your query, take action, or save the search for later.

There are two ways to do this:

* From your conversation, click **View results**.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search-view-results.png')} alt="Mobot option to open your query in Log Search" style={{border: '1px solid gray'}} width="700" />
* From the query section, click the **Open in Log Search** icon.<br/><img src={useBaseUrl('img/search/mobot/open-in-log-search.png')} alt="Open in Log Search button in Mobot" style={{border: '1px solid gray'}} width="500" />


### Tips for better answers

Get the most out of Query Agent by following these tips:

* **Talk to it like a conversation**. Layer refinements instead of rewriting the whole question. For example, start with "Show me API errors" then follow up with "group by status code" and "show the last 6 hours."  
* **Be specific**. Combine filters, units, and percentiles in clear language. Instead of "show me errors," try "show me 500 errors from the API service in the last hour." Query Agent performs better with explicit filters, time ranges, and field names.
* **Ask about data tied to dashboards**. Query Agent works best when you reference data sources that already have dashboards built on them. Try asking questions using dashboard panel names or descriptions, even if built on unstructured logs.
* **Change chart types**. When results appear in a table view, change the visualization to a time-series chart (for example, line or area) to see the trend more clearly over time.
* **Change units in your query**. For example, "Convert GB to bytes".
* **Reuse queries from your conversation history**. Everything you ask is saved to your conversation history automatically. You can revisit, reuse, continue where you left off in prior conversations to compare or branch analyses.
* **Modify existing queries**. Add/remove fields, add `where`, `sort`, `avg()` clauses, and more.
* **Guide Query Agent with feedback**. If the result isn't right, use natural language. For example, "Don't filter by namespace, instead group by error type" or "Use P90 instead of P50."
* **Fix broken queries**. Paste a syntactically invalid query and Query Agent will correct it for you.


### Example queries

#### Logs for security

<!-- add micro lesson when published-->

In the video, Mobot is used to investigate a security issue involving the potential leak of AWS CloudTrail access keys outside the organization.

The video demonstrates how to use Mobot to analyze AWS CloudTrail data, review AI-curated suggestions, refine searches using natural language prompts, and generate a dashboard for root cause analysis and sharing.

<Iframe url="https://www.youtube.com/embed/QrRvN2Bg4NY?si=FTbUeCI-xaJrglmm?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />





#### Cloud SIEM

You are a SecOps engineer who uses [Cloud SIEM](/docs/cse/). You are worried about a signal in Cloud SIEM regarding malicious network activity. You want to investigate network records and be proactive. You are under pressure to complete your investigation quickly. While familiar with Sumo Logic, you do not write log queries every day and could use a little help. Fortunately, all your Cloud SIEM records are in Sumo Logic.

1. In Mobot, you type the source for Cloud SIEM network records:
   ```
   _index=sec_record_network
   ```
1. You know what you are looking for. So, you ask:
   ```
   Count logs by action. Sort the results.
   ```
   <img src={useBaseUrl('img/search/mobot/cloud-siem-1.png')} alt="Mobot tab" style={{border: '1px solid gray'}} width="500" />
1. As soon as you do that, you can look at the **Suggestions** section on the right. These suggestions are curated based on their relevance to this Cloud SIEM source. You pick a suggestion to compare results to the last hour:
   ```
   Count logs by action. Sort the results. versus the previous 1h
   ```
   Notice the system translated the suggestion to a log query and rendered results as a bar graph with no user input. <br/><img src={useBaseUrl('img/search/mobot/cloud-siem-2.png')} alt="Mobot tab" style={{border: '1px solid gray'}} width="800" />
1. Switching to table view, you notice "Malicious” in the search results. So, you add in `Filter results by action contains Malicious` to the query:
   ```
   Count logs by action. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/mobot/cloud-siem-3.png')} alt="Mobot tab" style={{border: '1px solid gray'}} width="800" />
   :::note
   If `Malicious` doesn't work, try `Malicious*`. Sumo Logic is case sensitive.
   :::
1. Next, you look for URLs that pertain to the malicious action:
   ```
   Count logs by action, url, user. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/mobot/cloud-siem-4.png')} alt="Mobot tab" style={{border: '1px solid gray'}} width="800" />
1. Even though the activity was blocked, you can investigate the affected users in the endpoint records next.

To summarize, you conclude there is malicious activity originating from certain users who need to be investigated further.

### Role Based Access Control

Role Based Access Control (RBAC) is not supported for contextual suggestions and autocompletions. It is possible for a user who is blocked by [log search RBAC](/docs/manage/users-roles/roles/construct-search-filter-for-role/) to view suggestions or completions for unpermitted source expressions. However, they will not be executed by the search.

### Search behavior and data tier access

Mobot follows the same search behavior as standard log search and respects your account’s data configuration, whether you're on Flex pricing or tiered pricing (legacy).

#### Flex pricing

If you're on [Flex pricing](/docs/manage/partitions/flex), all data is stored in a single intelligent layer and pricing is based on the volume of data scanned.

#### Tiered pricing (legacy)

If you're on a legacy [tiered pricing](/docs/manage/partitions/data-tiers/searching-data-tiers/) plan such as Continuous Tier, Frequent Tier, or Infrequent Tier:

* Mobot searches across *continuous data tiers only*, unless otherwise specified.
* To query a specific tier, include the `_dataTier` field in your prompt. For example, to search the Infrequent tier:
   ```sql
   _dataTier=Infrequent
   ```


## Knowledge agent

Select **Knowledge Agent** to get help using Sumo Logic.

<!-- Micro lesson to come -->

<img src={useBaseUrl('img/search/mobot/knowledge-agent-select.png')} alt="Knowledge Agent button selected in the Mobot UI" style={{border: '1px solid gray'}} width="600" />

Knowledge Agent is your in-platform assistant for learning how to use Sumo Logic. Ask questions about Sumo Logic and get clear answers sourced directly from our official documentation without leaving your workflow. Here are some examples:
* "How do I add a collector for AWS CloudTrail?"
* "What's the difference between a scheduled search and a real-time alert?"
* "Why isn't my collector sending data?"
* "What are the API endpoints for Sumo Logic?"

Knowledge Agent maintains conversation context for 24 hours, so you can ask follow-up questions naturally without starting over.

### Tips for better answers

To get the most accurate answers, try the following when asking questions:

* **Ask complete questions**. Instead of typing "Collectors", try "How do I install a collector on Windows?"
* **Provide context for troubleshooting**. For example, "I'm getting a 403 error when setting up AWS integration—what could be wrong?"
* **Follow up naturally**. If the initial answer is close but not quite right, ask follow-up questions like "What about for Azure instead of AWS?"
* **Reference specific features**. Use proper names when you know them: "How do I use Field Extraction Rules?" works better than "How do I extract fields?"


## Security and compliance

Sumo Logic Mobot leverages foundational models provided by Amazon Bedrock, inheriting their robust compliance and security posture. For detailed information, refer to the following Amazon Bedrock security and compliance resources:

* [Security in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
* [Amazon Bedrock Security and Privacy](https://aws.amazon.com/bedrock/security-compliance/)

Additionally, all aspects of our service, including Mobot, adhere to the security and compliance requirements outlined in our [service agreement](https://www.sumologic.com/service-agreement) or in individually negotiated contracts.

* **Customer data privacy**. Mobot ensures customer data remains private and secure. No customer data or PII is used to train the AI models. Context for AI processing is limited to schema and field samples, reviewed for legal and compliance purposes.
* **Rolling data expiration**. Some features may store query history temporarily for performance, but data is expired on a rolling basis.
* **AI provider**. Mobot uses a foundation model served by Amazon Bedrock. The provider has no access to your data.


## FAQ

<details>
<summary>What is Sumo Logic Mobot?</summary>

Mobot is an AI assistant integrated into the Sumo Logic Log Analytics Platform. It enables natural language queries and contextual troubleshooting, helping users extract actionable insights from logs. Mobot does not process or share your log data with any third party.
</details>

<details>
<summary>Can I use Mobot to analyze unstructured logs?</summary>

Yes, Mobot can extract relevant insights from unstructured logs, provided Field Extraction Rules (FERs) are applied. It also supports semi-structured logs (JSON + unstructured payloads).

<!-- get clarification - can Mobot parse raw logs without FERs? -->

</details>

<details>
<summary>Does Mobot save search history?</summary>

Yes, Mobot retains conversation and search history, allowing you to resume investigations with context and continuity.
</details>

<details>
<summary>What role does AI play in Mobot?</summary>

Mobot uses AI to interpret natural language queries and recommend search results or query refinements, streamlining log analysis.
</details>

<details>
<summary>What specific types of customer data or PII does the AI process? Does it filter out PII/sensitive information?</summary>

Mobot processes schema and field samples to provide context to the AI. While field values can contain PII or confidential data (for example, email addresses or IP addresses), these values are used solely to enable insights and are protected under strict compliance and security reviews.
</details>

<details>
<summary>Is customer data/PII used to train AI models?</summary>

No, customer data or PII is not used for training AI models. Mobot operates using a foundation model served via Amazon Bedrock, ensuring your data remains private and secure.
</details>

<details>
<summary>How long does the AI store customer information or PII, and when and how is it deleted?</summary>

Certain features may rely on query history stored on a rolling basis for performance optimization. Data is systematically expired to maintain privacy.

For example, our alerts feature log anomaly detection and build ML models from 60 days of logs. To accomplish this, we retrain the model once a week. In this example, each week, we add one week of new data while expiring the oldest week of data. Rolling data windows are done to avoid fetching 60 days of data for every training run.
</details>

<details>
<summary>Does Mobot use any open-source library, GenAI providers, or cloud providers?</summary>

For Generative AI, Mobot uses a foundation model served by Amazon Bedrock. Classical ML features leverage open-source Python libraries approved by Sumo Logic.
</details>

<details>
<summary>What is the type of AI being used?</summary>

Mobot is an ensemble of Generative AI (GenAI) and classical machine learning (ML) techniques. For example, classical ML is used for anomaly detection in alerts.
</details>

<details>
<summary>Is there a human in the loop for Mobot?</summary>

Yes, the on-call developer or security engineer troubleshooting an incident is the expected user. They interact with Mobot using natural language questions or through contextual suggestions.
</details>

<details>
<summary>Does a fourth party have access to Mobot customer data?</summary>

No. The foundation model provider used by Amazon Bedrock has no access to customer data.
</details>

<details>
<summary>Does Sumo Logic hold any AI-specific certifications or accreditations?</summary>

No, we do not currently hold any AI-specific certifications or accreditations.
</details>

<details>
<summary>How are reviews conducted on the Mobot model?</summary>

Each major capability added to Mobot undergoes legal, compliance, and application security reviews. These reviews coincide with new releases that expand insights or process new types of data.
</details>

<details>
<summary>How can I opt out of Mobot?</summary>

If you prefer not to use Mobot, contact our [support team](https://support.sumologic.com/support/s/). Your account will be updated accordingly.
</details>


<details>
<summary>Is any user or org data sent outside our environment?</summary>

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org—no cross-org data leakage.
</details>

<details>
<summary>What's the impact on query latency?</summary>

Typical end-to-end response time remains under 2 seconds for most queries. Very large result sets or percentile calculations over broad ranges may take up to 5 seconds. During Beta, full query generation may take 6 to 7 seconds, but Mobot streams the first token (intent interpretation) within 2 seconds.
</details>


<details>
<summary>Does Knowledge Agent use my data to train external models?</summary>

Mobot and Knowledge Agent run on Amazon Bedrock, an approved and secure subprocessor that complies with Sumo Logic's privacy, security, and data-handling standards.

No customer data is ever used for model training. All processing happens within the secure boundaries of Sumo Logic's architecture, maintaining the same high level of data protection customers already trust.

</details>

<details>
<summary>Is my data safe when I use Knowledge Agent?</summary>

Yes. Knowledge Agent only processes what you provide during your session, and this data remains inside Sumo Logic's secure environment. Nothing is sent to external LLM providers for training or storage.

</details>

<details>
<summary>How does Knowledge Agent ensure accuracy?</summary>

Knowledge Agent pulls directly from Sumo Logic's official product documentation. Responses are always grounded in our published help content, making them accurate, citable, and aligned with the latest platform behavior.

No information is generated from unreliable external sources.

</details>

<details>
<summary>Can Knowledge Agent answer questions outside Sumo Logic's documentation?</summary>

No. Knowledge Agent is intentionally scoped to use Sumo Logic's internal documentation and resources only. This ensures answers remain trustworthy and consistent with product behavior.

</details>

<details>
<summary>Is any user or org data sent outside our environment?</summary>

No. All processing happens within your region's cluster. RAG context is scoped to dashboards in your own org—no cross-org data leakage.
</details>

<details>
<summary>What's the impact on Query agent latency?</summary>

Typical end-to-end response time remains under 2 seconds for most queries. Very large result sets or percentile calculations over broad ranges may take up to 5 seconds. During Beta, full query generation may take 6 to 7 seconds, but Mobot streams the first token (intent interpretation) within 2 seconds.
</details>

<details>
<summary>What are the current Query agent limitations?</summary>

* For dashboard-aware translations via RAG, support is limited to the `sourceCategory` filter (selection in the source picker) at launch. Other expressions like `_index=` or `_sourceHost=` are not yet supported.  
* RAG only considers dashboards that have been opened in the last 90 days when interpreting your query.
* Very large or highly complex queries may time out or trigger structured fallback responses.
* The conversational experience is available for log-based searches only. Metrics and Metric Searches are not supported in this Beta.
* Mobot cannot currently refer to the output of a log search directly in subsequent queries. Each follow-up must be expressed in terms of query refinements rather than referencing previous results. This is an important limitation to be aware of when constructing multi-turn conversations.
</details>

<details>
<summary>How do I debug a failed Query agent translation?</summary>

If a translation fails, Mobot generates a contextual error message tailored to the situation. The message includes the generated query, explains why it failed, and suggests how to fix it (for example, `Try narrowing your time window` or `Simplify your filter expression`).

Here are some common cases:

* **No or delayed results**. Give Mobot a few seconds to process complex refinements.  
* **Output too broad**. Add more context (for example, specify a client or namespace).  
* **Unexpected numbers**. If results look off, be more explicit. For example, ask `show in milliseconds` or `convert to seconds` to adjust units, or say `show P90` / `switch back to P50 over 1 minute` to refine percentiles.  
</details>


## Feedback

We want your feedback! Let us know what you think by clicking the thumbs up icon to verify your query or the thumbs down icon to tell us how we can improve.

<img src={useBaseUrl('img/search/mobot/feedback-thumbs.png')} alt="Mobot feedback icons in Query agent conversation" style={{border: '1px solid gray'}} width="800" />

## Opting out

To opt out of Mobot, contact our [Support team](https://support.sumologic.com/support/s/).

## Additional resources

* [Search Query Language](/docs/search/search-query-language)
* [Dashboards](/docs/dashboards)
* [Dojo AI overview](https://www.sumologic.com/solutions/dojo-ai). Learn about Dojo AI, the collective system of Sumo Logic agents and assistants, including Mobot’s agents (Query agent and Knowledge Agent), Cloud SIEM security agent, platform agents, and more coming soon.
