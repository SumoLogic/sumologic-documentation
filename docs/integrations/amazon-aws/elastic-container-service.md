---
id: elastic-container-service
title: Amazon Elastic Container Service (ECS)
sidebar_label: Amazon ECS
description: Provides preconfigured searches and Dashboards that allow you to monitor various metrics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/ecs.png')} alt="Thumbnail icon" width="50"/>

Amazon Elastic Container Service (Amazon ECS) is a container management service that allows you to manage Docker containers on a cluster of Amazon EC2 instances. The Sumo Logic App for Amazon ECS provides preconfigured searches and Dashboards that allow you to monitor various metrics (CPU and Memory Utilization, CPU and Memory Reservation) across ECS clusters and services. The App also monitors API calls made by or on behalf of Amazon ECS in your AWS account.

## Log and Metrics Types
The App collects ECS logs and metrics for:
* [ECS CloudWatch Metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html).
* [ECS Events using AWS CloudTrail](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/logging-using-cloudtrail.html).
   * All Amazon ECS actions are logged by CloudTrail and documented in the [Amazon Elastic Container Service API Reference](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_Operations.html).


### Sample Log Message

<details><summary>Click to expand</summary>

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
            "stringSetValue":[ ],
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
         "versionInfo":{ },
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
               "stringSetValue":[ ],
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
               "stringSetValue":[ ],
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

### Sample Query

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

## Collect Logs and Metrics for Amazon ECS

This section has instructions for collecting logs and metrics for the Amazon ECS App.


### Collect Metrics for Amazon ECS

In this step, you set up an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics). However, we also recommend taking a look at the [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/). For a comparison of the two options, please see [Kinesis Firehose source or CloudWatch source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/#kinesis-firehose-source-or-cloudwatch-source).

1. Grant permission for Sumo Logic to list available metrics and get metric data points. For instructions, see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).
2. Configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. In the Sumo web app, select **Manage Data > Collection > Collection**.
4. Navigate to the hosted collector you configured above and select **Add > Add Source**.
5. Select Amazon CloudWatch Source for Metrics.
6. **Name.** Enter a name to display for the new source.
7. **Description.** Enter an optional description.
8. **Regions.** Select your Amazon Regions for ECS.
9. **Namespaces.** Select **AWS/ECS**.
10. **Source Category.** Enter **ecs_metrics**.
11. **AWS Access**. There are two options for AWS access:
    * **Role-based access**. This is the preferred method. You can use this option if you granted access to Amazon ECS as described in [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).  For role-based access enter the Role ARN that was provided by AWS after creating the role.
    * **Key access**. Enter the Access Key ID and Secret Access Key. For more information, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in AWS help.
12. **Scan Interval.** Use the default of 5 minutes, or enter the frequency Sumo Logic will scan your CloudWatch Sources for new data.
13. Click **Save**.


### Collect ECS events using CloudTrail

In this step, you set up an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to collect ECS events.

1. [Configure CloudTrail](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html) in your AWS account. This will create an S3 bucket, if you so choose.
2. Grant Sumo Logic access to the Amazon S3 bucket created or used above. For instructions, see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).
3. Confirm that logs are being delivered to the Amazon S3 bucket.
4. In the Sumo web app, select **Manage Data > Collection > Collection**.
5. Navigate to the hosted collector you configured above and select **Add > Add Source**.
6. Select AWS CloudTrail source.
7. **Name.** Enter a name to display for the new Source.
8. **Description.** Enter an optional description.
9. **S3 Region.** Select the Amazon Region for your ECS S3 bucket.
10. **Bucket Name.** Enter the exact name of your ECS S3 bucket.
11. **Path Expression.** Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions).) The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
    * **Source Category.** Enter **ecs_event**.
    * **AWS Access**. There are two options for AWS access:
        * Role-based access. This is the preferred method. You can use this option if you granted access to Amazon ECS as described in [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).  For Role-based access enter the Role ARN that was provided by AWS after creating the role.  \
        * For Key access enter the Access Key ID and Secret Access Key. For more information, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) in AWS help.
    * **Scan Interval.** Use the default of 5 minutes. Alternately, enter the frequency Sumo Logic will scan your S3 bucket for new data.
    * **Enable Timestamp Parsing.** Select the check box.
    * **Time Zone.** Select **Ignore time zone from log file and instead use**, and select **UTC**.
    * **Timestamp Format.** Select **Automatically detect the format**.
    * **Enable Multiline Processing.** Select the check box, and select** Infer Boundaries**.
