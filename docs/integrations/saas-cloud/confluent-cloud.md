---
id: confluent-cloud
title: Confluent Cloud
sidebar_label: Confluent Cloud
description: The Sumo Logic app for Confluent Cloud offers deep visibility into your environment with dashboards that monitor Kafka performance, consumer lag, producer latency, connector health, Flink compute pools, KSQL activity, and schema registry operations, enabling proactive troubleshooting and efficient data streaming.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/confluent-cloud.png')} alt="Thumbnail icon" width="100"/>

Confluent Cloud is a fully managed, cloud-native data streaming platform based on Apache Kafka. It enables real-time data processing, integration, and movement across applications and systems without managing infrastructure. With built-in support for connectors, ksqlDB, and stream governance, it simplifies building scalable, event-driven architectures.

The Sumo Logic App for Confluent Cloud provides deep visibility into your Confluent Cloud environment based on key platform metrics. The app’s dashboards use preconfigured searches and filters to help you monitor Kafka cluster performance, topic-level throughput, consumer lag, producer latency, connector health, Flink compute pool utilization, KSQL activity, and schema registry operations—enabling proactive troubleshooting and streamlined data streaming operations.

## Metrics type  

The Confluent Cloud app uses metrics:
* [Confluent Cloud runtime metrics](https://api.telemetry.confluent.cloud/docs/descriptors/datasets/cloud).

### Collect Metrics

Sumo Logic supports collecting metrics by C2C source:

* Configure a [Confluent Cloud Metrics Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/confluent-cloud-metrics-source/)

## Installing the Confluent Cloud  

Now that you have set up a collection for **Confluent Cloud**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-confluent-cloud-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

## Viewing the Confluent Cloud dashboards  

### Confluent Cloud - Compute Pool

Confluent Cloud - Compute Pool dashboard provides details on the status and utilization of compute resources in your Confluent Cloud environment. Use this dashboard to:

* Monitor the average Flink statement status to identify potential issues with stream processing jobs.
* Track CPU utilization against the set limit to ensure optimal resource allocation and prevent performance bottlenecks.
* Analyze trends in CPU minutes consumed over time to optimize cost and capacity planning for your Confluent Cloud deployment.
* Compare current CPU usage across different compute pools to balance workloads and improve overall system efficiency.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Compute-Pool.png')} alt="Confluent Cloud - Compute Pool" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - Connectors

Confluent Cloud - Connectors dashboard provides details on the status, performance, and health of Confluent Cloud connectors.

Use this dashboard to:
* Monitor the status of connectors and their tasks to quickly identify any that are failed, paused, or provisioning.
* Track the volume of sent and received records across different connectors to ensure data flow is as expected.
* Analyze the average sent and received bytes to detect any unusual spikes or drops in data transfer.
* Identify potential bottlenecks by correlating connector status with sent/received records and bytes.
* Monitor dead letter queue records to catch any messages that failed to be processed correctly.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Connectors.png')} alt="Confluent Cloud - Connectors" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - Kafka Cluster

Confluent Cloud - Kafka Cluster dashboard provides details on key performance metrics and operational statistics for your Kafka cluster in Confluent Cloud.

Use this dashboard to:
* Monitor producer latency and cluster load to ensure optimal performance of your Kafka cluster.
* Track active connections, request bytes, and response bytes to identify potential bottlenecks or unusual traffic patterns.
* Analyze request count trends over time to understand usage patterns and plan for capacity needs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Kafka-Cluster.png')} alt="Confluent Cloud - Kafka Cluster" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - Kafka Cluster Links

Confluent Cloud – Kafka Cluster Link dashboard provides key insights into cluster link performance and health. It tracks link task counts, mirror topic states, offset lags, data volume, and response metrics—helping monitor cross-cluster replication efficiency, detect mirror errors, and ensure seamless data delivery across environments.

Use this dashboard to:
* Monitor link counts and task activity to ensure proper setup and functioning of cluster replication.
* Track mirror topic count, bytes, and offset lag to assess replication volume and delays.
* Analyze destination response bytes for throughput visibility across clusters.
* Detect mirror transition errors to troubleshoot sync failures efficiently.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Kafka-Cluster-Links.png')} alt="Confluent Cloud - Kafka Cluster Topic" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - Kafka Cluster Topic

Confluent Cloud - Kafka Cluster Topic dashboard provides details on topic-level metrics for Kafka clusters in Confluent Cloud, including consumer lag, data throughput, and partition information.

Use this dashboard to:
* Monitor consumer lag offsets to identify potential bottlenecks in data processing and ensure timely consumption of messages.
* Analyze the relationship between received and sent bytes to detect any data loss or transmission issues within the Kafka cluster.
* Track the number of received and sent records over time to understand topic usage patterns and optimize resource allocation.
* Observe retained bytes and partition count to manage storage utilization and ensure proper topic scaling.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Kafka-Cluster-Topic.png')} alt="Confluent Cloud - Kafka Cluster Topic" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - KSQL

Confluent Cloud - KSQL dashboard provides details on query performance, data processing, and resource utilization for KSQL operations in Confluent Cloud.

Use this dashboard to:
* Monitor query saturation and identify potential bottlenecks in KSQL operations.
* Track processing errors and query restarts to ensure smooth data flow and query execution.
* Analyze storage utilization and streaming unit consumption to optimize resource allocation.
* Correlate offset lag with processing errors to troubleshoot data processing delays.
* Examine produced and consumed bytes to understand data throughput and potential network issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-KSQL.png')} alt="Confluent Cloud - KSQL" style={{border: '1px solid gray'}} width="800" />

### Confluent Cloud - Schema Registry

Confluent Cloud - Schema Registry dashboard provides details on schema operations, request counts, and traffic types for your Confluent Cloud Schema Registry.

Use this dashboard to:
* Monitor the distribution of schema operations (CREATE, READ, DELETE) to ensure proper usage and identify potential issues with schema management.
* Analyze the ratio of public vs. private traffic to understand access patterns and potential security concerns.
* Track schema count trends over time to manage growth and capacity planning for your Schema Registry.
* Correlate request counts with operation types to identify unusual spikes or drops in schema-related activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/ConfluentCloud/Confluent-Cloud-Schema-Registry.png')} alt="Confluent Cloud - Schema Registry" style={{border: '1px solid gray'}} width="800" />
