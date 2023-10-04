---
id: rds
title: Amazon RDS
description: The Sumo Logic App for Amazon RDS Metrics provides visibility into your Amazon Relational Database Service (RDS) Metrics collected via a CloudWatch Metrics Source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/rds.png')} alt="Thumbnail icon" width="50"/>

[Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/rds/) is a managed database service, optimized to run in the cloud. The RDS Amazon Web Service (AWS) simplifies the setup, operation, and scaling of relational database instances for use in applications throughout your infrastructure.

The Sumo Logic Amazon RDS app dashboards provide visibility into the performance and operations of your Amazon Relational Database Service (RDS). Preconfigured dashboards allow you to monitor critical metrics of your RDS instance(s) or cluster(s) including CPU, memory, storage, network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. CloudTrail Audit dashboards help you monitor activities performed on your RDS infrastructure. MySQL Logs dashboards helps you monitor database errors, slow queries, audit sql queries and generic activities.

## Log and Metrics Types  

The Amazon RDS app uses the following logs and metrics:
* [RDS CloudWatch Instance Level Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance), [RDS CloudWatch Aurora Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraMySQL.Monitoring.Metrics.html), and [Amazon CloudWatch metrics for Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.Cloudwatch.html).
* [Amazon RDS operations using AWS CloudTrail](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/logging-using-cloudtrail.html).
* [Publishing RDS CloudWatch Logs, RDS Database logs for Aurora MySQL, RDS MySQL, MariaDB](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQLDB.PublishtoCloudWatchLogs.html).

### Sample CloudTrail Log Message

<details><summary>Click to expand</summary>

```json title="CloudTrail"
{
   "eventVersion":"1.05",
   "userIdentity":
   {
      "type":"IAMUser",
      "principalId":"AIDABCDEFGH4QEWUABG5Q",
      "arn":"arn:aws:iam::951234567898:user/Nitin",
      "accountId":"951234567898",
      "accessKeyId":"ASIABCDEFGHFBOT4FDVK",
      "userName":"Nitin",
      "sessionContext":
      {
         "attributes":
         {
            "mfaAuthenticated":"true","
            creationDate":"2018-10-28T08:16:35Z"
         }
      },
      "invokedBy":"signin.amazonaws.com"
   },
   "eventTime":"2018-10-28T08:55:37Z",
   "eventSource":"rds.amazonaws.com",
   "eventName":"CreateDBCluster",
   "awsRegion":"us-west-1",
   "sourceIPAddress":"140.144.120.190",
   "userAgent":"signin.amazonaws.com",
   "requestParameters":
   {
      "backupRetentionPeriod":1,
      "databaseName":"NitinSampleDB",
      "dBClusterIdentifier":"auroramysql57dbcluster02-cluster",
      "dBClusterParameterGroupName":"default.aurora-mysql5.7",
      "vpcSecurityGroupIds":["sg-0123454e5b1da3aff"],
      "dBSubnetGroupName":"default-vpc-b92fc5d7",
      "engine":"aurora-mysql",
      "engineVersion":"5.7.12",
      "port":3306,
      "masterUsername":"nitin",
      "masterUserPassword":"****",
      "storageEncrypted":true,
      "enableCloudwatchLogsExports":["audit","error","general","slowquery"],
      "engineMode":"provisioned"
   },
   "responseElements":
   {
      "allocatedStorage":1,
      "availabilityZones":["us-west-1a","us-west-1b","us-west-1c"],
      "backupRetentionPeriod":1,
      "databaseName":"NitinSampleDB",
      "dBClusterIdentifier":"auroramysql57dbcluster02-cluster",
      "dBClusterParameterGroup":"default.aurora-mysql5.7",
      "dBSubnetGroup":"default-vpc-b92fc5d7",
      "status":"creating",
      "endpoint":"auroramysql57dbcluster07-cluster.cluster-cp1svq2n34sd.us-west-1.rds.amazonaws.com",
      "readerEndpoint":"auroramysql57dbcluster07-cluster.cluster-ro-cp5svq2n34sd.us-west-1.rds.amazonaws.com",
      "multiAZ":false,
      "engine":"aurora-mysql",
      "engineVersion":"5.7.12",
      "port":3306,
      "masterUsername":"nitin",
      "preferredBackupWindow":"03:25-03:55",
      "preferredMaintenanceWindow":"tue:03:58-tue:04:28",
      "readReplicaIdentifiers":[],
      "dBClusterMembers":[],
      "vpcSecurityGroups":[{"vpcSecurityGroupId":"sg-012345e5b1da3aff","status":"active"}],
      "hostedZoneId":"Z2R2ITUGPM61AM",
      "storageEncrypted":true,
      "kmsKeyId":"arn:aws:kms:us-west-1:951234567898:key/9a3d8016-4cdb-478f-a3a4-9a310fc25307",
      "dbClusterResourceId":"cluster-AVPSEUMFISOMMXXVGKL4GBUC2E",
      "dBClusterArn":"arn:aws:rds:us-west-1:951234567898:cluster:auroramysql57dbcluster02-cluster",
      "associatedRoles":[],
      "iAMDatabaseAuthenticationEnabled":false,
      "clusterCreateTime":"Oct 28, 2018 8:55:35 AM",
      "enabledCloudwatchLogsExports":["audit","error","general","slowquery"],
      "engineMode":"provisioned",
      "deletionProtection":false
   },
   "requestID":"2cbb7974-b79c-4121-aed1-5ebe8f945b72",
   "eventID":"7e554be7-0a00-4f8f-9e56-a2d54519fff9",
   "eventType":"AwsApiCall","recipientAccountId":"951234567898"
}
```
</details>

