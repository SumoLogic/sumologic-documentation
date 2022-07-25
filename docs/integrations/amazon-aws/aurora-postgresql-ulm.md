---
id: aurora-postgresql-ulm
title: Amazon Aurora PostgreSQL ULM
sidebar_label: Amazon Aurora PostgreSQL ULM
description: Amazon Aurora PostgreSQL ULM
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic App for Aurora PostgreSQL uses unified logs and metrics (ULM) to monitor your Aurora PostgreSQL database. The app allows you to monitor the number of connections made, CPU utilization, free memory, network utilization, volume read / write IOPS, disk queue depth, replica lags, latency, throughput and other resource utilization details. With Cloudtrail Logs, the app allows you to identify user, client host and client locations being used to configure Aurora PostgreSQL infrastructure.

The Sumo Logic App for Aurora PostgreSQL ULM includes predefined searches and dashboards that allow you to monitor logs and metrics for the database. The logs enable you to monitor database activity, user activity, incoming connections, query execution time, and errors. The metrics allow you to monitor database resource utilization and throughput performance.

Amazon Aurora PostgreSQL is a relational database service built for the cloud. For more information, see the [Amazon Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/details/postgresql-details/)


## Collecting Logs and Metrics

### Log Types  

The Sumo Logic App for Aurora PostgreSQL ULM uses the following log types:
* [AWS Cloud Trail](https://aws.amazon.com/cloudtrail/features/)
* [Aurora CloudWatch Metric](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Monitoring.html)


## Install the Aurora PostgreSQL ULM App

Now that you have set up log and metric collection for Amazon Aurora PostgreSQL, you can install the Sumo Logic App for Aurora PostgreSQL ULM, and use its pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_RDS/Amazon-RDS-Metrics-App-Dashboards#Dashboards).


**To install the app, do the following:**

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


## Viewing Aurora PostgreSQL ULM Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.


**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.



### CloudTrail Event - Overview Dashboard

**Aurora PostgreSQL ULM CloudTrail Event - Overview Dashboard** allows you to view details for event logs, including geographical locations, trends, successful and failed events, user activity, and error codes.

**Use this dashboard to** get an at-a-glance overview of following:
* Locations of successful and failed activities to check if they're within compliance.
* Event trends to identify if there is something different compared to typical patterns.
* Users and the type of authentication method used.
* Failed activities so you can take corrective actions.

To drill down for details, click the Event Status panel. Details are shown for the of events in the linked dashboard: Aurora PostgreSQL ULM - CloudTrail Event - Details.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQLULM_CloudTrailEvent_Overview.png')} alt="Aurora PostgreSQL ULM" />


### CloudTrail Event - Details Dashboard

**Aurora PostgreSQL ULM CloudTrail Event - Details Dashboard** allows you to view details for events, including creating, modifying, and deleting database clusters and database instances. Use this dashboard to:

Use this dashboard to:
* Keep track of your Aurora PostgreSQL Clusters and Instances. This dashboard provides details about various cluster and instance related activities, such as creation, modification, deletion and reboot of instances. The improper configuration of clusters and instances may have adverse impact on performance.
* Help identify problems with details about the Aurora PostgreSQL specific events that provide insights into how to solve a particular problem.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQLULM_CloudTrailEvent_Details.png')} alt="Aurora PostgreSQL ULM" />


### Metric - Overview Dashboard

**Aurora PostgreSQL ULM Metric - Overview Dashboard** allows you to view a high-level analysis of Aurora PostgreSQL database CPU utilization, connections, IOPS, replica lag, and memory usage.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

**Use this dashboard to:**
* Monitor the number of connections.
* Monitor CPU utilization.
* Monitor Volume Read and Write IOPS to ensure the database is optimally interacting with disk.
* Monitor replica lags and available free memory to ensure support of heavy read loads with good performance.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQLULM_Metric_Overview.png')} alt="Aurora PostgreSQL ULM" />

### Metric - Generic Dashboard

**Aurora PostgreSQL ULM Metric - Generic Dashboard** allows you to view analysis of replica lag, network throughput, buffer cache hit ratio, deadlocks, and free storage capacity.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

**Use this dashboard to:**
* Monitor replica lags. Aurora supports read replicas with extremely low replica lags to support applications with heavy read activity loads.
* Monitor network traffic load and usage. RDS supports monitoring network throughput.
* Monitor cache hit ratio to identify free memory from query performance perspective.
* Identify deadlocks, if any, and identify free local storage.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQLULM_Metric_Generic.png')} alt="Aurora PostgreSQL ULM" />

### Metric - Latency, Throughput, and IOPS Monitoring Dashboard

**Aurora PostgreSQL ULM Metric - Latency, Throughput, and IOPS Monitoring Dashboard** allows you to view granular details of database latency, throughput, IOPS and disk queue depth. It is important to monitor the performance of database queries. Latency and throughput are the key performance metrics.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

**Use this dashboard to:**

* Monitor read, write latency and throughput.
* Monitor Read and Write IOPS to ensure your database is interacting with disk optimally.
* Monitor database wait times for disk access with the Disk Queue Depth panel.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQLULM_Metric_LTIOPSMonitoring.png')} alt="Aurora PostgreSQL ULM" />

### Metric - Resource Utilization Monitoring Dashboard

Aurora PostgreSQL ULM Metric - Resource Utilization Monitoring Dashboard allows you to view analysis of resource utilization, including volume usage, swap usage, transaction log disk usage, uptime, transaction IDs, and replica lag.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

**Use this dashboard to:**
* Monitor disk usage for transaction logs and swap usage for a database instance.
* Monitor Maximum transaction IDs used to avoid the database going into read-only mode to avoid transaction ID wraparound.
* Monitor replica lag when replicating updates from the primary RDS PostgreSQL instance to other cluster nodes.
* Monitor engine up time.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraPostgreSQL_Metric_ResourceUtilizationMonitoring.png')} alt="Aurora PostgreSQL ULM" />
