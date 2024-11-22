---
id: copilot
title: Sumo Logic Copilot - Feature Preview
sidebar_label: Copilot - Preview
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

<p><a href="/docs/beta"><span className="beta">Preview Release</span></a></p>
This is a Preview release. To learn more, contact your Sumo Logic account executive.

Sumo Logic Copilot is our AI-powered assistant that accelerates investigations and troubleshooting in logs by allowing you to ask questions in plain English and get contextual suggestions, helping first responders get to answers faster.

With its intuitive interface, Copilot automatically generates log searches from natural language queries, helping you quickly investigate performance issues, anomalies, and security threats. It also guides you through investigations step-by-step with AI-driven suggestions to refine your results for faster, more accurate resolutions. Overall, Copilot enhances incident resolution with expert level insights.

<Iframe url="https://player.vimeo.com/video/1021631518?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />


### Key features

Copilot accelerates incident response by combining prebuilt contextual insights with natural language queries and enhancing time to insights for users across your organization. With sub-3-second response times with over 90% translation accuracy for most queries, Copilot ensures fast and dependable results for supported log sources.

* **Natural language queries**. Ask questions in plain English.
* **Contextual suggestions**. Get suggestions relevant to your troubleshooting and investigations context.
* **Conversation history**. Save and resume troubleshooting or investigation sessions without losing context.
* **Auto-visualize**. Copilot automatically generates charts from search results, which you can add directly to dashboards.
* **Log compatibility**. Copilot supports structured logs, semi-structured logs (partial JSON), and unstructured logs (e.g., Palo Alto Firewall) when Field Extraction Rules (FERs) are applied. This ensures valuable insights across a variety of log formats.
* **Enhanced query experience**. Auto-complete to streamline natural language queries.

## Security and compliance

Copilot leverages foundational models available through Amazon Bedrock. As a result, our Copilot compliance and security posture are inherited from Amazon Bedrock. For detailed information, refer to the following Amazon Bedrock security and compliance resources:

