---
id: metrics-anomalies-alerts
title: AI-Driven Alerts for Metrics Anomalies
description: Learn about AI-Driven Alerts for metrics-based monitors, which includes advanced anomaly detection and automated incident resolution through playbooks.
---

<!-- Move entire doc to /monitors/alerts docs -->

AI-driven alerts for metrics-based monitors use machine learning to analyze historical data, detect significant deviations, and filter out irrelevant alerts, reducing alert fatigue and allowing teams to focus on critical issues. These capabilities apply to both logs and metrics, providing a comprehensive monitoring solution.

Integrated playbooks automate incident response by gathering diagnostics, notifying teams, triggering recovery actions, streamlining workflows, and improving response times. The customizable "Cluster anomalies" detector allows users to set specific triggers for spiky systems, further reducing false positives and enabling faster issue resolution.

<details>
<summary>What are AI-driven alerts?</summary>

AI-driven alerts use machine learning to analyze historical data, establish baselines, and detect significant deviations in metrics signals. Seasonality detection reduces false positives, and integrated playbooks automate incident response, helping teams resolve issues faster.

</details>

## Key features

### Advanced anomaly detection

- **Machine learning models**. Use 30 days of historical data to establish baseline behavior and detect deviations.
- **Seasonality detection**. Identify recurring patterns, minimizing false positives from periodic spikes.
- **Auto-tuning**. Automatically adjust detection parameters to balance noise and relevance.
- **Extensible detection framework**. Customizable rules, such as "Cluster anomalies," allow for advanced incident detection based on multiple data points exceeding thresholds within a defined time window.

### Playbook integration

Automate responses to anomalies, including diagnostics, team notifications, and recovery tasks like restarting services or scaling infrastructure by linking playbooks to metrics-based monitors.

## Prerequisites

To fully leverage AI-driven alerts for metrics monitors, you'll need:

- **Automation Service**. Required for linking playbooks to metrics-based monitors.
- **Metrics data**. Metrics data must be sent to Sumo Logic for anomaly detection.
- **Metrics aggregation**. Queries that return multiple time series should be aggregated (e.g., using `sum` or `avg` operators) before applying anomaly detection.



## Create a metrics anomaly monitor

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**.
1. Under **Trigger Conditions**:
   * For **Monitor Type**, select **Metrics**.
   * For **Detection Method**, select **Anomaly**.
1. Enter your alert conditions, notification settings by going to [Create a Monitor](docs/alerts/monitors/create-monitor.md) and following steps 2 to the end.

## Examples

* **Cluster anomalies detection**. A user configures alerts for anomalies when 5 out of 10 data points in a 10-minute window exceed the baseline, allowing for precision in spiky environments.
* **Automating resolution with playbooks**. A playbook responds to CPU usage anomalies by gathering logs, notifying teams, and restarting affected servers.

## Limitations

Anomaly detection applies to one time series at a time. Multi-time series queries must be aggregated before detection.

## Getting started with playbooks

1. Visit **Automation Service App Central**.
2. Browse over 500 pre-built playbooks.
3. Clone and customize a playbook based on your requirements.

By leveraging pre-built playbooks, you can quickly automate incident responses, reducing time to resolution.

## More information

* [Automation Service](/docs/platform-services/automation-service)
* [Automated Playbooks](/docs/alerts/monitors/use-playbooks-with-monitors/)
* [Create a Monitor](/docs/alerts/monitors/create-monitor)
* [App Central](/docs/platform-services/automation-service/app-central)
* [Metrics Operators](/docs/metrics/metrics-operators)
