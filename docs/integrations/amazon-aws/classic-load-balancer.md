---
id: classic-load-balancer
title: AWS Classic Load Balancer
description: The Sumo Logic App for AWS Elastic Load Balancing Classic is a unified logs and metrics (ULM) App which helps you monitor the classic load balancer.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/clb.png')} alt="Thumbnail icon" width="50"/>

AWS Elastic Load Balancer Classic distributes the incoming application traffic across multiple EC2 instances in multiple Availability Zones.

The Sumo Logic App for AWS Elastic Load Balancer Classic is a unified logs and metrics App that helps you monitor the classic load balancer. The preconfigured dashboards provide information on the latency, HTTP backend codes, requests, and host status, that help you investigate the issues in the load balancer.

## Log and Metric Types

ELB logs are stored as *.log files in the buckets you specify when you enable logging. The process to enable collection for these logs is described in [AWS ELB Enable Access Logs](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html).

The logs themselves contain these fields in this order:
```bash
datetime, ELB_Server, clientIP, port, backend, backend_port, requestProc, ba_Response, cli_Response, ELB_StatusCode, be_StatusCode, rcvd, send, method, protocol, domain, server_port, path
```

The log format is described in [AWS ELB Access Log Collection](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html).

For details on AWS Classic Load Balancer metrics, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html).


### Sample Access Log Message

```json
2017-11-06T23:20:38 stag-www-lb 250.38.201.246:56658 10.168.203.134:23662 0.007731 0.214433 0.000261 404 200 3194 123279 \
"GET https://stag-www.sumologic.net:443/json/v2/searchquery/3E7959EC4BA8AAC5/messages/raw?offset=29&length=15&highlight=true&_=1405591692470 HTTP/1.1" \
"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0" \
ECDHE-RSA-CAMELLIA256-SHA384 TLSv1.2
```


### Sample Queries

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


## Collecting Logs and Metrics for the AWS Classic Load Balancer

### Collect Metrics for AWS Classic Load Balancer

Sumo Logic supports collecting metrics using two source types
* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

Namespace for **AWS Classic Load Balancer** Service is **AWS/ELB**.

* ​​​​**Metadata: **Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried via the “account field”.


### Collecting Access Logs for AWS Classic Load Balancer

#### Configure a Collector

See [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).


#### Before you begin

Before you can begin to use the AWS Elastic Load Balancing (ELB) Application App, complete the following steps:

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Enable Application Load Balancer logging](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) in AWS.
3. Confirm that logs are being delivered to the Amazon S3 bucket.


#### Configure an ELB Source

{@import ../../reuse/apps/create-aws-s3-source.md}

### Field in Field Schema

Login to Sumo Logic, go to Manage Data > Logs > Fields. Search for the **loadbalancername** field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).


### Field Extraction Rule(s)

