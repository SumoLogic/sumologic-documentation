---
id: dynamodb
title: Amazon DynamoDB
sidebar_label: Amazon DynamoDB
description: Amazon DynamoDB
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon DynamoDB is a fast and flexible NoSQL database service that provides consistent, single-digit millisecond latency at any scale. For more details see here.

The Sumo App for Amazon DynamoDB uses both logs and metrics to is a unified logs and metrics App that provides operational insights into your DynamoDB.The App includes Dashboards that allow you to monitor key metrics, view the throttle events, errors, and latency, and also help you plan the capacity of your DynamoDB instances.


## Log and Metric Types  

The AWS DynamoDB app uses the following logs and metrics:

* [DynamoDB CloudWatch Metrics](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html)
* [DynamoDB operations using AWS CloudTrail](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/logging-using-cloudtrail.html)


## Sample CloudTrail Log Message


```
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



## Install the App


## Viewing Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="Aurora MySQL ULM" />
