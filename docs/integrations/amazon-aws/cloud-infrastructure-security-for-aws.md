---
id: cloud-infrastructure-security-for-aws
title: Cloud Infrastructure Security for AWS
description: The Cloud Infrastructure Security for AWS app provides visibility into your AWS environment to give you insights into active threats, security control failures, and suspicious activity. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg')} alt="AWS" width="60"/>

The Cloud Infrastructure Security for AWS app provides a unified security and compliance audit view of your AWS infrastructure, and insight into threat activity across the environment. It leverages native AWS tools and telemetry to accelerate the work of security and reliability management. 

Key features of the app include:
* **Active threat monitoring**. See threats in APIs, resources, and storage.
* **Security compliance failure identification**. See areas in your environment that need to be addressed because they do not comply with required security standards.
* **Suspicious activity assessment**. See activity identified by anomaly detection across users, web interactions, networks, and Identity Access Management (IAM).
* **Resource risk summary**. See a summary of all resources that pose risks, and get an action plan for addressing the most important areas of concern.

Data presented in the app’s dashboards is normalized from log sources into AWS Elastic Common Schema (ECS) format, providing seamless data presentation of all your AWS data. 

Use Sumo Logic’s [monitoring](/docs/alerts/monitors/) to receive alerts from the app. To see monitors for the app, go to **Manage Data > Monitoring** and select the **Cloud Infrastructure Security** folder. 

## Log types

The Cloud Infrastructure Security for AWS app utilizes the following log types:
* [Amazon Cloudtrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html) 
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

The app collects logs from different AWS sources to produce data in the dashboards. When you install the app, data will be collected from sources including:
* [Amazon Cloudtrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html) 
* [Amazon GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
* [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
* [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
* [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)

## Install the Cloud Infrastructure Security for AWS app

Install the app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of usage. 

1. From the **App Catalog**, search for and select the app.
1. Click **Install App**. The following screen appears. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-1.png')} alt="eploy Cloud Infrastructure for AWS screen" style={{border: '1px solid black'}} width="700"/>
1. In the **Deploy Cloud Infrastructure for AWS** screen, perform the following steps:
   1. **Select Region**. Select the AWS region where you want to deploy the solution. 
    :::warning
    This step is critical. If you do not select the correct region, you will deploy the solution in the wrong region.
    :::
   1. **Check AWS Role Permission**. Click the button to sign in to AWS and perform a check to see if you have permissions to install the solution. If your AWS role does not have the necessary permissions, see the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html) for information on configuring a policy to provide permissions.
   1. **Deploy AWS**. Click the **Deploy AWS Security** button to deploy the solution.  
   

## Cloud Infrastructure Security for AWS app dashboards​

{@import ../../reuse/filter-dashboards.md}

### Active threats dashboards

The Active Threats dashboards show data on threats that require attention. Review these dashboards to see threats identified in AWS APIs, resources, and storage.

#### Active Threats: AWS APIs

The **Active Threats: AWS APIs** dashboard shows threats identified from AWS APIs. It shows threats count and trend, and threats by resource, actor, events, and geo location. 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-apis.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

#### Active Threats: AWS Resources

The **Active Threats: AWS Resources** dashboard shows threats identified in AWS resources such as EC2 and IAMUser. It shows findings by resource, trend, resource type, category, and country. Like the [Resource Risk Dashboard](#resource-risk-dashboard), this dashboard has an **Action Plan** panel so you can access suggested resources that need attention.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-resources.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

#### Active Threats: AWS Storage

The **Active Threats: AWS Storage** dashboard provides threat counts related to AWS S3 buckets. It shows threats count and trend, and threats by resource, actor, and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-storage.png')} alt="Active Threats: AWS Storage dashboard" width="600"/>

### Resource Risk dashboard

The **Resource Risk** dashboard provides a summary of all resources that pose risks in a single dashboard that rolls up the findings from other dashboards. It also has an **Action Plan** panel so you can access resources that need attention.

You can also use this dashboard to show details of a single resource. See [View resource risk details](#view-resource-risk-details) below.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-resource-risk-dashboard.png')} alt="Resource Risk dashboard" width="600"/>

#### View resource risk details

You can click a resource on any dashboard to view details about its risk in the [Resource Risk Dashboard](#resource-risk-dashboard):
1. Click a resource in a dashboard. A summary of that resource’s data appears in a panel.
1. In the panel under **Linked Dashboards**, select **Resource Risk Dashboard**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-linked-dashboard.png')} alt="Linked dashboard" width="600"/>
1. The selected resource’s data appears in the **Resource Risk Dashboard**, broken down by the types of data collected. This lets you see at a glance all the different risks presented by the resource. Note at the top of the dashboard that the filters specify the resource.
1. Click items in the action plan section to address them. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-resource-data.png')} alt="Resource data" width="600"/>

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

To see all events a particular user has been involved with, click a user on a panel (a honeycomb cell), and then on the resulting panel under **Linked Dashboards** click **Resource Risk Dashboard**. For details, see [View resource risk details](#view-resource-risk-details) above.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-user-activity.png')} alt="Suspicious User Activity dashboard" width="600"/>

#### Suspicious Web Activity

The **Suspicious Web Activity** dashboard shows suspicious activity on the Web. It shows suspicious blocked requests, including by trend and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-web-activity.png')} alt="Suspicious Web Activity dashboard" width="600"/>

## Recommended dashboards workflow

To most efficiently use the app to address security concerns, we recommend the following workflow:
1. Look at activity displayed in the [Active Threats](#active-threats-dashboards) dashboards to find issues that need immediate attention. 
1. View the [Security Control Failures](#security-control-failures-dashboard) dashboard to find areas that are identified as failing to meet compliance requirements, and therefore possibly pose a security risk.
1. Review the [Suspicious Activity](#suspicious-activity-dashboards) dashboards to uncover suspicious activity that may need investigation. 
1. Review the [Resource Risk Dashboard](#resource-risk-dashboard) for a summary of all the resources that pose risk. Review the action plan presented at the bottom of the dashboard to work through the items identified as needing attention.

