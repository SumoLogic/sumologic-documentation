---
id: ilert
title: iLert
description: Learn about the collection process for the Sumo Logic iLert integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/ilert-logo.png')} alt="Thumbnail icon" width="50"/>

iLert is a platform for alerting, on-call management and status pages. You can use a webhook in the iLert platform to forward alert events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the lifecycle of alerts, from creation and acceptance to re-routing, escalation, and resolution, while also tracking responder actions and channel attachments for effective incident management in Sumo Logic. For more details, refer to the [iLert Documentation](https://docs.ilert.com/getting-started/readme).

## Event types

The Sumo Logic integration for iLert ingests alert events into Sumo Logic through an outgoing webhook available in iLert. The following event types are ingested through the webhook:
- Alert created
- Alert accepted
- Alert re-routed
- Alert escalated
- Alert priority raised
- Alert resolved
- Alert comment added
- Responder added to alert
- Responder removed from alert
- Channel attached to alert
- Channel detached from alert

## Setup

This section has instructions for collecting logs for the Sumo Logic iLert webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive iLert events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/ilert` - for the iLert integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in iLert to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your iLert account.

Follow the steps to configure the iLert Webhook.

1. Sign in to the [iLert account](https://app.ilert.com/account-search).
2. Select **Alert sources** from the **Alert Sources** dropdown menu.
3. Select the alert source for which you want to send events to Sumo Logic.
4. Go to **Alert actions**. Click on **Create a new alert action**.
5. Select **Webhook** as the type. The webhook form appears.
6. Enter webhook form data as follows:
    - **Trigger mode**. Select Automatic.
    - **Filter alert events**. Select the event types for which you want to send notifications to Sumo Logic.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Conditional execution**. Select **Execute this alert action for all alerts**. You can even specify any
    specific condition if required.
7. Click **Save**.
8. Verify iLert events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/ilert`
```

:::info
- For detailed information about webhook creation, refer to the [iLert Documentation](https://docs.ilert.com/integrations/webhook).
- For support, [contact iLert](https://docs.ilert.com/contact).
:::
