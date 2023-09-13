---
id: gremlin
title: Gremlin
description: Learn about the collection process for the Sumo Logic Gremlin integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/gremlin-logo.png')} alt="Thumbnail icon" width="50"/>

Gremlin provides you the framework to safely, securely, and easily simulate real outages with an ever-growing library of attacks. You can use a webhook in the Gremlin platform to forward experiment-related events from the Gremlin platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the lifecycle of their experiments, starting from initialization, through the running phase, and up to the completion of the experiment in Sumo Logic. For more details, refer to the [Gremlin Documentation](https://www.gremlin.com/docs/).

## Event types

The Sumo Logic integration for Gremlin ingests feature events into Sumo Logic through an outgoing webhook available in Gremlin. The following event types are ingested through the Gremlin webhook:
- Experiment initialized
- Experiment running
- Experiment finished

## Setup

This section has instructions for collecting logs for the Sumo Logic Gremlin webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Gremlin events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/gremlin` - for the Gremlin integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Gremlin to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Gremlin account.

Follow the below steps to configure the Gremlin webhook.

1. Sign in to the [Gremlin account](https://app.gremlin.com/login).
2. Go to **Team Settings** under your **Profile**.
3. Go to **Webhooks**.
4. Click **New Webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - **Name**. Provide a name for your webhook.
    - **Request URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Request Method**. Select **POST** method. 
    - **Events**. Select the event types for which you want to send notifications to Sumo Logic.
6. Click **Save**.    
7. Verify Gremlin events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/gremlin`
```

:::info
- For detailed information about webhook creation, refer to the [Gremlin Documentation](https://www.gremlin.com/docs/platform/integrations/webhooks/).
- For support, [contact Gremlin](https://www.gremlin.com/contact/). 
:::