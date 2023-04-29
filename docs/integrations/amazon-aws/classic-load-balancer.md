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

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product.md) to an Amazon S3 bucket.
2. [Enable Application Load Balancer logging](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) in AWS.
3. Confirm that logs are being delivered to the Amazon S3 bucket.


#### Configure an ELB Source

When you create an AWS Source, you associate it with a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use, or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).


#### Rules

* If you're editing, the `Collection should begin` date on a Source. The new date must be after the current `Collection should begin` date.
* Sumo Logic supports log files (S3 objects) that do NOT change after they are uploaded to S3. Support is not provided if your logging approach relies on updating files stored in an S3 bucket. S3 does not have a concept of updating existing files, you can only overwrite an existing file. When this overwrite happens, S3 considers it as a new file object or a new version of the file, and that file object gets its unique version ID.

  Sumo Logic scans an S3 bucket based on the path expression supplied or receives an SNS notification when a new file object is created. As part of this, we receive a file name (key) and the object's ID. It's compared against a list of file objects already ingested. The file's contents are fully ingested if a matching file ID is not found.

  When you overwrite a file in S3, the file object gets a new version ID, and as a result, Sumo Logic sees it as a new file and ingests all of it. If with each version you post to S3, you are simply adding to the end of the file, this will lead to duplicate messages, one message for each version of the file you created in S3.

* Glacier objects will not be collected and are ignored.
* If you're using SNS, you must create a separate topic and subscription for each Source.


#### S3 Event Notifications Integration

Sumo’s S3 integration combines scan-based discovery and event-based discovery into a unified integration that allows you to maintain a low-latency integration for new content and assure that no data was missed or dropped. When you enable event-based notifications, S3 will automatically publish new files to Amazon Simple Notification Service (SNS) topics to which Sumo Logic can be subscribed. This notifies Sumo Logic immediately when new files are added to your S3 bucket so we can collect it. For more information about SNS, see the [Amazon SNS product](https://aws.amazon.com/sns/) detail page.

<img src={useBaseUrl('img/integrations/amazon-aws/Cloud_AWS_icon.png')} alt="Cloud_AWS_icon" />

Enabling event-based notifications is an S3 bucket-level operation subscribing to an SNS topic. An SNS topic is an access point that Sumo Logic can dynamically subscribe to receive event notifications. When creating a Source that collects from an S3 bucket, Sumo assigns an endpoint URL to the Source. The URL is for you to use in the AWS subscription to the SNS topic, so AWS notifies Sumo when there are new files. See [Configuring Amazon S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) for more information.

You can adjust the configuration of when and how AWS handles communication attempts with Sumo Logic. See [Setting Amazon SNS Delivery Retry Policies](https://docs.aws.amazon.com/sns/latest/dg/DeliveryPolicies.html) for details.


#### Create an AWS Source

These configuration instructions apply to log collection from all AWS Source types. Select the correct Source type for your Source in Step 3.

1. In Sumo Logic select** Manage Data > Collection > Collection**.
2. On the **Collectors** page, click **Add Source** next to a Hosted** **Collector, either an existing Hosted Collector, or one you have created for this purpose.
3. Select your AWS Elastic Load Balancing.
4. Enter a name for the new Source. A description is optional.
5. Select an **S3 region** or keep the default value of **Others**. The S3 region must match the appropriate S3 bucket created in your Amazon account.

:::info
Selecting an AWS GovCloud region means your data will leave a FedRAMP-high environment. Use responsibly to avoid information spillage. See [Collection from AWS GovCloud](/docs/send-data/hosted-collectors/amazon-aws/collection-aws-govcloud) for details.
:::
6. For **Bucket Name**, enter the exact name of your organization's S3 bucket. Be sure to double-check the name as it appears in AWS, for example: \
7. For **Path Expression**, enter the wildcard pattern that matches the S3 objects you'd like to collect. You can use **one **wildcard (*) in this string. Recursive path expressions use a single wildcard and do **NOT** use a leading forward slash. [See About Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions) for details.
8. **Collection should begin.** Choose or enter how far back you'd like to begin collecting historical logs. You can either:
   * Choose a predefined value from dropdown list, ranging from "Now" to “72 hours ago” to “All Time”, or
   * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example -1w. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h), and minutes (m).

   If you paused the Source and want to skip some data when you resume, update the **Collection should begin** setting to a time after it was paused.
9. For **Source Category**, enter any string to tag the output collected from this Source. Category metadata is stored in a searchable field called `_sourceCategory`.
   * Example `_sourceCategory: aws/observability/clb/logs`
10. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md).

