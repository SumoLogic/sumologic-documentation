---
id: mobot-sidebar-preview
title: Mobot Sidebar
description: Use the Mobot sidebar to ask questions and create, analyze, and debug dashboards, queries, monitors, and more from any page without losing your place.
keywords:
  - mobot
  - mobot sidebar
  - dojoai
  - ai assistant
  - sidebar
  - page context
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

The Mobot sidebar brings [Mobot](/docs/search/mobot) to the page you are already working on. Instead of switching to a separate chat window and copying queries, errors, and screen details into it, you open Mobot beside your work. Mobot sees the page you are on and can use that context to answer your questions.

<!--TODO: Add a screenshot of the sidebar open next to a page (for example, a dashboard) with the Mobot icon in the top nav bar visible. Save to static/img/search/mobot/.-->

With the sidebar, you can:

* **Keep your place**. Ask Mobot about the page in front of you without leaving it.
* **Use page context automatically**. Mobot starts with the context of your current page, such as the dashboard you are viewing.
* **Work with Sumo Logic resources directly**. Mobot has more than 60 native tools that can analyze, create, and debug resources such as dashboards, queries, monitors, field extraction rules (FERs), and collectors.

## Open the sidebar

1. Click the **Mobot** icon in the top nav bar on any page.
1. Type a question in the **Ask Something** field and press Enter or click the send button.

<!--TODO: Confirm the Mobot icon is available on every page or only on a subset of pages during Public Preview.-->

Mobot runs the analysis and returns the results, including the queries it ran and a summary of what it found, in the sidebar.

For example, while viewing a dashboard of Amazon Bedrock AgentCore gateway metrics, you ask `Why do invocations drop on Nov 8th?` Mobot queries the invocations metric around that date, shows hourly invocation counts in a table, and explains that the drop reflects a weekend traffic pattern rather than an outage.

## Page context

Mobot uses the page you are on as context for your conversation. A **Context** chip at the bottom of the sidebar, above the question field, shows what Mobot is using, for example **Dashboard**.

To stop Mobot from using the page as context, click the **X** on the chip.

<!--TODO: Confirm which pages provide context and what the chip shows for each (for example Dashboard, Log Search, Monitors). Confirm whether the context is re-attached when you move to a different page during a conversation.-->

## Manage conversations

The top of the sidebar shows the title of the current conversation, with controls to:

* View your conversation history.
* Start a new conversation.
* Expand the sidebar.
* Close the sidebar.

<!--TODO: Confirm the labels and exact behavior of each control (the menu icon, the plus icon, the expand icon). Confirm whether a conversation continues if you close the sidebar or move to another page.-->

## What Mobot can do from the sidebar

Mobot can use its native tools to work with Sumo Logic resources, including:

* Dashboards
* Queries
* Monitors
* Field extraction rules (FERs)
* Collectors

<!--TODO: Confirm the user-facing list of what Mobot can analyze, create, and debug. Confirm whether the same human-in-the-loop confirmation before creating or changing content applies as in the Mobot full page. See /docs/search/mobot#create-and-manage-content.-->

## Limitations

<!--TODO: Add known limitations for Public Preview (for example, unsupported pages, features available only in the full Mobot page, and permissions behavior) once confirmed with the Product team.-->

## FAQ

### How is the sidebar different from the Mobot page?

<!--TODO: Confirm. Draft: Both use the same Mobot assistant. The sidebar stays open beside the page you are working on and uses that page as context, so you do not need to copy information into a separate chat window.-->

### Can I turn off Mobot?

Yes. Contact your Sumo Logic account team or open a support ticket to opt out, the same way you can for other DojoAI capabilities. See [Can I opt out of AI features?](/docs/get-started/ai-machine-learning/#can-i-opt-out-of-ai-features)

## Additional resources

* [Sumo Logic Mobot](/docs/search/mobot). Learn how Mobot answers log questions and how-to questions.
* [Mobot Example Prompts](/docs/search/mobot/example-prompts). Find starting points grouped by task.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). See how Mobot fits alongside the DojoAI agents.
