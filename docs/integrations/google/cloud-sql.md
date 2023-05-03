---
id: cloud-sql
title: Google Cloud SQL
sidebar_label: Google Cloud SQL
description: The Sumo Logic app for Google Cloud SQL helps you monitor your usage of Google Cloud SQL. The preconfigured dashboards provide insight into created and deleted resources, messages, authorization failures, user activities, and error logs.
---


import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/sql.png')} alt="thumbnail icon" width="50"/>

The Sumo Logic app for Google Cloud SQL helps you monitor your usage of Google Cloud SQL. The preconfigured dashboards provide insight into created and deleted resources, messages, authorization failures, user activities, and error logs.

## Log Types

The App uses:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Cloud SQL.
* Google Cloud SQL Error Logs - Logs errors on databases.

### Sample Query

```bash title="Created Resources Over Time"
_sourceCategory=*gcp* data "type":"cloudsql_database" methodName
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/*"
| json "message.data.resource.labels", "message.data.protoPayload.methodName" as labels, method
| json field=labels "database_id", "project_id", "region" as instance, project, region
| json "message.data.protoPayload.authorizationInfo[*]" as permissions
| parse regex field=permissions "\"permission\":\"(?<resource_type>[^\"]+)\.(?<method>[^\"]+?)\"" multi
| where method = "create"
| timeslice 1h
| count as creations by _timeslice, resource_type
| transpose row _timeslice column resource_type
```



## Collecting Logs for Google Cloud SQL

This section describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from Google Cloud SQL.


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

### Create export of Cloud SQL logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
2. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
  1. Enter a Sink Name. For example, "gce-vm-instance".
  2. Select "Cloud Pub/Sub" as the **Sink Service**.
  3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
  4. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"cloudsql_database"`.
  5. Click **Create Sync**.



## Installing the Google Cloud SQL App

Now that you have set up the collection for Google Cloud SQL, install the Sumo Logic App Google Cloud SQL to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/apps/app-install.md}

## Viewing Google Cloud SQL Dashboards

### Overview

See an overview of database activities—such as create, delete, update, and so on—in Google Cloud SQL, including activity locations, created and deleted resources, operations by resources, authorization failures, and messages over time by severity.

<img src={useBaseUrl('img/integrations/google/google-cloud-sql-overview.png')} alt="Google Cloud SQL dashboards" />


**Location of Activity**. A geolocation map that shows the locations from which database activities were initiated, and the activity count for each location over the last 24 hours.

**Created Resources**. A donut chart that shows a breakdown of resources created by resource type over the last 24 hours.

**Deleted Resources**. A donut chart that shows a breakdown of resources deleted by resource type over the last 24 hours.

**Messages by Region**. A table that shows the count of messages by region over the last 24 hours.

**Authorization Failures**. The count of authorizations failures over the last 24 hours.

**Top 10 Users by Messages**. A column chart shows the count of messages by an associated user, for the 10 users with the most associated messages, over the last 24 hours.

**Operations by Resources**. A stacked column chart that shows the count of database operations, for example, connect, create, delete, and so on, by resource type.

**Messages Over Time by Severity**. A line chart that shows the count of messages by message severity, per one hour timeslice over the last 24 hours.


### Activity

See information about actions, messages,  operations, created, and deleted resources in Google Cloud SQL.

<img src={useBaseUrl('img/integrations/google/google-cloud-sql-activity.png')} alt="Google Cloud SQL dashboards" />

**Actions**. A donut chart that shows the breakdown, by count and percentage, of invocations by action type over the last 24 hours.

**Actions Over Time**. A line chart that shows the count of executions per one hour timeslice for methods called over the last 24 hours.

**Messages by Instance**. A line chart that shows the count of messages per one hour timeslice by database instance over the last 24 hours.

**Operations by Instance**. A stacked bar chart that shows the count of operations—such as connect, create, delete, and so on—by database instance over the last 24 hours.

**Created Resources Over Time**. A column chart that shows the count of Cloud SQL resources created per one hour timeslice over the last 24 hours.

**Deleted Resources Over Time**. A column chart that shows the count of Cloud SQL resources created per one hour timeslice over the last 24 hours.


### Users

See information about your Google Cloud SQL users, including user locations; user activities over time and user activity outliers; top 10 users by messages; and resource creations and deletions by user.

<img src={useBaseUrl('img/integrations/google/google-cloud-sql-users.png')} alt="Google Cloud SQL dashboards" />


**Location of Users**. A geolocation map that shows the location and count of users over the last 24 hours.

**User Activities Over Time**. A stacked bar chart that shows the count of activities by user per one hour timeslice over the last 24 hours.

**User Activity - Outliers**. A stacked bar chart that shows when the count of activities per user varies by a statistically significant amount, three or more standard deviations, from the running average, over the last 24 hours.

**Top 10 Users by Messages**. A column chart that shows the top 10 users, in terms of messages, over the last 24 hours.

**Creations and Deletions by User**.  A stacked column chart that shows the number of resource creations and deletions by users, over the last 24 hours.

**Top 10 Activities by Users**. A bar chart that shows the top 10 activities run by users over the last 24 hours.

**Recent User Activity**. A table that shows user activity over the last three hours, including severity, user, instance, method, and the number of operations performed.


### Failures

See information about failures in Google Cloud SQL, including authorization failures, by location and over time; problematic instances, and error logs.

<img src={useBaseUrl('img/integrations/google/google-cloud-sql-failures.png')} alt="Google Cloud SQL dashboards" />


**Location of Authorization Failures**. A geolocation map that shows the locations and counts of authorization failures over the last 24 hours.

**Problematic Instances Over Time**. A line chart that shows, for problematic database instances (instances for which messages of severity Warning, Error, Critical, Alert, or Emergency have been logged) the count of problem messages were logged per hour timeslice over the last 24 hours.

**Authorization Failures Over Time**. A column chart that shows the count of authorization failures per hour timeslice over the last 24 hours.

**Authorization Failures by User - Outliers**.  A column chart that shows users that have had a statistically significant number of authorization failures, more than three standard deviations from the running average, over the last 24 hours.

**Common Error Log Messages**. A table that presents the results of a LogReduce analysis of error messages logged over the last 24 hours. Sumo’s LogReduce algorithm uses fuzzy logic and soft matching to group messages with similar structures and commonly repeated text strings into signatures.  Note that messages that Sumo cannot readily group are separated into a distinct signature called Others.

**Recent Authorization Failures**. A table of information about authorization failures that occurred within the last three hours, including the associated user, action, and instance.

**Recent Error Logs**. A table of information about messages of severity Warning, Error, Critical, Alert, or Emergency that were logged over the last three hours.

**Common Error Logs by Instance**. A bar chart that shows the results of a LogReduce analysis of messages of severity Warning, Error, Critical, Alert, or Emergency, by instance, that were logged over the last 24 hours.
