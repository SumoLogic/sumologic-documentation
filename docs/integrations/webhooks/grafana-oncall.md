---
id: grafana-oncall
title: Grafana OnCall
description: Learn about the collection process for the Sumo Logic Grafana OnCall integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/grafana-oncall-logo.png')} alt="Thumbnail icon" width="50"/>

Grafana OnCall is an open source incident response management tool built to help teams improve their collaboration and resolve incidents faster. You can use a webhook in the Grafana OnCall platform to forward critical alert group events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire spectrum of alert group actions, encompassing the creation, escalation status, user acknowledgments, resolution status, and user-initiated silence events in Sumo Logic. For more details, refer to the [Grafana OnCall Documentation](https://grafana.com/docs/oncall/latest/).

## Event types

The Sumo Logic integration for Grafana OnCall ingests alert group-related events into Sumo Logic through an outgoing webhook available in Grafana OnCall. For more information on supported events that are ingested through the Grafana OnCall webhook, see the [Grafana OnCall Documentation](https://grafana.com/docs/oncall/latest/outgoing-webhooks/#event-types).

## Setup

This section has instructions for collecting logs for the Sumo Logic Grafana OnCall webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Grafana OnCall events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/grafanaoncall` - for the Grafana OnCall integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Grafana OnCall to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Grafana OnCall account.

Follow the steps to configure the Grafana OnCall webhook.

1. Sign in to the [Grafana Cloud account](https://grafana.com/auth/sign-in/?plcmt=top-nav&cta=myaccount).
2. Under **Alerts and IRM** section move to **OnCall** option.
3. Under this go to **Outgoing Webhooks**.
4. Click **Create webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - **Enabled**. Enable this option to trigger the webhook.
    - **Trigger Type**. The type of event which will cause this webhook to execute.
    - **HTTP Method**. Choose POST.
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Forward All**. Enable this option to send the entire webhook payload of the alert group and context data to the webhook's URL.
6. Click **Create Webhook**.
7. Verify Grafana OnCall alerts are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/grafanaoncall`
```

:::info
- For detailed information about webhook creation, refer to the [Grafana Documentation](https://grafana.com/docs/oncall/latest/outgoing-webhooks/#creating-an-outgoing-webhook).
- For support, [contact Grafana OnCall](https://grafana.com/contact?plcmt=top-nav&cta=contactus).
:::
