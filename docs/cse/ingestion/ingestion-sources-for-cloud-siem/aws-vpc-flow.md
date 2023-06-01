---
id: aws-vpc-flow
title: AWS VPC Flow - Cloud SIEM
sidebar_label: AWS VPC Flow
description: Configure collection and ingestion of VPC Flow logs from an S3 bucket to be parsed by CSE's AWS VPC Flow system parser.
---

This section has instructions for collecting AWS VPC Flow log messages from AWS S3 and sending them to Sumo Logic to be ingested by CSE.

Sumo Logic CSE supports the default AWS VPC Flow log format which includes all version 2 fields. See [AWS VPC flow log records documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.tml#flow-logs-fields) for more details.

## Step 1: Enable AWS VPC Flow Logs

In this step, you configure AWS VPC Flow logging in AWS as described in [AWS Help](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html).

1. You can use an existing S3 bucket, or create a new one, as described in [Create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) in AWS help.
1. Create flow logs for your VPCs, subnets, or network interfaces. For instructions, see [Creating a Flow Log that Publishes to Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html#flow-logs-s3-create-flow-log) in AWS help.
1. Confirm that logs are being delivered to the S3 bucket. Log files are saved to the bucket using following folder structure: `bucket_ARN/optional_folder/AWSLogs/aws_account_id/vpcflowlogs/region/year/month/day/log_file_name.log.gz`
1. Ensure permission is granted for an AWS Source and that [logging is enabled.](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html)

## Step 2: Configure Collection

In this step, you configure an HTTP Source to collect AWS VPC Flow log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an AWS S3 Source](#configure-an-aws-s3-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a hosted collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  
    ![add-hosted-collector.png](/img/cse/add-hosted-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be AWS VPC Flow sources, add an additional field with key `_parser` and value */Parsers/System/AWS/AWS VPC Flow*.

:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an AWS S3 Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select Amazon S3. 
1. The page refreshes.  
    ![s3-source.png](/img/cse/s3-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **S3 Region**. Choose the AWS Region the S3 bucket resides in.
1. **Bucket Name**. The name of your organizations S3 bucket as it appears in AWS
1. **Path Expression**. The path expression of the log file(s) in S3, can contain wildcards to include multiple log files.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields**.
    1. If you are not forwarding all sources in the hosted collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to CSE.
    1. Add another field named `_parser` with value */Parsers/System/AWS/AWS VPC Flow*.
1. **AWS Access**. For AWS Access you have two Access Method options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred. Note that Sumo Logic access to AWS (instructions are provided above in [Step 1](#step-1-enable-aws-vpc-flow-logs))  is a prerequisite for role-based access.
    * **Role-based access**. Enter the Role ARN that was provided by AWS after creating the role.   
        ![role-arn.png](/img/cse/role-arn.png)
    * **Key access**. Enter the Access Key ID and Secret Access Key. See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access  Key](https://aws.amazon.com/iam/) for details.
1. In the **Advanced Options for Logs** section, uncheck the **Detect messages spanning multiple lines** option.
1. In the **Processing Rules for Logs** section, add an **Exclude messages** **that match** processing rule to ignore the following file header lines:  
    `version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status`  
     
1. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "AWS VPC Flow" and check under **Record Volume**. 
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for AWS VPC Flow security records.


 
