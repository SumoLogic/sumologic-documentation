---
id: amazon-rds
title: Amazon RDS
sidebar_label: Amazon RDS
description: The Sumo Logic App for AWS Observability RDS provides visibility into your Amazon Relational Database Service (RDS) for CloudWatch logs, CloudTrail logs, and CloudWatch metrics collected with CloudWatch metrics source, CloudWatch Log source, and CloudTrail source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/rds.png')} alt="Thumbnail icon" width="50"/>

[Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/rds/) is a managed database service, optimized to run in the cloud. The RDS Amazon Web Service (AWS) simplifies the setup, operation, and scaling of relational database instances for use in applications throughout your infrastructure.

The Sumo Logic Amazon RDS app dashboards provide visibility into the performance and operations of your Amazon Relational Database Service (RDS). Preconfigured dashboards allow you to monitor critical metrics of your RDS instance(s) or cluster(s) including CPU, memory, storage, network transmits and receive throughput, read and write operations, database connection count, disk queue depth, and more. CloudTrail Audit dashboards help you monitor activities performed on your RDS infrastructure. MySQL Logs dashboards helps you monitor database errors, slow queries, audit sql queries and generic activities. PostgreSQL logs dashboard help you to monitor database errors, slow queries, database security, and query execution timings. MSSQL Logs dashboards helps you monitor error logs and basic infrastructure details.

## Log and metrics types  

