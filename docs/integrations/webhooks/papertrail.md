---
id: papertrail
title: Papertrail
description: Learn about the collection process for the Sumo Logic Papertrail integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/papertrail-logo.png')} alt="Thumbnail icon" width="50"/>

Papertrail provides hosted log aggregation and log management for servers, apps, and cloud services. You can use a webhook in the Papertrail platform to forward saved search-generated events from the Papertrail platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor error events in Sumo Logic. For more details, refer to the [Papertrail Documentation](https://www.papertrail.com/help/papertrail-documentation/).

## Event types

The Sumo Logic integration for Papertrail ingests saved search events into Sumo Logic through an outgoing webhook available in Papertrail.

## Setup

This section has instructions for collecting logs for the Sumo Logic Papertrail webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Papertrail events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/papertrail` - for the Papertrail integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Papertrail to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time any events occur within your Papertrail account.

Follow the below steps to configure the Papertrail webhook.

1. Sign in to the [Papertrail account](https://my.solarwinds.cloud/).
2. Go to your saved search for which you want to send logs to Sumo Logic.
3. Click the **Manage alerts** icon.
4. Click **New Alert** and select **Webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **Create Alerts**.
7. Verify Papertrail events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/papertrail`
```

:::info
- For detailed information about webhook creation, refer to the [Papertrail Documentation](https://www.papertrail.com/help/web-hooks/#example).
- For support, [contact Papertrail](https://www.papertrail.com/plans/contact/).
:::