---
id: automox
title: Automox
sidebar_label: Automox
description: The Sumo Logic app for Automox provides security and IT teams visibility into endpoint management and security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/automox-logo.png')} alt="Automox-icon" width="50" />

Automox is a cloud-native endpoint management solution that automates patching, configuration, and security enforcement across various operating systems. This app helps organizations monitor security events, audit system activity, and track patch compliance to reduce vulnerabilities and enhance endpoint security. The Sumo Logic app for Automox provides security and IT teams visibility into endpoint management and security.

Key features and benefits of Automox include:

- **Patch Compliance and Version Tracking**. Gain insights into patch compliance by tracking applied and pending patches across different OS versions.
- **Security Event Monitoring and Anomaly Detection**. Monitor security events, including policy actions, system modifications, and user activity, to detect anomalies.
- **Audit and Compliance for Administrative Actions**. Audit administrative actions, authentication logs, and system configuration changes for compliance and forensic investigations.
- **Trend Analysis for Risk Identification and Security Optimization**. Analyze trends over time to identify potential risks and optimize endpoint security strategies.
- **Real-Time Alerts for Security and Compliance Response**. Leverage real-time alerts to respond quickly to critical security issues and compliance gaps.

Integrating Automox data into Sumo Logic helps organizations enhance security monitoring, streamline endpoint management, and boost operational resilience.

