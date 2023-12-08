---
id: auto-discover
title: Auto Discover
sidebar_label: Auto Discover
description: Learn how to enable auto discover to detect services that are installed on the server on which the collector is running.
---

Sumo Logic OpenTelemetry collectors can now detect services that are installed on the server on which the collector is running. Once the services are discovered, you can evaluate the information on Sumo Logic platform and proceed with the onboarding of applications. It's a useful improvement that will give you more confidence in monitoring and observability of your systems.

:::note
- Auto discover feature is supported only in Linux and MacOS operating systems.
- Minimum collector version required to use this feature is `v0.89.0-sumo-0`.
:::

## View discovered services

Auto Discovery feature is enabled by default on all the OpenTelemetry collectors for the supported version. Below are the **Auto Discoverable Services** provided by Sumo Logic.
- Apache
- MySQL
- Ngnix
- ElasticSearch
- PostgreSQL
- Redis
- Kafka
- Docker
- RabbitMQ

For the discovered services, you can set up data collection with guided onboarding steps. 

### Add a new collector

1. In Sumo Logic, select **Manage Data > Collection > OpenTelemetry Collection**.
1. On the OpenTelemetry Collection page, click **Add Collector**.
1. On the **Done** page, you can see services discovered which are updated in real time.
1. On clicking the application tile of interest, you will be taken to the App catalog to complete the data setup.

### OpenTemetry collector list page

You can also review the applications discovered per collector on the collector list page.

1. In Sumo Logic, select **Manage Data > Collection > OpenTelemetry Collection**.
1. Click on the collector from the list which will open the Collector Inspector view.  
1. Select **Discovered Service(s)** tab to review all the services discovered.
1. On clicking the application tile of interest, you will be taken to the App catalog to complete the data setup.



