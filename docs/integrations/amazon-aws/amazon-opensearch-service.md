---
id: amazon-opensearch-service
title: Amazon OpenSearch Service
description: Learn about the collection process for the Amazon OpenSearch Service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-opensearch-service-logo.png')} alt="Thumbnail icon" width="50"/>

Amazon OpenSearch Service is a managed service that makes it easy to deploy, operate, and scale OpenSearch clusters in the AWS Cloud. An OpenSearch Service domain is synonymous with an OpenSearch cluster. Domains are clusters with the settings, instance types, instance counts, and storage resources that you specify. 

The Sumo Logic app for Amazon OpenSearch collects CloudWatch logs, CloudWatch metrics and CloudTrail logs, provides a unified logs and metrics app that provides insights into the operations and utilization of your OpenSearch service. The preconfigured dashboards help you monitor the key metrics by domain names and nodes, view the OpenSearch events for activities, and help you plan the capacity of your OpenSearch service.

## **Log and Metrics types[​](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring.html)**

The Sumo Logic app for Amazon OpenSearch uses:

* OpenSearch CloudWatch Logs. For details, see [here](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createdomain-configure-slow-logs.html).  
* OpenSearch CloudWatch Metrics. For details, see [here](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-cloudwatchmetrics.html).  
* OpenSearch using AWS CloudTrail. For details, see [here](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-cloudtrailauditing.html).

### **Sample cloudTrail log messages**

```

{
  "eventVersion": "1.05",
  "userIdentity": {...},
  "eventTime": "2018-08-21T22:00:05Z",
  "eventSource": "es.amazonaws.com",
  "eventName": "CreateDomain",
  "awsRegion": "us-west-1",
  "sourceIPAddress": "123.123.123.123",
  "userAgent": "signin.amazonaws.com",
  "requestParameters": {
    "engineVersion": "OpenSearch_1.0",
    "clusterConfig": {
      "instanceType": "m4.large.search",
      "instanceCount": 1
    },
    "snapshotOptions": {
      "automatedSnapshotStartHour": 0
    },
    "domainName": "test-domain",
    "encryptionAtRestOptions": {},
    "eBSOptions": {
      "eBSEnabled": true,
      "volumeSize": 10,
      "volumeType": "gp2"
    },
    "accessPolicies": {...},
  "responseElements": {
    "domainStatus": {
      "created": true,
      "clusterConfig": {
        "zoneAwarenessEnabled": false,
        "instanceType": "m4.large.search",
        "dedicatedMasterEnabled": false,
        "instanceCount": 1
      },
      "cognitoOptions": {
        "enabled": false
      },
      "encryptionAtRestOptions": {
        "enabled": false
      },
      "advancedOptions": {
        "rest.action.multi.allow_explicit_index": "true"
      },
      "upgradeProcessing": false,
      "snapshotOptions": {
        "automatedSnapshotStartHour": 0
      },
      "eBSOptions": {
        "eBSEnabled": true,
        "volumeSize": 10,
        "volumeType": "gp2"
      },
      "engineVersion": "OpenSearch_1.0",
      "processing": true,
      "aRN": "arn:aws:es:us-west-1:123456789012:domain/test-domain",
      "domainId": "123456789012/test-domain",
      "deleted": false,
      "domainName": "test-domain",
      "accessPolicies": {...},
  "requestID": "12345678-1234-1234-1234-987654321098",
  "eventID": "87654321-4321-4321-4321-987654321098",
  "eventType": "AwsApiCall",
  "recipientAccountId": "123456789012"
}

```

### **Sample queries**

Successful Events by Event Name

```

account={{account}} region={{region}} namespace=aws/es "\"eventsource\":\"es.amazonaws.com\""
| json "userIdentity", "eventSource", "eventName", "awsRegion", "sourceIPAddress", "userAgent", "eventType", "recipientAccountId", "requestParameters", "responseElements", "requestID", "errorCode", "errorMessage" as userIdentity, event_source, event_name, region, src_ip, user_agent, event_type, recipient_account_id, requestParameters, responseElements, request_id, error_code, error_message nodrop
| where event_source = "es.amazonaws.com" 
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop
| parse field=arn ":assumed-role/*" as user nodrop 
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop
| json field=requestParameters "domainName" as domainname nodrop
| if (isBlank(accountid), recipient_account_id, accountid) as accountid
| where (tolowercase(domainname) matches tolowercase("{{domainname}}")) or isBlank(domainname)
| if (isEmpty(error_code), "Success", "Failure") as event_status
| if (isEmpty(username), user, username) as user
| count as event_count by event_name
| sort by event_count, event_name asc
```

