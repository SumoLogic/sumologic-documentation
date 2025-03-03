---
id: application-load-balancer
title: AWS Application Load Balancer
description: The Sumo Logic app for AWS Elastic Load Balancing ULM - Application is a unified logs and metrics (ULM) app that gives you visibility into the health of your Application Load Balancer and target groups.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/alb.png')} alt="Thumbnail icon" width="50"/>

The AWS Application Load Balancer functions at the application layer, receives requests, evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group.

The Sumo Logic app for AWS Application Load Balancing uses logs and metrics to give you visibility into the health of your Application Load Balancer and target groups. Use the pre-configured dashboards to understand the latency, request and host status, threat intel, and HTTP backend codes by availability zone and target group.

## Log types

This app uses:
* The metrics are included in the AWS/Application ELB namespace. For more details, see [here](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/elb-metricscollected.html#load-balancer-metrics-alb).
* The [Application Load Balancer Access](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) Log introduces two new fields in addition to the fields contained in the Classic ELB Access log:
    * `Type`. This is the type of request or connection (HTTP, HTTPS, H2, ws, wss).
    * `target_group_arn`. This is the Amazon Resource Name (ARN) of the target group.
* The logs are stored in a .gzip format in the specified S3 bucket and contain these fields in this order:
```bash
timestamp, elb, client:port, target:port, \
request_processing_time, target_processing_time, \
response_processing_time, elb_status_code, \
target_status_code, received_bytes, sent_bytes, \
request, user_agent, ssl_cipher, ssl_protocol, \
target_group_arn, trace_id
```

The log format is described in [AWS Application Load Balancer Access Log Collection](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html). For details on AWS Application Load Balancing metrics, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html).

## Metrics Type

For details on the metrics of AWS Application Load Balancing, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html).

### Sample log message

```json
https 2017-11-20T22:05:36 long-bill-lb 77.222.19.149:41148 10.168.203.134:23662 0.000201 0.401924 0.772005 500 200 262 455 "GET https://elmagek.no-ip.org:443/json/v1/collector/histogram/100105037?startTimestamp=1405571270000&endTimestamp=1405574870000&bucketCount=60&_=1405574870206 HTTP/1.1" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.0.4) Gecko/2008102920 Firefox/3.0.4" DH-RSA-AES256-GCM-SHA384 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:104030218370:targetgroup/Prod-frontend/92e3199b1rc814fe9 "Root=1-58337364-23a8c76965a2ef7629b185e134"
```

### Sample queries

```sql title="Access-Log-Based"
account="account" region="region" namespace="AWS/ApplicationELB"
| parse "* * * * * * * * * * * * \"*\" \"*\" * * * \"*\"" as Type, DateTime, loadbalancer, Client, Target, RequestProcessingTime, TargetProcessingTime, ResponseProcessingTime, ElbStatusCode, TargetStatusCode, ReceivedBytes, SentBytes, Request, UserAgent, SslCipher, SslProtocol, TargetGroupArn, TraceId
| where tolowercase(loadbalancer) matches tolowercase("{{loadbalancer}}")
| parse field=Request "* *://*:*/* HTTP" as Method, Protocol, Domain, ServerPort, URI nodrop
| parse field=TargetGroupArn "arn:aws:elasticloadbalancing:*:*:*" as AwsRegion, AccountId, TargetGroup nodrop
| if (TargetStatusCode matches "5*",1,0) as Target_5XX
| if (TargetStatusCode matches "4*",1,0) as Target_4XX
| if (TargetStatusCode matches "3*",1,0) as Target_3XX
| if (TargetStatusCode matches "2*",1,0) as Target_2XX
| sum(Target_5XX) as Target_5XX, sum(Target_4XX) as Target_4XX, sum(Target_3XX) as Target_3XX, sum(Target_2XX) as Target_2XX by loadbalancer, TargetGroup, Domain, URI
| limit 20
| sort by Target_5XX, Target_4XX, Target_3XX, Target_2XX
```

