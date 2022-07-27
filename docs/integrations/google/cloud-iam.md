---
id: cloud-iam
title: Sumo Logic App for Google Cloud IAM
sidebar_label: Cloud IAM
description: The Google Cloud IAM App gives you visibility into the activities in Cloud IAM. The preconfigured dashboards allow you to monitor the IAM project activities, operations, role activities, and policy changes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/iam.png')} alt="thumbnail icon" width="50"/>

Google Cloud Identity and Access Management (Cloud IAM) allows you to create and manage permissions for Google Cloud Platform resources. The Google Cloud IAM App gives you visibility into the activities in Cloud IAM. The preconfigured dashboards allow you to monitor the IAM project activities, operations, role activities, and policy changes.

## Collect Logs for the Google Cloud IAM App

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for configuring log collection for the Google Cloud IAM App.


### Log Types

The Google Cloud IAM App uses [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) which track events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Compute Engine, IAM, and App Engine.


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


4
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.



1. In Sumo Logic select** Manage Data > Collection > Collection**.
2. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).
3. Click **Add Source** next to the Hosted** **Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional. \

5

5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](https://help.sumologic.com/05Search/Get-Started-with-Search/How-to-Build-a-Search/Keyword-Search-Expressions). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) field called _sourceCategory. See our [Best Practices: Good Source Category, Bad Source Category](https://help.sumologic.com/03Send-Data/01-Design-Your-Deployment/Best-Practices%3A-Good-Source-Category%2C-Bad-Source-Category). Avoid using spaces so you do not have to quote them in [keyword search expressions](https://help.sumologic.com/05Search/Get-Started-with-Search/How-to-Build-a-Search/Keyword-Search-Expressions). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](https://help.sumologic.com/Manage/Fields), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
    *
6
 If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
    *
7
 If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**. \

8

    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
    * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](https://help.sumologic.com/03Send-Data/Sources/04Reference-Information-for-Sources/Timestamps%2C-Time-Zones%2C-Time-Ranges%2C-and-Date-Formats) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](https://help.sumologic.com/Manage/Collection/Processing-Rules/Create-a-Processing-Rule).
10. When you are finished configuring the Source click **Save**.


### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_App_Engine/01Collect-Logs-for-the-Google-App-Engine-App).



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


### Create export of Cloud IAM logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.



1. Go to **Logging** and click **Logs Router**.


10


1. Click **Create Sink. **


11


1. Click the arrow to **Filter by label or text** and select **Convert to advanced filter**.


12


1. For resource_type, replace `<resource_variable>` with `iam_role`.


13


1. Create a sink for each GCP service whose logs you want to send to Sumo. We recommend you create sinks for the following services:  Google Project, IAM Role, and Service Account. To configure a sink, do the following:
    1. Select the service in the middle pane (Google Project, IAM Role, or Service Account).
    2. In the **Edit Export** window on the right:
        * Set the **Sink Name**. For example, "google-project".
        * Set **Sink Service** to “Cloud Pub/Sub”
        * Set **Sink Destination** to the newly created Pub/Sub topic. For example, "pub-sub-logs".
        * Click **Create Sink \
**. \

14

2. By default, GCP logs are stored within Stackdriver, but you can configure Stackdriver to exclude them as detailed here without affecting the export to Sumo Logic as outlined above. To understand how to exclude Stackdriver logs, please follow the instructions in [this GCP document](https://cloud.google.com/logging/docs/exclusions#overview).


### Sample Log Message
15



```json
{
 "message":{
   "data":{
     "insertId":"1b6mckoca48",
     "logName":"projects/bmlabs-loggen/logs/cloudaudit.googleapis.com%2Factivity",
     "protoPayload":{
       "@type":"type.googleapis.com/google.cloud.audit.AuditLog",
       "authenticationInfo":{
         "principalEmail":"player1@bmlabs.com"
       },
       "authorizationInfo":[{
         "granted":true,
         "permission":"iam.roles.undelete",
         "resource":"projects/bmlabs-loggen/roles/CustomRole655"
       }],
       "methodName":"google.iam.admin.v1.UndeleteRole",
       "request":{
         "@type":"type.googleapis.com/google.iam.admin.v1.UndeleteRoleRequest",
         "name":"projects/bmlabs-loggen/roles/CustomRole655"
       },
       "requestMetadata":{
         "callerIp":"73.110.42.127",
         "callerSuppliedUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36,gzip(gfe)"
       },
       "resourceName":"projects/bmlabs-loggen/roles/CustomRole655",
       "response":{
         "@type":"type.googleapis.com/google.iam.admin.v1.Role",
         "description":"Created on: 2017-10-24",
         "etag":"BwVcY076Hf0=",
         "group_name":"custom",
         "group_title":"Custom",
         "included_permissions":["bigquery.datasets.create"],
         "name":"projects/bmlabs-loggen/roles/CustomRole655",
         "title":"Custom Role  3"
       },
       "serviceName":"iam.googleapis.com",
       "status":{


       }
     },
     "receiveTimestamp":"2017-11-20T10:54:01.590EST",
     "resource":{
       "labels":{
         "project_id":"bmlabs-loggen",
         "role_name":"projects/bmlabs-loggen/roles/CustomRole655"
       },
       "type":"iam_role"
     },
     "severity":"NOTICE",
     "timestamp":"2017-11-20T10:54:01.590EST"
   },
   "attributes":{
     "logging.googleapis.com/timestamp":"2017-11-20T10:54:01.590EST"
   },
   "message_id":"164347792499667",
   "messageId":"164347792499667",
   "publish_time":"2017-11-20T10:54:01.590EST",
   "publishTime":"2017-11-20T10:54:01.590EST"
 },
 "subscription":"projects/bmlabs-loggen/subscriptions/push-to-sumo"
}
```



### Query Sample
16


**Added roles over time**


```
_collector="HTTP Source for GCP Pub/Sub" logName resource timestamp
| json "message.data.resource.type" as type
| parse regex "\s+\"logName\":\"(?<log_name>\S+)\""
| where type = "project" and log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
| timeslice 1h
| json "message.data.resource.labels", "message.data.resource.labels.project_id", "message.data.protoPayload.serviceData.policyDelta.bindingDeltas[*]" as labels, project, changes
| parse regex field=changes "\"role\":\"roles\\\/(?<role>[a-zA-Z.]+)\",\"member\":\".*\",\"action\":\"(?<action>[A-Z]+)\"" multi
| where action="ADD"
| count by _timeslice, role
| transpose row _timeslice column role
```


## Installing the Google Cloud IAM App

This page provides instructions for installing the Google Cloud IAM App, and examples of each of the App dashboards.

Now that you have set up collection for Google Cloud IAM, you can install the Sumo Logic App for easy access to the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_Cloud_IAM/Install-the-Google-Cloud-IAM-App-and-view-the-Dashboards#Dashboards).

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


18
Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Google Cloud IAM Dashboards


You can use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_Cloud_IAM/Install-the-Google-Cloud-IAM-App-and-view-the-Dashboards#Dashboards) for visibility into your environment for real-time performance analytics and an analysis of overall usage.


### Overview

See the overview of your Google Cloud IAM including the operations, project, IAM role, and service account activities.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-AM-Overview.png')} alt="Google Cloud IAM dashboards" />


**Messages by Project**. See the count and trend of messages by project in the last 24 hours on a line chart.

**Recent Project Activity**. See the details of recent project activities in the last three hours including the timestamp, user, action, role, and member, displayed in a table.

**Operations**. See the count of operations in the last 24 hours on a stacked column chart.

**Recent IAM Role Activity**. See the details of recent IAM role activities in the last three hours including the timestamp, user, method, project, and name, displayed in a table.

**Recent Service Account Activity**. See the details of recent service account activities in the last three hours including the timestamp, user, method, and service account, displayed in a table.


### Role Activity
22


See the details of IAM policy changes, user operations, role assignments, and role additions and removal.

<img src={useBaseUrl('img/integrations/google/Google-Cloud-IAM-Role-Activity.png')} alt="Google Cloud IAM dashboards" />

**IAM Policy Changes by Project.** See the count of IAM policy changes by project in the last 24 hours on a line chart.

**Role Existence**. See the count and percentage of the different role existence methods in the last 24 hours on a pie chart.

**User Operations**. See the count of operations by different users in the last 24 hours in a table.

**Role Assignments**. See the count and percentage of role assignment actions in the last 24 hours on a pie chart.

**Role Existence Over Time**. See the count and trend of the different role existence methods in the last 24 hours on a stacked column chart.

**Role Assignments Over Tim**e. See the count and trend of the different role assignment actions in the last 24 hours on a stacked column chart.

**Added Roles Over Time**. See the count and trend of the different roles added in the last 24 hours on a stacked column chart.

**Removed Roles Over Time**. See the count and trend of the different roles removed in the last 24 hours on a stacked column chart.
