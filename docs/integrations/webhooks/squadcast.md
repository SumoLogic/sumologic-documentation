---
id: squadcast
title: Squadcast
description: Learn about the collection process for the Sumo Logic Squadcast integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/squadcast-logo.png')} alt="Thumbnail icon" width="50"/>

The Squadcast app for Sumo Logic enables you to promptly respond to incidents, assess response times, and monitor SLA compliance effectively. This app is based on Squadcast Webhook, which provides seamless integration between Squadcast and Sumo Logic. The app provides a crucial audit trail for compliance and reporting, supports post-incident analysis, and empowers organizations to demonstrate their commitment to incident management best practices.

Squadcast is an incident management platform that streamlines real-time alerts and on-call scheduling for effective resolution of critical incidents, fostering seamless team collaboration and minimizing service disruptions. You can use a webhook in the Squadcast platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor real-time alerts, and track incident details in Sumo Logic. For more details, refer to the [Squadcast Documentation](https://support.squadcast.com/quickstart-guide/readme).

## Event types

The Sumo Logic app for Squadcast ingests events into Sumo Logic through an outgoing webhook available in the Squadcast. The following event types are ingested through the Squadcast webhook:
- Incident triggered
- Incident reassigned
- Incident acknowledged
- Incident resolved
- Communication Channel created
- Communication Channel updated
- Communication Channel deleted
- Incident Notes created
- Incident Notes updated
- Incident Notes deleted
- Incident Notes starred
- Incident Notes unstarred
- Incident Tags updated
- Incident Task created
- Incident Task updated
- Incident Task deleted
- Incident Task completed
- Incident Task uncompleted
- Postmortem created
- Postmortem updated
- Postmortem deleted
- SLO-Violating Incident created
- SLO-Violating Incident marked false positive
- SLO-Violating Incident unmarked false positive
- SLO-Violating Incident spent error budget
- StatusPage updated

### Sample log messages

<details>
<summary>View sample log message</summary>

```json
{
  "version": "v2",
  "event": {
    "id": "650ae705e9a4e2045ab8d81d",
    "type": "incident.triggered",
    "resource": "incident",
    "timestamp": "2023-10-23T09:01:01+00002193Z"
  },
  "data": {
    "resource_data": {
      "id": "650ae7057f968ae9a2af8228",
      "message": "Jira Incident 1",
      "description": "Created for Jira incident detect",
      "url": "https://nj.ddns.net/incident/650ae7057f968ae9a2af8228",
      "alert_source": {
        "id": "5fae6d03ef87d3896aa92ad1",
        "type": "Squadcast UI",
        "short_name": "squadcastui",
        "support_doc": ""
      },
      "service": {
        "id": "650ae519bfbb94c70efc8536",
        "name": "Jira services",
        "slug": "test-new-1",
        "tags": {
          "Environment": {
            "value": "dev",
            "color": ""
          },
          "Type": {
            "value": "Technical",
            "color": ""
          }
        }
      },
      "request_id": "579610b0-5395-423d-a496-d52231ae6b40",
      "status": "triggered",
      "created_at": "2023-10-23T09:01:01.869Z",
      "assigned_to": {
        "id": "650ac1698051661869461a65",
        "name": "kristen ",
        "type": "escalationpolicy",
        "assigned_at": "2023-10-23T09:01:01Z"
      },
      "tags": null,
      "event_payload": {
        "alertsourceid": "5fae6d03ef87d3896aa92ad1",
        "assignedto": {
          "id": "650ac1698051661869461a65",
          "type": "escalationpolicy"
        },
        "attachments": [],
        "createdby": "650ac4048627d359f5acf10f",
        "description": "Created for Jira incident detect",
        "message": "Jira Incident 1",
        "organizationid": "650ac1698051661869461a5e",
        "owner": {
          "id": "650ac1698051661869461a63",
          "type": "team"
        },
        "serviceid": "650ae519bfbb94c70efc8536",
        "tags": {}
      },
      "timeline": [
        {
          "action": "triggered",
          "assigned_to": "escalationpolicy",
          "name": "kristen ",
          "time": "2023-10-23T09:01:01.869Z"
        }
      ],
      "event_count": 1,
      "owner": {
        "id": "650ac1698051661869461a63",
        "name": "Default Team",
        "type": "team",
        "is_default_team": true,
        "team_description": "Default team"
      },
      "manually_created_by": {
        "id": "650ac4048627d359f5acf10f",
        "name": "kristen ",
        "email": "kristenv@gmail.com"
      }
    },
    "resource_type": "incident",
    "organization": {
      "id": "650ac1698051661869461a5e",
      "name": "Crest Data Systems1"
    },
    "team": {
      "id": "650ac1698051661869461a63",
      "name": "Default Team"
    }
  }
}
```
</details>

### Sample queries

```sql
_sourceCategory=webhook/squadcast type "incident.triggered"
| json "event.type", "event.resource" as type, resource nodrop
| where type matches "{{type}}" and resource matches "{{resource}}"
| where type matches "incident.triggered"
| count by type
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Squadcast webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Squadcast events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/squadcast` - for the Squadcast integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Squadcast to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Squadcast account.

Follow the below steps to configure the Squadcast webhook.

1. Sign in to the [Squadcast account](https://app.squadcast.com/).
2. Go to **Settings**, and click **Webhooks**.
3. Click **Add Webhook**. The webhook form will appear.
4. Enter webhook form data as follows:
    - **Webhook Name**. Provide a name for your outgoing webhook.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
5. Click **Next: Choose Webhook Type**. Next page of webhook configuration will appear.
    - **Choose Webhook Type**. Choose Automatic as a webhook type.
        - **Versions**. Select the version from V1 and V2.
        - **Triggers**. Select events to trigger the webhook.
6. Click **Next: Configure Payload**. Next page of webhook configuration will appear.
        - Choose payload type between **Standard Squadcast Payload** and **Custom Payload**, and configure your payload.
        - For **Custom Payload**,
            - **Select Payload Template**. Choose from one of the pre-configured templates or create your own payload.
7. Click **Save**.
8. Verify Squadcast events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/squadcast
  ```

:::info
- For detailed information about webhook creation, refer to the [Squadcast Documentation](https://support.squadcast.com/integrations/outgoing-webhooks).
- For support, [contact Squadcast](https://www.squadcast.com/support-ticket-form).
:::

### Installing the Squadcast app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Squadcast dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Squadcast - Overview** improves visibility into activities within the Squadcast platform by categorizing them according to event type and the associated resources. It provides valuable data and statistics on various aspects, including incident status updates, the primary services, and alerts triggering incidents, as well as incidents violating service level objectives (SLOs).

<img src={useBaseUrl('img/integrations/webhooks/Squadcast-Overview.png')} style={{border: '1px solid black'}} alt="Squadcast-Overview"/>

### Incidents

The **Squadcast - Incidents** offers valuable statistics and insights regarding events associated with incident postmortems, communication channels, tasks, and notes.

<img src={useBaseUrl('img/integrations/webhooks/Squadcast-Incidents.png')} style={{border: '1px solid black'}} alt="Squadcast-Incidents"/>

## Upgrade/Downgrade the Squadcast app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Squadcast app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>