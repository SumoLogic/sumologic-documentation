---
id: sns
title: Amazon SNS
description: The Sumo Logic App for Amazon SNS is a unified logs and metrics app that provides insights into the operations and utilization of your SNS service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sns.png')} alt="Thumbnail icon" width="50"/>

Amazon Simple Notification Service (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

The Sumo Logic App for Amazon SNS collects CloudTrail logs and CloudWatch metrics provides a unified logs and metrics app that provides insights into the operations and utilization of your SNS service. The preconfigured dashboards help you monitor the key metrics by application, platform, region, and topic name, view the SNS events for activities, and help you plan the capacity of your SNS service.

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

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics) or [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended).
3. Namespaces. Select **aws/sns**.
4. **Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. The **account** field allows you to query metrics.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SNS/Metadata%2Baccount.png')} alt="Metadata" />
5. Click **Save**.

### Collecting Amazon SNS Events using CloudTrail

1. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to your Hosted Collector.
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your SNS S3 bucket.
    * **Bucket Name**. Enter the exact name of your SNS S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string.
      * DO NOT use a [leading forward slash](/docs/send-data/hosted-collectors/amazon-aws/Amazon-Path-Expressions).
      * The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter a source category. For example, enter `aws/observability/CloudTrail/logs`.
    * **Fields**. Add an account field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried using the **account** field. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SNS/Fields.png')} alt="Fields" />
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
    * **Log File Discovery -> Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure Log File Discovery [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
    * **Enable Timestamp Parsing**. Select the check box.
    * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
    * **Timestamp Format**. Select Automatically detect the format.
    * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.

### Field in Field Schema

Login to Sumo Logic, go to Manage Data > Logs > Fields. Search for the `"topicname"` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

### Field Extraction Rule(s)

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
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

## Centralized AWS CloudTrail Log Collection
In case, you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following **Field Extraction Rule** to map a proper AWS account(s) friendly name/alias. Create it if not already present or update it as required.

* **Rule Name**: AWS Accounts
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: `_sourceCategory=aws/observability/cloudtrail/logs`
* **Parse Expression**: Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “dev” alias for an AWS account with ID "528560886094" and the “prod” alias for an AWS account with ID "567680881046", your parse expression would look like:

```
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Amazon SNS App

Now that you have set up collection for Amazon SNS, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    * Enter the **SNS Metrics Source**.
    * Select either of these options for the **SNS CloudTrail Log Source**.
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](/docs/get-started/library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Amazon SNS Dashboards

### Overview

The **Amazon SNS - Overview** dashboard provides insights across CloudTrail events and metrics.

**Use this dashboard to:**

* Monitor events by status, type, topic names and users.
* Monitor number of messages and messages by publish size.
* Monitor delivered and failed notifications.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-SNS-Overview.png')} alt="Amazon SNS" />

### Amazon SNS - Audit Events  

The **Amazon SNS - Audit Events** dashboard provides insights across CloudTrail events across location, status, and topic names.

Use this dashboard to:

* Monitor successful and failed events by location.
* Get trends of events by status, type.
* Monitor successful and error events with error code in detail.
* Get details of active topic names and users of both successful and error events.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-SNS-Audit-Events.png')} alt="Amazon SNS" />

### Amazon SNS - Messages, Notifications  

The **Amazon SNS - Messages, Notifications** dashboard provides insights across metrics by messages, notifications, SMS rates.

Use this dashboard to:
* Monitor details of messages published and message size .
* Monitor details of notifications delivered, failed , filtered out, redriven to dlq and failed to redriven to dlq.
* Get details of SMS success rate and spends.
* Get the details of top topic names by messages published, notifications delivered and notifications failed.
* Compare messages published and message size by today, yesterday, last week.  
* Compare notifications delivered and failed by today, yesterday, last week.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-SNS-Messages-Notifications.png')} alt="Amazon SNS" />

### Amazon SNS - Threat Intel  

The **Amazon SNS - Threat Intel** dashboard provides insights across threat locations, count, malicious confidence and details.

**Use this dashboard to**:
* Monitor details of threat locations and count.
* Get details of threats by malicious confidence and malicious IPs.
* Get details of all threats by IPs.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-SNS-Threat-Intel.png')} alt="Amazon SNS" />

### Amazon SNS - Audit Events Details

The **Amazon SNS - Audit Events Details** dashboard provides insights across topics, subscriptions, read only and non read only events.

Use this dashboard to:
* Monitor details of topics created and deleted.
* Get all details of all subscription events.
* Get details of all read only and non read only events.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-SNS-Audit-Events-Details.png')} alt="Amazon SNS" />
