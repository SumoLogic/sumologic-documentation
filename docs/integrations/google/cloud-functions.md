---
id: cloud-functions
title: Google Cloud Functions
sidebar_label: Google Cloud Functions
description: The Google Cloud Functions app enables you monitor your usage of Google Cloud Functions. The preconfigured dashboards provide insight into function executions, operations, latency, errors, and failures.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/functions.png')} alt="thumbnail icon" width="50"/>

The Google Cloud Functions app enables you to monitor your usage of Google Cloud Functions. The preconfigured dashboards provide insight into function executions, operations, latency, errors, and failures with help of audit logs and metrics.

## Log and metric types

The Sumo Logic app for Google Cloud Functions uses the following logs and metrics:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Cloud Functions.
* [Google Cloud Function Platform Logs](https://cloud.google.com/logging/docs/api/platform-logs#cloud_functions) - Debug information of function executions.
* [Google Cloud Function metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-cloudfunctions)


### Sample queries

```sql title="Created Resources Over Time"
_sourceCategory=*gcp* logName textPayload "\"type\":\"cloud_function\"" "\"textPayload\":\"Function execution took"
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/cloudfunctions.googleapis.com%2Fcloud-functions"
| json "message.data.resource.labels" as labels
| json field=labels "function_name", "project_id", "region" as function, project, region
| timeslice 1h
| count as executions by _timeslice
| compare with timeshift 1d 7 avg
```

### Sample metric query

```sql title="Number of Errors"
cloud.provider=gcp project_id=* region=* cloud.platform=gcp_cloudfunctions function_name=* metric=function/execution_count statistic=average !status=ok | sum
```

## Collecting logs for the Google Cloud Functions app

This section describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services and provides instructions for configuring log collection for the Google Cloud Functions app.

### Collection Process for GCP Services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs which are exported and published to a Google Pub/Sub topic through Google Cloud Loggings [Log Router](https://cloud.google.com/logging/docs/routing/overview). You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.

<img src={useBaseUrl('img/integrations/google/GCP_Collection_Overview.png')} alt="Google integrations" />

### Configuring collection for GCP uses the following process:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**.
1. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
1. Create an export of GCP logs from Google Log Router. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

See the following sections for configuration instructions.

:::note
Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from Logs router.
:::

### Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.
:::

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Select an existing Hosted Collector upon which to add the Source. If you do not already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
1. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" />
1. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
1. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
1. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
   * ![green check circle.png](/img/reuse/green-check-circle.png) If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
1. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" />
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub.

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

### Create export of Google Cloud Function logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
1. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
1. As part of **Create logs routing sink**, add the following information.
   1. Enter a **Sink Name**. For example, `gce-vm-instance`.
   1. Select **Cloud Pub/Sub** as the **Sink Service**.
   1. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
   1. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"cloud_function"`.
   1. Click **Create Sync**.
:::note
By default, GCP logs are stored within Cloud Logging, but you can configure Log Router to exclude them as detailed [here](https://cloud.google.com/logging/docs/exclusions#overview) without affecting the export to Sumo Logic as outlined above.
:::

## Collecting metrics for the Google Cloud Functions app

For metric collection in Sumo Logic use [GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/).

1. Setup the [Google Service Account](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#google-service-account).
1. [Setup a GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#set-up-a-gcp-metrics-source) in Sumo Logic. While setting up the source select **Functions** as the service from dropdown to get the Google cloud function metrics.

## Installing the Google Cloud Functions app

Now that you have set up collection for Google Cloud Functions, install the Sumo Logic app to access the pre-configured searches and dashboards.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Google Cloud Functions dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Performance Overview

The **Google Cloud Functions - Performance Overview** dashboard uses the cloud function metrics. This dashboard provides an overview of Google Cloud Function performance including - active functions, number of function executions, number of errors, function distribution by trigger type and number of errors, execution count by project/region, trigger type, and error status. This dashboard also lists the function by average time execution and memory consumption.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Functions/Google-Cloud-Functions-Performance-Overview.png')} style={{border: '1px solid gray'}} alt="Google Cloud Functions - Performance Overview" width="800"/>

### Audit Logs

The **Google Cloud Functions - Audit Logs** dashboard uses the Google Cloud Admin activity [audit logs of cloud function](https://cloud.google.com/functions/docs/monitoring/audit-logging). The panels here list the recent audit log events, unauthorized audit events, audit events over time, and error audit events with error codes and error messages.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Functions/Google-Cloud-Functions-Audit-Logs.png')} style={{border: '1px solid gray'}} alt="Google Cloud Functions - Audit Events" width="800"/>

### Performance Details

The **Google Cloud Functions - Performance Details** dashboard is based on cloud function metrics. See trends over time for instance count (active and idle), number of executions, execution time, User memory, and outgoing traffic along with execution distribution, with status and timeshift comparison of execution time and number of executions.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Functions/Google-Cloud-Functions-Performance-Details.png')} style={{border: '1px solid gray'}} alt="Google Cloud Functions - Performance Details" width="800"/>

### Platform Logs

The **Google Cloud Functions - Platform Logs** dashboard uses Google Cloud platform logs of cloud function, which writes logs to the stream that indicate the start and end of execution, as well as the stdout and stderr from those executions. Based on these logs, we have panels giving insights into - execution status, listing top functions with a number of executions, average latency, error status, and recent failures.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Google-Cloud-Functions/Google-Cloud-Functions-Platform-Logs.png')} style={{border: '1px solid gray'}} alt="Google Cloud Functions - Platform Logs" width="800"/>

## Upgrade/Downgrade the Google Cloud Functions app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Cloud Functions app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>