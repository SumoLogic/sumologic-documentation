---
id: config
title: AWS Config
description: Provides a simple web services interface that can be used to track modifications made to the resources that belong to an AWS account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/config.png')} alt="Thumbnail icon" width="50"/>

Amazon Web Services (AWS) Config provides a simple web services interface that can be used to track modifications made to the resources that belong to an AWS account. The Sumo Logic App for AWS Config presents modification notifications that contain snapshots of resource configurations and information about the modifications made to a resource. The app uses predefined Live and Interactive Dashboards and filters, which provide visibility into your environment for real-time analysis of overall usage.


## Log Types

The Sumo Logic App for AWS Config leverages AWS Config’s Simple Notification Service (SNS), which provides notifications in JSON format.

Amazon Web Services (AWS) Config provides a simple web services interface that can be used to track modifications made to the resources that belong to an AWS account. The AWS Config App presents modification notifications that contain snapshots of resource configurations and information about the modifications made to a resource. The app uses predefined Live and Interactive Dashboards and filters that provide visibility into your environment for real-time analysis of overall usage.


### Sample Log Message

```json
{
  "Type": "Notification",
  "MessageId": "23accff0-e8cf-5071-8208-8194ed32e94c",
  "TopicArn": "arn:aws:sns:us-west-1:012345678910:sumo-testing-config-topic",
  "Subject": "[AWS Config:us-west-1] AWS::EC2::NetworkAcl acl-979f62f3 Updated in Account 012345678910",
  "Message": "{\"configurationItemDiff\":{\"changedProperties\":{\"Configuration.Entries.1\":{\"previousValue\":null,\"updatedValue\":{\"ruleNumber\":100,\"protocol\":\"-1\",\"ruleAction\":\"allow\",\"egress\":false,\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null},\"changeType\":\"CREATE\"},\"Configuration.Entries.0\":{\"previousValue\":{\"ruleNumber\":100,\"protocol\":\"-1\",\"ruleAction\":\"deny\",\"egress\":false,\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null},\"updatedValue\":null,\"changeType\":\"DELETE\"}},\"changeType\":\"UPDATE\"},\"configurationItem\":{\"configurationItemVersion\":\"1.0\",\"configurationItemCaptureTime\":\"2017-02-24T18:34:32.932UTC\",\"configurationStateId\":64,\"relatedEvents\":[\"3d7cbf2c-95e5-4361-bba9-328fae229a6b\"],\"awsAccountId\":\"012345678910\",\"configurationItemStatus\":\"OK\",\"resourceId\":\"acl-80cbc6f2\",\"ARN\":\"arn:aws:ec2:us-west-1:012345678910:network-acl/acl-979f62f3\",\"awsRegion\":\"us-west-1\",\"availabilityZone\":\"Multiple Availability Zones\",\"configurationStateMd5Hash\":\"8f09d8d531df99b9342e42b4944fdea4\",\"resourceType\":\"AWS::EC2::NetworkAcl\",\"resourceCreationTime\":null,\"tags\":{\"Name\":\"Test-NetworkAcl29\"},\"relationships\":[{\"resourceId\":\"subnet-7c4af186\",\"resourceType\":\"AWS::EC2::Subnet\",\"name\":\"Is attached to Subnet\"},{\"resourceId\":\"vpc-0a013c2e\",\"resourceType\":\"AWS::EC2::VPC\",\"name\":\"Is contained in Vpc\"}],\"configuration\":{\"networkAclId\":\"acl-979f62f3\",\"vpcId\":\"vpc-0002f464\",\"isDefault\":true,\"entries\":[{\"egress\":true,\"ruleNumber\":100,\"protocol\":\"-1\",\"ruleAction\":\"allow\",\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null},{\"egress\":true,\"ruleNumber\":32767,\"protocol\":\"-1\",\"ruleAction\":\"deny\",\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null},{\"egress\":false,\"ruleNumber\":100,\"protocol\":\"-1\",\"ruleAction\":\"allow\",\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null},{\"egress\":false,\"ruleNumber\":32767,\"protocol\":\"-1\",\"ruleAction\":\"deny\",\"cidrBlock\":\"0.0.0.0/0\",\"icmpTypeCode\":null,\"portRange\":null}],\"associations\":[{\"networkAclAssociationId\":\"aclassoc-0bb0606d\",\"networkAclId\":\"acl-979f62f3\",\"subnetId\":\"subnet-e0c822dd\"}],\"tags\":[{\"key\":\"Name\",\"value\":\"Test-NetworkAcl29\"}]}},\"notificationCreationTime\":\"2017-02-24T18:34:32.932UTC\",\"messageType\":\"ConfigurationItemChangeNotification\",\"recordVersion\":\"1.2\"}",
  "Timestamp": "2017-02-24T18:34:32.932UTC",
  "SignatureVersion": "1",
  "Signature": "KHYHMQEABbTnlmwnJSHPiMlxCqwFmkIlSdRMvtW30VgbHnqMUPJ0QMS6S9qU4o8/Hp0R2GMvdxeDAo6/jDa/FSE1wGMxRAdbhyI8eBIeOOkOn7Eiy9C2ZyLrcJvSYwMLMBQDVfyDmUZVILbLb3kXFZGi3sogKpNX/mPlajA4UYOLs5OT9cql++8gHl1cdpZnF+Nh2v1CfKCK+j/Fvx9l30yUTaPwAeApF1+v2jjvsvQ1bUYr+SPJdU/eXxNQkRg+eu4ihM0uxbpltYhU8asfYBbtAm1fEWcKglN1Nv++hIDlv0JBOjK7KeY8Ys/UKwjUgBLRllV3gHjphqMd/91zPw==",
  "SigningCertURL": "https://sns.us-west-1.amazonaws.com/SimpleNotificationService-bb750dd426d95ee9390147a5624348ee.pem",
  "UnsubscribeURL": "https://sns.us-west-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-1:012345678910:sumo-testing-config-topic:2b6cadac-fe50-442b-af34-470e4021df16"
}
```

