---
id: dynamodb
title: Amazon DynamoDB
sidebar_label: Amazon DynamoDB
description: The Sumo Logic app for DynamoDB provides operational insight into your database environment and Dashboards displaying the events, errors, latency, and capacity of your DynamoDB environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/dynamodb.png')} alt="DynamoDB icon" width="50"/>


Amazon DynamoDB is a fast and flexible NoSQL database service that provides consistent, single-digit millisecond latency at any scale. For more details see here.

The Sumo app for Amazon DynamoDB uses both logs and metrics to is a unified logs and metrics app that provides operational insights into your DynamoDB. The app includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and also help you plan the capacity of your DynamoDB instances.

## Log and metric types  

The Sumo Logic app for AWS DynamoDB uses the following logs and metrics:
* [Amazon DynamoDB CloudTrail Logs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/logging-using-cloudtrail.html)
* [Amazon DynamoDB CloudWatch Metrics](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html)

### Sample log messages

<details>
<summary>Sample CloudTrail Log Message</summary>

```json
   {
   "eventVersion":"1.05",
   "userIdentity":{
      "type":"IAMUser",
      "principalId":"AIDAIBF5TU7HNYUE7V676",
      "arn":"arn:aws:iam::568388783903:user/ankit",
      "accountId":"568388783903",
      "accessKeyId":"ASIAI3Q5RU4FIZFHFJZA",
      "userName":"ankit",
      "sessionContext":{
         "attributes":{
            "mfaAuthenticated":"false",
            "creationDate":"2017-10-10T23:01:45+0000"
         }
      },
      "invokedBy":"signin.amazonaws.com"
   },
   "eventTime":"2017-10-10T23:01:45+0000",
   "eventSource":"dynamodb.amazonaws.com",
   "eventName":"DescribeTable",
   "awsRegion":"us-east-1",
   "sourceIPAddress":"38.99.50.98",
   "userAgent":"signin.amazonaws.com",
   "requestParameters":{
      "tableName":"users3"
   },
   "responseElements":null,
   "requestID":"AIFQQ1I27ASKDSAQ4L9L4DTQPVVV4KQNSO5AEMVJF66Q9ASUAAJG",
   "eventID":"f2bec08c-a56a-4f04-be92-0cac7aaabe9b",
   "eventType":"AwsApiCall",
   "apiVersion":"2012-08-10",
   "recipientAccountId":"568388783903"
   }
```
</details>

### Sample queries

```sql title="Successful Request latency by Table Name (Metric based)"
namespace=aws/dynamodb metric=SuccessfulRequestLatency Statistic=Average account=* region=* tablename=*  | sum by account, region, namespace, tablename
```

```sumo title="Top Errors (CloudTrail Log based)"
account=dev namespace=aws/dynamodb region=us-east-1 "\"eventSource\":\"dynamodb.amazonaws.com\"" errorCode errorMessage
| json "eventName", "awsRegion", "requestParameters.tableName", "sourceIPAddress", "userIdentity.userName", "userIdentity.sessionContext.sessionIssuer.userName", "errorCode", "errorMessage" as EventName, Region, tablename, SourceIp, UserName, ContextUserName, ErrorCode, ErrorMessage nodrop
| if (isEmpty(UserName), ContextUserName, UserName) as UserName
| where (tolowercase(tablename) matches tolowercase("kinesistosumologicconnector")) or isBlank(tablename)
| where !isBlank(errorCode)
| count as Count by ErrorCode, ErrorMessage, EventName, UserName, SourceIp
| sort by Count, ErrorCode, ErrorMessage
| limit 20
```

## Collect logs and metrics for Amazon DynamoDB

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Amazon DynamoDB CloudWatch metrics

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

   :::note
   Namespace for **Amazon DynamoDB** service is **AWS/DynamoDB**.
   :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Collect Amazon DynamoDB CloudTrail logs

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
3. Confirm that logs are being delivered to the Amazon S3 bucket.

:::note
Namespace for **Amazon DynamoDB** service is **AWS/DynamoDB**.
:::

