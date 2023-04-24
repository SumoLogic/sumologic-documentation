---
id: aws-ec2-host-metrics
title: AWS EC2 Host Metrics
sidebar_label: AWS EC2 Host Metrics
description: The Sumo Logic App for AWS EC2 Host Metrics allows you to collect local host metrics and display them using predefined search queries and dashboards.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

[Amazon Elastic Compute Cloud (Amazon EC2)](https://aws.amazon.com/ec2/) is a web service that provides secure, resizable compute capacity in the cloud, enabling you to complete control of your computing resources. The Sumo Logic app for AWS EC2 (Host metrics) collects local host metrics and displays them using predefined search queries and dashboards. App dashboards provide a visual analysis of local host metrics for CPU, disk, memory, network, and TCP.

## Metrics Types 

Host metrics are gathered by the open-source [SIGAR library](https://github.com/hyperic/sigar). The metrics that are collected are described in [Host Metrics for Installed Collectors](/docs/send-data/installed-collectors/sources/host-metrics-source/#collected-metrics).

* [CPU Metrics](/docs/integrations/hosts-operating-systems/host-metrics/#cpu-metrics)
* [Memory Metrics](/docs/integrations/hosts-operating-systems/host-metrics/#memory-metrics)
* [TCP Metrics](/docs/integrations/hosts-operating-systems/host-metrics/#tcp-metrics)
* [Networking Metrics](/docs/integrations/hosts-operating-systems/host-metrics/#networking-metrics)
* [Disk Metrics](/docs/integrations/hosts-operating-systems/host-metrics/#disk-metrics)

### Time Intervals

The time interval determines how frequently the source is scanned for metrics data. Sumo Logic supports pre-specified time intervals (10 seconds, 15 seconds, 30 seconds, 1 minute, and 5 minutes).

You can also specify a time interval in JSON by using the interval parameter, as follows: `"interval" : 60000`.

The JSON parameter is in milliseconds. We recommend 60 seconds (60000 ms) or longer granularity. Specifying a shorter interval will increase the message volume and could cause your deployment to incur additional charges.

### AWS Metadata

Collectors running on Host Metrics (EC2) instances can optionally collect AWS Metadata such as EC2 tags to make it easier to search for Host Metrics.  Only one AWS Metadata Source for Metrics is required to collect EC2 tags from multiple hosts. For more information, see [AWS Metadata Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source/).

### Sample Query 

```sql title="CPU utilization (Host metric based)"
metric=CPU_Sys _sourcecategory=Labs/AWS/Host/Metrics _sourceHost=* _collector=* _source = * account=* region=* instancetype=* namespace=hostmetrics instanceid=* | avg
```

## Viewing AWS EC2 Host Metrics Dashboards

This page provides examples and descriptions for each of the AWS Observability Host EC2 metrics pre-configured dashboards.

[Amazon Elastic Compute Cloud (Amazon EC2)](https://aws.amazon.com/ec2/) is a web service that provides secure, resizable compute capacity in the cloud, enabling you to complete control of your computing resources.

The Sumo Logic **AWS Observability EC2 metrics dashboards** collect local host metrics and displays them using dashboards to aid troubleshooting issues and optimize resource allocation and costs. App dashboards provide a visual analysis of local host metrics for CPU, disk, memory, network, and TCP traffic.

:::note
We highly recommend you view these dashboards in the [Explore View](../deploy-use-aws-observability/view-dashboards.md) of the AWS Observability solution.
:::

### 1.2 AWS EC2 Overview (Host OS metrics)

The **AWS EC2 Overview (Host OS metrics)** dashboard provides insights into EC2 performance throughout your infrastructure, including CPU utilization, network rates, disk, and memory usage.

Use this dashboard to:

* Quickly identify instances with high and low CPU and memory utilization.
* Monitor average statistics across various resource dimensions across all of your EC2 instances.
* Identify resource usage patterns and deviations across instance types to determine which instance types should be resized.
* Monitor average CPU utilization by instance type.

<img src={useBaseUrl('img/observability/1.2.-AWS-EC2-Overview-Host-OS-metrics.png')} alt="AWS_EC2_Overview"/>

### 1.2 AWS EC2 Summary (Host OS metrics)

The **AWS EC2 Summary (Host OS metrics)** dashboard provides resource utilization insights for a specific EC2 instance.

Use this dashboard to:

* Monitor resource utilization statistics for a specific  EC2 instance.
* Determine if an instance needs to be resized based on utilization.
* Identify potential infrastructure issues by identifying deviations in trends and monitoring.

<img src={useBaseUrl('img/observability/1.2.-AWS-EC2-Summary-Host-OS-metrics.png')} alt="AWS_EC2_Summary"/>

### 2.2 AWS EC2 CPU (Host OS metrics)

The **AWS EC2 CPU (Host OS metrics)** dashboard provides insights into EC2 CPU performance throughout your infrastructure, including average CPU load, system, user, idle, and wait times, as well as statistics per instance.
 
Use this dashboard to:

* Quickly identify if high CPU utilization for an EC2 instance is potentially causing a production issue.
* Determine how CPU cycles are being spent across CPU user time, system time, and IO wait time.

<img src={useBaseUrl('img/observability/2.2.-AWS-EC2-CPU-Host-OS-metrics.png')} alt="AWS_EC2_CPU"/>

### 3.2 AWS EC2 Memory (Host OS metrics)

The **AWS EC2 Memory (Host OS metrics)** dashboard provides insights into EC2 memory usage per instance for total and percentage memory usage, free memory use, buffers, cache memory, and system memory.

Use this dashboard to:

* Quickly identify if high memory utilization for an EC2 instance is potentially causing a production issue
* Determine how memory is being used across buffers and cache memory.

<img src={useBaseUrl('img/observability/3.2.-AWS-EC2-Memory-Host-OS-metrics.png')} alt="AWS_EC2_Memory"/>

### 4.2 AWS EC2 Disk (Host OS metrics)

The **AWS EC2 Disk (Host OS metrics)** dashboard provides insights into EC2 disk usage per instance throughout your infrastructure, including directory, writes and usage, available bytes, used bytes, and byte read and write rates.

Use this dashboard to:

* Quickly identify if high disk utilization for an EC2 instance is potentially causing a production issue.
* Determine which directories have the most disk usage. 
* Determine the performance of your storage by monitoring disk read/write rates.

<img src={useBaseUrl('img/observability/4.2.-AWS-EC2-Disk-Host-OS-metrics.png')} alt="AWS_EC2_Disk"/>

### 5.2 AWS EC2 Network (Host OS metrics)

The **AWS EC2 Network (Host OS metrics)** dashboard provides insights into EC2 network performance per instance across your infrastructure, including metrics for the average number of packets in and out, packet rate in and out, and byte rate in and out.

Use this dashboard to:

* Quickly identify if traffic sent and received rates for an EC2 instance are potentially causing a production issue.
* Determine if any improvements need to be made to your AWS networking infrastructure for optimal performance.

<img src={useBaseUrl('img/observability/5.2.-AWS-EC2-Network-Host-OS-metrics.png')} alt="AWS_EC2_Network"/>

### 6.2 AWS EC2 TCP (Host OS metrics)

The **AWS EC2 TCP (Host OS metrics)** dashboard provides insights into TCP traffic performance per EC2 instance throughout your infrastructure, including metrics for inbound and outbound connections, listen and established connections, and close wait and time wait connections.

Use this dashboard to:

* Quickly identify if TCP traffic for an EC2 instance is potentially causing a production issue.
* Identify if any improvements need to be made to optimize TCP traffic by analyzing various TCP connection states.

<img src={useBaseUrl('img/observability/6.2.-AWS-EC2-TCP-Host-OS-metrics.png')} alt="AWS_EC2_TCP"/>
