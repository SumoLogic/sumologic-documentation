---
id: google-g-suite-apps-audit
title: Google G Suite Apps Audit
sidebar_label: Google G Suite Apps Audit
description: Configure an G Suite Apps Audit Source to collect G Suite log messages to be parsed by CSE's system parser for G Suite Audit.
---

## Step 1: Configure collection

In this step, you configure an G Suite Apps Audit Source to collect G Suite log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure G Suite Apps Audit Source](#configure-g-suite-apps-audit-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the G Suite Apps Audit Source on the collector.

### Configure a Hosted Collector

1. In Sv, select **Manage Data > Collection > Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  
    ![add-hosted-collector.png](/img/cse/add-hosted-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be G Suite Audit sources, add an additional field with key `_parser` and value */Parsers/System/Google/G Suite Audit*.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure G Suite Apps Audit Source

Each G Suite App must have its own source. Follow these steps for each G Suite App you wish to collect.

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to the Hosted Collector.
1. Select **G Suite Apps Audit.** 
1. The page refreshes.  
    ![gsuite-apps-audit-source.png](/img/cse/gsuite-apps-audit-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Application**. Select the G Suite app you wish to collect using this source. Steps may be repeated for each G Suite app you want to collect from.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory.`
1. **Fields**.
    1. If you have not configured the Hosted Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you are not parsing all sources in the hosted collector with the same parser, **+Add Field** named `_parser` with value */Parsers/System/Google/G Suite Audit.*
1. Sign in with Google. Click to give permission to Sumo Logic to set up watchpoints using the G Suite Apps Reports API. Click **Accept**.
1. Click **Save**.

## Step 2: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "G Suite" and check under **Record Volume**.  
    ![gsuite-record-volume.png](/img/cse/gsuite-record-volume.png)
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for G Suite security records.  
    ![gsuite-search.png](/img/cse/gsuite-search.png)
