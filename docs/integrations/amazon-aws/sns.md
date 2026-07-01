---
id: sns
title: Amazon SNS
description: The Sumo Logic app for Amazon SNS is a unified logs and metrics app that provides insights into the operations and utilization of your SNS service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sns.png')} alt="SNS icon" width="50"/>

Amazon Simple Notification Service (SNS) is a pub/sub messaging and mobile notifications service for coordinating the delivery of messages to subscribing endpoints and clients.

The Sumo Logic app for Amazon SNS collects CloudTrail logs and CloudWatch metrics provides a unified logs and metrics app that provides insights into the operations and utilization of your SNS service. The preconfigured dashboards help you monitor the key metrics by application, platform, region, and topic name, view the SNS events for activities, and help you plan the capacity of your SNS service.

## Log and metric types

The Sumo Logic app for Amazon SNS uses the following logs and metrics:
* [Amazon SNS CloudTrail Logs](https://docs.aws.amazon.com/sns/latest/dg/logging-using-cloudtrail.html).
* [Amazon SNS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/sns-metricscollected.html).

### Sample log messages

<details>
<summary>Sample CloudTrail Log Message</summary>

```json
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
</details>

### Sample queries

```sumo title="Events By Status"
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

## Collecting logs and metrics for Amazon SNS

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Amazon SNS CloudWatch metrics 

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

  :::note
  Namespace for **Amazon SNS** service is **AWS/SNS**.
  :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Collect Amazon SNS CloudTrail logs

#### Prerequisites

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
1. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
1. Confirm that logs are being delivered to the Amazon S3 bucket.

  :::note
  Namespace for **Amazon SNS** service is **AWS/SNS**.
  :::

Follow the steps below to collect logs for Amazon SNS:
1. Configure a [CloudTrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. Add custom metadata [fields](/docs/manage/fields) with your logs:
   1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
   1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which logs are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and logs can be queried using the `account` field.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. After adding fields, check their status indicators:
      * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
      * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
         * You will have the option to automatically add or enable the field.
         * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

## Centralized AWS CloudTrail log collection
In case, you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following **Field Extraction Rule** to map a proper AWS account(s) friendly name/alias. Create it if not already present or update it as required.

* **Rule Name**: AWS Accounts
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: `_sourceCategory=aws/observability/cloudtrail/logs`

### Parse Expression

Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “dev” alias for an AWS account with ID "528560886094" and the “prod” alias for an AWS account with ID "567680881046", your parse expression would look like:

```sumo
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Amazon SNS app

Now that you have set up collection for Amazon SNS, install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name / alias to the AWS account.
- `accountid` AWS account id.
- `region` The region to which the resource name belongs to.
- `namespace` Namespace for Amazon SNS service is aws/sns.
- `topicname` Amazon SNS a Topic Name.

#### Field Extraction Rule(s)

The FER **AwsObservabilitySNSCloudTrailLogsFER** to extract fields `region`, `namespace`, `accountid`, and `topicname` will be created as a part of app installation.

## Viewing Amazon SNS dashboards

### Overview

The **Amazon SNS - Overview** dashboard provides insights across CloudTrail events and metrics.

**Use this dashboard to:**

* Monitor events by status, type, topic names and users.
* Monitor number of messages and messages by publish size.
* Monitor delivered and failed notifications.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSNS/1.-Amazon-SNS-Overview.png' alt="Amazon SNS - Overview" style={{border: '1px solid gray'}} width="800" />

### Amazon SNS - Audit Events  

The **Amazon SNS - Audit Events** dashboard provides insights across CloudTrail events across location, status, and topic names.

Use this dashboard to:

* Monitor successful and failed events by location.
* Get trends of events by status, type.
* Monitor successful and error events with error code in detail.
* Get details of active topic names and users of both successful and error events.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSNS/2.-Amazon-SNS-Audit-Events.png' alt="Amazon SNS - Audit Events" style={{border: '1px solid gray'}} width="800" />

### Amazon SNS - Messages, Notifications  

The **Amazon SNS - Messages, Notifications** dashboard provides insights across metrics by messages, notifications, SMS rates.

Use this dashboard to:
* Monitor details of messages published and message size .
* Monitor details of notifications delivered, failed , filtered out, redriven to dlq and failed to redriven to dlq.
* Get details of SMS success rate and spends.
* Get the details of top topic names by messages published, notifications delivered and notifications failed.
* Compare messages published and message size by today, yesterday, last week.  
* Compare notifications delivered and failed by today, yesterday, last week.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSNS/1.-Amazon-SNS-Messages-Notifications.png' alt="Amazon SNS - Messages, Notifications" style={{border: '1px solid gray'}} width="800" />

### Amazon SNS - Threat Intel  

The **Amazon SNS - Threat Intel** dashboard provides insights across threat locations, count, malicious confidence and details.

**Use this dashboard to**:
* Monitor details of threat locations and count.
* Get details of threats by malicious confidence and malicious IPs.
* Get details of all threats by IPs.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSNS/3.-Amazon-SNS-Threat-Intel.png' alt="Amazon SNS - Threat Intel" style={{border: '1px solid gray'}} width="800" />

### Amazon SNS - Audit Events Details

The **Amazon SNS - Audit Events Details** dashboard provides insights across topics, subscriptions, read only and non read only events.

Use this dashboard to:
* Monitor details of topics created and deleted.
* Get all details of all subscription events.
* Get details of all read only and non read only events.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSNS/4.-Amazon-SNS-Audit-Events-Details.png' alt="Amazon SNS - Audit Events Details" style={{border: '1px solid gray'}} width="800" />

## Create monitors for AWS SNS app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AWS SNS alerts

These alerts are available for the AWS SNS app.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `AWS SNS - Access from Highly Malicious Sources` | This alert fires when an Application AWS - SNS is accessed from highly malicious IP addresses within last 5 minutes. | Count > 0 | Count &lt;= 0 |
| `AWS SNS - Failed Events` | This alert fires when an SNS app has high number of failed events (>5) within last 5 minutes. | Count > 5 | Count &lt;= 5 |
| `AWS SNS - Failed Notifications` | This alert fires where there are many failed notifications (>=5) within an interval of 5 minutes. | Count > 2 | Count &lt;= 2 |
| `AWS SNS - Notification to DLQ` | This alert fires when an SNS topic messages are moved to a dead-letter queue. | Count > 0 | Count &lt;= 0 |
| `AWS SNS - Notification to DLQ Failure` | This alert fires when an SNS topic messages that couldn't be moved to a dead-letter queue. | Count > 0 | Count &lt;= 0 |


## Upgrade/Downgrade the Amazon SNS app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon SNS app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>