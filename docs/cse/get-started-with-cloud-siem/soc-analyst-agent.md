---
id: soc-analyst-agent
title: SOC Analyst Agent
sidebar_label: SOC Analyst Agent
description: Learn how to use Sumo Logic's SOC Analyst Agent to perform investigations of Cloud SIEM insights.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

Sumo Logic's SOC Analyst Agent is an agentic AI tool designed to improve the speed and accuracy of your Security Operations Center (SOC) team's threat investigations. 

The agent delivers automated verdicts on insights using evidence-backed reasoning to determine whether the insights are malicious, suspicious, or benign. It then provides a concise summary of threat incidents based on triggered signals in the insight. Finally, it presents key findings, including details found in the signals that fired for the insight. All of this results in quicker, more detailed analysis.

The SOC Analyst Agent performs two distinct jobs that mirror an analyst’s daily responsibilities:
* **Triage**. Delivers automated verdicts on insights using evidence-backed reasoning to determine whether the insights are malicious, suspicious, or benign.
* **Investigation**. Supports analysts with a hypothesis-driven approach to assess the scope, context, and likely impact of an event.

The SOC Analyst Agent provides the following functionality:
* [AI Investigation tab in Cloud SIEM](#ai-investigation-tab)
* [Insight investigation in Mobot](#investigate-the-insight-in-mobot)

## Filter for AI verdicts

The SOC Analyst Agent runs in the background against all insights that flow into Cloud SIEM. After analysis, it renders a verdict about whether the insight requires investigation.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main menu select **Cloud SIEM** and then click **Insights** at the top of the screen. 
1. In the insight list page, note that the **AI Verdict** column shows the results of the AI analysis:<br/><img src={useBaseUrl('img/cse/insight-ai-verdict-column.png')} alt="Insight AI Verdict column" style={{border: '1px solid gray'}} width="800" />
1. Click **Start typing here to create a filter** near the top of the insights page and select **AI Verdict** to search for insights based on the verdict they are assigned:
   * **Malicious**. AI analysis determined that the insight is malicious, and warrants immediate investigation by your SOC team.
   * **Suspicious**. AI analysis determined that the insight is suspicious and warrants investigation by your SOC team. 
   * **Benign**. AI analysis determined that the insight is harmless and is not a candidate for elevation to SOC team investigation.
   * **In Progress**. AI analysis is in progress.
   * **Inconclusive**. AI analysis could not determine whether the insight needs to be investigated.
   * **Not Investigated**. No AI analysis was performed on the insight because of rate limiting rules. These rules control how many insights can be automatically processed to generate AI verdicts. Insights that have not been investigated display an **Investigate** button at the top of the insight details page. Click this button to manually initiate an AI investigation. For more information about rate limiting and its role in ensuring system stability, see [FAQs for preview](#faqs-for-preview) below.
1. Clicking anywhere on the row of an insight that has an AI verdict shows a side panel with results of the verdict. This allows you to browse quickly for insights needing more investigation:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-side-panel.png')} alt="Insight AI side panel" style={{border: '1px solid gray'}} width="800" />
1. To investigate an insight further, click the insight's ID. Insights with an AI verdict display an **AI Investigation** tab in the insight details page. Use the information on this tab to dive deeper into the insight.

## AI Investigation tab

The **AI Investigation** tab in the details page of a Cloud SIEM insight is an artificial intelligence-generated analysis of the insight. Use the information on this tab to guide your investigation.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Insights**. You can also click **Go To...** at the top of the screen and select **Insights**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main menu select **Cloud SIEM** and then click **Insights** at the top of the screen. 
1. On the insights list page, click an insight's ID.
1. The **AI Investigation** tab shows results of AI analysis:<br/><img src={useBaseUrl('img/cse/insight-ai-investigation-tab.png')} alt="Insight AI Investigation tab" style={{border: '1px solid gray'}} width="800" /> <!-- Replace this image with insight-ai-investigation-tab-new.png when "Recommended Actions" is made available for beta users. -->
   1. **Severity Verdict**. Details about the insight's severity analysis:
      * **Current Severity**. The severity of the insight as set by the cumulative activity score for the insight. For more information, see [About insight severity](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#about-insight-severity).
      * **Global Confidence Score**. A level of confidence that the insight is actionable, predicted by Sumo Logic’s Global Intelligence machine learning model. See [What is a Global Confidence score?](/docs/cse/records-signals-entities-insights/global-intelligence-security-insights/#what-is-a-global-confidence-score).
      * **AI Verdict**. The AI system's qualitative assessment of the insight.
      * **Recommends security level of ___**. AI analysis recommends a new severity level be assigned to this insight. If you agree with the assessment, click **Accept**. The **Current Severity** field changes to the new value.
   1. **What Happened**. A concise summary of threat incidents based on triggered signals in the insight. Content of this field is generated by Sumo Logic's Summary Agent, an agentic AI tool. The summary consolidates key details to facilitate quick understanding and response by security teams. The summary is generated when an insight is created, and is regenerated whenever the insight is modified, keeping it current with added or removed signals.
      :::tip
      Help us refine the tool by using the thumbs-up or thumbs-down buttons to provide feedback on the effectiveness of the summary presented. Clicking the thumbs-down button gives you the opportunity to provide additional feedback.
      :::
      <!-- 1. **Recommended Actions**. Actions you can take to remediate the incident. 
       1. Click **Execute Action** to run a [playbook](/docs/platform-services/automation-service/playbooks/) to take the recommended action:<br/><img src={useBaseUrl('img/cse/recommended-actions.png')} alt="Recommended actions" style={{border: '1px solid gray'}} width="700" />
       1. Click **View Details** on the confirmation to see details about the playbook automation:<br/><img src={useBaseUrl('img/cse/playbook-automation-confirmation.png')} alt="Playbook automation confirmation" style={{border: '1px solid gray'}} width="400" /> <br/>
       1. The playbook execution details are displayed on the [**Automations**](/docs/cse/automation/automations-in-cloud-siem/#view-results-of-an-automation) tab of the insight. Click **View Playbook** on an automation to see the progress of the playbook execution.<br/><img src={useBaseUrl('img/cse/automations-tab-for-recommended-action.png')} alt="Automations tab" style={{border: '1px solid gray'}} width="700" />
          :::note
          To be able to run playbooks from **Recommended Actions**, the integrations that the playbooks use must be properly configured. See [Configure Authentication for Automation Integrations](/docs/platform-services/automation-service/configure-authentication-for-integrations/).
          :::
          -->
   1. **Key Findings**. The main points uncovered by AI analysis. Details about these findings can be found in the signals that fired for the insight.
1. Click **Ask Mobot** to send the AI analysis of the insight to [Sumo Logic Mobot](#investigate-the-insight-in-mobot) for further investigation.
   
### Investigate the insight in Mobot

1. From the insight's details page, click **Ask Mobot** to open the AI investigation in [Sumo Logic Mobot](/docs/search/mobot/).<br/><img src={useBaseUrl('img/cse/ask-mobot-buttons.png')} alt="Ask Mobot buttons" style={{border: '1px solid gray'}} width="800" /> 
1. Details about the AI investigation appear in Mobot. The entire context of the AI investigation is brought into Mobot so you can quickly drill down for more information about the insight. For example, under each step in **Key Findings**, you can click the provided links to see more details.<br/><img src={useBaseUrl('img/cse/insight-agent-in-mobot.png')} alt="Mobot investigation" style={{border: '1px solid gray'}} width="800" />
1. In **Ask Something...**, type a question about the insight using details provided in the **What Happened** or **Key Findings** sections above. For example, you could ask to see logs about the entities mentioned in the text (that is, hosts, users, IP addresses, file hashes, and so on). You could even ask more general questions, like "Help me investigate this insight". <br/><img src={useBaseUrl('img/cse/investigation-agent-query.png')} alt="Insight investigation query" style={{border: '1px solid gray'}} width="600" />
1. Click **Search** <img src={useBaseUrl('img/cse/search-button-in-mobot.png')} alt="Search button in Mobot" width="30" />. Mobot analyzes your request and fashions a query based on it.
1. Click **View Results** to see the results of your request in the logs query UI. You can also click the suggestions provided to drill down farther. As you ask questions, Mobot retains the context of your conversation about the insight, allowing you to more easily obtain detail. <br/><img src={useBaseUrl('img/cse/investigation-agent-results.png')} alt="Insight investigation query results" style={{border: '1px solid gray'}} width="800" />
1. As you work with the investigation agent, after each step you will be presented with follow-up questions. Type a number corresponding to a follow-up question, or enter your own question.<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-followup-questions.png')} alt="Insight investigation follow-up questions" style={{border: '1px solid gray'}} width="600" />

### Search for related insights

During a Mobot investigation, you can search for other insights related to the current one. Mobot offers several dimensions to search by, helping you surface lateral context without leaving the investigation.

Click **Search related insights?** when it appears as a suggested action in Mobot, or ask Mobot directly (for example, "Search for related insights"). Mobot will ask which dimension to explore:<br/><img src={useBaseUrl('img/cse/soc-analyst-related-insights-mobot.png')} alt="Related Insights search in Mobot" style={{border: '1px solid gray'}} width="800" />

* **Same entity**. Other insights involving the same user, IP address, or host.
* **Same attack name**. Other insights with the same attack name.
* **Same signal rules**. Insights that share one or more of the same signal rules.
* **Same MITRE tactics**. Insights that share MITRE ATT&CK tactics.
* **Concurrent insights**. Insights that were active during the same time window.

Select a dimension to proceed, or enter your own search criteria.

### Start a new investigation

To clear the context and start a new investigation, click **New Conversation** at the top of the screen. To start investigation on another insight, navigate back to Cloud SIEM, select another insight, and click **Ask Mobot**.

### Example questions

Following are example questions you could try in the **Ask Something...** field:
* `Give me an executive summary of the insight`
* `What actions do you recommend for remediation`
* `Tell me how to create a monitor that will fire if any changes occur on this insight`

Although these are general questions, they give you an idea of the wide variety of questions you can ask the agent. However, rather than ask general questions, we recommend you ask questions specific to the insight you're investigating in order to get the most useful responses.

### Generate dashboards

To generate dashboards based on the context of your investigation, simply ask Mobot. For example, in the **Ask Something...** field you could type `Create a dashboard with the results of this investigation`. The agent will build the dashboard:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-dashboard-generated.png')} alt="Ask to generate dashboard" style={{border: '1px solid gray'}} width="700" />

Click the provided link to view the dashboard:<br/><img src={useBaseUrl('img/cse/soc-analyst-agent-dashboard.png')} alt="Dashboard generated for insight investigation" style={{border: '1px solid gray'}} width="700" />

## Add a comment to an insight

You can ask Mobot to add a comment to the current insight. In the **Ask Something...** field, enter a prompt such as `Add a comment that I found a suspicious IP address` and press **Enter**. Mobot posts the comment to the insight's comment section.<br/><img src={useBaseUrl('img/cse/soc-analyst-comments-panel.png')} alt="Adding a comment to an insight via Mobot" style={{border: '1px solid gray'}} width="800" />

Comments are visible to all analysts with access to the insight and can be used to document findings, note investigation status, or flag items for follow-up.

## Close an insight

You can also ask Mobot to close the current insight. In the **Ask Something...** field, enter a prompt such as `Close this insight` or `Mark this insight as resolved` and press **Enter**. Mobot closes the insight directly from the investigation area.

## FAQs

**What is the Sumo Logic SOC Analyst Agent?**

The SOC Analyst Agent is part of the [Sumo Logic Dojo AI](/docs/get-started/ai-machine-learning/#dojo-ai). The SOC Analyst Agent is an assistant that applies agentic AI reasoning to triage and investigation tasks. It correlates alerts, weighs patterns against frameworks like MITRE ATT&CK, and renders evidence-backed verdicts, providing analysts an immediate sense of threat impact. When deeper analysis is required, the same agent supports hypothesis-based investigation to map relationships, connect entities, and summarize findings.

**What are the benefits of the agent?**

Security teams spend too much time validating false positives and performing repetitive investigative steps. By embedding reasoning and context-awareness directly into Cloud SIEM, the SOC Analyst Agent eliminates noise, standardizes outcomes, and accelerates time to resolution.

**Will the agent increase scanning or data-processing costs?**

No. The agent analyzes existing data already ingested into Cloud SIEM. It performs reasoning on metadata and contextual signals rather than initiating new scans.

**How does the agent differ from Cloud SIEM correlation or automation rules?**

Unlike traditional correlation logic, which is static, the SOC Analyst Agent applies agentic reasoning. It adapts based on insight context, recent analyst actions, and environmental signals, producing contextual, explainable decisions rather than fixed pattern matches.

**What data does the agent rely on to render verdicts?**

The agent draws from normalized security data (`sec_record*` indexes and signals), correlated entities, Sumo Logic’s integrated threat intelligence feeds, and enrichment data (for example, IP geolocation, user behavior, and asset details).

**Can analysts provide feedback or correct AI verdicts?**

Yes. Analysts can override verdicts and flag feedback within the UI. These actions are logged and reviewed to refine model behavior over time as part of the Dojo AI learning loop.

### FAQs for preview

**How does investigation rate limiting work?**

To ensure stable performance, the agent performs system-wide rate limiting, which imposes usage controls across the entire SOC Analyst Agent user base to manage capacity. As a result, automatic investigation may skip some insights if investigating them would exceed rate limits. The skipped insights show **Not Investigated** in the **AI Verdicts** column. However, in these instances, you can manually start an investigation of the insight by clicking the **Investigate** button.

The rate limits for your organization are:
* 5 automatic investigations per day.
* 2 manually triggered investigations per day.

Be aware, though, that if you have reached your limit of the total number of insights that you can get AI verdicts for in a certain time period, a message will appear telling you when you can next click the **Investigate** button to manually initiate an AI investigation.

If you have questions about the AI investigation rate limiting for your organization, ask your Sumo Logic representative.

**Does the agent automatically investigate things that are not entities in Cloud SIEM?**

Traditional Cloud SIEM entities are items like users, IP addresses, hosts, and the like. In addition to these, the agent automatically investigates things that are not usually identified as entities in Cloud SIEM, such as related cloud resources, API endpoints, or service accounts relevant to the insight. This intelligent entity prioritization results in faster investigation and reduces time spent manually determining which entities to investigate.

**Can I converse with the agent in the same way I am used to doing with other AI-enabled tools?**

Yes, you can. In your investigation, you are not limited in how you proceed. You can engage the agent in a conversational flow to direct the investigation any way you want. However, the agent has many tools that can help should you need guidance. For example, the agent presents follow-up questions after each step that offer you multiple paths for investigation.

## Additional resources

* Blogs: 
   * [The SOC Analyst Agent: Bring an Agentic approach to work with your SOC team](https://www.sumologic.com/blog/soc-analyst-agent-for-soc-team)
   * [Welcome to Dojo AI: Where AI agents strengthen your SOC](https://www.sumologic.com/blog/welcome-dojo-ai-agents-soc)
   * [New agents in the Dojo: Expanded Sumo Logic Dojo AI](https://www.sumologic.com/blog/agents-dojo-ai-soc-analyst-mcp)
* Demos: 
   * [SOC Analyst Agent](https://www.sumologic.com/demo/soc-analyst-agent)
   * [Mobot walkthrough](https://www.sumologic.com/demo/mobot-walkthrough)
* Sumo Logic website: [Dojo AI](https://www.sumologic.com/solutions/dojo-ai)
* AWS article: [Accelerating security analytics using Amazon Nova with Sumo Logic](https://aws.amazon.com/solutions/case-studies/sumo-logic-nova-case-study/)
