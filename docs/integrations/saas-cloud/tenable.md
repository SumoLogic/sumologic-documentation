---
id: tenable
title: Tenable
sidebar_label: Tenable
description: The Sumo Logic app for Tenable provides comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable platform.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/tenable-logo.png')} alt="icon" width="125"/>

The Tenable app empowers security professionals to gain comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable [Vulnerabilities API](https://developer.tenable.com/reference/exports-vulns-request-export) and [Audit Events API](https://developer.tenable.com/reference/audit-log-events). This powerful integration allows you to proactively monitor, analyze, and respond to security vulnerabilities and audit events, helping you strengthen your cybersecurity defences and reduce risk.

Key features of the Tenable app include:

- **Vulnerability Assessment**. Harness the Tenable Vulnerabilities API to perform in-depth vulnerability assessments across your infrastructure. This app provides a range of security use cases for vulnerabilities, including:
    - **Tracking Vulnerabilities Over Time**. Monitor the evolution of vulnerabilities over time, from their initial discovery to resolution.
    - **Identifying High-Severity Vulnerabilities**. Quickly pinpoint and prioritize high-severity vulnerabilities that require immediate attention.
    - **Identifying Affected Hosts**. Easily locate hosts affected by specific vulnerabilities and streamline remediation efforts.
    - **Checking for Exploitation**. Detect exploit availability and malware exploitation related to vulnerabilities.
- **Audit Event Monitoring**. Leverage the Tenable Audit Events API to monitor and analyze critical audit events within your organization. This app delivers valuable insights, including:
    - **Real-time Event Analysis**. Monitor audit events in real time, allowing for rapid incident response.
    - **Suspicious Activity Detection**. Identify suspicious or unauthorized activities across your network and systems.
    - **Compliance Reporting**. Streamline compliance monitoring by tracking events relevant to regulatory requirements.
    - **User Behavior Analysis**. Gain visibility into user behavior patterns and potential security risks.
- **Enhanced Security Posture**. By combining data from the Tenable Vulnerabilities API and Audit Events API, you can strengthen your organization's security posture by proactively addressing vulnerabilities and monitoring the security incidents.
- **Risk Reduction**. Identify and mitigate high-severity vulnerabilities and security threats promptly, reducing the risk of security breaches.
- **Efficient Remediation**. Locate affected hosts and prioritize remediation efforts, streamlining the process of securing your environment.
- **Compliance Assurance**. Simplify compliance monitoring and reporting by tracking relevant audit events and security controls.
- **Real-time Insights**. Gain real-time insights into your security environment, enabling rapid incident response and threat containment.

## Log types

This app uses [Tenable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source/) source to collect [Vulnerabilities data](https://developer.tenable.com/reference/exports-vulns-request-export) and [Audit Events](https://developer.tenable.com/reference/audit-log-events) from the Tenable platform.

## Sample log messages

Refer to the Tenable API documentation for [Vulnerabilities data](https://developer.tenable.com/reference/exports-vulns-request-export) and [Audit Events](https://developer.tenable.com/reference/audit-log-events) log messages.

## Sample queries

```sql title="Vulnerability Events"
(_source=Tenable fqdn)
| json "asset.device_type", "asset.fqdn" ,"asset.hostname", "asset.ipv4", "asset.ipv6", "asset.last_authenticated_results", "asset.operating_system" , "output", "plugin.family" , "plugin.type" , "plugin.name", "plugin.risk_factor", "plugin.synopsis", "plugin.exploit_available" , "plugin.exploited_by_malware", "plugin.solution", "state", "scan.completed_at", "port.port", "port.protocol", "last_found" as device_type, fqdn, hostname, host_ipv4, host_ipv6, last_authenticated_scan_time, host_os, output,plugin_family, plugin_type ,plugin_name, plugin_risk_factor, plugin_synopsis, plugin_exploit_available, plugin_exploited_by_malware, plugin_solution, state, scan_completed_at, port, protocol, last_scan_time nodrop
```

```sql title="Audit Events"
_sourceCategory=Tenable
| json "description", "actor.name", "target.name", "action" as description, actor_name, target_name, action
```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

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

The **Tenable - Overview** dashboard provides in-depth vulnerability assessments across your infrastructure. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tenable/Tenable-Overview.png')} style={{border: '1px solid gray'}} alt="Tenable-Overview" width="800"/>

### Audit Activity

The **Tenable - Audit Activity** dashboard provides the user events data to monitor and analyze critical audit events within your organization using the Tenable Audit Events API.
<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tenable/Tenable-Audit-Activity.png')} style={{border: '1px solid gray'}} alt="Tenable-Audit-Activity" width="800"/>

## Upgrade/Downgrade the Tenable app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Tenable app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>