---
id: sqs
title: Sumo Logic App for Amazon SQS
sidebar_label: Amazon SQS
description: The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sqs.png')} alt="Thumbnail icon" width="50"/>

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

## Log and Metrics Types
The App uses SQS logs and metrics for:
* SQS CloudWatch Metrics. For details, see here.
* SQS operations using AWS CloudTrail. For details, see here.


### Sample Log Message

```json
{
   "eventVersion":"1.04",
   "userIdentity":{
      "type":"AssumedRole",
      "principalId":"AROAINUY7K3KSGCABCDEF:bsmith",
      "arn":"arn:aws:sts::12212341717:assumed-role/TechOps-SAML_Role/kdavis",
      "accountId":"1221234221717",
      "accessKeyId":"ASIAI12345GECTHNBTQ",
      "sessionContext":{
         "Attributes":{
            "mfaAuthenticated":"false",
            "creationDate":"2017-11-03T21:04:39Z"
         },
         "sessionIssuer":{
            "type":"Role",
            "principalId":"AROAINUY7K3KSGCABCDEF",
            "arn":"arn:aws:iam::12212341717:role/TechOps-SAML_Role",
            "accountId":"122123451717",
            "userName":"TechOps-SAML_Role"
         }
      }
   },
   "eventTime":"2017-11-03T21:36:27Z",
   "eventSource":"sqs.amazonaws.com",
   "eventName":"CreateQueue",
   "awsRegion":"us-west-2",
   "sourceIPAddress":"19.174.45.8",
   "userAgent":"aws-sdk-go/1.12.8 (go1.9; darwin; amd64) APN/1.0 HashiCorp/1.0 Terraform/0.10.0-dev",
   "requestParameters":{
      "queueName":"msg_process_businessrule",
      "Attribute":{
         "ReceiveMessageWaitTimeSeconds":"20",
         "MessageRetentionPeriod":"345600",
         "MaximumMessageSize":"262144",
         "VisibilityTimeout":"3600"
      }
   },
   "responseElements":{
      "queueUrl":"https://sqs.us-west-2.amazonaws.com/12212341717/initial_msg_formatting"
   },
   "requestID":"3f9f0a8a-1234-5678-b16c-58fc1a1ee8fb",
   "eventID":"66b74ca6-1234-5678-a61e-fba42272ba91",
   "eventType":"AwsApiCall",
   "recipientAccountId":"122123451717"
}
```


### Sample Query

```sql title="Top 10 users"
_sourceCategory=*cloudtrail* "\"eventsource\":\"sqs.amazonaws.com\""
| json "eventSource" nodrop
| json "userIdentity.type" as type nodrop
| json "userIdentity.arn" as arn nodrop
| json "userName" nodrop
| json "eventName" nodrop
| where eventSource="sqs.amazonaws.com"
| parse field=arn ":assumed-role/*" as user
| if (isEmpty(userName), user, userName) as user
| count as eventCount by user
| top 10 user by eventCount
```


## Collecting Logs and Metrics for the Amazon SQS App

### Collect Metrics

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors//amazon-aws/amazon-cloudwatch-source-metrics).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **Regions**. Select your Amazon Regions for SQS.
    * **Namespaces**. Select AWS/SQS.
    * **Source Category**. Enter a source category. For example, AWS/Metric/SQS.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).
    * **Scan Interval**. Use the default of 5 minutes, or enter the frequency Sumo Logic will scan your CloudWatch Sources for new data.
3. Click **Save**.


### Collect Amazon SQS Events using CloudTrail

1. To your Hosted Collector, add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors//amazon-aws/aws-cloudtrail-source.md).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your SQS S3 bucket.
    * **Bucket Name**. Enter the exact name of your SQS S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors//amazon-aws/Amazon-Path-Expressions)). The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter a source category. For example, SQS_event.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).
    * **Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
    * **Enable Timestamp Parsing**. Select the check box.
    * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
    * **Timestamp Format**. Select Automatically detect the format.
    * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.



## Installing the Amazon SQS App

