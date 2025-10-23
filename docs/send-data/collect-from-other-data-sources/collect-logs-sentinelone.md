---
id: collect-logs-sentinelone
sidebar_label: SentinelOne
title: Collect Logs for SentinelOne
description: This page provides instructions for ingesting SentinelOne logs into Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section provides instructions for ingesting SentinelOne logs into Sumo Logic. For more information, on SentinelOne please visit the [SentinelOne website](https://www.sentinelone.com/).

If you have a SentinelOne account, you can view the contents of this article in the SentinelOne Support knowledge base [here](https://support.sentinelone.com/hc/en-us/articles/360007044894-Syslog-Integration-with-Sumo-Logic).

:::note
Although you can use this method for ingesting SentinelOne logs into Sumo Logic, the preferred method is to use the [SentinelOne Mgmt API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sentinelone-mgmt-api-source).
:::

## Step 1. Get a token and certificate from Sumo Logic

You can define a SIEM token to add in the message ID of CEFv2 Syslog messages.

:::note
The procedure assumes you have wget installed.
:::

To get a token and certificate from Sumo Logic, do the following:
1. Log in to the [Sumo Logic web site](https://www.sumologic.com/).
1. Configure a Cloud Syslog [Hosted Collector](/docs/send-data/collector-faq/#configure-limits-for-collector-caching) and [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source/), and generate a Cloud Syslog source token. 
1. Download the crt server certificate file from https://www.amazontrust.com/repository/AmazonRootCA1.cer.
1. Go to the location where the cert file is located and open a terminal window.
1. Run the following commands:
    ```bash
    wget -O acm_ca.der https://www.amazontrust.com/repository/AmazonRootCA1.cer
    openssl x509 -inform der -in acm_ca.der -out acm_ca.crt
    ```

## Step 2. Configure syslog messages

In this step, you configure syslog messages from the Management Console.

To configure syslog messages, do the following:

1. In the SentinelOne sidebar, click **Scope**, and then select a scope.
   :::note
   If you are a Site or Account admin, you must select one Site to be able to open Settings.
   :::
1. In the sidebar, click **Settings**.
1. In the Settings toolbar, click **Integrations**. <br/><img src={useBaseUrl('img/send-data/SentinelOne_Integrations_option.png')} alt="SentinelOne integrations option" style={{border: '1px solid gray'}} width="600" />
1. Click **SYSLOG**. The SYSLOG dialog appears.
1. Click the toggle to **Enable SYSLOG**.
1. Enter the **Syslog Host URL** and **port** number.
1. Click **Use SSL secure connection**, then click **Server certificate > Upload** and browse to the location of the downloaded crt certificate file.
1. Specify the following **Formatting** options:
   * **Information format**: Select **CEF2**
   * **SIEM Token**: Paste the Cloud Syslog Source Token generated from Sumo Logic. <br/><img src={useBaseUrl('img/send-data/SentinelOne_SYSLOG_dialog.png')} alt="SentinelOne SYSLOG dialog" style={{border: '1px solid gray'}} width="800" />
1. Click **Test**, and then click **Save**.
1. In Sumo Logic, verify that the logs are being ingested by running a search against the Cloud Syslog source you configured in [Step 1](#step-1-geta-token-and-certificate-from-sumo-logic). If you do not see any data coming in after 2-3 minutes, check the following:
   * that the Sumo Logic Collector has read access to the logs
   * that your time zone is configured correctly.