---
id: copilot
title: Sumo Logic Copilot - Feature Preview
sidebar_label: Copilot 🤖
description: Streamline your log analysis with Sumo Logic Copilot, our AI-based assistant designed to simplify log analysis by allowing you to ask questions in plain English and providing search suggestions without the need to write log queries.
keywords:
  - copilot
  - artificial intelligence
  - ai
  - machine learning
  - ml
---

<head>
  <meta name="robots" content="noindex" />
</head>

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href="/docs/beta"><span className="beta">Preview Release</span></a></p>
This is a Preview release. To learn more, contact your Sumo Logic account executive.

Sumo Logic Copilot is an AI-powered assistant that simplifies log analysis by allowing you to ask questions in plain English and get intelligent search suggestions—eliminating the need to manually write complex log queries.

With its intuitive interface, Copilot automatically generates log searches from natural language prompts, helping you quickly detect performance issues, anomalies, and security threats. It guides you through investigations step-by-step with AI-driven suggestions to refine your results for faster, more accurate resolutions. By providing precise answers and faster resolutions, Copilot enhances your log analysis process with expert-level insights to accelerate root cause identification and empower informed decisions.

### Key features

Copilot reduces manual effort by combining prebuilt insights with natural language query analysis.

* **AI-curated insights**. Get customized insights tailored to your data.
* **Natural language queries**. Ask questions in plain English—no need to enter query syntax.
* **Prebuilt insights**. Utilize prebuilt insights to accelerate your workflow.
* **Root cause analysis**. Quickly identify the root cause of issues with AI assistance.
* **Increased efficiency**. Streamline the log analysis process, minimizing manual tasks.

### Who benefits from Copilot?

Copilot is ideal for:

* **On-call engineers**. Accelerate time to resolution by surfacing key application insights.
* **Security engineers**. Obtain security insights rapidly for faster threat detection.

## How to use Copilot

In this section, you'll learn the recommended workflow for using Copilot effectively, along with best practices to maximize its benefits.

### Step 1: Open Copilot

To start using Copilot:

From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), navigate to the **Copilot** tab on the Sumo Logic home page.<br/><img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="200" />

