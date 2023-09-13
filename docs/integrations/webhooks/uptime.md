---
id: uptime
title: Uptime.com
description: Learn about the collection process for the Sumo Logic Uptime.com integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/uptime-logo.png')} alt="Thumbnail icon" width="50"/>

Uptime.com is a website monitoring service that tracks website availability and performance, providing real-time alerts to ensure a smooth online experience. You can use a webhook in the Uptime.com platform to forward alerts related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor website or service uptime, downtime incidents, response times, and performance metrics in Sumo Logic. For more details, refer to the [Uptime.com Documentation](https://support.uptime.com/hc/en-us).

## Event types

The Sumo Logic integration for Uptime.com ingests Uptime.com events into Sumo Logic through an outgoing webhook available in Uptime.com. The following alert event types are ingested through the Uptime.com webhook:
- Website Down
- Slow Response Time
- SSL/TLS Certificate Expiry
- Page Content Change
- Transaction Failure
- DNS Resolution Issue
- Server Error Rate
- CDN Issues
- Resource Loading Issues
- Database Connectivity
- Third-Party Service Failure
- Security Threat Detection
- Uptime/Downtime Reports

## Setup

This section has instructions for collecting logs for the Sumo Logic Uptime.com webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Uptime.com events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, configure as `webhook/uptime` - for the Uptime.com integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Uptime.com to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events related to alert occur within your Uptime.com account.

Follow the below steps to configure the Uptime.com webhook.

1. Sign in to the [Uptime.com account](https://uptime.com/accounts/login).
2. In the left navigation panel, Go to **Notifications** section, select **Integrations**.
3. Click **New Profile**.
4. Select **Custom Postback URL(Webhook)**. The webhook form will appear.
5. Enter webhook form data as follows:
    - **Name**. Provide a name for your webhook.
    - **Assign To Contacts**. Assign your integration to a contact to receive alerts & metrics from checks.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **Save**.
6. Verify Uptime.com events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourcecategory=webhook/uptime
  ```

:::info
- For detailed information about webhook creation, refer to the [Uptime.com Documentation](https://support.uptime.com/hc/en-us/articles/115002560845-Configuring-Custom-Postback-URL-Webhooks).
- For support, [contact Uptime.com](https://uptime.com/contact).
:::
