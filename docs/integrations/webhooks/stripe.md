---
id: stripe
title: Stripe
description: Learn about the collection process for the Sumo Logic Stripe integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/stripe-logo.png')} alt="Thumbnail icon" width="50"/>

The Stripe app for Sumo Logic enables you to seamlessly monitor financial transactions, customer interactions, and subscription management. This app is based on Split Webhook, which provides seamless integration between Split and Sumo Logic. With this app, you can make data-driven decisions, improve financial efficiency, and enhance customer experiences, ensuring your business stays competitive and responsive in today's fast-paced market.

Stripe is a popular online payment processing platform that enables businesses to accept and manage payments securely through customizable APIs and tools, simplifying e-commerce transactions and subscription services. You can use a webhook in the Stripe platform to forward payment-related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor payment activities, subscription changes, successful charges, and refunds in Sumo Logic. For more details, refer to the [Stripe Documentation](https://stripe.com/docs).

## Event types

The Sumo Logic app for Stripe ingests Stripe events into Sumo Logic through an outgoing webhook available in the Stripe. For more information on supported events that are ingested through the Stripe webhook, see the [Stripe documentation](https://stripe.com/docs/api/events/types).

### Sample log messages

```json
{
  "id": "evt_1NpohqSHj4k9zAUGpMymKz8K",
  "object": "event",
  "api_version": "2022-11-15",
  "created": 1698050901,
  "data": {
    "object": {
      "id": "zhmnGDMH",
      "object": "coupon",
      "amount_off": null,
      "created": 1698050901,
      "currency": null,
      "duration": "forever",
      "duration_in_months": null,
      "livemode": true,
      "max_redemptions": null,
      "metadata": {},
      "name": "coupon3",
      "percent_off": 67,
      "redeem_by": null,
      "times_redeemed": 0,
      "valid": false
    }
  },
  "livemode": true,
  "pending_webhooks": 1,
  "request": {
    "id": "req_J0Q2AnR8Z1Fq7R",
    "idempotency_key": null
  },
  "type": "coupon.deleted"
}
```

### Sample queries

```sql
_sourcecategory=webhook/stripe object
| json "type", "data.object.object" as  type, object nodrop
| where type matches "{{type}}" and object matches "{{object}}"
| count by object
| sort by _count, object asc
```

## Setup

This section has instructions for collecting logs for the Sumo Logic Stripe webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Stripe events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one.
2. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source - for example, `webhook/stripe` - for the Stripe integration.
4. Expand **Advanced Options for Logs (Optional)** section in the HTTP Source, then uncheck **Multiline Processing** option and check **One Message Per Request**.
5. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Stripe to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Stripe account.

Follow the below steps to configure the Stripe webhook.

1. Sign in to the [Stripe account](https://dashboard.stripe.com/login).
2. Go to **Developers** section, click **Webhooks**.
3. Select **Add endpoint**. The webhook form will appear.
4. Enter webhook form data as follows:
    - **Endpoint URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
    - **Description**. Enter an optional description for the given webhook.
    - **Listen to**. Select an option for account from **Events on your account** and **Events on Connected accounts**.
    - **Select events**. Select events to listen for webhook.
5. Click **Add endpoint**.
6. Verify Stripe events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/stripe
  ```

:::info
- For detailed information about webhook creation, refer to the [Stripe Documentation](https://stripe.com/docs/webhooks).
- For support, [contact Stripe](https://support.stripe.com/contact/email).
:::

### Installing the Stripe app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Stripe dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Stripe - Overview** enhances transparency into activities within the Stripe platform by classifying them based on event type and object. It offers valuable insights and statistics on events related to Payment Intents, Plans, Promotional Codes, and Billing Portal Configuration.

<img src={useBaseUrl('img/integrations/webhooks/Stripe-Overview.png')} style={{border: '1px solid black'}} alt="Stripe-Overview"/>

### Products

The **Stripe - Products** provides valuable insights and statistics concerning events related to products, encompassing tax rates and coupons.

<img src={useBaseUrl('img/integrations/webhooks/Stripe-Products.png')} style={{border: '1px solid black'}} alt="Stripe-Products"/>

### Customers and Billing

The **Stripe - Customers and Billing** offers valuable insights and statistical data about customer and billing-related events including subscriptions and invoices.

<img src={useBaseUrl('img/integrations/webhooks/Stripe-Customers_and_Billing.png')} style={{border: '1px solid black'}} alt="Stripe-Customers_and_Billing"/>

## Upgrade/Downgrade the Stripe app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Stripe app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>