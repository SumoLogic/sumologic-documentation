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

With the sidebar, you can:

* **Keep your place**. Ask Mobot about the page in front of you without leaving it.
* **Use page context automatically**. Mobot starts with the context of your current page, such as the dashboard you are viewing.
* **Work with Sumo Logic resources directly**. Mobot has more than 60 native tools that can analyze, create, and debug resources such as dashboards, queries, monitors, field extraction rules (FERs), and collectors.

## Open the sidebar

1. Click **Ask Mobot** in the top nav bar on any page.
1. Type a question in the **Ask Something** field and press Enter or click the send button.

Mobot runs the analysis and returns the results, including the queries it ran and a summary of what it found, in the sidebar.

For example, while viewing a dashboard of Amazon Bedrock AgentCore gateway metrics, you ask `Why do invocations drop on Nov 8th?` Mobot queries the invocations metric around that date, shows hourly invocation counts in a table, and explains that the drop reflects a weekend traffic pattern rather than an outage.

## Page context

Mobot uses the page you are on as context for your conversation. Every page provides context, though the depth of what Mobot can do may differ by page. A **Context** chip at the bottom of the sidebar, above the question field, shows the name of the page Mobot is using, for example **Dashboard**.

To stop Mobot from using the page as context, click the **X** on the chip.

When you move to another page:

* **In an ongoing conversation**, the context changes to the new page, and the chip updates. The conversation history from the previous page carries over, so Mobot has the context of both pages.
* **To start fresh on the new page**, start a new conversation and select the agent you want to use.

## Manage conversations

The top of the sidebar shows the title of the current conversation, with controls to:

* View your conversation history.
* Start a new conversation.
* Expand the sidebar.
* Close the sidebar.

## What Mobot can do from the sidebar

Mobot can use its native tools to work with Sumo Logic resources on any page, including:

* Dashboards
* Queries
* Monitors
* Field extraction rules (FERs)
* Collectors

Mobot asks for the same confirmation before creating content as it does on the Mobot page. After Mobot creates or changes content from the sidebar, refresh the page to see the updated content.

## FAQ

### How is the sidebar different from the Mobot page?

Both use the same agent architecture. The sidebar stays open beside the page you are working on and uses that page as context, so you do not need to copy information into a separate chat window.

In the sidebar and on the Mobot page, use the agent selector at the bottom right of the question field to choose who you talk to:

* Mobot, as a personal assistant.
* A Dojo Studio agent, such as the SOC Analyst Agent, Root Cause Agent, or a custom agent.

### Can I turn off Mobot?

Yes. Contact your Sumo Logic account team or open a support ticket to opt out, the same way you can for other DojoAI capabilities. See [Can I opt out of AI features?](/docs/get-started/ai-machine-learning/#can-i-opt-out-of-ai-features)

## Additional resources

* [Sumo Logic Mobot](/docs/search/mobot). Learn how Mobot answers log questions and how-to questions.
* [Mobot Example Prompts](/docs/search/mobot/example-prompts). Find starting points grouped by task.
* [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning). See how Mobot fits alongside the DojoAI agents.