### Sample Database CloudWatch Logs

<details><summary>Click to expand</summary>

```json title="Recent Warning Events (Error Logs)"
{
   "timestamp":1682606169000,
   "message":"2023-04-27 14:36:09 14487 [Warning] Access denied for user 'dev'@'1.2.3.4' (using password: YES)",
   "logStream":"mariadb-inst-1",
   "logGroup":"/aws/rds/instance/mariadb-inst-1/error"
}
```

```json title="Top Slow Queries by Average Execution Time (SlowQuery Logs)"
{
   "timestamp":1682935054360,
   "message":"# Time: 2023-05-01T09:57:34.360484Z\n# User@Host: rdstopmgr[rdstopmgr] @ ip-10-1-0-158 [10.1.0.158]  Id:    16\n# Query_time: 0.006554  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 1\nSET timestamp=1682935054;\nselect gtid_subtract('fb39aa1b-dd09-11ed-a14e-162ba7864699:1-642', 'fb39aa1b-dd09-11ed-a14e-162ba7864699:1-642');",
   "logStream":"rds-mysql-instance-3",
   "logGroup":"/aws/rds/cluster/rds-mysql/slowquery"
}
```

```json title="DB Connections (Audit Logs)"
{
   "timestamp":1682935339000,
   "message":"20230501 10:02:19,ip-10-1-0-50,rdsadmin,localhost,7,585281,QUERY,,'select * from information_schema.rds_events_threads_waits_current where (type <> \\'BACKGROUND\\' or name = \\'thread/sql/slave_sql\\') and command <> \\'Sleep\\'',0,,",
   "logStream":"rds-dbinstance-1",
   "logGroup":"/aws/rds/instance/rds-dbinstance-1/audit"}
```

```json title="Top Active Users (General Logs)"
{
   "timestamp":1682935339000,
   "message":"20230501 10:02:19,ip-10-1-0-50,rdsadmin,localhost,7,585281,QUERY,,'select * from information_schema.rds_events_threads_waits_current where (type <> \\'BACKGROUND\\' or name = \\'thread/sql/slave_sql\\') and command <> \\'Sleep\\'',0,,",
   "logStream":"rds-dbinstance-1",
   "logGroup":"/aws/rds/instance/rds-dbinstance-1/audit"
}
```
</details>

### Sample Queries

```sql title="Average Database Connections in Use (Metric based)"
Namespace=aws/rds metric=DatabaseConnections statistic=average account=* region=* dbidentifier=* | avg by account, region, dbidentifier
```

