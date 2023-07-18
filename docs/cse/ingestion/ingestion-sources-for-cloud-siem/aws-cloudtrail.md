---
id: aws-cloudtrail
title: AWS CloudTrail - Cloud SIEM
sidebar_label: AWS CloudTrail
description: Configure a CloudTrail source on a hosted collector to ingest CloudTrail log messages to be parsed by CSE's CloudTrail system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting AWS CloudTrail log messages and sending them to Sumo Logic to be ingested by CSE.

Sumo Logic CSE supports the default AWS CloudTrail log format which includes all version 2 fields. See [AWS CloudTrail log records documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields) for more details.

## Step 1: Enable AWS CloudTrail logs

In this step, you configure AWS CloudTrail logging in AWS as described
in AWS Help.

1. Unless you’ve already done so, [Configure CloudTrail in AWS](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html).
1. Before configuring collection, you need to grant Sumo Logic permission to access your AWS data. For more information, see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product/).

## Step 2: Configure collection

In this step, you configure an HTTP Source to collect AWS CloudTrail log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an AWS CloudTrail Source](#configure-an-aws-cloudtrail-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. To create a new hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector). 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be AWS CloudTrail sources, add an additional field with key `_parser` and value */Parsers/System/AWS/CloudTrail*.

:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an AWS CloudTrail Source

1. To configure a CloudTrail Source, see [Configure an AWS CloudTrail source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source).
1. Configure fields as shown below to forward CloudTrail logs to the Cloud SIEM platform.
    1. If you are not forwarding all sources in the hosted collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/AWS/CloudTrail*.
14. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/>
1. On the **Log Mappings** page search for "CloudTrail" and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/cloudtrail-record-volume.png')} alt="CloudTrail record volume" width="600"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for CloudTrail security records.<br/><img src={useBaseUrl('img/cse/cloudtrail-search.png')} alt="CloudTrail search" width="400"/>

