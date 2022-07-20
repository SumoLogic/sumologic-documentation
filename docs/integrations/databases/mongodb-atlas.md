---
id: mongodb-atlas
title: Sumo Logic App for MongoDB Atlas
---

The Sumo Logic App for MongoDB Atlas allows you to monitor database operations, performance KPIs and provides visibility into the security posture of your clusters. with the following dashboard types:  

* **Operations: **For** **monitoring database operations** **and cluster health
* **Performance:** For insights into slow queries, database and hardware metrics
* **Security:** For visibility into user logins, audit events, project and organizational activity, incoming threats, and IOCs.


The MongoDB Atlas App supports MongoDB Version 3.4 and above.

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a global cloud database service designed specifically for cloud-based applications. MongoDB Atlas runs in AWS, Azure, or GCP environments, with guaranteed availability, scalability, and compliance with data security and privacy standards.


### Log and metric types


MongoDB Atlas uses logs and metrics. MongoDB Atlas logs are in JSON format and metrics are in Carbon 2.0 format. The Sumo Logic App for MongoDB Atlas uses five types of logs and two types of metrics. For more information, see the [Collect logs and metrics for the MongoDB Atlas App](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App) page.


## Collect logs and metrics for the MongoDB Atlas App

This page explains how to collect logs from MongoDB Atlas and ingest them into Sumo Logic for use with the MongoDB Atlas App predefined dashboards and searches.


### Collection overview
3


Sumo Logic provides a solution which pulls logs and metrics from MongoDB Atlas with API calls. You can configure the log types to be collected, and the logs and metrics are then forwarded to Sumo Logic’s HTTP endpoint.


4
By default the collection starts from the current date and time, but this setting is also configurable. For more information, see the [Advanced Configuration](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Advanced_Configuration) options.

Configuring collection for MongoDB Atlas includes the following tasks:



1. [Acquire authentication information from the MongoDB Atlas portal](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Acquire_Authentication_information_from_the_MongoDB_Atlas_portal)
2. [Add a hosted collector and HTTP source](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Add_a_Hosted_Collector_and_HTTP_Source)
3. [Configure collection for MongoDB Atlas](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_collection_for_MongoDB_Atlas)
4. [Configure Webhooks for alerts collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_Webhooks_for_alerts_collection)
5. [Advanced configuration](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Advanced_Configuration)
6. [Troubleshooting](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Troubleshooting)


### Acquire Authentication information from the MongoDB Atlas portal

This section shows you how to acquire MongoDB Atlas portal authentication information.


