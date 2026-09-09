---
id: ec2-cloudwatch-metrics
title: AWS EC2 CW Metrics
sidebar_label: AWS EC2 CW Metrics
description: The Sumo Logic app for AWS EC2 allows you to collect your EC2 instance metrics and view dashboards that display analysis of CPU, disk, network, EBS, Health Status Check, and EC2 CloudTrail Events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_EC2_CW_Metrics.png')} alt="AWS EC2 CW Metrics icon" width="50"/>

Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage.

The Sumo Logic app for AWS EC2 allows you to collect your EC2 instance metrics and display them using predefined dashboards. The app provides dashboards to display analysis of EC2 instance metrics for CPU, disk, network, EBS, Health Status Check, and EC2 CloudTrail Events. Also, it provides detailed insights into all CloudTrail audit events associated with EC2 instances and specifically helps identify changes, errors, and user activities.

## Log and metric types  

The Sumo Logic app for AWS EC2 CloudWatch Metrics uses the following metrics:
* [Amazon CloudWatch Metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch.html)
* [Amazon CloudTrail Logs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events)

### Sample log messages

<details>
<summary>Sample CloudTrail Log</summary>

```json
{
	"eventVersion":"1.08",
	"userIdentity":{
		"type":"IAMUser",
		"principalId":"AIDAJ7LGGLTBHHDFNMPSM",
		"arn":"arn:aws:iam::9XXXX34567898:user/cloudhealthuser",
		"accountId":"9XXXXXXX898",
		"accessKeyId":"AKIAXXXXXX22BUTQ",
		"userName":"cloudhealthuser"
	},
	"eventTime":"2022-06-30T08:05:38Z",
	"eventSource":"ec2.amazonaws.com",
	"eventName":"DescribeReservedInstancesListings",
	"awsRegion":"us-east-1",
	"sourceIPAddress":"177.20.215.222",
	"userAgent":"aws-sdk-ruby2/2.11.447 jruby/2.5.7 java cloudhealth",
	"errorCode":"Client.OptInRequired",
	"errorMessage":"AccountId '9XXXXXX898', You are not authorized to use the requested product. Please complete the seller registration null.",
	"requestParameters":{
		"reservedInstancesListingSet":{

		},
		"reservedInstancesSet":{

		},
		"filterSet":{

		}
	},
	"responseElements":null,
	"requestID":"fe609b44-dbc5-454b-8f72-9475d1639441",
	"eventID":"6fc6df43-1ba1-4eb3-948a-0aebc569c024",
	"readOnly":true,
	"eventType":"AwsApiCall",
	"managementEvent":true,
	"recipientAccountId":"9XXXXX7898",
	"eventCategory":"Management",
	"tlsDetails":{
		"tlsVersion":"TLSv1.2",
		"cipherSuite":"ECDHE-RSA-XXXXX-SHA",
		"clientProvidedHostHeader":"ec2.us-west-1.amazonaws.com"
	}
}
```
</details>

### Sample queries

```sql title="CPU utilization (CloudWatch metric-based)"
account=* region=* namespace=aws/ec2 instanceid=* metric=CPUUtilization Statistic=average | avg
```

```sumo title="Top 10 Error Codes (CloudTrail log-based)"
account={{account}} region={{region}} namespace={{namespace}} eventname eventsource "ec2.amazonaws.com" errorCode
| json "eventSource", "awsRegion", "requestParameters", "responseElements", "recipientAccountId" as event_source, region, requestParameters, responseElements, accountid nodrop
| json "userIdentity", "eventName", "sourceIPAddress", "userAgent", "eventType", "requestID", "errorCode", "errorMessage", "eventCategory", "managementEvent" as userIdentity, event_name, src_ip, user_agent, event_type, request_id, error_code, error_message, event_category, management_event nodrop
| where event_source = "ec2.amazonaws.com"
| "aws/ec2" as namespace
| json field=userIdentity "type", "principalId", "arn", "userName", "accountId" nodrop
| json field=userIdentity "sessionContext.attributes.mfaAuthenticated" as mfaAuthenticated nodrop
| parse field=arn ":assumed-role/*" as user nodrop  
| parse field=arn "arn:aws:iam::*:*" as accountId, user nodrop
| json field=requestParameters "instanceType", "instancesSet", "instanceId", "DescribeInstanceCreditSpecificationsRequest.InstanceId.content" as req_instancetype, req_instancesSet, req_instanceid_1, req_instanceid_2 nodrop
| json field=req_instancesSet "item", "items" as req_instancesSet_item, req_instancesSet_items nodrop
| parse regex field=req_instancesSet_item "\"instanceId\":\s*\"(?<req_instanceid_3>.*?)\"" nodrop
| parse regex field=req_instancesSet_items "\"instanceId\":\s*\"(?<req_instanceid_4>.*?)\"" nodrop
| json field=responseElements "instancesSet.items" as res_responseElements_items nodrop
| parse regex field=res_responseElements_items "\"instanceType\":\s*\"(?<res_instanceType>.*?)\"" nodrop
| parse regex field=res_responseElements_items "\"instanceId\":\s*\"(?<res_instanceid>.*?)\"" nodrop
| if (!isBlank(req_instanceid_1), req_instanceid_1,  if (!isBlank(req_instanceid_2), req_instanceid_2, if (!isBlank(req_instanceid_3), req_instanceid_3, if (!isBlank(req_instanceid_4), req_instanceid_4, "")))) as req_instanceid
| if (!isBlank(req_instanceid), req_instanceid, res_instanceid) as instanceid
| if (!isBlank(req_instancetype), req_instancetype, res_instancetype) as instanceType
| if (isEmpty(error_code), "Success", "Failure") as event_status
| if (isEmpty(userName), user, userName) as user
| tolowercase(instanceid) as instanceid
| count as count by error_code | sort by count, error_code asc | limit 10
```

