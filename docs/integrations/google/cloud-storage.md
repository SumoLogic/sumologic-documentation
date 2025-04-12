---
id: cloud-storage
title: Google Cloud Storage
sidebar_label: Google Cloud Storage
description: The Sumo Logic app for Google Cloud Storage helps you monitor both logs and metrics in Google Cloud Storage. The preconfigured dashboards provide insight into bucket storage, request operations, data transfer, authentication patterns, performance metrics, and optimization opportunities for your Cloud Storage resources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/storage.png')} alt="thumbnail icon" width="75"/>

The Sumo Logic app for Google Cloud Storage helps you monitor both logs and metrics in Google Cloud Storage. The preconfigured dashboards provide insight into bucket storage, request operations, data transfer, authentication patterns, performance metrics, and optimization opportunities for your Cloud Storage resources.

## Log and metric types

The App uses:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Cloud Storage.
* [Google Cloud Metrics for Cloud Storage](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-storage) - Provides performance and usage metrics for Google Cloud Storage.

### Sample log message
```json
{
  "message": {
    "data": {
      "logName": "projects/my-project/logs/cloudaudit.googleapis.com%2Factivity",
      "protoPayload": {
        "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
        "authenticationInfo": {
          "principalEmail": "user@example.com"
        },
        "methodName": "storage.objects.create",
        "resourceName": "projects/_/buckets/my-bucket/objects/my-file.txt",
        "serviceName": "storage.googleapis.com"
      },
      "resource": {
        "labels": {
          "bucket_name": "my-bucket",
          "project_id": "my-project"
        },
        "type": "gcs_bucket"
      }
    }
  }
}
```

### Sample metric message
```json
{
  "_source":"google-cloud-storage-metrics",
  "cloud.platform":"gcp_storage",
  "_metricId":"4F7HG9wrLEJvzydQF-DlQQ",
  "location":"us-central1",
  "raw_metric":"storage.googleapis.com/storage/object_count",
  "Statistic":"Average",
  "project_id":"my-project", 
  "metric":"storage/object_count",
  "bucket_name":"example-bucket",
  "cloud.provider":"gcp",
  "max":15420,
  "min":15400,
  "avg":15410.5,
  "sum":30821,
  "latest":15420,
  "count":2
}
```

### Sample log queries

```
_sourceCategory=*gcp* data logName resource "\"type\":\"gcs_bucket\""
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/cloudaudit.googleapis.com%2*"
| json "message.data.resource.labels", "message.data.protoPayload.methodName" as labels, method
| where method matches "*create" or method matches "*delete"
| json field=labels "project_id", "bucket_name", "location" as project, bucket_name, location
| timeslice 1h
| count as operations by _timeslice, method
| transpose row _timeslice column method
| fillmissing timeslice(1h)
```

### Sample metric queries

```
cloud.provider=gcp project_id=* metric=storage/object_count statistic=average 
| quantize using sum
| sum by project_id, bucket_name
```

## Collect logs for Google Cloud Storage

This section describes the Sumo Logic pipeline for ingesting logs from Google Cloud Platform (GCP) services, and explains how to collect logs from Google Cloud Storage.

### Collection Process for GCP Services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo's Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs that are exported and published to a Google Pub/Sub topic via the Google Cloud Logging [Log Router](https://cloud.google.com/logging/docs/routing/overview). You will then set up a Sumo Logic Google Cloud Platform source to subscribe to this topic and receive the exported log data.

<img src={useBaseUrl('img/integrations/google/GCP_Collection_Overview.png')} alt="Google integrations" />

### Configuring collection for GCP

Follow the steps below to configure the collection for GCP:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**.
2. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
3. Create an export of GCP logs from Google Log Router. Exporting involves writing a filter that selects the log entries you want to export and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

Refer to the following sections for configuration instructions.

:::note
Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from the Logs router.
:::

### Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values for each GCP service. If you create a GCP Source for each service you can define a specific Source Category for each service.
:::

This Source will be a Google Pub/Sub-only Source, indicating that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 

2. Select an existing Hosted Collector upon which to add the Source. If you do not already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

3. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" />

5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.

6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.

7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
  * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
  * ![green check circle.png](/img/reuse/green-check-circle.png) If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.

8. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" />

  * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
  * **Time Zone**. There are two options for the Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
  * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.

9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).

10. When you are finished configuring the Source, click **Save**.

### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#collecting-logs-for-the-google-app-engine-app).