Create Field Extraction Rule for AWS Classic Load Balancer Access Logs. Learn how to create Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
Rule Name: AwsObservabilityElbAccessLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* _sourceCategory=aws/observability/clb/logs
```


**Parse Expression**:

```sql
| parse "* * * * * * * * * * * \"*\" \"*\" * *" as datetime, loadbalancername, client, backend, request_processing_time, backend_processing_time, response_processing_time, elb_status_code, backend_status_code, received_bytes, sent_bytes, request, user_agent, ssl_cipher, ssl_protocol
| parse regex field=datetime "(?<datetimevalue>\d{0,4}-\d{0,2}-\d{0,2}T\d{0,2}:\d{0,2}:\d{0,2}\.\d+Z)"
| where !isBlank(loadbalancername) and !isBlank(datetimevalue)
| "aws/elb" as namespace
| tolowercase(loadbalancername) as loadbalancername
| fields loadbalancername, namespace
```


## Install the AWS Classic Load Balancer App

Now that you have set up a collection for AWS Classic Load Balancer, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
    * **App Name.** You can retain the existing name or enter the app's name of your choice. 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    * Click **Add to Library**.

Once an app is installed, it will appear in your folder or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the AWS Classic Load Balancer Dashboards

### 1. AWS Classic Load Balancer - Overview

**AWS Classic Load Balancer - Overview** dashboard provides visibility into the health of your Classic Load Balancer, with at-a-glance views of latency, request and host status, requests from malicious sources, and HTTP backend codes.

Use this dashboard to:
* Monitor requests to each load balancer to ensure the load is being distributed as desired
* Monitor trends for load balancers errors, 4xx and 5xx errors, as well as healthy and unhealthy hosts
* Monitor the current state across all load balancers via active connections, new connections, backend connection errors, and rejected connections

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Overview.png')} alt="AWS Elastic Load Balancer Classic" />


### 1. AWS Classic Load Balancer - Response Analysis

**AWS Classic Load Balancer - Response Analysis** dashboard provides insights into how your load balancers respond to clients.

Use this dashboard to:
* Monitor incoming client locations for all 5XX, 4XX and 3XX error responses.
* Quickly correlate error responses using load balancer access logs and AWS CloudWatch metrics to determine the possible cause for failures and decide corrective actions.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Response-Analysis.png')} alt="AWS Elastic Load Balancer Classic" />


### 2. AWS Classic Load Balancer - Backend Response Analysis

The **AWS Classic Load Balancer - Backend Response Analysis** dashboard provides insights into how various backend servers respond to client requests.

Use this dashboard to:
* Monitor trends of all response codes for your backend servers by LoadBalancer and availability zones.
* Correlate response code trends across load balancer access logs and CloudWatch metrics to determine the root cause for failures

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Response-Analysis.png')} alt="AWS Elastic Load Balancer Classic" />

### 3. AWS Classic Load Balancer - Latency Overview

**The AWS Classic Load Balancer - Latency Overview** dashboard provides insights into load balancers' response times and availability zones, including backend log response times.

Use this dashboard to:
* Monitor response times by load balancer, and availability zone.
* Monitor client latency and processing times for backend servers.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Latency-Overview.png')} alt="AWS Elastic Load Balancer Classic" />


### 4. AWS Classic Load Balancer - Latency Details  

**The AWS Classic Load Balancer - Latency Details** dashboard provides insights into client latency by domain and ELB server and processing times by ELB server throughout your infrastructure.

Use this dashboard to:
* Troubleshoot load balancer performance via detailed views across client, request processing and response time latencies.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Response-Analysis.png')} alt="AWS Elastic Load Balancer Classic" />

### 5. AWS Classic Load Balancer - Connection and Host Status

**The AWS Classic Load Balancer - Connection and Host Status** dashboard provides insights into active and rejected connections, backend connection errors, and healthy and unhealthy hosts.

Use this dashboard to:
* Monitor active connections, new connections, rejected connections, and connection errors for load balancers
* Monitor healthy and unhealthy host counts by the load balancer and availability zone across your infrastructure

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Connection-and-Host-Status.png')} alt="AWS Elastic Load Balancer Classic" />

### 6. AWS Classic Load Balancer - Requests and Processed Bytes  

**AWS Classic Load Balancer - Requests and Processed Bytes** dashboard provides insights into client requests, network traffic, and processed data.

Use this dashboard to:
* Monitor client request load, network traffic, and processed bytes to determine how to configure load balancers for optimal performance best
* Determine how to allocate best backend resources based on load

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Requests-and-Processed-Bytes.png')} alt="AWS Elastic Load Balancer Classic" />

### 7. AWS Classic Load Balancer - Threat Intel

**AWS Classic Load Balancer - Threat Intel** dashboard provides insights into incoming requests from malicious sources determined via [Sumo Logic’s Threat Intel feature](/docs/integrations/security-threat-detection/threat-intel-quick-analysis#03_Threat-Intel-FAQ). Panels show detailed information on malicious IPs and the malicious confidence of each threat

Use this dashboard to:
* Identify known malicious IPs that are accessing your load-balancers and use firewall access control lists to prevent them from sending you traffic going forward
* Monitor malicious confidence level for all incoming malicious IP addresses posing the threats.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Classic-Load-Balancer-Threat-Intel.png')} alt="AWS Elastic Load Balancer Classic" />