* [Security in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
* [Amazon Bedrock Security and Privacy](https://aws.amazon.com/bedrock/security-compliance/)

Additionally, all aspects of our service, including Copilot, adhere to the security and compliance requirements outlined in our [service agreement](https://www.sumologic.com/service-agreement) or in individually negotiated contracts.

### Who benefits from Copilot?

Copilot is ideal for users of all skill levels:

* **On-call engineers**. Accelerate time to resolution by surfacing key troubleshooting insights.
* **Security engineers**. Obtain security insights rapidly for faster security incident resolution.

## How to use Copilot

In this section, you'll learn the recommended workflow for using Copilot effectively, along with best practices to maximize its benefits.

### Step 1: Open Copilot

To start using Copilot:

From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), navigate to the **Copilot** tab.<br/><img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

From the [**New UI**](/docs/get-started/sumo-logic-ui), click **Copilot** in the left nav.<br/><img src={useBaseUrl('img/search/copilot/copilot-tab-new.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

### Step 2: Review the auto-selected source

Review the auto-selected **Source Category** and adjust it if needed. The source category is selected based on Copilot’s assessment of user intent. You can also type a source expression in the box. In either approach, you are defining the scope of your exploration. In this example, we'll select a source for AWS WAF. For indexes, type `_index=<index name>`.

<img src={useBaseUrl('img/search/copilot/source-category.png')} alt="Copilot source category" style={{border: '1px solid gray'}} width="600" />

### Step 3: Execute a Suggestion

Click on any of the prebuilt **Suggestions** prompts to launch your investigation. These AI-curated natural language insights are tailored to the specific source you've chosen.

In this example, we'll click `Count the number of log entries by the collector ID`. This translates the insight to a log query and renders results.

<img src={useBaseUrl('img/search/copilot/suggestions.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

#### Ask a question

In the **Ask Something...** field, you can manually enter a natural language prompt similar to the prebuilt ones under **Suggestions**. In addition, use autocompletions if appropriate. Type a work in the search bar to trigger completions based on the keyword.

<!-- TO DO BA to upload to YouTube DEMO: https://drive.google.com/file/d/10XUn4DQD3K91V3Qf5heCizkHJneTaBJ7/view?usp=sharing
-->

<img src={useBaseUrl('img/search/copilot/manual-entry.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

Broad questions may not yield accurate results. For best outcomes, frame your queries around a small, well-defined problem. If Copilot is unable to translate your prompt into a query, it will display "Failed translation".

Break your questions into smaller, specific requirements to help Copilot provide more accurate answers.<br/><img src={useBaseUrl('img/search/copilot/copilot-periods.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />

<!-- TO DO
##### Autocompletion for natural language
see https://drive.google.com/file/d/10XUn4DQD3K91V3Qf5heCizkHJneTaBJ7/view?usp=sharing
--->

##### Tips and tricks

* **Start with a broad query**. Begin with a query like `Show me the most recent logs` to understand the structure and available fields in your logs.  
* **Clarify field names**. If fields have similar names and cause confusion, explicitly specify the field (e.g., `<field_name>`) to improve accuracy.  
* **Experiment with phrasing**. Try multiple variations of a query to provide context and receive more relevant suggestions.  
* **Include time for timeslicing**. When timeslicing data, include the term `time` in your query. For example: `Count requests, every 1m, different code challenges and user used during login attempts by time`.

Below are examples of how you can phrase queries if the autocompletions and contextual suggestions are not relevant to you:

* `Count logs by` [field(s)] and `Group logs by` [field(s)] produce the same result
* `Sort by` [field(s)] [in descending order]
* `Percentage by` [field] `values`
* `Find` [stat] `for` [field] (max, min, standard deviation, etc.)
* `Filter by` [field] `contains` [keyword]
   :note
   Keyword searches are case-sensitive.
   :::
* `Apply logreduce to logs`

Additional prompts can trigger more advanced activities (e.g., mapping network activity against CrowdStrike):

* `Analyze risk and severity of network activity`
* `Identify top application categories accessed`

#### Time range

By default, Copilot searches run with a 15-minute time range. If your search returns no results, consider expanding the time range.

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="400" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="250" />

#### Chart type

Copilot will automatically attempt to visualize your data. For example, a query like `Top ip by geo` will trigger a geo lookup and display the results on a map:

<img src={useBaseUrl('img/search/copilot/copilot-geo-chart.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="800" />

The following rules are used to deduce chart type:
* If both latitude and longitude fields exist, it returns a MAP chart type.
* If there is only one field and one record, it returns an SVP chart type. Example query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | count`
* If a `sort` operator is present and there are string fields, it returns a TABLE. Given that there is a `sort` operator, probably the user is interested in `count`. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename" | sort by _count`
* If there is a `_timeslice` field, it returns a LINE chart type if there are numeric fields or a TABLE chart type if there are string fields.
* If there is one string field, one numeric field, and record count is less than 6, it returns a PIE chart type. Query: `(_sourceCategory=ic/linux/gcp) | count by %"_sourcename"`.
* If there is one string field, less than 3 numeric fields, and record count is less than 20, it returns a LINE chart.
* If none of the above conditions are met, it defaults to returning a TABLE chart type.

If required, select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view to visualize your results. You can also click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/copilot/chart-types.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="500" />

#### Edit query code

You can manually edit your log search query code if needed.

1. Click in the code editor field and edit your search. Not familiar with Sumo Logic query language? See [Search Query Language](/docs/search/search-query-language) to learn more.<br/><img src={useBaseUrl('img/search/copilot/code-editor.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. When you're done, press Enter or click the search button.<br/><img src={useBaseUrl('img/search/copilot/play.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />

:::tip
To save space, you can use the **Hide Log Query** icon to collapse the log query code.<br/><img src={useBaseUrl('img/search/copilot/show-hide-query.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
:::

#### Compatible Log Formats

Copilot querying is compatible with JSON logs, partial JSON logs, and unstructured logs with Field Extraction Rules. It cannot be used to query metrics or trace telemetry.

To retrieve a list of `_sourceCategories` with JSON data, use the following query:

```sql
_sourceCategory=* "{" "}"
| limit 10000 | logreduce keys noaggregate
| count by _sourceCategory, _schema
| where _schema != "unknown"
| sum(_count) by _sourceCategory
```

If your log query contains a mix of JSON and non-JSON formatting (i.e., a log file is partially JSON), you can isolate the JSON portion by adding `{` to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />

#### History

Often, users work on multiple incidents at the same time. To view Copilot interactions related to these incidents, click **History**.<br/><img src={useBaseUrl('img/search/copilot/history.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="700" />

You can resume a conversation in two ways:

First, the Resume conversation icon picks up from the last query in a conversation.<br/><img src={useBaseUrl('img/search/copilot/resume-convo-history1.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="700" />

Second, you can resume from a specific query in a conversation by clicking on the row in the conversation history and then clicking on the gray area on the right side, as shown below.<br/><img src={useBaseUrl('img/search/copilot/resume-convo-history2.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="700" />

#### New Conversation

To start a fresh exploration, click **New Conversation**. This clears your current session and allows you to begin with a clean slate.<br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="700" />


### Step 4: Open in Log Search

Click the **Open in Log Search** icon, which will copy your query from Copilot over to a new log search, allowing you to utilize all of Sumo Logic's search functionality. You can continue investigating, save the search, and remediate.

<img src={useBaseUrl('img/search/copilot/open-in-log-search.png')} alt="Copilot open in log search" style={{border: '1px solid gray'}} width="600" />



## Example queries

### Logs for security

<!-- add micro lesson when published-->

In the video, Copilot is used to investigate a security issue involving the potential leak of AWS CloudTrail access keys outside the organization.

The video demonstrates how to use Copilot to analyze AWS CloudTrail data, review AI-curated suggestions, refine searches using natural language prompts, and generate an AI-driven dashboard for root cause analysis and sharing.

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


### Cloud SIEM

You are a SecOps engineer who uses [Cloud SIEM](/docs/cse/). You are worried about a signal in Cloud SIEM regarding malicious network activity. You want to investigate network records and be proactive. You are under pressure to complete your investigation quickly. While familiar with Sumo Logic, you do not write log queries every day and could use a little help. Fortunately, all your Cloud SIEM records are in Sumo Logic.

1. In Copilot, you type the source for Cloud SIEM network records:
   ```
   _index=sec_record_network
   ```
1. You know what you are looking for. So, you ask:
   ```
   Count logs by action. Sort the results.
   ```
   <img src={useBaseUrl('img/search/copilot/copilot-cloud-siem-1.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="500" />
1. As soon as you do that, you can look at the **Suggestions** section on the right. These suggestions are curated based on their relevance to this Cloud SIEM source. You pick a suggestion to compare results to the last hour:
   ```
   Count logs by action. Sort the results. versus the previous 1h
   ```
   Notice the system translated the suggestion to a log query and rendered results as a bar graph with no user input. <br/><img src={useBaseUrl('img/search/copilot/copilot-cloud-siem-2.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
1. Switching to table view, you notice "Malicious” in the search results. So, you add in `Filter results by action contains Malicious` to the query:
   ```
   Count logs by action. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/copilot/copilot-cloud-siem-3.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
   :::note
   If `Malicious` doesn't work, try `Malicious*`. Sumo Logic is case sensitive.
   :::
1. Next, you look for URLs that pertain to the malicious action:
   ```
   Count logs by action, url, user. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/copilot/copilot-cloud-siem-4.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
1. Even though the activity was blocked, you can investigate the affected users in the endpoint records next.

To summarize, you conclude there is malicious activity originating from certain users who need to be investigated further.

## Role Based Access Control

Role Based Access Control is not supported for contextual suggestions and autocompletions. It is possible for a user who is blocked by [log search RBAC](/docs/manage/users-roles/roles/construct-search-filter-for-role/) to view suggestions or completions for unpermitted source expressions. However, they will not be executed by the search and will see the error: `""`.

## Feedback

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon and entering the context of your query.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />

You can also leave feedback on errors.

<img src={useBaseUrl('img/search/copilot/feedback-error.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />
