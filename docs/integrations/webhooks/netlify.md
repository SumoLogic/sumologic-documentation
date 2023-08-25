---
id: netlify
title: Netlify
description: Learn about the collection process for the Sumo Logic Netlify integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/netlify-logo.png')} alt="Thumbnail icon" width="50"/>

Netlify is a web development platform for building fast and dynamic websites, e-commerce stores, and web applications. You can use a webhook in the Netlify platform to forward site deployment events from the Netlify platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor deploy processes including events such as deploy started, succeeded, failed, deleted, locked, unlocked, request status changes, and transitions between previously successful and failed deploys in Sumo Logic. For more details, refer to the [Netlify Documentation](https://docs.netlify.com/).

## Event types

The Sumo Logic integration for Netlify ingests site deployment events into Sumo Logic through an outgoing webhook available in Netlify. For more information on supported events that are ingested through the Netlify webhook, see the [Netlify Documentation](https://docs.netlify.com/site-deploys/notifications/)

## Setup

This section has instructions for collecting logs for the Sumo Logic Netlify webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Netlify events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/netlify` - for the Netlify integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Netlify to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Netlify account.

Follow the below steps to configure the Netlify webhook.

1. Sign in to the [Netlify account](https://app.netlify.com/login).
2. Go to **Sites**, and select a site for which you want to send notifications to Sumo Logic.
3. Go to **Site configuration**, and select **Build & deploy**.
4. Go to **Deploy notifications**.
5. Click **Add notification**, and select **Outgoing webhook**, the webhook form appears.
6. Enter webhook form data as follows:
    - **Event to listen for**. Select the type of events that will cause this webhook to execute.
    - **URL to notify**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
7. Click **Save**.
8. Verify Netlify events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/netlify`
```

:::info
- For detailed information about webhook creation, refer to the [Netlify Documentation](https://docs.netlify.com/site-deploys/notifications/#outgoing-webhooks).
- For support, [contact Netlify](https://www.netlify.com/support/).
:::
