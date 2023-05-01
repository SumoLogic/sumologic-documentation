---
id: security-hub
title: AWS Security Hub
description: The Sumo Logic App for AWS Security Hub leverages findings data from Security Hub and visually displays the data in Dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/security-qs.png')} alt="Thumbnail icon" width="50"/>

AWS Security Hub is an AWS security service that provides a comprehensive view of your security state within AWS and your compliance with the security industry standards and best practices.

The Sumo Logic App for AWS Security Hub leverages findings data from Security Hub and visually displays security state data in Dashboards. The dashboards provide a high-level view of findings, showing the type, when they occurred, the resources that were affected, their severity, and their distribution, showing the current security and compliance status of an AWS account from all sources.

Sumo Logic provides a seamless bi-directional integration with AWS Security Hub with the following:

* **[AWS Security Hub forwarder](#1-Ingest-findings-into-AWS-Security_Hub)** - This solution forwards (sends) scheduled search results and alerts (as findings) to AWS Security Hub.
* **[AWS Security Hub collector](#2-Collect-Findings-for-the-AWS-Security-Hub-App)** - This solution collects findings from AWS Security Hub to Sumo Logic where they are displayed in visual pre-defined dashboards.

The Sumo Logic integration with AWS Security Hub extends compliance checks to other key regulatory frameworks such as PCI, GDPR, HIPAA, and others.

For more information on AWS Security Hub, refer to the [Amazon AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) documentation.

## Log Types

The AWS Security Hub utilizes the following log types:
* [Amazon findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)


## Sending Findings to AWS Security Hub
This section shows you how to enable Sumo Logic as a Finding Provider, deploy the AWS Security Hub forwarder, create a Webhook connection, and create a scheduled search.

The **AWS Security Hub forwarder** sends scheduled search results and alerts as [findings](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings.html) to AWS Security Hub.

To complete the following tasks, Security Hub must be enabled on your AWS account. For more information, see the AWS Security Hub documentation for [Setting Up AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html).


### AWS Security Hub forwarder overview

AWS Security Hub forwarder creates a Lambda function along with an [Identity Access and Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) authentication secured API Gateway endpoint. A Sumo Logic scheduled search then sends the results to the endpoint using [Webhook for Lambda](/docs/alerts/webhook-connections/aws-lambda.md) The triggered Lambda function parses the search results, transforming them into [Amazon Finding Format](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html) (AFF). Each of the rows of the AFF data is sent as a finding to AWS Security Hub.

The configuration is defined using [SAM specification](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html) and published in [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/).



### Step 1: Enable Sumo Logic as a Finding Provider

AWS Security Hub detects and consolidates those security findings from the supported AWS services that are generated after Security Hub is enabled in your AWS accounts. This section demonstrates how to enable Sumo Logic as an AWS Finding Provider (FP) to communicate with AWS Security Hub.

To enable Sumo Logic for AWS Security Hub, do the following:

1. Open the Security Hub console at [https://console.aws.amazon.com/securityhub](https://console.aws.amazon.com/securityhub), and choose **Settings > Providers**.
2. Search for “Sumo Logic” and click **Subscribe** for Sumo Logic Machine Data Analytics.


### Step 2: Deploy the AWS Security Hub forwarder

This section demonstrates how to deploy the AWS Security Hub forwarder, a serverless application based on [AWS SAM specification](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html).

To deploy the AWS Security Hub forwarder, do the following:

1. Open a browser window and go to the following URL: [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. In the Serverless Application Repository, search for sumologic.
3. Select the **Show apps that create custom IAM roles or resource policies** checkbox, click the **sumo-logic-securityhub-forwarder** app link, and then click **Deploy**.
4. After the stack is deployed, go to **CloudFormation > Stacks > Stack details > Outputs** and copy the value of **SecurityHubForwarderApiUrl**. This is the API Gateway endpoint.


### Step 3: Create a Webhook connection

This section demonstrates how to create a Webhook connection to trigger an AWS Lambda function.

To create a Webhook connection, do the following:

1. Follow the instructions for [creating a Webhook connection](/docs/alerts/webhook-connections/aws-lambda.md), and use the value from [step 4](#API-Gateway-endpoint) as the URL.
AWS Security Hub Connector (SAM application) secures the endpoint with the AWS_IAM authorization type.
2. Verify that it has the following payload:
  ```json
  {
    "Types": "<type> Ex: Software and Configuration Checks/Industry and Regulatory Standards/PCI-DSS Controls",
    "Description": "{{SearchDescription}}",
    "SourceUrl": "{{SearchQueryUrl}}",
    "GeneratorID": "{{SearchName}}",
    "Severity": 50,
    "Rows": "{{AggregateResultsJson}}",
    "ComplianceStatus": "(Optional)<status> - PASSED/WARNING/FAILED/NOT_AVAILABLE"
  }
  ```
  * For the `"Severity"` value, enter a number from 0 to 100. For `Types`, `Description`, `SourceUrl`, `GeneratorID`, `Severity`, and `Compliance`, status are mapped to corresponding fields specified in Amazon Finding Format.
3. Ensure that the IAM role or IAM user (whose credentials are used) has permissions to invoke the API in API Gateway, as described in [Control Access for Invoking an API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html) Amazon documentation. You can use the payload in troubleshooting tips section to test the connection.


### Step 4: Create scheduled searches

When you save a search, you can add a schedule to run it at a regularly scheduled time, and add alerts. This section demonstrates how to write a query and then create a scheduled search for AWS Security Hub.

The purpose of search is to identify a security or compliance issue, when it was generated, and which resource was affected.  

Each search result translates to one finding—only one resource per finding is supported.

In the following example, the query generates a finding that there is direct external traffic to a secured port which violates one of the PCI requirement checks.


```sql
_sourceCategory=Labs/AWS/VPC ACCEPT (3306 or 5439 or 5432 or 1433 or 2638 or 5984)
| json "message" as _rawvpc nodrop | if (_raw matches "{*", _rawvpc,_raw) as message
| parse field=message "* * * * * * * * * * * * * *" as version,aws_account_id,interfaceID,src_ip,dest_ip,src_port,dest_port,Protocol,Packets,bytes,StartSample,EndSample,Action,status
| where Action="ACCEPT" and dest_port in ("3306", "5439", "5432", "1433", "2638", "5984")
| where (compareCIDRPrefix("172.16.0.0", dest_ip, toInt(12)) or compareCIDRPrefix("192.168.0.0", dest_ip, toInt(16)) or compareCIDRPrefix("10.0.0.0", dest_ip, toInt(8)) and (dest_port in ("3306", "5439", "5432", "1433", "2638", "5984")))
| where (!compareCIDRPrefix("172.16.0.0", src_ip, toInt(12)) and !compareCIDRPrefix("192.168.0.0", src_ip, toInt(16)) and !compareCIDRPrefix("10.0.0.0", src_ip, toInt(8)))
| "Direct external traffic to secure port" as message | "Critical" as Severity
| concat("PCI Req 01: Traffic to Cardholder Environment: Direct external traffic to secure port on ", dest_ip) as title   
| _messagetime as finding_time
| dest_ip as resource_id
| "AwsEc2Instance" as resource_type  
| count by finding_time, resource_id, resource_type, title, aws_account_id
| fields -_count
```

To write a query and create a scheduled search, do the following:

1. Write a search query that contains following mandatory fields, as described in the [AWS Security Hub documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html):
  ```
  "finding_time", "resource_type", "resource_id", "title"
  ```
   * The "`finding_time`" field  can be either the `_messageTime` or `_timeslice` field in Sumo Logic.
1. Create a scheduled search, as described in [this document](/docs/alerts/scheduled-searches/schedule-search), and configure the following settings:
   * Alert condition is set to “Greater than >” and Number of Results is set to 0.
   * Alert Type is set to “Webhook”.
   * Connection is set to the name configured in step 2 (of the link document instructions).
   * Toggle the customize payload button and fill the fields in the following dialog. The following table explains each field.
   * The “aws_account_id” is an optional field in search results. The Lambda function picks up the aws_account_id in the following order of priority:

   |                  |
   |:-------|:-----------------------|
   | Types            | Type of Finding in the format namespace/category/classifier. This field should match one of the finding types, as defined in Finding Type Taxonomy in [AWS docs](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html#securityhub-findings-format-type-taxonomy). |
   | Description      | Details specific to the instance of the finding. This should be non empty.      |
   | SourceURL        | Search Query URL pointing to the exact query that generated the finding.       |
   | GeneratorID      | Scheduled Search Name that generated this finding.           |
   | Severity         | Impact of a finding has on a customer (data loss, malware activity, configuration weakness etc), displayed as an integer ranging from 0 to 100.                 |
   | ComplianceStatus | Results of a compliance check. This is an optional field and its value should be one of the following: PASSED/WARNING/FAILED/NOT_AVAILABLE.                     |
1. The `aws_account_id` field in the search results.
2. `AWS_ACCOUNT_ID` set as a Lambda environment variable.
3. The `account_id` where the lambda function is running.

The `aws_account_id` defaults to the account in which Lambda is running.


### Troubleshooting tips

In the case of a problem, perform the following tasks to discover the cause.

1. Test the API using mock data, such as the following JSON example.
  ```json
  {
    "Types": "Software and Configuration Checks/Industry and Regulatory Standards/HIPAA Controls",
    "Description": "This search gives top 10 resources which are accessed in last 15 minutes",
    "GeneratorID": "InsertFindingsScheduledSearch",
    "Severity": 30,
    "SourceUrl": "https://service.sumologic.com/ui/#/search/RmC8kAUGZbXrkj2rOFmUxmHtzINUgfJnFplh3QWY",
    "ComplianceStatus": "FAILED",
    "Rows": "[{\"Timeslice\":1542719060000,\"finding_time\":\"1542719060000\",\"item_name\":\"A nice dashboard.png\",\"title\":\"Vulnerability: Apple iTunes m3u Playlist File Title Parsing Buffer Overflow Vulnerability(34886) found on 207.235.176.3\",\"resource_id\":\"10.178.11.43\",\"resource_type\":\"Other\"},{\"Timeslice\":\"1542719060000\",\"finding_time\":\"1542719060000\",\"item_name\":\"Screen Shot 2014-07-30 at 11.39.29 PM.png\",\"title\":\"PCI Req 01: Traffic to Cardholder Environment: Direct external traffic to secure port on 10.178.11.43\",\"resource_id\":\"10.178.11.42\",\"resource_type\":\"AwsEc2Instance\"},{\"Timeslice\":\"1542719060000\",\"finding_time\":\"1542719060000\",\"item_name\":\"10388049_589057504526630_2031213996_n.jpg\",\"title\":\"Test Check Success for  207.235.176.5\",\"resource_id\":\"10.178.11.41\",\"resource_type\":\"Other\"}]"
  }
  ```
2. Check for status code 200 in the response body to verify whether the API Gateway and Lambda integration is working correctly. For more information on how to test API Gateway with console refer these [docs](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-test-method.html).
3. Monitor scheduled search logs using following query in Sumo Logic. This verifies whether the scheduled search was triggered or not.
  ```json
  _view=sumologic_audit "Scheduled search alert triggered" <webhook_name>
  ```
4. Check the CloudWatch logs for the Lambda function. Sumo saves Lambda function logs to CloudWatch in a log group: **/aws/lambda/<function_name>**. Check this log for any errors during lambda execution.


## Collecting Findings for the AWS Security Hub App
This section shows you how to add a hosted collector and Amazon S3 Source and deploy an AWS Security Hub collector.

To complete the following tasks, Security Hub must be enabled on your AWS account. For more information,, see the AWS Security Hub documentation for [Setting Up AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-settingup.html).


### Collection overview  

Sumo Logic provides a serverless solution for creating a CloudWatch events rule and a Lambda function (SecurityHubCollector) to extract findings from AWS Security Hub.

Findings from AWS services (AWS Security Hub) are delivered to CloudWatch Events as events in near real time. The Lambda function parses those events and sends them to an S3 bucket. Sumo Logic then collects the findings data using an S3 bucket source on a Sumo Logic hosted collector. The Lambda function setup is defined using Serverless Application Model (SAM) specifications and is published in AWS Serverless Application Repository.

You don't have to manually create the AWS resources. Simply deploy the solution, as described in the [Step 2: Deploy an AWS Security Hub App collector](#Step_2:_Deploy_an_AWS_Security_Hub_App_collector).


#### Step 1: Add a hosted collector and Amazon S3 source

This section demonstrates how to add a hosted Sumo Logic collector and AWS source, to collect events for  the AWS Security Hub App.

**Prerequisites**

An AWS Source must be associated with a Sumo Logic Hosted Collector. Before creating the S3 source, identify the Sumo Logic Hosted Collector you want to use, or create a new Hosted Collector as described in the following task.

To add a hosted collector and Amazon S3 source:
1. [Grant Access to an Amazon S3 Bucket](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).
2. To create a new Sumo Logic Hosted Collector, perform the steps in [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector)
3. Add an [AWS Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source) for the S3 Source to Sumo Logic, and in **Advanced Options for Logs**, under Timestamp Format, click **Specify a format** and enter the following:
    1. Specify **Format** as `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
    2. Specify **Timestamp locator** as `.*"UpdatedAt":"(.*)".*`
    3. Click **Add**.

#### Step 2: Deploy an AWS Security Hub App collector

The **AWS Security Hub App collector** transforms the received events and sends them to Sumo Logic. The AWS Security Hub App displays the results in pre-defined visual dashboards for you to analyze.

To deploy an AWS Security Hub App collector:
1. Open a browser window and enter the following URL: [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications)
2. In the Serverless Application Repository, search for **sumologic**.
3. Select **Show apps that create custom IAM roles or resource policies **check box.
4. Click the **sumologic-securityhub-collector **link, and then click **Deploy**.
5. In the **AWS Lambda > Functions > Application Settings** panel, enter the name of the **S3SourceBucketName** for the bucket you configured (when you defined the S3 source).
6. Scroll to the bottom of the window and click **Deploy**.


### Sample Log

```json title="AWS Security Hub log"
{
  "SchemaVersion": "2018-10-08",
  "ProductArn": "arn:aws:securityhub:us-west- 2:123456789012:provider:private/default",
  "AwsAccountId": "123456789012",
  "Id": "test_finding_123456",
  "GeneratorId": "TestDetector",
  "Types": [
    "Software and Configuration Checks/Vulnerabilities/CVE"
  ],
  "CreatedAt": "2018-11- 06T13:22:13.933Z",
  "UpdatedAt": "2018-11-07T14:22:13.933Z",
  "Severity": {
    "Product": 10,
    "Normalized": 30
  },
  "Title": "Unprotected port 22 found on instance i-01234567890abcefb",
  "Description": "Test finding was found on instance i- 01234567890afbcefa",
  "Resources": [
    {
      "Type": "AwsEc2::Instance",
      "Id": "arn:aws:ec2:us-west-2: 123456789012:instance:i- 01234567890abcefa"
    }
  ],
  "SourceUrl": "http://myfp.com/recommendations/dangerous_things_and_how_to_fix_them",
  "Process": {
    "Name": "My Process",
    "Path": "/Process/Path"
  },
  "RecordState": "ACTIVE",
  "Note": {
    "Text": "User1 will address this finding",
    "UpdatedBy": "User1",
    "UpdatedAt": "2018-11-03T13:22:13.933Z"
  }
}
```


### Sample Query

```sql title="Findings by resource type and severity query"
(_sourceCategory="securityhub_findings" OR _sourceCategory="Labs/AWS/SecurityHub")
| json  "AwsAccountId", "Id", "GeneratorId", "ProductArn", "CreatedAt", "UpdatedAt", "Resources",
 "Severity.Normalized", "SourceUrl",
"Types", "Compliance.Status" as aws_account_id, finding_id, generator_id, product_arn, created_at,
 updated_at, resources, severity_normalized, sourceurl, finding_types, compliance_status nodrop
| parse regex field=finding_types "\"(?<finding_type>.*?)\"" multi
| parse regex field=resources "\"Type\":\"(?<resource_type>.*?)\"" multi
| parse regex field=resources "\"Id\":\"(?<resource_id>.*?)\"" multi
| parse regex field=product_arn "product/(?<finding_provider>.*?)$"
| min(severity_normalized), pct(severity_normalized,25), pct(severity_normalized,50), pct(severity_normalized,75),
  max(severity_normalized) by resource_type
```

## Installing the AWS Security Hub App

Now that you have set up ingestion and collected findings for AWS Security Hub, you can install the Sumo Logic App for AWS Security Hub and use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/app-install.md}

## Viewing AWS Security Hub Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that narrow search results across the entire dashboard.


**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### Overview

**The AWS Security Hub - Overview Dashboard** provides a high-level view of findings results. Panels display data aggregated by the number of providers, findings by provider, total findings, findings in AWS accounts by severity, top recent findings, findings by resource type and severity, most severe findings, and critical findings comparison. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:

* Track findings from different finding providers.
* Get a high-level overview of actionable items from a security perspective.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Overview.png')} alt="AWS Security Hub dashboard" />


### Types

**The AWS Security Hub - Types Dashboard** provides a visual analysis of findings by AWS accounts and types namespace for: category, classifier, timeline, severity distribution, and severity Box Plot. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:
* Isolate important security findings based on finding types.
* Analyze the findings distribution across AWS accounts and their severity.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Types.png')} alt="AWS Security Hub dashboard" />


### Compliance

**The AWS Security Hub - Compliance Dashboard** provides a high-level visual analysis of compliance status, resource failures, AWS account failures, failed events, status timelines, status and severity distribution and finding types. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:
* Monitor failing compliance checks.
* Analyze the distribution of failed compliance checks across AWS accounts, their severity and finding types.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_Compliance.png')} alt="AWS Security Hub dashboard" />

### Resources Affected

**The AWS Security Hub - Resources Affected Dashboard** provides a high-level visual analysis of findings by resource type by time interval, top critical resource IDs, AWS account, and the findings details. Each panel provides the ability to drill down for a more granular view of the data.

Use this dashboard to:

* Discover which critical resources are affected.
* Analyze how they are distributed across AWS accounts.
* Filter on Finding Type, Resource Type, Provider, AWS Account, Title, Category, Resource Type with the Finding details panel.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS_SecurityHub_ResourcesAffected.png')} alt="AWS Security Hub dashboard" />
