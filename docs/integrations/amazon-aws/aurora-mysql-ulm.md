---
id: aurora-mysql-ulm
title: Sumo Logic App for Amazon Aurora MySQL ULM
sidebar_label: Amazon Aurora MySQL ULM
description: Aurora MySQL ULM
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/aurora.png')} alt="DB icon" width="50"/>

The Sumo Logic App for Aurora MySQL ULM is a unified logs and metrics (ULM) app for your Aurora MySQL database. The app allows you to monitor slow queries executing on the database, the number of connections made, identify users and client hosts, and client locations used to connect to database. The app also provides insights for queries executed per second, CPU utilization, free memory, network utilization, volume read and write IOPS, replica lags, latency, throughput, failed login and  connection attempts, and other health and performance related data.

The Sumo Logic App for Aurora MySQL ULM includes predefined searches and dashboards that allow you to monitor logs and metrics for the database. The logs enable you to monitor database activity, user activity, incoming connections, query execution time, and errors. The metrics allow you to monitor database resource utilization and throughput performance.

Amazon Aurora is a MySQL is a relational database built for the cloud. For more information, see the Amazon Aurora MySQL page.

## Log Types
The Sumo Logic App for Aurora MySQL ULM uses the following log types:

* Aurora CloudWatch Metric
* AWS Cloud Trail
* Aurora CloudWatch Log


## Collecting Logs and Metrics




## Installing the Aurora MySQL ULM App

Now that you have set up log and metric collection for Amazon Aurora MySQL, you can install the Sumo Logic App for Aurora MySQL ULM, and use its pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_RDS/Amazon-RDS-Metrics-App-Dashboards#Dashboards).

To install the app, do the following:

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


## Viewing Aurora MySQL ULM Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Logs - Overview Dashboard

**Aurora MySQL ULM Logs - Overview Dashboard** allows you to view high-level overview of the following log types: Error, Slow Query, Audit and General.

Use this dashboard to:
* Identify Authentication Failures. You can drill down for granular data by clicking any of the first row panels  to display the “Error Log” analysis dashboard.
* Identify the number of database connections. For more granular data, click the DB Connections panel to bring up the Audit Analysis dashboard.
* Identify the number of slow queries and the users and client hosts that are responsible for them. For more granular data, click the Slow Queries and Top Users and IPs Firing Slow Queries panels to bring up the Slow Query Log dashboard.
* Identify the breakdown of connection protocols. For more granular data, clicking the Connection Type Used panel to bring up the General Query Logs dashboard.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Logs_Overview.png')} alt="Aurora MySQL ULM" />



### Logs - Error Logs Analysis Dashboard

**Aurora MySQL ULM Logs - Error Logs Analysis Dashboard** allows you to view details for error logs, including failed authentications, error outliers, top and recent warnings, log levels, and aborted connections.

This dashboard utilizes [Error Logs](https://dev.mysql.com/doc/refman/5.7/en/error-log.html) that have been ingested into Sumo Logic. Error Logs are by default enabled on Aurora MySQL.

Use this dashboard to:
* Track diagnostic messages, such as errors, warnings and notes to effectively troubleshoot a situation.
* Identify outliers for diagnostic events to discover if there is anomaly.
* Identify the reason for authentication failures for user, client, host, and client location being used to connect.
* Identify connection abort events.
* Monitor database instance start up, ready for connection events.

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="Aurora MySQL ULM" />



### Logs - Slow Query Dashboard

**Aurora MySQL ULM Logs - Slow Query Dashboard** allows you to view log details on slow queries, including the number of slow queries, trends, execution times, time comparisons, command types, users, and IP addresses.

This dashboard utilizes [SlowQuery Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html) that must be enabled and ingested into Sumo Logic.

Use this dashboard to:
* Identify queries that are taking longer to process than the time onfigured in DB Parameter Group.
* Identify queries used to search non-indexed columns, thus impacting performance.
* Identify candidate queries, for improvements based on frequency of execution, time it takes to execute, locking time, and other factors.
* Identify users responsible for slow queries, from the client IP address and type of command.
* Check if SQL SELECT type queries can be shifted to read replicas.
* Monitor trends of slow queries, comparing history to analyze the cause and troubleshoot a solution.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Logs_SlowQuery.png')} alt="Aurora MySQL ULM" />



### Logs - Audit Log Analysis Dashboard

**Aurora MySQL ULM Logs - Audit Log Analysis Dashboard** allows you to view an analysis of events, including accessed resources, destination and source addresses,  timestamps, and user login information. These logs are specifically enabled to audit activities that are of interest from an audit and compliance perspective.

This dashboard works on Audit Logs that must be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) enabled to be[ uploaded to cloudwatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html) and ingest into Sumo.

Use this dashboard to:
* Identify successful and failed connections to the database with details about user, client IP address, location.
* Identify whether multiple hosts are connecting to DB with same user.
* Identify whether multiple users are connecting to DB from same host.
* Identify the most active users, client hosts, and databases.
* Get a high level overview of SQL statements and commands being executed.  
* Identify user management related activities.

You can drill deeper into SQL Statements and or commands that are being executed by clicking “Top SQL Commands” panel. This opens “Aurora MySQL ULM - Logs - Audit Log SQL Statements” dashboard for further details.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Logs_AuditLogAnalysis.png')} alt="Aurora MySQL ULM" />


### Logs - Audit Log SQL Statements Dashboard

