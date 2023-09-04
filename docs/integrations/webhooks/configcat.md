---
id: configcat
title: ConfigCat
description: Learn about the collection process for the Sumo Logic ConfigCat integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/configcat-logo.png')} alt="Thumbnail icon" width="50"/>

ConfigCat is a hosted service for feature flag and configuration management. You can use a webhook in the ConfigCat platform to forward events related to feature flags and configuration changes to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the entire lifecycle of their system, from the creation and updates of flags, settings, rules, and environments in Sumo Logic. For more details, refer to the [ConfigCat Documentation](https://configcat.com/docs/getting-started/).

## Event types

The Sumo Logic integration for ConfigCat ingests feature flags and configuration changes events into Sumo Logic through an outgoing webhook available in ConfigCat. The following event types are ingested through the ConfigCat webhook:
- Flag Created
- Flag Updated
- Flag Deleted
- Setting Created
- Setting Updated
- Setting Deleted
- Rule Created
- Rule Updated
- Rule Deleted
- Environment Created
- Environment Updated
- Environment Deleted

## Setup

This section has instructions for collecting logs for the Sumo Logic ConfigCat webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive ConfigCat events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP source - for example, `webhook/configcat` - for the ConfigCat integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in ConfigCat to send events to the Sumo Logic HTTP source. Once configured, it will be triggered whenever any configuration change occurs in your ConfigCat account.

Follow the steps to configure the ConfigCat webhook.

1. Sign in to the [ConfigCat account](https://app.configcat.com/auth/signup).
2. Expand your product by clicking the three dots on the right of the product name.
3. Under this go to **Webhooks**.
4. Click **Add Webhook**. The webhook form appears.
5. Enter webhook form data as follows:
    - Select the config and environment for which you want to trigger the webhook.
    - **HTTP Method**. Choose POST.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Request Body**. Select JSON and use the following body payload.
    ```json
    {
        "ConfigName": "##ConfigName##",
        "ConfigId": "##ConfigId##",
        "EnvironmentName": "##EnvironmentName##",
        "EnvironmentId ": "##EnvironmentId##",
        "URL": "##URL##",
        "ChangeNotes": "##ChangeNotes##",
        "ChangeDetails": "##ChangeDetails##",
        "ChangeDetailsTeams": "##ChangeDetailsTeams##"    
    }
    ```
6. Click **Save Changes**.
7. Verify ConfigCat events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/configcat`
```

:::info
- For detailed information about webhook creation, refer to the [ConfigCat Documentation](https://configcat.com/docs/advanced/notifications-webhooks/).
- For support, [contact ConfigCat](https://configcat.com/support/).
:::