Follow the steps below to collect logs for Amazon DynamoDB:
1. Configure a [CloudTrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. Add custom metadata [fields](/docs/manage/fields) with your logs:
   1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
   1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which logs are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and logs can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. After adding fields, check their status indicators:
      * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
      * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
         * You will have the option to automatically add or enable the field.
         * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Centralized AWS CloudTrail log collection

In case you have a centralized collection of CloudTraillogs and are ingesting them from all accounts into a single Sumo Logic CloudTraillog source, create following Field Extraction Rule to map proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.
```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data):
_sourceCategory=aws/observability/cloudtrail/logs
```

#### Parse Expression

Enter a parse expression to create an “account” field that maps to the alias you set for each sub-account. For example, if you used the `“dev”` alias for an AWS account with ID `"528560886094"` and the `“prod”` alias for an AWS account with ID `"567680881046"`, your parse expression would look like this:
```sumo
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Amazon DynamoDB app

Now that you have set up a collection for **Amazon DynamoDB**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-amazon-dynamodb-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name / alias to the AWS account.
- `accountid` AWS account id.
- `region` The region to which the resource name belongs to.
- `namespace` Namespace for Amazon DynamoDB Service is AWS/DynamoDB.
- `tablename` DynamoDB table name.

#### Field Extraction Rule(s)

The FER **AwsObservabilityDynamoDBCloudTrailLogsFER** to extract fields `region`, `namespace`, `tablename`, and `accountid` will be created as a part of app installation.

## Viewing Amazon DynamoDB dashboards

The Sumo Logic AWS Observability DynamoDB Dashboards for AWS DynamoDB provides operational insights into DynamoDB instances. Preconfigured dashboards allow you to monitor key metrics and view the throttle events, errors, and latency. They also help you plan DynamoDB instances' capacity in your environment.

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.


### Overview

The **AWS DynamoDB - Overview** dashboard provides insights across your infrastructure for DynamoDB events, errors, requests, latency, and trends.

Use this dashboard to:
* Monitor average read and write capacity percentages for DynamoDB instances
* Quickly identify system errors, user errors, transaction conflicts, and conditional check fail requests for DynamoDB Monitor overall resource utilization of your DynamoDB instances

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSDynamoDB/1.-AWS-DynamoDB-Overview.png' alt="AWS DynamoDB - Overview" style={{border: '1px solid gray'}} width="800" />


### Capacity Planning

The **AWS DynamoDB - Capacity Planning** dashboard provides insights for DynamoDB read and writes capacity across account allotments, consumed percentages, throttle events, and requests.

Use this dashboard to:
* Monitor DynamoDB tables for throttled read and write requests, along with the type of operation.
* Monitor AWS account level maximum allocations across reading and writing capacities.
* Monitor resource utilization using trend panels for reading and write capacity, throttled read and write requests, as well as read and write throttle events for DynamoDB throughout your infrastructure.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSDynamoDB/1.-AWS-DynamoDB-Capacity-Planning.png' alt="AWS DynamoDB - Capacity Planning" style={{border: '1px solid gray'}} width="800" />

### Latency and Errors

**AWS DynamoDB - Latency and Errors** dashboard provides insights across your infrastructure for DynamoDB errors and latency including failed requests, and latency.

Use this dashboard to:
* Identify high get and put latencies for DynamoDB tables
* Quickly identify the number of conditional checks that fail, and transaction conflicts for DynamoDB
* Monitor resource utilization using trend panels for latencies and errors for DynamoDB

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSDynamoDB/2.-AWS-DynamoDB-Latency-and-Errors.png' alt="AWS DynamoDB - Latency and Errors" style={{border: '1px solid gray'}} width="800" />

### Events

The **AWS DynamoDB - Events** dashboard provides insights across your infrastructure for DynamoDB events including trends, users, errors, updates, creations and deletions to tables.

Use this dashboard to:

* Monitor DynamoDB activities and ensure they are in line with expectations.
* Monitor different types of table events, such as create, update, and describe tables.
* Quickly identify the top DynamoDB related errors
<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSDynamoDB/3.-AWS-DynamoDB-Events.png' alt="AWS DynamoDB - Events" style={{border: '1px solid gray'}} width="800" />

### Threat Intel

The **AWS DynamoDB - Threat Intel** dashboard provides insights across your infrastructure for malicious requests to DynamoDB tables.

Use this dashboard to:

* Identify malicious IPs performing operations on DynamoDB tables using Sumo Logic Threat Intel.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSDynamoDB/4.-AWS-DynamoDB-Threat-Intel.png' alt="AWS DynamoDB - Threat Intel" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Amazon DynamoDB app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Amazon DynamoDB alerts

| Name | Description | Alert Condition | Recover Condition |
|:-----|:------------|:----------------|:--|
| `AWS DynamoDB - High Account Provisioned Read Capacity` | This alert fires when we detect that the average read capacity provisioned for an account for a time interval of 5 minutes is greater than or equal to 80%. | Count > = 80 | Count < 80 |
| `AWS DynamoDB - High Account Provisioned Write Capacity` | This alert fires when we detect that the average write capacity provisioned for an account for a time interval of 5 minutes is greater than or equal to 80%. | Count > = 80 | Count < 80 |
| `AWS DynamoDB - High Max Provisioned Table Read Capacity` | This alert fires when we detect that the average percentage of read provisioned capacity used by the highest read provisioned table of an account for a time interval of 5 minutes is greater than or equal to 80%. | Count > = 80 | Count < 80 |
| `AWS DynamoDB - High Max Provisioned Table Write Capacity` | This alert fires when we detect that the average percentage of write provisioned capacity used by the highest write provisioned table of an account for a time interval of 5 minutes is greater than or equal to 80%. | Count > = 80 | Count < 80 |
| `AWS DynamoDB - High Read Throttle` | This alert fires when we detect that the total read throttle events for a DynamoDB table is high (>5) for a time interval of 5 minutes. | Count > 5 | Count < = 5 |
| `AWS DynamoDB - High Write Throttle` | This alert fires when we detect that the total write throttle events for a DynamoDB table is high (>5) for a time interval of 5 minutes. | Count > 5 | Count < = 5 |
| `AWS DynamoDB - Multiple Tables deleted` | This alert fires when five or more tables are deleted within 15 minutes. | Count > = 5 | Count < 5 |
| `AWS DynamoDB - System Errors` | This alert fires when we detect system errors for a DynamoDB table is high (>10) for a time interval of 5 minutes. | Count > 10 | Count < = 10 |
| `AWS DynamoDB - High Request Latency` | This alert fires when we detect that the average successful request latency for a DynamoDB table is high (>20ms) for a time interval of 5 minutes. High latency indicates potential issues such as hot partitions, oversized items, or degraded table performance. | Count > 20 | Count < = 20 |

## Upgrade/Downgrade the Amazon DynamoDB app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon DynamoDB app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>