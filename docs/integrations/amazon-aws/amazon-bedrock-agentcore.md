---
id: amazon-bedrock-agentcore
title: Amazon Bedrock AgentCore
sidebar_label: Amazon Bedrock AgentCore
description: Learn about the collection process for the Amazon Bedrock AgentCore service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-bedrock-logo.png')} alt="Thumbnail icon" width="50"/>

[Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore) is a fully managed service that enables you to build and deploy AI agents with advanced capabilities. AgentCore provides runtime observability, memory management, gateway functionality, built-in tools, and identity services to help you monitor and optimize your AI agent deployments. It offers comprehensive metrics, logs, and traces for agent execution activity, resource utilization, error tracking, and performance monitoring.

The Sumo Logic Amazon Bedrock AgentCore app dashboards offer insights into CloudWatch Logs and performance metrics for your Amazon Bedrock AgentCore service. These preconfigured dashboards enable you to monitor logs and the runtime performance metrics of your AgentCore agents, memory stores, gateways, built-in tools, and identity services.

## Log and metrics types

The Amazon Bedrock AgentCore app uses the following logs and metrics:
* [AgentCore Runtime Observability Data](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-runtime-metrics.html) - Runtime metrics, resource usage logs and application logs.
* [AgentCore Memory Observability Data](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-memory-metrics.html) - Memory metrics and application logs.
* [AgentCore Gateway Observability Data](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-gateway-metrics.html) - Gateway metrics and application logs.
* [AgentCore Built-in Tools Observability Data](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-tool-metrics.html) - Code interpreter and browser tool metrics,  Code interpreter application and usage logs, and Browser usage logs.
* [AgentCore Identity Observability Data](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-identity-metrics.html) - Identity service metrics.
* [Monitor Amazon Bedrock AgentCore API calls using CloudTrail](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-cloudtrail.html).

### Sample CloudTrail log message

<details>
<summary>Click to expand</summary>

```json title="CloudTrail"
{
  "eventVersion": "1.09",
  "userIdentity": {
    "type": "IAMUser",
    "principalId": "AIDAIHL7V6WZEXAMPLEVU",
    "arn": "arn:aws:iam::123456789012:user/developer",
    "accountId": "123456789012",
    "accessKeyId": "AKIA12345EXAMPLE67890",
    "userName": "developer"
  },
  "eventTime": "2024-10-01T11:52:37Z",
  "eventSource": "bedrock-agentcore.amazonaws.com",
  "eventName": "CreateAgentRuntime",
  "awsRegion": "us-west-2",
  "sourceIPAddress": "203.0.113.42",
  "userAgent": "aws-cli/2.13.0 Python/3.11.4 Darwin/23.0.0 source/x86_64",
  "requestParameters": {
    "agentRuntimeId": "CustomerSupportAgent"
  },
  "responseElements": null,
  "requestID": "0873fdcf-2c18-413a-9288-7e9bbbb8f29d",
  "eventID": "a8d388e2-3111-44bf-b78f-b0e263dc3d25",
  "readOnly": false,
  "eventType": "AwsApiCall",
  "managementEvent": true,
  "recipientAccountId": "123456789012",
  "eventCategory": "Management",
  "tlsDetails": {
    "tlsVersion": "TLSv1.3",
    "cipherSuite": "TLS_AES_128_GCM_SHA256",
    "clientProvidedHostHeader": "bedrock-agentcore.us-west-2.amazonaws.com"
  }
}
```
</details>

### Sample CloudWatch logs

<details>
<summary>Runtime Application Logs - Click to expand</summary>

```json title="CloudWatch Runtime Application Logs"
{
  "timestamp": "2024-10-01T11:50:35.123Z",
  "resource_arn": "arn:aws:bedrock-agentcore:us-west-2:123456789012:agent/AGENT123",
  "event_timestamp": "2024-10-01T11:50:35.000Z",
  "account_id": "123456789012",
  "request_id": "a3517f6a-7f98-4dfe-94dd-ad7340c8dce5",
  "session_id": "session-12345",
  "trace_id": "160fc209c3befef4857ab1007d041db0",
  "span_id": "81346de89c725310",
  "service_name": "AgentCore.Runtime",
  "operation": "InvokeAgentRuntime",
  "request_payload": {
    "agentId": "AGENT123",
    "sessionId": "session-12345",
    "inputText": "What is the weather in Seattle?"
  }
}
```
</details>

