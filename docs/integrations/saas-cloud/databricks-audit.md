---
id: databricks-audit
title: Databricks Audit
sidebar_label: Databricks Audit
description: The Databricks Audit app for Sumo Logic provides insights into your organization's cybersecurity practices to strengthen security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/collector/databricks-icon.png')} alt="thumbnail icon" width="70"/>

The Sumo Logic app for Databricks Audit provides insights into your organization's security analytics. It provides real-time visibility into user activity, administrative operations, and security-related events across Databricks workspaces, empowering security and compliance teams to quickly detect, investigate, and respond to suspicious behavior.

By ingesting Databricks audit logs, the app enables detection of potential threats such as unauthorized access attempts, privilege escalations, and anomalous job or login activities. Preconfigured dashboards highlight user access trends, critical configuration changes, error patterns, and high-risk operations, helping analysts proactively identify emerging threats and compliance risks.

With rich visualizations and detailed event insights, the app enhances oversight of sensitive data access and strengthens the overall security posture of Databricks environments.

:::info
This app includes [built-in monitors](#databricks-audit-monitors). For details on creating custom monitors, refer to [Create monitors for Databricks Audit app](#create-monitors-for-databricks-audit-app).
:::

## Log types

This app uses Sumo Logic’s [Databricks Audit source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/databricks-audit-source/) to collect the [audit logs](https://docs.databricks.com/api/workspace/statementexecution/executestatement) from the Databricks Audit platform.

## Sample log messages

<details>
<summary>Audit Log</summary>

```json
{
 "account_id":"83860f25-7194-4d0c-a304-8902b05c4b0e",
 "action_name":"tokenLogin",
 "audit_level":"WORKSPACE_LEVEL",
 "event_date":"2025-10-23",
 "event_id":"3dd93080-f90f-3ea4-8870-6b7527b77393",
 "event_time":"2025-10-23T09:11:56.509Z",
 "identity_metadata":"{\"run_by\":null,\"run_as\":null,\"acting_resource\":null}",
 "request_id":"46e37143-8bb4-45ec-a63e-1eefe3d716bc",
 "request_params":"{\"user\":\"ddb92362-81fa-4f41-b5d3-e5a747e0b2f5\",\"tokenId\":\"33846778b496e5a557f17ade5b0fe2e4afce8e4c90378fc130c5537c9042a94c\",\"authenticationMethod\":\"API_INT_PAT_TOKEN\"}",
 "response":"{\"status_code\":\"200\",\"error_message\":null,\"result\":null}",
 "service_name":"accounts",
 "session_id":null,
 "source_ip_address":"10.251.166.254",
 "user_agent":"Apache-HttpClient/4.5.14 (Java/17.0.15) Databricks-Service/driver DBHttpClient/v2RawClient",
 "user_identity":"{\"email\":\"ddb92362-81fa-4f41-b5d3-e5a747e0b2f5\",\"subject_name\":null}",
 "version":"2.0",
 "workspace_id":"4150696479394378"
}
```
</details>

## Sample queries

```sql title="Total Alerts"
_sourceCategory="Labs/DatabricksAudit"
| json "action_name", "audit_level", "event_time", "response", "service_name", "source_ip_address", "user_identity", "workspace_id" as action_name, audit_level, event_time, response, service_name, ip_address, user_identity, workspace_id nodrop
| json field=response "status_code", "result", "error_message" as status_code, result, error_message nodrop
| json field=user_identity "email" as email_id nodrop

// global filters
| where email_id matches "{{email_id}}"
| where action_name matches "{{action_name}}"
| where audit_level matches "{{audit_level}}"
| where service_name matches "{{service_name}}"
| where ip_address matches "{{ip_address}}"
| where status_code matches "{{response_code}}"

// panel specific
| where !isNull(email_id)
| count by email_id
| count
```

```sql title="API Response Code"
_sourceCategory="Labs/DatabricksAudit"
| json "action_name", "audit_level", "event_time", "response", "service_name", "source_ip_address", "user_identity", "workspace_id" as action_name, audit_level, event_time, response, service_name, ip_address, user_identity, workspace_id nodrop
| json field=response "status_code", "result", "error_message" as status_code, result, error_message nodrop
| json field=request_params "authenticationMethod" as authentication_method nodrop
| json field=user_identity "email" as email_id nodrop

// global filters
| where email_id matches "{{email_id}}"
| where action_name matches "{{action_name}}"
| where audit_level matches "{{audit_level}}"
| where service_name matches "{{service_name}}"
| where ip_address matches "{{ip_address}}"
| where status_code matches "{{response_code}}"

// panel specific
| where !isBlank(event_id) and !isBlank(status_code)
| count by event_id ,status_code
| count as frequency by status_code
| sort by frequency, status_code
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Databricks Audit](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/databricks-audit-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Databricks Audit app is properly integrated and configured to collect and analyze your Databricks Audit data.
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

## Viewing the Databricks Audit dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Databricks Audit - Overview** dashboard provides a comprehensive view of user activity, workspace operations, and security event trends across your Databricks environment. It delivers instant visibility into key metrics such as total users, total workspaces, and audit level distribution, helping teams quickly understand usage patterns and organizational structure.

The dashboard tracks login activity and failed login attempts over time, allowing for rapid detection of authentication anomalies and potential security risks. Panels highlight the most active services and actions, along with a detailed audit summary, supporting effective monitoring of operational events and risk assessment.

By consolidating these critical insights, the dashboard enables security and compliance teams to detect unusual behaviors, investigate incidents, and proactively strengthen the security of their Databricks workspaces. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Databricks-Audit/Databricks-Audits-Overview.png' alt="Databricks-Audit-Overview" />

### Security Overview

The **Databricks Audit - Security Overview** dashboard provides targeted insights into key security events and potential risk exposures across your Databricks environment. It enables proactive detection of suspicious activity by visualizing failed API calls over time, authentication method usage, and API response codes that may indicate unauthorized access attempts or configuration issues.

Security teams can easily track trends in failed authentications and API errors, investigate root causes, and identify patterns that signal emerging threats or compliance violations. The dashboard also includes a geographic overview of audit activities, highlighting events originating from embargoed or high-risk regions to help monitor potential data exfiltration or policy breaches.

By consolidating these critical security indicators, including summaries of failed API attempts and geographic context, the dashboard empowers teams to rapidly investigate incidents, respond to evolving risks, and maintain strong security and compliance across all Databricks workspaces. <br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Databricks-Audit/Databricks-Audits-Security.png' alt="Databricks-Audit-Security" />

## Create monitors for Databricks Audit app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Databricks Audit monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Databricks Audits - Audits from Embargoed Geo Locations` | This alert is triggered when audit logs are generated from sanctioned or embargoed regions, helping you to maintain compliance with legal and regulatory requirements. | Critical | Count > 0 | 
| `Users with Failed Login` | This alert is triggered when a user has more than three failed login attempts, supporting early detection of potential unauthorized access attempts. | Critical | Count > 3 |

## Upgrading the Databricks Audit app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Databricks Audit app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>