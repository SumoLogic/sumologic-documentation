---
id: intro-to-copilot
title: Introduction to Sumo Logic Copilot
sidebar_label: Intro to Sumo Logic Copilot
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Copilot is an AI-based assistant that helps you get answers quickly from your logs. It allows you to ask questions in plain English and provides search suggestions, all without your having to write a log query. 

## Access Copilot

To start using Sumo Logic Copilot, click the Copilot tab at the top of the Sumo Logic main page.

<img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

## Copilot UI

### Initial screen

<img src={useBaseUrl('img/search/copilot/copilot-initial-screen.png')} alt="Copilot initial screen" style={{border: '1px solid gray'}} width="800" />

1. **Select Source Category**. Select the source of the log messages you want to investigate. 
1. **Ask Something...** Type a phrase to initiate an investigation. 
1. **Suggestions**. Choose from the listed ideas for investigation. 
1. **Time range**. The time range to use for the investigation. The default is the last 24 hours.
1. **Execute**. Launches the investigation. 
1. **New Conversation**. Start a new investigation.

### During an investigation

<img src={useBaseUrl('img/search/copilot/copilot-during-search.png')} alt="Copilot during a search" style={{border: '1px solid gray'}} width="800" />

1. **Summary**. The current investigation summarized in plain text. ("Failed translation" appears here if the statement in the **Ask Something** field can't be translated into a query.)
1. **Show Log Query / Hide Log Query**. Show the current investigation as a log query, or hide the query.
1. **Open in Log Search**. Open the current investigation in a separate Log Search window. This allows you to save the search and perform all other actions available for log searches.
1. **Select chart**. Select the chart style to visualize results.
1. **Suggestions**:
   * **Refine**. Suggested refinements to your existing investigation.
   * **Explore**. New ideas for investigation.

## Best practices

For the best results, choose one of the following strategies.

* **Explore**

    Select a prebuilt suggestion in the **Explore** section, click **Show Log Query**, and edit the query. 

* **Refine**

    Watch the **Refine** section. If Copilot is able to list refinements useful for your investigation, select one rather than type a new prompt.

* **Ask Something**

    Type your question into the **Ask Something** field, but keep it very specific. Broad questions do not return good results. When your question is framed as a query about a small, well-defined problem, Copilot answers more accurately.

* **Progressive refinement**

    Start from a simple prompt, verify the query translation, and refine it gradually. For example:
       1. Initial prompt: "Count of logs grouped by type".
       1. Refinement: Count of logs grouped by type, reason, kind, name.
       1. Next refinement: Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. 
       1. Further refinement: Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling.Filter logs that contain redis-cluster in name. Sort the results by count.

## Restrictions

Copilot supports querying JSON logs only. You cannot use Copilot to query unstructured data, metrics, or traces.