---
id: druva-platform-events
title: Druva - Platform Events
description: Learn about the collection process for the Sumo Logic Druva Platform Events integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-icon.png')} alt="Druva icon" width="55"/>

Druva is a cloud data protection and management platform that helps organizations safeguard their data across endpoints, cloud applications, and data center workloads. You can use a webhook in Druva to forward platform events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor cybersecurity threats, backup and restore operations, authentication and admin activities, ransomware recovery, data access, enterprise workloads, and API credential usage in Sumo Logic.

For more details, see the [Druva Webhook documentation](https://help.druva.com/en/articles/11180020-use-webhooks-to-integrate-third-party-services-with-druva).

## Event types

The Sumo Logic app for Druva Platform Events ingests security and operational events into Sumo Logic through a webhook integration in the Druva Integration Center.

The following event types are used in the Druva Platform Events app:
- Admin and platform access events
- API credential lifecycle events
- Backup and restore events
- Enterprise workload events
- Cybersecurity events (unusual data activity, malicious file scans, curated snapshots)
- Ransomware recovery events
- Data access events
- Alert and notification events

### Sample log messages

```json
{
  "feature": "Admin Event",
  "type": "Admin Login",
  "details": {
    "adminEmail": "admin@example.com",
    "adminName": "Jane Doe",
    "adminIPAddress": "198.51.100.10",
    "location": "San Francisco, US",
    "loginResult": "Success",
    "ssoProvider": "Okta",
    "authMethod": "SSO"
  },
  "syslogSeverity": "6",
  "timestamp": "2026-05-28T14:32:10Z"
}
```

```json
{
  "feature": "Backup And Restore",
  "type": "Backup",
  "details": {
    "backupStatus": "Failed",
    "userEmail": "user@example.com",
    "deviceName": "LAPTOP-1024",
    "errorMessage": "Agent connectivity timeout"
  },
  "syslogSeverity": "4",
  "timestamp": "2026-05-28T15:10:45Z"
}
```

### Sample queries

```sumo title="Total Events by Feature"
_sourceCategory="Labs/Druva" feature type
| json "feature", "type", "syslogSeverity" as feature, event_type, severity nodrop
| count by feature
| sort by _count
```

## Setup

This section includes instructions for collecting logs for the Sumo Logic Druva Platform Events webhook collection.

### Source configuration

Follow the steps below to configure the Hosted Collector to receive Druva events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one.
2. Add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source, for example, `webhook/druva`.
4. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Druva to send events to the Sumo Logic HTTP source.

Follow the steps below to configure the Druva webhook.

1. Sign in to the [Druva Console](https://login.druva.com/).
2. From the **Global Navigation** menu on the top left, select **Integration Center**.
3. On the Integration Center page, select **Webhooks** from the left panel.
4. Click **Add New Webhook**. The Add Webhook form appears.
5. Provide the following details:
   - **Provider**. Select **Others**.
   - **Name**. Enter a name for the webhook (for example, `Sumo Logic`).
   - **Endpoint**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
   - **Authorization Type**. Select **API Key** and enter a dummy value with more than 5 characters (for example, `sumologic`), as Sumo Logic does not require authentication on the HTTP source endpoint.
   - **Events**. Select the events that the platform should send to the webhook. Choose the event types you want to monitor, such as cybersecurity events, backup jobs, admin events, and alerts.
6. Click **Test and Save** to validate the connection and save your configuration.
7. Verify Druva events are getting ingested in Sumo Logic by executing the following query in Log Search:

```sql
_sourceCategory=Labs/Druva
```

:::info
For detailed webhook setup information, refer to the [Druva Webhook documentation](https://help.druva.com/en/articles/11180020-use-webhooks-to-integrate-third-party-services-with-druva).
:::

### Installing the Druva - Platform Events app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Druva - Platform Events dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Druva - Platform Events - Overview** dashboard provides a high-level summary of all Druva platform events, including total event counts, event distribution by feature, severity, and category, outlier detection, and a full reverse-chronological All Events table.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Overview.png' style={{border: '1px solid black'}} alt="Druva Overview"/>

### Platform Access

The **Druva - Platform Events - Platform Access** dashboard tracks admin login activities, authentication methods, SSO providers, geo-locations, login from different locations, failed login detection, admin lifecycle events, and security configuration changes.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Platform-Access.png' style={{border: '1px solid black'}} alt="Druva Platform Access"/>

### API Credentials and Access

The **Druva - Platform Events - API Credentials & Access** dashboard monitors API credential lifecycle (create, update, delete, key regeneration), API login success and failures, top source IPs, and credential change outlier detection.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-API-Credentials-%26-Access.png' style={{border: '1px solid black'}} alt="Druva API Credentials and Access"/>

### Data Protection

The **Druva - Platform Events - Data Protection** dashboard monitors backup and system events, backup success rate, failure trends, top failed backup sources, restore success rate, and recovery events by type.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Data-Protection.png' style={{border: '1px solid black'}} alt="Druva Data Protection"/>

### Enterprise Workloads

The **Druva - Platform Events - Enterprise Workloads** dashboard provides visibility into VM backup jobs (triggered and ended), job status distribution, failures by VM, and workload alerts.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Enterprise-Workloads.png' style={{border: '1px solid black'}} alt="Druva Enterprise Workloads"/>

### Ransomware Recovery

The **Druva - Platform Events - Ransomware Recovery** dashboard provides insights into quarantine bay actions (add and remove), success vs failure rates, activity by platform and mode, top quarantined resources, and initiators.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Ransomware-Recovery.png' style={{border: '1px solid black'}} alt="Druva Ransomware Recovery"/>

### Sensitive Data and Compliance

The **Druva - Platform Events - Sensitive Data & Compliance** dashboard monitors data access events, data volume tracking, geo-locations of access, high-risk country access, and large access events.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Sensitive-Data-%26-Compliance.png' style={{border: '1px solid black'}} alt="Druva Sensitive Data and Compliance"/>

### Cyber Security

The **Druva - Platform Events - Cyber Security** dashboard covers unusual data activities, malicious file scans, threat hunt (curated snapshots), safe mode and emergency response, and cyber recovery events over time.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Cyber-Security.png' style={{border: '1px solid black'}} alt="Druva Cyber Security"/>

### Alerts and Notifications

The **Druva - Platform Events - Alerts & Notifications** dashboard provides an overview of alert events, including alert severity distribution, trends over time, UDA alerts, login from new location alerts, and recent event details.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/DruvaWebhook/Druva-Alerts-%26-Notifications.png' style={{border: '1px solid black'}} alt="Druva Alerts and Notifications"/>

## Create monitors for the Druva - Platform Events app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Druva - Platform Events alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Druva - Platform Events - Backup Failures Spike` | This alert is triggered when more than 3 backup failures are detected within 15 minutes. A sudden spike in failures may indicate infrastructure issues, storage problems, or agent connectivity failures requiring immediate investigation. | Count > 3 | Count <= 3 |
| `Druva - Platform Events - Data Access from High Risk Country` | This alert is triggered when data access activity is detected from an embargoed or high-risk country. This may indicate potential data exfiltration, unauthorized access from restricted geographies, or a compromised account being used from a sanctioned region. | Count > 0 | Count <= 0 |
| `Druva - Platform Events - Malicious File Detected` | This alert is triggered when Druva detects malicious files during a scan or curated snapshot operation. This indicates that malware or ransomware artifacts have been identified in protected data and may require quarantine or remediation action. | Count > 0 | Count <= 0 |
| `Druva - Platform Events - Mass Delete Detected (Unusual Data Activity)` | This alert is triggered when an unusual data activity event is detected with more than 100 files deleted. Mass file deletion is a strong indicator of ransomware activity, insider threats, or compromised accounts attempting to destroy data. | Count > 0 | Count <= 0 |
| `Druva - Platform Events - Multiple Failed Admin Logins` | This alert is triggered when more than 3 failed admin login attempts are detected within 15 minutes. This may indicate brute-force activity, credential stuffing, or unauthorized access attempts against administrative accounts. | Count > 3 | Count <= 3 |

## Upgrade/Downgrade the Druva - Platform Events app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Druva - Platform Events app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
