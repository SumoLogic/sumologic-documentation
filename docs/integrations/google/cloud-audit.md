---
id: cloud-audit
title: Sumo Logic App for Google Cloud Audit
sidebar_label: Google Cloud Audit
description: The Google Cloud Audit App helps you monitor the activities in your Google Cloud Platform projects. The preconfigured dashboards provide you insights into the network, security, operations, and users of your Google Cloud Platform projects.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/cloudaudit.png')} alt="thumbnail icon" width="50"/>

The Google Cloud Audit App helps you with audit and compliance by enabling you to monitor activities and track the actions of administrators in your Google Cloud Platform projects. The preconfigured dashboards provide insight into the network, security, operations, and users of your Google Cloud Platform projects.


## Collecting Logs for Google Cloud Audit

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for collecting logs from Google Cloud Audit.

### Log Types

The Google Cloud Audit App uses the following logs:

* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/). These logs track events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Compute Engine, IAM and App Engine.

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
2. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/configure-hosted-collector).
3. Click **Add Source** next to the Hosted** **Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional. \

5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/index.md/Get-Started-with-Search/Search-Basics/Built-in-Metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/index.md/Get-Started-with-Search/Search-Basics/Built-in-Metadata) field called _sourceCategory. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/design-deployment/best-practices-source-categories). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:

 If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

 If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**. \


    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
    * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/sources/reference-information-sources/time-reference) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/manage/collection/processing-rules/create-processing-rule.md).
10. When you are finished configuring the Source click **Save**.


### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/App-Engine#01Collect-Logs-for-the-Google-App-Engine-App).



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


These limits may vary based on your setup and are based on our previous tests.

We recommend the following:
* Shard messages across topics within the above data limits.
* Ask GCP to increase the allowable capacity for the topic.


### Create a Topic and a Subscription with Pub/Sub in Google Cloud



1. From Google Cloud console’s main navigation, choose Pub/Sub.
2. Click Create a Topic.

3. Set the topic name. For example, “gcp-all-sumo”, click **Create Topic**.
11

4. From the Topics dashboard, click on the Pub/Sub menu and select the newly created topic.
12

5. Select Create Subscription. \

13

6. Set the subscription name.
7. Set **Push** as the delivery type.
8. Enter the Source URL created in the previous step in the Endpoint URL field.
9. Click Create.


### Create export of Cloud Audit logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.



1. Go to **Logging** and click **Logs Router**.


14


1. Click **Create Sink.  \
 \
**
15

2. Click the arrow to **Filter by label or text** and select **Convert to advanced filter**. \
 \

16