### Sample Queries

```sql title="Latest Resource Modifications (from App)"
_sourceCategory=AWS_Config Notification ConfigurationItemChangeNotification
| json "Message", "Type"
| where type == "Notification"
| json field=message "messageType","configurationItem" as messageType, single_message
| where messageType = "ConfigurationItemChangeNotification"
| json field=single_message "resourceId", "resourceType", "configurationItemStatus", "awsAccountId" as ResourceId, ResourceType, Status, AWSAccountID
//| where Status = "OK"
// Look up Name stored in tag with key "Name" for each resource. Schedule the 'ResourceNames Lookup Table Generator' search to keep this file up to date.
//| lookup idAndName from /shared/AWSConfig/ResourceNames on resourceType=resourceType, resourceId=resourceId | if(isNull(idAndName), resourceId, idAndName) as resourceId | fields - idAndName
| sort by _messageTime desc
```

```sql title=Configuration Activity by AWS Region** (from App)"
_sourceCategory=AWS_Config Notification ConfigurationItemChangeNotification
| json "Message", "Type" as single_message, type | where type == "Notification"
| json field=single_message "configurationItem.awsRegion" as awsRegion
| where awsRegion != "Not Applicable"
| "" as location
| if (awsRegion = "us-east-1", "38.55,-77.89", location) as location // Northern Virginia
| if (awsRegion = "us-west-1", "43.96,-121.70", location) as location // Oregon
| if (awsRegion = "us-west-2", "39.06,-121.54", location) as location // Northern California
| if (awsRegion = "us-gov-west-1", "44.34,-118.61", location) as location // ?? Also Oregon ??
| if (awsRegion = "eu-west-1", "53.31,-7.91", location) as location // Ireland
| if (awsRegion = "eu-central-1", "50.12,8.67", location) as location // Frankfurt
| if (awsRegion = "ap-southeast-1", "1.29,103.85", location) as location // Singapore
| if (awsRegion = "ap-southeast-2", "-33.85,151.15", location) as location // Sydney
| if (awsRegion = "ap-northeast-1", "35.68,139.75", location) as location // Tokyo
| if (awsRegion = "sa-east-1", "-23.57,-46.63", location) as location // Sao Paulo
| split location delim=',' extract 1 as latitude, 2 as longitude
| count by latitude, longitude
| sort _count
```

