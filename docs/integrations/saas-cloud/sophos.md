---
id: sophos
title: Sophos
sidebar_label: Sophos
description: The Sumo Logic app for Sophos offers robust security monitoring and threat detection capabilities by analyzing your organization's Sophos alerts and events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sophos.jpeg')} alt="icon" width="40"/>

The Sumo Logic app for Sophos delivers robust security monitoring and threat detection capabilities by harnessing detailed data from Sophos security solutions. This app features pre-configured dashboards that provide deep insights into security events and alerts, enabling security teams to quickly identify, analyze, and respond to potential threats.

With a comprehensive view of all security events, categorized by severity and type, the app offers visual tools such as geo-location mapping and event timelines to help prioritize incident response. It also emphasizes alert severity, sources, and affected products, highlighting trends and common issues that may require immediate attention.

By analyzing the frequency and types of alerts, security teams can track evolving threats and refine their defense strategies. The app also includes a real-time recent alerts section, allowing for rapid assessment and response to active threats.

Overall, the Sumo Logic app for Sophos equips organizations with the essential tools to strengthen their security posture and defend against sophisticated cyber threats.

:::info
This app includes [built-in monitors](#sophos-alerts). For details on creating custom monitors, refer to [Create monitors for Sophos app](#create-monitors-for-sophos-app).
:::

## Log types

This app uses Sumo Logic’s Sophos Source to collect [Alerts](https://developer.sophos.com/docs/common-v1/1/routes/alerts/get) and [Events](https://developer.sophos.com/docs/siem-v1/1/routes/events/get) from the Sophos Central platform.

### Sample log messages

```json title="Alerts"
{
  "id": "aaabbbdddcccddd",
  "allowedActions": [
    "acknowledge"
  ],
  "category": "denc",
  "description": "Device is not encrypted.",
  "groupKey": "NCxFdbhf5bnghVuYzo6RGlza05bfgh5W50LDEs",
  "managedAgent": {
    "id": "aaabbbdddcccddd",
    "type": "computer"
  },
  "product": "encryption",
  "raisedAt": "2024-08-23T13:38:41.904Z",
  "severity": "medium",
  "tenant": {
    "id": "aaabbbdddcccddd",
    "name": "Sumo AB"
  },
  "type": "Event::Endpoint::SavDisabled",
  "person": {
    "id": "aaabbbdddcccddd"
  }
}
```

```json title="Events"
{
  "endpoint_type": "computer",
  "endpoint_id": "c64b280-acd2-4483-b5qf-00e324de24",
  "user_id": "aaabbbdddcccddd",
  "when": "2024-08-25T05:08:16.023Z",
  "type": "Event::Endpoint::ServiceNotRunning",
  "source": "johnRH\\john",
  "location": "john-RH",
  "severity": "high",
  "id": "aaabbbdddcccddd",
  "group": "PROTECTION",
  "created_at": "2024-07-06T05:08:16.033Z",
  "source_info": {
    "ip": "0.0.0.0"
  },
  "customer_id": "b0gfd2ae-1cw9-422e-a8f5-12fbf70bxd42",
  "name": "One or more Sophos services are missing or not running"
}
```

### Sample queries

```sql title="Total Alerts"
_sourceCategory=sophos managedAgent raisedAt // mandatory fields for alerts
| json "severity","category","product","managedAgent.type","tenant.name","type","description","raisedAt","id" as severity,category,product,source,tenant,type,description,raisedAt,id nodrop

// Global filters
| where severity matches "*"
| where product matches "*"
| where category matches "*"
| where type matches "*"
| where source matches "*"
| where tenant matches "*"

| count by id
| count

```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for Sophos](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sophos-central-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Sophos app is properly integrated and configured to collect and analyze your Sophos data.
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

## Viewing Sophos dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Alerts Overview

The **Sophos - Alerts Overview** dashboard offers a comprehensive overview of security alerts across your network. This dashboard helps you to visualize the total number of alerts and their severity, breaking them into High, Medium, and Low categories to facilitate a prioritized response to critical threats. The dashboard highlights the top 10 most common alert types, providing insight into recurring security issues that require attention. It tracks alert trends over time and by categories such as panic, runtime detections, and policy, helping to identify patterns and shifts in the threat landscape. Additionally, it provides a detailed breakdown of alerts by their source (for example: computer, mobile) and the products affected (for example, encryption, endpoint), as well as a ranking of tenants based on the number of alerts, useful for organizations with multi-tenant environments. The recent alerts section lists the latest incidents with detailed descriptions, enabling quick analysis and response.<br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sophos/Sophos-Alerts-Events.png')} alt="Sophos-Alerts-Events" />

### Events Overview

The **Sophos - Events Overview** dashboard provides a comprehensive summary of security events detected by Sophos across your network. This dashboard also provides a high-level view of the total number of security events, categorized by severity and type, helping you to quickly assess the security posture of your environment.<br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sophos/Sophos-Events-Overview.png')} alt="Sophos-Events-Overview" />

## Create monitors for Sophos app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Sophos alerts

The Sumo Logic app for Sophos includes a comprehensive set of monitors designed to enhance security monitoring and incident response. These alerts are triggered by critical security events, such as the detection of blocklisted activities, high-severity alerts, and events indicating potential threats like ransomware or malicious traffic. For instance, specific alerts notify when malware cannot be automatically cleaned up, when real-time protection is disabled for an extended period, or when ransomware attempts to access the file system. By focusing on the severity and nature of these security incidents, the app provides actionable insights, enabling security teams to respond promptly and effectively to emerging threats.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Sophos - Blocklisted Alerts` | This alert is fired when blocklisted alerts are generated, signaling a critical security event.| Critical | Count > 0 |
| `Sophos - High Severity Alerts` | This alert is fired upon generation of high-severity alerts, indicating significant security threats. | Critical | Count > 0 | 
| `Sophos - High Severity Events` | This alert is fired when high-severity events occur, highlighting major incidents that require immediate attention.|Critical | Count > 0 | 
| `Sophos - Malicious Traffic Detected` | This alert is fired when suspicious network traffic, possibly linked to a botnet or malware attack, is detected, ensuring proactive threat mitigation. | Critical | Count > 0 | 
| `Sophos - Malware Not Cleaned-Up` | This alert is fired when some detected malware remains unresolved for over 24 hours, indicating a potential persistence of the threat. | Critical | Count > 0 | 
| `Sophos - Manual Cleanup Required` | This alert is fired when malware cannot be automatically removed, requiring manual intervention to eliminate the threat. | Critical | Count > 0 | 
| `Sophos - Medium Severity Alerts` | This alert is fired when upon generation of more than five medium-severity alerts, providing early warnings of potential issues. | Critical | Count > 5 | 
| `Sophos - Medium Severity Events` | This alert is fired when upon five medium-severity events are logged, indicating a cluster of notable but less critical incidents. | Critical | Count > 5 | 
| `Sophos - Ransomware Detected` | Detects and alerts when ransomware is found and blocked, preventing file system access and potential damage. | Critical | Count > 0 | 
| `Sophos - Real Time Protection Disabled` | This alert is fired when real-time protection is disabled for more than 2.5 hours, leaving systems vulnerable to threats. | Critical | Count > 0 | 
| `Sophos - Running Manual Not Cleaned Up` | This alert is fired when a program running on a computer exhibits malicious or suspicious behavior that cannot be cleaned up. | Critical | Count > 0 | 

## Upgrade/Downgrade the Sophos app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sophos app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