From the [**New UI**](/docs/get-started/sumo-logic-ui), click **Copilot** in the left nav.<br/><img src={useBaseUrl('img/search/copilot/copilot-tab-new.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="150" />

### Step 2: Select a source category

Click **Select Source Category** - the source expression box - and type/select the data source of the log messages you want to investigate. In this example, we'll select a source for AWS WAF.

<img src={useBaseUrl('img/search/copilot/source-category.png')} alt="Copilot source category" style={{border: '1px solid gray'}} width="600" />

### Step 3: Execute an Explore prompt

Click on any of the prebuilt **Suggestions** > **Explore** prompts to launch your investigation. These AI-curated natural language insights are customized for the specific data source you've chosen.

In this example, we'll click `Count the number of log entries by the collector ID`. This translates the insight to a log query and renders results.

<img src={useBaseUrl('img/search/copilot/explore.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

<br/><br/>

<details>
<summary>Manual entry (not recommended)</summary>

In the **Ask Something...** field, you can manually enter a natural language prompt similar to the prebuilt ones under **Suggestions** > **Explore**. Because manually typing an AI prompt requires careful precision for optimal performance, we recommend sticking with the prebuilt prompts.

<img src={useBaseUrl('img/search/copilot/manual-entry.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

You'll need to be very specific. Broad questions do not return good results. When your question is framed as a query about a small, well-defined problem, Copilot answers more accurately. If your statement cannot be translated into a query, this field will say "Failed translation".

Express your chain of thought to the AI by breaking up your prompt into smaller problems that the AI can answer more accurately.<br/><img src={useBaseUrl('img/search/copilot/copilot-periods.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />
</details>

### Step 4: Refine your investigation

After running a prompt, your current investigation will be summarized in plain text in the **Ask Something...** field. Under **Suggestions** > **Refine**, you'll find AI-driven natural language prompt ideas to further narrow your investigation so you can quickly identify attacker tactics, techniques, and procedures (TTPs).

For best results, start with a simple prompt, verify the query translation, and then gradually refine your investigation by applying the **Refine** suggestions.

We'll build on the prompt from the previous step, `Count the number of log entries by the collector ID`.

1. To refine your search for log anomalies, click the **Refine** option outlined in red, `Count the number of log entries by the collector ID. Sum _collectorid by _count`.<br/><img src={useBaseUrl('img/search/copilot/refine1.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="800" />
1. After the first refinement, you'll see both the prompt and query code updated. Continue to narrow down your results by clicking option `Count the number of log entries by the collector ID. Sum _collectorid by _count. Standard deviation of _count by _sum`.<br/><img src={useBaseUrl('img/search/copilot/refine2.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="800" />
1. The prompt and query code are updated with the second refinement. Next, click the **Refine** option `Count the number of log entries by the collector ID. Sum _collectorid by _count. Standard deviation of _count by _sum. Last _stddev by _sum`.<br/><img src={useBaseUrl('img/search/copilot/refine3.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="800" />
1. After the third refinement, the prompt now reads `Count the number of log entries by the collector ID. Sum _collectorid by _count. Standard deviation of _count by _sum. Last _stddev by _sum`.<br/><img src={useBaseUrl('img/search/copilot/refine4.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="800" /><br/>You can continue to refine and/or configure further settings below.

#### Time range

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="250" />

#### Chart type

Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view to visualize your results. You can also click **Add to Dashboard** to export an AI-generated dashboard for root cause analysis.

<img src={useBaseUrl('img/search/copilot/chart-types.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="500" />

#### Edit query code

You can manually edit your log search query code if needed.

<details>
<summary>JSON Syntax Rules</summary>

* Copilot supports querying JSON logs only. It cannot be used to query unstructured data, metrics, or traces. To retrieve a list of `_sourceCategories` with JSON data, use the following query:
   ```sql
   _sourceCategory=* "{" "}"
   | limit 10000 | logreduce keys noaggregate
   | count by _sourceCategory, _schema
   | where _schema != "unknown"
   | sum(_count) by _sourceCategory
   ```
* If your log query contains a mix JSON and non-JSON formatting (i.e., a log file is partially JSON), you can isolate the JSON portion by adding `{` to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />
</details>

1. Click in the code editor field and edit your search. Not familiar with Sumo Logic query language? See [Search Query Language](/docs/search/search-query-language) to learn more.<br/><img src={useBaseUrl('img/search/copilot/code-editor.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. When you're done, press Enter or click the search button.<br/><img src={useBaseUrl('img/search/copilot/play.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />

:::tip
To save space, you can use the **Hide Log Query** icon to collapse the log query code.<br/><img src={useBaseUrl('img/search/copilot/show-hide-query.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
:::

#### Recent history

To view your recent prompts from your current session, click the recent history icon.<br/><img src={useBaseUrl('img/search/copilot/recent-history.png')} alt="recent-history.png" style={{border: '1px solid gray'}} width="700" />


#### History

To view your entire prompt history across all conversations, click **History**.<br/><img src={useBaseUrl('img/search/copilot/history.png')} alt="Copilot History" style={{border: '1px solid gray'}} width="700" />

#### New Conversation

To start over and begin a new investigation, click **New Conversation**. <br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="700" />


### Step 5: Open in Log Search

Click the **Open in Log Search** icon, which will copy your query from Copilot over to a new log search, allowing you to utilize all of Sumo Logic's search functionality. You can continue investigating, save the search, and remediate.

<img src={useBaseUrl('img/search/copilot/open-in-log-search.png')} alt="Copilot open in log search" style={{border: '1px solid gray'}} width="600" />



## Example queries

### Observability

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

You are a SecOps engineer who uses [Cloud SIEM](/docs/cse/). You are worried about a signal in Cloud SIEM regarding malicious network activity. Rather than wait for 14 days for an Insight to trigger, you want to investigate network records and be proactive. You are under pressure to complete your investigation quickly. While familiar with Sumo Logic, you do not write log queries every day and could use a little help. Fortunately, all your Cloud SIEM records are in Sumo Logic.

1. In Copilot, you type the source for Cloud SIEM network records:
   ```
   * _index=sec_record_network
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
1. Switching to table view, you notice “Malicious” in the search results. So, you add in `Filter results by action contains Malicious` to the query:
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

## Feedback

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon and entering the context of your query.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />

You can also leave feedback on errors.

<img src={useBaseUrl('img/search/copilot/feedback-error.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="800" />
