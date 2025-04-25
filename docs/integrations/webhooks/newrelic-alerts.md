---
id: newrelic-alerts
title: New Relic Alerts
description: Learn about the collection process for the Sumo Logic New Relic Alerts integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/newrelic-alerts-logo.png')} alt="Thumbnail icon" width="50"/>

New Relic's alerts and applied intelligence are designed for busy DevOps teams to end response fatigue and detect and diagnose incidents and prioritize them for immediate action. You can use a webhook in the New Relic platform to forward alert events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire lifecycle of issues with events such as activation, acknowledgment, closure, priority changes, and other updates in Sumo Logic. For more details, refer to the [New Relic Alerts Documentation](https://docs.newrelic.com/docs/alerts-applied-intelligence/overview/).

## Event types

The Sumo Logic integration for New Relic Alerts ingests alert events into Sumo Logic through an outgoing webhook available in New Relic. For more information on supported events that are ingested through the New Relic webhook, see the [New Relic Alerts Documentation](https://docs.newrelic.com/docs/alerts-applied-intelligence/applied-intelligence/incident-workflows/incident-workflows/#workflows-triggered)

## Setup

This section has instructions for collecting logs for the Sumo Logic New Relic Alerts webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive New Relic Alert events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/newrelicalerts` - for the New Relic Alerts integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in New Relic to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your New Relic account.

Follow the below steps to configure the New Relic Alerts webhook.

1. Sign in to the [New Relic account](https://login.newrelic.com/login).
2. Go to **Alerts & AI**, and select **Destinations**.
3. Select **Webhook** as the destination. The webhook form appears.
4. Enter webhook form data as follows:
    - **Webhook name**. Provide a name for your webhook.
    - **Endpoint URL**.  Enter the Sumo Logic HTTP endpoint URL (source address) created above.
5. Click **Save Destination**.    
6. Go to **Alerts & AI**, and select **Workflows**.
7. Click **Create your first workflow**. The workflow configuration form appears.
8. Enter workflow form data as follows:
    - Provide a unique name for your workflow.
    - **Filter data**. Select the kinds of issues you want to send.
    - **Notify**. Select **Webhook** as the destination.
9. Under **Destination**, select the webhook created above.
10. Click **Save message**.
11. Click **Activate workflow**.
12. Verify New Relic Alert events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/newrelicalerts`
```

:::info
- For detailed information about webhook creation, refer to the [New Relic Documentation](https://docs.newrelic.com/docs/alerts-applied-intelligence/notifications/notification-integrations/#webhook).
- For support, [contact New Relic](https://newrelic.com/contact-us-customer).
:::
