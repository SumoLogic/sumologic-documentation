---
id: copilot
title: Sumo Logic Copilot - Feature Preview
sidebar_label: Copilot 🤖
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

:::info
This is a Preview release. To learn more, contact your Sumo Logic account executive.
:::

Sumo Logic Copilot is an AI-based assistant that streamlines log analysis insights by allowing you to ask questions in plain English and provides search suggestions, all without your having to write a log query.

In this document, you'll learn the recommended Copilot workflow as well as best practices.

<details>
<summary>Click here to watch a step-by-step video investigation using Copilot.</summary>

<!-- add micro lesson video when published-->

<Iframe url="https://player.vimeo.com/video/939372059?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        width="854px"
        height="480px"
        title="Copilot Demo"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


In the scenario depicted in the video, we leverage Copilot to investigate a security issue: AWS CloudTrail access keys being leaked outside an organization. Here's a recap:

1. First, we select the data source for AWS CloudTrail audit logs.
1. Launch our log investigation by clicking the AI-suggested insight `Count logs by eventname`, which translates the insight to a log query and renders results.
1. Refine query by applying the suggestion `Count logs by eventname, access key and sourceIp`.
1. Filter for Create and Authorize events, as attackers often create new resources during a breach. We find an anomaly with `AuthoritySecurityGroupIngress` events.
1. Provide feedback to enhance the AI's accuracy stating that the queries have been accurate so far.  
1. Add the security `groupid` to the prompt to tabulate events containing that data.
1. Focus on a specific access key, `ABCDEFGOYCM3PIKNOVRA`, noting `PutRolePolicy` events indicating permission elevation. Multiple AWS accounts are impacted.
1. We conclude that the access key was used to modify permissions, providing the attacker with a potential network entry point. Remediation would involve disabling the key, blocking the source IP, and further log analysis.
</details>

## Step 1: Open Copilot

To start using Copilot, navigate to the **Copilot** tab on the Sumo Logic home page.

<img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

## Step 2: Select a source category

Click **Select Source Category** - the source expression box - and type/select the data source of the log messages you want to investigate.

<img src={useBaseUrl('img/search/copilot/source-category.png')} alt="Copilot source category" style={{border: '1px solid gray'}} width="600" />

## Step 3: Execute a prompt

### Suggestions (recommended)

Under **Suggestions** > **Explore**, click on any of the prebuilt suggested prompts to start your investigation. For example:

<img src={useBaseUrl('img/search/copilot/explore.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

### Manual entry

:::tip
Because manually typing an AI prompt requires careful precision for optimal performance, we recommend clicking the prebuilt [Suggestions](#suggestions-recommended) prompts, which have been proven effective through extensive testing.
:::

In the **Ask Something...** field, enter a natural language query prompt similar to the ones under **Suggestions** > **Explore**.

You'll need to be very specific. Broad questions do not return good results. When your question is framed as a query about a small, well-defined problem, Copilot answers more accurately.

:::note
If the statement in the **Ask Something...** field can't be translated into a query, this field will say "Failed translation".
:::

## Step 4: Refine your investigation

After executing a prompt, you'll see your current investigation summarized in plain text in the **Ask Something...** field. You can use these natural language query prompt ideas to launch and/or refine investigations.

Optionally, follow any of the below steps to refine your search.

### Refine

Click any of the **Suggestions** > **Refine** prompts to apply suggested refinements to your existing investigation.

<img src={useBaseUrl('img/search/copilot/refine.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="600" />

#### Progressive refinement

As a best practice, start with a simple prompt, verify the query translation, and refine it gradually. For example:

1. Initial prompt. `Count of logs grouped by type`.
1. Refinement. `Count of logs grouped by type, reason, kind, name`.
1. Next refinement. `Count of logs grouped by type, reason, kind, name. Filter Logs where reason is FailedScheduling`.
1. Further refinement. `Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. Filter logs that contain redis-cluster in name. Sort the results by count`.

:::tip
Express your chain of thought to the AI by breaking up the prompt into smaller problems that the AI can answer more accurately.
:::

### Edit query code

If needed, you can edit your log search query code.

1. Click **Show Log Query** to show the current investigation as a log query.<br/><img src={useBaseUrl('img/search/copilot/show-hide-query.gif')} alt="Copilot time period" style={{border: '1px solid gray'}} width="500" />
1. Click in the code editor field and edit your search. Not familiar with Sumo Logic query language? See [Search Query Language](/docs/search/search-query-language) to learn more.<br/><img src={useBaseUrl('img/search/copilot/code-editor.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />
   :::note JSON formatting
   If your log query contains a mix JSON and non-JSON formatting, add `{` to the source expression to trigger **Suggestions**.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />
   :::
1. When you're done, click the **Play** icon.<br/><img src={useBaseUrl('img/search/copilot/play.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="700" />

:::warning Limitations
Copilot supports querying JSON logs only. You cannot use Copilot to query unstructured data, metrics, or traces.
:::

### Chart type

Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view, to visualize your results.

<img src={useBaseUrl('img/search/copilot/chart-types.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="300" />

### Time range

1. Click the clock icon and select your desired time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="400" />
1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="250" />

### Feedback

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon. Optionally, you can also enter more context and information.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="200" />


## Step 5: Open in Log Search

Click the **Open in Log Search** icon (insert pic), which will copy your query from Copilot over to a new Log Search, allowing you to utilize all of Sumo's search functionality. You can continue investigating, save the search, and remediate.

<img src={useBaseUrl('img/search/copilot/open-in-log-search.png')} alt="Copilot open in log search" style={{border: '1px solid gray'}} width="400" />

If you'd like to start over and begin a new investigation, click the **New Conversation** icon.<br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="275" />
