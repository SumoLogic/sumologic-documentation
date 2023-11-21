---
id: cloud-infrastructure-security-for-aws
title: Cloud Infrastructure Security for AWS
description: The Cloud Infrastructure Security for AWS app provides visibility into your AWS environment to give you insights into active threats, security control failures, and suspicious activity. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-logo.png')} alt="Cloud Infrastructure Security for AWS logo" width="100"/>

The Cloud Infrastructure Security for AWS app provides a unified security and compliance audit view of your AWS infrastructure, and insight into threat activity across the environment. It leverages native AWS tools and telemetry to accelerate the work of security and reliability management. 

Key features of the app include:
* **Active threat monitoring**. See threats in APIs, resources, and storage.
* **Security compliance failure identification**. See areas in your environment that need to be addressed because they do not comply with required security standards.
* **Suspicious activity assessment**. See activity identified by anomaly detection across users, web interactions, networks, and Identity Access Management (IAM).
* **Risk overview**. See a summary of all resources that pose risks, and get an action plan for addressing the most important areas of concern.

Data presented in the app’s dashboards is normalized from log sources into AWS Elastic Common Schema (ECS) format, providing seamless data presentation of all your AWS data. 

Use Sumo Logic’s [monitoring](/docs/alerts/monitors/) to receive alerts from the app. To see monitors for the app, go to **Manage Data > Monitoring** and select the **Cloud Infrastructure Security** folder. 

## Log types

