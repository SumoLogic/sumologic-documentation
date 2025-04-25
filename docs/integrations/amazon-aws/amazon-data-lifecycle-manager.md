---
id: amazon-data-lifecycle-manager
title: Amazon Data Lifecycle Manager
description: Learn about the collection process for the Amazon Data Lifecycle Manager service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-data-lifecycle-manager-logo.png')} alt="Thumbnail icon" width="50"/>

You can use Amazon Data Lifecycle Manager to automate the creation, retention, and deletion of EBS snapshots and EBS-backed AMIs. For more details, refer to the [AWS documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html).

## Metric types
* [CloudWatch Metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitor-dlm-cw-metrics.html)

## Setup
You can collect the metrics for Sumo Logic's Amazon Data Lifecycle Manager integration by following the below steps.

### Configure metrics collection
* Collect **CloudWatch Metrics** with namespace `AWS/DataLifecycleManager` using the [AWS Kinesis Firehose for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) source. For `AWS/DataLifecycleManager` metrics and dimensions, refer to [Amazon Data Lifecycle Manager CloudWatch metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitor-dlm-cw-metrics.html).