<details>
<summary>Memory Application Logs - Click to expand</summary>

```json title="CloudWatch Memory Application Logs"
{
  "resource_arn": "arn:aws:bedrock-agentcore:us-west-2:123456789012:memory/MEMORY123",
  "event_timestamp": 1759370851622,
  "memory_strategy_id": "strategy-001",
  "namespace": "user-preferences",
  "actor_id": "user-456",
  "session_id": "session-789",
  "event_id": "event-012",
  "body": {"requestId": "req-abc123",
    "isError": false,
    "log": "Extraction processing completed successfully"
    }
}
```
</details>

<details>
<summary>Gateway Application Logs - Click to expand</summary>

```json title="CloudWatch Gateway Application Logs"
{
  "resource_arn": "arn:aws:bedrock-agentcore:us-west-2:123456789012:gateway/GATEWAY123",
  "event_timestamp": 1759370851622,
  "body": {
    "isError": false,
    "log": "Started processing request with requestId: 1",
    "requestBody": "{id=1, jsonrpc=2.0, method=tools/call, params={name=LocationTool, arguments={location=seattle}}}",
    "id": "1"
  },
  "account_id": "123456789012",
  "request_id": "12345678-1234-1234-1234-123456789012",
  "trace_id": "160fc209c3befef4857ab1007d041db0",
  "span_id": "81346de89c725310"
}
```
</details>

<details>
<summary>Built-in Tools Browser Application Logs - Click to expand</summary>

```json title="CloudWatch Built-in Tools Browser Application Logs"
{
  "timestamp": "2024-10-01T12:30:15.456Z",
  "resource_arn": "arn:aws:bedrock-agentcore:us-west-2:123456789012:code-interpreter/aws.codeinterpreter.v1",
  "event_timestamp": "2024-10-01T12:30:15.000Z",
  "account_id": "123456789012",
  "request_id": "b4628g7b-8g09-5hfh-05ee-be8451d9dgf6",
  "session_id": "toolsession-67890",
  "trace_id": "271gd320d4cfgfg5968bc2118e152ec1",
  "span_id": "92457ef0ad836421",
  "service_name": "AgentCore.CodeInterpreter",
  "operation": "InvokeCodeInterpreter",
  "request_payload": {
    "name": "executeCode",
    "arguments": {"code": "print('Hello, World!')", "language": "python", "clearContext": false}
  },
  "response_payload": {
    "content": [
      {
        "type": "text",
        "text": "Hello, World!\n",
        "data": null,
        "mimeType": null,
        "uri": null,
        "name": null,
        "description": null,
        "size": null,
        "resource": null
      }
    ],
    "structuredContent": {
      "taskId": null,
      "taskStatus": null,
      "stdout": "Hello, World!\n",
      "stderr": "",
      "exitCode": 0,
      "executionTime": 0.054308414459228516
    },
    "isError": false
  }
}
```
</details>

<details>
<summary>Usage Logs - Click to expand</summary>

```json title="CloudWatch Usage Logs"
{
  "resource_arn": "arn:aws:bedrock-agentcore:us-west-2:123456789012:runtime/AGENT123",
  "event_timestamp": 1762768235743,
  "resource": {
    "cloud.provider": "aws",
    "service.name": "AgentCore.Runtime",
    "cloud.region": "us-east-1"
  },
  "attributes": {
    "account.id": "956882708938",
    "time_elapsed_seconds": 0.28,
    "agent.name": "CustomerSupportAgent",
    "region": "us-east-1",
    "session.id": "session-12345",
    "resource.id": "arn:aws:bedrock-agentcore:us-west-2:123456789012:runtime/AGENT123/runtime-endpoint/DEFAULT"
  },
  "metrics": {
    "agent.runtime.memory.gb_hours.used": 0.000275552058724,
    "agent.runtime.vcpu.hours.used": 0.000001925
  }
}
```
</details>