Following **Fields** are to be added in the source:
* Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried via the “account field”.
* Add a **region** field and assign it the value of respective AWS region where the Classic Load Balancer exists.
* Add an **accountId **field and assign it the value of the respective AWS account id which is being used.
  * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists and is enabled in the Fields table schema.
  * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist or is disabled in the Fields table schema. In this case, an option is provided to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled, it is ignored, known as dropped.
11. For **AWS Access,** you have two **Access Method** options. Select **Role-based or Key access based on the AWS authentication you provide**. Role-based access is preferred. This was completed in the prerequisite step [Grant Sumo Logic access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product.md).
    * For **Role-based access,** enter** **the Role ARN that was provided by AWS after creating the role.
    * For **Key access** enter the **Access Key ID **and** Secret Access Key.** See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
12. **Log File Discovery.** You have the option to set up Amazon Simple Notification Service (SNS) to notify Sumo Logic of new items in your S3 bucket. A scan interval is required and automatically applied to detect log files.
Sumo Logic highly recommends using an SNS Subscription Endpoint for its ability to maintain low-latency collection. This is essential to support up-to-date [Alerts](/docs/alerts).
    * **Scan Interval. **Sumo Logic will periodically scan your S3 bucket for new items in addition to SNS notifications. **Automatic** is recommended not to incur additional AWS charges. This sets the scan interval based on if subscribed to an SNS topic endpoint and how often new files are detected over time.
If the Source is not subscribed to an SNS topic and set to **Automatic,** the scan interval is 5 minutes. You may enter a set frequency to scan your S3 bucket for new data. To learn more about Scan Interval considerations, see [About setting the S3 Scan Interval](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-scan-interval-sources).
    * **SNS Subscription Endpoint **(**Highly Recommended**). Sumo Logic will collect new files as soon as the notification is received. This will provide faster collection versus waiting for the next scan to detect the new file.
        1. To set up the subscription, you need to get an endpoint URL from Sumo to provide to AWS. This process will save your Source and begin scanning your S3 bucket when the endpoint URL is generated. Click on **Create URL** and use step C's provided endpoint URL when creating your subscription.