Now that you have set up collection for Amazon SQS, install the Sumo Logic App to use the pre-configured searches and [dashboards](#viewing-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. Select either of these options for the **SQS CloudTrail Log Source**.
        * Choose **Select from Existing Source Categories,** and select the Source Category from list.
        * Choose Enter a Custom Data Filter and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`).
    3. Enter the **SQS Metrics Source**.
    4. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    5. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](/docs/get-started/library/index.md) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Amazon SQS Dashboards

### Overview

See the details of SQS metrics including the age, delayed, visible, sent, deleted, messages, and size of the messages.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-Overview.png')} alt="SQS-Overview" />

**Events Location. **See the count of SQS CloudTrail events by location in the last 14 days on a world map.

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Delayed**. See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by region on a line chart.

**Events Trend**. See the trend of different events in the last 14 days on a stacked column chart.

**Approximate Number Of Messages Visible and Not Visible**. See the sum of the metric approximate number of messages visible, and the sum of the metric approximate number of messages not visible, in the last 24 hours by region on a line chart.

**Top Users**. See the top 10 users by event count in the last 14 days on a bar chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by region on a line chart.

**Lag (Sent - Deleted).** See the difference between the metrics number of messages sent and number of messages deleted, to get the lag of the messages by region in the last 24 hours on a line chart.

**Number Of Messages Received**. See the sum of the metrics number of messages received by region in the last 24 hours on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by region on a line chart.

**Number Of Messages Sent and Deleted**. See the sum of the metric number of messages sent, and the sum of the metric number of messages deleted, in the last 24 hours by region on a line chart.


### CloudTrail Events

See the details of SQS from logs including the top users, events, and queues.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-CloudTrailEvents.png')} alt="ASQS-CloudTrailEvents" />

**Events. **See the count and percentage of the different SQS events in the last 14 days on a pie chart.

**Events Trend**. See the trend of different events in the last 14 days on a stacked column chart.

**Events Location. **See the count of SQS CloudTrail events by location in the last 14 days on a world map.

**Top Queues**. See the top 10 queue name by event count in the last 14 days displayed in a table.

**Top Users**. See the top 10 users by event count in the last 14 days displayed in a table.

**Events by User**. See the count of SQS events by user in the last 14 days on a bar chart.

**Events Details**. See the details of SQS events including the time, event name, queue name, queue URL, type, user, account ID, AWS region, source IP address, and event count, in the last 14 days, displayed in a table.


### By QueueName

See the details of SQS including the delayed, invisible, deleted, lag, size, received and sent messages by queue name.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-ByQueueName.png')} alt="SQS-ByQueueName" />

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Delayed**. See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Not Visible**. See the sum of the metric approximate number of messages not visible in the last 24 hours by queue name on a line chart.

**Approximate Number Of Messages Visible**. See the sum of the metric approximate number of messages visible in the last 24 hours by queue name on a line chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by queue name on a line chart.

**Number Of Messages Deleted**. See the sum of the metric number of messages deleted in the last 24 hours by queue name on a line chart.

**Number Of Messages Received**. See the sum of the metric number of messages received in the last 24 hours by queue name on a line chart.

**Number Of Messages Sent**. See the sum of the metric number of messages sent in the last 24 hours by queue name on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by queue name on a line chart.


### By Region

See the details of SQS including the delayed, invisible, deleted, lag, size, received and sent messages by region.

<img src={useBaseUrl('img/integrations/amazon-aws/SQS-ByRegion.png')} alt="AWS API Gateway" />

**Approximate Age Of Oldest Message (Seconds)**. See the average of the metric approximate age of oldest message in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Delayed.** See the average, sum, and maximum of the metric approximate number of messages delayed in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Not Visible**. See the sum of the metric approximate number of messages not visible in the last 24 hours by region on a line chart.

**Approximate Number Of Messages Visible**. See the sum of the metric approximate number of messages visible in the last 24 hours by region on a line chart.

**Number Of Empty Receives**. See the average, sum, and maximum of the metric number of empty receives in the last 24 hours by region on a line chart.

**Number Of Messages Deleted**. See the sum of the metric number of messages deleted in the last 24 hours by region on a line chart.

**Number Of Messages Received**. See the sum of the metric number of messages received in the last 24 hours by region on a line chart.

**Number Of Messages Sent**. See the sum of the metric number of messages sent in the last 24 hours by region on a line chart.

**Sent Message Size**. See the average, sum, and maximum of the metric sent message size in the last 24 hours by region on a line chart.

**Lag (Sent - Deleted)**. See the difference between the metrics number of messages sent and number of messages deleted, to get the lag of the messages by region in the last 24 hours on a line chart.
