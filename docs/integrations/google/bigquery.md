---
id: bigquery
title: Google BigQuery
sidebar_label: Google BigQuery
description: The Google BigQuery App helps you monitor data and activity in your BigQuery data warehouse. The preconfigured dashboards provide insight into the projects, operations, queries, user management operations, user activities, and billed GBs in BigQuery.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/bigquery.png')} alt="thumbnail icon" width="50"/>

The Google BigQuery App helps you monitor data and activity in your BigQuery data warehouse. The preconfigured dashboards provide insight into the projects, operations, queries, user management operations, user activities, and billed GBs in BigQuery.

## Log Types  

The Google BigQuery App uses:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including BigQuery.

### Sample Query

```bash title="Created Resources Over Time"
_sourceCategory=*gcp* logName resource "type":"bigquery_resource"
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
| json "message.data.resource.labels", "message.data.resource.labels.project_id" as labels, project
| timeslice 1h
| count as operations by _timeslice, project
| transpose row _timeslice column project
```


## Collecting Logs for the Google BigQuery App

This section describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for configuring log collection for the Google BigQuery App.

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


### Create export of Google BigQuery logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
2. Click **Create Sink**. <br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
   1. Enter a Sink Name. For example, "gce-vm-instance".
   2. Select "Cloud Pub/Sub" as the **Sink Service**.
   3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
   4. In **Choose logs to include in sink** section for resource_type, replace "`<resource_variable>`" with "`bigquery_resource`".<br/><img src={useBaseUrl('img/integrations/google/resourcevar.png')} alt="Google integrations" />
   5. Click **Create Sync**.


## Installing the Google BigQuery App

Now that you have set up log collection, you can install the Google BigQuery App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/apps/app-install.md}

## Viewing Google BigQuery Dashboards

The Google BigQuery App comes with pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.


### Overview

See an overview of queries, projects, and operations in Google BigQuery.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Overview.png')} alt="Google BigQuery dashboards" />

**Query Request Locations. **Shows the number of query requests in the last 24 hours and their location on a map.

**Top Projects by Billed GB. **Shows the top projects based on total billed gigabytes in the last 24 hours on a column graph.

**Operations Over Time. **Shows operations over time in the last 24 hours on a column graph.

**Top 10 Queries by Latency(s). **Shows top 10 queries based on latency in the last 24 hours on a table.

**Top 10 Queries by Billed GB. **Shows top 10 queries based on billed gigabytes in the last 24 hours on a table.

**Top 10 Users by Billed GB. **Shows top 10 users based on billed gigabytes in the last 24 hours on a table.

**Operations Breakdown. **Shows a count of all operations in the last 24 hours on a pie graph.


### Management

See information about Google BigQuery operations, including an operations breakdown, dataset service and table service operations over time, operations and operations failures by project, location, and over time.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-mgmt.png')} alt="Google BigQuery dashboards" />

**Operations. **Shows a count of all operations in the last 24 hours on a pie graph.

**Dataset Service Operations Over Time. **Shows the number of dataset service operations and errors over time in the last 24 hours on a column graph.

**Operations by Project. **Shows trends in operations by project in the last 24 hours on a line graph.

**Table Service Operations Over Time. **Shows the number of table service operations and errors over time in the last 24 hours on a line graph.

**Operation Failures by Project. **Shows trends operation failures by project in the last 24 hours on a line graph.

**Operation Failure Percentage. **Shows the percentage of operations that fail in the last 24 hours.

**Recent Operation Failures. **Shows a table with recent operations that failed in the last 24 hours.

**Failed Operation Locations. **Shows the location of failed operations in the last 24 hours on a world map.

**Table Service Operation Error Outliers. **Shows the number of table service operation error outliers in the last 24 hours on a column graph.

**Dataset Service Operation Error Outliers. **Shows the number of dataset service operation error outliers in the last 24 hours on a column graph.

**Authorization Failures Over Time. **Shows the number of total authorization failures over time in the last 24 hours on a column graph.

**Recent Authorization Failures. **Shows a table with recent authorizations that failed in the last 24 hours.

**Location of Authorization Failures. **Shows the location of failed operations in the last 24 hours on a world map.


### Queries

See information about queries in Google BigQuery, including billed GBs, latency, and errors.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Queries.png')} alt="Google BigQuery dashboards" />


**Location of Query Requests. **Shows the number of query requests in the last 24 hours and their location on a map.

**Billed GB, Latency (s), Errors Over Time. **Shows trends in billed gigabytes and latency over time in the last 24 hours on a line graph. Also shows the number of errors over time in the last 24 hours on a column graph.

**Query Statistics by Project.** Shows a table with query statistics based on projects in the last 24 hours.

**Billed GB Over Time. **Shows trends in billed gigabytes over time in the last 24 hours on a line graph.

**Top 10 Queries by Billed GB. **Shows a table with top 10 queries based on billed gigabytes in the last 24 hours.

**Latency (s) Over Time. **Shows trends in latency over time in the last 24 hours on a line graph.

**Top 10 Queries by Latency (s). **Shows a table with top 10 queries based on latency in the last 24 hours.

**Errors Over Time. **Shows trends in errors over time in the last 24 hours on a line graph.

**Top 10 Queries by Errors. **Shows a table with top 10 queries based on errors in the last 24 hours.

**Recent Query Failures. **Shows a table with recent query failures in the last 24 hours.

**Location of Failed Executions. **Shows the number of failed executions in the last 24 hours and their location on a map.


### Users

See information about users  in Google BigQuery, including query operations, billed GBs, query latency, and query failures by user.


<img src={useBaseUrl('img/integrations/google/Google-Bigquery-Users.png')} alt="Google BigQuery dashboards" />


**Location of Users Executing Queries. **Shows the number of users executing queries in the last 24 hours and their location on a map.

**User Management Operations. **Shows the number of user management operations in the last 24 hours on a column graph.

**Top 10 Users by Query Executions. **Shows a table with top 10 users based on query executions in the last 24 hours.

**Top 10 Users by Billed GB. **Shows a table with top 10 users based on billed gigabytes in the last 24 hours.

**Top 10 Users by Latency (s). **Shows a table with top 10 users based on latency in the last 24 hours.

**Query Executions by User Over Time. **Shows trends in query executions based on users over time in the last 24 hours on a line graph.

**Billed GB by User Over Time. **Shows trends in billed gigabytes based users over time in the last 24 hours on a line graph.

**Latency (s) by Users Over Time. **Shows trends in latency based on users over time in the last 24 hours on a line graph.

**Top 10 Users by Errors. **Shows a table with top 10 users based on errors in the last 24 hours.

**Recent Query Failures by User. **Shows a table with recent query failures in the last 24 hours.

**Errors by User Over Time.  **Shows trends in errors based on users over time in the last 24 hours on a line graph.

**Location of Users with Errors. **Shows the number of users with errors in the last 24 hours and their location on a map.
