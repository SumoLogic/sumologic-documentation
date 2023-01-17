---
id: new-relic
title: Webhook Connection for New Relic
sidebar_label: New Relic
description: Send data from alerts to your New Relic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://newrelic.com/themes/custom/erno/assets/mediakit/new_relic_logo_horizontal.png' alt="thumbnail icon" width="100"/>

New Relic webhook connections allow you to send alert results to New Relic as a custom event (Insight). You can learn more about the New Relic Insights custom events in their [API Help](https://docs.newrelic.com/docs/insights/explore-data/custom-events/insert-custom-events-insights-api).

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

## Set up a webhook connection for New Relic

You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities) to create webhook connections.

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the Connections page click **Add**.
1. Click **New Relic**.
1. In the Create Connection dialog, enter the name of the connection.
1. (Optional) Enter a **Description** for the connection.
1. Enter the **URL** for the endpoint. See [Create an API Key for New Relic Webhook](#create-an-api-key-for-new-relic-webhook).
  ```
  https://insights-collector.newrelic.com/v1/accounts/ACCOUNT_ID/events
  ```
1. Under **Insert Key**, enter your API Key generated from New Relic Insights. See [Create an API Key for New Relic Webhook](#webhook-connection-for-new-relic).
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. Customize your **Payload** to include any information you want to send from your scheduled search to New Relic. See [Send Events to New Relic using a Webhook](#send-events-to-new-relic-insights-using-a-webhook). For details on variables that can be used as parameters within your JSON object, see [webhook payload variables](set-up-webhook-connections.md).
1. Click **Save**.

## Create an API key for New Relic webhook

For the **Endpoint** and **Insert Key **fields of the webhook, you need to generate an API Key through the New Relic Insights UI:

1. In your New Relic Insights account, under **Manage Data**, click **API Keys**.
1. Click the **Add** button next to Insert Key.
1. Use the **Endpoint** and **Key** values for your webhook fields.
1. Enter an optional **Description** and click Save Your Notes to register the API Key.

## Send Events to New Relic Insights using a Webhook

Select the webhook connection in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors) to send events to New Relic Insights and use the following payload.

```json
{
    "eventType": "{{Name}}",
    "description": "{{Description}}",
    "client": "Sumo Logic",
    "search_url": "{{QueryUrl}}",
    "num_records": "{{NumQueryResults}}",
    "search_results": "{{ResultsJson}}"
}
```

Your payload must include "eventType" and "search_results" as
parameters.

* **eventType** can be a combination of alphanumeric characters, underscores `_`, and colons `:`. Special characters are not allowed.
* **search_results** must include `ResultsJson` as a variable.

A maximum of 200 aggregate results or 10 raw messages for this field can be sent via webhook. For more information, see [About Webhook Connections](set-up-webhook-connections.md).

By default, a "timestamp" field will be applied in New Relic Insights when the event is received. To override this, you must specify "timestamp" as a field in your Sumo Logic query (as an unformatted Unix timestamp, in seconds or milliseconds relative to the Unix epoch). For example, if you would like your timeslice to be represented in New Relic as the timestamp, you may add the following to your query:

```sql
| timeslice 1m
| format ("%s",_timeslice) as timestamp
| count by timestamp
```
