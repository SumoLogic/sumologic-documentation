---
id: signl4
title: SIGNL4
description: Learn about the collection process for the Sumo Logic SIGNL4 integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/signl4-logo.png')} alt="Thumbnail icon" width="50"/>

SIGNL4 is a Mobile alert platform for instant critical notifications via push, text, and calls, optimizing incident management and response. You can use a webhook in the SIGNL4 platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor real-time critical alerts and track incident details in Sumo Logic. For more details, refer to the [SIGNL4 Documentation](https://www.signl4.com/webhook-rest-smtp-api-integration/).

## Event types

The Sumo Logic Integration for SIGNL4 ingests SIGNL4 events into Sumo Logic through an outgoing webhook available in SIGNL4. Following event types are ingested through the SIGNL4 webhook:
- New Signl Created
- Signl Confirmed
- Signl Resolved
- Signl Escalated
- Signl Annotated
- Duty Period Started
- Duty Period Ended
- Somebody Punched-In
- Somebody Punched-Out

## Setup

This section has instructions for collecting logs for the Sumo Logic SIGNL4 webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive SIGNL4 events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/signl4` - for the SIGNL4 integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in SIGNL4 to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your SIGNL4 account.

Follow the below steps to configure the SIGNL4 Webhook.

1. Sign in to your [SIGNL4 account](https://account.signl4.com/manage).
2. Navigate to **Gallery** from the **Integrations** section.
3. Search and select **Webhook (Outbound)**. The webhook's configuration page will appear.
4. Enter webhook form data as follows:
    - **Name**. Provide a name for your outgoing webhook.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
5. Click **Install**.
6. Verify SIGNL4 events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourcecategory=webhook/signl4
  ```

:::info
- For detailed information about webhook creation, refer to the [SIGNL4 Documentation](https://www.signl4.com/outbound-webhooks/).
- For support, [contact SIGNL4](https://www.signl4.com/feedback-we-love-hear-from-you/).
:::