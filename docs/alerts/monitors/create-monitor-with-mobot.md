---
id: create-monitor-with-mobot
title: Create Monitors with Mobot
sidebar_label: Create a Monitor with Mobot
description: Use Mobot to create and update logs monitors from plain-language prompts, without filling out the monitor form manually.
keywords:
  - mobot
  - monitor
  - dojo ai
  - conversational monitors
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can create monitors from plain-language prompts in [Mobot](/docs/search/mobot), Sumo Logic's conversational AI assistant. Describe the monitor you want in everyday language, and Mobot validates your query, suggests a complete configuration, and creates the monitor after you confirm. You can also update a monitor within the same conversation.

Mobot supports logs monitors only, not metrics or SLO (Service Level Objective) monitors, and can create static, anomaly, and outlier detection types. From a single prompt, it populates the monitor name, description, query, trigger conditions, recovery conditions, and notifications, and you can accept or adjust each suggestion before the monitor is created.

## Which monitor types can Mobot create?

Mobot supports logs monitors only.

| Monitor type | Supported |
| :-- | :-- |
| Logs | Yes |
| Metrics | No |
| SLO | No |

For logs monitors, Mobot can create the following detection types:

- **Static**. Trigger when results cross a threshold you define.
- **Anomaly**. Trigger on deviations from a machine learning baseline.
- **Outlier**. Trigger when values fall outside the expected range for your logs.

## What Mobot can configure

From your prompt, Mobot suggests values for the following, and you can accept each suggestion or provide your own:

- **Name** and **description**.
- **Query** (validated before the configuration is suggested).
- **Trigger conditions and thresholds**.
- **Recovery conditions**.
- **Notifications** through email or a connection.

## How to create a monitor with Mobot

1. Open [Mobot](/docs/search/mobot) and describe the monitor you want in plain language. For example:<br/>`Alert me when the payment-service query has more than 20 errors in a 5-minute window.`
1. Mobot validates your query and suggests a configuration, including name, description, monitor type, query, trigger, recovery, and notifications.<br/>{/* TODO: add screenshot of the suggested configuration card */}
1. Review each suggestion. To change a value, tell Mobot what you want. For example, ask it to rename the monitor or adjust the trigger threshold.
1. (Optional) Add a notification. You can be notified by email or through a connection, such as Slack.
   - If your organization has one connection, Mobot adds it automatically.
   - If your organization has more than one connection, Mobot lists them and asks which to use.
1. When the configuration looks right, Mobot shows a confirmation card. Confirm to create the monitor.<br/>{/* TODO: add screenshot of the confirmation card */}
1. Mobot creates the monitor and returns its ID along with the configured conditions. Mobot also displays a chip for the new monitor. Click the chip to open the created monitor.

The new monitor appears on the **Monitors** tab, the same as a monitor created through the form.

## How to update a monitor in a conversation

You can update a monitor you created earlier in the same conversation. Tell Mobot what to change, and it shows a confirmation card summarizing the update before applying it.

Mobot can only update the following fields:

- Name
- Description
- Query
- Trigger conditions
- Notifications
- Query time range

For example, ask Mobot to change the trigger threshold from 20 to 15 and the time window to 7 minutes. Mobot confirms that the threshold will change from 20 to 15 and the window will change to 7 minutes, and applies the update after you confirm.

:::note
Mobot cannot disable or delete a monitor. To disable or delete a monitor, use the **Monitors** tab.
:::

## Example prompts

- `Alert me when the payment-service query has more than 20 errors in a 5-minute window.`
- `Create a monitor that notifies me by email when login failures exceed 100 in 10 minutes.`
- `Notify my Slack channel when 5xx responses spike above the normal range.`

## Frequently asked questions

### Can Mobot create metrics or SLO monitors?

No. Mobot creates logs monitors only. Use the monitor form to create metrics or SLO monitors.

### What detection types can Mobot create?

Mobot can create static, anomaly, and outlier detection types for logs monitors.

### Can you edit a monitor after Mobot creates it?

Yes. You can update a monitor within the same conversation, or edit it later from the **Monitors** tab like any other monitor.

### Does Mobot validate your query before creating the monitor?

Yes. Mobot validates your query first, and then suggests the rest of the configuration, including name, description, trigger, recovery, and notifications.

### How does Mobot set up notifications?

You can be notified by email or through a connection, such as Slack. If your organization has one connection, Mobot adds it automatically. If you have more than one, Mobot lists them and asks which to use.

## Related resources

- [Mobot](/docs/search/mobot)
- [Create a New Monitor](/docs/alerts/monitors/create-monitor)
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning)
