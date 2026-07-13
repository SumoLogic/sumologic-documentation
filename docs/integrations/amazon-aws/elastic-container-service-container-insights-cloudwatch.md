---
id: elastic-container-service-container-insights-cloudwatch
title: Amazon Elastic Container Service (ECS) using Container Insights and CloudWatch
sidebar_label: Amazon ECS with Container Insights and CloudWatch
description: Provides preconfigured searches and Dashboards that allow you to monitor various metrics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/ecs.png')} alt="ECS icon" width="50"/>

Amazon Elastic Container Service (Amazon ECS) is a container management service that lets you run Docker containers on a cluster of Amazon EC2 instances. The Sumo Logic app for Amazon ECS provides preconfigured searches and Dashboards that allow you to monitor various metrics (CPU and Memory Utilization, CPU and Memory Reservation) across ECS clusters and services. The app also monitors API calls made by or on behalf of Amazon ECS in your AWS account.

We offer two different ECS versions, which have separate data collection steps:
* **[Collect Logs and Metrics for ECS](/docs/integrations/amazon-aws/elastic-container-service)**. This version collects [ECS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/available-metrics.html) and [ECS Events using AWS CloudTrail](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail). For instructions on collecting this data, refer to the [Amazon Elastic Container Service (ECS)](/docs/integrations/amazon-aws/elastic-container-service/).
* **[Collect Logs, Metrics (Container Insights+CloudWatch) and Traces for ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail)**. This version collects [ECS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html#available_cloudwatch_metrics), [Container Insights Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-ECS.html), [ECS Events using AWS CloudTrail](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail), and Application Logs and Traces. Metrics collected by Container Insights are charged as custom metrics. For more information about CloudWatch pricing, see [Amazon CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/). This solution enables you to monitor both EC2 and Fargate-based ECS deployments.

This documentation has instructions for collecting logs and metrics for the Amazon ECS app with Container Insights and CloudWatch.

## Log and metric types

The Sumo Logic app for Amazon ECS with Container Insights and CloudWatch uses the following logs and metrics:
* Amazon CloudWatch Metrics
* Container Insights Metrics
* Amazon CloudTrail Logs
* Container Insights Performance Log Events
* ECS Application Logs
* Traces

### Sample log messages

<details>
<summary>Click to expand</summary>

```json
{
  "eventVersion":"1.04",
  "userIdentity":{
    "type":"AssumedRole",
    "principalId":"ADFDDDFF7FDF7GFFF2DF0:i-76vfa923",
    "arn":"arn:aws:sts::435456556566:assumed-role/ecsInstanceRole/i-76vfa923",
    "accountId":"435456556566",
    "accessKeyId":"AOFGPJFIJFFOIJFIOJHF",
    "sessionContext":{
      "attributes":{
        "mfaAuthenticated":"false",
        "creationDate":"2017-10-02T20:08:54.107Z"
      },
      "sessionIssuer":{
        "type":"Role",
        "principalId":"ADFDDDFF7FDF7GFFF2DF0",
        "arn":"arn:aws:iam::435456556566:role/ecsInstanceRole",
        "accountId":"435456556566",
        "userName":"kevin"
      }
    }
  },
  "eventTime":"2017-10-02T20:08:54.107Z",
  "eventSource":"ecs.amazonaws.com",
  "eventName":"RegisterTaskDefinition",
  "awsRegion":"us-west-1",
  "sourceIPAddress":"73.168.34.72",
  "userAgent":"Amazon ECS Agent - v1.12.2 (ecda8a6) (+http://aws.amazon.com/ecs/)",
  "requestParameters":{
    "attributes":[
      {
        "name":"com.amazonaws.ecs.capability.privileged-container"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.17"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.18"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.19"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.20"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.21"
      },
      {
        "name":"com.amazonaws.ecs.capability.docker-remote-api.1.22"
      },
      {
        "name":"com.amazonaws.ecs.capability.logging-driver.json-file"
      },
      {
        "name":"com.amazonaws.ecs.capability.logging-driver.syslog"
      },
      {
        "name":"com.amazonaws.ecs.capability.logging-driver.awslogs"
      },
      {
        "name":"com.amazonaws.ecs.capability.ecr-auth"
      },
      {
        "name":"com.amazonaws.ecs.capability.task-iam-role"
      },
      {
        "name":"com.amazonaws.ecs.capability.task-iam-role-network-host"
      }
    ],
    "totalResources":[
      {
        "type":"INTEGER",
        "doubleValue":0.0,
        "integerValue":1024,
        "longValue":0,
        "name":"CPU"
      },
      {
        "type":"INTEGER",
        "doubleValue":0.0,
        "integerValue":995,
        "longValue":0,
        "name":"MEMORY"
      },
      {
        "type":"STRINGSET",
        "stringSetValue":[
          "22",
          "2375",
          "2376",
          "51678",
          "51679"
        ],
        "doubleValue":0.0,
        "integerValue":0,
        "longValue":0,
        "name":"PORTS"
      },
      {
        "type":"STRINGSET",
        "stringSetValue":[

        ],
        "doubleValue":0.0,
        "integerValue":0,
        "longValue":0,
        "name":"PORTS_UDP"
      }
    ],
    "instanceIdentityDocumentSignature":"pqWe1trtreertermhC6vz\nZ0e/ZyOVVKXOb0fiiouyuyturtyreuFaoghqQ0wWurXzcHb6CrtreyteV6hPM=",
    "cluster":"graphite",
    "instanceIdentityDocument":"{\n  \"privateIp\" : \"10.0.1.83\",\n  \"devpayProductCodes\" : null,\n  \"availabilityZone\" : \"us-west-1c\",\n  \"accountId\" : \"435456556566\",\n  \"version\" : \"2010-08-31\",\n  \"instanceId\" : \"i-76vfa923\",\n  \"billingProducts\" : null,\n  \"instanceType\" : \"t2.micro\",\n  \"imageId\" : \"ami-444d0224\",\n  \"pendingTime\" : \"2016-11-15T21:07:08Z\",\n  \"architecture\" : \"x86_64\",\n  \"kernelId\" : null,\n  \"ramdiskId\" : null,\n  \"region\" : \"us-west-1\"\n}"
  },
  "responseElements":{
    "containerInstance":{
      "versionInfo":{

      },
      "runningTasksCount":0,
      "ec2InstanceId":"i-13dcar4566",
      "remainingResources":[
        {
          "type":"INTEGER",
          "doubleValue":0.0,
          "integerValue":1024,
          "longValue":0,
          "name":"CPU"
        },
        {
          "type":"INTEGER",
          "doubleValue":0.0,
          "integerValue":995,
          "longValue":0,
          "name":"MEMORY"
        },
        {
          "type":"STRINGSET",
          "stringSetValue":[
            "22",
            "2376",
            "2375",
            "51678",
            "51679"
          ],
          "doubleValue":0.0,
          "integerValue":0,
          "longValue":0,
          "name":"PORTS"
        },
        {
          "type":"STRINGSET",
          "stringSetValue":[

          ],
          "doubleValue":0.0,
          "integerValue":0,
          "longValue":0,
          "name":"PORTS_UDP"
        }
      ],
      "agentConnected":true,
      "pendingTasksCount":0,
      "registeredResources":[
        {
          "type":"INTEGER",
          "doubleValue":0.0,
          "integerValue":1024,
          "longValue":0,
          "name":"CPU"
        },
        {
          "type":"INTEGER",
          "doubleValue":0.0,
          "integerValue":995,
          "longValue":0,
          "name":"MEMORY"
        },
        {
          "type":"STRINGSET",
          "stringSetValue":[
            "22",
            "2376",
            "2375",
            "51678",
            "51679"
          ],
          "doubleValue":0.0,
          "integerValue":0,
          "longValue":0,
          "name":"PORTS"
        },
        {
          "type":"STRINGSET",
          "stringSetValue":[

          ],
          "doubleValue":0.0,
          "integerValue":0,
          "longValue":0,
          "name":"PORTS_UDP"
        }
      ],
      "containerInstanceArn":"arn:aws:ecs:us-west-1:435456556566:container-instance/3f28c319-u9n2-1476-3d2n-b7c254fv411",
      "attributes":[
        {
          "name":"com.amazonaws.ecs.capability.privileged-container"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.17"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.18"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.19"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.20"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.21"
        },
        {
          "name":"com.amazonaws.ecs.capability.docker-remote-api.1.22"
        },
        {
          "name":"com.amazonaws.ecs.capability.logging-driver.json-file"
        },
        {
          "name":"com.amazonaws.ecs.capability.logging-driver.syslog"
        },
        {
          "name":"com.amazonaws.ecs.capability.logging-driver.awslogs"
        },
        {
          "name":"com.amazonaws.ecs.capability.ecr-auth"
        },
        {
          "name":"com.amazonaws.ecs.capability.task-iam-role"
        },
        {
          "name":"com.amazonaws.ecs.capability.task-iam-role-network-host"
        }
      ],
      "status":"ACTIVE",
      "version":1
    }
  },
  "requestID":"ae86b372-ab77-11e6-824c-c7c4220f0423",
  "eventID":"ff9fc985-1fbe-4717-965b-607dda32f620",
  "eventType":"AwsApiCall",
  "recipientAccountId":"435456556566"
}
```

</details>

### Sample queries

```sumo title="Deleted Resources Over Time"
_sourceCategory=ecs* (DeleteCluster or DeleteService or DeregisterContainerInstance or DeregisterTaskDefinition or StopTask) and !(InternalFailure)
| json "eventName" as event_name
| parse "\"userName\":\"*\"" as user
| parse "\"awsRegion\":\"*\"" as region
| parse "\"cluster\":\"*\"" as cluster
| timeslice 1h
| parse regex field=event_name "^(?:Delete|Deregister|Stop)(?<resource_type>[A-Z][A-Za-z]+)"
| count by resource_type, _timeslice
| transpose row _timeslice column resource_type
```

## Collecting logs and metrics for Amazon ECS

### Configure Hosted Collector

When you create an AWS Source, you'll need to identify the Hosted Collector you want to use or create a new Hosted Collector. Once you create an AWS Source, associate it with a Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

### Collect Amazon ECS CloudWatch metrics

Sumo Logic supports collecting metrics using one of the following source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (**recommended**)
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

   :::note
   Namespace for **Amazon ECS** service is **AWS/ECS**.
   :::

Follow the steps below to add custom metadata [fields](/docs/manage/fields) with your metrics:
1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
1. Create a field named `account` and assign it a value that represents a friendly name or alias for your AWS account from which metrics are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and metrics can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
1. After adding fields, check their status indicators:
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
      * You will have the option to automatically add or enable the field.
      * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Collect Amazon ECS Container Insights metrics

When you enable Container Insights, CloudWatch collects [additional metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-ECS.html) in the `ECS/ContainerInsights` namespace that describe the status of your ECS tasks, resource usage metrics, and the number of running services, containers, and deployments.

In this step, you'll enable Container Insights and set up a collection to ingest those metrics.

1. Enable Container Insights by referring to the AWS [docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-cluster.html) using the CLI or AWS console.
2. If CloudWatch source is selected for collecting metrics, update the source created in the "Collect Amazon ECS CloudWatch metrics" section to include `ECS/ContainerInsights` in the custom namespaces field; or <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs1.png')} alt="ECS/ContainerInsights" style={{border: '1px solid gray'}} width="600" />
3. If the Kinesis Firehose source is selected for collecting metrics, update the [Metrics Stream](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/#include-metrics-by-namespace) to include `ECS/ContainerInsights` in the custom namespaces field.

### Collect Amazon ECS CloudTrail logs

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Create a trail for your AWS account](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html).
3. Confirm that logs are being delivered to the Amazon S3 bucket.

   :::note
   Namespace for **Amazon ECS** service is **AWS/ECS**.
   :::

Follow the steps below to collect logs for Amazon ECS:
1. Configure a [CloudTrail Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/).
1. Add custom metadata [fields](/docs/manage/fields) with your logs:
   1. Click **+Add Field** under **Metadata**. Each field consists of a name (key) and a corresponding value.
   1. Create a field named `account` and assign it a value that represents a friendly name or alias for your AWS account from which logs are collected. This value will appear in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability), and logs can be queried using the `account` field.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/Metadata.png')} alt="Metadata" style={{border: '1px solid gray'}} width="500" />
   1. After adding fields, check their status indicators:
      * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green check mark indicates the field exists and is enabled in the Fields table schema.
      * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange exclamation icon indicates the field does not exist or is disabled in the schema.
         * You will have the option to automatically add or enable the field.
         * If a field is sent but not present or enabled in the schema, it is ignored and marked as **Dropped**.

