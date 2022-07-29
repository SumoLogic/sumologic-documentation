---
id: sns
title: Sumo Logic App for Amazon SNS
sidebar_label: Amazon SNS
description: The Sumo Logic App for Amazon SNS is a unified logs and metrics (ULM) App that provides insights into the operations and utilization of your SNS service. The preconfigured dashboards help you monitor the key metrics by application, platform, region, and topic name, view the SNS events for activities, and help you plan the capacity of your SNS service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sns.png')} alt="DB icon" width="50"/>

Amazon Simple Notification Service (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

The Sumo Logic App for Amazon SNS is a unified logs and metrics (ULM) App that provides insights into the operations and utilization of your SNS service. The preconfigured dashboards help you monitor the key metrics by application, platform, region, and topic name, view the SNS events for activities, and help you plan the capacity of your SNS service.

## Log and Metrics Types
The Sumo Logic App for Amazon SNS uses:
* SNS CloudWatch Metrics. For details, see [here](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/sns-metricscollected.html). 
* SNS operations using AWS CloudTrail. For details, see [here](http://docs.aws.amazon.com/sns/latest/dg/logging-using-cloudtrail.html). 

### Sample Log Message

```
{
eventVersion:"1.08",
userIdentity:
{...},
eventTime:"2022-07-14T23:06:43Z",
eventSource:"sns.amazonaws.com",
eventName:"ListTagsForResource",
awsRegion:"us-east-1",
sourceIPAddress:"config.amazonaws.com",
userAgent:"config.amazonaws.com",
requestParameters:
{
resourceArn:"arn:aws:sns:us-east-1:956882708938:testnull-SumoCWEmailSNSTopic-1NV3GQ8XZ4DFY"
},
responseElements:null,
requestID:"d8eee5b8-a894-5db4-994c-bef20b57fc0b",
eventID:"2156cf7f-f18d-47f4-b7ba-7b8a6907390a",
readOnly:true,
eventType:"AwsApiCall",
managementEvent:true,
recipientAccountId:"956882708938",
eventCategory:"Management"
}
```

### Sample Queries

```sql title="Events By Status"
account={{account}} region={{region}} namespace={{namespace}} "\"eventsource\":\"sns.amazonaws.com\""
| json "userIdentity", "eventSource", "eventName", "awsRegion", "sourceIPAddress", "userAgent", "eventType", "recipientAccountId", "requestParameters", "responseElements", "requestID", "errorCode", "errorMessage" as userIdentity, event_source, event_name, region, src_ip, user_agent, event_type, recipient_account_id, requestParameters, responseElements, request_id, error_code, error_message nodrop
| where event_source = "sns.amazonaws.com"
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop
| parse field=arn ":assumed-role/*" as user nodrop
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop
| json field=requestParameters "topicArn", "name", "resourceArn", "subscriptionArn" as req_topic_arn, req_topic_name, resource_arn, subscription_arn  nodrop | json field=responseElements "topicArn" as res_topic_arn nodrop
| if (isBlank(req_topic_arn), res_topic_arn, req_topic_arn) as topic_arn
| if (isBlank(topic_arn), resource_arn, topic_arn) as topic_arn
| parse field=topic_arn "arn:aws:sns:*:*:*" as region_temp, accountid_temp, topic_arn_name_temp nodrop
| parse field=subscription_arn "arn:aws:sns:*:*:*:*" as region_temp, accountid_temp, topic_arn_name_temp, arn_value_temp nodrop
| if (isBlank(req_topic_name), topic_arn_name_temp, req_topic_name) as topicname
| if (isBlank(accountid), recipient_account_id, accountid) as accountid
| where (tolowercase(topicname) matches tolowercase("{{topicname}}")) or isBlank(topicname)
| if (isEmpty(error_code), "Success", "Failure") as event_status
| if (isEmpty(username), user, username) as user
| count by event_status
| sort by _count, event_status asc
```

```sql title="Messages Published (Metrics-based)"
account={{account}} region={{region}} namespace={{namespace}} TopicName={{topicname}} metric=NumberOfMessagesPublished Statistic=Sum | sum
```


## Collecting Logs and Metrics for the Amazon SNS App


### Collecting Metrics for Amazon SNS  

1. Configure a [Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).
2. Configure an [Amazon CloudWatch Source for Metrics](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/Amazon-CloudWatch-Source-for-Metrics) or [AWS Kinesis Firehose for Metrics Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/AWS_Kinesis_Firehose_for_Metrics_Source) (Recommended).
    1. **Metadata**: Add an **account** field to the source and assign it a value which is a friendly name / alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried via the “account field”.

3. Click **Save**.


### Collecting Amazon SNS Events using CloudTrail

1. To your Hosted Collector, add an [AWS CloudTrail Source](/docs/send-data/sources/sources-hosted-collectors/amazon-web-services/aws-cloudtrail-source.md).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your SNS S3 bucket.
    * **Bucket Name**. Enter the exact name of your SNS S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string.
      * DO NOT use a [leading forward slash](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/Amazon-Path-Expressions).
      * The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter a source category. For example, SNS_event.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).
    * **Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
    * **Enable Timestamp Parsing**. Select the check box.
    * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
    * **Timestamp Format**. Select Automatically detect the format.
    * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.


### Field in Field Schema

Login to Sumo Logic,  goto Manage Data > Logs > Fields. Search for the `"topicname"` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).