```sql title="Top 10 Error Codes (CloudTrail Log based)"
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

```sql title="Error Logs (CloudWatch log based)"
account=* region=* namespace=aws/rds dbidentifier=* _sourceHost=/aws/rds*Error Warning
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message "[*] *" as LogLevel, msgDetails
| where LogLevel = "Warning"
| timeslice 1s
| count as frequency by _timeslice, msgDetails
| sort by _timeslice, msgDetails asc
```

```sql title="SlowQuery Logs Logs (CloudWatch log based)"
account=* region=* namespace=aws/rds dbidentifier=* _sourceHost=/aws/rds*SlowQuery "User@Host" "Query_time"
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse regex field=message "(?<query_block># User@Host:[\S\s]+?SET timestamp=\d+;[\S\s]+?;)" multi
| parse regex field=query_block "# User@Host:\s*\S+?\[(?<user>\S*?)\]\s*@\s*\[(?<ip_addr>\S*?)\]\s*Id:\s*(?<Id>\d*)" nodrop
| parse regex field=query_block "# User@Host:\s*\S+?\[(?<user>\S*?)\]\s*@\s*(?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]\s+Id:\s*(?<Id>\d+)"
| where user != "rdsadmin" and !isEmpty(user) and user matches "*"
| where !isEmpty(ip_addr) and ip_addr matches "*"
| parse regex field=query_block "# Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)" nodrop
| parse regex field=query_block "SET timestamp=(?<set_timestamp>\d*);\n(?<sql_cmd>[\s\S]*);" nodrop
| parse regex field=sql_cmd "[^a-zA-Z]*(?<sql_cmd_type>[a-zA-Z]+)\s*"
| avg(query_time) as avgTime, sum(query_time) as totalTime, min(query_time) as minTime, max(query_time) as maxTime, avg(rows_examined) as avgRowsExamined, avg(rows_sent) as avgRowsSent, avg(Lock_Time) as avgLockTime, count as frequency group by sql_cmd, user, ip_addr
| sort by avgTime | limit 100
```
```sql title="Audit Logs (CloudWatch log based)"
account=* region=* dbidentifier=* namespace=aws/rds _sourceHost=/aws/rds*Audit CONNECT
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message ",*,*,*,*,*,*,*,*,*" as instance, user, host, f1, f2, action, database, f3, f4 nodrop
| where user matches "*" and host matches "*"
| where action = "CONNECT"
| count as eventCount
```

```sql title="General Logs (CloudWatch log based)"
account=* region=* dbidentifier=* namespace=aws/rds _sourceHost=/aws/rds*general Connect
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse regex field=message "\s*\d+\s+(?<cmdType>\S+)\s*(?<command>.*)"
| where cmdType = "Connect"
| parse field=command "*@* on  using *" as user, host, connectionType nodrop
| parse field=command "*@* on * using *" as user, host, database, connectionType nodrop
| parse field=command "Out\t*@*:*" as user, host, port nodrop
| parse field=message "Access denied for user '*'@'*' (using *: *)" as user, host, autenticationType, flag nodrop
| if (message matches "*Access denied*", "Fail", "Success") as connectionStatus
| count as count by user
| sort by count, user asc | limit 20
```

## Collecting Logs and Metrics for the Amazon RDS App

Sumo Logic supports collecting metrics using two source types:
* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* Namespace for **Amazon RDS** Service is **AWS/RDS**.
   * ​​​**Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. This name will appear in the Sumo Logic Explorer View. Metrics can be queried via the “account field”.

### Collect Amazon RDS CloudTrail Logs

1. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to your Hosted Collector.
   * **Name**. Enter a name to display the new Source.
   * **Description**. Enter an optional description.
   * **S3 Region**. Select the Amazon Region for your **Amazon RDS** S3 bucket.
   * **Bucket Name**. Enter the exact name of your **Amazon RDS** S3 bucket.
   * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions)). The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression
   * **Source Category**. Enter `aws/observability/cloudtrail/logs`.
   * **Fields**. Add an **account** field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried via the “account field”.
   * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources)
   * **Log File Discovery** > **Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure **Log File Discovery** [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
   * **Enable Timestamp Parsing**. Select the check box.
   * **Time Zone**. Select Ignore time zone from log file and instead use, and select UTC.
   * **Timestamp Format.** Select Automatically detect the format.
   * **Enable Multiline Processing**. Select the check box, and select Infer Boundaries.
2. Click **Save**.

### Collect Amazon RDS CloudWatch Logs

Make sure you enable the following parameters before collecting the Amazon RDS CloudWatch Logs.

- Amazon RDS [MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.MySQL.html#USER_LogAccess.MySQLDB.PublishtoCloudWatchLogs) supports [publishing the following MySQL logs to CloudWatch](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQLDB.PublishtoCloudWatchLogs.html):
   - Error (enabled by default)
   - SlowQuery
   - Audit
   - General
- You can enable following additional parameters at [DB Parameter group](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithDBInstanceParamGroups.html) for better slow query and general log monitoring:
   - `log_slow_admin_statements`
   - `log_slow_slave_statements`
   - `log_replica_updates`
   - `log_queries_not_using_indexes`
   - `log_output to FILE`
   - `general_log` (to enable, set value to `1`)
- You can configure [DB Cluster Parameter group](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html) to enable audit logs:
   - `server_audit_logging`
   - `server_audit_logs_upload`
   - `server_audit_events`

Sumo supports several methods for collecting logs from Amazon CloudWatch. You can choose either of them to collect logs:
- **AWS Kinesis Firehose for Logs**. Configure an [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/#create-an-aws-kinesis-firehose-for-logssource) (Recommended); or
- **Lambda Log Forwarder**. Configure a collection of Amazon CloudWatch Logs using our AWS Lambda function using a Sumo Logic provided CloudFormation template, as described in [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/) or configure collection without using CloudFormation, see [Collect Amazon CloudWatch Logs using a Lambda Function](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-lambda-function/).<br/>

- While configuring the CloudWatch log source, following fields can be added in the source:
   - Add an **account** field and assign it a value which is a friendly name/alias to your AWS account from which you are collecting logs. This name will appear in the Sumo Logic Explorer View. Logs can be queried via the **account** field.
   - Add a **region** field and assign it the value of the respective AWS region where the RDS exists.
   - Add an **accountId** field and assign it the value of the respective AWS account id which is being used.

   <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/lamda-cw-logs-source-fields.png')} alt="Fields" />   

### Field in Field Schema

Login to Sumo Logic, go to **Manage Data** > **Logs** > **Fields**. Search for the `dbidentifier` field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

### Field Extraction Rule(s)

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
Rule Name: AwsObservabilityRdsCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource "rds.amazonaws.com"
```

