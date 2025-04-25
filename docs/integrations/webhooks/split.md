---
id: split
title: Split
description: Learn about the collection process for the Sumo Logic Split integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/split-logo.png')} alt="Thumbnail icon" width="50"/>

The Split app for Sumo Logic enables you to seamlessly monitor feature flagging, experiment results, and user behavior, enabling data-driven decision making and fostering a more agile and competitive development process. This app is based on Split Webhook, which provides seamless integration between Split and Sumo Logic.

Split is a feature delivery platform that combines the quick and dependable nature of feature flags with data-driven insights to assess the effects of each feature. You can use a webhook in the Split platform to forward activities related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor user activities, admin changes in the tools used by the whole team, and impressions in Sumo Logic. For more details, refer to the [Split Documentation](https://docs.split.io/docs).

## Event types

The Sumo Logic app for Split ingests Split events into Sumo Logic through an outgoing webhook available in the Split. The following event types are ingested through the Split webhook:
- Audit logs
- Admin audit logs
- Impressions

### Sample log messages

<details>
<summary>View sample log message</summary>

```json
{
   "id": "765d5440-4cba-11ee-88ca-ae97ef45de75",
   "auditLogType": "api_key.create",
   "editor": {
      "type": "user",
      "id": "d855eec0-4b19-11ee-9016-925e66ae7524",
      "name": "megan_pitt"
   },
   "currentObject": {
      "id": "juquh513anl7ciaav797ujmju8ldo3d8jg9",
      "name": "client-side - 7645a - 7653b",
      "type": "api_key",
      "workspace": {
         "type": "workspace",
         "id": "7645ad90-4cba-11ee-88ca-ae97ef45de75",
         "name": "healthy_workspace"
      },
      "environments": [
         {
            "type": "environment",
            "id": "7653b750-4cba-11ee-88ca-ae97ef45de75",
            "name": "Prod-healthy_wo"
         }
      ],
      "apiKeyType": "browser"
   },
   "createdAt": 1697784463371,
   "changes": {
      "environments": {
         "from": null,
         "to": [
            {
               "type": "environment",
               "id": "7653b750-4cba-11ee-88ca-ae97ef45de75",
               "name": "Prod-healthy_wo"
            }
         ]
      },
      "apiKeyType": {
         "from": null,
         "to": "browser"
      },
      "workspace": {
         "from": null,
         "to": [
            {
               "type": "workspace",
               "id": "7645ad90-4cba-11ee-88ca-ae97ef45de75",
               "name": "healthy_workspace"
            }
         ]
      },
      "name": {
         "from": null,
         "to": "client-side - 7645a - 7653b"
      }
   },
   "type": "audit_log"
}
```
</details>

### Sample queries

```sql
_sourceCategory=webhook/split type auditLogType
| json "type", "auditLogType" as type, auditLogType nodrop
| where type matches "{{type}}" and auditLogType matches "{{auditLogType}}"
| where !isBlank(auditLogType)
| count by auditLogType
| sort by _count, auditLogType asc
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Split webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Split events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/split` - for the Split integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Split to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Split account.

Follow the below steps to configure the Split webhook.

1. Sign in to your [Split account](https://app.split.io/login).
2. Switch to **Admin settings**.
3. Click **Integrations** from **Integration settings** section.
4. Click **Add** next to **Outgoing Webhook** for any of above mentioned event types. The webhook form will appear.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP Source Address created above.
    - For **Outgoing Webhook** of type **impressions** and **audit logs**,
        - **Environments**. Select the environment in Split from which data should be sent.
6. Click **Save**.
7. Verify Split events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/split
  ```

:::info
- For detailed information about webhook creation, refer to the [Split Webhook - audit log](https://help.split.io/hc/en-us/articles/360020957991-Webhook-audit-log), [Split Webhook - admin audit logs](https://help.split.io/hc/en-us/articles/360051384832-Webhook-admin-audit-logs) and [Split Webhook - impressions](https://help.split.io/hc/en-us/articles/360020700232-Webhook-impressions) documentation.
- For support, contact [Split](https://www.split.io/support/).
:::

### Installing the Split app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Split dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Split - Overview** dashboard offers transparency into actions performed by both administrators and team members, delivering valuable insights into audit events, their distribution, and statistics categorized by their respective types.

<img src={useBaseUrl('img/integrations/webhooks/Split-Overview.png')} style={{border: '1px solid black'}} alt="Split-Overview"/>

### Users and Groups

The **Split - Users and Groups** dashboard offers concise statistical summaries pertaining to Split users and groups, including administrative actions taken concerning them.

<img src={useBaseUrl('img/integrations/webhooks/Split-Users_and_Groups.png')} style={{border: '1px solid black'}} alt="Split-Users_and_Groups"/>

## Upgrade/Downgrade the Split app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Split app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>