---
id: amazon-ec2-auto-scaling
title: Amazon EC2 Auto Scaling
description: The Sumo Logic App for Amazon EC2 Auto Scaling provides comprehensive insights into the performance and health of your EC2 Auto Scaling groups within your AWS environment. This unified logs and metrics (ULM) App offers a centralized view to monitor and analyze the scaling activities and behavior of your EC2 instances. Leverage the prebuilt dashboards to gain visibility into key metrics such as instance launches, terminations, scaling events, and overall group health.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-ec2-auto-scaling-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon EC2 Auto Scaling helps you maintain application availability and lets you automatically add or remove EC2 instances using scaling policies that you define. Dynamic or predictive scaling policies let you add or remove EC2 instance capacity to service established or real-time demand patterns.

The Sumo Logic App for Amazon EC2 Auto Scaling provides comprehensive insights into the performance and health of your EC2 Auto Scaling groups within your AWS environment. This App offers a centralized view to monitor and analyze the scaling activities and behavior of your EC2 instances. Leverage the prebuilt dashboards to gain visibility into key metrics such as instance launches, terminations, scaling events, and overall group health.

## Log and metrics types  

The Amazon EC2 Auto Scaling app uses the following logs and metrics:
* [Monitor Amazon EC2 Auto Scaling API calls using CloudTrail](https://docs.aws.amazon.com/autoscaling/ec2/userguide/logging-using-cloudtrail.html).
* [Amazon EC2 Auto Scaling metrics](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-metrics.html).

### Sample CloudTrail log message
<details>
<summary>Click to expand</summary>

```json title="CloudTrail"
{
    "eventVersion":"1.08",
    "userIdentity":{
        "type":"IAMUser",
        "principalId":"AIDAIHL7V6WZEXAMPLEVU",
        "arn":"arn:aws:iam::123456789981:user/greg",
        "accountId":"123456789981",
        "accessKeyId":"AKIA12345EXAMPLE67890",
        "userName":"greg",
        },
    "eventTime":"2025-03-10T15:05:37Z",
    "eventSource":"autoscaling.amazonaws.com",
    "eventName":"CreateAutoScalingGroup",
    "awsRegion":"us-east-1",
    "sourceIPAddress":"223.233.233.233",
    "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "requestParameters":{
        "autoScalingGroupName":"catalogService",
        "launchTemplate":{
            "launchTemplateId":"lt-02c96752a8d5a34d9",
            "version":"$Default"
            },
        "minSize":1,
        "maxSize":3,
        "desiredCapacity":2,
        "healthCheckType":"EBS",
        "healthCheckGracePeriod":300,
        "vPCZoneIdentifier":"subnet-010d7504b1d1a23f,subnet-02aff57192da8785",
        "newInstancesProtectedFromScaleIn":false,
        "defaultInstanceWarmup":-1,
        "capacityReservationSpecification":{"capacityReservationPreference":"default"},
        "availabilityZoneDistribution":{"capacityDistributionStrategy":"balanced-best-effort"}
        },
    "responseElements":null,
    "requestID":"61a1e435-d8cc-4a7e-a314-6f96c0f016fe",
    "eventID":"fcb4f52d-bf15-4732-8d0b-25688be73a47",
    "readOnly":false,
    "eventType":"AwsApiCall",
    "managementEvent":true,
    "recipientAccountId":"123456789981",
    "eventCategory":"Management",
    "tlsDetails":{
        "tlsVersion":"TLSv1.3",
        "cipherSuite":"TLS_AES_128_GCM_SHA256",
        "clientProvidedHostHeader":"autoscaling.us-east-1.amazonaws.com"
        },
    "sessionCredentialFromConsole":"true"
}
```
</details>

### Sample queries

```sql title="Events by status (CloudTrail logs)"
account="account" region="region" "\"eventsource\":\"autoscaling.amazonaws.com\"" 
| json "userIdentity", "eventSource", "eventName", "awsRegion", "sourceIPAddress", "userAgent", "eventType", "recipientAccountId", "requestParameters", "responseElements", "requestID", "errorCode", "errorMessage", "apiVersion" as userIdentity, event_source, event_name, region, src_ip, user_agent, event_type, recipient_account_id, requestParameters, responseElements, request_id, error_code, error_message, api_version nodrop
| where event_source = "autoscaling.amazonaws.com"
| where namespace matches "aws/autoscaling" or isEmpty(namespace)
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop
| parse field=arn ":assumed-role/*" as user nodrop 
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop
| json field=requestParameters "autoScalingGroupName" as asgname nodrop
| if (isBlank(accountid), recipient_account_id, accountid) as accountid
| where (tolowercase(asgname) matches tolowercase("{{autoscalinggroup}}")) or isBlank(asgname)
| if (isEmpty(error_code), "Success", "Failure") as event_status
| if (isEmpty(username), user, username) as user
| count by event_status
| sort by _count, event_status asc
```

```bash title="Group Desired Capacity (Cloud watch Metrics)"
account=account region=region autoscalinggroupname=cartService namespace=aws/autoscaling metric=GroupDesiredCapacity Statistic=average 
| avg by account, region, autoscalinggroupname
```

## Collecting logs and metrics for the Amazon EC2 Auto Scaling
When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Cloudtrail logs

1. Configure a Amazon EC2 Auto Scaling [Cloudtrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. **Metadata**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value.
    1. Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
    1. Keep in mind:
       * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
       * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

### Collect metrics

1. Sumo Logic supports collecting metrics using two source types:
   * Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (recommended); or
   * Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)
1. **Metadata**. Click the **+Add Field** link to add custom log metadata [fields](/docs/manage/fields). Define the fields you want to associate, each field needs a name (key) and value. 
   1. Add an **account** field and assign it a value which is a friendly name / alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. Keep in mind:
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
:::note
Namespace for Amazon EC2 Auto-scaling Service is AWS/AutoScaling.
:::

## Field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the `autoscalinggroup` field.
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields.md#manage-fields).

## Field Extraction Rule(s)

Create a Field Extraction Rule (FER) for Amazon EC2 Auto-scaling access logs and Cloudtrail logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

**Amazon EC2 Auto Scaling CloudTrail logs**

```sql
Rule Name: AwsObservabilityEC2ASGCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventSource eventName
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "requestParameters", "recipientAccountId" as eventSource, region, requestParameters, accountid nodrop 
| json field=requestParameters "autoScalingGroupName" as autoscalinggroup nodrop
| where eventSource = "autoscaling.amazonaws.com" 
| "aws/autoscaling" as namespace 
| tolowercase(autoscalinggroup) as autoscalinggroup 
| fields region, namespace, autoscalinggroup, accountid
```

## Installing the Amazon EC2 Auto Scaling app

Now that you have set up collection for Amazon EC2 Auto Scaling, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing Amazon EC2 Auto Scaling dashboards

### Amazon EC2 Autoscaling - Overview
The **Amazon EC2 Autoscaling - Overview** dashboard provides an overview of Amazon EC2 Autoscaling operations, offering insights into instance capacity, error messages, user agents, and disruptive events. It allows users to monitor and analyze the performance and behavior of their autoscaling groups in real-time.

Use this dashboard for:
* Monitoring the current capacity of EC2 instances, including group and warm pool instances
* Tracking the desired capacity of autoscaling groups
* Identifying and troubleshooting common error messages related to autoscaling operations
* Monitoring disruptive events such as group updates, instance detachments, and policy changes

<img src={useBaseUrl('img/integrations/01.-Amazon-EC2-Auto-Scaling-Overview.png')} alt="Amazon EC2 Auto Scaling dashboard" style={{border: '1px solid gray'}} width="800"/>

### Amazon EC2 Auto Scaling - CloudTrail Audit
The **Amazon EC2 Auto Scaling - CloudTrail Audit** dashboard provides a comprehensive overview of Amazon EC2 Auto Scaling activities and CloudTrail audit logs. The dashboard displays information on event locations, top error codes, users with highest failure rates, disruptive events, error details, successful events, event status, and active users/roles.

Use this dashboard for:
* Monitoring the overall health and performance of your Amazon EC2 Auto Scaling groups
* Identifying and troubleshooting common errors and failures in auto-scaling operations
* Tracking user activities and potential security concerns related to auto-scaling events
* Analyzing trends in event types, success rates, and failure patterns over time

<img src={useBaseUrl('img/integrations/02.-Amazon-EC2-Auto-Scaling-CloudTrail-Audit.png')} alt="Amazon EC2 Auto Scaling dashboard" style={{border: '1px solid gray'}} width="800"/>

### Amazon EC2 Auto Scaling - Instances
The **Amazon EC2 Auto Scaling - Instances** dashboard provides a detailed overview of Amazon EC2 Auto Scaling instance metrics, allowing users to monitor and analyze the behavior of their auto scaling groups across different autoscaling groups. It offers real-time insights into instance capacities, states, and group configurations.

Use this dashboard for:
* Tracking the desired capacity and actual in-service instances for each auto scaling group
* Monitoring the minimum and maximum group size limits to ensure proper scaling boundaries
* Observing the total number of instances in each group, including their various states (pending, standby, and terminating)
* Comparing instance metrics across different auto scaling groups

<img src={useBaseUrl('img/integrations/03.-Amazon-EC2-Auto-Scaling-Instances.png')} alt="Amazon EC2 Auto Scaling dashboard" style={{border: '1px solid gray'}} width="800"/>

### Amazon EC2 Auto Scaling - Capacity
The **Amazon EC2 Auto Scaling - Capacity** dashboard provides a comprehensive view of Amazon EC2 Auto Scaling group capacity metrics, offering insights into the total, in-service, pending, standby, and terminating capacities for different autoscaling groups. It allows users to monitor and analyze the capacity fluctuations and states of their auto scaling groups over time.

Use this dashboard for:
* Tracking the total capacity of auto scaling groups across different auto scaling groups
* Monitoring the in-service capacity to ensure adequate resources are available to handle current workloads
* Analyzing standby capacity to understand the reserve resources available for quick scaling
* Tracking terminating capacity to monitor the scale-in process and resource optimization
* Detecting potential issues in the scaling process, such as instances stuck in pending or terminating states

<img src={useBaseUrl('img/integrations/04.-Amazon-EC2-Auto-Scaling-Capacity.png')} alt="Amazon EC2 Auto Scaling dashboard" style={{border: '1px solid gray'}} width="800"/>

### Amazon EC2 Auto Scaling - Warm Pool
The **Amazon EC2 Auto Scaling - Warm Pool** dashboard provides a detailed view of Amazon EC2 Auto Scaling Warm Pool metrics, offering insights into the capacity and state of pre-initialized instances ready to quickly respond to sudden traffic spikes or workload demands. It allows users to monitor and analyze the warm pool behavior across different autoscaling groups.

Use this dashboard for:
* Tracking the total and desired capacity of warm pools for each autoscaling group
* Monitoring the minimum size of warm pools to ensure adequate reserve capacity
* Observing pending capacity in warm pools to identify potential delays in instance preparation
* Monitoring the terminating capacity in warm pools to understand instance lifecycle
* Optimizing warm pool size and capacity to improve application responsiveness during sudden load increases

<img src={useBaseUrl('img/integrations/05.-Amazon-EC2-Auto-Scaling-Warm-Pool.png')} alt="Amazon EC2 Auto Scaling dashboard" style={{border: '1px solid gray'}} width="800"/>
