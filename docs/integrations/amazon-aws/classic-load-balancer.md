---
id: classic-load-balancer
title: AWS Classic Load Balancer
description: The Sumo Logic app for AWS Elastic Load Balancing Classic is a unified logs and metrics (ULM) app which helps you monitor the classic load balancer.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/clb.png')} alt="Thumbnail icon" width="50"/>

AWS Elastic Load Balancer Classic distributes the incoming application traffic across multiple EC2 instances in multiple Availability Zones.

The Sumo Logic app for AWS Elastic Load Balancer Classic is a unified logs and metrics App that helps you monitor the classic load balancer. The preconfigured dashboards provide information on the latency, HTTP backend codes, requests, and host status, that help you investigate the issues in the load balancer.

## Log and metric types

ELB logs are stored as *.log files in the buckets you specify when you enable logging. The process to enable collection for these logs is described in [AWS ELB Enable Access Logs](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html).

The logs themselves contain these fields in this order:
```bash
datetime, ELB_Server, clientIP, port, backend, backend_port, requestProc, ba_Response, cli_Response, ELB_StatusCode, be_StatusCode, rcvd, send, method, protocol, domain, server_port, path
```

The log format is described in [AWS ELB Access Log Collection](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html).

For details on AWS Classic Load Balancer metrics, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html).


### Sample access log message

```json
2017-11-06T23:20:38 stag-www-lb 250.38.201.246:56658 10.168.203.134:23662 0.007731 0.214433 0.000261 404 200 3194 123279 \
"GET https://stag-www.sumologic.net:443/json/v2/searchquery/3E7959EC4BA8AAC5/messages/raw?offset=29&length=15&highlight=true&_=1405591692470 HTTP/1.1" \
"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0" \
ECDHE-RSA-CAMELLIA256-SHA384 TLSv1.2
```


### Sample queries

```sql title="Response Codes Distribution by Domain and URI (Access Log Based)"
account={{account}} region={{region}} namespace={{namespace}}
| parse "* * * * * * * * * * * \"*\" \"*\" * *" as datetime, loadbalancername, client, backend, request_processing_time, backend_processing_time, response_processing_time, elb_status_code, backend_status_code, received_bytes, sent_bytes, request, user_agent, ssl_cipher, ssl_protocol
| where tolowercase(loadbalancername) matches tolowercase("{{loadbalancername}}")
| parse field=request "* *://*:*/* HTTP" as Method, Protocol, Domain, ServerPort, URI nodrop
| parse field=client "*:*" as clientIP, port nodrop
| parse field=backend "*:*" as backendIP, backend_port nodrop
| fields - request, client, backend
| if (backend_status_code matches "5*",1,0) as Backend_5XX
| if (backend_status_code matches "4*",1,0) as Backend_4XX
| if (backend_status_code matches "3*",1,0) as Backend_3XX
| if (backend_status_code matches "2*",1,0) as Backend_2XX
| sum(Backend_5XX) as Backend_5XX, sum(Backend_4XX) as Backend_4XX, sum(Backend_3XX) as Backend_3XX, sum(Backend_2XX) as Backend_2XX by loadbalancername, Domain, URI
| limit 20
| sort by Backend_5XX, Backend_4XX, Backend_3XX, Backend_2XX
```


```bash title="4XX by Load Balancer (Metrics-based)"
account={{account}} region={{region}} Namespace={{namespace}} \
loadbalancername={{loadbalancername}} metric=HTTPCode_ELB_4XX \
Statistic=Sum | sum by account, region, namespace, loadbalancername
```

## Collecting logs and metrics for the AWS Classic Load Balancer

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Metrics

Sumo Logic supports collecting metrics using two source types:
* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* **Metadata**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. The following **Fields** are to be added in the source:
    * Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" />
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

### Collect Access Logs
#### Prerequisites

Before you can begin to use the AWS Classic Load Balancing (ELB) App, complete the following steps:

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Enable Application Load Balancer logging](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) in AWS.
3. Confirm that logs are being delivered to the Amazon S3 bucket.

#### Collecting Access Logs for AWS Classic Load Balancer

