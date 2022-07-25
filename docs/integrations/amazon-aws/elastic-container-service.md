---
id: elastic-container-service
title: Amazon Elastic Container Service
sidebar_label: Amazon Elastic Container Service (ECS)
description: Amazon Elastic Container Service (ECS)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon Elastic Container Service (Amazon ECS) is a container management service that allows you to manage Docker containers on a cluster of Amazon EC2 instances. The Sumo Logic App for Amazon ECS provides preconfigured searches and Dashboards that allow you to monitor various metrics (CPU and Memory Utilization, CPU and Memory Reservation) across ECS clusters and services. The App also monitors API calls made by or on behalf of Amazon ECS in your AWS account.


## Collecting Logs and Metrics

### Log and Metrics Types
The App collects ECS logs and metrics for:
* ECS CloudWatch Metrics. For details, see http://docs.aws.amazon.com/AmazonECS...ch-metrics.htm
* ECS Events using AWS CloudTrail. For details, see http://docs.aws.amazon.com/AmazonECS...-in-cloudtrail
* The actions recorded by CloudTrail for ECS are listed here: http://docs.aws.amazon.com/AmazonECS...perations.html





## Installing the Amazon ECS App

Now that you have set up collection for Amazon ECS, install the Sumo Logic App for Amazon ECS to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

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


## Viewing the Amazon ECS Dashboards

### Overview

This Dashboards displays information in metrics line charts on a timeline for either the last 15 minutes, or the last six hours.

Panels include:
* Cluster Count.
* Service Count.
* Count of Services by Cluster.
* Average CPU Utilization by Service Name.
* Average Memory Utilization by Service Name.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_overview.png')} alt="Amazon ECS" />

### CPU and Memory Reservation - Cluster

Definitions:
* **CPU Reservation. **The percentage of CPU units that are reserved by running tasks/services in the cluster.
* **Memory Reservation.** The percentage of memory that is reserved by running tasks/services in the cluster.

For more information, see [http://docs.aws.amazon.com/AmazonECS...ce_utilization](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html#service_utilization)

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* Average CPU Reservation by Cluster.
* Average Memory Reservation by Cluster.
* Maximum CPU Reservation by Cluster.
* Maximum Memory Reservation by Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_cpu_and_memory_cluster.png')} alt="Amazon ECS" />


### CPU Utilization - Cluster and Service

**Definitions:**
* **CPU Utilization.** The percentage of CPU units that are used in the cluster or service.
* **Cluster CPU Utilization.** Metrics that are filtered by ClusterName without ServiceName. This is measured as the total CPU units in use by Amazon ECS tasks on the cluster, divided by the total CPU units that were registered for all of the container instances in the cluster.
* **Service CPU Utilization.** Metrics that are filtered by ClusterName and ServiceName. This is measured as the total CPU units in use by the tasks that belong to the service, divided by the total number of CPU units that are reserved for the tasks that belong to the service.

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* CPU Utilization by Service.
* CPU Utilization by Cluster.
* CPU Utilization by Service and Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_cpu_util_cluster_and_service.png')} alt="Amazon ECS" />

### Memory Utilization - Cluster and Service

**Definitions:**
* **Memory Utilization.** The percentage of memory that is used in the cluster or service. Cluster memory utilization (metrics that are filtered by ClusterName without ServiceName) is measured as the total memory in use by Amazon ECS tasks on the cluster, divided by the total amount of memory that was registered for all of the container instances in the cluster.
* **Service Memory Utilization.** Metrics that are filtered by ClusterName and ServiceName. This is measured as the total memory in use by the tasks that belong to the service, divided by the total memory that is reserved for the tasks that belong to the service.
* **Unit.** Percent.

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* Memory Utilization by Service.
* Memory Utilization by Cluster.
* Memory Utilization by Service and Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_memory_util_cluster_and_service.png')} alt="Amazon ECS" />


### Events
**Events by Type. **Displays events by type in a table chart including details on event name and count for the last 24 hours.

**ECS Events Over Time. **Shows ECS events over time in a line chart on a timeline for the last 24 hours.

**Location of Events.** Performs a geo lookup operation and displays the location of ECS events on a map of the world for the last 24 hours.

**Resources Created.** Provides information on resources created in a column chart for the last 24 hours.

**Deleted Resources.** Displays details about deleted resources in a column chart for the last 24 hours.

**Resource Creation Over Time. **Shows information on resources created in a column chart for the last 24 hours.

**Deleted Resources Over Time.** Displays deleted resources in a column chart for the last 24 hours.

**RegisterContainerInstance Event.** Provides information on RegisterContainerInstance events in a table chart for the last 24 hours.

**Top 10 IAM Users.** Shows information on the top 10 IAM user in a column chart for the last 24 hours.


<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_events.png')} alt="Amazon ECS" />
