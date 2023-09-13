---
id: bugsnag
title: Bugsnag
description: Learn about the collection process for the Sumo Logic Bugsnag integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/bugsnag-logo.png')} alt="Thumbnail icon" width="50"/>

Bugsnag provides software teams with an automated crash detection platform for their web and mobile applications. You can use a webhook in the Bugsnag platform to forward error-related events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor various events such as spikes in errors, new releases, error occurrences, frequent error patterns, milestones reached, collaborator interactions, and state changes in Sumo Logic. For more details, refer to the [Bugsnag Documentation](https://docs.bugsnag.com/).

## Event types

The Sumo Logic integration for Bugsnag ingests error-related events into Sumo Logic through an outgoing webhook available in Bugsnag. The following event types are ingested through the Bugsnag webhook:
- Spikes in errors
- New releases
- Error occurrences
- Frequent error patterns
- Milestones reached
- Collaborator interactions
- State changes

## Setup

This section has instructions for collecting logs for the Sumo Logic Bugsnag webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Bugsnag events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/bugsnag` - for the Bugsnag integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Bugsnag to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Bugsnag account.

Follow the steps to configure the Bugsnag webhook.

1. Sign in to the [Bugsnag account](https://app.bugsnag.com/user/sign_in).
2. Go to **Settings** icon on the right side of the navigation bar and select **Project settings**.
3. Select **Data forwarding** under **Integrations and email** section.
4. Select **Webhook** under **Available integrations**.
6. Enter webhook form data as follows:
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
7. Click **SAVE**.
8. Under **Notify me when** section, enable the event types for which you want to send notifications to Sumo Logic.
9. Verify Bugsnag events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourcecategory=webhook/bugsnag`
```

:::info
- For detailed information about webhook creation, refer to the [Bugsnag Documentation](https://docs.bugsnag.com/product/integrations/data-forwarding/webhook/).
- For support, [contact Bugsnag](https://docs.bugsnag.com/platforms/macos/support/).
:::

