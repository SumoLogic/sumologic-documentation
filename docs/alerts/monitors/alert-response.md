---
id: alert-response
title: Alert Response
description: Quickly investigate and resolve issues you've been alerted about with the context provided by Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/alert-and-notify.png')} alt="Alert and notify icon" width="40"/>

Alert response provides contextual insights about triggered alerts to minimize the time needed to investigate and resolve application failures. An alert provides curated information to on-calls to help them troubleshoot issues more quickly.

On-call engineers are tasked with firefighting production issues and recovering quickly. They have to investigate issues and try to identify the root cause and fix it, which requires deep knowledge about the production systems, troubleshooting tools, and tons of experience as on-calls. 

By assembling relevant context from prior alerts and by analyzing patterns in logs and metrics underlying alerts, Sumo Logic alert response enables on-call engineers to cut down the time spent piecing together insights during an incident from various sources and accelerate recovery.

import Iframe from 'react-iframe';

:::training Micro Lesson

Learn how to use alert response.


<Iframe url="https://fast.wistia.net/embed/iframe/elkucyy4ap?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Using Alert Response Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## Setting up alert response

Email alerts automatically get a button labeled **View Alert** that opens the alert on the alert page, shown in the below image.<br/><img src={useBaseUrl('img/alerts/monitors/view-alert-from-email.png')} alt="View alert from email" style={{border: '1px solid gray'}} width="800" />

If you use [Webhook connections](/docs/alerts/webhook-connections) offered by Sumo Logic for receiving notifications, you'll need to provide the [`alertResponseUrl` variable](/docs/alerts/monitors/alert-variables) in your notification payload of a monitor to receive a link that opens alert response. When your monitor is triggered, it will generate a URL and provide it in the alert notification payload, which you can use to open the alert response.

The following is an example Slack payload with the variable:

```json
{
  "attachments":[
    {
      "pretext":"Sumo Logic Alert",
      "fields":[
        {
          "title":"Alert Page",
          "value":"{{alertResponseUrl}}"
        }
      ],
      "mrkdwn_in":[
        "text",
        "pretext"
      ],
      "color":"#29A1E6"
    }
  ]
}
```

## Alert List

The Alert List shows all alerts triggered by your monitors within the past 30 days. By default, the list is sorted by status (showing **Active** on top, followed by **Resolved**), and then chronologically by creation time. The list displays up to 1,000 alerts.

:::info
Sumo Logic records an audit log entry each time an alert is triggered. Using these audit logs, you can retrieve a list of alerts for any selected time range.
:::

To get to your Alert List:
* From the [**New UI**](/docs/get-started/sumo-logic-ui/), select **Alerts**.
* From the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic), click the bell icon in the top menu.

To search alerts, use the search bar and filters.<br/><img src={useBaseUrl('img/alerts/monitors/search-alert-list.png')} alt="Search alert list" style={{border: '1px solid gray'}} width="800" />

To sort by category (for example, **Name**, **Severity**, **Status**), click a column header.

### Tags

