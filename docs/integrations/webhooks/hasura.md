---
id: hasura
title: Hasura
description: Learn about the collection process for the Sumo Logic Hasura integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/hasura-logo.png')} alt="Thumbnail icon" width="50"/>

Hasura Cloud is a fully managed version of GraphQL Engine that provides you with a scalable, secure, and globally distributed GraphQL API over your data sources. You can use a webhook in the Hasura platform to forward logs to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the insert, update, and deletion events in Sumo Logic. For more details, refer to the [Hasura Documentation](https://hasura.io/docs/latest/hasura-cloud/overview/).

## Event types

The Sumo Logic integration for Hasura ingests events into Sumo Logic through an outgoing webhook available in Hasura. The following event types are ingested through the Hasura webhook:
- Insert Operation
- Delete Operation
- Update Operation

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