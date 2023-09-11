---
id: flagsmith
title: Flagsmith
description: Learn about the collection process for the Sumo Logic Flagsmith integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/flagsmith-logo.png')} alt="Thumbnail icon" width="50"/>

Flagsmith facilitates feature management across web, mobile, and server-side applications. You can use a webhook in the Flagsmith platform to forward feature-related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the creation, updates, and overrides of features for identities and segment events in Sumo Logic. For more details, refer to the [Flagsmith Documentation](https://docs.flagsmith.com/).

## Event types

The Sumo Logic integration for Flagsmith ingests feature events into Sumo Logic through an outgoing webhook available in Flagsmith. The following event types are ingested through the Flagsmith webhook:
- Feature Creation
- Feature Updates
- Feature Overrides

## Setup

This section has instructions for collecting logs for the Sumo Logic Flagsmith webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Flagsmith events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/flagsmith` - for the Flagsmith integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Flagsmith to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Flagsmith account.

Follow the below steps to configure the Flagsmith webhook.

1. Sign in to the [Flagsmith account](https://app.flagsmith.com/).
2. Go to the project for which you want to send notifications to Sumo Logic.
3. Select **Settings**, and move to **Webhooks**.
4. Click **Create feature webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **Create Webhook**.
7. Verify Flagsmith events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/flagsmith`
```

:::info
- For detailed information about webhook creation, refer to the [Flagsmith Documentation](https://docs.flagsmith.com/integrations/webhook).
- For support, [contact Flagsmith](https://www.flagsmith.com/contact-us). 
:::
