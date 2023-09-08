---
id: neoload
title: NeoLoad
description: Learn about the collection process for the Sumo Logic NeoLoad integration.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/webhooks/neoload-logo.png')} alt="Thumbnail icon" width="50"/>

NeoLoad is a solution for continuous performance testing software to automate API and application load testing. You can use a webhook in the NeoLoad platform to forward NeoLoad Web events to the Sumo Logic HTTP endpoint. Using these logs, you can monitor the web events in Sumo Logic. For more details, refer to the [NeoLoad Documentation](https://documentation.tricentis.com/nlweb/latest/en/content/overview.htm).

## Event types

The Sumo Logic integration for NeoLoad ingests web events into Sumo Logic through an outgoing webhook available in NeoLoad. For more information on supported events that are ingested through the NeoLoad webhook, see the [NeoLoad Documentation](https://documentation.tricentis.com/nlweb/latest/en/content/views_and_features/events_event_types.htm).

## Setup

This section has instructions for collecting logs for the Sumo Logic NeoLoad webhook collection.

### Source configuration

Follow the below steps to configure the Hosted Collector to receive NeoLoad events:

1. In the Sumo Logic portal, create a new [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) or use an existing one.
2. Then add a [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
3. Configure **Source Category** in the HTTP Source - for example, `webhook/neoload` - for the NeoLoad integration.
4. Expand **Advanced Options for Logs (Optional)** section in the HTTP Source, then uncheck the **Multiline Processing** option and check **One Message Per Request**.
5. Copy and save the endpoint URL of the source.

### Vendor configuration

:::note
Users must be workspace administrators to access the webhooks.
:::

Configure the webhook integration in NeoLoad to send events to the Sumo Logic HTTP source. Once configured, it will be triggered each time the events occur within your NeoLoad account.

Follow the steps to configure the NeoLoad webhook.

1. Sign in to the [NeoLoad account](https://neoload.saas.neotys.com/).
2. In the left navigation panel, click **Settings** and select the **Workspaces** tab.
3. Select the **Webhooks** tab. Click **Create a Webhook**. The webhook form appears.
4. Enter webhook form data as follows:
    - **Event**. Select the **Test started** option to send the payload when a test starts or the **Test ended** option when a test is finished.
    - **NAME**. Provide a name for your webhook.
    - **URL**. Enter the Sumo Logic HTTP endpoint URL (source address) created above.
    - **Payload**. See the sample body payload below. For more details check [NeoLoad Documentation](https://documentation.tricentis.com/nlweb/latest/en/content/reference_guide/settings_manage_workspace_webhooks.htm).
    ```json
   {
    "fallback": "Required plain-text summary of the attachment.",
    "author_name": "NeoLoad Web",
    "author_link": "https://neoload.saas.neotys.com/",
    "title": "Details of test '$(test_result_name)'",
    "title_link": "$(url_test_result_overview)",
    "Test Name": "$(test_settings_name)",
    "Project": "$(test_result_project)",
    "Scenario": "$(test_result_scenario)",
    "Author": "$(test_result_author)",
    "Start Date": "$(test_result_start_date)",
    "Duration": "$(test_result_duration)",
    "Status": "$(test_result_status)",
    "Quality Status": "$(test_result_quality_status)",
    "Max # of VUs": "$(test_result_max_nb_vus)",
    "Workspace ID": "$(workspace_id)",
    "Workspace Name": "$(workspace_name)",
    "footer": "Sent by NeoLoad Web",
    "footer_icon": "https://www.neotys.com/wp-content/uploads/2018/05/Picto_NL_64.png",
    "image_url": "$(url_graph_overview)"
   }
    ```
    
5. Click **Save**.
6. Verify NeoLoad events are getting ingested in Sumo Logic by executing the following query on Sumo Logic's Log Search panel.
```sql
`_sourceCategory=webhook/neoload`
```

:::info
- For detailed information about webhook creation, refer to the [NeoLoad Documentation](https://documentation.tricentis.com/nlweb/latest/en/content/reference_guide/settings_manage_workspace_webhooks.htm).
- For support, [contact NeoLoad](https://support-hub.tricentis.com/open). 
:::