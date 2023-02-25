---
id: google-g-suite-apps-audit
title: Google G Suite Apps Audit - Cloud SIEM
sidebar_label: Google G Suite Apps Audit
description: Configure an G Suite Apps Audit Source to collect G Suite log messages to be parsed by CSE's system parser for G Suite Audit.
---

## Step 1: Configure collection

In this step, you configure an G Suite Apps Audit Source to collect G Suite log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure G Suite Apps Audit Source](#configure-g-suite-apps-audit-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the G Suite Apps Audit Source on the collector.

### Configure a Hosted Collector

1. To create a new hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be G Suite Audit sources, add an additional field with key `_parser` and value */Parsers/System/Google/G Suite Audit*.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure G Suite Apps Audit Source

1. To configure G Suite source, see [Configure a G Suite Apps Audit Source](/docs/send-data/hosted-collectors/google-source/g-suite-apps-audit-source/#configuring-a-g-suite-apps-auditsource).
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
