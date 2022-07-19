---
id: rds
title: Amazon RDS
sidebar_label: Amazon RDS
description: Amazon RDS
---

[Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/rds/) is optimized to run in the cloud. The RDS Amazon Web Service (AWS) simplifies the setup, operation, and scaling of relational database instances for use in applications throughout your infrastructure.

The Sumo Logic Amazon RDS app dashboards provide visibility into the performance and operations of your Amazon Relational Database Service (RDS). Preconfigured dashboards allow you to monitor critical metrics of your RDS cluster including  CPU, memory, storage, network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. Audit activity dashboards help you monitor activities performed on your RDS infrastructure.


### Log and Metrics Types  

The Amazon RDS app uses the following logs and metrics:

* [RDS CloudWatch Instance Level Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance), [RDS CloudWatch Aurora Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraMySQL.Monitoring.Metrics.html), and [Amazon CloudWatch metrics for Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.Cloudwatch.html).
* [Amazon RDS operations using AWS CloudTrail](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/logging-using-cloudtrail.html)


### Sample CloudTrail Log Message

```
{"eventVersion":"1.05","userIdentity":{"type":"IAMUser","principalId":"AIDABCDEFGH4QEWUABG5Q",
"arn":"arn:aws:iam::951234567898:user/Nitin","accountId":"951234567898","accessKeyId":"ASIABCDEFGHFBOT4FDVK",
"userName":"Nitin","sessionContext":{"attributes":{"mfaAuthenticated":"true","creationDate":
"2018-10-28T08:16:35Z"}},"invokedBy":"signin.amazonaws.com"},"eventTime":"2018-10-28T08:55:37Z",
"eventSource":"rds.amazonaws.com","eventName":"CreateDBCluster","awsRegion":"us-west-1","sourceIPAddress"
:"140.144.120.190","userAgent":"signin.amazonaws.com","requestParameters":{"backupRetentionPeriod":1,
"databaseName":"NitinSampleDB","dBClusterIdentifier":"auroramysql57dbcluster02-cluster","dBClusterParameterGroupName"
:"default.aurora-mysql5.7","vpcSecurityGroupIds":["sg-0123454e5b1da3aff"],"dBSubnetGroupName":"default-vpc-b92fc5d7",
"engine":"aurora-mysql","engineVersion":"5.7.12","port":3306,"masterUsername":"nitin","masterUserPassword":"****",
"storageEncrypted":true,"enableCloudwatchLogsExports":["audit","error","general","slowquery"],"engineMode":
"provisioned"},"responseElements":{"allocatedStorage":1,"availabilityZones":["us-west-1a","us-west-1b",
"us-west-1c"],"backupRetentionPeriod":1,"databaseName":"NitinSampleDB","dBClusterIdentifier":
"auroramysql57dbcluster02-cluster","dBClusterParameterGroup":"default.aurora-mysql5.7","dBSubnetGroup"
:"default-vpc-b92fc5d7","status":"creating","endpoint":"auroramysql57dbcluster07-cluster.cluster-cp1svq2n34sd.us-west-1.rds.amazonaws.com",
"readerEndpoint":"auroramysql57dbcluster07-cluster.cluster-ro-cp5svq2n34sd.us-west-1.rds.amazonaws.com",
"multiAZ":false,"engine":"aurora-mysql","engineVersion":"5.7.12","port":3306,"masterUsername":"nitin",
"preferredBackupWindow":"03:25-03:55","preferredMaintenanceWindow":"tue:03:58-tue:04:28","readReplicaIdentifiers":[],
"dBClusterMembers":[],"vpcSecurityGroups":[{"vpcSecurityGroupId":"sg-012345e5b1da3aff","status":"active"}],
"hostedZoneId":"Z2R2ITUGPM61AM","storageEncrypted":true,"kmsKeyId":"arn:aws:kms:us-west-1:951234567898:key/9a3d8016-4cdb-478f-a3a4-9a310fc25307",
"dbClusterResourceId":"cluster-AVPSEUMFISOMMXXVGKL4GBUC2E","dBClusterArn":"arn:aws:rds:us-west-1:951234567898:cluster:auroramysql57dbcluster02-cluster",
"associatedRoles":[],"iAMDatabaseAuthenticationEnabled":false,"clusterCreateTime":"Oct 28, 2018 8:55:35 AM","enabledCloudwatchLogsExports":["audit","error","general","slowquery"],"engineMode":
"provisioned","deletionProtection":false},"requestID":"2cbb7974-b79c-4121-aed1-5ebe8f945b72",
"eventID":"7e554be7-0a00-4f8f-9e56-a2d54519fff9","eventType":"AwsApiCall","recipientAccountId":
"951234567898"}
```



### Query sample (Metric based)  

**Average Database Connections in Use**

```
Namespace=aws/rds metric=DatabaseConnections statistic=average account=* region=* dbidentifier=* | avg by account, region, dbidentifier
```



### Query sample (CloudTrail Log based)

**Top 10 Error Codes**


```
"\"eventsource\":\"rds.amazonaws.com\"" errorCode account=dev Namespace=aws/rds region=us-east-1
| json "eventTime", "eventName", "eventSource", "awsRegion", "userAgent", "recipientAccountId", "userIdentity", "requestParameters", "responseElements", "errorCode", "errorMessage",  "requestID", "sourceIPAddress" as eventTime, event_name, event_source, Region, user_agent, accountId1, userIdentity, requestParameters, responseElements, error_code, error_message, requestID, src_ip nodrop
| where event_source = "rds.amazonaws.com" and !isEmpty(error_code)
| json field=userIdentity "accountId", "arn", "userName", "type" as accountId, arn, username, type nodrop
| parse field=arn ":assumed-role/*" as user nodrop | parse field=arn "arn:aws:iam::*:*" as accountId, user nodrop
| if (isEmpty(error_code), "Success", "Failure") as event_status
| json field=requestParameters "dBInstanceIdentifier", "resourceName", "dBClusterIdentifier" as dBInstanceIdentifier1, resourceName, dBClusterIdentifier1 nodrop
| json field=responseElements "dBInstanceIdentifier" as dBInstanceIdentifier3 nodrop | json field=responseElements "dBClusterIdentifier" as dBClusterIdentifier3 nodrop
| parse field=resourceName "arn:aws:rds:*:db:*" as f1, dBInstanceIdentifier2 nodrop | parse field=resourceName "arn:aws:rds:*:cluster:*" as f1, dBClusterIdentifier2 nodrop
| if (resourceName matches "arn:aws:rds:*:db:*", dBInstanceIdentifier2, if (!isEmpty(dBInstanceIdentifier1), dBInstanceIdentifier1, dBInstanceIdentifier3) ) as dBInstanceIdentifier
| if (resourceName matches "arn:aws:rds:*:cluster:*", dBClusterIdentifier2, if (!isEmpty(dBClusterIdentifier1), dBClusterIdentifier1, dBClusterIdentifier3) ) as dBClusterIdentifier
| count as Frequency by error_code
| top 10 error_code by Frequency, error_code asc
```

## Collect Logs and Metrics

## Install the App
