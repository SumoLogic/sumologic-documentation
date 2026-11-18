---
id: create-panel-with-mobot
title: Create Dashboard Panels with Mobot
sidebar_label: Create Panels with Mobot ✨
description: Create dashboard panels in Mobot from plain-language prompts, without configuring panels manually.
keywords:
  - mobot
  - dashboard
  - panel
  - dojoai
---

[Mobot](/docs/search/mobot) enables you to create Sumo Logic dashboard panels using natural language. Instead of building a query and configuring a visualization yourself, describe the panel you want. Mobot generates the query, selects an appropriate visualization, and, after you confirm, adds the panel to a new or existing dashboard.

Mobot supports logs panels only, not metrics panels. It can create multiple panels from a single prompt, but it creates new panels only. It cannot update an existing panel.

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
1. Mobot looks up a relevant data source or existing query. It then shows you the draft query and a breakdown of the source, parsing, aggregation, and visualization it plans to use.
1. Mobot asks which dashboard to add the panel to. Choose one of the suggested existing dashboards, or name a new dashboard to create.
1. When Mobot asks if it should proceed, confirm. Mobot creates the dashboard (if new) and adds the panel.

The new panel appears on the dashboard like any panel created through the dashboard UI.

For more prompts to try, see [Dashboard panel creation](/docs/search/mobot/example-prompts#dashboard-panel-creation) in the Mobot Example Prompts library.

## How to create multiple panels in one request

You can ask Mobot for more than one panel in a single prompt. Mobot suggests a title, query, and visualization type for each panel, confirms which dashboard to add them to, and adds all the panels together after you confirm.

For example: `Create a dashboard with a panel for error rate, a panel for request latency, and a panel for top status codes.`

## Limitations

- **Collapsible panels and sections**. Mobot cannot create collapsible panels or dashboard sections this way.
- **Visual settings**. Configuration such as legends, axis titles, and axis overrides is not supported. If you specify these in a prompt, Mobot ignores them.
- **Updating panels**. Mobot only creates new panels this way. It cannot update an existing panel.
- **Metrics panels**. Mobot supports logs panels only.

## Frequently asked questions

### Can I create metrics panels with Mobot?

No. Mobot creates logs panels only from plain-language prompts.

### Can I create more than one panel in the same request?

Yes. You can ask for multiple panels in a single prompt, and Mobot adds them together after you confirm.

### Can I update an existing panel with Mobot?

No. Mobot only creates new panels this way. To change an existing panel, edit it from the dashboard UI.

### Can I customize visual settings like legends or axis titles in my prompt?

No. Visual settings configuration is not supported, and Mobot ignores any visual settings included in a prompt.

### Does this respect my existing dashboard permissions?

Yes. Mobot enforces your existing role-based access control (RBAC) settings at the dashboard and panel level when it creates panels this way.

### What happens if Mobot chooses the wrong visualization?

Review the generated panel before confirming. You can reject the suggestion and provide additional guidance.

### Can I edit the generated query?

Yes. After Mobot creates the panel, you can modify it using the standard dashboard editor.

## Related resources

- [Mobot](/docs/search/mobot)
- [Mobot Example Prompts](/docs/search/mobot/example-prompts)
- [Create a New Dashboard](/docs/dashboards/create-dashboard-new)