```sql title="Parse Expression"
| json "eventSource", "awsRegion", "requestParameters", "responseElements", "recipientAccountId" as eventSource, region, requestParameters, responseElements, accountid nodrop
| where eventSource = "rds.amazonaws.com"
| "aws/rds" as namespace
| json field=requestParameters "dBInstanceIdentifier", "resourceName", "dBClusterIdentifier" as dBInstanceIdentifier1, resourceName, dBClusterIdentifier1 nodrop
| json field=responseElements "dBInstanceIdentifier" as dBInstanceIdentifier3 nodrop | json field=responseElements "dBClusterIdentifier" as dBClusterIdentifier3 nodrop
| parse field=resourceName "arn:aws:rds:*:db:*" as f1, dBInstanceIdentifier2 nodrop | parse field=resourceName "arn:aws:rds:*:cluster:*" as f1, dBClusterIdentifier2 nodrop
| if (resourceName matches "arn:aws:rds:*:db:*", dBInstanceIdentifier2, if (!isEmpty(dBInstanceIdentifier1), dBInstanceIdentifier1, dBInstanceIdentifier3) ) as dBInstanceIdentifier
| if (resourceName matches "arn:aws:rds:*:cluster:*", dBClusterIdentifier2, if (!isEmpty(dBClusterIdentifier1), dBClusterIdentifier1, dBClusterIdentifier3) ) as dBClusterIdentifier
| if (isEmpty(dBInstanceIdentifier), dBClusterIdentifier, dBInstanceIdentifier) as dbidentifier
| tolowercase(dbidentifier) as dbidentifier
| fields region, namespace, dBInstanceIdentifier, dBClusterIdentifier, dbidentifier, accountid
```

