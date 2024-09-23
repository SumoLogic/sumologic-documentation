---
id: metrics-anomalies-alerts
title: AI-Driven Alerts for Metrics Anomalies
description: Learn about AI-Driven Alerts for metrics-based monitors, which includes advanced anomaly detection and automated incident resolution through playbooks.
---

<!-- Move this content to /monitors/alerts docs -->

AI-driven alerts for metrics-based monitors leverage machine learning-powered anomaly detection and automated playbooks to help you reduce alert fatigue and improve incident response times. By analyzing historical data and identifying significant deviations, the system isolates critical issues while filtering out irrelevant alerts.

These capabilities extend across both logs and metrics data, providing a comprehensive solution for monitoring modern applications. With integrated playbooks, you can automate incident resolution workflows, streamlining the response process and enhancing operational efficiency.


## Key features

### Advanced anomaly detection

- **Machine Learning-Based Models**. Utilize 30 days of historical data to establish a baseline for system behavior, identifying deviations that warrant investigation.
- **Seasonality Detection**. Automatically detects recurring patterns (e.g., hourly or weekly cycles), reducing false positives from expected periodic spikes.
- **Auto-Tuning of Detection Parameters**. Minimizes the need for manual configuration by automatically tuning parameters to balance noise and relevance.
- **Extensible Detection Framework**. Allows users to customize detection rules, such as the "Cluster anomalies" feature, which can detect incidents based on multiple data points exceeding thresholds within a defined time window.

### Playbook Integration

- **Automation Service**. Users can link playbooks to metrics-based monitors, allowing automated responses to anomalies. Playbooks can be configured to gather diagnostics, notify relevant teams, and execute recovery tasks like restarting services or scaling infrastructure.


## Prerequisites

To fully leverage AI-driven alerts for metrics monitors, the following conditions must be met:

- **Automation Service**. Required for linking playbooks to metrics-based monitors.
- **Metrics Data**. Metrics data must be sent to Sumo Logic for anomaly detection.
- **Metrics Aggregation**. Queries that return multiple time series should be aggregated (e.g., using `sum` or `avg` operators) before applying anomaly detection.


## How AI-Driven Alerts work

AI-driven alerts use a machine learning model to analyze historical data and establish a baseline for expected behavior in metrics signals. The model continuously monitors metrics data and detects significant deviations, triggering alerts for critical issues while ignoring minor, expected fluctuations.

Seasonality detection ensures that recurring patterns, such as daily traffic spikes, do not cause unnecessary alerts. Users can also fine-tune anomaly detection through the **extensible detection framework**, enabling advanced configurations like clustering anomalies over a specified time window.

When an anomaly is detected, associated **playbooks** are automatically triggered. These playbooks can handle diagnostic steps, escalate issues to relevant team members, and even automate recovery actions, significantly reducing the time to resolution.


## Business impact

AI-driven alerts help you manage the growing volume of data and complexity in modern applications by reducing irrelevant alerts and streamlining the resolution process.

- **Alert Reduction**. AI-driven anomaly detection reduces the number of irrelevant alerts by focusing on significant deviations, allowing teams to address the most critical issues.
- **Time Savings**. By automating incident response tasks, including diagnostics and recovery, teams can resolve incidents more quickly and efficiently.
- **Operational Efficiency**. Reducing alert fatigue and automating repetitive tasks frees up resources for higher-value activities.

For example, high-traffic systems often generate frequent alerts due to predictable spikes in activity. AI-driven alerts can differentiate between expected behavior and true anomalies, significantly reducing alert noise.


## Use Cases

### Reducing alert fatigue in high-traffic environments

A user with a high-volume application experiences frequent CPU spikes. AI-driven anomaly detection identifies expected traffic patterns and filters out predictable noise, allowing the team to focus on genuine issues.

### Automating incident response in complex infrastructure

A user managing a large-scale, multi-service infrastructure uses AI-driven alerts and playbooks to automate incident response. When an anomaly is detected, the playbook automatically gathers diagnostics, escalates the issue to the appropriate teams, and initiates a recovery action such as restarting affected services.

### Customizing anomaly detection for systems with frequent spikes

For systems with inherently spiky behavior, the **Cluster anomalies** detector allows you to configure the system to trigger alerts only when a specific number of anomalies occur within a defined time window. This reduces false positives while ensuring critical incidents are captured.


## Examples

### Configuring a cluster anomaly detector

A user configures a **Cluster anomalies** detector that triggers alerts when 5 out of 10 data points in a 10-minute window exceed the baseline threshold. This allows for detection of incidents in environments with frequent spikes, without triggering unnecessary alerts.

### Automating Incident Resolution with Playbooks

A user sets up a playbook for handling CPU usage anomalies. When the system detects that CPU usage has exceeded the baseline for five consecutive minutes, the playbook automatically gathers diagnostic data (such as CPU and memory logs), notifies the on-call team, and attempts to restart the affected server.


## Limitations

There are a few considerations to keep in mind when using AI-driven alerts for metrics monitors:

- **Single time series limitation**. Anomaly detection is restricted to one time series at a time. For multi-time series queries, data must be aggregated before anomaly detection can be applied.
- **Automation service requirement**. Playbook functionality requires the Automation Service.


## Getting Started with Playbooks

To create a playbook for automating incident responses:

1. Visit the **Automation Service App Central**.
2. Browse through over 500 pre-built playbooks.
3. Clone an existing playbook that fits your needs.
4. Customize the playbook based on your specific monitoring and automation requirements.

By leveraging pre-existing playbooks, you can quickly deploy automated workflows for incident response, significantly reducing time to resolution.