* Configure a Classic Load Balancing (CLB) [Access Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-sources/#create-an-aws-source).

* **Metadata**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. The following **Fields** are to be added in the source:
    * Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    * Add a **region** field and assign it the value of respective AWS region where the Load Balancer exists.
    * Add an **accountId** field and assign it the value of the respective AWS account id which is being used.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

### Collect Cloudtrail Logs

* Configure a Classic Load Balancing (CLB) [Cloudtrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).

* **Metadata**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. The following **Fields** are to be added in the source:
    * Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

:::note
Namespace for **AWS Classic Load Balancer** Service is **AWS/ELB**.
:::

## Field in Field Schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the **loadbalancername** field. 
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

## Field Extraction Rule(s)

Create Field Extraction Rule for AWS Classic Load Balancer access logs and Cloudtrail logs. Learn how to create Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

**AWS Classic Load Balancer Access Logs**

```sql 
Rule Name: AwsObservabilityElbAccessLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* _sourceCategory=aws/observability/clb/logs
```
```sql title="Parse Expression"
| parse "* * * * * * * * * * * \"*\" \"*\" * *" as datetime, loadbalancername, client, backend, request_processing_time, backend_processing_time, response_processing_time, elb_status_code, backend_status_code, received_bytes, sent_bytes, request, user_agent, ssl_cipher, ssl_protocol
| parse regex field=datetime "(?<datetimevalue>\d{0,4}-\d{0,2}-\d{0,2}T\d{0,2}:\d{0,2}:\d{0,2}\.\d+Z)"
| where !isBlank(loadbalancername) and !isBlank(datetimevalue)
| "aws/elb" as namespace
| tolowercase(loadbalancername) as loadbalancername
| fields loadbalancername, namespace
```

**AWS Classic Load Balancer CloudTrail Logs**

```sql
Rule Name: AwsObservabilityCLBCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventSource eventName "elasticloadbalancing.amazonaws.com" "2012-06-01"
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "recipientAccountId", "requestParameters.loadBalancerName" as event_source, region, accountid, loadbalancername nodrop 
| where event_source = "elasticloadbalancing.amazonaws.com"
| toLowerCase(loadbalancername) as loadbalancername 
| "aws/elb" as namespace 
| fields region, namespace, loadbalancername, accountid
```

## Install the AWS Classic Load Balancer app

Now that you have set up a collection for AWS Classic Load Balancer, install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing the AWS Classic Load Balancer dashboards

### Overview

The **AWS Classic Load Balancer - Overview** dashboard provides visibility into the health of your Classic Load Balancer, with at-a-glance views of latency, request and host status, requests from malicious sources, and HTTP backend codes.

Use this dashboard to:
* Monitor requests to each load balancer to ensure the load is being distributed as desired.
* Monitor trends for load balancers errors, 4xx and 5xx errors, as well as healthy and unhealthy hosts.
* Monitor the current state across all load balancers via active connections, new connections, backend connection errors, and rejected connections.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Overview.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />


### Response Analysis

The **AWS Classic Load Balancer - Response Analysis** dashboard provides insights into how your load balancers respond to clients.

Use this dashboard to:
* Monitor incoming client locations for all 5XX, 4XX, and 3XX error responses.
* Quickly correlate error responses using load balancer access logs and AWS CloudWatch metrics to determine the possible cause for failures and decide corrective actions.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Response-Analysis.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />


### Backend Response Analysis

The **AWS Classic Load Balancer - Backend Response Analysis** dashboard provides insights into how various backend servers respond to client requests.

Use this dashboard to:
* Monitor trends of all response codes for your backend servers by LoadBalancer and availability zones.
* Correlate response code trends across load balancer access logs and CloudWatch metrics to determine the root cause for failures.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Backend-Response-Analysis.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />

### Latency Overview

The **The AWS Classic Load Balancer - Latency Overview** dashboard provides insights into load balancers response times and availability zones, including backend log response times.

Use this dashboard to:
* Monitor response times by load balancer, and availability zone.
* Monitor client latency and processing times for backend servers.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Latency-Overview.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />


### Latency Details  

The **The AWS Classic Load Balancer - Latency Details** dashboard provides insights into client latency by domain and ELB server and processing times by ELB server throughout your infrastructure.

Use this dashboard to troubleshoot load balancer performance via detailed views across client, request processing, and response time latencies.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Latency-Details.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />

### Connection and Host Status

The **AWS Classic Load Balancer - Connection and Host Status** dashboard provides insights into active and rejected connections, backend connection errors, and healthy and unhealthy hosts.

Use this dashboard to:
* Monitor active connections, new connections, rejected connections, and connection errors for load balancers.
* Monitor healthy and unhealthy host counts by the load balancer and availability zone across your infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Connection-and-Host-Status.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />

### Requests and Processed Bytes  

The **AWS Classic Load Balancer - Requests and Processed Bytes** dashboard provides insights into client requests, network traffic, and processed data.

Use this dashboard to:
* Monitor client request load, network traffic, and processed bytes to determine how to configure load balancers for optimal performance best.
* Determine how to allocate best backend resources based on load.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Requests-and-Processed-Bytes.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />

### Threat Intel

The **AWS Classic Load Balancer - Threat Intel** dashboard provides insights into incoming requests from malicious sources determined via [Sumo Logic’s Threat Intel feature](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#threat-intel-faq). Dashboard panels show detailed information on malicious IPs and the malicious confidence of each threat.

Use this dashboard to:
* Identify known malicious IPs that are accessing your load-balancers and use firewall access control lists to prevent them from sending you traffic going forward.
* Monitor malicious confidence level for all incoming malicious IP addresses posing the threats.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Threat-Intel.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />

### CloudTrail Audit

The **AWS Classic Load Balancer - CloudTrail Audit** dashboard provides a comprehensive overview of activities through CloudTrail audit logs. It visualizes successful and failed events globally, event trends, error details, and user activities, offering insights into load balancer performance, security, and usage patterns.

Use this dashboard to:
* Monitor the geographical distribution of successful and failed load balancer events, allowing for quick identification of regions with high activity or potential issues.
* Track the overall success rate of load balancer events and analyze trends over time, helping to identify sudden changes or patterns in the performance.
* Investigate specific error events, including their details, frequency, and associated users, enabling faster troubleshooting and resolution of issues.
* Identify the most common error types and the users experiencing highest failure rates, facilitating targeted improvements and user support.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-CloudTrail-Audit.png')} alt="AWS Elastic Load Balancer Classic" style={{border: '1px solid gray'}} width="800" />