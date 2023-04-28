---
id: carbon-black
title: Carbon Black Cloud - Cloud SIEM
sidebar_label: Carbon Black Cloud
description: Configure collection of Carbon Black Cloud logs messages from an S3 bucket to be parsed by CSE's system parser for Carbon Black Cloud.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page has instructions for collecting Carbon Black Cloud log messages and sending them to Sumo Logic to be ingested by CSE.

VMware does NOT recommend setting up a Cloud-to-Cloud integration for Carbon Black Cloud and instead recommends collecting logs in an S3 bucket as an intermediary, as described below.


### Step 1: Configure collection

In this step, you configure an AWS S3 Source to collect Carbon Black Cloud log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an AWS S3 Source below](#configure-an-aws-s3-source). Otherwise, create a new collector as described in Configure a hosted collector below, and then create the source on the collector.


#### Configure a hosted collector

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
2. Click **Add Collector**.
3. Click **Hosted Collector.**
4. The **Add Hosted Collector** popup appears.<br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="add-hosted-collector" />
5. **Name**. Provide a Name for the Collector.
6. **Description**. (Optional)
7. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
8. **Fields**.
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is _true_. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    2. If all sources in this collector will be Carbon Black Cloud sources, add an additional field with key `_parser` and value _/Parsers/System/VMware/Carbon Black Cloud_.


It’s also possible to configure individual sources to forward to CSE, as described in the following section.


#### Configure an AWS S3 Source

If you have issues performing the steps below, see the [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source) topic for more information.

The bucket you designate for Carbon Black Cloud data must be exclusively used for this data source. Note also that the Sumo Logic collector does not support collection of logs that are edited after being stored in S3 and prior to being polled for ingestion to the Sumo Logic core platform.

1. [Grant Sumo Logic access](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) to an Amazon S3 bucket.
2. [Enable logging in AWS](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html) using the Amazon Console.
3. Confirm that logs are being delivered to the Amazon S3 bucket.
4. In Sumo Logic, select **Manage Data > Collection > Collection**.
5. Navigate to the Hosted Collector where you want to create the source.
6. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
7. Select **Amazon S3**.
8. The page refreshes.<br/> <img src={useBaseUrl('img/cse/s3-source.png')} alt="add-hosted-collector" />
9. **Name**. Enter a name for the source.
10. **Description**. (Optional)
11. **S3 Region**. Choose the AWS Region the S3 bucket resides in.
12. **Use AWS versioned APIs?** Leave the default, _Yes_.
13. **Bucket Name**. The name of your organization.s S3 bucket as it appears in AWS.
14. **Path Expression**. The path expression of the log file(s) in S3, can contain wildcards to include multiple log files.
15. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
16. **Fields**.
    * If you are not forwarding all sources in the hosted collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is _true_. This will ensure all logs for this source are forwarded to CSE.
    * Add another field named `_parser` with value _/Parsers/System/VMware/Carbon Black Cloud_
17. **AWS Access**. For AWS Access you have two Access Method options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred. Note that Sumo Logic access to AWS (instructions are provided above in [Step 1](#Step-1-Configure-collection))  is a prerequisite for role-based access
    * **Role-based access**. Enter the Role ARN that was provided by AWS after creating the role.<br/> <img src={useBaseUrl('img/cse/role-arn.png')} alt="add-hosted-collector" />
    * **Key access**. Enter the Access Key ID and Secret Access Key. See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
18. **Log File Discovery**. These settings allow Sumo Logic to automatically collect logs from the specified S3 bucket when an Amazon SNS message is received (highly recommended). Alternatively, an automatic scan interval for new log files can be configured.
19. **Advanced Options for Logs.** For information about the optional advanced options you can configure, see [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source).
20. Click **Save**.


### Step 2: Configure Carbon Black Cloud

In this step you configure Carbon Black Cloud to send log messages to an S3 bucket. For instructions, see [Data Forwarders](https://docs.vmware.com/en/VMware-Carbon-Black-Cloud/services/carbon-black-cloud-user-guide/GUID-E8D33F72-BABB-4157-A908-D8BBDB5AF349.html) in VMware help.


### Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE.

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**. <br/> <img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="add-hosted-collector" />
2. On the **Log Mappings** page search for Carbon Black Cloud and check under **Record Volume**.<br/> <img src={useBaseUrl('img/cse/carbon-black-records.png')} alt="carbon-black-records" />
3. For a more granular look at the incoming Records, you can also search Sumo Logic for Carbon Black Cloud Records.<br/> <img src={useBaseUrl('img/cse/carbon-black-search.png')} alt="carbon-black-search" />
