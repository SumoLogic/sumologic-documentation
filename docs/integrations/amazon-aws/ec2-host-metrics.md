---
id: ec2-host-metrics
title: AWS EC2 Host Metrics
sidebar_label: AWS EC2 Host Metrics
description: The Sumo Logic App for Host Metrics (EC2) allows you to collect your EC2 instance metrics and display them using predefined dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_EC2_CW_Metrics.png')} alt="AWS EC2 CW Metrics icon" width="50"/>

Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage.

The Sumo Logic App for Host Metrics (EC2) allows you to collect your EC2 instance metrics and display them using predefined dashboards. The App provides dashboards to display analysis of EC2 instance metrics for CPU, memory, disk, network, and TCP. Also, it provides detailed insights into all CloudTrail audit events associated with EC2 instances and specifically helps identify changes, errors, and user activities.


## Metrics Types  

Host metrics are gathered by the open-source [SIGAR library](https://github.com/hyperic/sigar). The metrics that are collected are described in [Host Metrics for Installed Collectors](/docs/send-data/installed-collectors/sources/host-metrics-source#collected-metrics).

* [CPU Metrics](/docs/integrations/hosts-operating-systems/host-metrics#cpu-metrics)
* [Memory Metrics](/docs/integrations/hosts-operating-systems/host-metrics#memory-metrics)
* [TCP Metrics](/docs/integrations/hosts-operating-systems/host-metrics#tcp-metrics)
* [Networking Metrics](/docs/integrations/hosts-operating-systems/host-metrics#networking-metrics)
* [Disk Metrics](/docs/integrations/hosts-operating-systems/host-metrics#disk-metrics)


### Sample queries  

```sql title="Average CPU Utilization"
_sourceCategory=Labs/AWS/Host/Metrics metric=CPU_Total account=* region=* namespace=aws/ec2 instanceid=* | avg
```


## Collecting Metrics for the Host Metrics (EC2) App

The Host Metrics (EC2) app relies upon an Installed Collector with a [Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source) on each of your AWS EC2 hosts. This page describes the data sources for the Host Metrics (EC2) app and has instructions for setting up metric collection.


### Configure Host Metrics sources  

Follow the instructions in this section to configure the Sumo Logic Installed Collector and a [Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source) on each of your **AWS EC2** hosts. You will assign **account** and **namespace** metadata [fields](/docs/manage/fields) to the sources so that incoming logs and metrics will be appropriately tagged.

This step is not necessary if you already have an Installed Collector and Host Metrics tagged with account and Namespace metadata fields.

Perform these steps for each EC2 host:

1. Set up an Installed Collector. For instructions, see [Installed Collectors](/docs/send-data/installed-collectors).
2. Add a Host Metrics Source to the Installed Collector. For instructions, see [Manually Configure a Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source). In the **Fields** portion of the configuration::
   * Add a field named **account**, and set it to your AWS account alias.
   * Add a field named **namespace** and set it to **aws/ec2**.

<img src={useBaseUrl('img/integrations/amazon-aws/configure-metadata.png')} alt="Configure metadata" />

3. Set the **Scan Interval** (the frequency at which the Source is scanned) to 1 minute.

A default Scan Interval of 1 minute is recommended. You can set it to a higher or lower interval as needed. Faster intervals may result in increased consumption cost.

You can also build your EC2 AMI machine image with these fields and settings. For instructions, see [this blog](https://www.sumologic.com/blog/packer-and-sumo-logic). Here’s a sample sources.json file that you can include in your AMI.


```json
{
  "api.version": "v1",
   "source": {
    "name": "Host Metrics",
    "category": "hostmetrics",
    "automaticDateParsing": false,
    "multilineProcessingEnabled": true,
    "useAutolineMatching": true,
    "contentType": "HostMetrics",
    "forceTimeZone": false,
    "filters": [],
    "cutoffTimestamp": 0,
    "encoding": "UTF-8",
    "fields": {
      "account": "<your AWS account alias>",
      "Namespace": "AWS/EC2"
    },
    "thirdPartyRef": {
      "resources": [
        {
          "serviceType": "HostMetrics",
          "path": {
            "type": "NoPathExpression"
          },
          "authentication": {
            "type": "NoAuthentication"
          }
        }
      ]
    },
    "interval": 300000,
    "metrics": [
      "CPU_User",
      "CPU_Sys",
 …..
    ],
    "processMetrics": [],
    "sourceType": "SystemStats"
  }
}
```


### AWS Metadata

Collectors running on AWS EC2 instances can optionally collect AWS Metadata such as EC2 tags to make it easier to search for Host Metrics. Only one AWS Metadata Source for Metrics is required to collect EC2 tags from multiple hosts. For more information, see [AWS Metadata Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source).


## Installing the Host Metrics (EC2) app

Now that you have set up the collection for Host Metrics (EC2) metrics, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following fields will be created by default:

- `instanceid` EC2 instance id.

## Viewing EC2 Host Metrics Dashboards

### AWS EC2 - Overview (Host OS Metrics)

The **AWS EC2 - Overview (Host OS Metrics)** dashboard provides insights into EC2 performance throughout your infrastructure, including CPU utilization, network rates, disk, and memory usage.

Use this dashboard to:

* Quickly identify instances with high and low CPU and memory utilization.
* Monitor average statistics across various resource dimensions across all of your EC2 instances.
* Identify trends and deviations in resource usage across instance types, based upon which you can identify which instance types need to be resized.
* Monitor average CPU utilization by instance type.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Overview-Host-Metrics.png')} alt="EC2 host metrics dashboard" />

### AWS EC2 - Summary (Host OS Metrics)

The **AWS EC2 - Summary (Host OS Metrics)** dashboard provides resource utilization insights for a specific EC2 instance.

Use this dashboard to:

* Monitor resource utilization statistics for a specific  EC2 instance.
* Determine if an instance needs to be resized based on utilization.
* Identify potential infrastructure issues by identifying deviations in trends and monitoring.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Summary-Host-Metrics.png')} alt="EC2 host metrics dashboard" />


### AWS EC2 - CPU

The **AWS EC2 - CPU (Host OS Metrics)** dashboard provides insights into EC2 CPU performance throughout your infrastructure, including average CPU load, system, user, idle, and wait times, as well as statistics per instance.

Use this dashboard to:
* Quickly identify if high CPU utilization for an EC2 instance is potentially causing a production issue.
* Determine how CPU cycles are being spent across  CPU user time, system time, and  IO wait time.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-CPU-Host-Metrics.png')} alt="EC2 host metrics dashboard" />


### AWS EC2 - Memory (Host OS Metrics)

The **AWS EC2 - Memory (Host OS Metrics)** dashboard provides insights into EC2 memory usage per instance for total and percentage memory usage, free memory use, buffers, cache memory, and system memory.

Use this dashboard to:
* Quickly identify if high memory utilization for an EC2 instance is potentially causing a production issue
* Determine how memory is being used across buffers and cache memory.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Memory-Host-Metrics.png')} alt="EC2 host metrics dashboard" />


### AWS EC2 - Disk (Host OS Metrics)

The **AWS EC2 - Disk (Host OS Metrics)** dashboard provides insights into EC2 disk usage per instance throughout your infrastructure, including directory, writes and usage, available bytes, used bytes, and byte read and write rates.

Use this dashboard to:
* Quickly identify if high disk utilization for an EC2 instance is potentially causing a production issue.
* Determine which directories have the most disk usage.
* Determine the performance of your storage by monitoring disk read/write rates.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Disk-Host-Metrics.png')} alt="EC2 host metrics dashboard" />


### AWS EC2 - Network (Host OS Metrics)

The **AWS EC2 - Network (Host OS Metrics)** dashboard provides insights into EC2 network performance per instance across your infrastructure, including metrics for the average number of packets in and out, packet rate in and out, and byte rate in and out.

Use this dashboard to:
* Quickly identify if traffic sent and received rates for an EC2 instance is potentially causing a production issue.
* Determine if any improvements need to be made to your AWS networking infrastructure for optimal performance.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Network-Host-Metrics.png')} alt="EC2 host metrics dashboard" />


### AWS EC2 - TCP (Host OS Metrics)

The **AWS EC2 - TCP (Host OS Metrics)** dashboard  provides insights into TCP traffic performance per EC2 instance throughout your infrastructure, including metrics for inbound and outbound connections, listen and established connections, and close wait and time wait connections.

Use this dashboard to:
* Quickly identify if TCP traffic for an EC2 instance is potentially causing a production issue.
* Identify if any improvements need to be made to optimize TCP traffic by analyzing various TCP connection states.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-TCP-Host-Metrics.png')} alt="EC2 host metrics dashboard" />

### AWS EC2 - Status Checks (Host Metrics)

The **AWS EC2 Metrics - Status Checks** dashboard provides details about EC2 instance health status checks, EBS attachment health, and performance limit violations.

Use this dashboard to:

* Monitor instances with failed instance, system, or attached EBS status checks.
* Track status check failure trends over time to identify recurring issues.
* Identify Nitro instances exceeding EBS IOPS or throughput performance limits.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-Status-Checks-Host-Metrics.png')} alt="EC2 host metrics dashboard" />

### AWS EC2 - EBS Performance (Host Metrics)

The **AWS EC2 Metrics - EBS Performance** dashboard provides details about EBS read/write IOPS, throughput, burst balance, and CloudWatch disk I/O for EC2 instances.

Use this dashboard to:

* Monitor EBS read and write IOPS rates and throughput across your EC2 instances.
* Track EBS IO and byte burst balance percentages to prevent performance throttling on gp2, st1, and sc1 volumes.
* Monitor CloudWatch disk read and write operation rates for overall disk performance.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-EBS-Performance-Host-Metrics.png')} alt="EC2 host metrics dashboard" />

### AWS EC2 - CPU Credits and Security (Host Metrics)

The **AWS EC2 Metrics - CPU Credits and Security** dashboard provides details about T2/T3 burstable instance CPU credit balance and usage, CloudWatch CPU utilization, IMDS security access patterns, and Dedicated Host CPU utilization.

Use this dashboard to:

* Monitor CPU credit balance and usage for T2/T3 burstable instances to avoid performance degradation.
* Track surplus credit charges to understand billing impact of T2/T3 Unlimited instances.
* Monitor IMDS security by identifying instances still using IMDSv1 (requests without token) or instances where IMDSv1 has been blocked.
* Monitor CloudWatch CPU utilization and Dedicated Host CPU utilization.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-EC2-Metrics-CPU-Credits-Security-Host-Metrics.png')} alt="EC2 host metrics dashboard" />

## Create monitors for Host Metrics (EC2) app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Host Metrics (EC2) alerts

| Name | Description | Alert Condition | Recover Condition |
|:-----|:------------|:----------------|:--|
| `AWS EC2 - High System CPU Utilization` | This alert fires when the average system CPU utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count > = 85 | Count < 85 |
| `AWS EC2 - High Total CPU Utilization` | This alert fires when the average total CPU utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count > = 85 | Count < 85 |
| `AWS EC2 - High Memory Utilization` | This alert fires when the average memory utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count > = 85 | Count < 85 |
| `AWS EC2 - High Disk Utilization` | This alert fires when the average disk utilization within a 5 minute time interval for an EC2 instance is high (>=85%). | Count > = 85 | Count < 85 |
| `AWS EC2 - High CPU IO Wait` | This alert fires when the average CPU IO wait time within a 5 minute interval for an EC2 instance is high (>=20%), indicating disk I/O bottlenecks causing CPU stalls. | Count > = 20 | Count < 20 |
| `AWS EC2 - High CPU Steal Time` | This alert fires when the average CPU steal time within a 5 minute interval for an EC2 instance is high (>=10%), indicating hypervisor contention or noisy neighbor issues. | Count > = 10 | Count < 10 |

## Upgrade/Downgrade the Host Metrics (EC2) app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Host Metrics (EC2) app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
