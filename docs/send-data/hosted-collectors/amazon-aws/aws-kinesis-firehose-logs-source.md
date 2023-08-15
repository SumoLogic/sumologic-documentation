---
id: aws-kinesis-firehose-logs-source
title: AWS Kinesis Firehose for Logs Source
sidebar_label: AWS Kinesis Firehose Logs
description: Learn how to use the AWS Kinesis Firehose for Logs source to ingest logs from Amazon Kinesis Data Firehose.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/aws-kinesis-firehose-logs.png')} alt="icon" width="50"/>

An AWS Kinesis Firehose for Logs Source allows you to ingest CloudWatch logs or any other logs streamed and delivered via Amazon Kinesis Data Firehose.

Amazon Kinesis Data Firehose is an AWS service that can reliably load streaming data into any analytics platform, such as Sumo Logic. It is a fully managed service that automatically scales to match the throughput of data and requires no ongoing administration. With Kinesis Data Firehose, you don't need to write applications or manage resources. You configure your AWS service logs like VPC flow logs to send logs to AWS CloudWatch that can then stream logs to Kinesis Data Firehose which automatically delivers the logs to your Sumo Logic account. This eliminates the need for creating separate log processors or forwarders such as AWS Lambda functions, that are limited by time out, concurrency, and memory limits.

The following diagram shows the flow of data with an AWS Kinesis Firehose for Logs Source:

![architecture](/img/send-data/kinesis-architecture.png)

:::note
For failed logs messages, AWS will send them into the backup S3 bucket. Sumo Logic will ingest those failed logs through S3, and not the firehose.
:::

## Create an AWS Kinesis Firehose for Logs Source

When you create an AWS Kinesis Firehose for Logs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To create an AWS Kinesis Firehose for Logs Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **AWS Kinesis Firehose for Logs Source**.   

    ![AWS Kinesis Firehost for Logs Icon.png](/img/send-data/AWS-Kinesis-Firehost-for-Logs-Icon.png)

1. Enter a **Name** for the Source. A description is optional.

    ![AWS Kinesis logs source.png](/img/send-data/AWS-Kinesis-logs-source.png)

