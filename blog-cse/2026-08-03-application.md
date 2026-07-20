---
title: August 3rd, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - insights
  - soc analyst agent
  - cloud siem
  - ai
  - agent
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### SOC Analyst Agent

We're excited to announce that Sumo Logic's SOC Analyst agent, a powerful agentic AI tool designed to improve the speed and accuracy of your Security Operations Center (SOC) team's threat investigations, is now generally available. The agent triages Cloud SIEM insights with evidence-backed verdicts, helping your team cut through false-positive noise and speed up threat resolution. [Learn more](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent).

The SOC Analyst agent provides the following new functionality:
* AI Investigation tab in Cloud SIEM
* Insight investigation in Mobot
* SOC Agent settings for auto-investigation controls

#### AI Investigation tab

A new **AI Investigation** tab in Cloud SIEM provides an AI-generated analysis of insights that accelerates investigation and troubleshooting by your SOC team.

<img src={useBaseUrl('img/cse/ai-investigations-tab-in-release-note.png')} alt="Insight AI Investigation tab" style={{border: '1px solid gray'}} width="800" />

#### Insight investigation in Mobot

When you select the **Ask Mobot** button on the new **AI Investigation** tab in Cloud SIEM, the insight's AI-generated information is launched in Sumo Logic Mobot. There you can use Mobot's focused query capabilities to drill down into the insight for greater detail.

<img src={useBaseUrl('img/cse/insight-agent-in-mobot.png')} alt="Mobot Investigation Agent" style={{border: '1px solid gray'}} width="600" />

#### SOC Agent settings

The new **SOC Agent Setting** tab (**Cloud SIEM > Cloud SIEM Workflow**) lets administrators control how the agent consumes your committed monthly investigation volume. Define an **Auto-Investigation Filter** to exclude low-priority insights from automatic investigation, and use **Volume & Overage Settings** to choose whether investigation continues past your committed volume. [Learn more](/docs/cse/get-started-with-cloud-siem/soc-analyst-agent#configure-soc-agent-settings).

<!-- TODO (DOCS-1760): add a SOC Agent Setting screenshot. Also confirm whether the "Auto-Resolve Insights with Benign AI Verdict" setting is in scope for this release; if so, add it here. -->