## Collecting logs and metrics for AWS EC2

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect AWS EC2 CloudWatch metrics

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

   :::note
   Namespace for **Amazon EC2** service is **AWS/EC2**.
   :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

AWS EC2 automatically monitors functions on your behalf, reporting [AWS EC2 metrics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch.html) through Amazon CloudWatch. These metrics are collected by our Hosted Collector by configuring the Amazon CloudWatch source.

The Sumo Logic app for AWS EC2 (CloudWatch Metrics) allows you to collect your EC2 instance metrics and display them using predefined dashboards. The app provides dashboards to analyze EC2 instance metrics for CPU, disk, network, EBS, and Health Status Check.

### Collect AWS EC2 CloudTrail logs

:::note
CloudTrail data events will be collected under this source.
:::

#### Prerequisites

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
3. Confirm that logs are being delivered to the Amazon S3 bucket.

:::note
Namespace for **Amazon EC2** service is **AWS/EC2**.
:::

Follow the steps below to collect logs for AWS API Gateway:
1. Configure a [CloudTrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. Add custom metadata [fields](/docs/manage/fields) with your logs:
   1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
   1. Create a field named `account` and assign it a value that represents a friendly name or alias to your AWS account from which logs are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and logs can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. After adding fields, check their status indicators:
      * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
      * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
         * You will have the option to automatically add or enable the field.
         * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Centralized AWS CloudTrail log collection

If you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create following Field Extraction Rule to map proper AWS account(s) friendly name / alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=<SourceCategory_of_CloudTrail_source_created_in_sumo>
```

#### Parse Expression

Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the `“dev”` alias for an AWS account with ID `"528560886094"` and the `“prod”` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sumo
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the AWS EC2 app

Now that you have set up collection for AWS EC2 metrics install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name/alias to the AWS account.
- `accountid` AWS account ID.
- `region` The region to which the resource name belongs.
- `namespace` Namespace for EC2 CW Metrics Service.
- `instanceid` EC2 Instance Id.

#### Field Extraction Rule(s)

The FER **AwsObservabilityEC2CloudTrailLogsFER** to extract fields `region`, `namespace`, `accountid`, and `instanceid` will be created as a part of app installation.

import DoNotModify from '../../reuse/apps/do-not-modify-installed-content.md';

<DoNotModify/>

## Viewing AWS EC2 dashboards

### Overview (CloudWatch Metrics)

The **AWS EC2 Overview (CloudWatch Metrics)** dashboard provides at-a-glance information about a EC2 CPU, instance disk store, network and EBS volume usage along with EC2 instance health status.

Use this dashboard to:

* Monitor average CPU utilization and dedicated host CPU utilization, along with instances with High and Low CPU utilization
* Monitor CPU credit Usage,Balance,Surplus Credit Charge,Surplus Credit balance
* EBS related metrics like IO Balance, Byte Balance, Read/Write - bytes,ops
* Identify count of Status checks
* Observe all relevant metrics for CPU, Internal Disk Store, Network utilization per instance type

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/1.1.-AWS-EC2-Overview-CloudWatch-Metrics.png' alt="AWS EC2 Overview (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### Summary (CloudWatch Metrics)

The **AWS EC2 Summary (CloudWatch Metrics)** dashboard provides at-a-glance information about a EC2 CPU, instance disk store, network and EBS volume usage along with EC2 instance health status.

Use this dashboard to:

* Monitor CPU utilization along with CPU credit details & status check counts for EC2
* EBS related metrics for EC2 instance
* Observe Instance Disk Store (Disk Read/Write - Bytes & ops) for EC2 instance.
* Monitor Network usage metrics (Network in/out - Byes & packets) for EC2 instance

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/1.1.-AWS-EC2-Summary-CloudWatch-Metrics.png' alt="AWS EC2 Summary (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### Events  

The **AWS EC2 - Events (CloudTrail)** dashboard provides detailed insights into all CloudTrail audit events associated with EC2 instances and specifically helps identify changes, errors, and user activities.

Use this dashboard to:
* Monitor the geo location for successful and failed events
* Observed the event status and top error codes
* Track distribution and top event types and trends
* Monitor top IAM Users, Assumed Role Users, and User agents
* Monitor distribution of Successful and failed events with the list of latest events.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/2.1-AWS-EC2-Events-CloudTrail.png' alt="AWS EC2 - Events (CloudTrail) dashboard" style={{border: '1px solid gray'}} width="800" />

### CPU (CloudWatch Metrics)

The **AWS EC2 CPU (CloudWatch Metrics)** dashboard provides detailed information about EC2 CPU usage like CPU utilization and CPU credits for burstable performance instances.

Use this dashboard to:
* Monitor Average CPU utilization over time for EC2.
* Observe CPU Credits metrics (Usage and balance) over time.
* Identify CPU Surplus Credits (Charged and Balance) over time.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/2.1.-AWS-EC2-CPU-CloudWatch-Metrics.png' alt="AWS EC2 CPU (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### EBS (CloudWatch Metrics)

The **AWS EC2 EBS (CloudWatch Metrics)** dashboard provides detailed information about EC2 EBS volumes for Nitro-based instances based on EBS volumes read and write bytes, operations, and information on the percentage of I/O and throughput credits remaining in the burst bucket.

Use this dashboard to:
* Monitor EBS volumes read and write bytes over time
* Monitor EBS read and write ops over time
* EBS IO balance and Byte Balance % metric over time for Ec2 instances.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/3.1.-AWS-EC2-EBS-CloudWatch-Metrics.png' alt="AWS EC2 EBS (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### Disk (CloudWatch Metrics)

The **AWS EC2 Disk (CloudWatch Metrics)** dashboard provides detailed information about a EC2 Instance Store Disk usage based on disk read and write bytes, operations.

Use this dashboard to:

* Monitor instance store - Disk metrics like Disk read/write Bytes and Byte rate
* Monitor instance store - Disk netrucs like Disk read/write Operations and Operation rate.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/4.1.-AWS-EC2-Disk-CloudWatch-Metrics.png' alt="AWS EC2 Disk (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### Network (CloudWatch Metrics)

The **AWS EC2 Network (CloudWatch Metrics)** dashboard provides detailed information about EC2 Network activities based on In and out packets, bytes.

Use this dashboard to:

* Monitor imported network metrics like - Byte rate for input and out put and Bytes going in and out of Ec2 instances
* Observe network metrics for Ec2 for packet in/out and  rate of the packets.

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/5.1.-AWS-EC2-Network-CloudWatch-Metrics.png' alt="AWS EC2 Network (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

### Status Check (CloudWatch Metrics)

The **AWS EC2 Status Check (CloudWatch Metrics)** dashboard provides detailed information about an EC2 instance's health check status based on an instance, system, and overall health status.

Use this dashboard to:
* Monitor status check for instances
* Monitor if the instance has passed the status check at last minute
* Monitor if an instance has passed the system status check at last minute

<img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWSEC2CWMetrics/6.1.-AWS-EC2-Status-Check-CloudWatch-Metrics.png' alt="AWS EC2 Status Check (CloudWatch Metrics) dashboard" style={{border: '1px solid gray'}} width="800" />

## Create monitors for AWS EC2 app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AWS EC2 alerts

| Name | Description | Alert Condition | Recover Condition |
|:-----|:------------|:----------------|:--|
| `AWS EC2 CW - High CPU Utilization` | This alert fires when the average CPU utilization based on cloud watch metrics, within a 5 minute interval for an EC2 instance is high (>=85%). | Count > 85 | Count &lt;= 85 |
| `AWS EC2 CW - Status Check Failed` | This alert fires when there is a status check failures within a 5 minute interval for an EC2 instance. | Count > 0 | Count &lt;= 0 |
| `AWS EC2 - High Disk Utilization` | This alert fires when the average disk utilization within a 5 minute time interval for an EC2 instance is high (>=85%). | Count &gt;= 85 | Count < 85 |
| `AWS EC2 - High Memory Utilization` | This alert fires when the average memory utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count &gt;= 85 | Count < 85 |
| `AWS EC2 - High System CPU Utilization` | This alert fires when the average system CPU utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count &gt;= 85 | Count < 85 |
| `AWS EC2 - High Total CPU Utilization` | This alert fires when the average total CPU utilization within a 5 minute interval for an EC2 instance is high (>=85%). | Count &gt;= 85 | Count < 85 |
| `AWS EC2 CW - Low EBS IO Credit Balance` | This alert fires when the average EBS IO Balance percentage within a 5 minute interval for an EC2 instance is low (&lt;=10%), indicating the instance is close to being throttled on EBS IOPS. | Count &lt;= 10 | Count > 10 |
| `AWS EC2 CW - Low CPU Credit Balance` | This alert fires when the average CPU Credit Balance within a 30 minute interval for an EC2 instance is low (&lt;=5), indicating a burstable instance is close to losing burst capability and will be limited to baseline performance. | Count &lt;= 5 | Count > 5 |

## Upgrade/Downgrade the AWS EC2 app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the AWS EC2 app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