1. Create a Pub/Sub Topic in GCP. Refer to the [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.

2. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
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

### Create export of Google Cloud Storage logs from Google Logging

In this step, you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />

2. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />

3. As part of **Create logs routing sink**, add the following information.
  1. Enter a Sink Name. For example, "gce-vm-instance".
  2. Select "Cloud Pub/Sub" as the **Sink Service**.
  3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
  4. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"gcs_bucket"`.
  5. Click **Create Sync**.

:::note
By default, GCP logs are stored within Cloud Logging, but you can configure Log Router to exclude them as detailed [here](https://cloud.google.com/logging/docs/exclusions#overview) without affecting the export to Sumo Logic as outlined above.
:::

## Collecting metrics for the Google Cloud Storage app

For metrics collection in Sumo Logic, use the [GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/).

1. Set up the [Google Service Account](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#google-service-account).

2. Set up a [GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#set-up-a-gcp-metrics-source) in Sumo Logic. While setting up the source, select **Cloud Storage** as the service from the dropdown to get the Google Cloud Storage metrics.

## Installing the Google Cloud Storage App
Now that you have set up the collection for Google Cloud Storage, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Google Cloud Storage dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Google Cloud Storage - Overview

See an overview of activity in Google Cloud Storage, including a breakdown of bucket and object operations, operations by project, and the top 10 locations, projects, buckets, and users by operation.

<img src={useBaseUrl('img/integrations/google/google-cloud-storage-overview.png')} alt="Google Cloud Storage dashboards" />


### Google Cloud Storage - Users

See information about your Google Cloud Storage users, including user locations, user operations, creations and deletions by user, and errors.

<img src={useBaseUrl('img/integrations/google/google-cloud-storage-users.png')} alt="Google Cloud Storage dashboards" />



### Google Cloud Storage - Buckets

See information about buckets in Google Cloud Storage, including operations by bucket, bucket statistics, and creations and deletions.

<img src={useBaseUrl('img/integrations/google/google-cloud-storage-buckets.png')} alt="Google Cloud Storage dashboards" />



### Google Cloud Storage - Operations and Error Analysis

See information about key Google Cloud Storage usage metrics, operational activity, and performance indicators, including storage size, egress, API requests, latency, and errors, with breakdowns by various dimensions like storage class, location, object type, and operation method.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-Storage-Operations-and-Error-Analysis.png')} alt="Google Cloud Storage dashboards" />

### Google Cloud Storage - Storage Optimization and Authorization

See information about key Google Cloud Storage bucket optimization opportunities, including the storage class distribution, object lifecycle management, and authorization patterns to identify potential cost savings and security improvements.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-Storage-Storage-Optimization-and-Authorization.png')} alt="Google Cloud Storage dashboards" />

### Google Cloud Storage - Usage and Activity Overview

See information about high-level summary of storage consumption, data transfer volumes, and overall API activity for quick health checks and usage monitoring.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-Storage-Usage-and-Activity-Overview.png')} alt="Google Cloud Storage dashboards" />

## Create monitors for Google Cloud Storage app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Google Cloud Storage alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Google Cloud Storage - Bucket Deleted` | This alert is triggered when a GCS bucket deletion event is detected (Threshold: > 0 events over 5 minutes), indicating a potentially critical data loss scenario requiring immediate investigation. | Count > 0 | Count < = 0 |
| `Google Cloud Storage - Bucket Lifecycle Configuration Changed` | This alert is triggered when a bucket's Object Lifecycle Management configuration is created or modified (Threshold: > 0 events over 1 hour), which could impact data retention or storage costs. | Count > 0 | Count < = 0 |
| `Google Cloud Storage - Bucket Retention Policy Locked` | This alert is triggered when a bucket's retention policy is locked (Threshold: > 0 events over 15 minutes), an irreversible action critical for compliance. | Count > 0 | Count < = 0 |
| `Google Cloud Storage - High Class A Operation Rate` | This alert is triggered when the count of Class A operations (e.g. create, delete, or modify etc.) for any bucket exceeds the defined threshold (Default: 10,000 operations over 1 hour), potentially indicating high API costs. | Count > 10000 | Count < = 10000 |
| `Google Cloud Storage - High Client Error Count` | This alert is triggered when the number of client-side errors (e.g., Not Found, Forbidden) for any bucket exceeds the defined threshold (Default: 20 errors over 5 minutes), indicating potential application or permission issues. | Count > 5 | Count < = 5 |
| `Google Cloud Storage - High Egress Volume` | This alert is triggered when the total data downloaded (egress) from any bucket exceeds the defined threshold (Default: 10 GB over 15 minutes), potentially indicating high costs or unusual activity. | Count > 10737418240 | Count < = 10737418240 |
| `Google Cloud Storage - High Object ACL Mutation Count` | This alert is triggered when modifications to specific Object ACLs occur frequently and exceed the defined threshold (Default: 5 mutations over 15 minutes), which might indicate non-standard permission management. | Count > 5 | Count < = 5 |
| `Google Cloud Storage - High Server Error Count` | This alert is triggered when the number of server-side errors (e.g., Internal Server Error) occurs and exceeds the defined threshold (Default: 5 errors over 5 minutes), potentially indicating GCS platform issues or throttling. | Count > 5 | Count < = 5 |

## Upgrade/Downgrade the Google Cloud Storage app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google Cloud Storage app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
