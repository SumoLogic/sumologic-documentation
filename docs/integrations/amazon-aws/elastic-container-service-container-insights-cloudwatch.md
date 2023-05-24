---
id: elastic-container-service-container-insights-cloudwatch
title: Amazon Elastic Container Service (ECS) using Container Insights and CloudWatch
sidebar_label: Amazon ECS with Container Insights and CloudWatch
description: Provides preconfigured searches and Dashboards that allow you to monitor various metrics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/ecs.png')} alt="Thumbnail icon" width="50"/>

Amazon Elastic Container Service (Amazon ECS) is a container management service that allows you to manage Docker containers on a cluster of Amazon EC2 instances. The Sumo Logic App for Amazon ECS provides preconfigured searches and Dashboards that allow you to monitor various metrics (CPU and Memory Utilization, CPU and Memory Reservation) across ECS clusters and services. The App also monitors API calls made by or on behalf of Amazon ECS in your AWS account.

We offer two different ECS versions, which have separate data collection steps:
* **[Collect Logs and Metrics for ECS](/docs/integrations/amazon-aws/elastic-container-service)**. This version collects [ECS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html#available_cloudwatch_metrics) and [ECS Events using AWS CloudTrail](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail)
* **[Collect Logs, Metrics (Container Insights+CloudWatch) and Traces for ECS](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail)**. This version collects [ECS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html#available_cloudwatch_metrics), [Container Insights Metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-ECS.html), [ECS Events using AWS CloudTrail](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html#service-name-info-in-cloudtrail), Application Logs and Traces. Metrics collected by Container Insights are charged as custom metrics. For more information about CloudWatch pricing, see[ Amazon CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/). This solution enables you to monitor both ec2 and fargate based ecs deployments.

This page has instructions for collecting logs and metrics for the Amazon ECS App. It uses the following data:
* CloudWatch Metrics
* Container Insights Metrics
* AWS CloudTrail Events
* Container Insights Performance log Events
* ECS Application Logs
* Traces

## Creating Fields in Field Schema 

Login to Sumo Logic, go to **Manage Data** > **Logs** > **Fields**. Search for the following fields: `account`, `namespace`, `region` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields).

## Creating Field Extraction Rule(s)

Create Field Extraction Rule for CloudTrail Logs ([learn more](/docs/manage/field-extractions/create-field-extraction-rule)).
```sql
Rule Name: AwsObservabilityECSCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data):
account=* eventname eventsource "ecs.amazonaws.com"
Parse Expression:
| json "eventSource", "awsRegion", "requestParameters.tableName", "recipientAccountId" as eventSource, region, tablename, accountid nodrop
| where eventSource = "ecs.amazonaws.com"
| "aws/ecs" as namespace
| fields region, namespace, accountid
```

Create Field Extraction Rule for Container Insights Performance Events Logs of Task and Containers.

```sql
Rule Name: AwsObservabilityECSPerformanceEventsFER
Applied at: Ingest Time
Scope (Specific Data):
account=* (Task OR Container)
Parse Expression:
| json  "AccountID","Region", "Type" as accountid, region, Type nodrop
| where Type="Task" or Type="Container"
| "aws/ecs" as namespace
| fields region, namespace, accountid
```

## Collect Metrics for Amazon ECS 

Sumo Logic supports collecting metrics using two source types:

  * Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (recommended); or
  * Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)
  
**Namespace** for **Amazon Elastic Container Service (ECS) using Container Insights and CloudWatch** service is **AWS/ECS**.
  
**Metadata**: Add an **account** field to the source and assign it a value which is a friendly name / alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried via the `account field`.

### Collect Container Insights Metrics for Amazon ECS 

When you enable Container Insights, CloudWatch collects [additional metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-metrics-ECS.html) in the `ECS/ContainerInsights` namespace that describe the status of your ECS tasks, resource usage metrics and the number of running services, containers, and deployments.

In this step, you'll enable Container Insights and set up a collection to ingest those metrics.

1. Enable Container Insights by referring to the AWS [docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-cluster.html) by using cli or AWS console.
2. If Cloudwatch source is selected for collecting metrics, update the source created in "Collect Metrics for Amazon ECS" section to include `ECS/ContainerInsights` in custom namespaces field; or <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs1.png')} alt="ECS/ContainerInsights" />
3. If Kinesis Firehose source is selected for collecting metrics, update the [Metrics Stream](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/#include-metrics-by-namespace) to include `ECS/ContainerInsights` in custom namespaces field.

### Collect ECS events using CloudTrail

To set up an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source) to collect ECS events:

