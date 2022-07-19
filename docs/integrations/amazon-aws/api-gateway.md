---
id: api-gateway
title: AWS API Gateway
sidebar_label: AWS API Gateway
description: AWS API Gateway
---

Amazon API Gateway service allows you to create RESTful APIs and WebSocket APIs for real-time two-way communication applications in containerized and serverless environments, as well as web applications.

The Sumo Logic AWS API Gateway App provides insights into API Gateway tasks while accepting and processing concurrent API calls throughout your infrastructure, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management.


### Log and Metric Types  

The AWS API Gateway app uses the following logs and metrics

* [Amazon API Gateway metrics](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html)
* [CloudTrail API Gateway Data Event](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events)


### Sample CloudTrail Log Message


```
{"eventVersion":"1.05","userIdentity":{"type":"IAMUser","principalId":"A12445W32RZN24HABCD12",
"arn":"arn:aws:iam::123408221234:user/bob","accountId":"123408221234","accessKeyId":
"ASIAZ123456Y3IMWK7X5","userName":"bob","sessionContext":{"sessionIssuer":{},"webIdFederationData":
{},"attributes":{"mfaAuthenticated":"true","creationDate":"2020-02-17T08:08:01Z"}},"invokedBy":
"signin.amazonaws.com"},"eventTime":"2020-02-17T08:08:01Z","eventSource":"apigateway.amazonaws.com",
"eventName":"GetRestApi","awsRegion":"us-east-1","sourceIPAddress":"149.236.17.11","userAgent":
"signin.amazonaws.com","requestParameters":{"restApiId":"w1234nsgjxf","template":false},
"responseElements":null,"requestID":"1234169e-e70a-44a1-a691-3cd3f857092a","eventID":
"051572b0-83ef-49a3-82f6-bbef1ac8c488","readOnly":true,"eventType":"AwsApiCall","recipientAccountId":
"123408221234"}
```

### Query sample (Metric based)

**Average Latency by API Name**

```
Namespace=aws/apigateway metric=Latency statistic=Average account=* region=* apiname=* | avg by apiname, namespace, region, account
```


#### Query sample (CloudTrail Log based)

**Top Error Codes**


```
"\"eventSource\":\"apigateway.amazonaws.com\"" errorCode account=dev Namespace=aws/apigateway region=us-east-1
| json "eventName", "eventSource", "awsRegion", "userAgent", "recipientAccountId", "userIdentity", "requestParameters", "responseElements", "sourceIPAddress", "errorCode", "errorMessage", "requestID" as event_name, event_source, Region, user_agent, accountId1, userIdentity, requestParameters, responseElements, src_ip, errorCode, errorMessage, requestID nodrop
| where event_source = "apigateway.amazonaws.com" and !isEmpty(errorCode)
| json field=userIdentity "accountId", "arn", "userName", "type" as accountId2, arn, username, type nodrop | parse field=arn ":assumed-role/*" as user nodrop | parse field=arn "arn:aws:iam::*:*" as accountId, user nodrop
| json field=requestParameters "basePath", "domainName" as basePath, domainName nodrop | json field=responseElements "name" as ApiName nodrop // CreateRestApi, CreateApiKey, CreateUsagePlan, CreateUsagePlanKey, CreateUsagePlanKey, ImportApi, ImportRestApi, UpdateRestApi, UpdateUsagePlan provides ApiName
| where (tolowercase(ApiName) matches tolowercase("*")) or isBlank(apiname)
| if (isEmpty(errorCode), "Success", "Failure") as eventStatus
| if (!isEmpty(accountId1), accountId1, accountId2) as accountId
| if (isEmpty(userName), user, userName) as user
| count as eventCount by errorCode
| top 10 errorCode by eventCount, errorCode asc
```


## Collect Logs and Metrics

## Install the App
