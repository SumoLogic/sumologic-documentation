---
id: ilert
title: iLert
description: Learn about the collection process for the Sumo Logic iLert integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/ilert-logo.png')} alt="Thumbnail icon" width="50"/>


The iLert app for Sumo Logic enables efficient integration of the alert management system with Sumo Logic's robust analytics platform. The provided dashboard panels offer comprehensive insights, including tracking Unique Alert Generation, categorizing alerts by source and priority (highlighting high-priority ones), monitoring Pending and Resolved Alerts, and assessing overall alert status. Users can identify top active responders, analyze alerts based on event type and source trends, and stay informed with a concise summary of recent alerts. This integration enhances alert management and incident response capabilities, providing a powerful solution for effective monitoring and analysis.

iLert is a platform for alerting, on-call management and status pages. You can use a webhook in the iLert platform to forward alert events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the lifecycle of alerts, from creation and acceptance to re-routing, escalation, and resolution, while also tracking responder actions and channel attachments for effective incident management in Sumo Logic. For more details, refer to the [iLert Documentation](https://docs.ilert.com/getting-started/readme).

## Event types

The Sumo Logic integration for iLert ingests alert events into Sumo Logic through an outgoing webhook available in iLert. The following event types are ingested through the webhook:
- Alert created
- Alert accepted
- Alert re-routed
- Alert escalated
- Alert priority raised
- Alert resolved
- Alert comment added
- Responder added to alert
- Responder removed from alert
- Channel attached to alert
- Channel detached from alert

### Sample log messages

```json
{
  "id": "1698262673",
  "summary": "alert by source",
  "details": "alert details",
  "reportTime": "2023-10-25T19:37:53.833Z",
  "status": "ACCEPTED",
  "eventType": "alert-auto-escalated",
  "priority": "HIGH",
  "alertKey": "c4He8Qfa5Ysk",
  "alertSource": {
    "id": 2252825,
    "name": "E-Mail"
  },
  "assignedTo": {
    "id": 2241338,
    "username": "Nedjeljko",
    "firstName": "Priyansh",
    "lastName": "Patel",
    "email": "zebadiah@dummyilert.com"
  },
  "responders": [
    {
      "user": {
        "id": 2241338,
        "username": "Nedjeljko",
        "firstName": "Priyansh",
        "lastName": "Patel",
        "email": "zebadiah@dummyilert.com"
      },
      "status": "ACCEPTED"
    }
  ]
}
```

### Sample queries

```sql
_sourceCategory="webhook/ilert"
| json "id", "summary", "details", "reportTime", "status", "eventType", "priority", "alertSource.name", "assignedTo.username", "assignedTo.email", "responders[0].user.username", "responders[0].user.email" as id, summary, detail, reportTime, status, eventType, priority, alertSource, assignedUserName, assignedEmail, responderUserName, responderEmail nodrop
| where id matches "{{alertId}}" and alertSource matches "{{alertSource}}" and eventType matches "{{eventType}}" and status matches "{{status}}" and  priority matches "{{priority}}"
| count_distinct(id)
```

## Setup

This section has instructions for collecting logs for the Sumo Logic iLert webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive iLert events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/ilert` - for the iLert integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in iLert to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your iLert account.

Follow the steps to configure the iLert Webhook.

1. Sign in to the [iLert account](https://app.ilert.com/account-search).
2. Select **Alert sources** from the **Alert Sources** dropdown menu.
3. Select the alert source for which you want to send events to Sumo Logic.
4. Go to **Alert actions**. Click on **Create a new alert action**.
5. Select **Webhook** as the type. The webhook form appears.
6. Enter webhook form data as follows:
    - **Trigger mode**. Select Automatic.
    - **Filter alert events**. Select the event types for which you want to send notifications to Sumo Logic.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Conditional execution**. Select **Execute this alert action for all alerts**. You can even specify any
    specific condition if required.
7. Click **Save**.
8. Verify iLert events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/ilert`
```

:::info
- For detailed information about webhook creation, refer to the [iLert Documentation](https://docs.ilert.com/integrations/webhook).
- For support, [contact iLert](https://docs.ilert.com/contact).
:::

### Installing the iLert app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing iLert dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **iLert - Overview** dashboard presents a comprehensive insight into the alert management system, featuring a range of informative panels. Starting with Unique Alert Generation statistics, it displays alerts categorized by their sources and highlights High-Priority alerts for immediate attention. The dashboard also tracks Pending and Resolved Alerts, providing a real-time overview of the alert status. Additionally, it offers a breakdown of alerts by priority, identifies the Top Active Responders, and analyses alert data based on event types and source trends. Users can efficiently spot event-type trends and review a concise summary of recent alerts.

<img src={useBaseUrl('img/integrations/webhooks/iLert_overview.png')} style={{border: '1px solid black'}} alt="iLert-Overview"/>

## Upgrade/Downgrade the iLert app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the iLert app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>