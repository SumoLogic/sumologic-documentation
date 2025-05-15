---
id: google-workspace-apps-audit
title: Ingest Google Workspace Apps Audit Data into Cloud SIEM
sidebar_label: Google Workspace Apps Audit
description: Configure an Workspace Apps Audit Source to collect Google Workspace log messages to be parsed by Cloud SIEM's system parser for Google Workspace Audit.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Google Workspace Apps Audit data into Cloud SIEM:
1. [Configure a Google Workspace Apps Audit source](/docs/send-data/hosted-collectors/google-source/google-workspace-apps-audit-source/#configuring-a-google-workspace-apps-auditsource) on a collector. When you configure the source, do the following:
   1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
   1. Add another field named `_parser` with value */Parsers/System/Google/G Suite Audit*. This ensures that the Google Workspace Apps Audit logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM: 
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "Google Workspace" and check the **Records** columns. 
   1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Google Workspace security records.<br/><img src={useBaseUrl('img/cse/gsuite-search.png')} alt="GSuite search" style={{border: '1px solid gray'}} width="400"/>