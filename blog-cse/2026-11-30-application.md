---
title: November 30, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - insights
  - cloud siem
  - AI SOC Analyst Agent
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Insights Summary card

The Insights page now shows a **Summary** card above the Insights list. It gives you an at-a-glance view of insight volume and, when the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) is enabled, the agent's activity.

When the SOC Analyst Agent is enabled, the card shows these widgets:
- **AI Investigations**. The number of insights the agent investigated in the selected date range.
- **Verdict Breakdown**. The percentage of agent verdicts that are Malicious, Suspicious, Benign, or Inconclusive.
- **Time to Verdict**. The average time the agent takes to deliver a verdict.
- **Agent Coverage**. The percentage of insights the agent investigated.

The date range defaults to the last 30 days. Use the date picker at the top right of the card to change it, and all widgets update.

:::note
You need the **View Value Overview** or **Manage Value Overview** permission to see the card.
:::

[Learn more](/docs/cse/get-started-with-cloud-siem/about-cse-insight-ui/#summary).
