---
id: amazon-elastic-block-store
title: Amazon Elastic Block Store (Amazon EBS)
description: Learn about the collection process for the Amazon Elastic Block Store (Amazon EBS) service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-elastic-block-store-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon Elastic Block Store (Amazon EBS) provides block level storage volumes for use with EC2 instances. EBS volumes behave like raw, unformatted block devices. You can mount these volumes as devices on your instances. EBS volumes that are attached to an instance are exposed as storage volumes that persist independently from the life of the instance. You can create a file system on top of these volumes, or use them in any way you would use a block device (such as a hard drive). You can dynamically change the configuration of a volume attached to an instance.

Amazon EBS is recommended for data that must be quickly accessible and requires long-term persistence. EBS volumes are particularly well-suited for use as the primary storage for file systems, databases, or for any applications that require fine granular updates and access to raw, unformatted, block-level storage. Amazon EBS is well suited to both database-style applications that rely on random reads and writes, and to throughput-intensive applications that perform long, continuous reads and writes. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html).

## Metric type
* [CloudWatch Metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using_cloudwatch_ebs.html)

:::note
* For [Cloudtrail log](https://docs.aws.amazon.com/ebs/latest/userguide/logging-ebs-apis-using-cloudtrail.html),
Amazon EBS and Amazon EC2 are tightly integrated services. Most EBS-related events are captured and reflected as part of EC2 events, since EBS volumes are typically attached to EC2 instances for storage and compute operations.
Visit the Amazon EC2 app for EBS related captured events.
:::

## Setup
You can collect the metrics for Sumo Logic's Amazon Elastic Block Store (Amazon EBS) integration by following the below steps.

### Collect CloudWatch Metrics

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* Namespace for **Amazon Elastic Block Store** Service is **AWS/EBS**.
   * ​​​**Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. Metrics can be queried via the “account field”.

## Installing the Elastic Block Store app  

Now that you have set up a collection for **Amazon Elastic Block Store**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-elastic-block-store-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

## Viewing the Elastic Block Store dashboards  

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.

:::note
Most Amazon EBS metrics shown on the dashboard depend on the volume type and usage conditions.
For more details, refer [CloudWatch Metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using_cloudwatch_ebs.html)
:::

### Overview

The **Amazon EBS - Overview** dashboard offers a comprehensive view of the performance and utilization throughout the lifecycle of your EBS volumes. It allows you to monitor essential metrics such as volume activity, data throughput, and latency.

Use this dashboard to:
* Monitor EBS volume performance metrics like IOPS, throughput, and latency.
* Track burst balance and queue depth to assess I/O efficiency.
* Track data transfer activity to understand read/write patterns over time.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-EBS-Overview.png')} alt="Elastic Block Store" style={{border: '1px solid gray'}} />

### Performance Monitoring

The **Amazon EBS - Performance** dashboard provides detail visibility into the performance and utilization of your EBS volumes, fast snapshot restore capabilities, and snapshot lifecycle. It enables monitoring of key metrics related to volume activity, data throughput, latency.

Use this dashboard to:
* Monitor EBS volume performance metrics like IOPS, throughput, and latency.
* Track burst balance and queue depth to assess I/O efficiency.
* Monitor status checks to detect degraded or impaired volumes and snapshot copy progress.
* Track data transfer activity to understand read/write patterns over time.
* Track Fast Snapshot Restore readiness and available restore credits.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-EBS-Performance.png')} alt="Elastic Block Store" style={{border: '1px solid gray'}} />

