---
id: cloud-vpc
title: Google Cloud VPC
sidebar_label: Google Cloud VPC
description: The Sumo Logic App for Google Cloud VPC provides visibility into the activities, traffic, and VPC flow in GCP.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/vpc.png')} alt="thumbnail icon" width="75"/>

The Google Cloud Platform (GCP) [Virtual Private Cloud](https://cloud.google.com/vpc/docs/)(VPC) provides networking functionality to [Compute Engine](https://cloud.google.com/compute/docs/) virtual machine (VM) instances, [Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/) containers and [App Engine Flex](https://cloud.google.com/appengine/docs/flexible/). The Sumo Logic App for Google Cloud VPC provides visibility into the activities, traffic, and VPC flow in your GCP. The preconfigured dashboards provide you details on the VPC flows, source and destination IP addresses, ports, protocols, and messages.

## Log Types

The App uses:
* **Compute Engine VPC Flow Logs**. These logs provide information from Compute Engine ​VMs ​for ​network ​operations ​such ​as ​Network ​monitoring, ​forensics, ​real-time security ​analysis ​and ​expense ​optimization.


### Sample Log Message  

```json
{
  "message": {
    "data": {
      "insertId": "h7cue3dc1fr",
      "jsonPayload": {
        "bytes_sent": "1836",
        "connection": {
          "dest_ip": "34.192.224.100",
          "dest_port": 443,
          "protocol": 6,
          "src_ip": "10.128.0.3",
          "src_port": 56552
        },
        "dest_location": {
          "city": "Ashburn",
          "continent": "America",
          "country": "usa",
          "region": "Virginia"
        },
        "end_time": "2018-01-26T12:35:10.115UTC",
        "packets_sent": "20",
        "reporter": "SRC",
        "rtt_msec": "49",
        "src_instance": {
          "project_id": "bmlabs-loggen",
          "region": "us-central1",
          "vm_name": "vm-selectstar-collector-again",
          "zone": "us-central1-c"
        },
        "src_vpc": {
          "project_id": "bmlabs-loggen",
          "subnetwork_name": "default",
          "vpc_name": "default"
        },
        "start_time": "2018-01-26T12:35:10.115UTC"
      },
      "logName": "projects/bmlabs-loggen/logs/compute.googleapis.com%2Fvpc_flows",
      "receiveTimestamp": "2018-01-26T12:35:10.115UTC",
      "resource": {
        "labels": {
          "location": "us-central1-c",
          "project_id": "bmlabs-loggen",
          "subnetwork_id": "3656133720937113003",
          "subnetwork_name": "default"
        },
        "type": "gce_subnetwork"
      },
      "timestamp": "2018-01-26T12:35:10.115UTC"
    },
    "attributes": {
      "logging.googleapis.com/timestamp": "2018-01-26T12:35:10.115UTC"
    },
    "message_id": "172581793992900",
    "messageId": "172581793992900",
    "publish_time": "2018-01-26T12:35:10.115UTC",
    "publishTime": "2018-01-26T12:35:10.115UTC"
  },
  "subscription": "projects/bmlabs-loggen/subscriptions/push-to-sumo"
}
```

### Sample Query

```bash title="Average latency (ms) by subnet ID"
_collector="HTTP Source for GCP Pub/Sub" logName resource timestamp
| json "message.data.resource.type" as type
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where type = "gce_subnetwork" | where log_name matches "projects/*/logs/compute.googleapis.com%2Fvpc_flows"
| json "message.data.resource" as resource | json field=resource "labels.location","labels.project_id","labels.subnetwork_id","labels.subnetwork_name" as zone,project,subnetwork_id,subnetwork_name nodrop
| json "message.data.resource.labels", "message.data.jsonPayload" as labels, payload
| json field=payload "src_instance","dest_instance" as src_instance,dest_instance nodrop
| json field=payload "src_vpc.vpc_name","dest_vpc.vpc_name" as src_vpc,dest_vpc nodrop
| json field=payload "connection.src_ip","connection.dest_ip","connection.dest_port","connection.src_port" as src_ip,dest_ip,dest_port,src_port
| json field=src_instance "project_id", "zone", "region", "vm_name" as src_project, src_zone, src_region, src_vm nodrop
| json field=dest_instance "project_id", "zone", "region", "vm_name" as dest_project, dest_zone, dest_region, dest_vm nodrop
| json field=payload "bytes_sent","rtt_msec","packets_sent"  as bytes, rtt,packets  
| timeslice 1m
| avg(rtt) as latency by _timeslice, subnetwork_id, subnetwork_name
| transpose row _timeslice column subnetwork_id,subnetwork_name
```


## Collecting Logs for Google Cloud VPC

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from  Google Cloud VPC.

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

### Create export of Google Cloud VPC logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
2. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
  1. Enter a Sink Name. For example, "gce-vm-instance".
  2. Select "Cloud Pub/Sub" as the **Sink Service**.
  3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
  4. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"gce_subnetwork"`.
  5. Click **Create Sync**.



## Installing the Google Cloud VPC App

Now that you have set up collection for Google Cloud VPC, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**


1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Google Cloud VPC App Dashboards


### Overview

See an overview of the top 10 IPs, ports, and VMs; along with trends in traffic and VPC flows in your Google Cloud VPC.

<img src={useBaseUrl('img/integrations/google/GoogleCloudVPCOverview.png')} alt="Google Cloud VPC dashboards" />

**Inbound Source Address Locations**. Shows number of incoming source IP addresses in the last 24 hours and their location on a world map.

**Outbound Source Address Locations**. Shows number of outgoing source IP addresses in the last 24 hours and their location on a world map.

**Top 10 External IPs by Traffic (MiB).** Shows the top 10 external IP addresses and total bytes sent (in blue) or received (in green) last 24 hours on a horizontal bar graph.

**Top 10 External IPs by VPC Flows**. Shows the top 10 external IP addresses by VPC flows in the last 24 hours on a horizontal bar graph.

**Top 10 External Destination Ports by VPC Flows**. Shows the top 10 external destination ports by VPC flows in the last 24 hours on a horizontal bar graph.

**Top 10 Internal Destination Ports by VPC Flows**. Shows the top 10 internal destination ports by VPC flows in the last 24 hours on a horizontal bar graph.

**Top 10 Source VMs by Traffic (MiB). **Shows the top 10 source VMs by Traffic (MiB) in the last 24 hours on a horizontal bar graph.

**Top 10 Destination VMs by Traffic (MiB). **Shows the top 10 Destination VMs by Traffic (MiB) in the last 24 hours on a horizontal bar graph.

**Traffic (MiB) by Subnetwork. **Shows trends in traffic in the last 24 hours by Subnetwork on a line graph with two lines.

**Traffic (MiB) by Project. **Shows trends in traffic in the last 24 hours by Project on a line graph.

**Traffic (MiB) by VPC. **Shows trends in traffic in the last 24 hours by VPC on a line graph.

**Top 10 Source VMs per VPC by Traffic (MiB). **Shows the top 10 Source VMs per VPC by Traffic (MiB) in the last 24 hours on a column graph.

**Top 10 Destination VMs per VPC by Traffic (MiB). **Show the top 10 Destination VMs per VPC by Traffic (MiB) in the last 24 hours on a column graph.

**VPC Flows per Protocol by Hour**. See the VPC flows per protocol by hour in the last 24 hours on a column graph.


### VPC Activity

See the details of your Google Cloud VPC activity including the trends of traffic, packets, and average latency; along with totals of VPC flows.


<img src={useBaseUrl('img/integrations/google/cloud-vpc-activity.png')} alt="Google Cloud VPC dashboards" />

**Traffic (MiB) by Subnetwork ID. **Shows trends in traffic by Subnetwork ID in the last hour on a line graph.

**Traffic (MiB) by Source VM Over Time.** Shows trends in traffic by Source VM over time in the last hour on a column graph.

**Traffic (MiB) by Destination VM Over Time. **Shows trends in traffic by Destination VM over time in the last hour on a column graph.

**Packets by Subnetwork ID. **Shows trends in packets by Subnetwork ID in the last hour on a line graph.

**Packets by Source VM Over Time. **Shows packets by Source VM over time in last hour on a column graph.

**Packets by Destination VM Over Time. **Shows packets by Destination VM over time in last hour on a column graph.

**Average Latency (ms) by Subnetwork ID. **Shows the average latency by Subnetwork ID in the last hour on a line graph.

**Average Latency (ms) by Source VPC. **Shows the average latency by Source VPC in the last hour on a line graph.

**Average Latency (ms) by Destination VPC. **Shows the average latency by Destination VPC in the last hour on a line graph.

**VPC Flows by Source Address**. Shows the count of VPC flows by source IP address in the last hour on a pie chart.

**VPC Flows by Source Port**. Shows the count of VPC flows by source port in the last hour on a pie chart.

**VPC Flows by Destination Address**. Shows the count of VPC flows by destination IP address in the last hour on a pie chart.

**VPC Flows by Destination Port**. Shows the count of VPC flows by destination port in the last hour on a pie chart.


### Advanced metrics

See the details of your Google Cloud VPC traffic including the trend and outlier in messages, total bytes, packets and latency.

<img src={useBaseUrl('img/integrations/google/cloud-vpc-Traffic.png')} alt="Google Cloud VPC dashboards" />

**Messages per Minute - Outlier**. Shows outliers in messages per minute over the last hour on a line graph with threshold.

**Messages per Minute - Trend**. Shows trends in messages per minute over the last hour on a scatter plot graph along with the predicted progression.

**Messages per Minute - Project**. Shows the count in messages per minute over the last hour on a column graph.

**MBs per Minute - Outlier**. Shows outliers in the total bytes per minute sent over the last hour on a line graph with threshold.

**MBs per Minute - Trend**. Shows trends in total bytes per minute sent over the last hour on a scatter plot graph along with the predicted values.

**MBs Box Plot. **Shows a box plot of the MBs sent in the last hour with the maximum, upper quartile, median, lower quartile, and minimum values.

**Packets per Minute - Outlier**. Shows outliers in the total packets sent per minute over the last hour on a line graph showing threshold.

**Packets per Minute - Trend**. Shows trends in the total packets sent per minute over the last hour on a scatter plot graph along with the predicted progression.

**Packets Box Plot**. Shows a box plot of the packets sent in the last hour with the maximum, upper quartile, median, lower quartile, and minimum values.

**Average Latency (ms) per Minute - Outlier. **Shows the outliers in average latency per minute in the last hour on a line graph with threshold.

**Average Latency (ms) per Minute - Trend. **Shows the trend in average latency per minute in the last hour on a scatter plot graph.

**Latency (ms) Box Plot. **Shows a box plot of the latency in the last hour with the maximum, upper quartile, median, lower quartile, and minimum values.