**Aurora MySQL Logs - Audit Log SQL Statements Dashboard** allows you to view details for SQL statement events, including Top SQL commands and statements, trends, user management, and activity for various types of SQL statements.

These logs are specifically enabled to audit activities that are of interest from an audit and compliance perspective.

This dashboard utilizes Audit Logs that must be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) enabled to be[ uploaded to cloudwatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html) and ingested into Sumo logic.

Use this dashboard to:

* Identify top SQL statements, trends, and commands that are being executed.
* Get details on SQL statements and commands (DML, DDL, DCL, TCL) that are eing executed.
* Identify user management activities.
* Identify objects that have been dropped.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Logs_AuditLogSQLStatements.png')} alt="Aurora MySQL ULM" />


### Logs - General Log Analysis Dashboard
**Aurora MySQL ULM Logs - General Log Analysis Dashboard** allows you to view event details for general logs, including command types and trends, user activity and management, host activity, connections, and SQL statements.

This dashboard utilizes [General Query](https://dev.mysql.com/doc/refman/5.7/en/query-log.html) logs that must to be enabled and ingested into Sumo Logic.

Use this dashboard to:

* Identify attempts at client connection and disconnection.
* Identify authentication failures, along with their reason, for user and client host being used to connect.
* Monitor failed authentication attempts along with total attempts to track anomalies.
* Monitor failures by checking the executables the clients sent to the server.
* Monitor the types of SQL statements and queries (DML, DDL, DCL, TCL, and others) that are sent by a client.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Logs_GeneralLogAnalysis.png')} alt="Aurora MySQL ULM" />


### CloudTrail Event - Overview Dashboard

**Aurora MySQL ULM CloudTrail Event - Overview Dashboard** allows you to view details for event logs, including geographical locations, trends, successful and failed events, user activity, and error codes.

**Use this dashboard to** get an at-a-glance overview of following:

* Locations of successful and failed activities to check whether they're within compliance.
* Event trends to identify if there is something different compared to typical patterns.
* Users and the type of authentication method used.
* Keep watch on reasons of failed activities to take corrective actions as the need be.

To drill down for details, click on “Event Status” panel to get details of events in linked dashboard “Aurora MySQL ULM - CloudTrail Event - Details”.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_CloudTrailEvent_Overview.png')} alt="Aurora MySQL ULM" />


### CloudTrail Event - Details Dashboard

**Aurora MySQL ULM CloudTrail Event - Details Dashboard** allows you to view details for events, including creating, modifying, and deleting database clusters and database instances.

**Use this dashboard to** keep track of your Aurora MySQL Clusters and Instances. This dashboard provides details about various cluster and instance related activities, such as creation, modification, deletion and reboot of instances. Improper configuration of clusters and instances may have an adverse impact on performance. This dashboard helps to identify these issues from the details of the Aurora MySQL-specific events, so you can effectively remedy the situation.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_CloudTrailEvent_Details.png')} alt="Aurora MySQL ULM" />


### Metric - Overview Dashboard

**Aurora MySQL ULM Metric - Overview Dashboard** allows you to view high-level analysis of Aurora MySQL database CPU utilization, connections, login failures, IOPS, latency, and memory usage.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

Use this dashboard to:
* Monitor the number of connections any given time, how many queries are executed per second, and CPU utilization.
* Monitor the Volume Read/Write IOPS to ensure the database is optimally interacting with disk.
* Monitor replica lags, and select latency and free memory to ensure it can support heavy read loads with sustained performance.
* Detect failed login and connection attempts.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Metric_Overview.png')} alt="Aurora MySQL ULM" />


### Metric - Generic Dashboard

**Aurora MySQL ULM Metric - Generic Dashboard** allows you to view a high-level analysis of database latency, throughput, uptime, memory and storage capacity.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

Use this dashboard to:
* Monitor replica lags for applications with heavy read activity loads. Aurora supports read replicas with extremely low replica lags.
* Monitor network traffic load and usage. In general, RDS supports monitoring its Network throughput.
* Monitor cache hit ratio, to analyze free memory from a query performance perspective.
* Identify deadlocks, volume used in bytes, to analyze free local storage and engine uptime.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Metric_Generic_Dashboard.png')} alt="Aurora MySQL ULM" />


### Metric - Latency, Throughput, and IOPS Monitoring Dashboard

**Aurora MySQL ULM Metric - Latency, Throughput, and IOPS Monitoring Dashboard** allows you to view granular details on database latency, throughput, and IOPS.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

Use this dashboard to:
* Monitor the performance of database queries.
* Monitor latency and throughput for performance analysis.
* Monitor, select, insert, update, delete, commit, DML and DDL latency and throughput.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Metric_LatencyThroughputIOPS.png')} alt="Aurora MySQL ULM" />


### Metric - Resource Utilization Monitoring Dashboard

**Aurora MySQL ULM Metric - Resource Utilization Monitoring Dashboard** allows you to view analysis of resource utilization, including usage, latency, active and blocked transactions, and login failures.

This dashboard utilizes CloudWatch RDS Metrics for Aurora.

Use this dashboard to:
* Monitor CPU Credit Usage/Balance, as well as disk usage for bin logs,
* Identify active and blocked transactions.
* Monitor bin og replica lag.
* Monitor Result Set Cache Hit Ratio from a performance perspective.

<img src={useBaseUrl('img/integrations/amazon-aws/AuroraMySQL_Metric_ResourceUtilizationMonitoring.png')} alt="Aurora MySQL ULM" />
