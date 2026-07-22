---
id: soc-analyst-agent
title: SOC Analyst Agent
sidebar_label: SOC Analyst Agent ✨
description: Use Sumo Logic's SOC Analyst agent to triage Cloud SIEM insights with AI verdicts, investigate threats faster, and reduce false-positive noise for your team.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic's SOC Analyst agent is an agentic AI tool that embeds reasoning and context-awareness directly into Cloud SIEM, helping your Security Operations Center (SOC) team investigate alerts faster, reduce false-positive noise, and respond with confidence. Security teams spend too much time validating false positives and performing repetitive investigative steps — the agent eliminates that noise, standardizes outcomes, and accelerates time to resolution.

Every verdict is evidence-backed and explainable. The agent shows the evidence it collected, the reasoning it applied, and the conclusion it reached, so you can interrogate any part of its analysis rather than take a black-box result on faith. It determines whether an insight is malicious, suspicious, or benign, provides a concise summary of the threat incident based on triggered signals, and presents key findings from the signals that fired, resulting in quicker, more detailed analysis.

The SOC Analyst agent performs two distinct jobs that mirror an analyst’s daily responsibilities:
* **Triage**. Delivers automated verdicts on insights using evidence-backed reasoning to determine whether the insights are malicious, suspicious, or benign.
* **Investigation**. Supports analysts with a hypothesis-driven approach to assess the scope, context, and likely impact of an event.

