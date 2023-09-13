---
id: emnify
title: EMnify
description: Learn about the collection process for the Sumo Logic EMnify integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/emnify-logo.png')} alt="Thumbnail icon" width="50"/>

EMnify is the leading cloud-building block for cellular communications in the IoT stack, connecting millions of IoT devices globally. You can use a webhook in the EMnify platform to forward system events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the authentication, lifecycle transition and configuration change events in Sumo Logic. For more details, refer to the [EMnify Documentation](https://docs.emnify.com/).

## Event types

The Sumo Logic integration for EMnify ingests system events into Sumo Logic through an outgoing webhook available in EMnify. For more information on supported events that are ingested through the EMnify webhook, see the [EMnify Documentation](https://docs.emnify.com/system-events/event-types).

## Setup

This section has instructions for collecting logs for the Sumo Logic EMnify webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive EMnify events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/emnify` - for the EMnify integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in EMnify to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your EMnify account.

Follow the below steps to configure the EMnify webhook.

1. Sign in to the [EMnify account](https://portal.emnify.com/sign/up).
2. Go to **Integrations** section.
3. Go to **Data Streams**, select **ADD NEW DATA STREAM**.
4. Search **Webhook** and click **ADD**. The webhook form appears.
5. Enter webhook form data as follows:
    - **STREAM TYPE**. Select **Stream Events**.
    - **EVENT OPTIONS**. Select **Stream all events**.
    - **DESTINATION**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **CREATE**.
7. Verify EMnify events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/emnify`
``` 

:::info
- For support, [contact EMnify](https://www.emnify.com/premium-support).
:::