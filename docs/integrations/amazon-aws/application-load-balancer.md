---
id: application-load-balancer
title: AWS Application Load Balancer
description: The Sumo Logic App for AWS Elastic Load Balancing ULM - Application is a unified logs and metrics (ULM) App that gives you visibility into the health of your Application Load Balancer and target groups.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/alb.png')} alt="Thumbnail icon" width="50"/>

The AWS Application Load Balancer functions at the application layer, receives requests, evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group.

The Sumo Logic App for AWS Application Load Balancing uses logs and metrics to give you visibility into the health of your Application Load Balancer and target groups. Use the pre-configured dashboards to understand the latency, request and host status, threat intel, and HTTP backend codes by availability zone and target group.

## Log Types

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

### Sample Log message

```json
https 2017-11-20T22:05:36 long-bill-lb 77.222.19.149:41148 10.168.203.134:23662 0.000201 0.401924 0.772005 500 200 262 455 "GET https://elmagek.no-ip.org:443/json/v1/collector/histogram/100105037?startTimestamp=1405571270000&endTimestamp=1405574870000&bucketCount=60&_=1405574870206 HTTP/1.1" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.0.4) Gecko/2008102920 Firefox/3.0.4" DH-RSA-AES256-GCM-SHA384 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:104030218370:targetgroup/Prod-frontend/92e3199b1rc814fe9 "Root=1-58337364-23a8c76965a2ef7629b185e134"
```

### Sample Queries

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

## Collecting Logs and Metrics for the AWS Application Load Balancer

### Collecting Metrics

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended)
	Or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

:::note
Namespace for AWS Application Load Balancer Service is AWS/ApplicationELB.
:::

* **Metadata**. Add an **account** field to the source and assign it a value which is a friendly name or alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried through the “account field”.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" />

### Collecting Access Logs

#### Before you begin

Before you begin to use the AWS Elastic Load Balancing (ELB) Application app, complete the following steps:
1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Enable Application Load Balancer logging](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) in AWS.
3. Confirm that logs are being delivered to the Amazon S3 bucket.

#### Configure a Collector

Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

#### Configure an ELB Source

{@import ../../reuse/apps/create-aws-s3-source.md}

### Field in Field Schema

Login to Sumo Logic, goto **Manage Data > Logs > Fields**. Search for the `loadbalancer` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).

### Field Extraction Rule(s)

Create Field Extraction Rule for AWS Application Load Balancer Access Logs. Learn how to create Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
Rule Name: AwsObservabilityAlbAccessLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* (http or https or h2 or grpcs or ws or wss)
```

```sql title="Parse Expression"
parse "* * * * * * * * * * * * \"*\" \"*\" * * * \"*\"" as Type, DateTime, loadbalancer, Client, Target, RequestProcessingTime, TargetProcessingTime, ResponseProcessingTime, ElbStatusCode, TargetStatusCode, ReceivedBytes, SentBytes, Request, UserAgent, SslCipher, SslProtocol, TargetGroupArn, TraceId | tolowercase(loadbalancer) as loadbalancer | fields loadbalancer
```

## Installing the AWS Application Load Balancer App

Now that you have set up collection for AWS Application Load Balancer, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
    * **App Name**. You can retain the existing name, or enter a name of your choice for the app.
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    * Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing AWS Application Load Balancer Dashboards

### Overview

The **AWS Application Load Balancer - Overview** dashboard provides visibility into the health of your Application Load Balancer and target groups, with at-a-glance views of latency, request and host status, requests from malicious sources, and HTTP backend codes.

Use this dashboard to:
* Monitor requests to each load balancer to ensure the load is being distributed as desired.
* Quickly identify healthy and unhealthy hosts.
* Monitor trends for load balancers errors, 4XX, and 5XX errors, as well as healthy and unhealthy hosts.
* Monitor the current state across all load balancers through active connections, new connections, target connection errors, and rejected connections.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load-Balancer-Overview.png')} alt="AWS Application Load Balancer" />

### Response Analysis

The **AWS Application Load Balancer - Response Analysis** dashboard provides insights into how your load balancers are responding to clients.

Use this dashboard to:
* Monitor incoming client locations for all 5XX, 4XX, and 3XX error responses.
* Quickly correlate error responses using load balancer access logs and AWS CloudWatch metrics to determine the possible cause for failures and decide corrective actions.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Response_Analysis.png')} alt="AWS Application Load Balancer" />

### Target Group Response Analysis

The **AWS Application Load Balancer - Target Group Response Analysis** dashboard provides insights into how various target groups are responding to client requests.

Use this dashboard to:
* Monitor trends of all response codes for your target groups by LoadBalancer, Target Group, and availability zones.
* Correlate response code trends across load balancer access logs and CloudWatch metrics to determine the root cause for failures.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Target_Group_Response_Analysis.png')} alt="AWS Application Load Balancer" />

### Latency Overview

The **AWS Application Load Balancer - Latency Overview** dashboard provides insights into response times for load balancers, target groups, and availability zones, including backend log response times.

Use this dashboard to:
* Monitor response times by load balancer, target group, and availability zone.
* Monitor client latency and processing times for target groups.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Latency_Overview.png')} alt="AWS Application Load Balancer" />

### Latency Details

The **AWS Application Load Balancer - Latency Details** dashboard provides insights into client latency by domain and ELB server, as well as processing times by ELB server and target groups throughout your infrastructure.

Use this dashboard to:
* Troubleshoot load balancer performance through detailed views across client, request processing, and response time latencies.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Latency_Details.png')} alt="AWS Application Load Balancer" />

### Connection and Host Status

The **AWS Application Load Balancer - Connection and Host Status** dashboard provides insights into active and rejected connections, target connection errors, and healthy and unhealthy hosts.

Use this dashboard to:
* Monitor active connections, new connections, rejected connections, and connection errors for the load balancer.
* Monitor healthy and unhealthy host counts by the load balancer, target group, and availability zone across your infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application-Load_Balancer-Connections_and_Host_Status.png')} alt="AWS Application Load Balancer" />

### Requests and Processed Bytes

The **AWS Application Load Balancer - Requests and Processed Bytes** dashboard provides insights into client requests, network traffic, and processed data.

Use this dashboard to:
* Monitor client request load, network traffic, and processed bytes to determine how to best configure load balancers for optimal performance.
* Determine how to best allocate backend resources and target groups based on load.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Requests_and_Processed_Bytes.png')} alt="AWS Application Load Balancer" />

### Threat Intel

The **AWS Application Load Balancer - Threat Intel** dashboard provides insights into incoming requests from malicious sources determined through [Sumo Logic’s Threat Intel feature](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ). Panels show detailed information on malicious IPs and the malicious confidence of each threat.

Use this dashboard to:
* Identify known malicious IPs that access your load-balancers and use firewall access control lists to prevent them from sending you traffic going forward.
* Monitor the malicious confidence level for all incoming malicious IP addresses the threats.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Application_Load_Balancer-Threat_Intel.png')} alt="AWS Application Load Balancer" />
