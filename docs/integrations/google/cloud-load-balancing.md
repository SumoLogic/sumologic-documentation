---
id: cloud-load-balancing
title: Google Cloud Load Balancing
sidebar_label: Google Cloud Load Balancing
description: The Sumo Logic App for Google Cloud Load Balancing helps you monitor load balancing activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/clb.png')} alt="thumbnail icon" width="50"/>

Google Cloud Load Balancing is Google’s load balancing service for Google Cloud Platform. The Sumo Logic App for Google Cloud Load Balancing helps you monitor load balancing activity.  The preconfigured dashboards provide insight into request locations and volume, response codes, and request and response data by load balancer.

## Log Types

The app uses the following log type:
* [Cloud Load Balancing Request Logs](https://cloud.google.com/compute/docs/load-balancing/http/#logging)

### Sample Log Message

```json
{"remoteIp":"98.243.249.133","requestUrl":"http:\/\/35.201.123.100\/","requestMethod":"POST","serverIp":"10.128.0.9","responseSize":"415","userAgent":"Mozilla\/5.0 (Windows NT 6.3; WOW64; Trident\/7.0; rv:11.0) like Gecko","requestSize":"1347","status":501}
```

### Sample Query

```bash title="Status codes per load balancer"
_sourceCategory=*gcp* data logName resource "\"type\":\"http_load_balancer\""
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/requests"
| json "message.data.resource.labels", "message.data.httpRequest.status" as labels, status
| json field=labels "project_id", "zone", "url_map_name" as project, zone, load_balancer
| if(status matches "20*", 1, 0) as resp_200
| if(status matches "30*", 1, 0) as resp_300
| if(status matches "40*", 1, 0) as resp_400
| if(status matches "50*", 1, 0) as resp_500
| if(!(status matches "20*" or status matches "30*" or status matches "40*" or status matches "50*"), 1, 0) as resp_others
| sum(resp_200) as tot_200, sum(resp_300) as tot_300, sum(resp_400) as tot_400, sum(resp_500) as tot_500, sum(resp_others) as tot_others by load_balancer, project
```

## Collect Logs for Google Cloud Load Balancing

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from Google Cloud Load Balancing.

### Collection Process for GCP Services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs which are exported and published to a Google Pub/Sub topic through Stackdriver. You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.

<img src={useBaseUrl('img/integrations/google/GCP_Collection_Overview.png')} alt="Google integrations" />

### Configuring collection for GCP uses the following process:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**.
2. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
3. Create an export of GCP logs from Google Stackdriver Logging. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

See the following sections for configuration instructions.

:::note
Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination including Stackdriver. It is not required to push the GCP logs into Stackdriver for the Sumo Logic Apps to work. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from Stackdriver logging and still can be [exported](https://cloud.google.com/logging/docs/export/) to Sumo logic.
:::

### Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.
:::

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
2. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" />
5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
  * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
  * ![green check circle.png](/img/reuse/green-check-circle.png) If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" />
  * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
  * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
  * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule.md).
10. When you are finished configuring the Source, click **Save**.


### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#01Collect-Logs-for-the-Google-App-Engine-App).

1. Create a Pub/Sub Topic in GCP. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
2. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
   * Use a **Push Delivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the** Collection** page in Sumo Logic and click **Show URL**.


### Limitations

Google limits the volume of data sent from a Topic. Our testing resulted in the following data limits:

| Topics | Megabytes per second | Payload size |
|:--------|:----------------------|:--------------|
| One    | 18 MBps (1.5 TB/day) | 100 KB       |
| One    | 6 MBps (0.5 TB/day)  | 2.5 KB       |

:::note
These limits may vary based on your setup and are based on our previous tests.
:::

We recommend the following:
* Shard messages across topics within the above data limits.
* Ask GCP to increase the allowable capacity for the topic.

### Create export of Google Cloud Load Balancing logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
2. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
  1. Enter a Sink Name. For example, "gce-vm-instance".
  2. Select "Cloud Pub/Sub" as the **Sink Service**.
  3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
  4. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"http_load_balancer"`.
  5. Click **Create Sync**.

## Install the Google Cloud Load Balancing App

Now that you have set up collection for Google Cloud Load Balancing, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/apps/app-install.md}

## Viewing Google Cloud Load Balancing Dashboards

This section describes the dashboards in the Sumo Logic App for Google Cloud Load Balancing.


### Overview


See an overview of Google Cloud Load Balancing activity, including request locations, browsers and operating systems used, error status codes, requests by load balancer, bytes sent and received, and message severity over time.

<img src={useBaseUrl('img/integrations/google/google-cloud-load-balancing-overview.png')} alt="Google Load Balancing dashboards" />

**Request Location**. A world map showing the locations of requests over the last 24 hours.

**Browsers and Operating Systems**. A stacked column chart that shows the breakdown of requests by operating system (MacOS, Windows, and Other), and for each operating system, the breakdown of requests by browser type (Firefox, Mozilla, Chrome, Internet Explorer, and Other) over the last 24 hours.

**4xx and 5xx Status Codes**. A horizontal bar chart that shows the count of 4xx response codes and the count of 5xx response codes for each load balancer over the last 24 hours.

**Requests by Load Balancer**. A horizontal bar chart that shows the count of requests for each load balancer over the last 24 hours.

**Bytes Sent and Received**. A horizontal bar chart that shows the total byes sent and the total bytes received for each load balancer over the last 24 hours.

**Severity Over Time**. A line chart that shows the count of messages of each level (info, warning, error, critical, alert, and emergency) over the last 24 hours.


### Request Analysis
20


See information about request activity in Google Cloud Load Balancing, including request locations, requests by type over time, requests by load balancer over time, KBs sent and received by number of requests, and total requests by load balancer.


<img src={useBaseUrl('img/integrations/google/google-cloud-load-balancing-request-analysis.png')} alt="Google Load Balancing dashboards" />


**Request Location**. A world map showing the locations of requests over the last 24 hours.

**Requests by Type Over Time**. A line chart showing the count of requests by type (get, post, put, delete, patch, and other) over the last 24 hours.

**KBs Sent, received by Number of Requests.** A combination chart showing a bar chart of request counts, and a line chart showing data received and data sent over the last 24 hours.

**Requests by Load Balancer Over Time. **A line chart showing the count of requests by load balancer over the last 24 hours.

**Number of Requests - Outlier**. Shows instances where the count of requests was significantly significant, more than three standard deviations from the running average over the last 24 hours.

**Total Requests by Load Balancer. **A bar chart that shows the total count of requests by load balancer over the last 24 hours.


### Status Analysis
22


See information about the status of requests in Google Cloud Load Balancing, including status codes per project, over time, and by load balancer; location of 4xx and 5xx responses; and 4xx and 5xx responses by load balancer.

<img src={useBaseUrl('img/integrations/google/google-cloud-load-balancing-status-analysis.png')} alt="Google Load Balancing dashboards" />

**Status Codes per Project**. A stacked column chart that shows a breakdown of the count of status codes by type ( 2xx, 3xx, 4xx, 5xx, others) for each project over the last 24 hours.

**Status Codes Over Time**. A stacked column chart that shows a breakdown of count of status codes by type ( 2xx, 3xx, 4xx, 5xx, others) over the last 24 hours.

**Status Codes per Load Balancer**. A horizontal bar chart that shows the breakdown of the count of status codes by type (2xx, 3xx, 4xx, 5xx, others) for each load balancer  over the last 24 hours.

**Status Details Breakdown**. A donut chart that shows the count of specific load balancer status messages over the last 24 hours.

**5xx  Status Code Locations.** A world map that shows the locations of 5xx status codes over the last 24 hours.

**5xx Status Code Per Load Balancer. **A stacked column chart that shows the count of 5xx status codes by load balancer over the last 24 hours.

**4xx Status Codes Locations**. A world map that shows the locations of 4xx status codes over the last 24 hours.

**4xx Status Code Per Load Balancer.  A stacked column chart that shows the count of 4xx status codes by load balancer over the last 24 hours.
