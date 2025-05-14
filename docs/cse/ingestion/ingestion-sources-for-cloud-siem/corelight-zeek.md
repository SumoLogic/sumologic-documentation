---
id: corelight-zeek
title: Ingest Corelight Zeek Data into Cloud SIEM
sidebar_label: Corelight Zeek
description: Configure a syslog source to ingest Corelight Zeek log messages and send them to the Cloud SIEM Corelight log mapper.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Corelight Zeek data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. In **Source Category**, enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it below.
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
1. Configure a Sumo Logic ingest mapping in Cloud SIEM for the source category assigned to the source you configured above. The mapping tells Cloud SIEM the information it needs to select the right mapper to process messages that have been tagged with that source category. 
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top Cloud SIEM menu select **Configuration**, and then and under **Integrations** select **Sumo Logic**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Ingest Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Mappings**.  
    1. On the **Ingest Mappings** tab, click **+ Add Ingest Mapping**.
    1. On the **Add Ingest Mapping** popup:
        1. **Source Category**. Enter the category you assigned to the source above. 
        1. **Format**. Enter *Bro/Zeek JSON*.  
        1. **Event ID**. *`{_path}`*.<br/><img src={useBaseUrl('img/cse/corelight-edit-mapping.png')} alt="Corelight edit mappings" style={{border: '1px solid gray'}} width="400"/> 
    1. Click **Save** to save the mapping.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top Cloud SIEM menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Zeek" and check the **Records** columns. <br/><img src={useBaseUrl('img/cse/corelight-record-volume.png')} alt="Corelight record volume" style={{border: '1px solid gray'}} width="800"/>
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Corelight Zeek security records.<br/><img src={useBaseUrl('img/cse/corelight-search.png')} alt="Corelight search" style={{border: '1px solid gray'}} width="400"/>