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

Before creating the Source, identify the Hosted Collector you want to use, or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

#### Rules

* If you're editing the `Collection should begin` date on a Source, the new date must be after the current `Collection should begin` date.
* Sumo Logic supports log files (S3 objects) that do NOT change after they are uploaded to S3. Support is not provided if your logging approach relies on updating files stored in an S3 bucket. S3 does not have a concept of updating existing files, you can only overwrite an existing file. When this overwrite happens, S3 considers it as a new file object, or a new version of the file, and that file object gets its own unique version ID.
* Sumo Logic scans an S3 bucket based on the path expression supplied, or receives an SNS notification when a new file object is created. As part of this, we receive a file name (key) and the object's ID. It's compared against a list of file objects already ingested. If a matching file ID is not found the contents of the file are ingested in full.
When you overwrite a file in S3, the file object gets a new version ID and as a result, Sumo Logic sees it as a new file and ingests all of it. If with each version you post to S3 you are simply adding to the end of the file, then this will lead to duplicate messages ingested, one message for each version of the file you created in S3.
* Glacier objects will not be collected and are ignored.
* If you're using SNS you need to create a separate topic and subscription for each Source.

#### S3 Event Notifications Integration

Sumo’s S3 integration combines scan-based discovery and event based discovery into a unified integration that gives you the ability to maintain a low-latency integration for new content and provide assurances that no data was missed or dropped. When you enable event based notifications S3 will automatically publish new files to Amazon Simple Notification Service (SNS) topics which Sumo Logic can be subscribed. This notifies Sumo Logic immediately when new files are added to your S3 bucket so we can collect it. For more information about SNS, see the [Amazon SNS product](https://aws.amazon.com/sns/) detail page.

<img src={useBaseUrl('img/integrations/amazon-aws/Cloud_AWS_icon.png')} alt="Cloud_AWS_icon" />

Enabling event based notifications is an S3 bucket-level operation that subscribes to an SNS topic. An SNS topic is an access point that Sumo Logic can dynamically subscribe to in order to receive event notifications. When creating a Source that collects from an S3 bucket Sumo assigns an endpoint URL to the Source. The URL is for you to use in the AWS subscription to the SNS topic so AWS notifies Sumo when there are new files. See [Configuring Amazon S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html) for more information.

You can adjust the configuration of when and how AWS handles communication attempts with Sumo Logic. See [Setting Amazon SNS Delivery Retry Policies](https://docs.aws.amazon.com/sns/latest/dg/DeliveryPolicies.html) for details.

#### Create an AWS Source

These configuration instructions apply to log collection from all AWS Source types. Select the correct Source type for your Source in Step 3.

1. In Sumo Logic select **Manage Data** > **Collection** > **Collection**.
2. On the **Collectors** page, click **Add Source** next to a Hosted Collector, either an existing Hosted Collector, or one you have created for this purpose.
3. Select AWS Elastic Load Balancing.
4. Enter a name for the new Source. A description is optional.
5. Select an **S3 region** or keep the default value of **Others**. The S3 region must match the appropriate S3 bucket created in your Amazon account.
:::note
Selecting an AWS GovCloud region means your data will be leaving a FedRAMP-high environment. Use responsibly to avoid information spillage. See [Collection from AWS GovCloud](/docs/send-data/hosted-collectors/amazon-aws/collection-aws-govcloud) for details.
:::
6. For **Bucket Name**, enter the exact name of your organization's S3 bucket. Be sure to double-check the name as it appears in AWS.<br/><img src={useBaseUrl('img/integrations/amazon-aws/Bucket-Name.png')} alt="Bucket-Name" width="600"/>
7. For **Path Expression**, enter the wildcard pattern that matches the S3 objects you'd like to collect. You can use **one** wildcard (`*`) in this string. Recursive path expressions use a single wildcard and do NOT use a leading forward slash. [See About Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions) for details.
8. **Collection should begin.** Choose or enter how far back you'd like to begin collecting historical logs. You can either:
    * Choose a predefined value from dropdown list, ranging from "Now" to “72 hours ago” to “All Time”, or
    * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example -1w. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h), and minutes (m). If you paused the Source and want to skip some data when you resume, update the **Collection should begin** setting to a time after it was paused.
9. For **Source Category**, enter any string to tag the output collected from this Source (category metadata is stored in a searchable field called `_sourceCategory`).
    * Example sourceCategory: `aws/observability/alb/logs`
10. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md). Add the following **Fields** in the source:
    * Add an **account** field and assign it a value that is a friendly name or alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried using the **account** field.
    * Add a **region** field and assign it the value of the respective AWS region where the Application Load Balancer exists.
    * Add an **accountId** field and assign it the value of the respective AWS account id which is being used.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
11. For **AWS Access** you have two **Access Method** options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in the prerequisite step [Grant Sumo Logic access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).
    * For **Role-based access**, enter the Role ARN that was provided by AWS after creating the role.
    * For **Key access** enter the **Access Key ID** and **Secret Access Key.** See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
