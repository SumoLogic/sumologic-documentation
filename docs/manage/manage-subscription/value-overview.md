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
  - time to verdict
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Value Overview shows the estimated time that Mobot, the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/), and the Root Cause Analysis Agent save your team. Use it to see how much time each agent gives back, review supporting activity and performance metrics, and adjust the assumptions behind each estimate to match your team's workflow.

The page displays the **Combined Time Reclaimed**, which is the total of the hours saved by the three agents for the date range you select. A color bar under the headline shows how much each agent contributes.

Below the headline, metrics are grouped by agent:

- **SOC Analyst Agent.** Hours saved, insights investigated, investigation rates, verdicts, and response and detection times for Cloud SIEM insights.
- **Root Cause Analysis Agent.** Hours saved, alerts investigated, and time to verdict for alert investigations.
- **Mobot.** Hours saved when Mobot helps you author playbooks, dashboards, and monitors.

Each metric tile has a category label: **Value**, **Activity**, **Performance**, **Quality**, or **Operational**. A small trend line shows how the metric changed over the selected range.

<img src={useBaseUrl('img/manage/value-overview/value-overview-page.png')} alt="Value Overview tab showing the Combined Time Reclaimed headline and metric tiles grouped by agent" style={{border: '1px solid gray'}} width="800" />