The following steps use the AWS SNS Console. You may instead use AWS CloudFormation. Follow the instructions to use [CloudFormation to set up an SNS Subscription Endpoint](/docs/send-data/hosted-collectors/amazon-aws/configure-your-aws-source-cloudformation#Set_up_an_SNS_Subscription_Endpoint).

1. Go to **Services >** **Simple Notification Service** and click **Create Topic**. Enter a **Topic name** and click **Create topic**. Copy the provided **Topic ARN**, you’ll need this for the next step. Make sure that the topic and the bucket are in the same region.
2. Again go to **Services >** **Simple Notification Service** and click **Create Subscription**. Paste the **Topic ARN** from step B above. Select **HTTPS** as the protocol and enter the **Endpoint** URL provided while creating the S3 source in Sumo Logic. Click **Create subscription** and a confirmation request will be sent to Sumo Logic. The request will be automatically confirmed by Sumo Logic.
3. Select the **Topic** created in step B and navigate to **Actions > Edit Topic Policy**. Use the following policy template, replace the SNS-topic-ARN and bucket-name placeholders in the Resource section of the JSON policy with your actual SNS topic ARN and S3 bucket name:
```json
{
    "Version": "2008-10-17",
    "Statement": [{
  "Effect": "Allow",
  "Principal": {
  "AWS": "*"
  },
  "Action": [
  "SNS:Publish"
  ],
  "Resource": "SNS-topic-ARN",
  "Condition": {
  "ArnLike": {
  "aws:SourceArn": "arn:aws:s3:*:*:bucket-name"
  }
  }
    }]
}

```



1. Go to **Services > [S3](https://s3.console.aws.amazon.com/s3/buckets/)** and select the bucket to which you want to attach the notifications. Navigate to **Properties > Events > Add Notification**. Enter a **Name** for the event notification. In the **Events** section select **All object create events**. In the **Send to** section (notification destination) select **SNS Topic**. An **SNS **section becomes available, select the name of the topic you created in step B from the dropdown. Click **Save**.
1. Set any of the following under **Advanced**:
* **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone.** There are two options for Time Zone. You can use the time zone in your log files and then choose an option in case the time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone, no matter your choice. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone, your search results will be affected.
    * **Timestamp Format.** By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
* **Enable Multiline Processing. **See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. This is enabled by default. Use this option if you're working with multiline messages (for example, log4J or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log). Choose one of the following:  
    * **Infer Boundaries.** Enable when you want Sumo Logic to automatically attempt to determine which lines belong to the same message. If you deselect the Infer Boundaries option, you will need to enter a regular expression in the Boundary Regex field to detect the entire first line of multiline messages.
    * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression matching the first line of every multiline message in your log files.
1. [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule.md) you'd like for the AWS Source.
2. When you are finished configuring the Source, click **Save**.


#### SNS with one bucket and multiple Sources

When collecting from one AWS S3 bucket with multiple Sumo Sources, you must create a separate topic and subscription for each Source. Subscriptions and Sumo Sources should both map to only one endpoint. If you were to have multiple subscriptions, Sumo would collect your objects multiple times.

Each topic needs a separate filter (prefix/suffix) so that collection does not overlap. For example, the following image shows a bucket configured with two notifications with filters (prefix/suffix) set to notify Sumo separately about new objects in different folders.


#### Update Source to use S3 Event Notifications

There is a [community supported script](https://github.com/SumoLogic/sumologic-content/tree/master/Sumo-Logic-Tools/Event_Based_S3_Automation) available that configures event-based object discovery on existing AWS Sources.

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
2. On the Collection page, navigate to your Source and click **Edit**. Scroll down to **Log File Discovery** and note the Endpoint **URL** provided. You will use this in step 10.C when creating your subscription.
3. Complete steps 10.B through 10.E for [configuring SNS Notifications](#Configure-SNS-Notifications).


#### Troubleshoot S3 Event Notifications

In the web interface under **Log File Discovery** it shows a red exclamation mark with "Sumo Logic has not received a validation request from AWS".


Steps to troubleshoot:
1. Refresh the Source’s page to view the latest status of the subscription in the SNS Subscription section by clicking **Cancel** then **Edit** on the Source in the Collection tab.
2. Verify you have enabled sending **Notifications** from your S3 bucket to the appropriate SNS topic. This is done in [step 10.E](#Configure-SNS-Notifications).
3. If you didn’t use CloudFormation check that the SNS topic has a confirmed subscription to the URL in AWS console. A "Pending Confirmation" state likely means that you entered the wrong URL while creating the subscription.

In the web interface under **Log File Discovery** it shows a green check with "Sumo Logic has received an AWS validation request at this endpoint." but you still have high latencies.

The green check confirms that the endpoint was used correctly, but it does not mean Sumo is receiving notifications successfully.

Steps to troubleshoot:

1. AWS writes CloudTrail and S3 Audit Logs to S3 with a latency of a few minutes. If you’re seeing latencies of around 10 minutes for these Sources it is likely because AWS is writing them to S3 later than expected.
2. Verify you have enabled sending **Notifications** from your S3 bucket to the appropriate SNS topic. This is done in [step 10](#Configure-SNS-Notifications).


### Field in Field Schema

Login to Sumo Logic,  goto Manage Data > Logs > Fields. Search for the “**loadbalancername**” field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).


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