### Centralized AWS CloudTrail log collection

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data):
_sourceCategory=aws/observability/cloudtrail/logs
```

#### Parse Expression

Enter a parse expression to create an "account" field that maps to the alias you set for each sub-account. For example, if you used the `"dev"` alias for an AWS account with ID `"528560886094"` and the `"prod"` alias for an AWS account with ID `"567680881046"`, your parse expression would look like this:

```sumo
| json "recipientAccountId"
// Manually map your AWS account ID with the AWS account alias you set up earlier for the individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

### Collect Container Insights performance log events

Container Insights collects data as performance log events using [embedded metric format](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html). More details [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html).

In this step, you'll create a source to collect Task- and Container-level performance events that are not converted into CloudWatch metrics.

1.  Configure an [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source). Add the fields account, region, and namespace as shown below. <br/><img src={useBaseUrl('img/integrations/amazon-aws/ecs2.png')} alt="ECS" />
2.  Copy the `KinesisLogsRoleARN` and `KinesisLogsDeliveryStreamARN` values from the Outputs tab of CloudFormation. <br/><img src={useBaseUrl('img/integrations/amazon-aws/ecs3.png')} alt="ECS" />
3. Go to your CloudWatch > Log Groups and click on your CloudWatch log group `/aws/ecs/containerinsights/<cluster>/performance`. <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs4.png')} alt="ECS" />
4.  Click Create, and fill in the parameters below:
    1.  Get the delivery stream name from the ARN copied in step 2 and fill in the `KinesisLogsDeliverStream` field.
    2.  Get the role name from the ARN copied in step 2 and fill in the role.
    3.  Specify the filter pattern `{ $.Type = "Container" || $.Type = "Task" }`.
    4.  Specify the filter name.
    5.  Test the pattern and click Start streaming. <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs5.png')} alt="ECS" />