3. Create an advanced filter by entering: **logName="projects/*/logs/cloudaudit.googleapis.com%2Factivity" \
**For information about defining advanced filters, see [Advanced Filters](https://cloud.google.com/logging/docs/view/advanced-filters) in GCP help.
4. In the **Edit Export** window on the right:
    1. Set the **Sink Name.** For example, "gcp-all".
    2. Set **Sink Service** to “Cloud Pub/Sub”.
    3. Set **Sink Destination** to the newly created Pub/Sub topic. For example, "pub-sub-logs".
    4. Click **Create Sink**. \
 \

17

5. By default, GCP logs are stored within Stackdriver, but you can configure Stackdriver to exclude them as detailed here without affecting the export to Sumo Logic as outlined above. To understand how to exclude Stackdriver logs, please follow the instructions in [this GCP document](https://cloud.google.com/logging/docs/exclusions#overview).


### Sample Log Message


```json
{
  "message": {
    "data": {
      "insertId": "55E06F0577741.AA05843.A90CA7B9",
      "logName": "projects/bmlabs-loggen/logs/cloudaudit.googleapis.com%2Factivity",
      "operation": {
        "id": "operation-1510758777595-55e06f047a479-fd74bd40-dc6cfc9b",
        "last": true,
        "producer": "compute.googleapis.com"
      },
      "protoPayload": {
        "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
        "authenticationInfo": {
          "principalEmail": "service-287993422434@dataflow-service-producer-prod.iam.gserviceaccount.com"
        },
        "methodName": "beta.compute.instanceTemplates.delete",
        "requestMetadata": {
          "callerIp": "10.106.32.130",
          "callerSuppliedUserAgent": "cloud_workflow_service"
        },
        "resourceName": "projects/bmlabs-loggen/global/instanceTemplates/dataflow-permissionlogs-johndoe-1-11150704-7cbb-harness",
        "serviceName": "compute.googleapis.com"
      },
      "receiveTimestamp": "2018-01-26T12:08:31.316UTC",
      "resource": {
        "labels": {
          "instance_template_id": "176548811930462611",
          "instance_template_name": "dataflow-permissionlogs-johndoe-1-11150704-7cbb-harness",
          "project_id": "bmlabs-loggen"
        },
        "type": "gce_instance_template"
      },
      "severity": "NOTICE",
      "timestamp": "2018-01-26T12:08:31.316UTC"
    },
    "attributes": {
      "logging.googleapis.com/timestamp": "2018-01-26T12:08:31.316UTC"
    },
    "message_id": "172054682231179",
    "messageId": "172054682231179",
    "publish_time": "2018-01-26T12:08:31.316UTC",
    "publishTime": "2018-01-26T12:08:31.316UTC"
  },
  "subscription": "projects/bmlabs-loggen/subscriptions/sumo-test"
}
```



## Installing the Google Cloud Audit App

This section provides instructions for installing the Google Cloud Audit App, as well as examples of each of the App dashboards.

Now that you have set up collection for Google Cloud Audit, install the Sumo Logic App to use the pre-configured searches and [dashboards](#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Google Cloud Audit Dashboards


The Google Cloud Audit App pre-configured searches and [dashboards](#Dashboards) provide visibility into your environment for real-time analysis of overall usage.


### Overview

See the overview of audit activities including resource creation and deletion, operations, users, and authorization failures.

<img src={useBaseUrl('img/integrations/google/GoogleCloudAuditOverview.png')} alt="Google Cloud Audit dashboards" />

**Location of Audit Activity**. See the count and location of audit activities in the last 24 hours on a world map.

**Created Resources**. See the count of resources created in the last 24 hours on a pie chart.

**Deleted Resources Over Time**. See the count of resources that were deleted in the last 24 hours on a bar chart.

**Operations by Resources**. See the count of operations by resources in the last 24 hours on a stacked column chart.

**Authorization Failures**. See the count of authorization failures in the last 24 hours.

**Top 10 Users**. See the top 10 users by messages in the last 24 hours on a column chart.


### Network and Security

See the details of network and security operations including the authorization failures, and firewall changes.

<img src={useBaseUrl('img/integrations/google/GoogleCloudAuditNetworkAndSecurity.png')} alt="Google Cloud Audit dashboards" />

**Location of Authorization Failures**. See the count and location of authorization failures in the last hour on a world map.

**Network and Security Operations Over Time**. See the count of network and security operations in the last 24 hours on a stacked column chart.

**Authorization Failures Over Time**. See the count and trend of authorization failures in the last 24 hours on a column chart.

**Recent Firewall Changes**. See the details of firewall changes in the last three hours including the timestamp, user, method, ranges, direction, action, protocol, and ports.

**Network and Security Operations**. See the count of network and security operations in the last 24 hours on a pie chart.

**Recent Authorization Failures**. See the details of authorization failures in the last three hours including the timestamp, user, action, project, country name, city, and caller IP address.

**Firewall Rules with All Allowed**. See the details of firewall rules in the last 24 hours that allowed all protocols including the timestamp, user, method, ranges, direction, and ports.

**Short Lived Network Resources**. See the details of short lived network resources in the last 24 hours including the creator, terminator, and resource name.


### Operations
26


See the details of operations including the actions, requested services, created, and deleted resources.


<img src={useBaseUrl('img/integrations/google/Google-Cloud-Audit-Operations.png')} alt="Google Cloud Audit dashboards" />


**Actions**. See the count of all actions in the last hour on a pie chart.

**Requested GCP Service Over Time**. See the count of requested GCP services in the last 24 hours on area chart.

**Operations by GCP Project**. See the count of operations by GCP project in the last 24 hours on area chart.

**Recent Operation Activity.** See the details of operations in the last three hours including the timestamp, user, action, granted, project, and IP address

**Created Resources Over Time**. See the count of created resources in the last 24 hours on a stacked column chart.

**Deleted Resources Over Time**. See the count of deleted resources in the last 24 hours on a stacked column chart.


### Users
28


See the details of user activities including the location, top users, creations and deletions.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-Audit-Users.png')} alt="Google Cloud Audit dashboards" />

**Location of Users**. See the count and location of users in the last 24 hours on a world map.

**User Activities Over Time**. See the count of user activities in the last 24 hours on a stacked column chart.

**Top 10 Activities by Users**. See the top 10 activities by users in the last 24 hours on a bar chart.

**Top 10 Users**. See the top 10 users by messages in the last 24 hours on a column chart.

**Creations and Deletions by User**. See the count of creations and deletions by users in the last 24 hours on a stacked column chart.

**Recent User Activity**. See the details of user activities in the last three hours including the timestamp, user, project, method, severity, and operations.


## Query Sample

**Recent firewall changes**

```
_collector="HTTP Source for GCP Pub/Sub" logName methodName principalEmail request resource timestamp
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
| json "message.data" as data
| json field=data "resource.type" as type
| where type = "gce_firewall_rule"
| json field=data "timestamp", "resource.labels", "resource.labels.project_id", "protoPayload.authenticationInfo.principalEmail", "protoPayload.methodName", "protoPayload.request" as timestamp, labels, project, user, method, request
| json field=request "direction", "alloweds[*]", "denieds[*]" as direction, alloweds, denieds nodrop
| if(isNull(alloweds) OR alloweds="","deny","allow") as action
| parse "\"sourceRanges\":[*]" as ranges nodrop
| parse "\"destinationRanges\":[*]" as ranges
| parse regex field=alloweds "\"IPProtocol\":\"(?<protocol>[a-zA-Z\.]+)\"[,\"a-z:]*\[?(?<ports>[0-9-\",]+)?\]?" multi nodrop
| parse regex field=denieds "\"IPProtocol\":\"(?<protocol>[a-zA-Z\.]+)\"[,\"a-z:]*\[?(?<ports>[0-9-\",]+)?\]?" multi
| count as operations by timestamp, user, method, ranges, direction, action, protocol, ports
| fields timestamp, user, method, ranges, direction, action, protocol, ports
| sort by timestamp
```
