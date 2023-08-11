---
id: postman
title: Postman
description: Learn about the collection process for the Postman app.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/postman-logo.png')} alt="Thumbnail icon" width="50"/>

Postman is an API development tool that streamlines API building, testing, and modification. It simplifies the process of working with APIs for developers. Webhook available in Postman can forward events related to changes occurred in your Postman platform to the Sumo Logic HTTP endpoint. Using these logs, users can monitor API test results, collection changes, monitor alerts, environment modifications, and custom automation workflow triggers in Sumo logic. For further details, refer to [Postman documentation](https://learning.postman.com/docs/introduction/overview/).

## Event types

The Sumo Logic integration for Postman ingests Postman events into Sumo Logic through an outgoing webhook available in Postman. For more information on supported events that are ingested through the Postman webhook, refer to [Postman documentation](https://learning.postman.com/docs/integrations/webhooks/).

## Setup

### Source configuration

Follow the below steps to configure the Hosted Collector and receive Postman events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics#configure-an-httplogs-and-metrics-source). 

2. Configure **Source Category** in the HTTP Source. For example, configure as `webhook/postman` for the Postman app.

3. Copy and save the endpoint URL of source.

### Vendor configuration

Configure the webhook integration in Postman to connect to your Sumo Logic HTTP Source. Once configured, it will be triggered each time the events occur within your Postman account.

Follow the below steps to configure the Postman webhook:

1. Sign in to your [Postman account](https://identity.getpostman.com/login?continue=https%3A%2F%2Fgo.postman.co%2Fbuild).
1. On the home page, click on the **Integrations** tab from the left sidebar.
1. Search and select **Webhooks** from the list of integrations.
1. The integration page has choices for each type of custom webhook. Select **Add Integration** next to a webhook type to configure your integration. The **Add integration** form appears.
1. Enter Webhook form data as follows:
    1. **Nickname**. Enter a Nickname for the integration.
    1. **Webhook URL**. Enter the Sumo Logic HTTP Source Address created above.
    1. For **Backup a collection** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Collection**. Select the collection you wish to send updates for.
    1. For **Post monitoring results** as the webhook type,
        - **Choose workspace**. Select the workspace to which your collection belongs.
        - **Choose Monitor**. Select the monitor you wish to send results for.
    1. Click **Add Integration**.
1. Verify the ingestion of Postman events in Sumo Logic by executing the following query on Sumo Logic's search panel.

    `_sourcecategory=webhook/postman`

:::note
- For detailed information about webhook creation, refer [Postman Documentation](https://learning.postman.com/docs/integrations/webhooks/).
- For support, contact [Postman support center](https://support.postman.com/hc/en-us). 
:::
