---
id: corelight-zeek
title: Corelight Zeek - Cloud SIEM
sidebar_label: Corelight Zeek
description: Configure a syslog source to ingest Corelight Zeek log messages and send them to the CSE Corelight log mapper.
---

This section has instructions for collecting Corelight Zeek log messages and sending them to Sumo Logic to be ingested by CSE.

These instructions are for Corelight Zeek logs sent as JSON over syslog.

:::note
The [CSE Network Sensor](/docs/cse/sensors/network-sensor-deployment-guide/) also utilizes Zeek, so If you're using the sensor, using Corelight Zeek would be redundant.
::: 

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Corelight Zeek log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the Installed Collectors page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears.  
    ![edit-collector.png](/img/cse/edit-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
1. Click **Save**.
  :::note
  It’s also possible to configure individual sources to forward to CSE, as described in the following section.
  :::

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes.  
    ![syslog-source.png](/img/cse/syslog-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see Choosing TCP or UDP on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-corelight-zeek) below.
1. **Fields**. If you *have not* configured the Installed Collector to forward all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
1. Click **Save**.

## Step 2: Configure Corelight Zeek

In this step you configure Zeek to send log messages to the Sumo Logic platform. For instructions, see [Corelight JSON Streaming documentation](https://github.com/corelight/json-streaming-logs).

## Step 3: CSE Ingest Configuration

In this step, you configure a Sumo Logic Ingest Mapping in CSE for the source category assigned to your source or collector you configured in [Step 1](#step-1-configure-collection). The mapping tells CSE the information it needs to select the right mapper to process messages that have been tagged with that source category. 

1. Click the gear icon at the top of the CSE UI, and select **Sumo Logic** under **Integrations**.  
    ![integrations-sumologic.png](/img/cse/integrations-sumologic.png)
1. On the **Sumo Logic Ingest Mappings** page, click **Create**.  
    ![ingest-mappipngs.png](/img/cse/ingest-mappipngs.png)
1. On the **Create Sumo Logic Mapping** popup:
    1. **Source Category**. Enter the category you assigned to the HTTP Source or Hosted Collector in [Step 1](#step-1-configure-collection). 
    1. **Format**. Enter *Bro/Zeek JSON.*  
    1. **Event ID**. *{_path}.*  
        ![corelight-edit-mapping.png](/img/cse/corelight-edit-mapping.png)
1. Click **Create** to save the mapping.

## Step 4: Verify Ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon at the top of the CSE UI, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "Zeek" and check under **Record Volume.**   
    ![corelight-record-volume.png](/img/cse/corelight-record-volume.png)
1. For a more granular look at the incoming Records, you can also search the Sumo Logic platform for Corelight Zeek security records.  
    ![corelight-search.png](/img/cse/corelight-search.png)