The Cloud Infrastructure Security for AWS app utilizes the following log types:
* [Amazon CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html) 
* [Amazon GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
* [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
* [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
* [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html) 

## Sample log message

```
{ 
  "eventVersion":"1.01",
  "userIdentity":{ 
     "type":"IAMUser",
     "principalId":"AIDA4XQZKIVURYEOA",
     "arn":"arn:aws:iam::95619384238:user/Olaf",
     "accountId":"95238468",
     "userName":"system"
  },
  "eventTime":"2017-09-27T20:00:10Z",
  "eventSource":"signin.amazonaws.com",
  "eventName":"ConsoleLogin",
  "awsRegion":"us-east-1",
  "sourceIPAddress":"192.0.2.0",
  "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36",
  "requestParameters":null,
  "responseElements":{ 
     "ConsoleLogin":"Failure"
  },
  "additionalEventData":{ 
     "MobileVersion":"No",
     "LoginTo":"https://console.aws.amazon.com/console/home?state\u003dhashArgs%23\u0026isauthcode\u003dtrue",
     "MFAUsed":"No"
  },
  "eventID":"f36c1d07-73cf-4ab8-84b1-04c93ad3aaeb"
}
```

## Sample query

##### Failed Console Logins

```
_sourceCategory=Labs/AWS/CloudTrail ("ConsoleLogin" and "Failed authentication")
| json "eventName","sourceIPAddress","userIdentity.userName","userIdentity.principalId","responseElements.ConsoleLogin","additionalEventData.MFAUsed" ,"eventSource","awsRegion","eventType","eventCategory","userIdentity.type","eventTime","requestParameters.AccessControlPolicy.AccessControlList.Grant[*].Permission","errorCode","userIdentity.accountId","errorMessage" as event.action,server.ip,user.name,user_principal, login_result,mfa_used,event_source,cloud.region,event_type,event_category,user_identity_type,event_time,permission,error_code,cloud.account.id,error_message nodrop
| if(isEmpty(user.name), if(isEmpty(user_principal),"NA",user_principal), user.name) as user.name
// global filters
| where if ("*" = "*", true,user.name matches "*") AND if ("*" = "*", true, cloud.region matches "*") AND if ("*" = "*", true, cloud.account.id matches "*") AND if ("*" = "*", true, server.ip matches "*")
| where (event.action matches "ConsoleLogin" and error_message matches "Failed authentication")
// z-score calculation
| timeslice 3h
| count as eventCount by user.name, event.action, event_source, cloud.account.id, cloud.region, _timeslice
| sort + _timeslice
| rollingstd eventCount as eventCount_std by user.name, event.action, event_source, cloud.account.id, cloud.region
| smooth eventCount as eventCount_mean by user.name, event.action, event_source, cloud.account.id, cloud.region
| eventCount_std + 0.1 as eventCount_std
| (eventCount - eventCount_mean) / eventCount_std as zscore
| sort + _timeslice
| max(zscore) as max_zscore by user.name, event.action, event_source, cloud.account.id, cloud.region
| round(max_zscore, 2) as max_zscore
| where max_zscore > "1"
| sort - max_zscore
```

## Collecting logs for Cloud Infrastructure Security for AWS

The app collects logs from different AWS sources to produce data in the dashboards. When you install the app, data will be collected from sources, including:
* [Amazon CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html) 
* [Amazon GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
* [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
* [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
* [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)

## Install the Cloud Infrastructure Security for AWS app

Install the app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of usage. 

1. From the **App Catalog**, search for and select the app.
1. Click **Install App**.  
1. In the **Deploy Cloud Infrastructure for AWS** screen, perform the following steps:
   1. **Select Region**. Select the AWS region where you want to deploy the solution. 
    :::warning
    This step is critical. If you do not select the correct region, you will deploy the solution in the wrong region.
    :::
   1. **Check AWS Role Permission**. Click the button to sign in to AWS and perform a check to see if you have permissions to install the solution. If your AWS role does not have the necessary permissions, see the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html) for information on configuring a policy to provide permissions.
   1. **Deploy AWS**. Click the **Deploy AWS Security** button to deploy the solution.  <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-1.png')} alt="Deploy Cloud Infrastructure for AWS screen" style={{border: '1px solid black'}} width="700"/>
1. In **Quick Create Stack**, fill out the fields to create the stack from the CloudFormation template.
   1. In **Stack Name**, enter a name for the stack. The stack name can include letters (A-Z and a-z), numbers (0-9), and dashes (-).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-quick-create-stack.png')} alt="Create stack" style={{border: '1px solid black'}} width="700"/> 
   1. In **1. Sumo Logic Configuration**, fill out the following:
      * **Sumo Logic deployment location**. Choose the geographic location of the deployment of the Sumo Logic apps: au, ca, de, eu, jp, us2, us1, in, or fed.
      * **Sumo Logic access ID**. Enter the Sumo Logic console access ID, which you received when you created the access key.
      * **Sumo Logic access key**. Enter your Sumo Logic access key. Retrieve this from your Sumo Logic account.
      * **Sumo Logic organization ID**. Enter your Sumo Logic organization ID, which you can find in the Sumo Logic console, under Account.
      * **Delete Sumo Logic resources when stack is deleted**. Choose **false** if you do not want to remove the collector, sources, and Sumo Logic apps when the stack is deleted. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-1.png')} alt="Sumo Logic configuration" style={{border: '1px solid black'}} width="700"/> 
   1. In **2. AWS Organization configuration**, fill out the following:
      * **Security-tooling account ID**. Enter your security-tooling account ID.
      * **Log-archiving account ID**. Enter your log-archiving account ID.
      * **Security-tooling and log-archiving account Region**. Enter your security-tooling and log-archiving account Region if it's different from the default.
      * **AWS Organization root ID**. Enter the ID for your organization root. This string requires `r-` followed by from 4 to 32 lowercase letters or digits.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-2.png')} alt="AWS organization configuration" style={{border: '1px solid black'}} width="700"/> 
   1. In **3. AWS Service configuration**, fill out the following:
      * **Publish AWS GuardDuty data to Sumo**. Ensure AWS GuardDuty Service is enabled. Choose **No** otherwise.
      * **Publish AWS CloudTrail data to Sumo**. Ensure AWS CloudTrail Service is enabled. Choose **No** otherwise.
      * **Publish AWS Security Hub data to Sumo**. Ensure AWS Security Hub Service is enabled. Choose **No** otherwise.
      * **Publish AWS WAF data to Sumo**. Ensure AWS WAF Service is enabled. Choose **No** otherwise.
      * **Publish AWS Network Firewall data to Sumo**. Ensure AWS Network Firewall Service is enabled. Choose **No** otherwise.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-3.png')} alt="AWS service configuration" style={{border: '1px solid black'}} width="700"/> 
   1. For GuardDuty configuration:
      * Under **4.1 GuardDuty service configuration**, for **GuardDuty Regions** enter regions from which GuardDuty Data should be sent.
      * Under **4.2 GuardDuty Sumo log source configuration**, in **Create Sumo Logic HTTP logs source** choose **Yes** to create the Sumo Logic HTTP log source to collect GuardDuty logs, or choose **No** to skip creation.
      * **Sumo Logic HTTP logs source category name**. Provide an existing source category name from the GuardDuty logs. This is used for app installation. Required when **Create Sumo Logic HTTP logs source** is set to **No**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-4.png')} alt="GuardDuty configuration" style={{border: '1px solid black'}} width="700"/> 
   1. For CloudTrail configuration:
      * Under **5.1 CloudTrail service configuration**, in **CloudTrail Regions**, enter regions from which CloudTrail Data should be sent.
      * Under **5.2 CloudTrail Sumo log source configuration**, under **Create Sumo Logic S3 logs source for CloudTrail**, choose **Yes** to create the Sumo Logic S3 log source to collect CloudTrail logs, or choose **No** to skip creation.
      * **Path expression for logs**. The path expression must match the folder structure for CloudTrail logs (for example, `AWSLogs/*/CloudTrail/*`).
      * **Sumo Logic CloudTrail logs source category name**. Required when the flag is set to **No**. Provide the name of an existing Sumo Logic source category that's collecting CloudTrail logs. This is also used for Threat Intel for AWS app installation.
      * Under **5.3 CloudTrail S3 bucket configuration**, in **Create an S3 bucket for CloudTrail logs**, choose **Yes** to create an S3 bucket for CloudTrail logs.
      * **Name of existing S3 bucket that contains the CloudTrail logs**. Provide the name of an existing S3 bucket that contains CloudTrail logs. Required when the flag is set to **No**. The existing bucket must be in same AWS Region as the log-archiving account. 
      * **Delivery bucket prefix**. Enter the log delivery S3 bucket prefix. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-5.png')} alt="CloudTrail configuration" style={{border: '1px solid black'}} width="700"/> 
   1. For Security Hub configuration:
      * Under **6.1 Security Hub Service Configuration**, in **Security Hub Regions**, enter regions from which Security Hub Data should be sent.
      * Under **6.2 Security Hub Sumo Log Source configuration**, in **Create Sumo Logic HTTP logs source**, select **Yes** to create Sumo Logic HTTP log source to collect Security Hub logs, or select **No** to skip creation.
      * **Sumo Logic HTTP logs source category name**. Provide an existing source category name from the Security Hub logs. This is used for app installation. Required when **Security Hub HTTP LogSource** is set to **No**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-6.png')} alt="Security Hub configuration" style={{border: '1px solid black'}} width="700"/> 
   1. For firewall configuration:
      * Under **7.1 AWS Firewall Manager Policy Regions Configuration**, in **AWS WAF Policy Regions**, enter regions from which AWS WAF data should be sent.
      * **AWS Network Firewall Policy Regions**. Enter regions from which AWS Network Firewall data should be sent.
      * Under **7.2 Firewall Manager Details - Kinesis Firehose Delivery Stream Source WAF Configuration**, in **Create a Kinesis Firehose Delivery Stream Source for WAF**, select **Yes** to create Kinesis Delivery Stream Source for WAF, or select **No** to skip creation.
      * **Sumo Logic AWS Kinesis Firehose Logs WAF Source Category Name**. Enter the name if a source category from Sumo Logic if it already exists. To create a new source category, use the default name provided.
      * **Amazon Kinesis Data Firehose delivery stream name**. Enter the Amazon Kinesis Data Firehose (Kinesis Data Firehose) delivery stream name.
      * Under **7.3 Firewall Manager Details - S3 Source Network Firewall Configuration**, in **Create Sumo Logic Amazon S3 Logs Source for Network Firewall**, select **Yes** to create a Sumo Logic Amazon S3 Log Source with the provided bucket name. Select **No** to skip creation.
      * **Sumo Logic Amazon S3 Logs Source Category Name for Network Firewall**. Enter the name of a source category from Sumo Logic if it already exists. To create a new source category, use the default name provided.
      * Under **7.4 Firewall Manager - S3 Bucket Configuration**, in **Create AWS S3 Bucket**, select **Yes** to create a new S3 bucket in AWS S3. Select **No** to use an existing S3 bucket from AWS S3 which has Network Firewall Logs.
      * **Network Firewall Delivery Bucket Prefix**. Enter the Network Firewall Log Delivery S3 bucket prefix.
      * **Name of existing S3 Bucket which contains the Network Firewall Logs**. Provide an existing S3 Bucket name which contains Network Firewall Logs. Required when flag is set to **No**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-7.png')} alt="Firewall configuration" style={{border: '1px solid black'}} width="700"/> 
   1. For Quick Start configuration:
      * Under **8. AWS Quick Start configuration**, in **Quick Start S3 bucket name**, enter the name of the S3 bucket for your copy of the Quick Start assets. Keep the default name unless you are customizing the template. Changing the name updates code references to point to a new Quick Start location. This name can include numbers, lowercase letters, uppercase letters, and hyphens, but do not start or end with a hyphen (-). See https://aws-quickstart.github.io/option1.html.
      * **Quick Start S3 key prefix**. Enter the S3 key prefix that is used to simulate a directory for your copy of the Quick Start assets. Keep the default prefix unless you are customizing the template. Changing this prefix updates code references to point to a new Quick Start location. This prefix can include numbers, lowercase letters, uppercase letters, hyphens (-), and forward slashes (/). End with a forward slash. See https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html and https://aws-quickstart.github.io/option1.html.
      * **Quick Start S3 bucket Region**. Enter the AWS Region where the Quick Start S3 bucket (QSS3BucketName) is hosted. When using your own bucket, you must specify this value.
      * **Quick Start Version**. Enter the version of the Quick Start. Do not change.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-8.png')} alt="Quick start configuration" style={{border: '1px solid black'}} width="700"/> 
   1. Under **Permissions**, in **IAM role - optional**, choose the IAM role for CloudFormation to use for all operations performed on the stack. 
   1. Under **Capabilities and transforms**, select the acknowledgement boxes.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-permissions.png')} alt="Create Stack button" style={{border: '1px solid black'}} width="700"/> 
1. Click **Create Stack**. The stack is created, and the app is installed.
1. Click **Start Using Sumo**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-start-using-sumo.png')} alt="Start Using Sumo button" style={{border: '1px solid black'}} width="400"/>
1. Select an option to start using the app. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-finish-installation.png')} alt="App hub page" style={{border: '1px solid black'}} width="800"/>
   

## Cloud Infrastructure Security for AWS app dashboards​

{@import ../../reuse/filter-dashboards.md}

### Active threats dashboards

The Active Threats dashboards show data on threats that require attention. Review these dashboards to see threats identified in AWS APIs, resources, and storage.

#### Active Threats: AWS APIs

The **Active Threats: AWS APIs** dashboard shows threats identified from AWS APIs. It shows threats count and trend, and threats by resource, actor, events, and geo location. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-apis.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

#### Active Threats: AWS Resources

The **Active Threats: AWS Resources** dashboard shows threats identified in AWS resources such as EC2 and IAMUser. It shows findings by resource, trend, resource type, category, and country. This dashboard has an **Action Plan** panel so you can access suggested resources that need attention. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-resources.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

#### Active Threats: AWS Storage

The **Active Threats: AWS Storage** dashboard provides threat counts related to AWS S3 buckets. It shows threats count and trend, and threats by resource, actor, and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-storage.png')} alt="Active Threats: AWS Storage dashboard" width="600"/>

### Risk Overview dashboard

The **Risk Overview** dashboard provides a summary of all resources that pose risks in a single dashboard that rolls up the findings from other dashboards. It also shows AWS API events by time, and has an **Action Plan** panel so you can access resources that need attention.

You can also use this dashboard to show details of a single resource. See [View resource risk details](#view-resource-risk-details) below.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-risk-overview.png')} alt="Risk Overview dashboard" width="600"/>

#### View resource risk details

You can click a resource on any dashboard to view details about its risk in the [Risk Overview](#risk-overview-dashboard) dashboard:
1. Click a resource in a dashboard. A summary of that resource’s data appears in a panel.
1. In the panel under **Linked Dashboards**, select **Risk Overview**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-linked-dashboard.png')} alt="Linked dashboard" width="600"/>
1. The selected resource’s data appears in the **Risk Overview** dashboard, broken down by the types of data collected. This lets you see at a glance all the different risks presented by the resource. Note at the top of the dashboard that the filters specify the resource.

### Security Control Failures dashboard

The **Security Control Failures** dashboard shows resources that need to be addressed because they do not comply with required security standards. It shows findings by resource, trend, type, and category. By default, the `compliance_status` filter at the top of the dashboard is set to **FAILED** to show resources that fail compliance. Set the `risk.calculated_level` filter to **high** or **critical** to see the most important failures. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-security-control-failures.png')} alt="Security Control Failures dashboard" width="600"/>

### Suspicious Activity dashboards

The Suspicious Activity dashboards show data on events identified by anomaly detection that indicate out-of-the ordinary patterns that may require attention. Review these dashboards to see activity identified in configurations, Identity and Access Management (IAM), networks, users, and on the Web. 

#### Suspicious Config and IAM Activity

The **Suspicious Config and IAM Activity** dashboard shows suspicious changes for configurations and Identity Access Management (IAM). It shows suspicious changes in IAM policies, security groups, VPCs, network ACLs, route tables, gateways, S3 bucket permissions, deletion of CMK, and configurations. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-config-and-iam-activity.png')} alt="Suspicious Config and IAM Activity dashboard" width="600"/>

#### Suspicious Network Activity

The **Suspicious Network Activity** dashboard shows suspicious activity on networks. It shows suspicious blocked source-destination pairs, suspicious traffic, trends for blocked activity and traffic, and geo locations for suspicious blocked destinations and traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-network-activity.png')} alt="Suspicious Network Activity dashboard" width="600"/>

#### Suspicious User Activity

The **Suspicious User Activity** dashboard shows suspicious activity that users perform in the cloud. It shows failed console logins, console logins without MFA, console logins from risky geo locations, root account logins, unauthorized AWS API requests, and impossible travel events. 

To see all events a particular user has been involved with, click a user on a panel (a honeycomb cell), and then on the resulting panel under **Linked Dashboards** click **Risk Overview**. For details, see [View resource risk details](#view-resource-risk-details).

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-user-activity.png')} alt="Suspicious User Activity dashboard" width="600"/>

#### Suspicious Web Activity

The **Suspicious Web Activity** dashboard shows suspicious activity on the Web. It shows suspicious blocked requests, including by trend and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-web-activity.png')} alt="Suspicious Web Activity dashboard" width="600"/>

## Recommended dashboards workflow

To most efficiently use the app to address security concerns, we recommend the following workflow:
1. Look at activity displayed in the [Active Threats](#active-threats-dashboards) dashboards to find issues that need immediate attention. 
1. View the [Security Control Failures](#security-control-failures-dashboard) dashboard to find areas that are identified as failing to meet compliance requirements, and therefore possibly pose a security risk.
1. Review the [Suspicious Activity](#suspicious-activity-dashboards) dashboards to uncover suspicious activity that may need investigation. 
1. Review the [Risk Overview](#risk-overview-dashboard) dashboard for a summary of all the resources that pose risk. Review the action plan presented at the bottom of the dashboard to work through the items identified as needing attention.

