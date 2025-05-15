---
id: microsoft-windows
title: Ingest Microsoft Windows Data into Cloud SIEM
sidebar_label: Microsoft Windows
description: Configure collection of Windows Event Log messages and send them to the Cloud SIEM Windows Event Log mapper.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';

To ingest Microsoft Windows data into Cloud SIEM:
1. [Configure a Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source/) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Microsoft/Windows-JSON*. This ensures that the Microsoft Windows logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Windows" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also use search the Sumo Logic platform for Windows security records. <br/><img src={useBaseUrl('img/cse/windows-search.png')} alt="Windows search" style={{border: '1px solid gray'}} width="400"/>