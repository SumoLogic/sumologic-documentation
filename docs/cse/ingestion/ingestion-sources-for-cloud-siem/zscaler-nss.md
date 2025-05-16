---
id: zscaler-nss
title: Ingest ZScaler NSS Data into Cloud SIEM
sidebar_label: ZScaler NSS
description: Configure collection of ZScaler NSS log messages to be parsed by Cloud SIEM's system parser for ZScaler NSS.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest ZScaler NSS data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Zscaler/Zscaler Nanolog Streaming Service/Zscaler Nanolog Streaming Service-LEEF*. This ensures that the ZScaler NSS Data logs are parsed and normalized into structured records in Cloud SIEM.
    1. After saving the source, click the **Show URL** link and make note of the HTTP source URL. You'll supply it in the next step.
1. Configure ZScaler NSS to send log messages to the Sumo Logic platform by following the instructions in [Configure Zscaler Cloud NSS](/docs/integrations/security-threat-detection/zscaler-internet-access/#step-2-configure-zscaler-cloud-nss). For more information on configuring ZScaler NSS, see [About NSS Feeds](https://help.zscaler.com/zia/about-nss-feeds) in ZScaler help.
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "Nanolog Streaming Service" and check the **Records** columns.
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for ZScaler NSS security records. <br/><img src={useBaseUrl('img/cse/zscaler-nss-search.png')} alt="Zscaler NSS search" style={{border: '1px solid gray'}} width="400"/>