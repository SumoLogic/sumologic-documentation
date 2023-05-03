---
id: zoom
title: Zoom Source
description: An HTTP Zoom Source is an endpoint for for receiving Webhook events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/zoom.png')} alt="Thumbnail icon" width="50"/><br/>

Zoom HTTP Source is an endpoint for receiving Webhook events that are grouped into the following core event types:
- Meeting Events
- Webinar Events
- Recording Events
- Zoom Room Events
- User Events
- Account Events

For more information on Zoom Webhook events, see this [Zoom web page](https://marketplace.zoom.us/docs/api-reference/webhook-reference).

This section shows you how to configure Webhooks to collect events from Zoom. For more information, see [Create a Webhook-Only App](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-webhook-only-app).

## Prerequisites

When you create a Zoom Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/).

Some Webhook events may not be available based on the plan type. Refer to the Prerequisite section for each Webhook event type on this [Zoom page](https://developers.zoom.us/docs/api/rest/reference/zoom-api/events/#operation/meeting.created) for account-created event types.

## Setup and Configuration

Follow the below steps to get the required fields for user configuration:
1. Sign in to [Zoom Marketplace](https://marketplace.zoom.us/).
1. In the upper right corner, click **Develop > Build App**.<br/><img src={useBaseUrl('img/send-data/zoom-sign-in.png')} alt="zoom-sign-in" width="400"/>
1. **Create** a Webhook Only.
1. Specify the following App Information:
    - App Name    
    - Short Description
    - Company Name
    - Developer Name
    - Developer Email Address 
  <br/><img src={useBaseUrl('img/send-data/zoom-app-info.png')} alt="zoom-app-info" width="500"/>
1. Click **Continue**, to copy the **Secret Token** value. <br/><img src={useBaseUrl('img/send-data/secret-token.png')} alt="secret-token" width="500"/>

## Create Zoom Source

To configure Zoom Source:
1. In the Sumo Logic web interface, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **Zoom**. <br/> <img src={useBaseUrl('img/integrations/saas-cloud/zoom.png')} alt="Zoom icon" width="60"/>
1. Enter a **Name** for the Source. A description is optional. <br/><img src={useBaseUrl('img/send-data/zoom-configuration-settings.png')} alt="zoom-configuration-settings" width="400"/>
1. (Optional) For **Source Host** and **Source Category**, enter any string to tag the output collected from the source. These are [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields that allow you to organize your data.For Source Category, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Zoom Secret Token**. Enter the Zoom secret token from the Zoom Marketplace platform.
1. Set any of the following under **Advanced Options for Logs**: <br/><img src={useBaseUrl('img/send-data/advanced-options.png')} alt="Zoom advanced options" width="400"/>
    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
        * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
        * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference/) time-reference for more information.
    * **Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. Check this option if you're working with multiline messages (for example, log4J messages or exception stack traces). De-select this option if you want to avoid unnecessary processing when collecting single-message-per-line files such as a Linux `system.log`.
        * **Infer Message Boundaries.**
            * **Detect Automatically.** By default, the Source is configured to automatically detect which lines belong to the same message.  
            * **Add Boundary Regex.** You can provide a Regular Expression to detect the entire first line of multi-line messages. The expression must match the **entire first line of each log message** within the file.
            * **One Message Per Request.** Select this option if you'll be sending a single message with each HTTP request.
1. [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule.md) you'd like for the Zoom HTTP Source. <br/><img src={useBaseUrl('img/send-data/processing-rules.png')} alt="Processing rules" width="400"/>
1. When you are finished configuring the Source, click **Save**.
1. Copy the HTTP source address.
    * If you need to access the Source's URL again, click **Show URL**.<br/><img src={useBaseUrl('/img/send-data/show-url-zoom.png')} alt="Show URL" width="800"/>

## Enable Events Subcriptions

1. Go back to the **Features** tab in the Zoom Marketplace.
1. Enable **Event Subscriptions**. <br/><img src={useBaseUrl('img/send-data/events-subscriptions.png')} alt="events-subscriptions" width="550"/>
1. Click **Add new event subscription** and provide the following information:
   * **Subscription Name** (for example, Sumo Logic)
   * **Event notification endpoint URL.** Provide the Sumo logic endpoint URL copied after creating the Zoom source .
1. Click **Add events** and subscribe to all the Webhook Events.
1. Click **Done** and validate the endpoint by clicking on the **Validate** button.
1. Once Validated, click on **Save**.
  :::note
  You may face ingestion issues if you use more than one subscription per webhook.
  :::
1. Click **Continue**, to see the app activated message. <br/><img src={useBaseUrl('img/send-data/app-activated-message.png')} alt="app-activated-message" width="400"/>


