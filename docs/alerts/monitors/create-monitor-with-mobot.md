---
id: create-monitor-with-mobot
title: Create Monitors with Mobot
sidebar_label: Create Monitors with Mobot
description: Use the Monitor Creation Agent in Mobot to create and update logs monitors from plain-language prompts, without filling out the monitor form manually.
keywords:
  - mobot
  - monitor
  - dojo ai
  - agent
  - monitor creation agent
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Monitor Creation Agent** lets you create monitors from plain-language prompts in [Mobot](/docs/search/mobot), Sumo Logic's conversational AI assistant. Describe the monitor you want in everyday language, and the agent validates your query, suggests a complete configuration, and creates the monitor after you confirm. You can also update a monitor within the same conversation.

## Supported monitor types

The Monitor Creation Agent supports logs monitors only.

| Monitor type | Supported |
| :-- | :-- |
| Logs | Yes |
| Metrics | No |
| SLO | No |

For logs monitors, the agent can create the following detection types:

- **Static**. Trigger when results cross a threshold you define.
- **Anomaly**. Trigger on deviations from a machine learning baseline.
- **Outlier**. Trigger when values fall outside the expected range for your logs.

## What the agent can configure

From your prompt, the agent suggests values for the following, and you can accept each suggestion or provide your own:

- **Name** and **description**.
- **Query** (validated before the configuration is suggested).
- **Trigger conditions and thresholds**.
- **Recovery conditions**.
- **Notifications** through email or a connection.

## Create a monitor

1. Open [Mobot](/docs/search/mobot) and select the **Monitor Creation Agent**.<br/>{/* TODO: add screenshot of Monitor Creation Agent selected in Mobot */}
1. Describe the monitor you want in plain language. For example:<br/>`Alert me when the payment-service query has more than 20 errors in a 5-minute window.`
1. The agent validates your query and suggests a configuration, including name, description, monitor type, query, trigger, recovery, and notifications.<br/>{/* TODO: add screenshot of the suggested configuration card */}
1. Review each suggestion. To change a value, tell the agent what you want. For example, ask it to rename the monitor or adjust the trigger threshold.
1. (Optional) Add a notification. You can be notified by email or through a connection, such as Slack.
   - If your organization has one connection, the agent adds it automatically.
   - If your organization has more than one connection, the agent lists them and asks which to use.
1. When the configuration looks right, the agent shows a confirmation card. Confirm to create the monitor.<br/>{/* TODO: add screenshot of the confirmation card */}
1. The agent creates the monitor and returns its ID along with the configured conditions.

The new monitor appears on the **Monitors** tab, the same as a monitor created through the form.

## Update a monitor in the conversation

You can update a monitor you created earlier in the same conversation. Tell the agent what to change, and it shows a confirmation card summarizing the update before applying it.

For example, ask the agent to change the trigger threshold from 20 to 15 and the time window to 7 minutes. The agent confirms that the threshold will change from 20 to 15 and the window will change to 7 minutes, and applies the update after you confirm.

## Example prompts

- `Alert me when the payment-service query has more than 20 errors in a 5-minute window.`
- `Create a monitor that notifies me by email when login failures exceed 100 in 10 minutes.`
- `Notify my Slack channel when 5xx responses spike above the normal range.`

## Related resources

- [Mobot](/docs/search/mobot)
- [Create a New Monitor](/docs/alerts/monitors/create-monitor)
- [AI and Machine Learning with Sumo Logic](/docs/get-started/ai-machine-learning)