1. [Configure CloudTrail](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html "http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html") in your AWS account. This will create an S3 bucket, if you so choose.
2. Grant Sumo Logic access to the Amazon S3 bucket.
3. Confirm that logs are being delivered to the Amazon S3 bucket.
4. In the Sumo web app, select **Manage Data** > **Collection** > **Collection**.
5. Navigate to the hosted collector you configured above and select **Add > Add Source**.
6. Select AWS CloudTrail source.
7. **Name.** Enter a name to display the new Source.
8. **Description.** Enter an optional description.
9. **S3 Region.** Select the Amazon Region for your ECS S3 bucket.
10. **Bucket Name.** Enter the exact name of your ECS S3 bucket.
11. **Path Expression.** Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (`*`) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions).) 
12. **Source Category.** Enter `aws/observability/cloudtrail/logs`.
13. **Fields**. Add an **account** field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried via the "account field".
    ![account](https://lh3.googleusercontent.com/k8UTbrMidpw6fw0kJA8mw4Ln4a6-crE0QjWOcJ6tlsgBcFJ81pbym2My80-LGHnlW4A6Zn6Vh65bxf2ePb7PmP39QcGbRCwR_3VBmRxZz4XHHgWjFsJucnaLYcFCBq6crH14hOAzuSbOLzOJBPSEYtUuoIKRftRn5lQ7yVRMiGw5oQDgvOPRrZk60g)
14. **AWS Access**. There are two options for AWS access: 
    - Role-based access. This is the preferred method. You can use this option if you granted access to Amazon ECS as described in [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).  For Role-based access enter the Role ARN that was provided by AWS after creating the role.
    - For Key access enter the Access Key ID and Secret Access Key. For more information, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in AWS help.
15. **Scan Interval.** Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
16. **Enable Timestamp Parsing.** Select the check box.
17. **Time Zone.** Select **Ignore time zone from log file and instead use**, and select **UTC**.
18. **Timestamp Format.** Select **Automatically detect the format**.
19. **Enable Multiline Processing.** Select the check box, and select** Infer Boundaries**.
20. Click **Save**.

## Centralized AWS CloudTrail Log Collection 

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create or update the following Field Extraction Rule to map proper AWS account(s) friendly name/alias:

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data):
_sourceCategory=aws/observability/cloudtrail/logs
```

**Parse Expression**

Enter a parse expression to create an `account` field that maps to the alias you set for each sub-account. For example, if you used the `dev` alias for an AWS account with ID `528560886094` and the `prod` alias for an AWS account with ID `567680881046`, your parse expression would look like this:

```sql
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Collect Container Insights performance log events for Task and Container 

Container Insights collects data as performance log events using [embedded metric format](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html). More details [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html).

In this step, you'll create a source to collect Task and Container level performance events, which are not converted as CloudWatch metrics.

1.  Configure an [AWS Kinesis Firehose for Logs Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source). Add the fields account, region and namespace as shown below. <br/><img src={useBaseUrl('img/integrations/amazon-aws/ecs2.png')} alt="ECS" />
2.  Copy the `KinesisLogsRoleARN` and `KinesisLogsDeliveryStreamARN` values from the outputs tab of Cloudformation. <br/><img src={useBaseUrl('img/integrations/amazon-aws/ecs3.png')} alt="ECS" />
3.  Go to your CloudWatch > Log Groups and click on your CloudWatch log group `/aws/ecs/containerinsights/<cluster>/performance`. <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs4.png')} alt="ECS" />
4.  Click on Create and in opened window fill in the below parameters
    1.  Get the delivery stream name from the arn copied in step 2 and fill in the KinesisLogsDeliverStream  field.
    2.  Get the role name from the arn copied in step 2 and fill in the role.
    3.  Specify the filter pattern `{ $.Type = "Container" || $.Type = "Task" }`.
    4.  Specify the filter name.
    5.  Test the pattern and click Start streaming. <br/> <img src={useBaseUrl('img/integrations/amazon-aws/ecs5.png')} alt="ECS" />

## Collect Application Logs for Amazon ECS

Set up the Container logs collection using the steps in following [docs](/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection). You can use awsfirelens driver and avoid sending logs to CloudWatch log groups.  Put account, region and namespace fields also while configuring the source.

If your logs are already going to CloudWatch logs groups then you can create a subscription filter to subscribe the log groups to the delivery stream created in the previous step.

