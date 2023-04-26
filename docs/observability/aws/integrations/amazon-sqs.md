---
id: amazon-sqs
title: Amazon SQS
description: The Sumo Logic App for Amazon SQS is a unified logs and metrics (ULM) App that provides operational insights into your Amazon SQS utilization. The preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

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

**Messages Received (Metric based)**:

```
metric=NumberOfMessagesReceived Statistic=Sum account=* region=* namespace=* queuename=* | sum by account, region, namespace, queuename
```

**Top 10 users (CloudTrail Log based)**:

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

## Field in Field Schema

Log in to Sumo Logic, go to **Manage Data** > **Logs** > **Fields**. Search for the “queuename” field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields/#manage-fields).

## Field Extraction Rule(s)

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

* **Rule Name**: AwsObservabilitySQSCloudTrailLogsFER
* **Applied at**: Ingest Time
* **Scope (Specific Data)**: account=* eventname eventsource "sqs.amazonaws.com"
* **Parse Expression**:

```sql
| json "userIdentity", "eventSource", "eventName", "awsRegion", "recipientAccountId", "requestParameters", "responseElements", "sourceIPAddress" as userIdentity, event_source, event_name, region, recipient_account_id, requestParameters, responseElements, src_ip  nodrop
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

## Viewing Amazon SQS Dashboards

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications.

The Sumo Logic App for Amazon SQS provides operational insights into your Amazon SQS utilization. The App’s preconfigured dashboards help you monitor the key metrics, view the SQS events for queue activities, and help you plan the capacity of your SQS service utilization.


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
