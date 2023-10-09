---
id: google-workspace-apps-audit
title: Google Workspace Apps Audit - Cloud SIEM
sidebar_label: Google Workspace Apps Audit
description: Configure an Workspace Apps Audit Source to collect Google Workspace log messages to be parsed by CSE's system parser for Google Workspace Audit.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/gcp-icon.png')} alt="icon" width="35"/>

## Step 1: Configure collection

In this step, you configure an Google Workspace Apps Audit Source to collect Google Workspace log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure Google Workspace Apps Audit Source](#configure-google-workspace-apps-audit-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the Google Workspace Apps Audit Source on the collector.

### Configure a Hosted Collector

1. To create a new hosted collector, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be Google Workspace Audit sources, add an additional field with key `_parser` and value */Parsers/System/Google/Google Workspace Audit*.
    :::note
    It’s also possible to configure individual sources to forward to CSE, as described in the following section.
    :::

### Configure Google Workspace Apps Audit Source

1. To configure Google Workspace source, see [Configure a Google Workspace Apps Audit Source](/docs/send-data/hosted-collectors/google-source/google-workspace-apps-audit-source/#configuring-a-google-workspace-apps-auditsource).
1. **Fields**.
    1. If you have not configured the Hosted Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you are not parsing all sources in the hosted collector with the same parser, **+Add Field** named `_parser` with value */Parsers/System/Google/Google Workspace Audit.*
1. Sign in with Google. Click to give permission to Sumo Logic to set up watchpoints using the Google Workspace Apps Reports API. Click **Accept**.
1. Click **Save**.

## Step 2: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**. <br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/> 
1. On the **Log Mappings** page search for "Google Workspace" and check under **Record Volume**. <br/><img src={useBaseUrl('img/cse/gsuite-record-volume.png')} alt="GSuite record volume" width="600"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Google Workspace security records.<br/><img src={useBaseUrl('img/cse/gsuite-search.png')} alt="GSuite search" width="400"/>
