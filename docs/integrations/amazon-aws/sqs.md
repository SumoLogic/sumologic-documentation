---
id: sqs
title: Amazon SQS
description: The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sqs.png')} alt="SQS icon" width="50"/>

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. The Sumo Logic app for Amazon SQS is a unified logs and metrics (ULM) app that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

## Log and metric types

The Sumo Logic app for Amazon SNS uses the following logs and metrics:
* [Amazon SQS CloudTrail Logs](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-logging-using-cloudtrail.html).
* [Amazon SQS CloudWatch Metrics](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-monitoring-using-cloudwatch.html).

### Sample log messages

<details>
<summary>Sample CloudTrail Log Message</summary>

```json
{
   "eventVersion":"1.08",
   "userIdentity":{
      "type":"IAMUser",
      "principalId":"HN6WE52ULYKOOQWSKPD41",
      "arn":"arn:aws:iam::123456789033:user/ron_di",
      "accountId":"123456789033",
      "accessKeyId":"1AMZ29JHKLK97M7QVQSK",
      "userName":"ron_di",
      "sessionContext":{
        "sessionIssuer":{
        },
        "webIdFederationData":{
        },
         "attributes":{
            "creationDate":"2022-10-19T09:26:18+0000",
            "mfaAuthenticated":"false"
          }
        }
         },
         "eventTime":"2022-10-19T09:26:18+0000",
         "eventSource":"sqs.amazonaws.com",
         "eventName":"SetQueueAttributes",
         "awsRegion":"us-east-1",
         "sourceIPAddress":"195.186.216.125",
         "userAgent":"AWS Internal",
         "requestParameters":{
           "attributes":{
        "Policy":"{\"Version\":\"2008-10-17\",\"Id\":\"__default_policy_ID\",\"Statement\":[{\"Sid\":\"__owner_statement\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"arn:aws:iam::956882708938:root\"},\"Action\":\"SQS:*\",\"Resource\":\"arn:aws:sqs:us-east-1:956882708938:JayanatTest4\"},{\"Sid\":\"topic-subscription-arn:aws:sns:us-east-1:956882708938:SNSAppSomya01\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"*\"},\"Action\":\"SQS:SendMessage\",\"Resource\":\"arn:aws:sqs:us-east-1:956882708938:JayanatTest4\",\"Condition\":{\"ArnLike\":{\"aws:SourceArn\":\"arn:aws:sns:us-east-1:956882708938:SNSAppSomya01\"}}}]}"
      },
      "queueUrl":"https://sqs.us-east-1.amazonaws.com/123456789033/pull_private_submodule_jobs.fifo"
         },
         "responseElements":null,
         "requestID":"635ae9dd-83cc-5b42-890e-b273c168cb35",
         "eventID":"874213f3-d852-481d-bfd1-677c20f97427",
         "readOnly":false,
         "eventType":"AwsApiCall",
         "managementEvent":true,
         "recipientAccountId":"123456789033",
         "eventCategory":"Management",
         "sessionCredentialFromConsole":"true"         
}
```
</details>

### Sample queries

**Messages Received (Metrics-based)**

```sql
metric=NumberOfMessagesReceived Statistic=Sum account=* region=* namespace=* queuename=* | sum by account, region, namespace, queuename
```

**Top 10 users (CloudTrail Log-based)**

```sumo
account=* region=* namespace=aws/sqs eventname eventsource "sqs.amazonaws.com"
| json "userIdentity", "eventSource", "eventName", "awsRegion", "recipientAccountId", "requestParameters", "responseElements", "sourceIPAddress","errorCode", "errorMessage" as userIdentity, event_source, event_name, region, recipient_account_id, requestParameters, responseElements, src_ip, error_code, error_message nodrop
| json field=userIdentity "accountId", "type", "arn", "userName" as accountid, type, arn, username nodrop
| json field=requestParameters "queueUrl" as queueUrlReq nodrop
| json field=responseElements "queueUrl" as queueUrlRes nodrop
| where event_source="sqs.amazonaws.com"
| if(event_name="CreateQueue", queueUrlRes, queueUrlReq) as queueUrl
| parse regex field=queueUrl "(?<queueName>[^\/]*$)"
| where (tolowercase(queuename) matches tolowercase("*")) or isBlank(queuename)
| if (isBlank(recipient_account_id), accountid, recipient_account_id) as accountid
| if (isEmpty(error_code), "Success", "Failure") as event_status
| count as event_count by username
| top 10 username by event_count, username asc
```

## Collecting logs and metrics for Amazon SQS

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Amazon SQS CloudWatch metrics

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

  :::note
  Namespace for **Amazon SNS** service is **AWS/SQS**.
  :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Collect Amazon SQS CloudTrail logs

#### Prerequisites

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
1. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
1. Confirm that logs are being delivered to the Amazon S3 bucket.

  :::note
  Namespace for **Amazon SQS** service is **AWS/SQS**.
  :::

Follow the steps below to collect logs for Amazon SQS:
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

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following **Field Extraction Rule** to map a proper AWS account(s) friendly name/alias. Create it if not already present/update it as required.