1. (Optional) The **Enable S3 Replay** option allows you to collect any logs that were deemed undelivered by Kinesis.

    ![s3 replay enabled on Kinesis Logs Source.png](/img/send-data/s3-replay-enabled-on-Kinesis-Logs-Source.png)  

    Kinesis puts undelivered logs into a backup directory within your S3 bucket with the path `http-endpoint-failed/yyyy/MM/dd/00/` (`00` indicates UTC time zone). This is useful when you need to meet compliance requirements.

    With this option enabled, you must specify a **Path Expression** that points to this backup directory. Start with the path prefix to your Kinesis bucket and append `http-endpoint-failed/` to it, followed by a wildcard \*. For example, `prefix-http-endpoint-failed/*`.

    You can narrow the path by dates if needed. See [Custom Prefixes for Amazon S3 Objects](https://docs.aws.amazon.com/firehose/latest/dev/s3-prefixes.html#firehose-namespace) for details on the format of the backup path. The built-in metadata field `_sourceName` is given the object path name from the backup directory.

    :::important
    Do not use the same bucket and prefix for different Kinesis Sources. We cannot differentiate logs from multiple Kinesis Data Firehoses.
    :::

1. (Optional) For **Source Host **and** Source Category**, enter any string to tag the output collected from the Source. (Category metadata is stored in a searchable field called _sourceCategory.)    

1. **SIEM Processing**. Check the checkbox to forward your data to Cloud SIEM Enterprise.    

1.  **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.         

1. Set any of the following options under **Advanced**. Advanced options do *not* apply to uploaded metrics.

    **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.

   * **Time Zone.** There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo completely disregard any time zone information present in logs by forcing a time zone. Whichever option you choose, it's important to set the proper time zone. If the time zone of logs can't be determined, Sumo assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format.** By default, Sumo will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference for more information.

    **Enable Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. Use this option if you're working with multiline messages (for example, log4J messages or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log).

   * **Infer Boundaries.** Enable when you want Sumo to automatically attempt to determine which lines belong to the same message.   If you deselect the Infer Boundaries option, enter a regular expression in the **Boundary Regex** field to use for detecting the entire first line of multi-line messages.
   * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression for the full first line of every multiline message in your log files.
   * **Enable One Message Per Request.** Select this option if you'll be sending a single message with each HTTP request. For more information, see [Multiline options in HTTP sources](/docs/send-data/hosted-collectors/http-source/logs-metrics). 

1. **Processing Rules for Logs.** Configure desired filters—such as include, exclude, hash, or mask—as described in Create a Processing Rule. Processing rules are applied to log data, but not to metric data. Note that while the Sumo service will receive your data, data ingestion will be performed in accordance with the regular expressions you specify in processing rules.    
1. When you are finished configuring the Source, click **Save**.    
1. Copy the provided URL for the Source. You'll provide this to AWS in the next section.

    ![img](/img/send-data/http-source-address.png)

## Set up CloudWatch to stream logs to Kinesis Data Firehose

You can use the AWS console or our CloudFormation Template.

### AWS console

1. Follow these steps from AWS to [Publish flow logs to CloudWatch Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-cwl.html).

1. Follow these steps from AWS to set up a [CloudWatch Logs subscription](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample) to send any incoming log events that match defined filters to your Amazon Kinesis Data Firehose delivery stream.

1. Use the [**Create Delivery Stream** wizard](https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination-http) to configure Firehose to deliver logs to Sumo Logic. You will provide the wizard with the Source URL you copied after creating the AWS Kinesis Firehose for Logs Source.

### CloudFormation Template

[Download](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/KinesisFirehoseCWLogs.template.yaml) our CloudFormation template and upload it when [creating a stack on the AWS CloudFormation console](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html).

When you [Specify a stack name and parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-parameters.html) on the AWS CloudFormation console you'll provide the following:

* Stack name
* Sumo Logic Source endpoint URL provided when you created the AWS Kinesis Firehose for Logs Source.
* S3 path prefix (this is the prefix under which all failed logs will go in the S3 bucket).

### Subscribe AWS Kinesis Firehose to CloudWatch Log Groups

Follow the instructions in the sections below to subscripe the AWS Kinesis Firehose stream that was created in the above steps to CloudWatch Log Groups.

#### Manually subscribe AWS Kinesis Firehose stream to an existing CloudWatch Log Group

If you only need to collect logs from a few additional CloudWatch Log groups, you can manually subscribe the AWS Kinesis Firehose subscripton to an existing CloudWatch Log Group using the instructions below.

1. Log in to the [AWS Management Console](https://s3.console.aws.amazon.com/).
2. Under **Management Tools**, select CloudWatch, then click **Logs** in the left- hand navigation menu.
3. Select the CloudWatch Log Group that you want to stream to Sumo Logic, click **Actions** > **Subscription Filters** > **Create Kinesis Firehose subscription filter**
4. In the Create Kinesis Firehose subscription filter page, go to **Choose Destination** section and select the Current account and then select the Kinesis Firehose delivery stream that was created in the above steps.
5. Under **Grant permissions** select the existing role that was created in the above steps that grants CloudWatch Logs permission to put data into your Kinesis Data Firehose delivery stream. If you used the Cloudformation template then the role name will contain the cloudformation name followed by `-KinesisLogsRole-`.
6. In the **Configure log format and filters** section, select a Log format and enter a Subscription filter pattern (Optional) and Subscription filter name.
    :::info
    - If no subscription filter pattern is provided it will stream all the logs present in the log group.
    - Sometimes log format will be specified in the Sumo Logic app specific collection page, so use that specific format otherwise dashboards may not light up.
    :::
7. (Optional) In the **Test Pattern** section, select the log data to test, then click **Test pattern**. If test results look fine, then click **Start Streaming**.

#### Auto-subscribe other log groups to SumoCWLogsLambda function

If you want to collect logs from multiple Log Groups, you can use Sumo’s LogGroup Lambda Connector to subscribe additional Log Groups to the AWS Kinesis Firehose. To do so, follow the instructions in [Auto-Subscribe AWS Log Groups to a AWS Kinesis Firehose stream](../collect-from-other-data-sources/autosubscribe-arn-destination.md). When you edit the connector parameters, set the 'DestinationArnType' parameter to Kinesis, `DestinationArnValue` parameter to the AWS Kinesis Firehose stream ARN, and the `ARNRole parameter to the role that was created in the above steps that grants CloudWatch Logs permission to put data into your Kinesis Data Firehose delivery stream. If you used the Cloudformation template then the role name will contain the cloudformation name followed by `-KinesisLogsRole-`..
