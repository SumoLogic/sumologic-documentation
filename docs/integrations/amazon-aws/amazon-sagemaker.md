---
id: amazon-sagemaker
title: Amazon Sagemaker
sidebar_label: Amazon Sagemaker
description: Learn about the collection process for the Amazon Sagemaker service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-sagemaker-logo.png')} alt="Thumbnail icon" width="50"/>

The Sumo Logic Amazon Sagemaker app dashboards offer insights into CloudTrail, CloudWatch Logs, and performance metrics for your Amazon Sagemaker service. These preconfigured dashboards enable you to monitor logs and the runtime performance metrics of your Amazon Sagemaker.

[Amazon Sagemaker Service](https://aws.amazon.com/sagemaker/) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon through a single API, along with a broad set of capabilities you need to build generative AI applications with security, privacy, and responsible AI. Using Amazon Sagemaker, you can easily experiment with and evaluate top FMs for your use case, privately customize them with your data using techniques such as fine-tuning and Retrieval Augmented Generation (RAG), and build agents that execute tasks using your enterprise systems and data sources. Since Amazon Sagemaker is serverless, you don't have to manage any infrastructure, and you can securely integrate and deploy generative AI capabilities into your applications using the AWS services you are already familiar with.

## Log and metrics types

The Amazon Sagemaker app uses the following logs and metrics:
* [Monitor Amazon Sagemaker API calls using CloudTrail](https://docs.aws.amazon.com/sagemaker/latest/userguide/logging-using-cloudtrail.html).
* [Monitor model invocation using CloudWatch Logs](https://docs.aws.amazon.com/sagemaker/latest/userguide/model-invocation-logging.html).
* [Amazon Sagemaker runtime metrics](https://docs.aws.amazon.com/sagemaker/latest/userguide/monitoring.html#runtime-cloudwatch-metrics).

### Sample CloudTrail log message

<details>
<summary>Click to expand</summary>

```json title="CloudTrail"
{
  "eventVersion": "1.11",
  "userIdentity": {
    "type": "AssumedRole",
    "principalId": "AROA55SVHNHFJXEP65NAE:ConfigResourceCompositionSession",
    "arn": "arn:aws:sts::956882708938:assumed-role/AWSServiceRoleForConfig/ConfigResourceCompositionSession",
    "accountId": "956882708938",
    "accessKeyId": "ASIA55SVHNHFHBULIL7Q",
    "sessionContext": {
      "sessionIssuer": {
        "type": "Role",
        "principalId": "AROA55SVHNHFJXEP65NAE",
        "arn": "arn:aws:iam::956882708938:role/aws-service-role/config.amazonaws.com/AWSServiceRoleForConfig",
        "accountId": "956882708938",
        "userName": "AWSServiceRoleForConfig"
      },
      "attributes": {
        "creationDate": "2026-01-02T09:18:23Z",
        "mfaAuthenticated": "false"
      }
    },
    "invokedBy": "config.amazonaws.com"
  },
  "eventTime": "2026-01-02T09:18:24Z",
  "eventSource": "sagemaker.amazonaws.com",
  "eventName": "ListTags",
  "awsRegion": "us-east-1",
  "sourceIPAddress": "config.amazonaws.com",
  "userAgent": "config.amazonaws.com",
  "requestParameters": {
    "resourceArn": "arn:aws:sagemaker:us-east-1:956882708938:notebook-instance/anemaNoteBook"
  },
  "responseElements": null,
  "requestID": "ac2791d9-aa6d-4352-9756-26b47faa5bd9",
  "eventID": "78478c6d-6742-4c0c-a3c7-d7a14d19402e",
  "readOnly": true,
  "eventType": "AwsApiCall",
  "managementEvent": true,
  "recipientAccountId": "956882708938",
  "eventCategory": "Management"
}
```
</details>

### Sample CloudWatch logs

<details>
<summary>Click to expand</summary>

```json title="Endpoint Access Log"
{
  "timestamp": 1767086196619,
  "message": "2025-12-30 14:46:36,619 [ERROR ] pool-1-thread-5 ACCESS_LOG - /45.129.199.204:49506 \"GET /ping HTTP/1.1\" 200 0",
  "logStream": "AllTraffic/i-0207927cfb9d6b24f",
  "logGroup": "/aws/sagemaker/Endpoints/prophet-energy-forecast-v1"
}
```
```json title="Processing Jobs Log"
{
"timestamp": 1766083575493,
"message": "See the caveats in the documentation: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#returning-a-view-versus-a-copy\n  df_clean['year'] = pd.to_datetime(df_clean['transaction_date']).dt.year",
"logStream": "data-processing-gpu-2025-12-18-18-41-24-007/algo-1-1766083346",
"logGroup": "/aws/sagemaker/ProcessingJobs"
}
```
```json title="Training Jobs Log"
{
  "timestamp": 1766084347473,
  "message": "[76]#011train-logloss:0.35695#011validation-logloss:0.41460",
  "logStream": "pipelines-j8zf1khfah4m-ChurnModelTraining-fzH3ZV39u6/algo-1-1766084266",
  "logGroup": "/aws/sagemaker/TrainingJobs"
}
```
```json title="Transform Jobs Log"
{
  "timestamp": 1766083923454,
  "message": "2025-12-18T18:52:02,763 [INFO ] W-9000-model_1.0 TS_METRICS - WorkerThreadTime.Milliseconds:3.0|#Level:Host|#hostname:50f648117cbc,timestamp:1766083922",
  "logStream": "cpu-metrics-20251219-001300/i-09b3ca1de4dd5d2ff-1766083581",
  "logGroup": "/aws/sagemaker/TransformJobs"
}
```
</details>

### Sample queries

```sql title="Successful Event Locations (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/sagemaker "\"eventSource\":\"sagemaker.amazonaws.com\"" !errorCode
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "sagemaker.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| count as eventCount by sourceIPAddress
| lookup latitude, longitude from geo://location on ip=sourceIPAddress
```

```sql title="Top 10 Error Message (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/sagemaker "\"eventSource\":\"sagemaker.amazonaws.com\"" errorCode
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "sagemaker.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| count as eventCount by errorMessage
| sort by eventCount, errorMessage asc
```

```sql title="Top 20 Non-ReadOnly Events (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/sagemaker "\"eventSource\":\"sagemaker.amazonaws.com\""
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "sagemaker.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| where !(eventName matches "Get*") and !(eventName matches "List*")
| count as eventCount by eventName 
| sort by eventCount, eventName asc
| limit 20
```

```sql title="Event Details (CloudWatch log based)"
account=* region=* namespace=aws/sagemaker
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| count as events by accountid, region, operation, user_type, user_name, modelid
| sort by events, accountid asc, region asc, operation asc, user_type asc, user_name asc, modelid asc
```

```sql title="Operations Trend (CloudWatch log based)"
account=* region=* namespace=aws/sagemaker
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| timeslice 1h
| count by _timeslice, operation
| transpose row _timeslice column operation
```

```sql title="ModelId Trend (CloudWatch log based)"
account=* region=* namespace=aws/sagemaker
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| timeslice 1h
| count by _timeslice, modelid
| transpose row _timeslice column modelid
```


```sql title="Invocation Latency By Model (CloudWatch Metric)"
account=* region=* namespace=aws/sagemaker modelid=* metric=InvocationLatency statistic=average | avg by modelid 
```

```sql title="Trend Invocations By Model (CloudWatch Metric)"
account=* region=* namespace=aws/sagemaker modelid=* metric=Invocations statistic= sum | quantize using sum | sum by modelid
```

## Collecting logs and metrics for the Amazon Sagemaker app

### Collecting CloudWatch metrics

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* Namespace for **Amazon Sagemaker** Service is **AWS/Sagemaker**.
    * ​​​**Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. Metrics can be queried via the “account field”.

### Collecting Amazon Sagemaker CloudTrail logs

1. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to your Hosted Collector.
    * **Name**. Enter a name to display the new Source.
    * **Description**. Enter an optional description.
    * **S3 Region**. Select the Amazon Region for your **Amazon Sagemaker** S3 bucket.
    * **Bucket Name**. Enter the exact name of your **Amazon Sagemaker** S3 bucket.
    * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions)). The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category**. Enter `aws/observability/cloudtrail/logs`.
    * **Fields**. Add an **account** field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
    * **Log File Discovery** > **Scan Interval**. Use the default of 5 minutes. Alternatively, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure **Log File Discovery** [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
    * **Enable Timestamp Parsing**. Select the **Extract timestamp information from log file entries** check box.
    * **Time Zone**. Select **Ignore time zone from the log file and instead use**, and select **UTC** from the dropdown.
    * **Timestamp Format.** Select **Automatically detect the format**.
    * **Enable Multiline Processing**. Select the **Detect messages spanning multiple lines** check box, and select **Infer Boundaries**.
2. Click **Save**.

### Collecting Amazon Sagemaker CloudWatch logs

To enable Amazon Sagemaker CloudWatch Logs, follow the steps mentioned in [AWS documentation](https://docs.aws.amazon.com/sagemaker/latest/userguide/model-invocation-logging.html)

:::note
Ensure that when configuring `CloudWatch Logs`, the log group name follows the pattern `/aws/sagemaker/*`.
:::

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Sagemaker-Settings.png')} alt="Amazon Sagemaker Setting" style={{border: '1px solid gray'}} />

Sumo Logic supports several methods for collecting logs from Amazon CloudWatch. You can choose either of them to collect logs:

- **AWS Kinesis Firehose for Logs**. Configure an [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/#create-an-aws-kinesis-firehose-for-logssource) (Recommended); or
- **Lambda Log Forwarder**. Configure a collection of Amazon CloudWatch Logs using our AWS Lambda function using a Sumo Logic provided CloudFormation template, as described in [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/) or configure collection without using CloudFormation, see [Collect Amazon CloudWatch Logs using a Lambda Function](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-lambda-function/).<br/>

- While configuring the CloudWatch log source, the following fields can be added to the source:
    - Add an **account** field and assign it a value which is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the **account** field.
    - Add a **region** field and assign it the value of the respective AWS region where the **Sagemaker** exists.
    - Add an **accountId** field and assign it the value of the respective AWS account ID that is being used.

  <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/lamda-cw-logs-source-fields.png')} alt="Fields" />

### Configure field in field schema

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**.
1. Search for the `modelId` field.
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

### Configure Field Extraction Rule(s)

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
Rule Name: AwsObservabilitySagemakerCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource "sagemaker.amazonaws.com"
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "recipientAccountId" as event_source, region, accountid nodrop
| where event_source matches "sagemaker.amazonaws.com"
| "aws/sagemaker" as namespace
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelId
| fields accountid, region, namespace, modelId
```

#### Create/Update Field Extraction Rule(s) for Sagemaker CloudWatch logs

```sql
Rule Name: AwsObservabilitySagemakerCloudWatchLogsFER
Applied at: Ingest Time
Scope (Specific Data):
account=* region=* _sourceHost=/aws/sagemaker/*
```

```sql title="Parse Expression"
if (isEmpty(namespace),"unknown",namespace) as namespace
| if (_sourceHost matches "/aws/sagemaker/*", "aws/sagemaker", namespace) as namespace
| json "modelId" as modelId nodrop
| tolowercase(modelId) as modelId
| fields namespace, modelId
```

### Collecting Centralized AWS CloudTrail logs

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudtrail/logs
```

**Parse Expression**:

Enter a parse expression to create an “account” field that maps to the alias you set for each sub-account. For example, if you used the `“dev”` alias for an AWS account with ID `"956882123456"` and the `“prod”` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sql
| json "recipientAccountId"
// Manually map your AWS account id with the AWS account alias you set up earlier for the individual child account
| "" as account
| if (recipientAccountId = "956882123456",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Sagemaker app

Now that you have set up a collection for **Amazon Sagemaker**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-sagemaker-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following fields will be created by default:

* `account`: The friendly name or alias assigned to the AWS account.
* `region`: The geographical region where the AWS resource is located (for example, us-east-1 or eu-west-2).
* `accountid`: The unique 12-digit identifier for the AWS account where the resource is present.
* `namespace`: The AWS service namespace that the resource or metric belongs to (for example, AWS/EC2 or AWS/S3).
* `endpointname`: A specific identifier for the endpoints within an AWS Sagemaker.
* `endpointname`: A specific identifier for the endpoints within an AWS Sagemaker.
* `transform_job` : A specific identifier for the transform jobs within an AWS Sagemaker.
* `instance_id`: The unique identifier for an instance within the AWS Sagemaker service.
* `training_job`: A specific identifier for the training jobs within an AWS Sagemaker.
* `algo_name` : The name of the algorithm used in the AWS Sagemaker service.
* `Processing_job`: A specific identifier for the processing jobs within an AWS Sagemaker.
* `pipelinename`: A specific identifier for the pipelines within an AWS Sagemaker.
* `stepname` : A specific identifier for the steps within an AWS Sagemaker pipeline.
* `OperationName`: The name of the operation performed within the AWS Sagemaker service feature store.
* `featuregroupname` : The name of the feature group within the AWS Sagemaker service feature store.

## Viewing the Sagemaker dashboards

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.

### Overview

The **Amazon Sagemaker - Overview** dashboard provides an overall health of the Sagemaker service based on logs and metrics.

Use this dashboard to:
* Monitor locations of successful and failed Amazon Sagemaker user activity events.
* Monitor all read-only and non-read-only events.
* Monitor the most active users working on the Sagemaker infrastructure and various events invoked on the Sagemaker service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Sagemaker-Overview.png')} alt="Amazon Sagemaker dashboard" style={{border: '1px solid gray'}} />

### CloudTrail Audit Overview

The **Amazon Sagemaker - CloudTrail Audit Overview** dashboard provides a record of actions taken by a user, role, or AWS service in Amazon Sagemaker. CloudTrail captures all API calls for Amazon Sagemaker as events.

Use this dashboard to:
* Monitor Amazon Sagemaker-related audit logs using CloudTrail Events.
* Monitor locations of successful and failed Amazon Sagemaker user activity events.
* Monitor all read-only and non-read-only events.
* Monitor the most active users working on the Sagemaker infrastructure and various events invoked on the Sagemaker service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Sagemaker-CloudTrail-Audit-Overview.png')} alt="Amazon Sagemaker dashboard" style={{border: '1px solid gray'}} />

### Model Invocation Log Analysis

The **Amazon Sagemaker - Model Invocation Log Analysis** dashboard provides insights into audit events of your invocation logs, model input data, and model output data for all invocations in your AWS account used in Amazon Sagemaker.

Use this dashboard to:
* Monitor Amazon Sagemaker-related audit logs using CloudWatch Events.
* Monitor operational events and the models being utilized.
* Monitor the most active users working on the Sagemaker service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Sagemaker-Model-Invocation-Log-Analysis.png')} alt="Amazon Sagemaker dashboard" style={{border: '1px solid gray'}} />

### Runtime Performance Monitoring

The **Amazon Sagemaker - Runtime Performance Monitoring** dashboard provides statistical insights into runtime model invocation metrics.

Use this dashboard to:
* Monitor all invocations-related metrics.
* Monitor and track input and output tokens.
* Monitor and track images in the output.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Sagemaker-Runtime-Performance-Monitoring.png')} alt="Amazon Sagemaker dashboard" style={{border: '1px solid gray'}} />

## Create monitors for Amazon Sagemaker app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Amazon Sagemaker alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Amazon Sagemaker - Delete Action Detected` | This alert is triggered when a Delete API call to the Amazon Sagemaker environment is detected. | Count > 0 | Count < = 0 |
| `Amazon Sagemaker - High Model Invocation Latency` | This alert is triggered when the average time to receive a response from a Sagemaker model exceeds a configurable threshold in milliseconds. High latency can directly impact the user experience of your applications. | Count > 5000 | Count < = 5000 |
| `Amazon Sagemaker - High Number of Access Denied Errors` | This alert is triggered when there is a spike in AccessDeniedException errors in CloudTrail for the Sagemaker service. This could indicate misconfigured IAM policies or a potential security threat. | Count > 5 | Count < = 5 |
| `Amazon Sagemaker - Model Invocation Server Error Detection` | This alert is triggered when the number of server-side errors from model invocations increases more than a configurable value (Default 5). This can indicate issues with the service, your input data, or permissions. | Count > 5 | Count < = 5 |

## Upgrade/Downgrade the Amazon Sagemaker app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon Sagemaker app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