:::info
This app includes [built-in monitors](#automox-alerts). For details on creating custom monitors, refer to the [Create monitors for Automox app](#create-monitors-for-the-automox-app).
:::

## Log types

This app uses Sumo Logic’s [Automox Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/automox-source/) to collect [audit logs](https://developer.automox.com/openapi/audit-trail/operation/getAuditEvents/) and [events logs](https://developer.automox.com/openapi/axconsole/operation/getEvents/) from Automox.

## Sample log message

```json title="Event Log"
{
    "id": 1245817905,
    "name": "user.create",
    "user_id": 93789,
    "server_id": null,
    "organization_id": 114830,
    "policy_id": null,
    "data": {
            "email": "abc.123@example.com",
            "orgname": "Sumo Logic",
            "lastname": "Raval",
            "trialend": null,
            "firstname": "abc",
            "trialstart": null
            },
    "server_name": null,
    "policy_name": null,
    "policy_type_name": null,
    "create_time": "2024-09-26 07:30:19.223963"
}
```

```json title="Audit Log"
{
    "id": "66f50ffd8be0f28b7ba2f05a7a",
    "activity": "Attach Policy",
    "activity_id": 7,
    "actor": {
            "user": {
                    "email_addr": null,
                    "org": {
                            "uid": "dfffdf9c-0844-4302-80fb-31f9c27d5f74",
                            "name": "Sumo Logic"
                           },
                    "uid": null
                    }
             },
    "category_uid": 3,
    "class_uid": 3001,
    "count": 1,
    "message": "User Zone Role Assignment",
    "metadata": {
                "tenant_uid": null,
                "uid": "7f4bf345-a188-42de-83rc6-84872a79828f",
                "correlation_uid": "dfffdf9c-0844-4302-80fb-31f9c27d5f74",
                "version": "1.1.0",
                "product": {
                            "version": "1.0.0-dev",
                            "vendor_name": "Automox"
                           }
                },
    "severity": "Informational",
    "severity_id": 1,
    "status_code": 201,
    "status_id": 1,
    "time": 1727335819520,
    "timezone_offset": 0,
    "type_name": "Account Change: Attach Policy",
    "type_uid": 300107,
    "user": {
            "uid": "93789",
            "email_addr": "abc.123@example.com"
            },
    "user_result": {
                    "uid": "93789",
                    "email_addr": "abc.123@example.com",
                    "groups": [
                                {
                                    "type": "organization",
                                    "privileges": [
                                                    "No Global Access"
                                                  ],
                                    "uid": "5ca5de57-4f69-42fd-b8ec-b838f1a37475",
                                    "name": "Sumo Logic"
                                },
                                {
                                    "type": "organization",
                                    "privileges": [
                                                     "Zone Administrator"
                                                  ],
                                    "uid": "dfffdf9c-0844-4302-80fb-31f9c27d5f74",
                                    "name": "Sumo Logic"
                                }
                              ]
                    }
}

```
    
## Sample queries

```sql title="Recent Access Activities"
_sourceCategory="Labs/automox" activity_id
| json "id", "activity_id", "activity", "severity", "type_name", "entity.name", "entity.type", "actor.user.email_addr", "actor.user.org.name", "auth_protocol_id", "category_uid", "count", "message", "metadata.correlation_uid", "metadata.tenant_uid", "metadata.product.vendor_name", "status_code", "status_id", "status_details", "time", "user.email", "user_result.email_addr", "user_result.groups[*].type", "user_result.groups[*].name", "user_result.groups[*].privileges[*]", "observables[*].type", "observables[*].value", "observables[*].name", "web_resources[*].name", "web_resources[*].type", "web_resources[*].url_string" as id, activity_id, activity, severity, type_name, entity_name, entity_type, actor_email, actor_org, auth_protocol_id, category_uid, event_count, message, correlation_uid, tenant_uid, vendor_name, status_code, status, status_details, event_time, target_user_email, result_user_email, group_type, group_name, group_privileges, observables_type, observables_value, observables_name, web_resource_name, web_resource_type, url_string nodrop

| If (status matches "0", "Unknown", if (status matches "1", "Success", if (status matches "2", "Failure", "Other"))) as status

// global filters
| where activity matches "{{activity_type}}"
| where severity matches "{{severity}}"
| where status matches "{{status}}"
| where status_code matches "{{status_code}}"

| count by id
| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Automox](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/automox-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Automox app is properly integrated and configured to collect and analyze your Automox data.
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

## Viewing the Automox dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Events

The **Automox - Events** dashboard provides a centralized view of the security and system events across managed endpoints. It highlights key metrics such as total events, user activities, policy actions, and notifications. Events are categorized by Operating System (OS) and event type, enabling administrators to track patches, policies, and system deletions. Geolocation heatmaps identify the event origins, which aids in threat analysis, while time-series visualizations display trends to help detect anomalies. Detailed event logs offer insights into user actions, policy executions, and patch deployments for auditing and compliance. This dashboard assists security teams in monitoring security, enforcing policies, and maintaining system integrity.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Automox/Automox+-+Events.png' alt="Automox-Events-Overview" />

### Audit Security

The **Automox - Audit Security** dashboard provides a comprehensive overview of the audit events, enabling security teams monitor system activity and potential risks. Events are categorized by severity (fatal, critical, high, medium, and low) for quick identification of critical issues. The dashboard also includes a breakdown of statuses (success, failure, and unknown) to evaluate the effectiveness of security measures. Events are further classified by type, entity, and web resource, offering insights into account changes, authentication logs, and entity management. Time-series charts track trends, making it easier to identify anomalies. User activity data highlights key individuals involved in security events, supporting investigations and compliance. Furthermore, detailed event summaries provide visibility into authentication attempts, account modifications, and resource deletions, ensuring thorough auditing.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Automox/Automox+-+Audit+Security.png' alt="Automox-Audit-Security-Overview" />

## Create monitors for the Automox app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Automox alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Automox - Critical Severity Events` | This alert is triggered when critical severity events are detected in Automox, such as security risks, failed patches, or policy violations. It helps IT and security teams quickly identify and address high-impact incidents before they escalate. | Critical | Count > 0 |
| `Automox - Events from Embargoed Geo Locations` | This alert is triggered when events originate from restricted or embargoed geographic locations, indicating possible unauthorized access or compliance violations. Security teams can use it to enforce geo-based access policies and mitigate potential threats. | Critical | Count > 0|

## Upgrading/Downgrading the Automox app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Automox app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