* **Rule Name**: AWS Accounts
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: _sourceCategory=aws/observability/cloudtrail/logs

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

## Installing the Amazon SQS app

Now that you have set up collection for Amazon SQS, install the Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name / alias to the AWS account.
- `accountid` AWS account id.
- `region` The region to which the resource name belongs to.
- `namespace` Namespace for Amazon SQS Service is AWS/SQS.
- `queuename` Amazon SQS Service Queue Name.

#### Field Extraction Rule(s)

The FER **AwsObservabilitySQSCloudTrailLogsFER** to extract fields `region`, `namespace`, `accountid`, and `queuename` will be created as a part of app installation.

:::note
As a best practice, **do not delete or modify** any fields, Field Extraction Rules (FERs), or Metric Rules created during the app installation. If you need to make updates, please contact the **Sumo Logic Support** team.
:::

## Viewing Amazon SQS dashboards

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

The Sumo Logic app for Amazon SQS provides operational insights into your Amazon SQS utilization. The app’s preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

:::note
We recommend using the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability).
:::

### Overview

The **1. Amazon SQS - Overview** dashboard provides insights into SQS metrics and CloudTrail audit logs including the age, delayed, visible, sent and deleted messages, size of the messages and information about events.

Use this dashboard to:

* Monitor events by status, type, queues, location and users.
* Monitor number of messages received, sent, deleted and other metrics.
* Monitor message states, queue health, and message lag.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-Overview.png' alt="Amazon SQS Overview" style={{border: '1px solid gray'}} width="800" />

### Queue Stats

The **1. Amazon SQS - Queue Stats** dashboard provides details of SQS queue metrics including the delayed, invisible, deleted, lag, size, received and sent messages. This dashboard contains line chart panels showing trends for all the SQS metrics and a few use cases of them.Use this dashboard to:
* Monitor trend of messages received, sent, deleted and other metrics.
* Monitor message states, queue health and message lag.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-QueueStats.png' alt="1. Amazon SQS - Queue Stats" style={{border: '1px solid gray'}} width="800" />

### Audit Events

The **2. Amazon SQS - Audit Events** dashboard provides the details of SQS from CloudTrail audit logs including the top users, event locations, event status associated with queues. The dashboard has panels regarding successful and failure event locations, error code
Use this dashboard to:
* Monitor events by status, type, queues, location and users.
* Monitor successful, failure event locations and trends.
* Monitor event details by users.
* Monitor successful and error event details.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-AuditEvents.png' alt="2. Amazon SQS - Audit Events" style={{border: '1px solid gray'}} width="800" />

### Threat Intel

The **3. Amazon SQS - Threat Intel** dashboard provides insights into incoming requests to your Amazon SQS services from malicious sources determined via Sumo Logic’s Threat Intel feature. Panels show detailed information on malicious IPs and the malicious confidence of each threat.

Use this dashboard to:
* Monitor details of threat locations and count.
* Get details of threats by malicious confidence and malicious IPs.
* Get details of all threats by IPs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-ThreatIntel.png' alt="3. Amazon SQS - Threat Intel" style={{border: '1px solid gray'}} width="800" />

### Performance Trends

The **1. Amazon SQS - Performance Trends** dashboard provides derived performance insights including true consumer lag, empty receive rate trends, and cross-queue rankings by backlog and message staleness.

Use this dashboard to:
* Monitor true consumer lag by tracking combined visible and delayed messages in the backlog.
* Identify queues with high empty receive rates to optimize polling behavior and reduce costs.
* Rank queues by consumer backlog size to prioritize capacity planning.
* Identify message staleness risks by tracking the age of the oldest message per queue.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-PerformanceTrends.png' alt="1. Amazon SQS - Performance Trends" style={{border: '1px solid gray'}} width="800" />

## Create monitors for AWS SQS app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AWS SQS alerts

These alerts are available for the AWS SQS app.

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `AWS SQS - Access from Highly Malicious Sources` | This alert fires when an Application AWS - SQS is accessed from highly malicious IP addresses within last 5 minutes. | Count > 0 | Count &lt;= 0 |
| `AWS SQS - Message processing not fast enough` | This alert fires when we detect message processing is not fast enough. That is, the average approximate age of the oldest non-deleted message in the queue is more than 5 seconds for an interval of 5 minutes. | Seconds > 5 | Seconds &lt;= 5 |
| `AWS SQS - Messages not processed` | This alert fires when we detect messages that have been received by a consumer, but have not been processed (deleted/failed). That is, the average number of messages that are in flight are >=20 for an interval of 5 minutes. | Count >= 20 | Count &lt; 20 |
| `AWS SQS - Queue has stopped receiving messages` | This alert fires when we detect that the queue has stopped receiving messages. That is, the average number of messages received in the queue &lt;1 for an interval of 30 minutes. | Count &lt; 1 | Count >= 1 |


## Upgrade/Downgrade the Amazon SQS app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon SQS app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>