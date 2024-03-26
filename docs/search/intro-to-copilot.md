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

Copilot is an AI-based assistant that helps you get answers quickly from your logs. It allows you to ask questions in plain English, and provides search suggestions, all without your having to write a log query. 

To start using Copilot, click the Copilot <img src={useBaseUrl('img/search/copilot/copilot-logo.png')} alt="Copilot logo" width="25" /> tab at the top of the Sumo Logic page:  
<img src={useBaseUrl('img/search/copilot/copilot-tab.png')} alt="Copilot tab" style={{border: '1px solid gray'}} width="250" />

## Copilot UI

### Initial screen

<img src={useBaseUrl('img/search/copilot/copilot-initial-screen.png')} alt="Copilot initial screen" style={{border: '1px solid gray'}} width="800" />

1. **Select Source Category**. Select the source of the log messages you want to search. 
1. **Ask Something...** Type a search that you want to perform. 
1. **Suggestions**. Choose from the provided suggestions. For example, under **Explore**, select ideas for searching.
1. **Time range**. The time range of the search. The default is the last 24 hours.
1. **Run search**. Executes the search. 
1. **New Conversation**. Start a new search.

### During a search

<img src={useBaseUrl('img/search/copilot/copilot-during-search.png')} alt="Copilot during a search" style={{border: '1px solid gray'}} width="800" />

1. **Search summary**. The search summarized in plain text.
1. **Show Log Query / Hide Log Query**. Show the log query resulting from the text summary, or hide it from view.
1. **Open in Log Search**. Open the log query in a separate Log Search window. This allows you to save the search and perform all actions available for log searches.
1. **Select chart**. Select the chart style to visualize search results.
1. **Suggestions**:
   * **Refine**. Suggested search refinements.
   * **Explore**. New ideas for searching.

## Best practices

This section outlines techniques to extract the most relevant responses from Copilot.

* Start from a prebuilt suggestion and edit it. 
* Progressive refinement. Start from a simple prompt, verify the query translation and refine it gradually. For example:
   1. Initial prompt (pre-built suggestion) Count of logs grouped by type
   1. Refinement 1: Count of logs grouped by type, reason, kind, name
   1. Refinement 2: Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. 
   1. Refinement 3: Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling. 
   1. Refinement 4: Count of logs grouped by type, reason, kind, name. Filter logs where reason is FailedScheduling.Filter logs that contain redis-cluster in name. Sort the results by count.
* Express your chain of thought to the AI. To assist with progressive refinement, break up the prompt into smaller problems that the AI can answer more accurately. 
* Watch the **Refine** section on the page, if the system is able to anticipate refinements you have in mind. If so, click on the refinements rather than typing the next prompt.
