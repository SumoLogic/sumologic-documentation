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

Sumo Logic Copilot is a new way to interact with logs in Sumo Logic. Copilot is an AI-based assistant that helps you get answers quickly from your logs. It allows you to ask questions in plain English and provides prebuilt insights, all without your having to write a log query. 

To access Copilot, click the Copilot tab. 


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
