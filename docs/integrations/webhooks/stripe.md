---
id: stripe
title: Stripe
description: Learn about the collection process for the Stripe integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/stripe-logo.png')} alt="Thumbnail icon" width="50"/>

Stripe is a popular online payment processing platform that enables businesses to accept and manage payments securely through customizable APIs and tools, simplifying e-commerce transactions and subscription services. A webhook available in Stripe can forward payment-related events from the Stripe platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor payment activities, subscription changes, successful charges, and refunds in Sumo Logic. For more details, refer to the [Stripe Documentation](https://stripe.com/docs).

## Event types

The Sumo Logic integration for Stripe ingests Stripe events into Sumo Logic through an outgoing webhook available in Stripe. For more information on supported events that are ingested through the Stripe webhook, see the [Stripe documentation](https://stripe.com/docs/api/events/types).

## Setup

This section has instructions for collecting logs for the Sumo Logic's Stripe webhook collection.

### Source configuration
Follow the below steps to configure the Hosted Collector to receive Stripe events:

1. In the Sumo Logic portal, create a new [Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. 
2. Then add a [HTTP Logs and Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source. For example, configure as `webhook/stripe` for the Stripe integration.
4. Expand **Advanced Options for Logs (Optional)** section in the HTTP Source, then uncheck **Multiline Processing** option and check **One Message Per Request**.
5. Copy and save the endpoint URL of the source.
### Vendor configuration
Configure the webhook integration in Stripe to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Stripe account.

Follow the below steps to configure the Stripe webhook:

1. Sign in to the [Stripe account](https://dashboard.stripe.com/login).
2. Go to **Developers** section, click on **Webhooks**.
3. Select **Add endpoint**. The webhook form will appear.
4. Enter webhook form data as follows:
    - **Endpoint URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
    - **Description**. Enter an optional description for the given webhook.
    - **Listen to**. Select an option for account from **Events on your account** and **Events on Connected accounts**.
    - **Select events**. Select events to listen for webhook.
5. Click on **Add endpoint**.
6. Verify Stripe events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel.
`_sourcecategory=webhook/stripe`

:::info
- For detailed information about webhook creation, refer [Stripe Documentation](https://stripe.com/docs/webhooks).
- For support, contact [Stripe](https://support.stripe.com/contact/email). 
:::