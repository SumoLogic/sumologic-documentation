---
id: compute-engine
title: Google Compute Engine
sidebar_label: Google Compute Engine
description: The Sumo Logic App for Google Compute Engine helps you monitor your infrastructure by providing preconfigured dashboards that allow you to view the activities, users, message severity of your Google Compute Engine infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


<img src={useBaseUrl('img/integrations/google/ce.png')} alt="thumbnail icon" width="75"/>

Google Compute Engine is the Infrastructure as a Service component of Google Cloud Platform that delivers virtual machines running in Google's data centers and worldwide fiber network. The Sumo Logic App for Google Compute Engine helps you monitor your infrastructure by providing preconfigured dashboards that allow you to view the activities, users, and message severity of your Google Compute Engine infrastructure.

## Log Types
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - These logs track events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Compute Engine, IAM, and App Engine.
* [Compute Engine Activity Logs](https://cloud.google.com/compute/docs/activity-logs) - These logs provide information about Compute Engine API calls, operations, and system events.


## Collecting Logs for Google Compute Engine

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from Google Compute Engine.


### Collection process for GCP services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs which are exported and published to a Google Pub/Sub topic through Stackdriver. You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.

Configuring collection for GCP uses the following process:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**, and then use Google Cloud Console to register the URL as a validated domain.  
2. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
3. Create an export of GCP logs from Google Stackdriver Logging. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

See the following sections for configuration instructions.

Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination including Stackdriver. It is not required to push the GCP logs into Stackdriver for the Sumo Logic Apps to work. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from Stackdriver logging and still can be [exported](https://cloud.google.com/logging/docs/export/) to Sumo logic.


### Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.



1. In Sumo Logic select** Manage Data > Collection > Collection**.
2. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. Click **Add Source** next to the Hosted** **Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional.

5

5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceCategory. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
* ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
    *
7
 If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**.

8

    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
    * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule.md).
10. When you are finished configuring the Source, click **Save**.


### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#01Collect-Logs-for-the-Google-App-Engine-App).



1. Create a Pub/Sub Topic in GCP. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
2. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
    * Use a **Push** **Delivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the** Collection** page in Sumo Logic** **and click **Show URL**.


##### Limitations

Google limits the volume of data sent from a Topic. Our testing resulted in the following data limits:


<table>
  <tr>
   <td>Topics
   </td>
   <td>Megabytes per second
   </td>
   <td>Payload size
   </td>
  </tr>
  <tr>
   <td>One
   </td>
   <td>18 MBps (1.5 TB/day)
   </td>
   <td>100 KB
   </td>
  </tr>
  <tr>
   <td>One
   </td>
   <td>6 MBps (0.5 TB/day)
   </td>
   <td>2.5 KB
   </td>
  </tr>
</table>



9
These limits may vary based on your setup and are based on our previous tests.

We recommend the following:



* Shard messages across topics within the above data limits.
* Ask GCP to increase the allowable capacity for the topic.


### Create export of Google Compute Engine logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.



1. Go to **Logging** and click **Logs Router**.


10


1. Click **Create Sink.  \
 \
**
11

2. Click the arrow to **Filter by label or text** and select **Convert to advanced filter**.


12


1. For resource_type, replace `<resource_variable>` with `gce_instance`.


13


1. Select a GCP service to filter the logs. The recommended GCP service to create sinks for is "GCE VM Instance", which sends the service’s logs to Sumo Logic. In the **Edit Export** window on the right:
    1. Set the **Sink Name**. For example, "gce-vm-instance".
    2. Select "Cloud Pub/Sub" as the **Sink Service**.
    3. Set **Sink Destination** to the newly created Pub/Sub topic. For example, "pub-sub-logs".
    4. Click **Create Sink**.
 \

14

2. By default, GCP logs are stored within Stackdriver, but you can configure Stackdriver to exclude them as detailed here without affecting the export to Sumo Logic as outlined above. To understand how to exclude Stackdriver logs, please follow the instructions in [this GCP document](https://cloud.google.com/logging/docs/exclusions#overview).


### Sample Log Message
15



```
{
 "message":{
   "data":{
     "insertId":"55E9891F381C2.A6AC1EA.F3043722",
     "logName":"projects/wk-dev/logs/cloudaudit.googleapis.com%2Factivity",
     "operation":{
       "first":true,
       "id":"operation-1511384259910-55e9891ee5970-33fdc63d-4bee6b10",
       "producer":"compute.googleapis.com"
     },
     "protoPayload":{
       "@type":"type.googleapis.com/google.cloud.audit.AuditLog",
       "authenticationInfo":{
         "principalEmail":"service-287993422434@dataflow-service-producer-prod.iam.gserviceaccount.com"
       },
       "authorizationInfo":[{
         "granted":true,
         "permission":"compute.instances.delete"
       }],
       "methodName":"v1.compute.instances.delete",
       "requestMetadata":{
         "callerSuppliedUserAgent":"Managed Infrastructure Mixer Client"
       },
       "resourceName":"projects/287993422434/zones/us-central1-f/instances/permissionlogs-yuanwang-1-11221246-d0b6-harness-p548",
       "response":{
         "@type":"compute.googleapis.com/operation",
         "id":"6917821783428586027",
         "insertTime":"2017-11-22T12:57:40.084-08:00",
         "name":"operation-1511384259910-55e9891ee5970-33fdc63d-4bee6b10",
         "operationType":"delete",
         "progress":"0",
         "selfLink":"https://www.googleapis.com/compute/v1/projects/wk-dev/zones/us-central1-f/operations/operation-1511384259910-55e9891ee5970-33fdc63d-4bee6b10",
         "status":"PENDING",
         "targetId":"7642006033207418043",
         "targetLink":"https://www.googleapis.com/compute/v1/projects/wk-dev/zones/us-central1-f/instances/permissionlogs-yuanwang-1-11221246-d0b6-harness-p548",
         "zone":"https://www.googleapis.com/compute/v1/projects/wk-dev/zones/us-central1-f"
       },
       "serviceName":"compute.googleapis.com"
     },
     "receiveTimestamp":"2017-11-22T20:57:41.0202444Z",
     "resource":{
       "labels":{
         "instance_id":"7642006033207418043",
         "project_id":"wk-dev",
         "zone":"us-central1-f"
       },
       "type":"gce_instance"
     },
     "severity":"NOTICE",
     "timestamp":"2017-11-22T20:57:39.896Z"
   },
   "attributes":{
     "logging.googleapis.com/timestamp":"2017-11-22T20:57:39.896Z"
   },
   "message_id":"174545382671298",
   "messageId":"174545382671298",
   "publish_time":"2017-11-22T20:57:42.118Z",
   "publishTime":"2017-11-22T20:57:42.118Z"
 },
 "subscription":"projects/wk-dev/subscriptions/sumo-test"
}
```



Query Sample



**Top 10 users**


```
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

## Installing the Google Compute Engine App

Now that you have set up collection for Google Compute Engine, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/app-install.md}

## Viewing Google Compute Engine Dashboards


### Overview

See the overview of your Google Compute Engine including the messages, instance activities, operations, and users.

<img src={useBaseUrl('img/integrations/google/google-compute-engine-overview.png')} alt="Google Compute Engine dashboards" />

**Messages by Project**. See the count of messages by project in the last 24 hours on a line chart.

**Recent Instance Activity**. See the details of recent instance activities in the last three days including the timestamp, user, method, and instance, displayed in a table.

**Operations**. See the count of different operations in the last 24 hours on a column chart.

**Operation Shares**. See the count and percentage of operations and methods in the last 24 hours on a pie chart.

**Top 10 Users.** See the top 10 users by requests in the last 24 hours on a column chart.


### Activity

See the details of projects, zones, instances, and message severity in your Google Compute Engine.

<img src={useBaseUrl('img/integrations/google/google-compute-engine-activity.png')} alt="Google Compute Engine dashboards" />

**Top 10 Projects by Messages**. See the count of top 10 projects by in the last hour on a bar chart.

**Top 10 Zones by Messages**. See the count of top 10 zones by messages in the last hour on a bar chart.

**Top 10 Instances by Messages**. See the count of top 10 instances by messages in the last hour on a bar chart.

**Instance Inserts vs Deletes**. See the count of instance inserts versus the count of instance deletes in the last hour on a line chart.

**Instance Starts vs Stops**. See the count of instance starts versus the count of instance stops in the last hour on a line chart.

**Severe Messages**. See the count of the severe messages in the last hour on a line chart.


### Severity

See the details of message severities - emergency, alert, critical, error, and warning.

**Severe Message Count Over Last Hour**. See the count of different severities in the last hour on a column chart.

**Severity Count**. See the count and percentage of different severities in the last 24 hours on a pie chart.

**Emergency Messages Over Time**. See the outlier of the messages with the severity of Emergency in the last hour on a line chart.

**Recent Emergency Messages**. See the details of the messages with the severity of Emergency in the last hour including the timestamp, user, method, instance, and message displayed in a table.

**Alert Messages Over Time**. See the outlier of the messages with the severity of Alert in the last hour on a line chart.

**Recent Alert Messages**. See the details of the messages with the severity of Alert in the last hour including the timestamp, user, method, instance, and message displayed in a table.

**Critical Messages Over Time**. See the outlier of the messages with the severity of Critical in the last hour on a line chart.

**Recent Critical Messages**. See the details of the messages with the severity of Critical in the last hour including the timestamp, user, method, instance, and message displayed in a table.

**Error Messages Over Time**. See the outlier of the messages with the severity of Error in the last hour on a line chart.

**Recent Error Messages**. See the details of the messages with the severity of Error in the last hour including the timestamp, user, method, instance, and message displayed in a table.

**Warning Messages Over Time**. See the outlier of the messages with the severity of Warning in the last hour on a line chart

**Recent Warning Messages**. See the details of the messages with the severity of Warning in the last hour including the timestamp, user, method, instance, and message displayed in a table.


### Users

See the details of users by activity, and users by message severity.

<img src={useBaseUrl('img/integrations/google/google-compute-engine-users.png')} alt="Google Compute Engine dashboards" />

**Top 10 Users by Activity**. See the count of top 10 users by insert, delete, start, stop, and reset activities in the last hour, displayed in a table.

**Top 10 Users by Severity**. See the count of top 10 users by severity of emergencies, alerts, critical, errors, and warnings, in the last hour, displayed in a table.

**Top 10 Users by Inserts**. See the count and user name of the top 10 users by inserts in the last hour on a bar chart.

**Top 10 Users by Emergencies**. See the count and user name of the top 10 users by emergency severity in the last hour on a bar chart.

**Top 10 Users by Deletes**. See the count and user name of the top 10 users by deletes in the last hour on a bar chart.

**Top 10 Users by Alerts**. See the count and user name of the top 10 users by alert severity in the last hour on a bar chart.

**Top 10 Users by Starts**. See the count and user name of the top 10 users by starts in the last hour on a bar chart.

**Top 10 Users by Criticals**. See the count and user name of the top 10 users by the critical severity in the last hour on a bar chart.

**Top 10 Users by Stops**. See the count and user name of the top 10 users by the stops in the last hour on a bar chart.

**Top 10 Users by Errors**. See the count and user name of the top 10 users by the error severity in the last hour on a bar chart.

**Top 10 Users by Resets**. See the count and user name of the top 10 users by resets in the last hour on a bar chart.

**Top 10 Users by Warnings**. See the count and user name of the top 10 users by the warning severity in the last hour on a bar chart.
