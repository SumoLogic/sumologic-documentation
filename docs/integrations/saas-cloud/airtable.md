---
id: airtable
title: Airtable
sidebar_label: Airtable
description: The Sumo Logic app for the Airtable app offers functionality for monitoring and analyzing your organization's Airtable audit logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="50" />

The Airtable app for Sumo Logic monitors and analyzes your organization's Airtable audit logs, providing insights into user activity, data trends, and security events. This app is based on the Airtable Audit Logs, which provide detailed information on all actions performed in your Airtable account.

The Airtable app makes it simple to import data from your Airtable audit logs into Sumo Logic, where you can perform real-time analysis and build dashboards to visualize key metrics. You can monitor security events and gain insights into user activity across your organization.

The Airtable app allows you to:
* Keep track of user activity within your Airtable account in real-time.
* Analyze user actions, identify failed executions, and track trends over time.
* View a summary of audit logs in table format, enabling you to identify anomalous behavior and potential security threats.
* Create customized dashboards to visualize important metrics and track key performance indicators.

The Airtable app also offers a pre-built dashboard that enables you to start monitoring your Airtable audit logs right away. The Airtable App for Sumo Logic is especially useful for organizations that must comply with regulatory requirements or maintain a high level of security. With the ability to monitor user activity and track changes in real time, you can quickly identify potential issues and respond to security incidents as they occur.

:::info
This app includes [built-in monitors](#airtable-monitors). For details on creating custom monitors, refer to the [Create monitors for Airtable app](#create-monitors-for-airtable-app).
:::

## Log type

This app uses Sumo Logic’s [Airtable Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/airtable-source/) to collect audit logs from the Airtable platform.

### Sample log messages

<details>
<summary>Audit Log</summary>

```json
{
   "id": "01JW9KZH4EY2RTXFYFQPP5BMD5",
   "timestamp": "2025-05-27T19:37:15.662Z",
   "action": "viewBase",
   "payloadVersion": "1.0",
   "payload": {
       "name": "Shipping Dashboard"
   },
   "modelId": "appmKiUIu71rbi12W",
   "modelType": "base",
   "origin": {
       "ipAddress": "70.117.49.197",
       "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
       "sessionId": "sapormPAliTbK05ob"
   },
   "context": {
       "enterpriseAccountId": "enttyhkKGivTO3Gva",
       "actionId": "actjW4n0Tzk7Mv5zh",
       "workspaceId": "wspATf36YDtiAli5y",
       "baseId": "appmKiZPu71rbi12W"
   },
   "actor": {
       "type": "user",
       "user": {
           "id": "usrq5x1aZdf567ExT",
           "email": "john@collectreport.com",
           "name": "John"
       }
   }
}
```
</details>

### Sample queries

```sql="Total Audit Logs"
_sourceCategory="Labs/Airtable"
| Json "id", "action", "actor.type", "actor.user.id", "actor.user.name", "actor.user.email", "modelId", "modelType", "context.actionId", "origin.ipAddress" as audit_id, action, actor_type, user_id, user_name, user_email, model_id, model_type, action_id, ip_address nodrop

// global filters
| where action matches "{{action}}"
| where actor_type matches "{{actor_type}}"
| where model_type matches "{{model_type}}"

// panel specific
| count audit_id 
| count
```

```sql="Newly Created Accounts/Users"
_sourceCategory="Labs/Airtable"
| Json "id", "action", "payload.type", "payload.user.id", "payload.user.name", "payload.user.email", "payload.name", "payload.email", "payload.previous.user.role", "payload.current.user.role", "payload.filename", "payload.user.permissionLevel", "payload.current.user.permissionLevel", "actor.type", "actor.user.email", "actor.user.name" as audit_id, action, payload_type, payload_user_id, payload_user_name, payload_user_email, payload_name, payload_email, previous_role, new_role, file_name, user_permission_level, current_user_permission_level, actor_type, actor_email, actor_name nodrop 

// global filters
| where action matches "{{action}}"
| where actor_type matches "{{actor_type}}"

// panel specific
| where toLowerCase(action) matches "createserviceaccount" or toLowerCase(action) matches "createuser" or toLowerCase(action) matches "provisionuser"
| if (isNull(actor_name), "unknown", actor_name) as actor_name
| if (isNull(actor_email), "unknown", actor_email) as actor_email
| payload_name as user_name
| payload_email as email_id
| count by _messageTime, action, user_name, email_id, actor_type, actor_email, actor_name
| sort by _messageTime
| fields - _count, _messageTime
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Airtable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/airtable-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Airtable app is properly integrated and configured to collect and analyze your Airtable data.
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

## Viewing Airtable dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Airtable - Overview** dashboard provides a high-level view of key metrics related to Airtable platform user activity, audits, and execution. It contains widgets that display data such as total audit logs and failed executions, action distribution, and top-performing actions and users. The dashboard also provides information on activity trends over time and user locations. The Audit Log Summary widget provides a quick overview of all platform activity. Overall, the dashboard helps users quickly understand how the platform is used and identify areas for improvement.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Airtable/Airtable+-+Overview.png')} alt="airtable-overview.png"/>

### Security Overview

The **Airtable - Security Overview** dashboard provides a high-level view of user activity related to security on the platform. It includes widgets that show data such as newly created accounts, access tokens, and deleted org units and workspaces. The dashboard also tracks changes in authentication methods, downloaded attachments, role updates, and user activity trends. In addition, it highlights users who have been newly assigned admin roles and any collaborator changes, helping to improve overall security monitoring.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Airtable/Airtable+-+Security+Overview.png')} alt="airtable-security-overview.png"/>

## Create monitors for Airtable app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Airtable monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Airtable - Embargoed Geo Locations of Audit Logs` | This alert is triggered when audit logs originating from sanctioned or embargoed regions are detected. This alert helps maintain adherence to legal and regulatory standards. | Critical | Count > 0 |

## Upgrade/Downgrade the Airtable app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Airtable app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>