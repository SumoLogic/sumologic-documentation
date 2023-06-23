---
id: aws-network-firewall
title: AWS Network Firewall - Cloud SIEM
sidebar_label: AWS Network Firewall
description: Configure collection and ingestion of AWS Network Firewall log messages from an S3 bucket to be parsed by CSE's AWS Network Firewall system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting AWS Network Firewall log messages from AWS S3 and sending them to Sumo Logic to be ingested by CSE.

## Step 1: Enable AWS Network Firewall logs

1. Follow AWS instructions on [firewall log delivery](https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-logging.html) for [S3](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html).
1. Before configuring collection, you need to grant Sumo Logic permission to access your AWS data. For instructions see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product/).  

## Step 2: Configure collection

In this step, you configure an HTTP Source to collect AWS Network Firewall messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an AWS S3 Source](#configure-an-aws-s3-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.<br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" width="600"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be AWS Network Firewall sources, add an additional field with key `_parser` and value `/Parsers/System/AWS/AWS Network Firewall`.

:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an AWS S3 Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select Amazon S3. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/s3-source.png')} alt="S3 source" width="600"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **S3 Region**. Choose the AWS Region the S3 bucket resides in.
1. **Bucket Name**. The name of your organizations S3 bucket as it appears in AWS.
1. **Path Expression**. The path expression of the log file(s) in S3, can contain wildcards to include multiple log files.
1. **Source Category**. Enter a string to tag the output collected from  the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields**.
    1. If you are not forwarding all sources in the hosted collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to CSE.
    1. If you are not parsing all sources in the hosted collector with the same parser, add an additional field named `_parser` with value */Parsers/System/AWS/AWS Network Firewall*.
1. **AWS Access**. For AWS Access you have two Access Method options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred. Sumo Logic access to AWS (instructions are provided above in [Step 1](#step-1-enable-aws-network-firewall-logs)) is a prerequisite for role-based access.
    -   **Role-based access**. Enter the Role ARN that was provided by AWS after creating the role.<br/><img src={useBaseUrl('img/cse/role-arn.png')} alt="Role ARN" width="600"/>
    -   **Key access**. Enter the Access Key ID and Secret Access Key. See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
14. In the **Advanced Options for Logs** section, uncheck the **Detect messages spanning multiple lines** option.
15. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/>  
1. On the **Log Mappings** page search for "AWS Network Firewall " and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/AWS-network-firewall-record-volume.png')} alt="AWS Network Firewall record volume" width="600"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for AWS Network Firewall security records. <br/><img src={useBaseUrl('img/cse/AWS-network-firewall-search.png')} alt="AWS Firewall search" width="600"/>


 
