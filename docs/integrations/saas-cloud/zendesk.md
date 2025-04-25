---
id: zendesk
title: Zendesk
sidebar_label: Zendesk
description: The Zendesk app for Sumo Logic provides security analysts with critical visibility into their Zendesk environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zendesk-icon.png')} alt="Zendesk-icon" width="50" />

The Sumo Logic app for Zendesk is designed to provide security analysts with critical visibility into their organization's Zendesk environment. It offers real-time monitoring of audit events, user activity, and security-related changes such as logins, user provisioning, and configuration updates. The app includes dashboards that track the actions of users, groups, and organizations, highlighting potential risks like audits from risky locations or impossible login attempts. 

Security analysts can quickly identify anomalous behavior, unauthorized access, and suspicious activities through detailed visualizations of audit trails and geographic trends. The app's integration with Zendesk ensures seamless tracking of key security metrics, empowering analysts to detect, investigate, and respond to threats promptly. This makes it an essential tool for securing Zendesk environments and ensuring compliance with security policies.

:::info
This app includes [built-in monitors](#zendesk-monitors). For details on creating custom monitors, refer to [Create monitors for Zendesk app](#create-monitors-for-zendesk-app).
:::

## Log types

This app uses Sumo Logic’s Zendesk Source to collect [audit logs](https://developer.zendesk.com/api-reference/ticketing/account-configuration/audit_logs/) from Zendesk platform.

## Sample log messages

```json title="Event Log"
 {
  "url": "https://unity/api/v2/audit_logs/17296759404950.json",
  "id": 1729675940,
  "action_label": "Updated",
  "actor_id": 1729675940,
  "source_id": 44991493,
  "source_type": "organization",
  "source_label": "Organization: NCSOFT Corporation",
  "action": "update",
  "change_description": "Group changed from Premium Support to Premium Support Korea",
  "ip_address": "77.105.132.70",
  "created_at": "2024-10-23T15:02:20Z",
  "actor_name": "****** Langalia"
}
```
## Sample queries

```sql title="Total Audits"
_sourceCategory="Labs/Zendesk"
| json "url","id","action_label","actor_id","source_id","source_type","source_label","action","change_description","ip_address","created_at","actor_name" as url, id, action_label, actor_id, source_id, source_type, source_label, action, change_description, ip_address, created_at, actor_name nodrop

// Global filters
| where action matches "{{action}}"
| where actor_name matches "{{actor_name}}"
| where source_type matches "{{source_type}}"
| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Zendesk](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zendesk-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Zendesk app is properly integrated and configured to collect and analyze your Zendesk data.
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

## Viewing Zendesk dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Zendesk - Overview** dashboard provides a high-level summary of key security metrics. It tracks total audit events, newly created users, groups, and organizations, helping security analysts monitor real-time activity. The dashboard breaks down audit actions by type, source, and geography, allowing for quick identification of suspicious activity or trends, such as logins or audits from risky locations. Top actors and recent audits are displayed to show who is making changes. Analysts can also track sign-in events over time to spot unusual login patterns, ensuring timely detection of potential threats. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Zendesk/Zendesk-Overview.png' alt="Zendesk-Overview" />

## Create monitors for Zendesk app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Zendesk monitors

The Zendesk Monitors serve as a security tool, concentrating on observing essential operations and unusual occurrences within the Zendesk Platform. These notifications offer instantaneous insight into significant events, allowing security personnel to swiftly react to deviations or breaches.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Zendesk - Audits from Risky Locations` | This alert is triggered when audit events, such as user actions or configuration changes are performed from geographical locations identified as high-risk. These risky locations may correlate with regions known for cyberattacks or unauthorized activity, making it crucial to investigate these events for potential security risks. | Critical | Count > 0 | 
| `Zendesk - Impossible Login Events` | This alert notifies you of login attempts that are classified as *impossible*. This could mean logins from multiple geographically distant locations within a short time frame or logins from suspicious devices. Impossible login events often signal a compromise in account security, warranting immediate investigation to ensure no unauthorized access has occurred | Critical | Count > 0|

## Upgrading the Zendesk app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Zendesk app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>