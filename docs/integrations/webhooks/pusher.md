---
id: pusher
title: Pusher
description: Learn about the collection process for the Sumo Logic Pusher integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/pusher-logo.png')} alt="Thumbnail icon" width="50"/>

Pusher is a real-time messaging and communication platform that simplifies adding live features to web and mobile applications, enabling instant updates, notifications, and interactive functionalities through WebSocket connections. You can use a webhook in the Pusher platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor channel existence, presence status, client events, deferred actions, cache channels, and subscription counts in Sumo Logic. For more details, refer to the [Pusher Documentation](https://pusher.com/docs/).

## Event types

The Sumo Logic integration for Pusher ingests events into Sumo Logic through an outgoing webhook available in Pusher. The following event types are ingested through the Pusher webhook:
- Channel existence
- Presence
- Deferred
- Client events
- Cache channels
- Subscription count

## Setup

This section has instructions for collecting logs for the Sumo Logic Pusher webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Pusher events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/pusher` - for the Pusher integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Pusher to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Pusher account.

Follow the below steps to configure the Pusher webhook.

1. Sign in to your [Pusher account](https://dashboard.pusher.com/accounts/sign_in).
2. In the left navigation panel, select your channel from the **Channels** tile.
3. Select **Webhooks**.
4. Click **Add webhook**. The webhook's configuration page will appear.
5. Enter webhook form data as follows:
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Event type**. Select specific event type you want the webhook to trigger for.
6. Click **Save**.
7. Verify Pusher events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourcecategory=webhook/pusher
  ```

:::info
- For detailed information about webhook creation, refer to the [Pusher Documentation](https://pusher.com/docs/channels/server_api/webhooks/).
- For support, [contact Pusher](https://support.pusher.com/hc/en-us).
:::
