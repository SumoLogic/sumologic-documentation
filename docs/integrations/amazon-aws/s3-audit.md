---
id: s3-audit
title: Amazon S3 Audit
description: Provides a simple web services interface that can be used to store and retrieve any amount of data from anywhere on the web.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="Thumbnail icon" width="50"/>

Amazon Simple Storage Service (S3) provides a simple web services interface that can be used to store and retrieve any amount of data from anywhere on the web. The Sumo Logic App for Amazon S3 Audit presents details from access logs that contain information about the request type, the average response time, and the inbound and outbound data volume.


## Log Types

Amazon S3 Audit uses Server Access Logs (activity logs). For more information on the log format, see: [http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html](http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html).


### Sample Log Message

The server access log files consist of a sequence of new-line delimited log records. Each log record represents one request and consists of space delimited fields. The following is an example log consisting of six log records.

```json
79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 3E57427F3EXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 7 - "-" "S3Console/0.4" - 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 891CE47D2EXAMPLE REST.GET.LOGGING_STATUS - "GET /mybucket?logging HTTP/1.1" 200 - 242 - 11 - "-" "S3Console/0.4" - 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:00:38 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be A1206F460EXAMPLE REST.GET.BUCKETPOLICY - "GET /mybucket?policy HTTP/1.1" 404 NoSuchBucketPolicy 297 - 38 - "-" "S3Console/0.4" - 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:01:00 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be 7B4A0FABBEXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 33 - "-" "S3Console/0.4" - 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:01:57 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be DD6CC733AEXAMPLE REST.PUT.OBJECT s3-dg.pdf "PUT /mybucket/s3-dg.pdf HTTP/1.1" 200 - - 4406583 41754 28 "-" "S3Console/0.4" - 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be mybucket [06/Feb/2014:00:03:21 +0000] 192.0.2.3 79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be BC3C074D0EXAMPLE REST.GET.VERSIONING - "GET /mybucket?versioning HTTP/1.1" 200 - 113 - 28 - "-" "S3Console/0.4" -
```

### Sample Query

```sql
| parse "* * [*] * * * * * \"* HTTP/1.1\" * * * * * * * \"*\" *" as bucket_owner, bucket, time, remoteIP, requester, request_ID, operation, key, request_URI, status_code, error_code, bytes_sent, object_size, total_time, turn_time, referrer, user_agent, version_ID
| parse regex field=operation "[A-Z]+\.(?<operation>[\w.]+)"
| count by operation
```


## Collecting Logs for the Amazon S3 Audit App

Amazon Simple Storage Service (S3) provides a simple web services interface that can be used to store and retrieve any amount of data from anywhere on the web.

This topic details how to collect logs for Amazon S3 Audit and ingest them into Sumo Logic.

Once you begin uploading data, your daily data usage will increase. It's a good idea to check the Account page in  Sumo Logic to make sure that you have enough quota to accommodate additional data in your account. If you need additional quota you can [upgrade your account](/docs/manage/manage-subscription/upgrade-cloud-flex-account.md) at any time.


### Before you begin

Before you can begin to collect logs from an S3 bucket, perform the following steps:

1. [Enable logging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html) via the AWS Management Console.
2. Confirm that logs are being delivered to an S3 bucket.
3. [Grant Sumo Logic Access to the Amazon S3 Bucket](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).


### Configure a Collector

In Sumo Logic, configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).


### Configure an S3 Audit Source

{@import ../../reuse/apps/create-aws-s3-source.md}

### Field Extraction Rules

Field Extraction Rules (FERs) tell Sumo Logic which fields to parse out automatically. For instructions, see [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule).

Use the following Parse Expression:

```sql
parse "* * [*] * * * * * \"* HTTP/1.1\" * * * * * * * \"*\" *" as bucket_owner, bucket, time, remoteIP, requester, request_ID, operation, key, request_URI, status_code, error_code, bytes_sent, object_size, total_time, turn_time, referrer, user_agent, version_ID
```

## Installing the Amazon S3 Audit App

Now that you have configured log collection for Amazon S3 Audit, install the Sumo Logic App for Amazon S3, and take advantage of predefined Searches and dashboards. The Sumo Logic App for Amazon S3 Audit presents details from access logs that contain information about the request type, the average response time, and the inbound and outbound data volume.

{@import ../../reuse/apps/app-install.md}

## Viewing Amazon S3 Audit Dashboards

### Overview

This dashboard dashboard provides the geolocation of S3 operations, requests performed, data volume sent, and total requests by S3 buckets.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Overview.png')} alt="S3 Audit dashboards" />

**Geolocation of Clients.** Performs a geo lookup operation and displays the location of S3 bucket clients and the number of requests per bucket on a map of the world for the last three hours.

**Requests by Operation.** Displays the requests performed for the S3 bucket in a pie chart listed by operation type in a legend for the last three hours.

**Data Volume Sent in MB by S3 Bucket.** Shows the data volume per S3 bucket in megabytes, displayed in an bar chart for the last three hours.

**Total Requests by S3 Bucket.** Shows the total requests per S3 bucket, displayed in an bar chart for the last three hours.


### Details

This dashboard provides geolocation of s3 clients, data added, 4xx/5xx status codes, latency, and requests by S3 buckets.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Details.png')} alt="S3 Audit dashboards" />


**Geolocation of Clients.** Performs a geo lookup operation and displays the location of S3 bucket clients and the number of requests per bucket on a map of the world for the last three hours.

**Data Volume Sent in MB by S3 Bucket.** Shows the data volume per S3 bucket in megabytes, displayed in an area chart on a timeline for the last three hours.

**Total Requests by S3 Bucket.** Shows the total requests per S3 bucket, displayed in an area chart on a timeline for the last three hours.

**Data Added to S3 Bucket.** Lists the connected S3 bucket name and displays the amount of data loaded per bucket in megabytes in an aggregation table for the last three hours.

**Requests by Operation.** Displays the requests performed for the S3 bucket in a pie chart listed by operation type in a legend for the last three hours.

**Total 4xx/5xx Status codes by S3 Bucket.** Lists the total 4xx or 5xx error status codes by S3 bucket in a stacked column chart on a timeline for the last three hours.

**Average Latency in Milliseconds by S3 Bucket.** Displays the average latency time per S3 bucket in milliseconds in an area chart on a timeline for the last three hours.


### Threat Intel

This dashboard provides high-level views of threats throughout your S3 Service. Dashboard panels display visual graphs and detailed information on Threats by Client IP, Threats by Actors, and Threat by Malicious Confidence.

<img src={useBaseUrl('img/integrations/amazon-aws/S3-Threat-Intel.png')} alt="S3 Audit dashboards" />
