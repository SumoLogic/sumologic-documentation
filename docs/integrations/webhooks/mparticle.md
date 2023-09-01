---
id: mparticle
title: mParticle
description: Learn about the collection process for the Sumo Logic mParticle integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/mparticle-logo.png')} alt="Thumbnail icon" width="50"/>

mParticle lets you track detailed run-time performance data on your mobile apps. You can use a webhook in the mParticle platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor various app activities, including custom events, session details, screen views, crashes, push notifications, and network performance events in Sumo Logic. For more details, refer to the [mParticle Documentation](https://docs.mparticle.com/).

## Event types

The Sumo Logic integration for mParticle ingests application events into Sumo Logic through an outgoing webhook available in mParticle. For more information on supported events that are ingested through the mParticle webhook, see the [mParticle Documentation](https://docs.mparticle.com/developers/server/json-reference/#events).

## Setup

This section has instructions for collecting logs for the Sumo Logic mParticle webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive mParticle events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/mparticle` - for the mParticle integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in mParticle to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time any application-related events occur within your mParticle account.

Follow the below steps to configure the mParticle webhook.

1. Sign in to the [mParticle account](https://app.us2.mparticle.com/login).
2. Go to **DIRECTORY** section and search **webhooks** option.
3. Click **Setup**. The setup form appears.
4. Select **Output Event** checkbox under **Choose an Integration Type** section.
5. Click **Configure**. The webhook form appears.
6. Enter webhook form data as follows:
    - **Configuration Name**. Provide a name for your webhook.
    - **POST URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
7. Click **Save & Open in Connections**.
8. Select an available input and click on **Connect Output**.
9. Select the webhook created above under **Configuration Name**. The output form appears.
10. Activate the connection by enabling the **Connection Status**.
11. Click **Add Connection**. Click **Done**.
12. Verify mParticle events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/mparticle`
```

:::info
- For detailed information about webhook creation, refer to the [mParticle Documentation](https://docs.mparticle.com/integrations/webhook/event/).
- For support, [contact mParticle](https://support.mparticle.com/hc/en-us).
:::
