---
id: buddy
title: Buddy
description: Learn about the collection process for the Sumo Logic Buddy integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/buddy-logo.png')} alt="Thumbnail icon" width="50"/>

Buddy is a web-based and self-hosted continuous integration and delivery platform for software developers. A webhook available in the Buddy can forward pipeline execution logs from Buddy platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the push events along with pipeline execution start, success, failed, and finished events in Sumo Logic. For further details, refer to the [Buddy documentation](https://buddy.works/docs).

## Event types

The Sumo Logic integration for Buddy ingests pipeline execution events into Sumo Logic through an outgoing webhook available in Buddy. The following event types are ingested through the Buddy webhook:
- Push
- Pipeline execution started
- Pipeline execution successful
- Pipeline execution failed
- Pipeline execution finished

## Setup

To set up the Buddy integration, follow the instructions provided. These instructions will guide you through the process of creating endpoint URL of the source, which you will need to use when configuring the webhook integration in the Buddy platform.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Buddy events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/buddy` - for the Buddy integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

:::note
You must be a workspace admin or an owner to access the Buddy webhooks.
:::

Configure the webhook integration in Buddy to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Buddy account.

Follow the below steps to configure the Buddy webhook:

1. Sign in to the [Buddy account](https://buddy.works/sign-in).
2. Go to **Integrations** section, select **New Integration**.
3. Search for **Webhook** and select it. The webhook form will appear.
4. Enter webhook form data as follows:
    - **NAME**. Provide a name for your webhook.
    - **PAYLOAD URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **TRIGGER ON EVENTS**. Select the type of events that will cause this webhook to execute.
    - **ENABLE IN PROJECTS**. Select the projects for which you want the events to be sent to Sumo Logic.
5. Click **Save Changes**.
6. Verify Buddy events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel: `_sourceCategory=webhook/buddy`

:::info
- For detailed information about webhook creation, refer to [Buddy documentation](https://buddy.works/docs/integrations/webhooks).
- For support, email to [support@buddy.works](mailto:support@buddy.works).
:::