12. Click **Save**.



## Installing the Amazon ECS App

Now that you have set up collection for Amazon ECS, install the Sumo Logic App for Amazon ECS to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:
Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    * **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing the Amazon ECS Dashboards

### Overview

This Dashboards displays information in metrics line charts on a timeline for either the last 15 minutes, or the last six hours.

Panels include:
* Cluster Count.
* Service Count.
* Count of Services by Cluster.
* Average CPU Utilization by Service Name.
* Average Memory Utilization by Service Name.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_overview.png')} alt="Amazon ECS" />

### CPU and Memory Reservation - Cluster

Definitions:
* **CPU Reservation. **The percentage of CPU units that are reserved by running tasks/services in the cluster.
* **Memory Reservation.** The percentage of memory that is reserved by running tasks/services in the cluster.

For more information, see [http://docs.aws.amazon.com/AmazonECS...ce_utilization](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html#service_utilization)

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* Average CPU Reservation by Cluster.
* Average Memory Reservation by Cluster.
* Maximum CPU Reservation by Cluster.
* Maximum Memory Reservation by Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_cpu_and_memory_cluster.png')} alt="Amazon ECS" />


### CPU Utilization - Cluster and Service

**Definitions:**
* **CPU Utilization.** The percentage of CPU units that are used in the cluster or service.
* **Cluster CPU Utilization.** Metrics that are filtered by ClusterName without ServiceName. This is measured as the total CPU units in use by Amazon ECS tasks on the cluster, divided by the total CPU units that were registered for all of the container instances in the cluster.
* **Service CPU Utilization.** Metrics that are filtered by ClusterName and ServiceName. This is measured as the total CPU units in use by the tasks that belong to the service, divided by the total number of CPU units that are reserved for the tasks that belong to the service.

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* CPU Utilization by Service.
* CPU Utilization by Cluster.
* CPU Utilization by Service and Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_cpu_util_cluster_and_service.png')} alt="Amazon ECS" />

### Memory Utilization - Cluster and Service

**Definitions:**
* **Memory Utilization.** The percentage of memory that is used in the cluster or service. Cluster memory utilization (metrics that are filtered by ClusterName without ServiceName) is measured as the total memory in use by Amazon ECS tasks on the cluster, divided by the total amount of memory that was registered for all of the container instances in the cluster.
* **Service Memory Utilization.** Metrics that are filtered by ClusterName and ServiceName. This is measured as the total memory in use by the tasks that belong to the service, divided by the total memory that is reserved for the tasks that belong to the service.
* **Unit.** Percent.

This Dashboards displays information in metrics line charts on a timeline for the last 24 hours.

Panels include:
* Memory Utilization by Service.
* Memory Utilization by Cluster.
* Memory Utilization by Service and Cluster.

<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_memory_util_cluster_and_service.png')} alt="Amazon ECS" />


### Events
**Events by Type. **Displays events by type in a table chart including details on event name and count for the last 24 hours.

**ECS Events Over Time. **Shows ECS events over time in a line chart on a timeline for the last 24 hours.

**Location of Events.** Performs a geo lookup operation and displays the location of ECS events on a map of the world for the last 24 hours.

**Resources Created.** Provides information on resources created in a column chart for the last 24 hours.

**Deleted Resources.** Displays details about deleted resources in a column chart for the last 24 hours.

**Resource Creation Over Time. **Shows information on resources created in a column chart for the last 24 hours.

**Deleted Resources Over Time.** Displays deleted resources in a column chart for the last 24 hours.

**RegisterContainerInstance Event.** Provides information on RegisterContainerInstance events in a table chart for the last 24 hours.

**Top 10 IAM Users.** Shows information on the top 10 IAM user in a column chart for the last 24 hours.


<img src={useBaseUrl('img/integrations/amazon-aws/ecs_app_events.png')} alt="Amazon ECS" />