12. **Log File Discovery.** You have the option to set up Amazon Simple Notification Service (SNS) to notify Sumo Logic of new items in your S3 bucket. A scan interval is required and automatically applied to detect log files. <br/> Sumo Logic highly recommends using an SNS Subscription Endpoint for its ability to maintain low-latency collection. This is essential to support up-to-date [Alerts](/docs/alerts).
    - **Scan Interval.** Sumo Logic will periodically scan your S3 bucket for new items in addition to SNS notifications. **Automatic** is recommended to not incur additional AWS charges. This sets the scan interval based on if subscribed to an SNS topic endpoint and how often new files are detected over time.<br/>If the Source is not subscribed to an SNS topic and set to **Automatic** the scan interval is 5 minutes. You may enter a set frequency to scan your S3 bucket for new data. To learn more about Scan Interval considerations, see [About setting the S3 Scan Interval](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-scan-interval-sources).
    - **SNS Subscription Endpoint (Highly Recommended**). New files will be collected by Sumo Logic as soon as the notification is received. This will provide faster collection versus having to wait for the next scan to detect the new file. To set up the subscription you need to get an endpoint URL from Sumo to provide to AWS. This process will save your Source and begin scanning your S3 bucket when the endpoint URL is generated. Click on **Create URL** and use the provided endpoint URL when creating your subscription in step C. <br/> The following steps use the Amazon SNS Console. You may instead use AWS CloudFormation. Follow the instructions to use [CloudFormation to set up an SNS Subscription Endpoint](/docs/send-data/hosted-collectors/amazon-aws/configure-your-aws-source-cloudformation#set-up-an-sns-subscription-endpoint). <br/> 
        1. Go to **Services > Simple Notification Service** and click **Create Topic**. Enter a **Topic name** and click **Create topic**. Copy the provided **Topic ARN**, you’ll need this for the next step. Make sure that the topic and the bucket are in the same region.
        1. Again go to **Services > Simple Notification Service** and click **Create Subscription**. Paste the **Topic ARN** from *step a*. <br/>Select **HTTPS** as the protocol and enter the **Endpoint** URL provided while creating the S3 source in Sumo Logic. Click **Create subscription** and a confirmation request will be sent to Sumo Logic. The request will be automatically confirmed by Sumo Logic.
        1. Select the **Topic** created in *step a* and navigate to **Actions > Edit Topic Policy**. Use the following policy template, replace the SNS-topic-ARN and bucket-name placeholders in the `Resource` section of the JSON policy with your actual SNS topic ARN and S3 bucket name:
            ```json
            {
                "Version":"2008-10-17",
                "Statement":[
                    {
                        "Effect":"Allow",
                        "Principal":{
                            "AWS":"*"
                        },
                        "Action":[
                            "SNS:Publish"
                        ],
                        "Resource":"SNS-topic-ARN",
                        "Condition":{
                            "ArnLike":{
                                "aws:SourceArn":"arn:aws:s3:*:*:bucket-name"
                            }
                        }
                    }
                ]
            }
            ```
        1. Go to **Services > [S3](https://s3.console.aws.amazon.com/s3/buckets/)** and select the bucket to which you want to attach the notifications. Navigate to **Properties > Events > Add Notification**. Enter a **Name** for the event notification. In the **Events** section select **All object create events**. In the **Send to** section (notification destination) select **SNS Topic**. An **SNS** section becomes available, select the name of the topic you created in *step a* from the dropdown. Click **Save**.
1. Set any of the following under **Advanced**:
    * **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.
        * **Time Zone.** There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
        * **Timestamp Format.** By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
    * **Enable Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. This is enabled by default. Use this option if you're working with multiline messages (for example, log4J or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log). Choose one of the following:  
        * **Infer Boundaries.** Enable when you want Sumo Logic to automatically attempt to determine which lines belong to the same message. If you deselect the Infer Boundaries option, you will need to enter a regular expression in the Boundary Regex field to use for detecting the entire first line of multiline messages.
        * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression that matches the entire first line of every multiline message in your log files.
1. [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule.md) you'd like for the AWS Source.
1. When you are finished configuring the Source, click **Save**.

#### SNS with one bucket and multiple Sources

When collecting from one Amazon S3 bucket with multiple Sumo Sources, you need to create a separate topic and subscription for each Source. Subscriptions and Sumo Sources should both map to only one endpoint. If you were to have multiple subscriptions Sumo would collect your objects multiple times.

Each topic needs a separate filter (prefix/suffix) so that collection does not overlap. For example, the following image shows a bucket configured with two notifications that have filters (prefix/suffix) set to notify Sumo separately about new objects in different folders.

#### Update Source to use S3 Event Notifications

There is a [community supported script](https://github.com/SumoLogic/sumologic-content/tree/master/Sumo-Logic-Tools/Event_Based_S3_Automation) available that configures event based object discovery on existing AWS Sources.

1. In Sumo Logic select **Manage Data > Collection > Collection**.
2. On the **Collection** page navigate to your Source and click **Edit**. Scroll down to **Log File Discovery** and note the Endpoint **URL** provided, you will use this in *step 12.b* when creating your subscription.
3. Complete *steps 12.a* through *10.d* for [configuring SNS Notifications](#Configure-SNS-Notifications).

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
2. Verify you have enabled sending **Notifications** from your S3 bucket to the appropriate SNS topic. This is done in *step 12.b*.

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

Now that you have set up collection for AWS Application Load Balancer, install the Sumo Logic App to use the pre-configured searches and [dashboards](#viewing-aws-application-load-balancer-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

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