:::important
Hours saved are estimates, not measured time. Sumo Logic calculates them from the time your team would spend doing the work manually, which is a configurable assumption, and the time the agent took. Activity and performance metrics, such as the number of insights investigated, are measured from agent activity. Learn more in [Metric reference](#metric-reference).
:::

## Prerequisites

Before you begin, you need a role with the following [role capabilities](/docs/manage/users-roles/roles/role-capabilities/) in the **Usage Management** group:

- **View Value Overview.** Required to open the page and see metrics.
- **Manage Value Overview.** Required to change assumptions.

## How to open Value Overview

1. Log in to Sumo Logic as a user with the **View Value Overview** capability.
1. In the main Sumo Logic menu, select **Administration** > **Account**.
1. Select the **Value Overview** tab.

The text under the page title shows the date your data is current through, for example, "Showing data as of Nov 2, 2026". Data does not include activity after that date.

## How to change the date range

Use the date range selector at the top right of the page. The headline, agent breakdown, and all metric tiles update to the range you select.

## How to find metrics

You can narrow what the page shows in two ways:

- **Search metric.** Enter part of a metric name, for example, `rca time`. Matching metrics appear under their agent. If nothing matches, the page shows **No Results Found**.

  <img src={useBaseUrl('img/manage/value-overview/value-overview-search.png')} alt="Search metric box with rca time entered and the RCA Time to Verdict tile shown under Root Cause Analysis Agent" style={{border: '1px solid gray'}} width="800" />

- **Add a filter.** Select **Add a filter**, choose **Source**, and then select one or more of **Mobot**, **Root Cause Analysis Agent**, and **SOC Analyst Agent**. Select **Apply**. The page shows only the sources you selected.

  <img src={useBaseUrl('img/manage/value-overview/value-overview-source-filter.png')} alt="Source filter menu with Mobot, Root Cause Analysis Agent, and SOC Analyst Agent check boxes and an Apply button" style={{border: '1px solid gray'}} width="800" />

## How to view metric details

1. Select a metric tile. A detail panel opens.
1. Review the panel sections:
   - **Source** and **Category.** The agent that produces the metric and its category label.
   - **Trend.** A chart of the metric over the selected range. Hover over the chart to see values.
   - **How this is measured.** The formula Sumo Logic uses.
   - **Assumptions.** The manual-time values the metric uses, who last set each value, and when.
   - **Evidences.** The base metrics and values that feed the calculation.

<img src={useBaseUrl('img/manage/value-overview/value-overview-metric-details.png')} alt="Hours Saved (SOCAA) detail panel showing the trend chart, formula, assumptions, and evidences" style={{border: '1px solid gray'}} width="800" />

Breakdown tiles, such as **SOCAA verdict Breakdown**, show a distribution and an **Evidences** section but no formula.

## How to change assumptions

Assumptions are the manual-time estimates that Sumo Logic compares against agent activity to calculate hours saved. Changing an assumption changes your estimated hours saved.

1. On the **Value Overview** tab, select **Assumptions**.
1. In the **Assumptions** panel, edit the value, in minutes, for any input you want to change. Inputs are grouped by agent. See [default assumptions](#default-assumptions) for the full list.
1. Select **Save Changes**.

The page recalculates hours saved and the **Combined Time Reclaimed** headline using the new values.

<img src={useBaseUrl('img/manage/value-overview/value-overview-assumptions.png')} alt="Assumptions panel listing manual-time inputs for Mobot, the Root Cause Analysis Agent, and the SOC Analyst Agent with a Save Changes button" style={{border: '1px solid gray'}} width="800" />

:::note
The **Assumptions** panel explains that your team can edit user values, and that default values require a change request.
:::

### Example: changing an assumption

This example is illustrative and does not represent customer results.

Suppose the Root Cause Analysis Agent investigated 345 alerts over the selected range, and the agent spent 2,392 minutes in total on those investigations. With a manual baseline of 22 minutes per investigation, the agent saved (345 × 22 − 2,392) ÷ 60 = 86.63 hours.

If your team estimates that a manual investigation takes 22.4 minutes, the estimate becomes (345 × 22.4 − 2,392) ÷ 60 = 88.93 hours. **Combined Time Reclaimed** increases by the same 2.30 hours.

## Interpreting the metrics

- **Zero or missing values.** A metric shows no activity when the agent did not investigate or author anything in the selected range. Select a longer date range to confirm.
- **Data freshness.** Values reflect data through the date shown under the page title, not the current moment.
- **Investigated is not resolved.** Metrics such as **# Insights Investigated by SOCAA** count insights the agent investigated. They do not mean the agent resolved the insight or that an analyst accepted a recommended verdict.
- **Estimates depend on assumptions.** If your actual manual times differ from the defaults, update the assumptions so the estimates reflect your team.

## Metric reference

Use this section to understand what each metric measures and how Sumo Logic calculates it.

### Metric categories

Each metric tile has one of these category labels:

| Category | Meaning |
| :-- | :-- |
| Value | An estimate of time saved, calculated from assumptions and agent activity. |
| Activity | A count or breakdown of what the agent did. |
| Performance | How quickly or how often the agent completes work. |
| Quality | How useful the agent's output was. |
| Operational | Security operations measures for your Cloud SIEM insights. |

### How hours saved are calculated

Hours saved metrics are estimates. Sumo Logic multiplies the number of items an agent handled by the manual time you assume each item takes, subtracts the time the agent took, and converts the result to hours.

For the SOC Analyst Agent, the formula is:

```
(insights_investigated_by_socaa * manual_investigation_time_per_analyst - socaa_investigation_time_min) / 60
```

The **Combined Time Reclaimed** headline is the sum of **Hours Saved (SOCAA)**, **Hours Saved (RCA)**, and the three Mobot hours saved metrics.

This example is illustrative and does not represent customer results. Suppose the SOC Analyst Agent investigated 1,000 insights in the selected range and spent 5,000 minutes in total on those investigations.

| Manual investigation time per analyst | Calculation | Hours saved |
| :-- | :-- | :-- |
| 26 minutes | (1,000 × 26 − 5,000) ÷ 60 | 350 |
| 20 minutes | (1,000 × 20 − 5,000) ÷ 60 | 250 |

A lower manual-time assumption lowers the estimated hours saved.

### Default assumptions

Assumptions are the manual-time values used in hours saved calculations. You can view and edit them from the **Assumptions** panel on the **Value Overview** tab, or from the **Assumptions** section of a metric's detail panel.

| Agent | Assumption | Default value |
| :-- | :-- | :-- |
| SOC Analyst Agent | Manual Investigation Time per Analyst | 26 minutes |
| Root Cause Analysis Agent | Manual Baseline Time for Investigation | 22 minutes |
| Mobot | Manual Dashboard Time | 25.2 minutes |
| Mobot | Manual Monitor Time | 25.2 minutes |
| Mobot | Manual Playbook Time | 25.5 minutes |

### SOC Analyst Agent metrics

These metrics describe how the [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/) investigates Cloud SIEM insights. The first three appear by default. Select **Show more** under the agent section to see the rest.

<img src={useBaseUrl('img/manage/value-overview/value-overview-show-more.png')} alt="Expanded SOC Analyst Agent section showing all metric tiles, including verdict, status, and severity breakdowns" style={{border: '1px solid gray'}} width="800" />

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Hours Saved (SOCAA) | Value | Hours | Estimated analyst time saved by the agent's investigations. Uses the **Manual Investigation Time per Analyst** assumption. |
| # Insights Investigated by SOCAA | Activity | Count | Number of insights the agent investigated in the selected range. |
| SOCAA Time to Verdict | Performance | Minutes | Time the agent takes to reach a verdict on an insight. |
| SOCAA verdict Breakdown | Activity | Distribution | Distribution of the agent's verdicts: **BENIGN**, **INCONCLUSIVE**, **MALICIOUS**, and **SUSPICIOUS**. |
| Insight Status Breakdown | Activity | Distribution | Distribution of insights by status: closed, in progress, and new. |
| Insight Severity Breakdown | Activity | Distribution | Distribution of insights by severity: critical, high, medium, and low. |
| Top Entities for Insights | Activity | Distribution | Entities that appear most often in insights. |

### Root Cause Analysis Agent metrics

These metrics describe how the Root Cause Analysis Agent investigates alerts. Learn more about the agent in [Root Cause Agent](/docs/alerts/monitors/root-cause-agent-preview/).

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Hours Saved (RCA) | Value | Hours | Estimated time saved by the agent's alert investigations. Uses the **Manual Baseline Time for Investigation** assumption. |
| # alerts Investigated by RCA | Activity | Count | Number of alerts the agent investigated in the selected range. |
| RCA Time to Verdict | Activity | Minutes | Time the agent takes to reach a verdict on an alert. |

### Mobot metrics

These metrics describe the time Mobot saves when you author content with it. Learn more in [Sumo Logic Mobot](/docs/search/mobot/).

| Metric | Category | Unit | Description |
| :-- | :-- | :-- | :-- |
| Playbook Authoring Hours Saved (Mobot) | Value | Hours | Estimated time saved authoring playbooks with Mobot. Uses the **Manual Playbook Time** assumption. |
| Dashboard Authoring Hours Saved (Mobot) | Value | Hours | Estimated time saved authoring dashboards with Mobot. Uses the **Manual Dashboard Time** assumption. |
| Monitor Setup Hours Saved (Mobot) | Value | Hours | Estimated time saved setting up monitors with Mobot. Uses the **Manual Monitor Time** assumption. |

### Limitations

- Value Overview reports estimated time savings in hours. It does not report dollar savings.
- **Investigated** metrics count agent activity. They do not indicate that an insight or alert was resolved, or that a person accepted the agent's verdict.
- Hours saved metrics are estimates that depend on your assumptions. They are not measured time.
- Data is current through the date shown under the page title.

## Related topics

- [SOC Analyst Agent](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent/)
- [Root Cause Agent](/docs/alerts/monitors/root-cause-agent-preview/)
- [Sumo Logic Mobot](/docs/search/mobot/)
- [Role capabilities](/docs/manage/users-roles/roles/role-capabilities/)