See [Using tags in alerts](/docs/alerts/monitors/settings/#using-tags-in-alerts).

## Resolving alerts

To resolve an alert, click a row to select it, then click **Resolve**.

<img src={useBaseUrl('img/alerts/resolve-alerts.png')} alt="resolve alerts" style={{border: '1px solid gray'}} width="800" />

## Translating thresholds

Threshold translating allows you to open the alert response page in [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer) to view the threshold associated with an alert. This also helps you to understand how your monitor's thresholds are translating into metrics and compare the threshold values set in a monitor with the data displayed in the Metrics Explorer chart.

For example, when you open an alert response page in Metrics Explorer, you can see critical thresholds defined with some number. You can then see that this threshold is also applied and enabled in the Metrics Explorer view, with exactly the same number defined.<br/> <img src={useBaseUrl('img/alerts/arp-metrics-explorer.png')} alt="Alert response page in metrics explorer" width="800"/>

To view the alert response chart in Metrics Explorer:

1. Navigate to your [Alert List](#alert-list) and select the alert for which you want to view the corresponding metrics and threshold values.
1. Click the **View in Metrics Explorer** button for that alert.<br/><img src={useBaseUrl('img/alerts/view-in-metrics-explorer.png')} alt="Threshold metrics explorer" width="800"/>
1. Metrics Explorer opens with the graph of the metric associated with the alert.
1. In the **Threshold** section of Metrics Explorer, you can see the same threshold values for the monitor associated with the alert.<br/> <img src={useBaseUrl('img/alerts/threshold-metrics-explorer-view.png')} alt="Threshold metrics explorer" width="800"/>
1. The thresholds will be enabled and only the ones that are defined in the monitor will be displayed.
   * If the alert has both critical and warning thresholds defined in the corresponding monitor, both thresholds will be displayed in the Metrics Explorer view.
   * If the alert has only a critical threshold defined in the corresponding monitor, only the warning threshold will be displayed in the Metrics Explorer view.
1. Use this feature to compare the threshold values set in a monitor with the data displayed in the Metrics Explorer graph and gain a better understanding of how your monitors are translating into metrics.

:::note
Note that the same threshold translating functionality supports to [Create Monitors from the Metrics Search](/docs/alerts/monitors/create-monitor/#from-metrics-search) and [Opening a Monitor in the Metrics Search](/docs/alerts/monitors/settings/#view-in-metrics-search).
:::

## Overview

To view detailed information about an alert:

1. Navigate to your [Alert List](#alert-list) and click any row.
1. Click **Open**.<br/><img src={useBaseUrl('img/alerts/open-alerts-details-page.png')} alt="Open button on the Alert List" style={{border: '1px solid gray'}} width="800"/>
1. Review the **Alert Details** tab. It provides an overview of the alert that was triggered to help get to the root cause of an issue quickly, such as:

    - An AI verdict summarizing the status of the AI investigation, if one has run.
    - Key details such as the severity, status, entity, duration, creation time, and the condition that caused the alert.
    - The query that triggered the alert and a chart visualizing the alerting KPI before and during the alert.
    - A table displaying the raw log messages that triggered the alert.
    - [Alert context cards](#alert-context-cards) with system-curated insights.

Use the **AI Investigation**, **Relevant Alerts**, and **Monitor History** tabs to see related alerts firing around the same time and the history of previous occurrences of the alert.

<img src={useBaseUrl('img/alerts/alert-details-overview.png')} alt="Alert Details tab of the alert page" style={{border: '1px solid gray'}} width="800"/>

The following lists describe the elements on the page.

### Alert header

<img src={useBaseUrl('img/alerts/alert-details-header.png')} alt="Header of the alert details page" style={{border: '1px solid gray'}} width="800"/>

- **Alert name**. Click the link icon next to the name to copy the link to the opened alert page.
- **Investigate** or **Ask Mobot**. If the alert has not been investigated, the **Investigate** button starts an AI investigation. After an AI investigation has run, automatically or when you start one, **Ask Mobot** appears instead. It lets you troubleshoot the alert directly in Mobot while preserving alert context, so you can jump into Mobot and perform context-aware troubleshooting while maintaining alert details.
- **Resolve**. Resolves the alert. This will also resolve the monitor that generated the alert. The monitor will fire again when the alert condition is met.
  :::note
  Sumo Logic automatically resolves alerts when the monitor's recovery condition is met. This behavior cannot be modified or disabled. While you could configure a recovery condition that prevents Sumo Logic from resolving a monitor, this is not recommended, as it may suppress unrelated alerts from being triggered.
  :::
- **Kebab menu** (three dots). Additional actions, such as **Open Monitor**, **View Playbook**, and **Subscribe to Monitor**.
- **Severity**. The type of monitor trigger condition that triggered the alert (Critical, Warning, or Missing Data).
- **Status**. Status of the alert (Active or Resolved).
- **Entity (ID)**. The ID of the entity the alert was triggered on.
- **Alert Duration**. How long the alert has been active, or was active before it was resolved.
- **Created**. The date and time the alert was created.
- **Timestamp**. The time field used for the alert, for example Message Time.
- **Tags**. Tags applied to the alert. See [Using tags in alerts](/docs/alerts/monitors/settings/#using-tags-in-alerts).

### Alert Details

<img src={useBaseUrl('img/alerts/alert-details-ai-verdict.png')} alt="AI Verdict on the Alert Details tab with the View AI Investigation link highlighted" style={{border: '1px solid gray'}} width="800"/>

- **AI Verdict**. Shows the result of the AI investigation of the alert. The investigation runs automatically if it is configured, or when someone manually starts it. While the analysis is running, the verdict shows **In Progress** (this usually takes 3-4 minutes). If the alert has not been investigated, the verdict shows **Not Investigated**. Click **View AI Investigation** to open the **AI Investigation** tab.
- **Trigger Condition**. The condition that caused the alert, for example, `Log field percent_increase for group collector=my-collector violates the alert condition "percent_increase is Greater than or equal to 100.0 in the last 1440 minutes"`.
- **Trigger Value**. The value that violated the trigger condition.
- **Triggered Query (Logs)**. The query of the monitor. Click **View Query Content** to expand or collapse the query, and click **View in Log Search** to open the query in Log Search. For metrics monitors, the section is labeled **Triggered Query (Metrics)** and the button is **View in Metrics Explorer**.
- **Chart**. Visualizes the trend of the metric that was tracked as part of the alert condition of the monitor. The visualization tracks the before and during trends of the metric. The dashed red line shows the threshold, and the red shaded area shows the period during which the alert was active.
- **Log Messages**. A table with the raw log messages (**Time** and **Message**) that triggered the alert. Click **View in Log Search** to open them in Log Search.
- **Alert Context**. System-curated context cards for the alert. The section header shows how many context cards are available.

### AI Investigation

<img src={useBaseUrl('img/alerts/ai-investigation-alerts.png')} alt="AI Investigation tab" style={{border: '1px solid gray'}} width="800"/>

The **AI Investigation** tab explains what caused the alert, so you do not have to piece together the evidence yourself. It shows the result of an automated AI investigation, or of an investigation that someone started manually. If the alert has not been investigated, the tab shows **Not Investigated** and an **Investigate** button to start one.

When an investigation has run:

- It shows an **AI Verdict** (for example, Root Cause Identified) with a short summary and the time the investigation finished.
- **What Happened** describes the findings, including what was ruled out, the potential blast radius, and the Knowledge used to reach the conclusion.
- **Recommended Actions** lists suggested next steps.
- Click one of the suggested prompts in **Continue investigating in Mobot** to continue the investigation in Mobot with the alert context.

To learn more about AI Investigation for alerts, see Root Cause Agent.{/* TODO: link to /docs/alerts/monitors/root-cause-agent once the doc is merged (PR 7333) */}

### Relevant Alerts

The **Relevant Alerts** tab shows other alerts in the system that were triggered around the same time as this alert. This information is helpful to know what issues are happening in the system and whether the current problem is an isolated issue or a more systemic one.

<img src={useBaseUrl('img/alerts/relevant-alerts-tab.png')} alt="Relevant Alerts tab" style={{border: '1px solid gray'}} width="800"/>

Use the toggle at the top of the tab to choose one of two types of relations that a related alert can have:

- **Entity**. Shows all the alerts that were triggered one hour before and after the given alert that happened on the same entity (such as node, pod, or cluster). A footer shows how many alerts share the entity with the selected alert.
- **Time**. Shows all the alerts that were triggered 30 minutes before or after the given alert that does not have another association.

For each related alert, the table shows:

- **Severity**. The severity of the alert (Critical or Warning).
- **Name**. The monitor name and the time the alert was triggered. Click the name to open the alert in its own alert page.
- **AI Verdict**. The result of the AI investigation, for example Not Investigated.
- **Status**. The status of the alert (Active or Resolved).
- **Duration**. How long the alert was active.
- **Condition**. The condition that triggered the alert.

Click a column header to sort the table.

### Monitor History

The **Monitor History** tab shows the past 30 days of similar alerts that were triggered by the monitor (that generated the current alert). Monitor history can be helpful to determine how frequently an alert has fired in the past and if the alert is flaky. You can then quickly correlate whether the current problem is similar to a past one by comparing the information shared for the alert.

<img src={useBaseUrl('img/alerts/monitor-history-alerts.png')} alt="Monitor History tab" style={{border: '1px solid gray'}} width="800"/>

The left side of the tab summarizes the history:

- **Median Duration**. The median time alerts from this monitor stay active.
- **Trigger Value**. The trigger value of the current alert.
- **Trigger Condition**. The condition that triggered the current alert.
- **Frequency**. A weekly heat map showing how many alerts fired each day over the past 30 days. Darker red squares indicate days with more alerts.

The table on the right lists previous alerts:

- **Fired at**. The date and time the alert fired.
- **AI Verdict**. The result of the AI investigation, for example `Not Investigated`.
- **Status**. The status of the alert (Active or Resolved).
- **Duration**. How long the alert was active.

Click a column header to sort the table, or click the open in new tab icon at the end of a row to open that alert in its own alert page.

### Alert response and playbooks

If the monitor has a playbook, you can open it from the alert page. Playbooks allow admins to codify tribal knowledge for an on-call so they know what exactly to do when they receive an alert: <img src={useBaseUrl('img/alerts/playbook-example.png')} alt="Text playbook example" style={{border: '1px solid gray'}} width="300"/>

[Automated Playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/#view-automated-playbooks-for-an-alert) run automatically when an alert is triggered.

:::info Limitations
- The alert visualization is only shown for alerts less than 30 days old.
- Relevant Alerts and Monitor History show the top 250 alerts.
:::

## Alert Context cards

The lower section, **Alert Context** cards, displays system-curated information to help understand potential underlying symptoms that might be causing the issue. It provides additional insights automatically discovered by the system through data analysis. Using artificial intelligence and machine learning, the system tracks your logs and metrics, identifies patterns that may explain the issue, and presents them as context cards.

Depending on the type of data an alert is based on (metrics or logs) and the detection method (static or outlier), you'll see different context cards. You will see a progress spinner labeled **Analyzing alert context** at the bottom of the window when cards are still being loaded. It may take a minute for some cards to load.

### Dimensional Explanations

Dimensional Explanations help you identify the most common dimensions found in the triggered query results, allowing for deeper insight into alert patterns.

When an alert is triggered, Sumo Logic analyzes the query results and highlights the most frequently occurring dimensions. These dimensions help you quickly determine patterns or root causes by comparing alert results to other data.

* **Summary Description**. Displays the most common dimensions found in the alert results compared to all other results.
* **Dimensional breakdown**. Shows dimensions that appear frequently in alert results, such as `eventname`, `resourceidentity.id`, `severitylevel`, `details.trackerid`, and `eventid`.
* **Comparison view**. A percentage bar visually represents how often these dimensions appear in alert results compared to other results.
* **Drill-down analysis**. Click on a dimension to explore the associated log details.
* **Quick navigation**. Use the **View in Log Search** button to open the results in Log Search for further investigation.

In the example below:<br/><img src={useBaseUrl('img/alerts/monitors/dimensional-explanations.png')} alt="Dimensional Explanations UI" width="700"/>
* The most common dimensions found in alert results include `details.trackerid`, `eventname`, and `severitylevel`, each appearing in 66.67% of alert results.
* Other dimensions like `resourceidentity.id` and `eventid` appear in 33.33% of alert results.
* The color-coded bars indicate the proportion of alert results (red) versus all other results (blue).

By analyzing these dimensions, you can quickly identify recurring issues and improve troubleshooting efficiency.

### Log Fluctuations

The **Log Fluctuations** context card, available for logs monitors, detects different signatures in your log messages using [LogReduce](/docs/search/behavior-insights/logreduce) such as errors, exceptions, timeouts, and successes. It compares log signatures trends with a normal baseline period and surfaces noteworthy changes in signatures.

<img src={useBaseUrl('img/alerts/monitors/log-fluctuations.png')} alt="log fluctuations UI" width="700"/>

* **A**. The name and description of the card.
* **B**. Opens the log query that populated the card, in a [Log Search](/docs/search).
* **C**. A summary of the discovered NEW, MISSING, and CHANGED signatures, and how many log messages belong to each type.
   * **NEW**. Log signatures that were only seen after the alert was triggered but not one hour prior to the alert start time.
   * **MISSING**. Log signatures that are not present after the alert was created but were present one hour prior to the alert start time, such as **Transaction Succeeded** or **Success**.
   * **CHANGED**. Log signatures whose counts have changed after the alert when compared to one hour prior to the alert start time.
* **D**. The details about the identified log signature.
* **E**. A histogram showing how many log messages mapped to the given signature after the alert (red bar) and before (gray bar) the alert.
* **F**. Opens a [Log Search](/docs/search) pre-filtered to the log messages that mapped to the given signature.

### Anomalies

This card detects time series anomalies for entities related to the alert.

Anomalies are grouped into [golden signals](https://sre.google/sre-book/monitoring-distributed-systems/). Anomalies are also presented on a timeline; the length of the anomaly represents its duration. <br/><img src={useBaseUrl('img/alerts/monitors/anomalies.png')} alt="Anomalies" style={{border: '1px solid gray'}} width="800" />

* **A**. Name and description of the context card.
* **B**. Count of anomalies belonging to each golden signal type.
* **C**. A timeline view of anomalies with their start time and duration, the domain (for example, AWS, Kubernetes), and the entity on which it was detected. Anomalies may be grouped based on connections between entities and similarity of metrics. For example, anomalies on EC2 instances that are members of an AutoScaling group may be grouped together. The count shown in each anomaly refers to the number of grouped anomalies.
* **D**. A link to view the anomalies.

:::note
Only anomalies with a start time around 30 minutes before or after the alert was created show up in the card.
:::

Hover over an EOI to view key information about the event.<br/><img src={useBaseUrl('img/alerts/monitors/eoi-stats.png')} alt="EOI stats" style={{border: '1px solid gray'}} width="300" />

Click on the EOI to open the **Summary View** and **Entity Inspector**.<br/><img src={useBaseUrl('img/alerts/monitors/entity-inspector.png')} alt="Entity inspector" style={{border: '1px solid gray'}} width="400" />

### Benchmark

Benchmarks refer to baselines computed from anonymized and aggregated telemetry data from Sumo Logic customers in domains such as AWS. If the telemetry values for your entity during an alert period are unusual compared to benchmarks, you may have an unusual configuration change or other backend issues. 

For example, the card below shows that `ServiceUnavailable` error is happening 32 times more often in your AWS account compared with other Sumo Logic customer’s accounts. This AWS error pertains to AWS API calls that are failing at a higher rate than what is expected based on cross-customer baselines. This particular error implies an AWS incident affecting the particular AWS resource type and API. <br/><img src={useBaseUrl('img/alerts/monitors/benchmark.png')} alt="Benchmark card" style={{border: '1px solid gray'}} width="800" />

* **A**. Name and description of the context card.
* **B**. Count of unusual Benchmarks by golden signal type.
* **C**. Dimensional detail of the unusual telemetry value.
* **D**. Comparison of your telemetry value (red bar) against benchmarks computed from other customers (gray bar).
* **E**. Expand/collapse details panel.
* **F**. Opens a Log Search filtered to the Log messages that match the dimensional details of the telemetry value

## Subscribe to monitors

### From your Alerts List

There are three places from your [Alerts List](#alert-list) to subscribe to a monitor:

* Right-click a row item > click **Subscribe**.
* Hover your mouse over a row, click the three-dot kebab menu > select **Subscribe**.
* Single-click a row item > click **Open** > on the opened alert page, click the three-dot kebab menu > **Subscribe to Monitor**.

### From your Monitors list

There are three places from your [Monitors list](/docs/alerts/monitors/settings/#accessing-monitors) to subscribe to a monitor:

* Right-click a row item > click **Subscribe**.
* Hover your mouse over a row > click the three-dot kebab menu > click **Subscribe**.
* Single-click a row item > in the side panel (Monitor Details), click **More Actions** > **Subscribe**.

#### From a folder

If you subscribe from a monitor folder, all nested monitors and folders within that folder become automatically subscribed.

For example, if you create a subscription on “Monitor A”, and then move it to subscribed “Folder B”, “Monitor A” will have two subscriptions because it’s directly subscribed and inherits subscription from its parent folder ("Folder B").

<details>
<summary>Click to see examples</summary>

#### Example 1

```bash title="Initial state"
📁 Folder A ("No")
├── Monitor B ("No")
└── Monitor C ("No")
```

```bash title="Create subscription on Folder A"
📁 Folder A ("Yes")
├──Monitor B ("Yes (inherited from folder)")
└──Monitor C ("Yes (inherited from folder)")
```

#### Example 2

```bash title="Initial state"
📁 Folder A ("No")
├── Monitor B ("No")
├── Monitor C ("No")
└── 📁 Folder D ("No")
    └── Monitor E ("No")
```

```bash title="Create subscription on Folder D"
📁 Folder A ("No")
├── Monitor B ("No")
├── Monitor C ("No")
└── 📁 Folder D ("Yes")
    └── Monitor E ("Yes (inherited from folder)")
 ```

#### Example 3

```bash title="Initial state"
📁 Folder A ("No")
├── Monitor B ("No")
├── Monitor C ("No")
└──  📁 Folder D ("No")
    └── Monitor E ("Yes")
```       

```bash title="Create subscription on Folder D"
📁 Folder A ("No")
├── Monitor B ("No")
├── Monitor C ("No")
└── 📁 Folder D ("Yes")
    └── Monitor E ("Yes")
```       

```bash title="Remove subscription on Monitor E"
📁 Folder A ("No")
├── Monitor B ("No")
├── Monitor C ("No")
└── 📁 Folder D ("Yes")
    └── Monitor E ("Yes (inherited from folder)"
```

</details>

To cancel an inherited subscription, you'll need to remove the subscription from a parent folder or move the monitor or folder into another location outside the folder with direct subscription.

## Notification preferences

Alert notification preferences give you granular control over specific monitor activity you want to follow. For more information, see [Alert preferences](/docs/get-started/account-settings-preferences/#alerts).
