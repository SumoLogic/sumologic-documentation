---
id: google-cloud-platform-source
title: Google Cloud Platform (GCP) Source
sidebar_label: Google Cloud Platform
description: You can export in real time all of the data collected by Stackdriver to Google Cloud Pub/Sub. Sumo Logic uses the Pub/Sub integration to push logs to our platform in real time.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/gcp-icon.png')} alt="icon" width="40"/>

Log data for Google Cloud Platform (GCP) services is collected and exposed through the Google Cloud Stackdriver service. You can export, in real time, the data collected by [Stackdriver](https://cloud.google.com/stackdriver/) to Google Cloud Pub/Sub. We use this Pub/Sub integration to push logs to Sumo Logic in real time.

:::note
Google no longer requires a pub/sub domain to be [verified](https://cloud.google.com/pubsub/docs/push). You no longer have to set up domain verification with your GCP Source endpoint.
:::

## Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
Although you can use the same GCP Source to receive log data collected from multiple GCP services (i.e., sending logs collected from Google Cloud App Engine, Google Cloud IAM), this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service, you can define a specific Source Category to each service.
:::

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
1. Enter a **Name** to display for the Source. A **Description** is optional.<br/>  ![google_cloud_platform_2022.png](/img/send-data/google_cloud_platform.png)
1. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable metadata field called `_sourceHost`. Avoid using spaces so you do not have to quote them in keyword search expressions. This can be a maximum of 128 characters.
1. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable metadata field called `_sourceCategory`. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). Avoid using spaces so you do not have to quote them in keyword search expressions. This can be a maximum of 1,024 characters.
1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Advanced Options for Logs**.<br/> <img src={useBaseUrl('img/send-data/GCP-advanced-options.png')} alt="GCP advanced options" width="400"/>
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be     determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference for more information.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## Configure a Pub/Sub Topic for GCP

You'll need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created.

1. Create a Pub/Sub Topic in GCP. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
1. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
   * Use a **PushDelivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the **Collection** page in Sumo Logic and click **Show URL**. 

:::caution
Pub/subs are subject to Google Cloud [quotas and limits](https://cloud.google.com/pubsub/quotas#quotas). Evaluate the number of logs against these limitations. If they are higher then the limit/quota, Sumo Logic recommends you split your logs over several topics.
:::

## Exporting Logs from Google Cloud Logging to Pub/Sub
Once you configure the Pub/Sub, you can export data from Google Cloud Logging to Pub/Sub (created in previous step) using Log Router Sinks. 

Refer [this](https://cloud.google.com/logging/docs/export/configure_export_v2#before-you-begin)  for the permission required for creating Sinks.

Follow [these](https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink) steps to create log sink to start sending logs to Sumo Logic via Pub/Sub. Note that for **Sink destination** select Pub/Sub topic which you created in the previous step and for **Choose logs to include in sink** you can give the query to include the logs which are needed.

### Limitations

Google limits the volume of data sent from a Topic. Our testing resulted in the following data limits:

| Topics | Megabytes per second | Payload size |
|:--------|:----------------------|:--------------|
| One    | 18 MBps (1.5 TB/day) | 100 KB       |
| One    | 6 MBps (0.5 TB/day)  | 2.5 KB       |

:::note
These limits may vary based on your setup and are based on our previous tests.
:::

We recommend the following:

 * Shard messages across topics within the above data limits.
 * Ask GCP to increase the allowable capacity for the topic.
