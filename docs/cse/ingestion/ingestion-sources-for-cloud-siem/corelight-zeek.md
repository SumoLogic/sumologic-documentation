---
id: corelight-zeek
title: Corelight Zeek - Cloud SIEM
sidebar_label: Corelight Zeek
description: Configure a syslog source to ingest Corelight Zeek log messages and send them to the Cloud SIEM Corelight log mapper.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Corelight Zeek log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.

These instructions are for Corelight Zeek logs sent as JSON over syslog.

:::note
The Sumo Logic Product Team has continued our on-premise network sensor feature for Sumo Logic Cloud SIEM (see [release note](/release-notes-cse#cloud-siem-network-sensor-end-of-life)). This article describes how to use Zeek as a network sensor to provide equivalent monitoring of your network.
:::

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Corelight Zeek log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the Installed Collectors page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears.<br/><img src={useBaseUrl('img/cse/edit-collector.png')} alt="Edit collector" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
1. Click **Save**.
  :::note
  It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
  :::

### Configure a Syslog Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/syslog-source.png')} alt="Syslog source" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see [Choosing TCP or UDP](/docs/send-data/installed-collectors/sources/syslog-source#choosing-tcp-or-udp) on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-corelight-zeek) below.
1. **Fields**. If you *have not* configured the Installed Collector to forward all sources in the collector to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
1. Click **Save**.

## Step 2: Configure Corelight Zeek

In this step you configure Zeek to send log messages to the Sumo Logic platform. For instructions, see [Corelight JSON Streaming documentation](https://github.com/corelight/json-streaming-logs).

## Step 3: Enable parsing and mapping of Zeek logs

After configuring the appropriate source, use one of the methods described below to provide information Cloud SIEM requires to parse and map Zeek logs.

This configuration step is required to ensure that Cloud SIEM knows how to parse incoming Zeek logs, correctly map the log fields to schema attributes, and create Cloud SIEM records. The most important bit of information is what type of data a particular log contains. Zeek has a variety of log types, for example `conn` for TCP/UDP/ICMP connections, `http` for HTTP requests and replies, and `ftp` for FTP activity.

So, how to determine whether a Zeek log is a `conn`, `http`, `ftp`, or some other log type? Zeek logs don’t contain a key that explicitly holds a value that is only the log type identifier. There are two options for dealing with this:

* Use Corelight to add a field to each Zeek log that identifies its log type. See [Use Corelight](#use-corelight) below.
* Use Sumo Logic Field Extraction Rules (FERs) to create fields that provide the log type and other data that enables Cloud SIEM to parse and map the logs. See [Use FERs](#use-fers).

### Use Corelight

With this method, you use Corelight’s [json-streaming-logs](https://github.com/corelight/json-streaming-logs), a Bro script package that creates JSON formatted logs, and adds an extension field, named _path that identifies the Zeek log type to each Zeek log. Then, you map that field to **Event ID** in a Sumo Logic ingest mapping.

After installing the `json-streaming-logs` package, follow these instructions to set up the Sumo Logic mapping.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Sumo Logic**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Ingest Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Mappings**.  
1. On the **Ingest Mappings** tab, click **+ Add Ingest Mapping**.<br/><img src={useBaseUrl('img/cse/ingest-mappings.png')} alt="Ingest mappings" style={{border: '1px solid gray'}} width="800"/>
1. On the **Add Ingest Mapping** tab:
   1. **Source Category**. Enter the Source Category value you assigned to the Source you configured above.
   1. **Format**. Choose **Bro/Zeek JSON**.
   1. **Event ID**. Enter `{_path}`.
   1. **Enabled**. Use the slider to enable the mapping if you’re ready to receive Zeek logs.
   1. Click **Save**.<br/><img src={useBaseUrl('img/cse/create-mapping.png')} alt="Create mapping" style={{border: '1px solid gray'}} width="400"/>

### Use FERs

With this method, you use Sumo Logic Field Extraction Rules (FERs) to extract fields from each Zeek log. The fields you extract will provide the information necessary for Cloud SIEM to correctly parse and map the logs. 

Here’s an example Bro log from the Security Onion platform. 

```
{"TAGS":".source.s_bro_conn","SOURCEIP":"127.0.0.1","PROGRAM":"bro_conn","PRIORITY":"notice","MESSAGE":"{\"ts\":\"2020-05-28T10:32:51.997054Z\",\"uid\":\"Cu3KVA2TbWqZm1Z0S6\",\"id.orig_h\":\"1.2.3.4\",\"id.orig_p\":16030,\"id.resp_h\":\"5.6.7.8\",\"id.resp_p\":161,\"proto\":\"udp\",\"duration\":30.000317811965942,\"orig_bytes\":258,\"resp_bytes\":0,\"conn_state\":\"S0\",\"local_orig\":true,\"local_resp\":true,\"missed_bytes\":0,\"history\":\"D\",\"orig_pkts\":6,\"orig_ip_bytes\":426,\"resp_pkts\":0,\"resp_ip_bytes\":0,\"sensorname\":\"test\"}","ISODATE":"2020-05-28T10:34:24+00:00","HOST_FROM":"somehost","HOST":"somehost","FILE_NAME":"/nsm/bro/logs/current/conn.log","FACILITY":"user"}
```

In the log above, the content of the Bro log is the value of the `MESSAGE` key. Note that no key in the log explicitly states the log type, which is `conn`. 

To enable Cloud SIEM to successfully process the log, we need to create the following fields listed in the table below.

<table>
  <tr>
   <td><strong>Field</strong></td>
   <td><strong>Parse Expression</strong> </td>
  </tr>
  <tr>
   <td><code>_siemMessage</code> </td>
   <td><code>json field=_raw "MESSAGE" as _siemMessage</code> </td>
  </tr>
  <tr>
   <td><code>_siemEventId</code></td>
   <td><code>json field=_raw "PROGRAM" as _siemEventId | parse regex field=_siemEventId "bro_(?&lt;_siemEventId>.*)"</code> </td>
  </tr>
  <tr>
   <td><code>_siemFormat</code></td>
   <td><code>"bro" as _siemFormat</code></td>
  </tr>
  <tr>
   <td><code>_siemVendor</code></td>
   <td><code>"bro" as _siemVendor</code></td>
  </tr>
  <tr>
   <td><code>_siemProduct</code></td>
   <td><code>"bro" as _siemProduct</code></td>
  </tr>
</table>

Perform these steps for each of the FERs.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**.  
1. Click **Add Rule**.
1. In the **Add Field Extraction Rule** pane:
   1. **Rule Name**. Enter a meaningful name for the rule.
   1. **Applied At**. Click Ingest Time. 
   1. **Scope**. Click **Specific Data**.
   1. **Parse Expression**. Enter the parse expression shown in the table above for the field the rule will extract.
1. Click **Save**.<br/><img src={useBaseUrl('img/cse/example-fer.png')} alt="Example FER" style={{border: '1px solid gray'}} width="400"/>

## Step 4: Verify Ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for "Zeek" and check the **Records** columns. <br/><img src={useBaseUrl('img/cse/corelight-record-volume.png')} alt="Corelight record volume" style={{border: '1px solid gray'}} width="800"/>
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Corelight Zeek security records.<br/><img src={useBaseUrl('img/cse/corelight-search.png')} alt="Corelight search" style={{border: '1px solid gray'}} width="400"/>