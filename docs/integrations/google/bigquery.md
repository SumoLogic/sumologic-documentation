---
id: bigquery
title: Google BigQuery
sidebar_label: Google BigQuery
description: The Google BigQuery App helps you monitor data and activity in your BigQuery data warehouse. The preconfigured dashboards provide insight into the projects, operations, queries, user management operations, user activities, and billed GBs in BigQuery.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/google/bigquery.png')} alt="thumbnail icon" width="50"/>

The Google BigQuery App helps you monitor the data and activities in your BigQuery data warehouse. With audit logs and analytics, the preconfigured dashboards offer insight into BigQuery's projects, operations, queries, job performance, user management operations, user activities, storage, slots, and billed gigabytes.

## Log and metric types

The Google BigQuery App uses:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including BigQuery.
* [Google Cloud Metrics for Bigquery] (https://cloud.google.com/monitoring/api/metrics_gcp#gcp-bigquery)

### Sample log messages
```json
{"message":{"data":{"insertId":"561F93BB34A71.A304412.BB00EA40","logName":"projects/bmlabs-loggen/logs/cloudaudit.googleapis.com%2Factivity","protoPayload":{"@type":"type.googleapis.com/google.cloud.audit.AuditLog","authenticationInfo":{"principalEmail":"player3"},"authorizationInfo":[{"granted":true,"permission":"bigquery.datasets.create","resource":"projects/bmlabs-loggen"}],"methodName":"datasetservice.insert","requestMetadata":{"callerIp":"2601:246:4b02:580d:c5c4:83c5:4337:c5e5","callerSuppliedUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36,gzip(gfe)"},"resourceName":"projects/bmlabs-loggen/datasets","serviceData":{"@type":"type.googleapis.com/google.cloud.bigquery.logging.v1.AuditData","datasetInsertRequest":{"resource":{"acl":{},"createTime":"2025-03-10T11:44:29.803IST","datasetName":{"datasetId":"empty","projectId":"bmlabs-loggen"},"info":{},"updateTime":"2025-03-10T11:44:29.803IST"}},"datasetInsertResponse":{"resource":{"acl":{"entries":[{"role":"WRITER","specialGroup":"PROJECT_WRITERS","viewName":{}},{"role":"OWNER","specialGroup":"PROJECT_OWNERS","viewName":{}},{"role":"OWNER","specialGroup":"PROJECT_OWNERS","userEmail":"player3","viewName":{}},{"role":"READER","specialGroup":"PROJECT_READERS","viewName":{}}]},"createTime":"2025-03-10T11:44:29.803IST","datasetName":{"datasetId":"empty","projectId":"bmlabs-loggen"},"info":{},"updateTime":"2025-03-10T11:44:29.803IST"}}},"serviceName":"bigquery.googleapis.com","status":{}},"receiveTimestamp":"2025-03-10T11:44:29.803IST","resource":{"labels":{"project_id":"bmlabs-loggen"},"type":"bigquery_resource"},"severity":"NOTICE","timestamp":"2025-03-10T11:44:29.803IST"},"attributes":{"logging.googleapis.com/timestamp":"2025-03-10T11:44:29.803IST"},"message_id":"19361990627331","messageId":"19361990627331","publish_time":"2025-03-10T11:44:29.803IST","publishTime":"2025-03-10T11:44:29.803IST"},"subscription":"projects/bmlabs-loggen/subscriptions/push-to-sumo"}
```

### Sample metric messages
```json
{"queryId":"A","_source":"google-bigquery-metrics","cloud.platform":"gcp_bigquery","priority":"interactive","_metricId":"3F6GF8wrLEJvzydQF-DlQQ","location":"us-central1","raw_metric":"bigquery.googleapis.com/query/count","_sourceName":"Http Input","_sourceCategory":"Labs/google-bigquery-metrics","_contentType":"Carbon2","Statistic":"Average","project_id":"prodproject","metric":"query/count","_collectorId":"0000000011113650","_sourceId":"0000000064F1F058","cloud.provider":"gcp","_collector":"Labs - google-bigquery-metrics","max":1,"min":0,"avg":0.0283,"sum":1.5,"latest":0,"count":53}
```

### Sample logs queries

```bash title="Created Resources Over Time"
_sourceCategory=*gcp* logName resource "type":"bigquery_resource"
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
| json "message.data.resource.labels", "message.data.resource.labels.project_id" as labels, project
| timeslice 1h
| count as operations by _timeslice, project
| transpose row _timeslice column project
```

### Sample metric queries
```bash title="In Flight Queries Trend"
cloud.provider=gcp project_id=* location=* metric=query/count statistic=average 
| quantize using sum
| sum by project_id , location
```

## Collect logs for Google BigQuery

This section describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for configuring log collection for the Google BigQuery App.

### Collection Process for GCP Services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs that are exported and published to a Google Pub/Sub topic via the Google Cloud Logging [Log Router](https://cloud.google.com/logging/docs/routing/overview). You will then set up a Sumo Logic Google Cloud Platform source to subscribe to this topic and receive the exported log data.

<img src={useBaseUrl('img/integrations/google/GCP_Collection_Overview.png')} alt="Google integrations" />

### Configuring collection for GCP

Follow the steps below to configure the collection for GCP:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**.
2. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
3. Create an export of GCP logs from Google Log Router Logging. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

Refer to the following sections for configuration instructions.

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
2. Select an existing Hosted Collector upon which to add the Source. If you do not already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" width="400" />
5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
   * ![green check circle.png](/img/reuse/green-check-circle.png) If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" width="400" />
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
10. When you are finished configuring the Source, click **Save**.

### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#collecting-logs-for-the-google-app-engine-app).

1. Create a Pub/Sub Topic in GCP. Refer to the [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
2. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
    * Use a **Push Delivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the **Collection** page in Sumo Logic and click **Show URL**.

##### Limitations

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

### Create export of Google BigQuery logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" width="400" />
2. Click **Create Sink**. <br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
   1. Enter a Sink Name. For example, "gce-vm-instance".
   2. Select "Cloud Pub/Sub" as the **Sink Service**.
   3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
   4. In **Choose logs to include in sink** section for resource_type, replace "`<resource_variable>`" with "`bigquery_resource`".<br/><img src={useBaseUrl('img/integrations/google/resourcevar.png')} alt="Google integrations" width="400" />
   5. Click **Create Sync**.

:::note
By default, GCP logs are stored within Cloud Logging, but you can configure Log Router to exclude them as detailed [here](https://cloud.google.com/logging/docs/exclusions#overview) without affecting the export to Sumo Logic as outlined above.
:::

## Collecting metrics for the Google Cloud Load Balancer app
For metrics collection in Sumo Logic, use the [GCP Metric source](https://help.sumologic.com/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/).

1. Set up the [Google Service Account](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#google-service-account).
1. Set up a [GCP Metric source](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/#set-up-a-gcp-metrics-source) in Sumo Logic. While setting up the source, select **Big Query** as the service from dropdown to get the Google Cloud function metrics.

### Installing the Google BigQuery app

Now that you have set up log collection, you can install the Google BigQuery App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>


## Viewing Google BigQuery dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

See an overview of queries, projects, and operations in Google BigQuery. Monitor query request location, project by billing, and latency. 

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Overview.png')} alt="Google BigQuery dashboards" />


### Management

See information about Google BigQuery operations, including an operations breakdown, dataset service and table service operations over time, operations and operations failures by project, location, and over time.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Management.png')} alt="Google BigQuery dashboards" />

### Queries

See information about queries in Google BigQuery, including billed GBs, latency, errors, and query failures.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Queries.png')} alt="Google BigQuery dashboards" />


### Users

See information about users  in Google BigQuery, including query operations, billed GBs, query latency, and query failures by user.


<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Users.png')} alt="Google BigQuery dashboards" />


### Query and job performance

 See information about query execution times, job throughput, and scanned bytes to monitor performance trends and optimize query efficiency.


<img src={useBaseUrl('img/integrations/google/Google-BigQuery-Query-and-Job-Performance.png')} alt="Google BigQuery dashboards" />


### Slots and reservation

 See information about slot allocation, reservation usage, and capacity commitments to manage and optimize BigQuery resource utilization.

<img src={useBaseUrl('img/integrations/google/Google-BigQuery-Slots-and-Reservation.png')} alt="Google BigQuery dashboards" />

### Storage and ingestion

  See information about data storage, table counts, and ingestion metrics to track data volume, monitor upload performance, and control costs.

<img src={useBaseUrl('img/integrations/google/Google-BigQuery-Storage-and-Ingestion.png')} alt="Google BigQuery dashboards" />

## Upgrade/Downgrade the Google BigQuery app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Google BigQuery app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Create monitors for Google BigQuery app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Google BigQuery alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `BigQuery - Authorization Failure Spike` | This alert is triggered when authorization failures significantly increase (Default 5), indicating potential issues with access control or malicious activity that require further investigation. | Count > 5 | Count < = 5 |
| `BigQuery - High In-Flight Jobs` | This alert is triggered when the number of in-flight jobs exceeds given value (Default 50), indicating a potentially unusual workload that may require attention. | Count > 50 | Count < = 50 |
| `BigQuery - High Query Billing` | This alert is triggered when the billed bytes scanned per query statement exceed a defined threshold (Default 5 GB), indicating potential cost overruns in query usage. | Count > 5000000000 | Count < = 5000000000 |
| `BigQuery - High Query Execution Times` | This alert is triggered when the average query execution time exceeds given value (Default 60 seconds), indicating potential performance issues. | Count > 60 | Count < = 60 |
| `BigQuery - High Query Failures` | This alert is triggered when there is a high number of query failures in BigQuery (Default 5). | Count > 5 | Count < = 5 |
| `BigQuery - High Slot Allocation` | This alert is triggered when the number of BigQuery slots allocated exceeds given value (Default 100), indicating potential resource pressure or misconfiguration. | Count > 100 | Count < = 100 |
| `BigQuery - High Streaming Upload Billing` | This alert is triggered when billed bytes for data uploads exceed a defined threshold (Default 10 GB), indicating potential cost overruns in data ingestion. | Count > 10000000000 | Count < = 10000000000 |
| `BigQuery - User Privilege Escalation` | This alert is triggered when new admin permissions are granted in BigQuery, indicating potential user privilege escalation. | Count > 0 | Count < = 0 |
