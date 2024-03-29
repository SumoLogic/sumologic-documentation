---
id: cloud-infrastructure-security-for-aws
title: Cloud Infrastructure Security for AWS
description: Cloud Infrastructure Security for AWS provides visibility into your AWS environment to give you insights into active threats, security control failures, and suspicious activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-logo.png')} alt="Cloud Infrastructure Security for AWS logo" width="70"/>

Cloud Infrastructure Security for AWS provides a unified view of risks, misconfigurations, and active threats in your AWS infrastructure spanning multiple AWS accounts and regions. The solution leverages native AWS tools and telemetry to accelerate cloud security outcomes.

Key features of the solution include:
* **Risk overview**. See a summary of all resources that pose risks, and get an action plan for addressing the most important areas of concern.
* **Active threats**. See threats in resources and AWS API calls.
* **Security control failures**. See misconfigurations  in your environment that may leave you vulnerable to attackers.
* **Suspicious activity**. See activity identified by anomaly detection across users, web interactions, networks, and Identity Access Management (IAM).

Entities presented in the dashboards are normalized from log sources into [AWS Elastic Common Schema (ECS)](https://www.elastic.co/guide/en/ecs/master/ecs-reference.html), to provide seamless pivots between dashboards during threat investigations.

Use Sumo Logic’s [monitoring](/docs/alerts/monitors/) to receive alerts from the solution. To see monitors for the solution, go to **Manage Data > Monitoring** and open the **Cloud Infrastructure Security for AWS** folder.

:::note
* After initial installation, data collection may be delayed.
* If you have already installed the [Amazon Security Quickstart](/docs/integrations/amazon-aws/security-quickstart/), collectors may be duplicated to collect from the same sources. To prevent this, use the existing source category for collection.
:::

Watch the following micro lesson to learn about Cloud Infrastructure Security for AWS.

<Iframe url="https://www.youtube.com/embed/JD9tNfCW7uo?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

## Log types

Cloud Infrastructure Security for AWS utilizes the following log types:
* [Amazon CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html)
* [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
* [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
* [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
* [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)

## Sample log messages

```json
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

## Sample queries

##### Failed Console Logins

```sql
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

Cloud Infrastructure Security for AWS collects logs from different AWS sources to produce data in the dashboards. When you install the solution, data will be collected from sources, including:
* [Amazon CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html)
* [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
* [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
* [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
* [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)

## Install Cloud Infrastructure Security for AWS

### Before you deploy

This section describes prerequisites and guidelines for deploying Sumo Logic’s Cloud Infrastructure Security for AWS solution. 

#### Prerequisites

* **AWS Organizations**. You must be using [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html).
* **AWS data**. You must have access to data from the following AWS products, since Cloud Infrastructure Security for AWS uses data from these sources in its dashboards:
   * [Amazon CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html)
   * [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)
   * [AWS Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html)
   * [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html)
   * [AWS Web Application Firewall (WAF)](https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html)
* **Sumo Logic console**. Make sure you have access to the [Sumo Logic console](/docs/get-started/sumo-logic-ui/).
* **Role capabilities**. Make sure you have a Sumo Logic role that has the following [role capabilities](/docs/manage/users-roles/roles/role-capabilities/):
  * Data Management
     * View Collectors
     * Manage Collectors
     * Manage Content
  * Security
     * Create access keys
  * Alerting
     * View Monitors
     * Manage Monitors
* **Sumo Logic Access ID and Key**. When you deploy the solution, you’ll need to supply a Sumo Logic [Access ID and Access Key](/docs/manage/security/access-keys/), which enable you to use Sumo Logic APIs. Make sure you have the role capabilities listed above before generating the Access ID and Key.
* **AWS credentials**. To deploy the solution, you will need to log onto the [AWS Console](https://console.aws.amazon.com/console). For the CloudFormation template deployment, your AWS role must have the permissions described by [this JSON file](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/AWSCISCFTemplatePermissions.json). As necessary, you may add JSON text to an existing or a new policy associated with an AWS IAM role as described in the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html). 
* **Monitors**. The Cloud Infrastructure Security for AWS solution comes with pre-packaged alerts in the form of Sumo Logic Monitors. To learn more about their capabilities, visit the [Monitors](/docs/alerts/monitors/) page.

#### AWS regions supported

You can deploy Cloud Security Infrastructure for AWS to a single AWS account and region or multiple accounts and regions. Typically you would first deploy the solution to a single AWS account and region, kick the tires, and then expand the deployment.

The Sumo Logic Cloud Infrastructure Security solution supports the following [AWS regions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions):
* Asia Pacific (Hong Kong)
* Asia Pacific (Tokyo)
* Asia Pacific (Seoul)
* Asia Pacific (Mumbai)
* Asia Pacific (Singapore)
* Asia Pacific (Sydney)
* Canada (Central)
* Europe (Frankfurt)
* Europe (Stockholm)
* Europe (Ireland)
* Europe (London)
* Europe (Paris)
* Middle East (Bahrain)
* South America (São Paulo)
* US East (N. Virginia)
* US East (Ohio)
* US West (N. California)
* US West (Oregon)

#### Deployment considerations  

When you deploy the solution, consider the following.

##### Do you already have the required sources? 

When you deploy, you are given the option to create the Sumo Logic sources that the solution applications rely upon. If you have already configured those sources, you do not have to create new ones. You can just provide the URLs of the relevant Sumo Logic sources as part of the configuration.

:::note
If you use existing sources rather than create new ones, it is not necessary to modify the existing metadata and source categories associated with the sources. The metadata that the solution depends on will be added to the sources at deployment time. 
:::

##### Bucket considerations

In the sections of the CloudFormation template that relate to creating Sumo Logic sources, you can specify an existing S3 bucket to store the logs that the source collects. If you don’t supply a bucket name, the template will create a new one. We recommend you use an existing bucket if possible. 

### Install from the App Catalog

You can install Cloud Infrastructure Security for AWS from the App Catalog to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of usage.

1. From the **App Catalog**, search for and select **Cloud Infrastructure Security for AWS**.
1. Click **Install App**.  
1. In the **Deploy Cloud Infrastructure for AWS** screen, perform the following steps:
   1. **Select Region**. Select the [AWS region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions) where you want to deploy the solution. For information about where your Sumo Logic data is stored in AWS, see [Where is My Data Stored?](/docs/get-started/faq/#where-is-my-data-stored)
       :::info
       This step is critical. If you do not select the correct region, you will deploy the solution in the wrong region.
       :::
   1. **Deploy AWS**. Click the **Deploy AWS Security** button. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-1.png')} alt="Deploy Cloud Infrastructure for AWS screen" style={{border: '1px solid gray'}} width="700"/>
1. Sign in the [AWS Console](https://console.aws.amazon.com/console/).
1. In **Quick Create Stack**, fill out the fields to create the stack from the CloudFormation template.
   1. In **Stack Name**, enter a name for the stack. The stack name can include letters (A-Z and a-z), numbers (0-9), and dashes (-).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-quick-create-stack.png')} alt="Create stack" style={{border: '1px solid gray'}} width="700"/>
1. Scroll down to the **Parameters** section.
1. In **1. Sumo Logic Configuration**, you can accept the defaults. <br/>If fields are missing, or you need to change them, do the following:
      * **Sumo Logic deployment location**. Choose the geographic location of the deployment: au, ca, de, eu, jp, us2, us1, in, or fed. For information about Sumo Logic deployment locations, see [API Authentication, Endpoints, and Security](/docs/api/getting-started/).
      * **Sumo Logic access ID**. Enter the Sumo Logic console access ID, which you received when you created the [access key](/docs/manage/security/access-keys/).
      * **Sumo Logic access key**. Enter your Sumo Logic access key. Retrieve this from your Sumo Logic account.
      * **Sumo Logic organization ID**. Enter your Sumo Logic organization ID, which you can find in the Sumo Logic console, under [Account](/docs/get-started/account-settings-preferences).
      * **Delete Sumo Logic resources when stack is deleted**. Choose **false** if you do not want to remove the collector and sources when the stack is deleted. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-1.png')} alt="Sumo Logic configuration" style={{border: '1px solid gray'}} width="700"/>
1. In **2. AWS Organization configuration**, enter the following:
      * **Security-tooling account ID**. Enter your Security Tooling account ID. This is used to set up the AWS CloudWatch, Lambda, Kinesis, S3 bucket, and SNS topic for collecting AWS GuardDuty, Security Hub, WAF, and Network Firewall data.
      * **Log-archiving account ID**. Enter your log-archiving account ID. This is used to set up an S3 bucket and SNS topic for collecting the AWS CloudTrail data. 
         :::note
         This can be the same ID as the Security Tooling account if you do not a separate Log Archive account set up.
         :::
      * **Security-tooling and log-archiving account Region**. Enter your Security Tooling and Log Archive account region if it's different from the default.
      * **AWS Organization root ID**. Enter the ID for your organization root. This string requires `r-` followed by from 4 to 32 lowercase letters or digits.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-2.png')} alt="AWS organization configuration" style={{border: '1px solid gray'}} width="700"/>
          :::note
          You can find the values for this dialog in the **Organizational structure** section of your [AWS accounts](https://console.aws.amazon.com/organizations/v2/home/accounts) page. Sign in to the AWS console, click on your profile in the top-right corner, select **Organization**, and in the left nav bar select **Policy management > AWS accounts**. You must have the correct permissions to view the account IDs. For more information about organizations, see [AWS documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_details.html).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-organizations.png')} alt="AWS organizational structure" style={{border: '1px solid gray'}} width="700"/>
          :::
1. In **3. AWS Service configuration**, select **Yes** for each of the following sources you want to install for Sumo Logic, or **No** if you already have the source installed:
      * **Publish AWS GuardDuty data to Sumo**
      * **Publish AWS CloudTrail data to Sumo** 
      * **Publish AWS Security Hub data to Sumo** 
      * **Publish AWS WAF data to Sumo** 
      * **Publish AWS Network Firewall data to Sumo** 
      <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-3.png')} alt="AWS service configuration" style={{border: '1px solid gray'}} width="700"/>
1. If you selected **Yes** in the preceding step, you can accept the default values in the following sections to set up each source, unless there are any values you'd like to change. <br/><br/>If you selected **No** in the preceding step, in the following sections you must answer **No** when asked if you want to create a source, and you must replace the source category name with the value of your existing installed source.

       <details>
       <summary>GuardDuty</summary>
       * **4.1 GuardDuty service configuration**
          * **GuardDuty Regions**. The regions from which GuardDuty Data should be sent.
       * **4.2 GuardDuty Sumo log source configuration**
          * **Create Sumo Logic HTTP logs source**.  **Yes** is the default. Select **No** if you already have a source.
          * **Sumo Logic HTTP logs source category name**. The source category name to be created. If you selected **No** in the previous field, enter your existing source category name for the GuardDuty logs. 
          
          <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-4.png')} alt="GuardDuty configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>CloudTrail</summary>
       * **5.1 CloudTrail service configuration**. 
          * **CloudTrail Regions**. The region from which CloudTrail Data should be sent. 
             :::note
             If you have multiple regions, on the AWS side [configure CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html) to deliver log files from the regions to a single S3 bucket for a single account, and use that S3 bucket in **5.3 CloudTrail S3 bucket configuration** below.
             :::
       * **5.2 CloudTrail Sumo log source configuration**. 
          * **Create Sumo Logic S3 logs source for CloudTrail**. **Yes** is the default value. Select **No** if you already have a source.
          * **Path expression for logs**. The path expression must match the folder structure for CloudTrail logs (for example, `AWSLogs/*/CloudTrail/*`).
          * **Sumo Logic CloudTrail logs source category name**. The source category name to be created. If you selected **No** in the preceding field for creating an S3 log source, enter the name of an existing Sumo Logic source category that's collecting CloudTrail logs. 
       * **5.3 CloudTrail S3 bucket configuration**. 
          * **Create an S3 bucket for CloudTrail logs**. **Yes** is the default value. Select **No** if you already have a bucket. (We recommend you use an existing bucket if possible.)
          * **Name of existing S3 bucket that contains the CloudTrail logs**. If you selected **Yes** in the previous field, leave this blank. If you selected **No** in the previous field, enter the name of the existing S3 bucket. 
          * **Delivery bucket prefix**. The log delivery S3 bucket prefix. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-5.png')} alt="CloudTrail configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>Security Hub</summary>
       * **6.1 Security Hub Service Configuration**. 
          * **Security Hub Regions**. The regions from which Security Hub data should be sent.
       * **6.2 Security Hub Sumo Log Source configuration**.
          * **Create Sumo Logic HTTP logs source**. **Yes** is the default value. Select **No** if you already have a logs source.
          * **Sumo Logic HTTP logs source category name**. The source category name to be created. If you selected **No** in the previous field, provide an existing source category name from the Security Hub logs.  <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-6.png')} alt="Security Hub configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>WAF</summary>
       * **7.1 AWS Firewall Manager Policy Regions Configuration**.
          * **AWS WAF Policy Regions**. The region from which AWS WAF data should be sent. 
             :::note
             If you have multiple regions, on the AWS side [configure Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html) to deliver log files from multiple Regions to a single S3 bucket for a single account, and use that S3 bucket in section **7.4 Firewall Manager - S3 Bucket Configuration** above.
             :::
          * **AWS Network Firewall Policy Regions**. The regions from which AWS Network Firewall data should be sent.
       *  **7.2 Firewall Manager Details - Kinesis Firehose Delivery Stream Source WAF Configuration**. 
          * **Create a Kinesis Firehose Delivery Stream Source for WAF**.  **Yes** is the default value. Select **No** if you already have a source. 
             :::note
             Configure WAF in each region to send logs to [Kinesis data firehose destination](https://docs.aws.amazon.com/waf/latest/developerguide/logging-destinations.html), and from there, use the same [Sumo Logic Kinesis HTTP URL](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) in Firehose configuration to send logs to Sumo Logic as shown below in the Kinesis Firehose configuration: <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-firehose-url.png')} alt="Firehose URL" style={{border: '1px solid gray'}} width="500"/> <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-firehose-url2.png')} alt="Firehose URL" style={{border: '1px solid gray'}} width="500"/>
             :::
          * **Sumo Logic AWS Kinesis Firehose Logs WAF Source Category Name**. The source category name to be created. If you selected **No** in the preceding field for creating a source, provide an existing source category name. 
          * **Amazon Kinesis Data Firehose delivery stream name**. The Amazon Kinesis Data Firehose (Kinesis Data Firehose) delivery stream name.
       <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-7.png')} alt="Firewall configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>Network Firewall</summary>
       * **7.3 Firewall Manager Details - S3 Source Network Firewall Configuration**.
          * **Create Sumo Logic Amazon S3 Logs Source for Network Firewall**.  **Yes** is the default. Select **No** if you already have a source.
          * **Sumo Logic Amazon S3 Logs Source Category Name for Network Firewall**. The source category name to be created. If you selected **No** in the previous field, enter an existing source category name. 
       * **7.4 Firewall Manager - S3 Bucket Configuration**.
          * **Create AWS S3 Bucket**. **Yes** is the default value. Select **No** to use an existing S3 bucket from AWS S3 which has Network Firewall Logs. 
             :::note
             If the S3 bucket is created by the Cloud Infrastructure Security solution, then make sure on the AWS side that it's a central [S3 bucket for Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html) for all regions.
             :::
          * **Network Firewall Delivery Bucket Prefix**. The Network Firewall Log Delivery S3 bucket prefix.
          * **Name of existing S3 Bucket which contains the Network Firewall Logs**. If you selected **Yes** in the preceding field in this section for creating an S3 bucket, leave this blank. If you selected **No** in the preceding field for creating an S3 bucket, provide an existing S3 Bucket name which contains Network Firewall Logs. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-7a.png')} alt="Firewall configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

1. Under **Permissions**, in **IAM role - optional**, choose the IAM role for CloudFormation to use for all operations performed on the stack. The role must have permissions to set up the necessary Lambdas, S3 buckets, Kenesis streams, and other objects needed in the CloudFormation template, as well as access to the appropriate logs. If your AWS role does not have the necessary permissions, see the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html) for information on configuring a policy to provide permissions. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-permissions.png')} alt="Create Stack button" style={{border: '1px solid gray'}} width="700"/>
1. Under **Capabilities and transforms**, select the acknowledgement boxes.
1. Click **Create Stack**. The stack is created, and the solution is installed.
1. Click **Start Using Sumo**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-start-using-sumo.png')} alt="Start Using Sumo button" style={{border: '1px solid gray'}} width="400"/>
1. Select an option to start using the solution. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-finish-installation.png')} alt="App hub page" style={{border: '1px solid gray'}} width="800"/>

### Troubleshoot installation

Installation of Cloud Infrastructure Security for AWS uses an AWS CloudFormation template. While deploying using the template, you may receive error messages such as `CREATE_FAILED` status or `ROLLBACK_COMPLETE` status for various reasons. This section provides information on how to troubleshoot such AWS CloudFormation installation failures.

#### Determine the cause of a CloudFormation installation failure

This section walks you through the process of troubleshooting an AWS CloudFormation installation failure.

To debug an AWS CloudFormation installation failure, do the following:

1. After the stack rollback is complete and the status is `ROLLBACK_COMPLETE`, go to the parent stack. In the parent stack, look for the first failure as shown in the following example. The failure can be a direct reason or can point to a nested stack. <br/><img src={useBaseUrl('img/observability/Troubleshooting_1.png')} alt="Troubleshooting 1" style={{border: '1px solid gray'}} width="800"/>
1. Look for direct reasons for the failure that is available in the parent stack, as shown in the following example. <br/><img src={useBaseUrl('img/observability/Troubleshooting_2.png')} alt="Troubleshooting 2" style={{border: '1px solid gray'}} width="800"/>
1. To find indirect reasons for the failure, go to the nested stack mentioned in the status reason, as shown in the following example. Take a note of the resources mentioned in the reason. <br/><img src={useBaseUrl('img/observability/Troubleshooting_3.png')} alt="Troubleshooting 3" style={{border: '1px solid gray'}} width="800"/>
1. Select the deleted option to find the nested stacks, as shown in the following example.<br/><img src={useBaseUrl('img/observability/Troubleshooting_4.png')} alt="Troubleshooting 4" style={{border: '1px solid gray'}} width="400"/>
1. Go to the nested stack and look for the resource mentioned in the previous step to identify the reason, as shown in the following example.<br/><img src={useBaseUrl('img/observability/Troubleshooting_5.png')} alt="Troubleshooting 5" style={{border: '1px solid gray'}} width="800"/>

#### Optimize CloudTrail log ingest

By default, the Cloud Infrastructure Security for AWS solution collects AWS CloudTrail logs for all AWS services. To reduce ingestion volume, you can define processing rules that limit log collection to only the logs that are relevant to dashboards provided by the solution.

Define the processing rules for the Sumo Logic AWS CloudTrail Source that was created when you ran the CloudFormation template.

For instructions, see [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule/). Create the following rules, selecting Include messages that match as the rule type, using these regular expressions:

```
.*\"eventSource\":\"elasticloadbalancing\.amazonaws\.com\".*
.*\"eventSource\":\"dynamodb\.amazonaws\.com\".*
.*\"eventSource\":\"ec2\.amazonaws\.com\".*
.*\"eventSource\":\"rds\.amazonaws\.com\".*
.*\"eventSource\":\"lambda\.amazonaws\.com\".*
.*\"eventSource\":\"apigateway\.amazonaws\.com\".*
.*\"eventSource\":\"ecs\.amazonaws\.com\".*
.*\"eventSource\":\"elasticache\.amazonaws\.com\".*
.*\"eventsource\":\"sns\.amazonaws\.com\".*
.*\"eventsource\":\"sqs\.amazonaws\.com\".*
```

#### Common errors

Below are some common errors that can occur while using the CloudFormation template. 

| Error | Description | Resolution |
|:--|:--|:--|
| The API rate limit for this user has been exceeded. | This error indicates that AWS CloudFormation execution has exceeded the API rate limit set on the Sumo Logic side. It can occur if you install the AWS CloudFormation template in multiple regions or accounts using the same Access Key and Access ID. | Do not install the AWS CloudFormation template in multiple regions or accounts with the same Access Key and Access ID. |
| S3 Bucket already exists. | The error can occur if:<br/>- An S3 bucket with the same name exists in  S3, or <br/>- The S3 Bucket is not present in S3 but is referenced by some other AWS CloudFormation stack which created it. |- Remove the S3 bucket from S3 or select “No” in the AWS Cloudformation template for S3 bucket creation. <br/>- Remove the AWS CloudFormation Stack which references the S3 bucket. |
| The S3 bucket you tried to delete is not empty. | The error can occur when deleting the stack with a non-empty S3 bucket. | Delete the S3 bucket manually if you do not need the bucket or its content in the future. |

#### Roll back the Cloud Infrastructure Security for AWS Solution

When you roll back the solution, all the resources that were created with the AWS CloudFormation stack are deleted. The resources deleted with a rollback include dashboards, collectors, sources, S3 buckets, Lambda functions, IAM roles, bucket policy, SNS topic, and SNS subscriptions. 

Rolling back the solution deletes the main AWS CloudFormation stack, including the nested stack and associated Sumo Logic and AWS resources. The following rollback guidelines apply:

* Sumo Logic resources are deleted based on the “Delete Sumo Logic Resources when the stack is deleted” flag provided during the AWS CloudFormation configuration. These resources include dashboards, collectors, and sources.
* AWS resources are deleted by default, regardless of the flag provided. These resources include S3 buckets, Lambda functions, IAM roles, bucket policy, SNS topic, and SNS subscription.

To uninstall the Cloud Infrastructure Security solution:

1. Log in to your AWS account and go to [CloudFormation](https://console.aws.amazon.com/cloudformation/home).
1. Select the main stack you want to delete.
1. Select **Delete**.<br/><img src={useBaseUrl('img/observability/CFT_Uninstall.png')} alt="Delete stack" style={{border: '1px solid gray'}} width="800"/>

## Cloud Infrastructure Security for AWS dashboards​

import FilterDashboards from '../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Risk Overview dashboard

The **Risk Overview** dashboard provides a summary of all resources that pose risks in a single dashboard that rolls up the findings from other dashboards. It also shows AWS API events by time, and has an **Action Plan** panel so you can access resources that need attention.

You can also use this dashboard to show details of a single resource. See [View resource risk details](#view-resource-risk-details) below.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-risk-overview.png')} alt="Risk Overview dashboard" width="600"/>

#### View resource risk details

You can click a resource on any dashboard to view details about its risk in the [Risk Overview](#risk-overview-dashboard) dashboard:
1. Click a resource in a dashboard. A summary of that resource’s data appears in a panel.
1. In the panel under **Linked Dashboards**, select **Risk Overview**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-linked-dashboard.png')} alt="Linked dashboard" width="600"/>
1. The selected resource’s data appears in the **Risk Overview** dashboard, broken down by the types of data collected. This lets you see at a glance all the different risks presented by the resource. Note at the top of the dashboard that the filters specify the resource.

### Active threats dashboards

The Active Threats dashboards show data on threats that require attention. Review these dashboards to see threats identified in AWS APIs, resources, and storage.

#### Active Threats: AWS APIs

The **Active Threats: AWS APIs** dashboard shows threats identified from AWS APIs by correlating it with threat intelligence data. It shows threats count and trend, and threats by resource, actor, events, and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-apis.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

#### Active Threats: AWS Resources

The **Active Threats: AWS Resources** dashboard shows threats identified in AWS resources such as EC2 and IAMUser as reported by Amazon GuardDuty. It shows findings by resource, trend, resource type, category, and country. This dashboard has an **Action Plan** panel so you can access suggested resources that need attention through the AWS console.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-resources.png')} alt="Active Threats: AWS APIs dashboard" width="600"/>

### Security Control Failures dashboard

The **Security Control Failures** dashboard shows resources that need to be addressed because they are vulnerable as reported by AWS Security Hub. It shows findings by resource, trend, type, and category. By default, the `compliance_status` filter at the top of the dashboard is set to **FAILED** to show resources that fail compliance. Set the `risk.calculated_level` filter to **high** or **critical** to see the most important failures.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-security-control-failures.png')} alt="Security Control Failures dashboard" width="600"/>

### Suspicious Activity dashboards

The Suspicious Activity dashboards show data on events identified by anomaly detection that indicate out-of-the ordinary patterns that may require attention. Review these dashboards to see activity identified in configurations, Identity and Access Management (IAM), networks, users, and on the Web. It prioritizes activity by z-score threshold, labeled `risk.calculated_level`, which measures how unusual it is.


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

## Recommended investigations workflow

To most efficiently use the solution to address security concerns, we recommend the following workflow:
1. Look at the [Risk Overview](#risk-overview-dashboard) dashboard to get an overall picture of the security posture of your environment. Pivot or browse to other dashboards to see details in each area.
1. Look at activity displayed in the [Active Threats](#active-threats-dashboards) dashboards to find issues that need immediate attention.
1. View the [Security Control Failures](#security-control-failures-dashboard) dashboard to find areas that are identified as failing to meet compliance requirements, and therefore possibly pose a security risk.
1. Review the [Suspicious Activity](#suspicious-activity-dashboards) dashboards to uncover suspicious activity that may need investigation.
1. Pivot into the [Risk Overview](#risk-overview-dashboard) dashboard for specific resources that have issues to see any related activity. Review the action plan presented at the bottom of the dashboard to work through the items identified as needing attention.
