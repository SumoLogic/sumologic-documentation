---
id: signal-sciences-waf
title: Ingest Signal Sciences WAF Data into Cloud SIEM
sidebar_label: Signal Sciences WAF
description: Lean how to collect Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Signal Sciences data into Cloud SIEM:
1. [Configure an HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source) on a collector. When you configure the source, do the following:
   1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Make note of the **Source Category**. You'll supply it in a later step.
   1. After saving the source, click the **Show URL** link and make note of the HTTP source URL. You'll supply it in a later step.
1. Configure Signal Sciences WAF to send log messages to the Sumo Logic platform:
   1. Go to the **SigSci Site Tools > Integrations** in the **SigSci** dashboard.
   1. Click **Add** for **Generic Webhook**.
   1. Paste the HTTP source URL from the previous step into the **Webhook URL** field and click **Add**.
      For more information on Generic Webhooks refer to the [Generic Webhooks](https://docs.fastly.com/signalsciences/integrations/generic-webhooks/) page in Fastly help.
1. Configure a Sumo Logic Ingest Mapping in Cloud SIEM for the source category assigned to the source. The mapping tells Cloud SIEM the information it needs to select the right mapper to process messages that have been tagged with that source category. 
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Sumo Logic**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Ingest Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Ingest Mappings**.  
   1. On the **Ingest Mappings** tab, click **+ Add Ingest Mapping**.
   1. On the **Add Ingest Mapping** popup:
       * **Source Category**. Enter the category you assigned to the HTTP source you created earlier. 
       * **Format**. Enter *JSON.*
       * **Vendor**. Enter *SignalSciences*.
       * **Product**. Enter *WAF*. 
       * **Event ID**. Enter *.\**
   1. Click **Create** to save the mapping.
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** page search for "Signal Sciences" and check the **Records** columns. <br/><img src={useBaseUrl('img/cse/signal-sciences-record-volume.png')} alt="Signal Sciences record volume" style={{border: '1px solid gray'}} width="800"/>
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Signal Sciences WAF security records.