5
If you are using IP allowlisting in an AWS Lambda based deployment, you will have to allowlist all of the IPs in the AWS region. AWS provides a [URL](https://ip-ranges.amazonaws.com/ip-ranges.json) to fetch IPs that returns a JSON file. You can use the [Atlas APIs](https://docs.atlas.mongodb.com/reference/api/whitelist/) to automate this process.

**To acquire authentication information for the MongoDB Atlas portal, do the following:**



1. Generate programmatic API Keys with project owner permissions using the instructions in** **the Atlas [documentation](https://docs.atlas.mongodb.com/configure-api-access/#create-an-api-key-for-a-project)**. **Then, copy the public key and private pey. These serve the same function as a username and API Key respectively.
2. Specify the API key **Organization Member** permissions, under **Organization > Access Manager > API Keys**, as shown in the following example.


6




1. Specify **Project Data Access Read Only** permission, under **Project Settings > Access Manager > API Keys**, as shown in the following example.


7




1. Go to your project, click **Settings**, and copy the **Project ID**, as shown in the following example.


8




1. Go to your organization by using context drop down at the top, click **Settings**, and copy the **Organization ID**.


9




1. Enable Database Auditing for the Atlas project for which you want to monitor logs, as described in [this Atlas document](https://docs.atlas.mongodb.com/database-auditing/#procedure).  \
Leave **Database Auditing** set to **ON**, as shown in the following example.


10



### Add a Hosted Collector and HTTP Source
11


This section demonstrates how to add a hosted Sumo Logic collector and HTTP Logs and Metrics source, to collect logs for MongoDB Atlas.


12
When you configure the HTTP Source, make sure to save the HTTP Source Address URL. You will need this later to configure the configuration file.

**To add a hosted collector and HTTP source, do the following:**



1. Do one of the following:
* If you already have a Sumo Logic Hosted Collector, identify the one you want to use.
* Create a new Hosted Collector as described in this document: [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).
1. Add two  HTTP sources, one for logs and another for metrics.
2. Go to the source you created for ingesting logs, navigate to **Timestamp Format > Advanced Options**, and click **Specify a format**.
3. Enter the following information in the respective fields for the **log source**:
* Timestamp Locator: `\"created\":(.*)`
* Format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
1. Click **Add**.
2. Enter the following information in the respective fields for the **metric source**:
* Timestamp Locator: `\"created\":(.*)`
* Format: `yyyy-MM-dd'T'HH:mm:ss'Z'`
1. Click **Add**.


### Configure collection for MongoDB Atlas

In this section, we explore various mechanisms to collect database logs, events, metrics and alerts  from MongoDB Atlas and send them to Sumo Logic, where they are shown in dashboards as part of the MongoDB Atlas App. You can configure Sumo Logic’s MongoDB Atlas collector in Amazon Web Services (AWS) using the AWS Lambda service, or by running  a script on a Linux machine as a cron job. Choose the method that is best suited for you:



* [AWS Lambda based collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Deploy_the_Sumo_Logic_MongoDB_Atlas_SAM_Application) via a Serverless Application Model (SAM) application
* [Script based collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_script_based_collection_for_MongoDB_Atlas) from a Linux machine


13
A single instance of the collector is responsible for collecting logs from a single project. Refer [Configuring Collection for Multiple Projects](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_collection_for_multiple_projects) if you have multiple projects.


#### Deploy the Sumo Logic MongoDB Atlas SAM Application

In this section, you deploy the SAM application, which creates the necessary  resources in your AWS account.

**To deploy the Sumo Logic MongoDB Atlas SAM Application, do the following:**



1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-mongodb-atlas**, select the **Show apps that create custom IAM roles or resource policies** check box, and click the app link when it appears.


14


1. When the Sumo Logic app page appears, click **Deploy**.


15


1. In the **AWS Lambda > Functions >** **Application Settings** panel, specify the following parameters in the corresponding text fields:
* **HTTPLogsEndpoint**: Copy and paste the URL for the HTTP Logs source from this [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Add_a_Hosted_Collector_and_HTTP_Source).
* **HTTPMetricsEndpoint**: Copy and paste the URL for the HTTP Metrics source from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Add_a_Hosted_Collector_and_HTTP_Source).
* **OrganizationID**: Copy and paste the Organization ID from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Acquire_Authentication_information_from_the_MongoDB_Atlas_portal).
* **ProjectID**: Copy and paste the Project ID from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Acquire_Authentication_information_from_the_MongoDB_Atlas_portal).
* **Private API Key**: Copy and paste the Private Key from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Acquire_Authentication_information_from_the_MongoDB_Atlas_portal).
* **Public API Key**: Copy and paste the Public Key from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Acquire_Authentication_information_from_the_MongoDB_Atlas_portal).


16


1. Click **Deploy**.


#### Configure collection for multiple projects

This section shows you how to configure collection for multiple projects assuming you are already collecting Atlas data for one project. This task requires that you do the following:



* Stop the collection of OrgEvents in the second SAM app deployment, because these events are global and are already captured by first collector.
* Change the DBNAME so that state (keys) maintained (bookkeeping) in the database (key value store) are not in conflict.

**To configure collection for multiple projects, do the following:**



1. [Deploy the MongoDB Atlas SAM application](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Deploy_the_Sumo_Logic_MongoDB_Atlas_SAM_Application) with the configuration for a new project.
2. After the deployment is complete, change the database name by adding environment variable (DBNAME) in [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html), as shown in the following example.


17


1. From the Lambda console, go to the **mongodbatlas.yaml** file and comment out **EVENTS_ORG**, as shown in the following example.** **This prevents the collection of org events, because they are already being collected by the first collector.


18




#### Configure script-based collection for MongoDB Atlas

This section shows you how to configure script-based log collection for the Sumo Logic MongoDB Atlas App.


