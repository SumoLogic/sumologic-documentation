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

Sumo Logic Copilot is an AI-based assistant designed to simplify log analysis by allowing you to ask questions in plain English and providing search suggestions without the need to write log queries.

### Key features

* **AI-curated insights**. Get customized insights tailored to your data.
* **Natural language queries**. Ask questions in plain English.
* **Pre-built insights**. Utilize pre-built insights to accelerate your workflow.
* **Root cause analysis**. Quickly identify the root cause of issues with AI assistance.

### Who benefits from Copilot?

Copilot is ideal for:

* **On-call engineers**. Accelerate time to resolution for application insights.
* **Security engineers**. Quickly obtain security insights.

### How Copilot helps

Copilot combines pre-built insights with the ability to ask questions of your logs in natural English, helping you to:

* **Find root causes faster**. Use AI to quickly pinpoint issues.
* **Enhance efficiency**. Streamline the log analysis process.


## Sample Copilot queries

<!-- add micro lesson video when published-->
<!-- replace with https://www.youtube.com/watch?v=QrRvN2Bg4NY ? -->

In the scenario depicted in the video, Copilot is leveraged to investigate a security issue where it appears AWS CloudTrail access keys were leaked outside an organization.

<Iframe url="https://player.vimeo.com/video/939372059?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        width="854px"
        height="480px"
        title="Copilot Demo"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

To recap the steps taken:

1. First, the data source is selected for AWS CloudTrail audit logs.
1. Launch the log investigation by clicking the AI-suggested insight `Count logs by eventname`, which translates the insight to a log query and renders results.
1. The query is refined by applying the suggestion `Count logs by eventname, access key and sourceIp`.
1. The filter is applied for Create and Authorize events; attackers often create new resources during a breach. You'll then see an anomaly with `AuthoritySecurityGroupIngress` events.
1. Feedback is provided back to Sumo Logic to enhance the AI's accuracy stating that the queries have been accurate so far.  
1. The security `groupid` is added to the prompt to tabulate events containing that data.
1. Focus on a specific access key, `ABCDEFGOYCM3PIKNOVRA`, noting `PutRolePolicy` events indicating permission elevation. Multiple AWS accounts are impacted.

You can conclude that the access key was used to modify permissions, providing the attacker with a potential network entry point. Remediation would involve disabling the key, blocking the source IP, and further log analysis.

<!--
### Security example

This video demonstrates how to use Copilot to analyze AWS CloudTrail data by reviewing AI-curated suggestions, refining searches with natural language prompts, and launching an AI-generated dashboard for root cause analysis and sharing.

<Iframe url="https://www.youtube.com/embed/QrRvN2Bg4NY?si=Bsc2mRbqMPq8bsqg"
        width="854px"
        height="480px"
        title="Copilot Demo"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

Here's a recap:

1. **Select AWS CloudTrail**. Start by selecting AWS CloudTrail as the data source.
1. **Review Suggestions**. Look at the **Suggestions** section where AI-curated natural language insights are provided, customized for the specific AWS CloudTrail data.
1. **Select a Suggestion**. Choose the suggestion `Count logs by eventname`.
1. **Refine Search**. Enhance your search for log anomalies by adding `access key and sourceIp` to the prompt. No need to edit the query code.
1. **Filter Results**. Narrow down the results by adding `eventname contains Create` to the prompt.
1. **Review Recommendations**. Quickly review AI-driven recommendations to identify attacker TTPs (Tactics, Techniques, and Procedures).
1. **Launch Dashboard**. Launch an AI-generated dashboard directly from the UI for root cause analysis.
-->

## How to use Copilot

In this section, you'll learn the recommended workflow for using Copilot effectively, along with best practices to maximize its benefits.

### Step 1: Open Copilot

To start using Copilot, navigate to the **Copilot** tab on the Sumo Logic home page.

<img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="200" />

### Step 2: Select a source category

Click **Select Source Category** - the source expression box - and type/select the data source of the log messages you want to investigate.

