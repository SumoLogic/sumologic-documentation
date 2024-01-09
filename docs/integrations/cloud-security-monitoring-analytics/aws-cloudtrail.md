---
id: aws-cloudtrail
title: Amazon CloudTrail - Cloud Security Monitoring and Analytics
sidebar_label: Amazon CloudTrail
description: Introduction to Amazon CloudTrail - Cloud Security Monitoring and Analytics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/cloudtrail-security.png')} alt="Amazon CloudTrail - Cloud Security Monitoring and Analytics icon" width="60"/>

This set of CloudTrail monitoring and analytics dashboards provide one dashboard for the most critical analytics. Think of this bundle of dashboards as a good starting place to see trends and outliers on specific aspects of your CloudTrail data -- including access monitoring, login activity, system monitoring, privileged activity, and threat intelligence.


## Collecting Logs for the AWS CloudTrail PCI Compliance App

This section has instructions for configuring log collection for the AWS CloudTrail app.

If you intend to use the AWS CloudTrail app in multiple environments, see [Configure the AWS CloudTrail App in Multiple Environments](/docs/integrations/amazon-aws/cloudtrail/#configuring-the-aws-cloudtrail-app-in-multiple-environments).

To configure an AWS CloudTrail Source, perform these steps:

1. [Configure CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/getting_started_top_level.html) in your AWS account.
2. Confirm that logs are being delivered to the Amazon S3 bucket.
3. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source) to Sumo Logic.
4. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
   * Generate the Role-Based Access CloudFormation template in Sumo Logic and download the template.
   * Create the CloudFormation stack in AWS Management Console using the template.
   * Copy the Role ARN from the Outputs tab and paste it in the Role ARN field in Sumo Logic CloudTrail Source created in step 3. For more information, see [Configuring your AWS source with CloudFormation](/docs/send-data/hosted-collectors/amazon-aws/configure-your-aws-source-cloudformation).
5. [Enable Sumo to track AWS Admin activity](/docs/integrations/amazon-aws/cloudtrail/#enable-sumo-logic-to-track-aws-admin-activity). This step is optional, but if you don't do it, the administrator activity panels in the **AWS CloudTrail - User Monitoring** dashboard won't be populated.
6. Install the Sumo Logic App for AWS CloudTrail.

Once you begin uploading data, your daily data usage will increase. It's a good idea to check the **Account** page to make sure that you have enough quota to accommodate additional data in your account. If you need additional quota, you can upgrade your account at any time.


### Sample Log Message

```json
{
  "eventVersion":"1.01",
  "userIdentity":{
     "type":"IAMUser",
     "principalId":"AIDAJ6IGVQ4XQZQDAYEOA",
     "arn":"arn:aws:iam::956882708938:user/Olaf",
     "accountId":"956882708938",
     "userName":"system"
  },
  "eventTime":"2017-09-27T20:00:10Z",
  "eventSource":"signin.amazonaws.com",
  "eventName":"ConsoleLogin",
  "awsRegion":"us-east-1",
  "sourceIPAddress":"65.98.119.36",
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
  "eventID":"f36c1d07-73cf-4ab8-84b1-04c93ac2aaeb"
}
```

```sql title="Field Extraction Template"
| parse "\"sourceIPAddress\":\"*\"" as source_ipaddress
| parse "\"eventName\":\"*\"" as event_name
| parse "\"eventSource\":\"*\"" as event_source
| parse "\"awsRegion\":\"*\"" as aws_Region
| parse "\"userName\":\"*\"" as user
```

### Sample Query

```sql title="Created and Deleted Network and Security Events"
_sourceCategory=AWS_EAGLE (*Security* OR *Network*)
| parse "\"userName\":\"*\"" as user
| parse "\"eventName\":\"*\"" as event
| parse regex field=event "^(?<event_type>[A-Z][a-z]+?)[A-Z]"
| where (event matches "*Security*" OR event matches "*Network*") and event_type in ("Create","Delete")
| count by event
| sort _count
```

In some cases, your query results may show `"HIDDEN_DUE_TO_SECURITY_REASONS"` as the value of the `userName` field. That's because AWS does not log the user name that was entered when a sign-in failure is caused by an incorrect user name.


## Installing the PCI Compliance AWS CloudTrail App

Now that you have set up collection, install the Amazon CloudTrail - Cloud Security Monitoring and Analytics app to use the preconfigured searches and Dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing AWS CloudTrail Dashboards

The Cloud Security Monitoring & Analytics for AWS CloudTrail App provides dashboards that you can modify for your specific security operational needs.

* Access Monitoring
* Login Activity
* Account and System Monitoring
* Overview
* Privileged Activity
* Threat Intelligence


### Security Analytics - Access Monitoring

**Description: **See the details of security group activities and all AWS activities divided by read only and non read only.

**Use Case:** Provides analysis of group activity events including revoking and authorizing access, creating and deleting groups, and other events.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Analytics-Access-Monitoring.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />


### Security Analytics - Login Activity

**Description:** See the details of login activity successes and failures for API, console, and the root account.

**Use Case:** Provides analysis of login activity. For API access analysis is provided with trending failed API calls and a detailed table of the recent reasons for failure. Additionally a stacked bar chart shows the comparison of overall failed API calls broken down by account. For console and root activity success and failure are broken down with trending and a detailed table provided in each case.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Analytics-Login-Activity.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />


### Security Monitoring - Account and System Monitoring

**Description: **See the details of identity and access management for users, roles, access keys and other aspects of identity.

**Use Case:** Provides analysis of IAM activity. Analysis of created and deleted users as well as a summary of IAM events. Created and deleted roles are evidenced. An additional set of analysis looks into password management, user changes in groups and other events.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Monitoring-Account-and-System-Monitoring.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />


### Security Monitoring - Overview

**Description:** Monitoring overview providing one dashboard for the most critical analytics.

**Use Case:** Provides summary of the dashboards in one location. A good starting place to see trends and outliers before digging into the individual analytic dashboards that will provide more detail.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Monitoring-Overview.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />

### AWS CloudTrail - Security Analytics - Privileged Activity

**Description: **Provides analytics on events that require elevated privileges.

**Use Case:** Provides top events, trending and outliers on configuration changes, security group events, and security policy changes.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Analytics-Privileged-Activity.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />

### AWS CloudTrail - Security Analytics - Threat Intelligence

**Description:** Review this dashboard for details on potential threats and IOCs for AWS CloudTrail.

**Use Case: **Provides analysis on Threats Associated with CloudTrail Events, Threats By Actor, Threats by Events and I.P, Threats by Events and Result, Threats by Geo Location, Threats Over Time by Result.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Amazon-CloudTrail-Security-Monitoring-Threat-Intelligence.png')} alt="Amazon CloudTrail - Security Analytics dashboards" />