19
The _sumologic-mongodb-atlas_ script is compatible with python 3.7 and python 2.7, and has been tested on Ubuntu 18.04 LTS.


###### **Prerequisites**

This task makes the following assumptions:



* You successfully added a hosted collector and HTTP source,** **and copied the configuration parameters (ProjectID, OrganizationID, PublicKey and PrivateKey) from MongoDB Atlas console, as described in [Add a Hosted Collector and HTTP Source](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Step_2:_Add_a_Hosted_Collector_and_HTTP_Source).
* You are logged in to the user account with which you will install the collector. If not, use the following command to switch to that account: `sudo su &lt;user_name>`


###### **Configure the script on a Linux machine**

This task shows you how to install the script on a Linux machine.


20


**For python 3**, use: `pip3 install sumologic-mongodb-atlas`  

**For operating systems where the default python is not python3**, use: `/usr/bin/python3 -m sumomongodbatlascollector.main`

**To deploy the script on a Linux machine, do the following:**



1. If **pip** is not already installed, follow the instructions in the [pip documentation](https://pip.pypa.io/en/stable/installing/) to download and install **pip**.
2. Log in to a Linux machine (compatible with either Python 3.7 or Python 2.7.
3. Do one of the following:
* **For Python 2**, run the following command: `pip install sumologic-mongodb-atlas`
* **For Python 3**, run the following command: `pip3 install sumologic-mongodb-atlas`
1. Create a `mongodbatlas.yaml` configuration file in the home directory and fill in the parameters as shown in the following example.


```
SumoLogic:
HTTP_LOGS_ENDPOINT: <Paste the URL for the HTTP Logs source from step 2.>
HTTP_METRICS_ENDPOINT: <Paste the URL for the HTTP Metrics source from step 2.>

MongoDBAtlas:
ORGANIZATION_ID: Paste the Organization ID from step 1.
PROJECT_ID: Paste the Project ID from step 1.
PRIVATE_API_KEY: Paste the Private Key from step 1.
PUBLIC_API_KEY: Paste the Public Key from step 1.

```



1. Create a cron job  to run the collector every 5 minutes, (use the `crontab -e` option). Do one of the following:
* **For Python 2**, add the following line to your crontab:  \
`*/5 * * * *  /usr/bin/python -m sumomongodbatlascollector.main > /dev/null 2>&1`
* **For Python 3**, add the following line to your crontab:  \
`*/5 * * * *  /usr/bin/python3 -m sumomongodbatlascollector.main > /dev/null 2>&1`


###### **Configuring collection for multiple projects**

This section shows you how to configure collection for multiple projects assuming you are already collecting Atlas data for one project. This task requires that you do the following:



* Stop the collection of OrgEvents in the second SAM app deployment, because these events are global and are already captured by first collector.
* Change the DBNAME so that state (keys) maintained (bookkeeping) in the database (key value store) are not in conflict.

**To configure collection for multiple projects, do the following:**



1. [Configure the script on a Linux machine](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_the_script_on_a_Linux_machine), then go to your configuration file.
2. Change the **DB_NAME** and comment out **EVENTS_ORG** as shown in the following example.


```
SumoLogic:
  LOGS_SUMO_ENDPOINT: <Paste the URL for the HTTP Logs source from step 2.>
  METRICS_SUMO_ENDPOINT: <Paste the URL for the HTTP Metrics source from step 2.>

MongoDBAtlas:
  ORGANIZATION_ID: <Paste the Organization ID from step 1.>
  PROJECT_ID: <Paste the Project ID from step 1.>
  PRIVATE_KEY: <Paste the Private Key from step 1.>
  PUBLIC_KEY: <Paste the Public Key from step 1.>
    LOG_TYPES:
      - DATABASE
      - AUDIT
      - EVENTS_PROJECT
      # - EVENTS_ORG
      - ALERTS

    METRIC_TYPES:
      PROCESS_METRICS:
        - CACHE_DIRTY_BYTES
        - CACHE_USED_BYTES
        - CONNECTIONS
        - CURSORS_TOTAL_OPEN
        - CURSORS_TOTAL_TIMED_OUT
        - DB_STORAGE_TOTAL
        - DB_DATA_SIZE_TOTAL
        - EXTRA_INFO_PAGE_FAULTS
        - GLOBAL_LOCK_CURRENT_QUEUE_TOTAL
        - MEMORY_RESIDENT
        - MEMORY_VIRTUAL
        - MEMORY_MAPPED
        - NETWORK_BYTES_IN
        - NETWORK_BYTES_OUT
        - NETWORK_NUM_REQUESTS
        - OPCOUNTER_CMD
        - OPCOUNTER_QUERY
        - OPCOUNTER_UPDATE
        - OPCOUNTER_DELETE
        - OPCOUNTER_GETMORE
        - OPCOUNTER_INSERT
        - OP_EXECUTION_TIME_READS
        - OP_EXECUTION_TIME_WRITES
        - OP_EXECUTION_TIME_COMMANDS
        - OPLOG_MASTER_LAG_TIME_DIFF
        - OPLOG_SLAVE_LAG_MASTER_TIME
        - QUERY_EXECUTOR_SCANNED
        - QUERY_EXECUTOR_SCANNED_OBJECTS
        - QUERY_TARGETING_SCANNED_PER_RETURNED
        - QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED
        - SYSTEM_NORMALIZED_CPU_USER
        - SYSTEM_NORMALIZED_CPU_KERNEL
        - SYSTEM_NORMALIZED_CPU_IOWAIT
        - PROCESS_CPU_USER
        - PROCESS_CPU_KERNEL
        - SYSTEM_NORMALIZED_CPU_STEAL

      DISK_METRICS:
        - DISK_PARTITION_IOPS_READ
        - DISK_PARTITION_IOPS_WRITE
        - DISK_PARTITION_UTILIZATION
        - DISK_PARTITION_LATENCY_READ
        - DISK_PARTITION_LATENCY_WRITE
        - DISK_PARTITION_SPACE_PERCENT_FREE
        - DISK_PARTITION_SPACE_PERCENT_USED

Collection:
  DBNAME: "newmongodbatlas"
```



### Configure Webhooks for alerts collection

You configure Webhooks for real-time alerts. This section explains how to configure alert collection using Webhooks.

**To configure alert collection with Webhooks, do the following:**



1. Go to the **MongoDBAtlas** console and select **Project Integrations.** Click **Configure** under **Webhook Settings**.
2. Copy and paste the Logs endpoint from [Step](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Add_a_Hosted_Collector_and_HTTP_Source) to set up Webhook.


21




1. When configuring an alert, specify the **Webhook** as shown in the following example, and then click **Save**.


22



### Advanced Configuration
23


This section is common for both [AWS Lambda based collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Deploy_the_Sumo_Logic_MongoDB_Atlas_SAM_Application) and [script based collection](https://help.sumologic.com/07Sumo-Logic-Apps/12Databases/MongoDB_Atlas/Collect_logs_and_metrics_for_the_MongoDB_Atlas_App#Configure_script_based_collection_for_MongoDB_Atlas).

The following table provides a list of variables for MongoDB Atlas that you can optionally define in the configuration file.

**INSERT TABLE**


### Troubleshooting
24


This section shows you how to run the function manually and then verify that log messages are being sent from MongoDB Atlas.

**To run the function manually, do the following:**



1. Enter  one of the following commands:
* For **Python 2**, use this command: `python -m sumomongodbatlascollector.main`
* For **Python 3**, use this command: `python3 -m sumomongodbatlascollector.main`
1. Check the automatically generated logs in  **/tmp/sumoapiclient.log **to verify whether the function is getting triggered or not.
2. If you installed the collector as `root` user and then run it as a normal user, you will see an error message similar to the following. This is because the config is not present in the home directory of the user that is running the collector. Switch to `root` user and run the script again.


25
You can also avoid this error by running the script with config file path as first argument.


```
Traceback (most recent call last):
 File "/usr/local/lib/python2.7/dist-packages/sumomongodbatlascollector/main.py", line 190, in main
   ns = MongoDBAtlasCollector()
 File "/usr/local/lib/python2.7/dist-packages/sumomongodbatlascollector/main.py", line 29, in __init__
   self.config = Config().get_config(self.CONFIG_FILENAME, self.root_dir, cfgpath)
 File "/usr/local/lib/python2.7/dist-packages/sumomongodbatlascollector/common/config.py", line 22, in get_config
   self.validate_config(self.config)
 File "/usr/local/lib/python2.7/dist-packages/sumomongodbatlascollector/common/config.py", line 34, in validate_config
   raise Exception("Invalid config")
Exception: Invalid config
```



### Sample Log Messages
26


MongoDB Atlas logs are all in JSON format and metrics are in Carbon2.0 format. The MongoDB Atlas utilizes five types of logs and two types of metrics. This section provides examples of the log types utilized by the MongoDB Atlas App.


27
The Sumo Logic `mongodbatlas` collector enhances logs by adding a few metadata fields. For this reason, the raw logs from the MongoDB Atlas API may differ in format.

Some logs are not available for some cluster tier. Check the mongo [docs](https://docs.atlas.mongodb.com/reference/free-shared-limitations/). Some log types like for mongos instances are available for shared cluster only.


#### Database Logs
28


**Sample message**


```
{"msg": "2019-07-03T16:07:40.366+0000 I CONTROL  [initandlisten] MongoDB starting : pid=20104 port=27017 dbpath=/srv/mongodb/M10AWSTestCluster-shard-1-node-2 64-bit host=m10awstestcluster-shard-01-02-snvkl.mongodb.net", "project_id": "5cd0343ff2a30b3880beddb0", "hostname": "m10awstestcluster-shard-01-02-snvkl.mongodb.net", "cluster_name": "m10awstestcluster", "created": "2019-07-03T16:07:40.366+0000"}
```


For more information, see [https://docs.mongodb.com/manual/refe.../log-messages/](https://docs.mongodb.com/manual/reference/log-messages/).


#### Audit Logs
29


**Sample message**


```
{"atype": "authenticate", "ts": {"$date": "2019-07-03T16:08:50.256+0000"}, "local": {"ip": "192.168.253.201", "port": 27017}, "remote": {"ip": "192.168.254.91", "port": 49592}, "users": [{"user": "mms-monitoring-agent", "db": "admin"}], "roles": [{"role": "clusterMonitor", "db": "admin"}], "param": {"user": "mms-monitoring-agent", "db": "admin", "mechanism": "SCRAM-SHA-1"}, "result": 0, "project_id": "5cd0343ff2a30b3880beddb0", "hostname": "m10awstestcluster-shard-01-02-snvkl.mongodb.net", "cluster_name": "m10awstestcluster", "created": "2019-07-03T16:08:50.256+0000"}
```


For more information, see [https://docs.mongodb.com/manual/refe...audit-message/](https://docs.mongodb.com/manual/reference/audit-message/).


#### Alerts
30


**Sample message**


```
{"alertConfigId": "5cf9c324f2a30b3783a1dd28", "clusterName": "M10AWSTestCluster", "created": "2019-06-07T01:52:28Z", "currentValue": {"number": 5.142857142857142, "units": "RAW"}, "eventTypeName": "OUTSIDE_METRIC_THRESHOLD", "groupId": "5cd0343ff2a30b3880beddb0", "hostnameAndPort": "m10awstestcluster-shard-00-01-snvkl.mongodb.net:27017", "id": "5cf9c35cd5ec1376c01e81e5", "lastNotified": "2019-06-07T02:28:38Z", "links": [{"href": "https://cloud.mongodb.com/api/public/v1.0/groups/5cd0343ff2a30b3880beddb0/alerts/5cf9c35cd5ec1376c01e81e5", "rel": "self"}], "metricName": "CONNECTIONS_PERCENT", "replicaSetName": "M10AWSTestCluster-shard-0", "resolved": "2019-06-07T02:28:29Z", "status": "CLOSED", "typeName": "HOST_METRIC", "updated": "2019-06-07T02:28:29Z"}
```


For more information, see [https://docs.atlas.mongodb.com/refer...et-all-alerts/](https://docs.atlas.mongodb.com/reference/api/alerts-get-all-alerts/).


#### Project Events
31


**Sample message**


```
{"apiKeyId": "5cef76e8c56c9800d21aa96d", "created": "2019-07-29T11:49:56Z", "eventTypeName": "MONGODB_LOGS_DOWNLOADED", "groupId": "5cd0343ff2a30b3880beddb0", "id": "5d3edd64ff7a25581ef2a95b", "isGlobalAdmin": false, "links": [{"href": "https://cloud.mongodb.com/api/atlas/v1.0/groups/5cd0343ff2a30b3880beddb0/events/5d3edd64ff7a25581ef2a95b", "rel": "self"}], "publicKey": "hpgstoga", "remoteAddress": "111.93.54.106"}
```


For more information, see [https://docs.atlas.mongodb.com/refer...ath-parameters](https://docs.atlas.mongodb.com/reference/api/events-projects-get-all/#request-path-parameters).


#### Organization Events
32


**Sample message**


```
{"created": "2019-07-22T12:50:32Z", "eventTypeName": "API_KEY_WHITELIST_ENTRY_ADDED", "id": "5d35b118a6f2391aafc77a05", "isGlobalAdmin": false, "links": [{"href": "https://cloud.mongodb.com/api/atlas/v1.0/orgs/5cd0343ef2a30b3bc7b8f88e/events/5d35b118a6f2391aafc77a05", "rel": "self"}], "orgId": "5cd0343ef2a30b3bc7b8f88e", "remoteAddress": "113.193.231.154", "targetPublicKey": "hpgstoga", "userId": "5cd0343ec56c985c82d3822f", "username": "hpal@sumologic.com", "whitelistEntry": "3.216.123.80"}
```


For more information, see [https://docs.atlas.mongodb.com/reference/api/events-orgs-get-all/](https://docs.atlas.mongodb.com/reference/api/events-orgs-get-all/).


### Metric types
33


This section provides examples of the metric types utilized by the MongoDB Atlas App.


#### Process Metrics
34


**Metrics collected**


```
CACHE_DIRTY_BYTES
CACHE_USED_BYTES
CONNECTIONS
CURSORS_TOTAL_OPEN
CURSORS_TOTAL_TIMED_OUT
DB_STORAGE_TOTAL
DB_DATA_SIZE_TOTAL
EXTRA_INFO_PAGE_FAULTS
GLOBAL_LOCK_CURRENT_QUEUE_TOTAL
MEMORY_RESIDENT
MEMORY_VIRTUAL
MEMORY_MAPPED
NETWORK_BYTES_IN
NETWORK_BYTES_OUT
NETWORK_NUM_REQUESTS
OPCOUNTER_CMD
OPCOUNTER_QUERY
OPCOUNTER_UPDATE
OPCOUNTER_DELETE
OPCOUNTER_GETMORE
OPCOUNTER_INSERT
OP_EXECUTION_TIME_READS
OP_EXECUTION_TIME_WRITES
OP_EXECUTION_TIME_COMMANDS
OPLOG_MASTER_LAG_TIME_DIFF
OPLOG_SLAVE_LAG_MASTER_TIME
QUERY_EXECUTOR_SCANNED
QUERY_EXECUTOR_SCANNED_OBJECTS
QUERY_TARGETING_SCANNED_PER_RETURNED
QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED
SYSTEM_NORMALIZED_CPU_USER
SYSTEM_NORMALIZED_CPU_KERNEL
SYSTEM_NORMALIZED_CPU_IOWAIT
PROCESS_CPU_USER
PROCESS_CPU_KERNEL
SYSTEM_NORMALIZED_CPU_STEAL
```


**Sample metric**


```
"projectId=5cd0343ff2a30b3880beddb0 hostId=m10awstestcluster-shard-00-00-snvkl.mongodb.net:27016 processId=m10awstestcluster-shard-00-00-snvkl.mongodb.net:27016 metric=ASSERT_REGULAR  units=SCALAR_PER_SECOND cluster_name=m10awstestcluster 0.0 1564207269
```


For more information, see [https://docs.atlas.mongodb.com/refer...-measurements/](https://docs.atlas.mongodb.com/reference/api/process-measurements/).


#### Disk Metrics
35


**Metrics collected**


```
DISK_PARTITION_IOPS_READ
DISK_PARTITION_IOPS_WRITE
DISK_PARTITION_UTILIZATION
DISK_PARTITION_LATENCY_READ
DISK_PARTITION_LATENCY_WRITE
DISK_PARTITION_SPACE_PERCENT_FREE
DISK_PARTITION_SPACE_PERCENT_USED
```


**Sample metric**


```
projectId=5cd0343ff2a30b3880beddb0 partitionName=nvme1n1 hostId=m10awstestcluster-shard-01-02-snvkl.mongodb.net:27017 processId=m10awstestcluster-shard-01-02-snvkl.mongodb.net:27017 metric=DISK_PARTITION_IOPS_READ  units=SCALAR_PER_SECOND cluster_name=m10awstestcluster 0.0 1564207300
```


For more information, see [https://docs.atlas.mongodb.com/refer...-measurements/](https://docs.atlas.mongodb.com/reference/api/process-disks-measurements/).


### Query Sample
36


The query sample provided in this section is from the **Recent Audit Events **panel of the **MongoDB Atlas - Audit **dashboard.


```
_sourceCategory=Labs/MongoDBAtlas/logs AND (_sourceName="mongodb-audit-log.gz" OR _sourceName="mongos-audit-log.gz")
| json "atype", "local.ip", "remote.ip", "users","result", "project_id", "hostname", "cluster_name", "param" as atype, local_ip, remote_ip, users, result, project_id, hostname, cluster_name, param
| json field=param "db", "ns" as database1, database2 nodrop
| parse field=database2 "*.*" as database2, collection nodrop
| if (isBlank(database1), database2, database1) as database
| where atype matches /create|add|grant|drop|remove|revoke|shutdown|rename|update/
| first(_messageTime) as latest_event_date group by atype, project_id, hostname, cluster_name,  database, collection, users, local_ip, remote_ip
| sort by latest_event_date
| formatDate(fromMillis(toLong(latest_event_date)),"MM-dd-yyyy HH:mm:ss:SSS") as latest_event_date
```



## Install the MongoDB Atlas App

This section provides instructions on how to install the MongoDB Atlas App, as well as examples of each of the dashboards. The App's pre-configured searches and [Dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Cisco_ASA/Cisco-ASA-App-Dashboards#Dashboards) provide easy-to-access visual insights into your data.


**To install the app, do the following:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


38
Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


39
All panels may not populate. Some tiers do not support certain types of logs. Refer atlas tier [limitation docs](https://docs.atlas.mongodb.com/reference/free-shared-limitations/#atlas-free-tier) for more details.


## Dashboard Filters   
40


**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.


41
You can use filters to drill down and examine the data on a granular level.


42


**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


43



## MongoDB Atlas - Overview Dashboard
44


The **MongoDB Atlas - Overview** dashboard provides an at-a-glance overview of server availability, messages, and commands. Panels display information on messages by severity and component, trends in messages by component and severity, as well as trends for database (DB) commands and create, read, update, and delete (**CRUD**) function commands.

**Use this dashboard to:**



* Identify key operational metrics. You can drill down for granular data by clicking any of the first row panels. Monitor recent events and alerts. Click on the ID links to drill-down into the MongoDB Atlas console for more details.
* Monitor unreachable nodes, running and stopped servers, and identify and fix host errors.


45



# Security Dashboards
46


The MongoDB Atlas Security dashboards aim to provide a comprehensive view of Atlas security and audit aspects via the Atlas audit logs, alerts, and events logs.


### MongoDB Atlas - Events Dashboard
47


The **MongoDB Atlas - Events** dashboard provides information on Atlas project and organization-level changes. Panels show information on the type, number, location and recent events.

**Use this dashboard to:**



* Monitor most recent and past Atlas change events to ensure that the number and type of events are in line with expectations.
* Identify any violations in your security policies (such as users accessing Atlas without MFA).


48



### MongoDB Atlas - Alerts Dashboard
49


The **MongoDB Atlas - Alerts** dashboard provides an at-a-glance view view of alerts triggered in your Atlas environment. Panels show information around the total number and number of  open alerts, recent alerts, alert types and status.

**Use this dashboard to:**



* Identify and address all open and recent alerts
* Monitor unusually high number of  alerts by analyzing trend graphs


50



### MongoDB Atlas - Audit Dashboard
51


The **MongoDB Atlas - Audit** dashboard provides information around security events in your Atlas environment such as failed authentication, authorization and audit events, audit event trends, and originating geographic locations. Panels also display details on audit events by action type and user, and recent audit events by created and deleted resources.

**Use this dashboard to:**



* Identify unusually high number of eventsfailed eventby analyzing trend graphs
* Identify most affected hosts and users associated with failed audit events
* Monitor most recent audit events and database operations to ensure they are in line with expectations
* Track database read and write operations, spikes in failed events, as well as the users who performed the events


52



# Performance Dashboards
53


Performance dashboards provide visual representations of key MongoDB Atlas metrics. You can use this data to correlate system health and performance and use Atlas logs to identify and fix the root cause of any problems. These dashboards are also provide the ability to fine tune your queries and database operations.


### MongoDB Atlas - Cluster Metrics Dashboard
54


The **MongoDB Atlas - Cluster Metrics** dashboard provides a high-level view of cluster performance, disk and cache usage. Panel graphs show details for read and write operations and their execution times, network traffic, connections, data sizes, and disk read and write IOPs.

**Use this dashboard to:**



* Identify anomalous changes in database metrics
* Monitor resource usage and determine how to optimize your Atlas databases and clusters


55



### MongoDB Atlas - Metrics Dashboard
56


The **MongoDB Atlas - Metrics** dashboard provides an at-a-glance view of database performance with graphs showing memory availability, data size, cache in bytes, and returned document ratios.

**Use this dashboard to:**



* Determine node health based on page faults, cache dirty bytes, replication headroom, queued operations, and  disk write latency.
* Monitor resource usage (cache and disk) and active connections. You can set up alerts for notification on these metrics.
* Drill-down into the underlying queries and use the the Sumo Logic [Log Overlay](https://help.sumologic.com/Metrics/03-Metric-Charts/13-Use-Log-Overlay-to-Analyze-Metrics-Visualizations) feature to correlate performance metrics with underlying logs to identify the root cause of performance degradations


57



### MongoDB Atlas - Slow Queries Dashboard
58


The **MongoDB Atlas - Slow Queries** dashboard provides details on the number of slow queries by type,trends, and slow server status.

**Use this dashboard to:**



* Identify and fix slow queries
* Identify changes in the number and types of slow queries by analyzing trends
* Identify databases, connections collections experiencing slow queries
* Determine queries and operations that are using Scanned Objects/Returned objects and Keys Scanned Keys/Returned objects ratios to identify the potential fields for indexing


59



# Operations Dashboards
60


The Operations dashboards monitor database operations, such as indexing, sharding, and replication. These dashboards allow you to view detailed error logs for troubleshooting and track login activities in your database including failed attempts.


### MongoDB Atlas - Errors and Warnings Dashboard
61


The **MongoDB Atlas - Errors and Warnings** dashboard provides information on errors, warnings by component, severity and type.. Panels also show information on daily error and warning summaries, socket exceptions, timeout events, and MongoDB exit events.

**Use this dashboard to:**



* Identify and fix errors and warnings
* Troubleshoot problems in your cluster by analyzing errors and warningsIdentify hosts with most errors and correct issues accordingly


62



### MongoDB Atlas - Logins and Connections Dashboard
63


The **MongoDB Atlas - Logins and Connections** dashboard provides a high-level view of the geographic locations of client connection requests, logins from malicious remote IPS, and geographic locations of failed logins. Panels also display information on overall failed login attempts, threat intel by remote IP, and failed logins by user.

**Use this dashboard to:**



* Identify requests coming in malicious remote IPs and their geographic locations and use this information to fix your firewall or WAF devices
* Validate locations of incoming client connections are in line with expected locations


64



### MongoDB Atlas - Replication Dashboard
65


The **MongoDB Atlas - Replication** dashboard provides information on changes in replication configurations. Panels display details on replication errors, warnings, events, as well as information around primary and secondary nodes.

**Use this dashboard to:**



* Identify and fix replication and availability errors
* Monitor changes in replication lag performance


66



### MongoDB Atlas - Sharding Dashboard
67


The **MongoDB Atlas - Sharding** dashboard provides information on Atlas cluster sharding. Panels show details on warnings, errors, chunk split failures, balancer failures, chunks moving by collection, and chunks moving between shards.

**Use this dashboard to:**



* Identify and fix sharding and balancing related errors and warnings
* Track chunk move operations to ensure they are in line with expectations


68
