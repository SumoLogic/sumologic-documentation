---
id: zenduty
title: Zenduty
description: Learn about the collection process for the Sumo Logic Zenduty integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/zenduty-logo.png')} alt="Thumbnail icon" width="50"/>

Zenduty is an incident management platform that helps businesses manage and respond to critical incidents by providing on-call scheduling, alert routing, and collaboration tools, ensuring timely incident resolution and minimizing downtime. You can use a webhook in the Zenduty platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor critical incident and it's related activities in Sumo Logic. For more details, refer to the [Zenduty Documentation](https://docs.zenduty.com/).

## Event types

The Sumo Logic integration for Zenduty ingests Zenduty events related to incident activities into Sumo Logic through an outgoing webhook available in Zenduty. The following event types are ingested through the Zenduty webhook:
- Triggered
- Acknowledged
- Resolved

## Setup

This section has instructions for collecting logs for the Sumo Logic Zenduty webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Zenduty events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/zenduty` - for the Zenduty integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Zenduty to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Zenduty account.

Follow the below steps to configure the Zenduty webhook.

1. Sign in to the [Zenduty account](https://www.zenduty.com/login/).
2. Go to **Teams**, and select the team for which you want to send notifications to Sumo Logic.
3. From the left navigation panel, go to **Services** , and click the relevant Service.
4. Under **Outgoing Integrations** section, click **Add Outgoing Integration**.
5. From the list, select **Outgoing Webhook**. The webhook form will appear.
6. Enter webhook form data as follows:
    - **Name**. Provide a name for your outgoing webhook.
    - **Summary**. Provide a summary for your outgoing webhook.
7. Click **Add Integration**. The configuration form will appear.
8. Enter configuration form data as follows:
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
9. Click **Save**.
10. Verify Zenduty events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/zenduty
  ```

:::info
- For detailed information about webhook creation, refer to the [Zenduty Documentation](https://docs.zenduty.com/docs/outgoingwebhooks).
- For support, [contact Zenduty](https://www.zenduty.com/).
:::