## Collecting Logs for the AWS Config App

### Prerequisites

Before you can begin to use the AWS Config App, perform these steps.

1. Enable SNS Notifications in AWS Config.
2. Add a Sumo Logic Hosted Collector and HTTP Source.
3. Subscribe to SNS Notifications in AWS Config.
4. **Optional:** Create a Partition for AWS Config Logs


#### Enable SNS Notification in AWS Config

To enable AWS Config SNS Notifications:
1. Sign in to the AWS Management Console.
2. Under **Management Tools**, click **Get Started**, then click **Config**.
3. On the Set up AWS Config page, under **Amazon SNS Topic**, select **Enable Configuration changes and notifications to be streamed to an Amazon SNS topic**.
1. Select **Create new topic** and click **Continue**.
Creating a new topic also creates a new S3 bucket.
2. On the page labeled "AWS Config is requesting permissions to read your resources’ configuration," click **Allow**. This authorizes AWS Config to read the configuration of your resources for the purpose of delivery via Amazon SNS.
3. **Optional:** Expand the **View Details** section to configure the IAM Role and Policy that AWS Config will use.

For more information on SNS, see [http://docs.aws.amazon.com/sns/latest/dg/GettingStarted.html](http://docs.aws.amazon.com/sns/latest/dg/GettingStarted.html).


### Configure a Collector

In Sumo Logic, create a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector). Be sure to name the Source Category **aws_config**.


### Configure a Source

