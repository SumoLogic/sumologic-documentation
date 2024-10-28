---
id: compute-engine
title: Google Compute Engine
sidebar_label: Google Compute Engine
description: The Sumo Logic App for Google Compute Engine helps you monitor your infrastructure by providing preconfigured dashboards that allow you to view the activities, users, message severity of your Google Compute Engine infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


<img src={useBaseUrl('img/integrations/google/ce.png')} alt="thumbnail icon" width="75"/>

Google Compute Engine is an Infrastructure as a Service (IaaS) component of Google Cloud Platform that delivers virtual machines running in Google's data centres and worldwide fibre network. The Sumo Logic app for Google Compute Engine helps you to monitor your infrastructure by providing preconfigured dashboards that allow you to view the activities, users, and message severity along with performance metrics monitoring CPU, network, disk, and quotas for your Google Compute Engine infrastructure.

## Log and metrics types

The Sumo Logic app for Google Cloud Compute Engine uses the following logs and metrics:

* [Google Cloud Audit Logs for Compute Engine](https://cloud.google.com/compute/docs/logging/audit-logging) - These logs provide information about Compute Engine API calls and operations.
* [Compute Engine Platform Logs](https://cloud.google.com/logging/docs/api/platform-logs#compute_engine)
* [Google Compute Engine Metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-compute)


### Sample queries

```bash title="Top 10 User"
_collector="HTTP Source for GCP Pub/Sub" logName resource timestamp
| json "message.data.resource.type" as type
| parse regex "\s+\"logName\":\"(?<log_name>\S+)\""
| where type = "gce_instance" and log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
| parse regex "\s+\"resourceName\":\"projects/\S+/zones/(?<zone>\S+)/instances/(?<instance>\S+)\""
| json "message.data.resource.labels" as labels
| json field=labels "project_id" as project
| json "message.data.protoPayload.authenticationInfo.principalEmail" as user
| count as requests by user
| sort by requests
| limit 10
```

### Sample metric query

```bash title="Avg CPU Utilization"
project_id=* region=* cloud.platform=gcp_cloudsql database_id=* metric=database/cpu/utilization  statistic=average | eval _value*100 | avg 
```

## Collecting logs for the Google Compute Engine

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from Google Compute Engine.

### Collection process for GCP services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs which are exported and published to a Google Pub/Sub topic through [Log Router](https://cloud.google.com/logging/docs/routing/overview). You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.

### Configuring collection for GCP uses the following process:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**, and then use Google Cloud Console to register the URL as a validated domain.  
1. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
1. Create an export of GCP logs from Google Log Router. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

See the following sections for configuration instructions.

:::note
Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from Logs router.
:::

### Configure a Google Cloud Platform source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.
:::

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Select an existing Hosted Collector upon which to add the Source. If you do not already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
1. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" width="400"/>
1. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceHost`. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
1. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
1. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
1. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" width="400"/>
    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
    * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#collecting-logs-for-the-google-app-engine-app).

1. Create a Pub/Sub Topic in GCP. Refer to the [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
1. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
   * Use a **Push Delivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the **Collection** page in Sumo Logic and click **Show URL**.

#### Limitations

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

### Create export of Google Compute Engine logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
1. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
1. As part of **Create logs routing sink**, add the following information.
  1. Enter the **Sink Name**. For example, `gce-vm-instance`.
  1. Select **Cloud Pub/Sub** as the **Sink Service**.
  1. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
  1. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"gce_instance"`.
  1. Click **Create Sync**.

:::note
By default, GCP logs are stored within Cloud Logging, but you can configure Log Router to exclude them as detailed [here](https://cloud.google.com/logging/docs/exclusions#overview) without affecting the export to Sumo Logic as outlined above.
:::

## Collecting metrics for the Google Compute Engine app

For metrics collection in Sumo Logic, use the [GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source).

1. Setup the [Google Service Account](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#google-service-account).
1. [Set up a GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#set-up-a-gcp-metrics-source) in Sumo Logic. While setting up the source, select **Compute Engine** as the service from the dropdown to get the Google Cloud Compute Engine metrics.

## Installing the Google Compute Engine app

Now that you have set up collection for Google Compute Engine, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Google Compute Engine dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Audit Logs

The **Google Cloud Compute Engine - Audit Logs** dashboard works with Compute Engine audit logs. These audit logs include admin activity operation and data access audit logs. [Here](https://cloud.google.com/sql/docs/audit-logging#audited_operations) is the list of operations tracked using the audit log for Compute Engine. The dashboard includes panels for event location, operation distribution, severity distribution, top users, recent error activities, start/stop events, and instance insert/deletion events. 

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Audit-Logs.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Audit Logs" width="800"/>

### CPU

The **Google Cloud Compute Engine - CPU** dashboard provides the CPU-related metric for compute instances like CPU utilization - with comparison to one-day and one-week time shifts, along with CPU usage time, and CPU scheduling wait time. 

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-CPU.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - CPU" width="800"/>

### Disk

The **Google Cloud Compute Engine - Disk** dashboard is used to monitor metrics related to different disks attached to respective compute instances. Filters for both disk and instance are available in this dashboard. This dashboard helps to monitor the read/write operation count, read/write byte count along with trends for it, average disk IO latency, and IO queue depth.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Disk.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Disk" width="800"/>

### Guest Performance

The **Google Cloud Compute Engine - Guest Performance** dashboard works on Guest metrics. For collecting guest metrics for GCE instance, you must enable the [Container-Optimized OS Health Monitoring](https://cloud.google.com/container-optimized-os/docs/how-to/monitoring) feature; for more information, see [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs). You can monitor - disk queue length, CPU usage time, memory bytes used, CPU load - 1m/5m/15m, Bytes for the file system, Memory bytes, operation count (read/write) along with CPU details like - runnable task count and visible vCPU. 

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Guest-Performance.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Guest Performance" width="800"/>

### Network

The **Google Cloud Compute Engine - Network** dashboard helps you monitor the network-related metrics like send bytes, received bytes, sent packets, and received packets with respective trends. Along with this, you can also monitor firewall bytes dropped trend and packets dropped by the firewall.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Network.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Network" width="800"/>

### Performance Overview

The **Google Cloud Compute Engine - Performance Overview** dashboard provides information about the general performance of running compute instances in your Google Cloud. This dashboard provides insights into the average CPU utilization, number of active instances, sent/received bytes, sent/received packets, CPU utilization by instance, bytes dropped by firewall by instance, CPU details, and disk read/write operation.  

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Performance-Overview.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Performance Overview" width="800"/>

### Platform Logs

The **Google Cloud Compute Engine - Platform Logs** dashboard is based on Compute Engine Platform logs. With this dashboard, you can track the recent error messages and recent warning messages, along with top error/warning messages. You can also monitor platform log severity distribution along with severity trends.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Platform-Logs.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Platform Logs" width="800"/>

### Quota Overview

The **Google Cloud Compute Engine - Quota Overview** dashboard is based on significant quota-related metrics for the Compute engine. This dashboard provides insights into VPC-related quotas like instance usage, IP aliases, subnet range, and static route per VPC as well as aggregated. You can also monitor other quotas like regional concurrent operation, global concurrent operation, and inter-region egress bandwidth.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Compute-Engine/Google-Cloud-Compute-Engine-Quota-Overview.png')} style={{border: '1px solid gray'}} alt="Google Cloud Compute Engine - Quota Overview" width="800"/>

## Upgrade/Downgrade the Google Compute Engine app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Compute Engine app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>