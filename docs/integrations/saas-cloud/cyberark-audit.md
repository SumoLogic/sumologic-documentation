---
id: cyberark-audit
title: CyberArk Audit
sidebar_label: CyberArk Audit
description: The CyberArk Audit app for Sumo Logic provides insights into your organization's cybersecurity practices to strengthen security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cyberark.png')} alt="thumbnail icon" width="50"/>

The Sumo Logic app for CyberArk Audit is a robhust tool that provides insights into your organization's cybersecurity practices. It helps IT and security teams monitor, analyze, and visualize audit trails of user activities, security events, and anomalies. By tracking data on security events, identity management, component usage, and administrative actions, the app delivers actionable intelligence to identify and mitigate security risks, ensuring compliance with regulations and internal policies. Customizable dashboards and detailed reporting enhance its ability to strengthen security.

:::info
This app includes [built-in monitors](#cyberark-audit-monitors). For details on creating custom monitors, refer to [Create monitors for CyberArk Audit app](#create-monitors-for-cyberark-audit-app).
:::

## Log types

This app uses Sumo Logic’s [CyberArk Audit source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cyberark-audit-source/) to collect the audit logs from the CyberArk Audit platform.

## Sample log messages

<details>
<summary>Audit Log</summary>

```json
{
  "uuid": "c131ad7d-af67-4a80-907c-3f982ef5d3be",
  "tenantId": "9880566d-4831-4a33-9e11-f4958deae142",
  "timestamp": 1742370356027,
  "username": "PVWAGWUser",
  "applicationCode": "PAM",
  "auditCode": "PAM00088",
  "auditType": "Info",
  "action": "Set Password",
  "userId": "PVWAGWUser",
  "source": "PVWAAPP",
  "actionType": "Password",
  "component": "Vault",
  "serviceName": "Privilege Cloud",
  "accessMethod": null,
  "accountId": "",
  "target": "",
  "command": null,
  "sessionId": null,
  "message": "",
  "customData": {
  "PAM": {
          "new_target": "",
          "target": ""
         }
  },
  "cloudProvider": null,
  "cloudWorkspacesAndRoles": [],
  "cloudIdentities": null,
  "cloudAssets": null,
  "safe": "",
  "accountName": "",
  "targetPlatform": "",
  "targetAccount": "",
  "identityType": null
}
```
</details>

## Sample queries

```sql title="Password Reset Events"
_sourceCategory="Labs/CyberArkAudit"
| json "uuid", "auditType", "serviceName", "actionType", "action", "identityType", "source", "auditCode", "timestamp", "tenantId", "username", "userId", "component", "message", "customData" as id, audit_type, service_name, action_type, action, identity_type, source, audit_code, timestamp, tenant_id, username, user_id, component, message, custom_data nodrop

// global filters
| where service_name matches "{{service_name}}"
| where action_type matches "{{action_type}}"
| where audit_type matches "{{audit_type}}"
| where component matches "{{component}}"
| where audit_code matches "{{audit_code}}"
| where action matches "{{action}}"
| where if ("{{identity_type}}" = "*", true, identity_type matches "{{identity_type}}")

// panel logic
| where toLowerCase(action_type) matches "password" AND toLowerCase(action) matches "set password"
| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for CyberArk Audit](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cyberark-audit-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your CyberArk Audit app is properly integrated and configured to collect and analyze your CyberArk Audit data.
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

## Viewing the CyberArk Audit dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **CyberArk Audit - Overview** dashboard provides a comprehensive view of audit data, helping teams assess cybersecurity events in your organization. It displays key metrics like total events to display the volume of audit activities, explore events through service names and action types to reveal system access patterns. By categorizing events by audit and identity types, you can get insights into different event categories and user behaviors. Trend analysis and event distribution by geography helps you to identify anomalies, while summaries of deleted events highlights the active and ghost IT activities. This dashboard is the central nervous system for operational monitoring and strategic cybersecurity decisions. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/CyberArk-Audit/CyberArk+Audit+-+Overview.png' alt="CyberArk-Audit-Overview" />

### Security Overview

The **CyberArk Audit - Security Overview** dashboard provides focuses on security metrics related to audit events for network administrators and cybersecurity teams. It highlights high-risk activities such as password resets, suspicious threats, and multi-factor authentication (MFA) events. The dashboard shows administrative events by location, noting activities from embargoed areas. It visualizes OAuth token generation trends to identify anomalies and secure access points. Summaries of password resets, administrative events, and login attempts help detect vulnerabilities and unauthorized access, enhancing cybersecurity defense. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/CyberArk-Audit/CyberArk+Audit+-+Security+Overview.png' alt="CyberArk-Audit-Security-Overview" />

### Logins

The **CyberArk Audit - Logins** dashboard provides an overview of user authentication activities, tracking successful and failed login trends. It visualizes successful logins by location and flags access from embargoed areas, emphasizing geopolitical access restrictions. For failed logins, the dashboard identifies locations and top users involved, highlighting potential account compromises. This dashboard helps security teams strengthen authentication and prevent unauthorized access, enhancing overall cybersecurity. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/CyberArk-Audit/CyberArk+Audit+-+Logins.png' alt="CyberArk-Audit-Logins" />

## Create monitors for CyberArk Audit app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### CyberArk Audit monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `CyberArk Audit - Events from Embargoed Locations` | This alert is triggered when CyberArk activity is detected from embargoed or restricted locations. This may indicate unauthorized access attempts from high-risk regions. | High | Count > 0 | 
| `CyberArk Audit - Excessive Password Resets` | This alert is triggered when an unusually high number of password resets occur within a short period. This could be a sign of compromised accounts or malicious insider activity. | High | Count > 5 |
| `CyberArk Audit - Failed Login Attempts` | This alert is triggered when repeated failed login attempts are detected, indicating brute force attacks or unauthorized attempts to access privileged accounts. | Critical | Count > 0|
| `CyberArk Audit - Multiple Failed Vault Access Attempts` | This alert notifies you when multiple failed attempts are made to access the CyberArk vault, signaling potential credential theft or unauthorized access attempts. | Critical | Count > 3|
| `CyberArk Audit - OAuth Token Generation Events from Embargoed Locations` | This alert is triggered when OAuth tokens are generated from embargoed locations, which may indicate a potential security breach or misuse of privileged access. | High | Count > 0|
| `CyberArk Audit - Threats Detected` | This alert is triggered when threats within CyberArk, such as unauthorized access, suspicious activity, or potential compromise of privileged credentials are detected. | Critical | Count > 0|

## Upgrading the CyberArk Audit app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the CyberArk Audit app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>