The SOC Analyst agent provides the following functionality:
* [AI Investigation tab in Cloud SIEM](#ai-investigation-tab)
* [Insight investigation in Mobot](#investigate-the-insight-in-mobot)

## Availability

The SOC Analyst agent requires a Cloud SIEM subscription and is opt-in. As a launch promotion, it is enabled by default for the first 90 days with a capacity of five investigated insights per day, and you can opt out at any time. Contact your Sumo Logic account team for details.

To disable the SOC Analyst Agent for your entire organization, an administrator can turn it off from the **Feature Management** page (**Administration** > **Feature Management**). At GA, the SOC Analyst Agent shares a single **AI features** toggle with Mobot and Parse Assist — turning it off disables all three together. Independent per-feature toggles, starting with the SOC Analyst Agent, are planned for early Q3.

<img src={useBaseUrl('img/search/mobot/feature-management.png')} alt="Feature Management page showing the AI features and MCP Server access toggles" style={{border: '1px solid gray'}} width="800" />

{/* TODO (DOCS-1565): Whether a parent org can manage this toggle for child orgs is still an open question (pending confirmation as of 2026-07-22). Mirrors the same open question in docs/search/mobot.md (Opting out). */}

{/* VERIFY before publishing (DOCS-1565): confirm the 90-day window start and the exact opt-out mechanism. Source: Dojo AI FAQ, SOC Analyst Agent section. */}

<!-- TODO (DOCS-1565), from the Dojo AI FAQ (pp. 60-69), pending product/GA confirmation:
  - Third core capability: add "Incident report generation (via Mobot)" alongside Triage and Investigation (FAQ p.60/62), once GA-confirmed.
  - Agent limitations: AI reasoning is limited to normalized security data (records and signals); no external MCP/automation-service integrations yet (FAQ p.63).
  - Recommended Actions: verify the "Recommended Actions" / Execute Action playbook steps in the AI Investigation tab section are GA. The Dojo AI FAQ (p.63) says automated remediation is "still in testing and not currently available to customers." Remove or gate that content if not yet available.
  - No persistent learning: the Dojo AI FAQ (p.66) says the agent has "no persistent learning" and does not immediately retrain. Soften the "reviewed to refine model behavior over time as part of the Dojo AI learning loop" FAQ answer accordingly, and consider a dedicated "Does the agent learn from past investigations?" FAQ.
-->


## View AI verdicts on insights

The SOC Analyst agent runs in the background against all insights that flow into Cloud SIEM. After analysis, it renders a verdict about whether the insight requires investigation.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main menu select **Cloud SIEM** and then click **Insights** at the top of the screen.
1. In the **Insights** page, note that the **AI Verdict** column shows the results of the AI analysis:<br/><img src={useBaseUrl('img/cse/insight-ai-verdict-column.png')} alt="Insight AI Verdict column" style={{border: '1px solid gray'}} width="800" />
1. Click **Start typing here to create a filter** near the top of the insights page and select **AI Verdict** to search for insights based on the verdict they are assigned:<br/><img src={useBaseUrl('img/cse/insight-ai-filter.png')} alt="Insight AI Verdict column" style={{border: '1px solid gray'}} width="600" />
   * **Malicious**. AI analysis determined that the insight is malicious, and warrants immediate investigation by your SOC team.
   * **Suspicious**. AI analysis determined that the insight is suspicious and warrants investigation by your SOC team.
   * **Benign**. AI analysis determined that the insight is harmless and is not a candidate for elevation to SOC team investigation.
   * **In Progress**. AI analysis is in progress.
   * **Inconclusive**. AI analysis could not determine whether the insight needs to be investigated.
   * **Not Investigated**. No AI analysis was performed on the insight due to rate limiting. Click the **Investigate** button at the top of the insight's details page to manually initiate an AI investigation. See [How does investigation rate limiting work?](#how-does-investigation-rate-limiting-work) for details.
1. Clicking anywhere on the row of an insight that has an AI verdict shows a side panel with results of the verdict. This allows you to browse quickly for insights needing more investigation:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-side-panel.png')} alt="Insight AI side panel" style={{border: '1px solid gray'}} width="800" />
1. To investigate an insight further, click the insight's ID. Insights with an AI verdict display an **AI Investigation** tab in the insight details page. Use the information on this tab to dive deeper into the insight.

## AI Investigation tab

The **AI Investigation** tab in the details page of a Cloud SIEM insight is an artificial intelligence-generated analysis of the insight. Use the information on this tab to guide your investigation.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main menu select **Cloud SIEM** and then click **Insights** at the top of the screen.
1. On the insights list page, click an insight's ID.
1. The **AI Investigation** tab shows results of AI analysis:<br/><img src={useBaseUrl('img/cse/insight-ai-investigation-tab.png')} alt="Insight AI Investigation tab" style={{border: '1px solid gray'}} width="700" />
   1. **Severity Verdict**. Details about the insight's severity analysis:
      * **Current Severity**. The severity of the insight as set by the cumulative activity score for the insight. For more information, see [About insight severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity).
      * **Global Confidence Score**. A level of confidence that the insight is actionable, predicted by Sumo Logic’s Global Intelligence machine learning model. See [What is a Global Confidence score?](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights/#what-is-a-global-confidence-score).
      * **AI Verdict**. The AI system's qualitative assessment of the insight.
      * **Recommends security level of ___**. AI analysis recommends a new severity level be assigned to this insight. If you agree with the assessment, click **Accept**. The **Current Severity** field changes to the new value.
   1. **What Happened**. A concise summary of threat incidents based on triggered signals in the insight, generated by the SOC Analyst agent. The summary consolidates key details to facilitate quick understanding and response by security teams. The summary is generated when an insight is created, and is regenerated whenever the insight is modified, keeping it current with added or removed signals.
      :::tip
      Help us refine the tool by using the thumbs-up or thumbs-down buttons to provide feedback on the effectiveness of the summary presented. Clicking the thumbs-down button gives you the opportunity to provide additional feedback.
      :::
   1. **Recommended Actions**. Actions you can take to remediate the incident.
      1. Click **Execute Action** to run a [playbook](/docs/platform-services/automation-service/playbooks/) to take the recommended action:<br/><img src={useBaseUrl('img/cse/recommended-actions.png')} alt="Recommended actions" style={{border: '1px solid gray'}} width="700" />
      1. Click **View Details** on the confirmation to see details about the playbook automation, and then you should see a confirmation:<br/><img src={useBaseUrl('img/cse/playbook-automation-confirmation.png')} alt="Playbook automation confirmation" style={{border: '1px solid gray'}} width="400" /> <br/>
      1. The playbook execution details are displayed on the [**Automations**](/docs/cse/automation/automations-in-cloud-siem/#view-results-of-an-automation) tab of the insight. Click **View Playbook** on an automation to see the progress of the playbook execution.<br/><img src={useBaseUrl('img/cse/automations-tab-for-recommended-action.png')} alt="Automations tab" style={{border: '1px solid gray'}} width="700" />
         :::note
         To be able to run playbooks from **Recommended Actions**, the integrations that the playbooks use must be properly configured. See [Configure Authentication for Automation Integrations](/docs/platform-services/automation-service/configure-authentication-for-integrations/).
         :::
   1. **Key Findings**. The main points uncovered by AI analysis. Details about these findings can be found in the signals that fired for the insight.
1. Click **Ask Mobot** to continue the investigation conversationally in [Mobot](#investigate-the-insight-in-mobot), with the full context of the AI analysis already loaded.

## Investigate the insight in Mobot

Follow these steps once you're in Mobot:

1. From the insight's **Details** page, click **Ask Mobot** to open the investigation in [Mobot](/docs/search/mobot/), Dojo AI's chat interface.<br/><img src={useBaseUrl('img/cse/ask-mobot-buttons.png')} alt="Ask Mobot buttons" style={{border: '1px solid gray'}} width="800" />
1. The full AI investigation appears in Mobot. For example, under each step in **Key Findings**, you can click the provided links to see more details.<br/><img src={useBaseUrl('img/cse/insight-agent-in-mobot.png')} alt="Mobot investigation" style={{border: '1px solid gray'}} width="800" />
1. In **Ask Something...**, type a question about the insight using details provided in the **What Happened** or **Key Findings** sections above. For example, you could ask to see logs about the entities mentioned in the text (that is, hosts, users, IP addresses, file hashes, and so on). You could even ask more general questions, like `Help me investigate this insight`. <br/><img src={useBaseUrl('img/cse/investigation-agent-query.png')} alt="Insight investigation query" style={{border: '1px solid gray'}} width="500" />
1. After executing a prompt like the one above, Mobot analyzes your request and fashions a log search query based on it.
1. Click the log search results card to see the results of your request in the Log Search UI. You can also click the suggestions provided to drill down farther. As you ask questions, Mobot retains the context of your conversation about the insight, allowing you to more easily obtain detail. <br/><img src={useBaseUrl('img/cse/investigation-agent-results.png')} alt="Insight investigation query results" style={{border: '1px solid gray'}} width="800" />
1. As you work with the investigation agent, after each step you will be presented with follow-up questions. Type a number corresponding to a follow-up question, or enter your own question.<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-followup-questions.png')} alt="Insight investigation follow-up questions" style={{border: '1px solid gray'}} width="600" />

At any point during the investigation, click **Open Insight** to return to the insight's **Details** page in Cloud SIEM.<br/><img src={useBaseUrl('img/cse/mobot-open-insight-button.png')} alt="Open Insight button in Mobot" style={{border: '1px solid gray'}} width="400" />

### Search for related insights

During a Mobot investigation, you can search for other insights related to the current one. Mobot offers several dimensions to search by, helping you surface lateral context without leaving the investigation.

Click **Search related insights?** when it appears as a suggested action in Mobot, or ask Mobot directly (for example, `Search for related insights`). Mobot will ask which dimension to explore:<br/><img src={useBaseUrl('img/cse/soc-analyst-related-insights-mobot.png')} alt="Related Insights search in Mobot" style={{border: '1px solid gray'}} width="800" />

* **Same entity**. Other insights involving the same user, IP address, or host.
* **Same attack name**. Other insights with the same attack name.
* **Same signal rules**. Insights that share one or more of the same signal rules.
* **Same MITRE tactics**. Insights that share MITRE ATT&CK tactics.
* **Concurrent insights**. Insights that were active during the same time window.

Select a dimension to proceed, or enter your own search criteria.

### Example questions

Following are example questions you could try in the **Ask Something...** field. Although these are general questions, they give you an idea of the wide variety of questions you can ask the agent. However, rather than ask general questions, we recommend you ask questions specific to the insight you're investigating in order to get the most useful responses.

* `Give me an executive summary of the insight`
* `What actions do you recommend for remediation`
* `Tell me how to create a monitor that will fire if any changes occur on this insight`

For more example prompts, see [Security investigations](/docs/search/mobot/#security-investigations) in the Mobot documentation.

### Generate dashboards

To generate dashboards based on the context of your investigation, simply ask Mobot. For example, in the **Ask Something...** field, you could type `Create a dashboard with the results of this investigation`. The agent will build the dashboard:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-dashboard-generated.png')} alt="Ask to generate dashboard" style={{border: '1px solid gray'}} width="700" />

Click the provided link to view the dashboard:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-dashboard.png')} alt="Dashboard generated for insight investigation" style={{border: '1px solid gray'}} width="700" />

### Start a new investigation

To start a new investigation, navigate back to Cloud SIEM, select another insight, and click **Ask Mobot**. To clear your current session instead, see [New conversation](/docs/search/mobot/#new-conversation).

### Share the conversation

To share the current investigation with other users, see [Share conversation](/docs/search/mobot/#share-conversation).

## Configure SOC Analyst Agent settings

The SOC Analyst agent automatically investigates every insight that flows into Cloud SIEM, in priority order, up to your organization's committed monthly investigation volume. The **SOC Analyst Settings** tab on the **Cloud SIEM Workflow Configuration** page lets you control which insights the agent auto-investigates and what happens when your committed volume is reached.

Access requires the **View SOC Analyst Settings** permission, and is not available to federated tenants. Viewing the settings is available to analysts and administrators; changing them requires the **Manage SOC Analyst Settings** permission, limited to administrators. With view-only access, the controls are visible but disabled. Manually triggering an investigation (clicking **Investigate** on a **Not Investigated** insight) requires the separate **Trigger Manual Investigation** permission.

{/* TODO (DOCS-1760): Confirm whether these permissions are granted to analysts by default, or only to administrators by default with analyst access granted manually — ticket language suggests the latter ("enabled by admins by default, and can be manually enabled for analysts"), which may conflict with "Viewing the settings is available to analysts and administrators" above. */}

To open the settings, select **Cloud SIEM** > **Cloud SIEM Workflow Configuration** > **SOC Analyst Settings**.

### Auto-Investigation Filter

Insights that match the conditions you define are excluded from auto-investigation, keeping investigation capacity focused on higher-priority signals. Excluded insights receive a **Not Investigated** verdict and do not consume investigation capacity. Analysts can still investigate them manually, because manual investigation ignores the filter. If you do not define any conditions, all insights are eligible for auto-investigation up to your committed volume.

At GA, you can define a single filter (with any combination of AND/OR condition groups) per org. Support for multiple, separately prioritized filter rules is planned for a future release.

The filter has an **Active** / **Disabled** toggle in the top right of the section. When it is set to **Disabled**, no insights are excluded and the conditions are hidden ("Filter is currently disabled. Enable the toggle to configure filter criteria."). Set it to **Active** to define conditions.

To build the conditions:

1. In a condition row, select a type, an operator, and a value. The types are:
   * **Insight Severity**. Select Critical, High, Medium, or Low.
   * **Entity Type**. Select the entity type from the **Select type...** dropdown. Options include IP Address, MAC Address, Username, Hostname, Process, Command, Hash, Domain, User Agent, Email, URL, File, Deployment, Pod, ReplicaSet, and Resource, among others.
   * **Signal Name**. The name of a signal in the insight. Enter the value as text.
   * **Signal Rule ID**. The rule ID of a signal in the insight. Enter the value as text.<br/><img src={useBaseUrl('img/cse/auto-investigation-filter.png')} alt="Auto-Investigation Filter with two condition groups joined by AND" style={{border: '1px solid gray'}} width="800" />
1. For the operator, select **equals** or **does not equal**.
1. Combine conditions with **OR** and **AND**:
   * Click **+ OR** to add a condition to a group. An insight matches the group when any condition in it is true.
   * Click **+ AND** to add another group. An insight matches the filter only when every group is true.

To remove a condition, click the **X** next to it. To remove an entire group, click the **X** in the top-right corner of the group.

After changing this setting, click **Save Settings** to apply your changes, or **Cancel** to discard them.

### Volume & Overage Settings

When your committed monthly investigation volume is reached, new insights receive a **Not Investigated** status, and analysts can still manually trigger investigation.

* **Allow overages**. This check box is cleared by default. Select it to continue auto-investigating past your committed volume. Overage investigations are billed separately.
* **Ceiling**. When **Allow overages** is selected, a **Ceiling** field appears, defaulted to 20%. Enter the maximum percentage above your committed volume that auto-investigation can consume.

<img src={useBaseUrl('img/cse/volume-overage-settings.png')} alt="Volume and Overage Settings with Allow overages selected and the Ceiling field" style={{border: '1px solid gray'}} width="800" />

{/* TODO (DOCS-1760): The ticket also lists an Active/Disabled toggle for Volume & Overage Settings, similar to the Auto-Investigation Filter's toggle. Not reflected here — confirm whether this exists in the shipped UI or was dropped before GA. */}

After changing this setting, click **Save Settings** to apply your changes, or **Cancel** to discard them.

<!-- TODO (DOCS-1760): confirm whether a capacity warning banner appears on the Insights page when investigation capacity is reached (from the UI RFC, not yet verified against the shipped UI). -->

## FAQ

### What is the Sumo Logic SOC Analyst agent?

The SOC Analyst agent is part of the [Sumo Logic Dojo AI](/docs/get-started/ai-machine-learning/#dojo-ai). The SOC Analyst agent is an assistant that applies agentic AI reasoning to triage and investigation tasks. It correlates alerts, weighs patterns against frameworks like MITRE ATT&CK, and renders evidence-backed verdicts, providing analysts an immediate sense of threat impact. When deeper analysis is required, you continue the same investigation conversationally in [Mobot](/docs/search/mobot/), Dojo AI's chat interface, to map relationships, connect entities, and summarize findings.

### Will the agent increase scanning or data-processing costs?

No. The agent analyzes existing data already ingested into Cloud SIEM. It performs reasoning on metadata and contextual signals rather than initiating new scans.

### How does the agent differ from Cloud SIEM correlation or automation rules?

Unlike traditional correlation logic, which is static, the SOC Analyst agent applies agentic reasoning. It adapts based on insight context, recent analyst actions, and environmental signals, producing contextual, explainable decisions rather than fixed pattern matches.

### What data does the agent rely on to render verdicts?

The agent draws from normalized security data (`sec_record*` indexes and signals), correlated entities, Sumo Logic and customer-provided [threat intelligence](/docs/security/threat-intelligence) feeds, and enrichment data (for example, IP geolocation, user behavior, and asset details).

### Can analysts provide feedback or correct AI verdicts?

Yes. Analysts can override verdicts and flag feedback within the UI. These actions are logged and reviewed to refine model behavior over time as part of the Dojo AI learning loop.

### How does investigation rate limiting work?

The SOC Analyst agent automatically investigates insights in priority order, up to your organization's committed investigation volume. When that volume is reached, additional insights receive a **Not Investigated** verdict, and analysts can manually trigger an investigation on any of them by clicking the **Investigate** button.

To control how that capacity is used, including whether investigation continues past your committed volume, see [Configure SOC Analyst Agent settings](#configure-soc-analyst-agent-settings). If you have questions about your organization's investigation volume, ask your Sumo Logic representative.

<!-- TODO (DOCS-1565): Rewritten to match the committed-volume/overage model in the Dojo AI FAQ and the Configure SOC Agent settings section. The previous "5 automatic / 2 manually triggered investigations per day" figures were the promo/POV cap, not a product rate limit, per the Dojo AI FAQ (pp. 69, 73). Also reconcile cadence: this doc says "committed MONTHLY volume" but the Dojo AI FAQ describes daily metering per Org ID with daily resets. Confirm monthly vs daily with the DOCS-1760/product owner. -->

### Does the agent automatically investigate things that are not entities in Cloud SIEM?

Traditional Cloud SIEM entities are items like users, IP addresses, hosts, and the like. In addition to these, the agent automatically investigates things that are not usually identified as entities in Cloud SIEM, such as related cloud resources, API endpoints, or service accounts relevant to the insight. This intelligent entity prioritization results in faster investigation and reduces time spent manually determining which entities to investigate.

### Can I converse with the agent in the same way I am used to doing with other AI-enabled tools?

Yes, you can. In your investigation, you are not limited in how you proceed. You can engage the agent in a conversational flow to direct the investigation any way you want. However, the agent has many tools that can help should you need guidance. For example, the agent presents follow-up questions after each step that offer you multiple paths for investigation.

## Additional resources

* [Dojo AI Overview](https://www.sumologic.com/solutions/dojo-ai). Learn about Dojo AI, Sumo Logic's multi-agent AI platform, and the other specialized agents alongside the SOC Analyst Agent.
* Blogs:
   * [The SOC Analyst Agent: Bring an Agentic approach to work with your SOC team](https://www.sumologic.com/blog/soc-analyst-agent-for-soc-team)
   * [Welcome to Dojo AI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc)
   * [New agents in the Dojo: Expanded Sumo Logic Dojo AI](https://www.sumologic.com/blog/agents-dojo-ai-soc-analyst-mcp)
* Demos:
   * [SOC Analyst Agent](https://www.sumologic.com/demo/soc-analyst-agent)
   * [Mobot walkthrough](https://www.sumologic.com/demo/mobot-walkthrough)
* AWS article: [Accelerating security analytics using Amazon Nova with Sumo Logic](https://aws.amazon.com/solutions/case-studies/sumo-logic-nova-case-study/)
