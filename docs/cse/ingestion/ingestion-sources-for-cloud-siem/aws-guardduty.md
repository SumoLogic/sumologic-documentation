---
id: aws-guardduty
title: AWS GuardDuty - Cloud SIEM
sidebar_label: AWS GuardDuty
description: Configure an HTTP source to ingest AWS GuardDuty log messages and send them to GuardDuty system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting AWS GuardDuty log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

## Step 1: Configure collection

In this step, you configure an HTTP Source to collect AWS GuardDuty log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an HTTP Source](#configure-an-http-source) below. Otherwise, create a new collector as described in [Configure a Hosted Collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.<br/><img src={useBaseUrl('img/cse/add-hosted-collector.png')} alt="Add hosted collector" width="500"/>
1. **Name**. Provide a Name for the collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
    1. If all sources in this collector will be AWS VPC Flow sources, add an additional field with key `_parser` and value */Parsers/System/AWS/GuardDuty*.
1. Click **Save**.

:::note
It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
:::

### Configure an HTTP Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **HTTP Logs & Metrics**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/http-source.png')} alt="HTTP logs and metrics" width="600"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host.** (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost`.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **SIEM Processing.** Click the checkbox to configure the source to forward log messages to Cloud SIEM.
1. **Fields.** If you are not parsing all sources in the hosted collector with the same parser, **+Add Field** named `_parser` with value `/Parsers/System/AWS/GuardDuty`.
12. **Advanced Options for Logs**.
    1. Specify **Format** as `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
    1. Specify **Timestamp locator** as `.\*"updatedAt":"(.\*)".\*`<br/><img src={useBaseUrl('img/cse/timestamp-format.png')} alt="Timestamp format" width="500"/>
13. Click **Save**.
14. Make a note of the **HTTP Source URL** that is displayed. You’ll supply it in [Step 2](#step-2-deploy-sumo-logic-guardduty-events-processor) below.

## Step 2: Deploy Sumo Logic GuardDuty events processor

In this step, you deploy the events processor. This will create the AWS resources described in the [Collecting Logs for the Amazon GuardDuty App](/docs/integrations/amazon-aws/guardduty/#collecting-logs-for-the-amazon-guardduty-app) overview documentation.

1. Go to https://serverlessrepo.aws.amazon.com/application.
1. Search for “sumologic-guardduty-events-processor”.<br/><img src={useBaseUrl('img/cse/aws-repo.png')} alt="AWS repo" width="800"/>
1. When the page for the Sumo app appears, click **Deploy**.<br/><img src={useBaseUrl('img/cse/aws-deploy.png')} alt="AWS deploy" width="800"/>
1. In  the **Configure application parameters** popup, paste the URL for the HTTP source you created above. <br/><img src={useBaseUrl('img/cse/config-app-params.png')} alt="Configure app parameters" width="400"/>
1. Click **Deploy**.

## Step 3: Configure optional environment variables

1. Go to the AWS Lambda console.
1. Search for the `"aws-serverless-repository-CloudWatchEventFunction-<suffix>"` function and click it.
1. Scroll down to the **Environment variables** section.<br/><img src={useBaseUrl('img/cse/env-vars.png')} alt="Environment variables" width="800"/>
    You can set any of the following optional variables:
   * `ENCODING` (Optional). Encoding to use when decoding CloudWatch log events. Default is utf-8.
   * `SOURCE_CATEGORY_OVERRIDE` (Optional). Override the `_sourceCategory` value configured for the HTTP source.
   * `SOURCE_HOST_OVERRIDE` (Optional). Override the `_sourceHost` value  configured for the HTTP source.
   * `SOURCE_NAME_OVERRIDE` (Optional). Override the `_sourceName` value configured for the HTTP source.

## Step 4: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. Click the gear icon at the top of the Cloud SIEM UI, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mapping link" width="400"/>
1. On the **Log Mappings** page search for "GuardDuty" and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/guardduty-record-volume.png')} alt="GuardDuty record volume" width="600"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for GuardDuty security records..<br/><img src={useBaseUrl('img/cse/guardduty-search.png')} alt="GuardDuty search" width="400"/>