Write Latency by Domain Name (Metrics-based)

```

account={{account}} region={{region}} namespace=aws/es domainname={{domainname}} !nodeid=* metric=WriteLatency statistic = average | avg by domainname 
```

## **Collecting logs and metrics for the Amazon OpenSearch app**

### **Collecting Metrics for Amazon OpenSearch**

1. Configure a [Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).  
2. Configure an [Amazon CloudWatch Source for Metrics](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics/) or [AWS Kinesis Firehose for Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source/) (Recommended).  
3. Namespaces. Select aws/es.  
4. Metadata. Add an account field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. The account field allows you to query metrics.  
   ![Metadata][image2]  
5. Click Save.

### **Collecting Amazon OpenSearch Events using CloudTrail**

1. Add an [AWS CloudTrail Source](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source/) to your Hosted Collector.  
   * Name. Enter a name to display for the new Source.  
   * Description. Enter an optional description.  
   * S3 Region. Select the Amazon Region for your cloudTrail S3 bucket.  
   * Bucket Name. Enter the exact name of your cloudTrail S3 bucket.  
   * Path Expression. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (\*) in this string.  
     * DO NOT use a [leading forward slash](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions/).  
     * The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.  
   * Source Category. Enter a source category. For example, enter `aws/observability/CloudTrail/logs`.  
   * Fields. Add an account field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried using the account field.  
     ![Fields][image3]  
   * Access Key ID and Secret Access Key. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-sources/).  
   * Log File Discovery \-\> Scan Interval. Use the default of 5 minutes. Alternately, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure Log File Discovery [here](https://help.sumologic.com/docs/send-data/hosted-collectors/amazon-aws/aws-sources/).  
   * Enable Timestamp Parsing. Select the Extract timestamp information from log file entries check box.  
   * Time Zone. Select Ignore time zone from the log file and instead use, and select UTC from the dropdown.  
   * Timestamp Format. Select Automatically detect the format.  
   * Enable Multiline Processing. Select the Detect messages spanning multiple lines check box, and select Infer Boundaries.  
2. Click Save.

### **Field in Field Schema**

1. [Classic UI](https://help.sumologic.com/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select Manage Data \> Logs \> Fields.  
   [New UI](https://help.sumologic.com/docs/get-started/sumo-logic-ui/). In the top menu select Configuration, and then under Logs select Fields. You can also click the Go To... menu at the top of the screen and select Fields.  
2. Search for the `"domainname"` field.  
3. If not present, create it. Learn how to create and manage fields [here](https://help.sumologic.com/docs/manage/fields/#manage-fields).

### **Field Extraction Rule(s)**

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](https://help.sumologic.com/docs/manage/field-extractions/create-field-extraction-rule/).

```

Rule Name: AwsObservabilityESCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource \"es.amazonaws.com\"
```

Parse Expression:

```

| json "userIdentity", "eventSource", "eventName", "awsRegion", "recipientAccountId", "requestParameters", "responseElements" as userIdentity, event_source, event_name, region, recipient_account_id, requestParameters, responseElements nodrop 
| where event_source = "es.amazonaws.com" 
| json field=userIdentity "accountId", "type", "arn", "userName"  as accountid, type, arn, username nodrop 
| parse field=arn ":assumed-role/*" as user nodrop 
| parse field=arn "arn:aws:iam::*:*" as accountid, user nodrop 
| json field=requestParameters "domainName" as domainname 
| if (isBlank(accountid), recipient_account_id, accountid) as accountid 
| toLowerCase(domainname) as domainname 
| "aws/es" as namespace 
| fields region, namespace, domainname, accountid
```

## **Centralized AWS CloudTrail Log Collection**

In case, you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present or update it as required.

* Rule Name: AWS Accounts  
* Applied at: Ingest Time  
* Scope (Specific Data): `_sourceCategory=aws/observability/cloudtrail/logs`  
* Parse Expression: Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “dev” alias for an AWS account with ID "528560886094" and the “prod” alias for an AWS account with ID "567680881046", your parse expression would look like:

```

| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "528560886094",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## **Installing the Amazon OpenSearch app**

Now that you have set up a collection for Amazon OpenSearch, install the Sumo Logic app to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

1. Select App Catalog.  
2. In the 🔎 Search Apps field, run a search for your desired app, then select it.  
3. Click Install App.  
   note  
   Sometimes this button says Add Integration.  
4. On the next configuration page, under Select Data Source for your App, complete the following fields:  
   * Data Source. Select one of the following options:  
     * Choose Source Category and select a source category from the list; or  
     * Choose Enter a Custom Data Filter, and [enter a custom source category](https://help.sumologic.com/docs/get-started/apps-integrations/#custom-data-filters) beginning with an underscore. For example, `_sourceCategory=MyCategory`.  
   * Folder Name. You can retain the existing name or enter a custom name of your choice for the app.  
   * All Folders (optional). The default location is the Personal folder in your Library. If desired, you can choose a different location and/or click New Folder to add it to a new folder.  
5. Click Next.  
6. Look for the dialog confirming that your app was installed successfully.  
   ![app-success.png][image4]

Post-installation

Once your app is installed, it will appear in your Personal folder or the folder that you specified. From here, you can share it with other users in your organization. Dashboard panels will automatically start to fill with data matching the time range query received since you created the panel. Results won't be available immediately, but within about 20 minutes, you'll see completed graphs and maps.

## **Viewing Amazon OpenSearch dashboards**

### **Amazon Opensearch \- Overview**

The OpenSearch \- Overview dashboard provides a comprehensive view of the OpenSearch cluster's health, performance, and resource utilization. It offers real-time insights into cluster status, CPU and memory usage, storage metrics, document management, and read/write latencies across different domains.

Use this dashboard to:

* Monitor the overall health of OpenSearch clusters with color-coded status indicators (green, yellow, red) and quickly identify the number of clusters in each state.  
* Track resource utilization, including average CPU and JVM memory usage, both overall and by individual domain names.  
* Analyze storage trends and capacity, with graphs showing free storage space and total storage used over time for different domains.  
* Keep tabs on document management activities, including the number of searchable documents and deleted documents per domain.  
* Assess system performance by observing read and write latencies across various domain names, helping to identify potential bottlenecks or areas for optimization.

![][image5]

### **Amazon Opensearch \- Audit Overview**

The Amazon Opensearch \- Audit Overview​ dashboard provides insights across CloudTrail events across location, status, and topic names.

Use this dashboard to:

* Monitor successful and failed events by location.  
* Get trends of events by status, type.  
* Monitor successful and error events with error code in detail.  
* Get details of domain names and users of both successful and error events.

![][image6]

### 

### **Amazon Opensearch \- Domain Name (Cluster)**

The OpenSearch \- Domain Name (Cluster) dashboard provides a comprehensive view of cluster performance and resource utilization across different domains. It offers insights into node count, CPU and memory usage, request patterns, and storage metrics for OpenSearch clusters.

Use this dashboard to:  
* Monitor the total node count and assess resource utilization with average CPU and JVM memory usage gauges, providing a quick overview of cluster health.  
* Compare CPU and JVM memory utilization across different domains (sumo, sumo-es, aws-test) using hexagon visualizations, helping to identify potential resource imbalances.  
* Track CPU and system memory utilization trends over time for each domain, allowing for the detection of performance anomalies or resource constraints.  
* Analyze OpenSearch request patterns and invalid host header requests by domain, which can help in identifying potential security issues or misconfigurations.  
* Keep an eye on cluster health indicators such as index write blocks and automated snapshot failures, ensuring data integrity and backup processes are functioning correctly.  
![][image7]

### **Amazon Opensearch \- Nodes**

Summary:  
The OpenSearch \- Nodes dashboard provides a detailed view of node-level performance metrics for OpenSearch clusters across different domains. It offers insights into search and indexing operations, threadpool activities, and overall cluster health, allowing for granular monitoring and troubleshooting of OpenSearch nodes.  
Use this dashboard to:  
* Compare search and indexing performance across different nodes and domains, with visualizations for search/indexing rates and latencies, helping identify potential bottlenecks or underperforming nodes.  
* Monitor thread pool activities, including search queue times, rejected requests, and write queue metrics, which are crucial for understanding cluster load and capacity issues.  
* Track OpenSearch Dashboard health metrics, such as max response time, heap utilization, request totals, and concurrent connections, to ensure optimal performance of the user interface.  
* Analyze trends in search and indexing rates over time, allowing for the detection of patterns or anomalies that may impact cluster performance.  
* Assess overall cluster health by comparing metrics across different domains, enabling quick identification of domain-specific issues or imbalances.

![][image8]

### 

### 

### **Amazon Opensearch \- EBS Volume**

The OpenSearch \- EBS Volume dashboard provides a comprehensive view of the performance metrics for Amazon Elastic Block Store (EBS) volumes associated with OpenSearch clusters. It displays various key performance indicators such as read and write latency, I/O operations per second (IOPS), throughput, burst balance, and disk queue depth.   
Use this dashboard to:  
* Monitor read and write latency of EBS volumes to ensure optimal response times for OpenSearch operations.  
* Track read and write IOPS to understand the I/O demand on your EBS volumes and identify any performance constraints.  
* Analyze read and write throughput to assess the data transfer rates and capacity utilization of your EBS volumes.  
* Keep an eye on the burst balance to ensure your EBS volumes have sufficient performance credits for handling sudden spikes in workload.  
* Observe the disk queue depth to identify potential I/O congestion and optimize your storage configuration for better performance.  
![][image9]

### **Amazon Opensearch \- Cache**

The OpenSearch \- Cache dashboard provides insights into cache performance, evictions, capacity, and memory usage, which are crucial for maintaining optimal performance of OpenSearch clusters.

Use this dashboard to:
* Performance tuning of OpenSearch clusters  
* Capacity planning for cache and memory resources  
* Troubleshooting cache-related issues  
* Ability to correlate cache metrics with overall system performance

![][image10]

### **Amazon Opensearch \- Queries**

The Amazon Opensearch \- Queries provides a comprehensive view of query performance and behavior within an OpenSearch environment.

Use this dashboard to:
* Monitor and analyze slow query performance in OpenSearch  
* Visualize the distribution of queries over time by log type, helping to identify patterns or spikes in slow query occurrences.  
* Track query hits and shard usage over time, providing insights into overall system load and resource utilization.  
* Identify the top 10 slowest queries, including details such as index name, node ID, execution time, and query source for targeted optimization.

![][image11]

### **Amazon Opensearch \- Failed Login and Connections**

The OpenSearch \- Failed Login and Connections dashboard provides a comprehensive view of login activities, focusing on failed login attempts and authentication errors. It offers insights into the geographical distribution of failed logins, user-specific login failures, cluster-based login issues, and detailed authentication error logs.

Use this dashboard to:
* Monitor the total number of failed user logins at a glance, with a prominent display of the count.  
* Visualize the geographical distribution of failed login attempts on map, helping identify potential security threats or unusual activity patterns from specific regions.  
* Analyze the distribution of login request methods  
* Track failed logins by specific users and clusters, allowing for quick identification of problematic accounts or system components.  
* Review detailed authentication error logs.

![][image12]

### **Amazon Opensearch \- Garbage collection**

The OpenSearch \- Garbage Collection dashboard provides a comprehensive view of garbage collection (GC) activities in AWS OpenSearch Service. It offers insights into GC performance, memory cleanup, and JVM memory usage across different domains. The dashboard helps monitor and optimize the garbage collection process, which is crucial for maintaining the performance and stability of OpenSearch clusters.

Use this dashboard to:

* Monitor the average garbage collection time overall and by domain name, with a trend graph to track changes over time.  
* Analyze average cleanup size and trends, to understand the efficiency of the garbage collection process across different domains.  
* Compare garbage collection counts across different nodes and domains, helping to identify any imbalances or potential issues in specific parts of the cluster.  
* Visualize JVM memory usage before and after garbage collection, providing insights into the effectiveness of memory management and potential memory leaks.

![][image13]