### Sample queries

```sql title="Runtime Invocations by Agent (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore
| json "accountId", "region", "operation", "resource_arn", "session_id" as accountid, region, operation, resource_arn, session_id nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:agent/*" as region_temp, accountid_temp, agentid nodrop
| where operation matches "InvokeAgentRuntime"
| timeslice 1h
| count by _timeslice, agentid
| transpose row _timeslice column agentid
```

```sql title="Top Error Types (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore error
| json "accountId", "region", "operation", "error_type", "errorCode", "errorMessage" as accountid, region, operation, error_type, error_code, error_message nodrop
| where !isEmpty(error_type) or !isEmpty(error_code) or !isEmpty(error_message)
| if (!isBlank(error_type), error_type, if (!isBlank(error_code), error_code, "Unknown")) as error_category
| count as errorCount by error_category, operation
| sort by errorCount desc
| limit 10
```

```sql title="Memory Operations Trend (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore
| json "resource_arn", "operation", "memory_strategy_id", "namespace" as resource_arn, operation, memory_strategy_id, mem_namespace nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:memory/*" as region, accountid, memoryid nodrop
| where operation matches "CreateEvent" or operation matches "GetEvent" or operation matches "RetrieveMemoryRecords"
| timeslice 5m
| count by _timeslice, operation
| transpose row _timeslice column operation
```

```sql title="Gateway Tool Invocations (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore gateway
| json "resource_arn", "body.requestBody", "body.log" as resource_arn, request_body, log_message nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:gateway/*" as region, accountid, gatewayid nodrop
| parse field=request_body "method=tools/call, params={name=*, arguments=" as tool_name nodrop
| where !isEmpty(tool_name)
| count by gatewayid, tool_name
| sort by _count desc
```

```sql title="Resource Usage by Agent (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore
| json "resource_arn", "session.id", "agent.name", "agent.runtime.vcpu.hours.used", "agent.runtime.memory.gb_hours.used" as resource_arn, session_id, agent_name, vcpu_hours, memory_gb_hours nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:agent/*" as region, accountid, agentid nodrop
| where !isEmpty(vcpu_hours) and !isEmpty(memory_gb_hours)
| sum(vcpu_hours) as total_vcpu_hours, sum(memory_gb_hours) as total_memory_gb_hours by agentid, agent_name
| sort by total_vcpu_hours desc
```

```sql title="Code Interpreter Session Duration (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore codeinterpreter
| json "resource_arn", "session_id", "operation", "session_duration_s" as resource_arn, session_id, operation, session_duration nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:codeinterpreter/*" as region, accountid, toolid nodrop
| where operation matches "*CodeInterpreter*" and !isEmpty(session_duration)
| avg(session_duration) as avg_duration, max(session_duration) as max_duration, min(session_duration) as min_duration by toolid
```

```sql title="Identity Token Fetch Success Rate (CloudWatch log based)"
account=* region=* namespace=aws/bedrock/agentcore identity
| json "resource_arn", "operation", "workload.identity.id", "error_type" as resource_arn, operation, workload_identity, error_type nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:workloadidentity/*" as region, accountid, identityid nodrop
| where operation matches "GetWorkloadAccessToken*"
| if (isEmpty(error_type), "Success", "Failure") as status
| count by status, workload_identity
| transpose row workload_identity column status
```

## Collecting logs and metrics for the Amazon Bedrock AgentCore app

### Collecting CloudWatch metrics

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* Namespace for **Amazon Bedrock AgentCore** Service is **AWS/Bedrock-AgentCore**.
   * ​​​**Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. Metrics can be queried via the "account field".

### Collecting Amazon Bedrock AgentCore CloudTrail logs

1. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to your Hosted Collector.
   * **Name**. Enter a name to display the new Source.
   * **Description**. Enter an optional description.
   * **S3 Region**. Select the Amazon Region for your **Amazon Bedrock AgentCore** S3 bucket.
   * **Bucket Name**. Enter the exact name of your **Amazon Bedrock AgentCore** S3 bucket.
   * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions)). The S3 bucket name is not part of the path. Don't include the bucket name when you are setting the Path Expression.
   * **Source Category**. Enter `aws/observability/cloudtrail/logs`.
   * **Fields**. Add an **account** field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the "account field".
   * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
   * **Log File Discovery** > **Scan Interval**. Use the default of 5 minutes. Alternatively, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure **Log File Discovery** [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
   * **Enable Timestamp Parsing**. Select the **Extract timestamp information from log file entries** check box.
   * **Time Zone**. Select **Ignore time zone from the log file and instead use**, and select **UTC** from the dropdown.
   * **Timestamp Format.** Select **Automatically detect the format**.
   * **Enable Multiline Processing**. Select the **Detect messages spanning multiple lines** check box, and select **Infer Boundaries**.
2. Click **Save**.

### Collecting Amazon Bedrock AgentCore CloudWatch logs

To enable Amazon Bedrock AgentCore CloudWatch Logs, follow the steps mentioned in [AWS Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore-observability.html).

:::note
Ensure that when configuring CloudWatch Logs, the log group names follow these patterns:
- Runtime logs: `/aws/vendedlogs/bedrock-agentcore/runtime/APPLICATION_LOGS/*`
- Memory logs: `/aws/vendedlogs/bedrock-agentcore/memory/APPLICATION_LOGS/*`
- Gateway logs: `/aws/vendedlogs/bedrock-agentcore/gateway/APPLICATION_LOGS/*`
- Built-in Tools logs: `/aws/vendedlogs/bedrock-agentcore/tools/APPLICATION_LOGS/*`
- Identity logs: `/aws/vendedlogs/bedrock-agentcore/identity/APPLICATION_LOGS/*`
- Span data: `/aws/spans`
- Usage logs: Custom log group with `USAGE_LOGS` type
:::

Sumo Logic supports several methods for collecting logs from Amazon CloudWatch. You can choose either of them to collect logs:

- **AWS Kinesis Firehose for Logs**. Configure an [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/#create-an-aws-kinesis-firehose-for-logssource) (Recommended); or
- **Lambda Log Forwarder**. Configure a collection of Amazon CloudWatch Logs using our AWS Lambda function using a Sumo Logic provided CloudFormation template, as described in [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/) or configure collection without using CloudFormation, see [Collect Amazon CloudWatch Logs using a Lambda Function](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-lambda-function/).

- While configuring the CloudWatch log source, the following fields can be added to the source:
   - Add an **account** field and assign it a value which is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the **account** field.
   - Add a **region** field and assign it the value of the respective AWS region where the **Bedrock AgentCore** exists.
   - Add an **accountId** field and assign it the value of the respective AWS account ID that is being used.

   <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/lamda-cw-logs-source-fields.png')} alt="Fields" />

### Configure fields in field schema

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**.
1. Search for the following fields:
   - `agentid`
   - `memoryid`
   - `gatewayid`
   - `toolid`
   - `workloadidentityid`
1. If not present, create them. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

### Configure Field Extraction Rule(s)

Create Field Extraction Rules for Amazon Bedrock AgentCore logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

#### CloudTrail Logs FER

```sql
Rule Name: AwsObservabilityBedrockAgentCoreCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource "bedrock-agentcore.amazonaws.com"
```

```sql title="Parse Expression"
| json "eventSource", "awsRegion", "recipientAccountId" as event_source, region, accountid nodrop
| where event_source matches "bedrock-agentcore.amazonaws.com"
| "aws/bedrock/agentcore" as namespace
| json "requestParameters.agentId", "responseElements.agentId" as req_agentid, res_agentid nodrop
| json "requestParameters.memoryId", "responseElements.memoryId" as req_memoryid, res_memoryid nodrop
| json "requestParameters.gatewayId", "responseElements.gatewayId" as req_gatewayid, res_gatewayid nodrop
| if (!isBlank(req_agentid), req_agentid, res_agentid) as agentid
| if (!isBlank(req_memoryid), req_memoryid, res_memoryid) as memoryid
| if (!isBlank(req_gatewayid), req_gatewayid, res_gatewayid) as gatewayid
| fields accountid, region, namespace, agentid, memoryid, gatewayid
```

#### CloudWatch Logs FER

```sql
Rule Name: AwsObservabilityBedrockAgentCoreCloudWatchLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* (_sourceHost=/aws/vendedlogs/bedrock-agentcore/* OR _sourceHost=/aws/spans)
```

```sql title="Parse Expression"
| if (isEmpty(namespace), "aws/bedrock/agentcore", namespace) as namespace
| json "resource_arn", "operation", "session_id", "service_name" as resource_arn, operation, session_id, service_name nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:agent/*" as region_temp, accountid_temp, agentid nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:memory/*" as region_temp, accountid_temp, memoryid nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:gateway/*" as region_temp, accountid_temp, gatewayid nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:codeinterpreter/*" as region_temp, accountid_temp, toolid nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:browser/*" as region_temp, accountid_temp, toolid nodrop
| parse field=resource_arn "arn:aws:bedrock-agentcore:*:*:workloadidentity/*" as region_temp, accountid_temp, workloadidentityid nodrop
| fields namespace, agentid, memoryid, gatewayid, toolid, workloadidentityid, operation, session_id
```

### Centralized AWS CloudTrail logs collection

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudtrail/logs
```

**Parse Expression**:

Enter a parse expression to create an "account" field that maps to the alias you set for each sub-account. For example, if you used the `"dev"` alias for an AWS account with ID `"123456789012"` and the `"prod"` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sql
| json "recipientAccountId"
// Manually map your AWS account id with the AWS account alias you set up earlier for the individual child account
| "" as account
| if (recipientAccountId = "123456789012", "dev", account) as account
| if (recipientAccountId = "567680881046", "prod", account) as account
| fields account
```

### Centralized CloudWatch logs collection

In case you have a centralized collection of CloudWatch logs and are ingesting them from all accounts into a single Sumo Logic CloudWatch log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudwatch/logs
```

**Parse Expression**:

Enter a parse expression to create an "account" field that maps to the alias you set for each sub-account. For example, if you used the `"dev"` alias for an AWS account with ID `"123456789012"` and the `"prod"` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sql
| json "account_id", "account.id" as accountid1, accountid2 nodrop
| if (!isEmpty(accountid1), accountid1, accountid2) as accountId
// Manually map your AWS account id with the AWS account alias you set up earlier for the individual child account
| "" as account
| if (accountId = "123456789012", "dev", account) as account
| if (accountId = "567680881046", "prod", account) as account
| fields account
```

## Installing the Bedrock AgentCore app

Now that you have set up a collection for **Amazon Bedrock AgentCore**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-bedrock-agentcore-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following fields will be created by default:

* `account`: The friendly name or alias assigned to the AWS account.
* `region`: The geographical region where the AWS resource is located (for example, us-east-1 or eu-west-2).
* `accountid`: The unique 12-digit identifier for the AWS account where the resource is present.
* `namespace`: The AWS service namespace that the resource or metric belongs to (for example, AWS/Bedrock-AgentCore).
* `agentid`: A specific identifier for the Agent within AWS Bedrock AgentCore.
* `memoryid`: A specific identifier for the Memory resource within AWS Bedrock AgentCore.
* `gatewayid`: A specific identifier for the Gateway resource within AWS Bedrock AgentCore.
* `toolid`: A specific identifier for the Built-in Tool resource within AWS Bedrock AgentCore.
* `workloadidentityid`: A specific identifier for the Workload Identity resource within AWS Bedrock AgentCore.

## Viewing the Bedrock AgentCore dashboards

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.

### Overview

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor overall AgentCore service health across runtime, memory, gateway, tools, and identity components.
* Track invocations, latency, and error rates across all AgentCore resources.
* Monitor resource usage including CPU and memory consumption.
* Identify trends in agent execution activity and session counts.

### Runtime Observability

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor agent runtime invocations and session metrics.
* Track InvokeAgentRuntime operation latency and performance.
* Analyze system errors, user errors, and throttling events.
* Monitor resource usage (vCPU-Hours and GB-Hours) for agent runtimes.
* Track agent endpoint-level metrics and session durations.

### Memory Operations

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor memory event creation, retrieval, and deletion operations.
* Track memory record operations including retrieve and list activities.
* Analyze memory extraction and consolidation processes.
* Monitor memory-related errors and invocation counts.
* Track namespace-specific memory operations.

### Gateway Performance

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor gateway invocations across different protocols (MCP, Lambda, OpenAPI).
* Track tool invocations and search operations.
* Analyze gateway latency, duration, and target execution time.
* Monitor throttles, system errors, and user errors.
* Track gateway usage by target type and operation.

### Built-in Tools Monitoring

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor Code Interpreter and Browser tool invocations.
* Track tool session creation, duration, and expiration.
* Analyze tool-specific errors and throttling events.
* Monitor resource usage for code interpreter and browser sessions.
* Track browser user takeover metrics and duration.

### Identity and Access

[Placeholder for dashboard description]

Use this dashboard to:
* Monitor workload identity token fetch operations.
* Track OAuth2 and API key credential provider operations.
* Analyze identity-related errors and throttling events.
* Monitor resource access token fetch success and failure rates.
* Track identity operations by workload identity and credential provider.

## Create monitors for Amazon Bedrock AgentCore app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Amazon Bedrock AgentCore alerts

[Placeholder for monitors]

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Amazon Bedrock AgentCore - High Runtime Invocation Latency` | This alert is triggered when the average agent runtime invocation latency exceeds a configurable threshold. High latency can impact user experience and agent responsiveness. | Count > 5000 | Count < = 5000 |
| `Amazon Bedrock AgentCore - High System Error Rate` | This alert is triggered when the number of system errors in AgentCore operations exceeds a configurable threshold. This could indicate infrastructure or service issues. | Count > 10 | Count < = 10 |
| `Amazon Bedrock AgentCore - Memory Operation Failures` | This alert is triggered when memory operations (CreateEvent, GetEvent, RetrieveMemoryRecords) are failing at a high rate. This could indicate issues with memory resource configuration or data. | Count > 5 | Count < = 5 |
| `Amazon Bedrock AgentCore - Gateway High Throttle Rate` | This alert is triggered when the number of throttled gateway requests exceeds a configurable threshold. This could indicate quota limits being reached or request patterns that need optimization. | Count > 10 | Count < = 10 |
| `Amazon Bedrock AgentCore - Tool Session Timeout` | This alert is triggered when built-in tool sessions (Code Interpreter or Browser) are timing out frequently without proper termination. This could indicate lifecycle hook issues. | Count > 3 | Count < = 3 |
| `Amazon Bedrock AgentCore - Identity Token Fetch Failures` | This alert is triggered when workload identity or resource access token fetch operations are failing. This could indicate IAM policy issues or credential provider configuration problems. | Count > 5 | Count < = 5 |
| `Amazon Bedrock AgentCore - High Resource Usage` | This alert is triggered when agent runtime resource consumption (vCPU or memory) exceeds expected thresholds. This could indicate resource-intensive operations or potential optimization opportunities. | Count > 100 | Count < = 100 |
| `Amazon Bedrock AgentCore - Agent Session Count Spike` | This alert is triggered when there is a sudden spike in agent sessions, which could indicate unexpected load or potential issues. | Count > 1000 | Count < = 1000 |

## Upgrade/Downgrade the Amazon Bedrock AgentCore app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon Bedrock AgentCore app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
