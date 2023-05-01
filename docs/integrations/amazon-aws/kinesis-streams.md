---
id: kinesis-streams
title: Amazon Kinesis - Streams
description: The Sumo Logic App for Amazon Kinesis - Streams is a unified logs and metrics (ULM) App which provides information on the events and metrics. The preconfigured dashboards help you monitor the events, API calls, errors, incoming and outgoing records, latencies, and throughput of Kinesis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/kinesis.png')} alt="Thumbnail icon" width="50"/>

Amazon Kinesis is a platform for streaming data on AWS. It makes it easy to load and analyze streaming data, and it provides the ability for you to build custom streaming data applications for your needs. Amazon Kinesis Streams is used to collect and process large streams of data records in real time. The Sumo Logic App for Amazon Kinesis - Streams is a unified logs and metrics (ULM) App which provides information on the events and metrics. The preconfigured dashboards help you monitor the events, API calls, errors, incoming and outgoing records, latencies, and throughput of Kinesis Streams.

## Log and Metrics Types
For more information on Amazon Kinesis - Streams, see [here](https://aws.amazon.com/kinesis/).

The App uses Kinesis logs and metrics for:
* Kinesis CloudWatch Metrics. For details, see [here](http://docs.aws.amazon.com/streams/latest/dev/monitoring-with-cloudwatch.html).
* Kinesis operations using AWS CloudTrail. For details, see [here](http://docs.aws.amazon.com/streams/latest/dev/logging-using-cloudtrail.html).


### Sample Log Message

```json
 {  
    "eventVersion":"1.01",
    "userIdentity":{  
       "type":"IAMUser",
       "principalId":"EX_PRINCIPAL_ID",
       "arn":"arn:aws:iam::012345678910:user/Alice",
       "accountId":"012345678910",
       "accessKeyId":"vmLwWTxSQrcvzD",
       "userName":"Gosia"
    },
    "eventTime":"2017-11-01T21:23:30+0000",
    "errorCode":"LimitExceedException",
    "errorMessage":"Rate exceeded for stream CWL-Kinesis under account 656757657843",
    "eventSource":"kinesis.amazonaws.com",
    "eventName":"MergeShards",
    "awsRegion":"us-east-2 ",
    "sourceIPAddress":"187.185.157.125",
    "userAgent":"aws-sdk-java/unknown-version Linux/x.xx",
    "requestParameters":{  
       "streamName":"GoodStream",
       "adjacentShardToMerge":"shardId-000000000002",
       "shardToMerge":"shardId-000000000001"
    },
    "responseElements":null,
    "requestID":"e9f9c8eb-c757-11e3-bf1d-6948db3cd570",
    "eventID":"77cf0d06-ce90-42da-9576-71986fec411f"
 }
```

### Sample Query

```sql title="Details of errors in events"
_sourceCategory=aws/kinesis* "kinesis.amazonaws.com" errorCode
| json field=_raw "eventSource", "eventName", "awsRegion", "sourceIPAddress","userAgent" nodrop
| json field=_raw "requestParameters.streamName" as streamName nodrop
| json field=_raw "userIdentity.sessionContext.sessionIssuer.userName" as userName nodrop
| json field=_raw "userIdentity.userName" as userName nodrop
| json field=_raw "errorCode" as error_code nodrop
| json field=_raw "errorMessage" as error_msg nodrop
| where eventSource="kinesis.amazonaws.com"
| count by error_code, error_msg, eventName, userName, sourceIPAddress
```

## Collecting Logs and Metrics for the Amazon Kinesis - Streams App

### Collecting Metrics

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **Regions**. Select your Amazon Regions for Kinesis.
    * **Namespaces**. Select AWS/Kinesis.
    * **Source** **Category**. Enter a source category. For example, kinesis_metrics.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).
    * **Scan Interval**. Use the default of 5 minutes, or enter the frequency Sumo Logic will scan your CloudWatch Sources for new data.
3. Click **Save**.


### Collect Amazon Kinesis - Streams Events using CloudTrail

1. To your Hosted Collector, add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your Kinesis S3 bucket.
    * **Bucket Name**. Enter the exact name of your Kinesis S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions).) The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter a source category. For example, kinesis_event.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).
    * **Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
    * **Enable Timestamp Parsing**. Select the check box.
    * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
    * **Timestamp Format.** Select Automatically detect the format.
    * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.


## Installing the Amazon Kinesis - Streams App

Now that you have set up collection for Amazon Kinesis, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/app-install.md}

## Viewing Amazon Kinesis Streams Dashboards

### Events

See the details of Kinesis events including the count over time, location, API calls, errors, and users.

<img src={useBaseUrl('img/integrations/amazon-aws/Kinesis-Events.png')} alt="AWS API Gateway" />

**Events**. See the count and percentage of different events in Kinesis in the last 24 hours on a pie chart.

**Events Over Time**. See the count of different events over time in the last 24 hours on a line chart.

**Location of Events**. See the count of events in the last 24 hours on a world map.

**Kinesis API Calls Summary Table**. See the summary of Kinesis API calls in the last 24 hours including the AWS region, username, event name, source IP address, and count, displayed in a table.

**Kinesis API Calls Events by User.** See the count of Kinesis API calls events by user in the last 24 hours on a bar chart.

**Kinesis API Calls Events by Region**. See the count of Kinesis API calls events by AWS region in the last 24 hours on a bar chart.

**Errors in Events**. See the details of errors in the events in the last 24 hours including the error code, error message, event name, username, source IP address, and count, displayed in a table.

**Top 10 IAM Users**. See the top 10 IAM users along with the count in the last 24 hours on a bar chart.


### Metrics
11


See the details of the Kinesis metrics including the incoming bytes, incoming records, get records, put and get latency, write and read provisioned throughput exceeded, and iterator age.

<img src={useBaseUrl('img/integrations/amazon-aws/Kinesis-Metrics.png')} alt="AWS API Gateway" />

**Incoming Bytes (MB) by Stream and Shard**. See the sum of the metric incoming bytes in MB by stream and shard for the last 24 hours on a line chart.

**Incoming Records by Stream and Shard.** See the sum of the metric incoming records by stream and shard for the last 24 hours on a line chart.

**Get Bytes (MB) by Stream and Shard**. See the sum of the metric get bytes in MB by stream and shard for the last 24 hours on a line chart.

**Get Records by Stream and Shard**. See the sum of the metric get records by stream and shard for the last 24 hours on a line chart.

**Put Latency by Stream and Shard**. See the average of the metric put latency by stream and shard for the last 24 hours on a line chart.

**Get Latency by Stream and Shard**. See the average of the metric get latency by stream and shard for the last 24 hours on a line chart.

**Write Provisioned Throughput Exceeded**. See the average of the metric write provisioned throughput exceeded for the last 24 hours on a line chart.

**Read Provisioned Throughput Exceeded**. See the average of the metric read provisioned throughput exceeded for the last 24 hours on a line chart.

**Get Records Success**. See the average of the metric get records success for the last 24 hours on a line chart.

**Iterator Age (ms) by Stream and Shard**. See the maximum of the metric iterator age in milliseconds by stream and shard for the last 24 hours on a line chart.
