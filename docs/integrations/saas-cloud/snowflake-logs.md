---
id: snowflake-logs
title: Snowflake Logs
sidebar_label: Snowflake Logs
description: The Sumo Logic app for Snowflake Logs allows you to gain real-time insights into key metrics, query performance, and overall health of Snowflake environments to optimize operations, support informed decisions, and maximize Snowflake's potential.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/snowflake.png')} alt="Thumbnail icon" width="150"/>

The Sumo Logic app for Snowflake Logs offers a powerful analytics solution designed to help you fully leverage the Snowflake cloud data platform. Known for its scalability and advanced data warehousing capabilities and analytics, Snowflake supports data-driven decision-making at scale.

The app provides real-time visibility into key metrics, query performance, and the overall health of Snowflake environments. By analyzing Snowflake logs, you can monitor system performance, track login activity, optimize data management, and maintain better control over your data warehouse.

With centralized monitoring and actionable insights, the app enables you to streamline operations, make informed decisions, and maximize the value of their Snowflake data assets.

:::info
This app includes [built-in monitors](#snowflake-logs-monitors). For details on creating custom monitors, refer to the [Create monitors for Snowflake Logs app](#create-monitors-for-snowflake-logs-app).
:::

## Log types

This app uses Sumo Logic’s [Snowflake Logs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/snowflake-logs-source/) to collect the data from the Snowflake Logs platform.

### Sample log messages

<details>
<summary>LOGIN_HISTORY</summary>

```json
{
   "CLIENT_IP": "52.44.184.81",
   "CLIENT_PRIVATE_LINK_ID": null,
   "CONNECTION": null,
   "ERROR_CODE": null,
   "ERROR_MESSAGE": null,
   "EVENT_ID": "1023469238922246",
   "EVENT_TIMESTAMP": "2025-06-12T01:14:02.745-04:00",
   "EVENT_TYPE": "LOGIN",
   "FIRST_AUTHENTICATION_FACTOR": "SAML2_ASSERTION",
   "IS_SUCCESS": "YES",
   "RELATED_EVENT_ID": "0",
   "REPORTED_CLIENT_TYPE": "SNOWFLAKE_UI",
   "REPORTED_CLIENT_VERSION": "9.15.2",
   "SECOND_AUTHENTICATION_FACTOR": "DUO_PUSH",
   "USER_NAME": "John"
}
```
</details>

<details>
<summary>SESSIONS</summary>

```json
{
   "AUTHENTICATION_METHOD":"Password",
   "CLIENT_APPLICATION_ID":"Go 1.14.0",
   "CLIENT_APPLICATION_VERSION":"1.14.0",
   "CLIENT_BUILD_ID":"",
"CLIENT_ENVIRONMENT":"{\"APPLICATION\":\"Go\",\"OS\":\"linux\",\"OS_VERSION\":\"gc-amd64\",\"OCSP_MODE\":\"FAIL_OPEN\",\"GO_VERSION\":\"go1.23.9 X:boringcrypto\"}",
   "CLIENT_VERSION":"0",
   "CLOSED_REASON":"LOGOUT",
   "CREATED_ON":"2025-06-12T01:59:56.812-07:00",
   "LOGIN_EVENT_ID":"41338407433",
   "SESSION_ID":"2709153701236758",
   "USER_NAME":"JOhn"
}
```
</details>

<details>
<summary>STAGES</summary>

```json
{
   "COMMENT": null,
   "CREATED": "2025-06-12T03:37:20.787-04:00",
   "DELETED": "2025-06-12T03:42:25.544-04:00",
   "DIRECTORY_ENABLED": null,
   "ENDPOINT": null,
   "INSTANCE_ID": null,
   "LAST_ALTERED": "2025-06-12T03:42:25.544-04:00",
   "OWNER_ROLE_TYPE": null,
   "STAGE_CATALOG": "CDWQA",
   "STAGE_CATALOG_ID": "46",
   "STAGE_ID": "42409",
   "STAGE_NAME": "dhgfak",
   "STAGE_OWNER": null,
   "STAGE_REGION": null,
   "STAGE_SCHEMA": "DVT",
   "STAGE_SCHEMA_ID": "371",
   "STAGE_TYPE": "Internal Named",
   "STAGE_URL": null,
   "STORAGE_INTEGRATION": null
}
```
</details>

<details>
<summary>DATA_TRANSFER_HISTORY</summary>

```json
{
   "BYTES_TRANSFERRED": 15562,
   "END_TIME": "2025-06-12T01:00:00-04:00",
   "SOURCE_CLOUD": "aws",
   "SOURCE_REGION": "us-east",
   "START_TIME": "2025-06-12T00:00:00-04:00",
   "TARGET_CLOUD": "aws",
   "TARGET_REGION": "us-west",
   "TRANSFER_TYPE": "COPY"
}
```
</details>

<details>
<summary>GRANTS_TO_USERS</summary>

```json
{
   "CREATED_ON": "2025-06-12T09:44:40.468-04:00",
   "DELETED_ON": null,
   "GRANTED_BY": "JOHN",
   "GRANTED_TO": "USER",
   "GRANTEE_NAME": "SUMO",
   "ROLE": "TESTER"
}
```
</details>

### Sample queries

```sql title="Users Login Over Time"
_sourceCategory="Labs/SnowflakeLogs"
| Json "REPORTED_CLIENT_TYPE", "USER_NAME", "FIRST_AUTHENTICATION_FACTOR", "SECOND_AUTHENTICATION_FACTOR", "AUTHENTICATION_METHOD", "SESSION_ID", "STAGE_ID", "STAGE_TYPE", "TRANSFER_TYPE", "CLIENT_IP", "CREATED_ON", "ROLE", "GRANTED_TO", "GRANTEE_NAME", "GRANTED_BY", "QUERY_TEXT", "QUERY_TYPE", "ROLE_NAME", "EXECUTION_STATUS", "EXECUTION_TIME" as client_type, user_name, first_authentication, second_authentication, authentication_method, session_id, stage_id, stage_type, data_transfer_type, ip_address, date, role, granted_to, grantee_name, granted_by, query_text, query_type, role_name, status, execution_time nodrop

// global filters
| where isNull(stage_type) or stage_type matches "{{stage_type}}"
| where isNull(authentication_method) or authentication_method  matches "{{authentication_method}}"
| where isNull(data_transfer_type) or data_transfer_type matches "{{data_transfer_type}}"
| where isNull(client_type) or client_type matches "{{client_type}}"
| where isNull(second_authentication) or second_authentication matches "{{2FA}}"

// panel specific
| where !isNull(client_type)
| timeslice 1d
| count by user_name, _timeslice
| count as frequency by _timeslice
| fillmissing timeslice
```

```sql title="Breakdown by Session Closed Reason"
_sourceCategory="Labs/SnowflakeLogs"
| Json "AUTHENTICATION_METHOD", "SESSION_ID", "CLOSED_REASON", "TARGET_CLOUD", "SOURCE_CLOUD", "REPORTED_CLIENT_TYPE", "CLIENT_IP", "IS_SUCCESS", "USER_NAME", "ERROR_CODE", "ERROR_MESSAGE", "TRANSFER_TYPE", "SOURCE_REGION", "TARGET_REGION", "BYTES_TRANSFERRED" as authentication_method, session_id, session_closed_reason, target_cloud, source_cloud, client_type, ip_address, is_success, user_name, error_code, error_message, data_transfer_type, source_region, target_region, bytes_transferred nodrop

// global filters
| where isNull(session_closed_reason) or session_closed_reason matches "{{session_closed_reason}}"
| where isNull(source_cloud) or source_cloud  matches "{{source_cloud}}"
| where isNull(target_cloud) or target_cloud matches "{{target_cloud}}"
| where isNull(login_success) or login_success matches "{{login_success}}"

// panel specific
| where !isNull(authentication_method)
| count by session_closed_reason, session_id
| count as frequency by session_closed_reason
| sort by frequency, session_closed_reason
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Snowflake Logs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/snowflake-logs-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Snowflake Logs app is properly integrated and configured to collect and analyze your Snowflake Logs data.
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

## Viewing Snowflake Logs dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Snowflake Logs - Overview

The **Snowflake Logs - Overview** dashboard provides a comprehensive view of key metrics and operational insights within your Snowflake environment. It enables real-time monitoring of user activity, system performance, and data transfer trends, helping stakeholders better understand overall usage and behavior.
Key panels include Total Users, 2FA Enabled Users, Total Sessions, User Geolocation, and more, allowing you to track login activity, system utilization, and authentication patterns over time. By analyzing data by authentication methods, transfer types, and other factors, you can proactively manage resources, optimize processes, and improve operational efficiency.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Snowflake-Logs/Snowflake+Logs+-+Overview.png')} alt="Entries Overview dashboard" />

### Snowflake Logs - Security

The **Snowflake Logs - Security** dashboard offers in-depth visibility into security-related activities and potential threats within your Snowflake environment. It highlights key events such as failed login attempts, data transfers, and geolocation-based login patterns. With metrics like Failed Login Summary, Data Transfer by Source Cloud Platform, and Transfers Over 1GB, the dashboard helps security teams identify anomalies, investigate incidents, and take proactive steps to mitigate risks effectively.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Snowflake-Logs/Snowflake+Logs+-+Security.png')} alt="Audits Overview dashboard" />

## Create monitors for Snowflake Logs app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Snowflake Logs monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Snowflake Logs - Data Transfer Limitation` | This alert is triggered when more than 1GB data transfer in single session occurs. | Critical | Count > 0 | 
| `Snowflake Logs - Logins from Embargoed Geo Locations` | This alert is triggered when logins are detected from sanctioned or embargoed regions. This helps you maintain adherence to legal and regulatory standards. | Critical | Count > 0|

## Upgrade/Downgrade the Snowflake Logs app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Snowflake Logs app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>