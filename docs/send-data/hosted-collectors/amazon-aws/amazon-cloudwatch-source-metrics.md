---
id: amazon-cloudwatch-source-metrics
title: Amazon CloudWatch Source for Metrics
sidebar_label: Amazon CloudWatch Metrics
description: A Sumo Logic CloudWatch Source allows you to gather metrics data from an Amazon resource.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cloudwatch-icon.png')} alt="icon" width="40"/>

A Sumo Logic CloudWatch Source allows you to gather metrics data from an Amazon resource. 

:::tip
Sumo Logic recommends you use the newer AWS Kinesis Firehose for Metrics Source to collect CloudWatch metrics. For more information, see [Which to use: Kinesis Firehose source or CloudWatch source?](aws-kinesis-firehose-metrics-source.md)
:::

## Supported AWS metrics

A Sumo CloudWatch Source only supports CloudWatch metrics that are emitted at a regular interval. It cannot ingest metrics that are emitted with significant latency, such as Amazon S3 Daily Storage Metrics or AWS Billing metrics, or at sporadic intervals, such as Amazon DynamoDB throttled events.

Sumo does support S3 Request Metrics. Since S3 does not publish the request metrics by default, you must enable them if you want to collect them. For more information, see [Monitoring Metrics with Amazon CloudWatch](http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html) in AWS help.

:::tip
EC2 metrics have high latency and can increase the costs of your AWS account. For EC2 metrics, consider [Installing a Collector with a Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source.md). The advantage is near zero latency and more information at a lower overall cost.
:::

## About AWS tag filtering

When you configure a CloudWatch source, you have the option of defining *AWS tag filters*. Tag filters allow you to filter the CloudWatch metrics you collect by the AWS tags assigned to your resources. For each AWS namespace, you can define one or more tag-value pairs.

:::tip
Tag filtering is only supported for user-defined AWS tags, not for AWS-generated tags.
:::

Here’s how tag filtering works:

* If you don't specify a tag filter for a namespace, the source will collect all metrics for the namespace.
* If you specify a single `tag = value` pair for a namespace, the source will collect metrics from resources with that tag value.  
* If you specify multiple values for a specific tag for a namespace, as shown below, the filters are OR’ed. For example, with the following setting, the source will collect metrics from resources in the AWS/DynamoDB namespace whose `owner` tag is *either* “Veronica” or “Bryan”.   

   ![same-namespace-same-line.png](/img/send-data/same-namespace-same-line.png)

* You can use multiple lines to define filters for different tags in the same namespace. Filters on the same namespace but in different lines are AND’ed together. For example, with the following setting the source will collect metrics from resources in the AWS/DynamoDB namespace whose whose `owner` tag is “Veronica” *and* `Env` tag is = “prod”.   

   ![same-namespace-mult-lines.png](/img/send-data/same-namespace-mult-lines.png)

* Filters on different namespaces are UNION’ed together. For example, with the following setting the source will collect metrics from resources in the AWS/DynamoDB namespace whose `owner` tag is “Veronica”, and also from resources in the AWS/Redshift namespace whose `Env` tag is “prod”.   

   ![diff-namespaces.png](/img/send-data/diff-namespaces.png)

Tag filters will not be applied to previously ingested data, and can take a few minutes to apply to existing data.

## AWS tag filtering namespace support 

AWS tag filtering is supported for the following AWS namespaces.

* AWS/ApiGateway
* AWS/ApplicationELB
* AWS/AppStream
* AWS/CloudFront
* AWS/DMS
* AWS/DX
* AWS/DynamoDB
* AWS/EBS
* AWS/EC2
* AWS/EC2Spot
* AWS/EFS
* AWS/ElastiCache
* AWS/ElasticBeanstalk
* AWS/ElasticMapReduce
* AWS/ELB
* AWS/ES
* AWS/Firehose
* AWS/Inspector
* AWS/Kinesis	AWS/KinesisAnalytics
* AWS/KinesisVideo
* AWS/KMS
* AWS/Lambda
* AWS/Logs
* AWS/ML
* AWS/NATGateway
* AWS/NetworkELB
* AWS/OpsWorks
* AWS/RDS
* AWS/Redshift
* AWS/Route53
* AWS/S3
* AWS/SageMaker
* AWS/SQS
* AWS/StorageGateway
* AWS/VPN
* AWS/WorkSpaces

## Set up an Amazon CloudWatch source

1. Before you begin, grant permission for Sumo Logic to list available metrics and get metric data points. See [Grant Access to an AWS Product](grant-access-aws-product.md) for details.
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Click **Add Source** next to a Hosted Collector.
1. Select **AWS CloudWatch Metrics**. 

   ![cloudwatch metrics configure.png](/img/send-data/cloudwatch-metrics-configure.png)

1. **Name**. Enter a name to display for the new source.
1. **Description.** Optional description.
1. **Regions**. Select one or more Amazon regions. 
1. **Namespaces**. Select one or more Amazon namespaces.

   :::note
   If you change the namespace selection, there may be a delay of as much as 15 minutes before the change is reflected in the available options for metrics queries.
   :::

