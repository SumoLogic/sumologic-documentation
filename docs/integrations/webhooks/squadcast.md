---
id: squadcast
title: Squadcast
description: Learn about the collection process for the Sumo Logic Squadcast integration.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/squadcast-logo.png')} alt="Thumbnail icon" width="50"/>

Squadcast is an incident management platform that streamlines real-time alerts and on-call scheduling for effective resolution of critical incidents, fostering seamless team collaboration and minimizing service disruptions. You can use a webhook in the Squadcast platform to forward events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor real-time alerts, and track incident details in Sumo Logic. For more details, refer to the [Squadcast Documentation](https://support.squadcast.com/quickstart-guide/readme).

## Event types

The Sumo Logic integration for Squadcast ingests events into Sumo Logic through an outgoing webhook available in Squadcast. The following event types are ingested through the Squadcast webhook:
- Incident triggered
- Incident reassigned
- Incident acknowledged
- Incident resolved
- Communication Channel created
- Communication Channel updated
- Communication Channel deleted
- Incident Notes created
- Incident Notes updated
- Incident Notes deleted
- Incident Notes starred
- Incident Notes unstarred
- Incident Tags updated
- Incident Task created
- Incident Task updated
- Incident Task deleted
- Incident Task completed
- Incident Task uncompleted
- Postmortem created
- Postmortem updated
- Postmortem deleted
- SLO-Violating Incident created
- SLO-Violating Incident marked false positive
- SLO-Violating Incident unmarked false positive
- SLO-Violating Incident spent error budget
- StatusPage updated

## Setup

This section has instructions for collecting logs for the Sumo Logic Squadcast webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive Squadcast events.

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one. Then add an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
2. Configure **Source Category** in the HTTP Source - for example, `webhook/squadcast` - for the Squadcast integration.
3. Copy and save the endpoint URL of the source.

### Vendor configuration

Configure the webhook integration in Squadcast to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your Squadcast account.

Follow the below steps to configure the Squadcast webhook.

1. Sign in to the [Squadcast account](https://app.squadcast.com/).
2. Go to **Settings**, and click **Webhooks**.
3. Click **Add Webhook**. The webhook form will appear.
4. Enter webhook form data as follows:
    - **Webhook Name**. Provide a name for your outgoing webhook.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
5. Click **Next: Choose Webhook Type**. Next page of webhook configuration will appear.
    - **Choose Webhook Type**. Choose Automatic as a webhook type.
        - **Versions**. Select the version from V1 and V2.
        - **Triggers**. Select events to trigger the webhook.
6. Click **Next: Configure Payload**. Next page of webhook configuration will appear.
        - Choose payload type between **Standard Squadcast Payload** and **Custom Payload**, and configure your payload.
        - For **Custom Payload**,
            - **Select Payload Template**. Choose from one of the pre-configured templates or create your own payload.
7. Click **Save**.
8. Verify Squadcast events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
  ```sql
  _sourceCategory=webhook/squadcast
  ```

:::info
- For detailed information about webhook creation, refer to the [Squadcast Documentation](https://support.squadcast.com/integrations/outgoing-webhooks).
- For support, [contact Squadcast](https://www.squadcast.com/support-ticket-form).
:::