### Collect Amazon ECS application logs

Set up the Container logs collection using the steps in the following [docs](/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection). You can use the AWS FireLens driver and avoid sending logs to CloudWatch log groups. Also add the account, region, and namespace fields when configuring the source.

If your logs are already sent to CloudWatch log groups, you can create a subscription filter to route the log groups to the delivery stream created in the previous step.

:::note
Application logs do not contain regions. You have to configure a new Sumo Logic source for each region to avoid creating multiple sources. Then, you will need to add the [X-SUMO-Fields](/docs/manage/fields#x-sumo-fields-http-header) header to logConfiguration by creating a custom Fluent Bit image and specifying a custom Fluent Bit configuration.

For more information, see [Create a custom Fluent Bit image](/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection).
:::

### Collect Amazon ECS traces

To set up a collection for traces:

1. Create an HTTP Traces source by referring to the [docs](/docs/apm/traces/get-started-transaction-tracing/http-traces-source).
2. Install OpenTelemetry Collector by referring to the [docs](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments).

## Installing the Amazon ECS app

Now that you have set up collection for Amazon ECS with Container Insights and CloudWatch, install the Sumo Logic app for Amazon ECS to use the preconfigured searches and dashboards that provide visibility into your environment and enable real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `account` Name/alias to the AWS account.
- `accountid` AWS account ID.
- `region` The region to which the resource name belongs.
- `namespace` Namespace for Amazon ECS Service is AWS/ECS.
- `clustername` The name of the ECS cluster.

#### Field Extraction Rule(s)

The FER **AwsObservabilityECSCloudTrailLogsFER** to extract fields `region`, `namespace`, `clustername`, and `accountid` will be created as part of app installation.

The FER **AwsObservabilityECSPerformanceEventsFER**, which extracts fields from Container Insights Performance Event Logs for Tasks and Containers, will be created as part of app installation.

## Viewing the Amazon ECS app dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Cluster Overview

The **Amazon ECS - Cluster Overview** dashboard provides an overview of CPU and memory utilization, CPU and memory reservation percentages, network I/O (incoming and outgoing bytes), storage read/write activity, the number of EC2 instances registered, and task and service counts across all ECS clusters.

Use this dashboard to:

* Identify resource-intensive clusters and make informed decisions about your ECS deployment.
* Monitor CPU and memory utilization and reservation percentages across clusters.
* View network I/O, storage read/write activity, and registered EC2 instances.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Cluster-Overview.png' alt="Amazon ECS - Cluster Overview" style={{border: '1px solid gray'}} width="800" />

### Container Insights Cluster Overview

The **Amazon ECS - Container Insights Cluster Overview** dashboard provides Container Insights metrics for ECS clusters, including task, service, EC2 instance counts, network I/O (incoming and outgoing bytes), and storage read/write activity.

Use this dashboard to:

* Monitor cluster-level operational metrics collected via the Container Insights agent.
* Track task, service, and EC2 instance counts across clusters.
* View network throughput and storage activity at the cluster level.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Container-Insights-Cluster-Overview.png' alt="Amazon ECS - Container Insights Cluster Overview" style={{border: '1px solid gray'}} width="800" />

### Cluster Resource Reservation

The **Amazon ECS - Cluster Resource Reservation** dashboard provides detailed insights into the average utilization of CPU, memory, and GPU reservations for a given ECS cluster.

Use this dashboard to:

* Track resource reservation trends and ensure clusters are appropriately provisioned.
* Identify potential resource constraints or overprovisioning in your ECS environment.
* Compare reservation patterns between different types of resources (CPU, memory, GPU) over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Cluster-Resource-Reservation.png' alt="Amazon ECS - Cluster Resource Reservation" style={{border: '1px solid gray'}} width="800" />

### Service Overview

The **Amazon ECS - Service Overview** dashboard provides an overview of ECS service-level standard CloudWatch metrics, including total service count, average CPU and memory utilization percentages, and CPU/memory utilization trends by service.

Use this dashboard to:

* Monitor service-level performance and identify services with high resource usage.
* Track CPU and memory utilization trends across all services.
* Quickly determine which services require scaling or optimization.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Service-Overview.png' alt="Amazon ECS - Service Overview" style={{border: '1px solid gray'}} width="800" />

### Container Insights Service Overview

The **Amazon ECS - Container Insights Service Overview** dashboard provides Container Insights metrics for ECS services, including running, desired and pending task counts, deployments, task sets, network I/O (incoming and outgoing bytes), and storage read/write activity.

Use this dashboard to:

* Monitor service-level operational metrics collected via the Container Insights agent.
* Track running, pending, and desired task counts for each service.
* View network throughput, storage activity, and deployment status at the service level.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Container-Insights-Service-Overview.png' alt="Amazon ECS - Container Insights Service Overview" style={{border: '1px solid gray'}} width="800" />

### Tasks Definition Family Overview

The **Amazon ECS - Tasks Definition Family Overview** dashboard provides an overview of ECS task definition families, including the total family count, task counts by family, CPU and memory utilization, and storage read/write activity.

Use this dashboard to:

* Monitor resource usage and task distribution across your ECS task definition families.
* View the number of tasks running with a single task definition family.
* Track CPU and memory utilization by task definition family.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Tasks-Definition-Family-Overview.png' alt="Amazon ECS - Tasks Definition Family Overview" style={{border: '1px solid gray'}} width="800" />

### Tasks Definition Family Performance Monitoring

The **Amazon ECS - Tasks Definition Family Performance Monitoring** dashboard provides trends around CPU and memory utilization, network I/O (incoming and outgoing bytes), and storage read/write activity for ECS task definition families.

Use this dashboard to:

* Monitor performance over time and identify resource bottlenecks at the task definition family level.
* Identify patterns and outliers over time for each of the resource metrics like CPU, memory, network, and disk.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Tasks-Definition-Family-Performance-Monitoring.png' alt="Amazon ECS - Tasks Definition Family Performance Monitoring" style={{border: '1px solid gray'}} width="800" />

### Task Definition Family Resource Reservation

The **Amazon ECS - Task Definition Family Resource Reservation** dashboard provides detailed insights into the average CPU and memory reservation utilization across ECS task definition families.

Use this dashboard to:

* Track resource reservation trends and ensure task definitions are appropriately sized.
* Identify the right limits for CPU and memory reservations at the task definition level.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Task-Definition-Family-Resource-Reservation.png' alt="Amazon ECS - Task Definition Family Resource Reservation" style={{border: '1px solid gray'}} width="800" />

### Tasks Overview

The **Amazon ECS - Tasks Overview** dashboard provides an overview of task-level CPU and memory utilization, network I/O (incoming and outgoing bytes), storage read/write activity, and tasks with dropped packets and network errors.

Use this dashboard to:

* Monitor individual task health and quickly identify tasks with resource or connectivity issues.
* View details of all the task instances and their launch type.
* Track network errors and dropped packets by task.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Tasks-Overview.png' alt="Amazon ECS - Tasks Overview" style={{border: '1px solid gray'}} width="800" />

### Container Overview

The **Amazon ECS - Container Overview** dashboard provides an overview of container-level CPU and memory utilization, network I/O (incoming and outgoing bytes), storage read/write activity, container status trends, and tasks with dropped packets and network errors.

Use this dashboard to:

* Monitor container health and identify containers with performance or connectivity issues.
* Track container status and identify container details like task definition, image, and account.
* Monitor CPU, memory, disk, and network activity of your containers.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Container-Overview.png' alt="Amazon ECS - Container Overview" style={{border: '1px solid gray'}} width="800" />

### Container Logs

The **Amazon ECS - Container Logs** dashboard provides detailed information on container-level log activity, including error trends by cluster and container, top 10 errors, recent errors, and recent container log events.

Use this dashboard to:

* Quickly diagnose issues and monitor what is happening inside your containers.
* View recent logs of your container.
* Identify common errors and abnormal spikes in errors.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Container-Logs.png' alt="Amazon ECS - Container Logs" style={{border: '1px solid gray'}} width="800" />

### EC2 LaunchType

The **Amazon ECS - EC2 LaunchType** dashboard provides an overview of CPU and memory utilization and reservation percentages, the number of EC2 instances registered, and the counts of tasks and services for ECS workloads running on the EC2 launch type.

Use this dashboard to:

* Monitor the health and resource usage of your EC2-backed ECS clusters.
* View CPU and memory utilization and reservation percentages for the EC2 launch type.
* Track the number of clusters, tasks, and registered EC2 instances.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-EC2-LaunchType.png' alt="Amazon ECS - EC2 LaunchType" style={{border: '1px solid gray'}} width="800" />

### Fargate LaunchType

The **Amazon ECS - Fargate LaunchType** dashboard provides an overview of running tasks, services, network throughput (incoming and outgoing bytes per second), and storage read/write activity for ECS workloads running on the Fargate launch type.

Use this dashboard to:

* Monitor the health and network performance of your Fargate-backed ECS clusters.
* View the number of running tasks and services with the Fargate launch type.
* Track network throughput and storage activity for Fargate workloads.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Fargate-LaunchType.png' alt="Amazon ECS - Fargate LaunchType" style={{border: '1px solid gray'}} width="800" />

### Container Insight Audit Events

The **Amazon ECS - Container Insight Audit Events** dashboard provides insights into changes in your ECS environment, including the top IAM users and the locations of events. The dashboard also shows the created, updated, and deleted events over time, along with details on the top 10 AWS Identity and Access Management users and the last 20 Container Registration and Deregistration Events.

Use this dashboard to:

* Quickly identify all changes to your ECS environment.
* Monitor locations from which changes are being made.
* Examine details and trends for created, updated, and deleted ECS resources.
* Investigate specific container registration and deregistration events in different regions and clusters.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-with-Container-Insights/Amazon-ECS-Container-Insight-Audit-Events.png' alt="Amazon ECS - Container Insight Audit Events" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Amazon ECS app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Amazon ECS alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Amazon ECS Container Insights - High CPU Utilization` | This alert fires when the average CPU utilization within a 5-minute interval for a service within a cluster is high (>=85%). | Count >= 85 | Count < 85 |
| `Amazon ECS Container Insights - High Memory Utilization` | This alert fires when the average memory utilization within a 5-minute interval for a service within a cluster is high (>=85%). | Count >= 85 | Count < 85 |
| `Amazon ECS Container Insights - No Running Tasks in Service` | This alert fires when a service has no running tasks for 5 minutes, indicating the service is unavailable and not serving traffic. | Count < 1 | Count >= 1 |
| `Amazon ECS Container Insights - High CPU Reservation` | This alert fires when the average CPU reservation within a 5-minute interval for a cluster is high (>=85%), indicating the cluster is running out of capacity to schedule new tasks. | Count >= 85 | Count < 85 |

## Upgrade/Downgrade the Amazon ECS (Container Insights and CloudWatch) app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon ECS (Container Insights and CloudWatch) app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
