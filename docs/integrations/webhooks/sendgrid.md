---
id: sendgrid
title: SendGrid
description: Learn about the collection process for the SendGrid integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/sendGrid-logo.png')} alt="Thumbnail icon" width="50"/>

SendGrid is a cloud-based email delivery and management platform that helps businesses send transactional and marketing emails reliably and efficiently. A webhook available in the SendGrid can forward events related to email actions from SendGrid platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor recipient engagement, track email delivery status, and respond to events like opens, clicks, bounces, unsubscribes, and spam reports in Sumo Logic. For more details, refer to the [SendGrid Documentation](https://docs.sendgrid.com/).

## Event types

The Sumo Logic integration for SendGrid ingests SendGrid deliverability events and engagement events into Sumo Logic through an outgoing webhook available in SendGrid. The following event types are ingested through the SendGrid webhook:
- Processed
- Dropped
- Deferred
- Bounced
- Delivered
- Opened
- Clicked
- Unsubscribed
- Spam Reports
- Group Unsubscribes
- Group Resubscribes

## Setup

This section has instructions for collecting logs for the Sumo Logic's SendGrid webhook collection.

### Source configuration
Follow the below steps to configure the Hosted Collector to receive SendGrid events:

1. In the Sumo Logic portal, create a new [Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source. For example, configure as `webhook/sendgrid` for the SendGrid integration.
3. Copy and save the endpoint URL of the source.
### Vendor configuration
Configure the webhook integration in SendGrid to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your SendGrid account.

Follow the below steps to configure the SendGrid Webhook:

1. Sign in to your [SendGrid account](https://app.sendgrid.com/login).
2. Navigate to **Mail Settings** from the **Settings** section.
3. Click on **Event Webhooks** under the **Webhook Settings**.
4. Click on **Create new webhook**. The webhook's configuration page will appear.
5. Enter webhook form data as follows:
    - **Enabled**. Toggle to make webhook active.
    - **Friendly Name**. Enter an optional name to help you differentiate among your webhooks.
    - **Post URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
    - **Actions to be posted**. Select the event types you would like to receive data about from webhook.
    - **Security features**. See [Event Webhook Security Features](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features) for details about configuring the settings under this heading.
    - **Test Your Integration**. select to receive an HTTP POST request with example events as a JSON array at your provided Post URL.
6. Click on **Save**.
7. Verify SendGrid events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel.
`_sourcecategory=webhook/sendgrid`

:::info
- For detailed information about webhook creation, refer [SendGrid Documentation](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook).
- For support, contact [SendGrid](https://support.sendgrid.com/hc/en-us). 
:::