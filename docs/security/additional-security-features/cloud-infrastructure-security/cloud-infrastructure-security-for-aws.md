---
id: cloud-infrastructure-security-for-aws
title: Cloud Infrastructure Security for AWS
description: Cloud Infrastructure Security for AWS provides visibility into your AWS environment to give you insights into active threats, security control failures, and suspicious activity.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-logo.png')} alt="Cloud Infrastructure Security for AWS logo" width="70"/>

The Cloud Infrastructure Security for AWS app provides a unified view of risks, misconfigurations, and active threats in your AWS infrastructure spanning multiple AWS accounts and regions. The solution leverages native AWS tools and telemetry to accelerate cloud security outcomes.

Key features of the solution include:
* **Risk overview**. See a summary of all resources that pose risks, and get an action plan for addressing the most important areas of concern.
* **Active threats**. See threats in resources and AWS API calls.
* **Security control failures**. See misconfigurations  in your environment that may leave you vulnerable to attackers.
* **Suspicious activity**. See activity identified by anomaly detection across users, web interactions, networks, and Identity Access Management (IAM).

Entities presented in the dashboards are normalized from log sources into [AWS Elastic Common Schema (ECS)](https://www.elastic.co/guide/en/ecs/master/ecs-reference.html), to provide seamless pivots between dashboards during threat investigations.

Use Sumo Logic’s [monitoring](/docs/alerts/monitors/) to receive alerts from the solution. To see monitors for the solution, go to the [**Monitors**](/docs/alerts/monitors/settings/) page and open the **Cloud Infrastructure Security for AWS** folder.

:::note
* After initial installation, data collection may be delayed.
* If you have already installed the [Amazon Security Quickstart](/docs/integrations/amazon-aws/security-quickstart/), collectors may be duplicated to collect from the same sources. To prevent this, use the existing source category for collection.
:::

:::sumo Micro Lesson
Watch the following micro lesson to learn about Cloud Infrastructure Security for AWS.

<Iframe url="https://fast.wistia.net/embed/iframe/uxt8gony8i?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Cloud Infrastructure Security for AWS Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/JD9tNfCW7uo?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />
-->

:::

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

## Before you deploy Cloud Infrastructure Security for AWS

This section describes prerequisites and guidelines for deploying Sumo Logic’s Cloud Infrastructure Security for AWS solution. 

### Prerequisites

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
     * Manage Apps
  * Security
     * Create access keys
  * Alerting
     * View Monitors
     * Manage Monitors
* **Sumo Logic Access ID and Key**. When you deploy the solution, you’ll need to supply a Sumo Logic [Access ID and Access Key](/docs/manage/security/access-keys/), which enable you to use Sumo Logic APIs. Make sure you have the role capabilities listed above before generating the Access ID and Key.
* **AWS credentials**. To deploy the solution, you will need to log onto the [AWS Console](https://console.aws.amazon.com/console). For the CloudFormation template deployment, your AWS role must have the permissions described by [this JSON file](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/AWSCISCFTemplatePermissions.json). As necessary, you may add JSON text to an existing or a new policy associated with an AWS IAM role as described in the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html). You can set this up during installation. For more information, see [Create new source: Check AWS role permission](#create-new-source-check-aws-role-permission).
* **Monitors**. The Cloud Infrastructure Security for AWS solution comes with pre-packaged alerts in the form of Sumo Logic Monitors. To learn more about their capabilities, visit the [Monitors](/docs/alerts/monitors/) page.

### AWS regions supported

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

### Deployment considerations  

When you deploy the solution, consider the following.

#### Do you already have the required sources? 

When you deploy, you are given the option to create the Sumo Logic sources that the solution applications rely upon. If you have already configured those sources, you do not have to create new ones. You can just provide the URLs of the relevant Sumo Logic sources as part of the configuration. See [Install Cloud Infrastructure Security for AWS](#install-cloud-infrastructure-security-for-aws) below.

:::note
If you use existing sources rather than create new ones, it is not necessary to modify the existing metadata and source categories associated with the sources. The metadata that the solution depends on will be added to the sources at deployment time. 
:::

#### Bucket considerations

In the sections of the CloudFormation template that relate to creating Sumo Logic sources, you can specify an existing S3 bucket to store the logs that the source collects. If you don’t supply a bucket name, the template will create a new one. We recommend you use an existing bucket if possible. See [Create new source: Deploy AWS](#create-new-source-deploy-aws) below.

#### Account or organization deployment

You can deploy Cloud Infrastructure Security to a single account or all accounts in your AWS organization. See [Create new source: Deploy AWS](#create-new-source-deploy-aws) below.

#### Multi-region enablement 

Cloud Infrastructure Security supports collecting data from multiple regions if you have any of the following services running in multiple regions in your AWS infrastructure. You can enable multiple regions when you perform the steps in the [Create new source: Deploy AWS](#create-new-source-deploy-aws) section below.

##### GuardDuty

While deploying, enter comma-separated values for regions in the following section:

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-guardduty-multi-regions.png')} alt="GuardDuty regions" style={{border: '1px solid gray'}} width="700"/>

##### SecurityHub

While deploying, enter comma-separated values for regions in the following section:

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-security-hub-multi-regions.png')} alt="Security Hub regions" style={{border: '1px solid gray'}} width="700"/>

##### CloudTrail

On the AWS side, [configure CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html) to deliver log files from multiple regions to a single S3 bucket for a single account, and use that S3 bucket in the following section:

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-cloudtrail-multi-regions.png')} alt="CloudTrail S3 bucket configuration" style={{border: '1px solid gray'}} width="700"/>

:::note
If an S3 bucket is created by the Cloud Infrastructure Security solution, then make sure on the AWS side that it is a central bucket for CloudTrail logs for all regions from the AWS side.
:::

##### AWS Firewall Manager

On the AWS side, [configure Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html) to deliver log files from multiple regions to a single S3 bucket for a single account, and use that S3 bucket in the following section: 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-network-firewall-multi-regions.png')} alt="Network Firewall S3 bucket configuration" style={{border: '1px solid gray'}} width="700"/>

:::note
If the S3 bucket is created by the Cloud Infrastructure Security solution, then make sure on the AWS side that it is a central bucket for Network Firewall for all regions.
:::

##### AWS WAF

Configure WAF in each region to send logs to [Kinesis data firehose destination](https://docs.aws.amazon.com/waf/latest/developerguide/logging-destinations.html), and from there, use the same [Sumo Logic’s Kinesis HTTP URL](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/) in Firehose configuration to send logs to Sumo Logic.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-waf-multi-regions-1.png')} alt="Firehose destination settings" style={{border: '1px solid gray'}} width="700"/>

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-waf-multi-regions-2.png')} alt="Sumo Logic destination settings in Firehose" style={{border: '1px solid gray'}} width="700"/>

:::note
If Sumo Logic’s Kinesis Firehose source is created by the Cloud Infrastructure Security solution, then make sure on the AWS side that the same Sumo Logic Kinesis HTTP URL is used while configuring the WAF Logging Kinesis destination.
:::

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-waf-multi-regions-3.png')} alt="Network Firewall S3 bucket configuration" style={{border: '1px solid gray'}} width="700"/>

## Install Cloud Infrastructure Security for AWS

You can install Cloud Infrastructure Security for AWS from the App Catalog to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of usage.

1. From the **App Catalog**, search for and select **Cloud Infrastructure Security for AWS**.
1. Click **Install App**. <br/>The **Configure Sources** screen is displayed: <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-0.png')} alt="Configure Sources screen" style={{border: '1px solid gray'}} width="700"/>
1. For each of the data source types listed, select whether to use an existing source, create a new source, or do not collect data for that source type:
    * **Use Existing Source**. Select this option if collection is already set up for that particular service and data is coming into Sumo Logic under a specific _sourceCategory. Select the _sourceCategory from the dropdown menu.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-0a.png')} alt="Use Existing Source selection" style={{border: '1px solid gray'}} width="400"/>
    * **Create New Source**. Select this option when you want to set up Sumo Logic collection for that particular service. Type the name you want to use for the source. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-0b.png')} alt="Create New Source selection" style={{border: '1px solid gray'}} width="400"/>
    * **Do Not Collect**. Select this option if you do not want to collect data from that particular service. If you choose this option, then collection for the service will not be set up and the corresponding dashboards in the Cloud Infrastructure Security  solution will not contain data. 
1. Click **Next**. <br/>Depending on what you selected, one of the following occurs:
    * If you selected only **Use Existing Source** or **Do Not Collect**, the solution is installed. Proceed to [Start using the solution](#start-using-the-solution).

       :::tip
       Using only existing sources is the easiest way to install, since it means you don't have to create any new sources.
       :::

    * If you selected **Create New Source** for *any* source, the following screen appears. You must perform the steps in the following sections:
       * [Create new source: Select region](#create-new-source-select-region)
       * [Create new source: Check AWS Role Permission](#create-new-source-check-aws-role-permission)
       * [Create new source: Deploy AWS](#create-new-source-deploy-aws) <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-1.png')} alt="Deploy Cloud Infrastructure Security for AWS screen" style={{border: '1px solid gray'}} width="700"/>

### Create new source: Select region

If you selected **Create New Source** for any source on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws), in the **Select Region** section select the [AWS region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions) where you want to deploy the solution. 

For information about where your Sumo Logic data is stored in AWS, see [Where is My Data Stored?](/docs/get-started/faq/#where-is-my-data-stored)

To collect data from multiple regions, see [Multi-region enablement](#multi-region-enablement).

:::info
This step is critical. If you do not select the correct region, you will deploy the solution in the wrong region.
:::

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-step-1.png')} alt="Select region" style={{border: '1px solid gray'}} width="700"/>

### Create new source: Check AWS role permission

If you selected **Create New Source** for any source on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws), perform the steps below.

1. Follow the steps provided in the **Check AWS Role Permission** section of the screen:
    1. Create and attach a policy to your user as described in the [AWS documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-and-attach-iam-policy.html).
    1. Click the JSON file link and add to your policy the permissions contained in the file. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-step-2.png')} alt="Check AWS role permission" style={{border: '1px solid gray'}} width="700"/>
1. Click **Check AWS Role Permission**. This launches a CloudFormation Template that will verify your user has the correct permissions.
1. Sign in the [AWS Console](https://console.aws.amazon.com/console/). After you sign in, the following screen is displayed. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-permissions-cft.png')} alt="Create permissions stack" style={{border: '1px solid gray'}} width="700"/>
1. In **Provide a stack name**, enter a name for the stack. The stack name can include letters (A-Z and a-z), numbers (0-9), and dashes (-).
1. Scroll down to the **Parameters** section.
1. In **Deployment**, enter **No** if you want to install to only one account, or **Yes** if you want to install to all accounts in your organization.
1. In **1. Sumo Logic configuration**, you can accept the defaults. <br/>If fields are missing, or you need to change them, do the following:
   * **Sumo Logic deployment location**. Choose the geographic location of the deployment: au, ca, de, eu, jp, us2, us1, in, kr, or fed. For information about Sumo Logic deployment locations, see [API Authentication, Endpoints, and Security](/docs/api/getting-started/).
   * **Sumo Logic access ID**. Enter the Sumo Logic console access ID, which you received when you created the [access key](/docs/manage/security/access-keys/).
   * **Sumo Logic access key**. Enter your Sumo Logic access key. Retrieve this from your Sumo Logic account.
1. In **2. AWS Organization configuration**, enter the following. (This step is required only if you are installing the solution to all accounts in your AWS organization.)
    * **Security-tooling account ID**. Enter your Security Tooling account ID. This is used to set up the AWS CloudWatch, Lambda, Kinesis, S3 bucket, and SNS topic for collecting AWS GuardDuty, Security Hub, WAF, and Network Firewall data.
    * **Log-archiving account ID**. Enter your log-archiving account ID. This is used to set up an S3 bucket and SNS topic for collecting the AWS CloudTrail data. 
         :::note
         This can be the same ID as the Security Tooling account if you do not have a separate Log Archive account set up.
         :::
    * **Security-tooling and log-archiving account Region**. Enter your Security Tooling and Log Archive account region if it's different from the default.
    * **AWS Organization root ID**. Enter the ID for your organization root. This string requires `r-` followed by from 4 to 32 lowercase letters or digits.
    :::note
    You can find the values for this section in the **Organizational structure** section of your [AWS accounts](https://console.aws.amazon.com/organizations/v2/home/accounts) page. Sign in to the AWS console, click on your profile in the top-right corner, select **Organization**, and in the left nav bar select **Policy management > AWS accounts**. You must have the correct permissions to view the account IDs. For more information about organizations, see [AWS documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_details.html).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-organizations.png')} alt="AWS organizational structure" style={{border: '1px solid gray'}} width="700"/>
    ::: 
1. (Optional) In **Permissions**, select the IAM role name or Amazon Resource Name (ARN) for the Cloud Formation to use for all operations performed on the stack. Do one of the following:
    * Select **IAM role name**, and in the **Sample-role-name** dropdown select a sample name.
    * Select **IAM role ARN**. 
1. Under **Capabilities and transforms**, select the acknowledgement boxes.
1. Click **Create Stack.**
1. Verify that the AWS CloudFormation template has executed successfully in a `CREATE_COMPLETE` status.
    * This indicates that you have all the right permissions on both the Sumo Logic and the AWS side to proceed with the installation of the solution. 
    * All the resources (Sumo Logic and AWS) created by template are also deleted.<br/>  ![Testing_sumo_Permission_2.png](/img/observability/Testing_sumo_Permission_2.png)
1. If the AWS CloudFormation template has not executed successfully, identify and fix any permission errors until the stack completes with a `CREATE_COMPLETE` status. 
1. Once the AWS CloudFormation stack has executed successfully, delete the AWS CloudFormation Stack.

### Create new source: Deploy AWS

If you selected **Create New Source** for any source on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws), perform the steps below.

1. Under **Deploy AWS**, click the **Deploy AWS Security** button and select from the dropdown:
    * **Deploy to single account**. Deploy the solution only to the account of the user installing the application. 
    * **Deploy to all accounts**. Deploy the solution to all accounts in your AWS organization. All users in the organization will have access to the application. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-install-step-3.png')} alt="Deploy AWS Security" style={{border: '1px solid gray'}} width="700"/> 
1. Click **Next**. A CloudFormation template screen is displayed. 
    :::important
    You can accept the defaults shown on this CloudFormation template screen. Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
    :::
1. In **Stack Name**, enter a name for the stack. The stack name can include letters (A-Z and a-z), numbers (0-9), and dashes (-).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-quick-create-stack.png')} alt="Create stack" style={{border: '1px solid gray'}} width="700"/>
1. Scroll down to the **Parameters** section.
1. In **1. Sumo Logic Configuration**, you can accept the defaults. <br/>If fields are missing, or you need to change them, do the following:
      * **Deploy to Organization (All Accounts)**. Select **Yes** to deploy to all accounts in your AWS organization, or select **No** to deploy only to your account.
      * **Sumo Logic deployment location**. Choose the geographic location of the deployment: au, ca, de, eu, jp, us2, us1, in, kr, or fed. For information about Sumo Logic deployment locations, see [API Authentication, Endpoints, and Security](/docs/api/getting-started/).
      * **Sumo Logic access ID**. Enter the Sumo Logic console access ID, which you received when you created the [access key](/docs/manage/security/access-keys/).
      * **Sumo Logic access key**. Enter your Sumo Logic access key. Retrieve this from your Sumo Logic account.
      * **Sumo Logic organization ID**. Enter your Sumo Logic organization ID, which you can find in the Sumo Logic console, under [Account](/docs/get-started/account-settings-preferences).
      * **Delete Sumo Logic resources when stack is deleted**. Choose **false** if you do not want to remove the collector and sources when the stack is deleted. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-1.png')} alt="Sumo Logic configuration" style={{border: '1px solid gray'}} width="700"/>
1. In **2. AWS Organization configuration**, enter the following. (This step is required only if you are installing the solution to all accounts in your AWS organization.)
      * **Security-tooling account ID**. Enter your Security Tooling account ID. This is used to set up the AWS CloudWatch, Lambda, Kinesis, S3 bucket, and SNS topic for collecting AWS GuardDuty, Security Hub, WAF, and Network Firewall data.
      * **Log-archiving account ID**. Enter your log-archiving account ID. This is used to set up an S3 bucket and SNS topic for collecting the AWS CloudTrail data. 
         :::note
         This can be the same ID as the Security Tooling account if you do not have a separate Log Archive account set up.
         :::
      * **Security-tooling and log-archiving account Region**. Enter your Security Tooling and Log Archive account region if it's different from the default.
      * **AWS Organization root ID**. Enter the ID for your organization root. This string requires `r-` followed by from 4 to 32 lowercase letters or digits.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-2.png')} alt="AWS organization configuration" style={{border: '1px solid gray'}} width="700"/>
          :::note
          You can find the values for this dialog in the **Organizational structure** section of your [AWS accounts](https://console.aws.amazon.com/organizations/v2/home/accounts) page. Sign in to the AWS console, click on your profile in the top-right corner, select **Organization**, and in the left nav bar select **Policy management > AWS accounts**. You must have the correct permissions to view the account IDs. For more information about organizations, see [AWS documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_details.html).<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-organizations.png')} alt="AWS organizational structure" style={{border: '1px solid gray'}} width="700"/>
          :::
1. In **3. AWS Service configuration**, fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
      * **Publish Amazon GuardDuty data to Sumo**
      * **Publish AWS CloudTrail data to Sumo** 
      * **Publish AWS Security Hub data to Sumo** 
      * **Publish AWS WAF data to Sumo** 
      * **Publish AWS Network Firewall data to Sumo** 
      <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-3.png')} alt="AWS service configuration" style={{border: '1px solid gray'}} width="700"/>
1. If you selected **Yes** in the preceding step, you can accept the default values in the following sections to set up each source, unless there are any values you'd like to change. <br/><br/>If you selected **No** in the preceding step, in the following sections you must answer **No** when asked if you want to create a source, and you must replace the source category name with the value of your existing installed source.

       <details>
       <summary>GuardDuty</summary>

       In this section, you configure Amazon GuardDuty. Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
       
       If fields are missing, or you need to change them, do the following:
       * **4.1 GuardDuty Sumo log source configuration**
          * **Create Sumo Logic HTTP logs source**.  **Yes** is the default. Select **No** if you already have a source.
          * **Sumo Logic HTTP logs source category name**. The source category name to be created. If you selected **No** in the previous field, enter your existing source category name for the GuardDuty logs. 
       * **4.2 GuardDuty service configuration**
          * **GuardDuty Regions**. The regions from which GuardDuty Data should be sent. To enable multiple regions, enter regions in a comma-separated list. See [Multi-region enablement](#multi-region-enablement) above.
          
          <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-4.png')} alt="GuardDuty configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>CloudTrail</summary>
       
       In this section, you configure AWS CloudTrail. Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
       
       If fields are missing, or you need to change them, do the following:
       * **5.1 CloudTrail Sumo log source configuration**. 
          * **Create Sumo Logic S3 logs source for CloudTrail**. **Yes** is the default value. Select **No** if you already have a source.
          * **Path expression for logs**. The path expression must match the folder structure for CloudTrail logs (for example, `AWSLogs/*/CloudTrail/*`).
          * **Sumo Logic CloudTrail logs source category name**. The source category name to be created. If you selected **No** in the preceding field for creating an S3 log source, enter the name of an existing Sumo Logic source category that's collecting CloudTrail logs. 
       * **5.2 CloudTrail service configuration** 
          * **CloudTrail Regions**. The region from which CloudTrail Data should be sent. 
             :::note
             If you have multiple regions, on the AWS side [configure CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/receive-cloudtrail-log-files-from-multiple-regions.html) to deliver log files from the regions to a single S3 bucket for a single account, and use that S3 bucket in **5.3 CloudTrail S3 bucket configuration** below. For more information, see [Multi-region enablement](#multi-region-enablement) above.
             :::
       * **5.3 CloudTrail S3 bucket configuration**. 
          * **Create an S3 bucket for CloudTrail logs**. **Yes** is the default value. Select **No** if you already have a bucket. (We recommend you use an existing bucket if possible.)
          * **Name of existing S3 bucket that contains the CloudTrail logs**. If you selected **Yes** in the previous field, leave this blank. If you selected **No** in the previous field, enter the name of the existing S3 bucket. 
          * **Delivery bucket prefix**. The log delivery S3 bucket prefix. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-5.png')} alt="CloudTrail configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>Security Hub</summary>

       In this section, you configure AWS Security Hub. Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
       
       If fields are missing, or you need to change them, do the following:
       * **6.1 Security Hub Sumo Log Source configuration**.
          * **Create Sumo Logic HTTP logs source**. **Yes** is the default value. Select **No** if you already have a logs source.
          * **Sumo Logic HTTP logs source category name**. The source category name to be created. If you selected **No** in the previous field, provide an existing source category name from the Security Hub logs.  
       * **6.2 Security Hub Service Configuration**. 
          * **Security Hub Regions**. The regions from which Security Hub data should be sent. To enable multiple regions, enter regions in a comma-separated list. See [Multi-region enablement](#multi-region-enablement) above.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-6.png')} alt="Security Hub configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

       <details>
       <summary>WAF</summary>

       In this section, you configure the AWS Web Application Firewall (WAF). Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
       
       If fields are missing, or you need to change them, do the following:
       * **7.1 AWS Firewall Manager Policy Regions Configuration**.
          * **AWS WAF Policy Regions**. The region from which AWS WAF data should be sent. 
             :::note
             If you have multiple regions, on the AWS side [configure Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html) to deliver log files from multiple Regions to a single S3 bucket for a single account, and use that S3 bucket in section **7.4 Firewall Manager - S3 Bucket Configuration** above. For more information, see [Multi-region enablement](#multi-region-enablement) above.
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

       In this section, you configure AWS Network Firewall. Fields have been autofilled based on your choices on the [**Configure Sources** screen](#install-cloud-infrastructure-security-for-aws). You only need to change values if any are missing or incorrect. Carefully review the values to ensure they are correct.
       
       If fields are missing, or you need to change them, do the following:
       * **7.3 Firewall Manager Details - S3 Source Network Firewall Configuration**.
          * **Create Sumo Logic Amazon S3 Logs Source for Network Firewall**.  **Yes** is the default. Select **No** if you already have a source.
          * **Sumo Logic Amazon S3 Logs Source Category Name for Network Firewall**. The source category name to be created. If you selected **No** in the previous field, enter an existing source category name. 
       * **7.4 Firewall Manager - S3 Bucket Configuration**.
          * **Create AWS S3 Bucket**. **Yes** is the default value. Select **No** to use an existing S3 bucket from AWS S3 which has Network Firewall Logs.
             :::note
             If the S3 bucket is created by the Cloud Infrastructure Security solution, then make sure on the AWS side that it's a central [S3 bucket for Network Firewall](https://docs.aws.amazon.com/network-firewall/latest/developerguide/logging-s3.html) for all regions. For more information, see [Multi-region enablement](#multi-region-enablement) above.
             :::
          * **Network Firewall Delivery Bucket Prefix**. The Network Firewall Log Delivery S3 bucket prefix.
          * **Name of existing S3 Bucket which contains the Network Firewall Logs**. If you selected **Yes** in the preceding field in this section for creating an S3 bucket, leave this blank. If you selected **No** in the preceding field for creating an S3 bucket, provide an existing S3 Bucket name which contains Network Firewall Logs. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-param-7a.png')} alt="Firewall configuration" style={{border: '1px solid gray'}} width="700"/>
       </details>

1. Under **Permissions**, in **IAM role - optional**, choose the IAM role for CloudFormation to use for all operations performed on the stack. The role must have permissions to set up the necessary Lambdas, S3 buckets, Kinesis streams, and other objects needed in the CloudFormation template, as well as access to the appropriate logs. If your AWS role does not have the necessary permissions, see [Create new source: Check AWS role permission](#create-new-source-check-aws-role-permission). <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-permissions.png')} alt="Create Stack button" style={{border: '1px solid gray'}} width="700"/>
1. Under **Capabilities and transforms**, select the acknowledgement boxes.
1. Click **Create Stack**. The stack is created, and the solution is installed.

If any errors occur, see [Troubleshoot installation](#troubleshoot-installation). 

### Start using the solution

After the solution is installed, you can view its [monitors](#cloud-infrastructure-security-for-aws-monitors), [dashboards](#cloud-infrastructure-security-for-aws-dashboards), and saved searches.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-installed.png')} alt="The screen of the installed solution" style={{border: '1px solid gray'}} width="600"/>

## Troubleshoot installation

Installation of Cloud Infrastructure Security for AWS uses an AWS CloudFormation template. While deploying using the template, you may receive error messages such as `CREATE_FAILED` status or `ROLLBACK_COMPLETE` status for various reasons. This section provides information on how to troubleshoot such AWS CloudFormation installation failures.

#### Determine the cause of a CloudFormation installation failure

This section walks you through the process of troubleshooting an AWS CloudFormation installation failure.

To debug an AWS CloudFormation installation failure, do the following:

1. After the stack rollback is complete and the status is `ROLLBACK_COMPLETE`, go to the parent stack. In the parent stack, look for the first failure as shown in the following example. The failure can be a direct reason or can point to a nested stack. <br/><img src={useBaseUrl('img/observability/Troubleshooting_1.png')} alt="A screenshot of the stack with the words circled 'Rollback complete'" style={{border: '1px solid gray'}} width="800"/>
1. Look for direct reasons for the failure that is available in the parent stack, as shown in the following example. <br/><img src={useBaseUrl('img/observability/Troubleshooting_2.png')} alt="A screenshot of the stack with the words circled 'Failed to create resource. 401 client error.'" style={{border: '1px solid gray'}} width="800"/>
1. To find indirect reasons for the failure, go to the nested stack mentioned in the status reason, as shown in the following example. Take a note of the resources mentioned in the reason. <br/><img src={useBaseUrl('img/observability/Troubleshooting_3.png')} alt="Screenshot with the words circled 'Embedded stack'" style={{border: '1px solid gray'}} width="800"/>
1. Select the deleted option to find the nested stacks, as shown in the following example.<br/><img src={useBaseUrl('img/observability/Troubleshooting_4.png')} alt="Deleted selected from the dropdown menu" style={{border: '1px solid gray'}} width="400"/>
1. Go to the nested stack and look for the resource mentioned in the previous step to identify the reason, as shown in the following example.<br/><img src={useBaseUrl('img/observability/Troubleshooting_5.png')} alt="Screenshot showing a line saying 'Failed to create resource. 401 client error. Credential could not be verified.'" style={{border: '1px solid gray'}} width="800"/>

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
1. Select **Delete**.<br/><img src={useBaseUrl('img/observability/CFT_Uninstall.png')} alt="Delete button in the upper right part of the screen" style={{border: '1px solid gray'}} width="800"/>

## Cloud Infrastructure Security for AWS monitors

Following are monitors included with the solution:

* **Admin Privileges Granted**. Detects when administrative privileges are granted to a user or role. This is crucial for monitoring and controlling access to sensitive resources and ensuring that only authorized personnel have administrative capabilities.
* **Amazon GuardDuty BruteForce finding**. Alerts on brute force attacks detected by Amazon GuardDuty. These attacks typically involve repeated attempts to gain unauthorized access to a system using various password combinations.
* **Amazon GuardDuty InstanceCredentialExfiltration finding**. Triggers when GuardDuty detects potential exfiltration of instance credentials. This could indicate that an attacker is attempting to steal and use the credentials outside of the AWS environment.
* **CloudTrail Changes**. Monitors changes in AWS CloudTrail configurations, which track API calls and activities in your AWS account. Changes to CloudTrail could indicate attempts to hide malicious activities.
* **Config Changes**. Tracks changes to AWS Config settings. AWS Config monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations.
* **Critical GuardDuty Alerts**. Alerts on critical severity findings from Amazon GuardDuty. These findings typically indicate severe security threats that require immediate attention and remediation.
* **EC2 instance accessed from malicious IP**. Alerts when an EC2 instance is accessed from an IP address identified as malicious by threat intelligence feeds. This could signify a potential breach or unauthorized access attempt.
* **High Severity GuardDuty Alerts**. Triggers on high severity findings from Amazon GuardDuty, indicating significant security threats that need prompt investigation and action.
* **Important GuardDuty Alerts**. Alerts on important severity findings from Amazon GuardDuty. These findings are notable and should be investigated to ensure they do not escalate into more severe issues.
* **Landspeed Violations**. Detects landspeed violations, which generally refer to unusual and rapid movements of data or activities across different regions that could indicate data exfiltration or unauthorized operations.
* **Low Severity GuardDuty Alerts**. Monitors low severity findings from Amazon GuardDuty. While these findings may not require immediate action, they should be reviewed to ensure they do not evolve into more significant threats.
* **Medium Severity GuardDuty Alerts**. Alerts on medium severity findings from Amazon GuardDuty. These findings indicate moderate security threats that should be investigated and addressed appropriately.
* **Root Account Login**. Triggers when there is a login to the AWS root account. Root account access should be highly restricted and monitored due to its unrestricted access to all resources in the account.

## Cloud Infrastructure Security for AWS saved searches

Following are saved searches included with the solution:

* **Admin Privileges Granted**. Detects when administrative privileges are granted to a user or role, helping to monitor and control access to sensitive resources.
* **Control Failure Findings Details by Severity**. Provides detailed information on control failures categorized by their severity levels, aiding in prioritizing remediation efforts.
* **Creation of IAM Role**. Monitors the creation of new IAM roles, which can grant permissions to users, applications, or services within AWS.
* **Deleted Resources Over Time**. Tracks resources that have been deleted over time, which can help in understanding changes to the environment and identifying potential issues.
* **Exposed S3 Bucket Created**. Alerts when an S3 bucket is created with permissions that make it publicly accessible, which can lead to data leaks.
* **Gateway Changes**. Monitors changes to internet gateways, NAT gateways, and other related configurations that can affect network traffic flow.
* **IAM Policy Changes**. Tracks changes to IAM policies, which define permissions for users and roles, helping to ensure security policies are enforced properly.
* **Least Common Out of Compliance Findings**. Identifies the least common compliance issues, which may highlight rare but potentially severe misconfigurations or vulnerabilities.
* **Most Common Out of Compliance Findings**. Identifies the most frequent compliance issues, helping to prioritize common problems that need attention.
* **Network ACL Changes**. Monitors changes to Network Access Control Lists (ACLs), which control inbound and outbound traffic at the subnet level.
* **New Admins Added**. Alerts when new administrative users are added, ensuring that administrative access is appropriately monitored and controlled.
* **Route Table Changes**. Tracks changes to route tables, which control the traffic routing in VPCs, ensuring network routes are configured as intended.
* **S3 Bucket Changes**. Monitors changes to S3 bucket configurations, which can affect data security and accessibility.
* **Security Group Changes**. Tracks changes to security groups, which act as virtual firewalls for controlling inbound and outbound traffic to AWS resources.
* **VPC Changes**. Monitors changes to Virtual Private Cloud (VPC) settings, which can impact the overall network architecture and security.

## Cloud Infrastructure Security for AWS dashboards​

import FilterDashboards from '../../../reuse/filter-dashboards.md';

<FilterDashboards/>

### Recommended investigations workflow

To most efficiently use the solution to address security concerns, we recommend using the dashboards in the following workflow:
1. Look at the [Risk Overview](#risk-overview) dashboard to get an overall picture of the security posture of your environment. Pivot or browse to other dashboards to see details in each area.
1. Look at activity displayed in the [Active Threats](#active-threats-dashboards) dashboards to find issues that need immediate attention.
1. View the [Security Control Failures](#security-control-failures---aws-security-hub) dashboard to find areas that are identified as failing to meet compliance requirements, and therefore possibly pose a security risk.
1. Review the [Suspicious Activity](#suspicious-activity-dashboards) dashboards to uncover suspicious activity that may need investigation.
1. Pivot into the [Risk Overview](#risk-overview) dashboard for specific resources that have issues to see any related activity. Review the action plan presented at the bottom of the dashboard to work through the items identified as needing attention.

### Risk Overview

The **Risk Overview** dashboard provides a summary of all resources that pose risks in a single dashboard that rolls up the findings from other dashboards. It also shows AWS API events by time, and has an **Action Plan** panel so you can access resources that need attention.

You can also use this dashboard to show details of a single resource. See [View resource risk details](#view-resource-risk-details) below.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-risk-overview.png')} alt="Risk Overview dashboard" style={{border: '1px solid gray'}} width="600"/>

#### View resource risk details

You can click a resource on any dashboard to view details about its risk in the [Risk Overview](#risk-overview) dashboard:
1. Click a resource in a dashboard. A summary of that resource’s data appears in a panel.
1. In the panel under **Linked Dashboards**, select **Risk Overview**. <br/><img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-linked-dashboard.png')} alt="Linked dashboard" style={{border: '1px solid gray'}} width="600"/>
1. The selected resource’s data appears in the **Risk Overview** dashboard, broken down by the types of data collected. This lets you see at a glance all the different risks presented by the resource. Note at the top of the dashboard that the filters specify the resource.

### Active threats dashboards

The Active Threats dashboards show data on threats that require attention. Review these dashboards to see threats identified in AWS APIs, resources, and storage.

#### Active Threats: AWS APIs

The **Active Threats: AWS APIs** dashboard shows threats identified from AWS APIs by correlating it with threat intelligence data. It shows threats count and trend, and threats by resource, actor, events, and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-apis.png')} alt="Active Threats: AWS APIs dashboard" style={{border: '1px solid gray'}} width="600"/>

#### Active Threats: AWS Resources

The **Active Threats: AWS Resources** dashboard shows threats identified in AWS resources such as EC2 and IAMUser as reported by Amazon GuardDuty. It shows findings by resource, trend, resource type, category, and country. This dashboard has an **Action Plan** panel so you can access suggested resources that need attention through the AWS console.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-resources.png')} alt="Active Threats: AWS APIs dashboard" style={{border: '1px solid gray'}} width="600"/>

#### Active Threats: AWS Storage 

The  **Active Threats: AWS Storage** dashboard provides threat counts related to AWS S3 buckets. It shows threats count and trend, and threats by resource, actor, and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-active-threats-aws-storage.png')} alt="Active Threats: AWS Storage dashboard" style={{border: '1px solid gray'}} width="600"/>

### Cloud SIEM Insights Overview

The **Cloud SIEM Insights Overview** dashboard runs advanced threat detection (Cloud SIEM Insights) on your AWS data so that you can get early detection of  attacks and protect against evolving threats. This dashboard is only available if you use [Cloud SIEM](/docs/cse/). 

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-cloud-siem-insights.png')} alt="Cloud SIEM Insights dashboard" style={{border: '1px solid gray'}} width="600"/>

### Security Control Failures - AWS Security Hub

The **Security Control Failures - AWS Security Hub** dashboard shows resources that need to be addressed because they are vulnerable as reported by AWS Security Hub. It shows findings by resource, trend, type, and category. By default, the `compliance_status` filter at the top of the dashboard is set to **FAILED** to show resources that fail compliance. Set the `risk.calculated_level` filter to **high** or **critical** to see the most important failures.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-security-control-failures-aws-security-hub.png')} alt="Security Control Failures - AWS Security Hub dashboard" style={{border: '1px solid gray'}} width="600"/>

### Suspicious Activity dashboards

The Suspicious Activity dashboards show data on events identified by anomaly detection that indicate out-of-the ordinary patterns that may require attention. Review these dashboards to see activity identified in configurations, Identity and Access Management (IAM), networks, users, and on the Web. It prioritizes activity by z-score threshold, labeled `risk.calculated_level`, which measures how unusual it is.

#### Suspicious Config and IAM Activity

The **Suspicious Config and IAM Activity** dashboard shows suspicious changes for configurations and Identity Access Management (IAM). It shows suspicious changes in IAM policies, security groups, VPCs, network ACLs, route tables, gateways, S3 bucket permissions, deletion of CMK, and configurations.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-config-and-iam-activity.png')} alt="Suspicious Config and IAM Activity dashboard" style={{border: '1px solid gray'}} width="600"/>

#### Suspicious Network Activity

The **Suspicious Network Activity** dashboard shows suspicious activity on networks. It shows suspicious blocked source-destination pairs, suspicious traffic, trends for blocked activity and traffic, and geo locations for suspicious blocked destinations and traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-network-activity.png')} alt="Suspicious Network Activity dashboard" style={{border: '1px solid gray'}} width="600"/>

#### Suspicious User Activity

The **Suspicious User Activity** dashboard shows suspicious activity that users perform in the cloud. It shows failed console logins, console logins without MFA, console logins from risky geo locations, root account logins, unauthorized AWS API requests, and impossible travel events.

To see all events a particular user has been involved with, click a user on a panel (a honeycomb cell), and then on the resulting panel under **Linked Dashboards** click **Risk Overview**. For details, see [View resource risk details](#view-resource-risk-details).

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-user-activity.png')} alt="Suspicious User Activity dashboard" style={{border: '1px solid gray'}} width="600"/>

#### Suspicious Web Activity

The **Suspicious Web Activity** dashboard shows suspicious activity on the Web. It shows suspicious blocked requests, including by trend and geo location.

<img src={useBaseUrl('img/integrations/amazon-aws/cis-for-aws-suspicious-web-activity.png')} alt="Suspicious Web Activity dashboard" style={{border: '1px solid gray'}} width="600"/>

