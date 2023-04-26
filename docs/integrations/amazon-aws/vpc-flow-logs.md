---
id: vpc-flow-logs
title: Amazon VPC Flow Logs
description: Logs the IP network traffic of your VPC, allowing you to troubleshoot traffic and security issues.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/vpcflowlogs.png')} alt="Thumbnail icon" width="50"/>

Amazon Virtual Private Cloud (VPC) Flow Logs log the IP network traffic of your VPC, allowing you to troubleshoot traffic and security issues. The Amazon VPC Flow Logs App leverages this data to provide real-time visibility and analysis of your environment. It consists of predefined searches and Dashboards.

For more information on Amazon VPC Flow Logs, see [here](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html).

## Collecting Amazon VPC Flow Logs

This section has instructions for collecting VPC Flow Logs using a CloudFormation template.

VPC Flow Logs can be published to Amazon CloudWatch Logs and Amazon S3. You can use either of these methods to collect Amazon VPC Flow Logs:
* [From CloudWatch using CloudFormation](#collecting-amazon-vpc-flow-logs-from-cloudwatch-using-cloudformation)
* [Using an Amazon S3 source](#collecting-amazon-vpc-flow-logs-using-an-amazon-s3-source)

Each method has advantages. Using an Amazon S3 source is more reliable, while using a CloudWatch Logs source with the CloudFormation template allows you to optimize your logs. With the CloudWatch Logs source and CloudFormation template, you can customize logs by adding more information and filtering out unwanted data. The Security Groups dashboard utilizes customized logs that are generated from the Lambda function and created with the CloudFormation template from logs sent to CloudWatch Logs.

### Collecting Amazon VPC Flow Logs from CloudWatch using CloudFormation

This section has instructions for collecting VPC Flow Logs using a CloudFormation template. The diagram below illustrates the collection process for Amazon VPC Flow Logs. VPC is enabled to send logs to Amazon CloudWatch. A Lambda function subscribes to a CloudWatch Log Group to obtain the flow logs, and then sends the data on to a Sumo Logic HTTP Source on a hosted collector. The AWS resources are created by a Sumo-provided CloudFormation template.

<img src={useBaseUrl('img/integrations/amazon-aws/AWSCloudWatch-Collection.png')} alt="flow" />


#### Step 1: Enable Amazon VPC Flow Logs

You can enable Amazon Virtual Private Cloud (VPC) Flow Logs from the Amazon Web Services (AWS) Management Console, the AWS Command Line Interface (CLI), or by making calls to the Elastic Compute Cloud (EC2) API.

To enable Amazon Virtual Private Cloud (VPC) Flow Logs from the AWS console:
1. Go to **VPC management**, and go to the VPC list.
2. Select the VPC.
3. Click **Actions** > **Create Flow Log**.
4. On the **Create Flow Log** page, select a **Role** to use Flow logs.
    1. If you haven't set up IAM permissions, click **Set Up Permissions**.
    2. From the new tab, **VPC Flow Logs is requesting permissions to use resources in your account**:
    3. From the IAM Role, select **Create a new IAM Role.**
    4. Add a Role Name that describes your logs, for example, VPC-Flow-Logs.
    5. Click **Allow**.
5. Back in **Create Flow Log**, enter the new role you created in **Role.**
6. In **Destination Log Group** enter a descriptive name such as **VPCFlowLogs**.
7. Click **Create Flow Log**. It can take up to an hour for the log group to show up in CloudWatch Logs.


#### Step 2: Configure hosted collector and HTTP source

1. Configure a [Hosted Collector ](/docs/send-data/hosted-collectors/configure-hosted-collector)in Sumo Logic.
2. Configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics) in Sumo Logic. When configuring the source:
3. Under **Advanced Options for Logs**, for **Timestamp Format**, click **Specify a format**.
4. **Format**. Enter: `epoch`
5. **Timestamp locator**. Enter:
  ```
  \s(\d{10,13})\s\d{10,13}
  ```
6. Click **Save**.


#### Step 3: Create AWS functions and resources  

Follow the steps on [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), starting with the [Download the CloudFormation template](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs#Download_the_CloudFormation_template) step and ending with the [Dealing with alarms](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs#Dealing_with_alarms) step. As you perform the procedure note the additional instructions below, regarding log format and optional environment variables.


#### Configure LogFormat correctly (Required)  

When you [Create a stack on the AWS CloudFormation console](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs#Create_a_stack_on_the_AWS_CloudFormation_console), in Step 5, make sure you select either VPC-JSON or VPC-RAW in the LogFormat field in the Specify Details window.

#### Environment variables for VPC flow log collection (Optional)
When you [Configure environment variables for Lambda functions](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs#Configure_environment_variables_for_Lambda_functions), in addition to the variables listed, you can optionally also define the following environment variables.

If you define the environment variables below, do it for both of the Lambda functions created by the CloudFormation template.

<table>
  <tr>
   <td><strong>Environment variable</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td><code>INCLUDE_SECURITY_GROUP_INFO</code></td>
   <td>This option is supported only if you set <code>LogFormat </code>to VPC-JSON
<p>Set to <code>true</code> to include the following fields in logs:</p>
<p>vpc-id</p>
<p>subnet-id</p>
<p>aws-region</p>
<p>security-group-ids</p>
<p>direction</p>
<p>If you set the value to <code>true</code>, follow the instructions in <a href="#Grant-Lambda-permissions-Optional">Grant Lambda permissions (Optional)</a>.</p></td>
  </tr>
  <tr>
   <td><code>VPC_CIDR_PREFIX</code></td>
   <td>Comma-separated list of IP prefixes for filtering out internal traffic. For example <code>vpcCIDRprefix= 10.8.0.0,10.9.0.0</code> filters out logs whose <code>destinationIP</code> and <code>sourceIP</code> matches any of the two prefixes <code>10.8.0.0</code> and <code>10.9.0.0</code>.
   <p><code>"Ex if VPC_CIDR_PREFIX = "10.0." then all the IP's with 10.0.*.* will match the prefix"</code></p>
   </td>
  </tr>
</table>



#### Grant Lambda permissions (Optional)

This step is supported only if `INCLUDE_SECURITY_GROUP_INFO` is set to true.

The Lambda function fetches list of Elastic Network Interfaces using the `describeNetworkInterfaces` API. You need to grant permission to Lambda by adding the following inline policy in the  `SumoCWLambdaExecutionRole` role. See the instructions on [Creating Policies on the JSON Tab](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html#access_policies_create-json-editor) in AWS help.

Paste the JSON below, after adding the ARN of the Lambda functions.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DescribeENILambdaPerms",
            "Effect": "Allow",
            "Action": "ec2:DescribeNetworkInterfaces",
            "Resource": "*"
        }
    ]
}
```

#### Step 4: Subscribe the Lambda function to the VPC Flow Log group

1. Select the VPC Flow Log group in the CloudWatch Logs management panel. This is the Log Group created in the first part (VPCFlowLogs was used).
2. Click **Actions** and select **Stream to Lambda Function**.
3. Select the Lambda function created by the CloudFormation template. Its name starts with "SumoCWLogsLambda".
4. Click **Next**.
5. Select **JSON** for **Log Format**.
6. Click **Next**.
7. Click **Start Streaming**. Wait a few minutes, and check to make sure your logs are flowing into Sumo.



### Collecting Amazon VPC Flow Logs using an Amazon S3 Source

This section has instructions for collecting Amazon VPC Flow Logs using an Amazon S3 source. If you prefer to collect VPC logs using a CloudFormation template, see [Collect Amazon VPC Flow Logs using a CloudFormation Template](#collecting-amazon-vpc-flow-logs-from-cloudwatch-using-cloudformation).


#### Step 1: Enable Amazon VPC Flow Logs  

1. You can use an existing S3 bucket, or create a new one, as described in [Create a S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) in AWS help.
2. Create flow logs for your VPCs, subnets, or network interfaces. For instructions, see [Creating a Flow Log that Publishes to Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html#flow-logs-s3-create-flow-log) in AWS help.
3. Confirm that logs are being delivered to the S3 bucket. Log files are saved to the bucket using following folder structure:
`bucket_ARN/optional_folder/AWSLogs/aws_account_id/vpcflowlogs/region/year/month/day/log_file_name.log.gz`.


#### Step 2: Configure Amazon S3 source  

1. [Grant Access to an Amazon S3 Bucket](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product.md).
2. [Enable logging using the AWS Management Console](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html).
3. When you create an AWS Source, you associate it with a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use, or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
4. Add an [AWS Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source) for the S3 Source to Sumo Logic. When you configure the S3 source:
    1. In the **Advanced Options for Logs** section, uncheck the **Detect messages spanning multiple lines** option.
    2. In the **Processing Rules for Logs** section, add an **Exclude messages that match** processing rule to ignore the following file header lines: `version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status`.


## Field Extraction Rule(s) for VPC Flow logs

Create Field Extraction Rule for VPC Flow Logs.
```
Rule Name: VPCFlowLogFER
Applied at: Ingest Time
Scope (Specific Data):
_sourceCategory=<Source category for respective VPC flow log source>
Parse Expression:
json "message" as _rawvpc nodrop
| if (_raw matches "{*", _rawvpc,_raw) as message
| parse field=message "* * * * * * * * * * * * * *" as version,accountID,interfaceID,src_ip,dest_ip,src_port,dest_port,Protocol,Packets,bytes,StartSample,EndSample,Action,status
| fields interfaceid,src_ip,dest_ip,src_port,dest_port,protocol,packets,bytes,action,status
```

## Installing the Amazon VPC Flow Logs App

Now that you have configured Amazon VPC Flow Logs, install the Sumo Logic App for Amazon VPC Flow Logs to take advantage of the preconfigured searches and [dashboards](#viewing-dashboards) to analyze your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).

3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Amazon VPC Flow Logs Dashboards


### Overview

The **Amazon VPC Flow Logs - Overview** dashboard provides an overview of IP traffic going to and from network interfaces in your VPC, including the geolocation of source addresses, the top 10 sources and destinations by MB, rejections per minute, and a breakdown of accepted vs. rejected connections.

**Use case**: Use this dashboard for an overview of traffic flowing through your network. It gives a list of top source and destination addresses, protocols and network interfaces which can be helpful in narrowing the ranges to only those IP addresses or protocols required for the application.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Overview.png')} alt="Amazon VPC Flow Logs Dashboards" />

#### Filtering the Overview dashboard

You can filter the Overview dashboard by any combination of `DestinationIP`, `SourceIP`, `action`, `dest_port`, `interfaceid`, `protocol`, and `src_port`.

### Accepts

**Amazon VPC Flow Logs - Accepts** dashboard provides information about accepted connections, including the geolocation of source addresses for accepted connections, the top 10 accepts by Interface ID and protocol, and the top 10 destination addresses.

**Use case:** Use this dashboard to track requests that are permitted by Security Groups and Network ACLs.One can compare bytes and packets received per minute with yesterday and last week. Similarly one can also track abnormal activity and volume spikes.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Accepts.png')} alt="AWS API Gateway" />


#### Filtering the Accepts dashboard
In the filters pane, you can can configure these parameters for the [outlier](/docs/search/search-query-language/search-operators/outlier) analysis performed by the "Accepts by Minute - Outlier" panel:  Consecutive, Threshold, Window, and Timeslice.

You can also filter Accepts dashboard by any combination of `DestinationIP`, `SourceIP`, `dest_port`, `interfaceid`, `protocol`, and `src_port`.



### Rejects

**Amazon VPC Flow Logs - Rejects** dashboard provides information about rejected connections, including the geolocation of source addresses for rejected connections, the top 10 rejects by Interface ID and protocol, and the top 10 destination addresses.

**Use case**: Use this dashboard to track requests that are not permitted by Security Groups and Network ACLs.One can compare bytes and packets rejected per minute with yesterday and last week. One can monitor top source IP's and ports from where the requests are rejected.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Rejects.png')} alt="amazon-vpc-flow-logs" />


#### Filtering the Rejects dashboard

In the filters pane, you can can configure these parameters for the [outlier](/docs/search/search-query-language/search-operators/outlier) analysis performed by the "Rejects by Minute - Outlier" panel: Consecutive, Threshold, Window, and Timeslice.

You can also filter the Rejects dashboard by any combination of `DestinationIP`, `SourceIP`, `dest_port`, `interfaceid`, `protocol`, and `src_port`.



### Traffic

**Amazon VPC Flow Logs - Traffic** dashboard provides traffic details, including the counts of unique traffic sources and destinations, the total accepted and rejected traffic, the top 10 source and destination ports, and analyses of bytes and packets transmitted.

**Use case description**: Use this dashboard for comparing the permissive and non permissive traffic based on ports, protocols and network interfaces. Also one can monitor abnormal behavior, current and future trends based on total packets and bytes flowing across the network. One can filter by Action to filter out data for permissive and non permissive traffic. Similarly one can filter by `interfaceid`, `src_ip`, `dest_ip`, `src_port`, `dest_port` to further filter out the traffic for analysis.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Traffic.png')} alt="amazon-vpc-flow-logs-traffic" />

#### Filtering the Traffic dashboard

In the filters pane, you can can configure these parameters for the [outlier](/docs/search/search-query-language/search-operators/outlier) analysis performed by several panels: Consecutive, Threshold, Window, and Timelice.

You can also filter the Traffic dashboard by any combination of `DestinationIP`, `SourceIP`, `action`, `dest_port`, `interfaceid`, `protocol`, and `src_port`.


### Security Groups

**Amazon VPC Flow Logs - Security Groups** dashboard provides information about security groups, subnet and vpc along with flow direction inbound/outbound including the top vpc,subnet by bytes flow, top 5 security groups by packets, number of unique vpc,subnet and security group and destination port distribution by security group.

Key facts about this dashboard:
* This dashboard is populated only if you chose VPC-JSON option for LogFormat when you deployed the CloudFormation template.
* If your network interface has multiple IPv4 addresses and traffic is sent to a secondary private IPv4 address, the flow log displays the primary private IPv4 address in the destination IP address field.
* The Direction field has three values:
    * internal. The SourceIP and DestinationIP both are from same subnet,
    * inbound. The DestinationIP matches the ENI's private IP address.
    * outbound. iThe SourceIP matches the ENI’s private IP address.

**Use case:**  Use this dashboard for monitoring the traffic direction. Also use this dashboard for identifying over permissive and restrictive security groups.One can also use this to identify unused security groups and inbound rules by comparing the traffic associated with the security group to the security group rules in EC2 console.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Security-Groups.png')} alt="amazon-vpc-flow-logs-security-groups" />

#### Filtering the Security Groups dashboard

In the filters pane, you can can configure these parameters for the [outlier](/docs/search/search-query-language/search-operators/outlier) analysis performed by several panels:  Consecutive, Threshold, Window, and Timeslice.

You can also filter the Security Groups dashboard by any combination of `DestinationIP`, `SourceIP`, `action`, `dest_port`, `interfaceid`, `protocol`, `security_grp_id`,  `src_port`, `subnet_id`, and `vpc_id`.

### Outliers

**Amazon VPC Flow Logs - Outliers** dashboard provides panels which show any outliers around Bytes, Packets and Accepted/Rejected traffic. In addition to this there is a separate section “Security Group” which has panels for outliers with respect to inbound and outbound traffic. This dashboard is populated only if you chose VPC-JSON option for LogFormat when you deployed the CloudFormation template.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-VPC-Flow-Logs/Amazon-VPC-Flow-Logs-Outliers.png')} alt="amazon-vpc-flow-logs-outliers" />

#### Filtering the Outlier dashboard

In the filters panel, you can configure these parameters for the outlier analysis performed by several panels: Consecutive, Threshold, Window, and Timeslice.
