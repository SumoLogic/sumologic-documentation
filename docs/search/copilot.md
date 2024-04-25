---
id: copilot
title: Sumo Logic Copilot
sidebar_label: Copilot
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Copilot is an AI-based assistant that streamlines log analysis insights by allowing you to ask questions in plain English and provides search suggestions, all without your having to write a log query.

Sumo Logic Copilot is an AI-based assistant designed to streamline log analysis by offering insights and suggestions in natural language.

In this document, you'll learn the recommended Copilot workflow as well as best practices.

## Step 1: Access Copilot

To start using Copilot, navigate to the **Copilot** tab on the Sumo Logic home page.

<img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

## Step 2: Select a source category

Click **Select Source Category** and select the data source of the log messages you want to investigate. This field is also called the source expression box. In this example, we've chosen from the Sumo Logic Labs Docker Enterprise Edition source.

## Step 3: Execute a prompt

AI prompts require careful precision for optimal performance. Rather than manually inputting a query, we recommend using the [**Suggestions** prompt ideas](#suggestions-recommended), which have been proven effective through extensive testing.

### Suggestions (recommended)

Under **Suggestions** > **Explore**, click on any of the suggested prompts to refine your investigation. You'll then see that prompt populate in the **Ask Something...** field. You can use these natural language query prompt ideas to launch and/or refine investigations.

### Manual entry

In the **Ask Something...** field, enter a natural language query prompt similar to the ones under **Suggestions** > **Explore**.

## Step 4: Refine your investigation (optional)

After executing a prompt, you'll see the current investigation summarized in plain text.
:::note
If the statement in the **Ask Something** field can't be translated into a query, this field will say "Failed translation".
:::

Optionally, follow any of the below steps to refine your search.

* Click **Show Log Query** or **Hide Log Query** to show the current investigation as a log query, or hide the query.
* Click **Suggestions** > **Refine** to apply suggested refinements to your existing investigation.
* Under **Suggestions** > **Explore**, you'll find new ideas for investigation.
* Edit your search query code:
   1. Click the code editor field and edit your search. Not familiar with Sumo Logic query language? See [Search Query Language](/docs/search/search-query-language) to learn more.
   1. Click the **Play** icon.
* Select your preferred chart type, such as **Table**, **Bar**, **Column**, or **Line** view, to visualize your results<br/><img src={useBaseUrl('img/search/copilot/chart-types.png')} alt="Copilot chart types" style={{border: '1px solid gray'}} width="300" />
* Select your desired time range. The default value is last 24 hours.
   1. Click the clock icon and select a new time range from the dropdown.<br/><img src={useBaseUrl('img/search/copilot/time-period.png')} alt="Copilot time period" style={{border: '1px solid gray'}} width="400" />
   1. Click the search button.<br/><img src={useBaseUrl('img/search/copilot/search-button.png')} alt="Copilot search button" style={{border: '1px solid gray'}} width="300" />

## Step 5: Open in Log Search

Click the **Open in Log Search** icon (insert pic), which will copy your query from Copilot over to a new Log Search, allowing you to utilize all of Sumo's search functionality to continue investigating and save the search.

To clear your search criteria and start a new investigation, click the **New Conversation** icon.<br/><img src={useBaseUrl('img/search/copilot/new-conversation.png')} alt="Copilot new conversation" style={{border: '1px solid gray'}} width="300" />


## Best practices

For the best results, choose one of the following strategies.

* **Explore**. Select a prebuilt suggestion in the **Explore** section, click **Show Log Query**, and edit the query.
* **Refine**. Watch the **Refine** section. If Copilot is able to list refinements useful for your investigation, such as time comparisons, click on the refinements rather than manually typing a new prompt.
* **Ask Something**. When manually entering a query into the **Ask Something** field, be very specific. Broad questions do not return good results. When your question is framed as a query about a small, well-defined problem, Copilot answers more accurately.
* Log Query field. For log formats that mix JSON and non-JSON, add `{` to the source expression to trigger Suggestions.<br/><img src={useBaseUrl('img/search/copilot/copilot-json.png')} alt="Copilot JSON formatting" style={{border: '1px solid gray'}} width="350" />
* **Progressive refinement**. Start from a simple prompt, verify the query translation, and refine it gradually. For example:
   1. Initial prompt. "Count of logs grouped by type".
   1. Refinement. Count of logs grouped by type, reason, kind, name.
   1. Next refinement. Count of logs grouped by type, reason, kind, name. Filter Logs where reason is FailedScheduling.
   1. Further refinement. Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. Filter logs that contain redis-cluster in name. Sort the results by count.
   :::tip
   Express your chain of thought to the AI by breaking up the prompt into smaller problems that the AI can answer more accurately.
   :::

## Limitations

Copilot supports querying JSON logs only. You cannot use Copilot to query unstructured data, metrics, or traces.

## Feedback

We want your feedback! Let us know what you think by clicking the thumbs up or thumbs down icon. Optionally, you can also enter more context and information.

<img src={useBaseUrl('img/search/copilot/feedback-thumbs.png')} alt="Copilot feedback icons" style={{border: '1px solid gray'}} width="250" />
