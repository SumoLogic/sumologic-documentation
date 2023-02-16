---
id: amazon-ecs
title: Amazon ECS
sidebar_label: Amazon ECS
description: With Sumo Logic dashboards for Amazon ECS, you can monitor capacity and resource utilization of ECS components as well as quickly identify changes made to your clusters to help with troubleshooting.
---

Amazon Elastic Container Service is a scalable, container management service that is used to manage containers in a cluster. With dashboards for Amazon ECS, you can monitor capacity and resource utilization of ECS components as well as quickly identify changes made to your clusters to help with troubleshooting.

## Log and Metric Types

The Amazon ECS app uses the following logs and metrics:

* [Amazon ECS metrics](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html)
* [CloudTrail Amazon ECS Data Event](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events)

### Sample CloudTrail Log Message

<details><summary>Click to expand log message</summary>

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
				"creationDate":"2021-02-12T11:34:55.583Z"
			},
			"sessionIssuer":{
				"type":"Role",
				"principalId":"ADFDDDFF7FDF7GFFF2DF0",
				"arn":"arn:aws:iam::435456556566:role/ecsInstanceRole",
				"accountId":"435456556566",
				"userName":"ecsInstanceRole"
			}
		}
	},
	"eventTime":"2021-02-12T11:34:55.613Z",
	"eventSource":"ecs.amazonaws.com",
	"eventName":"CreateCluster",
	"awsRegion":"us-east-1",
	"sourceIPAddress":"35.60.42.92",
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
		"cluster":"data-node",
		"instanceIdentityDocument":"{\n  \"privateIp\" : \"10.0.1.83\",\n  \"devpayProductCodes\" : null,\n  \"availabilityZone\" : \"us-west-1c\",\n  \"accountId\" : \"435456556566\",\n  \"version\" : \"2010-08-31\",\n  \"instanceId\" : \"i-76vfa923\",\n  \"billingProducts\" : null,\n  \"instanceType\" : \"t2.micro\",\n  \"imageId\" : \"ami-444d0224\",\n  \"pendingTime\" : \"2016-11-15T21:07:08Z\",\n  \"architecture\" : \"x86_64\",\n  \"kernelId\" : null,\n  \"ramdiskId\" : null,\n  \"region\" : \"us-west-1\"\n}"
	},
	"responseElements":{
		"containerInstance":{
			"versionInfo":{

			},
			"runningTasksCount":0,
			"ec2InstanceId":"i-83dcar4576",
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

### Sample Query (CloudTrail Log based) 

Created ECS Resources:

```sql
account=dev region=us-east-1 namespace=aws/ecs "\"eventSource\":\"ecs.amazonaws.com\"" (CreateCluster or CreateService or RegisterContainerInstance or RegisterTaskDefinition or RunTask)
| json "eventName", "eventSource", "awsRegion", "requestParameters", "sourceIPAddress" as event_name, event_source, Region, requestParameters, src_ip nodrop
| where event_source = "ecs.amazonaws.com"
| json field=requestParameters "cluster" as clustername nodrop
| where tolowercase(clustername) matches tolowercase("*")
| parse "\"userName\":\"*\"" as user nodrop
| parse "\"ec2InstanceId\":\"*\"" as ec2InstanceId nodrop
| parse regex field=event_name "^(?:Create|Run|Register)(?<resource_type>[A-Z][A-Za-z]+)" nodrop
| count as event_count by resource_type | sort by event_count, resource_type asc
```

## Query Sample (Metric based)

Average CPU Utilization by ServiceName:

```sql
account=dev region=us-east-1 namespace=aws/ecs metric=CPUUtilization statistic=Average ClusterName=* ServiceName=* | avg by ClusterName, ServiceName, account, region, namespace
```
 
## Amazon ECS Dashboards

Amazon Elastic Container Service is a scalable, container management service that is used to manage containers in a cluster. With dashboards for Amazon ECS, you can monitor capacity and resource utilization of ECS components as well as quickly identify changes made to your clusters to help with troubleshooting.

### Overview

**The Amazon ECS - Overview** dashboard provides an overview of CPU and memory utilization across all your ECS clusters and services. The customer upon checking the dashboard can determine which services are high in utilization and accordingly make decisions for the ECS deployment.

Use this dashboard to: 

*  Quickly determine resource utilization across all your ECS clusters and services so as to provision more capacity or optimize on cost. 
* Identify individual clusters or services that are close to available capacity or a
* Get an at-a-glance-view of how much CPU, memory and GPU resources are reserved by running tasks in your EC2-ECS cluster.  

![img](/img/observability/ecs1.jpeg)

### Audit Events

**The Amazon ECS - Audit Events** dashboard provides insights into changes to your ECS environment including top IAM users, locations of events. The dashboard also shows the created, updated, and deleted events with respect to time, along with the details for the top 10 AWS Identity and Access Management users, and the last 20 Container Registration and Deregistration Events.

Use this dashboard to:

* Quickly identify all changes to your ECS environment. 
* Monitor locations from which changes are being made locations. 
* Examine details and trends for created, updated and deleted ECS resources.

![img](/img/observability/ecs2.jpeg)

### Resource Utilization

**The Amazon ECS - Resource Utilization** dashboard provides trends around CPU and Memory utilization for clusters and services. 

* Cluster CPU or Cluster memory utilization metrics are only used for tasks using the EC2 launch type.
* Service CPU or service memory utilization metrics are used for tasks using both the Fargate and the EC2 launch type.

Use this dashboard to:

* To determine if CPU or memory resources need to be scaled up or down for a given cluster or service based on utilization trends.

![img](/img/observability/ecs3.jpeg)

### Resource Reservation

**The Amazon ECS - Resource Reservation** dashboard provides detailed insights into the average reservation (units utilized) by CPU, Memory, and GPU for a given cluster.

* These metrics are available for clusters only. 
* This metric is used only on clusters with tasks or services using the EC2 launch type. It's not supported on clusters with tasks using the Fargate launch type.

Use this dashboard to:

* To determine if CPU, GPU, or memory resources need to be scaled up or down monitor trends around CPU and memory reservation units for a given cluster.

![img](/img/observability/ecs4.jpeg)
