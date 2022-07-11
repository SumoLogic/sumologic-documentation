---
id: service
title: Service Release Notes
sidebar_label: Service
---

Service Release Notes for the current year are listed here. If you need to see previous Service Release Notes, check the [Archive](https://help.sumologic.com/Release_Archive/Service_Release_Notes_Archive).


## 2022-07-08 (Metrics)

New - Care to comment? Now you can. In the Metrics Explorer, in Advanced Mode you can add comments to a metrics query and comment out portions of the query by using comment formatting. Comments are helpful for troubleshooting during query development, and also for other users who may use or edit your queries at a later date—comments you add will be visible in saved and shared queries. For more information, see Comments in Metric Queries.

Update - The eval metrics operator has been enhanced to support a _granularity option that provides the length, in milliseconds, of the bucket used for quantization, for use in metric queries.


---
## 2022-07-02 (Metrics)

Update - We’ve improved our zoom in feature for metric charts. Up until now, zooming into a metric chart simply increased the size of the chart. Now, for time series charts in which the query uses automatic quantization, when you zoom in the chart presents results based on more granular data: the bucket size across which results are quantized is reduced. For more information, see Zoom in on a time series chart.


---
## 2022-07-04 (Apps)

New - The Sumo Logic AWS API Gateway App provides insights into API Gateway tasks while accepting and processing concurrent API calls throughout your infrastructure, including traffic management, CORS support, authorization, access control, throttling, monitoring, and API version management. This App was already part of the AWS observability solution and will now be available as a standalone app in the App catalog.

Update - The Sumo App for Amazon DynamoDB uses logs and metrics to provide operational insights into your DynamoDB. The App includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and help you plan the capacity of your DynamoDB instances. This App updates from the AWS observability solution in the App Catalog. Updates include upgrading all dashboards to Dashboards(New) and adding a new threat intel Dashboard to the App.

Update - The Sumo Logic Amazon RDS App dashboards provide visibility into your Amazon Relational Database Service (RDS) performance and operations. Preconfigured dashboards allow you to monitor critical metrics of your RDS cluster, including CPU, memory, storage, the network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. Audit activity dashboards help you monitor activities performed on your RDS infrastructure. This app updates from the AWS observability solution in the App Catalog. Updates include upgrading all the dashboards to Dashboards(New). New Audit activity dashboards help you monitor activities performed on your RDS infrastructure and RDS instance-specific dashboard support for - Aurora and MySQL and Performance Insights dashboards.
