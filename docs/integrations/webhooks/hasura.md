---
id: hasura
title: Hasura
description: Learn about the collection process for the Sumo Logic Hasura integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/hasura-logo.png')} alt="Thumbnail icon" width="50"/>


The Hasura app for Sumo Logic enables you to seamlessly integrate and analyze your Hasura data event and schema operation metrics. It offers a holistic view of your data events, showcasing key metrics such as Events Generated, Distribution by Operation, Deleted events, Target Schema, and Target Tables. By tracking trends in Events by Table Schema, Trigger, and Operation, you can make data-driven decisions to optimize your data architecture and operations. Additionally, the app provides a quick overview of recent data changes with summaries for Recent Insertions, Updates, and Deletions, allowing for real-time monitoring and informed action.

Hasura Cloud is a fully managed version of GraphQL Engine that provides you with a scalable, secure, and globally distributed GraphQL API over your data sources. You can use a webhook in the Hasura platform to forward logs to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the insert, update, and deletion events in Sumo Logic. For more details, refer to the [Hasura Documentation](https://hasura.io/docs/latest/hasura-cloud/overview/).

## Event types

The Sumo Logic integration for Hasura ingests events into Sumo Logic through an outgoing webhook available in Hasura. The following event types are ingested through the Hasura webhook:
- Insert Operation
- Delete Operation
- Update Operation

### Sample log messages

```json
{
  "created_at": "2023-10-25T19:36:33+000016",
  "delivery_info": {
    "current_retry": 0,
    "max_retries": 0
  },
  "event": {
    "data": {
      "new": {
        "id": 4,
        "name": "Apple",
        "price": 250
      },
      "old": null
    },
    "op": "INSERT",
    "session_variables": {
      "x-hasura-role": "admin"
    },
    "trace_context": {
      "span_id": "f9f419152b7a8cd9",
      "trace_id": "62d54ef179fa101a49ed7b49576e2ac7"
    }
  },
  "id": "bfbf5b84-8cf7-4ae7-8288-1698262593",
  "table": {
    "name": "Products",
    "schema": "eCommerce_db"
  },
  "trigger": {
    "name": "Product_StatusCheck"
  }
}
```
### Sample queries

```sql
_sourceCategory="webhook/hasura"
| json "id", "created_at", "event.op","table.name","table.schema","trigger.name" as id, created_at, operation, tableName, tableSchema, triggerName nodrop
| where tableSchema matches "{{tabelSchema}}" and tableName matches "{{tabelName}}" and operation matches "{{operation}}" and triggerName matches "{{triggerName}}"
| count
```
## Setup

This section has instructions for collecting logs for the Sumo Logic Hasura webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Hasura events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/hasura` - for the Hasura integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Hasura to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Hasura account.

Follow the below steps to configure the Hasura webhook.

1. Sign in to the [Hasura account](https://cloud.hasura.io/signup).
2. Go to the project console for which you want to send notifications to Sumo Logic.
3. Go to **Events** and click **Create**. The webhook form appears.
5. Enter webhook form data as follows:
    - **Trigger Name**. Provide a name for the webhook.
    - **Database**. Select the database from the dropdown menu.
    - **Schema/Table**. Select the schema and table from the dropdown menu.
    - **Trigger Operations**. Select the type of events that will cause this webhook to execute.
    - **Webhook (HTTP/S) Handlers**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **Create Event Trigger**.
7. Verify Hasura events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
_sourceCategory=webhook/hasura
```

:::info
- For detailed information about webhook creation, refer to the [Hasura Documentation](https://hasura.io/docs/latest/event-triggers/create-trigger/).
- For support, [contact Hasura](https://cloud.hasura.io/support/create-ticket).
:::

### Installing the Hasura app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Hasura dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Hasura - Overview** dashboard offers a comprehensive snapshot of data events and schema operations, providing valuable insights for effective management. It tracks the volume of Events Generated and their distribution by Operation, including Deleted events. It provides visibility into the Target Schema and Tables and analyzes data events by Table Schema and Trigger. The dashboard also highlights events by specific tables, enabling a deep dive into data trends. With trend analysis for Table Schema, Events by Table, Trigger, and Operation, users can make informed decisions about data architecture and operations. Additionally, it keeps users up to date with concise summaries of Recent Insertions, Updates, and Deletions, ensuring a real-time understanding of the data ecosystem.

<img src={useBaseUrl('img/integrations/webhooks/hasura_overview.png')} style={{border: '1px solid black'}} alt="Hasura - Overview"/>

## Upgrade/Downgrade the Hasura app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Hasura app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>