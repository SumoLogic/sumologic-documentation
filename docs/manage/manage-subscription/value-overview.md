---
id: value-overview
title: Value Overview
description: See the estimated time Mobot, the SOC Analyst Agent, and the Root Cause Analysis Agent save your team, and adjust the assumptions behind each estimate.
keywords:
  - value overview
  - time reclaimed
  - hours saved
  - mobot
  - soc analyst agent
  - root cause analysis agent
  - roi
  - metric reference
  - assumptions
  - mttd
  - mttr
  - time to verdict
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Value Overview shows the estimated time that Mobot, the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/), and the Root Cause Analysis Agent save your team. Use it to see how much time each agent gives back, review supporting activity and performance metrics, and adjust the assumptions behind each estimate to match your team's workflow.

The page displays the **Combined Time Reclaimed**, which is the total of the hours saved by the three agents for the date range you select. A color bar beside the headline shows how much each agent contributes.

Metrics are grouped by agent:

- **SOC Analyst Agent.** Time saved, mean time to detect and respond, time to verdict, coverage, verdicts, and severity for Cloud SIEM insights.
- **Root Cause Analysis Agent.** Time saved, mean time to respond, time to verdict, and coverage for alert investigations.
- **Mobot.** Time saved, and the number of playbooks, dashboards, and monitors Mobot helped you author.

Each metric tile has a category label: **Value**, **Activity**, or **Performance**. A small trend line shows how the metric changed over the selected range, and a month-over-month (MoM) change appears on tiles that have enough data to compare.

<img src={useBaseUrl('img/manage/value-overview/value-overview-page.png')} alt="Value Overview tab showing the Combined Time Reclaimed headline and metric tiles grouped by agent" style={{border: '1px solid gray'}} width="800" />