Next, configure an [HTTP Source](/#Collect-logs-for-the-AWS-Config-App).

1. Configure the Source fields:
    1. Name. (Required) Eg. AWS Config
    2. Source Category. (Required) Eg. aws_config. For details on creating good source categories see Best Practices.
2. Configure the Advanced section:
    3. **Enable Timestamp Parsing**. True
    4. **Time Zone**. Use Time Zone From Log File
    5. **Timestamp Format**. Auto Detect
    6. **Enable Multiline Processing**
      **Detect Messages Spanning Multiple Lines**. False
    7. **Enable One Message Per Request**. True
3. Click **Save**.

Copy the **HTTP Source Address URL** and use it in the following section.


### Subscribe to SNS Notifications

Once the Hosted Collector and HTTP Source are configured, you can subscribe to AWS Config’s SNS Notifications.

1. In the** **AWS Management Console, go to **SNS > Topics**.
2. Select the check box for the topic you created when you enabled SNS notifications.
3. Under **Amazon SNS**, in the **Actions** menu, select **Subscribe to Topic**.
4. Under **Protocol**, select **HTTPS**, and paste the Sumo Logic HTTP Source URL into the **Endpoint** field.
5. Click **Create Subscription**.

In a few minutes, a confirmation message will be sent to Sumo Logic. In Sumo Logic, search for the new message from your HTTP Source with a query such as `_sourceCategory="aws_config".
`
Parse the message for the JSON field **SubscribeURL** and copy it to your clipboard, as shown.

1. In the AWS Management Console, select **SNS >Topics**.
2. Under **Amazon SNS**, under **Actions**, select **Confirm a subscription**.
3. Paste the SubscribeURL into the **Subscription confirmation URL** field, and click **Confirm subscription**.

For more information about SNS notifications, see the [Amazon documentation](http://docs.aws.amazon.com/sns/latest/dg/SubscribeTopic.html).


#### Optional: Create a Partition for AWS Config Logs

This section is optional, but recommended for better search performance.

Due to the infrequent nature of AWS Config changes, Sumo Logic recommends creating a partition for logs. A partition will provide better search performance, especially if there is high data volume in your account.

To create a partition, follow the instructions to [Create a Partition](/docs/manage/partitions-data-tiers/create-edit-partition.md). Name the index **aws_config**. For the Routing Expression, enter a query that isolates messages from AWS Config, such as `_sourceCategory=aws_config`.

## Installing the AWS Config App

Now that you have configured AWS Config, install the Sumo Logic App for AWS Config to take advantage of the pre-configured searches and dashboards to analyze your AWS Config data.

{@import ../../reuse/apps/app-install.md}

## Viewing AWS Config Dashboards

This section describes the dashboards provided by the AWS Config app. For general information about dashboards, see [About Dashboards](/docs/dashboards/about).

The AWS Config app is an older application, implemented when Sumo dashboards could not be toggled back and forth between Live and Interactive mode. For this reason, the app provides two versions of the AWS Config Overview dashboard, one that runs in Live mode, and one that runs in Interactive mode.


### AWS Config Overview

The AWS Config Overview dashboard runs in Live mode. Live mode dashboards automatically refresh; they do not backfill with historical data.  An interactive version of this dashboard, described in the following section, is also provided.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-config-overview.png')} alt="AWS Config" />

**Recent Modifications.** Displays the number of Resource Change Notifications as a single value chart for the last 24 hours.

**Configuration Activity by AWS Region.** Shows the distribution of the Resource Change Notifications by AWS Region in a map chart for the last 14 days.

**Changed Resources by Type.** Provides the Resource Change Notifications of type “OK” in a pie chart of (Resource Changed, not Created or Deleted) grouped by Resource Type for the last 14 days.

**Resource Modifications Trend.** Provides the distribution of the Resource Change Notifications by AWS Resource in a stacked bar chart for the last 14 days.

**Discovered Resources by Type.** Displays the Resource Change Notifications of type “ResourceDiscovered” grouped by Resource Type in a pie chart for the last 14 days.

**Modifications by Day - Outlier.** Displays the quantity of Resource Change Notifications grouped by day in an outlier line chart for the last 14 days.

**Modifications by Day - Trend.** Shows the quantity of Resource Change Notifications in a line chart with a trend line grouped by day for the last 14 days.

**Deleted Resources by Type.** Displays the Resource Change Notifications of type “ResourceDeleted” grouped by Resource Type in a pie chart for the last 14 days.


### AWS Overview - Interactive

This dashboard is identical to the [AWS Config Overview](#AWS_Config_Overview) dashboard, described above, but runs in interactive mode. In interactive mode, a dashboard backfills with historical data, per your selected time range, but does not automatically refresh. You can manually refresh an interactive dashboard, by refreshing your browser, or using the **Refresh** option on the Details menu on the dashboard.


### Resource Modifications Details - Interactive

This dashboard runs in interactive mode. As described above, interactive dashboards backfills with historical data, and must be manually refreshed to see new data.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Config_app_resource.png')} alt="AWS Config" />

**Resource Modifications.** Shows a table of recent Resource Change Notifications, including the configuration diff provided in the SNS Notification for the last six hours.

**Resource Relationships.** Displays a table of relationships related to the resources modified in recent Resource Change Notifications for the last six hours.

**Resource Tags.** Provides a table of tags related to the resources modified in recent Resource Change Notifications for the last six hours.

**Resource Modifications Trend.** Displays the distribution of the Resource Change Notifications by AWS Resource in a stacked column chart for the last 14 days.

**Network ACL Rules.** Shows a table of Network ACL Rules related to the NetworkAcl resources modified in recent Resource Change Notifications for the last six hours.

**VPN Gateway Telemetry.** Provides a table of Telemetry messages related to the VPNConnection resources modified in recent Resource Change Notifications for the last six hours.


#### Filters

The following filters are provided for use with the **AWS Overview - Interactive and Resource Modifications Details - Interactive** dashboards.
* **Resource Type.** The type of the resource modified. Examples: `AWS::EC2::Instance`, `AWS::EC2::NetworkAcl`
* **Resource Id.** The id of the resource modified. Examples: `vpc-0000001`, `i-ffffffff`
* **Region.** The AWS Region where the resource modified is located. Examples: `us-east-1`, `us-west-2`
* **Account Id.** The AWS Account containing the resource modified. Example: `1234567891011`
* **Tag.** The Tag key displayed in the Resource Tags panel. Examples: `Name`, `Stack`.
* **Tag Value.** The Tag Value displayed in the Resource Tags panel. Examples: `Test-VPN`, `DB Instance`.
