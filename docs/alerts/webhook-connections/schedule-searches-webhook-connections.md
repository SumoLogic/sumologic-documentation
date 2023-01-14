---
id: schedule-searches-webhook-connections
title: Scheduled Searches for Webhook Connections
sidebar_label: Sumo Scheduled Searches
description: Create a Scheduled Search to send alerts to a third-party tool via Webhook Connections.
---

[Scheduled searches](/docs/alerts/scheduled-searches) are saved searches that run automatically at specified intervals. When a scheduled search is configured to send an alert, it can be sent to another tool using a Webhook Connection.

You can create a brand new search, or you can base a search on an existing saved or scheduled search. If you'd like to use an existing search, you'll need to save the query as a new search to not override the search's current schedule.

Before setting up a scheduled search for Webhooks, configure a Webhook Connection. For more information, see [Set Up Webhook Connections](set-up-webhook-connections.md).

The payload for each scheduled search can be customized (depending on the tool you're connecting to). Customizing payload does not affect the payload you defined in the Connection—it's at the search level.

To set up a scheduled search for a Webhook Connection:

1. [Save a search](/docs/search/get-started-with-search/search-basics/save-search). 
1. On the **Save Item** page, click **Schedule this search**.<br/> ![schedule frequency.png](/img/connection-and-integration/schedule-frequency.png)
1. Change **Run Frequency** from "Never" to the desired frequency.<br/> ![itemized alert.png](/img/connection-and-integration/itemized-alert.png)
1. For all configuration options, see [Schedule a Search](/docs/alerts/scheduled-searches). 
1. **Alert Type**. Select **Webhook**.
1. Select a **Webhook** from the **Connection** list.
   * (Optional) Select the checkbox if you want a **separate alert sent for each search result**. You can set up to a maximum of 100 alerts. Any results that exceed the configured maximum do not generate an alert. For example, if your scheduled search is configured to send a maximum of 50 alerts and generates 60 results only the first 50 results will generate an alert, all subsequent results will not generate an alert.
    :::note
    This may generate duplicate alerts for non-real-time schedules. If your search time range is longer than the search frequency (like a window of 60 minutes, but the frequency of 15 minutes) duplicate alerts are sent since there is an overlap of 45 minutes between each search and all results are sent, not just the difference.
    :::
   * [Webhook payload variables](set-up-webhook-connections.md) will have values generated for each result. For example, a payload defined as:
        ```
        {{Results.client_ip}} had {{Results.errors}} errors
        ```
        would have a payload from three alerts as:
        * `70.69.152.165 had 391 errors`
        * `17.233.159.60 had 381 errors`
        * `169.107.162.237 had 319 ``errors`
   * If you have selected this checkbox and are scheduling this search to send results to a [ServiceNow security or ITSM incident](/docs/alerts/webhook-connections/servicenow/set-up-security-incident-webhook), you will need to set a field called `correlation_id` to be unique across each search result. For example, if you wanted to create a separate alert for each IP address in your search results, you would create the field as follows: 
        ```
        | now() as timestamp | base64Encode(source_ip) as random | concat(timestamp, random) as correlation_id
        ```
        and then add the following line in the JSON payload below:  
        ```
        "correlation_id": "{{Results.correlation_id}}",
        ```
1. (Optional) Toggle the **Customize** **Payload** switch if you want to customize the JSON payload. If you’d like to use the default payload, leave this as-is. See [Webhook payload variables](set-up-webhook-connections.md) for details on variables you can use as parameters in the JSON payload. 
1. Click **Save**.
