---
id: bigquery
title: Sumo Logic App for Google BigQuery
sidebar_label: BigQuery
description: tk
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Google BigQuery App helps you monitor data and activity in your BigQuery data warehouse. The preconfigured dashboards provide insight into the projects, operations, queries, user management operations, user activities, and billed GBs in BigQuery.

## Collect Logs for the Google BigQuery App

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for configuring log collection for the Google BigQuery App.


### Log Types  

The Google BigQuery App uses:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including BigQuery.

### Collection process for GCP services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.


The GCP service generates logs which are exported and published to a Google Pub/Sub topic through Stackdriver. You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.


### Configuring collection for GCP uses the following process:

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
   <td>
<h1>Topics</h1>


   </td>
   <td>
<h1>Megabytes per second</h1>


   </td>
   <td>
<h1>Payload size</h1>
   </td>
  </tr>
  <tr>
   <td>
<h1>One</h1>
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


### Create export of Google BigQuery logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.



1. Go to **Logging** and click **Logs Router**. \
 \

2. Click **Create Sink.  \
 \


3. Click the arrow to **Filter by label or text** and select **Convert to advanced filter**.

#

12


1. For resource_type, replace "<resource_variable>" with "bigquery_resource".


1. Select a GCP service to filter the logs. The recommended GCP service to create sinks for is BigQuery, which sends the service’s logs to Sumo Logic. In the **Edit Export** window on the right:
    1. Set the **Sink Name**. For example, "big-query-export".
    2. Set **Sink Service** to Cloud Pub/Sub.
    3. Set **Sink Destination** to the Pub/Sub topic you created above. For example, "pub-sub-logs".
    4. Click **Create Sink**.

2. By default, GCP logs are stored within Stackdriver, but you can configure Stackdriver to exclude them as detailed here without affecting the export to Sumo Logic as outlined above. To understand how to exclude Stackdriver logs, please follow the instructions in [this GCP document](https://cloud.google.com/logging/docs/exclusions#overview).


For more information, see [Overview of Logs Export](https://cloud.google.com/logging/docs/export/) in GCP.


#### Query Sample

**Created Resources Over Time**


```
# _sourceCategory=*gcp* logName resource "type":"bigquery_resource"
# | parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
# | where log_name matches "projects/*/logs/cloudaudit.googleapis.com%2Factivity"
# | json "message.data.resource.labels", "message.data.resource.labels.project_id" as labels, project
# | timeslice 1h
# | count as operations by _timeslice, project
# | transpose row _timeslice column project
```



## Installing the Google BigQuery App

This page contains instructions on how to install the Google BigQuery App, as well as descriptions for each of the App dashboards.

Now that you have set up log collection, you can install the Google BigQuery App to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_BigQuery/Install_the_Google_BigQuery_App_and_View_the_Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Google BigQuery Dashboards


The Google BigQuery App comes with pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_BigQuery/Install_the_Google_BigQuery_App_and_View_the_Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.


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
21


See information about Google BigQuery operations, including an operations breakdown, dataset service and table service operations over time, operations and operations failures by project, location, and over time.

<img src={useBaseUrl('img/integrations/google/Google-Bigquery-mgmt.png')} alt="Google BigQuery dashboards" />

**Operations. **Shows a count of all operations in the last 24 hours on a pie graph.

**Dataset Service Operations Over Time. **Shows the number of dataset service operations and errors over time in the last 24 hours on a column graph.

**Operations by Project. **Shows trends in operations by project in the last 24 hours on a line graph.

**Table Service Operations Over Time. **Shows the number of table service operations and erros over time in the last 24 hours on a line graph.

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
25


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
