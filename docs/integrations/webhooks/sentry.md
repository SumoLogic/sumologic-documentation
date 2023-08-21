---
id: sentry
title: Sentry
description: Learn about the collection process for the Sumo Logic Sentry integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/sentry-logo.png')} alt="Thumbnail icon" width="50"/>

Sentry is an open-source error monitoring platform that helps developers identify, track, and resolve software issues in real-time, enhancing the stability and reliability of applications and websites. A webhook available in the Sentry can forward events from Sentry platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor installations, received issues, metric alerts, tracked issues, and identified errors in Sumo Logic. For more details, refer to the [Sentry Documentation](https://docs.sentry.io/).

## Event types

The Sumo Logic Integration for Sentry ingests Sentry events into Sumo Logic through an outgoing webhook available in Sentry. Following event types are ingested through the Sentry webhook:
- Installation
- Issue Alerts
- Metric Alerts
- Issues
- Comments
- Errors

## Setup

This section has instructions for collecting logs for the Sumo Logic Sentry webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Sentry events.

1. In the Sumo Logic portal, create a new [Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/sentry` - for the Sentry integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Sentry to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Sentry account.

Follow the below steps to configure the Sentry Webhook.

1. Sign in to your [Sentry account](https://sentry.io/auth/login/).
2. Click **Settings**.
3. Select **Integrations** under the **Organization** section.
4. Select **Webhooks**.
5. Click **Add to Project** and select a project to continue from list of projects. The webhook's configuration page will appear.
6. Enter webhook form data as follows:
    - **Callback URLs**. Enter the Sumo Logic HTTP Source Address created above.
7. Click **Save Changes**.
8. Click **Enable Plugin**.
9. Verify Sentry events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel.
  ```sql
  _sourcecategory=webhook/sentry
  ```

:::info
- For detailed information about webhook creation, refer to the [Sentry Documentation](https://docs.sentry.io/product/integrations/integration-platform/webhooks/).
- For support, [contact Sentry](https://help.sentry.io/).
:::
