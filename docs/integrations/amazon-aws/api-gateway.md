---
id: api-gateway
title: AWS API Gateway
sidebar_label: AWS API Gateway
description: AWS API Gateway
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Amazon API Gateway service allows you to create RESTful APIs and WebSocket APIs for real-time two-way communication applications in containerized and serverless environments, as well as web applications.

The Sumo Logic AWS API Gateway App provides insights into API Gateway tasks while accepting and processing concurrent API calls throughout your infrastructure, including traffic management, CORS support, authorization and access control, throttling, monitoring, and API version management.


### Log and Metric Types  

The AWS API Gateway app uses the following logs and metrics

* [Amazon API Gateway metrics](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html)
* [CloudTrail API Gateway Data Event](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events)


### Sample CloudTrail Log Message

```json
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

### Sample Query (Metric-based)

```sql title="Average Latency by API Name"
Namespace=aws/apigateway metric=Latency statistic=Average account=* region=* apiname=* | avg by apiname, namespace, region, account
```


### Sample Query (CloudTrail Log-based)

```sql title="Top Error Codes"
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


## Collecting Logs and Metrics




## Installing the AWS API Gateway App

Now that you have set up a collection for the **AWS API gateway**, install the Sumo Logic App to use the pre-configured [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_SQS/Install-the-Amazon-SQS-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app.
    2. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing AWS API Gateway Dashboards

### Overview

**AWS API Gateway - Overview** dashboard provides insights into API Gateway performance throughout your infrastructure, including API calls, latency, client and server-side errors, API cache hits, and back-end cache misses.

To collect CacheHitCount and CacheMissCount metrics, the API cache should be enabled. Follow the steps below to check if your API cache is enabled.

* On the **AWS console**, Go to **API Gateway Service** and select Specific API -> **Stages**.
* Select Specific **Stage** and go to the **Settings** tab.
* The API should have the "**Enable API Cache**" checkbox enabled to enable API caching and to collect the CacheHitCount and CacheMissCount metrics.

Use this dashboard to:

* Get a high-level overview of your API Gateway infrastructure.
* Compare API requests made today, yesterday, and last week to identify any abnormal deviations in load
* Get quick statistics on the number of requests and frequently used APIs.
* Monitor the number of client-side and server-side errors processed by API Gateway instances.
* Monitor relative, backend, and overall API responsiveness
* Monitor API cache hits and misses by API Gateway across your infrastructure to optimize cache capacities and achieve desired performance.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-API-Gateway-Overview.png')} alt="AWS API Gateway" />



#### Audit Events

**AWS API Gateway - Audit Events** dashboard provides detailed audit insights into API Gateway events by various dimensions including event names, trends, regions, user agents, and recipient account IDs.

Use this dashboard to:

* Monitor all API Gateway-related audit logs available via CloudTrail events
* Monitor incoming user activity locations for both successful and failed events to ensure the activity matches with expectations
* Monitor successful and failed API Gateway events, users and user agents / fail activities, and failure reasons
* Monitor requests coming in from known malicious IP addresses detected via [Sumo Logic Threat Intel](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Threat_Intel_Quick_Analysis/03_Threat-Intel-FAQ)

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-API-Gateway-Audit-Events.png')} alt="AWS API Gateway" />



### Latency and Cache

**AWS API Gateway - Latency, Cache **dashboard provides insights into API Gateway performance including API requests, latency, API cache hits, and back-end cache misses.

Use this dashboard to:
* Monitor the overall responsiveness of API calls (latency), comparing times (in milliseconds) between receiving a request from and returning a response to a client.
* Monitor the responsiveness of the backend (integration latency), comparing times (in milliseconds) between API Gateway relay requests to and receiving a response back from the backend.
* Monitor API cache hits and misses to optimize cache capacities across your infrastructure and achieve desired performance.
* Compare API requests made today, yesterday, and last week to identify any abnormal deviations.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-API-Gateway-Latency-Cache.png')} alt="AWS API Gateway" />


### 4xx and 5xx Errors

**AWS API Gateway - 4xx and 5xx Errors **dashboard provides insights into API Gateway HTTP 4xx and 5xx code errors throughout your infrastructure, including API requests, client-side errors, and server-side errors.

Use this dashboard to:

* Monitor the total number of client-side errors based on API name and region across your infrastructure.
* Monitor the total number of server-side errors based on API name and region across your infrastructure.
* Compare API requests made today, yesterday, and last week to identify any abnormal deviations.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-API-Gateway-4XX-and-5XX-Errors.png')} alt="AWS API Gateway" />


### Enhanced Monitoring
**AWS API Gateway - Enhanced Monitoring** dashboard provides detailed insights into API Gateway performance throughout your infrastructure, including the number and types of API calls, API resources, cache hits, and misses, latency averages, and errors by HTTP method.

For your API Gateway instance to send enhanced metrics, you must have explicitly enabled detailed CloudWatch metrics. You can do this in the AWS management console under a Stage settings tab by selecting Enable CloudWatch Metrics. Alternatively, you can call the update-stage AWS CLI command to update the metrics enabled property to True.

Use this dashboard to:
* Monitor API Gateways across your infrastructure using enhanced metrics.
* Monitor API requests trend by resource, HTTP method, and deployment stage.
* Monitor API cache hits and misses to optimize cache capacities to achieve desired performance.
* Monitor the overall responsiveness of API calls and the backend origin servers
* Monitor the total number of client-side and server-side errors based on HTTP methods

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-API-Gateway-Enhanced-Monitoring.png')} alt="AWS API Gateway" />
