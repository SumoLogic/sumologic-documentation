---
id: sentry
title: Sentry
description: Learn about the collection process for the Sumo Logic Sentry integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/sentry-logo.png')} alt="Thumbnail icon" width="50"/>

The Sentry app for Sumo Logic helps you monitor received issues, comments, detected errors, issue alerts, and metric alerts. This app is built on Sentry's internal integration using webhooks, which provides seamless integration between Sentry and Sumo Logic. The app helps proactively identify and address critical issues, reducing downtime and ensuring a seamless user experience.

Sentry is an open-source error monitoring platform that helps developers identify, track, and resolve software issues in real-time, enhancing the stability and reliability of applications and websites. You can use a webhook in the Sentry platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor received issues, comments, detected errors, issue alerts, and metric alerts in Sumo Logic. For more details, refer to the [Sentry documentation](https://docs.sentry.io/).

## Event types

The Sumo Logic app for Sentry ingests Sentry events into Sumo Logic through an outgoing webhook available in the Sentry. Following event types are ingested through the Sentry webhook:
- Issues
- Comments
- Errors
- Issue Alerts
- Metric Alerts

### Sample log messages

<details>
<summary>Issue</summary>

[See Sentry Issue](https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/integrations/sentry/sample-log-issue.json)

</details>

<details>
<summary>Comment</summary>

[See Sentry Comments](https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/integrations/sentry/sample-log-comment.json)

</details>

<details>
<summary>Error</summary>

[See Sentry Error](https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/integrations/sentry/sample-log-error.json)

</details>

<details>
<summary>Issue Alerts</summary>

[See Sentry Issue Alerts](https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/integrations/sentry/sample-log-issue-alerts.json)

</details>

<details>
<summary>Metric Alerts</summary>

[See Sentry Metric Alerts](https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/integrations/sentry/sample-log-metric-alerts.json)

</details>

### Sample queries

```sql
_sourceCategory="webhook/sentry" action issue id project
| json "action", "actor.name", "data.issue.id", "data.issue.title", "data.issue.level", "data.issue.status", "data.issue.platform", "data.issue.firstSeen", "data.issue.lastSeen", "data.issue.project.name", "data.issue.metadata.type", "data.issue.metadata.value", "data.issue.count", "data.issue.substatus", "data.issue.assignedTo" as action, actor_name, issue_id, title, level, status, platform, first_seen, last_seen, project, error_type, error_value, issue_count, substatus, assigned_to_raw nodrop
| json field=assigned_to_raw "name" as assigned_to_name nodrop
| where !isBlank(issue_id)
| if(isBlank(assigned_to_raw), "Unassigned", assigned_to_name) as issue_assigned_to
| where issue_id matches "{{issue_id}}" and project matches "{{project}}" and action matches "{{action}}" and actor_name matches "{{actor_name}}" and status matches "{{issue_status}}" and platform matches "{{platform}}" and issue_assigned_to matches "{{issue_assigned_to}}"
| count as event_count by issue_id, project, issue_assigned_to, action, actor_name, title, level, status, platform, first_seen, last_seen, error_type, error_value, substatus, issue_count
| sort by last_seen desc
| fields - event_count
```

## Setup

This section provides instructions for collecting logs from Sentry's internal integration via webhooks.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Sentry events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Set the **Source Category** as `webhook/sentry` in the HTTP Source, `webhook/sentry` to be used with the Sentry integration.
3. Copy and save the endpoint URL of the source.

:::note
You must specify a **Source Category** in the HTTP Source to ensure more efficient and optimized query performance in the Sentry app's dashboards.
:::

### Vendor configuration

Configure the webhook integration in Sentry to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Sentry account.

Follow the below steps to configure the Sentry webhook.

1. Sign in to your [Sentry account](https://sentry.io/auth/login/).
2. Click **Settings**.
3. Select **Integrations** under the **Organization** section.
4. Click on **Create New Integration**.
5. Select **Internal Integration** and Click **Next**. Internal Integration's configuration page will appear.
6. Enter Internal Integration's form data as follows:
     - **Name**. Enter human readable name of your integration.
     - **Webhook URL**. Enter the Sumo Logic HTTP Source Address created above.
     - **Alert Rule Action**. If enabled, this integration will be available in Issue Alert rules and Metric Alert rules in Sentry.
7. Assign the necessary permissions.<br/><img src={useBaseUrl('img/integrations/webhooks/Sentry-Permission.png')} style={{border: '1px solid black'}} alt="Sentry-Permission"/>
8. Enable **Webhooks**.<br/><img src={useBaseUrl('img/integrations/webhooks/Sentry-Webhooks.png')} style={{border: '1px solid black'}} alt="Sentry-Webhooks"/>
9. Verify Sentry events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
    ```sql
    _sourceCategory=webhook/sentry
    ```

:::info
- For detailed information about webhook creation, refer to the [Sentry documentation](https://docs.sentry.io/product/integrations/integration-platform/webhooks/).
- For support, [contact Sentry](https://help.sentry.io/).
- For Sentry Alerts configuration refer to the [alerts documentation](https://docs.sentry.io/product/alerts/).
:::

## Installing the Sentry app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Sentry dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Sentry - Overview

The **Sentry - Overview** dashboard provides details on error events, their distribution across projects, and user activity across different platforms and locations.

Use this dashboard to:
* Monitor the total number of events and their trends over time to identify spikes or anomalies in error occurrences.
* Analyze the distribution of events across different projects and platforms to prioritize troubleshooting efforts.
* Investigate the most common HTTP methods and content types associated with errors to pinpoint potential API or data format issues.
* Identify the top cities, SDK versions, and users experiencing errors to focus on specific user segments or environments.
* Correlate recent issue events with their geographic locations to detect region-specific problems or outages.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Overview.png')} alt="Sentry - Overview" style={{border: '1px solid gray'}} width="800" />

### Sentry - Issue Insights

The **Sentry - Issue Insights** dashboard provides details on project issues, their statuses, assignments, and related trends in the Sentry error tracking system.

Use this dashboard to:
* Monitor the distribution of issues across different statuses, substatus categories, and platforms to identify areas needing attention.
* Track issue assignment trends and workload distribution among team members for better resource allocation.
* Analyze the correlation between issue status trends and project platforms to pinpoint potential systemic problems.
* Review detailed issue information and recent comments to facilitate faster problem resolution and team communication.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Issue-Insights.png')} alt="Sentry - Issue Insights" style={{border: '1px solid gray'}} width="800" />

### Sentry - Error Analysis

The **Sentry - Error Analysis** dashboard provides details on error occurrences, their locations, and trends to help identify and resolve issues in your application.

Use this dashboard to:
* Visualize the geographical distribution of errors to identify location-specific issues or patterns.
* Monitor error trends over time to detect sudden spikes or ongoing problems that need attention.
* Analyze errors by platform to prioritize debugging efforts for the most affected environments.
* Review recent user locations and detailed error information to quickly investigate and reproduce reported issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Error-Analysis.png')} alt="Sentry - Error Analysis" style={{border: '1px solid gray'}} width="800" />

### Sentry - Alert Tracker

The **Sentry - Alert Tracker** dashboard provides details on issue alerts and metric alerts, including their distribution by rule, action, and user location.

Use this dashboard to:
* Monitor the distribution of issue alerts by rule to identify which rules are triggering most frequently and may need adjustment.
* Analyze user locations associated with alerts to detect any geographical patterns in error occurrences.
* Track the status of metric alerts (warning, critical, resolved) to prioritize response efforts and assess overall system health.
* Correlate issue alerts with metric alerts to gain a comprehensive view of application performance and error trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Sentry/Sentry-Alert-Tracker.png')} alt="Sentry - Alert Tracker" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Sentry app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Sentry Alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Sentry Errors` | This fires upon detection of a new error or exception in the project within a 5-minute timeframe. | Count `>` 0 | Count `<=` 0 |
| `Sentry - Issue` | This alert fires when a new issue is captured by indicating an error or exception in the project within the last 5 minutes. | Count `>` 0 | Count `<=` 0 |

## Upgrade/Downgrade the Sentry app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sentry app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
