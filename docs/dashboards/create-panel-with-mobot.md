---
id: create-panel-with-mobot
title: Create Dashboard Panels with Mobot
sidebar_label: Create Panels with Mobot
description: Create dashboard panels in Mobot from plain-language prompts, without configuring panels manually.
keywords:
  - mobot
  - dashboard
  - panel
  - dojo ai
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can create dashboard panels directly from plain-language prompts in [Mobot](/docs/search/mobot), Sumo Logic's conversational AI assistant, instead of configuring panels manually. Type a description of the panel you want into Mobot, and it finds a relevant data source, drafts the query, picks a visualization type, and adds the panel to a new or existing dashboard after you confirm.

Mobot supports logs panels only, not metrics panels, and can create multiple panels from a single prompt. It creates new panels only; it cannot update an existing panel.

## Which panel types and visualizations are supported?

Mobot supports logs panels only.

| Panel type | Supported |
| :-- | :-- |
| Logs | Yes |
| Metrics | No |

For logs panels, Mobot can create the following visualization types:

- **Standard**. Line, Pie, Bar, Column, Table, and Area charts.
- **Advanced**. Time Series, Geographic Maps, Sankey, Honeycomb, and Box Plot charts.
- **Distribution and summary**. Single Value, Gauge, and Heatmap charts.

## How to create a panel with Mobot

1. Open [Mobot](/docs/search/mobot) and type a description of the panel you want directly into the chat. For example:<br/>`Add a panel showing request count by geo location on a map.`
1. Mobot looks up a relevant data source or existing query, then shows you a breakdown of the source, parsing, aggregation, and visualization it plans to use, along with the draft query.
1. Mobot asks which dashboard to add the panel to. Choose one of the suggested existing dashboards, or name a new dashboard to create.
1. Confirm when Mobot asks if it should proceed. Mobot creates the dashboard (if new) and adds the panel.

The new panel appears on the dashboard, the same as a panel created through the dashboard UI.

## How to create multiple panels in one request

You can ask Mobot for more than one panel in a single prompt. Mobot suggests a title, query, and visualization type for each panel, confirms which dashboard to add them to, and adds all the panels together after you confirm.

For example: `Create a dashboard with a panel for error rate, a panel for request latency, and a panel for top status codes.`

## Limitations

- **Collapsible panels and sections**. Mobot cannot create collapsible panels or dashboard sections this way.
- **Visual settings**. Configuration such as legends, axis titles, and axis overrides is not supported. If you specify these in a prompt, Mobot ignores them.
- **Updating panels**. Mobot only creates new panels this way. It cannot update an existing panel.
- **Metrics panels**. Mobot supports logs panels only.

## Frequently asked questions

### Can you create metrics panels with Mobot?

No. Mobot creates logs panels only from plain-language prompts.

### Can you create more than one panel in the same request?

Yes. You can ask for multiple panels in a single prompt, and Mobot adds them together after you confirm.

### Can you update an existing panel with Mobot?

No. Mobot only creates new panels this way. To change an existing panel, edit it from the dashboard UI.

### Can you customize visual settings like legends or axis titles in your prompt?

No. Visual settings configuration is not supported, and Mobot ignores any visual settings included in a prompt.

### Does this respect your existing dashboard permissions?

Yes. Mobot enforces your existing role-based access control (RBAC) settings at the dashboard and panel level when it creates panels this way.

## Related resources

- [Mobot](/docs/search/mobot)
- [Create a New Dashboard](/docs/dashboards/create-dashboard-new)
