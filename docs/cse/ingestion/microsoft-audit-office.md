---
id: microsoft-audit-office
title: Microsoft 365 Audit (Office 365 Audit) - Cloud SIEM
sidebar_label: Microsoft 365 Audit (Office 365 Audit)
description: Configure collection of Microsoft 365 log messages to be parsed by CSE's system parser for Microsoft 365. 
---

This topic has instructions for collecting Microsoft 365 audit logs and sending them to Sumo Logic to be ingested by CSE. 

## Step 1: Configure Microsoft 365

Before configuring a Sumo Logic collector and source, ensure that the requirements described in the Microsoft Office 365 Audit Source topic have been met. To ensure you have the appropriate Microsoft permissions when configuring the source, that page suggests using Microsoft's Global Administrator role. Note that the permissions this role grants are only necessary to complete the configuration of the Microsoft 365 Audit Source, not for actual ingestion of logs.

## Step 2: Configure collection

In this step, you configure an Microsoft 365 Audit Source to collect Microsoft 365 log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure Microsoft 365 Audit Source](#configure-office-365-audit-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the Microsoft 365 Audit Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data > Collection > Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  
    ![add-hosted-collector.png](/img/cse/add-hosted-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Microsoft 365 sources, add an additional field with key `_parser` and value */Parsers/System/Microsoft/Office 365.*
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure Office 365 Audit Source

Each Microsoft 365 Content Type must have its own source. Follow these steps for each Microsoft 365 Content Type you wish to collect.

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. Click **Add Source** next to  the Hosted Collector.
1. Select **Office 365 Audit.** 
1. The page refreshes.  
    ![office-365-audit-source.png](/img/cse/office-365-audit-source.png)
1. **Name**. Enter a name for the source. 
1. **Description.** (Optional) 
1. **O365 Region**. Region corresponding with your Microsoft 365 subscription.
1. **Content Type**. Select the O365 content type you wish to collect using this source. Steps may be repeated for each O365 content type you want to collect from.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields**.
    1. If you have not configured the Hosted Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you are not parsing all sources in the hosted collector with the same parser, click **+Add Field** and add a field named `_parser` with value */Parsers/System/Microsoft/Office 365*.
1. Sign in with Office 365. Click to give permission to Sumo Logic to collect Microsoft 365 logs.
1. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for Office 365 and check under **Record Volume**.  
    ![office-365-audit-record-volume.png](/img/cse/office-365-audit-record-volume.png)
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Office 365 security records.  
    ![office-365-audit-search.png](/img/cse/office-365-audit-search.png)