<img src={useBaseUrl('img/search/copilot/source-category.png')} alt="Copilot source category" style={{border: '1px solid gray'}} width="600" />

### Step 3: Execute a prompt

#### Suggestions (recommended)

Under **Suggestions** > **Explore**, click on any of the prebuilt suggested prompts to start your investigation. For example:

<img src={useBaseUrl('img/search/copilot/explore.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

#### Manual entry

:::tip
Because manually typing an AI prompt requires careful precision for optimal performance, we recommend clicking the prebuilt [Suggestions](#suggestions-recommended) prompts, which have been proven effective through extensive testing.
:::

In the **Ask Something...** field, enter a natural language query prompt similar to the ones under **Suggestions** > **Explore**.

You'll need to be very specific. Broad questions do not return good results. When your question is framed as a query about a small, well-defined problem, Copilot answers more accurately.

:::note
If the statement in the **Ask Something...** field can't be translated into a query, this field will say "Failed translation".
:::

### Step 4: Refine your investigation

After executing a prompt, you'll see your current investigation summarized in plain text in the **Ask Something...** field. You can use these natural language query prompt ideas to launch and/or refine investigations.

Optionally, follow any of the below steps to refine your search.

#### Refine

Click any of the **Suggestions** > **Refine** prompts to apply suggested refinements to your existing investigation.

<img src={useBaseUrl('img/search/copilot/refine.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

##### Progressive refinement

As a best practice, start with a simple prompt, verify the query translation, and refine it gradually. For example:

1. Initial prompt. `Count of logs grouped by type`.
1. Refinement. `Count of logs grouped by type, reason, kind, name`.
1. Next refinement. `Count of logs grouped by type, reason, kind, name. Filter Logs where reason is FailedScheduling`.
1. Further refinement. `Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. Filter logs that contain redis-cluster in name. Sort the results by count`.

:::tip

<details>
<summary>Express your chain of thought to the AI by breaking up your prompt into smaller problems that the AI can answer more accurately. Click here to see an example.</summary>

<img src={useBaseUrl('img/search/copilot/copilot-periods.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />

</details>

:::

#### Edit query code

If needed, you can edit your log search query code.

1. Click **Show Log Query** to show the current investigation as a log query.<br/><img src={useBaseUrl('img/search/copilot/show-hide-query.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. Click in the code editor field and edit your search. Not familiar with Sumo Logic query language? See [Search Query Language](/docs/search/search-query-language) to learn more.<br/><img src={useBaseUrl('img/search/copilot/code-editor.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />
   :::note JSON formatting
   If your log query contains a mix JSON and non-JSON formatting, add `{` to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />
   :::
1. When you're done, click the **Play** icon.<br/><img src={useBaseUrl('img/search/copilot/play.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />

   :::warning Limitations
   Copilot supports querying JSON logs only. You cannot use Copilot to query unstructured data, metrics, or traces. To get a list of `_sourceCategories` with JSON data, use the below query:
   ```
   _sourceCategory=* "{" "}"
   | limit 10000 | logreduce keys noaggregate
   | count by _sourceCategory, _schema
   | where _schema != "unknown"
   | sum(_count) by _sourceCategory
   ```
   :::

#### Chart type

Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view, to visualize your results.

<img src={useBaseUrl('img/search/copilot/chart-types.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="300" />

#### Time range

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="400" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="250" />

### Step 5: Open in Log Search

Click the **Open in Log Search** icon (insert pic), which will copy your query from Copilot over to a new Log Search, allowing you to utilize all of Sumo Logic's search functionality. You can continue investigating, save the search, and remediate.

<img src={useBaseUrl('img/search/copilot/open-in-log-search.png')} alt="Copilot open in log search" style={{border: '1px solid gray'}} width="400" />

If you'd like to start over and begin a new investigation, click the **New Conversation** icon.<br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="275" />

## Copilot example for Cloud SIEM

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

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon. Optionally, you can also enter more context and information.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="200" />