### Centralized AWS CloudTrail Log Collection

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudtrail/logs
```

**Parse Expression**:

Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the `“dev”` alias for an AWS account with ID `"528560886094"` and the `“prod”` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sql
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

#### Create/Update Field Extraction Rule(s) for RDS CloudWatch Logs

```
Rule Name: AwsObservabilityGenericCloudWatchLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* region=* _sourceHost=/aws/*
```

**Parse Expression**:

```sql
| "unknown" as namespace
| if (_sourceHost matches "/aws/lambda/*", "aws/lambda", namespace) as namespace
| if (_sourceHost matches "/aws/rds/*", "aws/rds", namespace) as namespace
| if (_sourceHost matches "/aws/ecs/containerinsights/*", "aws/ecs", namespace) as namespace
| if (_sourceHost matches "/aws/kinesisfirehose/*", "aws/firehose", namespace) as namespace
| parse field=_sourceHost "/aws/rds/*/*/" as f1, dbidentifier
| fields namespace, dbidentifier
```

### Metric Rules

Create the following two Metric Rules for the aws/rds namespace if not already created. Learn how to create a Metrics Rule [here](/docs/metrics/metric-rules-editor#create-a-metric-rule).

```sql title="Rule 1"
Rule name: AwsObservabilityRDSClusterMetricsEntityRule
Metric match expression: Namespace=AWS/RDS DBClusterIdentifier=*
Variable name: dbidentifier
Tag sequence: $DBClusterIdentifier._1
Save it
```

```sql title="Rule 2"
Rule name: AwsObservabilityRDSInstanceMetricsEntityRule
Metric match expression: Namespace=AWS/RDS DBInstanceIdentifier=*
Variable name: dbidentifier
Tag sequence: $DBInstanceIdentifier._1
Save it
```

## Installing the RDS App  

Now that you have set up a collection for **Amazon RDS**, install the Sumo Logic App to use the pre-configured [dashboards](/docs/integrations/amazon-aws/sqs#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
   * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
   * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
   * Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing the RDS Dashboards  

We highly recommend you view these dashboards in the [Explore View](/docs/observability/aws/deploy-use-aws-observability/view-dashboards) of the AWS Observability solution.

### 1. Amazon RDS Overview

The **Amazon RDS Overview** dashboard provides insights into RDS resource statistics and utilization throughout your infrastructure, including CPU, memory, latency, storage, and network throughput.

Use this dashboard to:
* Get a high-level overview of your Amazon RDS infrastructure.
* Quickly identify problems in resource utilization.
* Monitor databases performance insights such as relative CPU load, non-CPU load, and overall database load.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Overview.png')} alt="Amazon RDS dashboard" />

### 2. Amazon RDS CloudTrail Audit Events

The **Amazon RDS CloudTrail Audit Events** dashboard provides insights into audit events of your database instances and clusters.

Use this dashboard to:
* Monitor Amazon RDS-related audit logs using CloudTrail Events.
* Monitor locations of successful and failed Amazon RDS user activity events.
* Monitor most active users working on RDS infrastructure, database engines used in the infrastructure, and various events invoked on RDS clusters,
* Monitor requests from malicious IP addresses using Sumo Logic’s Threat Intel.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-CloudTrail-Audit-Events.png')} alt="Amazon RDS dashboard" />

### 3. Amazon RDS Non-Describe CloudTrail Audit Events

**Amazon RDS Non-Describe CloudTrail Audit Events** dashboard provides statistical and detailed insights into Non-Describe DB Instance, SnapShot, Cluster, and Security group events.

Use this dashboard to:
* Monitor Amazon RDS-related non-describe audit logs using CloudTrail Events.
* Monitor and track create, delete, update, start, stop, and reboot types of events on RDS instances and clusters.
* Monitor and track snapshot-related events performed on RDS instances.
* Monitor and track changes to security groups associated with your RDS infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Non-Describe-CloudTrail-Audit-Events.png')} alt="Amazon RDS dashboard" />

### 01. Amazon RDS Overview By Database Instance

**Amazon RDS Overview By Database Instance** dashboard provides insights into resource statistics and utilization per database instance throughout your infrastructure. Panels display data for CPU, memory, latency, storage, and network throughput per database instance.

Use this dashboard to:
* Quickly identify performance or resource utilization issues in your RDS clusters.
* Monitor resource utilization with trend panels for CPU usage, available memory, network receive and transmit throughput, read and write IOPS, available free storage and database connections across your Amazon RDS clusters and database instances.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Overview-By-Database-Instance.png')} alt="Amazon RDS dashboard" />

### 02. Amazon RDS Performance Insights   

The** Amazon RDS Performance Insights** dashboard provides intuitive performance data from throughout your RDS infrastructure across CPU load, non-CPU load, active sessions, and performance trends.

Use this dashboard to:
* Monitor Amazon RDS DB instance loads to analyze and troubleshoot database performance.
* Identify when the CPU is overloaded, so you can throttle connections to the instance, tune SQL queries with a high CPU load, or consider a larger instance class to remedy the situation.
* Identify high and consistent instances of any wait state (Non-CPU Load)  that indicate potential bottlenecks or resource contention issues that need to be resolved, which can be an issue even when the load doesn't exceed maximum CPU.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Performance-Insights.png')} alt="Amazon RDS dashboard" />

### 03. Amazon RDS Aurora Generic

The **Amazon RDS Aurora Generic** dashboard provides generic AWS Aurora performance statistics across your infrastructure for uptime, replica lag, latency, network throughput, volume, and storage.

Use this dashboard to:
* Monitor common health and performance metrics of your RDS Amazon Aurora MySQL/PostgreSQL cluster.
* Monitor the lag when replicating updates from a primary instance.
* Monitor the uptime of a database instance.
* Monitor the amount of storage used to ensure monitor costs.
* Monitor the percentage of requests that are served by the buffer cache to identify potential performance optimizations.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Aurora-Generic.png')} alt="Amazon RDS dashboard" />

### 04. Amazon RDS Aurora MySQL

**Amazon RDS Aurora MySQL** dashboard provides intuitive Aurora MySQL performance data from across your infrastructure for latency, throughput, active and blocked transactions, queries, login failures, and replica lag.

Use this dashboard to:
* Monitor the health and performance of your RDS Amazon Aurora MySQL instances and cluster.
* Monitor the throughput and latency associated with various types of queries executed on an Aurora MySQL instance.
* Monitor active transactions blocked transactions, and the rate of queries being executed.
* Monitor replica lag between Aurora DB clusters that are replicating across different AWS Regions.
* Monitor the number of login failures to the database, for security monitoring.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Aurora-MySQL.png')} alt="Amazon RDS dashboard" />

### 05. Amazon RDS Aurora MySQL Global Database and BackTrack Activity

**Amazon RDS Aurora MySQL Global Database and BackTrack Activity** dashboard provides insights into Aurora MySQL performance data from across your infrastructure for Global Database activity and Backtrack activity.

Use this dashboard to:

* Monitor backtrack and Amazon Aurora Global database activity.
* Monitor BackTrack change records and the backtrack window of your RDS Amazon Aurora MySQL cluster.
* Monitor the amount of lag (in milliseconds) when replicating updates from the primary AWS Region for your Aurora Global database.
* Monitor the amount of redo log data that is transferred from the master AWS region to secondary AWS regions.
* Monitor the number of write I/O operations replicated from the primary AWS region to the cluster volume in a secondary AWS region in an Aurora Global Database. The billing calculations for the primary AWS region in a global database use AuroraGlobalDBReplicatedWriteIO to account for cross-region replication within the global database.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Aurora-MySQL-Global-Database-and-Backtrack-Activity.png')} alt="Amazon RDS dashboard" />

### 06. Amazon RDS - MySQL Logs - Overview

The **Amazon RDS - MySQL Logs - Overview** dashboard provides a high-level analysis of database activity with details on authentication, connections, users, and slow query events using RDS CloudWatch logs.

Use this dashboard to:
* Identify **Authentication Failures**.
* Get the number of slow queries, associated users, and client hosts firing them.
* Get the number of failed and successful DB connections.
* Get a quick breakdown of the protocol used for database connections.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Overview.png')} alt="Amazon RDS dashboard" />

### 07. Amazon RDS - MySQL Logs - Error Logs Analysis

The **Amazon RDS - MySQL Logs - Error Logs Analysis** dashboard provides details for error logs, including failed authentications, error outliers, top and recent warnings, log levels, and aborted connections. This dashboard relies on MySQL error logs, which are by [default enabled](#collect-amazon-rds-cloudwatch-logs) for Amazon MySQL. To view the data on the panels you need to first ingest MySQL logs into Sumo Logic.

Use this dashboard to:
* Track diagnostic messages like Errors, Warnings, and Notes to decide the next step.
* Identify outliers for diagnostic events logged and see if there is an anomaly.
* Identify the authentication failures along with reason for user, client host, and client location that are used to connect. It also helps identify connection abort events.
* Monitor database instances starting up and being ready for connection events.
* Monitor MySQL RDS Cluster replication events.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Error-Logs-Analysis.png')} alt="Amazon RDS dashboard" />

### 08. Amazon RDS - MySQL Logs - Slow Query Analysis

The **Amazon RDS - MySQL Logs - Slow Query Analysis** dashboard provides details on slow queries, including the number of slow queries, trends, execution times, time comparisons, command types, users, and IP addresses. This dashboard relies on Slow Query Logs which needs to be [enabled](#collect-amazon-rds-cloudwatch-logs) and ingested into Sumo Logic.

Use this dashboard to:
* Identify queries taking more time than what is configured in DB Parameter Group.
* Identify queries that are being used to search on non-indexed columns thus impacting the performance of your application.
* Identify candidate queries to improve the frequency of execution, the time it takes to execute, locking time, and other factors of interest.
* Identify users responsible for firing slow queries from a given client IP address along with the type of command involved.
* Check if **SQL SELECT** type queries can be shifted to read replicas for better performance.
* Monitor trends of slow queries and compare them with history to check if something different is happening or might have happened to decide the next step.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Slow-Query-Analysis.png')} alt="Amazon RDS dashboard" />

### 09. Amazon RDS - MySQL Logs - Audit Logs Analysis

The **Amazon RDS - MySQL Logs - Audit Logs Analysis** dashboard provides an analysis of audit logs, including successful, failed DB connections, most active users, clients, and databases along with various SQL commands being executed on the RDS instances and clusters. This dashboard works on audit logs which need to be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) and [enabled](#collect-amazon-rds-cloudwatch-logs) to be [uploaded to theAmazon CloudWatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html). These logs are specifically enabled to audit activities of interest from an audit and compliance perspective.

Use this dashboard to:
* Identify successful and failed connections to the database with details about the user, client IP address, and location.
* Identify if multiple hosts are connecting to DB with the same user name.
* Identify if multiple users are connecting to DB from the same host.
* Identify most active users, client hosts, and databases.
* Get a high-level overview of SQL statements/commands being executed.
* Identify typical user management activities being performed.
* Quickly identify objects which are dropped.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Audit-Log-Analysis.png')} alt="Amazon RDS dashboard" />

### 10. Amazon RDS - MySQL Logs - Audit Log SQL Statements

The **Amazon RDS - MySQL Logs - Audit Log SQL Statement** dashboard provides an analysis of audit logs, including types of top SQL commands being executed on the RDS instances and clusters. This dashboard works on audit logs which need to be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) and [enabled](#collect-amazon-rds-cloudwatch-logs) to be [uploaded to Amazon CloudWatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html). These logs are specifically enabled to audit activities of interest from an audit and compliance perspective.

Use this dashboard to:
* Identify the top SQL statements and commands being executed along with trends.
* Get details on various SQL statements/commands (DML, DDL, DCL, TCL) being executed.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Audit-Log-SQL-Statements.png')} alt="Amazon RDS dashboard" />

### 11. Amazon RDS - MySQL Logs - General Log Analysis

The **Amazon RDS - MySQL Logs - Generic Log Analysis** dashboard provides details for general logs, including command types and trends, user activity and management, host activity, connections, and SQL statements. This dashboard works on General Query logs which need to be [enabled](#collect-amazon-rds-cloudwatch-logs) and ingested into Sumo Logic.

Use this dashboard to:
* Identify successful or failed  client connection attempts along with the type of connection.
* Identify user and client hosts being used to connect but are facing authentication failures along with reason. Monitor failed attempts to total attempts and track anomalies.
* Monitor why certain things are failing by checking what exactly client sent to the server to execute.
* Monitor the type of SQL statements/queries (DML, DDL, DCL, TCL, and others) being sent by the client to execute.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-General-Log-Analysis.png')} alt="Amazon RDS dashboard" />