1. **AWS Tag Filters**. This setting is visible only if you selected one or more of the namespaces listed in [About AWS tag filtering](#about-aws-tag-filtering).

   ![aws-tag-filters.png](/img/send-data/aws-tag-filters.png)

   Tag filters allow you to filter the CloudWatch metrics you collect by the AWS tags you have assigned to your AWS resources. You can define tag filters for each supported namespace. If you do not define any tag filters, all metrics will be collected for the regions and namespaces you configured for the source above:

   1. **Namespace**. Select a namespace from the pulldown.
   1. **Values**.  Enter one or more tag values. If you specify multiple values, separate them with a semicolon character (;). For example, `stage;prod `
   1. After you define a filter, a new row appears. You can define another filter for the same namespace, or one for a different one. If you want to filter on an additional tag for the same namespace, select that namespace again from the pulldown, and specify the Key and Values fields.

   :::note
   If you filter by metrics from a namespace by multiple tags (different keys) the source will only collect metrics that match *all* tags.
   :::

1. **Custom Namespaces.** Enter a comma-separated list of any custom namespaces from which you want to collect custom metrics. For more information about custom metrics, see http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html.
1. **Source Category.** Enter any string to tag the output collected from this Source. (Category metadata is stored in a searchable field called `_sourceCategory`.)
1. For **AWS** **Access** you have two **Access Method** options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in step 1, [Grant Sumo Logic access to an AWS Product](grant-access-aws-product.md).

   * For **Role-based access** enterthe Role ARN that was provided by AWS after creating the role.
   * For **Key access** enter the **Access Key ID** and **Secret Access Key.** See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details in AWS's documentation.

1. **Scan Interval**. Use the default of 5 minutes, or change this value to indicate how frequently Sumo Logic should poll the CloudWatch API. To learn more about polling interval considerations, see [AWS CloudWatch Scan Interval](#aws-cloudwatch-scan-interval) below.
1. **Total Metrics.** This field displays the total number of metrics (unique metric time series) that will be collected if the Source is created with the current configuration. If all of your CloudWatch metrics are published at a 1 minute interval, then "Total Metrics" will also be the total number of 'data points per minute' that are generated by this source. However, if your CloudWatch metrics are published every 5 minutes, then you would divide this number by 5 to get the number of 'data points per minute' that would be generated by this source. The field automatically refreshes the count when there are changes to the following fields: Regions, Namespaces, or AWS credentials.
1. Click **Save**.

## Unique time series per namespace

Sometime after you configure the AWS access method for the source, the source configuration UI will start to display the number of unique time series for each namespace configured for the source.

![cloudwatch-metrics-by-namespace.png](/img/send-data/cloudwatch-metrics-by-namespace.png)

## CloudWatch metric visibility

Your CloudWatch metrics will not be immediately available in Sumo Logic. Metrics should be available after a period approximately equal to the metric latency on CloudWatch plus five minutes.  

## AWS CloudWatch scan interval

The scan interval defines how long Sumo Logic waits between calls to the CloudWatch API. This does not affect the number of metric data points collected. If metrics are published to CloudWatch every minute, and you scan every 5 minutes, then each API response would return 5 data points. Decreasing the interval will reduce the number of API calls, which may help with your AWS bill. However, it will also add latency to your CloudWatch Metrics collection.

AWS reports CloudWatch metrics at different granularities (1-minute, 3-minute, and 5-minute intervals), so setting a scan interval that's too short could lead to excessive querying. Setting an interval that's too long can delay the update frequency of new metrics appearing in Sumo Logic.

:::note
Under some circumstances, Sumo Logic automatically increases the scan interval to avoid data loss due to throttling of data by AWS. See Enable and Manage the Audit Index for details.
:::

Querying the AWS CloudWatch Metrics API can incur data transfer charges that may appear on your AWS bill.

## Throttling of CloudWatch data

AWS automatically throttles CloudWatch data if the limits that Amazon sets for the associated APIs are exceeded. If you have a high volume of metrics data points in your account, it is likely that Amazon will throttle your CloudWatch data.

If no adjustments are made on the Sumo Logic side, throttling on the Amazon side can cause metrics data to be dropped. To prevent this from occurring, Sumo Logic automatically doubles the CloudWatch scan interval if more than one throttling message is received in a single interval. However, the change in scan interval isn't reflected in the Sumo Logic UI. The original configured interval is still shown.

If the scan interval is automatically changed, a message similar to the following is added to the audit log. No action is required by the Sumo Logic user. CloudWatch source ui-cw-oldPrimary received throttling exception from AWS while querying for metrics.  Increasing scan interval to 20 minutes.

## CloudWatch data point aggregation

AWS pre-aggregates CloudWatch data points using these aggregators:

* Minimum
* Maximum
* Average
* Sum
* SampleCount

When you query CloudWatch metrics, *all* of the above aggregation types will be charted unless you include a Statistic tag in your query selector.  To return and chart only the aggregation type you want, use the following selector in your query:

```
Statistic=<aggregator>
```

For example,

```
Statistic=Minimum
```

## Collected metrics

For details on Amazon CloudWatch collected metrics, refer to: [CW Support for AWS](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CW_Support_For_AWS.html)
