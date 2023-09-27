---
id: microsoft-audit-office
title: Microsoft 365 Audit (Office 365 Audit) - Cloud SIEM
sidebar_label: Microsoft 365 Audit (Office 365 Audit)
description: Configure collection of Microsoft 365 log messages to be parsed by CSE's system parser for Microsoft 365. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for collecting Microsoft 365 audit logs and sending them to Sumo Logic to be ingested by CSE. 

## Step 1: Configure Microsoft 365

Before configuring a Sumo Logic collector and source, ensure that the requirements described in the Microsoft Office 365 Audit Source topic have been met. To ensure you have the appropriate Microsoft permissions when configuring the source, that page suggests using Microsoft's Global Administrator role. Note that the permissions this role grants are only necessary to complete the configuration of the Microsoft 365 Audit Source, not for actual ingestion of logs.

## Step 2: Configure collection

In this step, you configure an Microsoft 365 Audit Source to collect Microsoft 365 log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure Microsoft 365 Audit Source](#configure-office-365-audit-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the Microsoft 365 Audit Source on the collector.

### Configure a Hosted Collector

1. To create a new hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Microsoft 365 sources, add an additional field with key `_parser` and value */Parsers/System/Microsoft/Office 365.*
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure Office 365 Audit Source


1. To configure Microsoft office 365 audit source, see [Configure a Microsoft Office 365 Audit source](/docs/send-data/hosted-collectors/ms-office-audit-source/#configure-a-microsoft-office-365-audit-source). 
1. **Fields**.
    1. If you have not configured the Hosted Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you are not parsing all sources in the hosted collector with the same parser, click **+Add Field** and add a field named `_parser` with value */Parsers/System/Microsoft/Office 365*.
1. Sign in with Office 365. Click to give permission to Sumo Logic to collect Microsoft 365 logs.
1. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.<br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/> 
1. On the **Log Mappings** page search for Office 365 and check under **Record Volume**.<br/><img src={useBaseUrl('img/cse/office-365-audit-record-volume.png')} alt="Office 365 audit record volume" width="600"/> 
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Office 365 security records. <br/><img src={useBaseUrl('img/cse/office-365-audit-search.png')} alt="Office 365 audit search" width="400"/>  
