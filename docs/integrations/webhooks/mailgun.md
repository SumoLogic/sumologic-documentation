---
id: mailgun
title: Mailgun
description: Learn about the collection process for the Sumo Logic Mailgun integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/mailgun-logo.png')} alt="Thumbnail icon" width="50"/>

Mailgun is an email delivery service for sending, receiving, and tracking emails. You can use a webhook in the Mailgun platform to forward inbound and outbound email events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire email communication lifecycle, events such as accepted, rejected, delivered, and failed messages, as well as recipient interactions like opened, clicked, unsubscribed, and complained events in Sumo Logic. For more details, refer to the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/).

## Event types

The Sumo Logic integration for Mailgun ingests email events into Sumo Logic through an outgoing webhook available in Mailgun. For more information on supported events that are ingested through the Mailgun webhook, see the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/user_manual.html#events-1).

## Setup

This section has instructions for collecting logs for the Sumo Logic Mailgun webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Mailgun events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/mailgun` - for the Mailgun integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Mailgun to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time any email events occur within your Mailgun account.

Follow the below steps to configure the Mailgun webhook.

1. Sign in to the [Mailgun account](https://signup.mailgun.com/new/signup).
2. Under **Sending** section move to the **Webhooks** option.
3. Click **Add Webhook**. The webhook form appears.
4. Enter webhook form data as follows:
    - **Event Types**. Select the event types for which you want to send notifications to Sumo Logic.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
5. Click **Create Webhook**.
6. Verify Mailgun events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/mailgun`
```

:::info
- For detailed information about webhook creation, refer to the [Mailgun Documentation](https://documentation.mailgun.com/en/latest/user_manual.html#webhooks-1).
- For support, [contact Mailgun](https://app.mailgun.com/support).
:::
