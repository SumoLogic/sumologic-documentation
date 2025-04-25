---
id: postman
title: Postman
description: Learn about the collection process for the Sumo Logic Postman integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/postman-logo.png')} alt="Thumbnail icon" width="50"/>

The Postman app for Sumo Logic enables you to monitor API test results, collection changes, monitor alerts, environment modifications, and custom automation workflow triggers effectively. This app is based on Postman Webhook, which provides seamless integration between Postman and Sumo Logic. The app enhances the reliability, performance, and security of APIs while optimizing resource allocation and fostering effective team collaboration.

Postman is an API development tool that streamlines API building, testing, modification, and simplifies the process of working with APIs for developers. You can use a webhook in the Postman platform to forward change events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor API test results, collection changes, monitor alerts, environment modifications, and custom automation workflow triggers in Sumo logic. For more details, refer to the [Postman Documentation](https://learning.postman.com/docs/introduction/overview/).

## Event types

The Sumo Logic app for Postman ingests Postman events into Sumo Logic through an outgoing webhook available in the Postman. For more information on supported events that are ingested through the Postman webhook, see the [Postman Documentation](https://learning.postman.com/docs/integrations/webhooks/).

### Sample log messages

```json
{
  "collection": {
    "info": {
      "_postman_id": "4baac7e5-c7dc-4957-8680-9c28awde44",
      "name": "Druva",
      "schema": "https://random03.ddns.net/json/collection/v2.0.0/collection.json"
    },
    "item": [
      {
        "name": "token",
        "id": "725c7d24-be8c-4714-9f24-5e1d3be21577",
        "protocolProfileBehavior": {
          "disableBodyPruning": true
        },
        "request": {
          "auth": {
            "type": "oauth2",
            "basic": {
              "password": "abcd",
              "username": "abcd"
            }
          },
          "method": "POST",
          "header": [],
          "body": {
            "mode": "urlencoded",
            "urlencoded": [
              {
                "key": "refresh_token",
                "value": "assdlkfsdkfsdlksdlksdk",
                "type": "default"
              },
              {
                "key": "grant_type",
                "value": "refresh_token",
                "type": "default"
              }
            ]
          },
          "url": "https://random03.ddns.net/ccx/oauth2/huron/token"
        },
        "response": []
      }
    ]
  }
}
```

### Sample queries

```sql
_sourceCategory=webhook/postman "collection" "_postman_id"
| json "collection.info._postman_id", "collection.info.name", "collection.item[*].request.method" as postmanId, name, methodList nodrop
| where postmanId matches "{{postmanId}}" and name matches "{{name}}"
| count_distinct(postmanId)
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Postman webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Postman events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one.
2. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source - for example, `webhook/postman` - for the Postman integration.
4. Expand **Advanced Options for Logs (Optional)** section in the HTTP Source, then uncheck **Multiline Processing** option and check **One Message Per Request**.
5. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Postman to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Postman account.

Follow the below steps to configure the Postman webhook.

1. Sign in to your [Postman account](https://www.postman.com/).
2. On the home page, click on the **Integrations** tab from the left sidebar.
3. Search and select **Webhooks** from the list of integrations.
4. The integration page has choices for each type of custom webhook. Select **Add Integration** next to a webhook type to configure your integration. The webhook form will appear.
5. Enter webhook form data as follows:
    - **Nickname**. Enter a Nickname for the integration.
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - For **Backup a collection** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Collection**. Select the collection you wish to send updates for.
    - For **Post monitoring results** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Monitor**. Select the monitor you wish to send results for.
6. Click **Add Integration**.
7. Verify Postman events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/postman
  ```

:::info
- For detailed information about webhook creation, refer to the [Postman Documentation](https://learning.postman.com/docs/integrations/webhooks/).
- For support, [contact Postman](https://support.postman.com/hc/en-us).
:::

## Installing the Postman app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Postman dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Postman - Overview** provides an overview of valuable insights and statistical data concerning collections, team activity feed events, and API tests.

<img src={useBaseUrl('img/integrations/webhooks/Postman-Overview.png')} style={{border: '1px solid black'}} alt="Postman-Overview"/>

### Collections, Requests & Team Activity

The **Postman - Collections, Requests & Team Activity** provides valuable insights and statistical data concerning collections, including their requests, updates, and team activity feed events.

<img src={useBaseUrl('img/integrations/webhooks/Postman-Collections,_Requests_&_Team_Activity.png')} style={{border: '1px solid black'}} alt="Postman-Collections,_Requests_&_Team_Activity"/>

### Monitors

The **Postman - Monitors** provides immediate notifications and real-time data regarding the results of API tests.

<img src={useBaseUrl('img/integrations/webhooks/Postman-Monitors.png')} style={{border: '1px solid black'}} alt="Postman-Monitors"/>

## Upgrade/Downgrade the Postman app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Postman app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>