:::note
Application logs do not contain regions. You have to configure a new Sumo Logic source for each region if you want to avoid creating multiple sources, then you will have to put the [X-SUMO-Fields](/docs/manage/fields#x-sumo-fields-http-header) header inside logConfiguration by creating a custom fluent bit image and specify a custom fluent bit configuration.

For more information, see, [Create a custom Fluent Bit image](/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection).
:::

## Collect Traces for Amazon ECS

To set up collection for traces:

1. Create a HTTP Traces source by referring to the [docs](/docs/apm/traces/get-started-transaction-tracing/http-traces-source).
2. Install OpenTelemetry Collector by referring to the [docs](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-aws-environments). 

### Sample Log Message

<details><summary>Click to expand.</summary>

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

### Sample Query

```sql title="Deleted Resources Over Time"
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

### Install the Sumo Logic App 

Now that you have set up a collection for Amazon ECS with Container Insights and CloudWatch, install the Sumo Logic app for Amazon ECS with Container Insights and CloudWatch to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app. 
2. Select the **With Container Insights and Traces** version and click **Add to Library**. 
:::note
Version selection applies only to a few apps currently. For more information, see the [Install the Apps from the Library](/docs/get-started/library).
:::
3. To install the app, complete the following fields.
    * **App Name.** You can retain the existing name or enter the app's name of your choice. 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder or another folder that you specified. From here, you can share it with your organization. 

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Amazon ECS CloudWatch Dashboards 

### Cluster Overview 

The **Amazon ECS - Cluster Overview** dashboard provides a high-level view of the cluster's health along with details on the utilized resources.

Use this dashboard to:

- Monitor the memory and CPU utilization of your cluster.
- View abnormal read-write activity and network incoming-outgoing bytes.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Cluster-Overview.png)

### Cluster Performance Monitoring

The **Amazon ECS - Cluster Performance Monitoring** dashboard provides detailed information on the performance of your cluster, which you can use to fine-tune your cluster.

Use this dashboard to:

- Identify patterns and outliers over time.
- Monitor the performance of your cluster and use linked dashboards to drill down further into the root cause. 

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Cluster-Performance-Monitoring.png)

### Cluster Resource Reservation

The **Amazon ECS - Cluster Resource Reservation** dashboard provides information on resource reservations which can be used to set the right resource limits.

Use this dashboard to: 

- Identify the right limits for CPU and memory reservations.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Cluster-Resource-Reservation.png)

### Container Logs

The **Amazon ECS - Container Logs** dashboard provides detailed information on what is happening (errors or recent events) in a container. 

Use this dashboard to:

- View recent logs of your container.
- Identify common errors and abnormal spikes in errors.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Container-Logs.png)

### Container Overview

The **Amazon ECS - Container Overview** dashboard provides a high-level view of the health of the container along with details on the utilized resources.

Use this dashboard to:

- Track the container status and identify the container details like its task definition, image, account, etc.
- Monitor CPU, memory,  disk, and network activity of your container. 

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Container-Overview.png)

### EC2 LaunchType

The **Amazon ECS - EC2 LaunchType** dashboard provides a high-level view of the health of the cluster along with details on the utilized resources for EC2 launch types.

Use this dashboard to:

- Monitor CPU and memory utilization of clusters with EC2 launch type.
- View the number of clusters and tasks with EC2 launch type.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-EC2-LaunchType.png)

### Service Overview

The **Amazon ECS - Service Overview** dashboard provides a high-level view of the health of the services along with details on the utilized resources.

Use this dashboard to:

- Monitor the number of running, desired, and pending tasks.
- Identify services with abnormal CPU, network, memory, and disk activity.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Service-Overview.png)

### Service Performance Monitoring

The **Amazon ECS - Service Performance Monitoring** dashboard provides detailed information on the performance of your services which you can use to fine-tune your cluster.

Use this dashboard to:

- Identify patterns and outliers over time for each of the resource metrics like CPU memory network and disk.
- Track the running, pending, and desired tasks trend.
- Monitor the performance of your services and use linked dashboards to drill down further into the root cause.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Service-Performance-Monitoring.png)

### Tasks Definition Family Overview

The **Amazon ECS - Tasks Definition Family Overview** dashboard provides a high-level view of the health of the tasks belonging to a particular task definition family and details on the utilized resources.

Use this dashboard to:

- View the number of tasks running with a single task definition family.
- Monitor CPU and memory usage by task definition family.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Tasks-Definition-Family-Overview.png)

### Tasks Overview

The **Amazon ECS - Tasks Overview** dashboard provides a high-level view of the health of the task along with details on the utilized resources and where they are running.

Use this dashboard to:

- View details of all the task instances and their launch type.
- Track Network Errors and Dropped Packets
- Monitor CPU, memory, disk, and network performance by task instances.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Tasks-Overview.png)

### Tasks Definition Family Performance Monitoring

The **Amazon ECS - Tasks Definition Family Performance Monitoring** dashboard provides detailed information on the performance of your tasks which you can use to fine-tune your cluster.

Use this dashboard to:

- Identify patterns and outliers over time for each of the resource metrics like CPU, memory, network, and disk.
- Monitor the performance of your tasks and use linked dashboards to drill down further into the root cause.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Tasks-Definition-Family-Performance-Monitoring.png)

### Task Definition Family Resource Reservation

The **Amazon ECS - Task Definition Family Resource Reservation** dashboard provides information on resource reservation which can be used to set the right resource limits at the task definition level.

Use this dashboard to: 

- Identify the right limits for CPU and memory reservations.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Task-Definition-Family-Resource-Reservation.png)

### Fargate LaunchType

The **Amazon ECS - Fargate LaunchType** dashboard provides a high-level view of the cluster's health along with details on the utilized resources for Fargate launch types.

Use this dashboard to:

- Monitor network activity of your clusters with Fargate launch type.
- View the number of clusters and tasks with Fargate launch type.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Fargate-LaunchType.png)

### Audit Events 

The **Amazon ECS - Audit Events** dashboard gives information on the type of request made to ECS, the IP making the request, who made it and when, and more.

Use this dashboard to:

- View audit trail of actions taken by a user, role, or AWS service in Amazon ECS.
- Monitor container registration/deregistration events.
- Identify location, IP address from where the request was made, and resource crud events over time.

![ECS Dashboard](https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Amazon-ECS-Container-Insights/Amazon-ECS-Audit-Events.png)
