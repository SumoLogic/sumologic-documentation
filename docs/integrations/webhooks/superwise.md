---
id: superwise
title: Superwise
description: Learn about the collection process for the Sumo Logic Superwise integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/superwise-logo.png')} alt="Thumbnail icon" width="50"/>

Superwise is an AI monitoring platform that helps organizations ensure the reliability of their machine learning models by providing real-time insights, anomaly detection, and performance monitoring, enabling proactive maintenance and optimization of AI systems. You can use a webhook in the Superwise platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor critical incident and it's related activities in Sumo Logic. For more details, refer to the [Superwise Documentation](https://docs.superwise.ai/).

## Event types

The Sumo Logic integration for Superwise ingests events related to incident activities into Sumo Logic through an outgoing webhook available in Superwise. The following event types are ingested through the Superwise webhook:
- Model Deployed
- Model Performance Metrics
- Anomaly Detection Alerts
- Model Drift Notifications

## Setup

This section has instructions for collecting logs for the Sumo Logic Superwise webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Superwise events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/superwise` - for the Superwise integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Superwise to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Superwise account.

Follow the below steps to configure the Superwise webhook.

1. Sign in to the [Superwise account](https://portal.superwise.ai/account/login).
2. Go to **Integrations**, and click **New integration**.
3. Under **Add integration**, select **Webhook**. The webhook form will appear.
4. Enter webhook form data as follows:
    - **Channel name**. Provide a name for your outgoing webhook.
    - **URI**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
5. Click **Test**.
6. Click **Create integration**.
7. Verify Superwise events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourcecategory=webhook/superwise
  ```

:::info
- For detailed information about webhook creation, refer to the [Superwise Documentation](https://docs.superwise.ai/docs/webhook).
- For support, [contact Superwise](https://superwise.ai/contact-us/).
:::
