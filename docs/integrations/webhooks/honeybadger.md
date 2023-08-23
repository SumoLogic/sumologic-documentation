---
id: honeybadger
title: Honeybadger
description: Learn about the collection process for the Sumo Logic honeybadger integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/honeybadger-logo.png')} alt="Thumbnail icon" width="50"/>

Honeybadger is a technology company specializing in error monitoring and exception tracking solutions. You can use a webhook in the Honeybadger platform to forward logs to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the error lifecycle, uptime and check-in events in Sumo Logic. For more details, refer to the [Honeybadger Documentation](https://docs.honeybadger.io/).

## Event types

The Sumo Logic integration for Honeybadger ingests events into Sumo Logic through an outgoing webhook available in Honeybadger. The following event types are ingested through the Honeybadger webhook:
- Error 
- Uptime
- Check-in

## Setup

This section has instructions for collecting logs for the Sumo Logic Honeybadger webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Honeybadger events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/honeybadger` - for the Honeybadger integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Honeybadger to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Honeybadger account.

Follow the below steps to configure the Honeybadger webhook.

1. Sign in to the [Honeybadger account](https://app.honeybadger.io/users/sign_in).
2. Go to the project for which you want to send notifications to Sumo Logic.
3. Go to **Settings** and select **Alerts and integration**.
4. Search for **Webhook** and select it. The webhook form appears.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Error Events**. Select the type of error events that will cause this webhook to execute.
    - **Uptime Events**. Select the type of uptime events that will cause this webhook to execute.
    - **Check-Ins**. Select the type of check-in events that will cause this webhook to execute.
6. Click **Save Changes**.
7. Verify Honeybadger events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/honeybadger`
```

:::info
- For detailed information about webhook creation, refer to the [Honeybadger Documentation](https://docs.honeybadger.io/integrations/webhook/).
- For support, [contact Honeybadger](support@honeybadger.io). 
:::