:::important
Hours saved are estimates, not measured time. Sumo Logic calculates them from the time your team would spend doing the work manually, which is a configurable assumption, and the time the agent took. Activity and performance metrics, such as the number of playbooks Mobot assisted, are measured from agent activity. Learn more in [Metric reference](#metric-reference).
:::

## Prerequisites

Before you begin, you need a role with the following [role capabilities](/docs/manage/users-roles/roles/role-capabilities/) in the **Usage Management** group:

- **View Value Overview.** Required to open the page and see metrics.
- **Manage Value Overview.** Required to change assumptions.

## How to open Value Overview

1. Log in to Sumo Logic as a user with the **View Value Overview** capability.
1. In the main Sumo Logic menu, select **Administration** > **Account**.
1. Select the **Value Overview** tab.

The page shows the date your data is current through, for example, "Showing data as of Nov 17, 2026". Data does not include activity after that date.

## How to change the date range

Use the date range selector. The headline, agent breakdown, and all metric tiles update to the range you select.

## How to find metrics

You can narrow what the page shows in two ways:

- **Search metric.** Enter part of a metric name, for example, `time saved`. Matching metrics appear in their agent section. If nothing matches, the page shows **No Results Found**.
- **Add a filter.** Select **Add a filter**, and then select options from the dropdown that appears: first **Source**, then an operator, and then which of **Mobot**, **Root Cause Analysis Agent**, and **SOC Analyst Agent** to show.

<img src={useBaseUrl('img/manage/value-overview/value-overview-search-filter.png')} alt="Search metric box and Add a filter field with the Source filter and its operator dropdown open" style={{border: '1px solid gray'}} width="800" />

## How to view metric details

1. Select a metric tile. A detail panel opens.
1. Review the panel sections:
   - **Source**, **Category**, and month-over-month change. The agent that produces the metric, its category label, and how it changed compared with the previous month.
   - **Description.** What the metric measures.
   - **Trend.** A chart of the metric over the selected range. Hover over the chart to see values.
   - **How this is measured.** The formula Sumo Logic uses.
   - **Assumptions.** The manual-time values the metric uses, who last set each value, and when.
   - **Evidences.** The base metrics and values that feed the calculation.

<img src={useBaseUrl('img/manage/value-overview/value-overview-metric-details.png')} alt="Investigation Time Saved detail panel showing the description, trend chart, formula, assumptions, and evidences" style={{border: '1px solid gray'}} width="800" />

Distribution tiles, such as **Verdicts by Type**, show a breakdown rather than a single value.

## How to change assumptions

Assumptions are the manual-time estimates that Sumo Logic compares against agent activity to calculate hours saved. Changing an assumption changes your estimated hours saved.

1. On the **Value Overview** tab, select **Assumptions**.
1. In the **Assumptions** panel, edit the value, in minutes, for any input you want to change. Inputs are grouped by agent. See [Default assumptions](#default-assumptions) for the full list.
1. Select **Save Changes**.

The page recalculates hours saved and the **Combined Time Reclaimed** headline using the new values. The **Set by** and **Updated** columns show who last changed each value and when.

<img src={useBaseUrl('img/manage/value-overview/value-overview-assumptions.png')} alt="Assumptions panel listing manual-time inputs for Mobot, the Root Cause Analysis Agent, and the SOC Analyst Agent with a Save Changes button" style={{border: '1px solid gray'}} width="400" />

### Example: changing an assumption

This example is illustrative and does not represent customer results.

Suppose the SOC Analyst Agent investigated 124 insights over the selected range and spent 251.79 minutes in total on those investigations. With a manual baseline of 15 minutes per insight, the agent saved (124 × 15 − 251.79) ÷ 60 = 26.80 hours.

If your team estimates that a manual investigation takes 20 minutes, the estimate becomes (124 × 20 − 251.79) ÷ 60 = 37.14 hours. **Combined Time Reclaimed** increases by the same amount, about 10.3 hours. A lower manual-time assumption lowers the estimated hours saved.

## Interpreting the metrics

- **Zero or missing values.** A metric shows no activity when the agent did not investigate or author anything in the selected range. Select a longer date range to confirm.
- **Data freshness.** Values reflect data through the date shown on the page, not the current moment.
- **Investigated is not resolved.** Metrics such as **Insight Coverage** count insights the agent investigated. They do not mean the agent resolved the insight or that an analyst accepted a recommended verdict.

## Metric reference

Use this section to understand what each metric measures and how Sumo Logic calculates it. Formulas and evidence names use SOCAA for the SOC Analyst Agent and RCA for the Root Cause Analysis Agent.

### Metric categories

Each metric tile has one of these category labels:

| Category | Meaning |
| :-- | :-- |
| Value | An estimate of time saved, calculated from assumptions and agent activity. |
| Activity | A count, rate, or breakdown of what the agent did. |
| Performance | How quickly the agent or your team completes work. |

### How hours saved are calculated

Hours saved metrics multiply the number of items an agent handled by the manual time you assume each item takes, subtract the time the agent took, and convert the result to hours.

For the SOC Analyst Agent, the formula is:

```
(socaa_insight_investigation_count * manual_insight_investigation_time - socaa_investigation_time_min) / 60
```

The **Combined Time Reclaimed** headline is the sum of **Investigation Time Saved** for the SOC Analyst Agent, **Investigation Time Saved (Alerts)** for the Root Cause Analysis Agent, and the three Mobot time saved metrics.

### Default assumptions

Assumptions are the manual-time values used in hours saved calculations. You can view and edit them from the **Assumptions** panel on the **Value Overview** tab, or from the **Assumptions** section of a metric's detail panel.

| Agent | Assumption | Default value |
| :-- | :-- | :-- |
| SOC Analyst Agent | Manual Insight Investigation Time | 15 minutes |
| Root Cause Analysis Agent | Manual Alert Investigation Time | 15 minutes |
| Mobot | Manual Dashboard Authoring Time | 15 minutes |
| Mobot | Manual Monitor Setup Time | 15 minutes |
| Mobot | Manual Playbook Authoring Time | 15 minutes |

### SOC Analyst Agent metrics

These metrics describe how the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) investigates Cloud SIEM insights.

<img src={useBaseUrl('img/manage/value-overview/value-overview-show-more.png')} alt="Expanded SOC Analyst Agent section showing all metric tiles, including time to verdict, coverage, verdicts by type, and insights by severity" style={{border: '1px solid gray'}} width="800" />

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Investigation Time Saved | Value | Hours | Estimated analyst time saved by the agent's insight investigations. Uses the **Manual Insight Investigation Time** assumption. |
| MTTD | Performance | Minutes | Mean time to detect (MTTD) for Cloud SIEM insights. |
| MTTR | Performance | Minutes | Mean time to respond (MTTR) to Cloud SIEM insights. |
| Avg. Time to Verdict | Performance | Minutes | Average time the agent takes to reach a verdict on an insight. |
| Actionable Verdicts | Activity | Percentage | Share of the agent's verdicts that recommend an action. |
| Auto Investigations (Insights) | Activity | Percentage | Share of insights that the agent investigated automatically. |
| Insight Coverage | Activity | Percentage | Share of insights that the agent investigated. |
| Verdicts by Type | Activity | Distribution | Distribution of the agent's verdicts by type, such as **BENIGN** and **SUSPICIOUS**. |
| Insights by Severity | Activity | Distribution | Distribution of insights by severity. |
| Top Entities for Insights | Activity | Distribution | Entities that appear most often in insights. |

### Root Cause Analysis Agent metrics

These metrics describe how the Root Cause Analysis Agent investigates alerts. Learn more about the agent in [Root Cause Analysis Agent](/docs/alerts/monitors/root-cause-agent-preview/).

<img src={useBaseUrl('img/manage/value-overview/value-overview-show-more-rca.png')} alt="Expanded Root Cause Analysis Agent section showing time saved, MTTR, time to verdict, auto investigations, and alert coverage tiles" style={{border: '1px solid gray'}} width="800" />

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Investigation Time Saved (Alerts) | Value | Hours | Estimated time saved by the agent's alert investigations. Uses the **Manual Alert Investigation Time** assumption. |
| MTTR | Performance | Minutes | Mean time to respond (MTTR) to alerts. |
| Avg. Time to Verdict | Performance | Minutes | Average time the agent takes to reach a verdict on an alert. |
| Auto Investigations (Alerts) | Activity | Percentage | Share of alerts that the agent investigated automatically. |
| Alert Coverage | Activity | Percentage | Share of alerts that the agent investigated. |

### Mobot metrics

These metrics describe the time Mobot saves when you author content with it, and how much content it helped you author. Learn more in [Sumo Logic Mobot](/docs/search/mobot/).

<img src={useBaseUrl('img/manage/value-overview/value-overview-show-more-mobot.png')} alt="Expanded Mobot section showing playbook, dashboard, and monitor time saved tiles and the assisted count tiles" style={{border: '1px solid gray'}} width="800" />

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Playbook Time Saved | Value | Hours | Estimated time saved authoring playbooks with Mobot. Uses the **Manual Playbook Authoring Time** assumption. |
| Dashboard Time Saved | Value | Hours | Estimated time saved authoring dashboards with Mobot. Uses the **Manual Dashboard Authoring Time** assumption. |
| Monitor Time Saved | Value | Hours | Estimated time saved setting up monitors with Mobot. Uses the **Manual Monitor Setup Time** assumption. |
| Playbooks Assisted | Activity | Count | Number of playbooks Mobot helped you author in the selected range. |
| Dashboard Assisted | Activity | Count | Number of dashboards Mobot helped you author in the selected range. |
| Monitors Assisted | Activity | Count | Number of monitors Mobot helped you set up in the selected range. |

### Limitations

- Value Overview reports time savings in hours. It does not report dollar savings.
- Coverage and auto investigation metrics count agent activity. They do not indicate that an insight or alert was resolved, or that a person accepted the agent's verdict.
- Data is current through the date shown on the page.

## Related topics

- [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/)
- [Root Cause Analysis Agent](/docs/alerts/monitors/root-cause-agent-preview/)
- [Sumo Logic Mobot](/docs/search/mobot/)
- [Role capabilities](/docs/manage/users-roles/roles/role-capabilities/)
