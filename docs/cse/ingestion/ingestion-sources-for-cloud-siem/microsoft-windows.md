---
id: microsoft-windows
title: Microsoft Windows - Cloud SIEM
sidebar_label: Microsoft Windows
description: Configure collection of Windows Event Log messages and send them to the Cloud SIEM Windows Event Log mapper.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';
 
## Step 1: Configure collection

In this step, you configure a Local Windows Event Log Source to collect Microsoft Windows Event Log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Local Windows Event Log Source](#configure-a-local-windows-event-log-source) below. Otherwise, create a new collector as described in [Configure an Installed collector](#configure-an-installed-collector) below, and then create the Local Windows Event Log Source on the collector.

### Configure an Installed Collector

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. For instructions for your preferred operating system and method of installation, see [Installed Collectors](/docs/send-data/installed-collectors).
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector** popup appears. <br/><img src={useBaseUrl('img/cse/edit-collector.png')} alt="Edit collector" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
   1. If you are planning that all the sources you add to this collector will forward log messages to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to Cloud SIEM.
   1. If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field link**, and add a field whose name is `_parser` with the value */Parsers/System/Microsoft/Windows-JSON*. This will cause all sources on the collector to use the specified parser.
  :::note
  It’s also possible to configure individual sources to forward to Cloud SIEM, as described in the following section.
  :::

### Configure a Local Windows Event Log Source

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. Click **Add Source** next to the Installed Collector.
1. Select **Windows Event Log**. 
1. The page refreshes.<br/><img src={useBaseUrl('img/cse/windows-event-source.png')} alt="Windows event source" style={{border: '1px solid gray'}} width="500"/>
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Source Host**. (Optional) Enter a string to tag the messages collected from the source. The string that you supply will be saved in a metadata field called `_sourceHost`.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields**. 
    1. If you have *not* configured the Installed Collector to forward all sources in the collector to Cloud SIEM, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you have *not* configured the Installed Collector to parse all sources in the collector with the same parser, click the +Add Field link, and add a field whose name is `_parser` with the value */Parsers/System/Microsoft/Windows-JSON*.
1. **Event Format**. Select **Collect using JSON format**.
1. **Windows Event Types**. Select the desired event types. You can  also specify Custom Event Channels in the box below.
1. **Event Collection Level**. Select **Concise Message**.
1. **Security Identifier**. You **may** specify how you want the Security Identifier (SID) to appear in the log message, **Username Only** is the default option.
1. **Collection should begin**. Specify when you want the log collection to start.
   :::note
   <CollBegin/>
   :::
1. Click **Save**.

## Step 2: Verify ingestion

In this step, you verify that your logs are successfully making it into Cloud SIEM. 

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for "Windows" and check the **Records** columns.
1. For a more granular look at the incoming records, you can also use search the Sumo Logic platform for Windows security records. <br/><img src={useBaseUrl('img/cse/windows-search.png')} alt="Windows search" style={{border: '1px solid gray'}} width="400"/>
