---
id: split
title: Split
description: Learn about the collection process for the Sumo Logic Split integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/split-logo.png')} alt="Thumbnail icon" width="50"/>

Split is a feature delivery platform that combines the quick and dependable nature of feature flags with data-driven insights to assess the effects of each feature. You can use a webhook in the Split platform to forward activities related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor user activities, admin changes in the tools used by the whole team, and impressions in Sumo Logic. For more details, refer to the [Split Documentation](https://docs.split.io/docs).

## Event types

The Sumo Logic integration for Split ingests Split events into Sumo Logic through an outgoing webhook available in Split. The following event types are ingested through the Split webhook:
- Audit logs
- Admin audit logs
- Impressions

## Setup

This section has instructions for collecting logs for the Sumo Logic Split webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Split events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/split` - for the Split integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Split to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Split account.

Follow the below steps to configure the Split webhook.

1. Sign in to your [Split account](https://app.split.io/login).
2. Switch to **Admin settings**.
3. Click **Integrations** from **Integration settings** section.
4. Click **Add** next to **Outgoing Webhook** for any of above mentioned event types. The webhook form will appear.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP Source Address created above.
    - For **Outgoing Webhook** of type **impressions** and **audit logs**,
        - **Environments**. Select the environment in Split from which data should be sent.
6. Click **Save**.
7. Verify Split events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/split
  ```

:::info
- For detailed information about webhook creation, refer to the [Split Webhook - audit log](https://help.split.io/hc/en-us/articles/360020957991-Webhook-audit-log), [Split Webhook - admin audit logs](https://help.split.io/hc/en-us/articles/360051384832-Webhook-admin-audit-logs) and [Split Webhook - impressions](https://help.split.io/hc/en-us/articles/360020700232-Webhook-impressions) documentation.
- For support, contact [Split](https://www.split.io/support/).
:::
