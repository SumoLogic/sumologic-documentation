---
id: copilot
title: Sumo Logic Copilot
sidebar_label: Copilot 🤖
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

:::info
If you prefer not to use Copilot, you can opt out by contacting [Support](https://support.sumologic.com/support/s/).
:::

Sumo Logic Copilot is our AI-powered assistant that accelerates investigations and troubleshooting in logs by allowing you to ask questions in plain English and get contextual suggestions, helping first responders get to answers faster.

With its intuitive interface, Copilot automatically generates log searches from natural language queries, helping you quickly investigate performance issues, anomalies, and security threats. It also guides you through investigations step-by-step with AI-driven suggestions to refine your results for faster, more accurate resolutions. Overall, Copilot enhances incident resolution with expert level insights.

:::sumo Micro Lesson: Introduction to Copilot
This short video introduces Copilot and how it can help you with log search and analysis—perfect for getting a quick overview before diving in.

<Iframe url="https://fast.wistia.net/embed/iframe/o9uftxw012?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::


## Key features

Copilot accelerates incident response by combining prebuilt contextual insights with natural language queries and enhancing time to insights for users across your organization. With sub-3-second response times with over 90% translation accuracy for most queries, Copilot ensures fast and dependable results for supported log sources.

* **Natural language queries**. Ask questions in plain English.
* **Contextual suggestions**. Get suggestions relevant to your troubleshooting and investigations context.
* **Conversation history**. Save and resume troubleshooting or investigation sessions without losing context.
* **Auto-visualize**. Copilot automatically generates charts from search results, which you can add directly to dashboards, reducing time and effort in data interpretation.
* **Log compatibility**. Copilot supports structured logs, semi-structured logs (partial JSON), and unstructured logs (e.g., Palo Alto Firewall) when Field Extraction Rules (FERs) are applied. This ensures valuable insights across a variety of log formats.
* **Enhanced query experience**. Auto-complete to streamline natural language queries.
* **Multi-turn conversations**. Ask follow-up questions without repeating yourself.

## Support for unstructured logs

Copilot now supports unstructured logs, including raw text logs with no predefined fields or Field Extraction Rules (FERs). If these logs are already visualized in dashboards, Copilot automatically parses them and surfaces insights using natural language queries.

This capability is powered by [Intelliparse mode (Beta)](/docs/search/get-started-with-search/build-search/intelliparse-beta), which infers structure from patterns already used in your dashboards. Behind the scenes, Copilot injects the `intelliparse` operator into queries to extract fields on the fly—no FER setup required.

Here are some use cases:
* Explore raw logs without defined fields
* Triage errors and detect patterns
* Investigate anomalies in security dashboards

Copilot does not currently interpret all unstructured logs. It prioritizes those already visualized in dashboards to ensure the most relevant and accurate insights. Unlike structured logs, which contain clearly defined fields, unstructured logs require Copilot to infer structure at query time using AI and pattern recognition.

## Security and compliance

Sumo Logic Copilot leverages foundational models provided by Amazon Bedrock, inheriting their robust compliance and security posture. For detailed information, refer to the following Amazon Bedrock security and compliance resources:

* [Security in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/security.html)
* [Amazon Bedrock Security and Privacy](https://aws.amazon.com/bedrock/security-compliance/)

Additionally, all aspects of our service, including Copilot, adhere to the security and compliance requirements outlined in our [service agreement](https://www.sumologic.com/service-agreement) or in individually negotiated contracts.

* **Customer data privacy**. Copilot ensures customer data remains private and secure. No customer data or PII is used to train the AI models. Context for AI processing is limited to schema and field samples, reviewed for legal and compliance purposes.
* **Rolling data expiration**. Some features may store query history temporarily for performance, but data is expired on a rolling basis.
* **AI provider**. Copilot uses a foundation model served by Amazon Bedrock. The provider has no access to your data.

## Who benefits from Copilot?

Copilot is ideal for users of all skill levels:

* **On-call engineers**. Accelerate time to resolution by surfacing key troubleshooting insights.
* **Security engineers**. Obtain security insights rapidly for faster security incident resolution.
* **Early career professionals**. Simplifies troubleshooting with natural language queries, making incident resolution accessible to those unfamiliar with query syntax.
* **Practitioners**. Speeds up workflows with auto-complete and context-aware suggestions for frequent tasks.
* **Experts**. Provides IDE-style assistance for crafting complex queries efficiently.

## How to use Copilot

In this section, you'll learn the recommended workflow for using Copilot effectively, along with best practices to maximize its benefits.

:::sumo Micro Lesson: Using Copilot
See Copilot in action with a hands-on walkthrough of the UI and prompt-based search.

<Iframe url="https://fast.wistia.net/embed/iframe/t67ovt9hqj?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

### Step 1: Open Copilot

To start using Copilot:

From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), click the **Copilot** tab.<br/><img src={useBaseUrl('img/search/copilot/classic-ui-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="300" />

From the [**New UI**](/docs/get-started/sumo-logic-ui), click **Copilot** in the left nav.<br/><img src={useBaseUrl('img/search/copilot/left-nav.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="300" />

### Step 2: Review and adjust the auto-selected source

Copilot automatically selects a source category based on its assessment of user intent. Review the selection and adjust it if needed. You can also manually enter a source expression to define the scope of your exploration.  

For example, to explore AWS WAF logs, select the appropriate source. For indexes, use `_index=<index name>`. Autocompletion is supported—start typing a few words to see source suggestions and choose one.

<img src={useBaseUrl('img/search/copilot/source-category.png')} alt="Copilot source category" style={{border: '1px solid gray'}} width="700" />

### Step 3: Execute a query

#### Click a suggestion

Click on any of the prebuilt **Suggestions** prompts to launch your investigation. These AI-curated natural language insights are tailored to the specific source you've chosen.

In this example, we'll click `Count the number of log entries by the collector ID`. This translates the insight to a log query and renders results.

<img src={useBaseUrl('img/search/copilot/suggestions.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />

You can pin a suggestion for easy access later. Just hover over a suggestion and click **Pin suggestion** (pin icon). The pinned suggestion will stay at the top of your **Suggestions** list within that conversation.

#### Ask a question

In the **Ask Something...** field, you can manually enter a natural language prompt, similar to the prebuilt options under **Suggestions**. You can also use autocompletion—start typing a keyword to see relevant suggestions.<br/><img src={useBaseUrl('img/search/copilot/manual-entry.png')} alt="Entering a prompt in the Copilot Ask field" style={{border: '1px solid gray'}} width="600" />

To get the best results, focus your queries on a specific, well-defined problem. Broad or vague questions may lead to inaccurate or incomplete results. If Copilot cannot translate your prompt into a valid query, you'll see a "Failed translation" message.

Whenever possible, break down complex questions into smaller, clear requirements. This helps Copilot generate more accurate and actionable responses.<br/><img src={useBaseUrl('img/search/copilot/periods-query-syntax.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />

#### Tips and tricks

* **Start with a broad query**. Begin with a query like `Show me the most recent logs` to understand the structure and available fields in your logs.  
* **Disambiguate field names**. If fields have similar names and cause confusion, explicitly specify the field (e.g., `<field_name>`) to improve accuracy.  
* **Experiment with phrasing**. Try multiple variations of a query to provide context and receive more relevant suggestions.  
* **Include time or variations to add `timeslice` as a dimension**. When timeslicing data, include the term `time` in your query. For example: `Count requests, every 1m, different code challenges and user used during login attempts by time`.
* **Explore context-aware suggestions**. Use prompts like `Calculate 95th percentile latency` or `Visualize request volumes over time` to quickly surface key metrics.
* **Detect malicious activity**. Try queries like `Count register requests by 503 status code, IP, and threat confidence` to uncover potential DDoS attacks.

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

#### Time range

By default, Copilot searches run with a 15-minute time range. If your search returns no results, consider expanding the time range.

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="400" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="250" />

#### Chart type

Copilot will automatically attempt to visualize your data. For example, a query like `Top ip by geo` will trigger a geo lookup and display the results on a map:

<img src={useBaseUrl('img/search/copilot/geo-chart.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="800" />

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

1. Click in the code editor field and edit your search. New to Sumo Logic query language? Learn more in the [Search Query Language](/docs/search/search-query-language) guide.<br/><img src={useBaseUrl('img/search/copilot/code-editor.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. When you're done, press Enter or click the search button.<br/><img src={useBaseUrl('img/search/copilot/play.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />

:::tip
To save space, you can use the **Hide Log Query** icon to collapse the log query code.<br/><img src={useBaseUrl('img/search/copilot/show-hide-query.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
:::

#### Compatible Log Formats

* **Supported**. JSON, partial JSON, unstructured logs (with or without FERs).
* **Not supported**. Metrics or trace telemetry.

To retrieve a list of `_sourceCategories` with JSON data, use the following query:

```sql
_sourceCategory=* "{" "}"
| limit 10000 | logreduce keys noaggregate
| count by _sourceCategory, _schema
| where _schema != "unknown"
| sum(_count) by _sourceCategory
```

If your log query contains a mix of JSON and non-JSON formatting (i.e., a log file is partially JSON), you can isolate the JSON portion by adding a left curly brace (`{`) to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />

#### Edit Title

Copilot automatically updates conversation titles based on your query. You can also set a custom title by clicking the "Edit Title" (pencil) icon. This helps keep investigations organized and easier to revisit.

#### History

The conversation history feature saves all previous queries and suggestions, allowing you to backtrack and refine your investigation. For example, if a status code analysis yields inconclusive results, you can revisit earlier queries to explore other possibilities.

This functionality can be useful when you're working on multiple incidents at the same time. To view Copilot interactions related to an incident, click **History**.<br/><img src={useBaseUrl('img/search/copilot/history.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="700" />

There are two ways to resume a conversation:

* Click the "Resume Conversation" icon to pick up from the last query in a conversation.<br/><img src={useBaseUrl('img/search/copilot/resume-convo-history1.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="600" />
* Click on any row in a conversation history, then click the "Open in Copilot" icon to resume from a specific query in a conversation.<br/><img src={useBaseUrl('img/search/copilot/resume-convo-history2.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="600" />

#### New Conversation

To start a fresh exploration, click **New Conversation**. This clears your current session and allows you to begin with a clean slate.<br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="700" />


### Step 4: Open in Log Search

You can open your query in [Log Search](/docs/search) to access Sumo Logic’s full search functionality. This allows you to continue investigating, refine your query, save the search, or take action as needed.

There are two ways to do this:

* From your conversation, click the "Open in Log Search" icon.<br/><img src={useBaseUrl('img/search/copilot/open-in-log-search1.png')} alt="Copilot open in log search" style={{border: '1px solid gray'}} width="600" />
* From your conversation history, hover over any row, then click the "Open in Log Search" icon.<br/><img src={useBaseUrl('img/search/copilot/open-in-log-search2.png')} alt="Open Copilot query in log search from History" style={{border: '1px solid gray'}} width="800" />

## Example queries

### Logs for security

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
   <img src={useBaseUrl('img/search/copilot/cloud-siem-1.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="500" />
1. As soon as you do that, you can look at the **Suggestions** section on the right. These suggestions are curated based on their relevance to this Cloud SIEM source. You pick a suggestion to compare results to the last hour:
   ```
   Count logs by action. Sort the results. versus the previous 1h
   ```
   Notice the system translated the suggestion to a log query and rendered results as a bar graph with no user input. <br/><img src={useBaseUrl('img/search/copilot/cloud-siem-2.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
1. Switching to table view, you notice "Malicious” in the search results. So, you add in `Filter results by action contains Malicious` to the query:
   ```
   Count logs by action. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/copilot/cloud-siem-3.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
   :::note
   If `Malicious` doesn't work, try `Malicious*`. Sumo Logic is case sensitive.
   :::
1. Next, you look for URLs that pertain to the malicious action:
   ```
   Count logs by action, url, user. Sort the results. Filter results by action contains Malicious.
   ```
   <img src={useBaseUrl('img/search/copilot/cloud-siem-4.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="800" />
1. Even though the activity was blocked, you can investigate the affected users in the endpoint records next.

To summarize, you conclude there is malicious activity originating from certain users who need to be investigated further.

## Role Based Access Control

Role Based Access Control is not supported for contextual suggestions and autocompletions. It is possible for a user who is blocked by [log search RBAC](/docs/manage/users-roles/roles/construct-search-filter-for-role/) to view suggestions or completions for unpermitted source expressions. However, they will not be executed by the search.

## Search behavior and data tier access

Copilot follows the same search behavior as standard log search and respects your account’s data configuration, whether you're on classic tiered pricing or Flex pricing.

### Flex pricing

For customers on [Flex pricing](/docs/manage/partitions/flex), all data is stored in a single intelligent layer and pricing is based on the volume of data scanned.

### Tiered pricing (legacy)

If you're on [classic tiered pricing](/docs/manage/partitions/data-tiers/searching-data-tiers/), Copilot by default searches across continuous data tiers only, unless otherwise specified.

To direct Copilot to search the Infrequent tier, for example, use:

```sql
_dataTier=Infrequent
```

## FAQ

<details>
<summary>What is Sumo Logic Copilot?</summary>

Sumo Logic Copilot (also referred to as Sumo Logic Mo Copilot) is an AI assistant integrated into the Sumo Logic Log Analytics Platform. It enables natural language queries and contextual troubleshooting, helping users extract actionable insights from logs. Copilot does not process or share your log data with any third party.
</details>

<details>
<summary>Can I use Copilot to analyze unstructured logs?</summary>

Yes. Copilot can parse raw logs without FERs. It also supports semi-structured logs (JSON + unstructured payloads).
</details>

<details>
<summary>Does Copilot save search history?</summary>

Yes, Copilot retains conversation and search history, allowing you to resume investigations with context and continuity.
</details>

<details>
<summary>What role does AI play in Copilot?</summary>

Copilot uses AI to interpret natural language queries and recommend search results or query refinements, streamlining log analysis.
</details>

<details>
<summary>What specific types of customer data or PII does the AI process? Does it filter out PII/sensitive information?</summary>

Sumo Logic Copilot processes schema and field samples to provide context to the AI. While field values can contain PII or confidential data (for example, email addresses or IP addresses), these values are used solely to enable insights and are protected under strict compliance and security reviews.
</details>

<details>
<summary>Is customer data/PII used to train AI models?</summary>

No, customer data or PII is not used for training AI models. Copilot operates using a foundation model served via Amazon Bedrock, ensuring your data remains private and secure.
</details>

<details>
<summary>How long does the AI store customer information or PII, and when and how is it deleted?</summary>

Certain features may rely on query history stored on a rolling basis for performance optimization. Data is systematically expired to maintain privacy.

For example, our AI-driven alerts feature log anomaly detection and build ML models from 60 days of logs. To accomplish this, we retrain the model once a week. In this example, each week, we add one week of new data while expiring the oldest week of data. Rolling data windows are done to avoid fetching 60 days of data for every training run.
</details>

<details>
<summary>Does Sumo Logic Mo Copilot use any open-source library, GenAI providers, or cloud providers?</summary>

For Generative AI, Copilot uses a foundation model served by Amazon Bedrock. Classical ML features leverage open-source Python libraries approved by Sumo Logic.
</details>

<details>
<summary>What is the type of AI being used?</summary>

Sumo Logic Copilot is an ensemble of Generative AI (GenAI) and classical machine learning (ML) techniques. For example, classical ML is used for anomaly detection in AI-driven alerts.
</details>

<details>
<summary>Is there a human in the loop for Copilot?</summary>

Yes, the on-call developer or security engineer troubleshooting an incident is the expected user. They interact with Copilot using natural language questions or through contextual suggestions.
</details>

<details>
<summary>Does a fourth party have access to Copilot customer data?</summary>

No. The foundation model provider used by Amazon Bedrock has no access to customer data.
</details>

<details>
<summary>Do you hold any AI-specific certifications or accreditations?</summary>

No, Sumo Logic does not currently hold any AI-specific certifications or accreditations.
</details>

<details>
<summary>How are reviews conducted on the Copilot model?</summary>

Each major capability added to Copilot undergoes legal, compliance, and application security reviews. These reviews coincide with new releases that expand insights or process new types of data.
</details>

<details>
<summary>How can I opt out of Copilot?</summary>

If you prefer not to use Sumo Logic Copilot, please contact our [support team](https://support.sumologic.com/support/s/). Your account will be updated accordingly.
</details>


## Feedback

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon and entering the context of your query.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />

You can also leave feedback on specific errors.

<img src={useBaseUrl('img/search/copilot/feedback-error.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />

## Additional resources

* Blogs:
   * [Sumo Logic Mo Copilot: AI assistant for faster incident response and simplified troubleshooting](https://www.sumologic.com/blog/mo-copilot-ai-assistant/)
   * [Designing Sumo Logic Mo Copilot for success](https://www.sumologic.com/blog/designing-mo-copilot-success/)
   * [Differentiating Sumo Logic Mo Copilot using Amazon Bedrock](https://www.sumologic.com/blog/copilot-amazon-bedrock/)
* Brief: [Sumo Logic's Mo Copilot speeds up response](https://www.sumologic.com/brief/sumo-logics-mo-copilot-speeds-up-response/)
* Webinar: [Revolutionizing Incident Management with AI: Meet Mo Copilot](https://www.sumologic.com/webinar/revolutionizing-incident-management-with-ai-meet-mo-copilot/)
