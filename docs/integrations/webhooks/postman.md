---
id: postman
title: Postman
description: Learn about the collection process for the Postman integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/postman-logo.png')} alt="Thumbnail icon" width="50"/>

Postman is an API development tool that streamlines API building, testing, and modification. It simplifies the process of working with APIs for developers. A webhook available in the Postman can forward events related to changes occurred in your Postman platform to the Sumo Logic HTTP endpoint. Using these logs, you can monitor API test results, collection changes, monitor alerts, environment modifications, and custom automation workflow triggers in Sumo logic. For more details, refer to the [Postman Documentation](https://learning.postman.com/docs/introduction/overview/).

## Event types

The Sumo Logic integration for Postman ingests Postman events into Sumo Logic through an outgoing webhook available in Postman. For more information on supported events that are ingested through the Postman webhook, see the [Postman documentation](https://learning.postman.com/docs/integrations/webhooks/).

## Setup

This section has instructions for collecting logs for the Sumo Logic Postman webhook collection.

### Source configuration
Follow the below steps to configure the Hosted Collector to receive Postman events.

1. In the Sumo Logic portal, create a new [Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add a [HTTP Logs and Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source. For example, configure as `webhook/postman` for the Postman integration.
3. Copy and save the endpoint URL of the source.
### Vendor configuration
Configure the webhook integration in Postman to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Postman account.

Follow the below steps to configure the Postman webhook:

1. Sign in to your [Postman account](https://www.postman.com/).
2. On the home page, click on the **Integrations** tab from the left sidebar.
3. Search and select **Webhooks** from the list of integrations.
4. The integration page has choices for each type of custom webhook. Select **Add Integration** next to a webhook type to configure your integration. The webhook form will appear.
5. Enter webhook form data as follows:
    - **Nickname**. Enter a Nickname for the integration.
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL(source address) created above.
    - For **Backup a collection** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Collection**. Select the collection you wish to send updates for.
    - For **Post monitoring results** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Monitor**. Select the monitor you wish to send results for.
6. Click **Add Integration**.
7. Verify Postman events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's search panel.
`_sourcecategory=webhook/postman`

:::info
- For detailed information about webhook creation, refer [Postman Documentation](https://learning.postman.com/docs/integrations/webhooks/).
- For support, contact [Postman](https://support.postman.com/hc/en-us).
:::