The Amazon RDS app uses the following logs and metrics:
* [RDS CloudWatch Instance Level Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance), [RDS CloudWatch Aurora Metrics](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraMySQL.Monitoring.Metrics.html), and [Amazon CloudWatch metrics for Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.Cloudwatch.html).
* [Amazon RDS operations using AWS CloudTrail](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/logging-using-cloudtrail.html).
* [Publishing RDS CloudWatch Logs, RDS Database logs for Aurora MySQL, RDS MySQL, MariaDB](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.MySQLDB.PublishtoCloudWatchLogs.html).
* [Publishing RDS CloudWatch logs, RDS Database logs for Aurora PostgreSQL, and RDS PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.html#USER_LogAccess.Concepts.PostgreSQL.PublishtoCloudWatchLogs)
* [Publishing RDS CloudWatch logs, RDS Database logs for RDS MSSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.SQLServer.html#USER_LogAccess.SQLServer.PublishtoCloudWatchLogs)
### Sample CloudTrail log message

<details>
<summary>Click to expand</summary>

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

### Sample Database CloudWatch logs

<details>
<summary>Click to expand</summary>

```json title="Recent Warning Events (Error Logs - MySQL)"
{
   "timestamp":1682606169000,
   "message":"2023-04-27 14:36:09 14487 [Warning] Access denied for user 'dev'@'1.2.3.4' (using password: YES)",
   "logStream":"mariadb-inst-1",
   "logGroup":"/aws/rds/instance/mariadb-inst-1/error"
}
```

```json title="Top Slow Queries by Average Execution Time (SlowQuery Logs - MySQL)"
{
   "timestamp":1682935054360,
   "message":"# Time: 2023-05-01T09:57:34.360484Z\n# User@Host: rdstopmgr[rdstopmgr] @ ip-10-1-0-158 [10.1.0.158]  Id:    16\n# Query_time: 0.006554  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 1\nSET timestamp=1682935054;\nselect gtid_subtract('fb39aa1b-dd09-11ed-a14e-162ba7864699:1-642', 'fb39aa1b-dd09-11ed-a14e-162ba7864699:1-642');",
   "logStream":"rds-mysql-instance-3",
   "logGroup":"/aws/rds/cluster/rds-mysql/slowquery"
}
```

```json title="DB Connections (Audit Logs - MySQL)"
{
   "timestamp":1682935339000,
   "message":"20230501 10:02:19,ip-10-1-0-50,rdsadmin,localhost,7,585281,QUERY,,'select * from information_schema.rds_events_threads_waits_current where (type <> \\'BACKGROUND\\' or name = \\'thread/sql/slave_sql\\') and command <> \\'Sleep\\'',0,,",
   "logStream":"rds-dbinstance-1",
   "logGroup":"/aws/rds/instance/rds-dbinstance-1/audit"}
```

```json title="Top Active Users (General Logs - MySQL)"
{
   "timestamp":1682935339000,
   "message":"20230501 10:02:19,ip-10-1-0-50,rdsadmin,localhost,7,585281,QUERY,,'select * from information_schema.rds_events_threads_waits_current where (type <> \\'BACKGROUND\\' or name = \\'thread/sql/slave_sql\\') and command <> \\'Sleep\\'',0,,",
   "logStream":"rds-dbinstance-1",
   "logGroup":"/aws/rds/instance/rds-dbinstance-1/audit"
}
```

```json title="Slow Queries (PostgreSQL Logs)"
{"timestamp":1705670443000,
"message":"2024-01-19 13:20:43 UTC:223.233.86.169(31944):postgresql@postgres:[3075]:LOG:  duration: 2001.036 ms  statement: SELECT * from large_table"}
```

```json title="Authentication Failure (PostgreSQL Logs)"
{"timestamp":1705859815000,
"message":"2024-01-21 17:56:55 UTC:3.92.54.14(57164):postgresql@postgresql:[43627]:FATAL:  password authentication failed for user \"postgresql\""
}
```

```json title="Authentication Failure (Error Logs - MSSQL)"
{"timestamp":1716444593813,
  "message":"2024-05-23 06:09:53.813 Logon       Login failed for user 'john'. Reason: Password did not match that for the login provided. [CLIENT: 213.252.232.134]",
  "logStream":"mssql-database-1",
  "logGroup":"/aws/rds/instance/mssql-database-1/error"}
```

</details>

### Sample queries

```sql title="Average Database Connections in Use (Metric based)"
Namespace=aws/rds metric=DatabaseConnections statistic=average account=* region=* dbidentifier=* | avg by account, region, dbidentifier
```

```sql title="Top 10 Error Codes (MySQL CloudTrail Log based)"
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

```sql title="Error Logs (MySQL CloudWatch log based)"
account=* region=* namespace=aws/rds dbidentifier=* _sourceHost=/aws/rds*Error Warning
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message "[*] *" as LogLevel, msgDetails
| where LogLevel = "Warning"
| timeslice 1s
| count as frequency by _timeslice, msgDetails
| sort by _timeslice, msgDetails asc
```

```sql title="SlowQuery Logs (MySQL CloudWatch log based)"
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
```sql title="Audit Logs (MySQL CloudWatch log based)"
account=* region=* dbidentifier=* namespace=aws/rds _sourceHost=/aws/rds*Audit CONNECT
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message ",*,*,*,*,*,*,*,*,*" as instance, user, host, f1, f2, action, database, f3, f4 nodrop
| where user matches "*" and host matches "*"
| where action = "CONNECT"
| count as eventCount
```

```sql title="General Logs (MySQL CloudWatch log based)"
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

```sql title="Slow Queries (PostgreSQL CloudWatch log based)"
account=* region=* namespace=aws/rds _sourceHost=/aws/rds*postgresql dbidentifier=* duration
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message "* * *:*(*):*@*:[*]:*:*" as date,time,time_zone,host,thread_id,user,database,processid,severity,msg
| parse regex field=msg "duration: (?<execution_time_ms>[\S]+) ms  (?<query>.+)"
| where database matches "{{database}}" and user matches "{{user}}" and host matches "{{host}}"
| number (execution_time_ms)
| where execution_time_ms > {{slow_query_latency_ms}}
| count
```

```sql title="Failed Authentications (PostgreSQL CloudWatch log based)"
account=* region=* namespace=aws/rds _sourceHost=/aws/rds*postgresql dbidentifier=* "authentication failed"
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message "* * *:*(*):*@*:[*]:*:*" as date,time,time_zone,host,thread_id,user,database,processid,severity,msg
| where user matches "{{user}}" and database matches "{{database}}" and host matches "{{host}}"
| where msg matches "*authentication failed*"
| count as %"Count"
```

```sql title="Failed Authentications (MSSQL CloudWatch log based)"
account=* region=* namespace=aws/rds dbidentifier=* _sourceHost=/aws/rds/*Error Logon Login failed for user
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
| parse field=message "* Logon       Login failed for user '*'. Reason: * [CLIENT: *]" as time, user, reason, client_ip
| where user != "rdsadmin" and !isEmpty(user) and user matches "*"
| where !isEmpty(client_ip) and client_ip matches "*"
| timeslice 1s
| count as frequency by _timeslice, user, dbidentifier, reason, client_ip
| sort by _timeslice
```

## Viewing the RDS dashboards  

import FilterDashboards from '../../../reuse/filter-dashboards.md';

<FilterDashboards/>

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.

### 1. Amazon RDS - Overview

The **Amazon RDS - Overview** dashboard provides insights into RDS resource statistics and utilization throughout your infrastructure, including CPU, memory, latency, storage, and network throughput.

Use this dashboard to:
* Get a high-level overview of your Amazon RDS infrastructure.
* Quickly identify problems in resource utilization.
* Monitor databases performance insights such as relative CPU load, non-CPU load, and overall database load.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Overview.png')} alt="Amazon RDS dashboard" style={{border: '1px solid gray'}} />

### 2. Amazon RDS - CloudTrail Audit Events

The **Amazon RDS - CloudTrail Audit Events** dashboard provides insights into audit events of your database instances and clusters.

Use this dashboard to:
* Monitor Amazon RDS-related audit logs using CloudTrail Events.
* Monitor locations of successful and failed Amazon RDS user activity events.
* Monitor most active users working on RDS infrastructure, database engines used in the infrastructure, and various events invoked on RDS clusters,
* Monitor requests from malicious IP addresses using Sumo Logic’s Threat Intel.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-CloudTrail-Audit-Events.png')} alt="Amazon RDS dashboard" />

### 3. Amazon RDS - Non-Describe CloudTrail Audit Events

The **Amazon RDS - Non-Describe CloudTrail Audit Events** dashboard provides statistical and detailed insights into Non-Describe DB Instance, SnapShot, Cluster, and Security group events.

Use this dashboard to:
* Monitor Amazon RDS-related non-describe audit logs using CloudTrail Events.
* Monitor and track create, delete, update, start, stop, and reboot types of events on RDS instances and clusters.
* Monitor and track snapshot-related events performed on RDS instances.
* Monitor and track changes to security groups associated with your RDS infrastructure.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Non-Describe-CloudTrail-Audit-Events.png')} alt="Amazon RDS dashboard" />

### 01. Amazon RDS - Overview By Database Instance

The **Amazon RDS - Overview By Database Instance** dashboard provides insights into resource statistics and utilization per database instance throughout your infrastructure. Panels display data for CPU, memory, latency, storage, and network throughput per database instance.

Use this dashboard to:
* Quickly identify performance or resource utilization issues in your RDS clusters.
* Monitor resource utilization with trend panels for CPU usage, available memory, network receive and transmit throughput, read and write IOPS, available free storage and database connections across your Amazon RDS clusters and database instances.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Overview-By-Database-Instance.png')} alt="Amazon RDS dashboard" />

### 02. Amazon RDS - Performance Insights   

The **Amazon RDS - Performance Insights** dashboard provides intuitive performance data from throughout your RDS infrastructure across CPU load, non-CPU load, active sessions, and performance trends.

Use this dashboard to:
* Monitor Amazon RDS DB instance loads to analyze and troubleshoot database performance.
* Identify when the CPU is overloaded, so you can throttle connections to the instance, tune SQL queries with a high CPU load, or consider a larger instance class to remedy the situation.
* Identify high and consistent instances of any wait state (Non-CPU Load)  that indicate potential bottlenecks or resource contention issues that need to be resolved, which can be an issue even when the load doesn't exceed maximum CPU.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Performance-Insights.png')} alt="Amazon RDS dashboard" />

### 03. Amazon RDS - Aurora Generic

The **Amazon RDS - Aurora Generic** dashboard provides generic AWS Aurora performance statistics across your infrastructure for uptime, replica lag, latency, network throughput, volume, and storage.

Use this dashboard to:
* Monitor common health and performance metrics of your RDS Amazon Aurora MySQL/PostgreSQL cluster.
* Monitor the lag when replicating updates from a primary instance.
* Monitor the uptime of a database instance.
* Monitor the amount of storage used to ensure monitor costs.
* Monitor the percentage of requests that are served by the buffer cache to identify potential performance optimizations.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Aurora-Generic.png')} alt="Amazon RDS dashboard" />

### 04. Amazon RDS - Aurora MySQL

The **Amazon RDS - Aurora MySQL** dashboard provides intuitive Aurora MySQL performance data from across your infrastructure for latency, throughput, active and blocked transactions, queries, login failures, and replica lag.

Use this dashboard to:
* Monitor the health and performance of your RDS Amazon Aurora MySQL instances and cluster.
* Monitor the throughput and latency associated with various types of queries executed on an Aurora MySQL instance.
* Monitor active transactions blocked transactions, and the rate of queries being executed.
* Monitor replica lag between Aurora DB clusters that are replicating across different AWS Regions.
* Monitor the number of login failures to the database, for security monitoring.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-Aurora-MySQL.png')} alt="Amazon RDS dashboard" />

### 05. Amazon RDS - Aurora MySQL Global Database and BackTrack Activity

**Amazon RDS - Aurora MySQL Global Database and BackTrack Activity** dashboard provides insights into Aurora MySQL performance data from across your infrastructure for Global Database activity and Backtrack activity.

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

The **Amazon RDS - MySQL Logs - Error Logs Analysis** dashboard provides details for error logs, including failed authentications, error outliers, top and recent warnings, log levels, and aborted connections. This dashboard relies on MySQL error logs, which are by [default enabled](#log-and-metrics-types) for Amazon MySQL. To view the data on the panels you need to first ingest MySQL logs into Sumo Logic.

Use this dashboard to:
* Track diagnostic messages like Errors, Warnings, and Notes to decide the next step.
* Identify outliers for diagnostic events logged and see if there is an anomaly.
* Identify the authentication failures along with reason for user, client host, and client location that are used to connect. It also helps identify connection abort events.
* Monitor database instances starting up and being ready for connection events.
* Monitor MySQL RDS Cluster replication events.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Error-Logs-Analysis.png')} alt="Amazon RDS dashboard" />

### 08. Amazon RDS - MySQL Logs - Slow Query Analysis

The **Amazon RDS - MySQL Logs - Slow Query Analysis** dashboard provides details on slow queries, including the number of slow queries, trends, execution times, time comparisons, command types, users, and IP addresses. This dashboard relies on Slow Query Logs which needs to be [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) and ingested into Sumo Logic.

Use this dashboard to:
* Identify queries taking more time than what is configured in DB Parameter Group.
* Identify queries that are being used to search on non-indexed columns thus impacting the performance of your application.
* Identify candidate queries to improve the frequency of execution, the time it takes to execute, locking time, and other factors of interest.
* Identify users responsible for firing slow queries from a given client IP address along with the type of command involved.
* Check if **SQL SELECT** type queries can be shifted to read replicas for better performance.
* Monitor trends of slow queries and compare them with history to check if something different is happening or might have happened to decide the next step.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Slow-Query-Analysis.png')} alt="Amazon RDS dashboard" />

### 09. Amazon RDS - MySQL Logs - Audit Logs Analysis

The **Amazon RDS - MySQL Logs - Audit Logs Analysis** dashboard provides an analysis of audit logs, including successful, failed DB connections, most active users, clients, and databases along with various SQL commands being executed on the RDS instances and clusters. This dashboard works on audit logs which need to be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) and [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) to be [uploaded to theAmazon CloudWatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html). These logs are specifically enabled to audit activities of interest from an audit and compliance perspective.

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

The **Amazon RDS - MySQL Logs - Audit Log SQL Statement** dashboard provides an analysis of audit logs, including types of top SQL commands being executed on the RDS instances and clusters. This dashboard works on audit logs which need to be [turned on](https://aws.amazon.com/blogs/database/auditing-an-amazon-aurora-cluster/) and [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) to be [uploaded to Amazon CloudWatch](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.CloudWatch.html). These logs are specifically enabled to audit activities of interest from an audit and compliance perspective.

Use this dashboard to:
* Identify the top SQL statements and commands being executed along with trends.
* Get details on various SQL statements/commands (DML, DDL, DCL, TCL) being executed.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-Audit-Log-SQL-Statements.png')} alt="Amazon RDS dashboard" />

### 11. Amazon RDS - MySQL Logs - General Log Analysis

The **Amazon RDS - MySQL Logs - Generic Log Analysis** dashboard provides details for general logs, including command types and trends, user activity and management, host activity, connections, and SQL statements. This dashboard works on General Query logs which need to be [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) and ingested into Sumo Logic.

Use this dashboard to:
* Identify successful or failed client connection attempts along with the type of connection.
* Identify user and client hosts being used to connect but are facing authentication failures along with reason. Monitor failed attempts to total attempts and track anomalies.
* Monitor why certain things are failing by checking what exactly client sent to the server to execute.
* Monitor the type of SQL statements/queries (DML, DDL, DCL, TCL, and others) being sent by the client to execute.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MySQL-Logs-General-Log-Analysis.png')} alt="Amazon RDS dashboard" />

### 12. Amazon RDS - PostgreSQL Logs - Overview

The **Amazon RDS - PostgreSQL Logs - Overview** dashboard provides a high level analysis of database activity with details on errors, slow logs, and authentication using RDS CloudWatch logs.

Use this dashboard to:
* Identify successful or failed authentication count and geo location.
* Obtain log severity distribution and trend.
* Obtain user activity and query execution by database.
* Obtain slow queries count and distribution based on user, command type, and host.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Overview.png')} alt="Amazon RDS dashboard" />

### 13. Amazon RDS - PostgreSQL Logs - Errors

The **Amazon RDS - PostgreSQL Logs - Errors** dashboard provide details on error occurring on your PostgreSQL instance by keeping track of log severity using `postgresql.log`.

Use this dashboard to:
* Obtain PostgreSQL log severity distribution along with error log distribution by database, user, and host.
* Identify PostgreSQL log severity over time by user, host along with error event (fatal/error log level) outlier.
* Obtain recent and top fatal and error events.
* Obtain recent queries running into error with error message.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Errors.png')} alt="Amazon RDS dashboard" />

### 14. Amazon RDS - PostgreSQL Logs - Slow Query Overview

The **Amazon RDS - PostgreSQL Logs - Slow Query Overview** dashboard provides an overview of the slow query logs. AWS RDS will report slow logs with statement taking more than threshold value given through `log_min_duration_statement`. This dashboard can be filtered with different values for query execution time through `slow_query_latency_ms`.

Use this dashboard to:
* Obtain count of slow queries and unique slow queries.
* Identify number of slow queries by user, host and command type along with slow queries over time by user and database.
* Monitor average execution time by SQL command.
* Obtain unique slow queries along with execution time, analysing minimum, maximum, average, and many more.
* Obtain time comparison between number of slow queries and their execution time over 1 day or 1 week.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Slow-Query-Overview.png')} alt="Amazon RDS dashboard" />

### 15. Amazon RDS - PostgreSQL Logs - Slow Query Details

The **Amazon RDS - PostgreSQL Logs - Slow Query Details** dashboard provides details on slow log query. Also, this dashboards displays the distribution of slow queries along with parameters like database and query type.

Use this dashboard to:
* Monitor the distribution of number of slow queries on command type and database.
* Obtain the frequently fired slow queries.
* Monitor the recent DML, DDL, and TCL statement which lead to slow queries.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Slow-Query-Details.png')} alt="Amazon RDS dashboard" />

### 16. Amazon RDS - PostgreSQL Logs - Security

The **Amazon RDS - PostgreSQL Logs - Security** dashboard provides details with respect to login failures and threat intel along with activity by default user.

Use this dashboard to:
* Obtain failed and successful authentication's count and geo location.
* Monitor failed authentication details by user, host, and database over time.
* Monitor database shut down and system up events.
* Identify default user's authentication and generic activities.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Security.png')} alt="Amazon RDS dashboard" />

### 17. Amazon RDS - PostgreSQL Logs - Query Execution Time

The **Amazon RDS - PostgreSQL Logs - Query Execution Time** dashboard provides details around the time its taking to execute queries on your PostgreSQL instance.

Use this dashboard to:
* Obtain number of queries executed and average query execution time by database.
* Monitor time comparison for number of queries executed and query execution time.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-PostgreSQL-Logs-Query-Execution-Time.png')} alt="Amazon RDS dashboard" />

### 18. Amazon RDS - MSSQL Logs - Error Logs - Logon Analysis

The **Amazon RDS - MSSQL Logs - Error Logs - Logon Analysis** dashboard provides information about the error logs, including failed authentications and logon errors. This dashboard relies on MSSQL error logs, which need to be [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) for the Amazon MSSQL. You need to first ingest MSSQL logs into Sumo Logic to view data on the dashboard panels.

Use this dashboard to:
* Identify the authentication failures along with reason for user and client location that are used to connect.
* Detect logon errors, including error codes, severity levels, and states.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MSSQL-Logs-Error-Logs-Logon Analysis.png')} style={{ border: '1px solid gray' }} alt="Amazon RDS dashboard" />

### 19. Amazon RDS - MSSQL Logs - Error Logs - Infrastructure Overview

The **Amazon RDS - MSSQL Logs - Error Logs - Infrastructure Overview** dashboard provides information about the hardware, authentication mode, collation, process, recent termination of SQL server, and recent creation of databases. This dashboard relies on MSSQL error logs, which need to be [enabled](/docs/integrations/amazon-aws/rds/#collect-amazon-rds-cloudwatch-logs) and ingested into Sumo Logic.

Use this dashboard to:
* Get a high-level overview of your MSSQL infrastructure like instance type and version.
* Get configuration details such as authentication mode, collation settings, and process details.
* Monitors `DBCC CHECKDB` checks.
* Track recent terminations of SQL Server instances and monitor the creation of new databases.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-RDS-MSSQL-Logs-Error-Logs-Infrastructure-Overview.png')} style={{ border: '1px solid gray' }} alt="Amazon RDS dashboard" />
