---
id: dynamodb
title: Amazon DynamoDB
sidebar_label: Amazon DynamoDB
description: Amazon DynamoDB
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/dynamodb.png')} alt="DB icon" width="50"/>


Amazon DynamoDB is a fast and flexible NoSQL database service that provides consistent, single-digit millisecond latency at any scale. For more details see here.

The Sumo App for Amazon DynamoDB uses both logs and metrics to is a unified logs and metrics App that provides operational insights into your DynamoDB. The App includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and also help you plan the capacity of your DynamoDB instances.


## Log and Metric Types  

The AWS DynamoDB app uses the following logs and metrics:

* [DynamoDB CloudWatch Metrics](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html)
* [DynamoDB operations using AWS CloudTrail](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/logging-using-cloudtrail.html)


## Sample CloudTrail Log Message


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



## Query sample (Metric based)  

**Successful Request latency by Table Name**

```
namespace=aws/dynamodb metric=SuccessfulRequestLatency Statistic=Average account=* region=* tablename=*  | sum by account, region, namespace, tablename
```


### Query sample (CloudTrail Log based)

**Top Errors**


```
account=dev namespace=aws/dynamodb region=us-east-1 "\"eventSource\":\"dynamodb.amazonaws.com\"" errorCode errorMessage
| json "eventName", "awsRegion", "requestParameters.tableName", "sourceIPAddress", "userIdentity.userName", "userIdentity.sessionContext.sessionIssuer.userName", "errorCode", "errorMessage" as EventName, Region, tablename, SourceIp, UserName, ContextUserName, ErrorCode, ErrorMessage nodrop
| if (isEmpty(UserName), ContextUserName, UserName) as UserName
| where (tolowercase(tablename) matches tolowercase("kinesistosumologicconnector")) or isBlank(tablename)
| where !isBlank(errorCode)
| count as Count by ErrorCode, ErrorMessage, EventName, UserName, SourceIp
| sort by Count, ErrorCode, ErrorMessage
| limit 20
```

## Collect Logs and Metrics



## Install the Amazon DynamoDB App

Now that you have set up a collection for **Amazon DynamoDB**, install the Sumo Logic App to use the pre-configured [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SQS/Install-the-Amazon-SQS-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Amazon DynamoDB Dashboards

The Sumo Logic AWS Observability DynamoDB Dashboards for AWS DynamoDB provides operational insights into DynamoDB instances. Preconfigured dashboards allow you to monitor key metrics and view the throttle events, errors, and latency. They also help you plan DynamoDB instances' capacity in your environment.

We highly recommend you view these dashboards in the [Explore View](https://help.sumologic.com/Observability_Solution/AWS_Observability_Solution/01_Deploy_and_Use_AWS_Observability/09_View_AWS_Observability_Solution_Dashboards) of the AWS Observability solution.


### AWS DynamoDB - Overview

The **AWS DynamoDB - Overview** dashboard provides insights across your infrastructure for DynamoDB events, errors, requests, latency, and trends.

Use this dashboard to:

* Monitor average read and write capacity percentages for DynamoDB instances
* Quickly identify system errors, user errors, transaction conflicts, and conditional check fail requests for DynamoDB Monitor overall resource utilization of your DynamoDB instances

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-DynamoDB-Overview.png')} alt="Amazon DynamoDB" />


### AWS DynamoDB - Capacity Planning

The **AWS DynamoDB - Capacity Planning** dashboard provides insights for DynamoDB read and writes capacity across account allotments, consumed percentages, throttle events, and requests.

Use this dashboard to:
* Monitor DynamoDB tables for throttled read and write requests, along with the type of operation.
* Monitor AWS account level maximum allocations across reading and writing capacities.
* Monitor resource utilization using trend panels for reading and write capacity, throttled read and write requests, as well as read and write throttle events for DynamoDB throughout your infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-DynamoDB-Capacity-Planning.png')} alt="Amazon DynamoDB" />

### AWS DynamoDB - Latency and Errors

**AWS DynamoDB - Latency and Errors **dashboard provides insights across your infrastructure for DynamoDB errors and latency including failed requests, and latency.

Use this dashboard to:

* Identify high get and put latencies for DynamoDB tables
* Quickly identify the number of conditional checks that fail, and transaction conflicts for DynamoDB
* Monitor resource utilization using trend panels for latencies and errors for DynamoDB

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-DynamoDB-Latency-and-Errors.png')} alt="Amazon DynamoDB" />

### AWS DynamoDB - Events

The **AWS DynamoDB - Events **dashboard provides insights across your infrastructure for DynamoDB events including trends, users, errors, updates, creations and deletions to tables.

Use this dashboard to:

* Monitor DynamoDB activities and ensure they are in line with expectations.
* Monitor different types of table events, such as create, update, and describe tables.
* Quickly identify the top DynamoDB related errors
<img src={useBaseUrl('img/integrations/amazon-aws/AWS-DynamoDB-Events.png')} alt="Amazon DynamoDB" />

### AWS DynamoDB - Threat Intel

The **AWS DynamoDB - Threat Intel** dashboard provides insights across your infrastructure for malicious requests to DynamoDB tables.

Use this dashboard to:

* Identify malicious IPs performing operations on DynamoDB tables using Sumo Logic Threat Intel.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-DynamoDB-Threat-Intel.png')} alt="Amazon DynamoDB" />
