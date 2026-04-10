---
id: tenable
title: Tenable
sidebar_label: Tenable
description: The Sumo Logic app for Tenable provides comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable platform.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/tenable-logo.png')} alt="Tenable icon" width="125"/>

The Tenable app empowers security professionals to gain comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable [Vulnerabilities API](https://developer.tenable.com/reference/exports-vulns-download-chunk), [Audit Events API](https://developer.tenable.com/reference/audit-log-events), and [Asset API](https://developer.tenable.com/reference/exports-assets-download-chunk). This integration enables you to proactively monitor, analyze, and respond to security vulnerabilities and audit events, helping you strengthen your cybersecurity defenses and reduce risk.

Key features of the Tenable app include:

- **Vulnerability Assessment**. Harness the Tenable Vulnerabilities API to perform in-depth vulnerability assessments across your infrastructure. This app provides a range of security use cases for vulnerabilities, including:
    - **Tracking Vulnerabilities Over Time**. Monitor the evolution of vulnerabilities over time, from their initial discovery to resolution.
    - **Identifying High-Severity Vulnerabilities**. Quickly pinpoint and prioritize high-severity vulnerabilities that require immediate attention.
    - **Identifying Affected Hosts**. Easily locate hosts affected by specific vulnerabilities and streamline remediation efforts.
    - **Checking for Exploitation**. Detect exploit availability and malware exploitation related to vulnerabilities.
- **Audit Event Monitoring**. Leverage the Tenable Audit Events API to monitor and analyze critical audit events within your organization. This app delivers valuable insights, including:
    - **Real-time Event Analysis**. Monitor audit events in real time to enable rapid incident response.
    - **Suspicious Activity Detection**. Identify suspicious or unauthorized activities across your network and systems.
    - **Compliance Reporting**. Streamline compliance monitoring by tracking events relevant to regulatory requirements.
    - **User Behavior Analysis**. Gain visibility into user behavior patterns and potential security risks.
- **Asset Event Monitoring**. Leverage the Tenable Assets Export API to gain comprehensive visibility into all assets across your infrastructure. This app provides a range of asset management use cases, including:
    - **Asset Discovery & Lifecycle Tracking**. Track new, terminated, and deleted assets to maintain a complete and current inventory.
    - **Operating System & System Type Breakdown**. View the distribution of operating systems and system types to support patching and compliance.
    - **Scan Source & Agent Coverage**. Monitor how assets are discovered and identify gaps in agent deployment across your environment.
    - **Asset Trend Analysis**. Track asset trends over time across network, OS, scan source, and agent coverage dimensions.
- **Enhanced Security Posture**. By combining data from the Tenable Vulnerabilities API, Audit Events API, and Asset Events API, you can strengthen your organization's security posture by proactively addressing vulnerabilities and monitoring security incidents.
- **Risk Reduction**. Identify and promptly mitigate high-severity vulnerabilities and security threats to reduce the risk of security breaches.
- **Efficient Remediation**. Locate affected hosts and prioritize remediation efforts to streamline the process of securing your environment.
- **Compliance Assurance**. Simplify compliance monitoring and reporting by tracking relevant audit events and security controls.
- **Real-time Insights**. Gain real-time insights into your security environment to enable rapid incident response and threat containment.

## Log types

This app uses [Tenable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source/) source to collect [Vulnerabilities data](https://developer.tenable.com/reference/exports-vulns-download-chunk), [Audit Events](https://developer.tenable.com/reference/audit-log-events) and [Asset API](https://developer.tenable.com/reference/exports-assets-download-chunk) from the Tenable platform.

## Sample log messages

Refer to the Tenable API documentation for [Vulnerabilities data](https://developer.tenable.com/reference/exports-vulns-download-chunk), [Audit Events](https://developer.tenable.com/reference/audit-log-events), and [Asset API](https://developer.tenable.com/reference/exports-assets-download-chunk) log messages.

## Sample queries

```sumo title="Vulnerability Events"
_sourceCategory={{Logsdatasource}} finding_id severity
| json "finding_id", "severity", "state", "asset.hostname", "plugin.family", "plugin.type" as id, severity, state, hostname, plugin_family, plugin_type nodrop
| where !isBlank(plugin_type)

// global filters
| where severity matches "{{severity}}" and state matches "{{state}}" and hostname matches "{{hostname}}" and plugin_family matches "{{plugin_family}}"

| count by id, severity
| count by severity
| sort by _count, severity asc
```

```sumo title="Audit Events"
_sourceCategory={{Logsdatasource}} crud action
| json "id", "action","actor.name","crud" as id, action, actor_name, crud nodrop
| where !isEmpty(action)

// global filters
| where action matches "{{action}}" and actor_name matches "{{actor_name}}" and crud matches "{{crud}}"

| timeslice 1h
| count by id, _timeslice, action
| count as count by _timeslice, action
| transpose row _timeslice column action
| fillmissing timeslice
```

```sumo title="Asset Events"
_sourceCategory={{Logsdatasource}} first_seen id
| json "id", "operating_systems[0]" as id, os nodrop

// global filters
| where os matches "{{os}}"

| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Tenable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Tenable app is properly integrated and configured to collect and analyze your Tenable data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing Tenable dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Tenable - Overview** dashboard gives an overview of Tenable audit events, asset inventory, and vulnerability findings. Use this dashboard to monitor overall security posture across all Tenable data sources. 
<br/><img src={useBaseUrl('img/integrations/saas-cloud/Tenable-Overview.png')} style={{border: '1px solid gray'}} alt="Tenable Overview" width="800"/>

### Vulnerability Analysis

The **Tenable - Vulnerability Analysis** dashboard provides in-depth vulnerability assessments across your infrastructure. Use this dashboard to identify and prioritize vulnerabilities, track remediation efforts, and monitor trends in vulnerability data to strengthen your organization's security posture.
<br/><img src={useBaseUrl('img/integrations/saas-cloud/Tenable-Vulnerability-Analysis.png')} style={{border: '1px solid gray'}} alt="Tenable - Vulnerability Analysis" width="800"/>

### Audit Activity

The **Tenable - Audit Activity** dashboard leverages the Tenable Audit Events API to monitor and analyze critical audit events within your organization. Use this dashboard to track user activities, system changes, and security events, enabling you to identify potential security incidents and ensure compliance with regulatory requirements.
<br/><img src={useBaseUrl('img/integrations/saas-cloud/Tenable-Audit-Activity.png')} style={{border: '1px solid gray'}} alt="Tenable Audit Activity" width="800"/>

### Asset Inventory

The **Tenable - Asset Inventory** dashboard provides a view of Tenable asset data, including operating system distribution, network segmentation, scan sources, and geo location. Use this dashboard to track asset coverage and inventory health.
<br/><img src={useBaseUrl('img/integrations/saas-cloud/Tenable-Asset-Inventory.png')} style={{border: '1px solid gray'}} alt="Tenable - Asset Inventory" width="800"/>

## Create monitors for Tenable app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Tenable alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Tenable - High or Critical Severity Alerts` | Monitors and highlights high or critical severity detections for tenable. | Critical | Count > 3 |
| `Tenable - Multiple High or Critical Severity Detections from Single Host` | Monitors and highlights high or critical severity detections for a single host. | Critical | Count > 0 |

## Upgrade/Downgrade the Tenable app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Tenable app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