### Field Extraction Rule(s)

Create Field Extraction Rule for CloudTrail Logs. Learn how to create Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule.md).


```
Rule Name: AwsObservabilitySNSCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource \"sns.amazonaws.com\"
```


**Parse Expression**:


```sql
| json "userIdentity", "eventSource", "eventName", "awsRegion", "recipientAccountId", "requestParameters", "responseElements" as userIdentity, event_source, event_name, region, recipient_account_id, requestParameters, responseElements nodrop
| where event_source = "sns.amazonaws.com"
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop
| parse field=arn ":assumed-role/*" as user nodrop
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop
| json field=requestParameters "topicArn", "name", "resourceArn", "subscriptionArn" as req_topic_arn, req_topic_name, resource_arn, subscription_arn  nodrop
| json field=responseElements "topicArn" as res_topic_arn nodrop
| if (isBlank(req_topic_arn), res_topic_arn, req_topic_arn) as topic_arn
| if (isBlank(topic_arn), resource_arn, topic_arn) as topic_arn
| parse field=topic_arn "arn:aws:sns:*:*:*" as region_temp, accountid_temp, topic_arn_name_temp nodrop
| parse field=subscription_arn "arn:aws:sns:*:*:*:*" as region_temp, accountid_temp, topic_arn_name_temp, arn_value_temp nodrop
| if (isBlank(req_topic_name), topic_arn_name_temp, req_topic_name) as topicname
| if (isBlank(accountid), recipient_account_id, accountid) as accountid
| "aws/sns" as namespace
| fields region, namespace, topicname, accountid
```


## Installing the Amazon SNS App

