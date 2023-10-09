---
id: firefly
title: Firefly
description: Learn about the collection process for the Sumo Logic Firefly integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/firefly-logo.png')} alt="Thumbnail icon" width="50"/>

Firefly's Cloud Asset Management solution enables DevOps, SREs, and platform engineering teams to control their entire cloud footprint and manage it more efficiently and consistently using Infrastructure-as-Code. You can use a webhook in the Firefly platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the system for various events including drift detection, unmanaged resource detection, ghost resource detection, and policy violations in Sumo Logic. For more details, refer to the [Firefly Documentation](https://firefly-5.gitbook.io/firefly-documentation-portal/).

# Event types

The Sumo Logic integration for Firefly ingests events into Sumo Logic through an outgoing webhook available in Firefly. The following event types are ingested through the Firefly webhook:
- Drift Detection
- Unmanaged resource detection
- Ghost resource detection
- Policy Violation

# Setup

This section has instructions for collecting logs for the Sumo Logic Firefly webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Firefly events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/firefly` - for the Firefly integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Firefly to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Firefly account.

Follow the below steps to configure the Firefly webhook.

1. Sign in to the [Firefly account](https://www.firefly.ai/).
2. Go to **Settings**, and select **Integrations**.
3. Click **Add New**.
4. Under **Notifications** section, select **Webhooks**. The webhook form appears.
5. Enter webhook form data as follows:
    - **Nickname**. Provide a name for your webhook.
    - **Webhook URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
6. Click **Next**, and select **Done**.
7. Go to **Notifications**, and click **Add New**.
8. Enter notification form data as follows:
    - **Event Type**. Select for which event type to receive a notification.
    - Under **Criteria**, select the **Data source**.
    - **Destination**. Select the webhook name created above.
9. Click **Create**.    
10. Verify Firefly events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/firefly`
```

:::info
- For detailed information about webhook creation, refer to the [Webhook Documentation](https://firefly-5.gitbook.io/firefly-documentation-portal/user-guides/integrations/integrate-your-providers-and-tools/send-firefly-notifications-to-your-messaging-tools/send-firefly-notifications-to-webhooks) and [Notification Documentation](https://firefly-5.gitbook.io/firefly-documentation-portal/user-guides/how-to-guides/manage-notifications).
- For support, [contact Firefly](https://firefly-5.gitbook.io/firefly-documentation-portal/contacting-firefly-support).
:::
