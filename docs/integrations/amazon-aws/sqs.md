---
id: sqs
title: Amazon SQS
description: The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/sqs.png')} alt="Thumbnail icon" width="50"/>

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

## Log and Metrics Types
The App uses SQS logs and metrics for:
* SQS CloudWatch Metrics. For details, [see here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-monitoring-using-cloudwatch.html).
* SQS operations using AWS CloudTrail. For details, [see here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-logging-using-cloudtrail.html).


### Sample Log Message

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

### Sample Query

**Messages Received (Metrics-based)**:

```sql
metric=NumberOfMessagesReceived Statistic=Sum account=* region=* namespace=* queuename=* | sum by account, region, namespace, queuename
```

**Top 10 users (CloudTrail Log-based)**:

```sql
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

## Collecting Logs and Metrics for the Amazon SQS App

### Collect Metrics for AmazonSQS

Sumo Logic supports collecting metrics using two source types:

1. Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source). (recommended) Or
2. Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics).

:::note
Namespace for **Amazon SQS** Service is **AWS/SQS**
:::

**Metadata**: Add an account field to the source and assign it a value which is a friendly name / alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried via the “account” field.

![Metadata](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/Metadata+account.png)

### Collect Amazon SQS Events using CloudTrail

1. To your Hosted Collector, add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source).
    * **Name**. Enter a name to display for the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your SQS S3 bucket.
    * **Bucket Name**. Enter the exact name of your SQS S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions).
    :::note
    The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    :::
    * **Source Category**. Enter aws/observability/CloudTrail/logs.
    * **Fields**. Add an account field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried via the “account field”.<br/> ![Account Fields](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/Fields.png)
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).
    * **Log File Interval > Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
    * **Enable Timestamp Parsing**. Select the check box.
    * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
    * **Timestamp Format**. Select Automatically detect the format.
    * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.

## Field in Field Schema

Login to Sumo Logic, go to **Manage Data** > **Logs** > **Fields**. Search for the `queuename` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields/#manage-fields).

## Field Extraction Rule(s)
Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

* **Rule Name**: AwsObservabilitySQSCloudTrailLogsFER
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: account=* eventname eventsource "sqs.amazonaws.com"
* **Parse Expression**:

```sql
json "userIdentity", "eventSource", "eventName", "awsRegion", "recipientAccountId", "requestParameters", "responseElements", "sourceIPAddress" as userIdentity, event_source, event_name, region, recipient_account_id, requestParameters, responseElements, src_ip  nodrop
| json field=userIdentity "accountId", "type", "arn", "userName" as accountid, type, arn, username nodrop
| json field=requestParameters "queueUrl" as queueUrlReq nodrop
| json field=responseElements "queueUrl" as queueUrlRes nodrop
| where event_source="sqs.amazonaws.com"
| if(event_name="CreateQueue", queueUrlRes, queueUrlReq) as queueUrl
| parse regex field=queueUrl "(?<queueName>[^\/]*$)"
| if (isBlank(recipient_account_id), accountid, recipient_account_id) as accountid
|! toLowerCase(queuename) as queuename
| "aws/sqs" as namespace
| fields region, namespace, queuename, accountid
```

## Centralized AWS CloudTrail Log Collection
In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following **Field Extraction Rule** to map a proper AWS account(s) friendly name/alias. Create it if not already present/update it as required.

* **Rule Name**: AWS Accounts
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: _sourceCategory=aws/observability/cloudtrail/logs
* **Parse Expression**: Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “dev” alias for an AWS account with ID "528560886094" and the “prod” alias for an AWS account with ID "567680881046", your parse expression would look like:

```sql
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Amazon SQS App

Now that you have set up collection for Amazon SQS, install the Sumo Logic App to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add Integration** and complete the following fields:
   1. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
   2. **Select Folder Location for your App**. Select the location in the library (the default is the Personal folder in the library), or
   3. Click **New Folder** to add a new folder.
3. Click on **Next** and then exit to exit from the app catalog or back to edit name or location.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing Amazon SQS Dashboards

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

The Sumo Logic App for Amazon SQS provides operational insights into your Amazon SQS utilization. The App’s preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.

:::note
We recommend using the [AWS Observability solution Explore View dashboards](/docs/observability/aws/deploy-use-aws-observability/view-dashboards).
:::

### Overview

The **1. Amazon SQS - Overview** dashboard provides insights into SQS metrics and CloudTrail audit logs including the age, delayed, visible, sent and deleted messages, size of the messages and information about events.

Use this dashboard to:

* Monitor events by status, type, queues, location and users.
* Monitor number of messages received, sent, deleted and other metrics.
* Monitor message states, queue health, and message lag.

![1.Amazon SQS Overview](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-Overview.png)


### Queue Stats

The **1. Amazon SQS - Queue Stats** dashboard provides details of SQS queue metrics including the delayed, invisible, deleted, lag, size, received and sent messages. This dashboard contains line chart panels showing trends for all the SQS metrics and a few use cases of them.Use this dashboard to:
* Monitor trend of messages received, sent, deleted and other metrics.
* Monitor message states, queue health and message lag.

![1.Amazon SQS- Queue Stats](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-QueueStats.png)


### Audit Events

The **2. Amazon SQS - Audit Events** dashboard provides the details of SQS from CloudTrail audit logs including the top users, event locations, event status associated with queues. The dashboard has panels regarding successful and failure event locations, error code
Use this dashboard to:
* Monitor events by status, type, queues, location and users.
* Monitor successful, failure event locations and trends.
* Monitor event details by users.
* Monitor successful and error event details.
![2.Amazon SQS Audit Events](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-AuditEvents.png)

### Threat Intel

The **3. Amazon SQS - Threat Intel** dashboard provides insights into incoming requests to your Amazon SQS services from malicious sources determined via Sumo Logic’s Threat Intel feature. Panels show detailed information on malicious IPs and the malicious confidence of each threat.

Use this dashboard to:
* Monitor details of threat locations and count.
* Get details of threats by malicious confidence and malicious IPs.
* Get details of all threats by IPs.
![3.Amazon SQS - Threat Intel](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-SQS/AmazonSQS-ThreatIntel.png)
