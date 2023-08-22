---
id: rollbar
title: Rollbar
description: Learn about the collection process for the Sumo Logic Rollbar integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/rollbar-logo.png')} alt="Thumbnail icon" width="50"/>

Rollbar is an error tracking and monitoring platform that assists developers in identifying and resolving software issues quickly, enhancing application reliability. A webhook available in the Rollbar can forward events related to errors, occurrences, and activities from Rollbar platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor details such as error messages, stack traces, affected endpoints, user information, and environment variables in Sumo Logic. For more details, refer to the [Rollbar Documentation](https://docs.rollbar.com/docs).

## Event types

The Sumo Logic integration for Rollbar ingests Rollbar events into Sumo Logic through an outgoing webhook available in Rollbar. The following event types are ingested through the Rollbar webhook:
- 10^nth occurrence
- Deploy
- Every occurrence
- High occurrence rate
- Item reactivated
- Item reopened
- Item resolved
- New item

## Setup

This section has instructions for collecting logs for the Sumo Logic Rollbar webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Rollbar events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/rollbar` - for the Rollbar integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Rollbar to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Rollbar account.

Follow the below steps to configure the Rollbar webhook.

1. Sign in to your [Rollbar account](https://rollbar.com/login/).
2. In the Rollbar dashboard, navigate to the project for which you want to set up the webhook from the **Projects** section.
3. Go to **Notifications** under the **Integrations** from the project settings.
4. Select **Webhook** from the **Available Channels**. The webhook form will appear.
5. Enter webhook form data as follows:
    - **URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
6. Click **Enable Webhook Integration**. The webhook's configuration page will appear.
7. Select the rule to trigger the webhook from **Template** dropdown under the **Add Rule** section.
8. Click **Configure Rule**. **Create Rule** table will appear.
9. Update the filters if required. Click **Create Rule**.
10. Click **Save Settings** to update the webhook configuration.
11. Verify Rollbar events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel.
  ```sql
  _sourcecategory=webhook/rollbar
  ```

:::info
- For detailed information about webhook creation, refer to the [Rollbar Documentation](https://docs.rollbar.com/docs/webhooks#configuration).
- For support, [contact Rollbar](https://rollbar.com/contact/?inquiryType=Support).
:::