Now that you have set up collection for Amazon SNS, install the Sumo Logic App to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SNS/Install-the-Amazon-SNS-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    * Enter the **SNS Metrics Source**.
    * Select either of these options for the **SNS CloudTrail Log Source**.
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](https://help.sumologic.com/01Start-Here/Welcome-to-the-New-Library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Amazon SNS Dashboards

### Overview

See the overview of your SNS service including the successful and failed events, messages published, notifications, and users.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-Overview.png')} alt="Amazon SNS" />

**Successful Events Location**. See the count and location of successful events in your SNS in the last 24 hours on a world map.

**Failure Events Location**. See the count and location of failed events in your SNS in the last 24 hours on a world map.

**Number of Messages Published**. See the sum of the metric number of messages published in the last 24 hours on a line chart.

**Successful Events**. See the count and percentage of successful events on the last 24 hours on a pie chart.

**Failed Events**. See the count and percentage of failed events on the last 24 hours on a pie chart.

**Message Publish Size**. See the average of the metric publish size in the last 24 hours for the different regions and topic names on a line chart.

**Number of Notifications Delivered.** See the sum on the metric number of notifications delivered in the last 24 hours for the different regions and topic names.

**Top Users**. See the top 10 users by event count in the last 24 hours on a bar chart.

**Events Trend by Event Name**. See the event trend by event name in the last 24 hours on a stacked column chart.

**Number of Notifications Failed**. See the sum on the metric number of notifications failed in the last 24 hours for the different regions and topic names.

**Published Messages Comparison**. See the difference between the metrics number of messages published in the last two days on a line chart.

**Message Publish Size Comparison**. See the difference between the metrics publish size in the last two days on a line chart.


### CloudTrail Events

See the details of failed, and successful events, error codes, event status trend, users, and topic names.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-CloudTrailEvents.png')} alt="Amazon SNS" />

**Successful Events Location**. See the count and location of successful events in your SNS in the last 24 hours on a world map.

**Failure Events Location**. See the count and location of failed events in your SNS in the last 24 hours on a world map.

**Event Status**. See the count and percentage of event statuses in the last 24 hours on a pie chart.

**Top Error Codes**. See the top 10 error codes by event count in the last 24 hours on a table.

**Event Status Trend**. See the event status trend in the last seven days with failures on a line chart and successes on a column chart.

**Failed Events**. See the count and percentage of the different failed events in the last 24 hours on a pie chart.

**Failed Event Details**. See the details of failed events in the last 24 hours including the time, event name, error code, error message, AWS region, source IP address, account ID, user, type, and event count, displayed in a table.

**Successful Events**. See the count and percentage of the different successful events in the last 24 hours on a pie chart.

**Successful Event Details**. See the details of successful events in the last 24 hours including the time, event name, AWS region, source IP address, account ID, user, type, request ID, name, topic ARN, user agent, and event count, displayed in a table.

**Top Users**. See the top 10 users by event count in the last 24 hours.

**Events by User**. See the count and name of the different events by users in the last 24 hours.

**Most Active TopicNames**. See the top 10 active topic names by event count in the last 24 hours.

**Events Trend by Event Name**. See the event trend by event name in the last 24 hours on a stacked column chart.


### Metrics by Application and Platform

See the details of the metrics messages published, message publish size, notifications delivered, notifications failed, and SMS success rate.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByApplicationAndPlatform.png')} alt="Amazon SNS" />

#### Application

**Number of Messages Published.** See the sum of the metric number of messages published by applications in the last 24 hours on a line chart.

**Message Publish Size**. See the average of the metric publish size by applications in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by application in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by application in the last 24 hours on a line chart.


#### Platform

**Number of Messages Published**. See the sum of the metric number of messages published by platforms in the last 24 hours on a line chart.

**Message Publish Size.** See the average of the metric publish size by platforms in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by platforms in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by platforms in the last 24 hours on a line chart.

**SMS Success Rate**. See the average of the metric SMS success rate by SMS type and country in the last 24 hours on a line chart.


### Metrics by Region

See the details of the metrics messages published, message publish size, notifications delivered, and notifications failed by region.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByRegion.png')} alt="Amazon SNS" />

**Number of Messages Published**. See the sum of the metric number of messages published by regions in the last 24 hours on a line chart.

**Message Publish Size**. See the average of the metric publish size by regions in the last 24 hours on a line chart.

**Number of Notifications Delivered**. See the sum of the metric number of notifications delivered by regions in the last 24 hours on a line chart.

**Number of Notifications Failed**. See the sum of the metric number of notifications failed by regions in the last 24 hours on a line chart.


### Metrics by TopicName

See the details of the metrics messages published, message publish size, notifications delivered, and notifications failed by topic name.

<img src={useBaseUrl('img/integrations/amazon-aws/SNS-ByTopicName.png')} alt="Amazon SNS" />

**Number of Messages Published.** See the sum of the metric number of messages published by topic name in the last 24 hours on a line chart.

**Message Publish Size.** See the average of the metric publish size by topic name in the last 24 hours on a line chart.

**Number of Notifications Delivered.** See the sum of the metric number of notifications delivered by topic name in the last 24 hours on a line chart.

**Number of Notifications Failed.** See the sum of the metric number of notifications failed by topic name in the last 24 hours on a line chart.  
