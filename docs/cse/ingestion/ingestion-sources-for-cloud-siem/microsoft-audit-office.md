---
id: microsoft-audit-office
title: Ingest Microsoft 365 Audit Data into Cloud SIEM
sidebar_label: Microsoft 365 Audit (Office 365 Audit)
description: Configure collection of Microsoft 365 log messages to be parsed by Cloud SIEM's system parser for Microsoft 365. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Microsoft 365 Audit data into Cloud SIEM:
1. [Configure a Microsoft Office 365 Audit source](/docs/send-data/hosted-collectors/microsoft-source/ms-office-audit-source/#configure-a-microsoft-office-365-audit-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Microsoft/Office 365*. This ensures that the Microsoft Office 365 Audit logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for Office 365 and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Office 365 security records. <br/><img src={useBaseUrl('img/cse/office-365-audit-search.png')} alt="Office 365 audit search" style={{border: '1px solid gray'}} width="400"/>