```bash title="Metric-based"
account="account" region="region" Namespace="AWS/ApplicationELB" loadbalancer="loadbalancer" AvailabilityZone=* TargetGroup=* metric=HTTPCode_Target_5XX_Count Statistic=Sum | parse field= TargetGroup */* as Unused, TargetGroup | sum by account, region, namespace, loadbalancer, TargetGroup, AvailabilityZone
```

## Collecting logs and metrics for the AWS Application Load Balancer
When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect metrics

1. Sumo Logic supports collecting metrics using two source types:
   * Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (recommended); or
   * Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)
1. **Metadata**. Click the **+Add Field** link to add custom log metadata [fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. 
   1. Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. Keep in mind:
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

### Collect access logs

#### Prerequisites

Before you begin to use the AWS Elastic Load Balancing (ELB) Application app, complete the following steps:
1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Enable Application Load Balancer logging](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) in AWS.
3. Confirm that logs are being delivered to the Amazon S3 bucket.

#### Collecting access Logs for AWS Application Load Balancer

1. Configure a Application Load Balancing (ALB) [Access Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-sources/#create-an-aws-source).
1.  **Metadata**. Click the **+Add Field** link to add custom log metadata [fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. The following **Fields** are to be added in the source:
    1. Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    1. Add a **region** field and assign it the value of respective AWS region where the Load Balancer exists.
    1. Add an **accountId** field and assign it the value of the respective AWS account id which is being used.
    1. Keep in mind:
       * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
       * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

### Collect Cloudtrail logs

1. Configure a Application Load Balancing (ALB) [Cloudtrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. **Metadata**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value.
    1. Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    1. Keep in mind:
       * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
       * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

:::note
Namespace for AWS Application Load Balancer Service is AWS/ApplicationELB.
:::

## Field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the `loadbalancer` field.
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).

## Field Extraction Rule(s)

Create Field Extraction Rule (FER) for AWS Application Load Balancer access logs and Cloudtrail logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

**AWS Application Load Balancer access logs**

```sql
Rule Name: AwsObservabilityAlbAccessLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* (http or https or h2 or grpcs or ws or wss)
```

```sql title="Parse Expression"
parse "* * * * * * * * * * * * \"*\" \"*\" * * * \"*\"" as Type, DateTime, loadbalancer, Client, Target, RequestProcessingTime, TargetProcessingTime, ResponseProcessingTime, ElbStatusCode, TargetStatusCode, ReceivedBytes, SentBytes, Request, UserAgent, SslCipher, SslProtocol, TargetGroupArn, TraceId | tolowercase(loadbalancer) as loadbalancer | fields loadbalancer
```

**AWS Application Load Balancer CloudTrail logs**

```sql
Rule Name: AwsObservabilityALBCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventSource eventName "elasticloadbalancing.amazonaws.com" "2015-12-01"
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "recipientAccountId", "requestParameters.name", "requestParameters.type", "requestParameters.loadBalancerArn", "apiVersion" as event_source, region, accountid, loadbalancer, loadbalancertype, loadbalancerarn, api_version nodrop 
|"" as namespace
| where event_source = "elasticloadbalancing.amazonaws.com" and api_version matches "2015-12-01" 
| parse field=loadbalancerarn ":loadbalancer/*/*/*" as balancertype, loadbalancer, f1 nodrop
| if(loadbalancertype matches "network", "aws/nlb", if(balancertype matches "net", "aws/nlb", namespace)) as namespace
| if(loadbalancertype matches "application", "aws/applicationelb", if(balancertype matches "app", "aws/applicationelb", namespace)) as namespace
| where namespace="aws/applicationelb" or isEmpty(namespace)
| toLowerCase(loadbalancer) as loadbalancer  
| fields region, namespace, loadbalancer, accountid
```

## Installing the AWS Application Load Balancer app

Now that you have set up collection for AWS Application Load Balancer, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing AWS Application Load Balancer dashboards

### Overview

The **AWS Application Load Balancer - Overview** dashboard provides visibility into the health of your Application Load Balancer and target groups, with at-a-glance views of latency, request and host status, requests from malicious sources, and HTTP backend codes.

Use this dashboard to:
* Monitor requests to each load balancer to ensure the load is being distributed as desired.
* Quickly identify healthy and unhealthy hosts.
* Monitor trends for load balancers errors, 4XX, and 5XX errors, as well as healthy and unhealthy hosts.
* Monitor the current state across all load balancers through active connections, new connections, target connection errors, and rejected connections.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load-Balancer-Overview.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Response Analysis

The **AWS Application Load Balancer - Response Analysis** dashboard provides insights into how your load balancers are responding to clients.

Use this dashboard to:
* Monitor incoming client locations for all 5XX, 4XX, and 3XX error responses.
* Quickly correlate error responses using load balancer access logs and AWS CloudWatch metrics to determine the possible cause for failures and decide corrective actions.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Response_Analysis.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Target Group Response Analysis

The **AWS Application Load Balancer - Target Group Response Analysis** dashboard provides insights into how various target groups are responding to client requests.

Use this dashboard to:
* Monitor trends of all response codes for your target groups by LoadBalancer, Target Group, and availability zones.
* Correlate response code trends across load balancer access logs and CloudWatch metrics to determine the root cause for failures.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Target_Group_Response_Analysis.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Latency Overview

The **AWS Application Load Balancer - Latency Overview** dashboard provides insights into response times for load balancers, target groups, and availability zones, including backend log response times.

Use this dashboard to:
* Monitor response times by load balancer, target group, and availability zone.
* Monitor client latency and processing times for target groups.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Latency_Overview.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Latency Details

The **AWS Application Load Balancer - Latency Details** dashboard provides insights into client latency by domain and ELB server, as well as processing times by ELB server and target groups throughout your infrastructure.

Use this dashboard to:
* Troubleshoot load balancer performance through detailed views across client, request processing, and response time latencies.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Latency_Details.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Connection and Host Status

The **AWS Application Load Balancer - Connection and Host Status** dashboard provides insights into active and rejected connections, target connection errors, and healthy and unhealthy hosts.

Use this dashboard to:
* Monitor active connections, new connections, rejected connections, and connection errors for the load balancer.
* Monitor healthy and unhealthy host counts by the load balancer, target group, and availability zone across your infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Connections_and_Host_Status.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Requests and Processed Bytes

The **AWS Application Load Balancer - Requests and Processed Bytes** dashboard provides insights into client requests, network traffic, and processed data.

Use this dashboard to:
* Monitor client request load, network traffic, and processed bytes to determine how to best configure load balancers for optimal performance.
* Determine how to best allocate backend resources and target groups based on load.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Requests_and_Processed_Bytes.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### Threat Intel

The **AWS Application Load Balancer - Threat Intel** dashboard provides insights into incoming requests from malicious sources determined through [Sumo Logic’s Threat Intel feature](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#threat-intel-faq). Panels show detailed information on malicious IPs and the malicious confidence of each threat.

Use this dashboard to:
* Identify known malicious IPs that access your load-balancers and use firewall access control lists to prevent them from sending you traffic going forward.
* Monitor the malicious confidence level for all incoming malicious IP addresses the threats.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Threat_Intel.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>

### CloudTrail Audit

The **AWS Application Load Balancer - CloudTrail Audit** dashboard provides a comprehensive overview of AWS Application Load Balancer activities through CloudTrail audit logs. It visualizes successful and failed events globally, event trends, error details, and user activities, offering insights into load balancer performance, security, and usage patterns.

Use this dashboard to:
* Monitor the geographical distribution of successful and failed load balancer events, allowing for quick identification of regions with high activity or potential issues.
* Track the overall success rate of load balancer events and analyze trends over time, helping to identify any sudden changes or patterns in performance.
* Investigate specific error events, including their details, frequency, and associated users, enabling faster troubleshooting and resolution of issues.
* Identify the most common error types and the users experiencing the highest failure rates, facilitating targeted improvements and user support.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load-Balancer-CloudTrail-Audit.png')} alt="AWS Application Load Balancer dashboard" style={{border: '1px solid gray'}} width="800"/>
